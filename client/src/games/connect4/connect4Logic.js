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

export const normalizeConnect4Config = (gameConfig = {}) => {
  return {
    rows: CONNECT4_ROWS,
    cols: CONNECT4_COLS,
    aiSkill: String(gameConfig.aiSkill || DEFAULT_CONNECT4_CONFIG.aiSkill).toUpperCase(),
    instructions:
      gameConfig.instructions ||
      gameConfig.subtitle ||
      DEFAULT_CONNECT4_CONFIG.instructions,
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
 * Score a 4-cell window for heuristic evaluation.
 */
const scoreWindow = (windowCells) => {
  let aiCount = 0;
  let playerCount = 0;
  let emptyCount = 0;

  for (const cell of windowCells) {
    if (cell === 'O') aiCount++;
    else if (cell === 'X') playerCount++;
    else emptyCount++;
  }

  if (aiCount === 4) return 1000;
  if (playerCount === 4) return -1000;
  if (aiCount === 3 && emptyCount === 1) return 25;
  if (playerCount === 3 && emptyCount === 1) return -40;
  if (aiCount === 2 && emptyCount === 2) return 6;
  if (playerCount === 2 && emptyCount === 2) return -8;
  return 0;
};

const scoreBoardState = (board) => {
  let score = 0;

  // Center column preference
  const centerCol = 3;
  for (let r = 0; r < CONNECT4_ROWS; r++) {
    if (board[r][centerCol] === 'O') score += 4;
    else if (board[r][centerCol] === 'X') score -= 3;
  }

  // Horizontal windows
  for (let r = 0; r < CONNECT4_ROWS; r++) {
    for (let c = 0; c <= CONNECT4_COLS - 4; c++) {
      score += scoreWindow([
        board[r][c],
        board[r][c + 1],
        board[r][c + 2],
        board[r][c + 3],
      ]);
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
      ]);
    }
  }

  // Diagonal windows
  for (let r = 0; r <= CONNECT4_ROWS - 4; r++) {
    for (let c = 0; c <= CONNECT4_COLS - 4; c++) {
      score += scoreWindow([
        board[r][c],
        board[r + 1][c + 1],
        board[r + 2][c + 2],
        board[r + 3][c + 3],
      ]);
      score += scoreWindow([
        board[r + 3][c],
        board[r + 2][c + 1],
        board[r + 1][c + 2],
        board[r][c + 3],
      ]);
    }
  }

  return score;
};

/**
 * Choose tactical AI column ('O') that blocks immediate player threats and builds combinations,
 * while remaining fair and beatable through two-way forks.
 */
export const chooseConnect4AiColumn = (board) => {
  const validCols = [];
  for (let c = 0; c < CONNECT4_COLS; c++) {
    if (getDropRow(board, c) !== -1) validCols.push(c);
  }
  if (validCols.length === 0) return -1;

  // 1. Immediate AI win
  for (const col of validCols) {
    const r = getDropRow(board, col);
    const next = cloneBoard(board);
    next[r][col] = 'O';
    if (evaluateConnect4Board(next).winner === 'O') return col;
  }

  // 2. Immediate block of Player ('X') 4-in-a-row win
  for (const col of validCols) {
    const r = getDropRow(board, col);
    const next = cloneBoard(board);
    next[r][col] = 'X';
    if (evaluateConnect4Board(next).winner === 'X') return col;
  }

  // 3. Evaluate 1-ply + avoid gifting player an immediate win on the cell directly above
  let bestCol = validCols[0];
  let bestScore = -Infinity;

  for (const col of validCols) {
    const r = getDropRow(board, col);
    const next = cloneBoard(board);
    next[r][col] = 'O';

    let score = scoreBoardState(next);

    // Check if dropping here lets player win immediately on row r - 1
    if (r > 0) {
      const aboveTest = cloneBoard(next);
      aboveTest[r - 1][col] = 'X';
      if (evaluateConnect4Board(aboveTest).winner === 'X') {
        score -= 500;
      }
    }

    // Slight tie-breaker toward center columns
    score -= Math.abs(3 - col) * 1.5;

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
