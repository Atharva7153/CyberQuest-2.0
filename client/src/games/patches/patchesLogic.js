/**
 * PATCHES — Rectangular Grid Partitioning Logic, Configuration & Validation
 */

export const DEFAULT_PATCHES_CONFIG = {
  rows: 5,
  cols: 5,
  clues: [
    { r: 0, c: 1, size: 6 },
    { r: 1, c: 4, size: 4 },
    { r: 3, c: 0, size: 3 },
    { r: 2, c: 2, size: 4 },
    { r: 3, c: 3, size: 6 },
    { r: 4, c: 1, size: 2 },
  ],
};

export const normalizePatchesConfig = (gameConfig = {}) => {
  const rows = Number(gameConfig.rows) || DEFAULT_PATCHES_CONFIG.rows;
  const cols = Number(gameConfig.cols) || DEFAULT_PATCHES_CONFIG.cols;
  const clues =
    Array.isArray(gameConfig.clues) && gameConfig.clues.length > 0
      ? gameConfig.clues.map((cl) => {
          const val = Number(cl.size ?? cl.area ?? 4);
          return {
            r: Number(cl.r),
            c: Number(cl.c),
            size: val,
            area: val,
          };
        })
      : DEFAULT_PATCHES_CONFIG.clues;

  return {
    rows,
    cols,
    clues,
    instructions:
      gameConfig.instructions ||
      'Divide the entire grid into non-overlapping rectangular patches. Each patch must contain exactly one number, and the patch area (width × height) must equal that number.',
  };
};

export const normalizeRect = (rA, cA, rB, cB) => ({
  r1: Math.min(rA, rB),
  c1: Math.min(cA, cB),
  r2: Math.max(rA, rB),
  c2: Math.max(cA, cB),
});

export const getRectArea = (rect) => {
  if (!rect) return 0;
  return (rect.r2 - rect.r1 + 1) * (rect.c2 - rect.c1 + 1);
};

export const rectsOverlap = (a, b) => {
  return !(a.r2 < b.r1 || a.r1 > b.r2 || a.c2 < b.c1 || a.c1 > b.c2);
};

export const cellInRect = (r, c, rect) => {
  if (!rect) return false;
  return r >= rect.r1 && r <= rect.r2 && c >= rect.c1 && c <= rect.c2;
};

/**
 * Evaluate each placed rectangle against the grid clues.
 */
export const validatePatchesBoardClient = (rectangles = [], config) => {
  const { rows, cols, clues } = config;
  const totalCells = rows * cols;
  const coveredSet = new Set();
  let hasOverlap = false;

  const evaluatedRects = rectangles.map((rect, idx) => {
    const area = getRectArea(rect);
    const containedClues = clues.filter((cl) => cellInRect(cl.r, cl.c, rect));
    const isValidPatch =
      containedClues.length === 1 && containedClues[0].size === area;

    for (let r = rect.r1; r <= rect.r2; r++) {
      for (let c = rect.c1; c <= rect.c2; c++) {
        const key = `${r}-${c}`;
        if (coveredSet.has(key)) {
          hasOverlap = true;
        }
        coveredSet.add(key);
      }
    }

    return {
      ...rect,
      id: rect.id || `patch-${idx}`,
      index: idx,
      area,
      containedClues,
      isValidPatch,
    };
  });

  const coveredCount = coveredSet.size;
  const validPatchCount = evaluatedRects.filter((r) => r.isValidPatch).length;
  const isComplete = coveredCount === totalCells;
  const isValid =
    isComplete &&
    !hasOverlap &&
    evaluatedRects.length === clues.length &&
    validPatchCount === clues.length;

  return {
    isComplete,
    isValid,
    coveredCount,
    totalCells,
    validPatchCount,
    totalClues: clues.length,
    evaluatedRects,
  };
};

export const serializePatchesSubmission = (rectangles = []) => {
  if (!Array.isArray(rectangles) || rectangles.length === 0) return '';
  const sorted = [...rectangles].sort((a, b) =>
    a.r1 !== b.r1 ? a.r1 - b.r1 : a.c1 - b.c1
  );
  return sorted
    .map((r) => `${r.r1},${r.c1}:${r.r2},${r.c2}`)
    .join(';');
};
