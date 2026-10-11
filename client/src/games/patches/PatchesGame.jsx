import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  RotateCcw,
  Undo2,
  Redo2,
  CheckCircle2,
  Send,
  Grid,
} from 'lucide-react';
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

const unionRects = (rectA, rectB) => ({
  r1: Math.min(rectA.r1, rectB.r1),
  c1: Math.min(rectA.c1, rectB.c1),
  r2: Math.max(rectA.r2, rectB.r2),
  c2: Math.max(rectA.c2, rectB.c2),
});

const areRectsFlushAdjacent = (a, b) => {
  const sameRowSpan = a.r1 === b.r1 && a.r2 === b.r2;
  const adjacentCols = a.c2 + 1 === b.c1 || b.c2 + 1 === a.c1;
  if (sameRowSpan && adjacentCols) return true;

  const sameColSpan = a.c1 === b.c1 && a.c2 === b.c2;
  const adjacentRows = a.r2 + 1 === b.r1 || b.r2 + 1 === a.r1;
  return sameColSpan && adjacentRows;
};

const areRectsTouchingOrOverlapping = (a, b) => {
  if (rectsOverlap(a, b)) return true;
  const rowsOverlap = Math.max(a.r1, b.r1) <= Math.min(a.r2, b.r2);
  const colsAdjacent = a.c2 + 1 === b.c1 || b.c2 + 1 === a.c1;
  if (rowsOverlap && colsAdjacent) return true;

  const colsOverlap = Math.max(a.c1, b.c1) <= Math.min(a.c2, b.c2);
  const rowsAdjacent = a.r2 + 1 === b.r1 || b.r2 + 1 === a.r1;
  return colsOverlap && rowsAdjacent;
};

export const PatchesGame = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizePatchesConfig(gameConfig), [gameConfig]);
  const { rows, cols, clues, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const gridRef = useRef(null);
  const rectanglesRef = useRef([]);
  const dragSessionRef = useRef(null);

  const [rectangles, setRectangles] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [activePreview, setActivePreview] = useState(null);

  useEffect(() => {
    rectanglesRef.current = rectangles;
  }, [rectangles]);

  useEffect(() => {
    rectanglesRef.current = [];
    dragSessionRef.current = null;
    setRectangles([]);
    setUndoStack([]);
    setRedoStack([]);
    setActivePreview(null);
  }, [challenge?.challengeId, session?.attemptId]);

  const clueMap = useMemo(() => {
    const map = new Map();
    for (const cl of clues) {
      map.set(`${cl.r}-${cl.c}`, cl.size);
    }
    return map;
  }, [clues]);

  const isPatchIncomplete = useCallback(
    (patch) => {
      if (!patch) return false;
      const contained = clues.filter((cl) => cellInRect(cl.r, cl.c, patch));
      if (contained.length === 0) return true;
      if (contained.length === 1) {
        return getRectArea(patch) < contained[0].size;
      }
      return false;
    },
    [clues]
  );

  /**
   * Resolves whether a newly dragged rectangle should merge with an existing
   * incomplete patch (e.g., player made 4 cells on the left of a '6' clue,
   * and now drags 2 more cells on the right).
   */
  const resolveCandidateWithMerge = useCallback(
    (rawBounds, currentRects, editedPatch = null) => {
      if (!rawBounds) return { rect: null, mergedPatchId: null };

      if (editedPatch) {
        return {
          rect: { ...rawBounds },
          mergedPatchId: editedPatch.id,
        };
      }

      // Check if rawBounds overlaps or touches an existing incomplete patch that can merge cleanly
      const candidates = currentRects.filter((existing) => {
        if (!isPatchIncomplete(existing)) return false;
        if (!areRectsTouchingOrOverlapping(existing, rawBounds)) return false;

        const combined = unionRects(existing, rawBounds);
        const combinedClues = clues.filter((cl) => cellInRect(cl.r, cl.c, combined));
        if (combinedClues.length > 1) return false;

        // Ensure combined does not collide with any OTHER already-placed patch
        const collidesWithOther = currentRects.some(
          (other) => other.id !== existing.id && rectsOverlap(other, combined)
        );
        if (collidesWithOther) return false;

        if (combinedClues.length === 1) {
          const targetSize = combinedClues[0].size;
          // If overlapping existing or flush-adjacent or within target size, merge!
          if (
            rectsOverlap(existing, rawBounds) ||
            areRectsFlushAdjacent(existing, rawBounds) ||
            getRectArea(combined) <= targetSize
          ) {
            return true;
          }
        }

        if (combinedClues.length === 0 && areRectsFlushAdjacent(existing, rawBounds)) {
          return true;
        }

        return false;
      });

      if (candidates.length > 0) {
        // Prefer an overlapping incomplete patch first, or one whose combined area matches clue size
        candidates.sort((a, b) => {
          const aOverlap = rectsOverlap(a, rawBounds) ? 1 : 0;
          const bOverlap = rectsOverlap(b, rawBounds) ? 1 : 0;
          if (aOverlap !== bOverlap) return bOverlap - aOverlap;

          const aUnion = unionRects(a, rawBounds);
          const bUnion = unionRects(b, rawBounds);
          const aClue = clues.find((cl) => cellInRect(cl.r, cl.c, aUnion));
          const bClue = clues.find((cl) => cellInRect(cl.r, cl.c, bUnion));
          const aExact = aClue && getRectArea(aUnion) === aClue.size ? 1 : 0;
          const bExact = bClue && getRectArea(bUnion) === bClue.size ? 1 : 0;
          return bExact - aExact;
        });

        const target = candidates[0];
        return {
          rect: unionRects(target, rawBounds),
          mergedPatchId: target.id,
        };
      }

      return {
        rect: { ...rawBounds },
        mergedPatchId: null,
      };
    },
    [clues, isPatchIncomplete]
  );

  // Hide the patch currently being resized/merged so the live preview replaces it cleanly
  const displayedRectangles = useMemo(() => {
    if (activePreview?.mergedPatchId) {
      return rectangles.filter((r) => r.id !== activePreview.mergedPatchId);
    }
    return rectangles;
  }, [rectangles, activePreview]);

  const validation = useMemo(
    () => validatePatchesBoardClient(displayedRectangles, config),
    [displayedRectangles, config]
  );

  // Sync draft with parent ChallengeSessionPage
  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const fullValidation = validatePatchesBoardClient(rectangles, config);
      const serialized = serializePatchesSubmission(rectangles);
      onDraftChange({
        gameType: 'patches',
        answer: fullValidation.isComplete ? serialized : '',
        patches: rectangles,
        isComplete: fullValidation.isComplete,
        isValid: fullValidation.isValid,
      });
    }
  }, [rectangles, config, onDraftChange]);

  const applyNewRectangles = useCallback((updater) => {
    setRectangles((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      rectanglesRef.current = next;
      setUndoStack((uPrev) => [...uPrev.slice(-30), prev]);
      setRedoStack([]);
      return next;
    });
  }, []);

  const removePatchById = useCallback(
    (patchId) => {
      if (isLocked || !patchId) return;
      applyNewRectangles((prev) => prev.filter((r) => r.id !== patchId));
    },
    [isLocked, applyNewRectangles]
  );

  const resolveCellFromClientPoint = useCallback(
    (clientX, clientY) => {
      const gridEl = gridRef.current;
      if (!gridEl) return null;
      const bounds = gridEl.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return null;

      const relX = Math.max(0, Math.min(bounds.width - 1, clientX - bounds.left));
      const relY = Math.max(0, Math.min(bounds.height - 1, clientY - bounds.top));

      const c = Math.max(0, Math.min(cols - 1, Math.floor((relX / bounds.width) * cols)));
      const r = Math.max(0, Math.min(rows - 1, Math.floor((relY / bounds.height) * rows)));
      return { r, c };
    },
    [rows, cols]
  );

  const updateDragWithCell = useCallback(
    (targetCell) => {
      const sessionState = dragSessionRef.current;
      if (!sessionState || !targetCell) return;

      const { r, c } = targetCell;
      if (r !== sessionState.startCell.r || c !== sessionState.startCell.c) {
        sessionState.didMove = true;
      }
      sessionState.currentCell = { r, c };

      const { pivotCell, editedPatch, isEditedIncomplete, bounds } = sessionState;

      if (editedPatch && !isEditedIncomplete) {
        // Editing a complete/oversized patch:
        // If dragging outside existing patch, expand it; if inside, allow resizing from pivot
        if (!cellInRect(r, c, editedPatch)) {
          const expanded = unionRects(
            editedPatch,
            normalizeRect(pivotCell.r, pivotCell.c, r, c)
          );
          sessionState.bounds = expanded;
        } else {
          sessionState.bounds = normalizeRect(pivotCell.r, pivotCell.c, r, c);
        }
      } else {
        // Bidirectional expansion around pivotCell:
        // Moving left of pivot updates c1 while preserving c2 on the right!
        // Moving right of pivot updates c2 while preserving c1 on the left!
        let nextR1 = bounds.r1;
        let nextR2 = bounds.r2;
        let nextC1 = bounds.c1;
        let nextC2 = bounds.c2;

        if (r < pivotCell.r) {
          nextR1 = r;
        } else if (r > pivotCell.r) {
          nextR2 = r;
        }

        if (c < pivotCell.c) {
          nextC1 = c;
        } else if (c > pivotCell.c) {
          nextC2 = c;
        }

        sessionState.bounds = {
          r1: Math.min(nextR1, pivotCell.r),
          c1: Math.min(nextC1, pivotCell.c),
          r2: Math.max(nextR2, pivotCell.r),
          c2: Math.max(nextC2, pivotCell.c),
        };
      }

      const resolved = resolveCandidateWithMerge(
        sessionState.bounds,
        rectanglesRef.current,
        sessionState.editedPatch
      );
      sessionState.resolvedRect = resolved.rect;
      sessionState.mergedPatchId = resolved.mergedPatchId;

      setActivePreview({
        rect: resolved.rect,
        mergedPatchId: resolved.mergedPatchId,
        pivotCell: sessionState.pivotCell,
      });
    },
    [resolveCandidateWithMerge]
  );

  const handleCellPointerDown = (e, r, c) => {
    if (isLocked) return;
    if (e.button !== undefined && e.button !== 0) return;

    const currentRects = rectanglesRef.current;
    const existingPatch = currentRects.find((rect) => cellInRect(r, c, rect)) || null;
    const incomplete = existingPatch ? isPatchIncomplete(existingPatch) : false;

    const containedClue = existingPatch
      ? clues.find((cl) => cellInRect(cl.r, cl.c, existingPatch))
      : null;

    const pivotCell = containedClue
      ? { r: containedClue.r, c: containedClue.c }
      : { r, c };

    // Always start with the existing patch's bounds if we pressed inside an existing patch,
    // so the already-made side never disappears when pressing down!
    const initialBounds = existingPatch
      ? {
          r1: existingPatch.r1,
          c1: existingPatch.c1,
          r2: existingPatch.r2,
          c2: existingPatch.c2,
        }
      : { r1: r, c1: c, r2: r, c2: c };

    const resolved = resolveCandidateWithMerge(
      initialBounds,
      currentRects,
      existingPatch
    );

    dragSessionRef.current = {
      startCell: { r, c },
      pivotCell,
      currentCell: { r, c },
      didMove: false,
      editedPatch: existingPatch,
      isEditedIncomplete: incomplete,
      bounds: initialBounds,
      resolvedRect: resolved.rect,
      mergedPatchId: resolved.mergedPatchId,
    };

    setActivePreview({
      rect: resolved.rect,
      mergedPatchId: resolved.mergedPatchId,
      pivotCell,
    });
  };

  const handleGridPointerMove = (e) => {
    if (isLocked || !dragSessionRef.current) return;
    const targetCell = resolveCellFromClientPoint(e.clientX, e.clientY);
    if (!targetCell) return;
    updateDragWithCell(targetCell);
  };

  const finalizeActiveDrag = useCallback(() => {
    const sessionState = dragSessionRef.current;
    if (!sessionState) return;

    dragSessionRef.current = null;
    setActivePreview(null);

    const {
      startCell,
      didMove,
      editedPatch,
      resolvedRect,
      mergedPatchId,
    } = sessionState;

    // If user simply clicked/tapped an existing patch without dragging, remove that patch
    if (editedPatch && !didMove) {
      applyNewRectangles((prev) => prev.filter((rect) => rect.id !== editedPatch.id));
      return;
    }

    // If user clicked a single empty cell without dragging:
    // commit only if it merged into an adjacent incomplete patch or is a 1-cell clue
    if (!editedPatch && !didMove) {
      const isOneClue = clueMap.get(`${startCell.r}-${startCell.c}`) === 1;
      if (!mergedPatchId && !isOneClue) {
        return;
      }
    }

    if (!resolvedRect) return;

    applyNewRectangles((prev) => {
      const filtered = prev.filter((existing) => {
        if (mergedPatchId && existing.id === mergedPatchId) return false;
        if (editedPatch && existing.id === editedPatch.id) return false;
        return !rectsOverlap(existing, resolvedRect);
      });

      return [
        ...filtered,
        {
          r1: resolvedRect.r1,
          c1: resolvedRect.c1,
          r2: resolvedRect.r2,
          c2: resolvedRect.c2,
          id: `patch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        },
      ];
    });
  }, [applyNewRectangles, clueMap]);

  useEffect(() => {
    const handleWindowPointerUp = () => {
      if (dragSessionRef.current) {
        finalizeActiveDrag();
      }
    };
    const handleWindowPointerCancel = () => {
      if (dragSessionRef.current) {
        dragSessionRef.current = null;
        setActivePreview(null);
      }
    };

    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerCancel);
    return () => {
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerCancel);
    };
  }, [finalizeActiveDrag]);

  const handleUndo = useCallback(() => {
    if (isLocked || undoStack.length === 0) return;
    dragSessionRef.current = null;
    setActivePreview(null);

    const previousState = undoStack[undoStack.length - 1];
    rectanglesRef.current = previousState;
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, rectangles]);
    setRectangles(previousState);
  }, [isLocked, undoStack, rectangles]);

  const handleRedo = useCallback(() => {
    if (isLocked || redoStack.length === 0) return;
    dragSessionRef.current = null;
    setActivePreview(null);

    const nextState = redoStack[redoStack.length - 1];
    rectanglesRef.current = nextState;
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, rectangles]);
    setRectangles(nextState);
  }, [isLocked, redoStack, rectangles]);

  const handleReset = () => {
    if (isLocked) return;
    dragSessionRef.current = null;
    setActivePreview(null);
    if (rectangles.length > 0) {
      applyNewRectangles([]);
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (isLocked) return;
      if (e.key === 'Escape') {
        dragSessionRef.current = null;
        setActivePreview(null);
      } else if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === 'z' &&
        !e.shiftKey
      ) {
        e.preventDefault();
        handleUndo();
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (undoStack.length > 0) {
          e.preventDefault();
          handleUndo();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLocked, undoStack.length, handleUndo]);

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'patches',
      answer: serializePatchesSubmission(rectangles),
      patches: rectangles,
    });
  };

  const previewRect = activePreview?.rect || null;
  const previewArea = previewRect ? getRectArea(previewRect) : 0;
  const previewClues = useMemo(() => {
    if (!previewRect) return [];
    return clues.filter((cl) => cellInRect(cl.r, cl.c, previewRect));
  }, [previewRect, clues]);
  const previewMatchesClue =
    previewClues.length === 1 && previewClues[0].size === previewArea;

  return (
    <div className="space-y-4 sm:space-y-5 select-none">
      {/* Instructions & Status Header */}
      <div className="p-3.5 sm:p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-editorial text-xs sm:text-sm text-nexus-charcoal leading-snug">
            {instructions}
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] text-nexus-muted">
            TIP: Drag in any direction (left, right, up, down) to build or expand a block. Tap × to remove a block.
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
            <span className="px-2.5 py-1 bg-emerald-600 text-white inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              SOLVED
            </span>
          )}
        </div>
      </div>

      {/* Active Selection / Preview Banner */}
      <div className="max-w-[420px] mx-auto flex items-center justify-between gap-2 px-3 py-2 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper font-mono text-[11px] sm:text-xs">
        <span className="flex items-center gap-1.5 truncate">
          <Grid className="w-3.5 h-3.5 text-nexus-crimson shrink-0" />
          {previewRect
            ? `BUILDING PATCH (${previewRect.r2 - previewRect.r1 + 1}×${previewRect.c2 - previewRect.c1 + 1})`
            : 'DRAG TO DRAW OR EXTEND · TAP PATCH TO CLEAR'}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {previewRect && (
            <span
              className={`px-2 py-0.5 font-bold ${
                previewMatchesClue
                  ? 'bg-emerald-600 text-white'
                  : 'bg-nexus-crimson text-white'
              }`}
            >
              AREA: {previewArea}
              {previewClues.length === 1 ? ` / ${previewClues[0].size}` : ''}
            </span>
          )}
        </div>
      </div>

      {/* PATCHES Interactive Grid */}
      <div className="flex justify-center">
        <div
          ref={gridRef}
          onPointerMove={handleGridPointerMove}
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

              const isPatchTop = ownerPatch && ownerPatch.r1 === r;
              const isPatchBottom = ownerPatch && ownerPatch.r2 === r;
              const isPatchLeft = ownerPatch && ownerPatch.c1 === c;
              const isPatchRight = ownerPatch && ownerPatch.c2 === c;
              const isTopLeftOfPatch = isPatchTop && isPatchLeft;
              const isTopRightOfPatch = isPatchTop && isPatchRight;

              const paletteClass = ownerPatch
                ? ownerPatch.isValidPatch
                  ? 'bg-emerald-500/25 text-nexus-ink'
                  : PATCH_PALETTE[ownerPatch.index % PATCH_PALETTE.length]
                : 'bg-nexus-paper text-nexus-ink';

              return (
                <div
                  key={`${r}-${c}`}
                  onPointerDown={(e) => handleCellPointerDown(e, r, c)}
                  role="gridcell"
                  aria-label={`Row ${r + 1} Column ${c + 1}${
                    clueSize ? `, clue ${clueSize}` : ''
                  }`}
                  className={`relative flex items-center justify-center border border-nexus-ink/20 transition-colors cursor-pointer ${
                    isInPreview
                      ? previewMatchesClue
                        ? 'bg-emerald-500/40 text-nexus-ink ring-2 ring-inset ring-emerald-600'
                        : 'bg-nexus-crimson/35 text-nexus-ink ring-2 ring-inset ring-nexus-crimson'
                      : paletteClass
                  } ${isPatchTop ? 'border-t-[3px] border-t-nexus-ink' : ''} ${
                    isPatchBottom ? 'border-b-[3px] border-b-nexus-ink' : ''
                  } ${isPatchLeft ? 'border-l-[3px] border-l-nexus-ink' : ''} ${
                    isPatchRight ? 'border-r-[3px] border-r-nexus-ink' : ''
                  }`}
                >
                  {/* Top-left corner badge showing patch area & validity */}
                  {isTopLeftOfPatch && !isInPreview && (
                    <span
                      className={`absolute top-0.5 left-0.5 px-1 py-0.2 font-mono text-[9px] font-bold leading-none pointer-events-none ${
                        ownerPatch.isValidPatch
                          ? 'bg-emerald-600 text-white'
                          : 'bg-nexus-crimson text-white'
                      }`}
                    >
                      {ownerPatch.area}
                      {ownerPatch.containedClues?.length === 1
                        ? `/${ownerPatch.containedClues[0].size}`
                        : ''}
                      {ownerPatch.isValidPatch ? '✓' : ''}
                    </span>
                  )}

                  {/* Top-right clickable remove button on placed patch */}
                  {isTopRightOfPatch && !isInPreview && (
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        removePatchById(ownerPatch.id);
                      }}
                      title="Remove patch"
                      className="absolute top-0.5 right-0.5 px-1.5 py-0.5 font-mono text-[10px] font-bold leading-none bg-black/75 hover:bg-red-600 text-white cursor-pointer z-10"
                    >
                      ×
                    </button>
                  )}

                  {/* Clue Number Badge */}
                  {clueSize !== undefined && (
                    <span
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-none border-2 border-nexus-ink flex items-center justify-center font-display text-xl sm:text-2xl leading-none shadow-sm pointer-events-none ${
                        ownerPatch?.isValidPatch
                          ? 'bg-emerald-600 text-white'
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
      <div className="max-w-[420px] mx-auto grid grid-cols-4 gap-2">
        <button
          type="button"
          disabled={isLocked || undoStack.length === 0}
          onClick={handleUndo}
          className="min-h-[46px] px-2 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <Undo2 className="w-4 h-4 text-nexus-crimson shrink-0" />
          <span>BACK</span>
        </button>

        <button
          type="button"
          disabled={isLocked || redoStack.length === 0}
          onClick={handleRedo}
          className="min-h-[46px] px-2 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <Redo2 className="w-4 h-4 text-nexus-crimson shrink-0" />
          <span>REDO</span>
        </button>

        <button
          type="button"
          disabled={isLocked || rectangles.length === 0}
          onClick={handleReset}
          className="min-h-[46px] px-2 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <RotateCcw className="w-4 h-4 text-nexus-crimson shrink-0" />
          <span>CLEAR</span>
        </button>

        <button
          type="button"
          disabled={isLocked || !validation.isComplete}
          onClick={handleSubmit}
          className="min-h-[46px] px-2 py-2 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <Send className="w-4 h-4 shrink-0" />
          <span>SUBMIT</span>
        </button>
      </div>
    </div>
  );
};

export default PatchesGame;
