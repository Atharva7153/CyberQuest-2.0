import { SOCKET_EVENTS, SOCKET_ROOMS } from './socketEvents.js';
import { logger } from '../utils/logger.js';
import { verifyTeamToken } from '../utils/jwt.js';
import {
  getTeamStateById,
  executeTeamAction,
  CHALLENGE_CATALOG,
} from '../services/teamService.js';

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

      // Leave previous team room if switching
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

      const teamState = await getTeamStateById(normalizedTeamId);

      const ackPayload = {
        ok: true,
        teamId: normalizedTeamId,
        room: roomName,
        socketId: socket.id,
        onlineOperatives,
        team: teamState,
        catalog: CHALLENGE_CATALOG,
        timestamp: new Date().toISOString(),
      };

      socket.emit(SOCKET_EVENTS.TEAM.JOINED_ACK, ackPayload);

      // Broadcast updated presence & authoritative state to all members in team:<teamId>
      io.to(roomName).emit(SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, {
        teamId: normalizedTeamId,
        room: roomName,
        onlineOperatives,
        timestamp: new Date().toISOString(),
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

  // 2. Server-Authoritative Team Action via Socket (purchase challenge, spend credits, use ability, submit)
  socket.on(SOCKET_EVENTS.TEAM.ACTION, async (payload = {}, callback) => {
    try {
      const teamId = socket.data.teamId || payload?.teamId;
      if (!teamId) {
        throw new Error('Socket is not bound to an authenticated team.');
      }

      const { actionType, actionPayload } = payload;
      const result = await executeTeamAction(teamId, actionType, actionPayload);
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      const onlineOperatives = getRoomClientCount(io, roomName);

      const broadcastPayload = {
        teamId,
        room: roomName,
        team: result.team,
        event: result.event,
        catalog: result.catalog,
        onlineOperatives,
        triggeredBySocketId: socket.id,
        timestamp: new Date().toISOString(),
      };

      // Broadcast updated authoritative state to ALL members in team:<teamId>
      io.to(roomName).emit(SOCKET_EVENTS.TEAM.STATE_UPDATE, broadcastPayload);

      if (typeof callback === 'function') {
        callback({ ok: true, ...broadcastPayload });
      }
    } catch (error) {
      logger.warn('SOCKET', `team:action error: ${error.message}`);
      if (typeof callback === 'function') {
        callback({ ok: false, error: error.message });
      }
    }
  });

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

  // 4. Leaderboard Room Subscription
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

  // 5. Timer Sync
  socket.on(SOCKET_EVENTS.TIMER.SYNC, (payload = {}, callback) => {
    const syncResponse = {
      ok: true,
      serverTime: new Date().toISOString(),
      phase: 'PORTAL_ACTIVE',
    };
    if (typeof callback === 'function') {
      callback(syncResponse);
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

  emitChallengeUpdate: (challengePayload, teamId = null) => {
    const io = getIo();
    if (!io) return;
    const target = teamId ? SOCKET_ROOMS.teamRoom(teamId) : SOCKET_ROOMS.ARENA_GLOBAL;
    io.to(target).emit(SOCKET_EVENTS.CHALLENGE.UPDATE, challengePayload);
  },

  emitTimerUpdate: (timerPayload) => {
    const io = getIo();
    if (io) {
      io.to(SOCKET_ROOMS.ARENA_GLOBAL).emit(SOCKET_EVENTS.TIMER.UPDATE, timerPayload);
    }
  },

  emitCreditsUpdate: (teamId, creditsPayload) => {
    const io = getIo();
    if (io && teamId) {
      io.to(SOCKET_ROOMS.teamRoom(teamId)).emit(SOCKET_EVENTS.CREDITS.UPDATE, creditsPayload);
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
