import { logger } from '../utils/logger.js';

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    ok: false,
    code: 'SECTOR_NOT_FOUND',
    message: `Route [${req.method} ${req.originalUrl}] is not registered in NEXUS Core.`,
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error('API', err.message || 'Unhandled Server Error');
  res.status(statusCode).json({
    ok: false,
    code: err.code || 'INTERNAL_SYSTEM_FAULT',
    message: err.message || 'An unexpected system fault occurred.',
  });
};
