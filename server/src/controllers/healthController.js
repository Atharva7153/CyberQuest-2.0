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
