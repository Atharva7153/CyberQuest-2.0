import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Delete, RotateCcw, Send, Terminal } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * WordGuessGame (`gameType: "wordGuess"`)
 * Phase 7 Deliverable Test Game:
 * - Driven entirely by `gameConfig` from the Challenge Session
 * - Client never knows or validates the secret word; submits candidate answer to server
 */
export const WordGuessGame = ({
  challenge,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const wordLength = Number(gameConfig.wordLength) || 7;
  const cipherClue =
    gameConfig.cipherClue ||
    challenge?.description ||
    'Decode the classified NEXUS transmission codeword.';
  const categoryHint =
    gameConfig.categoryHint || `${challenge?.category || 'PUZZLES'} // ${wordLength} LETTERS`;
  const maskedPattern = gameConfig.maskedPattern || '';
  const letterBank = Array.isArray(gameConfig.scrambledLetters)
    ? gameConfig.scrambledLetters
    : ['P', 'A', 'Y', 'L', 'O', 'A', 'D', 'F', 'I', 'R', 'E', 'W'];

  const [characters, setCharacters] = useState([]);
  const isLocked = Boolean(actionPending || disabled);

  // Reset character buffer when switching challenges
  useEffect(() => {
    setCharacters([]);
  }, [challenge?.challengeId, wordLength]);

  const currentWord = characters.join('');

  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      onDraftChange({
        gameType: 'wordGuess',
        answer: currentWord.trim(),
      });
    }
  }, [currentWord, onDraftChange]);

  const handleAppendLetter = (letter) => {
    if (isLocked) return;
    setCharacters((prev) => {
      if (prev.length >= wordLength) return prev;
      return [...prev, String(letter).toUpperCase()];
    });
  };

  const handleBackspace = () => {
    if (isLocked) return;
    setCharacters((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isLocked) return;
    setCharacters([]);
  };

  const handleDirectInputChange = (e) => {
    if (isLocked) return;
    const cleaned = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9_-]/g, '')
      .slice(0, wordLength);
    setCharacters(cleaned.split(''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord.trim() || isLocked) return;
    onSubmitAnswer({
      gameType: 'wordGuess',
      answer: currentWord.trim(),
    });
  };

  return (
    <div className="space-y-4">
      {/* Classified Intercept Clue Box */}
      <div className="p-4 border-2 border-nexus-ink bg-nexus-paper space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-nexus-muted border-b border-dashed border-nexus-ink/25 pb-1.5">
          <span className="flex items-center gap-1.5 text-nexus-crimson font-bold">
            <Terminal className="w-3.5 h-3.5" />
            INTERCEPTED CIPHER CLUE
          </span>
          <span>{categoryHint}</span>
        </div>

        <p className="font-editorial text-sm sm:text-base font-semibold text-nexus-ink leading-relaxed">
          {cipherClue}
        </p>

        {maskedPattern && (
          <div className="pt-1 flex items-center gap-2 font-mono text-xs">
            <span className="text-nexus-muted uppercase text-[10px]">PARTIAL TRACE:</span>
            <span className="px-2 py-0.5 bg-nexus-ink text-nexus-crimson font-bold tracking-[0.22em]">
              {maskedPattern}
            </span>
          </div>
        )}
      </div>

      {/* Character Slot Matrix */}
      <div className="p-4 bg-nexus-ink text-nexus-paper border-2 border-nexus-ink space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-paper/65">
          <span>DECRYPTION BUFFER ({characters.length} / {wordLength} CHARS)</span>
          <span>CLICK TILES OR TYPE BELOW</span>
        </div>

        <div
          className="grid gap-2"
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
                className={`h-11 sm:h-12 border-2 flex items-center justify-center font-mono text-lg sm:text-xl font-bold uppercase select-none ${
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
        <div className="pt-2 space-y-1.5">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-nexus-paper/60">
            SCRAMBLED SIGNAL TILES
          </span>
          <div className="flex flex-wrap gap-1.5">
            {letterBank.map((letter, idx) => (
              <motion.button
                key={`${letter}-${idx}`}
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                disabled={actionPending || characters.length >= wordLength}
                onClick={() => handleAppendLetter(letter)}
                className="w-9 h-9 border border-nexus-paper/35 bg-nexus-paper text-nexus-ink hover:bg-nexus-crimson hover:text-white hover:border-nexus-crimson font-mono text-sm font-bold uppercase transition-colors cursor-pointer disabled:opacity-40"
              >
                {letter}
              </motion.button>
            ))}

            <button
              type="button"
              onClick={handleBackspace}
              disabled={actionPending || characters.length === 0}
              className="px-2.5 h-9 border border-nexus-paper/30 bg-black/50 text-nexus-paper hover:border-nexus-crimson font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-40"
              title="Backspace"
            >
              <Delete className="w-3.5 h-3.5" />
              <span>DEL</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={actionPending || characters.length === 0}
              className="px-2.5 h-9 border border-nexus-paper/30 bg-black/50 text-nexus-paper hover:border-nexus-crimson font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-40"
              title="Clear Buffer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>CLEAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct Keyboard Input + Server-Authoritative Transmit Form */}
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div className="flex gap-2">
          <input
            type="text"
            value={currentWord}
            onChange={handleDirectInputChange}
            placeholder={`TYPE ${wordLength}-LETTER CODEWORD...`}
            aria-label="Type decoded word"
            className="flex-1 px-3 py-2.5 bg-nexus-paper border-2 border-nexus-ink font-mono text-xs font-bold uppercase tracking-widest text-nexus-ink focus:border-nexus-crimson focus:outline-none"
          />
          <button
            type="submit"
            disabled={actionPending || !currentWord.trim()}
            className="px-5 py-2.5 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{actionPending ? 'VALIDATING...' : 'SUBMIT ANSWER'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WordGuessGame;
