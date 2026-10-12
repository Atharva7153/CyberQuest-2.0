import { Server } from 'socket.io';
import { env } from '../config/env.js';
import { getDatabaseStatus } from '../config/db.js';
import { logger } from '../utils/logger.js';
import { verifyTeamToken, verifyAdminToken } from '../utils/jwt.js';
import { SOCKET_EVENTS } from './socketEvents.js';
import { registerSocketChannels, createSocketEmitters } from './channels.js';

let ioInstance = null;

export const getSocketServer = () => ioInstance;

export const socketEmitters = createSocketEmitters(getSocketServer);

export const initSocketServer = (httpServer) => {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Phase 15 Socket.IO Handshake Authentication & Authorization Separation Middleware
  ioInstance.use((socket, next) => {
    const rawHeader = socket.handshake?.headers?.authorization || '';
    const bearerToken = rawHeader.startsWith('Bearer ') ? rawHeader.slice(7).trim() : '';
    const token = socket.handshake?.auth?.token || bearerToken || '';
    const mode = String(socket.handshake?.auth?.mode || '').toUpperCase();

    socket.data.authRole = 'PUBLIC_DISPLAY';
    socket.data.authenticatedTeamId = null;
    socket.data.isAdminAuthorized = false;

    if (!token) {
      return next();
    }

    if (mode === 'ADMIN_OPERATOR') {
      try {
        const decodedAdmin = verifyAdminToken(token);
        socket.data.authRole = decodedAdmin.role || 'ADMIN';
        socket.data.adminOperatorId = decodedAdmin.operatorId;
        socket.data.isAdminAuthorized = true;
        return next();
      } catch (err) {
        return next(new Error(`ADMIN_SOCKET_AUTH_FAILED: ${err.message}`));
      }
    }

    // Try Team Token first, then Admin Token
    try {
      const decodedTeam = verifyTeamToken(token);
      const normalizedTeamId = String(decodedTeam.teamId).trim().toUpperCase();
      socket.data.authRole = 'TEAM';
      socket.data.authenticatedTeamId = normalizedTeamId;
      socket.data.teamId = normalizedTeamId;
      socket.data.memberId = decodedTeam.memberId || null;
      socket.data.memberName = decodedTeam.memberName || null;
      return next();
    } catch {
      try {
        const decodedAdmin = verifyAdminToken(token);
        socket.data.authRole = decodedAdmin.role || 'ADMIN';
        socket.data.adminOperatorId = decodedAdmin.operatorId;
        socket.data.isAdminAuthorized = true;
        return next();
      } catch {
        if (socket.handshake?.auth?.strict) {
          return next(new Error('SOCKET_AUTH_INVALID_TOKEN'));
        }
        return next();
      }
    }
  });

  let terminalsBroadcastTimer = null;
  const scheduleTerminalsBroadcast = () => {
    if (terminalsBroadcastTimer) return;
    terminalsBroadcastTimer = setTimeout(() => {
      terminalsBroadcastTimer = null;
      if (ioInstance) {
        ioInstance.emit(SOCKET_EVENTS.SYSTEM.TERMINALS, {
          activeTerminals: ioInstance.engine.clientsCount,
          timestamp: new Date().toISOString(),
        });
      }
    }, 150);
  };

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

    // Debounced broadcast of updated terminal count
    scheduleTerminalsBroadcast();

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
      scheduleTerminalsBroadcast();
    });
  });

  // Periodic system pulse broadcast every 2 seconds for instant countdown & timer sync
  setInterval(async () => {
    if (ioInstance && ioInstance.engine.clientsCount > 0) {
      const { computeGlobalArenaTimer } = await import('../services/displayService.js');
      ioInstance.emit(SOCKET_EVENTS.SYSTEM.TELEMETRY, {
        service: env.serviceName,
        designation: env.systemDesignation,
        serverTime: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        activeTerminals: ioInstance.engine.clientsCount,
        database: getDatabaseStatus(),
        globalTimer: computeGlobalArenaTimer(),
      });
    }
  }, 2000);

  // Server-authoritative session expiration watchdog every 2 seconds
  setInterval(async () => {
    if (!ioInstance || ioInstance.engine.clientsCount === 0) return;

    try {
      const { computeGlobalArenaTimer } = await import('../services/displayService.js');
      if (computeGlobalArenaTimer().status !== 'ACTIVE') return;

      const { Team } = await import('../models/Team.js');
      const { executeTeamAction } = await import('../services/teamService.js');
      const { SOCKET_ROOMS } = await import('./socketEvents.js');

      const expiredTeams = await Team.find({
        'activeAttempt.status': 'IN_PROGRESS',
        'activeAttempt.expiresAt': { $lte: new Date() },
      }).select('teamId activeAttempt');

      for (const expiredTeam of expiredTeams) {
        const teamId = expiredTeam.teamId;
        const roomName = SOCKET_ROOMS.teamRoom(teamId);

        const result = await executeTeamAction(
          teamId,
          'TIMEOUT_CHALLENGE',
          {
            challengeId: expiredTeam.activeAttempt?.challengeId,
            attemptId: expiredTeam.activeAttempt?.attemptId,
          },
          { isTrustedAdmin: true }
        );

        ioInstance.to(roomName).emit(SOCKET_EVENTS.TIMER.EXPIRED, {
          teamId,
          attemptId: result.evaluationResult?.attemptId,
          challengeId: result.evaluationResult?.challengeId,
          evaluationResult: result.evaluationResult,
          serverTime: new Date().toISOString(),
        });

        ioInstance.to(roomName).emit(SOCKET_EVENTS.CREDITS.UPDATE, {
          teamId,
          room: roomName,
          balanceBefore: result.event.balanceBefore,
          balanceAfter: result.team.credits,
          delta: result.event.creditsDelta,
          transaction: result.transaction,
          transactions: result.transactions,
          timestamp: new Date().toISOString(),
        });

        if (result.evaluationResult) {
          ioInstance.to(roomName).emit(SOCKET_EVENTS.SUBMISSION.RESULT, result.evaluationResult);
        }

        ioInstance.to(roomName).emit(SOCKET_EVENTS.TEAM.STATE_UPDATE, {
          teamId,
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
          timestamp: new Date().toISOString(),
        });
      }
    } catch {
      // Ignore transient DB or lock contention during background check
    }
  }, 2000);

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
