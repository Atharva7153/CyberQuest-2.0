/**
 * SUDOKU — Game Logic, Configuration & Client Validation Interface
 */

export const DEFAULT_SUDOKU_CONFIG = {
  size: 6,
  boxRows: 2,
  boxCols: 3,
  initialGrid: [
    [1, 0, 3, 4, 0, 6],
    [0, 5, 6, 1, 2, 0],
    [2, 0, 1, 0, 6, 4],
    [5, 6, 0, 2, 0, 1],
    [0, 1, 2, 6, 4, 0],
    [6, 0, 5, 0, 1, 2],
  ],
};

export const normalizeSudokuConfig = (gameConfig = {}) => {
  const rawGrid = Array.isArray(gameConfig.initialGrid) && gameConfig.initialGrid.length > 0
    ? gameConfig.initialGrid
    : DEFAULT_SUDOKU_CONFIG.initialGrid;

  const size = Number(gameConfig.size) || rawGrid.length || 6;
  const boxRows = Number(gameConfig.boxRows) || (size === 9 ? 3 : size === 6 ? 2 : 2);
  const boxCols = Number(gameConfig.boxCols) || (size === 9 ? 3 : size === 6 ? 3 : 2);

  const initialGrid = rawGrid.map((row) =>
    Array.from({ length: size }, (_, c) => Number(row?.[c] || 0))
  );

  return {
    size,
    boxRows,
    boxCols,
    initialGrid,
    instructions:
      gameConfig.instructions ||
      `Fill every row, column, and ${boxRows}×${boxCols} block with the numbers 1 to ${size} without repeating any number.`,
  };
};

/**
 * Find all cells (r, c) that violate Sudoku row, column, or box uniqueness.
 */
export const findSudokuConflicts = (grid, size, boxRows, boxCols) => {
  const conflicts = new Set();
  if (!Array.isArray(grid) || grid.length !== size) return conflicts;

  // Check rows
  for (let r = 0; r < size; r++) {
    const seen = new Map();
    for (let c = 0; c < size; c++) {
      const val = Number(grid[r]?.[c] || 0);
      if (val <= 0) continue;
      if (seen.has(val)) {
        conflicts.add(`${r}-${c}`);
        conflicts.add(`${r}-${seen.get(val)}`);
      } else {
        seen.set(val, c);
      }
    }
  }

  // Check columns
  for (let c = 0; c < size; c++) {
    const seen = new Map();
    for (let r = 0; r < size; r++) {
      const val = Number(grid[r]?.[c] || 0);
      if (val <= 0) continue;
      if (seen.has(val)) {
        conflicts.add(`${r}-${c}`);
        conflicts.add(`${seen.get(val)}-${c}`);
      } else {
        seen.set(val, r);
      }
    }
  }

  // Check sub-boxes
  for (let br = 0; br < size; br += boxRows) {
    for (let bc = 0; bc < size; bc += boxCols) {
      const seen = new Map();
      for (let dr = 0; dr < boxRows; dr++) {
        for (let dc = 0; dc < boxCols; dc++) {
          const r = br + dr;
          const c = bc + dc;
          const val = Number(grid[r]?.[c] || 0);
          if (val <= 0) continue;
          if (seen.has(val)) {
            conflicts.add(`${r}-${c}`);
            conflicts.add(seen.get(val));
          } else {
            seen.set(val, `${r}-${c}`);
          }
        }
      }
    }
  }

  return conflicts;
};

/**
 * Validate whether the current grid is completely filled and conflict-free.
 */
export const validateSudokuBoardClient = (grid, config) => {
  const { size, boxRows, boxCols, initialGrid } = config;
  if (!Array.isArray(grid) || grid.length !== size) {
    return { isComplete: false, isValid: false, filledCount: 0, totalCells: size * size };
  }

  let filledCount = 0;
  const totalCells = size * size;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = Number(grid[r]?.[c] || 0);
      const lockedVal = Number(initialGrid[r]?.[c] || 0);
      if (lockedVal > 0 && val !== lockedVal) {
        return { isComplete: false, isValid: false, filledCount, totalCells };
      }
      if (val >= 1 && val <= size) {
        filledCount += 1;
      }
    }
  }

  const conflicts = findSudokuConflicts(grid, size, boxRows, boxCols);
  const isComplete = filledCount === totalCells;
  const isValid = isComplete && conflicts.size === 0;

  return {
    isComplete,
    isValid,
    filledCount,
    totalCells,
    conflicts,
  };
};

export const serializeSudokuSubmission = (grid) => {
  if (!Array.isArray(grid)) return '';
  return grid.map((row) => row.join('')).join('/');
};
