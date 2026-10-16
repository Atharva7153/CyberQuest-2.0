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

/**
 * 🎮 CyberQuest 99-Challenge Competitive Master Catalog
 * Exactly 11 game engines × 9 challenges each (2 LOW, 3 MODERATE, 2 HIGH, 2 EXTREME).
 */
export const DEFAULT_CHALLENGE_CATALOG = [
  ...patchesChallenges,
  ...zipChallenges,
  ...sudokuChallenges,
  ...queensChallenges,
  ...memoryMatrixChallenges,
  ...connect4Challenges,
  ...xo4x4Challenges,
  ...wordGuessChallenges,
  ...wendChallenges,
  ...aptitudeChallenges,
  ...gkTrueFalseChallenges,
];
