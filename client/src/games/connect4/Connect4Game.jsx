import React, { useState, useEffect, useMemo } from 'react';
import { RotateCcw, Send, Trophy, AlertCircle, Cpu, ArrowDown } from 'lucide-react';
import {
  CONNECT4_ROWS,
  CONNECT4_COLS,
  normalizeConnect4Config,
  createEmptyConnect4Board,
  getDropRow,
  evaluateConnect4Board,
  chooseConnect4AiColumn,
  serializeConnect4Submission,
} from './connect4Logic';

export const Connect4Game = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(
    () => normalizeConnect4Config(gameConfig, challenge?.difficulty),
    [gameConfig, challenge?.difficulty]
  );
  const { instructions, aiTier } = config;
  const isLocked = Boolean(actionPending || disabled);

  const [board, setBoard] = useState(() => createEmptyConnect4Board());
  const [moves, setMoves] = useState([]);
  const [hoverCol, setHoverCol] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);

  // Only reset when challengeId or attemptId changes
  useEffect(() => {
    setBoard(createEmptyConnect4Board());
    setMoves([]);
    setIsAiThinking(false);
    setRoundNumber(1);
  }, [challenge?.challengeId, session?.attemptId]);

  const outcome = useMemo(() => evaluateConnect4Board(board), [board]);
  const isPlayerWin = outcome.winner === 'X';
  const isAiWin = outcome.winner === 'O';
  const isDraw = outcome.isDraw;
  const isRoundOver = Boolean(outcome.winner || outcome.isDraw);

  const winningSet = useMemo(
    () => new Set((outcome.winningCells || []).map((pt) => `${pt.r}-${pt.c}`)),
    [outcome.winningCells]
  );

  // Sync draft with parent ChallengeSessionPage when player wins
  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const answer = isPlayerWin ? serializeConnect4Submission(board, moves) : '';
      onDraftChange({
        gameType: 'connect4',
        answer,
        board,
        moves,
        winner: outcome.winner,
        isComplete: isPlayerWin,
        isValid: isPlayerWin,
      });
    }
  }, [board, moves, isPlayerWin, outcome.winner, onDraftChange]);

  const handleDropColumn = (col) => {
    if (isLocked || isAiThinking || isRoundOver) return;
    const dropRow = getDropRow(board, col);
    if (dropRow === -1) return;

    const nextBoard = board.map((row) => [...row]);
    nextBoard[dropRow][col] = 'X';
    const nextMoves = [...moves, { player: 'X', row: dropRow, col }];

    setBoard(nextBoard);
    setMoves(nextMoves);

    const playerCheck = evaluateConnect4Board(nextBoard);
    if (playerCheck.winner || playerCheck.isDraw) {
      return;
    }

    // AI Turn
    setIsAiThinking(true);
    setTimeout(() => {
      const aiCol = chooseConnect4AiColumn(
        nextBoard,
        aiTier?.id || challenge?.difficulty,
        nextMoves.length
      );
      const aiRow = getDropRow(nextBoard, aiCol);
      if (aiCol >= 0 && aiRow >= 0) {
        const afterAi = nextBoard.map((row) => [...row]);
        afterAi[aiRow][aiCol] = 'O';
        setBoard(afterAi);
        setMoves((prev) => [...prev, { player: 'O', row: aiRow, col: aiCol }]);
      }
      setIsAiThinking(false);
    }, 240);
  };

  const handleResetRound = () => {
    if (isLocked) return;
    setBoard(createEmptyConnect4Board());
    setMoves([]);
    setIsAiThinking(false);
    setRoundNumber((r) => r + 1);
  };

  const handleSubmitWin = () => {
    if (isLocked || !isPlayerWin) return;
    onSubmitAnswer({
      gameType: 'connect4',
      answer: serializeConnect4Submission(board, moves),
      board,
      moves,
      winner: 'X',
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
            ROUND #{roundNumber}
          </span>
          {isPlayerWin ? (
            <span className="px-2.5 py-1 bg-nexus-crimson text-white inline-flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              VICTORY (4 IN A ROW)
            </span>
          ) : isAiWin ? (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-crimson border border-nexus-crimson inline-flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              AI CONNECTED 4 — TRY AGAIN
            </span>
          ) : isDraw ? (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              BOARD FULL — PLAY NEW ROUND
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-nexus-crimson" />
              {isAiThinking ? `${aiTier?.label || 'AI'} THINKING...` : 'YOUR TURN (DROP DISC)'}
            </span>
          )}
        </div>
      </div>

      {/* Player vs AI Legend */}
      <div className="max-w-[440px] mx-auto grid grid-cols-2 gap-2.5 font-mono text-xs">
        <div className="p-2.5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-nexus-paper/70">YOU</span>
          <span className="flex items-center gap-1.5 font-bold text-nexus-crimson">
            <span className="w-3.5 h-3.5 rounded-full bg-nexus-crimson border border-white inline-block" />
            CRIMSON
          </span>
        </div>
        <div className="p-2.5 border-2 border-nexus-ink bg-nexus-paper-elevated text-nexus-ink flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-nexus-crimson font-bold">
            {aiTier?.badge || 'NOOB AI (EASY)'}
          </span>
          <span className="flex items-center gap-1.5 font-bold text-nexus-ink">
            <span className="w-3.5 h-3.5 rounded-full bg-[#f4f0e8] border-2 border-nexus-ink inline-block" />
            IVORY AI
          </span>
        </div>
      </div>

      {/* Column Drop Controls + 6×7 Connect 4 Rack */}
      <div className="max-w-[440px] mx-auto space-y-2">
        {/* Column Drop Buttons */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: CONNECT4_COLS }).map((_, col) => {
            const canDrop =
              !isLocked && !isAiThinking && !isRoundOver && getDropRow(board, col) !== -1;
            const isHovered = hoverCol === col;

            return (
              <button
                key={`drop-${col}`}
                type="button"
                disabled={!canDrop}
                onMouseEnter={() => setHoverCol(col)}
                onMouseLeave={() => setHoverCol(null)}
                onClick={() => handleDropColumn(col)}
                aria-label={`Drop disc in Column ${col + 1}`}
                className={`h-9 border-2 font-mono text-[10px] font-bold uppercase flex items-center justify-center gap-0.5 transition-colors cursor-pointer disabled:opacity-30 ${
                  isHovered && canDrop
                    ? 'bg-nexus-crimson text-white border-nexus-ink'
                    : 'bg-nexus-paper text-nexus-ink border-nexus-ink hover:bg-nexus-crimson hover:text-white'
                }`}
              >
                <span>C{col + 1}</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            );
          })}
        </div>

        {/* 6×7 Grid Rack */}
        <div
          className="p-2.5 border-4 border-nexus-ink bg-nexus-ink shadow-brutal grid grid-cols-7 gap-1.5 sm:gap-2"
          role="grid"
          aria-label="6 by 7 Connect 4 Grid"
        >
          {Array.from({ length: CONNECT4_ROWS }).map((_, r) =>
            Array.from({ length: CONNECT4_COLS }).map((__, c) => {
              const token = board[r][c];
              const isWinCell = winningSet.has(`${r}-${c}`);
              const targetDropRow = hoverCol === c ? getDropRow(board, c) : -1;
              const isDropPreview =
                !token && !isRoundOver && !isAiThinking && targetDropRow === r;

              let discClass = 'bg-black/75 border-2 border-nexus-paper/20';
              if (token === 'X') {
                discClass = isWinCell
                  ? 'bg-nexus-crimson border-4 border-white scale-105 shadow-[0_0_12px_rgba(200,25,30,0.9)]'
                  : 'bg-nexus-crimson border-2 border-white/80';
              } else if (token === 'O') {
                discClass = isWinCell
                  ? 'bg-[#f4f0e8] border-4 border-nexus-crimson scale-105'
                  : 'bg-[#f4f0e8] border-2 border-white/85';
              } else if (isDropPreview) {
                discClass = 'bg-nexus-crimson/35 border-2 border-dashed border-nexus-crimson';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  disabled={
                    isLocked || isAiThinking || isRoundOver || getDropRow(board, c) === -1
                  }
                  onMouseEnter={() => setHoverCol(c)}
                  onMouseLeave={() => setHoverCol(null)}
                  onClick={() => handleDropColumn(c)}
                  aria-label={`Row ${r + 1} Column ${c + 1}, ${
                    token === 'X' ? 'Your disc' : token === 'O' ? 'AI disc' : 'empty'
                  }`}
                  className="aspect-square rounded-full flex items-center justify-center transition-all cursor-pointer disabled:cursor-default p-0.5"
                >
                  <span className={`w-full h-full rounded-full transition-all ${discClass}`} />
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-[440px] mx-auto grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isLocked}
          onClick={handleResetRound}
          className="min-h-[48px] px-4 py-2.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-nexus-crimson" />
          <span>{isRoundOver && !isPlayerWin ? 'PLAY NEW ROUND' : 'RESET BOARD'}</span>
        </button>

        <button
          type="button"
          disabled={isLocked || !isPlayerWin}
          onClick={handleSubmitWin}
          className="min-h-[48px] px-4 py-2.5 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
          <span>COMPLETE</span>
        </button>
      </div>
    </div>
  );
};

export default Connect4Game;
