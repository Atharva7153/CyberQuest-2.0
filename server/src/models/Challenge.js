import mongoose from 'mongoose';
import { calculateChallengeTimeLimit } from '../config/timingConfig.js';

export const CHALLENGE_CATEGORIES = [
  'LOGIC',
  'PUZZLES',
  'OBSERVATION',
  'KNOWLEDGE',
  'TECHNICAL',
];

export const CHALLENGE_DIFFICULTIES = ['LOW', 'MODERATE', 'HIGH', 'EXTREME'];

export const CHALLENGE_RISKS = ['SAFE', 'BALANCED', 'AGGRESSIVE'];

export const SUPPORTED_GAME_TYPES = [
  'sudoku',
  'xo4x4',
  'wend',
  'patches',
  'zip',
  'queens',
  'aptitude',
  'gkTrueFalse',
  'memoryMatrix',
  'wordGuess',
  'connect4',
  'xo',
  'pattern',
  'imageObservation',
  'quiz',
  'algorithm',
  'programmingLogic',
  'systemProblem',
];

const challengeSchema = new mongoose.Schema(
  {
    challengeId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: CHALLENGE_CATEGORIES,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: CHALLENGE_DIFFICULTIES,
      default: 'MODERATE',
      index: true,
    },
    risk: {
      type: String,
      required: true,
      enum: CHALLENGE_RISKS,
      default: 'BALANCED',
      index: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    reward: {
      type: Number,
      required: true,
      min: 0,
    },
    penalty: {
      type: Number,
      default: 100,
      min: 0,
    },
    timeLimit: {
      type: Number,
      required: true,
      min: 60,
      default: 1200, // in seconds
    },
    gameType: {
      type: String,
      required: true,
      enum: SUPPORTED_GAME_TYPES,
      default: 'wordGuess',
      index: true,
    },
    gameConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    // Server-only authoritative solution & hint vault (never sent raw to client)
    solutionConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
      select: false,
    },
    enabled: {
      type: Boolean,
      default: true,
      index: true,
    },
    available: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'challenges',
  }
);

challengeSchema.index({ enabled: 1, available: 1, cost: 1, challengeId: 1 });
challengeSchema.index({ enabled: 1, gameType: 1, difficulty: 1 });


export const sanitizePublicChallenge = (docOrObj, { isMarketListing = false } = {}) => {
  if (!docOrObj) return null;
  const raw = typeof docOrObj.toObject === 'function' ? docOrObj.toObject({ versionKey: false }) : { ...docOrObj };
  delete raw.solutionConfig;
  const timeLimit = calculateChallengeTimeLimit(raw.gameType, raw.difficulty, raw.timeLimit);

  if (isMarketListing) {
    return {
      challengeId: raw.challengeId,
      title: raw.title,
      category: raw.category,
      description: raw.description,
      difficulty: raw.difficulty,
      risk: raw.risk,
      cost: Number(raw.cost || 0),
      reward: Number(raw.reward || 0),
      penalty: Number(raw.penalty || 100),
      timeLimit,
      gameType: raw.gameType,
      gameConfig: {
        artworkKey: raw.gameConfig?.artworkKey,
        sector: raw.gameConfig?.sector,
        roundTitle: raw.gameConfig?.roundTitle,
        size: raw.gameConfig?.size,
        wordLength: raw.gameConfig?.wordLength,
      },
      enabled: Boolean(raw.enabled),
      available: Boolean(raw.available),
    };
  }

  if (raw.gameConfig && typeof raw.gameConfig === 'object') {
    const {
      expectedAnswer,
      acceptedAnswers,
      secretSolution,
      answerKey,
      solutionGrid,
      solutionPatches,
      solutionPath,
      solutionSteps,
      questionPool,
      ...safeConfig
    } = raw.gameConfig;
    raw.gameConfig = safeConfig;
  }
  raw.timeLimit = timeLimit;
  return raw;
};

challengeSchema.methods.toPublicJSON = function () {
  return sanitizePublicChallenge(this);
};

export const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
