import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Cpu } from 'lucide-react';
import { getGameTypeMeta } from '../gameTypes';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * ConfigurableModuleShell
 * Generic configurable challenge module registered for gameTypes whose dedicated
 * interactive boards will be expanded in subsequent phases (`sudoku`, `connect4`, `xo`,
 * `pattern`, `imageObservation`, `quiz`, `aptitude`, `algorithm`, `programmingLogic`, `systemProblem`).
 * Driven entirely by `gameConfig` and validates all submissions on the server.
 */
export const ConfigurableModuleShell = ({
  challenge,
  gameType,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const meta = getGameTypeMeta(gameType || challenge?.gameType);
  const isLocked = Boolean(actionPending || disabled);

  const [answerInput, setAnswerInput] = useState('');

  useEffect(() => {
    setAnswerInput('');
  }, [challenge?.challengeId, gameType]);

  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      onDraftChange({
        gameType: gameType || challenge?.gameType,
        answer: answerInput.trim(),
      });
    }
  }, [answerInput, gameType, challenge?.gameType, onDraftChange]);

  const promptText =
    gameConfig.prompt ||
    challenge?.description ||
    'Analyze the module parameters and transmit your verified solution to NEXUS Core.';
  const referenceData = Array.isArray(gameConfig.referenceData) ? gameConfig.referenceData : [];
  const options = Array.isArray(gameConfig.options) ? gameConfig.options : [];
  const placeholder = gameConfig.placeholder || 'ENTER SOLUTION PAYLOAD...';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answerInput.trim() || isLocked) return;
    onSubmitAnswer({
      gameType: gameType || challenge?.gameType,
      answer: answerInput.trim(),
    });
  };

  return (
    <div className="space-y-4">
      {/* Module Specification & Prompt */}
      <div className="p-4 border-2 border-nexus-ink bg-nexus-paper space-y-2.5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted border-b border-dashed border-nexus-ink/25 pb-1.5">
          <span className="flex items-center gap-1.5 text-nexus-crimson font-bold">
            <Cpu className="w-3.5 h-3.5" />
            {meta.code} // {meta.label}
          </span>
          <span>ENGINE_TYPE: {gameType || challenge?.gameType}</span>
        </div>

        <p className="font-editorial text-sm sm:text-base font-semibold text-nexus-ink leading-relaxed">
          {promptText}
        </p>

        {/* Reference Telemetry / Board State from gameConfig */}
        {referenceData.length > 0 && (
          <div className="p-3 bg-nexus-ink text-nexus-paper font-mono text-xs space-y-1 border border-nexus-ink">
            {referenceData.map((line, idx) => (
              <div key={idx} className="tracking-wider">
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Selectable Options (if provided in gameConfig, e.g. quiz) */}
        {options.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            {options.map((option) => {
              const isSelected = answerInput.toUpperCase() === String(option).toUpperCase();
              return (
                <motion.button
                  key={option}
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  onClick={() => setAnswerInput(String(option))}
                  className={`py-2 px-3 border-2 font-mono text-xs font-bold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-nexus-crimson text-white border-nexus-ink'
                      : 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper'
                  }`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Answer Transmission Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          placeholder={placeholder}
          aria-label="Challenge solution input"
          className="flex-1 px-3 py-2.5 bg-nexus-paper border-2 border-nexus-ink font-mono text-xs font-bold uppercase tracking-wider text-nexus-ink focus:border-nexus-crimson focus:outline-none"
        />
        <button
          type="submit"
          disabled={actionPending || !answerInput.trim()}
          className="px-5 py-2.5 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{actionPending ? 'VALIDATING...' : 'SUBMIT ANSWER'}</span>
        </button>
      </form>
    </div>
  );
};

export default ConfigurableModuleShell;
