import mongoose from 'mongoose';

export const AUDIT_ACTION_TYPES = Object.freeze({
  LOGIN: 'LOGIN',
  PURCHASE: 'PURCHASE',
  START: 'START',
  SUBMISSION: 'SUBMISSION',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  ABILITY: 'ABILITY',
  HINT: 'HINT',
  EXTRA_TIME: 'EXTRA_TIME',
  ADMIN_ACTION: 'ADMIN_ACTION',
});

export const SUPPORTED_AUDIT_ACTIONS = Object.values(AUDIT_ACTION_TYPES);

const auditLogSchema = new mongoose.Schema(
  {
    auditId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: SUPPORTED_AUDIT_ACTIONS,
      index: true,
    },
    actorType: {
      type: String,
      enum: ['TEAM', 'ADMIN', 'VOLUNTEER', 'SYSTEM'],
      default: 'TEAM',
      index: true,
    },
    actorId: {
      type: String,
      required: true,
      index: true,
    },
    teamId: {
      type: String,
      default: null,
      index: true,
    },
    challengeId: {
      type: String,
      default: null,
      index: true,
    },
    attemptId: {
      type: String,
      default: null,
    },
    attemptNumber: {
      type: Number,
      default: null,
    },
    creditsDelta: {
      type: Number,
      default: 0,
    },
    balanceAfter: {
      type: Number,
      default: null,
    },
    summary: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'auditLogs',
  }
);

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
