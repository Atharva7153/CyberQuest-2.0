import mongoose from 'mongoose';
import { Team } from '../models/Team.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signTeamToken } from '../utils/jwt.js';
import { logger } from '../utils/logger.js';

export const CHALLENGE_CATALOG = [
  {
    challengeId: 'CHG-NET-01',
    title: 'NETWORK BREACH',
    category: 'TECHNICAL',
    cost: 500,
    reward: 950,
    penalty: 150,
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    description: 'Intercept encrypted packet headers across Sector 04 relay nodes.',
  },
  {
    challengeId: 'CHG-FOR-02',
    title: 'FORENSIC TRACE',
    category: 'OBSERVATION',
    cost: 250,
    reward: 500,
    penalty: 75,
    difficulty: 'LOW',
    risk: 'SAFE',
    description: 'Reconstruct corrupted memory dump signatures from terminal logs.',
  },
  {
    challengeId: 'CHG-ZDY-03',
    title: 'ZERO DAY HUNT',
    category: 'KNOWLEDGE',
    cost: 700,
    reward: 1350,
    penalty: 250,
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    description: 'Identify the kernel privilege escalation vector before Core lockdown.',
  },
  {
    challengeId: 'CHG-LOG-04',
    title: 'SIGNAL LABYRINTH',
    category: 'LOGIC',
    cost: 350,
    reward: 700,
    penalty: 100,
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    description: 'Route power through 16 boolean relay gates with minimal attenuation.',
  },
  {
    challengeId: 'CHG-PUZ-05',
    title: 'CIPHER MONOLITH',
    category: 'PUZZLES',
    cost: 500,
    reward: 900,
    penalty: 150,
    difficulty: 'HIGH',
    risk: 'BALANCED',
    description: 'Decrypt the polyalphabetic key embedded in the AI Overlord directive.',
  },
];

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

const SEED_TEAMS = [
  {
    teamId: 'TEAM-CIPHER',
    teamName: 'CIPHER',
    plainPassword: 'NEXUS-2026',
    credits: 1250,
    status: 'ACTIVE',
    members: [
      { memberId: 'OP-01', name: 'OPERATIVE ALPHA (LEAD)', role: 'ARCHITECT', online: true },
      { memberId: 'OP-02', name: 'OPERATIVE VEX', role: 'CRYPTANALYST', online: false },
      { memberId: 'OP-03', name: 'OPERATIVE KIRA', role: 'SYSTEMS RECON', online: false },
      { memberId: 'OP-04', name: 'OPERATIVE AXIOM', role: 'STRATEGIST', online: false },
    ],
    currentChallenge: CHALLENGE_CATALOG[0],
    activeAttempt: {
      attemptId: 'ATT-901',
      challengeId: 'CHG-NET-01',
      title: 'NETWORK BREACH',
      category: 'TECHNICAL',
      costPaid: 500,
      potentialReward: 950,
      penaltyOnFail: 150,
      hintsUnlocked: 0,
      extraTimeMinutes: 0,
      startedAt: new Date(),
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
        timestamp: new Date(Date.now() - 1800 * 1000),
      },
    ],
    failedChallenges: [],
    abilities: DEFAULT_ABILITIES,
    stats: {
      totalSolved: 1,
      totalFailed: 0,
      creditsEarned: 1650,
      creditsSpent: 400,
      hintsPurchased: 0,
      extraTimePurchased: 0,
      abilitiesUsed: 0,
      riskProfile: 'BALANCED',
      coreProgressPercent: 72,
      lastActionAt: new Date(),
      recentActivity: [
        {
          eventId: 'EVT-INIT-1',
          type: 'CHALLENGE_PURCHASED',
          summary: 'Entered NETWORK BREACH challenge (-500 CR)',
          creditsDelta: -500,
          timestamp: new Date(Date.now() - 600 * 1000),
        },
        {
          eventId: 'EVT-INIT-0',
          type: 'SUBMISSION_SOLVED',
          summary: 'Solved PERIMETER HANDSHAKE (+400 CR)',
          creditsDelta: 400,
          timestamp: new Date(Date.now() - 1800 * 1000),
        },
      ],
    },
  },
  {
    teamId: 'TEAM-VANGUARD',
    teamName: 'VANGUARD',
    plainPassword: 'NEXUS-2026',
    credits: 1000,
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
      creditsEarned: 1000,
      creditsSpent: 0,
      hintsPurchased: 0,
      extraTimePurchased: 0,
      abilitiesUsed: 0,
      riskProfile: 'SAFE',
      coreProgressPercent: 25,
      lastActionAt: new Date(),
      recentActivity: [
        {
          eventId: 'EVT-VG-0',
          type: 'TEAM_INITIALIZED',
          summary: 'Allocated 1,000 starting Resistance Credits',
          creditsDelta: 1000,
          timestamp: new Date(),
        },
      ],
    },
  },
];

export const ensureDefaultTeamsSeeded = async () => {
  if (mongoose.connection.readyState !== 1) return;

  try {
    for (const seed of SEED_TEAMS) {
      const existing = await Team.findOne({ teamId: seed.teamId });
      if (!existing) {
        const passwordHash = await hashPassword(seed.plainPassword);
        const { plainPassword, ...teamData } = seed;
        await Team.create({
          ...teamData,
          passwordHash,
        });
        logger.info('SEED', `Seeded operative team [${seed.teamId}]`);
      }
    }
  } catch (err) {
    logger.warn('SEED', `Team seed check warning: ${err.message}`);
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

  const token = signTeamToken(team);
  return {
    token,
    team: team.toPublicJSON(),
  };
};

export const getTeamStateById = async (rawTeamId) => {
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
  return team.toPublicJSON();
};

const pushActivity = (team, type, summary, creditsDelta = 0) => {
  const entry = {
    eventId: `EVT-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    type,
    summary,
    creditsDelta,
    timestamp: new Date(),
  };
  team.stats.recentActivity = [entry, ...(team.stats.recentActivity || []).slice(0, 19)];
  team.stats.lastActionAt = new Date();
  return entry;
};

/**
 * Server-authoritative team mutation handler.
 * Supports:
 * - PURCHASE_CHALLENGE
 * - SPEND_CREDITS (hints / extra time)
 * - USE_ABILITY
 * - SUBMIT_CHALLENGE
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

  let eventRecord = null;

  switch (actionType) {
    case 'PURCHASE_CHALLENGE': {
      const challengeId = payload.challengeId || 'CHG-FOR-02';
      const selected =
        CHALLENGE_CATALOG.find((c) => c.challengeId === challengeId) || CHALLENGE_CATALOG[0];

      if (team.credits < selected.cost) {
        const err = new Error(
          `Insufficient Resistance Credits (${team.credits} CR available, ${selected.cost} CR required).`
        );
        err.statusCode = 400;
        err.code = 'INSUFFICIENT_CREDITS';
        throw err;
      }

      team.credits -= selected.cost;
      team.stats.creditsSpent += selected.cost;
      team.stats.riskProfile = selected.risk;
      team.currentChallenge = {
        ...selected,
        timestamp: new Date(),
      };
      team.activeAttempt = {
        attemptId: `ATT-${Date.now().toString().slice(-4)}`,
        challengeId: selected.challengeId,
        title: selected.title,
        category: selected.category,
        costPaid: selected.cost,
        potentialReward: selected.reward,
        penaltyOnFail: selected.penalty,
        hintsUnlocked: 0,
        extraTimeMinutes: 0,
        startedAt: new Date(),
        status: 'IN_PROGRESS',
      };

      eventRecord = pushActivity(
        team,
        'CHALLENGE_PURCHASED',
        `Purchased challenge [${selected.title}] (-${selected.cost} CR)`,
        -selected.cost
      );
      break;
    }

    case 'SPEND_CREDITS': {
      const itemType = payload.itemType || 'HINT'; // 'HINT' or 'EXTRA_TIME'
      const cost = Number(payload.cost) || (itemType === 'EXTRA_TIME' ? 150 : 100);

      if (team.credits < cost) {
        const err = new Error(`Insufficient Resistance Credits (${cost} CR required).`);
        err.statusCode = 400;
        err.code = 'INSUFFICIENT_CREDITS';
        throw err;
      }

      team.credits -= cost;
      team.stats.creditsSpent += cost;

      if (itemType === 'EXTRA_TIME') {
        team.stats.extraTimePurchased += 1;
        if (team.activeAttempt) {
          team.activeAttempt.extraTimeMinutes += 5;
        }
        eventRecord = pushActivity(
          team,
          'CREDITS_SPENT',
          `Allocated +5m Extra Time (-${cost} CR)`,
          -cost
        );
      } else {
        team.stats.hintsPurchased += 1;
        if (team.activeAttempt) {
          team.activeAttempt.hintsUnlocked += 1;
        }
        eventRecord = pushActivity(
          team,
          'CREDITS_SPENT',
          `Decrypted Tactical Hint (-${cost} CR)`,
          -cost
        );
      }
      break;
    }

    case 'USE_ABILITY': {
      const abilityId = payload.abilityId || 'ABL-01';
      const ability = team.abilities.find((a) => a.abilityId === abilityId);

      if (!ability) {
        const err = new Error('Specified ability module not found.');
        err.statusCode = 404;
        throw err;
      }

      if (team.credits < ability.cost) {
        const err = new Error(
          `Insufficient Resistance Credits to activate ${ability.name} (${ability.cost} CR required).`
        );
        err.statusCode = 400;
        err.code = 'INSUFFICIENT_CREDITS';
        throw err;
      }

      team.credits -= ability.cost;
      team.stats.creditsSpent += ability.cost;
      team.stats.abilitiesUsed += 1;
      ability.status = 'ACTIVE';
      ability.lastUsedAt = new Date();
      ability.chargePercent = Math.max(15, (ability.chargePercent || 100) - 25);

      eventRecord = pushActivity(
        team,
        'ABILITY_ACTIVATED',
        `Activated ability [${ability.name}] (-${ability.cost} CR)`,
        -ability.cost
      );
      break;
    }

    case 'SUBMIT_CHALLENGE': {
      const active = team.currentChallenge || CHALLENGE_CATALOG[0];
      const solutionText = String(payload.solution || '').trim();
      if (!solutionText) {
        const err = new Error('Submission payload cannot be empty.');
        err.statusCode = 400;
        throw err;
      }

      const isFailure = solutionText.toUpperCase().includes('FAIL');

      if (!isFailure) {
        const reward = active.reward || 500;
        team.credits += reward;
        team.stats.creditsEarned += reward;
        team.stats.totalSolved += 1;
        team.stats.coreProgressPercent = Math.min(100, (team.stats.coreProgressPercent || 50) + 14);
        team.completedChallenges.unshift({
          challengeId: active.challengeId,
          title: active.title,
          category: active.category,
          cost: active.cost,
          reward,
          penalty: active.penalty,
          difficulty: active.difficulty,
          risk: active.risk,
          timestamp: new Date(),
        });

        eventRecord = pushActivity(
          team,
          'SUBMISSION_SOLVED',
          `Verified solution for [${active.title}] (+${reward} CR)`,
          reward
        );
      } else {
        const penalty = active.penalty || 100;
        team.credits = Math.max(0, team.credits - penalty);
        team.stats.totalFailed += 1;
        team.failedChallenges.unshift({
          challengeId: active.challengeId,
          title: active.title,
          category: active.category,
          cost: active.cost,
          reward: active.reward,
          penalty,
          difficulty: active.difficulty,
          risk: active.risk,
          timestamp: new Date(),
        });

        eventRecord = pushActivity(
          team,
          'SUBMISSION_FAILED',
          `Failed verification for [${active.title}] (-${penalty} CR penalty)`,
          -penalty
        );
      }

      team.currentChallenge = null;
      team.activeAttempt = null;
      break;
    }

    default: {
      const err = new Error(`Unsupported team action: ${actionType}`);
      err.statusCode = 400;
      throw err;
    }
  }

  await team.save();

  return {
    team: team.toPublicJSON(),
    event: eventRecord,
    catalog: CHALLENGE_CATALOG,
  };
};
