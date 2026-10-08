import { SOCKET_EVENTS, SOCKET_ROOMS } from './socketEvents.js';
import { logger } from '../utils/logger.js';
import { verifyTeamToken, verifyAdminToken } from '../utils/jwt.js';
import {
  getTeamStateById,
  executeTeamAction,
  CHALLENGE_CATALOG,
} from '../services/teamService.js';
import { CreditService } from '../services/creditService.js';
import { ChallengeService } from '../services/challengeService.js';
import { AbilityService } from '../services/abilityService.js';
import {
  normalizeAttemptHistory,
  buildTeamProgressSummary,
  buildCanonicalLiveFeed,
} from '../services/progressHistoryService.js';
import { NexusCoreService } from '../services/nexusCoreService.js';
import { DisplayService } from '../services/displayService.js';
import { AdminService } from '../services/adminService.js';
import { enforceSocketActionRateLimit } from '../middleware/rateLimitMiddleware.js';

const getRoomClientCount = (io, roomName) => {
  const room = io.sockets.adapter.rooms.get(roomName);
  return room ? room.size : 0;
};

let adminMonitorDebounceTimer = null;

const emitLiveAdminMonitorUpdate = (io) => {
  if (!io || getRoomClientCount(io, SOCKET_ROOMS.ADMIN_CONTROL) === 0) return;
  if (adminMonitorDebounceTimer) return;

  adminMonitorDebounceTimer = setTimeout(async () => {
    adminMonitorDebounceTimer = null;
    try {
      if (!io || getRoomClientCount(io, SOCKET_ROOMS.ADMIN_CONTROL) === 0) return;
      const adminState = await AdminService.getAdminControlState();
      io.to(SOCKET_ROOMS.ADMIN_CONTROL).emit(SOCKET_EVENTS.ADMIN.STATE_UPDATE, {
        ...adminState,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      logger.warn('SOCKET', `Admin monitor broadcast skipped: ${err.message}`);
    }
  }, 250);
};

const inFlightTeamJoinHydrations = new Map();

const hydrateTeamChannelSnapshot = (normalizedTeamId) => {
  if (inFlightTeamJoinHydrations.has(normalizedTeamId)) {
    return inFlightTeamJoinHydrations.get(normalizedTeamId);
  }

  const promise = (async () => {
    try {
      const [teamState, transactions, catalog, attempts, abilitiesCatalog] = await Promise.all([
        getTeamStateById(normalizedTeamId),
        CreditService.getTeamTransactions(normalizedTeamId),
        ChallengeService.listChallenges(),
        ChallengeService.getAttemptsForTeam(normalizedTeamId),
        AbilityService.listAbilities(),
      ]);

      const nexusCore = await NexusCoreService.getNexusCoreStatusForTeam(teamState);
      const resolvedCatalog = catalog || CHALLENGE_CATALOG;
      const attemptHistory = normalizeAttemptHistory(teamState, attempts, resolvedCatalog);
      const progressSummary = buildTeamProgressSummary(
        teamState,
        attempts,
        transactions,
        resolvedCatalog
      );
      const liveFeed = buildCanonicalLiveFeed(teamState, attempts, transactions, resolvedCatalog);
      const timer = ChallengeService.computeSessionTimerTelemetry(teamState?.activeAttempt);

      return {
        team: teamState,
        nexusCore,
        transactions,
        attempts: attempts || [],
        attemptHistory,
        progressSummary,
        liveFeed,
        timer,
        catalog: resolvedCatalog,
        abilitiesCatalog: abilitiesCatalog || [],
        creditsConfig: CreditService.getConfig(),
      };
    } finally {
      inFlightTeamJoinHydrations.delete(normalizedTeamId);
    }
  })();

  inFlightTeamJoinHydrations.set(normalizedTeamId, promise);
  return promise;
};

export const registerSocketChannels = (io, socket) => {
  socket.join(SOCKET_ROOMS.ARENA_GLOBAL);
  socket.join(SOCKET_ROOMS.CORE_FEED);

  // 1. Authenticated Team Room Join: team:<teamId>
  // Phase 15 Security: Team members MUST authenticate with a valid Team JWT and only receive their own team state.
  socket.on(SOCKET_EVENTS.TEAM.JOIN, async (payload = {}, callback) => {
    try {
      const providedToken = payload?.token || socket.handshake?.auth?.token;
      let verifiedTeamId = socket.data.authenticatedTeamId || null;

      if (providedToken) {
        const decoded = verifyTeamToken(providedToken);
        verifiedTeamId = String(decoded.teamId || '').trim().toUpperCase();
      }

      if (!verifiedTeamId) {
        const errResponse = {
          ok: false,
          code: 'SOCKET_AUTH_REQUIRED',
          error: 'Valid Team JWT authentication is required to join a team channel.',
        };
        if (typeof callback === 'function') callback(errResponse);
        return;
      }

      if (
        payload?.teamId &&
        String(payload.teamId).trim().toUpperCase() !== verifiedTeamId
      ) {
        const errResponse = {
          ok: false,
          code: 'CROSS_TEAM_ACCESS_DENIED',
          error: 'Unauthorized: Team members may only access their own team state.',
        };
        if (typeof callback === 'function') callback(errResponse);
        return;
      }

      const normalizedTeamId = verifiedTeamId;
      const roomName = SOCKET_ROOMS.teamRoom(normalizedTeamId);

      if (socket.data.teamRoom && socket.data.teamRoom !== roomName) {
        socket.leave(socket.data.teamRoom);
      }

      socket.join(roomName);
      socket.data.authenticatedTeamId = normalizedTeamId;
      socket.data.teamId = normalizedTeamId;
      socket.data.teamRoom = roomName;
      socket.data.authRole = 'TEAM';

      const onlineOperatives = getRoomClientCount(io, roomName);
      logger.info(
        'SOCKET',
        `Terminal [${socket.id}] authenticated & joined [${roomName}] | Operatives online: ${onlineOperatives}`
      );

      const snapshot = await hydrateTeamChannelSnapshot(normalizedTeamId);
      const currentOnlineOperatives = getRoomClientCount(io, roomName);
      const serverTime = new Date().toISOString();

      const ackPayload = {
        ok: true,
        teamId: normalizedTeamId,
        room: roomName,
        socketId: socket.id,
        onlineOperatives: currentOnlineOperatives,
        ...snapshot,
        serverTime,
        timestamp: serverTime,
      };

      socket.emit(SOCKET_EVENTS.TEAM.JOINED_ACK, ackPayload);

      io.to(roomName).emit(SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, {
        teamId: normalizedTeamId,
        room: roomName,
        onlineOperatives: currentOnlineOperatives,
        timestamp: serverTime,
      });

      emitLiveAdminMonitorUpdate(io);

      if (typeof callback === 'function') {
        callback(ackPayload);
      }
    } catch (error) {
      logger.warn('SOCKET', `team:join failed: ${error.message}`);
      if (typeof callback === 'function') {
        callback({ ok: false, code: 'SOCKET_AUTH_FAILED', error: error.message });
      }
    }
  });

  // 2. Server-Authoritative Team & Credit Action via Socket
  const handleAuthoritativeAction = async (payload = {}, callback) => {
    try {
      let teamId = socket.data.authenticatedTeamId || null;
      if (!teamId && payload?.token) {
        const decoded = verifyTeamToken(payload.token);
        teamId = String(decoded.teamId || '').trim().toUpperCase();
        socket.data.authenticatedTeamId = teamId;
        socket.data.teamId = teamId;
      }

      if (!teamId) {
        const err = new Error('Socket is not bound to an authenticated team.');
        err.code = 'SOCKET_AUTH_REQUIRED';
        throw err;
      }

      if (
        payload?.teamId &&
        String(payload.teamId).trim().toUpperCase() !== teamId
      ) {
        const err = new Error('Cross-team action rejected: You may only act for your own team.');
        err.code = 'CROSS_TEAM_ACTION_FORBIDDEN';
        throw err;
      }

      const actionType = payload.actionType || payload.type;
      const actionPayload = payload.actionPayload || payload.payload || payload;

      // Enforce Phase 15 Socket Action Rate Limit
      enforceSocketActionRateLimit({
        socketId: socket.id,
        teamId,
        actionType,
        payload: actionPayload,
      });

      const result = await executeTeamAction(teamId, actionType, actionPayload);
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      const onlineOperatives = getRoomClientCount(io, roomName);

      const broadcastPayload = {
        teamId,
        room: roomName,
        team: result.team,
        nexusCore: result.nexusCore || null,
        coreEvaluation: result.coreEvaluation || null,
        transaction: result.transaction,
        evaluationResult: result.evaluationResult || null,
        abilityActivation: result.abilityActivation || null,
        abilitiesCatalog: result.abilitiesCatalog || [],
        attempts: result.attempts || [],
        attemptHistory: result.attemptHistory || [],
        progressSummary: result.progressSummary || null,
        liveFeed: result.liveFeed || [],
        liveFeedEvents: result.liveFeedEvents || [],
        timer: result.timer,
        serverTime: result.serverTime || new Date().toISOString(),
        transactions: result.transactions,
        event: result.event,
        catalog: result.catalog,
        creditsConfig: result.creditsConfig,
        onlineOperatives,
        triggeredBySocketId: socket.id,
        timestamp: new Date().toISOString(),
      };

      // Broadcast dedicated credits:update event AND full team:state:update to team:<teamId>
      io.to(roomName).emit(SOCKET_EVENTS.CREDITS.UPDATE, {
        teamId,
        room: roomName,
        balanceBefore: result.event.balanceBefore,
        balanceAfter: result.team.credits,
        delta: result.event.creditsDelta,
        transaction: result.transaction,
        transactions: result.transactions,
        triggeredBySocketId: socket.id,
        timestamp: new Date().toISOString(),
      });

      if (result.liveFeedEvents && result.liveFeedEvents.length > 0) {
        io.to(roomName).emit(SOCKET_EVENTS.FEED.EVENT, {
          teamId,
          room: roomName,
          events: result.liveFeedEvents,
          liveFeed: result.liveFeed || [],
          triggeredBySocketId: socket.id,
          timestamp: new Date().toISOString(),
        });
      }

      if (result.coreAvailabilityBroadcast && result.nexusCore) {
        const coreAvailablePayload = {
          teamId,
          teamName: result.team.teamName,
          room: roomName,
          nexusCore: result.nexusCore,
          state: result.nexusCore.state || 'AVAILABLE',
          message: 'THE NEXUS CORE IS NOW AVAILABLE // ULTIMATE SYSTEM OBJECTIVE UNLOCKED',
          triggeredBySocketId: socket.id,
          timestamp: new Date().toISOString(),
        };
        io.to(roomName).emit(SOCKET_EVENTS.CORE.AVAILABLE, coreAvailablePayload);
        io.to(SOCKET_ROOMS.CORE_FEED).emit(SOCKET_EVENTS.CORE.AVAILABLE, coreAvailablePayload);
      }

      if (result.coreCompletedBroadcast && result.nexusCore) {
        const coreCompletedPayload = {
          teamId,
          teamName: result.team.teamName,
          room: roomName,
          nexusCore: result.nexusCore,
          winner: result.nexusCore.winner || null,
          completedTeams: result.nexusCore.completedTeams || [],
          coreEvaluation: result.coreEvaluation || null,
          triggeredBySocketId: socket.id,
          timestamp: new Date().toISOString(),
        };
        io.to(roomName).emit(SOCKET_EVENTS.CORE.COMPLETED, coreCompletedPayload);
        io.to(SOCKET_ROOMS.ARENA_GLOBAL).emit(SOCKET_EVENTS.CORE.COMPLETED, coreCompletedPayload);
      }

      if (result.coreStateChanged && result.nexusCore) {
        const coreStatePayload = {
          teamId,
          room: roomName,
          nexusCore: result.nexusCore,
          coreEvaluation: result.coreEvaluation || null,
          triggeredBySocketId: socket.id,
          timestamp: new Date().toISOString(),
        };
        io.to(roomName).emit(SOCKET_EVENTS.CORE.STATE_UPDATE, coreStatePayload);
      }

      if (result.timer) {
        io.to(roomName).emit(SOCKET_EVENTS.TIMER.UPDATE, {
          teamId,
          room: roomName,
          timer: result.timer,
          serverTime: result.serverTime || new Date().toISOString(),
        });
      }

      if (result.abilityActivation) {
        io.to(roomName).emit(SOCKET_EVENTS.ABILITY.EFFECT, {
          ...result.abilityActivation,
          teamId,
          room: roomName,
          triggeredBySocketId: socket.id,
        });
      }

      if (result.evaluationResult) {
        if (result.evaluationResult.status === 'TIMEOUT') {
          io.to(roomName).emit(SOCKET_EVENTS.TIMER.EXPIRED, {
            teamId,
            attemptId: result.evaluationResult.attemptId,
            challengeId: result.evaluationResult.challengeId,
            evaluationResult: result.evaluationResult,
            serverTime: new Date().toISOString(),
          });
        }

        io.to(roomName).emit(SOCKET_EVENTS.SUBMISSION.RESULT, {
          ...result.evaluationResult,
          triggeredBySocketId: socket.id,
        });
      }

      io.to(roomName).emit(SOCKET_EVENTS.TEAM.STATE_UPDATE, broadcastPayload);

      // Broadcast sanitized arena projector snapshot to /display subscribers
      const projectorSnapshot = await DisplayService.getProjectorDisplaySnapshot();
      io.to(SOCKET_ROOMS.LEADERBOARD).emit(SOCKET_EVENTS.LEADERBOARD.UPDATE, projectorSnapshot);
      io.to(SOCKET_ROOMS.ARENA_GLOBAL).emit(SOCKET_EVENTS.LEADERBOARD.UPDATE, projectorSnapshot);

      emitLiveAdminMonitorUpdate(io);

      if (typeof callback === 'function') {
        callback({ ok: true, ...broadcastPayload });
      }
    } catch (error) {
      logger.warn('SOCKET', `Team/Credit action error: ${error.message}`);
      if (typeof callback === 'function') {
        callback({
          ok: false,
          code: error.code || 'ACTION_FAILED',
          error: error.message,
        });
      }
    }
  };

  socket.on(SOCKET_EVENTS.TEAM.ACTION, handleAuthoritativeAction);
  socket.on(SOCKET_EVENTS.CREDITS.TRANSACTION, handleAuthoritativeAction);

  // 3. Leave Team Room
  socket.on(SOCKET_EVENTS.TEAM.LEAVE, (payload = {}, callback) => {
    const teamId = payload?.teamId || socket.data.teamId;
    if (teamId) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      socket.leave(roomName);
      const onlineOperatives = getRoomClientCount(io, roomName);
      io.to(roomName).emit(SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, {
        teamId,
        room: roomName,
        onlineOperatives,
        timestamp: new Date().toISOString(),
      });
    }
    socket.data.teamId = null;
    socket.data.teamRoom = null;
    emitLiveAdminMonitorUpdate(io);
    if (typeof callback === 'function') {
      callback({ ok: true });
    }
  });

  socket.on('disconnect', () => {
    if (socket.data.teamRoom && socket.data.teamId) {
      const roomName = socket.data.teamRoom;
      const onlineOperatives = getRoomClientCount(io, roomName);
      io.to(roomName).emit(SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, {
        teamId: socket.data.teamId,
        room: roomName,
        onlineOperatives,
        timestamp: new Date().toISOString(),
      });
    }
    emitLiveAdminMonitorUpdate(io);
  });

  socket.on(SOCKET_EVENTS.LEADERBOARD.SUBSCRIBE, async (payload = {}, callback) => {
    try {
      socket.join(SOCKET_ROOMS.LEADERBOARD);
      socket.join(SOCKET_ROOMS.ARENA_GLOBAL);
      const snapshot = await DisplayService.getProjectorDisplaySnapshot();
      socket.emit(SOCKET_EVENTS.LEADERBOARD.SNAPSHOT, snapshot);
      if (typeof callback === 'function') {
        callback({
          ok: true,
          room: SOCKET_ROOMS.LEADERBOARD,
          snapshot,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      if (typeof callback === 'function') {
        callback({ ok: false, error: error.message });
      }
    }
  });

  // Protected Admin/Volunteer Live Monitor Subscription
  socket.on(SOCKET_EVENTS.ADMIN.SUBSCRIBE, async (payload = {}, callback) => {
    try {
      const token = payload?.token || socket.handshake?.auth?.adminToken;
      if (!token) {
        const err = new Error('Admin token required to subscribe to room:admin.');
        err.code = 'ADMIN_AUTH_REQUIRED';
        throw err;
      }
      const decoded = verifyAdminToken(token);
      if (!decoded || !['ADMIN', 'VOLUNTEER'].includes(decoded.role)) {
        const err = new Error('Insufficient clearance for Admin Live Monitor.');
        err.code = 'ADMIN_AUTH_INVALID';
        throw err;
      }

      socket.join(SOCKET_ROOMS.ADMIN_CONTROL);
      socket.data.adminOperatorId = decoded.operatorId;
      socket.data.adminRole = decoded.role;
      socket.data.authRole = 'ADMIN';

      const state = await AdminService.getAdminControlState();
      socket.emit(SOCKET_EVENTS.ADMIN.STATE_UPDATE, state);

      if (typeof callback === 'function') {
        callback({
          ok: true,
          room: SOCKET_ROOMS.ADMIN_CONTROL,
          operator: decoded,
          state,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      logger.warn('SOCKET', `admin:subscribe failed: ${error.message}`);
      if (typeof callback === 'function') {
        callback({
          ok: false,
          code: error.code || 'ADMIN_AUTH_INVALID',
          error: error.message,
        });
      }
    }
  });

  // 4. Server-Authoritative Timer Sync & Expiration Detection
  socket.on(SOCKET_EVENTS.TIMER.SYNC, async (payload = {}, callback) => {
    try {
      const teamId = socket.data.teamId || payload?.teamId;
      const serverTime = new Date().toISOString();

      if (!teamId) {
        const syncResponse = {
          ok: true,
          serverTime,
          phase: 'PORTAL_ACTIVE',
        };
        if (typeof callback === 'function') callback(syncResponse);
        return;
      }

      const normalizedTeamId = String(teamId).trim().toUpperCase();
      const roomName = SOCKET_ROOMS.teamRoom(normalizedTeamId);

      // Fetch raw team to check if session expired on the server
      const { Team } = await import('../models/Team.js');
      const teamDoc = await Team.findOne({ teamId: normalizedTeamId });

      if (
        teamDoc?.activeAttempt?.expiresAt &&
        new Date() >= new Date(teamDoc.activeAttempt.expiresAt)
      ) {
        // Server determines expiration -> execute authoritative TIMEOUT
        const result = await executeTeamAction(normalizedTeamId, 'TIMEOUT_CHALLENGE', {
          challengeId: teamDoc.activeAttempt.challengeId,
          attemptId: teamDoc.activeAttempt.attemptId,
        });
        const onlineOperatives = getRoomClientCount(io, roomName);

        io.to(roomName).emit(SOCKET_EVENTS.TIMER.EXPIRED, {
          teamId: normalizedTeamId,
          attemptId: result.evaluationResult?.attemptId,
          challengeId: result.evaluationResult?.challengeId,
          evaluationResult: result.evaluationResult,
          serverTime: new Date().toISOString(),
        });

        io.to(roomName).emit(SOCKET_EVENTS.CREDITS.UPDATE, {
          teamId: normalizedTeamId,
          room: roomName,
          balanceBefore: result.event.balanceBefore,
          balanceAfter: result.team.credits,
          delta: result.event.creditsDelta,
          transaction: result.transaction,
          transactions: result.transactions,
          timestamp: new Date().toISOString(),
        });

        if (result.evaluationResult) {
          io.to(roomName).emit(SOCKET_EVENTS.SUBMISSION.RESULT, result.evaluationResult);
        }

        io.to(roomName).emit(SOCKET_EVENTS.TEAM.STATE_UPDATE, {
          teamId: normalizedTeamId,
          room: roomName,
          team: result.team,
          transaction: result.transaction,
          evaluationResult: result.evaluationResult,
          attempts: result.attempts || [],
          timer: result.timer,
          serverTime: result.serverTime,
          transactions: result.transactions,
          event: result.event,
          catalog: result.catalog,
          creditsConfig: result.creditsConfig,
          onlineOperatives,
          timestamp: new Date().toISOString(),
        });

        if (typeof callback === 'function') {
          callback({
            ok: true,
            expired: true,
            serverTime: new Date().toISOString(),
            timer: result.timer,
            evaluationResult: result.evaluationResult,
          });
        }
        return;
      }

      const timer = ChallengeService.computeSessionTimerTelemetry(teamDoc?.activeAttempt);
      const syncResponse = {
        ok: true,
        teamId: normalizedTeamId,
        serverTime: new Date().toISOString(),
        timer,
        phase: 'PORTAL_ACTIVE',
      };

      io.to(roomName).emit(SOCKET_EVENTS.TIMER.UPDATE, syncResponse);

      if (typeof callback === 'function') {
        callback(syncResponse);
      }
    } catch (error) {
      logger.warn('SOCKET', `timer:sync error: ${error.message}`);
      if (typeof callback === 'function') {
        callback({ ok: false, error: error.message, serverTime: new Date().toISOString() });
      }
    }
  });
};

export const createSocketEmitters = (getIo) => ({
  emitTeamStateUpdate: (teamId, statePayload) => {
    const io = getIo();
    if (io && teamId) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      const onlineOperatives = getRoomClientCount(io, roomName);
      io.to(roomName).emit(SOCKET_EVENTS.TEAM.STATE_UPDATE, {
        ...statePayload,
        room: roomName,
        onlineOperatives,
        timestamp: new Date().toISOString(),
      });
    }
  },

  emitCreditsUpdate: (teamId, creditsPayload) => {
    const io = getIo();
    if (io && teamId) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      io.to(roomName).emit(SOCKET_EVENTS.CREDITS.UPDATE, {
        ...creditsPayload,
        room: roomName,
        timestamp: new Date().toISOString(),
      });
    }
  },

  emitChallengeUpdate: (challengePayload, teamId = null) => {
    const io = getIo();
    if (!io) return;
    const target = teamId ? SOCKET_ROOMS.teamRoom(teamId) : SOCKET_ROOMS.ARENA_GLOBAL;
    io.to(target).emit(SOCKET_EVENTS.CHALLENGE.UPDATE, challengePayload);
  },

  emitTimerUpdate: (timerPayload, teamId = null) => {
    const io = getIo();
    if (io) {
      const target = teamId ? SOCKET_ROOMS.teamRoom(teamId) : SOCKET_ROOMS.ARENA_GLOBAL;
      io.to(target).emit(SOCKET_EVENTS.TIMER.UPDATE, timerPayload);
    }
  },

  emitTimerExpired: (teamId, expiredPayload) => {
    const io = getIo();
    if (io && teamId) {
      io.to(SOCKET_ROOMS.teamRoom(teamId)).emit(SOCKET_EVENTS.TIMER.EXPIRED, expiredPayload);
    }
  },

  emitSubmissionResult: (teamId, submissionPayload) => {
    const io = getIo();
    if (io && teamId) {
      io.to(SOCKET_ROOMS.teamRoom(teamId)).emit(SOCKET_EVENTS.SUBMISSION.RESULT, submissionPayload);
    }
  },

  emitAbilityEvent: (abilityPayload, targetTeamId = null) => {
    const io = getIo();
    if (!io) return;
    const target = targetTeamId ? SOCKET_ROOMS.teamRoom(targetTeamId) : SOCKET_ROOMS.ARENA_GLOBAL;
    io.to(target).emit(SOCKET_EVENTS.ABILITY.EFFECT, abilityPayload);
  },

  emitCoreEvent: (corePayload) => {
    const io = getIo();
    if (io) {
      io.to(SOCKET_ROOMS.CORE_FEED).emit(SOCKET_EVENTS.CORE.BROADCAST, corePayload);
    }
  },

  emitCoreAvailable: (teamId, availablePayload = {}) => {
    const io = getIo();
    if (io && teamId) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      const payload = {
        teamId,
        room: roomName,
        ...availablePayload,
        timestamp: new Date().toISOString(),
      };
      io.to(roomName).emit(SOCKET_EVENTS.CORE.AVAILABLE, payload);
      io.to(SOCKET_ROOMS.CORE_FEED).emit(SOCKET_EVENTS.CORE.AVAILABLE, payload);
    }
  },

  emitCoreStateUpdate: (teamId, statePayload = {}) => {
    const io = getIo();
    if (io && teamId) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      io.to(roomName).emit(SOCKET_EVENTS.CORE.STATE_UPDATE, {
        teamId,
        room: roomName,
        ...statePayload,
        timestamp: new Date().toISOString(),
      });
    }
  },

  emitCoreCompleted: (teamId, completedPayload = {}) => {
    const io = getIo();
    if (io && teamId) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      const payload = {
        teamId,
        room: roomName,
        ...completedPayload,
        timestamp: new Date().toISOString(),
      };
      io.to(roomName).emit(SOCKET_EVENTS.CORE.COMPLETED, payload);
      io.to(SOCKET_ROOMS.ARENA_GLOBAL).emit(SOCKET_EVENTS.CORE.COMPLETED, payload);
    }
  },

  emitLeaderboardUpdate: (leaderboardPayload) => {
    const io = getIo();
    if (io) {
      io.to(SOCKET_ROOMS.LEADERBOARD).emit(SOCKET_EVENTS.LEADERBOARD.UPDATE, leaderboardPayload);
    }
  },

  emitFeedEvents: (teamId, events = [], liveFeed = []) => {
    const io = getIo();
    if (io && teamId && events.length > 0) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      io.to(roomName).emit(SOCKET_EVENTS.FEED.EVENT, {
        teamId,
        room: roomName,
        events,
        liveFeed,
        timestamp: new Date().toISOString(),
      });
    }
  },
});
