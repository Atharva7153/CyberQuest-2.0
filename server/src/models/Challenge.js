import mongoose from 'mongoose';

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


export const sanitizePublicChallenge = (docOrObj) => {
  if (!docOrObj) return null;
  const raw = typeof docOrObj.toObject === 'function' ? docOrObj.toObject({ versionKey: false }) : { ...docOrObj };
  delete raw.solutionConfig;
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
  return raw;
};

challengeSchema.methods.toPublicJSON = function () {
  return sanitizePublicChallenge(this);
};

export const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
