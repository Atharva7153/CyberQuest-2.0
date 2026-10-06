import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  port: Number(process.env.PORT) || 5050,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexus',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  systemDesignation: process.env.SYSTEM_DESIGNATION || 'NEXUS-CORE-01',
  systemVersion: process.env.SYSTEM_VERSION || '0.1.0-FOUNDATION',
};
