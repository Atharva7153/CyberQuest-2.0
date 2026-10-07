import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveGameComponent } from './gameRegistry';
import { getGameTypeMeta } from './gameTypes';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * ChallengeRenderer
 * Pipeline stage:
 * Challenge -> Challenge Session -> Challenge Renderer -> gameType -> Game Component
 */
export const ChallengeRenderer = ({
  challenge,
  session,
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const gameType = session?.gameType || challenge?.gameType || 'wordGuess';
  const gameConfig = session?.gameConfig || challenge?.gameConfig || {};
  const GameComponent = resolveGameComponent(gameType);
  const meta = getGameTypeMeta(gameType);

  return (
    <div
      data-engine-renderer={gameType}
      className="space-y-3"
    >
      {/* Engine Pipeline Telemetry Strip */}
      <div className="px-3 py-1.5 bg-nexus-ink text-nexus-paper flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest border border-nexus-ink">
        <span className="text-nexus-paper/75">
          ENGINE // <strong className="text-nexus-crimson">{gameType}</strong> ({meta.code})
        </span>
        <span className="text-nexus-paper/60">
          SESSION: {session?.attemptId || 'ATT-READY'}
        </span>
      </div>

      {/* Dynamically Resolved Game Component */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${challenge?.challengeId || 'chg'}-${gameType}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <GameComponent
            challenge={challenge}
            session={session}
            gameType={gameType}
            gameConfig={gameConfig}
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
