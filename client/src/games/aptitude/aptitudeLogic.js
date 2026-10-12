/**
 * APTITUDE — Multi-Question Quantitative & Logical Reasoning Logic & Client Validation
 * Shows 1 question at a time and reports ONLY total Right / Wrong counts (never which question is right/wrong).
 */

export const DEFAULT_APTITUDE_CONFIG = {
  roundTitle: 'APTITUDE // QUANTITATIVE & LOGICAL REASONING',
  answerKey: ['C', 'B', 'A', 'C'],
  questions: [
    {
      id: 'Q1',
      topic: 'NUMBER SERIES',
      question: 'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
      options: ['95', '125', '127', '131'],
    },
    {
      id: 'Q2',
      topic: 'TIME & WORK',
      question:
        'Node A can process a data batch in 12 minutes, and Node B can process the same batch in 6 minutes. Working together, how many minutes will they take?',
      options: ['3 minutes', '4 minutes', '4.5 minutes', '5 minutes'],
    },
    {
      id: 'Q3',
      topic: 'PERCENTAGE & RATIO',
      question:
        'A server cluster increases its bandwidth by 25% and then reduces it by 20%. What is the net percentage change?',
      options: ['0% (No change)', '+5% increase', '-5% decrease', '+2% increase'],
    },
    {
      id: 'Q4',
      topic: 'SPEED & DISTANCE',
      question:
        'A drone travels 120 meters in 6 seconds. What is its speed in kilometers per hour (km/h)?',
      options: ['54 km/h', '60 km/h', '72 km/h', '80 km/h'],
    },
  ],
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const normalizeAptitudeConfig = (gameConfig = {}) => {
  let rawQuestions = [];
  if (Array.isArray(gameConfig.questions) && gameConfig.questions.length > 0) {
    rawQuestions = gameConfig.questions;
  } else if (gameConfig.prompt && Array.isArray(gameConfig.options)) {
    rawQuestions = [
      {
        id: 'Q1',
        topic: 'APTITUDE',
        question: gameConfig.prompt,
        options: gameConfig.options,
      },
    ];
  } else {
    rawQuestions = DEFAULT_APTITUDE_CONFIG.questions;
  }

  const questions = rawQuestions.map((q, idx) => {
    const rawOpts = Array.isArray(q.options) ? q.options : [];
    const options = rawOpts.map((opt, optIdx) => {
      if (typeof opt === 'object' && opt !== null) {
        return {
          key: String(opt.key || OPTION_LETTERS[optIdx] || optIdx + 1).toUpperCase(),
          label: String(opt.label ?? opt.text ?? opt.value ?? ''),
        };
      }
      return {
        key: OPTION_LETTERS[optIdx] || String(optIdx + 1),
        label: String(opt),
      };
    });

    return {
      id: q.id || `Q${idx + 1}`,
      index: idx,
      topic: String(q.topic || q.category || 'APTITUDE').toUpperCase(),
      question: String(q.question || q.prompt || '').trim(),
      options,
    };
  });

  const rawKey =
    Array.isArray(gameConfig.answerKey) && gameConfig.answerKey.length === questions.length
      ? gameConfig.answerKey
      : DEFAULT_APTITUDE_CONFIG.answerKey.slice(0, questions.length);

  const answerKey = rawKey.map((k) => String(k || '').trim().toUpperCase());

  return {
    roundTitle: gameConfig.roundTitle || DEFAULT_APTITUDE_CONFIG.roundTitle,
    questions,
    answerKey,
    totalQuestions: questions.length,
    instructions:
      gameConfig.instructions ||
      `Solve all ${questions.length} aptitude problems one by one, then submit your answers for verification.`,
  };
};

export const validateAptitudeClient = (selectedKeys = [], config) => {
  const totalQuestions = config?.questions?.length || 4;
  let answeredCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const val = String(selectedKeys[i] || '').trim().toUpperCase();
    if (val) {
      answeredCount += 1;
    }
  }

  const isComplete = answeredCount === totalQuestions;

  return {
    answeredCount,
    totalQuestions,
    isComplete,
    rightCount: null,
    wrongCount: null,
    isValid: isComplete,
  };
};

export const serializeAptitudeSubmission = (selectedKeys = []) => {
  const cleaned = selectedKeys.map((k) => String(k || '').trim().toUpperCase());
  if (cleaned.length === 0 || cleaned.some((k) => !k)) return '';
  return `APTITUDE:${cleaned.join('-')}`;
};
