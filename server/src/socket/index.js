import { Server } from 'socket.io';
import { env } from '../config/env.js';
import { getDatabaseStatus } from '../config/db.js';
import { logger } from '../utils/logger.js';
import { SOCKET_EVENTS } from './socketEvents.js';
import { registerSocketChannels, createSocketEmitters } from './channels.js';

let ioInstance = null;

export const getSocketServer = () => ioInstance;

export const socketEmitters = createSocketEmitters(getSocketServer);

export const initSocketServer = (httpServer) => {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: [env.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  ioInstance.on('connection', (socket) => {
    const activeTerminals = ioInstance.engine.clientsCount;
    logger.info('SOCKET', `Terminal connected [ID: ${socket.id}] | Active: ${activeTerminals}`);

    // Register domain channels (team, challenge, timer, credits, submission, ability, core, leaderboard)
    registerSocketChannels(ioInstance, socket);

    // Send initial handshake telemetry to newly connected terminal
    socket.emit(SOCKET_EVENTS.SYSTEM.WELCOME, {
      socketId: socket.id,
      service: env.serviceName,
      designation: env.systemDesignation,
      version: env.systemVersion,
      serverTime: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      activeTerminals,
      database: getDatabaseStatus(),
      supportedChannels: Object.keys(SOCKET_EVENTS),
      message: 'NEXUS CORE TELEMETRY LINK ESTABLISHED.',
    });

    // Broadcast updated terminal count
    ioInstance.emit(SOCKET_EVENTS.SYSTEM.TERMINALS, {
      activeTerminals,
      timestamp: new Date().toISOString(),
    });

    // Handle diagnostic ping from client
    socket.on(SOCKET_EVENTS.SYSTEM.PING, (payload = {}, callback) => {
      const response = {
        echo: payload?.signal || 'DIAGNOSTIC_PULSE',
        clientSentAt: payload?.clientTimestamp || null,
        serverReceivedAt: Date.now(),
        serverIsoTime: new Date().toISOString(),
        socketId: socket.id,
        uptimeSeconds: Math.floor(process.uptime()),
        activeTerminals: ioInstance.engine.clientsCount,
        database: getDatabaseStatus(),
      };

      socket.emit(SOCKET_EVENTS.SYSTEM.PONG, response);
      if (typeof callback === 'function') {
        callback(response);
      }
    });

    socket.on('disconnect', (reason) => {
      const remaining = ioInstance.engine.clientsCount;
      logger.info(
        'SOCKET',
        `Terminal disconnected [ID: ${socket.id}] (${reason}) | Active: ${remaining}`
      );
      ioInstance.emit(SOCKET_EVENTS.SYSTEM.TERMINALS, {
        activeTerminals: remaining,
        timestamp: new Date().toISOString(),
      });
    });
  });

  // Periodic system pulse broadcast every 5 seconds
  setInterval(() => {
    if (ioInstance && ioInstance.engine.clientsCount > 0) {
      ioInstance.emit(SOCKET_EVENTS.SYSTEM.TELEMETRY, {
        service: env.serviceName,
        designation: env.systemDesignation,
        serverTime: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        activeTerminals: ioInstance.engine.clientsCount,
        database: getDatabaseStatus(),
      });
    }
  }, 5000);

  return ioInstance;
};

export const getSocketStatus = () => {
  if (!ioInstance) {
    return { initialized: false, activeTerminals: 0 };
  }
  return {
    initialized: true,
    activeTerminals: ioInstance.engine.clientsCount,
  };
};
