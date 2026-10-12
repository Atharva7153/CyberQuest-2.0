import mongoose from 'mongoose';
import { Team } from '../models/Team.js';
import { Volunteer } from '../models/Volunteer.js';
import {
  Challenge,
  CHALLENGE_CATEGORIES,
  CHALLENGE_DIFFICULTIES,
  CHALLENGE_RISKS,
  SUPPORTED_GAME_TYPES,
} from '../models/Challenge.js';
import { ChallengeAttempt } from '../models/ChallengeAttempt.js';
import { CreditTransaction } from '../models/CreditTransaction.js';
import { Ability } from '../models/Ability.js';
import {
  ensureDefaultTeamsSeeded,
  executeTeamAction,
  CHALLENGE_CATALOG,
} from './teamService.js';
import {
  ChallengeService,
  DEFAULT_CHALLENGE_CATALOG,
} from './challengeService.js';
import { CreditService } from './creditService.js';
import {
  AbilityService,
  DEFAULT_ABILITY_CATALOG,
} from './abilityService.js';
import { NexusCoreService } from './nexusCoreService.js';
import {
  computeGlobalArenaTimer,
  controlGlobalArenaEvent,
  getAdminEventLogs,
  recordAdminEventLog,
  buildPublicTopTeams,
  setGlobalDeclaredWinner,
  getGlobalDeclaredWinner,
} from './displayService.js';
import { normalizeAttemptHistory } from './progressHistoryService.js';
import { AuditService, AUDIT_ACTION_TYPES } from './auditService.js';
import { RecordingService } from './recordingService.js';
import { resetRateLimitBuckets } from '../middleware/rateLimitMiddleware.js';
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
import { hashPassword } from '../utils/password.js';
import { signAdminToken } from '../utils/jwt.js';
import { getSocketServer } from '../socket/index.js';
import { SOCKET_ROOMS } from '../socket/socketEvents.js';

export const SEEDED_ADMIN_OPERATORS = [
  {
    operatorId: 'ADMIN-NEXUS',
    plainPassword: 'NEXUS-ADMIN-2026',
    name: 'DIRECTOR VANCE // NEXUS COMMAND',
    role: 'ADMIN',
    clearance: 'OMEGA-ADMIN',
    sector: 'CENTRAL COMMAND',
  },
  {
    operatorId: 'VOLUNTEER-01',
    plainPassword: 'NEXUS-VOL-2026',
    name: 'SECTOR MARSHAL 01 // FLOOR OPS',
    role: 'VOLUNTEER',
    clearance: 'SECTOR-VOLUNTEER',
    sector: 'FLOOR OPS',
  },
];

// In-memory fallback store for Floor Volunteers
const inMemoryVolunteers = [
  {
    operatorId: 'VOLUNTEER-01',
    plainPassword: 'NEXUS-VOL-2026',
    name: 'SECTOR MARSHAL 01 // FLOOR OPS',
    role: 'VOLUNTEER',
    clearance: 'SECTOR-VOLUNTEER',
    sector: 'FLOOR OPS',
    createdBy: 'SYSTEM_SEED',
    createdAt: new Date().toISOString(),
  },
];

// Runtime mutable override for credits settings
const runtimeSettingsOverride = {
  startingCredits: null,
  hintCost: null,
  extraTimeCost: null,
  extraTimeMinutes: null,
  reattemptMultiplier: null,
  arenaAnnouncement: 'ALL SECTORS NOMINAL // RESISTANCE OPERATIVES ACTIVE',
};

let cachedAdminChallenges = null;
let cachedAdminChallengesExpiresAt = 0;

const getRoomConnectionCount = (teamId) => {
  const io = getSocketServer();
  if (!io) return 0;
  const roomName = SOCKET_ROOMS.teamRoom(teamId);
  const room = io.sockets.adapter.rooms.get(roomName);
  return room ? room.size : 0;
};

const getRoomConnectedMemberIds = (teamId) => {
  const memberIds = new Set();
  const io = getSocketServer();
  if (!io) return memberIds;
  const roomName = SOCKET_ROOMS.teamRoom(teamId);
  const room = io.sockets.adapter.rooms.get(roomName);
  if (!room) return memberIds;
  for (const socketId of room) {
    const s = io.sockets.sockets.get(socketId);
    if (s?.data?.memberId) {
      memberIds.add(String(s.data.memberId).trim().toUpperCase());
    }
  }
  return memberIds;
};

/**
 * Normalize 1 to 4 team members (SOLO = 1, DUO = 2, TRIO = 3, SQUAD = 4 max)
 */
export const buildNormalizedTeamMembers = (rawMembers = [], requestedSize = null) => {
  const validStringsOrObjs = Array.isArray(rawMembers)
    ? rawMembers.filter((m) =>
        typeof m === 'string' ? m.trim().length > 0 : Boolean(m && String(m.name || '').trim())
      )
    : [];

  const targetCount = Math.min(
    4,
    Math.max(1, Number(requestedSize || validStringsOrObjs.length || 1))
  );

  return Array.from({ length: targetCount }, (_, idx) => {
    const raw = Array.isArray(rawMembers) ? rawMembers[idx] : null;
    const rawName =
      typeof raw === 'string' ? raw.trim() : String(raw?.name || '').trim();
    const defaultName = idx === 0 ? 'PLAYER 1 (LEAD)' : `PLAYER ${idx + 1}`;
    return {
      memberId: raw?.memberId || `OP-0${idx + 1}`,
      name: (rawName || defaultName).toUpperCase(),
      role: raw?.role || (idx === 0 ? 'LEAD' : 'OPERATIVE'),
      online: Boolean(raw?.online),
    };
  });
};

export class AdminService {
  static invalidateAdminChallengeCache() {
    cachedAdminChallenges = null;
    cachedAdminChallengesExpiresAt = 0;
  }

  /**
   * Ensure default Floor Volunteer is seeded in MongoDB
   */
  static async ensureDefaultVolunteersSeeded() {
    if (mongoose.connection.readyState !== 1) return;
    try {
      const count = await Volunteer.countDocuments();
      if (count === 0) {
        const seedVol = SEEDED_ADMIN_OPERATORS.find((op) => op.role === 'VOLUNTEER');
        if (seedVol) {
          await Volunteer.findOneAndUpdate(
            { operatorId: seedVol.operatorId },
            {
              $setOnInsert: {
                operatorId: seedVol.operatorId,
                name: seedVol.name,
                plainPassword: seedVol.plainPassword,
                role: 'VOLUNTEER',
                clearance: 'SECTOR-VOLUNTEER',
                sector: seedVol.sector || 'FLOOR OPS',
                createdBy: 'SYSTEM_SEED',
              },
            },
            { upsert: true }
          );
        }
      }
    } catch {
      // Ignore transient seed error
    }
  }

  /**
   * List all Floor Volunteers
   */
  static async listVolunteers() {
    await this.ensureDefaultVolunteersSeeded();
    if (mongoose.connection.readyState === 1) {
      const docs = await Volunteer.find({}).sort({ createdAt: 1 }).lean();
      if (docs.length > 0) {
        return docs.map((d) => ({
          operatorId: d.operatorId,
          name: d.name,
          plainPassword: d.plainPassword,
          role: 'VOLUNTEER',
          clearance: d.clearance || 'SECTOR-VOLUNTEER',
          sector: d.sector || 'FLOOR OPS',
          createdBy: d.createdBy || 'ADMIN-NEXUS',
          createdAt: d.createdAt,
        }));
      }
    }
    return [...inMemoryVolunteers];
  }

  /**
   * Create or update a Floor Volunteer (Admin only)
   */
  static async createVolunteer(payload = {}, actor = 'ADMIN-NEXUS') {
    await this.ensureDefaultVolunteersSeeded();

    const rawName = String(payload.name || '').trim().toUpperCase();
    const rawId = String(payload.operatorId || '').trim().toUpperCase();
    const plainPassword = String(payload.password || payload.plainPassword || 'NEXUS-VOL-2026').trim();
    const sector = String(payload.sector || 'FLOOR OPS').trim().toUpperCase() || 'FLOOR OPS';

    if (!rawName && !rawId) {
      const err = new Error('Volunteer Name or Operator ID is required.');
      err.statusCode = 400;
      throw err;
    }
    if (!plainPassword) {
      const err = new Error('Volunteer password is required.');
      err.statusCode = 400;
      throw err;
    }

    const existingList = await this.listVolunteers();
    const nextNum = existingList.length + 1;
    const operatorId = rawId
      ? rawId.replace(/[^A-Z0-9-_]+/g, '-')
      : `VOLUNTEER-${String(nextNum).padStart(2, '0')}`;

    if (operatorId === 'ADMIN-NEXUS') {
      const err = new Error('Cannot overwrite primary ADMIN-NEXUS operator.');
      err.statusCode = 409;
      throw err;
    }

    const name = rawName || operatorId;
    const volunteerRecord = {
      operatorId,
      name,
      plainPassword,
      role: 'VOLUNTEER',
      clearance: 'SECTOR-VOLUNTEER',
      sector,
      createdBy: actor,
    };

    if (mongoose.connection.readyState === 1) {
      await Volunteer.findOneAndUpdate(
        { operatorId },
        { $set: volunteerRecord },
        { upsert: true, new: true }
      );
    }

    const memIdx = inMemoryVolunteers.findIndex((v) => v.operatorId === operatorId);
    if (memIdx >= 0) {
      inMemoryVolunteers[memIdx] = { ...inMemoryVolunteers[memIdx], ...volunteerRecord };
    } else {
      inMemoryVolunteers.push({ ...volunteerRecord, createdAt: new Date().toISOString() });
    }

    const summaryMsg = `CREATED FLOOR VOLUNTEER [${operatorId}] (${name} · ${sector})`;
    recordAdminEventLog({
      action: 'CREATE_VOLUNTEER',
      category: 'VOLUNTEER_CONTROL',
      actor,
      summary: summaryMsg,
    });

    const state = await this.getAdminControlState();
    return {
      ...state,
      createdVolunteer: volunteerRecord,
    };
  }

  /**
   * Delete a Floor Volunteer (Admin only)
   */
  static async deleteVolunteer(rawOperatorId, actor = 'ADMIN-NEXUS') {
    const operatorId = String(rawOperatorId || '').trim().toUpperCase();
    if (!operatorId) {
      const err = new Error('Volunteer Operator ID is required.');
      err.statusCode = 400;
      throw err;
    }
    if (operatorId === 'ADMIN-NEXUS') {
      const err = new Error('Cannot delete primary ADMIN-NEXUS account.');
      err.statusCode = 403;
      throw err;
    }

    if (mongoose.connection.readyState === 1) {
      await Volunteer.deleteOne({ operatorId });
    }
    const memIdx = inMemoryVolunteers.findIndex((v) => v.operatorId === operatorId);
    if (memIdx >= 0) {
      inMemoryVolunteers.splice(memIdx, 1);
    }

    recordAdminEventLog({
      action: 'DELETE_VOLUNTEER',
      category: 'VOLUNTEER_CONTROL',
      actor,
      summary: `REMOVED FLOOR VOLUNTEER [${operatorId}]`,
    });

    return this.getAdminControlState();
  }

  /**
   * Authenticate an Admin or Volunteer operator
   */
  static async authenticateOperator(rawOperatorId, plainPassword) {
    const normalizedId = String(rawOperatorId || '')
      .trim()
      .toUpperCase();
    const pass = String(plainPassword || '').trim();

    if (!normalizedId || !pass) {
      const err = new Error('OPERATOR ID and ACCESS KEY are required.');
      err.statusCode = 400;
      throw err;
    }

    const volunteers = await this.listVolunteers();
    const allOperators = [
      ...SEEDED_ADMIN_OPERATORS.filter((op) => op.role === 'ADMIN'),
      ...volunteers,
      ...SEEDED_ADMIN_OPERATORS,
    ];

    const match = allOperators.find(
      (op) => String(op.operatorId).toUpperCase() === normalizedId && op.plainPassword === pass
    );

    if (!match) {
      const err = new Error('Invalid Admin / Volunteer credentials.');
      err.statusCode = 401;
      throw err;
    }

    const operator = {
      operatorId: match.operatorId,
      name: match.name,
      role: match.role,
      clearance: match.clearance || (match.role === 'ADMIN' ? 'OMEGA-ADMIN' : 'SECTOR-VOLUNTEER'),
      sector: match.sector || 'FLOOR OPS',
    };

    const token = signAdminToken(operator);

    AuditService.record({
      action: AUDIT_ACTION_TYPES.LOGIN,
      actorType: operator.role,
      actorId: operator.operatorId,
      summary: `Admin/Volunteer operator [${operator.operatorId}] (${operator.role}) authenticated into Control System.`,
      metadata: { clearance: operator.clearance },
    }).catch(() => {});

    return { token, operator };
  }

  /**
   * List all challenges including disabled challenges and solutionConfig for Admin editing
   */
  static async listAllChallengesForAdmin() {
    if (cachedAdminChallenges && Date.now() < cachedAdminChallengesExpiresAt) {
      return cachedAdminChallenges;
    }
    await ensureDefaultTeamsSeeded();
    if (mongoose.connection.readyState === 1) {
      const docs = await Challenge.find({})
        .select('+solutionConfig')
        .sort({ category: 1, cost: 1 })
        .lean();
      if (docs.length > 0) {
        cachedAdminChallenges = docs;
        cachedAdminChallengesExpiresAt = Date.now() + 5000;
        return docs;
      }
    }
    return DEFAULT_CHALLENGE_CATALOG;
  }

  /**
   * Build the full Admin & Volunteer Control System state (Optimized single-wave query)
   */
  static async getAdminControlState() {
    await ensureDefaultTeamsSeeded();

    const [
      teams,
      challenges,
      attempts,
      transactions,
      abilities,
      coreDoc,
      auditLogs,
      volunteers,
    ] = await Promise.all([
      Team.find({ teamId: { $not: /^SIM-TEAM-/ } }).sort({ credits: -1 }).lean(),
      this.listAllChallengesForAdmin(),
      ChallengeAttempt.find({ teamId: { $not: /^SIM-TEAM-/ } })
        .sort({ startedAt: -1 })
        .limit(60)
        .lean(),
      CreditTransaction.find({ teamId: { $not: /^SIM-TEAM-/ } })
        .sort({ timestamp: -1 })
        .limit(80)
        .lean(),
      AbilityService.listAbilities(),
      NexusCoreService.getCoreConfigDoc({ includeSolution: true }),
      AuditService.listLogs({ limit: 40 }),
      this.listVolunteers(),
    ]);

    const io = getSocketServer();
    const totalConnectedSockets = io ? io.engine.clientsCount : 0;

    // Pre-group attempts & transactions by teamId in O(N)
    const attemptsByTeam = new Map();
    for (const att of attempts) {
      const list = attemptsByTeam.get(att.teamId);
      if (list) list.push(att);
      else attemptsByTeam.set(att.teamId, [att]);
    }

    const txByTeam = new Map();
    for (const tx of transactions) {
      const list = txByTeam.get(tx.teamId);
      if (list) list.push(tx);
      else txByTeam.set(tx.teamId, [tx]);
    }

    let unlockedTeamsCount = 0;
    let activeTeamsCount = 0;
    let completedTeamsCount = 0;

    // Enrich each team with connection state, per-player online status, accessPassword, active timer, attempt history, and credit ledger
    const enrichedTeams = teams.map((team) => {
      const onlineOperatives = getRoomConnectionCount(team.teamId);
      const connectedMemberIds = getRoomConnectedMemberIds(team.teamId);
      const roomName = SOCKET_ROOMS.teamRoom(team.teamId);
      const teamAttempts = attemptsByTeam.get(team.teamId) || [];
      const teamTransactions = txByTeam.get(team.teamId) || [];
      const history = normalizeAttemptHistory(team, teamAttempts, challenges);
      const activeTimer = ChallengeService.computeSessionTimerTelemetry(team.activeAttempt);
      const coreState = NexusCoreService.computeAuthoritativeState(team, coreDoc);

      if (coreState === 'AVAILABLE') unlockedTeamsCount += 1;
      else if (coreState === 'ACTIVE') {
        unlockedTeamsCount += 1;
        activeTeamsCount += 1;
      } else if (coreState === 'COMPLETED') {
        unlockedTeamsCount += 1;
        completedTeamsCount += 1;
      }

      const rawMembers = Array.isArray(team.members) ? team.members : [];
      const memberCount = Math.min(4, Math.max(1, rawMembers.length || 1));
      const enrichedMembers = rawMembers.map((m, idx) => {
        const mId = String(m.memberId || `OP-0${idx + 1}`).trim().toUpperCase();
        const isSocketOnline =
          connectedMemberIds.has(mId) ||
          (connectedMemberIds.size === 0 && onlineOperatives > 0 && idx === 0);
        const isRecentLogin =
          Boolean(m.online) &&
          m.lastSeenAt &&
          Date.now() - new Date(m.lastSeenAt).getTime() < 60 * 1000;
        return {
          ...m,
          memberId: mId,
          online: Boolean(isSocketOnline || isRecentLogin || (onlineOperatives > 0 && m.online)),
        };
      });

      const onlinePlayersCount = enrichedMembers.filter((m) => m.online).length;
      const isTeamOnline = onlineOperatives > 0 || onlinePlayersCount > 0;

      const teamFormat =
        memberCount === 1
          ? 'SOLO'
          : memberCount === 2
            ? 'DUO'
            : memberCount === 3
              ? 'TRIO'
              : 'SQUAD';

      const plainPassword = team.accessPassword || 'NEXUS-2026';

      return {
        ...team,
        accessPassword: plainPassword,
        password: plainPassword,
        members: enrichedMembers,
        teamSize: memberCount,
        teamFormat,
        coreState,
        activeTimer,
        connectionState: {
          connected: isTeamOnline,
          status: isTeamOnline ? 'ONLINE' : 'OFFLINE',
          onlineOperatives: Math.max(onlineOperatives, onlinePlayersCount),
          onlinePlayersCount,
          room: roomName,
        },
        attemptHistory: history,
        recentTransactions: teamTransactions.slice(0, 15),
      };
    });

    const leaderboard = await buildPublicTopTeams(enrichedTeams);

    // Enrich attempts with teamName and canonical fields
    const teamNameMap = new Map(teams.map((t) => [t.teamId, t.teamName || t.teamId]));
    const enrichedAttempts = attempts.map((att) => {
      const timer =
        att.status === 'IN_PROGRESS'
          ? ChallengeService.computeSessionTimerTelemetry(att)
          : null;
      return {
        ...att,
        attemptNumber: Math.max(1, Number(att.attemptNumber || (att.isReattempt ? 2 : 1))),
        challengeTitle: att.title || att.challengeTitle || att.challengeId,
        cost: Number(att.costPaid ?? att.cost ?? 0),
        reward: Number(att.potentialReward ?? att.reward ?? 0),
        penalty: Number(att.penaltyOnFail ?? att.penalty ?? 0),
        result: att.result || att.status || 'IN_PROGRESS',
        teamName: teamNameMap.get(att.teamId) || att.teamId,
        timer,
      };
    });

    const baseCreditsCfg = CreditService.getConfig();
    const effectiveSettings = {
      startingCredits:
        runtimeSettingsOverride.startingCredits ?? baseCreditsCfg.startingCredits,
      hintCost: runtimeSettingsOverride.hintCost ?? baseCreditsCfg.hintCost,
      extraTimeCost: runtimeSettingsOverride.extraTimeCost ?? baseCreditsCfg.extraTimeCost,
      extraTimeMinutes:
        runtimeSettingsOverride.extraTimeMinutes ?? baseCreditsCfg.extraTimeMinutes,
      reattemptMultiplier:
        runtimeSettingsOverride.reattemptMultiplier ?? baseCreditsCfg.reattemptMultiplier,
      arenaAnnouncement: runtimeSettingsOverride.arenaAnnouncement,
    };

    const globalCoreState =
      coreDoc?.globalOverrideState ||
      (completedTeamsCount > 0
        ? 'COMPLETED'
        : activeTeamsCount > 0
          ? 'ACTIVE'
          : unlockedTeamsCount > 0
            ? 'AVAILABLE'
            : 'LOCKED');

    return {
      status: 'ok',
      service: 'cyber-quest-admin-control',
      serverTime: new Date().toISOString(),
      monitor: {
        totalTeams: enrichedTeams.length,
        onlineTeamsCount: enrichedTeams.filter((t) => t.connectionState.connected).length,
        activeSessionsCount: enrichedTeams.filter(
          (t) => t.activeAttempt?.status === 'IN_PROGRESS'
        ).length,
        totalConnectedSockets,
      },
      globalTimer: computeGlobalArenaTimer(),
      coreStatus: {
        state: globalCoreState,
        unlockedTeamsCount,
        activeTeamsCount,
        completedTeamsCount,
        globalOverrideState: coreDoc?.globalOverrideState || null,
        unlockConfig: coreDoc?.unlockConfig || {},
        gameType: coreDoc?.gameType || 'systemProblem',
        gameConfig: coreDoc?.gameConfig || {},
        expectedAnswer: coreDoc?.solutionConfig?.expectedAnswer || 'NEXUS-OMEGA',
        declaredWinner: getGlobalDeclaredWinner(),
      },
      teams: enrichedTeams,
      leaderboard,
      volunteers,
      challenges,
      attempts: enrichedAttempts,
      transactions: transactions.slice(0, 50),
      abilitiesCatalog: abilities,
      recentSystemEvents: getAdminEventLogs().slice(0, 15),
      adminEventLogs: getAdminEventLogs(),
      auditLogs: auditLogs || [],
      recording: RecordingService.getStatus(),
      settings: effectiveSettings,
    };
  }

  /**
   * Create or update a Challenge (CHALLENGE CONTROL)
   * Supports: challengeId, title, category, description, cost, reward, penalty,
   * difficulty, risk, time (timeLimit), gameType, gameConfig, solutionConfig, enabled, available
   */
  static async upsertChallenge(payload = {}, actor = 'ADMIN-NEXUS') {
    await ensureDefaultTeamsSeeded();

    const rawId = String(payload.challengeId || '')
      .trim()
      .toUpperCase();
    const challengeId =
      rawId || `CHG-ADM-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const category = CHALLENGE_CATEGORIES.includes(String(payload.category || '').toUpperCase())
      ? String(payload.category).toUpperCase()
      : 'TECHNICAL';

    const difficulty = CHALLENGE_DIFFICULTIES.includes(
      String(payload.difficulty || '').toUpperCase()
    )
      ? String(payload.difficulty).toUpperCase()
      : 'MODERATE';

    const risk = CHALLENGE_RISKS.includes(String(payload.risk || '').toUpperCase())
      ? String(payload.risk).toUpperCase()
      : 'BALANCED';

    const gameType = SUPPORTED_GAME_TYPES.includes(String(payload.gameType || ''))
      ? String(payload.gameType)
      : 'wordGuess';

    const cost = Math.max(0, Number(payload.cost ?? 300));
    const reward = Math.max(0, Number(payload.reward ?? 650));
    const penalty = Math.max(0, Number(payload.penalty ?? Math.round(cost * 0.25)));
    const timeLimit = Math.max(60, Number(payload.timeLimit ?? payload.time ?? 900));
    const enabled = payload.enabled !== undefined ? Boolean(payload.enabled) : true;
    const available = payload.available !== undefined ? Boolean(payload.available) : true;

    let parsedGameConfig = payload.gameConfig || {};
    if (typeof parsedGameConfig === 'string') {
      try {
        parsedGameConfig = JSON.parse(parsedGameConfig);
      } catch {
        parsedGameConfig = { prompt: parsedGameConfig };
      }
    }

    const expectedAnswer = String(
      payload.expectedAnswer ??
        payload.solutionConfig?.expectedAnswer ??
        parsedGameConfig.expectedAnswer ??
        'NEXUS'
    )
      .trim()
      .toUpperCase();

    const hintsArray = Array.isArray(payload.hints)
      ? payload.hints
      : Array.isArray(payload.solutionConfig?.hints)
      ? payload.solutionConfig.hints
      : [
          `HINT 01 // Primary verification token starts with "${expectedAnswer.slice(0, 2)}".`,
          `HINT 02 // Expected token length is ${expectedAnswer.length} characters.`,
        ];

    const challengeData = {
      challengeId,
      title: String(payload.title || challengeId).trim().toUpperCase(),
      category,
      description: String(
        payload.description || 'Classified NEXUS tactical challenge module.'
      ).trim(),
      difficulty,
      risk,
      cost,
      reward,
      penalty,
      timeLimit,
      gameType,
      gameConfig: {
        sector: `SECTOR // ${category}`,
        artworkKey: category,
        maxHints: 2,
        ...parsedGameConfig,
      },
      solutionConfig: {
        expectedAnswer,
        acceptedAnswers: [expectedAnswer, `NEXUS{${expectedAnswer}}`],
        hints: hintsArray,
      },
      enabled,
      available,
    };

    if (mongoose.connection.readyState === 1) {
      await Challenge.findOneAndUpdate(
        { challengeId },
        { $set: challengeData },
        { upsert: true, new: true }
      );
    }

    // Keep in-memory catalog in sync as well
    const memIdx = DEFAULT_CHALLENGE_CATALOG.findIndex((c) => c.challengeId === challengeId);
    if (memIdx >= 0) {
      DEFAULT_CHALLENGE_CATALOG[memIdx] = {
        ...DEFAULT_CHALLENGE_CATALOG[memIdx],
        ...challengeData,
      };
    } else {
      DEFAULT_CHALLENGE_CATALOG.push(challengeData);
    }
    ChallengeService.invalidateCatalogCache();
    this.invalidateAdminChallengeCache();

    const summaryMsg = `${memIdx >= 0 ? 'UPDATED' : 'CREATED'} CHALLENGE [${challengeId}] ${
      challengeData.title
    } (${cost} CR / +${reward} CR / ${risk} / ${enabled ? 'ENABLED' : 'DISABLED'})`;

    recordAdminEventLog({
      action: memIdx >= 0 ? 'EDIT_CHALLENGE' : 'CREATE_CHALLENGE',
      category: 'CHALLENGE_CONTROL',
      actor,
      summary: summaryMsg,
    });

    AuditService.record({
      action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
      actorType: 'ADMIN',
      actorId: actor,
      challengeId,
      summary: summaryMsg,
      metadata: {
        subAction: memIdx >= 0 ? 'EDIT_CHALLENGE' : 'CREATE_CHALLENGE',
        cost,
        reward,
        risk,
        enabled,
      },
    }).catch(() => {});

    return challengeData;
  }

  /**
   * Toggle challenge enabled / available status quickly
   */
  static async toggleChallengeStatus(challengeId, { enabled, available }, actor = 'ADMIN-NEXUS') {
    const normalizedId = String(challengeId || '')
      .trim()
      .toUpperCase();
    const existingList = await this.listAllChallengesForAdmin();
    const existing = existingList.find((c) => c.challengeId === normalizedId);
    if (!existing) {
      const err = new Error(`Challenge [${normalizedId}] not found.`);
      err.statusCode = 404;
      throw err;
    }

    return this.upsertChallenge(
      {
        ...existing,
        enabled: enabled !== undefined ? Boolean(enabled) : !existing.enabled,
        available: available !== undefined ? Boolean(available) : existing.available,
      },
      actor
    );
  }

  /**
   * Register a new Team (Supports Solo = 1, Duo = 2, Trio = 3, Squad = 4 max + custom initial credits)
   */
  static async registerTeam(payload = {}, actor = 'ADMIN-NEXUS') {
    await ensureDefaultTeamsSeeded();

    const rawTeamName = String(payload.teamName || payload.name || '')
      .trim()
      .toUpperCase();
    const rawTeamId = String(payload.teamId || '')
      .trim()
      .toUpperCase();

    if (!rawTeamName && !rawTeamId) {
      const err = new Error('Team Name or Team ID is required to register a team.');
      err.statusCode = 400;
      throw err;
    }

    const cleanSlug = (rawTeamId || rawTeamName)
      .replace(/^TEAM[-_\s]*/i, '')
      .replace(/[^A-Z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 18);

    const normalizedTeamId = rawTeamId
      ? rawTeamId.replace(/\s+/g, '-')
      : `TEAM-${cleanSlug || Math.floor(100 + Math.random() * 900)}`;

    const normalizedTeamName =
      rawTeamName || normalizedTeamId.replace(/^TEAM[-_]/i, '') || normalizedTeamId;

    const existing = await Team.findOne({ teamId: normalizedTeamId }).lean();
    if (existing) {
      const err = new Error(`Team [${normalizedTeamId}] is already registered.`);
      err.statusCode = 409;
      throw err;
    }

    const plainPassword = String(payload.password || 'NEXUS-2026').trim() || 'NEXUS-2026';
    const passwordHash = await hashPassword(plainPassword);

    const defaultStarting =
      runtimeSettingsOverride.startingCredits ?? creditsConfig.getStartingCredits();
    const initialCredits = Math.max(
      0,
      Number(
        payload.initialCredits !== undefined && payload.initialCredits !== ''
          ? payload.initialCredits
          : payload.credits !== undefined && payload.credits !== ''
            ? payload.credits
            : defaultStarting
      )
    );

    const requestedSize = Math.min(
      4,
      Math.max(1, Number(payload.teamSize || payload.members?.length || 1))
    );
    const members = buildNormalizedTeamMembers(payload.members, requestedSize);
    const formatLabel =
      members.length === 1
        ? 'SOLO'
        : members.length === 2
          ? 'DUO'
          : members.length === 3
            ? 'TRIO'
            : 'SQUAD';

    const abilities = AbilityService.buildInitialTeamAbilitySlots(DEFAULT_ABILITY_CATALOG);
    const now = new Date();

    const newTeam = await Team.create({
      teamId: normalizedTeamId,
      teamName: normalizedTeamName,
      passwordHash,
      accessPassword: plainPassword,
      credits: initialCredits,
      status: 'ACTIVE',
      members,
      currentChallenge: null,
      activeAttempt: null,
      completedChallenges: [],
      failedChallenges: [],
      abilities,
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
        creditsEarned: initialCredits,
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
        lastActionAt: now,
        recentActivity: [
          {
            eventId: `EVT-INIT-${Date.now()}`,
            type: CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD,
            summary: `INITIAL TEAM REGISTRATION: +${initialCredits} CR (${formatLabel})`,
            creditsDelta: initialCredits,
            balanceAfter: initialCredits,
            timestamp: now,
          },
        ],
      },
    });

    if (initialCredits > 0) {
      CreditTransaction.create({
        teamId: normalizedTeamId,
        type: CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD,
        amount: initialCredits,
        balanceAfter: initialCredits,
        summary: `INITIAL TEAM REGISTRATION (+${initialCredits} CR)`,
        timestamp: now,
      }).catch(() => {});
    }

    const summaryMsg = `REGISTERED NEW TEAM [${normalizedTeamId}] (${normalizedTeamName} · ${formatLabel} · ${members.length}P) WITH ${initialCredits} CR`;
    recordAdminEventLog({
      action: 'REGISTER_TEAM',
      category: 'TEAM_CONTROL',
      actor,
      summary: summaryMsg,
    });

    AuditService.record({
      action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
      actorType: 'ADMIN',
      actorId: actor,
      teamId: normalizedTeamId,
      creditsDelta: initialCredits,
      balanceAfter: initialCredits,
      summary: summaryMsg,
      metadata: {
        subAction: 'REGISTER_TEAM',
        teamName: normalizedTeamName,
        teamSize: members.length,
        formatLabel,
        initialCredits,
      },
    }).catch(() => {});

    const state = await this.getAdminControlState();
    return {
      ...state,
      registeredTeam: {
        teamId: newTeam.teamId,
        teamName: newTeam.teamName,
        password: plainPassword,
        credits: newTeam.credits,
        teamSize: members.length,
        teamFormat: formatLabel,
        members,
      },
    };
  }

  /**
   * Admin Team Control Actions:
   * - REGISTER_TEAM
   * - ADJUST_CREDITS
   * - SET_CREDITS
   * - UPDATE_TEAM_MEMBERS / UPDATE_TEAM
   * - DELETE_TEAM
   * - FORCE_RESOLVE_ATTEMPT / ADJUDICATE_ATTEMPT
   * - SET_TEAM_CORE_STATE
   * - RESET_TEAM
   */
  static async executeAdminTeamControl({ teamId, action, payload = {} }, actor = 'ADMIN-NEXUS') {
    const normalizedAction = String(action || '').trim().toUpperCase();

    if (normalizedAction === 'REGISTER_TEAM' || normalizedAction === 'CREATE_TEAM') {
      return this.registerTeam({ ...payload, teamId: payload.teamId || teamId }, actor);
    }

    const normalizedTeamId = String(teamId || payload.teamId || '')
      .trim()
      .toUpperCase();
    const team = await Team.findOne({ teamId: normalizedTeamId });
    if (!team) {
      const err = new Error(`Team [${normalizedTeamId}] not found.`);
      err.statusCode = 404;
      throw err;
    }

    switch (normalizedAction) {
      case 'ADJUST_CREDITS': {
        const delta = Number(payload.amount ?? payload.delta ?? 0);
        const reason = String(payload.reason || 'ADMIN CREDIT ADJUSTMENT').trim();
        const txType =
          delta >= 0
            ? CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD
            : CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY;

        await CreditService.recordTransaction({
          teamDoc: team,
          type: txType,
          amount: Math.abs(delta),
          summary: `[ADMIN] ${reason} (${delta >= 0 ? '+' : '-'}${Math.abs(delta)} CR)`,
          autoSaveTeam: true,
        });

        const summaryMsg = `ADJUSTED ${normalizedTeamId} CREDITS BY ${
          delta >= 0 ? `+${delta}` : delta
        } CR (${reason})`;

        recordAdminEventLog({
          action: 'ADJUST_CREDITS',
          category: 'TEAM_CONTROL',
          actor,
          summary: summaryMsg,
        });

        AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          creditsDelta: delta,
          balanceAfter: team.credits,
          summary: summaryMsg,
          metadata: { subAction: 'ADJUST_CREDITS', reason },
        }).catch(() => {});
        break;
      }

      case 'SET_CREDITS': {
        const targetCredits = Math.max(0, Number(payload.credits ?? payload.amount ?? team.credits));
        const delta = targetCredits - Number(team.credits || 0);
        team.credits = targetCredits;
        await team.save();

        const summaryMsg = `SET ${normalizedTeamId} CREDITS TO ${targetCredits} CR`;
        recordAdminEventLog({
          action: 'SET_CREDITS',
          category: 'TEAM_CONTROL',
          actor,
          summary: summaryMsg,
        });

        AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          creditsDelta: delta,
          balanceAfter: team.credits,
          summary: summaryMsg,
          metadata: { subAction: 'SET_CREDITS', targetCredits },
        }).catch(() => {});
        break;
      }

      case 'UPDATE_TEAM_MEMBERS':
      case 'UPDATE_TEAM': {
        const requestedSize = Math.min(
          4,
          Math.max(1, Number(payload.teamSize || payload.members?.length || team.members?.length || 1))
        );
        team.members = buildNormalizedTeamMembers(
          payload.members || team.members,
          requestedSize
        );
        if (payload.teamName && String(payload.teamName).trim()) {
          team.teamName = String(payload.teamName).trim().toUpperCase();
        }
        if (payload.password && String(payload.password).trim()) {
          const cleanPass = String(payload.password).trim();
          team.passwordHash = await hashPassword(cleanPass);
          team.accessPassword = cleanPass;
        }
        team.markModified('members');
        await team.save();

        const summaryMsg = `UPDATED ${normalizedTeamId} ROSTER (${team.members.length} PLAYER${
          team.members.length > 1 ? 'S' : ''
        })`;
        recordAdminEventLog({
          action: 'UPDATE_TEAM',
          category: 'TEAM_CONTROL',
          actor,
          summary: summaryMsg,
        });
        break;
      }

      case 'DELETE_TEAM': {
        await Promise.all([
          Team.deleteOne({ teamId: normalizedTeamId }),
          ChallengeAttempt.deleteMany({ teamId: normalizedTeamId }),
          CreditTransaction.deleteMany({ teamId: normalizedTeamId }),
        ]);

        const summaryMsg = `DELETED TEAM [${normalizedTeamId}]`;
        recordAdminEventLog({
          action: 'DELETE_TEAM',
          category: 'TEAM_CONTROL',
          actor,
          summary: summaryMsg,
        });
        break;
      }

      case 'FORCE_COMPLETE_ATTEMPT':
      case 'ADJUDICATE_ATTEMPT': {
        const outcome = String(payload.outcome || 'SUCCESS').toUpperCase();
        if (outcome === 'ABANDONED') {
          await executeTeamAction(
            normalizedTeamId,
            'ABANDON_CHALLENGE',
            {
              challengeId: payload.challengeId || team.activeAttempt?.challengeId,
              attemptId: payload.attemptId || team.activeAttempt?.attemptId,
            },
            { isTrustedAdmin: true }
          );
        } else {
          await executeTeamAction(
            normalizedTeamId,
            'SUBMIT_CHALLENGE',
            {
              challengeId: payload.challengeId || team.activeAttempt?.challengeId,
              attemptId: payload.attemptId || team.activeAttempt?.attemptId,
              outcomeOverride: outcome === 'SUCCESS' ? 'SUCCESS' : 'FAILED',
              simulateFailure: outcome !== 'SUCCESS',
            },
            { isTrustedAdmin: true }
          );
        }

        const summaryMsg = `ADJUDICATED ${normalizedTeamId} ATTEMPT AS [${outcome}]`;
        recordAdminEventLog({
          action: 'ADJUDICATE_ATTEMPT',
          category: 'ATTEMPT_CONTROL',
          actor,
          summary: summaryMsg,
        });

        AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          summary: summaryMsg,
          metadata: { subAction: 'ADJUDICATE_ATTEMPT', outcome },
        }).catch(() => {});
        break;
      }

      case 'SET_TEAM_CORE_STATE': {
        const targetState = String(payload.state || 'AVAILABLE').toUpperCase();
        if (targetState === 'AVAILABLE') {
          await NexusCoreService.unlockCoreForTeam(team);
        } else if (targetState === 'ACTIVE') {
          await NexusCoreService.unlockCoreForTeam(team);
          await NexusCoreService.activateCoreForTeam(team);
        } else if (targetState === 'LOCKED') {
          team.nexusCore = {
            ...(team.nexusCore?.toObject ? team.nexusCore.toObject() : team.nexusCore || {}),
            state: 'LOCKED',
          };
          team.status = 'ACTIVE';
          team.markModified('nexusCore');
          await team.save();
        }
        const summaryMsg = `SET ${normalizedTeamId} CORE STATE TO [${targetState}]`;
        recordAdminEventLog({
          action: 'TEAM_CORE_STATE',
          category: 'CORE_CONTROL',
          actor,
          summary: summaryMsg,
        });

        AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          summary: summaryMsg,
          metadata: { subAction: 'SET_TEAM_CORE_STATE', targetState },
        }).catch(() => {});
        break;
      }

      case 'RESET_TEAM': {
        const effectiveStarting =
          runtimeSettingsOverride.startingCredits ?? creditsConfig.getStartingCredits();
        await executeTeamAction(
          normalizedTeamId,
          'RESET_DEMO_STATE',
          { credits: effectiveStarting },
          { isTrustedAdmin: true }
        );
        const summaryMsg = `RESET TEAM [${normalizedTeamId}] TO ZERO PROGRESS (${effectiveStarting} CR)`;
        recordAdminEventLog({
          action: 'RESET_TEAM',
          category: 'TEAM_CONTROL',
          actor,
          summary: summaryMsg,
        });

        AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          summary: summaryMsg,
          metadata: { subAction: 'RESET_TEAM' },
        }).catch(() => {});
        break;
      }

      default: {
        const err = new Error(`Unsupported admin team action: ${normalizedAction}`);
        err.statusCode = 400;
        throw err;
      }
    }

    return this.getAdminControlState();
  }

  /**
   * Reset all teams to zero progress, clear all challenge attempts & transactions so every
   * problem solved is solvable again, lock NEXUS Core, and reset round timer to standby.
   * Requires Admin Reset Password verification.
   */
  static async resetEverythingToZero(actor = 'ADMIN-NEXUS', payload = {}) {
    const providedPass = String(payload.resetPassword ?? payload.password ?? '').trim();
    const envResetPass = String(process.env.ADMIN_RESET_PASSWORD || '').trim();
    const validAdminPasswords = SEEDED_ADMIN_OPERATORS.filter((op) => op.role === 'ADMIN').map(
      (op) => op.plainPassword
    );
    if (envResetPass) {
      validAdminPasswords.push(envResetPass);
    }

    if (!providedPass || !validAdminPasswords.includes(providedPass)) {
      const err = new Error('Invalid Admin Reset Password. Global reset denied.');
      err.statusCode = 403;
      throw err;
    }

    resetRateLimitBuckets();
    const effectiveStarting =
      runtimeSettingsOverride.startingCredits ?? creditsConfig.getStartingCredits();
    const initialAbilities = AbilityService.buildInitialTeamAbilitySlots(DEFAULT_ABILITY_CATALOG);
    const now = new Date();

    await Promise.all([
      Team.deleteMany({ teamId: /^SIM-TEAM-/ }),
      ChallengeAttempt.deleteMany({}),
      CreditTransaction.deleteMany({}),
      Challenge.updateMany({}, { $set: { available: true } }),
      NexusCoreService.resetNexusCoreDemoState(),
    ]);

    await Team.updateMany(
      {},
      {
        $set: {
          credits: effectiveStarting,
          status: 'ACTIVE',
          currentChallenge: null,
          purchasedChallenges: [],
          activeAttempt: null,
          activeAttempts: [],
          completedChallenges: [],
          failedChallenges: [],
          abilities: initialAbilities,
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
            creditsEarned: effectiveStarting,
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
            lastActionAt: now,
            recentActivity: [],
          },
        },
      }
    );

    ChallengeService.invalidateCatalogCache();
    this.invalidateAdminChallengeCache();
    controlGlobalArenaEvent('RESET', {}, actor);

    const summaryMsg =
      'FULL ARENA RESET TO ZERO // ALL TEAMS RESTORED TO 0 SOLVED & ALL CHALLENGES SOLVABLE AGAIN';
    recordAdminEventLog({
      action: 'RESET_ALL',
      category: 'EVENT_CONTROL',
      actor,
      summary: summaryMsg,
    });
    AuditService.record({
      action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
      actorType: 'ADMIN',
      actorId: actor,
      summary: summaryMsg,
      metadata: { subAction: 'RESET_ALL', startingCredits: effectiveStarting },
    }).catch(() => {});

    const state = await this.getAdminControlState();
    return {
      ...state,
      coreStateUpdated: true,
      executedCommand: 'RESET_ALL',
    };
  }

  /**
   * Execute Global Event & Core Control:
   * - Event: START | PAUSE | RESUME | END | RESET_ALL
   * - Global Timer: SET_TIMER | ADJUST_TIMER
   * - Core: CORE_LOCK (LOCK) | CORE_UNLOCK (UNLOCK) | CORE_REVEAL (REVEAL)
   */
  static async executeEventControl({ command, payload = {} }, actor = 'ADMIN-NEXUS') {
    const normalizedCmd = String(command || '')
      .trim()
      .toUpperCase();

    if (normalizedCmd === 'RESET_ALL' || normalizedCmd === 'RESET') {
      return this.resetEverythingToZero(actor, payload);
    }

    let coreRevealTriggered = false;
    let coreStateUpdated = false;
    let auditSummary = `GLOBAL EVENT COMMAND [${normalizedCmd}] EXECUTED`;

    if (
      [
        'START',
        'START_COUNTDOWN',
        'PAUSE',
        'RESUME',
        'END',
        'SET_TIMER',
        'ADJUST_TIMER',
      ].includes(normalizedCmd)
    ) {
      const updatedTimer = controlGlobalArenaEvent(normalizedCmd, payload, actor);
      auditSummary = `GLOBAL EVENT [${normalizedCmd}] -> TIMER: ${updatedTimer.formatted} (${updatedTimer.status})`;

      if (normalizedCmd === 'END') {
        const allTeams = await Team.find({ teamId: { $not: /^SIM-TEAM-/ } }).lean();
        const membersByTeamId = new Map(
          allTeams.map((t) => [String(t.teamId).toUpperCase(), t.members || []])
        );
        const rankedRaw = await buildPublicTopTeams(allTeams);
        const ranked = rankedRaw.map((r) => ({
          ...r,
          members: membersByTeamId.get(String(r.teamId).toUpperCase()) || [],
        }));
        if (ranked.length > 0) {
          const top = ranked[0];
          const second = ranked[1] || null;
          setGlobalDeclaredWinner(
            {
              teamId: top.teamId,
              teamName: top.teamName,
              credits: top.credits,
              totalSolved: top.totalSolved,
              coreState: top.coreState,
              members: top.members,
              rank: 1,
              runnerUp: second
                ? {
                    teamId: second.teamId,
                    teamName: second.teamName,
                    credits: second.credits,
                    totalSolved: second.totalSolved,
                    coreState: second.coreState,
                    members: second.members,
                    rank: 2,
                  }
                : null,
              topTwo: [top, second].filter(Boolean),
              podium: ranked.slice(0, 3),
              allTeamsRanking: ranked,
              reason: 'FINAL ARENA STANDINGS // TOP 2 SOVEREIGN SQUADS',
            },
            actor
          );
        }
      }
    } else if (normalizedCmd === 'DECLARE_WINNER') {
      const allTeams = await Team.find({ teamId: { $not: /^SIM-TEAM-/ } }).lean();
      const membersByTeamId = new Map(
        allTeams.map((t) => [String(t.teamId).toUpperCase(), t.members || []])
      );
      const rankedRaw = await buildPublicTopTeams(allTeams);
      const ranked = rankedRaw.map((r) => ({
        ...r,
        members: membersByTeamId.get(String(r.teamId).toUpperCase()) || [],
      }));

      const requestedFirstId = String(payload.teamId || '')
        .trim()
        .toUpperCase();
      const requestedSecondId = String(payload.secondTeamId || '')
        .trim()
        .toUpperCase();

      const chosenFirst =
        (requestedFirstId &&
          requestedFirstId !== 'AUTO_LEADER' &&
          ranked.find((t) => String(t.teamId).toUpperCase() === requestedFirstId)) ||
        ranked[0] ||
        null;

      if (!chosenFirst) {
        const err = new Error('No registered teams available to declare a winner.');
        err.statusCode = 400;
        throw err;
      }

      const remainingAfterFirst = ranked.filter(
        (t) => String(t.teamId).toUpperCase() !== String(chosenFirst.teamId).toUpperCase()
      );
      const chosenSecond =
        (requestedSecondId &&
          requestedSecondId !== 'AUTO_SECOND' &&
          remainingAfterFirst.find((t) => String(t.teamId).toUpperCase() === requestedSecondId)) ||
        remainingAfterFirst[0] ||
        null;

      if (payload.endRound !== false) {
        controlGlobalArenaEvent('END', {}, actor);
      }

      const firstObj = {
        teamId: chosenFirst.teamId,
        teamName: chosenFirst.teamName,
        credits: chosenFirst.credits,
        totalSolved: chosenFirst.totalSolved,
        coreState: chosenFirst.coreState,
        members: chosenFirst.members,
        rank: 1,
      };
      const secondObj = chosenSecond
        ? {
            teamId: chosenSecond.teamId,
            teamName: chosenSecond.teamName,
            credits: chosenSecond.credits,
            totalSolved: chosenSecond.totalSolved,
            coreState: chosenSecond.coreState,
            members: chosenSecond.members,
            rank: 2,
          }
        : null;

      const orderedAllRankings = [
        firstObj,
        ...(secondObj ? [secondObj] : []),
        ...remainingAfterFirst.filter((t) => t.teamId !== secondObj?.teamId),
      ].map((item, idx) => ({
        ...item,
        rank: idx + 1,
      }));

      const winnerObj = setGlobalDeclaredWinner(
        {
          ...firstObj,
          runnerUp: secondObj,
          topTwo: [firstObj, secondObj].filter(Boolean),
          podium: orderedAllRankings.slice(0, 3),
          allTeamsRanking: orderedAllRankings,
          reason: payload.reason || 'OFFICIAL TOP 2 WINNERS PROCLAMATION // NEXUS COMMAND',
        },
        actor
      );
      auditSummary = `TOP 2 WINNERS DECLARED: #1 [${winnerObj.teamId}] ${winnerObj.teamName}${
        secondObj ? ` & #2 [${secondObj.teamId}] ${secondObj.teamName}` : ''
      }`;
      recordAdminEventLog({
        action: 'DECLARE_WINNER',
        category: 'EVENT_CONTROL',
        actor,
        summary: auditSummary,
      });
    } else if (normalizedCmd === 'CLEAR_WINNER') {
      setGlobalDeclaredWinner(null, actor);
      auditSummary = 'CLEARED CHAMPION PROCLAMATION BANNER';
      recordAdminEventLog({
        action: 'CLEAR_WINNER',
        category: 'EVENT_CONTROL',
        actor,
        summary: auditSummary,
      });
    } else if (normalizedCmd === 'CORE_LOCK' || normalizedCmd === 'LOCK') {
      await NexusCoreService.updateCoreConfig({ globalOverrideState: 'LOCKED' });
      await Team.updateMany(
        { 'nexusCore.state': { $in: ['AVAILABLE', 'ACTIVE'] } },
        {
          $set: {
            'nexusCore.state': 'LOCKED',
            status: 'ACTIVE',
          },
        }
      );
      coreStateUpdated = true;
      auditSummary = 'NEXUS CORE LOCKED GLOBALLY ACROSS ALL SECTORS';
      recordAdminEventLog({
        action: 'CORE_LOCK',
        category: 'CORE_CONTROL',
        actor,
        summary: auditSummary,
      });
    } else if (normalizedCmd === 'CORE_UNLOCK' || normalizedCmd === 'UNLOCK') {
      await NexusCoreService.updateCoreConfig({ globalOverrideState: 'AVAILABLE' });
      await Team.updateMany(
        { 'nexusCore.state': 'LOCKED' },
        {
          $set: {
            'nexusCore.state': 'AVAILABLE',
            'nexusCore.unlockedAt': new Date(),
            'stats.coreProgressPercent': 100,
            status: 'CORE_UNLOCKED',
          },
        }
      );
      coreStateUpdated = true;
      auditSummary = 'NEXUS CORE UNLOCKED (AVAILABLE) FOR ALL ACTIVE SQUADS';
      recordAdminEventLog({
        action: 'CORE_UNLOCK',
        category: 'CORE_CONTROL',
        actor,
        summary: auditSummary,
      });
    } else if (normalizedCmd === 'CORE_REVEAL' || normalizedCmd === 'REVEAL') {
      await NexusCoreService.updateCoreConfig({ globalOverrideState: 'AVAILABLE' });
      await Team.updateMany(
        { 'nexusCore.state': 'LOCKED' },
        {
          $set: {
            'nexusCore.state': 'AVAILABLE',
            'nexusCore.unlockedAt': new Date(),
            'stats.coreProgressPercent': 100,
            status: 'CORE_UNLOCKED',
          },
        }
      );
      coreRevealTriggered = true;
      coreStateUpdated = true;
      auditSummary =
        'NEXUS CORE REVEAL BROADCAST // 6-STEP CINEMATIC DISCOVERY SEQUENCE TRIGGERED GLOBALLY';
      recordAdminEventLog({
        action: 'CORE_REVEAL',
        category: 'CORE_CONTROL',
        actor,
        summary: auditSummary,
      });
    } else {
      const err = new Error(`Unsupported event control command: ${normalizedCmd}`);
      err.statusCode = 400;
      throw err;
    }

    AuditService.record({
      action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
      actorType: 'ADMIN',
      actorId: actor,
      summary: auditSummary,
      metadata: { command: normalizedCmd, payload },
    }).catch(() => {});

    const state = await this.getAdminControlState();
    return {
      ...state,
      coreRevealTriggered,
      coreStateUpdated,
      executedCommand: normalizedCmd,
    };
  }

  /**
   * Update system settings or reset full arena state
   */
  static async updateSettings(payload = {}, actor = 'ADMIN-NEXUS') {
    if (payload.resetAllDemoState || payload.resetAllToZero) {
      return this.resetEverythingToZero(actor, payload);
    }

    if (payload.startingCredits !== undefined) {
      runtimeSettingsOverride.startingCredits = Math.max(0, Number(payload.startingCredits));
    }
    if (payload.hintCost !== undefined) {
      runtimeSettingsOverride.hintCost = Math.max(0, Number(payload.hintCost));
    }
    if (payload.extraTimeCost !== undefined) {
      runtimeSettingsOverride.extraTimeCost = Math.max(0, Number(payload.extraTimeCost));
    }
    if (payload.extraTimeMinutes !== undefined) {
      runtimeSettingsOverride.extraTimeMinutes = Math.max(1, Number(payload.extraTimeMinutes));
    }
    if (payload.reattemptMultiplier !== undefined) {
      runtimeSettingsOverride.reattemptMultiplier = Math.max(
        1,
        Number(payload.reattemptMultiplier)
      );
    }
    if (payload.arenaAnnouncement !== undefined) {
      runtimeSettingsOverride.arenaAnnouncement = String(payload.arenaAnnouncement).trim();
    }

    const summaryMsg = 'UPDATED GLOBAL ARENA PARAMETERS & CREDIT CONFIGURATION';
    recordAdminEventLog({
      action: 'UPDATE_SETTINGS',
      category: 'SETTINGS',
      actor,
      summary: summaryMsg,
    });

    AuditService.record({
      action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
      actorType: 'ADMIN',
      actorId: actor,
      summary: summaryMsg,
      metadata: { subAction: 'UPDATE_SETTINGS' },
    }).catch(() => {});

    return this.getAdminControlState();
  }
}
