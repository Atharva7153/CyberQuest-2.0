import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import { getPingPong } from './controllers/healthController.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIST_DIR = path.resolve(__dirname, '../../client/dist');
const CLIENT_INDEX_HTML = path.join(CLIENT_DIST_DIR, 'index.html');

export const createApp = () => {
  const app = express();

  // Global Middleware
  app.use(compression());
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // API Routes
  app.use('/api', apiRouter);

  // Ping-Pong monitor endpoint (accessible at /ping for external uptime monitors)
  app.get('/ping', getPingPong);

  const hasBuiltClient = fs.existsSync(CLIENT_INDEX_HTML);

  if (hasBuiltClient) {
    // Unified single-container deployment (e.g. Render root Dockerfile): serve built React frontend
    app.use(express.static(CLIENT_DIST_DIR));

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/socket.io') || req.path === '/ping') {
        return next();
      }
      // If an API test client explicitly requests JSON on '/', return the banner JSON
      const accept = String(req.headers.accept || '');
      if (req.path === '/' && accept.includes('application/json') && !accept.includes('text/html')) {
        return res.status(200).json({
          status: 'ok',
          service: env.serviceName,
          system: 'NEXUS — THE LAST CHANCE',
          designation: env.systemDesignation,
          version: env.systemVersion,
          healthEndpoint: '/api/health',
          pingEndpoint: '/api/ping',
        });
      }
      return res.sendFile(CLIENT_INDEX_HTML);
    });
  } else {
    // Root System Banner Route (when running API standalone in dev)
    app.get('/', (req, res) => {
      res.status(200).json({
        status: 'ok',
        service: env.serviceName,
        system: 'NEXUS — THE LAST CHANCE',
        designation: env.systemDesignation,
        version: env.systemVersion,
        healthEndpoint: '/api/health',
        pingEndpoint: '/api/ping',
      });
    });
  }

  // Centralized Error Handling Middleware
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
};

export const app = createApp();
export default app;
