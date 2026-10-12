import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RotateCcw, Eraser, CheckCircle2, AlertTriangle, Send, Lock } from 'lucide-react';
import {
  normalizeSudokuConfig,
  validateSudokuBoardClient,
  serializeSudokuSubmission,
} from './sudokuLogic';

export const SudokuGame = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizeSudokuConfig(gameConfig), [gameConfig]);
  const { size, boxRows, boxCols, initialGrid, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const initialGridSignature = useMemo(
    () => initialGrid.map((r) => r.join(',')).join('/'),
    [initialGrid]
  );

  const [grid, setGrid] = useState(() => initialGrid.map((row) => [...row]));
  const [selectedCell, setSelectedCell] = useState(() => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (initialGrid[r]?.[c] === 0) return { r, c };
      }
    }
    return { r: 0, c: 0 };
  });

  // Reset and sync board whenever challenge, attempt, or authoritative initialGrid changes
  useEffect(() => {
    setGrid(initialGrid.map((row) => [...row]));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (initialGrid[r]?.[c] === 0) {
          setSelectedCell({ r, c });
          return;
        }
      }
    }
    setSelectedCell({ r: 0, c: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.challengeId, session?.attemptId, initialGridSignature]);

  const validation = useMemo(
    () => validateSudokuBoardClient(grid, config),
    [grid, config]
  );

  // Sync draft payload with parent session page
  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const serialized = serializeSudokuSubmission(grid);
      onDraftChange({
        gameType: 'sudoku',
        answer: validation.isComplete ? serialized : '',
        grid,
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
    }
  }, [grid, validation.isComplete, validation.isValid, onDraftChange]);

  const handleSetCellValue = useCallback(
    (num) => {
      if (isLocked || !selectedCell) return;
      const { r, c } = selectedCell;
      if (Number(initialGrid[r]?.[c] || 0) > 0) return; // Given cells cannot be modified

      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        if (!next[r]) return prev;
        // Tapping the same number on the pad toggles it off if num > 0
        next[r][c] = num > 0 && next[r][c] === num ? 0 : num;
        return next;
      });
    },
    [isLocked, selectedCell, initialGrid]
  );

  const handleResetGrid = () => {
    if (isLocked) return;
    setGrid(initialGrid.map((row) => [...row]));
  };

  // Keyboard support for desktop players
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isLocked || !selectedCell) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      const { r, c } = selectedCell;

      if (e.key >= '1' && e.key <= String(size)) {
        e.preventDefault();
        if (Number(initialGrid[r]?.[c] || 0) === 0) {
          const digit = Number(e.key);
          setGrid((prev) => {
            const next = prev.map((row) => [...row]);
            if (next[r]) next[r][c] = digit;
            return next;
          });
        }
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        e.preventDefault();
        handleSetCellValue(0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCell({ r: (r - 1 + size) % size, c });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCell({ r: (r + 1) % size, c });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedCell({ r, c: (c - 1 + size) % size });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedCell({ r, c: (c + 1) % size });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLocked, selectedCell, size, initialGrid, handleSetCellValue]);

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'sudoku',
      answer: serializeSudokuSubmission(grid),
      grid,
    });
  };

  const selectedValue = selectedCell ? Number(grid[selectedCell.r]?.[selectedCell.c] || 0) : 0;
  const isSelectedCellGiven = selectedCell
    ? Number(initialGrid[selectedCell.r]?.[selectedCell.c] || 0) > 0
    : false;

  return (
    <div className="space-y-5 select-none">
      {/* Instructions & Progress Bar */}
      <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-editorial text-sm text-nexus-charcoal leading-snug">
            {instructions}
          </p>
          <p className="font-mono text-[10px] text-nexus-muted uppercase">
            TAP AN EMPTY CELL AND SELECT A NUMBER (1–{size}) BELOW OR TYPE ON YOUR KEYBOARD.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 font-mono text-xs font-bold">
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
            {validation.filledCount} / {validation.totalCells} CELLS
          </span>
          {validation.conflicts?.size > 0 && (
            <span className="px-2.5 py-1 bg-nexus-crimson text-white inline-flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              {validation.conflicts.size} CONFLICT{validation.conflicts.size > 1 ? 'S' : ''}
            </span>
          )}
          {validation.isValid && (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-nexus-crimson" />
              READY
            </span>
          )}
        </div>
      </div>

      {/* Sudoku Grid */}
      <div className="flex justify-center">
        <div
          className="border-4 border-nexus-ink bg-nexus-ink shadow-brutal w-full max-w-[440px] aspect-square grid"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
          }}
          role="grid"
          aria-label={`${size} by ${size} Sudoku Grid`}
        >
          {Array.from({ length: size }).map((_, r) =>
            Array.from({ length: size }).map((__, c) => {
              const val = Number(grid[r]?.[c] || 0);
              const isGiven = Number(initialGrid[r]?.[c] || 0) > 0;
              const isSelected = selectedCell?.r === r && selectedCell?.c === c;
              const isSameRowOrCol =
                selectedCell && (selectedCell.r === r || selectedCell.c === c);
              const isSameValue = selectedValue > 0 && val === selectedValue;
              const isConflict = validation.conflicts?.has(`${r}-${c}`);

              // Thick sub-box borders
              const borderRight =
                (c + 1) % boxCols === 0 && c < size - 1
                  ? 'border-r-[3px] border-r-nexus-ink'
                  : 'border-r border-r-nexus-ink/25';
              const borderBottom =
                (r + 1) % boxRows === 0 && r < size - 1
                  ? 'border-b-[3px] border-b-nexus-ink'
                  : 'border-b border-b-nexus-ink/25';

              let cellBg = 'bg-nexus-paper text-nexus-ink hover:bg-nexus-crimson/10';
              if (isConflict) {
                cellBg = 'bg-nexus-crimson text-white';
              } else if (isSelected) {
                cellBg = 'bg-nexus-ink text-white ring-2 ring-inset ring-nexus-crimson';
              } else if (isSameValue) {
                cellBg = 'bg-nexus-crimson/20 text-nexus-ink';
              } else if (isGiven) {
                cellBg = 'bg-nexus-paper-elevated text-nexus-ink/90';
              } else if (isSameRowOrCol) {
                cellBg = 'bg-nexus-paper/95 text-nexus- crimson';
              }

              const textTone =
                !isGiven && val > 0 && !isSelected && !isConflict
                  ? 'text-nexus-crimson font-extrabold'
                  : isGiven
                    ? 'font-black'
                    : 'font-bold';

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => setSelectedCell({ r, c })}
                  aria-label={`Row ${r + 1} Column ${c + 1}, ${
                    val > 0 ? `value ${val}` : 'empty'
                  }${isGiven ? ', locked' : ''}`}
                  className={`relative flex items-center justify-center font-mono ${
                    size === 9 ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                  } ${textTone} transition-colors cursor-pointer focus:outline-none touch-manipulation ${borderRight} ${borderBottom} ${cellBg}`}
                >
                  {val > 0 ? val : ''}
                  {isGiven && (
                    <Lock className="absolute top-0.5 right-0.5 w-2.5 h-2.5 opacity-25 pointer-events-none" />
                  )}
                  {!isGiven && val > 0 && !isSelected && !isConflict && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-nexus-crimson" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Touch-Friendly Number Pad & Controls */}
      <div className="max-w-[440px] mx-auto space-y-3">
        {isSelectedCellGiven && (
          <div className="px-3 py-1.5 border border-nexus-ink/40 bg-nexus-paper-elevated font-mono text-[11px] text-nexus-muted text-center uppercase">
            SELECTED CELL IS LOCKED (GIVEN CLUE) — TAP AN EMPTY CELL TO ENTER A NUMBER
          </div>
        )}

        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${size <= 6 ? size : 5}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: size }, (_, i) => i + 1).map((num) => {
            const isCurrentVal = !isSelectedCellGiven && selectedValue === num;
            return (
              <button
                key={num}
                type="button"
                disabled={isLocked || !selectedCell || isSelectedCellGiven}
                onClick={() => handleSetCellValue(num)}
                className={`min-h-[48px] py-2.5 border-2 border-nexus-ink font-display text-2xl transition-colors cursor-pointer disabled:opacity-40 touch-manipulation ${
                  isCurrentVal
                    ? 'bg-nexus-crimson text-white'
                    : 'bg-nexus-paper text-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper active:bg-nexus-crimson active:text-white'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            disabled={isLocked || !selectedCell || isSelectedCellGiven}
            onClick={() => handleSetCellValue(0)}
            className="min-h-[44px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
          >
            <Eraser className="w-4 h-4 text-nexus-crimson" />
            <span>ERASE CELL</span>
          </button>

          <button
            type="button"
            disabled={isLocked}
            onClick={handleResetGrid}
            className="min-h-[44px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
          >
            <RotateCcw className="w-4 h-4 text-nexus-crimson" />
            <span>RESET BOARD</span>
          </button>

          <button
            type="button"
            disabled={isLocked || !validation.isComplete}
            onClick={handleSubmit}
            className="col-span-2 sm:col-span-1 min-h-[44px] px-4 py-2 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
          >
            <Send className="w-4 h-4" />
            <span>SUBMIT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SudokuGame;
