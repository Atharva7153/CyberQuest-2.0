import mongoose from 'mongoose';

const challengeAttemptSchema = new mongoose.Schema(
  {
    attemptId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    teamId: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    challengeId: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      default: 'MODERATE',
    },
    risk: {
      type: String,
      default: 'BALANCED',
    },
    gameType: {
      type: String,
      required: true,
      index: true,
    },
    gameConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    costPaid: {
      type: Number,
      required: true,
      default: 0,
    },
    potentialReward: {
      type: Number,
      required: true,
      default: 0,
    },
    penaltyOnFail: {
      type: Number,
      required: true,
      default: 0,
    },
    timeLimit: {
      type: Number,
      required: true,
      default: 1200,
    },
    hintsUnlocked: {
      type: Number,
      default: 0,
    },
    unlockedHints: {
      type: [String],
      default: [],
    },
    extraTimeMinutes: {
      type: Number,
      default: 0,
    },
    isReattempt: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    submittedPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    status: {
      type: String,
      enum: ['IN_PROGRESS', 'SUBMITTING', 'COMPLETED', 'FAILED', 'EXPIRED'],
      default: 'IN_PROGRESS',
      index: true,
    },
    evaluationResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'challengeAttempts',
  }
);

export const ChallengeAttempt = mongoose.model('ChallengeAttempt', challengeAttemptSchema);
export default ChallengeAttempt;
