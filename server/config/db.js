import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';
import { SystemNode } from '../models/SystemNode.js';

const READY_STATES = {
  0: 'DISCONNECTED',
  1: 'CONNECTED',
  2: 'CONNECTING',
  3: 'DISCONNECTING',
};

let lastConnectionError = null;
let retryTimer = null;

const syncSystemNodeRecord = async () => {
  try {
    await SystemNode.findOneAndUpdate(
      { designation: env.systemDesignation },
      {
        designation: env.systemDesignation,
        version: env.systemVersion,
        status: 'ONLINE',
        lastHeartbeatAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    logger.warn('DB', `Could not sync system node record: ${err.message}`);
  }
};

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 3500,
    });
    lastConnectionError = null;
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
    logger.info(
      'DB',
      `MongoDB connected -> ${mongoose.connection.host}/${mongoose.connection.name}`
    );
    await syncSystemNodeRecord();
  } catch (error) {
    lastConnectionError = error.message;
    logger.warn(
      'DB',
      `Local MongoDB unreachable at ${env.mongoUri} (${error.message}). Retrying in 10s...`
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
  logger.warn('DB', 'MongoDB connection lost.');
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
    dbName: isConnected ? mongoose.connection.name : 'nexus',
    compassUri: env.mongoUri,
    error: isConnected ? null : lastConnectionError,
  };
};
