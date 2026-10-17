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
 * Heuristic scoring for an AI move in 4x4 Tic-Tac-Toe
 */
const scoreXo4x4Move = (board, move, aiToken = 'O', playerToken = 'X', tier = 'ROOKIE') => {
  board[move] = aiToken;
  let score = 0;

  if (evaluateXo4x4Board(board).winner === aiToken) {
    board[move] = '';
    return 10000;
  }

  let ai3 = 0, ai2 = 0, ai1 = 0;
  for (const line of XO4X4_WIN_LINES) {
    const vals = line.map((idx) => board[idx]);
    if (vals.includes('#') || vals.includes(playerToken)) continue;
    const count = vals.filter((v) => v === aiToken).length;
    if (count === 3) ai3++;
    else if (count === 2) ai2++;
    else if (count === 1) ai1++;
  }

  score += ai3 * (tier === 'PRO' ? 700 : 500);
  score += ai2 * (tier === 'PRO' ? 150 : 120);
  score += ai1 * 25;

  const center = [5, 6, 9, 10];
  const corners = [0, 3, 12, 15];
  if (center.includes(move)) score += (tier === 'PRO' ? 25 : 15);
  else if (corners.includes(move)) score += (tier === 'PRO' ? 15 : 8);

  board[move] = '';
  return score;
};

/**
 * AI move selector for 4x4 Tic-Tac-Toe:
 * - NOOB (LOW): Casual play, rarely blocks (~90-95% player win rate).
 * - ROOKIE (MODERATE): Plays for own lines, blocks obvious lines moderately (~70-75% player win rate).
 * - SMART (HIGH): Attacks its own line, blocks threats fairly (~50-60% player win rate).
 * - PRO (EXTREME): Strategic line attack, blocks high threats (~35-45% player win rate, >90% win within 2-3 rounds).
 */
export const chooseAiMove4x4 = (
  board,
  moveCountOrDifficulty = 0,
  difficultyOrSkill = 'LOW',
  roundNumber = 1
) => {
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
  const tier = aiTier.id;

  // 1. RULE 1: If AI can complete 4-in-a-row, TAKE IT!
  for (const idx of emptyIndices) {
    const copy = [...board];
    copy[idx] = 'O';
    if (evaluateXo4x4Board(copy).winner === 'O') {
      return idx;
    }
  }

  // 2. RULE 2: If Player ('X') has an immediate 4-in-a-row threat (3 in a line), block it fairly!
  const playerWins = [];
  for (const m of emptyIndices) {
    const copy = [...board];
    copy[m] = 'X';
    const evalRes = evaluateXo4x4Board(copy);
    if (evalRes.winner === 'X') {
      const line = evalRes.winningLine || [];
      const isDiag = (line[0] === 0 && line[3] === 15) || (line[0] === 3 && line[3] === 12);
      playerWins.push({ index: m, isDiag });
    }
  }

  if (playerWins.length > 0) {
    let blockRate = {
      NOOB: 0.15,
      ROOKIE: 0.40,
      SMART: 0.55,
      PRO: 0.70,
    }[tier] || 0.45;

    // Adaptive relaxation if the player is in round 2 or higher
    if (roundNumber >= 2) blockRate -= 0.15;
    if (roundNumber >= 3) blockRate -= 0.15;
    blockRate = Math.max(0.10, blockRate);

    if (Math.random() < blockRate) {
      const threat = playerWins[Math.floor(Math.random() * playerWins.length)];
      return threat.index;
    }
  }

  // 3. NOOB AI: Casual play, plays outer border cells
  if (tier === 'NOOB') {
    const noobCandidates = [1, 2, 4, 7, 8, 11, 13, 14, 0, 3, 12, 15, 5, 6, 9, 10];
    for (const idx of noobCandidates) {
      if (emptyIndices.includes(idx)) return idx;
    }
    return emptyIndices[(moveCount) % emptyIndices.length];
  }

  // 4. Line-focused attack: AI seeks to complete its OWN row, column, or diagonal
  // (Crucial: This leaves the other lines open for the player to build 4-in-a-row!)
  let bestLine = null;
  let maxOCount = -1;
  for (const line of XO4X4_WIN_LINES) {
    const vals = line.map((i) => board[i]);
    if (vals.includes('X') || vals.includes('#')) continue; // line blocked for O
    const oCount = vals.filter((v) => v === 'O').length;
    if (oCount > maxOCount) {
      maxOCount = oCount;
      bestLine = line;
    }
  }

  if (bestLine) {
    const lineEmpties = bestLine.filter((i) => board[i] === '');
    if (lineEmpties.length > 0) {
      return lineEmpties[Math.floor(Math.random() * lineEmpties.length)];
    }
  }

  // 5. Positional fallback with noise
  let bestScore = -Infinity;
  let bestMove = emptyIndices[0];
  const noise = { ROOKIE: 16, SMART: 10, PRO: 6 }[tier] || 8;

  for (const m of emptyIndices) {
    const copy = [...board];
    let s = 0;
    if ([5, 6, 9, 10].includes(m)) s += (tier === 'PRO' ? 12 : 6);
    else if ([0, 3, 12, 15].includes(m)) s += 4;
    s += (Math.random() * noise - noise / 2);

    if (s > bestScore) {
      bestScore = s;
      bestMove = m;
    }
  }

  return bestMove;
};

export const serializeXo4x4Submission = (board, moves = []) => {
  const boardStr = board.map((c) => (c === '' ? '.' : c)).join('');
  const movesStr = moves.map((m) => `${m.player}:${m.index}`).join(',');
  return `XO4X4|${boardStr}|${movesStr}`;
};
