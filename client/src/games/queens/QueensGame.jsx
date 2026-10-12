import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Crown,
  X,
  RotateCcw,
  Undo2,
  CheckCircle2,
  AlertTriangle,
  Send,
  Lock,
  Eraser,
} from 'lucide-react';
import {
  normalizeQueensConfig,
  validateQueensBoardClient,
  serializeQueensSubmission,
} from './queensLogic';

const REGION_COLORS = [
  'bg-amber-500/20',
  'bg-sky-500/20',
  'bg-emerald-500/20',
  'bg-purple-500/20',
  'bg-rose-500/20',
  'bg-teal-500/20',
  'bg-indigo-500/20',
  'bg-orange-500/20',
  'bg-lime-500/20',
];

export const QueensGame = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizeQueensConfig(gameConfig), [gameConfig]);
  const { size, givenQueens, regions, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const givenKeySet = useMemo(
    () => new Set(givenQueens.map((q) => `${q.r}-${q.c}`)),
    [givenQueens]
  );

  const givensSignature = useMemo(
    () => `${size}:${givenQueens.map((q) => `${q.r},${q.c}`).join(';')}`,
    [size, givenQueens]
  );

  const [queens, setQueens] = useState(() => [...givenQueens]);
  const [markedCells, setMarkedCells] = useState(() => new Set());
  const [history, setHistory] = useState([]);
  const [toolMode, setToolMode] = useState('QUEEN'); // 'QUEEN' | 'MARK'

  useEffect(() => {
    setQueens([...givenQueens]);
    setMarkedCells(new Set());
    setHistory([]);
    setToolMode('QUEEN');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.challengeId, session?.attemptId, givensSignature]);

  const validation = useMemo(
    () => validateQueensBoardClient(queens, config),
    [queens, config]
  );

  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const serialized = serializeQueensSubmission(queens);
      onDraftChange({
        gameType: 'queens',
        answer: validation.isComplete ? serialized : '',
        queens,
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
    }
  }, [queens, validation.isComplete, validation.isValid, onDraftChange]);

  const pushHistory = useCallback((currQueens, currMarks) => {
    setHistory((prev) => [
      ...prev.slice(-25),
      {
        queens: [...currQueens],
        marks: new Set(currMarks),
      },
    ]);
  }, []);

  const toggleManualMark = (r, c) => {
    if (isLocked) return;
    const key = `${r}-${c}`;
    if (givenKeySet.has(key)) return;
    if (queens.some((q) => q.r === r && q.c === c)) return;

    pushHistory(queens, markedCells);
    setMarkedCells((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleCellTap = (r, c) => {
    if (isLocked) return;
    const key = `${r}-${c}`;
    if (givenKeySet.has(key)) return;

    const existingQueenIdx = queens.findIndex((q) => q.r === r && q.c === c);

    // If cell already has a Queen, tapping it removes the Queen
    if (existingQueenIdx >= 0) {
      pushHistory(queens, markedCells);
      setQueens((prev) => prev.filter((_, idx) => idx !== existingQueenIdx));
      return;
    }

    if (toolMode === 'MARK') {
      toggleManualMark(r, c);
      return;
    }

    // QUEEN mode: place Queen (replacing any manual X mark on that cell)
    if (queens.length >= size) {
      // Allow replacing if user taps a cell in the same row as a non-given queen
      const sameRowIdx = queens.findIndex(
        (q) => q.r === r && !givenKeySet.has(`${q.r}-${q.c}`)
      );
      if (sameRowIdx >= 0) {
        pushHistory(queens, markedCells);
        setQueens((prev) => {
          const next = [...prev];
          next[sameRowIdx] = { r, c };
          return next;
        });
        setMarkedCells((prev) => {
          if (!prev.has(key)) return prev;
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
      return;
    }

    pushHistory(queens, markedCells);
    setQueens((prev) => [...prev, { r, c }]);
    setMarkedCells((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const handleClearMarks = () => {
    if (isLocked || markedCells.size === 0) return;
    pushHistory(queens, markedCells);
    setMarkedCells(new Set());
  };

  const handleUndo = () => {
    if (isLocked || history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setQueens(last.queens);
    setMarkedCells(last.marks);
  };

  const handleReset = () => {
    if (isLocked) return;
    pushHistory(queens, markedCells);
    setQueens([...givenQueens]);
    setMarkedCells(new Set());
  };

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'queens',
      answer: serializeQueensSubmission(queens),
      queens,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-5 select-none">
      {/* Instructions & Status Header */}
      <div className="p-3.5 sm:p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-editorial text-xs sm:text-sm text-nexus-charcoal leading-snug">
            {instructions}
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] text-nexus-muted">
            RULE: 1 Queen per Row, 1 per Column, and no two Queens on the same Diagonal. Switch to ADD MARKING (X) to manually mark blocked squares.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs font-bold uppercase">
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
            {validation.queensCount} / {validation.targetCount} QUEENS
          </span>
          {validation.hasConflicts ? (
            <span className="px-2.5 py-1 bg-nexus-crimson text-white inline-flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              CONFLICT
            </span>
          ) : validation.isValid ? (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-nexus-crimson" />
              VALID SOLUTION
            </span>
          ) : null}
        </div>
      </div>

      {/* Mode Switcher Bar: PLACE QUEEN vs ADD MARKING (X) */}
      <div className="max-w-[420px] mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex border-2 border-nexus-ink bg-nexus-paper">
          <button
            type="button"
            disabled={isLocked}
            onClick={() => setToolMode('QUEEN')}
            className={`px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer touch-manipulation ${
              toolMode === 'QUEEN'
                ? 'bg-nexus-crimson text-white'
                : 'bg-nexus-paper text-nexus-ink hover:bg-nexus-paper-elevated'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>PLACE QUEEN</span>
          </button>
          <button
            type="button"
            disabled={isLocked}
            onClick={() => setToolMode('MARK')}
            className={`px-3 py-1.5 border-l-2 border-nexus-ink font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer touch-manipulation ${
              toolMode === 'MARK'
                ? 'bg-nexus-ink text-nexus-paper'
                : 'bg-nexus-paper text-nexus-ink hover:bg-nexus-paper-elevated'
            }`}
          >
            <X className="w-3.5 h-3.5" />
            <span>ADD MARKING (X)</span>
          </button>
        </div>

        <button
          type="button"
          disabled={isLocked || markedCells.size === 0}
          onClick={handleClearMarks}
          className="px-2.5 py-1.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <Eraser className="w-3.5 h-3.5 text-nexus-crimson" />
          <span>CLEAR MARKS ({markedCells.size})</span>
        </button>
      </div>

      {/* N-QUEENS Interactive Board (No automatic markings when placing a Queen) */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-[420px] aspect-square border-4 border-nexus-ink bg-nexus-ink shadow-brutal grid gap-0.5 p-0.5 touch-manipulation"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
          }}
          role="grid"
          aria-label={`${size} by ${size} N-Queens Board`}
        >
          {Array.from({ length: size }).map((_, r) =>
            Array.from({ length: size }).map((__, c) => {
              const key = `${r}-${c}`;
              const isGiven = givenKeySet.has(key);
              const hasQueen = queens.some((q) => q.r === r && q.c === c);
              const isConflict = validation.conflictKeys.has(key);
              const isMarked = markedCells.has(key);
              const isDarkSquare = (r + c) % 2 === 1;
              const regionId = regions?.[r]?.[c];

              const baseBg =
                regionId !== undefined
                  ? REGION_COLORS[Number(regionId) % REGION_COLORS.length]
                  : isDarkSquare
                    ? 'bg-nexus-paper-elevated'
                    : 'bg-nexus-paper';

              return (
                <button
                  key={key}
                  type="button"
                  disabled={isLocked}
                  onClick={() => handleCellTap(r, c)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    toggleManualMark(r, c);
                  }}
                  aria-label={`Row ${r + 1} Column ${c + 1}${
                    hasQueen ? ', Queen placed' : isMarked ? ', Marked X' : ''
                  }`}
                  className={`relative flex items-center justify-center transition-colors cursor-pointer touch-manipulation ${
                    hasQueen
                      ? isConflict
                        ? 'bg-nexus-crimson text-white ring-2 ring-inset ring-white animate-pulse'
                        : isGiven
                          ? 'bg-nexus-ink text-nexus-paper'
                          : 'bg-nexus-ink text-white border border-nexus-crimson'
                      : `${baseBg} hover:bg-nexus-crimson/15 text-nexus-ink`
                  }`}
                >
                  {/* Coordinate label on top/left edge */}
                  {c === 0 && (
                    <span className="absolute top-0.5 left-1 font-mono text-[8px] opacity-45 pointer-events-none">
                      {r + 1}
                    </span>
                  )}
                  {r === 0 && (
                    <span className="absolute top-0.5 right-1 font-mono text-[8px] opacity-45 pointer-events-none">
                      {String.fromCharCode(65 + c)}
                    </span>
                  )}

                  {hasQueen ? (
                    <div className="flex flex-col items-center justify-center">
                      <Crown
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          isConflict
                            ? 'text-white'
                            : isGiven
                              ? 'text-amber-400'
                              : 'text-nexus-crimson'
                        }`}
                      />
                      {isGiven && (
                        <span className="font-mono text-[7px] uppercase tracking-widest text-amber-300 flex items-center gap-0.5">
                          <Lock className="w-2 h-2" /> LOCKED
                        </span>
                      )}
                    </div>
                  ) : isMarked ? (
                    <X className="w-5 h-5 text-nexus-crimson font-bold" />
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="max-w-[420px] mx-auto grid grid-cols-3 gap-2">
        <button
          type="button"
          disabled={isLocked || history.length === 0}
          onClick={handleUndo}
          className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <Undo2 className="w-4 h-4 text-nexus-crimson" />
          <span>UNDO</span>
        </button>

        <button
          type="button"
          disabled={isLocked || (queens.length <= givenQueens.length && markedCells.size === 0)}
          onClick={handleReset}
          className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <RotateCcw className="w-4 h-4 text-nexus-crimson" />
          <span>RESET</span>
        </button>

        <button
          type="button"
          disabled={isLocked || !validation.isComplete}
          onClick={handleSubmit}
          className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <Send className="w-4 h-4" />
          <span>SUBMIT</span>
        </button>
      </div>
    </div>
  );
};

export default QueensGame;
