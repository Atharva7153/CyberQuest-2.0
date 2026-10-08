import { env } from '../config/env.js';
import { getDatabaseStatus } from '../config/db.js';
import { getSocketStatus } from '../socket/index.js';

export const buildSystemHealthReport = () => {
  const dbStatus = getDatabaseStatus();
  const socketStatus = getSocketStatus();
  const mem = process.memoryUsage();

  return {
    status: 'ok',
    service: env.serviceName,
    designation: env.systemDesignation,
    version: env.systemVersion,
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: dbStatus,
    memoryMB: {
      rss: Number((mem.rss / 1024 / 1024).toFixed(1)),
      heapTotal: Number((mem.heapTotal / 1024 / 1024).toFixed(1)),
      heapUsed: Number((mem.heapUsed / 1024 / 1024).toFixed(1)),
    },
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
