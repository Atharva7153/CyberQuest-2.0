import { GAME_TYPES } from './gameTypes';
import { GameRegistry, registerGameModule } from '../games/GameRegistry';
import { ConfigurableModuleShell } from './games/ConfigurableModuleShell';

/**
 * Extensible Cyber Quest Game Registry Bridge
 * Connects the centralized /games/GameRegistry (sudoku, connect4, wordGuess, xo4x4, wend, patches, zip)
 * with ChallengeRenderer.
 */
export const gameRegistry = {
  [GAME_TYPES.SUDOKU]: GameRegistry.sudoku.component,
  [GAME_TYPES.CONNECT_4]: GameRegistry.connect4.component,
  [GAME_TYPES.WORD_GUESS]: GameRegistry.wordGuess.component,
  [GAME_TYPES.XO4X4]: GameRegistry.xo4x4.component,
  [GAME_TYPES.WEND]: GameRegistry.wend.component,
  [GAME_TYPES.PATCHES]: GameRegistry.patches.component,
  [GAME_TYPES.ZIP]: GameRegistry.zip.component,
  // Legacy / Extensible fallbacks
  [GAME_TYPES.XO]: GameRegistry.xo4x4.component,
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
  registerGameModule(gameType, { component: GameComponent });
};

export const resolveGameComponent = (gameType) => {
  if (gameType && GameRegistry[gameType]?.component) {
    return GameRegistry[gameType].component;
  }
  if (gameType && gameRegistry[gameType]) {
    return gameRegistry[gameType];
  }
  return ConfigurableModuleShell;
};

export { GameRegistry };
export default gameRegistry;
