import mongoose from 'mongoose';
import {
  Challenge,
  CHALLENGE_CATEGORIES,
  CHALLENGE_DIFFICULTIES,
  CHALLENGE_RISKS,
  SUPPORTED_GAME_TYPES,
  sanitizePublicChallenge,
} from '../models/Challenge.js';
import { ChallengeAttempt } from '../models/ChallengeAttempt.js';
import { Team } from '../models/Team.js';
import { CreditService } from './creditService.js';
import { AuditService, AUDIT_ACTION_TYPES } from './auditService.js';
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
import { evaluateGameSubmissionServer } from '../games/GameRegistry.js';
import { assignVariantForTeamAttempt } from './challengeVariantService.js';
import { logger } from '../utils/logger.js';
import {
  getChallengeTimingMultiplier,
  calculateChallengeTimeLimit,
  getTeamConsecutiveStreak,
  normalizeGameType,
  getGameLabel,
  getMaxConsecutiveGames,
  getConsecutiveGamesCooldownSeconds,
  getConsecutiveGamesCooldownMinutes,
} from '../config/timingConfig.js';

import { DEFAULT_CHALLENGE_CATALOG } from './catalog/index.js';

export { DEFAULT_CHALLENGE_CATALOG };


export const normalizeRiskTier = (rawRisk) => {
  const val = String(rawRisk || 'BALANCED')
    .trim()
    .toUpperCase();
  if (val === 'SAFE' || val === 'LOW') return 'SAFE';
  if (
    val === 'AGGRESSIVE' ||
    val === 'HIGH' ||
    val === 'HIGH_STAKES' ||
    val === 'EXTREME' ||
    val === 'CRITICAL'
  ) {
    return 'AGGRESSIVE';
  }
  return 'BALANCED';
};

/**
 * Updates server-authoritative Team Risk Profile telemetry:
 * - safeAttempts, balancedAttempts, aggressiveAttempts
 * - successByRisk: { SAFE, BALANCED, AGGRESSIVE }
 * - creditsByRisk: { SAFE: { gained, lost, net }, BALANCED: {...}, AGGRESSIVE: {...} }
 * - riskProfile: 'SAFE' | 'BALANCED' | 'AGGRESSIVE'
 * Uses direct configurable challenge risk & credit amounts (no hidden formula).
 */
export const applyTeamRiskTelemetry = (
  team,
  {
    risk = 'BALANCED',
    attemptIncrement = 0,
    successIncrement = 0,
    creditsGained = 0,
    creditsLost = 0,
    setActiveRiskProfile = false,
  } = {}
) => {
  if (!team || !team.stats) return;

  const tier = normalizeRiskTier(risk);

  team.stats.safeAttempts = Number(team.stats.safeAttempts || 0);
  team.stats.balancedAttempts = Number(team.stats.balancedAttempts || 0);
  team.stats.aggressiveAttempts = Number(team.stats.aggressiveAttempts || 0);

  if (attemptIncrement > 0) {
    if (tier === 'SAFE') team.stats.safeAttempts += attemptIncrement;
    else if (tier === 'AGGRESSIVE') team.stats.aggressiveAttempts += attemptIncrement;
    else team.stats.balancedAttempts += attemptIncrement;
  }

  if (!team.stats.successByRisk) {
    team.stats.successByRisk = { SAFE: 0, BALANCED: 0, AGGRESSIVE: 0 };
  }
  if (successIncrement > 0) {
    team.stats.successByRisk[tier] =
      Number(team.stats.successByRisk[tier] || 0) + successIncrement;
  }

  if (!team.stats.creditsByRisk) {
    team.stats.creditsByRisk = {
      SAFE: { gained: 0, lost: 0, net: 0 },
      BALANCED: { gained: 0, lost: 0, net: 0 },
      AGGRESSIVE: { gained: 0, lost: 0, net: 0 },
    };
  }

  for (const key of ['SAFE', 'BALANCED', 'AGGRESSIVE']) {
    if (!team.stats.creditsByRisk[key]) {
      team.stats.creditsByRisk[key] = { gained: 0, lost: 0, net: 0 };
    }
  }

  const bucket = team.stats.creditsByRisk[tier];
  bucket.gained = Number(bucket.gained || 0) + Math.max(0, Number(creditsGained || 0));
  bucket.lost = Number(bucket.lost || 0) + Math.max(0, Number(creditsLost || 0));
  bucket.net = bucket.gained - bucket.lost;

  if (setActiveRiskProfile) {
    team.stats.riskProfile = tier;
  } else {
    // Reflect dominant attempt tier when no active session override is specified
    const counts = {
      SAFE: team.stats.safeAttempts,
      BALANCED: team.stats.balancedAttempts,
      AGGRESSIVE: team.stats.aggressiveAttempts,
    };
    if (counts.AGGRESSIVE > counts.BALANCED && counts.AGGRESSIVE >= counts.SAFE) {
      team.stats.riskProfile = 'AGGRESSIVE';
    } else if (counts.SAFE > counts.BALANCED && counts.SAFE > counts.AGGRESSIVE) {
      team.stats.riskProfile = 'SAFE';
    } else {
      team.stats.riskProfile = tier;
    }
  }

  if (typeof team.markModified === 'function') {
    team.markModified('stats');
  }
};

let challengesSeeded = false;
let challengesSeedPromise = null;
let cachedPublicCatalog = null;
let cachedPublicCatalogExpiresAt = 0;
let inFlightCatalogPromise = null;

export const ensureDefaultChallengesSeeded = async () => {
  if (mongoose.connection.readyState !== 1) return;
  if (challengesSeeded) return;
  if (challengesSeedPromise) return challengesSeedPromise;

  challengesSeedPromise = (async () => {
    try {
      const validIds = DEFAULT_CHALLENGE_CATALOG.map((c) => c.challengeId);
      const existingCount = await Challenge.countDocuments({
        enabled: true,
        challengeId: { $in: validIds },
      });

      // Disable any outdated challenges not present in the 3000 catalog
      await Challenge.updateMany(
        { challengeId: { $nin: validIds } },
        { $set: { enabled: false, available: false } }
      );

      if (existingCount >= DEFAULT_CHALLENGE_CATALOG.length) {
        challengesSeeded = true;
        return;
      }

      const BATCH_SIZE = 500;
      for (let i = 0; i < DEFAULT_CHALLENGE_CATALOG.length; i += BATCH_SIZE) {
        const chunk = DEFAULT_CHALLENGE_CATALOG.slice(i, i + BATCH_SIZE);
        const ops = chunk.map((item) => ({
          updateOne: {
            filter: { challengeId: item.challengeId },
            update: { $set: item },
            upsert: true,
          },
        }));
        if (ops.length > 0) {
          await Challenge.bulkWrite(ops, { ordered: false });
        }
      }

      // Normalize any legacy risk values in existing MongoDB documents to SAFE | BALANCED | AGGRESSIVE
      await Challenge.updateMany(
        { risk: { $in: ['HIGH', 'EXTREME', 'CRITICAL', 'HIGH_STAKES'] } },
        { $set: { risk: 'AGGRESSIVE' } }
      );
      await Challenge.updateMany(
        { risk: { $in: ['MODERATE', 'MEDIUM'] } },
        { $set: { risk: 'BALANCED' } }
      );
      await Challenge.updateMany({ risk: 'LOW' }, { $set: { risk: 'SAFE' } });

      challengesSeeded = true;
    } catch (err) {
      logger.warn('SEED', `Challenge catalog seed check warning: ${err.message}`);
    } finally {
      challengesSeedPromise = null;
    }
  })();

  return challengesSeedPromise;
};

export class ChallengeService {
  static invalidateCatalogCache() {
    cachedPublicCatalog = null;
    cachedPublicCatalogExpiresAt = 0;
  }

  static async listChallenges(filters = {}) {
    await ensureDefaultChallengesSeeded();

    const query = { enabled: true };

    if (
      filters.category &&
      filters.category !== 'ALL' &&
      CHALLENGE_CATEGORIES.includes(String(filters.category).toUpperCase())
    ) {
      query.category = String(filters.category).toUpperCase();
    }

    if (filters.gameType && filters.gameType !== 'ALL') {
      query.gameType = String(filters.gameType).trim();
    }

    if (
      filters.difficulty &&
      filters.difficulty !== 'ALL' &&
      CHALLENGE_DIFFICULTIES.includes(String(filters.difficulty).toUpperCase())
    ) {
      query.difficulty = String(filters.difficulty).toUpperCase();
    }

    if (
      filters.risk &&
      filters.risk !== 'ALL' &&
      CHALLENGE_RISKS.includes(String(filters.risk).toUpperCase())
    ) {
      query.risk = String(filters.risk).toUpperCase();
    }

    const diffRank = { LOW: 1, MODERATE: 2, HIGH: 3, EXTREME: 4 };
    const sortByDifficultyAndCost = (a, b) => {
      const rA = diffRank[String(a.difficulty || 'MODERATE').toUpperCase()] || 2;
      const rB = diffRank[String(b.difficulty || 'MODERATE').toUpperCase()] || 2;
      if (rA !== rB) return rA - rB;
      const cA = Number(a.cost || 0);
      const cB = Number(b.cost || 0);
      if (cA !== cB) return cA - cB;
      return String(a.challengeId || '').localeCompare(String(b.challengeId || ''));
    };

    const isUnfiltered = Object.keys(query).length === 1;
    if (isUnfiltered && cachedPublicCatalog && Date.now() < cachedPublicCatalogExpiresAt) {
      return cachedPublicCatalog;
    }

    if (isUnfiltered && inFlightCatalogPromise) {
      return inFlightCatalogPromise;
    }

    const loadCatalogPromise = (async () => {
      if (mongoose.connection.readyState === 1) {
        const docs = await Challenge.find(query).sort({ cost: 1, challengeId: 1 }).lean();
        if (docs.length > 0 || !isUnfiltered) {
          const sanitized = docs
            .map((d) => sanitizePublicChallenge(d, { isMarketListing: true }))
            .sort(sortByDifficultyAndCost);
          if (isUnfiltered) {
            cachedPublicCatalog = sanitized;
            cachedPublicCatalogExpiresAt = Date.now() + 15 * 60 * 1000; // 15 min cache
          }
          return sanitized;
        }
      }

      const fallbackList = DEFAULT_CHALLENGE_CATALOG.filter((c) => {
        if (!c.enabled) return false;
        if (query.category && c.category !== query.category) return false;
        if (query.gameType && c.gameType !== query.gameType) return false;
        if (query.difficulty && c.difficulty !== query.difficulty) return false;
        if (query.risk && c.risk !== query.risk) return false;
        return true;
      })
        .map((c) => sanitizePublicChallenge(c, { isMarketListing: true }))
        .sort(sortByDifficultyAndCost);

      if (isUnfiltered) {
        cachedPublicCatalog = fallbackList;
        cachedPublicCatalogExpiresAt = Date.now() + 15 * 60 * 1000; // 15 min cache
      }
      return fallbackList;
    })();

    if (isUnfiltered) {
      inFlightCatalogPromise = loadCatalogPromise;
      try {
        return await inFlightCatalogPromise;
      } finally {
        inFlightCatalogPromise = null;
      }
    }

    return loadCatalogPromise;
  }

  static async getChallengeById(rawChallengeId, { includeSolution = false } = {}) {
    const challengeId = String(rawChallengeId || '')
      .trim()
      .toUpperCase();

    await ensureDefaultChallengesSeeded();

    if (mongoose.connection.readyState === 1) {
      const query = Challenge.findOne({ challengeId });
      if (includeSolution) {
        query.select('+solutionConfig');
      }
      const doc = await query.lean();
      if (doc) {
        return includeSolution ? doc : sanitizePublicChallenge(doc);
      }
    }

    const fallback = DEFAULT_CHALLENGE_CATALOG.find((c) => c.challengeId === challengeId) || null;
    if (!fallback) return null;
    return includeSolution ? { ...fallback } : sanitizePublicChallenge(fallback);
  }

  /**
   * Server-authoritative Challenge Acquisition & Session Initialization
   */
  static async acquireChallengeForTeam({
    teamDoc,
    teamId,
    challengeId,
    isReattemptRequested,
    buyOnly = false,
    operative = null,
  }) {
    const resolvedTeamId = String(teamDoc?.teamId || teamId || '')
      .trim()
      .toUpperCase();
    const acqLockKey = resolvedTeamId || 'UNKNOWN_TEAM';

    if (ChallengeService._acquisitionLocks.has(acqLockKey)) {
      const err = new Error(
        'Simultaneous challenge purchase blocked: another squad member is currently acquiring a module.'
      );
      err.statusCode = 409;
      err.code = 'SIMULTANEOUS_PURCHASE_BLOCKED';
      throw err;
    }

    ChallengeService._acquisitionLocks.add(acqLockKey);

    try {
      const team =
        teamDoc ||
        (await Team.findOne({
          teamId: resolvedTeamId,
        }));

      if (!team) {
        const err = new Error('Authenticated team record not found in NEXUS Core.');
        err.statusCode = 404;
        err.code = 'TEAM_NOT_FOUND';
        throw err;
      }

      const normalizedChallengeId = String(challengeId || '')
        .trim()
        .toUpperCase();
      if (!normalizedChallengeId) {
        const err = new Error('Challenge ID is required to acquire a module.');
        err.statusCode = 400;
        err.code = 'CHALLENGE_ID_REQUIRED';
        throw err;
      }

      const challenge = await ChallengeService.getChallengeById(normalizedChallengeId);
      if (!challenge) {
        const err = new Error(`Challenge module [${normalizedChallengeId}] does not exist.`);
        err.statusCode = 404;
        err.code = 'CHALLENGE_NOT_FOUND';
        throw err;
      }

      if (!challenge.enabled || !challenge.available) {
        const err = new Error(
          `Challenge module [${challenge.title}] is currently restricted or unavailable.`
        );
        err.statusCode = 400;
        err.code = 'CHALLENGE_UNAVAILABLE';
        throw err;
      }

      const alreadySolved = (team.completedChallenges || []).some(
        (c) => c.challengeId === challenge.challengeId
      );
      if (alreadySolved) {
        const err = new Error(
          `Challenge [${challenge.title}] has already been solved by your squad.`
        );
        err.statusCode = 400;
        err.code = 'CHALLENGE_ALREADY_SOLVED';
        throw err;
      }

      if (!Array.isArray(team.purchasedChallenges)) {
        team.purchasedChallenges = [];
      }
      if (!Array.isArray(team.activeAttempts)) {
        team.activeAttempts = [];
      }

      // Ensure legacy activeAttempt is reflected in activeAttempts
      if (
        team.activeAttempt &&
        team.activeAttempt.status === 'IN_PROGRESS' &&
        team.activeAttempt.challengeId &&
        !team.activeAttempts.some(
          (a) =>
            String(a.challengeId).toUpperCase() ===
            String(team.activeAttempt.challengeId).toUpperCase()
        )
      ) {
        team.activeAttempts.unshift(
          typeof team.activeAttempt.toObject === 'function'
            ? team.activeAttempt.toObject()
            : { ...team.activeAttempt }
        );
      }

      const existingPurchasedEntry = team.purchasedChallenges.find(
        (c) => String(c.challengeId).toUpperCase() === challenge.challengeId
      );
      const existingActiveIndex = team.activeAttempts.findIndex(
        (a) =>
          a.status === 'IN_PROGRESS' &&
          String(a.challengeId).toUpperCase() === challenge.challengeId
      );
      const isCurrentlyActive = existingActiveIndex !== -1;
      const alreadyPurchased = Boolean(existingPurchasedEntry || isCurrentlyActive);

      const resolvedMemberId = String(operative?.memberId || '').trim() || null;
      const resolvedMemberName = String(operative?.memberName || operative?.name || '').trim() || null;

      // If buyOnly was requested on a challenge already owned by the team, block duplicate purchase
      if (buyOnly && alreadyPurchased) {
        const err = new Error(
          `Challenge [${challenge.title}] is already purchased by your team and ready to solve.`
        );
        err.statusCode = 409;
        err.code = 'CHALLENGE_ALREADY_PURCHASED';
        throw err;
      }

      // If starting/opening a challenge that is already in activeAttempts, return it directly (updating operative if needed)
      if (!buyOnly && isCurrentlyActive) {
        const matchedAttempt = team.activeAttempts[existingActiveIndex];
        if (resolvedMemberId && !matchedAttempt.assignedMemberId) {
          matchedAttempt.assignedMemberId = resolvedMemberId;
          matchedAttempt.assignedMemberName = resolvedMemberName;
          team.markModified('activeAttempts');
          await team.save();
        }
        return {
          team,
          challenge,
          creditResult: null,
          activeAttempt: matchedAttempt,
        };
      }

      const wasFailed = (team.failedChallenges || []).some(
        (c) => c.challengeId === challenge.challengeId
      );

      let priorAttemptsCount = wasFailed ? 1 : 0;
      if (mongoose.connection.readyState === 1) {
        const dbPriorCount = await ChallengeAttempt.countDocuments({
          teamId: team.teamId,
          challengeId: challenge.challengeId,
        }).catch(() => 0);
        priorAttemptsCount = Math.max(priorAttemptsCount, dbPriorCount);
      }

      const attemptNumber = alreadyPurchased
        ? Number(existingPurchasedEntry?.attemptNumber || priorAttemptsCount || 1)
        : priorAttemptsCount + 1;
      const isReattempt = Boolean(priorAttemptsCount > 0 || wasFailed || isReattemptRequested);

      // Enforce Tactical Diversity Rotation Protocol & Cooldown Timeout
      const candidateGt = normalizeGameType(challenge.gameType);

      // 1. Check if gameType is under active tactical timeout cooldown (5-min timeout after 5 solved)
      if (team.gameCooldowns && team.gameCooldowns[candidateGt]) {
        const cooldownEndMs = new Date(team.gameCooldowns[candidateGt]).getTime();
        if (cooldownEndMs > Date.now()) {
          const remSec = Math.ceil((cooldownEndMs - Date.now()) / 1000);
          const mins = Math.floor(remSec / 60);
          const secs = remSec % 60;
          const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
          const gameTitle = getGameLabel(candidateGt);
          const cooldownMins = getConsecutiveGamesCooldownMinutes();
          const err = new Error(
            `TACTICAL COOLDOWN ACTIVE: Your squad has solved 5 ${gameTitle} questions! This game engine is locked for a ${cooldownMins}-minute timeout. Time remaining: ${timeStr}. Please select a different game type.`
          );
          err.statusCode = 403;
          err.code = 'GAME_TYPE_COOLDOWN_ACTIVE';
          err.gameType = candidateGt;
          err.gameLabel = gameTitle;
          err.cooldownRemainingSeconds = remSec;
          throw err;
        }
      }

      // 2. Check consecutive streak lock (only for newly acquired challenges)
      if (!alreadyPurchased) {
        const streak = getTeamConsecutiveStreak(team);
        const maxAllowed = streak.maxAllowed || getMaxConsecutiveGames();
        if (streak.isLocked && streak.gameType === candidateGt) {
          const gameTitle = streak.gameLabel || getGameLabel(candidateGt);
          const err = new Error(
            `TACTICAL DIVERSITY LOCK: Your squad has played ${streak.count} games of ${gameTitle} in a row! To maintain arena competition, you must play a different game type before returning.`
          );
          err.statusCode = 403;
          err.code = 'CONSECUTIVE_GAME_LIMIT_REACHED';
          err.gameType = candidateGt;
          err.gameLabel = gameTitle;
          err.count = streak.count;
          err.limit = maxAllowed;
          throw err;
        }
      }

      const normalizedRisk = normalizeRiskTier(challenge.risk);
      const now = new Date();
      const timeLimitSeconds = calculateChallengeTimeLimit(
        challenge.gameType,
        challenge.difficulty,
        challenge.timeLimit
      );

      let effectiveCost = Number(existingPurchasedEntry?.cost ?? challenge.cost ?? 0);
      let creditResult = null;

      // Only deduct team credits if this challenge is not already purchased by the team
      if (!alreadyPurchased) {
        effectiveCost = isReattempt
          ? creditsConfig.calculateReattemptCost(challenge.cost, Math.max(1, priorAttemptsCount))
          : Number(challenge.cost || 0);
        const txType = isReattempt
          ? CREDIT_TRANSACTION_TYPES.REATTEMPT
          : CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE;

        creditResult = await CreditService.recordTransaction({
          teamDoc: team,
          type: txType,
          amount: effectiveCost,
          relatedChallenge: {
            challengeId: challenge.challengeId,
            title: challenge.title,
            category: challenge.category,
          },
          summary: isReattempt
            ? `REATTEMPT #${attemptNumber} PURCHASED: ${challenge.title} (-${effectiveCost} CR)`
            : buyOnly
              ? `CHALLENGE PURCHASED (SAVED FOR LATER): ${challenge.title} (-${effectiveCost} CR)`
              : `CHALLENGE ACQUIRED: ${challenge.title} (-${effectiveCost} CR)`,
          autoSaveTeam: false,
        });

        if (isReattempt) {
          team.stats.reattemptsCount = Number(team.stats.reattemptsCount || 0) + 1;
        }

        applyTeamRiskTelemetry(team, {
          risk: normalizedRisk,
          attemptIncrement: 1,
          creditsLost: effectiveCost,
          setActiveRiskProfile: !buyOnly,
        });

        // Add to team's shared purchasedChallenges pool
        team.purchasedChallenges.unshift({
          challengeId: challenge.challengeId,
          title: challenge.title,
          category: challenge.category,
          description: challenge.description,
          difficulty: challenge.difficulty,
          risk: normalizedRisk,
          cost: effectiveCost,
          reward: challenge.reward,
          penalty: challenge.penalty || 100,
          timeLimit: timeLimitSeconds,
          gameType: challenge.gameType,
          gameConfig: challenge.gameConfig || {},
          enabled: challenge.enabled,
          available: challenge.available,
          attemptNumber,
          purchasedByMemberId: resolvedMemberId,
          purchasedByMemberName: resolvedMemberName,
          timestamp: now,
        });
        team.markModified('purchasedChallenges');

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.PURCHASE,
          actorType: 'TEAM',
          actorId: team.teamId,
          teamId: team.teamId,
          challengeId: challenge.challengeId,
          attemptNumber,
          creditsDelta: -effectiveCost,
          balanceAfter: team.credits,
          summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} purchased ${
            isReattempt ? `reattempt #${attemptNumber}` : 'challenge'
          } [${challenge.challengeId}] ${challenge.title} for ${effectiveCost} CR${
            buyOnly ? ' (saved for later)' : ''
          }`,
          metadata: {
            baseCost: challenge.cost,
            effectiveCost,
            isReattempt,
            attemptNumber,
            buyOnly,
            risk: normalizedRisk,
            memberId: resolvedMemberId,
            memberName: resolvedMemberName,
          },
        });
      }

      // If buyOnly is true, save team without starting/overwriting activeAttempt
      if (buyOnly) {
        await team.save();
        return {
          team,
          challenge,
          creditResult,
          activeAttempt: team.activeAttempt,
        };
      }

      const expiresAt = new Date(now.getTime() + timeLimitSeconds * 1000);
      const attemptId = `ATT-${Date.now().toString().slice(-5)}-${Math.random()
        .toString(36)
        .slice(2, 5)
        .toUpperCase()}`;

      // Method B: Assign a per-team randomized variant / question pool draw
      const fullChallengeForVariant =
        (await ChallengeService.getChallengeById(challenge.challengeId, {
          includeSolution: true,
        })) || challenge;
      const assignedVariant = assignVariantForTeamAttempt(fullChallengeForVariant, {
        teamId: team.teamId,
        attemptNumber,
      });

      const sessionGameConfig = assignedVariant.gameConfig || challenge.gameConfig || {};
      const sessionSolutionConfig =
        assignedVariant.solutionConfig || fullChallengeForVariant?.solutionConfig || {};
      const sessionDescription =
        sessionGameConfig.variantDescription || challenge.description;

      team.currentChallenge = {
        challengeId: challenge.challengeId,
        title: challenge.title,
        category: challenge.category,
        description: sessionDescription,
        difficulty: challenge.difficulty,
        risk: normalizedRisk,
        cost: effectiveCost,
        reward: challenge.reward,
        penalty: challenge.penalty || 100,
        timeLimit: timeLimitSeconds,
        gameType: challenge.gameType,
        gameConfig: sessionGameConfig,
        enabled: challenge.enabled,
        available: challenge.available,
        timestamp: now,
      };

      const maxHints = Number(
        sessionSolutionConfig?.hints?.length || sessionGameConfig?.maxHints || 2
      );

      const newAttemptObj = {
        attemptId,
        attemptNumber,
        variantId: assignedVariant.variantId || 'DEFAULT',
        challengeId: challenge.challengeId,
        title: challenge.title,
        category: challenge.category,
        difficulty: challenge.difficulty,
        risk: normalizedRisk,
        costPaid: effectiveCost,
        potentialReward: challenge.reward,
        penaltyOnFail: challenge.penalty || 100,
        timeLimit: timeLimitSeconds,
        gameType: challenge.gameType,
        gameConfig: sessionGameConfig,
        solutionConfig: sessionSolutionConfig,
        maxHints,
        hintsUnlocked: 0,
        unlockedHints: [],
        extraTimeMinutes: 0,
        activeAbilities: [],
        isReattempt,
        assignedMemberId: resolvedMemberId,
        assignedMemberName: resolvedMemberName,
        startedAt: now,
        expiresAt,
        status: 'IN_PROGRESS',
      };

      team.activeAttempt = newAttemptObj;

      // Keep other teammates' concurrent attempts in activeAttempts while adding/replacing this challenge
      team.activeAttempts = (team.activeAttempts || []).filter(
        (a) => String(a.challengeId).toUpperCase() !== challenge.challengeId
      );
      team.activeAttempts.unshift(newAttemptObj);
      team.markModified('activeAttempts');

      await team.save();

      if (mongoose.connection.readyState === 1) {
        await ChallengeAttempt.create({
          attemptId,
          attemptNumber,
          teamId: team.teamId,
          challengeId: challenge.challengeId,
          title: challenge.title,
          category: challenge.category,
          difficulty: challenge.difficulty,
          risk: normalizedRisk,
          gameType: challenge.gameType,
          gameConfig: sessionGameConfig,
          costPaid: effectiveCost,
          potentialReward: challenge.reward,
          penaltyOnFail: challenge.penalty || 100,
          rewardPenaltyDelta: 0,
          timeLimit: timeLimitSeconds,
          hintsUnlocked: 0,
          unlockedHints: [],
          extraTimeMinutes: 0,
          isReattempt,
          assignedMemberId: resolvedMemberId,
          assignedMemberName: resolvedMemberName,
          startedAt: now,
          expiresAt,
          result: 'IN_PROGRESS',
          status: 'IN_PROGRESS',
          timestamp: now,
        }).catch((err) => {
          logger.warn('SESSION', `ChallengeAttempt record warning: ${err.message}`);
        });
      }

      await AuditService.record({
        action: AUDIT_ACTION_TYPES.START,
        actorType: 'TEAM',
        actorId: team.teamId,
        teamId: team.teamId,
        challengeId: challenge.challengeId,
        attemptId,
        attemptNumber,
        creditsDelta: 0,
        balanceAfter: team.credits,
        summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} started session [${attemptId}] (Attempt #${attemptNumber}, Variant: ${assignedVariant.variantId || 'DEFAULT'}) on [${challenge.challengeId}]`,
        metadata: {
          startedAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          timeLimit: timeLimitSeconds,
          variantId: assignedVariant.variantId || 'DEFAULT',
          memberId: resolvedMemberId,
          memberName: resolvedMemberName,
        },
      });

      return {
        team,
        challenge: {
          ...challenge,
          description: sessionDescription,
          gameConfig: sessionGameConfig,
        },
        creditResult,
        activeAttempt: newAttemptObj,
      };
    } finally {
      ChallengeService._acquisitionLocks.delete(acqLockKey);
    }
  }

  /**
   * Helper to resolve a specific active attempt from team.activeAttempts or team.activeAttempt
   */
  static findTargetActiveAttempt(team, requestedChallengeId = null) {
    if (!team) return null;
    const normalizedId = String(requestedChallengeId || '').trim().toUpperCase();
    if (normalizedId && Array.isArray(team.activeAttempts)) {
      const match = team.activeAttempts.find(
        (a) => String(a.challengeId || '').toUpperCase() === normalizedId
      );
      if (match) return match;
    }
    if (
      normalizedId &&
      team.activeAttempt &&
      String(team.activeAttempt.challengeId || '').toUpperCase() === normalizedId
    ) {
      return team.activeAttempt;
    }
    return team.activeAttempt || team.activeAttempts?.[0] || null;
  }

  /**
   * Server-controlled validation before charging credits for a Hint:
   * - Requires an active challenge session
   * - Ensures locked hint strings are NEVER exposed before purchase
   * - Prevents charging credits if all available hints are already unlocked
   */
  static async validateHintPurchaseEligibility(team, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    const activeId = targetAttempt?.challengeId || team?.currentChallenge?.challengeId;
    if (!activeId || !targetAttempt) {
      const err = new Error(
        'Cannot purchase a hint: no active challenge session is currently in progress.'
      );
      err.statusCode = 400;
      err.code = 'NO_ACTIVE_CHALLENGE_FOR_HINT';
      throw err;
    }

    const fullChallenge = await ChallengeService.getChallengeById(activeId, {
      includeSolution: true,
    });
    const hintsPool =
      (Array.isArray(targetAttempt.solutionConfig?.hints) &&
      targetAttempt.solutionConfig.hints.length > 0
        ? targetAttempt.solutionConfig.hints
        : fullChallenge?.solutionConfig?.hints) || [
        `HINT 01 // Verify the target syntax and constraints in ${targetAttempt.title || activeId}.`,
        `HINT 02 // Cross-check the sector reference telemetry in the module header.`,
      ];

    const currentUnlockedCount = Array.isArray(targetAttempt.unlockedHints)
      ? targetAttempt.unlockedHints.length
      : Number(targetAttempt.hintsUnlocked || 0);

    if (currentUnlockedCount >= hintsPool.length) {
      const err = new Error(
        `All ${hintsPool.length} intelligence hints for ${targetAttempt.title || activeId} have already been decrypted.`
      );
      err.statusCode = 409;
      err.code = 'ALL_HINTS_ALREADY_UNLOCKED';
      throw err;
    }

    return {
      activeId,
      hintsPool,
      nextIndex: currentUnlockedCount,
      maxHints: hintsPool.length,
    };
  }

  /**
   * Server-controlled validation before charging credits for Extra Time
   */
  static validateExtraTimeEligibility(team, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    if (!targetAttempt) {
      const err = new Error(
        'Cannot purchase Extra Time: no active challenge session is currently in progress.'
      );
      err.statusCode = 400;
      err.code = 'NO_ACTIVE_CHALLENGE_FOR_EXTRA_TIME';
      throw err;
    }
    return true;
  }

  /**
   * Server-authoritative Hint Decryption for the Active Challenge Session.
   * Only reveals the single purchased hint string after credits are deducted.
   */
  static async unlockNextHintForTeam(team, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    const activeId = targetAttempt?.challengeId || team.currentChallenge?.challengeId;
    if (!activeId || !targetAttempt) return null;

    const fullChallenge = await ChallengeService.getChallengeById(activeId, {
      includeSolution: true,
    });
    const hintsPool =
      (Array.isArray(targetAttempt.solutionConfig?.hints) &&
      targetAttempt.solutionConfig.hints.length > 0
        ? targetAttempt.solutionConfig.hints
        : fullChallenge?.solutionConfig?.hints) || [
        `HINT 01 // Verify the target syntax and constraints in ${targetAttempt.title || activeId}.`,
        `HINT 02 // Cross-check the sector reference telemetry in the module header.`,
      ];

    const existingHints = Array.isArray(targetAttempt?.unlockedHints)
      ? targetAttempt.unlockedHints
      : [];
    const currentCount = existingHints.length;
    const nextHint =
      hintsPool[Math.min(currentCount, hintsPool.length - 1)] ||
      `HINT // All available intelligence layers decrypted for ${activeId}.`;

    targetAttempt.maxHints = hintsPool.length;
    if (!existingHints.includes(nextHint)) {
      targetAttempt.unlockedHints = [...existingHints, nextHint];
    }
    targetAttempt.hintsUnlocked = targetAttempt.unlockedHints.length;

    if (
      team.activeAttempt &&
      String(team.activeAttempt.challengeId).toUpperCase() === String(activeId).toUpperCase()
    ) {
      team.activeAttempt.maxHints = targetAttempt.maxHints;
      team.activeAttempt.unlockedHints = targetAttempt.unlockedHints;
      team.activeAttempt.hintsUnlocked = targetAttempt.hintsUnlocked;
      team.markModified('activeAttempt');
    }
    team.markModified('activeAttempts');

    if (mongoose.connection.readyState === 1 && targetAttempt?.attemptId) {
      await ChallengeAttempt.findOneAndUpdate(
        { attemptId: targetAttempt.attemptId },
        {
          $set: {
            hintsUnlocked: targetAttempt.hintsUnlocked,
            unlockedHints: targetAttempt.unlockedHints,
          },
        }
      ).catch(() => {});
    }

    return nextHint;
  }

  /**
   * Server-authoritative Timer Extension (+Extra Time).
   * Client must NEVER be trusted to extend the timer directly.
   */
  static async extendSessionTimerForTeam(team, extraMinutes = 5, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    if (!targetAttempt) return null;

    const addMs = Number(extraMinutes || 5) * 60 * 1000;
    const now = new Date();
    const currentExpires = targetAttempt.expiresAt
      ? new Date(targetAttempt.expiresAt)
      : new Date(now.getTime() + Number(targetAttempt.timeLimit || 1200) * 1000);

    const baseTime = currentExpires > now ? currentExpires : now;
    const nextExpiresAt = new Date(baseTime.getTime() + addMs);

    targetAttempt.extraTimeMinutes =
      Number(targetAttempt.extraTimeMinutes || 0) + Number(extraMinutes || 5);
    targetAttempt.timeLimit =
      Number(targetAttempt.timeLimit || 1200) + Number(extraMinutes || 5) * 60;
    targetAttempt.expiresAt = nextExpiresAt;

    if (
      team.activeAttempt &&
      String(team.activeAttempt.challengeId).toUpperCase() ===
        String(targetAttempt.challengeId).toUpperCase()
    ) {
      team.activeAttempt.extraTimeMinutes = targetAttempt.extraTimeMinutes;
      team.activeAttempt.timeLimit = targetAttempt.timeLimit;
      team.activeAttempt.expiresAt = nextExpiresAt;
      team.markModified('activeAttempt');
    }
    if (
      team.currentChallenge &&
      String(team.currentChallenge.challengeId).toUpperCase() ===
        String(targetAttempt.challengeId).toUpperCase()
    ) {
      team.currentChallenge.timeLimit = targetAttempt.timeLimit;
      team.markModified('currentChallenge');
    }
    team.markModified('activeAttempts');

    if (mongoose.connection.readyState === 1 && targetAttempt.attemptId) {
      await ChallengeAttempt.findOneAndUpdate(
        { attemptId: targetAttempt.attemptId },
        {
          $set: {
            extraTimeMinutes: targetAttempt.extraTimeMinutes,
            timeLimit: targetAttempt.timeLimit,
            expiresAt: nextExpiresAt,
          },
        }
      ).catch(() => {});
    }

    return {
      startedAt: targetAttempt.startedAt,
      expiresAt: nextExpiresAt,
      timeLimit: targetAttempt.timeLimit,
      extraTimeMinutes: targetAttempt.extraTimeMinutes,
    };
  }

  /**
   * Server-authoritative Challenge Submission & Answer Validation.
   * Client NEVER determines success, reward, penalty, or score.
   * Prevents duplicate submissions and supports:
   * - SUCCESS
   * - FAILED
   * - TIMEOUT
   * - ABANDONED
   */
  static async evaluateAndCompleteSession({
    teamDoc,
    teamId,
    challengeId,
    attemptId,
    submission,
    simulateFailure = false,
    outcomeOverride = null, // 'TIMEOUT' | 'ABANDONED' | null
    operative = null,
  }) {
    const resolvedTeamId = String(teamDoc?.teamId || teamId || '')
      .trim()
      .toUpperCase();
    const lockChallengeSuffix = String(challengeId || attemptId || 'ACTIVE')
      .trim()
      .toUpperCase();
    const teamLockKey = `${resolvedTeamId}:${lockChallengeSuffix}:SUBMIT`;

    if (ChallengeService._submissionLocks.has(teamLockKey)) {
      const err = new Error(
        'Duplicate submission blocked: NEXUS Core is currently evaluating this session.'
      );
      err.statusCode = 409;
      err.code = 'DUPLICATE_SUBMISSION_IN_FLIGHT';
      throw err;
    }

    ChallengeService._submissionLocks.add(teamLockKey);

    try {
      const team =
        teamDoc ||
        (await Team.findOne({
          teamId: resolvedTeamId,
        }));

      if (!team) {
        const err = new Error('Team not found.');
        err.statusCode = 404;
        throw err;
      }

      // Resolve the specific active attempt from activeAttempts or activeAttempt
      const requestedIdUpper = String(challengeId || '').trim().toUpperCase();
      const requestedAttemptId = String(attemptId || '').trim();

      let matchedAttemptDoc = null;
      if (Array.isArray(team.activeAttempts) && team.activeAttempts.length > 0) {
        if (requestedAttemptId) {
          matchedAttemptDoc = team.activeAttempts.find(
            (a) => String(a.attemptId || '').trim() === requestedAttemptId
          );
        }
        if (!matchedAttemptDoc && requestedIdUpper) {
          matchedAttemptDoc = team.activeAttempts.find(
            (a) => String(a.challengeId || '').toUpperCase() === requestedIdUpper
          );
        }
      }
      if (!matchedAttemptDoc && team.activeAttempt) {
        const matchesAttemptId =
          !requestedAttemptId ||
          String(team.activeAttempt.attemptId || '').trim() === requestedAttemptId;
        const matchesChallengeId =
          !requestedIdUpper ||
          String(team.activeAttempt.challengeId || '').toUpperCase() === requestedIdUpper;
        if (matchesAttemptId && matchesChallengeId) {
          matchedAttemptDoc = team.activeAttempt;
        }
      }
      if (
        !matchedAttemptDoc &&
        !requestedAttemptId &&
        !requestedIdUpper &&
        Array.isArray(team.activeAttempts) &&
        team.activeAttempts.length > 0
      ) {
        matchedAttemptDoc = team.activeAttempts[0];
      }

      // Prevent duplicate or stale submission/timeout if the requested attempt is no longer active
      if (!matchedAttemptDoc) {
        const err = new Error(
          'Duplicate or stale submission blocked: no active challenge session matches this request.'
        );
        err.statusCode = 409;
        err.code = 'DUPLICATE_SUBMISSION_BLOCKED';
        throw err;
      }

      const activeAttemptSnapshot = matchedAttemptDoc
        ? typeof matchedAttemptDoc.toObject === 'function'
          ? matchedAttemptDoc.toObject()
          : { ...matchedAttemptDoc }
        : null;

      const resolvedAttemptId =
        activeAttemptSnapshot?.attemptId || attemptId || `ATT-${Date.now().toString().slice(-5)}`;
      const targetChallengeId =
        activeAttemptSnapshot?.challengeId ||
        challengeId ||
        team.currentChallenge?.challengeId ||
        'CHG-PUZ-05';

      // Check if client tried to submit for a different attemptId that already closed
      if (
        attemptId &&
        activeAttemptSnapshot?.attemptId &&
        String(attemptId).trim() !== String(activeAttemptSnapshot.attemptId).trim()
      ) {
        const err = new Error(
          `Session attempt [${attemptId}] is no longer active or was already evaluated.`
        );
        err.statusCode = 409;
        err.code = 'ATTEMPT_MISMATCH_OR_CLOSED';
        throw err;
      }

      // Check MongoDB ChallengeAttempt record for already-evaluated status
      if (mongoose.connection.readyState === 1 && resolvedAttemptId) {
        const existingAttempt = await ChallengeAttempt.findOne({
          attemptId: resolvedAttemptId,
        }).lean();
        if (
          existingAttempt &&
          ['SUCCESS', 'FAILED', 'TIMEOUT', 'ABANDONED', 'COMPLETED', 'EXPIRED'].includes(
            existingAttempt.status
          )
        ) {
          const err = new Error(
            `Attempt [${resolvedAttemptId}] has already been finalized with status [${existingAttempt.status}].`
          );
          err.statusCode = 409;
          err.code = 'ATTEMPT_ALREADY_FINALIZED';
          throw err;
        }
      }

      const fullChallenge =
        (await ChallengeService.getChallengeById(targetChallengeId, { includeSolution: true })) ||
        DEFAULT_CHALLENGE_CATALOG[0];

      // Merge per-team assigned variant gameConfig & solutionConfig so validation checks the team's exact question pool draw
      const attemptGameConfig =
        activeAttemptSnapshot?.gameConfig && Object.keys(activeAttemptSnapshot.gameConfig).length > 0
          ? { ...(fullChallenge.gameConfig || {}), ...activeAttemptSnapshot.gameConfig }
          : fullChallenge.gameConfig || {};

      const attemptSolutionConfig =
        activeAttemptSnapshot?.solutionConfig &&
        Object.keys(activeAttemptSnapshot.solutionConfig).length > 0
          ? { ...(fullChallenge.solutionConfig || {}), ...activeAttemptSnapshot.solutionConfig }
          : { ...(fullChallenge.solutionConfig || {}) };

      if (
        Array.isArray(attemptGameConfig.answerKey) &&
        attemptGameConfig.answerKey.length > 0 &&
        (!Array.isArray(attemptSolutionConfig.expectedAnswers) ||
          attemptSolutionConfig.expectedAnswers.length === 0)
      ) {
        attemptSolutionConfig.expectedAnswers = attemptGameConfig.answerKey;
      }

      const effectiveChallenge = {
        ...fullChallenge,
        gameConfig: attemptGameConfig,
        solutionConfig: attemptSolutionConfig,
      };
      const assignedVariantId =
        activeAttemptSnapshot?.variantId || attemptGameConfig?.variantId || 'DEFAULT';

      const normalizedRisk = normalizeRiskTier(fullChallenge.risk);

      // Determine server-authoritative expiration
      const now = new Date();
      const startedAt = activeAttemptSnapshot?.startedAt
        ? new Date(activeAttemptSnapshot.startedAt)
        : new Date(now.getTime() - 60 * 1000);
      const timeLimit = Number(
        activeAttemptSnapshot?.timeLimit || fullChallenge.timeLimit || 1200
      );
      const expiresAt = activeAttemptSnapshot?.expiresAt
        ? new Date(activeAttemptSnapshot.expiresAt)
        : new Date(startedAt.getTime() + timeLimit * 1000);
      const solveDurationSeconds = Math.max(
        0,
        Math.round((now.getTime() - startedAt.getTime()) / 1000)
      );

      // Only treat as TIMEOUT when explicitly invoked by the timeout handler/watchdog,
      // never when an operative's actual solution submission arrives at the wire.
      const isTimeout = outcomeOverride === 'TIMEOUT';
      const isAbandoned = !isTimeout && outcomeOverride === 'ABANDONED';

      // Extract raw answer from submission object or string
      const rawAnswer =
        typeof submission === 'object' && submission !== null
          ? String(
              submission.answer ??
                submission.solution ??
                submission.word ??
                submission.value ??
                ''
            ).trim()
          : String(submission ?? '').trim();

      const hasStructuredGamePayload =
        typeof submission === 'object' &&
        submission !== null &&
        Boolean(
          submission.grid ||
            submission.board ||
            submission.words ||
            submission.steps ||
            submission.patches ||
            submission.path ||
            submission.queens ||
            submission.answers ||
            submission.rounds
        );

      const isAdminForceSuccess = outcomeOverride === 'SUCCESS';
      if (
        !rawAnswer &&
        !hasStructuredGamePayload &&
        !simulateFailure &&
        !isTimeout &&
        !isAbandoned &&
        !isAdminForceSuccess
      ) {
        const err = new Error('Submission payload cannot be empty.');
        err.statusCode = 400;
        err.code = 'EMPTY_SUBMISSION';
        throw err;
      }

      const attemptNumber = Math.max(1, Number(activeAttemptSnapshot?.attemptNumber || 1));
      const costPaid = Number(activeAttemptSnapshot?.costPaid ?? fullChallenge.cost ?? 0);
      const resolvedMemberId =
        String(operative?.memberId || activeAttemptSnapshot?.assignedMemberId || '').trim() || null;
      const resolvedMemberName =
        String(
          operative?.memberName ||
            operative?.name ||
            activeAttemptSnapshot?.assignedMemberName ||
            ''
        ).trim() || null;

      const normalizedSubmitted = rawAnswer.toUpperCase().replace(/\s+/g, ' ').trim();
      const expected = String(effectiveChallenge.solutionConfig?.expectedAnswer || '')
        .toUpperCase()
        .trim();
      const acceptedList = (effectiveChallenge.solutionConfig?.acceptedAnswers || [expected]).map(
        (a) => String(a).toUpperCase().trim()
      );

      // Server-authoritative correctness check via GameRegistry + accepted answer tokens
      const isExplicitFail =
        !isAdminForceSuccess &&
        (Boolean(simulateFailure) ||
          normalizedSubmitted.includes('FAIL:') ||
          normalizedSubmitted === 'FAIL' ||
          isTimeout ||
          isAbandoned);

      const gameRegistryEvaluation = !isExplicitFail
        ? evaluateGameSubmissionServer(submission, effectiveChallenge)
        : { valid: false };

      const isAnswerMatch =
        isAdminForceSuccess ||
        (!isExplicitFail &&
          (Boolean(gameRegistryEvaluation?.valid) ||
            acceptedList.includes(normalizedSubmitted) ||
            (expected && normalizedSubmitted === expected) ||
            (expected && normalizedSubmitted === `NEXUS{${expected}}`) ||
            normalizedSubmitted === 'NEXUS{CORE_SYNCHRONIZED_2026}'));

      const passed = Boolean(isAnswerMatch);
      const relatedChallenge = {
        challengeId: fullChallenge.challengeId,
        title: fullChallenge.title,
        category: fullChallenge.category,
      };

      await AuditService.record({
        action: AUDIT_ACTION_TYPES.SUBMISSION,
        actorType: 'TEAM',
        actorId: team.teamId,
        teamId: team.teamId,
        challengeId: fullChallenge.challengeId,
        attemptId: resolvedAttemptId,
        attemptNumber,
        creditsDelta: 0,
        balanceAfter: team.credits,
        summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} submitted solution for [${fullChallenge.challengeId}] ${fullChallenge.title} (Attempt #${attemptNumber}, ${solveDurationSeconds}s)`,
        metadata: {
          attemptId: resolvedAttemptId,
          attemptNumber,
          variantId: assignedVariantId,
          title: fullChallenge.title,
          difficulty: fullChallenge.difficulty,
          gameType: fullChallenge.gameType,
          solveDurationSeconds,
          timeLimit,
          cost: costPaid,
          isTimeout,
          isAbandoned,
          memberId: resolvedMemberId,
          memberName: resolvedMemberName,
        },
      });

      let creditResult = null;
      let evaluationResult = null;

      if (passed) {
        const baseReward = Number(fullChallenge.reward) || 500;
        const rewardRatio =
          typeof gameRegistryEvaluation?.rewardRatio === 'number' &&
          gameRegistryEvaluation.rewardRatio > 0 &&
          gameRegistryEvaluation.rewardRatio <= 1
            ? gameRegistryEvaluation.rewardRatio
            : 1;
        const reward = Math.max(1, Math.round(baseReward * rewardRatio));
        const hasScoreBreakdown =
          typeof gameRegistryEvaluation?.rightCount === 'number' &&
          typeof gameRegistryEvaluation?.totalQuestions === 'number';
        const scoreTag = hasScoreBreakdown
          ? ` [${gameRegistryEvaluation.rightCount}/${gameRegistryEvaluation.totalQuestions} correct]`
          : '';
        const progressDelta = 14;
        const nextProgress = Math.min(
          100,
          Number(team.stats.coreProgressPercent || 50) + progressDelta
        );

        creditResult = await CreditService.recordTransaction({
          teamDoc: team,
          type: CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD,
          amount: reward,
          relatedChallenge,
          summary: `CHALLENGE SOLVED${resolvedMemberName ? ` (${resolvedMemberName})` : ''}: ${fullChallenge.title}${scoreTag} (+${reward} CR)`,
          autoSaveTeam: false,
        });

        team.stats.totalSolved = Number(team.stats.totalSolved || 0) + 1;
        team.stats.coreProgressPercent = nextProgress;

        applyTeamRiskTelemetry(team, {
          risk: normalizedRisk,
          successIncrement: 1,
          creditsGained: reward,
        });

        team.completedChallenges.unshift({
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          description: fullChallenge.description,
          cost: costPaid,
          reward,
          penalty: fullChallenge.penalty,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          timeLimit: fullChallenge.timeLimit,
          gameType: fullChallenge.gameType,
          attemptNumber,
          solvedByMemberId: resolvedMemberId,
          solvedByMemberName: resolvedMemberName,
          timestamp: now,
        });

        // Trigger cooldown timeout after every 5 questions solved of the same game (configurable through admin)
        const solvedGt = normalizeGameType(fullChallenge.gameType);
        const solvedCountForGt = (team.completedChallenges || []).filter(
          (c) => normalizeGameType(c.gameType) === solvedGt
        ).length;
        const maxConsecutive = getMaxConsecutiveGames(); // default 5
        const cooldownSec = getConsecutiveGamesCooldownSeconds(); // default 300s (5 minutes)

        if (cooldownSec > 0 && maxConsecutive > 0 && solvedCountForGt % maxConsecutive === 0) {
          if (!team.gameCooldowns) {
            team.gameCooldowns = {};
          }
          const cooldownExpiresAt = new Date(now.getTime() + cooldownSec * 1000);
          team.gameCooldowns[solvedGt] = cooldownExpiresAt;
          team.markModified('gameCooldowns');
          logger.info(
            'COOLDOWN',
            `Team [${team.teamId}] completed ${solvedCountForGt} questions of ${getGameLabel(
              solvedGt
            )}. Tactical cooldown activated until ${cooldownExpiresAt.toISOString()}`
          );
        }

        // Remove from failedChallenges if it was previously failed and now solved
        team.failedChallenges = (team.failedChallenges || []).filter(
          (f) => f.challengeId !== fullChallenge.challengeId
        );

        evaluationResult = {
          attemptId: resolvedAttemptId,
          attemptNumber,
          passed: true,
          result: 'SUCCESS',
          status: 'SUCCESS',
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          gameType: fullChallenge.gameType,
          cost: costPaid,
          submittedAnswer: rawAnswer || '[ADMIN_ADJUDICATED_PASS]',
          creditsDelta: reward,
          rewardGranted: reward,
          baseReward,
          rewardRatio,
          rightCount: hasScoreBreakdown ? gameRegistryEvaluation.rightCount : undefined,
          wrongCount: hasScoreBreakdown ? gameRegistryEvaluation.wrongCount : undefined,
          totalQuestions: hasScoreBreakdown ? gameRegistryEvaluation.totalQuestions : undefined,
          penaltyApplied: 0,
          balanceAfter: team.credits,
          coreProgressDelta: progressDelta,
          coreProgressAfter: nextProgress,
          solvedByMemberId: resolvedMemberId,
          solvedByMemberName: resolvedMemberName,
          startedAt: startedAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
          submittedAt: now.toISOString(),
          completedAt: now.toISOString(),
          timeLimit,
          solveDurationSeconds,
          message: `VERIFIED BY NEXUS CORE // Solution accepted for ${fullChallenge.title}${scoreTag}. +${reward} CR credited to squad ledger.`,
          timestamp: now.toISOString(),
        };

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.SUCCESS,
          actorType: 'TEAM',
          actorId: team.teamId,
          teamId: team.teamId,
          challengeId: fullChallenge.challengeId,
          attemptId: resolvedAttemptId,
          attemptNumber,
          creditsDelta: reward,
          balanceAfter: team.credits,
          summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} succeeded on [${fullChallenge.challengeId}] ${fullChallenge.title}${scoreTag} in ${solveDurationSeconds}s (Attempt #${attemptNumber}, +${reward} CR)`,
          metadata: {
            cost: costPaid,
            reward,
            baseReward,
            rewardRatio,
            rightCount: hasScoreBreakdown ? gameRegistryEvaluation.rightCount : undefined,
            totalQuestions: hasScoreBreakdown ? gameRegistryEvaluation.totalQuestions : undefined,
            attemptNumber,
            variantId: assignedVariantId,
            title: fullChallenge.title,
            difficulty: fullChallenge.difficulty,
            gameType: fullChallenge.gameType,
            solveDurationSeconds,
            timeLimit,
            memberId: resolvedMemberId,
            memberName: resolvedMemberName,
          },
        });
      } else {
        const penalty = Number(fullChallenge.penalty) || 100;
        const canonicalFailStatus = isTimeout
          ? 'TIMEOUT'
          : isAbandoned
            ? 'ABANDONED'
            : 'FAILED';

        const summaryPrefix =
          canonicalFailStatus === 'TIMEOUT'
            ? 'CHALLENGE TIMEOUT'
            : canonicalFailStatus === 'ABANDONED'
              ? 'CHALLENGE ABANDONED'
              : 'CHALLENGE FAILED';

        creditResult = await CreditService.recordTransaction({
          teamDoc: team,
          type: CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY,
          amount: penalty,
          relatedChallenge,
          summary: `${summaryPrefix}: ${fullChallenge.title} (-${penalty} CR)`,
          autoSaveTeam: false,
        });

        team.stats.totalFailed = Number(team.stats.totalFailed || 0) + 1;

        applyTeamRiskTelemetry(team, {
          risk: normalizedRisk,
          creditsLost: penalty,
        });

        const alreadyInFailed = (team.failedChallenges || []).some(
          (f) => f.challengeId === fullChallenge.challengeId
        );
        if (!alreadyInFailed) {
          team.failedChallenges.unshift({
            challengeId: fullChallenge.challengeId,
            title: fullChallenge.title,
            category: fullChallenge.category,
            description: fullChallenge.description,
            cost: costPaid,
            reward: fullChallenge.reward,
            penalty,
            difficulty: fullChallenge.difficulty,
            risk: normalizedRisk,
            timeLimit: fullChallenge.timeLimit,
            gameType: fullChallenge.gameType,
            attemptNumber,
            timestamp: now,
          });
        }

        const validatorReasonDetail =
          canonicalFailStatus === 'FAILED' && gameRegistryEvaluation?.reason
            ? `${gameRegistryEvaluation.reason} `
            : '';

        const statusMessage =
          canonicalFailStatus === 'TIMEOUT'
            ? `SESSION TIMEOUT // Server timer expired for ${fullChallenge.title}. -${penalty} CR penalty applied.`
            : canonicalFailStatus === 'ABANDONED'
              ? `SESSION ABANDONED // Operative aborted active session for ${fullChallenge.title}. -${penalty} CR penalty applied.`
              : `VERIFICATION FAILED // ${validatorReasonDetail}Submitted payload rejected for ${fullChallenge.title}. -${penalty} CR penalty applied.`;

        evaluationResult = {
          attemptId: resolvedAttemptId,
          attemptNumber,
          passed: false,
          result: canonicalFailStatus,
          status: canonicalFailStatus,
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          gameType: fullChallenge.gameType,
          cost: costPaid,
          submittedAnswer:
            rawAnswer || (isTimeout ? '[SERVER_TIMEOUT]' : '[SESSION_ABANDONED]'),
          creditsDelta: -penalty,
          rewardGranted: 0,
          penaltyApplied: penalty,
          balanceAfter: team.credits,
          coreProgressDelta: 0,
          coreProgressAfter: team.stats.coreProgressPercent || 50,
          startedAt: startedAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
          submittedAt: now.toISOString(),
          completedAt: now.toISOString(),
          timeLimit,
          solveDurationSeconds,
          reason: gameRegistryEvaluation?.reason || null,
          message: statusMessage,
          timestamp: now.toISOString(),
        };

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.FAILURE,
          actorType: 'TEAM',
          actorId: team.teamId,
          teamId: team.teamId,
          challengeId: fullChallenge.challengeId,
          attemptId: resolvedAttemptId,
          attemptNumber,
          creditsDelta: -penalty,
          balanceAfter: team.credits,
          summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} failed [${fullChallenge.challengeId}] ${fullChallenge.title} with [${canonicalFailStatus}] (Attempt #${attemptNumber}, -${penalty} CR)`,
          metadata: {
            cost: costPaid,
            penalty,
            status: canonicalFailStatus,
            attemptNumber,
            variantId: assignedVariantId,
            title: fullChallenge.title,
            difficulty: fullChallenge.difficulty,
            gameType: fullChallenge.gameType,
            solveDurationSeconds,
            timeLimit,
            reason: gameRegistryEvaluation?.reason || null,
            memberId: resolvedMemberId,
            memberName: resolvedMemberName,
          },
        });
      }

      if (Array.isArray(team.purchasedChallenges)) {
        team.purchasedChallenges = team.purchasedChallenges.filter(
          (c) => String(c.challengeId).toUpperCase() !== fullChallenge.challengeId
        );
        team.markModified('purchasedChallenges');
      }

      if (Array.isArray(team.activeAttempts)) {
        team.activeAttempts = team.activeAttempts.filter(
          (a) => String(a.challengeId).toUpperCase() !== fullChallenge.challengeId
        );
        team.markModified('activeAttempts');
      }

      // Sync primary activeAttempt / currentChallenge to next remaining active attempt (if any)
      const nextRemainingAttempt = team.activeAttempts?.[0] || null;
      if (nextRemainingAttempt) {
        team.activeAttempt = nextRemainingAttempt;
        team.currentChallenge = {
          challengeId: nextRemainingAttempt.challengeId,
          title: nextRemainingAttempt.title,
          category: nextRemainingAttempt.category,
          difficulty: nextRemainingAttempt.difficulty,
          risk: nextRemainingAttempt.risk,
          cost: nextRemainingAttempt.costPaid,
          reward: nextRemainingAttempt.potentialReward,
          penalty: nextRemainingAttempt.penaltyOnFail,
          timeLimit: nextRemainingAttempt.timeLimit,
          gameType: nextRemainingAttempt.gameType,
          gameConfig: nextRemainingAttempt.gameConfig || {},
          timestamp: nextRemainingAttempt.startedAt || now,
        };
      } else {
        team.currentChallenge = null;
        team.activeAttempt = null;
      }
      await team.save();

      // Always record the attempt server-side in MongoDB (upsert ensures seed attempts are also saved)
      if (mongoose.connection.readyState === 1 && resolvedAttemptId) {
        await ChallengeAttempt.findOneAndUpdate(
          { attemptId: resolvedAttemptId },
          {
            $set: {
              attemptId: resolvedAttemptId,
              attemptNumber,
              teamId: team.teamId,
              challengeId: fullChallenge.challengeId,
              title: fullChallenge.title,
              category: fullChallenge.category,
              difficulty: fullChallenge.difficulty,
              risk: fullChallenge.risk,
              gameType: fullChallenge.gameType,
              gameConfig: activeAttemptSnapshot?.gameConfig || fullChallenge.gameConfig || {},
              costPaid,
              potentialReward: fullChallenge.reward,
              penaltyOnFail: fullChallenge.penalty || 100,
              rewardPenaltyDelta: evaluationResult.creditsDelta,
              timeLimit,
              hintsUnlocked: activeAttemptSnapshot?.hintsUnlocked || 0,
              unlockedHints: activeAttemptSnapshot?.unlockedHints || [],
              extraTimeMinutes: activeAttemptSnapshot?.extraTimeMinutes || 0,
              isReattempt: Boolean(activeAttemptSnapshot?.isReattempt),
              assignedMemberId: resolvedMemberId,
              assignedMemberName: resolvedMemberName,
              startedAt,
              expiresAt,
              submittedAt: now,
              completedAt: now,
              result: evaluationResult.status,
              status: evaluationResult.status,
              submission: submission ?? { outcome: evaluationResult.status },
              submittedPayload: submission ?? { outcome: evaluationResult.status },
              evaluationResult,
              timestamp: now,
            },
          },
          { upsert: true, new: true }
        ).catch((err) => {
          logger.warn('SESSION', `ChallengeAttempt finalize warning: ${err.message}`);
        });
      }

      return {
        team,
        creditResult,
        evaluationResult,
      };
    } finally {
      ChallengeService._submissionLocks.delete(teamLockKey);
    }
  }

  /**
   * Fetch recorded server-side attempts for a team (optionally filtered by challengeId)
   */
  static async getAttemptsForTeam(teamId, challengeId = null, limit = 15) {
    if (mongoose.connection.readyState !== 1) return [];
    const normalizedTeamId = String(teamId || '')
      .trim()
      .toUpperCase();
    const filter = { teamId: normalizedTeamId };
    if (challengeId) {
      filter.challengeId = String(challengeId).trim().toUpperCase();
    }

    const docs = await ChallengeAttempt.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return docs;
  }

  /**
   * Compute authoritative timer telemetry for an active attempt
   */
  static computeSessionTimerTelemetry(activeAttempt) {
    const serverNow = new Date();
    if (!activeAttempt || !activeAttempt.expiresAt) {
      return {
        hasActiveSession: false,
        serverTime: serverNow.toISOString(),
        startedAt: null,
        expiresAt: null,
        timeLimit: 0,
        remainingSeconds: 0,
        elapsedSeconds: 0,
        expired: false,
      };
    }

    const startedAt = activeAttempt.startedAt ? new Date(activeAttempt.startedAt) : serverNow;
    const expiresAt = new Date(activeAttempt.expiresAt);
    const timeLimit = Number(activeAttempt.timeLimit || 1200);
    const remainingMs = expiresAt.getTime() - serverNow.getTime();
    const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
    const elapsedSeconds = Math.max(
      0,
      Math.floor((serverNow.getTime() - startedAt.getTime()) / 1000)
    );

    return {
      hasActiveSession: true,
      attemptId: activeAttempt.attemptId,
      challengeId: activeAttempt.challengeId,
      serverTime: serverNow.toISOString(),
      startedAt: startedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      timeLimit,
      extraTimeMinutes: Number(activeAttempt.extraTimeMinutes || 0),
      remainingSeconds,
      elapsedSeconds,
      expired: remainingMs <= 0,
    };
  }
}

ChallengeService._acquisitionLocks = new Set();
ChallengeService._submissionLocks = new Set();

export { SUPPORTED_GAME_TYPES };
export default ChallengeService;

