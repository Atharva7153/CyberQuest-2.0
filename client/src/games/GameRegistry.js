import {
  SudokuGame,
  normalizeSudokuConfig,
  validateSudokuBoardClient,
  serializeSudokuSubmission,
} from './sudoku';
import {
  Xo4x4Game,
  normalizeXo4x4Config,
  evaluateXo4x4Board,
  serializeXo4x4Submission,
} from './xo4x4';
import {
  WendGame,
  normalizeWendConfig,
  validateWendChainClient,
  serializeWendSubmission,
} from './wend';
import {
  PatchesGame,
  normalizePatchesConfig,
  validatePatchesBoardClient,
  serializePatchesSubmission,
} from './patches';
import {
  ZipGame,
  normalizeZipConfig,
  validateZipPathClient,
  serializeZipSubmission,
} from './zip';
import {
  Connect4Game,
  normalizeConnect4Config,
  evaluateConnect4Board,
  serializeConnect4Submission,
} from './connect4';
import {
  WordGuessGame,
  normalizeWordGuessConfig,
} from './wordGuess';
import {
  QueensGame,
  normalizeQueensConfig,
  validateQueensBoardClient,
  serializeQueensSubmission,
} from './queens';
import {
  AptitudeGame,
  normalizeAptitudeConfig,
  validateAptitudeClient,
  serializeAptitudeSubmission,
} from './aptitude';
import {
  GkTrueFalseGame,
  normalizeGkTrueFalseConfig,
  validateGkTrueFalseClient,
  serializeGkTrueFalseSubmission,
} from './gkTrueFalse';
import {
  MemoryMatrixGame,
  normalizeMemoryMatrixConfig,
  validateMemoryMatrixClient,
  serializeMemoryMatrixSubmission,
} from './memoryMatrix';

/**
 * PHASE 19 — CENTRALIZED CYBER QUEST GAME REGISTRY
 *
 * Canonical registered games:
 * - sudoku
 * - connect4
 * - wordGuess
 * - xo4x4
 * - wend
 * - patches
 * - zip
 * - queens
 * - aptitude
 * - gkTrueFalse
 * - memoryMatrix
 *
 * Adding a future game requires ONLY:
 * 1. Create game component & logic in /games/<gameType>
 * 2. Register game type in GameRegistry
 * 3. Configure challenge in MongoDB
 */
export const GameRegistry = {
  sudoku: {
    id: 'sudoku',
    label: 'SUDOKU',
    defaultCategory: 'LOGIC',
    component: SudokuGame,
    normalizeConfig: normalizeSudokuConfig,
    validateClient: validateSudokuBoardClient,
    serializeSubmission: serializeSudokuSubmission,
  },
  connect4: {
    id: 'connect4',
    label: 'CONNECT 4 VS AI',
    defaultCategory: 'LOGIC',
    component: Connect4Game,
    normalizeConfig: normalizeConnect4Config,
    validateClient: evaluateConnect4Board,
    serializeSubmission: serializeConnect4Submission,
  },
  wordGuess: {
    id: 'wordGuess',
    label: 'WORD GUESSING',
    defaultCategory: 'PUZZLES',
    component: WordGuessGame,
    normalizeConfig: normalizeWordGuessConfig,
    validateClient: (word, cfg) => ({
      isComplete: String(word || '').length === Number(cfg?.wordLength || 7),
      isValid: String(word || '').length === Number(cfg?.wordLength || 7),
    }),
    serializeSubmission: (word) => String(word || '').trim().toUpperCase(),
  },
  xo4x4: {
    id: 'xo4x4',
    label: '4×4 TIC-TAC-TOE VS AI',
    defaultCategory: 'LOGIC',
    component: Xo4x4Game,
    normalizeConfig: normalizeXo4x4Config,
    validateClient: evaluateXo4x4Board,
    serializeSubmission: serializeXo4x4Submission,
  },
  wend: {
    id: 'wend',
    label: 'WEND',
    defaultCategory: 'PUZZLES',
    component: WendGame,
    normalizeConfig: normalizeWendConfig,
    validateClient: validateWendChainClient,
    serializeSubmission: serializeWendSubmission,
  },
  patches: {
    id: 'patches',
    label: 'PATCHES',
    defaultCategory: 'OBSERVATION',
    component: PatchesGame,
    normalizeConfig: normalizePatchesConfig,
    validateClient: validatePatchesBoardClient,
    serializeSubmission: serializePatchesSubmission,
  },
  zip: {
    id: 'zip',
    label: 'ZIP',
    defaultCategory: 'PUZZLES',
    component: ZipGame,
    normalizeConfig: normalizeZipConfig,
    validateClient: validateZipPathClient,
    serializeSubmission: serializeZipSubmission,
  },
  queens: {
    id: 'queens',
    label: 'N-QUEENS',
    defaultCategory: 'LOGIC',
    component: QueensGame,
    normalizeConfig: normalizeQueensConfig,
    validateClient: validateQueensBoardClient,
    serializeSubmission: serializeQueensSubmission,
  },
  aptitude: {
    id: 'aptitude',
    label: 'APTITUDE',
    defaultCategory: 'LOGIC',
    component: AptitudeGame,
    normalizeConfig: normalizeAptitudeConfig,
    validateClient: validateAptitudeClient,
    serializeSubmission: serializeAptitudeSubmission,
  },
  gkTrueFalse: {
    id: 'gkTrueFalse',
    label: 'GK (TRUE OR FALSE)',
    defaultCategory: 'KNOWLEDGE',
    component: GkTrueFalseGame,
    normalizeConfig: normalizeGkTrueFalseConfig,
    validateClient: validateGkTrueFalseClient,
    serializeSubmission: serializeGkTrueFalseSubmission,
  },
  memoryMatrix: {
    id: 'memoryMatrix',
    label: 'MEMORY MATRIX',
    defaultCategory: 'OBSERVATION',
    component: MemoryMatrixGame,
    normalizeConfig: normalizeMemoryMatrixConfig,
    validateClient: validateMemoryMatrixClient,
    serializeSubmission: serializeMemoryMatrixSubmission,
  },
};

export const registerGameModule = (gameType, definition) => {
  if (!gameType || !definition?.component) return;
  GameRegistry[gameType] = {
    id: gameType,
    label: String(definition.label || gameType).toUpperCase(),
    defaultCategory: definition.defaultCategory || 'LOGIC',
    ...definition,
  };
};

export const getGameModule = (gameType) => {
  if (!gameType) return null;
  return GameRegistry[gameType] || null;
};

export default GameRegistry;
