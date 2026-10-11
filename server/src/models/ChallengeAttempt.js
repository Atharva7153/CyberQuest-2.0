import mongoose from 'mongoose';

const challengeAttemptSchema = new mongoose.Schema(
  {
    attemptId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
      default: 1,
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
    rewardPenaltyDelta: {
      type: Number,
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
    assignedMemberId: {
      type: String,
      default: null,
    },
    assignedMemberName: {
      type: String,
      default: null,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    submission: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    submittedPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    result: {
      type: String,
      default: 'IN_PROGRESS',
    },
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
      index: true,
    },
    evaluationResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'challengeAttempts',
  }
);

export const ChallengeAttempt = mongoose.model('ChallengeAttempt', challengeAttemptSchema);
export default ChallengeAttempt;
