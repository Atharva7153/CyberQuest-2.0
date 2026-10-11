/**
 * WORD GUESS — Codeword Decryption Logic & Configuration
 */

export const DEFAULT_WORD_GUESS_CONFIG = {
  wordLength: 7,
  cipherClue:
    'A self-propagating digital [ _ _ _ _ _ _ _ ] that mutates its own signature on every clock cycle.',
  categoryHint: 'CYBERSECURITY // 7 LETTERS',
  maskedPattern: 'P _ Y _ O _ D',
  scrambledLetters: ['P', 'A', 'Y', 'L', 'O', 'A', 'D', 'X', 'R', 'K'],
};

export const normalizeWordGuessConfig = (gameConfig = {}, challenge = {}) => {
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
      ? gameConfig.scrambledLetters.map((ch) => String(ch).toUpperCase())
      : DEFAULT_WORD_GUESS_CONFIG.scrambledLetters;

  return {
    wordLength,
    cipherClue,
    categoryHint,
    maskedPattern,
    scrambledLetters,
  };
};
