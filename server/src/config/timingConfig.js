/**
 * Global Challenge Timing & Game Rotation Configuration Engine
 * - Increased baseline times across all 11 competitive game engines
 * - Per-game-type admin timing controls (not just per-question)
 * - Maximum consecutive games streak limiter (anti-grind / tactical diversity)
 */

export const DEFAULT_GAME_TIMINGS = {
  sudoku: 300,        // 5.0 min (was ~114s - generous time for logic solving)
  patches: 210,       // 3.5 min (was ~107s)
  zip: 210,           // 3.5 min (was ~100s)
  queens: 210,        // 3.5 min (was ~99s)
  memoryMatrix: 180,  // 3.0 min (was ~93s)
  connect4: 210,      // 3.5 min (was ~92s)
  xo4x4: 210,         // 3.5 min (was ~91s)
  wordGuess: 180,     // 3.0 min (was ~83s)
  wend: 180,          // 3.0 min (was ~82s)
  aptitude: 210,      // 3.5 min (was ~83s - math & logic needs time)
  gkTrueFalse: 100,   // 1.6 min (was ~50s)
};

export const GAME_TYPE_LABELS = {
  sudoku: 'Sudoku',
  patches: 'Patches',
  zip: 'Zip Grid',
  queens: 'N-Queens',
  memoryMatrix: 'Memory Matrix',
  connect4: 'Connect 4',
  xo4x4: 'XO 4x4',
  wordGuess: 'Word Guess',
  wend: 'Wend (Wordle)',
  aptitude: 'Aptitude MCQ',
  gkTrueFalse: 'GK True/False',
};

const DIFFICULTY_MULTIPLIERS = {
  LOW: 0.8,
  MODERATE: 1.0,
  HIGH: 1.25,
  EXTREME: 1.5,
};

let challengeTimingMultiplier = 1.0;
let runtimeGameTimings = { ...DEFAULT_GAME_TIMINGS };
let maxConsecutiveGamesPerType = 5;

export const normalizeGameType = (raw) => {
  const s = String(raw || '').trim();
  if (!s) return 'wordGuess';
  if (s === 'xo') return 'xo4x4';
  if (s === 'quiz') return 'gkTrueFalse';
  if (s === 'aptitudeMcq') return 'aptitude';
  if (s === 'wendWordle') return 'wend';
  return s;
};

export const getGameLabel = (raw) => {
  const gt = normalizeGameType(raw);
  return GAME_TYPE_LABELS[gt] || String(gt || 'CHALLENGE').toUpperCase();
};

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

export const getGameTypeTimings = () => {
  return { ...runtimeGameTimings };
};

export const setGameTypeTiming = (gameType, seconds) => {
  const gt = normalizeGameType(gameType);
  const sec = Math.max(30, Math.min(1800, Number(seconds) || DEFAULT_GAME_TIMINGS[gt] || 180));
  runtimeGameTimings[gt] = sec;
  return runtimeGameTimings[gt];
};

export const setAllGameTypeTimings = (newTimings = {}) => {
  if (!newTimings || typeof newTimings !== 'object') return { ...runtimeGameTimings };
  for (const [rawGt, sec] of Object.entries(newTimings)) {
    const gt = normalizeGameType(rawGt);
    const parsed = Number(sec);
    if (!Number.isNaN(parsed) && parsed >= 20 && parsed <= 1800) {
      runtimeGameTimings[gt] = Math.round(parsed);
    }
  }
  return { ...runtimeGameTimings };
};

export const getMaxConsecutiveGames = () => {
  return maxConsecutiveGamesPerType;
};

export const setMaxConsecutiveGames = (limit) => {
  const parsed = Number(limit);
  if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 50) {
    maxConsecutiveGamesPerType = Math.round(parsed);
  }
  return maxConsecutiveGamesPerType;
};

export const DEFAULT_CONSECUTIVE_COOLDOWN_SECONDS = 300; // 5.0 minutes timeout by default
let consecutiveGamesCooldownSeconds = DEFAULT_CONSECUTIVE_COOLDOWN_SECONDS;

export const getConsecutiveGamesCooldownSeconds = () => consecutiveGamesCooldownSeconds;

export const setConsecutiveGamesCooldownSeconds = (seconds) => {
  const parsed = Number(seconds);
  if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 3600) {
    consecutiveGamesCooldownSeconds = Math.round(parsed);
  }
  return consecutiveGamesCooldownSeconds;
};

export const getConsecutiveGamesCooldownMinutes = () => {
  return Math.round(consecutiveGamesCooldownSeconds / 60);
};

export const setConsecutiveGamesCooldownMinutes = (minutes) => {
  const parsed = Number(minutes);
  if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 60) {
    consecutiveGamesCooldownSeconds = Math.round(parsed * 60);
  }
  return getConsecutiveGamesCooldownMinutes();
};

/**
 * Authoritatively calculate challenge time limit in seconds
 * based on game engine base time, difficulty scaling, and anti-AI multiplier.
 */
export const calculateChallengeTimeLimit = (rawGameType, rawDifficulty, fallbackTime = 180) => {
  const gt = normalizeGameType(rawGameType);
  const base = runtimeGameTimings[gt] || Number(fallbackTime) || 180;
  const diff = String(rawDifficulty || 'MODERATE').toUpperCase();
  const diffMultiplier = DIFFICULTY_MULTIPLIERS[diff] || 1.0;
  const computed = Math.round(base * diffMultiplier);
  return Math.max(25, Math.round(computed * challengeTimingMultiplier));
};

/**
 * Determine a team's current consecutive streak for a game engine
 * Evaluates active attempts, purchased inventory, and completed history.
 */
export const getTeamConsecutiveStreak = (team) => {
  if (!team) {
    return {
      gameType: null,
      count: 0,
      maxAllowed: maxConsecutiveGamesPerType,
      isLocked: false,
      gameLabel: null,
    };
  }

  const maxAllowed = maxConsecutiveGamesPerType;
  const recentItems = [];

  // 1. Any active attempts (currently being solved right now)
  if (Array.isArray(team.activeAttempts) && team.activeAttempts.length > 0) {
    for (const a of team.activeAttempts) {
      if (a?.gameType && a.status === 'IN_PROGRESS') {
        recentItems.push({
          gameType: normalizeGameType(a.gameType),
          timestamp: a.startedAt ? new Date(a.startedAt).getTime() : Date.now(),
        });
      }
    }
  } else if (team.activeAttempt?.gameType && team.activeAttempt.status === 'IN_PROGRESS') {
    recentItems.push({
      gameType: normalizeGameType(team.activeAttempt.gameType),
      timestamp: team.activeAttempt.startedAt
        ? new Date(team.activeAttempt.startedAt).getTime()
        : Date.now(),
    });
  }

  // 2. Purchased inventory awaiting solution
  if (Array.isArray(team.purchasedChallenges)) {
    for (const p of team.purchasedChallenges) {
      if (p?.gameType) {
        recentItems.push({
          gameType: normalizeGameType(p.gameType),
          timestamp: p.timestamp ? new Date(p.timestamp).getTime() : Date.now(),
        });
      }
    }
  }

  // 3. Completed challenges history
  if (Array.isArray(team.completedChallenges)) {
    for (const c of team.completedChallenges) {
      if (c?.gameType) {
        recentItems.push({
          gameType: normalizeGameType(c.gameType),
          timestamp: c.timestamp ? new Date(c.timestamp).getTime() : 0,
        });
      }
    }
  }

  // Evaluate active cooldowns from team.gameCooldowns
  const now = Date.now();
  const activeCooldowns = {};
  if (team.gameCooldowns && typeof team.gameCooldowns === 'object') {
    for (const [rawGt, expiresVal] of Object.entries(team.gameCooldowns)) {
      const gt = normalizeGameType(rawGt);
      const expiresMs = new Date(expiresVal).getTime();
      if (expiresMs > now) {
        const remSec = Math.ceil((expiresMs - now) / 1000);
        activeCooldowns[gt] = {
          gameType: gt,
          gameLabel: getGameLabel(gt),
          remainingSeconds: remSec,
          expiresAt: new Date(expiresMs).toISOString(),
        };
      }
    }
  }

  if (recentItems.length === 0) {
    return {
      gameType: null,
      count: 0,
      maxAllowed,
      isLocked: false,
      gameLabel: null,
      activeCooldowns,
      cooldownSeconds: consecutiveGamesCooldownSeconds,
      cooldownMinutes: Math.round(consecutiveGamesCooldownSeconds / 60),
    };
  }

  const streakGameType = recentItems[0].gameType;
  let streakCount = 0;
  for (const item of recentItems) {
    if (item.gameType === streakGameType) {
      streakCount++;
    } else {
      break;
    }
  }

  const isCurrentStreakInCooldown = Boolean(activeCooldowns[streakGameType]);

  return {
    gameType: streakGameType,
    count: streakCount,
    maxAllowed,
    isLocked: streakCount >= maxAllowed || isCurrentStreakInCooldown,
    isCooldownActive: isCurrentStreakInCooldown,
    cooldownRemainingSeconds: activeCooldowns[streakGameType]?.remainingSeconds || 0,
    gameLabel: getGameLabel(streakGameType),
    activeCooldowns,
    cooldownSeconds: consecutiveGamesCooldownSeconds,
    cooldownMinutes: Math.round(consecutiveGamesCooldownSeconds / 60),
  };
};

export default {
  DEFAULT_GAME_TIMINGS,
  GAME_TYPE_LABELS,
  normalizeGameType,
  getGameLabel,
  getChallengeTimingMultiplier,
  setChallengeTimingMultiplier,
  getGameTypeTimings,
  setGameTypeTiming,
  setAllGameTypeTimings,
  getMaxConsecutiveGames,
  setMaxConsecutiveGames,
  getConsecutiveGamesCooldownSeconds,
  setConsecutiveGamesCooldownSeconds,
  getConsecutiveGamesCooldownMinutes,
  setConsecutiveGamesCooldownMinutes,
  calculateChallengeTimeLimit,
  getTeamConsecutiveStreak,
};
