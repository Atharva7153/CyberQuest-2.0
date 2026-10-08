import { env } from './env.js';

/**
 * Canonical Resistance Credit Transaction Types
 */
export const CREDIT_TRANSACTION_TYPES = Object.freeze({
  CHALLENGE_PURCHASE: 'CHALLENGE_PURCHASE',
  CHALLENGE_REWARD: 'CHALLENGE_REWARD',
  FAILURE_PENALTY: 'FAILURE_PENALTY',
  EXTRA_TIME: 'EXTRA_TIME',
  HINT: 'HINT',
  ABILITY: 'ABILITY',
  REATTEMPT: 'REATTEMPT',
});

export const creditsConfig = {
  getStartingCredits: () => env.startingCredits,
  getHintCost: () => env.hintCost,
  getExtraTimeCost: () => env.extraTimeCost,
  getExtraTimeMinutes: () => 5,
  getReattemptMultiplier: () => env.reattemptMultiplier,
  /**
   * Server-authoritative reattempt cost calculation.
   * Never accepts price from client; scales cost by reattemptMultiplier^reattemptIndex.
   */
  calculateReattemptCost: (baseCost, reattemptIndex = 1) => {
    const safeBase = Math.max(0, Number(baseCost || 0));
    const safeExponent = Math.max(1, Math.floor(Number(reattemptIndex) || 1));
    const multiplier = Math.max(1, Number(env.reattemptMultiplier || 1.25));
    return Math.ceil(safeBase * Math.pow(multiplier, safeExponent));
  },
};

export default creditsConfig;
