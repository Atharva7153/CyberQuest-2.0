export const GAME_TYPES = Object.freeze({
  SUDOKU: 'sudoku',
  WORD_GUESS: 'wordGuess',
  CONNECT_4: 'connect4',
  XO: 'xo',
  PATTERN: 'pattern',
  IMAGE_OBSERVATION: 'imageObservation',
  QUIZ: 'quiz',
  APTITUDE: 'aptitude',
  ALGORITHM: 'algorithm',
  PROGRAMMING_LOGIC: 'programmingLogic',
  SYSTEM_PROBLEM: 'systemProblem',
});

export const GAME_TYPE_METADATA = Object.freeze({
  sudoku: {
    id: 'sudoku',
    label: 'SUDOKU CONSTRAINT MATRIX',
    code: 'ENG-SDK',
    defaultCategory: 'LOGIC',
  },
  wordGuess: {
    id: 'wordGuess',
    label: 'CIPHER WORD DECRYPTION',
    code: 'ENG-WRD',
    defaultCategory: 'PUZZLES',
  },
  connect4: {
    id: 'connect4',
    label: 'CONNECT-4 TACTICAL VECTOR',
    code: 'ENG-CN4',
    defaultCategory: 'LOGIC',
  },
  xo: {
    id: 'xo',
    label: 'X/O CONTAINMENT LOCK',
    code: 'ENG-XOX',
    defaultCategory: 'PUZZLES',
  },
  pattern: {
    id: 'pattern',
    label: 'SIGNAL PATTERN EXTRAPOLATION',
    code: 'ENG-PTN',
    defaultCategory: 'OBSERVATION',
  },
  imageObservation: {
    id: 'imageObservation',
    label: 'VISUAL TELEMETRY RECON',
    code: 'ENG-IMG',
    defaultCategory: 'OBSERVATION',
  },
  quiz: {
    id: 'quiz',
    label: 'TECHNICAL INTERROGATION QUIZ',
    code: 'ENG-QUZ',
    defaultCategory: 'KNOWLEDGE',
  },
  aptitude: {
    id: 'aptitude',
    label: 'QUANTITATIVE APTITUDE MODULE',
    code: 'ENG-APT',
    defaultCategory: 'KNOWLEDGE',
  },
  algorithm: {
    id: 'algorithm',
    label: 'ALGORITHMIC GRAPH SOLVER',
    code: 'ENG-ALG',
    defaultCategory: 'TECHNICAL',
  },
  programmingLogic: {
    id: 'programmingLogic',
    label: 'PROGRAMMING LOGIC EVALUATOR',
    code: 'ENG-PRG',
    defaultCategory: 'TECHNICAL',
  },
  systemProblem: {
    id: 'systemProblem',
    label: 'DISTRIBUTED SYSTEM DIAGNOSTIC',
    code: 'ENG-SYS',
    defaultCategory: 'TECHNICAL',
  },
});

export const getGameTypeMeta = (gameType) => {
  return (
    GAME_TYPE_METADATA[gameType] || {
      id: gameType || 'wordGuess',
      label: String(gameType || 'CHALLENGE MODULE').toUpperCase(),
      code: 'ENG-GEN',
      defaultCategory: 'TECHNICAL',
    }
  );
};
