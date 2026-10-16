/**
 * Global Challenge Timing Configuration & Multiplier Engine
 * Allows Admin to adjust challenge time limits globally (e.g. 0.75x Blitz Anti-AI, 1.0x Standard, 1.25x Relaxed).
 */

let challengeTimingMultiplier = 1.0;

export const getChallengeTimingMultiplier = () => {
  return challengeTimingMultiplier;
};

export const setChallengeTimingMultiplier = (multiplier) => {
  const val = Number(multiplier);
  if (!Number.isNaN(val) && val >= 0.25 && val <= 3.0) {
    challengeTimingMultiplier = Number(val.toFixed(2));
  }
  return challengeTimingMultiplier;
};

export default {
  getChallengeTimingMultiplier,
  setChallengeTimingMultiplier,
};
