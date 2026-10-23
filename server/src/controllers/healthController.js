import { buildSystemHealthReport } from '../services/healthService.js';

export const getHealthStatus = (req, res) => {
  const report = buildSystemHealthReport();
  res.status(200).json(report);
};

export const postDiagnosticPing = (req, res) => {
  const report = buildSystemHealthReport();
  res.status(200).json({
    ...report,
    diagnosticEcho: {
      receivedPayload: req.body || {},
      respondedAt: new Date().toISOString(),
      message: 'NEXUS REST API HANDSHAKE VERIFIED.',
    },
  });
};

/**
 * Lightweight Ping-Pong endpoint for uptime monitors (e.g., UptimeRobot, Render keep-alive, BetterStack).
 * Responds with HTTP 200 OK.
 * Returns plain text "pong" if requested via ?raw=true, ?format=text, or Accept: text/plain.
 * Otherwise returns structured JSON with { status: 'ok', message: 'pong', ... }.
 */
export const getPingPong = (req, res) => {
  const accept = String(req.headers.accept || '');
  if (req.query.raw === 'true' || req.query.format === 'text' || accept === 'text/plain') {
    return res.status(200).type('text/plain').send('pong');
  }

  return res.status(200).json({
    status: 'ok',
    message: 'pong',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
};
