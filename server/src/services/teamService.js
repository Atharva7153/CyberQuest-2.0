import mongoose from 'mongoose';
import { Team } from '../models/Team.js';
import { CreditTransaction } from '../models/CreditTransaction.js';
import { ChallengeAttempt } from '../models/ChallengeAttempt.js';
import { CreditService } from './creditService.js';
import {
  ChallengeService,
  DEFAULT_CHALLENGE_CATALOG,
  ensureDefaultChallengesSeeded,
  applyTeamRiskTelemetry,
  normalizeRiskTier,
} from './challengeService.js';
import {
  AbilityService,
  DEFAULT_ABILITY_CATALOG,
  ensureDefaultAbilitiesSeeded,
} from './abilityService.js';
import {
  normalizeAttemptHistory,
  buildTeamProgressSummary,
  buildCanonicalLiveFeed,
  buildActionLiveFeedEvents,
} from './progressHistoryService.js';
import {
  NexusCoreService,
  ensureNexusCoreSeeded,
} from './nexusCoreService.js';
import { AuditService, AUDIT_ACTION_TYPES } from './auditService.js';
import { computeGlobalArenaTimer } from './displayService.js';
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signTeamToken } from '../utils/jwt.js';
import { logger } from '../utils/logger.js';

export const CHALLENGE_CATALOG = DEFAULT_CHALLENGE_CATALOG;
export const ABILITY_CATALOG = DEFAULT_ABILITY_CATALOG;

const DEFAULT_ABILITIES = AbilityService.buildInitialTeamAbilitySlots(DEFAULT_ABILITY_CATALOG);

const buildSeedTeams = () => {
  const startingCredits = creditsConfig.getStartingCredits();
  const initialChallenge = CHALLENGE_CATALOG[0];

  return [
    {
      teamId: 'TEAM-CIPHER',
      teamName: 'CIPHER',
      plainPassword: 'NEXUS-2026',
      credits: startingCredits,
      status: 'ACTIVE',
      members: [
        { memberId: 'OP-01', name: 'OPERATIVE ALPHA (LEAD)', role: 'ARCHITECT', online: true },
        { memberId: 'OP-02', name: 'OPERATIVE VEX', role: 'CRYPTANALYST', online: false },
        { memberId: 'OP-03', name: 'OPERATIVE KIRA', role: 'SYSTEMS RECON', online: false },
        { memberId: 'OP-04', name: 'OPERATIVE AXIOM', role: 'STRATEGIST', online: false },
      ],
      currentChallenge: {
        ...initialChallenge,
        solutionConfig: undefined,
      },
      purchasedChallenges: [
        {
          ...initialChallenge,
          solutionConfig: undefined,
          attemptNumber: 1,
          timestamp: new Date(),
        },
      ],
      activeAttempt: {
        attemptId: 'ATT-901',
        challengeId: initialChallenge.challengeId,
        title: initialChallenge.title,
        category: initialChallenge.category,
        difficulty: initialChallenge.difficulty,
        risk: initialChallenge.risk,
        gameType: initialChallenge.gameType,
        gameConfig: initialChallenge.gameConfig,
        costPaid: initialChallenge.cost,
        potentialReward: initialChallenge.reward,
        penaltyOnFail: initialChallenge.penalty,
        timeLimit: initialChallenge.timeLimit,
        hintsUnlocked: 0,
        unlockedHints: [],
        extraTimeMinutes: 0,
        isReattempt: false,
        startedAt: new Date(),
        expiresAt: new Date(Date.now() + initialChallenge.timeLimit * 1000),
        status: 'IN_PROGRESS',
      },
      completedChallenges: [
        {
          challengeId: 'CHG-INIT-00',
          title: 'WORD GUESS (WARMUP)',
          category: 'LOGIC',
          cost: 150,
          reward: 400,
          penalty: 50,
          difficulty: 'LOW',
          risk: 'SAFE',
          gameType: 'wordGuess',
          timestamp: new Date(Date.now() - 1800 * 1000),
        },
      ],
      failedChallenges: [],
      abilities: DEFAULT_ABILITIES,
      nexusCore: {
        state: 'LOCKED',
        unlockedAt: null,
        activatedAt: null,
        completedAt: null,
        attemptsCount: 0,
        completionRank: null,
        proclamationCode: null,
      },
      stats: {
        totalSolved: 1,
        totalFailed: 0,
        creditsEarned: startingCredits + 400,
        creditsSpent: 500,
        penaltiesIncurred: 0,
        reattemptsCount: 0,
        hintsPurchased: 0,
        extraTimePurchased: 0,
        abilitiesUsed: 0,
        riskProfile: 'BALANCED',
        safeAttempts: 1,
        balancedAttempts: 1,
        aggressiveAttempts: 0,
        successByRisk: {
          SAFE: 1,
          BALANCED: 0,
          AGGRESSIVE: 0,
        },
        creditsByRisk: {
          SAFE: { gained: 400, lost: 150, net: 250 },
          BALANCED: { gained: 0, lost: initialChallenge.cost, net: -initialChallenge.cost },
          AGGRESSIVE: { gained: 0, lost: 0, net: 0 },
        },
        coreProgressPercent: 72,
        lastActionAt: new Date(),
        recentActivity: [
          {
            eventId: 'EVT-INIT-1',
            type: CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE,
            summary: `CHALLENGE PURCHASE: ${initialChallenge.title} (-${initialChallenge.cost} CR)`,
            creditsDelta: -initialChallenge.cost,
            balanceAfter: startingCredits,
            relatedChallenge: {
              challengeId: initialChallenge.challengeId,
              title: initialChallenge.title,
              category: initialChallenge.category,
            },
            timestamp: new Date(Date.now() - 600 * 1000),
          },
          {
            eventId: 'EVT-INIT-0',
            type: CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD,
            summary: 'CHALLENGE REWARD: WORD GUESS (WARMUP) (+400 CR)',
            creditsDelta: 400,
            balanceAfter: startingCredits + initialChallenge.cost,
            relatedChallenge: {
              challengeId: 'CHG-INIT-00',
              title: 'WORD GUESS (WARMUP)',
              category: 'LOGIC',
            },
            timestamp: new Date(Date.now() - 1800 * 1000),
          },
        ],
      },
    },
    {
      teamId: 'TEAM-VANGUARD',
      teamName: 'VANGUARD',
      plainPassword: 'NEXUS-2026',
      credits: startingCredits,
      status: 'ACTIVE',
      members: [
        { memberId: 'VG-01', name: 'OPERATIVE NOVA (LEAD)', role: 'COMMAND', online: false },
        { memberId: 'VG-02', name: 'OPERATIVE PULSE', role: 'LOGICIAN', online: false },
        { memberId: 'VG-03', name: 'OPERATIVE RIFT', role: 'ENGINEER', online: false },
        { memberId: 'VG-04', name: 'OPERATIVE ECHO', role: 'ANALYST', online: false },
      ],
      currentChallenge: null,
      purchasedChallenges: [],
      activeAttempt: null,
      completedChallenges: [],
      failedChallenges: [],
      abilities: DEFAULT_ABILITIES,
      nexusCore: {
        state: 'LOCKED',
        unlockedAt: null,
        activatedAt: null,
        completedAt: null,
        attemptsCount: 0,
        completionRank: null,
        proclamationCode: null,
      },
      stats: {
        totalSolved: 0,
        totalFailed: 0,
        creditsEarned: startingCredits,
        creditsSpent: 0,
        penaltiesIncurred: 0,
        reattemptsCount: 0,
        hintsPurchased: 0,
        extraTimePurchased: 0,
        abilitiesUsed: 0,
        riskProfile: 'SAFE',
        safeAttempts: 0,
        balancedAttempts: 0,
        aggressiveAttempts: 0,
        successByRisk: {
          SAFE: 0,
          BALANCED: 0,
          AGGRESSIVE: 0,
        },
        creditsByRisk: {
          SAFE: { gained: 0, lost: 0, net: 0 },
          BALANCED: { gained: 0, lost: 0, net: 0 },
          AGGRESSIVE: { gained: 0, lost: 0, net: 0 },
        },
        coreProgressPercent: 25,
        lastActionAt: new Date(),
        recentActivity: [],
      },
    },
  ];
};

let teamsSeeded = false;
let teamsSeedPromise = null;

export const ensureDefaultTeamsSeeded = async () => {
  if (mongoose.connection.readyState !== 1) return;
  if (teamsSeeded) return;
  if (teamsSeedPromise) return teamsSeedPromise;

  teamsSeedPromise = (async () => {
    try {
      await Promise.all([
        ensureDefaultChallengesSeeded(),
        ensureDefaultAbilitiesSeeded(),
        ensureNexusCoreSeeded(),
      ]);
      const seeds = buildSeedTeams();
    for (const seed of seeds) {
      let existing = await Team.findOne({ teamId: seed.teamId });
      if (!existing) {
        const passwordHash = await hashPassword(seed.plainPassword);
        const { plainPassword, ...teamData } = seed;
        existing = await Team.create({
          ...teamData,
          passwordHash,
        });
        logger.info(
          'SEED',
          `Seeded operative team [${seed.teamId}] with ${seed.credits} starting credits`
        );
      } else {
        let needsSave = false;

        const catalogMatch = existing.currentChallenge
          ? CHALLENGE_CATALOG.find(
              (c) => c.challengeId === existing.currentChallenge.challengeId
            )
          : null;

        if (
          existing.currentChallenge &&
          (catalogMatch?.gameType !== existing.currentChallenge.gameType ||
            catalogMatch?.title !== existing.currentChallenge.title ||
            (!existing.currentChallenge.gameConfig?.wordLength &&
              !existing.currentChallenge.gameConfig?.size &&
              !existing.currentChallenge.gameConfig?.rows &&
              !existing.currentChallenge.gameConfig?.aiSkill &&
              !existing.currentChallenge.gameConfig?.prompt))
        ) {
          // Upgrade any legacy active challenge to the Phase 19 GameRegistry schema & clear titles
          const match = catalogMatch || CHALLENGE_CATALOG[0];
          existing.currentChallenge = {
            ...match,
            solutionConfig: undefined,
            timestamp: new Date(),
          };
          existing.activeAttempt = {
            attemptId: existing.activeAttempt?.attemptId || 'ATT-901',
            challengeId: match.challengeId,
            title: match.title,
            category: match.category,
            difficulty: match.difficulty,
            risk: match.risk,
            gameType: match.gameType,
            gameConfig: match.gameConfig,
            costPaid: match.cost,
            potentialReward: match.reward,
            penaltyOnFail: match.penalty,
            timeLimit: match.timeLimit,
            maxHints: Number(match.gameConfig?.maxHints || 2),
            hintsUnlocked: existing.activeAttempt?.hintsUnlocked || 0,
            unlockedHints: existing.activeAttempt?.unlockedHints || [],
            extraTimeMinutes: existing.activeAttempt?.extraTimeMinutes || 0,
            activeAbilities: existing.activeAttempt?.activeAbilities || [],
            isReattempt: Boolean(existing.activeAttempt?.isReattempt),
            startedAt: existing.activeAttempt?.startedAt || new Date(),
            expiresAt: new Date(Date.now() + match.timeLimit * 1000),
            status: 'IN_PROGRESS',
          };
          needsSave = true;
        }

        // Ensure currentChallenge is also reflected in purchasedChallenges
        if (existing.currentChallenge?.challengeId) {
          if (!Array.isArray(existing.purchasedChallenges)) {
            existing.purchasedChallenges = [];
          }
          const hasCurrentInPurchased = existing.purchasedChallenges.some(
            (c) => c.challengeId === existing.currentChallenge.challengeId
          );
          if (!hasCurrentInPurchased) {
            existing.purchasedChallenges.unshift({
              ...existing.currentChallenge,
              attemptNumber: existing.activeAttempt?.attemptNumber || 1,
              timestamp: existing.currentChallenge.timestamp || new Date(),
            });
            existing.markModified('purchasedChallenges');
            needsSave = true;
          }
        }

        // Upgrade any pre-Phase-9 team stats to include risk telemetry
        if (
          existing.stats &&
          (existing.stats.safeAttempts === undefined ||
            (existing.stats.safeAttempts === 0 &&
              existing.stats.balancedAttempts === 0 &&
              existing.stats.aggressiveAttempts === 0 &&
              (existing.completedChallenges?.length > 0 ||
                existing.failedChallenges?.length > 0 ||
                existing.activeAttempt)))
        ) {
          existing.stats.safeAttempts = seed.stats.safeAttempts || 0;
          existing.stats.balancedAttempts = seed.stats.balancedAttempts || 0;
          existing.stats.aggressiveAttempts = seed.stats.aggressiveAttempts || 0;
          existing.stats.successByRisk = seed.stats.successByRisk || {
            SAFE: 0,
            BALANCED: 0,
            AGGRESSIVE: 0,
          };
          existing.stats.creditsByRisk = seed.stats.creditsByRisk || {
            SAFE: { gained: 0, lost: 0, net: 0 },
            BALANCED: { gained: 0, lost: 0, net: 0 },
            AGGRESSIVE: { gained: 0, lost: 0, net: 0 },
          };
          existing.stats.riskProfile = normalizeRiskTier(
            existing.currentChallenge?.risk || existing.stats.riskProfile || seed.stats.riskProfile
          );
          needsSave = true;
        }

        // Reconcile Phase 10 configurable abilities & expired cooldowns
        if (AbilityService.reconcileTeamAbilitiesState(existing, DEFAULT_ABILITY_CATALOG)) {
          needsSave = true;
        }

        if (needsSave) {
          await existing.save();
        }
      }

      // Ensure initial credit transaction records exist for TEAM-CIPHER
      const txCount = await CreditTransaction.countDocuments({ teamId: seed.teamId });
      if (txCount === 0 && seed.stats?.recentActivity?.length) {
        for (const item of [...seed.stats.recentActivity].reverse()) {
          await CreditTransaction.create({
            teamId: seed.teamId,
            type: item.type,
            amount: item.creditsDelta,
            balanceAfter: item.balanceAfter ?? seed.credits,
            relatedChallenge: item.relatedChallenge || null,
            relatedAbility: item.relatedAbility || null,
            summary: item.summary,
            timestamp: item.timestamp || new Date(),
          });
        }
      }

      // Ensure completed attempt records exist in challengeAttempts collection
      if (Array.isArray(existing.completedChallenges)) {
        for (let idx = 0; idx < existing.completedChallenges.length; idx++) {
          const comp = existing.completedChallenges[idx];
          if (!comp?.challengeId) continue;
          const existingSuccess = await ChallengeAttempt.findOne({
            teamId: existing.teamId,
            challengeId: comp.challengeId,
            status: { $in: ['SUCCESS', 'COMPLETED'] },
          });
          if (existingSuccess) continue;

          const compAttemptId = `ATT-900-${existing.teamId}-${comp.challengeId}`;
          const completedTs = comp.timestamp ? new Date(comp.timestamp) : new Date(Date.now() - 1800 * 1000);
          const startedTs = new Date(completedTs.getTime() - 420 * 1000);
          await ChallengeAttempt.findOneAndUpdate(
            { attemptId: compAttemptId },
            {
              $setOnInsert: {
                attemptId: compAttemptId,
                teamId: existing.teamId,
                challengeId: comp.challengeId,
                title: comp.title || comp.challengeId,
                category: comp.category || 'LOGIC',
                difficulty: comp.difficulty || 'LOW',
                risk: comp.risk || 'SAFE',
                gameType: comp.gameType || 'wordGuess',
                gameConfig: {},
                costPaid: comp.cost || 150,
                potentialReward: comp.reward || 400,
                penaltyOnFail: comp.penalty || 50,
                timeLimit: 900,
                hintsUnlocked: 0,
                unlockedHints: [],
                extraTimeMinutes: 0,
                isReattempt: false,
                startedAt: startedTs,
                expiresAt: new Date(startedTs.getTime() + 900 * 1000),
                completedAt: completedTs,
                status: 'SUCCESS',
              },
            },
            { upsert: true }
          ).catch(() => {});
        }
      }

      // Ensure active attempt record exists in challengeAttempts collection
      if (existing.activeAttempt?.attemptId) {
        await ChallengeAttempt.findOneAndUpdate(
          { attemptId: existing.activeAttempt.attemptId },
          {
            $setOnInsert: {
              attemptId: existing.activeAttempt.attemptId,
              teamId: existing.teamId,
              challengeId: existing.activeAttempt.challengeId,
              title: existing.activeAttempt.title,
              category: existing.activeAttempt.category,
              difficulty: existing.activeAttempt.difficulty,
              risk: existing.activeAttempt.risk,
              gameType: existing.activeAttempt.gameType || 'wordGuess',
              gameConfig: existing.activeAttempt.gameConfig || {},
              costPaid: existing.activeAttempt.costPaid || 0,
              potentialReward: existing.activeAttempt.potentialReward || 500,
              penaltyOnFail: existing.activeAttempt.penaltyOnFail || 100,
              timeLimit: existing.activeAttempt.timeLimit || 1200,
              hintsUnlocked: existing.activeAttempt.hintsUnlocked || 0,
              unlockedHints: existing.activeAttempt.unlockedHints || [],
              extraTimeMinutes: existing.activeAttempt.extraTimeMinutes || 0,
              isReattempt: Boolean(existing.activeAttempt.isReattempt),
              startedAt: existing.activeAttempt.startedAt || new Date(),
              expiresAt:
                existing.activeAttempt.expiresAt ||
                new Date(Date.now() + (existing.activeAttempt.timeLimit || 1200) * 1000),
              status: 'IN_PROGRESS',
            },
          },
          { upsert: true }
        ).catch(() => {});
      }
    }
      teamsSeeded = true;
    } catch (err) {
      logger.warn('SEED', `Team seed check warning: ${err.message}`);
    } finally {
      teamsSeedPromise = null;
    }
  })();

  return teamsSeedPromise;
};

/**
 * Server-authoritative check: if the team's activeAttempt has expired (now >= expiresAt),
 * automatically evaluate it as TIMEOUT and record the penalty + attempt outcome.
 * Note: Do NOT expire sessions while the global round timer is stopped/paused!
 */
export const checkAndExpireTeamSessionIfNeeded = async (teamDocOrId) => {
  const team =
    typeof teamDocOrId === 'object' && teamDocOrId !== null
      ? teamDocOrId
      : await Team.findOne({
          teamId: String(teamDocOrId || '')
            .trim()
            .toUpperCase(),
        });

  if (!team || !team.activeAttempt || !team.activeAttempt.expiresAt) {
    return { expired: false, team, evaluationResult: null, creditResult: null };
  }

  const globalTimer = computeGlobalArenaTimer();
  if (globalTimer.status !== 'ACTIVE') {
    return { expired: false, team, evaluationResult: null, creditResult: null };
  }

  const now = new Date();
  const expiresAt = new Date(team.activeAttempt.expiresAt);
  if (now < expiresAt) {
    return { expired: false, team, evaluationResult: null, creditResult: null };
  }

  try {
    const evalResponse = await ChallengeService.evaluateAndCompleteSession({
      teamDoc: team,
      challengeId: team.activeAttempt.challengeId,
      attemptId: team.activeAttempt.attemptId,
      submission: { outcome: 'TIMEOUT' },
      outcomeOverride: 'TIMEOUT',
    });

    return {
      expired: true,
      team: evalResponse.team,
      evaluationResult: evalResponse.evaluationResult,
      creditResult: evalResponse.creditResult,
    };
  } catch (err) {
    logger.warn('SESSION', `Auto-expire check warning: ${err.message}`);
    return { expired: false, team, evaluationResult: null, creditResult: null };
  }
};

export const reconcileTeamActiveChallengeWithCatalog = (team) => {
  if (!team || !team.currentChallenge?.challengeId) return false;
  const catalogMatch = CHALLENGE_CATALOG.find(
    (c) => c.challengeId === team.currentChallenge.challengeId
  );
  if (!catalogMatch) return false;

  const currentType = team.currentChallenge.gameType;
  const attemptType = team.activeAttempt?.gameType;
  const needsSync =
    currentType !== catalogMatch.gameType ||
    attemptType !== catalogMatch.gameType ||
    team.currentChallenge.description !== catalogMatch.description;

  if (!needsSync) return false;

  team.currentChallenge = {
    ...team.currentChallenge,
    title: catalogMatch.title,
    category: catalogMatch.category,
    description: catalogMatch.description,
    difficulty: catalogMatch.difficulty,
    risk: catalogMatch.risk,
    gameType: catalogMatch.gameType,
    gameConfig: catalogMatch.gameConfig,
  };

  if (team.activeAttempt && team.activeAttempt.challengeId === catalogMatch.challengeId) {
    team.activeAttempt = {
      ...team.activeAttempt,
      title: catalogMatch.title,
      category: catalogMatch.category,
      difficulty: catalogMatch.difficulty,
      risk: catalogMatch.risk,
      gameType: catalogMatch.gameType,
      gameConfig: catalogMatch.gameConfig,
    };
  }

  if (typeof team.markModified === 'function') {
    team.markModified('currentChallenge');
    team.markModified('activeAttempt');
  }
  return true;
};

export const authenticateTeam = async (rawTeamId, plainPassword) => {
  const normalizedTeamId = String(rawTeamId || '')
    .trim()
    .toUpperCase();

  if (!normalizedTeamId || !plainPassword) {
    const err = new Error('TEAM ID and PASSWORD are required.');
    err.statusCode = 400;
    err.code = 'MISSING_CREDENTIALS';
    throw err;
  }

  await ensureDefaultTeamsSeeded();

  const team = await Team.findOne({ teamId: normalizedTeamId }).select('+passwordHash');
  if (!team) {
    const err = new Error(`Team [${normalizedTeamId}] is not registered in NEXUS Core.`);
    err.statusCode = 401;
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  const isPasswordValid = await verifyPassword(plainPassword, team.passwordHash);
  if (!isPasswordValid) {
    const err = new Error('Invalid password for the specified Team ID.');
    err.statusCode = 401;
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  await checkAndExpireTeamSessionIfNeeded(team);
  const abilitiesUpdated = AbilityService.reconcileTeamAbilitiesState(team, DEFAULT_ABILITY_CATALOG);
  const challengeUpdated = reconcileTeamActiveChallengeWithCatalog(team);
  if (abilitiesUpdated || challengeUpdated) {
    await team.save();
  }

  const token = signTeamToken(team);

  await AuditService.record({
    action: AUDIT_ACTION_TYPES.LOGIN,
    actorType: 'TEAM',
    actorId: normalizedTeamId,
    teamId: normalizedTeamId,
    creditsDelta: 0,
    balanceAfter: team.credits,
    summary: `Operative squad [${normalizedTeamId}] (${team.teamName}) authenticated into NEXUS Portal.`,
    metadata: {
      teamName: team.teamName,
      credits: team.credits,
    },
  });

  const [transactions, catalog, attempts, abilitiesCatalog, nexusCore] = await Promise.all([
    CreditService.getTeamTransactions(normalizedTeamId),
    ChallengeService.listChallenges(),
    ChallengeService.getAttemptsForTeam(normalizedTeamId),
    AbilityService.listAbilities(),
    NexusCoreService.getNexusCoreStatusForTeam(team),
  ]);

  const publicTeam = team.toPublicJSON();
  const attemptHistory = normalizeAttemptHistory(publicTeam, attempts, catalog);
  const progressSummary = buildTeamProgressSummary(publicTeam, attempts, transactions, catalog);
  const liveFeed = buildCanonicalLiveFeed(publicTeam, attempts, transactions, catalog);

  return {
    token,
    team: publicTeam,
    nexusCore,
    transactions,
    catalog,
    abilitiesCatalog,
    attempts,
    attemptHistory,
    progressSummary,
    liveFeed,
    timer: ChallengeService.computeSessionTimerTelemetry(team.activeAttempt),
    globalTimer: computeGlobalArenaTimer(),
    creditsConfig: CreditService.getConfig(),
    serverTime: new Date().toISOString(),
  };
};

export const getTeamStateById = async (rawTeamId) => {
  await ensureDefaultTeamsSeeded();
  const normalizedTeamId = String(rawTeamId || '')
    .trim()
    .toUpperCase();
  const team = await Team.findOne({ teamId: normalizedTeamId });
  if (!team) {
    const err = new Error(`Team [${normalizedTeamId}] not found.`);
    err.statusCode = 404;
    err.code = 'TEAM_NOT_FOUND';
    throw err;
  }

  await checkAndExpireTeamSessionIfNeeded(team);
  const abilitiesUpdated = AbilityService.reconcileTeamAbilitiesState(team, DEFAULT_ABILITY_CATALOG);
  const challengeUpdated = reconcileTeamActiveChallengeWithCatalog(team);
  if (abilitiesUpdated || challengeUpdated) {
    await team.save();
  }
  return team.toPublicJSON();
};

/**
 * Strip untrusted client-supplied values (cost, price, reward, penalty, credits, timers, outcomeOverride).
 * Server controls credits, rewards, penalties, timers, attempts, submissions, abilities, Core, and team state.
 */
const sanitizeClientActionPayload = (rawPayload = {}, isTrustedAdmin = false) => {
  if (!rawPayload || typeof rawPayload !== 'object' || Array.isArray(rawPayload)) {
    return rawPayload;
  }
  if (isTrustedAdmin) {
    return { ...rawPayload };
  }
  const {
    cost: _ignoreCost,
    price: _ignorePrice,
    amount: _ignoreAmount,
    reward: _ignoreReward,
    penalty: _ignorePenalty,
    credits: _ignoreCredits,
    balance: _ignoreBalance,
    expiresAt: _ignoreExpiresAt,
    startedAt: _ignoreStartedAt,
    timeLimit: _ignoreTimeLimit,
    extraTimeMinutes: _ignoreExtraMinutes,
    outcomeOverride: _ignoreOutcomeOverride,
    unlockedHints: _ignoreUnlockedHints,
    hintsUnlocked: _ignoreHintsUnlocked,
    ...safePayload
  } = rawPayload;
  return safePayload;
};

/**
 * Server-authoritative team & credit action processor.
 * Uses CreditService, ChallengeService, AbilityService, and NexusCoreService:
 * - CHALLENGE_PURCHASE
 * - CHALLENGE_REWARD
 * - FAILURE_PENALTY
 * - EXTRA_TIME
 * - HINT
 * - ABILITY
 * - REATTEMPT
 * - ABANDON_CHALLENGE
 * - TIMEOUT_CHALLENGE
 * - UNLOCK_NEXUS_CORE
 * - ACTIVATE_NEXUS_CORE
 * - SUBMIT_NEXUS_CORE
 * - UPDATE_NEXUS_CORE_CONFIG
 */
const inFlightTeamActions = new Map();

export const executeTeamAction = async (rawTeamId, actionType, rawPayload = {}, options = {}) => {
  const isTrustedAdmin = Boolean(options?.isTrustedAdmin);
  const payload = sanitizeClientActionPayload(rawPayload, isTrustedAdmin);

  const normalizedTeamId = String(rawTeamId || '')
    .trim()
    .toUpperCase();

  if (inFlightTeamActions.has(normalizedTeamId)) {
    const normalizedAction = String(actionType || '').toUpperCase();
    const err = new Error(
      `Concurrent team action blocked: another operation [${inFlightTeamActions.get(normalizedTeamId)}] is currently in flight for [${normalizedTeamId}].`
    );
    err.statusCode = 409;
    if (
      normalizedAction.includes('ACQUIRE') ||
      normalizedAction.includes('PURCHASE_CHALLENGE') ||
      normalizedAction.includes('START_CHALLENGE') ||
      normalizedAction.includes('REATTEMPT')
    ) {
      err.code = 'SIMULTANEOUS_PURCHASE_BLOCKED';
    } else if (normalizedAction.includes('SUBMIT')) {
      err.code = 'DUPLICATE_SUBMISSION_IN_FLIGHT';
    } else if (normalizedAction.includes('ABILITY')) {
      err.code = 'ABILITY_ACTIVATION_IN_FLIGHT';
    } else {
      err.code = 'TEAM_ACTION_IN_FLIGHT';
    }
    throw err;
  }

  inFlightTeamActions.set(normalizedTeamId, actionType);

  try {
    const team = await Team.findOne({ teamId: normalizedTeamId });

    if (!team) {
      const err = new Error(`Team [${normalizedTeamId}] not found.`);
      err.statusCode = 404;
      throw err;
    }

  AbilityService.reconcileTeamAbilitiesState(team, DEFAULT_ABILITY_CATALOG);

  const nonTimerBlockedActions = new Set([
    'UPDATE_TEAM_ROSTER',
    'UPDATE_TEAM_MEMBERS',
    'RESET_DEMO_STATE',
    'UPDATE_NEXUS_CORE_CONFIG',
  ]);

  if (!isTrustedAdmin && !nonTimerBlockedActions.has(actionType)) {
    const globalTimer = computeGlobalArenaTimer();
    if (globalTimer.status !== 'ACTIVE') {
      const err = new Error(
        'Round timer is currently stopped. Wait for the Organizer to start the round before accessing challenges.'
      );
      err.statusCode = 403;
      err.code = 'ROUND_TIMER_STOPPED';
      throw err;
    }
  }

  let creditResult = null;
  let evaluationResult = null;
  let abilityActivation = null;
  let coreEvaluation = null;
  let coreAvailabilityBroadcast = false;
  let coreCompletedBroadcast = false;
  let coreStateChanged = false;

  switch (actionType) {
    case 'BUY_CHALLENGE': {
      const challengeId = payload.challengeId || 'CHG-PUZ-05';
      const acquisition = await ChallengeService.acquireChallengeForTeam({
        teamDoc: team,
        challengeId,
        isReattemptRequested: Boolean(payload.isReattempt),
        buyOnly: true,
      });
      creditResult = acquisition.creditResult;
      break;
    }

    case 'ACQUIRE_CHALLENGE':
    case 'PURCHASE_CHALLENGE':
    case 'START_CHALLENGE':
    case 'OPEN_CHALLENGE':
    case CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE: {
      const challengeId = payload.challengeId || 'CHG-PUZ-05';
      const acquisition = await ChallengeService.acquireChallengeForTeam({
        teamDoc: team,
        challengeId,
        isReattemptRequested: Boolean(payload.isReattempt),
        buyOnly: Boolean(payload.buyOnly),
      });
      creditResult = acquisition.creditResult;
      break;
    }

    case 'PAUSE_CHALLENGE':
    case 'SAVE_FOR_LATER': {
      if (team.currentChallenge?.challengeId) {
        if (!Array.isArray(team.purchasedChallenges)) {
          team.purchasedChallenges = [];
        }
        const activeId = String(team.currentChallenge.challengeId).toUpperCase();
        const alreadyInPurchased = team.purchasedChallenges.some(
          (c) => String(c.challengeId).toUpperCase() === activeId
        );
        if (!alreadyInPurchased) {
          team.purchasedChallenges.unshift({
            ...team.currentChallenge,
            attemptNumber: team.activeAttempt?.attemptNumber || 1,
            timestamp: team.currentChallenge.timestamp || new Date(),
          });
          team.markModified('purchasedChallenges');
        }
      }
      team.currentChallenge = null;
      team.activeAttempt = null;
      await team.save();
      break;
    }

    case 'REATTEMPT_CHALLENGE':
    case CREDIT_TRANSACTION_TYPES.REATTEMPT: {
      const challengeId =
        payload.challengeId ||
        team.failedChallenges?.[0]?.challengeId ||
        team.currentChallenge?.challengeId ||
        'CHG-PUZ-05';
      const acquisition = await ChallengeService.acquireChallengeForTeam({
        teamDoc: team,
        challengeId,
        isReattemptRequested: true,
        buyOnly: Boolean(payload.buyOnly),
      });
      creditResult = acquisition.creditResult;
      break;
    }

    case 'SPEND_CREDITS':
    case 'PURCHASE_HINT':
    case 'PURCHASE_EXTRA_TIME':
    case CREDIT_TRANSACTION_TYPES.HINT:
    case CREDIT_TRANSACTION_TYPES.EXTRA_TIME: {
      const isExtraTime =
        actionType === CREDIT_TRANSACTION_TYPES.EXTRA_TIME ||
        actionType === 'PURCHASE_EXTRA_TIME' ||
        payload.itemType === 'EXTRA_TIME';
      const txType = isExtraTime
        ? CREDIT_TRANSACTION_TYPES.EXTRA_TIME
        : CREDIT_TRANSACTION_TYPES.HINT;

      // Server-authoritative cost only — never trust client cost
      const cost = isExtraTime
        ? creditsConfig.getExtraTimeCost()
        : creditsConfig.getHintCost();

      // Server-controlled validation BEFORE charging Resistance Credits
      if (isExtraTime) {
        ChallengeService.validateExtraTimeEligibility(team);
      } else {
        await ChallengeService.validateHintPurchaseEligibility(team);
      }

      const relatedChallenge = team.currentChallenge
        ? {
            challengeId: team.currentChallenge.challengeId,
            title: team.currentChallenge.title,
            category: team.currentChallenge.category,
          }
        : null;

      creditResult = await CreditService.recordTransaction({
        teamDoc: team,
        type: txType,
        amount: cost,
        relatedChallenge,
        summary: isExtraTime
          ? `EXTRA TIME: +${creditsConfig.getExtraTimeMinutes()}m allocated (-${cost} CR)`
          : `HINT DECRYPTED${
              relatedChallenge ? ` for ${relatedChallenge.title}` : ''
            } (-${cost} CR)`,
        autoSaveTeam: false,
      });

      if (isExtraTime) {
        team.stats.extraTimePurchased += 1;
        await ChallengeService.extendSessionTimerForTeam(
          team,
          creditsConfig.getExtraTimeMinutes()
        );
      } else {
        team.stats.hintsPurchased += 1;
        await ChallengeService.unlockNextHintForTeam(team);
      }
      applyTeamRiskTelemetry(team, {
        risk:
          team.currentChallenge?.risk ||
          team.activeAttempt?.risk ||
          team.stats?.riskProfile ||
          'BALANCED',
        creditsLost: cost,
      });
      await team.save();

      await AuditService.record({
        action: isExtraTime ? AUDIT_ACTION_TYPES.EXTRA_TIME : AUDIT_ACTION_TYPES.HINT,
        actorType: 'TEAM',
        actorId: normalizedTeamId,
        teamId: normalizedTeamId,
        challengeId: relatedChallenge?.challengeId || team.activeAttempt?.challengeId || null,
        attemptId: team.activeAttempt?.attemptId || null,
        attemptNumber: team.activeAttempt?.attemptNumber || 1,
        creditsDelta: -cost,
        balanceAfter: team.credits,
        summary: isExtraTime
          ? `${normalizedTeamId} purchased +${creditsConfig.getExtraTimeMinutes()}m Extra Time (-${cost} CR)`
          : `${normalizedTeamId} decrypted Hint #${team.activeAttempt?.hintsUnlocked || 1} (-${cost} CR)`,
        metadata: {
          cost,
          expiresAt: team.activeAttempt?.expiresAt || null,
          hintsUnlocked: team.activeAttempt?.hintsUnlocked || 0,
        },
      });
      break;
    }

    case 'USE_ABILITY':
    case 'ACTIVATE_ABILITY':
    case CREDIT_TRANSACTION_TYPES.ABILITY: {
      const abilityId = payload.abilityId || 'ABL-03';
      const activation = await AbilityService.activateAbilityForTeam({
        teamDoc: team,
        abilityId,
        payload,
      });

      creditResult = activation.creditResult;
      abilityActivation = activation.abilityActivation;

      applyTeamRiskTelemetry(team, {
        risk:
          team.currentChallenge?.risk ||
          team.activeAttempt?.risk ||
          team.stats?.riskProfile ||
          'BALANCED',
        creditsLost: activation.abilityActivation.cost,
      });

      await team.save();

      await AuditService.record({
        action: AUDIT_ACTION_TYPES.ABILITY,
        actorType: 'TEAM',
        actorId: normalizedTeamId,
        teamId: normalizedTeamId,
        challengeId: team.activeAttempt?.challengeId || null,
        attemptId: team.activeAttempt?.attemptId || null,
        attemptNumber: team.activeAttempt?.attemptNumber || null,
        creditsDelta: -Math.abs(activation.abilityActivation.cost || 0),
        balanceAfter: team.credits,
        summary: `${normalizedTeamId} activated ability [${activation.abilityActivation.abilityId}] ${activation.abilityActivation.name} (-${activation.abilityActivation.cost} CR)`,
        metadata: {
          abilityId: activation.abilityActivation.abilityId,
          abilityName: activation.abilityActivation.name,
          effectType: activation.abilityActivation.effectType,
          cost: activation.abilityActivation.cost,
        },
      });
      break;
    }

    case 'ABANDON_CHALLENGE': {
      const evalResponse = await ChallengeService.evaluateAndCompleteSession({
        teamDoc: team,
        challengeId: payload.challengeId,
        attemptId: payload.attemptId,
        submission: { outcome: 'ABANDONED' },
        outcomeOverride: 'ABANDONED',
      });
      creditResult = evalResponse.creditResult;
      evaluationResult = evalResponse.evaluationResult;
      break;
    }

    case 'TIMEOUT_CHALLENGE': {
      const evalResponse = await ChallengeService.evaluateAndCompleteSession({
        teamDoc: team,
        challengeId: payload.challengeId,
        attemptId: payload.attemptId,
        submission: { outcome: 'TIMEOUT' },
        outcomeOverride: 'TIMEOUT',
      });
      creditResult = evalResponse.creditResult;
      evaluationResult = evalResponse.evaluationResult;
      break;
    }

    case 'SUBMIT_CHALLENGE':
    case CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD:
    case CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY: {
      const evalResponse = await ChallengeService.evaluateAndCompleteSession({
        teamDoc: team,
        challengeId: payload.challengeId,
        attemptId: payload.attemptId,
        submission: payload.submission ?? payload.answer ?? payload.solution ?? payload,
        simulateFailure:
          actionType === CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY ||
          Boolean(payload.simulateFailure),
        outcomeOverride: isTrustedAdmin ? payload.outcomeOverride || null : null,
      });
      creditResult = evalResponse.creditResult;
      evaluationResult = evalResponse.evaluationResult;

      // Reconcile if solving this challenge newly unlocked NEXUS Core (LOCKED -> AVAILABLE)
      const reconcileRes = await NexusCoreService.reconcileCoreAvailabilityForTeam(team);
      if (reconcileRes.newlyAvailable) {
        coreAvailabilityBroadcast = true;
        coreStateChanged = true;
      }
      break;
    }

    case 'UNLOCK_NEXUS_CORE': {
      const unlockRes = await NexusCoreService.unlockCoreForTeam(team);
      coreAvailabilityBroadcast = Boolean(unlockRes.newlyAvailable);
      coreStateChanged = true;
      break;
    }

    case 'ACTIVATE_NEXUS_CORE': {
      await NexusCoreService.activateCoreForTeam(team);
      coreStateChanged = true;
      break;
    }

    case 'SUBMIT_NEXUS_CORE': {
      const submitRes = await NexusCoreService.submitCoreObjectiveForTeam({
        teamDoc: team,
        submission: payload.submission ?? payload.answer ?? payload.solution ?? payload,
        simulateFailure: Boolean(payload.simulateFailure),
      });
      creditResult = submitRes.creditResult;
      coreEvaluation = submitRes.coreEvaluation;
      evaluationResult = submitRes.coreEvaluation;
      coreStateChanged = true;
      if (submitRes.passed) {
        coreCompletedBroadcast = true;
      }

      await AuditService.record({
        action: AUDIT_ACTION_TYPES.SUBMISSION,
        actorType: 'TEAM',
        actorId: normalizedTeamId,
        teamId: normalizedTeamId,
        challengeId: 'NEXUS-CORE-OMEGA',
        creditsDelta: 0,
        balanceAfter: team.credits,
        summary: `${normalizedTeamId} submitted NEXUS Core Singularity solution.`,
      });

      await AuditService.record({
        action: submitRes.passed ? AUDIT_ACTION_TYPES.SUCCESS : AUDIT_ACTION_TYPES.FAILURE,
        actorType: 'TEAM',
        actorId: normalizedTeamId,
        teamId: normalizedTeamId,
        challengeId: 'NEXUS-CORE-OMEGA',
        creditsDelta: submitRes.coreEvaluation?.creditsDelta || 0,
        balanceAfter: team.credits,
        summary: submitRes.passed
          ? `${normalizedTeamId} COMPLETED THE NEXUS CORE (+${submitRes.coreEvaluation?.creditsDelta || 0} CR)`
          : `${normalizedTeamId} failed NEXUS Core verification (${submitRes.coreEvaluation?.creditsDelta || 0} CR)`,
      });
      break;
    }

    case 'UPDATE_NEXUS_CORE_CONFIG': {
      await NexusCoreService.updateCoreConfig(payload.updates || payload);
      coreStateChanged = true;
      break;
    }

    case 'UPDATE_TEAM_ROSTER':
    case 'UPDATE_TEAM_MEMBERS': {
      const requestedSize = Number(
        payload.teamSize ?? payload.size ?? payload.members?.length ?? team.members?.length ?? 1
      );
      const clampedSize = Math.min(4, Math.max(1, requestedSize));
      const rawMembers = Array.isArray(payload.members) ? payload.members : team.members || [];
      team.members = Array.from({ length: clampedSize }, (_, idx) => {
        const item = rawMembers[idx];
        const rawName =
          typeof item === 'string'
            ? item.trim()
            : String(item?.name || '').trim();
        const fallbackName = idx === 0 ? 'PLAYER 1 (LEAD)' : `PLAYER ${idx + 1}`;
        return {
          memberId: item?.memberId || `OP-0${idx + 1}`,
          name: (rawName || fallbackName).toUpperCase(),
          role: item?.role || (idx === 0 ? 'LEAD' : 'OPERATIVE'),
          online: idx === 0 ? true : Boolean(item?.online),
        };
      });
      if (payload.teamName && String(payload.teamName).trim()) {
        team.teamName = String(payload.teamName).trim().toUpperCase();
      }
      team.markModified('members');
      await team.save();
      break;
    }

    case 'RESET_DEMO_STATE': {
      const seed = buildSeedTeams().find((s) => s.teamId === normalizedTeamId);
      if (seed) {
        const { plainPassword, ...seedFields } = seed;
        Object.assign(team, seedFields);
        await team.save();
        await CreditTransaction.deleteMany({ teamId: normalizedTeamId });
        await ChallengeAttempt.deleteMany({ teamId: normalizedTeamId });
        await NexusCoreService.resetNexusCoreDemoState();
        await ensureDefaultTeamsSeeded();
        coreStateChanged = true;
      } else {
        const startingCredits = creditsConfig.getStartingCredits();
        team.credits = startingCredits;
        team.status = 'ACTIVE';
        team.currentChallenge = null;
        team.purchasedChallenges = [];
        team.activeAttempt = null;
        team.completedChallenges = [];
        team.failedChallenges = [];
        team.abilities = AbilityService.buildInitialTeamAbilitySlots(DEFAULT_ABILITY_CATALOG);
        team.nexusCore = {
          state: 'LOCKED',
          unlockedAt: null,
          activatedAt: null,
          completedAt: null,
          attemptsCount: 0,
          completionRank: null,
          proclamationCode: null,
        };
        team.stats = {
          totalSolved: 0,
          totalFailed: 0,
          creditsEarned: startingCredits,
          creditsSpent: 0,
          penaltiesIncurred: 0,
          reattemptsCount: 0,
          hintsPurchased: 0,
          extraTimePurchased: 0,
          abilitiesUsed: 0,
          riskProfile: 'SAFE',
          safeAttempts: 0,
          balancedAttempts: 0,
          aggressiveAttempts: 0,
          successByRisk: { SAFE: 0, BALANCED: 0, AGGRESSIVE: 0 },
          creditsByRisk: {
            SAFE: { gained: 0, lost: 0, net: 0 },
            BALANCED: { gained: 0, lost: 0, net: 0 },
            AGGRESSIVE: { gained: 0, lost: 0, net: 0 },
          },
          coreProgressPercent: 0,
          lastActionAt: new Date(),
          recentActivity: [],
        };
        await team.save();
        await CreditTransaction.deleteMany({ teamId: normalizedTeamId });
        await ChallengeAttempt.deleteMany({ teamId: normalizedTeamId });
        coreStateChanged = true;
      }
      break;
    }

    default: {
      const err = new Error(`Unsupported team action: ${actionType}`);
      err.statusCode = 400;
      throw err;
    }
  }

  const [transactions, catalog, attempts, abilitiesCatalog, nexusCore] = await Promise.all([
    CreditService.getTeamTransactions(normalizedTeamId),
    ChallengeService.listChallenges(),
    ChallengeService.getAttemptsForTeam(normalizedTeamId),
    AbilityService.listAbilities(),
    NexusCoreService.getNexusCoreStatusForTeam(team),
  ]);

  const publicTeam = team.toPublicJSON();
  const attemptHistory = normalizeAttemptHistory(publicTeam, attempts, catalog);
  const progressSummary = buildTeamProgressSummary(publicTeam, attempts, transactions, catalog);
  const liveFeed = buildCanonicalLiveFeed(publicTeam, attempts, transactions, catalog);
  const liveFeedEvents = buildActionLiveFeedEvents({
    teamId: normalizedTeamId,
    actionType,
    team: publicTeam,
    creditResult,
    evaluationResult,
    abilityActivation,
  });

  return {
    team: publicTeam,
    nexusCore,
    coreEvaluation,
    coreAvailabilityBroadcast,
    coreCompletedBroadcast,
    coreStateChanged,
    transaction: creditResult?.transaction || null,
    evaluationResult,
    abilityActivation,
    abilitiesCatalog,
    attempts,
    attemptHistory,
    progressSummary,
    liveFeed,
    liveFeedEvents,
    timer: ChallengeService.computeSessionTimerTelemetry(team.activeAttempt),
    globalTimer: computeGlobalArenaTimer(),
    serverTime: new Date().toISOString(),
    event: {
      eventId: creditResult?.transaction?._id?.toString() || `EVT-${Date.now()}`,
      type: creditResult?.transaction?.type || actionType,
      summary: creditResult?.transaction?.summary || '',
      creditsDelta: creditResult?.delta || 0,
      balanceBefore: creditResult?.balanceBefore ?? team.credits,
      balanceAfter: creditResult?.balanceAfter ?? team.credits,
      relatedChallenge: creditResult?.transaction?.relatedChallenge || null,
      relatedAbility: creditResult?.transaction?.relatedAbility || null,
      timestamp: creditResult?.transaction?.timestamp || new Date(),
    },
    transactions,
    catalog,
    creditsConfig: CreditService.getConfig(),
  };
  } finally {
    inFlightTeamActions.delete(normalizedTeamId);
  }
};

