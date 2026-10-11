export const DEFAULT_MEMORY_ROUNDS_4X4 = [
  { id: 'R1', label: 'STAGE 01', count: 5, flashMs: 2200, targets: [1, 4, 6, 11, 13] },
  { id: 'R2', label: 'STAGE 02', count: 6, flashMs: 2200, targets: [0, 3, 5, 10, 12, 15] },
  { id: 'R3', label: 'STAGE 03', count: 7, flashMs: 2200, targets: [1, 2, 4, 7, 9, 13, 14] },
];

export const DEFAULT_MEMORY_ROUNDS_5X5 = [
  { id: 'R1', label: 'STAGE 01', count: 6, flashMs: 2400, targets: [1, 3, 7, 12, 17, 21] },
  { id: 'R2', label: 'STAGE 02', count: 7, flashMs: 2400, targets: [0, 4, 6, 12, 18, 20, 24] },
  { id: 'R3', label: 'STAGE 03', count: 8, flashMs: 2400, targets: [2, 5, 9, 11, 13, 15, 19, 22] },
];

export const normalizeMemoryMatrixConfig = (gameConfig = {}) => {
  const size = Number(gameConfig.size) === 5 ? 5 : 4;
  const maxReflashes = Number(gameConfig.maxReflashes) || 2;
  const fallbackRounds = size === 5 ? DEFAULT_MEMORY_ROUNDS_5X5 : DEFAULT_MEMORY_ROUNDS_4X4;
  const rawRounds =
    Array.isArray(gameConfig.rounds) && gameConfig.rounds.length > 0
      ? gameConfig.rounds
      : fallbackRounds;

  const rounds = rawRounds.map((r, idx) => {
    const targets = Array.isArray(r.targets)
      ? [...new Set(r.targets.map((n) => Number(n)).filter((n) => Number.isInteger(n)))].sort(
          (a, b) => a - b
        )
      : fallbackRounds[idx]?.targets || [0, 1, 2, 3, 4];
    return {
      id: r.id || `R${idx + 1}`,
      label: r.label || `STAGE 0${idx + 1}`,
      count: targets.length,
      flashMs: Number(r.flashMs) || (size === 5 ? 2400 : 2200),
      targets,
    };
  });

  return {
    size,
    maxReflashes,
    rounds,
  };
};

export const validateMemoryMatrixClient = (verifiedRounds = [], config = {}) => {
  const normalized = normalizeMemoryMatrixConfig(config);
  const expectedRounds = normalized.rounds;

  let completedStages = 0;
  for (let i = 0; i < expectedRounds.length; i++) {
    const exp = expectedRounds[i].targets;
    const sub = Array.isArray(verifiedRounds[i])
      ? [...verifiedRounds[i]].map(Number).sort((a, b) => a - b)
      : [];
    if (exp.length === sub.length && exp.every((val, idx) => val === sub[idx])) {
      completedStages++;
    } else {
      break;
    }
  }

  const isComplete = completedStages === expectedRounds.length;
  return {
    isComplete,
    isValid: isComplete,
    completedStages,
    totalStages: expectedRounds.length,
  };
};

export const serializeMemoryMatrixSubmission = (verifiedRounds = []) => {
  if (!Array.isArray(verifiedRounds) || verifiedRounds.length === 0) return '';
  const parts = verifiedRounds.map((arr) =>
    Array.isArray(arr)
      ? [...arr]
          .map((n) => Number(n))
          .filter((n) => Number.isInteger(n))
          .sort((a, b) => a - b)
          .join(',')
      : ''
  );
  if (parts.some((p) => !p)) return '';
  return `MEMORY_MATRIX:${parts.join('|')}`;
};
