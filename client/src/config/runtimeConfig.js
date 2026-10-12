/**
 * Centralized Runtime URL & Tunnel Mode Configuration
 *
 * Switches between Localhost URLs and Cloudflare Tunnel URLs based on `TESTING`
 * (or `VITE_TESTING`) in `.env`.
 */

const parseBooleanEnv = (value) => {
  if (typeof value === 'boolean') return value;
  const normalized = String(value || '')
    .trim()
    .toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
};

const sanitizeUrl = (rawUrl) => {
  const trimmed = String(rawUrl || '')
    .trim()
    .replace(/\/+$/, '');
  if (!trimmed) return '';
  // Ignore unedited example placeholders so fallback logic can still protect the app
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

export const IS_TESTING = parseBooleanEnv(
  import.meta.env.TESTING ?? import.meta.env.VITE_TESTING
);

const CLOUDFLARE_BASE_URL = sanitizeUrl(
  import.meta.env.VITE_CLOUDFLARE_URL || import.meta.env.CLOUDFLARE_URL
);

const CLOUDFLARE_API_URL = sanitizeUrl(
  import.meta.env.VITE_CLOUDFLARE_API_URL ||
    import.meta.env.CLOUDFLARE_API_URL ||
    CLOUDFLARE_BASE_URL
);

const CLOUDFLARE_SOCKET_URL = sanitizeUrl(
  import.meta.env.VITE_CLOUDFLARE_SOCKET_URL ||
    import.meta.env.CLOUDFLARE_SOCKET_URL ||
    CLOUDFLARE_API_URL ||
    CLOUDFLARE_BASE_URL
);

const CLOUDFLARE_CLIENT_URL = sanitizeUrl(
  import.meta.env.VITE_CLOUDFLARE_CLIENT_URL ||
    import.meta.env.CLOUDFLARE_CLIENT_URL ||
    CLOUDFLARE_BASE_URL
);

const LOCAL_API_URL = sanitizeUrl(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.API_URL
);

const LOCAL_SOCKET_URL = sanitizeUrl(
  import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.SOCKET_URL ||
    LOCAL_API_URL
);

const LOCAL_CLIENT_URL = sanitizeUrl(
  import.meta.env.VITE_CLIENT_URL || import.meta.env.CLIENT_URL
);

const getBrowserOriginFallback = () => {
  if (typeof window === 'undefined') return 'http://localhost:5050';
  const { hostname, port, origin } = window.location;
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';
  if (!isLocalHost || port !== '5173') {
    return origin;
  }
  return 'http://localhost:5050';
};

export const API_BASE_URL = IS_TESTING
  ? CLOUDFLARE_API_URL || getBrowserOriginFallback()
  : LOCAL_API_URL || getBrowserOriginFallback();

export const SOCKET_URL = IS_TESTING
  ? CLOUDFLARE_SOCKET_URL || API_BASE_URL
  : LOCAL_SOCKET_URL || getBrowserOriginFallback();

export const CLIENT_URL = IS_TESTING
  ? CLOUDFLARE_CLIENT_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')
  : LOCAL_CLIENT_URL || 'http://localhost:5173';
