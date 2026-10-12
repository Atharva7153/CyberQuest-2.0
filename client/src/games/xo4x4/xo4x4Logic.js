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
    return { id: 'NOOB', label: 'NOOB AI', badge: 'NOOB AI (EASY)', maxBlocks: 0 };
  }
  if (raw === 'MODERATE' || raw === 'ROOKIE' || raw === 'CALCULATED' || raw === 'MEDIUM') {
    return { id: 'ROOKIE', label: 'ROOKIE AI', badge: 'ROOKIE AI (MODERATE)', maxBlocks: 1 };
  }
  if (raw === 'HIGH' || raw === 'SMART' || raw === 'STRATEGIC' || raw === 'HARD') {
    return { id: 'SMART', label: 'SMART AI', badge: 'SMART AI (HIGH)', maxBlocks: 2 };
  }
  return { id: 'PRO', label: 'PRO AI', badge: 'PRO AI (EXTREME)', maxBlocks: 3 };
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
 * AI move selector for 4x4 Tic-Tac-Toe scaled by how "noob" the AI is:
 * - NOOB (LOW): Never blocks X's 3-in-a-rows, never steals wins, plays passive outer cells.
 * - ROOKIE (MODERATE): Blocks at most 1 early 3-in-a-row threat (totalOCount < 1), then leaves lines open.
 * - SMART (HIGH): Blocks up to 2 early threats (totalOCount < 2), develops its own lines without spoiling X's 2-in-a-rows.
 * - PRO (EXTREME): Blocks up to 3 early threats (totalOCount < 3), takes open wins, still beatable via forks or turn 4+ threats.
 */
export const chooseAiMove4x4 = (board, moveCount = 0, difficultyOrSkill = 'LOW') => {
  const emptyIndices = [];
  let totalOCount = 0;
  for (let i = 0; i < 16; i++) {
    if (board[i] === '') emptyIndices.push(i);
    else if (board[i] === 'O') totalOCount++;
  }
  if (emptyIndices.length === 0) return -1;

  const aiTier = resolveXo4x4AiTier(difficultyOrSkill);

  // 1. Block X's immediate 3-in-a-row threat ONLY if AI is within its maxBlocks allowance.
  // For NOOB AI, maxBlocks is 0 so it never blocks X's winning line.
  if (totalOCount < aiTier.maxBlocks) {
    for (const idx of emptyIndices) {
      const copy = [...board];
      copy[idx] = 'X';
      if (evaluateXo4x4Board(copy).winner === 'X') {
        return idx;
      }
    }
  }

  // 2. Check if AI ('O') can win immediately (skip for NOOB AI, and skip if X already has an immediate win)
  const xHasImmediateWin = emptyIndices.some((idx) => {
    const copy = [...board];
    copy[idx] = 'X';
    return evaluateXo4x4Board(copy).winner === 'X';
  });

  if (aiTier.id !== 'NOOB' && !xHasImmediateWin) {
    for (const idx of emptyIndices) {
      const copy = [...board];
      copy[idx] = 'O';
      if (evaluateXo4x4Board(copy).winner === 'O') {
        return idx;
      }
    }
  }

  // 3. Score candidate squares while avoiding poisoning X's active lines
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
        score += (oCount + 1) * (aiTier.id === 'NOOB' ? 1 : 4);
      } else if (oCount === 0) {
        // Avoid spoiling X's developing lines so the player can complete a 4-in-a-row
        if (xCount >= 2) {
          score -= 20;
        } else if (xCount === 1) {
          score -= aiTier.id === 'NOOB' ? 10 : 4;
        }
      }
    }

    // Prefer outer border squares so center lines stay open for the player
    const r = Math.floor(idx / 4);
    const c = idx % 4;
    if (r === 0 || r === 3 || c === 0 || c === 3) {
      score += aiTier.id === 'NOOB' ? 6 : 3;
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
