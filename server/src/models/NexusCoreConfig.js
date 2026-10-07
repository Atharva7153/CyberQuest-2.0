import mongoose from 'mongoose';

export const NEXUS_CORE_STATES = Object.freeze({
  LOCKED: 'LOCKED',
  AVAILABLE: 'AVAILABLE',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
});

const completedTeamEntrySchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    teamId: { type: String, required: true },
    teamName: { type: String, required: true },
    members: { type: Array, default: [] },
    completedAt: { type: Date, default: Date.now },
    finalCredits: { type: Number, default: 0 },
    rewardAwarded: { type: Number, default: 0 },
    totalSolved: { type: Number, default: 0 },
    riskProfile: { type: String, default: 'BALANCED' },
    proclamationCode: { type: String, default: '' },
  },
  { _id: false }
);

const nexusCoreConfigSchema = new mongoose.Schema(
  {
    coreId: {
      type: String,
      required: true,
      unique: true,
      default: 'NEXUS-CORE-PRIME',
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      default: 'THE NEXUS CORE',
    },
    designation: {
      type: String,
      default: 'ULTIMATE SYSTEM OBJECTIVE // CENTRAL CONVERGENCE',
    },
    classification: {
      type: String,
      default: 'DIRECTIVE OMEGA // CORE ARCHITECTURE',
    },
    description: {
      type: String,
      default:
        'At the end of the path lies the NEXUS Core — the ultimate system objective. Synchronize the decrypted sector keys to override the central autonomous architecture.',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    globalOverrideState: {
      type: String,
      enum: [null, ...Object.values(NEXUS_CORE_STATES)],
      default: null,
    },
    unlockConfig: {
      requiredConvergencePercent: { type: Number, default: 100 },
      minChallengesCompleted: { type: Number, default: 3 },
      entryCost: { type: Number, default: 0 },
      completionReward: { type: Number, default: 1500 },
    },
    gameType: {
      type: String,
      default: 'systemProblem',
    },
    gameConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    solutionConfig: {
      type: mongoose.Schema.Types.Mixed,
      select: false,
      default: () => ({}),
    },
    winner: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    completedTeams: {
      type: [completedTeamEntrySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

nexusCoreConfigSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    coreId: this.coreId,
    title: this.title,
    designation: this.designation,
    classification: this.classification,
    description: this.description,
    enabled: this.enabled,
    globalOverrideState: this.globalOverrideState,
    unlockConfig: this.unlockConfig,
    gameType: this.gameType,
    gameConfig: this.gameConfig || {},
    winner: this.winner || null,
    completedTeams: this.completedTeams || [],
    updatedAt: this.updatedAt,
  };
};

export const NexusCoreConfig =
  mongoose.models.NexusCoreConfig ||
  mongoose.model('NexusCoreConfig', nexusCoreConfigSchema);
