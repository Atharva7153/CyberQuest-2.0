/**
 * CONNECT 4 VS AI — 6×7 Gravity Drop Grid Logic, Tactical AI & Validation
 */

export const CONNECT4_ROWS = 6;
export const CONNECT4_COLS = 7;

export const DEFAULT_CONNECT4_CONFIG = {
  rows: CONNECT4_ROWS,
  cols: CONNECT4_COLS,
  aiSkill: 'TACTICAL',
  instructions:
    'Drop discs into any column to align 4 of your Crimson discs horizontally, vertically, or diagonally before the AI.',
};

export const resolveConnect4AiTier = (difficultyOrSkill = 'LOW') => {
  const raw = String(difficultyOrSkill || 'LOW').toUpperCase();
  if (raw === 'LOW' || raw === 'NOOB' || raw === 'NOVICE' || raw === 'EASY') {
    return { id: 'NOOB', label: 'NOOB AI', badge: 'NOOB AI (EASY)', searchDepth: 1 };
  }
  if (raw === 'MODERATE' || raw === 'ROOKIE' || raw === 'MEDIUM') {
    return { id: 'ROOKIE', label: 'ROOKIE AI', badge: 'ROOKIE AI (MODERATE)', searchDepth: 2 };
  }
  if (raw === 'HIGH' || raw === 'SMART' || raw === 'STRATEGIC' || raw === 'HARD') {
    return { id: 'SMART', label: 'SMART AI', badge: 'SMART AI (HIGH)', searchDepth: 4 };
  }
  return { id: 'PRO', label: 'PRO AI', badge: 'PRO AI (EXTREME)', searchDepth: 6 };
};

export const normalizeConnect4Config = (gameConfig = {}, challengeDifficulty = 'LOW') => {
  const aiTier = resolveConnect4AiTier(challengeDifficulty || gameConfig.aiSkill);
  return {
    rows: CONNECT4_ROWS,
    cols: CONNECT4_COLS,
    aiSkill: aiTier.id,
    aiTier,
    instructions:
      gameConfig.instructions ||
      gameConfig.subtitle ||
      `Drop discs into any column to align 4 of your Crimson discs horizontally, vertically, or diagonally before the ${aiTier.label}.`,
  };
};

export const createEmptyConnect4Board = () =>
  Array.from({ length: CONNECT4_ROWS }, () => Array(CONNECT4_COLS).fill(''));

/**
 * Find the lowest available row in a column (gravity drop). Returns -1 if column is full.
 */
export const getDropRow = (board, col) => {
  if (col < 0 || col >= CONNECT4_COLS) return -1;
  for (let r = CONNECT4_ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) return r;
  }
  return -1;
};

/**
 * Evaluate the 6×7 Connect 4 board for a 4-in-a-row winner ('X' = player, 'O' = AI) or draw.
 */
export const evaluateConnect4Board = (board) => {
  if (!Array.isArray(board) || board.length !== CONNECT4_ROWS) {
    return { winner: null, winningCells: [], isDraw: false };
  }

  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal down-right
    [1, -1], // diagonal down-left
  ];

  for (let r = 0; r < CONNECT4_ROWS; r++) {
    for (let c = 0; c < CONNECT4_COLS; c++) {
      const token = board[r]?.[c];
      if (!token) continue;

      for (const [dr, dc] of directions) {
        const line = [{ r, c }];
        for (let step = 1; step < 4; step++) {
          const nr = r + dr * step;
          const nc = c + dc * step;
          if (
            nr < 0 ||
            nr >= CONNECT4_ROWS ||
            nc < 0 ||
            nc >= CONNECT4_COLS ||
            board[nr]?.[nc] !== token
          ) {
            break;
          }
          line.push({ r: nr, c: nc });
        }
        if (line.length === 4) {
          return {
            winner: token,
            winningCells: line,
            isDraw: false,
          };
        }
      }
    }
  }

  let isFull = true;
  for (let c = 0; c < CONNECT4_COLS; c++) {
    if (!board[0][c]) {
      isFull = false;
      break;
    }
  }

  return {
    winner: null,
    winningCells: [],
    isDraw: isFull,
  };
};

const cloneBoard = (board) => board.map((row) => [...row]);

/**
 * Score a 4-cell window for Connect 4 heuristic evaluation.
 */
const scoreWindow = (windowCells, aiToken = 'O', playerToken = 'X') => {
  let aiCount = 0;
  let playerCount = 0;
  let emptyCount = 0;

  for (const cell of windowCells) {
    if (cell === aiToken) aiCount++;
    else if (cell === playerToken) playerCount++;
    else emptyCount++;
  }

  if (aiCount === 4) return 10000;
  if (playerCount === 4) return -10000;
  if (aiCount === 3 && emptyCount === 1) return 120;
  if (playerCount === 3 && emptyCount === 1) return -140;
  if (aiCount === 2 && emptyCount === 2) return 15;
  if (playerCount === 2 && emptyCount === 2) return -18;
  return 0;
};

const scoreBoardState = (board, aiToken = 'O', playerToken = 'X') => {
  let score = 0;

  // Center column strategic dominance (column 3 is involved in the most win lines)
  const centerCol = 3;
  for (let r = 0; r < CONNECT4_ROWS; r++) {
    if (board[r][centerCol] === aiToken) score += 20;
    else if (board[r][centerCol] === playerToken) score -= 16;
  }

  // Adjacent columns 2 and 4 bonus
  for (let r = 0; r < CONNECT4_ROWS; r++) {
    if (board[r][2] === aiToken || board[r][4] === aiToken) score += 8;
    else if (board[r][2] === playerToken || board[r][4] === playerToken) score -= 6;
  }

  // Horizontal windows
  for (let r = 0; r < CONNECT4_ROWS; r++) {
    for (let c = 0; c <= CONNECT4_COLS - 4; c++) {
      score += scoreWindow([
        board[r][c],
        board[r][c + 1],
        board[r][c + 2],
        board[r][c + 3],
      ], aiToken, playerToken);
    }
  }

  // Vertical windows
  for (let c = 0; c < CONNECT4_COLS; c++) {
    for (let r = 0; r <= CONNECT4_ROWS - 4; r++) {
      score += scoreWindow([
        board[r][c],
        board[r + 1][c],
        board[r + 2][c],
        board[r + 3][c],
      ], aiToken, playerToken);
    }
  }

  // Diagonal windows (down-right and down-left)
  for (let r = 0; r <= CONNECT4_ROWS - 4; r++) {
    for (let c = 0; c <= CONNECT4_COLS - 4; c++) {
      score += scoreWindow([
        board[r][c],
        board[r + 1][c + 1],
        board[r + 2][c + 2],
        board[r + 3][c + 3],
      ], aiToken, playerToken);
    }
  }
  for (let r = 0; r <= CONNECT4_ROWS - 4; r++) {
    for (let c = 3; c < CONNECT4_COLS; c++) {
      score += scoreWindow([
        board[r][c],
        board[r + 1][c - 1],
        board[r + 2][c - 2],
        board[r + 3][c - 3],
      ], aiToken, playerToken);
    }
  }

  return score;
};

// Strategic column exploration order: center outwards for max alpha-beta cutoffs
const COLUMN_SEARCH_ORDER = [3, 2, 4, 1, 5, 0, 6];

/**
 * Minimax with Alpha-Beta Pruning for Connect 4
 */
const minimaxConnect4 = (board, depth, alpha, beta, isMaximizing) => {
  const outcome = evaluateConnect4Board(board);
  if (outcome.winner === 'O') return 100000 + depth;
  if (outcome.winner === 'X') return -100000 - depth;
  if (depth === 0 || outcome.isDraw) {
    return scoreBoardState(board, 'O', 'X');
  }

  const validMoves = [];
  for (const c of COLUMN_SEARCH_ORDER) {
    const r = getDropRow(board, c);
    if (r !== -1) validMoves.push({ r, c });
  }
  if (validMoves.length === 0) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of validMoves) {
      board[move.r][move.c] = 'O';
      const ev = minimaxConnect4(board, depth - 1, alpha, beta, false);
      board[move.r][move.c] = '';
      maxEval = Math.max(maxEval, ev);
      alpha = Math.max(alpha, ev);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of validMoves) {
      board[move.r][move.c] = 'X';
      const ev = minimaxConnect4(board, depth - 1, alpha, beta, true);
      board[move.r][move.c] = '';
      minEval = Math.min(minEval, ev);
      beta = Math.min(beta, ev);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

/**
 * Find immediate winning column threats for a player token ('X' or 'O')
 */
const findConnect4Threats = (board, token) => {
  const threats = [];
  for (let c = 0; c < CONNECT4_COLS; c++) {
    const r = getDropRow(board, c);
    if (r === -1) continue;
    board[r][c] = token;
    const evalRes = evaluateConnect4Board(board);
    board[r][c] = '';
    if (evalRes.winner === token) {
      const cells = evalRes.winningCells || [];
      const isDiag =
        cells.length >= 2 &&
        cells[0].r !== cells[1].r &&
        cells[0].c !== cells[1].c;
      threats.push({ col: c, row: r, isDiag });
    }
  }
  return threats;
};

/**
 * Score a candidate column offensively for AI development
 */
const scoreConnect4MoveOffensive = (board, col, tier = 'ROOKIE') => {
  const r = getDropRow(board, col);
  board[r][col] = 'O';

  let score = 0;

  if (evaluateConnect4Board(board).winner === 'O') {
    board[r][col] = '';
    return 10000;
  }

  // Center column weights: Column 3 is the most critical anchor
  const centerBonuses = [0, 8, 20, 35, 20, 8, 0];
  score += centerBonuses[col] || 0;

  let ai3 = 0, ai2 = 0;

  // Horizontal windows
  for (let row = 0; row < CONNECT4_ROWS; row++) {
    for (let c = 0; c <= CONNECT4_COLS - 4; c++) {
      const w = [board[row][c], board[row][c + 1], board[row][c + 2], board[row][c + 3]];
      if (!w.includes('X')) {
        const oCount = w.filter((x) => x === 'O').length;
        if (oCount === 3) ai3++;
        else if (oCount === 2) ai2++;
      }
    }
  }

  // Vertical windows
  for (let c = 0; c < CONNECT4_COLS; c++) {
    for (let row = 0; row <= CONNECT4_ROWS - 4; row++) {
      const w = [board[row][c], board[row + 1][c], board[row + 2][c], board[row + 3][c]];
      if (!w.includes('X')) {
        const oCount = w.filter((x) => x === 'O').length;
        if (oCount === 3) ai3++;
        else if (oCount === 2) ai2++;
      }
    }
  }

  // Diagonal windows
  for (let row = 0; row <= CONNECT4_ROWS - 4; row++) {
    for (let c = 0; c <= CONNECT4_COLS - 4; c++) {
      const w = [board[row][c], board[row + 1][c + 1], board[row + 2][c + 2], board[row + 3][c + 3]];
      if (!w.includes('X')) {
        const oCount = w.filter((x) => x === 'O').length;
        if (oCount === 3) ai3++;
        else if (oCount === 2) ai2++;
      }
    }
    for (let c = 3; c < CONNECT4_COLS; c++) {
      const w = [board[row][c], board[row + 1][c - 1], board[row + 2][c - 2], board[row + 3][c - 3]];
      if (!w.includes('X')) {
        const oCount = w.filter((x) => x === 'O').length;
        if (oCount === 3) ai3++;
        else if (oCount === 2) ai2++;
      }
    }
  }

  score += ai3 * (tier === 'PRO' ? 180 : 120);
  score += ai2 * (tier === 'PRO' ? 45 : 30);

  board[r][col] = '';
  return score;
};

/**
 * Calibrated Connect 4 AI move selection:
 * - NOOB (LOW): Casual play, outer columns, forgiving (~85-95% player win rate).
 * - ROOKIE (MODERATE): Blocks obvious threats, builds central lines (~65-75% player win rate).
 * - SMART (HIGH): Strong tactical play, blocks 90% of threats, beatable via double-threat forks (~45-55% player win rate).
 * - PRO (EXTREME): Strategic anchor control, contests forks, beatable by creating multi-axis traps (~35-45% player win rate).
 */
export const chooseConnect4AiColumn = (board, difficultyOrSkill = 'LOW', moveCount = 0) => {
  const validCols = COLUMN_SEARCH_ORDER.filter((c) => getDropRow(board, c) !== -1);
  if (validCols.length === 0) return -1;

  const aiTier = resolveConnect4AiTier(difficultyOrSkill);
  const tier = aiTier.id;

  // 1. RULE 1: If AI can win right now, ALWAYS take the win!
  const aiThreats = findConnect4Threats(board, 'O');
  if (aiThreats.length > 0) {
    if (tier !== 'NOOB' || Math.random() < 0.6) {
      return aiThreats[0].col;
    }
  }

  // 2. RULE 2: If Player ('X') has an immediate winning threat, BLOCK IT!
  const playerThreats = findConnect4Threats(board, 'X');
  if (playerThreats.length > 0) {
    const threat = playerThreats[Math.floor(Math.random() * playerThreats.length)];
    const blockRates = {
      NOOB: threat.isDiag ? 0.20 : 0.40,
      ROOKIE: threat.isDiag ? 0.50 : 0.75,
      SMART: threat.isDiag ? 0.78 : 0.92,
      PRO: threat.isDiag ? 0.90 : 0.98,
    }[tier] || 0.75;

    if (Math.random() < blockRates) {
      return threat.col;
    }
  }

  // 3. Avoid dropping immediately below a winning player space (r - 1)
  const avoidGiftingRates = {
    NOOB: 0.10,
    ROOKIE: 0.65,
    SMART: 0.90,
    PRO: 0.98,
  }[tier] || 0.7;

  const safeCols = validCols.filter((col) => {
    const r = getDropRow(board, col);
    if (r > 0 && Math.random() < avoidGiftingRates) {
      board[r][col] = 'O';
      board[r - 1][col] = 'X';
      const playerWinsAbove = evaluateConnect4Board(board).winner === 'X';
      board[r - 1][col] = '';
      board[r][col] = '';
      if (playerWinsAbove) return false;
    }
    return true;
  });

  const candidates = safeCols.length > 0 ? safeCols : validCols;

  // 4. Fork Defense for SMART & PRO: Preempt player's dual-threat setups
  if (tier === 'SMART' || tier === 'PRO') {
    const forkContestRate = tier === 'PRO' ? 0.82 : 0.55;
    if (Math.random() < forkContestRate) {
      for (const col of candidates) {
        const r = getDropRow(board, col);
        board[r][col] = 'X';
        let forkThreats = 0;
        for (let nextC = 0; nextC < CONNECT4_COLS; nextC++) {
          const nextR = getDropRow(board, nextC);
          if (nextR !== -1) {
            board[nextR][nextC] = 'X';
            if (evaluateConnect4Board(board).winner === 'X') forkThreats++;
            board[nextR][nextC] = '';
          }
        }
        board[r][col] = '';
        if (forkThreats >= 2) {
          return col;
        }
      }
    }
  }

  // 5. NOOB AI: Casual play, prefers outer columns
  if (tier === 'NOOB') {
    const noobOrder = [0, 6, 1, 5, 2, 4, 3];
    for (const c of noobOrder) {
      if (candidates.includes(c)) return c;
    }
    return candidates[0];
  }

  // 6. Offensive column evaluation for ROOKIE, SMART, and PRO
  let bestCol = candidates[0];
  let bestScore = -Infinity;
  const noise = { ROOKIE: 18, SMART: 10, PRO: 4 }[tier] || 8;

  for (const col of candidates) {
    const s = scoreConnect4MoveOffensive(board, col, tier) + (Math.random() * noise - noise / 2);
    if (s > bestScore) {
      bestScore = s;
      bestCol = col;
    }
  }

  return bestCol;
};

export const serializeConnect4Submission = (board, moves = []) => {
  if (!Array.isArray(board)) return '';
  const flat = board
    .map((row) => row.map((c) => c || '.').join(''))
    .join('/');
  const moveCols = moves.map((m) => `${m.player}${m.col}`).join(',');
  return `CONNECT4|${flat}|${moveCols}`;
};
