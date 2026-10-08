import { AdminService, SEEDED_ADMIN_OPERATORS } from '../services/adminService.js';
import { AuditService, SUPPORTED_AUDIT_ACTIONS } from '../services/auditService.js';
import { DisplayService } from '../services/displayService.js';
import { getTeamStateById } from '../services/teamService.js';
import { CreditService } from '../services/creditService.js';
import { ChallengeService } from '../services/challengeService.js';
import { NexusCoreService } from '../services/nexusCoreService.js';
import { getSocketServer } from '../socket/index.js';
import { SOCKET_EVENTS, SOCKET_ROOMS } from '../socket/socketEvents.js';

const broadcastAdminAndArenaSync = async (adminState, extraBroadcast = {}) => {
  const io = getSocketServer();
  if (!io) return;

  // 1. Broadcast full admin control state to room:admin
  io.to(SOCKET_ROOMS.ADMIN_CONTROL).emit(SOCKET_EVENTS.ADMIN.STATE_UPDATE, {
    ...adminState,
    timestamp: new Date().toISOString(),
  });

  // 2. Broadcast sanitized projector snapshot to /display and arena:global
  const projectorSnapshot = await DisplayService.getProjectorDisplaySnapshot();
  io.to(SOCKET_ROOMS.LEADERBOARD).emit(SOCKET_EVENTS.LEADERBOARD.UPDATE, projectorSnapshot);
  io.to(SOCKET_ROOMS.ARENA_GLOBAL).emit(SOCKET_EVENTS.LEADERBOARD.UPDATE, projectorSnapshot);

  // 3. Optional targeted team sync
  if (extraBroadcast.teamId) {
    const normalizedTeamId = String(extraBroadcast.teamId).trim().toUpperCase();
    const roomName = SOCKET_ROOMS.teamRoom(normalizedTeamId);
    const [team, transactions, catalog, attempts] = await Promise.all([
      getTeamStateById(normalizedTeamId),
      CreditService.getTeamTransactions(normalizedTeamId),
      ChallengeService.listChallenges(),
      ChallengeService.getAttemptsForTeam(normalizedTeamId),
    ]);
    const nexusCore = await NexusCoreService.getNexusCoreStatusForTeam(team);
    const timer = ChallengeService.computeSessionTimerTelemetry(team?.activeAttempt);

    io.to(roomName).emit(SOCKET_EVENTS.TEAM.STATE_UPDATE, {
      teamId: normalizedTeamId,
      room: roomName,
      team,
      nexusCore,
      transactions,
      attempts: attempts || [],
      timer,
      catalog,
      serverTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    });

    if (team) {
      io.to(roomName).emit(SOCKET_EVENTS.CREDITS.UPDATE, {
        teamId: normalizedTeamId,
        room: roomName,
        balanceAfter: team.credits,
        transactions,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // 4. Optional challenge catalog broadcast
  if (extraBroadcast.broadcastChallenges) {
    const publicCatalog = await ChallengeService.listChallenges();
    io.to(SOCKET_ROOMS.ARENA_GLOBAL).emit(SOCKET_EVENTS.CHALLENGE.UPDATE, {
      catalog: publicCatalog,
      timestamp: new Date().toISOString(),
    });
  }

  // 5. Optional Core reveal / state broadcast
  if (extraBroadcast.coreRevealTriggered) {
    const coreDoc = await NexusCoreService.getCoreConfigDoc();
    const payload = {
      nexusCore: {
        state: 'AVAILABLE',
        coreId: coreDoc?.coreId || 'NEXUS-CORE-OMEGA',
        title: coreDoc?.title || 'THE NEXUS CORE // ARCHITECTURAL SINGULARITY',
      },
      state: 'AVAILABLE',
      message: 'THE NEXUS CORE IS NOW AVAILABLE // ULTIMATE SYSTEM OBJECTIVE UNLOCKED',
      timestamp: new Date().toISOString(),
    };
    io.to(SOCKET_ROOMS.CORE_FEED).emit(SOCKET_EVENTS.CORE.AVAILABLE, payload);
    io.to(SOCKET_ROOMS.ARENA_GLOBAL).emit(SOCKET_EVENTS.CORE.AVAILABLE, payload);
  } else if (extraBroadcast.coreStateUpdated) {
    const coreDoc = await NexusCoreService.getCoreConfigDoc();
    io.to(SOCKET_ROOMS.CORE_FEED).emit(SOCKET_EVENTS.CORE.STATE_UPDATE, {
      globalOverrideState: coreDoc?.globalOverrideState || null,
      timestamp: new Date().toISOString(),
    });
  }

  if (extraBroadcast.eventCommand) {
    io.to(SOCKET_ROOMS.ADMIN_CONTROL).emit(SOCKET_EVENTS.ADMIN.EVENT_ACTION, {
      command: extraBroadcast.eventCommand,
      globalTimer: adminState.globalTimer,
      coreStatus: adminState.coreStatus,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * POST /api/admin/login
 * Public endpoint to authenticate Admin / Volunteer operators
 */
export const loginAdminOperator = async (req, res, next) => {
  try {
    const { operatorId, password } = req.body || {};
    const { token, operator } = AdminService.authenticateOperator(operatorId, password);
    const state = await AdminService.getAdminControlState();

    res.status(200).json({
      status: 'ok',
      token,
      operator,
      state,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/operators-hint
 * Returns seeded demo operator IDs for quick evaluation login
 */
export const getAdminOperatorsHint = (_req, res) => {
  res.status(200).json({
    status: 'ok',
    operators: SEEDED_ADMIN_OPERATORS.map((op) => ({
      operatorId: op.operatorId,
      name: op.name,
      role: op.role,
      clearance: op.clearance,
    })),
  });
};

/**
 * GET /api/admin/state
 * Protected endpoint returning full Admin & Volunteer Control System state
 */
export const getAdminControlState = async (_req, res, next) => {
  try {
    const state = await AdminService.getAdminControlState();
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/audit
 * Protected endpoint returning canonical Phase 15 security audit logs
 */
export const getAdminAuditLogs = async (req, res, next) => {
  try {
    const { action, teamId, limit } = req.query || {};
    const auditLogs = await AuditService.listLogs({
      action,
      teamId,
      limit: Math.min(250, Math.max(10, Number(limit || 100))),
    });
    res.status(200).json({
      status: 'ok',
      supportedActions: SUPPORTED_AUDIT_ACTIONS,
      auditLogs,
      logs: auditLogs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/teams/action
 * Execute team control action (ADJUST_CREDITS, ADJUDICATE_ATTEMPT, SET_TEAM_CORE_STATE, RESET_TEAM)
 */
export const executeAdminTeamAction = async (req, res, next) => {
  try {
    const { teamId, action, payload } = req.body || {};
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const state = await AdminService.executeAdminTeamControl({ teamId, action, payload }, actor);

    await broadcastAdminAndArenaSync(state, { teamId });

    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/challenges
 * Create or update a challenge module
 */
export const upsertAdminChallenge = async (req, res, next) => {
  try {
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const challenge = await AdminService.upsertChallenge(req.body || {}, actor);
    const state = await AdminService.getAdminControlState();

    await broadcastAdminAndArenaSync(state, { broadcastChallenges: true });

    res.status(200).json({
      ...state,
      upsertedChallenge: challenge,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/challenges/:challengeId
 * Toggle enabled/available or update specific challenge fields
 */
export const patchAdminChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';

    if (
      Object.keys(req.body || {}).every((k) => k === 'enabled' || k === 'available') &&
      Object.keys(req.body || {}).length > 0
    ) {
      await AdminService.toggleChallengeStatus(challengeId, req.body, actor);
    } else {
      await AdminService.upsertChallenge({ ...req.body, challengeId }, actor);
    }

    const state = await AdminService.getAdminControlState();
    await broadcastAdminAndArenaSync(state, { broadcastChallenges: true });

    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/events/control
 * Execute Global Event (START, PAUSE, RESUME, END), Global Timer, or Core (LOCK, UNLOCK, REVEAL) control
 */
export const executeAdminEventControl = async (req, res, next) => {
  try {
    const { command, payload } = req.body || {};
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const state = await AdminService.executeEventControl({ command, payload }, actor);

    await broadcastAdminAndArenaSync(state, {
      coreRevealTriggered: state.coreRevealTriggered,
      coreStateUpdated: state.coreStateUpdated,
      eventCommand: state.executedCommand,
    });

    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/settings
 * Update system settings or trigger full demo reset
 */
export const updateAdminSettings = async (req, res, next) => {
  try {
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const state = await AdminService.updateSettings(req.body || {}, actor);

    await broadcastAdminAndArenaSync(state, { broadcastChallenges: true });

    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};
