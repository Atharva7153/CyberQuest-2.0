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
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signTeamToken } from '../utils/jwt.js';
import { logger } from '../utils/logger.js';

export const CHALLENGE_CATALOG = DEFAULT_CHALLENGE_CATALOG;

const DEFAULT_ABILITIES = [
  {
    abilityId: 'ABL-01',
    name: 'Code Breaker',
    code: 'CB-01',
    description: 'Decrypts one obfuscated layer or reveals structural syntax in active challenge.',
    cost: 200,
    chargePercent: 88,
    status: 'READY',
  },
  {
    abilityId: 'ABL-02',
    name: 'Signal Mapper',
    code: 'SM-02',
    description: 'Exposes hidden reward multipliers and risk ratios in the Challenge Market.',
    cost: 150,
    chargePercent: 74,
    status: 'READY',
  },
  {
    abilityId: 'ABL-03',
    name: 'System Analyst',
    code: 'SA-03',
    description: 'Shields 50% of penalty loss on the next high-risk submission attempt.',
    cost: 250,
    chargePercent: 65,
    status: 'READY',
  },
  {
    abilityId: 'ABL-04',
    name: 'Exploit Hunter',
    code: 'EH-04',
    description: 'Boosts Resistance Credit payout by +20% upon solving the active challenge.',
    cost: 300,
    chargePercent: 92,
    status: 'READY',
  },
];

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
          title: 'PERIMETER HANDSHAKE',
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
            summary: 'CHALLENGE REWARD: PERIMETER HANDSHAKE (+400 CR)',
            creditsDelta: 400,
            balanceAfter: startingCredits + initialChallenge.cost,
            relatedChallenge: {
              challengeId: 'CHG-INIT-00',
              title: 'PERIMETER HANDSHAKE',
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
      activeAttempt: null,
      completedChallenges: [],
      failedChallenges: [],
      abilities: DEFAULT_ABILITIES,
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

export const ensureDefaultTeamsSeeded = async () => {
  if (mongoose.connection.readyState !== 1) return;

  try {
    await ensureDefaultChallengesSeeded();
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

        if (
          existing.currentChallenge &&
          (!existing.currentChallenge.gameConfig?.wordLength &&
            !existing.currentChallenge.gameConfig?.prompt)
        ) {
          // Upgrade any pre-Phase-7 active challenge to the Phase 7 engine schema
          const match =
            CHALLENGE_CATALOG.find(
              (c) => c.challengeId === existing.currentChallenge.challengeId
            ) || CHALLENGE_CATALOG[0];
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
            hintsUnlocked: existing.activeAttempt?.hintsUnlocked || 0,
            unlockedHints: existing.activeAttempt?.unlockedHints || [],
            extraTimeMinutes: existing.activeAttempt?.extraTimeMinutes || 0,
            isReattempt: Boolean(existing.activeAttempt?.isReattempt),
            startedAt: existing.activeAttempt?.startedAt || new Date(),
            expiresAt: new Date(Date.now() + match.timeLimit * 1000),
            status: 'IN_PROGRESS',
          };
          needsSave = true;
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
  } catch (err) {
    logger.warn('SEED', `Team seed check warning: ${err.message}`);
  }
};

/**
 * Server-authoritative check: if the team's activeAttempt has expired (now >= expiresAt),
 * automatically evaluate it as TIMEOUT and record the penalty + attempt outcome.
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

  const token = signTeamToken(team);
  const [transactions, catalog, attempts] = await Promise.all([
    CreditService.getTeamTransactions(normalizedTeamId),
    ChallengeService.listChallenges(),
    ChallengeService.getAttemptsForTeam(normalizedTeamId),
  ]);

  return {
    token,
    team: team.toPublicJSON(),
    transactions,
    catalog,
    attempts,
    timer: ChallengeService.computeSessionTimerTelemetry(team.activeAttempt),
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
  return team.toPublicJSON();
};

/**
 * Server-authoritative team & credit action processor.
 * Uses CreditService and ChallengeService for all credit balance changes and transaction records:
 * - CHALLENGE_PURCHASE
 * - CHALLENGE_REWARD
 * - FAILURE_PENALTY
 * - EXTRA_TIME
 * - HINT
 * - ABILITY
 * - REATTEMPT
 * - ABANDON_CHALLENGE
 * - TIMEOUT_CHALLENGE
 */
export const executeTeamAction = async (rawTeamId, actionType, payload = {}) => {
  const normalizedTeamId = String(rawTeamId || '')
    .trim()
    .toUpperCase();
  const team = await Team.findOne({ teamId: normalizedTeamId });

  if (!team) {
    const err = new Error(`Team [${normalizedTeamId}] not found.`);
    err.statusCode = 404;
    throw err;
  }

  let creditResult = null;
  let evaluationResult = null;

  switch (actionType) {
    case 'ACQUIRE_CHALLENGE':
    case 'PURCHASE_CHALLENGE':
    case CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE: {
      const challengeId = payload.challengeId || 'CHG-PUZ-05';
      const acquisition = await ChallengeService.acquireChallengeForTeam({
        teamDoc: team,
        challengeId,
        isReattemptRequested: Boolean(payload.isReattempt),
      });
      creditResult = acquisition.creditResult;
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
      const cost =
        Number(payload.cost) ||
        (isExtraTime ? creditsConfig.getExtraTimeCost() : creditsConfig.getHintCost());

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
      break;
    }

    case 'USE_ABILITY':
    case CREDIT_TRANSACTION_TYPES.ABILITY: {
      const abilityId = payload.abilityId || 'ABL-01';
      const ability = team.abilities.find((a) => a.abilityId === abilityId);

      if (!ability) {
        const err = new Error('Specified ability module not found.');
        err.statusCode = 404;
        throw err;
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
        type: CREDIT_TRANSACTION_TYPES.ABILITY,
        amount: ability.cost,
        relatedChallenge,
        relatedAbility: {
          abilityId: ability.abilityId,
          name: ability.name,
          code: ability.code,
        },
        summary: `ABILITY: ${ability.name} [${ability.code}] (-${ability.cost} CR)`,
        autoSaveTeam: false,
      });

      team.stats.abilitiesUsed += 1;
      applyTeamRiskTelemetry(team, {
        risk:
          team.currentChallenge?.risk ||
          team.activeAttempt?.risk ||
          team.stats?.riskProfile ||
          'BALANCED',
        creditsLost: ability.cost,
      });
      ability.status = 'ACTIVE';
      ability.lastUsedAt = new Date();
      ability.chargePercent = Math.max(15, (ability.chargePercent || 100) - 25);
      await team.save();
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
        outcomeOverride: payload.outcomeOverride || null,
      });
      creditResult = evalResponse.creditResult;
      evaluationResult = evalResponse.evaluationResult;
      break;
    }

    default: {
      const err = new Error(`Unsupported team action: ${actionType}`);
      err.statusCode = 400;
      throw err;
    }
  }

  const [transactions, catalog, attempts] = await Promise.all([
    CreditService.getTeamTransactions(normalizedTeamId),
    ChallengeService.listChallenges(),
    ChallengeService.getAttemptsForTeam(normalizedTeamId),
  ]);

  return {
    team: team.toPublicJSON(),
    transaction: creditResult?.transaction || null,
    evaluationResult,
    attempts,
    timer: ChallengeService.computeSessionTimerTelemetry(team.activeAttempt),
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
};

