import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RotateCcw,
  Undo2,
  CheckCircle2,
  Send,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Lock,
} from 'lucide-react';
import {
  normalizeZipConfig,
  isAdjacentOrthogonal,
  validateZipPathClient,
  serializeZipSubmission,
} from './zipLogic';

export const ZipGame = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizeZipConfig(gameConfig), [gameConfig]);
  const { rows, cols, waypoints, blockedCells, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const startCell = useMemo(() => {
    const wp1 = waypoints.find((w) => w.num === 1) || waypoints[0] || { r: 0, c: 0 };
    return { r: wp1.r, c: wp1.c };
  }, [waypoints]);

  const gridRef = React.useRef(null);
  const [path, setPath] = useState(() => [startCell]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleGridPointerMove = useCallback(
    (e) => {
      if (!isDrawing || isLocked) return;
      const gridEl = gridRef.current;
      if (!gridEl) return;
      const bounds = gridEl.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;
      if (
        e.clientX < bounds.left ||
        e.clientX > bounds.right ||
        e.clientY < bounds.top ||
        e.clientY > bounds.bottom
      ) {
        return;
      }
      const c = Math.max(
        0,
        Math.min(cols - 1, Math.floor(((e.clientX - bounds.left) / bounds.width) * cols))
      );
      const r = Math.max(
        0,
        Math.min(rows - 1, Math.floor(((e.clientY - bounds.top) / bounds.height) * rows))
      );
      tryStepToCell(r, c);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDrawing, isLocked, rows, cols]
  );

  useEffect(() => {
    setPath([startCell]);
    setIsDrawing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.challengeId, session?.attemptId]);

  const waypointMap = useMemo(() => {
    const map = new Map();
    for (const w of waypoints) {
      map.set(`${w.r}-${w.c}`, w.num);
    }
    return map;
  }, [waypoints]);

  const blockedSet = useMemo(
    () => new Set(blockedCells.map((b) => `${b.r}-${b.c}`)),
    [blockedCells]
  );

  const validation = useMemo(
    () => validateZipPathClient(path, config),
    [path, config]
  );

  // Sync draft with parent ChallengeSessionPage
  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const serialized = serializeZipSubmission(path);
      onDraftChange({
        gameType: 'zip',
        answer: validation.isComplete ? serialized : '',
        path,
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
    }
  }, [path, validation.isComplete, validation.isValid, onDraftChange]);

  const tryStepToCell = useCallback(
    (r, c) => {
      if (isLocked) return;
      if (r < 0 || r >= rows || c < 0 || c >= cols) return;
      if (blockedSet.has(`${r}-${c}`)) return;

      setPath((prev) => {
        if (prev.length === 0) return [{ r, c }];
        const head = prev[prev.length - 1];
        if (head.r === r && head.c === c) return prev;

        // If user steps back onto an earlier cell in the path, truncate back to that cell
        const existingIdx = prev.findIndex((pt) => pt.r === r && pt.c === c);
        if (existingIdx >= 0) {
          return prev.slice(0, existingIdx + 1);
        }

        // Build candidate step sequence (either 1 adjacent cell, or straight orthogonal line)
        const candidateSteps = [];
        if (isAdjacentOrthogonal(head, { r, c })) {
          candidateSteps.push({ r, c });
        } else if (head.r === r || head.c === c) {
          const dr = Math.sign(r - head.r);
          const dc = Math.sign(c - head.c);
          let currR = head.r;
          let currC = head.c;
          while (currR !== r || currC !== c) {
            currR += dr;
            currC += dc;
            candidateSteps.push({ r: currR, c: currC });
          }
        } else {
          return prev;
        }

        let working = [...prev];
        let highestReached = 1;
        for (const pt of working) {
          const w = waypointMap.get(`${pt.r}-${pt.c}`);
          if (w && w > highestReached) highestReached = w;
        }

        for (const stepPt of candidateSteps) {
          const key = `${stepPt.r}-${stepPt.c}`;
          if (blockedSet.has(key)) return working;
          if (working.some((pt) => pt.r === stepPt.r && pt.c === stepPt.c)) {
            return working;
          }
          const targetWp = waypointMap.get(key);
          if (targetWp !== undefined) {
            if (targetWp !== highestReached + 1) {
              return working;
            }
            highestReached = targetWp;
          }
          working.push(stepPt);
        }

        return working;
      });
    },
    [isLocked, rows, cols, blockedSet, waypointMap]
  );

  const handleStepDirection = useCallback(
    (dr, dc) => {
      if (isLocked || path.length === 0) return;
      const head = path[path.length - 1];
      tryStepToCell(head.r + dr, head.c + dc);
    },
    [isLocked, path, tryStepToCell]
  );

  const handleUndoStep = useCallback(() => {
    if (isLocked) return;
    setPath((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, [isLocked]);

  const handleResetPath = () => {
    if (isLocked) return;
    setPath([startCell]);
  };

  // Keyboard navigation support
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isLocked) return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleStepDirection(-1, 0);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleStepDirection(1, 0);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleStepDirection(0, -1);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleStepDirection(0, 1);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleUndoStep();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLocked, handleStepDirection, handleUndoStep]);

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'zip',
      answer: serializeZipSubmission(path),
      path,
    });
  };

  const pathIndexMap = useMemo(() => {
    const map = new Map();
    path.forEach((pt, idx) => {
      map.set(`${pt.r}-${pt.c}`, idx);
    });
    return map;
  }, [path]);

  return (
    <div
      className="space-y-5 select-none"
      onPointerUp={() => setIsDrawing(false)}
      onPointerCancel={() => setIsDrawing(false)}
    >
      {/* Instructions & Progress Header */}
      <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-editorial text-sm text-nexus-charcoal leading-snug">
            {instructions}
          </p>
          <p className="font-mono text-[11px] text-nexus-muted">
            TIP: Drag or tap adjacent cells to connect 1 → {validation.maxWaypoint} while filling every square.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs font-bold uppercase">
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
            {validation.visitedCount} / {validation.totalPlayableCells} CELLS
          </span>
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-ink text-nexus-paper">
            {validation.lastWaypointReached === validation.maxWaypoint
              ? `ALL ${validation.maxWaypoint} CONNECTED`
              : `NEXT WAYPOINT: ${validation.nextWaypoint}`}
          </span>
          {validation.isValid && (
            <span className="px-2.5 py-1 bg-nexus-crimson text-white inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              COMPLETE
            </span>
          )}
        </div>
      </div>

      {/* ZIP Interactive Grid */}
      <div className="flex justify-center">
        <div
          ref={gridRef}
          onPointerMove={handleGridPointerMove}
          className="w-full max-w-[400px] aspect-square border-4 border-nexus-ink bg-nexus-ink p-1.5 shadow-brutal grid gap-1 touch-none"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
          role="grid"
          aria-label={`${rows} by ${cols} Zip Path Grid`}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const key = `${r}-${c}`;
              const isBlocked = blockedSet.has(key);
              const wpNum = waypointMap.get(key);
              const pathIdx = pathIndexMap.get(key);
              const isVisited = pathIdx !== undefined;
              const isHead = pathIdx === path.length - 1;

              // Determine directional connectors to prev and next cells in path
              const prevPt = isVisited && pathIdx > 0 ? path[pathIdx - 1] : null;
              const nextPt =
                isVisited && pathIdx < path.length - 1 ? path[pathIdx + 1] : null;

              const connectsUp =
                (prevPt && prevPt.r === r - 1 && prevPt.c === c) ||
                (nextPt && nextPt.r === r - 1 && nextPt.c === c);
              const connectsDown =
                (prevPt && prevPt.r === r + 1 && prevPt.c === c) ||
                (nextPt && nextPt.r === r + 1 && nextPt.c === c);
              const connectsLeft =
                (prevPt && prevPt.r === r && prevPt.c === c - 1) ||
                (nextPt && nextPt.r === r && nextPt.c === c - 1);
              const connectsRight =
                (prevPt && prevPt.r === r && prevPt.c === c + 1) ||
                (nextPt && nextPt.r === r && nextPt.c === c + 1);

              return (
                <div
                  key={key}
                  onPointerDown={() => {
                    if (isLocked || isBlocked) return;
                    setIsDrawing(true);
                    tryStepToCell(r, c);
                  }}
                  onPointerEnter={() => {
                    if (isDrawing && !isLocked && !isBlocked) {
                      tryStepToCell(r, c);
                    }
                  }}
                  role="gridcell"
                  aria-label={`Row ${r + 1} Column ${c + 1}${
                    wpNum ? `, Waypoint ${wpNum}` : ''
                  }${isVisited ? ', visited' : ''}`}
                  className={`relative flex items-center justify-center transition-colors cursor-pointer ${
                    isBlocked
                      ? 'bg-black/70 text-nexus-paper/30 cursor-not-allowed'
                      : isHead
                        ? 'bg-nexus-crimson text-white ring-2 ring-inset ring-white'
                        : isVisited
                          ? 'bg-nexus-ink text-white border border-nexus-crimson/60'
                          : 'bg-nexus-paper hover:bg-nexus-paper-elevated text-nexus-ink'
                  }`}
                >
                  {/* Continuous Path Connectors */}
                  {isVisited && connectsUp && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-1/2 bg-nexus-crimson pointer-events-none" />
                  )}
                  {isVisited && connectsDown && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1/2 bg-nexus-crimson pointer-events-none" />
                  )}
                  {isVisited && connectsLeft && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-1/2 bg-nexus-crimson pointer-events-none" />
                  )}
                  {isVisited && connectsRight && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-1/2 bg-nexus-crimson pointer-events-none" />
                  )}

                  {/* Center Path Node or Waypoint Badge */}
                  {isBlocked ? (
                    <Lock className="w-4 h-4 opacity-50 relative z-10" />
                  ) : wpNum !== undefined ? (
                    <span
                      className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 border-2 flex items-center justify-center font-display text-2xl leading-none ${
                        isHead
                          ? 'bg-white text-nexus-crimson border-nexus-ink'
                          : isVisited
                            ? 'bg-nexus-crimson text-white border-white'
                            : wpNum === validation.nextWaypoint
                              ? 'bg-nexus-ink text-nexus-paper border-nexus-crimson animate-pulse'
                              : 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                      }`}
                    >
                      {wpNum}
                    </span>
                  ) : isVisited ? (
                    <span
                      className={`relative z-10 w-3.5 h-3.5 ${
                        isHead ? 'bg-white' : 'bg-nexus-crimson'
                      }`}
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Touch D-Pad + Action Controls */}
      <div className="max-w-[400px] mx-auto space-y-3">
        {/* Touch D-Pad for mobile precision */}
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            disabled={isLocked}
            onClick={() => handleStepDirection(0, -1)}
            aria-label="Step Left"
            className="min-h-[44px] border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper active:bg-nexus-crimson active:text-white flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            disabled={isLocked}
            onClick={() => handleStepDirection(-1, 0)}
            aria-label="Step Up"
            className="min-h-[44px] border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper active:bg-nexus-crimson active:text-white flex items-center justify-center cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <button
            type="button"
            disabled={isLocked}
            onClick={() => handleStepDirection(1, 0)}
            aria-label="Step Down"
            className="min-h-[44px] border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper active:bg-nexus-crimson active:text-white flex items-center justify-center cursor-pointer"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            type="button"
            disabled={isLocked}
            onClick={() => handleStepDirection(0, 1)}
            aria-label="Step Right"
            className="min-h-[44px] border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper active:bg-nexus-crimson active:text-white flex items-center justify-center cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            disabled={isLocked || path.length <= 1}
            onClick={handleUndoStep}
            className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <Undo2 className="w-4 h-4 text-nexus-crimson" />
            <span>STEP BACK</span>
          </button>

          <button
            type="button"
            disabled={isLocked || path.length <= 1}
            onClick={handleResetPath}
            className="min-h-[46px] px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <RotateCcw className="w-4 h-4 text-nexus-crimson" />
            <span>RESET</span>
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
    </div>
  );
};

export default ZipGame;
