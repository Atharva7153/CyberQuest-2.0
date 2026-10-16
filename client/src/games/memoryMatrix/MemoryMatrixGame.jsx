import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, Sparkles, RotateCcw, CheckCircle2, Zap, AlertTriangle, Send } from 'lucide-react';
import {
  normalizeMemoryMatrixConfig,
  validateMemoryMatrixClient,
  serializeMemoryMatrixSubmission,
} from './memoryMatrixLogic';

export const MemoryMatrixGame = ({
  challenge,
  gameConfig = {},
  value,
  onChange,
  onComplete,
  onDraftChange,
  onSubmitAnswer,
  actionPending = false,
  disabled = false,
}) => {
  const config = useMemo(
    () =>
      normalizeMemoryMatrixConfig({
        ...(challenge?.gameConfig || {}),
        ...gameConfig,
      }),
    [challenge, gameConfig]
  );
  const { size, rounds, maxReflashes } = config;
  const totalStages = rounds.length;

  // Initialize from saved draft if present
  const [verifiedRounds, setVerifiedRounds] = useState(() => {
    if (Array.isArray(value?.rounds) && value.rounds.length === totalStages) {
      return value.rounds;
    }
    return Array.from({ length: totalStages }, () => []);
  });

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedCells, setSelectedCells] = useState([]);
  // phase: 'READY' | 'FLASHING' | 'RECALL' | 'STAGE_SUCCESS' | 'STAGE_MISMATCH' | 'COMPLETED'
  const [phase, setPhase] = useState('READY');
  const [reflashesLeft, setReflashesLeft] = useState(maxReflashes);
  const [statusMessage, setStatusMessage] = useState(
    'Observe the illuminated nodes during the flash window, then tap the exact same tiles.'
  );

  const flashTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);

  const clearTimers = () => {
    if (flashTimerRef.current) {
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const currentRound = rounds[currentStageIdx] || rounds[0];
  const targetSet = useMemo(
    () => new Set(currentRound?.targets || []),
    [currentRound]
  );

  const triggerStageFlash = (stageIdx, customMessage = null) => {
    clearTimers();
    const roundObj = rounds[stageIdx] || rounds[0];
    setSelectedCells([]);
    setPhase('FLASHING');
    setStatusMessage(
      customMessage ||
        `MEMORIZE ${roundObj.count} FLASHING NODES (${(roundObj.flashMs / 1000).toFixed(1)}s)...`
    );

    flashTimerRef.current = setTimeout(() => {
      setPhase('RECALL');
      setStatusMessage(
        `RECALL PHASE: Tap all ${roundObj.count} target nodes from ${roundObj.label}.`
      );
    }, roundObj.flashMs);
  };

  // Auto-flash Stage 1 shortly after challenge opens
  useEffect(() => {
    clearTimers();
    const emptyRounds = Array.from({ length: totalStages }, () => []);
    setVerifiedRounds(emptyRounds);
    setCurrentStageIdx(0);
    setSelectedCells([]);
    setReflashesLeft(maxReflashes);
    setPhase('READY');

    transitionTimerRef.current = setTimeout(() => {
      triggerStageFlash(0);
    }, 550);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.challengeId, challenge?.gameConfig?.variantId]);

  const syncWithParent = (nextVerifiedRounds) => {
    const status = validateMemoryMatrixClient(nextVerifiedRounds, config);
    const serialized = serializeMemoryMatrixSubmission(nextVerifiedRounds);
    const payload = {
      gameType: 'memoryMatrix',
      answer: status.isComplete ? serialized : '',
      rounds: nextVerifiedRounds,
      completedStages: status.completedStages,
      totalStages: status.totalStages,
      isComplete: status.isComplete,
      isValid: status.isValid,
    };

    if (onDraftChange) {
      onDraftChange(payload);
    }
    if (onChange) {
      onChange(payload);
    }

    if (status.isComplete && onComplete) {
      onComplete(serialized);
    }
  };

  const handleSubmit = () => {
    const status = validateMemoryMatrixClient(verifiedRounds, config);
    if (!status.isComplete || !status.isValid || disabled || actionPending) return;
    const serialized = serializeMemoryMatrixSubmission(verifiedRounds);
    if (onSubmitAnswer) {
      onSubmitAnswer({
        gameType: 'memoryMatrix',
        answer: serialized,
        rounds: verifiedRounds,
        completedStages: status.completedStages,
        totalStages: status.totalStages,
        isComplete: true,
        isValid: true,
      });
    } else if (onComplete) {
      onComplete(serialized);
    }
  };

  const handleCellClick = (cellIdx) => {
    if (disabled || phase !== 'RECALL') return;

    const alreadySelected = selectedCells.includes(cellIdx);
    let nextSelected;
    if (alreadySelected) {
      nextSelected = selectedCells.filter((idx) => idx !== cellIdx);
    } else {
      if (selectedCells.length >= currentRound.count) return;
      nextSelected = [...selectedCells, cellIdx];
    }

    setSelectedCells(nextSelected);

    // Automatically evaluate once the operative has tapped `count` cells
    if (nextSelected.length === currentRound.count) {
      const sortedPicked = [...nextSelected].sort((a, b) => a - b);
      const expected = currentRound.targets;
      const isMatch =
        sortedPicked.length === expected.length &&
        sortedPicked.every((val, i) => val === expected[i]);

      if (isMatch) {
        const nextVerified = verifiedRounds.map((arr, idx) =>
          idx === currentStageIdx ? sortedPicked : arr
        );
        setVerifiedRounds(nextVerified);
        syncWithParent(nextVerified);

        if (currentStageIdx + 1 >= totalStages) {
          setPhase('COMPLETED');
          setStatusMessage(
            'ALL 3 MEMORY STAGES VERIFIED — Click SUBMIT SOLUTION below to claim credits!'
          );
        } else {
          setPhase('STAGE_SUCCESS');
          setStatusMessage(
            `${currentRound.label} LOCKED! Preparing ${rounds[currentStageIdx + 1].label}...`
          );
          const nextIdx = currentStageIdx + 1;
          transitionTimerRef.current = setTimeout(() => {
            setCurrentStageIdx(nextIdx);
            triggerStageFlash(nextIdx);
          }, 850);
        }
      } else {
        setPhase('STAGE_MISMATCH');
        setStatusMessage(
          `PATTERN MISMATCH ON ${currentRound.label} — Re-flashing pattern for retry...`
        );
        transitionTimerRef.current = setTimeout(() => {
          triggerStageFlash(
            currentStageIdx,
            `RETRY ${currentRound.label}: Watch all ${currentRound.count} nodes carefully...`
          );
        }, 1050);
      }
    }
  };

  const handleManualReflash = () => {
    if (disabled || phase === 'FLASHING' || phase === 'COMPLETED') return;
    if (reflashesLeft <= 0) return;
    setReflashesLeft((prev) => Math.max(0, prev - 1));
    triggerStageFlash(
      currentStageIdx,
      `RE-FLASHING ${currentRound.label} (${reflashesLeft - 1} pulses remaining)...`
    );
  };

  const handleRestartStage = () => {
    if (disabled || phase === 'FLASHING') return;
    if (phase === 'COMPLETED') {
      const resetAll = Array.from({ length: totalStages }, () => []);
      setVerifiedRounds(resetAll);
      setCurrentStageIdx(0);
      syncWithParent(resetAll);
      triggerStageFlash(0);
      return;
    }
    setSelectedCells([]);
    triggerStageFlash(currentStageIdx);
  };

  const validation = useMemo(
    () => validateMemoryMatrixClient(verifiedRounds, config),
    [verifiedRounds, config]
  );

  return (
    <div className="space-y-4 select-none">
      {/* Top Status & Stage Progress Header */}
      <div className="p-3 bg-nexus-ink text-nexus-paper border-2 border-nexus-ink flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-nexus-crimson shrink-0" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">
            {size}×{size} MEMORY MATRIX // STAGE {Math.min(currentStageIdx + 1, totalStages)} OF{' '}
            {totalStages}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {rounds.map((r, idx) => {
            const isDone =
              Array.isArray(verifiedRounds[idx]) &&
              verifiedRounds[idx].length === r.count;
            const isCurrent = idx === currentStageIdx && !validation.isComplete;
            return (
              <span
                key={r.id}
                className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase border ${
                  isDone
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : isCurrent
                      ? 'bg-nexus-crimson text-white border-white animate-pulse'
                      : 'bg-black/50 text-nexus-paper/50 border-nexus-paper/20'
                }`}
              >
                {isDone ? `✓ S${idx + 1}` : `S${idx + 1} (${r.count})`}
              </span>
            );
          })}
        </div>
      </div>

      {/* Live Phase Banner */}
      <div
        className={`p-3 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
          phase === 'COMPLETED'
            ? 'bg-emerald-950 border-emerald-500 text-emerald-100'
            : phase === 'STAGE_MISMATCH'
              ? 'bg-red-950 border-red-500 text-red-100'
              : phase === 'FLASHING'
                ? 'bg-amber-950 border-amber-400 text-amber-100'
                : 'bg-white border-nexus-ink text-nexus-ink'
        }`}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          {phase === 'COMPLETED' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : phase === 'STAGE_MISMATCH' ? (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-nexus-crimson shrink-0" />
          )}
          <span>{statusMessage}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {phase === 'RECALL' && (
            <span className="px-2 py-0.5 bg-nexus-ink text-nexus-paper font-mono text-[11px] font-bold uppercase">
              SELECTED: {selectedCells.length} / {currentRound.count}
            </span>
          )}
          <button
            type="button"
            onClick={handleManualReflash}
            disabled={
              disabled ||
              phase === 'FLASHING' ||
              phase === 'COMPLETED' ||
              reflashesLeft <= 0
            }
            className="px-2.5 py-1 border-2 border-nexus-ink bg-amber-300 text-nexus-ink font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-nexus-crimson hover:text-white disabled:opacity-40 inline-flex items-center gap-1 cursor-pointer"
          >
            <Zap className="w-3 h-3" /> RE-FLASH ({reflashesLeft})
          </button>
          <button
            type="button"
            onClick={handleRestartStage}
            disabled={disabled || phase === 'FLASHING'}
            className="px-2.5 py-1 border-2 border-nexus-ink bg-nexus-paper text-nexus-ink font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-nexus-ink hover:text-nexus-paper disabled:opacity-40 inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />{' '}
            {phase === 'COMPLETED' ? 'REPLAY ALL' : 'CLEAR'}
          </button>
        </div>
      </div>

      {/* Interactive Matrix Grid */}
      <div className="flex justify-center py-2">
        <div
          className={`p-3 bg-nexus-ink border-4 border-nexus-ink shadow-[6px_6px_0_#111] grid ${
            size >= 6 ? 'gap-1.5 sm:gap-2 max-w-[380px]' : 'gap-2 sm:gap-2.5 max-w-[340px]'
          } w-full aspect-square`}
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: size * size }).map((_, cellIdx) => {
            const isTarget = targetSet.has(cellIdx);
            const isPicked = selectedCells.includes(cellIdx);
            const isFlashingTarget = phase === 'FLASHING' && isTarget;
            const isSuccessStage =
              (phase === 'STAGE_SUCCESS' || phase === 'COMPLETED') && isTarget;
            const isWrongPick =
              phase === 'STAGE_MISMATCH' && isPicked && !isTarget;
            const isMissedTarget =
              phase === 'STAGE_MISMATCH' && !isPicked && isTarget;

            let cellStyle =
              'bg-nexus-paper/10 border-2 border-nexus-paper/25 text-nexus-paper/40 hover:border-nexus-paper/70';

            if (isFlashingTarget) {
              cellStyle =
                'bg-nexus-crimson border-2 border-white text-white shadow-[0_0_16px_rgba(200,25,30,0.9)] scale-[0.97]';
            } else if (isSuccessStage) {
              cellStyle =
                'bg-emerald-500 border-2 border-white text-white shadow-[0_0_12px_rgba(16,185,129,0.8)]';
            } else if (isWrongPick) {
              cellStyle = 'bg-red-600 border-2 border-white text-white';
            } else if (isMissedTarget) {
              cellStyle =
                'bg-amber-400/80 border-2 border-amber-200 text-nexus-ink';
            } else if (isPicked) {
              cellStyle =
                'bg-nexus-paper border-2 border-nexus-crimson text-nexus-ink shadow-[2px_2px_0_#C8191E]';
            }

            const row = Math.floor(cellIdx / size) + 1;
            const col = (cellIdx % size) + 1;

            return (
              <button
                key={cellIdx}
                type="button"
                disabled={disabled || phase !== 'RECALL'}
                onClick={() => handleCellClick(cellIdx)}
                className={`relative flex flex-col items-center justify-center font-mono transition-all duration-150 select-none ${cellStyle} ${
                  phase === 'RECALL' ? 'cursor-pointer active:scale-95' : 'cursor-default'
                }`}
              >
                <span className="text-[9px] opacity-45 font-bold">
                  {row},{col}
                </span>
                <span className="text-sm sm:text-base font-black leading-none mt-0.5">
                  {isFlashingTarget || isSuccessStage
                    ? '◆'
                    : isWrongPick
                      ? '✕'
                      : isPicked
                        ? '●'
                        : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Stage Summary & Submit Action Bar */}
      <div className="p-3 bg-white border-2 border-nexus-ink flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[4px_4px_0_#111]">
        <div className="font-mono text-[11px] text-nexus-steel space-y-0.5">
          <div className="font-bold text-nexus-ink uppercase">
            VERIFIED STAGES: {validation.completedStages} / {totalStages}
          </div>
          <div>
            {validation.isComplete
              ? 'All memory stages verified! Click SUBMIT SOLUTION to lock in your answer.'
              : `Complete all ${totalStages} stages in sequence. Mismatched stages re-flash automatically.`}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!validation.isComplete || !validation.isValid || disabled || actionPending}
          className="px-5 py-2.5 bg-nexus-crimson text-white border-2 border-nexus-ink font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0_#111] hover:bg-nexus-ink transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          {actionPending ? 'SUBMITTING...' : 'SUBMIT SOLUTION'}
        </button>
      </div>
    </div>
  );
};

export default MemoryMatrixGame;
