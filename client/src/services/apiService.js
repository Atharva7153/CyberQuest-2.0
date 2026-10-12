import { API_BASE_URL } from '../config/runtimeConfig';

/**
 * Fetches the system health report from GET /api/health
 */
export const fetchSystemHealth = async () => {
  const startTime = performance.now();
  const response = await fetch(`${API_BASE_URL}/api/health`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to reach NEXUS Core API`);
  }

  const data = await response.json();
  const latencyMs = Math.round(performance.now() - startTime);

  return {
    data,
    latencyMs,
    endpoint: `${API_BASE_URL}/api/health`,
  };
};

/**
 * Sends a diagnostic handshake payload to POST /api/health/ping
 */
export const sendDiagnosticRestPing = async (signal = 'MANUAL_TERMINAL_CHECK') => {
  const startTime = performance.now();
  const response = await fetch(`${API_BASE_URL}/api/health/ping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      signal,
      clientTimestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: REST handshake rejected`);
  }

  const data = await response.json();
  const latencyMs = Math.round(performance.now() - startTime);

  return {
    data,
    latencyMs,
    endpoint: `${API_BASE_URL}/api/health/ping`,
  };
};
