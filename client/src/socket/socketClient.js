import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config/runtimeConfig';

export const NEXUS_SOCKET_EVENTS = {
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
    RESULT: 'submission:result',
  },
  ABILITY: {
    ACTIVATE: 'ability:activate',
    EFFECT: 'ability:effect',
    COOLDOWN: 'ability:cooldown',
  },
  CORE: {
    AVAILABLE: 'core:available',
    STATE_UPDATE: 'core:state:update',
    COMPLETED: 'core:completed',
    DIRECTIVE: 'core:directive',
    BROADCAST: 'core:broadcast',
    ANOMALY: 'core:anomaly',
  },
  LEADERBOARD: {
    SUBSCRIBE: 'leaderboard:subscribe',
    UPDATE: 'leaderboard:update',
    SNAPSHOT: 'leaderboard:snapshot',
  },
  FEED: {
    EVENT: 'feed:event',
  },
  ADMIN: {
    SUBSCRIBE: 'admin:subscribe',
    STATE_UPDATE: 'admin:state:update',
    EVENT_ACTION: 'admin:event:action',
  },
};

export const LIVE_FEED_EVENT_TYPES = Object.freeze({
  CHALLENGE_ACQUIRED: 'CHALLENGE ACQUIRED',
  CHALLENGE_STARTED: 'CHALLENGE STARTED',
  SUBMISSION: 'SUBMISSION',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  CREDITS_UPDATED: 'CREDITS UPDATED',
  ABILITY_USED: 'ABILITY USED',
});

export const socketClient = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1500,
  transports: ['websocket', 'polling'],
});

export const getSocketEndpoint = () => SOCKET_URL;
