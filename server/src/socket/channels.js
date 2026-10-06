import { SOCKET_EVENTS, SOCKET_ROOMS } from './socketEvents.js';
import { logger } from '../utils/logger.js';

/**
 * Registers foundational channel listeners on a connected client socket.
 * Note: Game mechanics are intentionally deferred to later phases.
 * This layer establishes the room subscriptions and event contracts.
 */
export const registerSocketChannels = (io, socket) => {
  // Automatically join global arena & Core broadcast rooms
  socket.join(SOCKET_ROOMS.ARENA_GLOBAL);
  socket.join(SOCKET_ROOMS.CORE_FEED);

  // 1. Team Joining & Room Subscription Infrastructure
  socket.on(SOCKET_EVENTS.TEAM.JOIN, (payload = {}, callback) => {
    const teamId = payload?.teamId;
    if (!teamId) {
      if (typeof callback === 'function') {
        callback({ ok: false, error: 'TEAM_ID_REQUIRED' });
      }
      return;
    }

    const roomName = SOCKET_ROOMS.teamRoom(teamId);
    socket.join(roomName);
    logger.info('SOCKET', `Terminal [${socket.id}] subscribed to ${roomName}`);

    const ackPayload = {
      ok: true,
      teamId,
      room: roomName,
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    };

    socket.emit(SOCKET_EVENTS.TEAM.JOINED_ACK, ackPayload);
    if (typeof callback === 'function') {
      callback(ackPayload);
    }
  });

  socket.on(SOCKET_EVENTS.TEAM.LEAVE, (payload = {}, callback) => {
    const teamId = payload?.teamId;
    if (teamId) {
      const roomName = SOCKET_ROOMS.teamRoom(teamId);
      socket.leave(roomName);
      logger.info('SOCKET', `Terminal [${socket.id}] left ${roomName}`);
    }
    if (typeof callback === 'function') {
      callback({ ok: true });
    }
  });

  // 2. Leaderboard Room Subscription Infrastructure
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

  // 3. Timer Sync Request Stub (infrastructure ready for Game Timer Engine)
  socket.on(SOCKET_EVENTS.TIMER.SYNC, (payload = {}, callback) => {
    const syncResponse = {
      ok: true,
      serverTime: new Date().toISOString(),
      phase: 'INFRASTRUCTURE_STANDBY',
    };
    if (typeof callback === 'function') {
      callback(syncResponse);
    }
  });
};

/**
 * Reusable Socket.IO Emitter Helpers for future services:
 * - team state updates
 * - challenge updates
 * - timer updates
 * - credits updates
 * - submission events
 * - ability events
 * - Core events
 * - leaderboard events
 */
export const createSocketEmitters = (getIo) => ({
  emitTeamStateUpdate: (teamId, statePayload) => {
    const io = getIo();
    if (io && teamId) {
      io.to(SOCKET_ROOMS.teamRoom(teamId)).emit(SOCKET_EVENTS.TEAM.STATE_UPDATE, statePayload);
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
