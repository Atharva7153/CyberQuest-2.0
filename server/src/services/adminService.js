import mongoose from 'mongoose';
import { Team } from '../models/Team.js';
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
import { AbilityService } from './abilityService.js';
import { NexusCoreService } from './nexusCoreService.js';
import {
  DisplayService,
  computeGlobalArenaTimer,
  controlGlobalArenaEvent,
  getAdminEventLogs,
  recordAdminEventLog,
} from './displayService.js';
import { normalizeAttemptHistory } from './progressHistoryService.js';
import { AuditService, AUDIT_ACTION_TYPES } from './auditService.js';
import { resetRateLimitBuckets } from '../middleware/rateLimitMiddleware.js';
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
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
  },
  {
    operatorId: 'VOLUNTEER-01',
    plainPassword: 'NEXUS-VOL-2026',
    name: 'SECTOR MARSHAL 01 // FLOOR OPS',
    role: 'VOLUNTEER',
    clearance: 'SECTOR-VOLUNTEER',
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

const getRoomConnectionCount = (teamId) => {
  const io = getSocketServer();
  if (!io) return 0;
  const roomName = SOCKET_ROOMS.teamRoom(teamId);
  const room = io.sockets.adapter.rooms.get(roomName);
  return room ? room.size : 0;
};

export class AdminService {
  /**
   * Authenticate an Admin or Volunteer operator
   */
  static authenticateOperator(rawOperatorId, plainPassword) {
    const normalizedId = String(rawOperatorId || '')
      .trim()
      .toUpperCase();
    const pass = String(plainPassword || '').trim();

    if (!normalizedId || !pass) {
      const err = new Error('OPERATOR ID and ACCESS KEY are required.');
      err.statusCode = 400;
      throw err;
    }

    const match = SEEDED_ADMIN_OPERATORS.find(
      (op) => op.operatorId === normalizedId && op.plainPassword === pass
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
      clearance: match.clearance,
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
    await ensureDefaultTeamsSeeded();
    if (mongoose.connection.readyState === 1) {
      const docs = await Challenge.find({})
        .select('+solutionConfig')
        .sort({ category: 1, cost: 1 })
        .lean();
      if (docs.length > 0) {
        return docs;
      }
    }
    return DEFAULT_CHALLENGE_CATALOG;
  }

  /**
   * Build the full Admin & Volunteer Control System state
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
      displaySnapshot,
      auditLogs,
    ] = await Promise.all([
      Team.find({}).sort({ credits: -1 }).lean(),
      this.listAllChallengesForAdmin(),
      ChallengeAttempt.find({}).sort({ startedAt: -1 }).limit(120).lean(),
      CreditTransaction.find({}).sort({ timestamp: -1 }).limit(150).lean(),
      AbilityService.listAbilities(),
      NexusCoreService.getCoreConfigDoc({ includeSolution: true }),
      DisplayService.getProjectorDisplaySnapshot(),
      AuditService.listLogs({ limit: 120 }),
    ]);

    const io = getSocketServer();
    const totalConnectedSockets = io ? io.engine.clientsCount : 0;

    // Enrich each team with connection state, active timer, attempt history, and credit ledger
    const enrichedTeams = teams.map((team) => {
      const onlineOperatives = getRoomConnectionCount(team.teamId);
      const roomName = SOCKET_ROOMS.teamRoom(team.teamId);
      const teamAttempts = attempts.filter((a) => a.teamId === team.teamId);
      const teamTransactions = transactions.filter((t) => t.teamId === team.teamId);
      const history = normalizeAttemptHistory(team, teamAttempts, challenges);
      const activeTimer = ChallengeService.computeSessionTimerTelemetry(team.activeAttempt);
      const coreState = NexusCoreService.computeAuthoritativeState(team, coreDoc);

      return {
        ...team,
        coreState,
        activeTimer,
        connectionState: {
          connected: onlineOperatives > 0,
          status: onlineOperatives > 0 ? 'ONLINE' : 'OFFLINE',
          onlineOperatives,
          room: roomName,
        },
        attemptHistory: history,
        recentTransactions: teamTransactions.slice(0, 25),
      };
    });

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
        ...displaySnapshot.coreStatus,
        globalOverrideState: coreDoc?.globalOverrideState || null,
        unlockConfig: coreDoc?.unlockConfig || {},
        gameType: coreDoc?.gameType || 'systemProblem',
        gameConfig: coreDoc?.gameConfig || {},
        expectedAnswer: coreDoc?.solutionConfig?.expectedAnswer || 'NEXUS-OMEGA',
      },
      teams: enrichedTeams,
      challenges,
      attempts: enrichedAttempts,
      transactions: transactions.slice(0, 80),
      abilitiesCatalog: abilities,
      recentSystemEvents: displaySnapshot.recentSystemEvents || [],
      adminEventLogs: getAdminEventLogs(),
      auditLogs: auditLogs || [],
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

    const summaryMsg = `${memIdx >= 0 ? 'UPDATED' : 'CREATED'} CHALLENGE [${challengeId}] ${
      challengeData.title
    } (${cost} CR / +${reward} CR / ${risk} / ${enabled ? 'ENABLED' : 'DISABLED'})`;

    recordAdminEventLog({
      action: memIdx >= 0 ? 'EDIT_CHALLENGE' : 'CREATE_CHALLENGE',
      category: 'CHALLENGE_CONTROL',
      actor,
      summary: summaryMsg,
    });

    await AuditService.record({
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
    });

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
   * Admin Team Control Actions:
   * - ADJUST_CREDITS
   * - FORCE_RESOLVE_ATTEMPT
   * - SET_TEAM_CORE_STATE
   * - RESET_TEAM
   */
  static async executeAdminTeamControl({ teamId, action, payload = {} }, actor = 'ADMIN-NEXUS') {
    const normalizedTeamId = String(teamId || '')
      .trim()
      .toUpperCase();
    const team = await Team.findOne({ teamId: normalizedTeamId });
    if (!team) {
      const err = new Error(`Team [${normalizedTeamId}] not found.`);
      err.statusCode = 404;
      throw err;
    }

    const normalizedAction = String(action || '').trim().toUpperCase();

    switch (normalizedAction) {
      case 'ADJUST_CREDITS': {
        const delta = Number(payload.amount ?? payload.delta ?? 0);
        const reason = String(payload.reason || 'ADMIN COMMAND CREDIT ADJUSTMENT').trim();
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

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          creditsDelta: delta,
          balanceAfter: team.credits,
          summary: summaryMsg,
          metadata: { subAction: 'ADJUST_CREDITS', reason },
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

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          summary: summaryMsg,
          metadata: { subAction: 'ADJUDICATE_ATTEMPT', outcome },
        });
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

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          summary: summaryMsg,
          metadata: { subAction: 'SET_TEAM_CORE_STATE', targetState },
        });
        break;
      }

      case 'RESET_TEAM': {
        await executeTeamAction(
          normalizedTeamId,
          'RESET_DEMO_STATE',
          {},
          { isTrustedAdmin: true }
        );
        const summaryMsg = `RESET TEAM [${normalizedTeamId}] TO INITIAL SEED STATE`;
        recordAdminEventLog({
          action: 'RESET_TEAM',
          category: 'TEAM_CONTROL',
          actor,
          summary: summaryMsg,
        });

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
          actorType: 'ADMIN',
          actorId: actor,
          teamId: normalizedTeamId,
          summary: summaryMsg,
          metadata: { subAction: 'RESET_TEAM' },
        });
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
   * Execute Global Event & Core Control:
   * - Event: START | PAUSE | RESUME | END
   * - Global Timer: SET_TIMER | ADJUST_TIMER
   * - Core: CORE_LOCK (LOCK) | CORE_UNLOCK (UNLOCK) | CORE_REVEAL (REVEAL)
   */
  static async executeEventControl({ command, payload = {} }, actor = 'ADMIN-NEXUS') {
    const normalizedCmd = String(command || '')
      .trim()
      .toUpperCase();

    let coreRevealTriggered = false;
    let coreStateUpdated = false;
    let auditSummary = `GLOBAL EVENT COMMAND [${normalizedCmd}] EXECUTED`;

    if (['START', 'PAUSE', 'RESUME', 'END', 'SET_TIMER', 'ADJUST_TIMER'].includes(normalizedCmd)) {
      const updatedTimer = controlGlobalArenaEvent(normalizedCmd, payload, actor);
      auditSummary = `GLOBAL EVENT [${normalizedCmd}] -> TIMER: ${updatedTimer.formatted} (${updatedTimer.status})`;
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

    await AuditService.record({
      action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
      actorType: 'ADMIN',
      actorId: actor,
      summary: auditSummary,
      metadata: { command: normalizedCmd, payload },
    });

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
    if (payload.resetAllDemoState) {
      resetRateLimitBuckets();
      const teams = await Team.find({}).select('teamId').lean();
      for (const t of teams) {
        await executeTeamAction(t.teamId, 'RESET_DEMO_STATE', {}, { isTrustedAdmin: true });
      }
      await NexusCoreService.resetNexusCoreDemoState();
      controlGlobalArenaEvent('START', { durationSeconds: 8100 }, actor);
      const summaryMsg = 'FULL ARENA DEMO STATE RESET EXECUTED ACROSS ALL TEAMS';
      recordAdminEventLog({
        action: 'RESET_ALL',
        category: 'SETTINGS',
        actor,
        summary: summaryMsg,
      });
      await AuditService.record({
        action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
        actorType: 'ADMIN',
        actorId: actor,
        summary: summaryMsg,
        metadata: { subAction: 'RESET_ALL' },
      });
      return this.getAdminControlState();
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

    await AuditService.record({
      action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
      actorType: 'ADMIN',
      actorId: actor,
      summary: summaryMsg,
      metadata: { subAction: 'UPDATE_SETTINGS' },
    });

    return this.getAdminControlState();
  }
}
