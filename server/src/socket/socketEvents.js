/**
 * NEXUS / Cyber Quest — Socket.IO Event & Room Architecture
 * Prepared to support real-time marathon channels in subsequent phases.
 */

export const SOCKET_ROOMS = Object.freeze({
  ARENA_GLOBAL: 'room:arena',
  LEADERBOARD: 'room:leaderboard',
  CORE_FEED: 'room:core',
  teamRoom: (teamId) => `room:team:${teamId}`,
});

export const SOCKET_EVENTS = Object.freeze({
  // System & diagnostic events
  SYSTEM: {
    WELCOME: 'nexus:welcome',
    PING: 'nexus:ping',
    PONG: 'nexus:pong',
    TELEMETRY: 'nexus:telemetry',
    TERMINALS: 'nexus:terminals',
  },

  // 1. Team joining & 2. Team state updates
  TEAM: {
    JOIN: 'team:join',
    JOINED_ACK: 'team:joined',
    LEAVE: 'team:leave',
    STATE_UPDATE: 'team:state:update',
  },

  // 3. Challenge updates
  CHALLENGE: {
    UPDATE: 'challenge:update',
    UNLOCK: 'challenge:unlock',
    STATUS_CHANGE: 'challenge:status:change',
  },

  // 4. Timer updates
  TIMER: {
    SYNC: 'timer:sync',
    UPDATE: 'timer:update',
    EXPIRED: 'timer:expired',
  },

  // 5. Credits updates
  CREDITS: {
    UPDATE: 'credits:update',
    TRANSACTION: 'credits:transaction',
  },

  // 6. Submission events
  SUBMISSION: {
    SUBMIT: 'submission:submit',
    RECEIVED: 'submission:received',
    RESULT: 'submission:result',
  },

  // 7. Ability events
  ABILITY: {
    ACTIVATE: 'ability:activate',
    EFFECT: 'ability:effect',
    COOLDOWN: 'ability:cooldown',
  },

  // 8. Core (AI Overlord) events
  CORE: {
    DIRECTIVE: 'core:directive',
    BROADCAST: 'core:broadcast',
    ANOMALY: 'core:anomaly',
  },

  // 9. Leaderboard events
  LEADERBOARD: {
    SUBSCRIBE: 'leaderboard:subscribe',
    UPDATE: 'leaderboard:update',
    SNAPSHOT: 'leaderboard:snapshot',
  },
});
