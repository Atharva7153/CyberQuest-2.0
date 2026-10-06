import http from 'http';
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { initSocketServer } from './socket/socketHandler.js';
import apiRouter from './routes/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorMiddleware.js';
import { logger } from './utils/logger.js';

const app = express();
const httpServer = http.createServer(app);

// Global Middleware
app.use(
  cors({
    origin: [env.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Root System Banner Route
app.get('/', (req, res) => {
  res.status(200).json({
    system: 'NEXUS — THE LAST CHANCE',
    designation: env.systemDesignation,
    version: env.systemVersion,
    healthEndpoint: '/api/health',
  });
});

// API Routes
app.use('/api', apiRouter);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Initialize Socket.IO
initSocketServer(httpServer);

// Boot Sequence
const startServer = async () => {
  await connectDB();

  httpServer.listen(env.port, () => {
    logger.info(
      'BOOT',
      `NEXUS Core Online -> http://localhost:${env.port} | Health: http://localhost:${env.port}/api/health`
    );
  });
};

startServer();
