import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveGameComponent } from './gameRegistry';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * ChallengeRenderer
 * Renders the interactive challenge game component for the active challenge session.
 */
export const ChallengeRenderer = ({
  challenge,
  session,
  evaluationResult = null,
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const gameType = challenge?.gameType || session?.gameType || 'wordGuess';
  const gameConfig =
    session?.gameConfig && Object.keys(session.gameConfig).length > 0
      ? { ...(challenge?.gameConfig || {}), ...session.gameConfig }
      : challenge?.gameConfig || {};
  const effectiveChallenge = challenge
    ? {
        ...challenge,
        description: gameConfig.variantDescription || challenge.description,
        gameConfig,
      }
    : session;
  const GameComponent = resolveGameComponent(gameType);

  return (
    <div className="space-y-3">
      {/* Dynamically Resolved Game Component */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${challenge?.challengeId || 'chg'}-${session?.attemptId || 'no-att'}-${gameConfig?.variantId || 'default'}-${gameType}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <GameComponent
            challenge={effectiveChallenge}
            session={session}
            gameType={gameType}
            gameConfig={gameConfig}
            evaluationResult={evaluationResult}
            actionPending={actionPending || disabled}
            disabled={disabled}
            onDraftChange={onDraftChange}
            onSubmitAnswer={onSubmitAnswer}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChallengeRenderer;
