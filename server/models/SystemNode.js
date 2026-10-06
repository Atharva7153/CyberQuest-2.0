import mongoose from 'mongoose';

const systemNodeSchema = new mongoose.Schema(
  {
    designation: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: 'NEXUS-CORE-01',
    },
    version: {
      type: String,
      required: true,
      default: '0.1.0-FOUNDATION',
    },
    status: {
      type: String,
      enum: ['ONLINE', 'MAINTENANCE', 'DEGRADED'],
      default: 'ONLINE',
    },
    lastBootAt: {
      type: Date,
      default: Date.now,
    },
    lastHeartbeatAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'system_nodes',
  }
);

export const SystemNode = mongoose.model('SystemNode', systemNodeSchema);
