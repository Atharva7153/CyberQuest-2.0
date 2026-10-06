import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorMiddleware.js';

export const createApp = () => {
  const app = express();

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
      status: 'ok',
      service: env.serviceName,
      system: 'NEXUS — THE LAST CHANCE',
      designation: env.systemDesignation,
      version: env.systemVersion,
      healthEndpoint: '/api/health',
    });
  });

  // API Routes
  app.use('/api', apiRouter);

  // Centralized Error Handling Middleware
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
};

export const app = createApp();
export default app;
