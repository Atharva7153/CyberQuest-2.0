import { env } from '../config/env.js';
import { getDatabaseStatus } from '../config/db.js';
import { getSocketStatus } from '../socket/socketHandler.js';

export const buildSystemHealthReport = () => {
  const dbStatus = getDatabaseStatus();
  const socketStatus = getSocketStatus();

  return {
    ok: true,
    application: 'NEXUS — THE LAST CHANCE',
    designation: env.systemDesignation,
    version: env.systemVersion,
    environment: env.nodeEnv,
    status: dbStatus.connected ? 'OPERATIONAL' : 'ONLINE_DB_STANDBY',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    subsystems: {
      expressApi: {
        status: 'ONLINE',
        port: env.port,
      },
      socketIo: {
        status: socketStatus.initialized ? 'ONLINE' : 'OFFLINE',
        activeTerminals: socketStatus.activeTerminals,
      },
      mongoDb: dbStatus,
    },
  };
};
