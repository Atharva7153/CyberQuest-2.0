/**
 * WEND — Word Path Transformation Logic, Configuration & Client Validation
 */

export const DEFAULT_WEND_CONFIG = {
  wordLength: 4,
  startWord: 'COLD',
  targetWord: 'WARM',
  steps: [
    { clue: 'Starting word: Low thermal state', lockedWord: 'COLD' },
    { clue: 'Change 1 letter: A thick cable or line' },
    { clue: 'Change 1 letter: A printed circuit board or access pass' },
    { clue: 'Change 1 letter: A protected sector or division' },
    { clue: 'Target word: Thermal equilibrium reached', lockedWord: 'WARM' },
  ],
};

const stripLetterMaskFromClue = (clueText = '') => {
  return String(clueText || '')
    .replace(/\s*\([A-Z_\s-]{3,}\)\s*/gi, '')
    .trim();
};

export const normalizeWendConfig = (gameConfig = {}) => {
  const startWord = String(gameConfig.startWord || DEFAULT_WEND_CONFIG.startWord)
    .trim()
    .toUpperCase();
  const targetWord = String(
    gameConfig.targetWord || gameConfig.endWord || DEFAULT_WEND_CONFIG.targetWord
  )
    .trim()
    .toUpperCase();
  const wordLength = Number(gameConfig.wordLength) || startWord.length || 4;

  const providedSteps =
    Array.isArray(gameConfig.steps) && gameConfig.steps.length >= 1
      ? gameConfig.steps
      : DEFAULT_WEND_CONFIG.steps;

  const firstHasStart =
    String(providedSteps[0]?.lockedWord || '').toUpperCase() === startWord;
  const lastHasTarget =
    String(providedSteps[providedSteps.length - 1]?.lockedWord || '').toUpperCase() ===
    targetWord;

  const rawSteps =
    firstHasStart && lastHasTarget
      ? providedSteps
      : [
          { clue: `Starting word: ${startWord}`, lockedWord: startWord },
          ...providedSteps,
          { clue: `Target word: ${targetWord}`, lockedWord: targetWord },
        ];

  const steps = rawSteps.map((step, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === rawSteps.length - 1;
    const lockedWord = isFirst
      ? startWord
      : isLast
        ? step.lockedWord !== undefined
          ? String(step.lockedWord || '').toUpperCase()
          : targetWord
        : step.lockedWord
          ? String(step.lockedWord).toUpperCase()
          : '';

    const rawClue = step.clue || `Step ${idx}: Change 1 letter from the previous word`;

    return {
      index: idx,
      clue: isFirst || isLast ? rawClue : stripLetterMaskFromClue(rawClue),
      hint: step.hint || '',
      lockedWord,
      isLocked: Boolean(lockedWord),
    };
  });

  return {
    wordLength,
    startWord,
    targetWord,
    steps,
    instructions:
      gameConfig.instructions ||
      `Transform ${startWord} into ${targetWord} by changing exactly 1 letter at each step. Use the clues to find each intermediate word.`,
  };
};

export const countWordDifferences = (wordA = '', wordB = '', wordLength = 4) => {
  const a = String(wordA).trim().toUpperCase();
  const b = String(wordB).trim().toUpperCase();
  if (a.length !== wordLength || b.length !== wordLength) {
    return -1;
  }
  let diff = 0;
  for (let i = 0; i < wordLength; i++) {
    if (a[i] !== b[i]) diff += 1;
  }
  return diff;
};

export const validateWendChainClient = (words = [], config) => {
  const { wordLength, steps } = config;
  const totalSteps = steps.length;

  let filledCount = 0;
  const stepTransitions = [];
  let allTransitionsValid = true;

  for (let i = 0; i < totalSteps; i++) {
    const w = String(words[i] || '').trim().toUpperCase();
    if (w.length === wordLength) {
      filledCount += 1;
    }
    if (i > 0) {
      const prev = String(words[i - 1] || '').trim().toUpperCase();
      const diff = countWordDifferences(prev, w, wordLength);
      const validStep = diff === 1;
      if (!validStep) {
        allTransitionsValid = false;
      }
      stepTransitions.push({
        fromIndex: i - 1,
        toIndex: i,
        diff,
        isValid: validStep,
      });
    }
  }

  const isComplete = filledCount === totalSteps;
  const isValid = isComplete && allTransitionsValid;

  return {
    isComplete,
    isValid,
    filledCount,
    totalSteps,
    stepTransitions,
  };
};

export const serializeWendSubmission = (words = []) => {
  return words.map((w) => String(w || '').trim().toUpperCase()).join('-');
};
