import React, { useState, useEffect, useMemo } from 'react';
import { RotateCcw, Undo2, CheckCircle2, AlertTriangle, Send, Grid } from 'lucide-react';
import {
  normalizePatchesConfig,
  normalizeRect,
  rectsOverlap,
  cellInRect,
  getRectArea,
  validatePatchesBoardClient,
  serializePatchesSubmission,
} from './patchesLogic';

const PATCH_PALETTE = [
  'bg-nexus-crimson/20 text-nexus-ink',
  'bg-nexus-ink/15 text-nexus-ink',
  'bg-amber-500/20 text-nexus-ink',
  'bg-emerald-600/20 text-nexus-ink',
  'bg-sky-600/20 text-nexus-ink',
  'bg-purple-600/20 text-nexus-ink',
  'bg-rose-500/25 text-nexus-ink',
  'bg-teal-600/20 text-nexus-ink',
];

export const PatchesGame = ({
  challenge,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizePatchesConfig(gameConfig), [gameConfig]);
  const { rows, cols, clues, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const [rectangles, setRectangles] = useState([]);
  const [anchorCell, setAnchorCell] = useState(null);
  const [hoverCell, setHoverCell] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setRectangles([]);
    setAnchorCell(null);
    setHoverCell(null);
    setIsDragging(false);
  }, [challenge?.challengeId, rows, cols]);

  const clueMap = useMemo(() => {
    const map = new Map();
    for (const cl of clues) {
      map.set(`${cl.r}-${cl.c}`, cl.size);
    }
    return map;
  }, [clues]);

  const validation = useMemo(
    () => validatePatchesBoardClient(rectangles, config),
    [rectangles, config]
  );

  // Sync draft with parent ChallengeSessionPage
  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const serialized = serializePatchesSubmission(rectangles);
      onDraftChange({
        gameType: 'patches',
        answer: validation.isComplete ? serialized : '',
        patches: rectangles,
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
    }
  }, [rectangles, validation.isComplete, validation.isValid, onDraftChange]);

  const commitRectangle = (rA, cA, rB, cB) => {
    const newRect = normalizeRect(rA, cA, rB, cB);
    setRectangles((prev) => {
      // Remove any existing rectangle that overlaps with the newly drawn rectangle
      const nonOverlapping = prev.filter((existing) => !rectsOverlap(existing, newRect));
      return [
        ...nonOverlapping,
        {
          ...newRect,
          id: `patch-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        },
      ];
    });
  };

  const handleCellPointerDown = (r, c) => {
    if (isLocked) return;
    setIsDragging(true);
    setAnchorCell({ r, c });
    setHoverCell({ r, c });
  };

  const handleCellPointerEnter = (r, c) => {
    if (isLocked) return;
    if (isDragging || anchorCell) {
      setHoverCell({ r, c });
    }
  };

  const handleCellPointerUp = (r, c) => {
    if (isLocked) return;
    if (!anchorCell) return;

    const sameCell = anchorCell.r === r && anchorCell.c === c;
    if (sameCell) {
      // If user tapped an existing multi-cell patch without dragging, remove that patch
      const existingIdx = rectangles.findIndex((rect) => cellInRect(r, c, rect));
      if (existingIdx >= 0) {
        setRectangles((prev) => prev.filter((_, i) => i !== existingIdx));
        setAnchorCell(null);
        setHoverCell(null);
        setIsDragging(false);
        return;
      }
      // Keep anchorCell active for 2-tap corner selection on mobile!
      setIsDragging(false);
      return;
    }

    commitRectangle(anchorCell.r, anchorCell.c, r, c);
    setAnchorCell(null);
    setHoverCell(null);
    setIsDragging(false);
  };

  const handleCellClick = (r, c) => {
    if (isLocked) return;
    // Supports two-tap mode on touch screens: Tap Corner 1, then Tap Corner 2
    if (anchorCell && (anchorCell.r !== r || anchorCell.c !== c)) {
      commitRectangle(anchorCell.r, anchorCell.c, r, c);
      setAnchorCell(null);
      setHoverCell(null);
      setIsDragging(false);
    }
  };

  const handleUndo = () => {
    if (isLocked) return;
    setAnchorCell(null);
    setHoverCell(null);
    setRectangles((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    if (isLocked) return;
    setAnchorCell(null);
    setHoverCell(null);
    setRectangles([]);
  };

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'patches',
      answer: serializePatchesSubmission(rectangles),
      patches: rectangles,
    });
  };

  const previewRect =
    anchorCell && hoverCell
      ? normalizeRect(anchorCell.r, anchorCell.c, hoverCell.r, hoverCell.c)
      : null;
  const previewArea = previewRect ? getRectArea(previewRect) : 0;

  return (
    <div
      className="space-y-5 select-none"
      onPointerUp={() => {
        if (isDragging && anchorCell && hoverCell) {
          if (anchorCell.r !== hoverCell.r || anchorCell.c !== hoverCell.c) {
            commitRectangle(anchorCell.r, anchorCell.c, hoverCell.r, hoverCell.c);
            setAnchorCell(null);
            setHoverCell(null);
          }
        }
        setIsDragging(false);
      }}
    >
      {/* Instructions & Status Header */}
      <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-editorial text-sm text-nexus-charcoal leading-snug">
            {instructions}
          </p>
          <p className="font-mono text-[11px] text-nexus-muted">
            TIP: Drag across cells OR tap two opposite corners to draw a rectangular patch. Tap a patch to remove it.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs font-bold uppercase">
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
            {validation.coveredCount} / {validation.totalCells} CELLS
          </span>
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
            {validation.validPatchCount} / {validation.totalClues} PATCHES
          </span>
          {validation.isValid && (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-nexus-crimson" />
              SOLVED
            </span>
          )}
        </div>
      </div>

      {/* Active Selection / Preview Banner */}
      <div className="max-w-[420px] mx-auto flex items-center justify-between px-3.5 py-2 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper font-mono text-xs">
        <span className="flex items-center gap-1.5">
          <Grid className="w-3.5 h-3.5 text-nexus-crimson" />
          {anchorCell
            ? `CORNER SELECTED (${anchorCell.r + 1},${anchorCell.c + 1}) — TAP OPPOSITE CORNER`
            : 'TAP OR DRAG TO DRAW A RECTANGULAR PATCH'}
        </span>
        {previewRect && (
          <span className="px-2 py-0.5 bg-nexus-crimson text-white font-bold">
            AREA: {previewArea}
          </span>
        )}
      </div>

      {/* PATCHES Interactive Grid */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-[420px] aspect-square border-4 border-nexus-ink bg-nexus-ink shadow-brutal grid touch-none"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
          role="grid"
          aria-label={`${rows} by ${cols} Patches Grid`}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const clueSize = clueMap.get(`${r}-${c}`);
              const ownerPatch = validation.evaluatedRects.find((rect) =>
                cellInRect(r, c, rect)
              );
              const isInPreview = previewRect ? cellInRect(r, c, previewRect) : false;
              const isAnchor = anchorCell?.r === r && anchorCell?.c === c;

              // Determine outer boundaries of the owned patch for crisp rectangular framing
              const isPatchTop = ownerPatch && ownerPatch.r1 === r;
              const isPatchBottom = ownerPatch && ownerPatch.r2 === r;
              const isPatchLeft = ownerPatch && ownerPatch.c1 === c;
              const isPatchRight = ownerPatch && ownerPatch.c2 === c;
              const isTopLeftOfPatch = isPatchTop && isPatchLeft;

              const paletteClass = ownerPatch
                ? PATCH_PALETTE[ownerPatch.index % PATCH_PALETTE.length]
                : 'bg-nexus-paper text-nexus-ink';

              return (
                <div
                  key={`${r}-${c}`}
                  onPointerDown={() => handleCellPointerDown(r, c)}
                  onPointerEnter={() => handleCellPointerEnter(r, c)}
                  onPointerUp={() => handleCellPointerUp(r, c)}
                  onClick={() => handleCellClick(r, c)}
                  role="gridcell"
                  aria-label={`Row ${r + 1} Column ${c + 1}${
                    clueSize ? `, clue ${clueSize}` : ''
                  }`}
                  className={`relative flex items-center justify-center border border-nexus-ink/20 transition-colors cursor-pointer ${
                    isInPreview
                      ? 'bg-nexus-crimson/35 text-nexus-ink ring-2 ring-inset ring-nexus-crimson'
                      : paletteClass
                  } ${isPatchTop ? 'border-t-[3px] border-t-nexus-ink' : ''} ${
                    isPatchBottom ? 'border-b-[3px] border-b-nexus-ink' : ''
                  } ${isPatchLeft ? 'border-l-[3px] border-l-nexus-ink' : ''} ${
                    isPatchRight ? 'border-r-[3px] border-r-nexus-ink' : ''
                  }`}
                >
                  {/* Top-left corner badge showing patch area & validity */}
                  {isTopLeftOfPatch && (
                    <span
                      className={`absolute top-1 left-1 px-1 py-0.2 font-mono text-[9px] font-bold leading-none ${
                        ownerPatch.isValidPatch
                          ? 'bg-nexus-ink text-white'
                          : 'bg-nexus-crimson text-white'
                      }`}
                    >
                      {ownerPatch.area}
                      {ownerPatch.isValidPatch ? '✓' : '!'}
                    </span>
                  )}

                  {/* Anchor indicator */}
                  {isAnchor && (
                    <span className="absolute inset-1 border-2 border-dashed border-nexus-crimson pointer-events-none" />
                  )}

                  {/* Clue Number Badge */}
                  {clueSize !== undefined && (
                    <span
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-none border-2 border-nexus-ink flex items-center justify-center font-display text-2xl leading-none shadow-sm ${
                        ownerPatch?.isValidPatch
                          ? 'bg-nexus-ink text-nexus-paper'
                          : 'bg-white text-nexus-crimson'
                      }`}
                    >
                      {clueSize}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-[420px] mx-auto grid grid-cols-3 gap-2.5">
        <button
          type="button"
          disabled={isLocked || rectangles.length === 0}
          onClick={handleUndo}
          className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
        >
          <Undo2 className="w-4 h-4 text-nexus-crimson" />
          <span>UNDO</span>
        </button>

        <button
          type="button"
          disabled={isLocked || (rectangles.length === 0 && !anchorCell)}
          onClick={handleReset}
          className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
        >
          <RotateCcw className="w-4 h-4 text-nexus-crimson" />
          <span>CLEAR ALL</span>
        </button>

        <button
          type="button"
          disabled={isLocked || !validation.isComplete}
          onClick={handleSubmit}
          className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
          <span>SUBMIT</span>
        </button>
      </div>
    </div>
  );
};

export default PatchesGame;
