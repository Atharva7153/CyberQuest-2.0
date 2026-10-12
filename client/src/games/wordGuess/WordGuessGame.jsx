import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Delete, RotateCcw, Send, CheckCircle2 } from 'lucide-react';
import { normalizeWordGuessConfig } from './wordGuessLogic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const WordGuessGame = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const config = useMemo(
    () => normalizeWordGuessConfig(gameConfig, challenge),
    [gameConfig, challenge]
  );
  const { rounds } = config;
  const roundCount = rounds.length;

  const [wordsByRound, setWordsByRound] = useState(() => rounds.map(() => ''));
  const [activeRoundIdx, setActiveRoundIdx] = useState(0);
  const isLocked = Boolean(actionPending || disabled);

  const roundsSignature = useMemo(
    () => rounds.map((r) => `${r.id}:${r.wordLength}:${r.scrambledLetters.join('')}`).join('|'),
    [rounds]
  );

  // Reset character buffers when challengeId, attemptId, or round configuration changes
  useEffect(() => {
    setWordsByRound(rounds.map(() => ''));
    setActiveRoundIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.challengeId, session?.attemptId, roundsSignature]);

  const normalizedWords = useMemo(
    () =>
      rounds.map((r, idx) =>
        String(wordsByRound[idx] || '')
          .trim()
          .toUpperCase()
          .slice(0, r.wordLength)
      ),
    [rounds, wordsByRound]
  );

  const isAllComplete = useMemo(
    () => rounds.every((r, idx) => (normalizedWords[idx] || '').length === r.wordLength),
    [rounds, normalizedWords]
  );

  const serializedAnswer = useMemo(() => {
    if (!isAllComplete) return '';
    if (roundCount === 1) {
      return normalizedWords[0];
    }
    return `WORDGUESS:${normalizedWords.join('-')}`;
  }, [isAllComplete, roundCount, normalizedWords]);

  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      onDraftChange({
        gameType: 'wordGuess',
        answer: serializedAnswer,
        word: serializedAnswer,
        words: normalizedWords,
        isComplete: isAllComplete,
        isValid: isAllComplete,
      });
    }
  }, [serializedAnswer, normalizedWords, isAllComplete, onDraftChange]);

  const handleAppendLetter = useCallback(
    (roundIdx, letter) => {
      if (isLocked) return;
      const roundSpec = rounds[roundIdx];
      if (!roundSpec) return;

      setActiveRoundIdx(roundIdx);
      setWordsByRound((prev) => {
        const current = String(prev[roundIdx] || '');
        if (current.length >= roundSpec.wordLength) return prev;
        const updatedWord = (current + String(letter).toUpperCase()).slice(
          0,
          roundSpec.wordLength
        );
        const next = [...prev];
        next[roundIdx] = updatedWord;

        // Auto-advance focus to next incomplete word when current word is filled
        if (updatedWord.length === roundSpec.wordLength && roundCount > 1) {
          const nextIncomplete = rounds.findIndex(
            (r, idx) => idx !== roundIdx && (next[idx] || '').length < r.wordLength
          );
          if (nextIncomplete >= 0) {
            setTimeout(() => setActiveRoundIdx(nextIncomplete), 60);
          }
        }
        return next;
      });
    },
    [isLocked, rounds, roundCount]
  );

  const handleBackspace = useCallback(
    (roundIdx) => {
      if (isLocked) return;
      setActiveRoundIdx(roundIdx);
      setWordsByRound((prev) => {
        const current = String(prev[roundIdx] || '');
        if (!current) return prev;
        const next = [...prev];
        next[roundIdx] = current.slice(0, -1);
        return next;
      });
    },
    [isLocked]
  );

  const handleClearRound = useCallback(
    (roundIdx) => {
      if (isLocked) return;
      setActiveRoundIdx(roundIdx);
      setWordsByRound((prev) => {
        const next = [...prev];
        next[roundIdx] = '';
        return next;
      });
    },
    [isLocked]
  );

  const handleDirectInputChange = (roundIdx, e) => {
    if (isLocked) return;
    const roundSpec = rounds[roundIdx];
    if (!roundSpec) return;
    const cleaned = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9_-]/g, '')
      .slice(0, roundSpec.wordLength);

    setActiveRoundIdx(roundIdx);
    setWordsByRound((prev) => {
      const next = [...prev];
      next[roundIdx] = cleaned;
      return next;
    });
  };

  // Physical keyboard support for the active word round when not typing inside input
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isLocked) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      const safeIdx = Math.min(roundCount - 1, Math.max(0, activeRoundIdx));
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleAppendLetter(safeIdx, e.key.toUpperCase());
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspace(safeIdx);
      } else if (e.key === 'Tab' && roundCount > 1) {
        e.preventDefault();
        setActiveRoundIdx((prev) => (prev + 1) % roundCount);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLocked, activeRoundIdx, roundCount, handleAppendLetter, handleBackspace]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!isAllComplete || !serializedAnswer || isLocked) return;
    onSubmitAnswer({
      gameType: 'wordGuess',
      answer: serializedAnswer,
      word: serializedAnswer,
      words: normalizedWords,
    });
  };

  return (
    <div className="space-y-5 select-none">
      {/* Multi-Round Summary Header when 2+ words */}
      {roundCount > 1 && (
        <div className="p-3.5 border-2 border-nexus-ink bg-nexus-paper flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="font-bold uppercase tracking-wider text-nexus-ink">
            UNSCRAMBLE ALL {roundCount} CYBER WORDS BELOW TO COMPLETE CHALLENGE
          </span>
          <div className="flex items-center gap-2">
            {rounds.map((r, idx) => {
              const wordVal = normalizedWords[idx] || '';
              const done = wordVal.length === r.wordLength;
              const isFocused = activeRoundIdx === idx;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveRoundIdx(idx)}
                  className={`px-2.5 py-1 border font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    done
                      ? 'bg-emerald-600 text-white border-nexus-ink'
                      : isFocused
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink/40'
                  }`}
                >
                  {r.label}: {wordVal.length}/{r.wordLength} {done ? '✓' : ''}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Render Each Word Round */}
      <div className="space-y-5">
        {rounds.map((roundSpec, roundIdx) => {
          const currentWord = normalizedWords[roundIdx] || '';
          const characters = currentWord.split('');
          const isRoundComplete = currentWord.length === roundSpec.wordLength;
          const isFocusedRound = activeRoundIdx === roundIdx;

          // Track which scrambled tiles have been used so far in this word
          const remainingCounts = {};
          for (const ch of characters) {
            remainingCounts[ch] = (remainingCounts[ch] || 0) + 1;
          }

          return (
            <div
              key={roundSpec.id}
              onClick={() => setActiveRoundIdx(roundIdx)}
              className={`border-2 transition-colors ${
                isFocusedRound
                  ? 'border-nexus-crimson bg-nexus-paper'
                  : 'border-nexus-ink bg-nexus-paper/90'
              }`}
            >
              {/* Clue & Progress Header */}
              <div className="p-4 border-b-2 border-nexus-ink bg-nexus-paper space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold uppercase">
                  <div className="flex items-center gap-2">
                    {roundCount > 1 && (
                      <span
                        className={`px-2 py-0.5 border border-nexus-ink text-[11px] ${
                          isFocusedRound
                            ? 'bg-nexus-crimson text-white'
                            : 'bg-nexus-ink text-nexus-paper'
                        }`}
                      >
                        {roundSpec.label}
                      </span>
                    )}
                    <span className="text-nexus-crimson">{roundSpec.categoryHint}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
                      {characters.length} / {roundSpec.wordLength} LETTERS
                    </span>
                    {isRoundComplete && (
                      <span className="px-2.5 py-0.5 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-nexus-crimson" />
                        READY
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-editorial text-base sm:text-lg font-semibold text-nexus-ink leading-relaxed">
                  {roundSpec.cipherClue}
                </p>

                {roundSpec.maskedPattern && (
                  <div className="pt-1 flex items-center gap-2 font-mono text-xs">
                    <span className="text-nexus-muted uppercase text-[10px] font-bold">
                      PATTERN CLUE:
                    </span>
                    <span className="px-2.5 py-1 bg-nexus-ink text-nexus-crimson font-bold tracking-[0.22em]">
                      {roundSpec.maskedPattern}
                    </span>
                  </div>
                )}
              </div>

              {/* Letter Slot Tiles + Scrambled Letter Rack */}
              <div className="p-4 sm:p-5 bg-nexus-ink text-nexus-paper space-y-4">
                <div
                  className="grid gap-2 max-w-lg mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(
                      roundSpec.wordLength,
                      10
                    )}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: roundSpec.wordLength }).map((_, idx) => {
                    const char = characters[idx] || '';
                    const isNextSlot = isFocusedRound && idx === characters.length;

                    return (
                      <motion.div
                        key={`slot-${roundSpec.id}-${idx}`}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                borderColor: char
                                  ? '#C8191E'
                                  : isNextSlot
                                    ? '#ECE7DF'
                                    : 'rgba(236,231,223,0.25)',
                              }
                        }
                        transition={{ duration: 0.14 }}
                        className={`h-12 sm:h-14 border-2 flex items-center justify-center font-display text-2xl sm:text-3xl uppercase select-none ${
                          char
                            ? 'bg-nexus-crimson text-white border-nexus-crimson'
                            : isNextSlot
                              ? 'bg-white/10 text-nexus-paper border-nexus-paper'
                              : 'bg-black/40 text-nexus-paper/40 border-nexus-paper/20'
                        }`}
                      >
                        {char || '_'}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Scrambled Letter Tile Bank */}
                <div className="pt-1 space-y-2 max-w-lg mx-auto">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-nexus-paper/65 text-center">
                    TAP SCRAMBLED TILES OR TYPE DIRECTLY BELOW
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {roundSpec.scrambledLetters.map((letter, idx) => {
                      const isTileUsed =
                        remainingCounts[letter] && remainingCounts[letter] > 0
                          ? Boolean(remainingCounts[letter]--)
                          : false;

                      return (
                        <motion.button
                          key={`${roundSpec.id}-${letter}-${idx}`}
                          type="button"
                          whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                          disabled={
                            isLocked || characters.length >= roundSpec.wordLength
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAppendLetter(roundIdx, letter);
                          }}
                          className={`w-11 h-11 border-2 font-display text-xl uppercase transition-colors cursor-pointer disabled:opacity-40 ${
                            isTileUsed
                              ? 'border-nexus-paper/25 bg-black/50 text-nexus-paper/45 hover:bg-nexus-crimson hover:text-white'
                              : 'border-nexus-paper/40 bg-nexus-paper text-nexus-ink hover:bg-nexus-crimson hover:text-white hover:border-nexus-crimson'
                          }`}
                        >
                          {letter}
                        </motion.button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBackspace(roundIdx);
                      }}
                      disabled={isLocked || characters.length === 0}
                      className="px-3 h-11 border-2 border-nexus-paper/30 bg-black/60 text-nexus-paper hover:border-nexus-crimson font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-40"
                      title="Backspace"
                    >
                      <Delete className="w-4 h-4 text-nexus-crimson" />
                      <span>DEL</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearRound(roundIdx);
                      }}
                      disabled={isLocked || characters.length === 0}
                      className="px-3 h-11 border-2 border-nexus-paper/30 bg-black/60 text-nexus-paper hover:border-nexus-crimson font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-40"
                      title="Clear Word"
                    >
                      <RotateCcw className="w-4 h-4 text-nexus-crimson" />
                      <span>CLEAR</span>
                    </button>
                  </div>
                </div>

                {/* Direct Input for this round */}
                <div className="max-w-lg mx-auto pt-1">
                  <input
                    type="text"
                    value={currentWord}
                    onFocus={() => setActiveRoundIdx(roundIdx)}
                    onChange={(e) => handleDirectInputChange(roundIdx, e)}
                    placeholder={`TYPE ${roundSpec.label} (${roundSpec.wordLength} LETTERS)...`}
                    aria-label={`Type ${roundSpec.label}`}
                    className="w-full min-h-[44px] px-3.5 py-2 bg-nexus-paper border-2 border-nexus-paper/40 font-mono text-sm font-bold uppercase tracking-widest text-nexus-ink focus:border-nexus-crimson focus:outline-none"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex justify-end">
        <button
          type="submit"
          disabled={isLocked || !isAllComplete}
          className="w-full min-h-[50px] px-6 py-3 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>
            {actionPending
              ? 'SUBMITTING...'
              : roundCount > 1
                ? `SUBMIT ALL ${roundCount} WORDS`
                : 'SUBMIT WORD'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default WordGuessGame;
