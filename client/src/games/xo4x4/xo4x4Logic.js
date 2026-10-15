/**
 * 4×4 TIC-TAC-TOE VS AI (xo4x4) — Game Logic, AI Opponent & Client Validation
 */

export const XO4X4_WIN_LINES = [
  // Rows
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Columns
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

export const resolveXo4x4AiTier = (difficultyOrSkill = 'LOW') => {
  const raw = String(difficultyOrSkill || 'LOW').toUpperCase();
  if (raw === 'LOW' || raw === 'NOOB' || raw === 'NOVICE' || raw === 'EASY') {
    return { id: 'NOOB', label: 'NOOB AI', badge: 'NOOB AI (EASY)', searchDepth: 1 };
  }
  if (raw === 'MODERATE' || raw === 'ROOKIE' || raw === 'CALCULATED' || raw === 'MEDIUM') {
    return { id: 'ROOKIE', label: 'ROOKIE AI', badge: 'ROOKIE AI (MODERATE)', searchDepth: 2 };
  }
  if (raw === 'HIGH' || raw === 'SMART' || raw === 'STRATEGIC' || raw === 'HARD') {
    return { id: 'SMART', label: 'SMART AI', badge: 'SMART AI (HIGH)', searchDepth: 3 };
  }
  return { id: 'PRO', label: 'PRO AI', badge: 'PRO AI (EXTREME)', searchDepth: 5 };
};

export const normalizeXo4x4Config = (gameConfig = {}, challengeDifficulty = 'LOW') => {
  const blockedCells = Array.isArray(gameConfig.blockedCells)
    ? gameConfig.blockedCells
        .map((idx) => Number(idx))
        .filter((idx) => Number.isInteger(idx) && idx >= 0 && idx < 16)
    : [];

  const aiTier = resolveXo4x4AiTier(challengeDifficulty || gameConfig.aiSkill || gameConfig.aiDifficulty);

  return {
    size: 4,
    blockedCells,
    aiDifficulty: aiTier.id,
    aiTier,
    instructions:
      gameConfig.instructions ||
      `Align 4 X marks in a row (horizontally, vertically, or diagonally) to defeat the ${aiTier.label}.`,
  };
};

export const createInitialXo4x4Board = (blockedCells = []) => {
  const board = Array(16).fill('');
  for (const idx of blockedCells) {
    if (idx >= 0 && idx < 16) {
      board[idx] = '#';
    }
  }
  return board;
};

/**
 * Check if either X or O has completed a 4-in-a-row line, or if the board is full (DRAW).
 */
export const evaluateXo4x4Board = (board) => {
  for (const line of XO4X4_WIN_LINES) {
    const [a, b, c, d] = line;
    const first = board[a];
    if (
      (first === 'X' || first === 'O') &&
      board[b] === first &&
      board[c] === first &&
      board[d] === first
    ) {
      return {
        winner: first,
        winningLine: line,
        isDraw: false,
      };
    }
  }

  const hasEmpty = board.some((cell) => cell === '');
  return {
    winner: null,
    winningLine: [],
    isDraw: !hasEmpty,
  };
};

/**
 * Board evaluation function for 4x4 Tic-Tac-Toe
 */
const evaluateXo4x4State = (board, aiToken = 'O', playerToken = 'X') => {
  let score = 0;

  // Center control (cells 5, 6, 9, 10) are the most critical strategically
  const centerCells = [5, 6, 9, 10];
  for (const idx of centerCells) {
    if (board[idx] === aiToken) score += 16;
    else if (board[idx] === playerToken) score -= 16;
  }

  // Four corners
  const cornerCells = [0, 3, 12, 15];
  for (const idx of cornerCells) {
    if (board[idx] === aiToken) score += 6;
    else if (board[idx] === playerToken) score -= 6;
  }

  for (const line of XO4X4_WIN_LINES) {
    let aiCount = 0;
    let playerCount = 0;
    let blocked = false;

    for (const cellIdx of line) {
      const cell = board[cellIdx];
      if (cell === '#') {
        blocked = true;
        break;
      }
      if (cell === aiToken) aiCount++;
      else if (cell === playerToken) playerCount++;
    }

    if (blocked) continue;

    if (aiCount === 4) return 10000;
    if (playerCount === 4) return -10000;

    // 3 in a row threats (one move away from winning)
    if (aiCount === 3 && playerCount === 0) score += 160;
    if (playerCount === 3 && aiCount === 0) score -= 260;

    // 2 in a row developments
    if (aiCount === 2 && playerCount === 0) score += 25;
    if (playerCount === 2 && aiCount === 0) score -= 35;

    // 1 in a row
    if (aiCount === 1 && playerCount === 0) score += 5;
    if (playerCount === 1 && aiCount === 0) score -= 6;
  }

  return score;
};

// Strategic cell order for faster alpha-beta cutoffs (center -> corners -> edges)
const CELL_SEARCH_ORDER = [5, 6, 9, 10, 0, 3, 12, 15, 1, 2, 4, 7, 8, 11, 13, 14];

/**
 * Minimax with Alpha-Beta Pruning for 4x4 Tic-Tac-Toe
 */
const minimaxXo4x4 = (board, depth, alpha, beta, isMaximizing) => {
  const outcome = evaluateXo4x4Board(board);
  if (outcome.winner === 'O') return 10000 + depth;
  if (outcome.winner === 'X') return -10000 - depth;
  if (depth === 0 || outcome.isDraw) {
    return evaluateXo4x4State(board, 'O', 'X');
  }

  const emptyCells = [];
  for (const idx of CELL_SEARCH_ORDER) {
    if (board[idx] === '') emptyCells.push(idx);
  }
  if (emptyCells.length === 0) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const idx of emptyCells) {
      board[idx] = 'O';
      const ev = minimaxXo4x4(board, depth - 1, alpha, beta, false);
      board[idx] = '';
      maxEval = Math.max(maxEval, ev);
      alpha = Math.max(alpha, ev);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const idx of emptyCells) {
      board[idx] = 'X';
      const ev = minimaxXo4x4(board, depth - 1, alpha, beta, true);
      board[idx] = '';
      minEval = Math.min(minEval, ev);
      beta = Math.min(beta, ev);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

/**
 * AI move selector for 4x4 Tic-Tac-Toe:
 * - NOOB (LOW): Casual beginner AI.
 * - ROOKIE (MODERATE): Takes immediate wins, blocks obvious wins.
 * - SMART (HIGH): Minimax depth 3, calculates 3-in-a-row threats.
 * - PRO (EXTREME): Deep Minimax depth 5 with alpha-beta pruning. Controls center, blocks all threats, punishes mistakes.
 */
export const chooseAiMove4x4 = (board, moveCountOrDifficulty = 0, difficultyOrSkill = 'LOW') => {
  let moveCount = 0;
  let difficulty = 'LOW';
  if (typeof moveCountOrDifficulty === 'string') {
    difficulty = moveCountOrDifficulty;
    moveCount = typeof difficultyOrSkill === 'number' ? difficultyOrSkill : 0;
  } else {
    moveCount = typeof moveCountOrDifficulty === 'number' ? moveCountOrDifficulty : 0;
    difficulty = difficultyOrSkill || 'LOW';
  }

  const emptyIndices = [];
  for (const idx of CELL_SEARCH_ORDER) {
    if (board[idx] === '') emptyIndices.push(idx);
  }
  if (emptyIndices.length === 0) return -1;

  const aiTier = resolveXo4x4AiTier(difficulty);

  // NOOB AI: Casual play, plays outer border cells
  if (aiTier.id === 'NOOB') {
    const noobCandidates = [1, 2, 4, 7, 8, 11, 13, 14, 0, 3, 12, 15];
    for (const idx of noobCandidates) {
      if (!emptyIndices.includes(idx)) continue;
      // Don't accidentally block X's winning cell
      const copy = [...board];
      copy[idx] = 'X';
      if (evaluateXo4x4Board(copy).winner === 'X') continue;
      return idx;
    }
    return emptyIndices[(moveCount) % emptyIndices.length];
  }

  // 1. RULE 1: If AI can complete 4-in-a-row, TAKE IT IMMEDIATELY!
  for (const idx of emptyIndices) {
    const copy = [...board];
    copy[idx] = 'O';
    if (evaluateXo4x4Board(copy).winner === 'O') {
      return idx;
    }
  }

  // 2. RULE 2: If Player ('X') has an immediate 4-in-a-row threat, BLOCK IT!
  for (const idx of emptyIndices) {
    const copy = [...board];
    copy[idx] = 'X';
    if (evaluateXo4x4Board(copy).winner === 'X') {
      return idx;
    }
  }

  // ROOKIE AI: Greedy center / development choice
  if (aiTier.id === 'ROOKIE') {
    let bestScore = -Infinity;
    let bestIdx = emptyIndices[0];
    for (const idx of emptyIndices) {
      const copy = [...board];
      copy[idx] = 'O';
      const score = evaluateXo4x4State(copy, 'O', 'X');
      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    }
    return bestIdx;
  }

  // SMART (Depth 3) and PRO (Depth 5) AI via Minimax + Alpha-Beta
  const depth = aiTier.searchDepth || (aiTier.id === 'PRO' ? 5 : 3);
  let bestScore = -Infinity;
  let bestIdx = emptyIndices[0];

  for (const idx of emptyIndices) {
    const copy = [...board];
    copy[idx] = 'O';
    const score = minimaxXo4x4(copy, depth - 1, -Infinity, Infinity, false);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = idx;
    }
  }

  return bestIdx;
};

export const serializeXo4x4Submission = (board, moves = []) => {
  const boardStr = board.map((c) => (c === '' ? '.' : c)).join('');
  const movesStr = moves.map((m) => `${m.player}:${m.index}`).join(',');
  return `XO4X4|${boardStr}|${movesStr}`;
};
