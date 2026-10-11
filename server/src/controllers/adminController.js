import { AdminService, SEEDED_ADMIN_OPERATORS } from '../services/adminService.js';
import { AuditService, SUPPORTED_AUDIT_ACTIONS } from '../services/auditService.js';
import { RecordingService } from '../services/recordingService.js';
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

  // 2. Broadcast sanitized projector snapshot to /display and ALL connected arena terminals
  const projectorSnapshot = await DisplayService.getProjectorDisplaySnapshot();
  io.emit(SOCKET_EVENTS.LEADERBOARD.UPDATE, projectorSnapshot);
  io.emit(SOCKET_EVENTS.TIMER.UPDATE, {
    globalTimer: projectorSnapshot.globalTimer,
    coreStatus: projectorSnapshot.coreStatus,
    serverTime: new Date().toISOString(),
  });
  io.emit(SOCKET_EVENTS.SYSTEM.TELEMETRY, {
    globalTimer: projectorSnapshot.globalTimer,
    coreStatus: projectorSnapshot.coreStatus,
    serverTime: new Date().toISOString(),
    timestamp: new Date().toISOString(),
  });

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
      globalTimer: projectorSnapshot.globalTimer,
      coreStatus: projectorSnapshot.coreStatus,
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
 * POST /api/admin/teams/register
 * Register a new Team (Solo=1, Duo=2, Trio=3, Squad=4 max) with initial credits
 */
export const registerAdminTeam = async (req, res, next) => {
  try {
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const state = await AdminService.registerTeam(req.body || {}, actor);

    res.status(200).json(state);
    broadcastAdminAndArenaSync(state, {
      teamId: state.registeredTeam?.teamId,
    }).catch(() => {});
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/teams/action
 * Execute team control action (REGISTER_TEAM, ADJUST_CREDITS, SET_CREDITS, UPDATE_TEAM_MEMBERS, DELETE_TEAM, ADJUDICATE_ATTEMPT, SET_TEAM_CORE_STATE, RESET_TEAM)
 */
export const executeAdminTeamAction = async (req, res, next) => {
  try {
    const { teamId, action, payload } = req.body || {};
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const state = await AdminService.executeAdminTeamControl({ teamId, action, payload }, actor);

    res.status(200).json(state);
    const targetTeamId = state.registeredTeam?.teamId || teamId;
    if (targetTeamId && String(action).toUpperCase() !== 'DELETE_TEAM') {
      broadcastAdminAndArenaSync(state, { teamId: targetTeamId }).catch(() => {});
    } else {
      broadcastAdminAndArenaSync(state).catch(() => {});
    }
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

    res.status(200).json({
      ...state,
      upsertedChallenge: challenge,
    });
    broadcastAdminAndArenaSync(state, { broadcastChallenges: true }).catch(() => {});
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
    res.status(200).json(state);
    broadcastAdminAndArenaSync(state, { broadcastChallenges: true }).catch(() => {});
  } catch (error) {
    next(error);
  }
};

let activeCountdownBroadcastTimeout = null;

/**
 * POST /api/admin/events/control
 * Execute Global Event (START, START_COUNTDOWN, PAUSE, RESUME, END, DECLARE_WINNER), Global Timer, or Core (LOCK, UNLOCK, REVEAL) control
 */
export const executeAdminEventControl = async (req, res, next) => {
  try {
    const { command, payload } = req.body || {};
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const state = await AdminService.executeEventControl({ command, payload }, actor);

    res.status(200).json(state);
    broadcastAdminAndArenaSync(state, {
      coreRevealTriggered: state.coreRevealTriggered,
      coreStateUpdated: state.coreStateUpdated,
      eventCommand: state.executedCommand,
    }).catch(() => {});

    // If a launch countdown was started, schedule an authoritative broadcast when countdown hits 0
    if (activeCountdownBroadcastTimeout) {
      clearTimeout(activeCountdownBroadcastTimeout);
      activeCountdownBroadcastTimeout = null;
    }
    const cdSec = Number(state?.globalTimer?.countdownRemainingSeconds || 0);
    if (state?.globalTimer?.status === 'COUNTDOWN' && cdSec > 0) {
      activeCountdownBroadcastTimeout = setTimeout(async () => {
        try {
          const postCountdownState = await AdminService.getAdminControlState();
          await broadcastAdminAndArenaSync(postCountdownState, {
            eventCommand: 'START',
          });
        } catch {
          // ignore
        }
      }, cdSec * 1000 + 80);
    }
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

    res.status(200).json(state);
    broadcastAdminAndArenaSync(state, { broadcastChallenges: true }).catch(() => {});
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/recording
 * Start, Stop, or Clear game activity & anomaly recording
 */
export const controlAdminRecording = async (req, res, next) => {
  try {
    const actor = req.admin?.operatorId || 'ADMIN-NEXUS';
    const { action, label } = req.body || {};
    const cmd = String(action || 'START').trim().toUpperCase();

    let recordingResult = null;
    if (cmd === 'START') {
      recordingResult = RecordingService.startRecording({ operatorId: actor, label });
    } else if (cmd === 'STOP') {
      recordingResult = RecordingService.stopRecording({ operatorId: actor });
    } else if (cmd === 'CLEAR') {
      recordingResult = RecordingService.clearRecordings();
    } else {
      recordingResult = RecordingService.getStatus();
    }

    const state = await AdminService.getAdminControlState();
    res.status(200).json({
      ...state,
      recording: recordingResult,
    });
    broadcastAdminAndArenaSync(state).catch(() => {});
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/recording/:recordingId?
 * Retrieve full recording report & anomaly analysis
 */
export const getAdminRecordingReport = async (req, res, next) => {
  try {
    const { recordingId } = req.params || {};
    const report = RecordingService.getReportById(recordingId);
    res.status(200).json({
      status: 'ok',
      recordingStatus: RecordingService.getStatus(),
      report,
    });
  } catch (error) {
    next(error);
  }
};

