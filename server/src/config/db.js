import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';
import { PLANNED_COLLECTIONS } from '../models/index.js';
import { ensureDefaultTeamsSeeded } from '../services/teamService.js';

const READY_STATES = {
  0: 'DISCONNECTED',
  1: 'CONNECTED',
  2: 'CONNECTING',
  3: 'DISCONNECTING',
};

let lastConnectionError = null;
let retryTimer = null;

const maskMongoUri = (uri = '') => {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
};

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
      minPoolSize: 5,
      socketTimeoutMS: 30000,
    });
    lastConnectionError = null;
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
    logger.info(
      'DB',
      `MongoDB connected -> ${mongoose.connection.host}/${mongoose.connection.name || 'nexus'}`
    );
    await ensureDefaultTeamsSeeded();
  } catch (error) {
    lastConnectionError = error.message;
    logger.warn(
      'DB',
      `MongoDB unreachable (${error.message}). Retrying in 10s...`
    );
    if (!retryTimer) {
      retryTimer = setTimeout(() => {
        retryTimer = null;
        connectDB();
      }, 10000);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  logger.warn('DB', 'MongoDB connection disconnected.');
});

mongoose.connection.on('reconnected', () => {
  lastConnectionError = null;
  logger.info('DB', 'MongoDB reconnected.');
});

export const getDatabaseStatus = () => {
  const readyState = mongoose.connection.readyState;
  const isConnected = readyState === 1;

  return {
    connected: isConnected,
    state: READY_STATES[readyState] || 'UNKNOWN',
    host: isConnected ? mongoose.connection.host : '127.0.0.1:27017',
    dbName: isConnected ? mongoose.connection.name || 'nexus' : 'nexus',
    compassUri: maskMongoUri(env.mongoUri),
    plannedCollections: Object.values(PLANNED_COLLECTIONS),
    error: isConnected ? null : lastConnectionError,
  };
};
