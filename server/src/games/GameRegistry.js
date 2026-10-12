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
 * 6. CONNECT 4 VS AI Server Validator
 */
export const validateConnect4Server = (submission) => {
  const ROWS = 6;
  const COLS = 7;

  let board = null;
  if (Array.isArray(submission?.board) && submission.board.length === ROWS) {
    board = submission.board.map((row) =>
      Array.isArray(row) ? row.map((c) => String(c || '').toUpperCase()) : []
    );
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '').trim();
    if (rawStr.startsWith('CONNECT4|')) {
      const parts = rawStr.split('|');
      const rowStrings = (parts[1] || '').split('/');
      if (rowStrings.length === ROWS) {
        board = rowStrings.map((rStr) =>
          rStr.split('').map((ch) => (ch === '.' ? '' : ch.toUpperCase()))
        );
      }
    }
  }

  if (!board || board.length !== ROWS) {
    return { valid: false, passed: false, reason: 'Invalid Connect 4 board state.' };
  }

  let xCount = 0;
  let oCount = 0;

  // Verify dimensions, token counts, and gravity (no floating tokens)
  for (let c = 0; c < COLS; c++) {
    let seenTokenInCol = false;
    for (let r = 0; r < ROWS; r++) {
      const token = board[r]?.[c] || '';
      if (token === 'X') {
        xCount++;
        seenTokenInCol = true;
      } else if (token === 'O') {
        oCount++;
        seenTokenInCol = true;
      } else if (seenTokenInCol) {
        return {
          valid: false,
          passed: false,
          reason: 'Connect 4 gravity constraint violated (floating disc).',
        };
      }
    }
  }

  if (xCount < 4 || xCount < oCount || xCount > oCount + 1) {
    return {
      valid: false,
      passed: false,
      reason: 'Invalid Connect 4 turn count.',
    };
  }

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  let xWon = false;
  let oWon = false;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const token = board[r]?.[c];
      if (!token) continue;

      for (const [dr, dc] of directions) {
        let count = 1;
        for (let step = 1; step < 4; step++) {
          const nr = r + dr * step;
          const nc = c + dc * step;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr]?.[nc] !== token) {
            break;
          }
          count++;
        }
        if (count === 4) {
          if (token === 'X') xWon = true;
          if (token === 'O') oWon = true;
        }
      }
    }
  }

  if (!xWon || oWon) {
    return {
      valid: false,
      passed: false,
      reason: 'Connect 4 win condition (4-in-a-row) not satisfied.',
    };
  }

  return { valid: true, passed: true };
};

/**
 * 7. WORD GUESS Server Validator
 */
export const validateWordGuessServer = (submission, challenge) => {
  const submittedWords = Array.isArray(submission?.words)
    ? submission.words
        .map((w) => String(w || '').trim().toUpperCase())
        .filter(Boolean)
    : [];

  const rawWord =
    typeof submission === 'object' && submission !== null
      ? String(
          submission.word ??
            submission.answer ??
            (submittedWords.length > 0 ? submittedWords.join('-') : '')
        )
          .trim()
          .toUpperCase()
      : String(submission ?? '').trim().toUpperCase();

  if (!rawWord && submittedWords.length === 0) {
    return { valid: false, passed: false, reason: 'Word guess cannot be empty.' };
  }

  const stripPrefix = (str) =>
    String(str || '')
      .trim()
      .toUpperCase()
      .replace(/^WORDGUESS:/, '')
      .replace(/^NEXUS\{/, '')
      .replace(/\}$/, '')
      .replace(/[\s_]+/g, '-')
      .trim();

  const normalizedCandidate = stripPrefix(rawWord);
  const candidateFromArray = submittedWords.join('-');

  // 1. Check multi-round words in gameConfig.rounds if present
  const configRounds = Array.isArray(challenge?.gameConfig?.rounds)
    ? challenge.gameConfig.rounds
    : [];
  const expectedRoundWords = configRounds
    .map((r) => String(r?.word || '').trim().toUpperCase())
    .filter(Boolean);

  if (expectedRoundWords.length > 0) {
    const joinedExpectedRounds = expectedRoundWords.join('-');
    if (
      normalizedCandidate === joinedExpectedRounds ||
      candidateFromArray === joinedExpectedRounds
    ) {
      return { valid: true, passed: true };
    }
  }

  // 2. Check solutionConfig expectedAnswer & acceptedAnswers
  const expected = String(challenge?.solutionConfig?.expectedAnswer || '')
    .trim()
    .toUpperCase();
  const strippedExpected = stripPrefix(expected);
  const accepted = (challenge?.solutionConfig?.acceptedAnswers || []).map((a) =>
    String(a).trim().toUpperCase()
  );
  const strippedAccepted = accepted.map(stripPrefix);

  if (
    (expected && (rawWord === expected || normalizedCandidate === strippedExpected)) ||
    (expected && rawWord === `NEXUS{${expected}}`) ||
    accepted.includes(rawWord) ||
    strippedAccepted.includes(normalizedCandidate) ||
    (candidateFromArray &&
      (candidateFromArray === strippedExpected ||
        strippedAccepted.includes(candidateFromArray)))
  ) {
    return { valid: true, passed: true };
  }

  return { valid: false, passed: false, reason: 'Incorrect codeword.' };
};

/**
 * 8. N-QUEENS Server Validator
 */
export const validateQueensServer = (submission, challenge) => {
  const gameConfig = challenge?.gameConfig || {};
  const size = Math.max(4, Math.min(9, Number(gameConfig.size) || 5));
  const givenQueens = Array.isArray(gameConfig.givenQueens) ? gameConfig.givenQueens : [];
  const regions =
    Array.isArray(gameConfig.regions) && gameConfig.regions.length === size
      ? gameConfig.regions
      : null;

  let queens = [];
  if (Array.isArray(submission?.queens) && submission.queens.length > 0) {
    queens = submission.queens.map((q) => ({ r: Number(q.r), c: Number(q.c) }));
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '')
      .trim()
      .toUpperCase()
      .replace(/^QUEENS:/, '');
    if (rawStr) {
      queens = rawStr
        .split(';')
        .filter(Boolean)
        .map((pair) => {
          const [r, c] = pair.split(',').map(Number);
          return { r, c };
        });
    }
  }

  if (queens.length !== size) {
    return {
      valid: false,
      passed: false,
      reason: `Expected ${size} Queens on the ${size}×${size} board, received ${queens.length}.`,
    };
  }

  for (const q of queens) {
    if (
      !Number.isInteger(q.r) ||
      !Number.isInteger(q.c) ||
      q.r < 0 ||
      q.r >= size ||
      q.c < 0 ||
      q.c >= size
    ) {
      return {
        valid: false,
        passed: false,
        reason: 'Queen coordinates out of board bounds.',
      };
    }
  }

  for (const gq of givenQueens) {
    const found = queens.some(
      (q) => q.r === Number(gq.r) && q.c === Number(gq.c)
    );
    if (!found) {
      return {
        valid: false,
        passed: false,
        reason: 'Locked starting Queen was removed or modified.',
      };
    }
  }

  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      const q1 = queens[i];
      const q2 = queens[j];
      if (q1.r === q2.r) {
        return {
          valid: false,
          passed: false,
          reason: `Two Queens share Row ${q1.r + 1}.`,
        };
      }
      if (q1.c === q2.c) {
        return {
          valid: false,
          passed: false,
          reason: `Two Queens share Column ${q1.c + 1}.`,
        };
      }
      if (Math.abs(q1.r - q2.r) === Math.abs(q1.c - q2.c)) {
        return {
          valid: false,
          passed: false,
          reason: 'Two Queens attack each other diagonally.',
        };
      }
      if (regions && regions[q1.r]?.[q1.c] === regions[q2.r]?.[q2.c]) {
        return {
          valid: false,
          passed: false,
          reason: 'Two Queens share the same sector region.',
        };
      }
    }
  }

  return { valid: true, passed: true };
};

/**
 * 9. APTITUDE Server Validator
 */
export const validateAptitudeServer = (submission, challenge) => {
  const solutionConfig = challenge?.solutionConfig || {};
  const expectedAnswers = Array.isArray(solutionConfig.expectedAnswers)
    ? solutionConfig.expectedAnswers.map((a) => String(a).trim().toUpperCase())
    : [];

  let submittedList = [];
  if (Array.isArray(submission?.answers) && submission.answers.length > 0) {
    submittedList = submission.answers.map((a) => String(a).trim().toUpperCase());
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '')
      .trim()
      .toUpperCase()
      .replace(/^APTITUDE:/, '');
    if (rawStr) {
      submittedList = rawStr.split('-').map((s) => s.trim());
    }
  }

  if (expectedAnswers.length > 0) {
    if (submittedList.length !== expectedAnswers.length) {
      return {
        valid: false,
        passed: false,
        reason: `Answer all ${expectedAnswers.length} aptitude questions.`,
      };
    }
    let rightCount = 0;
    let wrongCount = 0;
    expectedAnswers.forEach((exp, idx) => {
      if (exp === submittedList[idx]) {
        rightCount++;
      } else {
        wrongCount++;
      }
    });
    if (wrongCount > 0) {
      return {
        valid: false,
        passed: false,
        rightCount,
        wrongCount,
        reason: `${rightCount} RIGHT · ${wrongCount} WRONG — All ${expectedAnswers.length} answers must be correct.`,
      };
    }
    return {
      valid: true,
      passed: true,
      rightCount,
      wrongCount: 0,
    };
  }

  // Fallback to expectedAnswer / acceptedAnswers
  const rawAnswer = String(submission?.answer ?? submission ?? '')
    .trim()
    .toUpperCase();
  const expected = String(solutionConfig.expectedAnswer || '')
    .trim()
    .toUpperCase();
  const accepted = (solutionConfig.acceptedAnswers || []).map((a) =>
    String(a).trim().toUpperCase()
  );

  if (rawAnswer && ((expected && rawAnswer === expected) || accepted.includes(rawAnswer))) {
    return { valid: true, passed: true };
  }

  return { valid: false, passed: false, reason: 'Incorrect aptitude solution.' };
};

/**
 * 10. GK TRUE OR FALSE (1 Round of 6 Questions) Server Validator
 */
export const validateGkTrueFalseServer = (submission, challenge) => {
  const solutionConfig = challenge?.solutionConfig || {};
  const expectedAnswers = Array.isArray(solutionConfig.expectedAnswers)
    ? solutionConfig.expectedAnswers.map((a) => {
        const u = String(a).trim().toUpperCase();
        return u === 'TRUE' || u === 'T' ? 'T' : 'F';
      })
    : [];

  let submittedList = [];
  if (Array.isArray(submission?.answers) && submission.answers.length > 0) {
    submittedList = submission.answers.map((a) => {
      const u = String(a).trim().toUpperCase();
      return u === 'TRUE' || u === 'T' ? 'T' : u === 'FALSE' || u === 'F' ? 'F' : '';
    });
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '')
      .trim()
      .toUpperCase()
      .replace(/^GKTF:/, '');
    if (rawStr) {
      submittedList = rawStr.split('-').map((s) => {
        const u = s.trim();
        return u === 'TRUE' || u === 'T' ? 'T' : u === 'FALSE' || u === 'F' ? 'F' : '';
      });
    }
  }

  if (expectedAnswers.length > 0) {
    if (submittedList.length !== expectedAnswers.length || submittedList.some((v) => !v)) {
      return {
        valid: false,
        passed: false,
        reason: `Answer all ${expectedAnswers.length} True/False statements.`,
      };
    }
    let rightCount = 0;
    let wrongCount = 0;
    let trueCount = 0;
    let falseCount = 0;
    expectedAnswers.forEach((exp, idx) => {
      if (exp === 'T') trueCount++;
      else falseCount++;
      if (exp === submittedList[idx]) {
        rightCount++;
      } else {
        wrongCount++;
      }
    });
    if (wrongCount > 0) {
      return {
        valid: false,
        passed: false,
        rightCount,
        wrongCount,
        trueCount,
        falseCount,
        reason: `${rightCount} RIGHT · ${wrongCount} WRONG (Round breakdown: ${trueCount} TRUE · ${falseCount} FALSE) — All ${expectedAnswers.length} statements must be correct.`,
      };
    }
    return {
      valid: true,
      passed: true,
      rightCount,
      wrongCount: 0,
      trueCount,
      falseCount,
    };
  }

  const rawAnswer = String(submission?.answer ?? submission ?? '')
    .trim()
    .toUpperCase();
  const expected = String(solutionConfig.expectedAnswer || '')
    .trim()
    .toUpperCase();
  const accepted = (solutionConfig.acceptedAnswers || []).map((a) =>
    String(a).trim().toUpperCase()
  );

  if (rawAnswer && ((expected && rawAnswer === expected) || accepted.includes(rawAnswer))) {
    return { valid: true, passed: true };
  }

  return { valid: false, passed: false, reason: 'Incorrect True/False responses.' };
};

/**
 * 11. MEMORY MATRIX (Multi-Round Visual Spatial Recall) Server Validator
 */
export const validateMemoryMatrixServer = (submission, challenge) => {
  const gameConfig = challenge?.gameConfig || {};
  const rounds = Array.isArray(gameConfig.rounds) ? gameConfig.rounds : [];

  const expectedRounds = rounds.map((r) =>
    Array.isArray(r.targets)
      ? [...r.targets].map((n) => Number(n)).sort((a, b) => a - b)
      : []
  );

  let submittedRounds = [];
  if (Array.isArray(submission?.rounds) && submission.rounds.length > 0) {
    submittedRounds = submission.rounds.map((arr) =>
      Array.isArray(arr)
        ? [...new Set(arr.map((n) => Number(n)).filter((n) => Number.isInteger(n)))].sort(
            (a, b) => a - b
          )
        : []
    );
  } else {
    const rawStr = String(submission?.answer ?? submission ?? '')
      .trim()
      .toUpperCase()
      .replace(/^MEMORY_MATRIX:/, '');
    if (rawStr) {
      submittedRounds = rawStr.split('|').map((part) =>
        [
          ...new Set(
            part
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
              .map((n) => Number(n))
              .filter((n) => Number.isInteger(n))
          ),
        ].sort((a, b) => a - b)
      );
    }
  }

  if (expectedRounds.length > 0) {
    if (submittedRounds.length !== expectedRounds.length) {
      return {
        valid: false,
        passed: false,
        reason: `Complete all ${expectedRounds.length} Memory Matrix rounds before submitting.`,
      };
    }

    for (let i = 0; i < expectedRounds.length; i++) {
      const exp = expectedRounds[i];
      const sub = submittedRounds[i] || [];
      if (exp.length !== sub.length || !exp.every((val, idx) => val === sub[idx])) {
        return {
          valid: false,
          passed: false,
          reason: `Round ${i + 1} pattern recall is incomplete or inaccurate.`,
        };
      }
    }

    return { valid: true, passed: true };
  }

  return { valid: false, passed: false, reason: 'Memory Matrix pattern not verified.' };
};

/**
 * Centralized Server GameRegistry
 */
export const ServerGameRegistry = {
  sudoku: {
    id: 'sudoku',
    validate: validateSudokuServer,
  },
  connect4: {
    id: 'connect4',
    validate: validateConnect4Server,
  },
  wordGuess: {
    id: 'wordGuess',
    validate: validateWordGuessServer,
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
  queens: {
    id: 'queens',
    validate: validateQueensServer,
  },
  aptitude: {
    id: 'aptitude',
    validate: validateAptitudeServer,
  },
  gkTrueFalse: {
    id: 'gkTrueFalse',
    validate: validateGkTrueFalseServer,
  },
  memoryMatrix: {
    id: 'memoryMatrix',
    validate: validateMemoryMatrixServer,
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
