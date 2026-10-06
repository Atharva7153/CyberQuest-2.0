import mongoose from 'mongoose';
import { creditsConfig } from '../config/creditsConfig.js';

const teamMemberSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, default: 'OPERATIVE' },
    online: { type: Boolean, default: false },
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
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const activeAttemptSchema = new mongoose.Schema(
  {
    attemptId: { type: String, required: true },
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
    hintsUnlocked: { type: Number, default: 0 },
    unlockedHints: { type: [String], default: [] },
    extraTimeMinutes: { type: Number, default: 0 },
    isReattempt: { type: Boolean, default: false },
    startedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ['IN_PROGRESS', 'SUBMITTING', 'COMPLETED', 'FAILED'],
      default: 'IN_PROGRESS',
    },
  },
  { _id: false }
);

const abilitySlotSchema = new mongoose.Schema(
  {
    abilityId: { type: String, required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, default: '' },
    cost: { type: Number, required: true },
    chargePercent: { type: Number, default: 100 },
    status: {
      type: String,
      enum: ['READY', 'ACTIVE', 'COOLDOWN', 'DEPLETED'],
      default: 'READY',
    },
    lastUsedAt: { type: Date, default: null },
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
  },
  {
    timestamps: true,
    collection: 'teams',
  }
);

teamSchema.methods.toPublicJSON = function () {
  const obj = this.toObject({ versionKey: false });
  delete obj.passwordHash;
  return obj;
};

export const Team = mongoose.model('Team', teamSchema);
export default Team;
