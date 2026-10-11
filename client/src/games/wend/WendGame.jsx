import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RotateCcw,
  Delete,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Send,
  ArrowDown,
} from 'lucide-react';
import {
  normalizeWendConfig,
  validateWendChainClient,
  serializeWendSubmission,
} from './wendLogic';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const WendGame = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizeWendConfig(gameConfig), [gameConfig]);
  const { wordLength, steps, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const buildInitialWords = useCallback(() => {
    return steps.map((s) => (s.isLocked ? s.lockedWord : ''));
  }, [steps]);

  const [words, setWords] = useState(buildInitialWords);
  const [activeStepIdx, setActiveStepIdx] = useState(() => {
    const firstEditable = steps.findIndex((s) => !s.isLocked);
    return firstEditable >= 0 ? firstEditable : 0;
  });

  useEffect(() => {
    setWords(buildInitialWords());
    const firstEditable = steps.findIndex((s) => !s.isLocked);
    setActiveStepIdx(firstEditable >= 0 ? firstEditable : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.challengeId, session?.attemptId]);

  const validation = useMemo(
    () => validateWendChainClient(words, config),
    [words, config]
  );

  // Sync draft with parent ChallengeSessionPage
  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const serialized = serializeWendSubmission(words);
      onDraftChange({
        gameType: 'wend',
        answer: validation.isComplete ? serialized : '',
        words,
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
    }
  }, [words, validation.isComplete, validation.isValid, onDraftChange]);

  const handleAppendLetter = useCallback(
    (letter) => {
      if (isLocked) return;
      const stepMeta = steps[activeStepIdx];
      if (!stepMeta || stepMeta.isLocked) return;

      setWords((prev) => {
        const current = String(prev[activeStepIdx] || '');
        if (current.length >= wordLength) return prev;
        const nextWord = (current + letter).slice(0, wordLength).toUpperCase();
        const next = [...prev];
        next[activeStepIdx] = nextWord;

        // Auto-advance to next editable rung when word reaches full length
        if (nextWord.length === wordLength) {
          const nextEditable = steps.findIndex(
            (s, idx) => idx > activeStepIdx && !s.isLocked && (next[idx] || '').length < wordLength
          );
          if (nextEditable >= 0) {
            setTimeout(() => setActiveStepIdx(nextEditable), 80);
          }
        }
        return next;
      });
    },
    [isLocked, steps, activeStepIdx, wordLength]
  );

  const handleBackspace = useCallback(() => {
    if (isLocked) return;
    const stepMeta = steps[activeStepIdx];
    if (!stepMeta || stepMeta.isLocked) return;

    setWords((prev) => {
      const current = String(prev[activeStepIdx] || '');
      if (!current) return prev;
      const next = [...prev];
      next[activeStepIdx] = current.slice(0, -1);
      return next;
    });
  }, [isLocked, steps, activeStepIdx]);

  const handleClearActiveStep = () => {
    if (isLocked) return;
    const stepMeta = steps[activeStepIdx];
    if (!stepMeta || stepMeta.isLocked) return;
    setWords((prev) => {
      const next = [...prev];
      next[activeStepIdx] = '';
      return next;
    });
  };

  const handleResetAll = () => {
    if (isLocked) return;
    setWords(buildInitialWords());
    const firstEditable = steps.findIndex((s) => !s.isLocked);
    if (firstEditable >= 0) setActiveStepIdx(firstEditable);
  };

  // Physical keyboard support
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isLocked) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleAppendLetter(e.key.toUpperCase());
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        for (let i = activeStepIdx - 1; i >= 0; i--) {
          if (!steps[i].isLocked) {
            setActiveStepIdx(i);
            break;
          }
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        for (let i = activeStepIdx + 1; i < steps.length; i++) {
          if (!steps[i].isLocked) {
            setActiveStepIdx(i);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLocked, activeStepIdx, steps, handleAppendLetter, handleBackspace]);

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'wend',
      answer: serializeWendSubmission(words),
      words,
    });
  };

  return (
    <div className="space-y-5 select-none">
      {/* Instructions & Status Header */}
      <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="font-editorial text-sm text-nexus-charcoal leading-snug">
          {instructions}
        </p>
        <div className="flex items-center gap-2 shrink-0 font-mono text-xs font-bold uppercase">
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
            {validation.filledCount} / {validation.totalSteps} WORDS
          </span>
          {validation.isValid ? (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-nexus-crimson" />
              CHAIN VALID
            </span>
          ) : validation.isComplete ? (
            <span className="px-2.5 py-1 bg-nexus-crimson text-white inline-flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              CHECK 1-LETTER STEPS
            </span>
          ) : null}
        </div>
      </div>

      {/* WEND Word Ladder */}
      <div className="max-w-xl mx-auto space-y-2">
        {steps.map((step, idx) => {
          const wordStr = String(words[idx] || '');
          const isStepSelected = activeStepIdx === idx && !step.isLocked;
          const prevTransition =
            idx > 0 ? validation.stepTransitions[idx - 1] : null;
          const prevWord = idx > 0 ? String(words[idx - 1] || '') : '';

          return (
            <React.Fragment key={step.index}>
              {/* Transition Indicator between adjacent words */}
              {idx > 0 && (
                <div className="flex items-center justify-center gap-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                  <ArrowDown className="w-3 h-3 text-nexus-crimson" />
                  {prevTransition && prevTransition.diff >= 0 ? (
                    prevTransition.isValid ? (
                      <span className="px-2 py-0.5 bg-nexus-ink text-nexus-paper font-bold">
                        1 LETTER CHANGED ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-nexus-crimson text-white font-bold">
                        {prevTransition.diff === 0
                          ? 'IDENTICAL WORD (CHANGE 1 LETTER)'
                          : `${prevTransition.diff} LETTERS CHANGED (MUST BE 1)`}
                      </span>
                    )
                  ) : (
                    <span className="text-nexus-muted">CHANGE 1 LETTER</span>
                  )}
                </div>
              )}

              {/* Rung Card */}
              <div
                onClick={() => {
                  if (!step.isLocked && !isLocked) setActiveStepIdx(idx);
                }}
                role={step.isLocked ? undefined : 'button'}
                tabIndex={step.isLocked ? -1 : 0}
                className={`p-3.5 border-2 transition-colors ${
                  step.isLocked
                    ? 'border-nexus-ink bg-nexus-ink text-nexus-paper'
                    : isStepSelected
                      ? 'border-nexus-crimson bg-nexus-paper shadow-brutal-sm cursor-pointer'
                      : 'border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-paper cursor-pointer'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Step Label & Clue */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                      {step.isLocked ? (
                        <span className="inline-flex items-center gap-1 text-nexus-crimson font-bold">
                          <Lock className="w-3 h-3" />
                          {idx === 0 ? 'START WORD' : 'TARGET WORD'}
                        </span>
                      ) : (
                        <span
                          className={`font-bold ${
                            isStepSelected ? 'text-nexus-crimson' : 'text-nexus-muted'
                          }`}
                        >
                          STEP 0{idx} {isStepSelected ? '// ACTIVE' : ''}
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-editorial text-xs sm:text-sm ${
                        step.isLocked ? 'text-nexus-paper/85' : 'text-nexus-charcoal font-medium'
                      }`}
                    >
                      {step.clue}
                    </p>
                  </div>

                  {/* Right: Letter Tiles */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {Array.from({ length: wordLength }).map((_, charIdx) => {
                      const ch = wordStr[charIdx] || '';
                      const changedFromPrev =
                        idx > 0 &&
                        ch &&
                        prevWord.length === wordLength &&
                        prevWord[charIdx] !== ch;

                      return (
                        <div
                          key={charIdx}
                          className={`w-10 h-11 sm:w-11 sm:h-12 border-2 flex items-center justify-center font-mono text-lg sm:text-xl font-bold uppercase ${
                            step.isLocked
                              ? 'border-nexus-paper/40 bg-black/50 text-white'
                              : changedFromPrev
                                ? 'border-nexus-ink bg-nexus-crimson text-white'
                                : ch
                                  ? 'border-nexus-ink bg-nexus-ink text-nexus-paper'
                                  : isStepSelected && charIdx === wordStr.length
                                    ? 'border-nexus-crimson bg-white text-nexus-ink'
                                    : 'border-nexus-ink/40 bg-nexus-paper text-nexus-muted'
                          }`}
                        >
                          {ch || '_'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Touch Keyboard & Controls */}
      <div className="max-w-xl mx-auto p-2.5 sm:p-3.5 border-2 border-nexus-ink bg-nexus-paper-elevated space-y-2.5">
        <div className="space-y-1.5">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  disabled={isLocked}
                  onClick={() => handleAppendLetter(letter)}
                  className="flex-1 max-w-[38px] h-10 sm:h-11 px-0.5 sm:px-1.5 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper active:bg-nexus-crimson active:text-white font-mono text-xs sm:text-sm font-bold uppercase transition-colors cursor-pointer touch-manipulation"
                >
                  {letter}
                </button>
              ))}
              {rIdx === 2 && (
                <button
                  type="button"
                  disabled={isLocked}
                  onClick={handleBackspace}
                  className="px-2 sm:px-3.5 h-10 sm:h-11 border border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-xs font-bold uppercase flex items-center gap-1 cursor-pointer touch-manipulation shrink-0"
                  title="Backspace"
                >
                  <Delete className="w-3.5 h-3.5" />
                  <span>DEL</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            disabled={isLocked}
            onClick={handleClearActiveStep}
            className="min-h-[44px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            CLEAR STEP
          </button>

          <button
            type="button"
            disabled={isLocked}
            onClick={handleResetAll}
            className="min-h-[44px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-nexus-crimson" />
            <span>RESET ALL</span>
          </button>

          <button
            type="button"
            disabled={isLocked || !validation.isComplete}
            onClick={handleSubmit}
            className="min-h-[44px] px-3 py-2 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>SUBMIT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WendGame;
