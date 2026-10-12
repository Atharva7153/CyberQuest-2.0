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

export const normalizeXo4x4Config = (gameConfig = {}) => {
  const blockedCells = Array.isArray(gameConfig.blockedCells)
    ? gameConfig.blockedCells
        .map((idx) => Number(idx))
        .filter((idx) => Number.isInteger(idx) && idx >= 0 && idx < 16)
    : [];

  return {
    size: 4,
    blockedCells,
    aiDifficulty: gameConfig.aiDifficulty || 'TACTICAL',
    instructions:
      gameConfig.instructions ||
      'Align 4 X marks in a row (horizontally, vertically, or diagonally) to defeat the AI opponent.',
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
 * Balanced, beatable AI move selector for 4x4 Tic-Tac-Toe.
 * - Never pre-spoils X's developing 1-in-a-row or 2-in-a-row lines so the player can set up winning lines.
 * - Blocks X's very first 3-in-a-row threat (when O has <= 2 marks on the board),
 *   but once the game progresses (O has >= 3 marks) or X creates a secondary threat,
 *   the AI focuses on its own position so a human player can reliably win.
 */
export const chooseAiMove4x4 = (board, moveCount = 0) => {
  const emptyIndices = [];
  let totalOCount = 0;
  for (let i = 0; i < 16; i++) {
    if (board[i] === '') emptyIndices.push(i);
    else if (board[i] === 'O') totalOCount++;
  }
  if (emptyIndices.length === 0) return -1;

  // 1. Only block X's immediate 3-in-a-row threat early in the match (when O has < 3 marks).
  // Once O has 3+ marks, let X's follow-up threat break through so the game is reliably winnable.
  if (totalOCount < 3) {
    for (const idx of emptyIndices) {
      const copy = [...board];
      copy[idx] = 'X';
      if (evaluateXo4x4Board(copy).winner === 'X') {
        return idx;
      }
    }
  }

  // 2. Check if AI ('O') can win immediately, but avoid stealing the win if X already has a 3-in-a-row ready
  const xHasImmediateWin = emptyIndices.some((idx) => {
    const copy = [...board];
    copy[idx] = 'X';
    return evaluateXo4x4Board(copy).winner === 'X';
  });

  if (!xHasImmediateWin) {
    for (const idx of emptyIndices) {
      const copy = [...board];
      copy[idx] = 'O';
      if (evaluateXo4x4Board(copy).winner === 'O') {
        return idx;
      }
    }
  }

  // 3. Pick a move that develops O's own lines while avoiding spoiling X's active 2-in-a-row / 3-in-a-row lines
  let bestScore = -Infinity;
  let bestIdx = emptyIndices[0];

  for (const idx of emptyIndices) {
    let score = 0;

    for (const line of XO4X4_WIN_LINES) {
      if (!line.includes(idx)) continue;
      let xCount = 0;
      let oCount = 0;
      let blocked = false;

      for (const cellIdx of line) {
        if (board[cellIdx] === '#') blocked = true;
        else if (board[cellIdx] === 'X') xCount++;
        else if (board[cellIdx] === 'O') oCount++;
      }

      if (blocked) continue;

      if (xCount === 0) {
        // Line is completely open for O
        score += (oCount + 1) * 5;
      } else if (oCount === 0) {
        // Avoid poisoning X's developing 2-in-a-row or 3-in-a-row lines so the player can complete a 4-in-a-row
        if (xCount >= 2) {
          score -= 12;
        } else if (xCount === 1) {
          score -= 2;
        }
      }
    }

    // Slight preference for outer border squares so center lines stay open for the player
    const r = Math.floor(idx / 4);
    const c = idx % 4;
    if (r === 0 || r === 3 || c === 0 || c === 3) {
      score += 3;
    }

    score += ((idx + moveCount) % 3) * 0.1;

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
