/**
 * PHASE 19 — SERVER-AUTHORITATIVE GAME REGISTRY & VALIDATION ENGINE
 *
 * Validates participant game submissions server-side for:
 * - sudoku
 * - xo4x4
 * - wend
 * - patches
 * - zip
 *
 * Never trusts client-reported completion, score, reward, time, or credits.
 */

const XO4X4_WIN_LINES = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

/**
 * 1. SUDOKU Server Validator
 */
export const validateSudokuServer = (submission, challenge) => {
  const gameConfig = challenge?.gameConfig || {};
  const initialGrid = Array.isArray(gameConfig.initialGrid) ? gameConfig.initialGrid : [];
  const size = Number(gameConfig.size) || initialGrid.length || 6;
  const boxRows = Number(gameConfig.boxRows) || (size === 9 ? 3 : 2);
  const boxCols = Number(gameConfig.boxCols) || (size === 9 ? 3 : 3);

  let grid = null;
  if (Array.isArray(submission?.grid) && submission.grid.length === size) {
    grid = submission.grid.map((row) => row.map((v) => Number(v)));
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '').trim();
    const rows = rawStr.split('/');
    if (rows.length === size) {
      grid = rows.map((rStr) =>
        rStr
          .trim()
          .split('')
          .map((ch) => Number(ch))
      );
    }
  }

  if (!grid || grid.length !== size) {
    return { passed: false, reason: 'Incomplete or malformed Sudoku grid.' };
  }

  // Verify given cells and range 1..size
  for (let r = 0; r < size; r++) {
    if (!Array.isArray(grid[r]) || grid[r].length !== size) {
      return { passed: false, reason: `Row ${r + 1} has invalid length.` };
    }
    for (let c = 0; c < size; c++) {
      const val = Number(grid[r][c]);
      if (!Number.isInteger(val) || val < 1 || val > size) {
        return { passed: false, reason: `Cell (${r + 1},${c + 1}) is empty or out of range.` };
      }
      const given = Number(initialGrid[r]?.[c] || 0);
      if (given > 0 && val !== given) {
        return { passed: false, reason: `Locked cell (${r + 1},${c + 1}) was modified.` };
      }
    }
  }

  // Verify row uniqueness
  for (let r = 0; r < size; r++) {
    const seen = new Set(grid[r]);
    if (seen.size !== size) {
      return { passed: false, reason: `Duplicate number found in row ${r + 1}.` };
    }
  }

  // Verify column uniqueness
  for (let c = 0; c < size; c++) {
    const seen = new Set();
    for (let r = 0; r < size; r++) {
      seen.add(grid[r][c]);
    }
    if (seen.size !== size) {
      return { passed: false, reason: `Duplicate number found in column ${c + 1}.` };
    }
  }

  // Verify sub-box uniqueness
  for (let br = 0; br < size; br += boxRows) {
    for (let bc = 0; bc < size; bc += boxCols) {
      const seen = new Set();
      for (let dr = 0; dr < boxRows; dr++) {
        for (let dc = 0; dc < boxCols; dc++) {
          seen.add(grid[br + dr][bc + dc]);
        }
      }
      if (seen.size !== size) {
        return { passed: false, reason: 'Duplicate number found in sub-grid block.' };
      }
    }
  }

  return { passed: true };
};

/**
 * 2. 4×4 TIC-TAC-TOE VS AI (xo4x4) Server Validator
 */
export const validateXo4x4Server = (submission, challenge) => {
  const gameConfig = challenge?.gameConfig || {};
  const blockedCells = new Set(
    (gameConfig.blockedCells || []).map((idx) => Number(idx))
  );

  let board = null;
  if (Array.isArray(submission?.board) && submission.board.length === 16) {
    board = submission.board.map((c) => String(c || '').toUpperCase());
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '').trim();
    if (rawStr.startsWith('XO4X4|')) {
      const parts = rawStr.split('|');
      const boardStr = parts[1] || '';
      if (boardStr.length === 16) {
        board = boardStr.split('').map((ch) => (ch === '.' ? '' : ch.toUpperCase()));
      }
    }
  }

  if (!board || board.length !== 16) {
    return { passed: false, reason: 'Invalid 4×4 board state.' };
  }

  let xCount = 0;
  let oCount = 0;
  for (let i = 0; i < 16; i++) {
    if (blockedCells.has(i) && board[i] !== '#') {
      return { passed: false, reason: 'Blocked cell constraint violated.' };
    }
    if (board[i] === 'X') xCount++;
    else if (board[i] === 'O') oCount++;
  }

  if (xCount < 4 || xCount < oCount || xCount > oCount + 1) {
    return { passed: false, reason: 'Invalid turn count on 4×4 board.' };
  }

  let xWon = false;
  let oWon = false;
  for (const [a, b, c, d] of XO4X4_WIN_LINES) {
    const first = board[a];
    if (first === 'X' && board[b] === 'X' && board[c] === 'X' && board[d] === 'X') {
      xWon = true;
    }
    if (first === 'O' && board[b] === 'O' && board[c] === 'O' && board[d] === 'O') {
      oWon = true;
    }
  }

  if (!xWon || oWon) {
    return { passed: false, reason: '4-in-a-row win condition not satisfied.' };
  }

  return { passed: true };
};

/**
 * 3. WEND Server Validator
 */
export const validateWendServer = (submission, challenge) => {
  const gameConfig = challenge?.gameConfig || {};
  const solutionConfig = challenge?.solutionConfig || {};
  const startWord = String(gameConfig.startWord || '')
    .trim()
    .toUpperCase();
  const targetWord = String(gameConfig.targetWord || gameConfig.endWord || '')
    .trim()
    .toUpperCase();
  const wordLength = Number(gameConfig.wordLength) || startWord.length || 4;
  const rawSteps = Array.isArray(gameConfig.steps) ? gameConfig.steps : [];

  const firstHasStart =
    String(rawSteps[0]?.lockedWord || '').toUpperCase() === startWord;
  const lastHasTarget =
    String(rawSteps[rawSteps.length - 1]?.lockedWord || '').toUpperCase() === targetWord;

  const fullSteps =
    firstHasStart && lastHasTarget
      ? rawSteps
      : [
          { lockedWord: startWord },
          ...rawSteps,
          { lockedWord: targetWord },
        ];

  let words = [];
  if (Array.isArray(submission?.words) && submission.words.length > 0) {
    words = submission.words.map((w) => String(w || '').trim().toUpperCase());
  } else if (Array.isArray(submission?.steps) && submission.steps.length > 0) {
    words = submission.steps.map((w) => String(w || '').trim().toUpperCase());
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '')
      .trim()
      .toUpperCase()
      .replace(/^WEND:/, '');
    words = rawStr
      .split('-')
      .map((w) => w.trim())
      .filter(Boolean);
  }

  // If caller submitted only intermediate steps, wrap with startWord and targetWord
  if (
    startWord &&
    targetWord &&
    words.length === fullSteps.length - 2 &&
    words[0] !== startWord
  ) {
    words = [startWord, ...words, targetWord];
  }

  const expectedCount = fullSteps.length || 5;
  if (words.length !== expectedCount) {
    return {
      valid: false,
      passed: false,
      reason: `Complete all ${expectedCount} words in the chain.`,
    };
  }

  if (startWord && words[0] !== startWord) {
    return {
      valid: false,
      passed: false,
      reason: 'First word does not match starting word.',
    };
  }

  if (targetWord && words[words.length - 1] !== targetWord) {
    return {
      valid: false,
      passed: false,
      reason: 'Final word does not match target word.',
    };
  }

  // Verify every consecutive step changes exactly 1 letter
  for (let i = 0; i < words.length; i++) {
    if (words[i].length !== wordLength) {
      return {
        valid: false,
        passed: false,
        reason: `Step ${i + 1} must be ${wordLength} letters.`,
      };
    }
    if (
      fullSteps[i]?.lockedWord &&
      words[i] !== String(fullSteps[i].lockedWord).toUpperCase()
    ) {
      return {
        valid: false,
        passed: false,
        reason: `Locked word at step ${i + 1} does not match.`,
      };
    }
    if (i > 0) {
      let diff = 0;
      for (let c = 0; c < wordLength; c++) {
        if (words[i - 1][c] !== words[i][c]) diff++;
      }
      if (diff !== 1) {
        return {
          valid: false,
          passed: false,
          reason: `Step ${i} to ${i + 1} must change exactly 1 letter.`,
        };
      }
    }
  }

  // If expectedWords is configured in solutionConfig, verify words match expected ladder
  if (
    Array.isArray(solutionConfig.expectedWords) &&
    solutionConfig.expectedWords.length === words.length
  ) {
    const matchesExpected = solutionConfig.expectedWords.every(
      (exp, idx) => String(exp).trim().toUpperCase() === words[idx]
    );
    if (!matchesExpected) {
      return {
        valid: false,
        passed: false,
        reason: 'One or more words in the chain do not match the clues.',
      };
    }
  }

  return { valid: true, passed: true };
};

/**
 * 4. PATCHES Server Validator
 */
export const validatePatchesServer = (submission, challenge) => {
  const gameConfig = challenge?.gameConfig || {};
  const rows = Number(gameConfig.rows) || 5;
  const cols = Number(gameConfig.cols) || 5;
  const clues = Array.isArray(gameConfig.clues) ? gameConfig.clues : [];
  const totalCells = rows * cols;

  let patches = [];
  if (Array.isArray(submission?.patches) && submission.patches.length > 0) {
    patches = submission.patches.map((p) => ({
      r1: Math.min(Number(p.r1), Number(p.r2)),
      c1: Math.min(Number(p.c1), Number(p.c2)),
      r2: Math.max(Number(p.r1), Number(p.r2)),
      c2: Math.max(Number(p.c1), Number(p.c2)),
    }));
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '').trim();
    if (rawStr) {
      patches = rawStr
        .split(';')
        .filter(Boolean)
        .map((part) => {
          const [start, end] = part.split(':');
          const [r1, c1] = (start || '').split(',').map(Number);
          const [r2, c2] = (end || '').split(',').map(Number);
          return {
            r1: Math.min(r1, r2),
            c1: Math.min(c1, c2),
            r2: Math.max(r1, r2),
            c2: Math.max(c1, c2),
          };
        });
    }
  }

  if (patches.length !== clues.length) {
    return {
      passed: false,
      reason: `Expected ${clues.length} rectangular patches, received ${patches.length}.`,
    };
  }

  const covered = new Set();

  for (const rect of patches) {
    if (
      !Number.isInteger(rect.r1) ||
      !Number.isInteger(rect.c1) ||
      !Number.isInteger(rect.r2) ||
      !Number.isInteger(rect.c2) ||
      rect.r1 < 0 ||
      rect.c1 < 0 ||
      rect.r2 >= rows ||
      rect.c2 >= cols
    ) {
      return { passed: false, reason: 'Patch coordinates out of bounds.' };
    }

    const area = (rect.r2 - rect.r1 + 1) * (rect.c2 - rect.c1 + 1);
    const containedClues = clues.filter(
      (cl) =>
        Number(cl.r) >= rect.r1 &&
        Number(cl.r) <= rect.r2 &&
        Number(cl.c) >= rect.c1 &&
        Number(cl.c) <= rect.c2
    );

    const clueTargetArea = Number(
      containedClues[0]?.area ?? containedClues[0]?.size ?? 0
    );
    if (containedClues.length !== 1 || clueTargetArea !== area) {
      return {
        valid: false,
        passed: false,
        reason: 'Every patch must contain exactly one clue equal to its area.',
      };
    }

    for (let r = rect.r1; r <= rect.r2; r++) {
      for (let c = rect.c1; c <= rect.c2; c++) {
        const key = `${r}-${c}`;
        if (covered.has(key)) {
          return { valid: false, passed: false, reason: 'Patches cannot overlap.' };
        }
        covered.add(key);
      }
    }
  }

  if (covered.size !== totalCells) {
    return {
      valid: false,
      passed: false,
      reason: 'All grid cells must be covered by patches.',
    };
  }

  return { valid: true, passed: true };
};

/**
 * 5. ZIP Server Validator
 */
export const validateZipServer = (submission, challenge) => {
  const gameConfig = challenge?.gameConfig || {};
  const rows = Number(gameConfig.rows) || 5;
  const cols = Number(gameConfig.cols) || 5;
  const waypoints = Array.isArray(gameConfig.waypoints)
    ? [...gameConfig.waypoints].sort((a, b) => Number(a.num) - Number(b.num))
    : [];
  const rawBlocked = gameConfig.blocked || gameConfig.blockedCells || [];
  const blockedSet = new Set(
    rawBlocked.map((b) =>
      typeof b === 'string' ? b.replace(',', '-') : `${Number(b.r)}-${Number(b.c)}`
    )
  );
  const totalPlayableCells = rows * cols - blockedSet.size;

  let path = [];
  if (Array.isArray(submission?.path) && submission.path.length > 0) {
    path = submission.path.map((pt) => ({
      r: Number(pt.r),
      c: Number(pt.c),
    }));
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '').trim();
    if (rawStr) {
      path = rawStr
        .split('>')
        .filter(Boolean)
        .map((pair) => {
          const [r, c] = pair.split(',').map(Number);
          return { r, c };
        });
    }
  }

  if (path.length !== totalPlayableCells) {
    return {
      valid: false,
      passed: false,
      reason: `Path must visit all ${totalPlayableCells} playable cells (${path.length} visited).`,
    };
  }

  const waypointByCell = new Map(
    waypoints.map((w) => [`${Number(w.r)}-${Number(w.c)}`, Number(w.num)])
  );
  const maxWaypoint = waypoints[waypoints.length - 1]?.num || waypoints.length;

  const visited = new Set();
  let lastWaypoint = 0;

  for (let i = 0; i < path.length; i++) {
    const { r, c } = path[i];
    if (
      !Number.isInteger(r) ||
      !Number.isInteger(c) ||
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols
    ) {
      return { valid: false, passed: false, reason: 'Path step out of grid bounds.' };
    }

    const key = `${r}-${c}`;
    if (blockedSet.has(key) || visited.has(key)) {
      return {
        valid: false,
        passed: false,
        reason: 'Path cannot visit blocked or duplicate cells.',
      };
    }
    visited.add(key);

    if (i > 0) {
      const prev = path[i - 1];
      const dist = Math.abs(prev.r - r) + Math.abs(prev.c - c);
      if (dist !== 1) {
        return {
          valid: false,
          passed: false,
          reason: 'Path steps must be orthogonally adjacent.',
        };
      }
    }

    const wp = waypointByCell.get(key);
    if (wp !== undefined) {
      if (wp !== lastWaypoint + 1) {
        return {
          valid: false,
          passed: false,
          reason: `Waypoints must be visited in ascending order (reached ${wp} after ${lastWaypoint}).`,
        };
      }
      lastWaypoint = wp;
    }
  }

  const finalPoint = path[path.length - 1];
  const finalWp = waypointByCell.get(`${finalPoint.r}-${finalPoint.c}`);
  if (lastWaypoint !== maxWaypoint || finalWp !== maxWaypoint) {
    return {
      valid: false,
      passed: false,
      reason: `Path must finish on final waypoint ${maxWaypoint}.`,
    };
  }

  return { valid: true, passed: true };
};

/**
 * Centralized Server GameRegistry
 */
export const ServerGameRegistry = {
  sudoku: {
    id: 'sudoku',
    validate: validateSudokuServer,
  },
  xo4x4: {
    id: 'xo4x4',
    validate: validateXo4x4Server,
  },
  wend: {
    id: 'wend',
    validate: validateWendServer,
  },
  patches: {
    id: 'patches',
    validate: validatePatchesServer,
  },
  zip: {
    id: 'zip',
    validate: validateZipServer,
  },
};

export const GameRegistry = ServerGameRegistry;

export const evaluateGameSubmissionServer = (submission, challenge) => {
  const gameType = challenge?.gameType;
  const handler = ServerGameRegistry[gameType];

  if (handler && typeof handler.validate === 'function') {
    const result = handler.validate(submission, challenge);
    if (result.passed || result.valid) {
      return { valid: true, passed: true, reason: null };
    }
    // Also allow exact expectedAnswer / acceptedAnswers match if configured
    const rawAnswer =
      typeof submission === 'object' && submission !== null
        ? String(submission.answer ?? '').trim().toUpperCase()
        : String(submission ?? '').trim().toUpperCase();
    const expected = String(challenge?.solutionConfig?.expectedAnswer || '')
      .trim()
      .toUpperCase();
    const accepted = (challenge?.solutionConfig?.acceptedAnswers || []).map((a) =>
      String(a).trim().toUpperCase()
    );
    if (rawAnswer && ((expected && rawAnswer === expected) || accepted.includes(rawAnswer))) {
      return { valid: true, passed: true, reason: null };
    }
    return {
      valid: false,
      passed: false,
      reason: result.reason || 'Validation failed.',
    };
  }

  return { valid: false, passed: false, reason: 'No specialized game validator.' };
};

export default ServerGameRegistry;
