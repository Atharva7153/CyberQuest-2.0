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
  const { wordLength, cipherClue, categoryHint, maskedPattern, scrambledLetters } = config;

  const [characters, setCharacters] = useState([]);
  const isLocked = Boolean(actionPending || disabled);

  // Only reset character buffer when challengeId or attemptId changes
  useEffect(() => {
    setCharacters([]);
  }, [challenge?.challengeId, session?.attemptId]);

  const currentWord = characters.join('');
  const isComplete = currentWord.length === wordLength;

  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      onDraftChange({
        gameType: 'wordGuess',
        answer: currentWord.trim(),
        word: currentWord.trim(),
        isComplete,
        isValid: isComplete,
      });
    }
  }, [currentWord, isComplete, onDraftChange]);

  const handleAppendLetter = useCallback(
    (letter) => {
      if (isLocked) return;
      setCharacters((prev) => {
        if (prev.length >= wordLength) return prev;
        return [...prev, String(letter).toUpperCase()];
      });
    },
    [isLocked, wordLength]
  );

  const handleBackspace = useCallback(() => {
    if (isLocked) return;
    setCharacters((prev) => prev.slice(0, -1));
  }, [isLocked]);

  const handleClear = useCallback(() => {
    if (isLocked) return;
    setCharacters([]);
  }, [isLocked]);

  const handleDirectInputChange = (e) => {
    if (isLocked) return;
    const cleaned = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9_-]/g, '')
      .slice(0, wordLength);
    setCharacters(cleaned.split(''));
  };

  // Physical keyboard support when not typing inside input
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isLocked) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleAppendLetter(e.key.toUpperCase());
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspace();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLocked, handleAppendLetter, handleBackspace]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!currentWord.trim() || isLocked) return;
    onSubmitAnswer({
      gameType: 'wordGuess',
      answer: currentWord.trim(),
      word: currentWord.trim(),
    });
  };

  return (
    <div className="space-y-5 select-none">
      {/* Clue & Progress Header */}
      <div className="p-4 border-2 border-nexus-ink bg-nexus-paper space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold uppercase">
          <span className="text-nexus-crimson">{categoryHint}</span>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
              {characters.length} / {wordLength} LETTERS
            </span>
            {isComplete && (
              <span className="px-2.5 py-0.5 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-nexus-crimson" />
                READY
              </span>
            )}
          </div>
        </div>

        <p className="font-editorial text-base sm:text-lg font-semibold text-nexus-ink leading-relaxed">
          {cipherClue}
        </p>

        {maskedPattern && (
          <div className="pt-1 flex items-center gap-2 font-mono text-xs">
            <span className="text-nexus-muted uppercase text-[10px] font-bold">PATTERN CLUE:</span>
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-crimson font-bold tracking-[0.22em]">
              {maskedPattern}
            </span>
          </div>
        )}
      </div>

      {/* Letter Slot Tiles + Scrambled Letter Rack */}
      <div className="p-5 bg-nexus-ink text-nexus-paper border-4 border-nexus-ink shadow-brutal space-y-4">
        <div
          className="grid gap-2 max-w-lg mx-auto"
          style={{
            gridTemplateColumns: `repeat(${Math.min(wordLength, 10)}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: wordLength }).map((_, idx) => {
            const char = characters[idx] || '';
            const isNextSlot = idx === characters.length;

            return (
              <motion.div
                key={`slot-${idx}`}
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
        <div className="pt-2 space-y-2 max-w-lg mx-auto">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-nexus-paper/65 text-center">
            TAP LETTERS OR TYPE ON KEYBOARD
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {scrambledLetters.map((letter, idx) => (
              <motion.button
                key={`${letter}-${idx}`}
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                disabled={isLocked || characters.length >= wordLength}
                onClick={() => handleAppendLetter(letter)}
                className="w-11 h-11 border-2 border-nexus-paper/40 bg-nexus-paper text-nexus-ink hover:bg-nexus-crimson hover:text-white hover:border-nexus-crimson font-display text-xl uppercase transition-colors cursor-pointer disabled:opacity-40"
              >
                {letter}
              </motion.button>
            ))}

            <button
              type="button"
              onClick={handleBackspace}
              disabled={isLocked || characters.length === 0}
              className="px-3 h-11 border-2 border-nexus-paper/30 bg-black/60 text-nexus-paper hover:border-nexus-crimson font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-40"
              title="Backspace"
            >
              <Delete className="w-4 h-4 text-nexus-crimson" />
              <span>DEL</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={isLocked || characters.length === 0}
              className="px-3 h-11 border-2 border-nexus-paper/30 bg-black/60 text-nexus-paper hover:border-nexus-crimson font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-40"
              title="Clear Word"
            >
              <RotateCcw className="w-4 h-4 text-nexus-crimson" />
              <span>CLEAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct Input & Submit */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          value={currentWord}
          onChange={handleDirectInputChange}
          placeholder={`TYPE ${wordLength}-LETTER WORD...`}
          aria-label="Type guessed word"
          className="flex-1 min-h-[48px] px-3.5 py-2.5 bg-nexus-paper border-2 border-nexus-ink font-mono text-sm font-bold uppercase tracking-widest text-nexus-ink focus:border-nexus-crimson focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLocked || !currentWord.trim()}
          className="min-h-[48px] px-6 py-2.5 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>{actionPending ? 'SUBMITTING...' : 'SUBMIT WORD'}</span>
        </button>
      </form>
    </div>
  );
};

export default WordGuessGame;
