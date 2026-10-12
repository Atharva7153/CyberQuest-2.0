import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load server/.env first, fallback to root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const isTesting = ['true', '1', 'yes'].includes(
  String(process.env.TESTING || process.env.VITE_TESTING || '')
    .trim()
    .toLowerCase()
);

const sanitizeUrl = (rawUrl) => {
  const trimmed = String(rawUrl || '')
    .trim()
    .replace(/\/+$/, '');
  if (!trimmed) return '';
  if (
    trimmed.includes('your-tunnel') ||
    trimmed.includes('your-api-tunnel') ||
    trimmed.includes('your-client-tunnel') ||
    trimmed.includes('<cloudflare-url>')
  ) {
    return '';
  }
  return trimmed;
};

const cloudflareBaseUrl = sanitizeUrl(
  process.env.CLOUDFLARE_URL || process.env.VITE_CLOUDFLARE_URL
);
const cloudflareClientUrl = sanitizeUrl(
  process.env.CLOUDFLARE_CLIENT_URL ||
    process.env.VITE_CLOUDFLARE_CLIENT_URL ||
    cloudflareBaseUrl
);
const cloudflareSocketUrl = sanitizeUrl(
  process.env.CLOUDFLARE_SOCKET_URL ||
    process.env.CLOUDFLARE_API_URL ||
    process.env.VITE_CLOUDFLARE_API_URL ||
    cloudflareBaseUrl
);

export const env = {
  port: Number(process.env.PORT) || 5050,
  nodeEnv: process.env.NODE_ENV || 'development',
  isTesting,
  cloudflareUrl: cloudflareBaseUrl,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexus',
  clientUrl: isTesting
    ? cloudflareClientUrl || process.env.CLIENT_URL || 'http://localhost:5173'
    : process.env.CLIENT_URL || 'http://localhost:5173',
  socketUrl: isTesting
    ? cloudflareSocketUrl || process.env.SOCKET_URL || 'http://localhost:5050'
    : process.env.SOCKET_URL || 'http://localhost:5050',
  jwtSecret: process.env.JWT_SECRET || 'nexus_core_authoritative_secret_key_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  startingCredits:
    process.env.STARTING_CREDITS !== undefined
      ? Number(process.env.STARTING_CREDITS)
      : 1250,
  hintCost:
    process.env.CREDIT_COST_HINT !== undefined
      ? Number(process.env.CREDIT_COST_HINT)
      : 100,
  extraTimeCost:
    process.env.CREDIT_COST_EXTRA_TIME !== undefined
      ? Number(process.env.CREDIT_COST_EXTRA_TIME)
      : 150,
  reattemptMultiplier:
    process.env.CREDIT_REATTEMPT_MULTIPLIER !== undefined
      ? Number(process.env.CREDIT_REATTEMPT_MULTIPLIER)
      : 1.25,
  serviceName: 'cyber-quest-server',
  systemDesignation: process.env.SYSTEM_DESIGNATION || 'NEXUS-CORE-01',
  systemVersion: process.env.SYSTEM_VERSION || '0.5.0-CREDITS-ENGINE',
};
