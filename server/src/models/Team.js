import mongoose from 'mongoose';
import { creditsConfig } from '../config/creditsConfig.js';

const teamMemberSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, default: 'OPERATIVE' },
    online: { type: Boolean, default: false },
    lastSeenAt: { type: Date, default: null },
  },
  { _id: false }
);

const challengeRefSchema = new mongoose.Schema(
  {
    challengeId: { type: String, required: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['LOGIC', 'PUZZLES', 'OBSERVATION', 'KNOWLEDGE', 'TECHNICAL'],
      default: 'TECHNICAL',
    },
    description: { type: String, default: '' },
    cost: { type: Number, default: 0 },
    reward: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 },
    difficulty: {
      type: String,
      enum: ['LOW', 'MODERATE', 'HIGH', 'EXTREME'],
      default: 'MODERATE',
    },
    risk: {
      type: String,
      enum: ['SAFE', 'BALANCED', 'AGGRESSIVE'],
      default: 'BALANCED',
    },
    timeLimit: { type: Number, default: 1200 },
    gameType: { type: String, default: 'TERMINAL_CHALLENGE' },
    gameConfig: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    enabled: { type: Boolean, default: true },
    available: { type: Boolean, default: true },
    purchasedByMemberId: { type: String, default: null },
    purchasedByMemberName: { type: String, default: null },
    solvedByMemberId: { type: String, default: null },
    solvedByMemberName: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const activeAttemptSchema = new mongoose.Schema(
  {
    attemptId: { type: String, required: true },
    variantId: { type: String, default: 'DEFAULT' },
    challengeId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, default: 'TECHNICAL' },
    difficulty: { type: String, default: 'MODERATE' },
    risk: { type: String, default: 'BALANCED' },
    costPaid: { type: Number, default: 0 },
    potentialReward: { type: Number, default: 0 },
    penaltyOnFail: { type: Number, default: 0 },
    timeLimit: { type: Number, default: 1200 },
    gameType: { type: String, default: 'wordGuess' },
    gameConfig: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    solutionConfig: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    maxHints: { type: Number, default: 2 },
    hintsUnlocked: { type: Number, default: 0 },
    unlockedHints: { type: [String], default: [] },
    extraTimeMinutes: { type: Number, default: 0 },
    activeAbilities: { type: [mongoose.Schema.Types.Mixed], default: [] },
    attemptNumber: { type: Number, default: 1, min: 1 },
    isReattempt: { type: Boolean, default: false },
    assignedMemberId: { type: String, default: null },
    assignedMemberName: { type: String, default: null },
    startedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
    status: {
      type: String,
      enum: [
        'IN_PROGRESS',
        'SUBMITTING',
        'SUCCESS',
        'FAILED',
        'TIMEOUT',
        'ABANDONED',
        'COMPLETED',
        'EXPIRED',
      ],
      default: 'IN_PROGRESS',
    },
  },
  { _id: false }
);

const abilitySlotSchema = new mongoose.Schema(
  {
    abilityId: { type: String, required: true },
    name: { type: String, required: true },
    code: { type: String, default: 'MOD-00' },
    description: { type: String, default: '' },
    cost: { type: Number, required: true },
    enabled: { type: Boolean, default: true },
    effectType: { type: String, default: 'CONFIGURABLE_MODULE' },
    effectConfig: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    chargePercent: { type: Number, default: 100 },
    status: {
      type: String,
      enum: ['AVAILABLE', 'READY', 'ACTIVE', 'COOLDOWN', 'DISABLED', 'DEPLETED'],
      default: 'AVAILABLE',
    },
    cooldownSeconds: { type: Number, default: 30 },
    cooldownExpiresAt: { type: Date, default: null },
    activationsCount: { type: Number, default: 0 },
    lastUsedAt: { type: Date, default: null },
    lastActivationPayload: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false }
);

const teamStatsSchema = new mongoose.Schema(
  {
    totalSolved: { type: Number, default: 0 },
    totalFailed: { type: Number, default: 0 },
    creditsEarned: { type: Number, default: () => creditsConfig.getStartingCredits() },
    creditsSpent: { type: Number, default: 0 },
    penaltiesIncurred: { type: Number, default: 0 },
    reattemptsCount: { type: Number, default: 0 },
    hintsPurchased: { type: Number, default: 0 },
    extraTimePurchased: { type: Number, default: 0 },
    abilitiesUsed: { type: Number, default: 0 },
    riskProfile: {
      type: String,
      enum: ['SAFE', 'BALANCED', 'AGGRESSIVE'],
      default: 'BALANCED',
    },
    safeAttempts: { type: Number, default: 0 },
    balancedAttempts: { type: Number, default: 0 },
    aggressiveAttempts: { type: Number, default: 0 },
    successByRisk: {
      SAFE: { type: Number, default: 0 },
      BALANCED: { type: Number, default: 0 },
      AGGRESSIVE: { type: Number, default: 0 },
    },
    creditsByRisk: {
      SAFE: {
        gained: { type: Number, default: 0 },
        lost: { type: Number, default: 0 },
        net: { type: Number, default: 0 },
      },
      BALANCED: {
        gained: { type: Number, default: 0 },
        lost: { type: Number, default: 0 },
        net: { type: Number, default: 0 },
      },
      AGGRESSIVE: {
        gained: { type: Number, default: 0 },
        lost: { type: Number, default: 0 },
        net: { type: Number, default: 0 },
      },
    },
    coreProgressPercent: { type: Number, default: 24 },
    lastActionAt: { type: Date, default: Date.now },
    recentActivity: {
      type: [
        {
          eventId: String,
          type: { type: String },
          summary: String,
          creditsDelta: Number,
          balanceAfter: Number,
          relatedChallenge: mongoose.Schema.Types.Mixed,
          relatedAbility: mongoose.Schema.Types.Mixed,
          timestamp: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { _id: false }
);

const teamSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    accessPassword: {
      type: String,
      default: 'NEXUS-2026',
      trim: true,
    },
    members: {
      type: [teamMemberSchema],
      default: [],
    },
    credits: {
      type: Number,
      required: true,
      default: () => creditsConfig.getStartingCredits(),
      min: 0,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'STANDBY', 'LOCKED', 'DISQUALIFIED', 'CORE_UNLOCKED'],
      default: 'ACTIVE',
    },
    currentChallenge: {
      type: challengeRefSchema,
      default: null,
    },
    activeAttempt: {
      type: activeAttemptSchema,
      default: null,
    },
    activeAttempts: {
      type: [activeAttemptSchema],
      default: [],
    },
    purchasedChallenges: {
      type: [challengeRefSchema],
      default: [],
    },
    completedChallenges: {
      type: [challengeRefSchema],
      default: [],
    },
    failedChallenges: {
      type: [challengeRefSchema],
      default: [],
    },
    abilities: {
      type: [abilitySlotSchema],
      default: [],
    },
    stats: {
      type: teamStatsSchema,
      default: () => ({}),
    },
    nexusCore: {
      state: {
        type: String,
        enum: ['LOCKED', 'AVAILABLE', 'ACTIVE', 'COMPLETED'],
        default: 'LOCKED',
      },
      unlockedAt: { type: Date, default: null },
      activatedAt: { type: Date, default: null },
      completedAt: { type: Date, default: null },
      attemptsCount: { type: Number, default: 0 },
      completionRank: { type: Number, default: null },
      proclamationCode: { type: String, default: null },
    },
  },
  {
    timestamps: true,
    collection: 'teams',
  }
);

teamSchema.index({ 'activeAttempt.status': 1, 'activeAttempt.expiresAt': 1 });

teamSchema.methods.toPublicJSON = function () {
  const obj = this.toObject({ versionKey: false });
  delete obj.passwordHash;
  delete obj.accessPassword;
  if (obj.activeAttempt && typeof obj.activeAttempt === 'object') {
    delete obj.activeAttempt.solutionConfig;
  }
  if (Array.isArray(obj.activeAttempts)) {
    obj.activeAttempts = obj.activeAttempts.map((att) => {
      if (att && typeof att === 'object') {
        const { solutionConfig: _sc, ...rest } = att;
        return rest;
      }
      return att;
    });
  }
  return obj;
};

export const Team = mongoose.model('Team', teamSchema);
export default Team;
