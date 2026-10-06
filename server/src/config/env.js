import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load server/.env first, fallback to root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const env = {
  port: Number(process.env.PORT) || 5050,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexus',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  socketUrl: process.env.SOCKET_URL || 'http://localhost:5050',
  jwtSecret: process.env.JWT_SECRET || 'nexus_core_authoritative_secret_key_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  serviceName: 'cyber-quest-server',
  systemDesignation: process.env.SYSTEM_DESIGNATION || 'NEXUS-CORE-01',
  systemVersion: process.env.SYSTEM_VERSION || '0.4.0-PORTAL-SHELL',
};
