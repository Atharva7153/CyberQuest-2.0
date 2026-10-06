import http from 'http';
import { app } from './src/app.js';
import { env } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import { initSocketServer } from './src/socket/index.js';
import { logger } from './src/utils/logger.js';

const httpServer = http.createServer(app);

// Initialize Socket.IO Infrastructure
initSocketServer(httpServer);

const startServer = async () => {
  await connectDB();

  httpServer.listen(env.port, '0.0.0.0', () => {
    logger.info(
      'BOOT',
      `[${env.serviceName}] Online -> http://localhost:${env.port} | Health: http://localhost:${env.port}/api/health`
    );
  });
};

startServer();
