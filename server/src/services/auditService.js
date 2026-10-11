import mongoose from 'mongoose';
import {
  AuditLog,
  AUDIT_ACTION_TYPES,
  SUPPORTED_AUDIT_ACTIONS,
} from '../models/AuditLog.js';
import { RecordingService } from './recordingService.js';
import { logger } from '../utils/logger.js';

const inMemoryAuditBuffer = [
  {
    auditId: 'AUD-BOOT-01',
    action: AUDIT_ACTION_TYPES.ADMIN_ACTION,
    actorType: 'SYSTEM',
    actorId: 'NEXUS-CORE',
    teamId: null,
    challengeId: null,
    attemptId: null,
    attemptNumber: null,
    creditsDelta: 0,
    balanceAfter: null,
    summary: 'PHASE 15 SECURITY & FAIR PLAY ENFORCEMENT INITIALIZED // SERVER AUTHORITY ACTIVE',
    metadata: { version: '2.0-HARDENED' },
    timestamp: new Date().toISOString(),
  },
];

export class AuditService {
  /**
   * Record a canonical Phase 15 Audit Log entry:
   * LOGIN | PURCHASE | START | SUBMISSION | SUCCESS | FAILURE | ABILITY | HINT | EXTRA_TIME | ADMIN_ACTION
   */
  static async record(entry = {}) {
    const rawAction = String(entry.action || '').trim().toUpperCase();
    const action = SUPPORTED_AUDIT_ACTIONS.includes(rawAction)
      ? rawAction
      : AUDIT_ACTION_TYPES.ADMIN_ACTION;

    const now = new Date();
    const auditRecord = {
      auditId:
        entry.auditId ||
        `AUD-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 6)
          .toUpperCase()}`,
      action,
      actorType: entry.actorType || (entry.teamId ? 'TEAM' : 'SYSTEM'),
      actorId: String(entry.actorId || entry.teamId || 'NEXUS-CORE').toUpperCase(),
      teamId: entry.teamId ? String(entry.teamId).trim().toUpperCase() : null,
      challengeId: entry.challengeId ? String(entry.challengeId).trim().toUpperCase() : null,
      attemptId: entry.attemptId ? String(entry.attemptId).trim() : null,
      attemptNumber:
        entry.attemptNumber !== undefined && entry.attemptNumber !== null
          ? Number(entry.attemptNumber)
          : null,
      creditsDelta: Number(entry.creditsDelta || 0),
      balanceAfter:
        entry.balanceAfter !== undefined && entry.balanceAfter !== null
          ? Number(entry.balanceAfter)
          : null,
      summary: String(entry.summary || `${action} recorded by server authority.`).trim(),
      metadata: entry.metadata || {},
      timestamp: now.toISOString(),
    };

    inMemoryAuditBuffer.unshift(auditRecord);
    if (inMemoryAuditBuffer.length > 250) {
      inMemoryAuditBuffer.length = 250;
    }

    // Automatically feed active admin game recording session & anomaly detector
    try {
      RecordingService.captureAuditEvent(auditRecord);
    } catch {
      // Never block main flow
    }

    if (mongoose.connection.readyState === 1) {
      AuditLog.create({
        ...auditRecord,
        timestamp: now,
      }).catch((err) => {
        logger.warn('AUDIT', `AuditLog DB write warning: ${err.message}`);
      });
    }

    return auditRecord;
  }

  /**
   * List recent audit logs (optionally filtered by action or teamId)
   */
  static async listLogs({ action = null, teamId = null, limit = 100 } = {}) {
    const normalizedAction = action ? String(action).trim().toUpperCase() : null;
    const normalizedTeamId = teamId ? String(teamId).trim().toUpperCase() : null;

    const memMatches = inMemoryAuditBuffer.filter((item) => {
      if (normalizedAction && item.action !== normalizedAction) return false;
      if (normalizedTeamId && item.teamId !== normalizedTeamId) return false;
      return true;
    });

    if (mongoose.connection.readyState === 1) {
      try {
        const query = {};
        if (normalizedAction && SUPPORTED_AUDIT_ACTIONS.includes(normalizedAction)) {
          query.action = normalizedAction;
        }
        if (normalizedTeamId) {
          query.teamId = normalizedTeamId;
        }
        const docs = await AuditLog.find(query)
          .sort({ timestamp: -1 })
          .limit(limit)
          .lean();
        if (docs.length > 0) {
          const seenIds = new Set(memMatches.map((m) => m.auditId));
          const combined = [...memMatches];
          for (const d of docs) {
            if (!seenIds.has(d.auditId)) {
              seenIds.add(d.auditId);
              combined.push({
                ...d,
                timestamp: d.timestamp
                  ? new Date(d.timestamp).toISOString()
                  : new Date().toISOString(),
              });
            }
          }
          combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          return combined.slice(0, limit);
        }
      } catch (err) {
        logger.warn('AUDIT', `AuditLog query fallback to memory: ${err.message}`);
      }
    }

    return memMatches.slice(0, limit);
  }
}

export { AUDIT_ACTION_TYPES, SUPPORTED_AUDIT_ACTIONS };
export default AuditService;
