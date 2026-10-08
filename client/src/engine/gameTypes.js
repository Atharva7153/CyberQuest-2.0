export const GAME_TYPES = Object.freeze({
  SUDOKU: 'sudoku',
  XO4X4: 'xo4x4',
  WEND: 'wend',
  PATCHES: 'patches',
  ZIP: 'zip',
  // Legacy / Extensible types
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
    label: 'SUDOKU',
    code: 'GM-SDK',
    defaultCategory: 'LOGIC',
  },
  xo4x4: {
    id: 'xo4x4',
    label: '4×4 TIC-TAC-TOE VS AI',
    code: 'GM-XO4',
    defaultCategory: 'LOGIC',
  },
  wend: {
    id: 'wend',
    label: 'WEND',
    code: 'GM-WND',
    defaultCategory: 'PUZZLES',
  },
  patches: {
    id: 'patches',
    label: 'PATCHES',
    code: 'GM-PTC',
    defaultCategory: 'OBSERVATION',
  },
  zip: {
    id: 'zip',
    label: 'ZIP',
    code: 'GM-ZIP',
    defaultCategory: 'PUZZLES',
  },
  wordGuess: {
    id: 'wordGuess',
    label: 'WORD DECRYPTION',
    code: 'GM-WRD',
    defaultCategory: 'PUZZLES',
  },
  connect4: {
    id: 'connect4',
    label: 'CONNECT-4',
    code: 'GM-CN4',
    defaultCategory: 'LOGIC',
  },
  xo: {
    id: 'xo',
    label: '4×4 TIC-TAC-TOE VS AI',
    code: 'GM-XO4',
    defaultCategory: 'PUZZLES',
  },
  pattern: {
    id: 'pattern',
    label: 'PATTERN',
    code: 'GM-PTN',
    defaultCategory: 'OBSERVATION',
  },
  imageObservation: {
    id: 'imageObservation',
    label: 'OBSERVATION',
    code: 'GM-IMG',
    defaultCategory: 'OBSERVATION',
  },
  quiz: {
    id: 'quiz',
    label: 'QUIZ',
    code: 'GM-QUZ',
    defaultCategory: 'KNOWLEDGE',
  },
  aptitude: {
    id: 'aptitude',
    label: 'APTITUDE',
    code: 'GM-APT',
    defaultCategory: 'KNOWLEDGE',
  },
  algorithm: {
    id: 'algorithm',
    label: 'ALGORITHM',
    code: 'GM-ALG',
    defaultCategory: 'TECHNICAL',
  },
  programmingLogic: {
    id: 'programmingLogic',
    label: 'PROGRAMMING LOGIC',
    code: 'GM-PRG',
    defaultCategory: 'TECHNICAL',
  },
  systemProblem: {
    id: 'systemProblem',
    label: 'SYSTEM OBJECTIVE',
    code: 'GM-SYS',
    defaultCategory: 'TECHNICAL',
  },
});

export const getGameTypeMeta = (gameType) => {
  return (
    GAME_TYPE_METADATA[gameType] || {
      id: gameType || 'sudoku',
      label: String(gameType || 'CHALLENGE').toUpperCase(),
      code: 'GM-GEN',
      defaultCategory: 'LOGIC',
    }
  );
};
