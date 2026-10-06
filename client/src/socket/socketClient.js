import { io } from 'socket.io-client';

const SOCKET_URL =
  import.meta.env.SOCKET_URL ||
  import.meta.env.VITE_SOCKET_URL ||
  'http://localhost:5050';

/**
 * NEXUS / Cyber Quest Socket Event Registry
 * Shared contract between client and server for real-time channels.
 */
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
    LEAVE: 'team:leave',
    STATE_UPDATE: 'team:state:update',
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
    DIRECTIVE: 'core:directive',
    BROADCAST: 'core:broadcast',
    ANOMALY: 'core:anomaly',
  },
  LEADERBOARD: {
    UPDATE: 'leaderboard:update',
    SNAPSHOT: 'leaderboard:snapshot',
  },
};

export const socketClient = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1500,
  transports: ['websocket', 'polling'],
});

export const getSocketEndpoint = () => SOCKET_URL;
