import { SOCKET_EVENTS, SOCKET_ROOMS } from './socketEvents.js';
import { logger } from '../utils/logger.js';
import { verifyTeamToken } from '../utils/jwt.js';
import {
  getTeamStateById,
  executeTeamAction,
  CHALLENGE_CATALOG,
} from '../services/teamService.js';
import { CreditService } from '../services/creditService.js';
import { ChallengeService } from '../services/challengeService.js';

const getRoomClientCount = (io, roomName) => {
  const room = io.sockets.adapter.rooms.get(roomName);
  return room ? room.size : 0;
};

export const registerSocketChannels = (io, socket) => {
  socket.join(SOCKET_ROOMS.ARENA_GLOBAL);
  socket.join(SOCKET_ROOMS.CORE_FEED);

  // 1. Authenticated Team Room Join: team:<teamId>
  socket.on(SOCKET_EVENTS.TEAM.JOIN, async (payload = {}, callback) => {
    try {
      let resolvedTeamId = payload?.teamId;

      if (payload?.token) {
        const decoded = verifyTeamToken(payload.token);
        resolvedTeamId = decoded.teamId;
      }

      if (!resolvedTeamId) {
        if (typeof callback === 'function') {
          callback({ ok: false, error: 'TEAM_ID_REQUIRED' });
        }
        return;
      }

      const normalizedTeamId = String(resolvedTeamId).trim().toUpperCase();
      const roomName = SOCKET_ROOMS.teamRoom(normalizedTeamId);

      if (socket.data.teamRoom && socket.data.teamRoom !== roomName) {
        socket.leave(socket.data.teamRoom);
      }

      socket.join(roomName);
      socket.data.teamId = normalizedTeamId;
      socket.data.teamRoom = roomName;

      const onlineOperatives = getRoomClientCount(io, roomName);
      logger.info(
        'SOCKET',
        `Terminal [${socket.id}] joined [${roomName}] | Operatives online: ${onlineOperatives}`
      );

      const [teamState, transactions, catalog, attempts] = await Promise.all([
        getTeamStateById(normalizedTeamId),
        CreditService.getTeamTransactions(normalizedTeamId),
        ChallengeService.listChallenges(),
        ChallengeService.getAttemptsForTeam(normalizedTeamId),
      ]);

      const timer = ChallengeService.computeSessionTimerTelemetry(teamState?.activeAttempt);
      const serverTime = new Date().toISOString();

      const ackPayload = {
        ok: true,
        teamId: normalizedTeamId,
        room: roomName,
        socketId: socket.id,
        onlineOperatives,
        team: teamState,
        transactions,
        attempts: attempts || [],
        timer,
        serverTime,
        catalog: catalog || CHALLENGE_CATALOG,
        creditsConfig: CreditService.getConfig(),
        timestamp: serverTime,
      };

      socket.emit(SOCKET_EVENTS.TEAM.JOINED_ACK, ackPayload);

      io.to(roomName).emit(SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, {
        teamId: normalizedTeamId,
        room: roomName,
        onlineOperatives,
        timestamp: serverTime,
      });

      if (typeof callback === 'function') {
        callback(ackPayload);
      }
    } catch (error) {
      logger.warn('SOCKET', `team:join failed: ${error.message}`);
      if (typeof callback === 'function') {
        callback({ ok: false, error: error.message });
      }
    }
  });

  // 2. Server-Authoritative Team & Credit Action via Socket
  const handleAuthoritativeAction = async (payload = {}, callback) => {
    try {
      const teamId = socket.data.teamId || payload?.teamId;
      if (!teamId) {
        throw new Error('Socket is not bound to an authenticated team.');
      }

      const actionType = payload.actionType || payload.type;
      const actionPayload = payload.actionPayload || payload.payload || payload;
      const result = await executeTeamAction(teamId, actionType, actionPayload);
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      const onlineOperatives = getRoomClientCount(io, roomName);

      const broadcastPayload = {
        teamId,
        room: roomName,
        team: result.team,
        transaction: result.transaction,
        evaluationResult: result.evaluationResult || null,
        attempts: result.attempts || [],
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

      if (result.timer) {
        io.to(roomName).emit(SOCKET_EVENTS.TIMER.UPDATE, {
          teamId,
          room: roomName,
          timer: result.timer,
          serverTime: result.serverTime || new Date().toISOString(),
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

      if (typeof callback === 'function') {
        callback({ ok: true, ...broadcastPayload });
      }
    } catch (error) {
      logger.warn('SOCKET', `Team/Credit action error: ${error.message}`);
      if (typeof callback === 'function') {
        callback({ ok: false, error: error.message });
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
  });

  socket.on(SOCKET_EVENTS.LEADERBOARD.SUBSCRIBE, (payload = {}, callback) => {
    socket.join(SOCKET_ROOMS.LEADERBOARD);
    if (typeof callback === 'function') {
      callback({
        ok: true,
        room: SOCKET_ROOMS.LEADERBOARD,
        timestamp: new Date().toISOString(),
      });
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

  emitLeaderboardUpdate: (leaderboardPayload) => {
    const io = getIo();
    if (io) {
      io.to(SOCKET_ROOMS.LEADERBOARD).emit(SOCKET_EVENTS.LEADERBOARD.UPDATE, leaderboardPayload);
    }
  },
});
