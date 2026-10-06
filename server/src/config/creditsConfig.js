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
  calculateReattemptCost: (baseCost) =>
    Math.ceil(Number(baseCost || 0) * env.reattemptMultiplier),
};

export default creditsConfig;
