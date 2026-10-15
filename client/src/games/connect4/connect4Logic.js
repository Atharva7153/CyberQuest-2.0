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
 * Master-tier Connect 4 AI move selection:
 * - NOOB (LOW): Easy/casual moves away from center, forgiving.
 * - ROOKIE (MODERATE): Blocks immediate 4-in-a-row threats, grabs open wins, shallow lookahead.
 * - SMART (HIGH): Minimax depth 4, evaluates forks and avoids gifting player wins above.
 * - PRO (EXTREME): Deep Minimax depth 6 with alpha-beta pruning. Relentless tactical play.
 */
export const chooseConnect4AiColumn = (board, difficultyOrSkill = 'LOW', moveCount = 0) => {
  const validCols = [];
  for (const c of COLUMN_SEARCH_ORDER) {
    if (getDropRow(board, c) !== -1) validCols.push(c);
  }
  if (validCols.length === 0) return -1;

  const aiTier = resolveConnect4AiTier(difficultyOrSkill);

  // NOOB AI: Casual play
  if (aiTier.id === 'NOOB') {
    const noobOrder = [0, 6, 1, 5, 2, 4, 3];
    for (const col of noobOrder) {
      if (!validCols.includes(col)) continue;
      const r = getDropRow(board, col);
      // Avoid accidentally blocking X's immediate winning square
      const testX = cloneBoard(board);
      testX[r][col] = 'X';
      if (evaluateConnect4Board(testX).winner === 'X') continue;
      return col;
    }
    return validCols[(moveCount) % validCols.length];
  }

  // 1. RULE 1: If AI can win right now, ALWAYS take the win!
  for (const col of validCols) {
    const r = getDropRow(board, col);
    const testO = cloneBoard(board);
    testO[r][col] = 'O';
    if (evaluateConnect4Board(testO).winner === 'O') {
      return col;
    }
  }

  // 2. RULE 2: If Player ('X') has an immediate winning threat, ALWAYS block it!
  for (const col of validCols) {
    const r = getDropRow(board, col);
    const testX = cloneBoard(board);
    testX[r][col] = 'X';
    if (evaluateConnect4Board(testX).winner === 'X') {
      return col;
    }
  }

  // ROOKIE AI: Pick a smart column, avoid giving player win right above
  if (aiTier.id === 'ROOKIE') {
    const safeCols = validCols.filter((col) => {
      const r = getDropRow(board, col);
      if (r > 0) {
        const testAbove = cloneBoard(board);
        testAbove[r][col] = 'O';
        testAbove[r - 1][col] = 'X';
        if (evaluateConnect4Board(testAbove).winner === 'X') return false;
      }
      return true;
    });
    const candidateList = safeCols.length > 0 ? safeCols : validCols;
    // Prefer center-weighted columns
    return candidateList[0];
  }

  // SMART (Depth 4) and PRO (Depth 6) AI via Minimax + Alpha-Beta
  const depth = aiTier.searchDepth || (aiTier.id === 'PRO' ? 6 : 4);
  let bestCol = validCols[0];
  let bestScore = -Infinity;

  for (const col of validCols) {
    const r = getDropRow(board, col);
    const nextBoard = cloneBoard(board);
    nextBoard[r][col] = 'O';

    // If dropping here directly hands player an immediate win on r - 1, heavily penalize
    if (r > 0) {
      const aboveTest = cloneBoard(nextBoard);
      aboveTest[r - 1][col] = 'X';
      if (evaluateConnect4Board(aboveTest).winner === 'X') {
        // Only skip if there are other legal moves available
        if (validCols.length > 1) {
          continue;
        }
      }
    }

    const score = minimaxConnect4(nextBoard, depth - 1, -Infinity, Infinity, false);
    if (score > bestScore) {
      bestScore = score;
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
