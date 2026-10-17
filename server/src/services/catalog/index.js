import { patchesChallenges } from './patchesCatalog.js';
import { zipChallenges } from './zipCatalog.js';
import { sudokuChallenges } from './sudokuCatalog.js';
import { queensChallenges } from './queensCatalog.js';
import { memoryMatrixChallenges } from './memoryMatrixCatalog.js';
import { connect4Challenges } from './connect4Catalog.js';
import { xo4x4Challenges } from './xo4x4Catalog.js';
import { wordGuessChallenges } from './wordGuessCatalog.js';
import { wendChallenges } from './wendCatalog.js';
import { aptitudeChallenges } from './aptitudeCatalog.js';
import { gkTrueFalseChallenges } from './gkTrueFalseCatalog.js';

const sampleEvenly = (arr, count) => {
  const step = arr.length / count;
  const result = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.min(arr.length - 1, Math.floor(i * step));
    result.push(arr[idx]);
  }
  return result;
};

/**
 * 🎮 CyberQuest 1500-Challenge Competitive Master Catalog
 * Exactly 11 game engines evenly sampled across difficulties & risk tiers.
 */
export const DEFAULT_CHALLENGE_CATALOG = [
  ...sampleEvenly(patchesChallenges, 125),
  ...sampleEvenly(zipChallenges, 125),
  ...sampleEvenly(sudokuChallenges, 150),
  ...sampleEvenly(queensChallenges, 112),
  ...sampleEvenly(memoryMatrixChallenges, 75),
  ...sampleEvenly(connect4Challenges, 62),
  ...sampleEvenly(xo4x4Challenges, 63),
  ...sampleEvenly(wordGuessChallenges, 188),
  ...sampleEvenly(wendChallenges, 150),
  ...sampleEvenly(aptitudeChallenges, 225),
  ...sampleEvenly(gkTrueFalseChallenges, 225),
];
