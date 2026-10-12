/**
 * WORD GUESS — Codeword Decryption Logic & Configuration
 * Supports both single-word challenges and multi-round (2-word) challenges.
 */

export const DEFAULT_WORD_GUESS_CONFIG = {
  wordLength: 6,
  cipherClue:
    'Cryptographic algorithm used for encoding and decoding classified payloads (6 letters).',
  categoryHint: 'CRYPTOGRAPHY · 6 LETTERS',
  maskedPattern: '',
  scrambledLetters: ['H', 'P', 'E', 'C', 'I', 'R'],
};

export const normalizeWordGuessConfig = (gameConfig = {}, challenge = {}) => {
  if (Array.isArray(gameConfig.rounds) && gameConfig.rounds.length > 0) {
    const rounds = gameConfig.rounds.map((r, idx) => {
      const parsedScrambledFromStr =
        typeof r.scrambled === 'string' && r.scrambled.trim()
          ? r.scrambled
              .trim()
              .split(/\s+/)
              .map((ch) => ch.trim().toUpperCase())
              .filter(Boolean)
          : [];

      const scrambledLetters =
        Array.isArray(r.scrambledLetters) && r.scrambledLetters.length > 0
          ? r.scrambledLetters.map((ch) => String(ch).trim().toUpperCase()).filter(Boolean)
          : parsedScrambledFromStr.length > 0
            ? parsedScrambledFromStr
            : DEFAULT_WORD_GUESS_CONFIG.scrambledLetters;

      const wordLength =
        Number(r.wordLength) ||
        String(r.word || '').trim().length ||
        parsedScrambledFromStr.length ||
        6;

      return {
        id: r.id || `R${idx + 1}`,
        label: r.label || `WORD 0${idx + 1}`,
        wordLength,
        cipherClue:
          r.clue ||
          r.cipherClue ||
          r.prompt ||
          challenge?.description ||
          DEFAULT_WORD_GUESS_CONFIG.cipherClue,
        categoryHint: `${r.category || challenge?.category || 'PUZZLES'} · ${wordLength} LETTERS`,
        maskedPattern: r.maskedPattern || '',
        scrambledLetters,
      };
    });

    return {
      isMultiRound: rounds.length > 1,
      rounds,
      wordLength: rounds[0].wordLength,
      cipherClue: rounds[0].cipherClue,
      categoryHint: rounds[0].categoryHint,
      maskedPattern: rounds[0].maskedPattern,
      scrambledLetters: rounds[0].scrambledLetters,
    };
  }

  const wordLength = Number(gameConfig.wordLength) || DEFAULT_WORD_GUESS_CONFIG.wordLength;
  const cipherClue =
    gameConfig.cipherClue ||
    gameConfig.prompt ||
    challenge?.description ||
    DEFAULT_WORD_GUESS_CONFIG.cipherClue;
  const categoryHint =
    gameConfig.categoryHint || `${challenge?.category || 'PUZZLES'} · ${wordLength} LETTERS`;
  const maskedPattern = gameConfig.maskedPattern || '';
  const scrambledLetters =
    Array.isArray(gameConfig.scrambledLetters) && gameConfig.scrambledLetters.length > 0
      ? gameConfig.scrambledLetters.map((ch) => String(ch).trim().toUpperCase()).filter(Boolean)
      : DEFAULT_WORD_GUESS_CONFIG.scrambledLetters;

  const singleRound = {
    id: 'R1',
    label: 'WORD 01',
    wordLength,
    cipherClue,
    categoryHint,
    maskedPattern,
    scrambledLetters,
  };

  return {
    isMultiRound: false,
    rounds: [singleRound],
    wordLength,
    cipherClue,
    categoryHint,
    maskedPattern,
    scrambledLetters,
  };
};
