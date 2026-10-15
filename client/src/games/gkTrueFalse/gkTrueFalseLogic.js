/**
 * GK TRUE OR FALSE — 1 Round of 6 Rapid-Fire Statements Logic & Client Validation
 * Shows 1 question at a time and reports ONLY total Right / Wrong counts (never which question is right/wrong).
 */

export const DEFAULT_GK_TRUE_FALSE_CONFIG = {
  roundTitle: 'ROUND 01 // 6 RAPID-FIRE STATEMENTS',
  answerKey: ['F', 'T', 'T', 'T', 'F', 'T'],
  questions: [
    {
      id: 'Q1',
      topic: 'WEB PROTOCOLS',
      statement:
        'HTTP Status Code 404 means the server crashed due to an internal error.',
    },
    {
      id: 'Q2',
      topic: 'ASTROPHYSICS',
      statement:
        'Sunlight takes approximately 8 minutes and 20 seconds to travel from the Sun to Earth.',
    },
    {
      id: 'Q3',
      topic: 'CHEMISTRY',
      statement: 'Diamond and Graphite are both pure allotropes of the element Carbon.',
    },
    {
      id: 'Q4',
      topic: 'NETWORKING',
      statement:
        'An IPv4 address uses 32 bits, while an IPv6 address uses 128 bits.',
    },
    {
      id: 'Q5',
      topic: 'PHYSICS',
      statement: 'Sound waves travel faster through air than they do through solid steel.',
    },
    {
      id: 'Q6',
      topic: 'COMPUTING',
      statement: 'One Byte consists of exactly 8 bits.',
    },
  ],
};

export const normalizeGkTrueFalseConfig = (gameConfig = {}) => {
  const rawQuestions =
    Array.isArray(gameConfig.questions) && gameConfig.questions.length > 0
      ? gameConfig.questions
      : DEFAULT_GK_TRUE_FALSE_CONFIG.questions;

  const questions = rawQuestions.slice(0, 6).map((q, idx) => ({
    id: q.id || `Q${idx + 1}`,
    index: idx,
    topic: String(q.topic || q.category || 'GENERAL KNOWLEDGE').toUpperCase(),
    statement: String(q.statement || q.question || q.prompt || '').trim(),
  }));

  const rawKey =
    Array.isArray(gameConfig.answerKey) && gameConfig.answerKey.length === questions.length
      ? gameConfig.answerKey
      : DEFAULT_GK_TRUE_FALSE_CONFIG.answerKey.slice(0, questions.length);

  const answerKey = rawKey.map((k) => {
    const u = String(k || '').trim().toUpperCase();
    return u === 'T' || u === 'TRUE' ? 'T' : 'F';
  });

  const minToPass = Math.ceil(questions.length * 0.5);

  return {
    roundTitle: gameConfig.roundTitle || DEFAULT_GK_TRUE_FALSE_CONFIG.roundTitle,
    questions,
    answerKey,
    totalQuestions: questions.length,
    minToPass,
    instructions:
      `Answer all ${questions.length} statements one by one. Score at least ${minToPass}/${questions.length} (50%) correct to pass — your credit reward scales proportionally with how many you get right!`,
  };
};

export const validateGkTrueFalseClient = (answers = [], config) => {
  const totalQuestions = config?.questions?.length || 6;
  let answeredCount = 0;
  let trueSelectedCount = 0;
  let falseSelectedCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const raw = String(answers[i] || '').toUpperCase();
    const val = raw === 'T' || raw === 'TRUE' ? 'T' : raw === 'F' || raw === 'FALSE' ? 'F' : '';
    if (val) {
      answeredCount += 1;
      if (val === 'T') trueSelectedCount += 1;
      if (val === 'F') falseSelectedCount += 1;
    }
  }

  const isComplete = answeredCount === totalQuestions;

  return {
    answeredCount,
    totalQuestions,
    trueSelectedCount,
    falseSelectedCount,
    isComplete,
    rightCount: null,
    wrongCount: null,
    isValid: isComplete,
  };
};

export const serializeGkTrueFalseSubmission = (answers = []) => {
  const normalized = answers.map((val) => {
    const upper = String(val || '').trim().toUpperCase();
    if (upper === 'T' || upper === 'TRUE') return 'T';
    if (upper === 'F' || upper === 'FALSE') return 'F';
    return '';
  });
  if (normalized.some((v) => !v)) return '';
  return `GKTF:${normalized.join('-')}`;
};
