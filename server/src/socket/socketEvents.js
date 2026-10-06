/**
 * NEXUS / Cyber Quest — Socket.IO Event & Room Architecture
 */

export const SOCKET_ROOMS = Object.freeze({
  ARENA_GLOBAL: 'room:arena',
  LEADERBOARD: 'room:leaderboard',
  CORE_FEED: 'room:core',
  teamRoom: (teamId) => `team:${String(teamId || '').trim().toUpperCase()}`,
});

export const SOCKET_EVENTS = Object.freeze({
  SYSTEM: {
    WELCOME: 'nexus:welcome',
    PING: 'nexus:ping',
    PONG: 'nexus:pong',
    TELEMETRY: 'nexus:telemetry',
    TERMINALS: 'nexus:terminals',
  },

  TEAM: {
    JOIN: 'team:join',
    JOINED_ACK: 'team:joined',
    LEAVE: 'team:leave',
    ACTION: 'team:action',
    STATE_UPDATE: 'team:state:update',
    PRESENCE_UPDATE: 'team:presence:update',
  },

  CHALLENGE: {
    UPDATE: 'challenge:update',
    UNLOCK: 'challenge:unlock',
    STATUS_CHANGE: 'challenge:status:change',
  },

  TIMER: {
    SYNC: 'timer:sync',
    UPDATE: 'timer:update',
    EXPIRED: 'timer:expired',
  },

  CREDITS: {
    UPDATE: 'credits:update',
    TRANSACTION: 'credits:transaction',
  },

  SUBMISSION: {
    SUBMIT: 'submission:submit',
    RECEIVED: 'submission:received',
    RESULT: 'submission:result',
  },

  ABILITY: {
    ACTIVATE: 'ability:activate',
    EFFECT: 'ability:effect',
    COOLDOWN: 'ability:cooldown',
  },

  CORE: {
    DIRECTIVE: 'core:directive',
    BROADCAST: 'core:broadcast',
    ANOMALY: 'core:anomaly',
  },

  LEADERBOARD: {
    SUBSCRIBE: 'leaderboard:subscribe',
    UPDATE: 'leaderboard:update',
    SNAPSHOT: 'leaderboard:snapshot',
  },
});
