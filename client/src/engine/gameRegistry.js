import { GAME_TYPES } from './gameTypes';
import { WordGuessGame } from './games/WordGuessGame';
import { ConfigurableModuleShell } from './games/ConfigurableModuleShell';

/**
 * Extensible Cyber Quest Game Registry
 * Adding a new game only requires registering its component here (or calling `registerGame`).
 * The portal dashboard and ChallengeRenderer never contain hardcoded game logic.
 */
export const gameRegistry = {
  [GAME_TYPES.SUDOKU]: ConfigurableModuleShell,
  [GAME_TYPES.WORD_GUESS]: WordGuessGame,
  [GAME_TYPES.CONNECT_4]: ConfigurableModuleShell,
  [GAME_TYPES.XO]: ConfigurableModuleShell,
  [GAME_TYPES.PATTERN]: ConfigurableModuleShell,
  [GAME_TYPES.IMAGE_OBSERVATION]: ConfigurableModuleShell,
  [GAME_TYPES.QUIZ]: ConfigurableModuleShell,
  [GAME_TYPES.APTITUDE]: ConfigurableModuleShell,
  [GAME_TYPES.ALGORITHM]: ConfigurableModuleShell,
  [GAME_TYPES.PROGRAMMING_LOGIC]: ConfigurableModuleShell,
  [GAME_TYPES.SYSTEM_PROBLEM]: ConfigurableModuleShell,
};

export const registerGame = (gameType, GameComponent) => {
  if (!gameType || !GameComponent) return;
  gameRegistry[gameType] = GameComponent;
};

export const resolveGameComponent = (gameType) => {
  if (gameType && gameRegistry[gameType]) {
    return gameRegistry[gameType];
  }
  return ConfigurableModuleShell;
};

export default gameRegistry;
