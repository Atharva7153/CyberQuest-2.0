import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Crosshair,
  X,
} from 'lucide-react';
import { BrutalistPanel } from '../components/BrutalistPanel';
import { SystemBadge } from '../components/SystemBadge';
import { ChallengeRenderer } from './ChallengeRenderer';
import { useReducedMotion } from '../hooks/useReducedMotion';

const formatSessionTimer = (seconds) => {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * ChallengeSessionContainer
 * Orchestrates:
 * Challenge -> Challenge Session -> Challenge Renderer -> gameType -> Game Component
 * Plus server-authoritative submission dispatch, hint decryption display, and Framer Motion Result Modal.
 */
export const ChallengeSessionContainer = ({
  team,
  creditsConfig,
  actionPending = false,
  lastEvaluationResult,
  onClearEvaluationResult,
  onSubmitChallengeAnswer,
  onSpendTacticalCredits,
  onBrowseMarket,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const activeChallenge = team?.currentChallenge;
  const activeAttempt = team?.activeAttempt;

  // Session countdown timer based on challenge timeLimit + extraTimeMinutes
  const baseLimitSec = Number(
    activeAttempt?.timeLimit || activeChallenge?.timeLimit || 1200
  );
  const extraSec = Number(activeAttempt?.extraTimeMinutes || 0) * 60;
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    setElapsedSec(0);
  }, [activeAttempt?.attemptId, activeChallenge?.challengeId]);

  useEffect(() => {
    if (!activeChallenge) return undefined;
    const timer = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeChallenge]);

  const remainingSessionSec = Math.max(0, baseLimitSec + extraSec - elapsedSec);
  const unlockedHints = Array.isArray(activeAttempt?.unlockedHints)
    ? activeAttempt.unlockedHints
    : [];

  const handleEngineSubmit = async (submissionPayload) => {
    if (!onSubmitChallengeAnswer) return;
    await onSubmitChallengeAnswer({
      challengeId: activeChallenge?.challengeId,
      attemptId: activeAttempt?.attemptId,
      submission: submissionPayload,
    });
  };

  const handleSimulateFail = async () => {
    if (!onSubmitChallengeAnswer) return;
    await onSubmitChallengeAnswer({
      challengeId: activeChallenge?.challengeId,
      attemptId: activeAttempt?.attemptId,
      submission: { answer: 'FAIL_SIMULATION' },
      simulateFailure: true,
    });
  };

  return (
    <>
      <BrutalistPanel
        codeTag="ENGINE_SESSION"
        title="CHALLENGE SESSION & GAME ENGINE"
        accentTitle
        headerRight={
          <SystemBadge variant={activeChallenge ? 'crimson' : 'outline'} pulse={Boolean(activeChallenge)}>
            {activeChallenge ? activeChallenge.title : 'SESSION STANDBY'}
          </SystemBadge>
        }
        className="h-full"
      >
        {!activeChallenge ? (
          <div className="p-6 border-2 border-dashed border-nexus-ink/35 bg-nexus-paper text-center space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-nexus-crimson font-bold">
              NO ACTIVE CHALLENGE SESSION
            </p>
            <h3 className="font-display text-3xl uppercase text-nexus-ink">
              ACQUIRE A MODULE FROM THE CHALLENGE MARKET
            </h3>
            <p className="font-editorial text-xs sm:text-sm text-nexus-charcoal max-w-md mx-auto">
              Select any classified challenge module to initialize a server-authoritative
              Challenge Session and launch its registered game component.
            </p>
            {onBrowseMarket && (
              <button
                type="button"
                onClick={onBrowseMarket}
                className="mt-2 px-5 py-2.5 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Crosshair className="w-4 h-4" />
                <span>OPEN CHALLENGE MARKET</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 flex flex-col justify-between">
            {/* Active Session Header Telemetry */}
            <div className="p-3.5 border-2 border-nexus-ink bg-nexus-paper space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-nexus-muted uppercase">
                <span>
                  {activeChallenge.challengeId} // {activeChallenge.category} · RISK:{' '}
                  <strong className="text-nexus-crimson">{activeChallenge.risk}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-nexus-ink font-bold">
                  <Clock className="w-3.5 h-3.5 text-nexus-crimson" />
                  SESSION TIMER: {formatSessionTimer(remainingSessionSec)}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-nexus-ink leading-none">
                  {activeChallenge.title}
                </p>
                <span className="font-mono text-[11px] text-nexus-crimson font-bold">
                  REWARD: +{activeChallenge.reward} CR // FAIL: -{activeChallenge.penalty || 100} CR
                </span>
              </div>
            </div>

            {/* Challenge Renderer -> gameType -> Registered Game Component */}
            <ChallengeRenderer
              challenge={activeChallenge}
              session={activeAttempt}
              actionPending={actionPending}
              onSubmitAnswer={handleEngineSubmit}
            />

            {/* Decrypted Intelligence Hints (Server-Authoritative) */}
            <AnimatePresence>
              {unlockedHints.length > 0 && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-nexus-ink text-nexus-paper border-l-4 border-nexus-crimson font-mono text-xs space-y-1.5"
                >
                  <span className="text-[10px] uppercase tracking-widest text-nexus-crimson font-bold block">
                    DECRYPTED SERVER INTELLIGENCE ({unlockedHints.length})
                  </span>
                  {unlockedHints.map((hintText, idx) => (
                    <p key={idx} className="text-nexus-paper/90 leading-relaxed">
                      {hintText}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tactical Session Controls (Hint / Extra Time / Fail Test) */}
            <div className="pt-3 border-t border-dashed border-nexus-ink/25 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                <span>SESSION TACTICAL SUPPORT</span>
                <span>
                  HINTS: {activeAttempt?.hintsUnlocked || 0} | +TIME:{' '}
                  {activeAttempt?.extraTimeMinutes || 0}M
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  disabled={actionPending}
                  onClick={() =>
                    onSpendTacticalCredits &&
                    onSpendTacticalCredits('HINT', creditsConfig?.hintCost || 100)
                  }
                  className="py-2 px-2 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer disabled:opacity-50"
                >
                  HINT (-{creditsConfig?.hintCost || 100} CR)
                </button>

                <button
                  type="button"
                  disabled={actionPending}
                  onClick={() =>
                    onSpendTacticalCredits &&
                    onSpendTacticalCredits('EXTRA_TIME', creditsConfig?.extraTimeCost || 150)
                  }
                  className="py-2 px-2 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer disabled:opacity-50"
                >
                  +5M TIME (-{creditsConfig?.extraTimeCost || 150} CR)
                </button>

                <button
                  type="button"
                  disabled={actionPending}
                  onClick={handleSimulateFail}
                  className="py-2 px-2 border border-nexus-crimson bg-nexus-crimson/10 text-nexus-crimson hover:bg-nexus-crimson hover:text-white font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer disabled:opacity-50"
                >
                  TEST FAIL
                </button>
              </div>
            </div>
          </div>
        )}
      </BrutalistPanel>

      {/* =====================================================================
          SERVER-AUTHORITATIVE EVALUATION RESULT MODAL (Framer Motion)
         ===================================================================== */}
      <AnimatePresence>
        {lastEvaluationResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClearEvaluationResult}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="engine-result-modal-title"
              className="nexus-editorial-box max-w-lg w-full overflow-hidden border-2 border-nexus-ink shadow-brutal"
            >
              {/* Result Top Header */}
              <div
                className={`px-5 py-4 border-b-2 border-nexus-ink flex items-center justify-between ${
                  lastEvaluationResult.passed
                    ? 'bg-nexus-ink text-nexus-paper'
                    : 'bg-nexus-crimson text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest">
                  {lastEvaluationResult.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-nexus-crimson" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-white" />
                  )}
                  <span>
                    {lastEvaluationResult.passed
                      ? 'NEXUS CORE // SOLUTION VERIFIED'
                      : 'NEXUS CORE // VERIFICATION REJECTED'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClearEvaluationResult}
                  aria-label="Close evaluation result modal"
                  className="opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Result Body */}
              <div className="p-6 space-y-5 bg-nexus-paper">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                    {lastEvaluationResult.challengeId} // {lastEvaluationResult.category} · ENGINE:{' '}
                    {lastEvaluationResult.gameType}
                  </span>
                  <h2
                    id="engine-result-modal-title"
                    className="font-display text-4xl uppercase text-nexus-ink leading-none mt-1"
                  >
                    {lastEvaluationResult.title}
                  </h2>
                  <p className="font-editorial text-sm text-nexus-charcoal mt-2">
                    {lastEvaluationResult.message}
                  </p>
                </div>

                {/* Server Computed Outcome Grid */}
                <div className="grid grid-cols-3 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper divide-x divide-nexus-paper/15 font-mono">
                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      OUTCOME
                    </span>
                    <span
                      className={`font-bold text-sm uppercase ${
                        lastEvaluationResult.passed ? 'text-white' : 'text-nexus-crimson'
                      }`}
                    >
                      {lastEvaluationResult.status}
                    </span>
                  </div>

                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      CREDIT DELTA
                    </span>
                    <span
                      className={`font-bold text-base ${
                        lastEvaluationResult.creditsDelta >= 0
                          ? 'text-white'
                          : 'text-nexus-crimson'
                      }`}
                    >
                      {lastEvaluationResult.creditsDelta >= 0
                        ? `+${lastEvaluationResult.creditsDelta} CR`
                        : `${lastEvaluationResult.creditsDelta} CR`}
                    </span>
                  </div>

                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      NEW BALANCE
                    </span>
                    <span className="font-bold text-base text-nexus-crimson">
                      {Number(lastEvaluationResult.balanceAfter ?? team?.credits ?? 0).toLocaleString()}{' '}
                      CR
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClearEvaluationResult}
                    className="flex-1 py-3 px-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-condensed text-base font-extrabold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                  >
                    CONTINUE MISSION
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChallengeSessionContainer;
