/**
 * N-QUEENS — Chessboard & Region Queen Placement Logic, Configuration & Client Validation
 */

export const DEFAULT_QUEENS_CONFIG = {
  size: 5,
  givenQueens: [{ r: 0, c: 1 }],
  regions: null,
};

export const normalizeQueensConfig = (gameConfig = {}) => {
  const size = Math.max(4, Math.min(9, Number(gameConfig.size) || DEFAULT_QUEENS_CONFIG.size));
  const rawGivens = Array.isArray(gameConfig.givenQueens)
    ? gameConfig.givenQueens
    : DEFAULT_QUEENS_CONFIG.givenQueens;

  const givenQueens = rawGivens
    .map((q) => ({ r: Number(q.r), c: Number(q.c) }))
    .filter(
      (q) =>
        Number.isInteger(q.r) &&
        Number.isInteger(q.c) &&
        q.r >= 0 &&
        q.r < size &&
        q.c >= 0 &&
        q.c < size
    );

  const hasValidRegions =
    Array.isArray(gameConfig.regions) &&
    gameConfig.regions.length === size &&
    gameConfig.regions.every((row) => Array.isArray(row) && row.length === size);

  const regions = hasValidRegions ? gameConfig.regions : null;

  return {
    size,
    givenQueens,
    regions,
    instructions:
      gameConfig.instructions ||
      `Place exactly ${size} Queens on the ${size}×${size} board so that no two Queens share the same row, column, or diagonal.`,
  };
};

/**
 * Validates placed queens against N-Queens constraints:
 * - No two queens in the same row
 * - No two queens in the same column
 * - No two queens on the same diagonal (|r1 - r2| === |c1 - c2|)
 * - If regions grid is provided, no two queens in the same region
 */
export const validateQueensBoardClient = (queens = [], config) => {
  const { size, givenQueens = [], regions = null } = config;
  const conflictKeys = new Set();
  const attackedKeys = new Set();

  // Compute all squares attacked by at least one queen
  for (let i = 0; i < queens.length; i++) {
    const q1 = queens[i];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (r === q1.r && c === q1.c) continue;
        if (
          r === q1.r ||
          c === q1.c ||
          Math.abs(r - q1.r) === Math.abs(c - q1.c) ||
          (regions && regions[r]?.[c] === regions[q1.r]?.[q1.c])
        ) {
          attackedKeys.add(`${r}-${c}`);
        }
      }
    }

    for (let j = i + 1; j < queens.length; j++) {
      const q2 = queens[j];
      const sameRow = q1.r === q2.r;
      const sameCol = q1.c === q2.c;
      const sameDiag = Math.abs(q1.r - q2.r) === Math.abs(q1.c - q2.c);
      const sameRegion =
        regions && regions[q1.r]?.[q1.c] !== undefined
          ? regions[q1.r][q1.c] === regions[q2.r]?.[q2.c]
          : false;

      if (sameRow || sameCol || sameDiag || sameRegion) {
        conflictKeys.add(`${q1.r}-${q1.c}`);
        conflictKeys.add(`${q2.r}-${q2.c}`);
      }
    }
  }

  // Ensure all givenQueens are still present
  const allGivensPresent = givenQueens.every((gq) =>
    queens.some((q) => q.r === gq.r && q.c === gq.c)
  );

  const isComplete = queens.length === size;
  const hasConflicts = conflictKeys.size > 0 || !allGivensPresent;
  const isValid = isComplete && !hasConflicts;

  return {
    queensCount: queens.length,
    targetCount: size,
    isComplete,
    hasConflicts,
    isValid,
    conflictKeys,
    attackedKeys,
  };
};

export const serializeQueensSubmission = (queens = []) => {
  if (!Array.isArray(queens) || queens.length === 0) return '';
  const sorted = [...queens].sort((a, b) => (a.r !== b.r ? a.r - b.r : a.c - b.c));
  return `QUEENS:${sorted.map((q) => `${q.r},${q.c}`).join(';')}`;
};
