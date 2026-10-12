import React, { useState, useEffect, useMemo } from 'react';
import { RotateCcw, Send, Trophy, AlertCircle, Cpu, Lock } from 'lucide-react';
import {
  normalizeXo4x4Config,
  createInitialXo4x4Board,
  evaluateXo4x4Board,
  chooseAiMove4x4,
  serializeXo4x4Submission,
} from './xo4x4Logic';

export const Xo4x4Game = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizeXo4x4Config(gameConfig), [gameConfig]);
  const { blockedCells, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const [board, setBoard] = useState(() => createInitialXo4x4Board(blockedCells));
  const [moves, setMoves] = useState([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);

  useEffect(() => {
    setBoard(createInitialXo4x4Board(blockedCells));
    setMoves([]);
    setIsAiThinking(false);
    setRoundNumber(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.challengeId, session?.attemptId]);

  const outcome = useMemo(() => evaluateXo4x4Board(board), [board]);
  const isPlayerWin = outcome.winner === 'X';
  const isAiWin = outcome.winner === 'O';
  const isDraw = outcome.isDraw;
  const isRoundOver = Boolean(outcome.winner || outcome.isDraw);

  // Sync draft with parent ChallengeSessionPage when player wins
  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const answer = isPlayerWin ? serializeXo4x4Submission(board, moves) : '';
      onDraftChange({
        gameType: 'xo4x4',
        answer,
        board,
        moves,
        winner: outcome.winner,
        isComplete: isPlayerWin,
        isValid: isPlayerWin,
      });
    }
  }, [board, moves, isPlayerWin, outcome.winner, onDraftChange]);

  const handleCellClick = (index) => {
    if (isLocked || isAiThinking || isRoundOver) return;
    if (board[index] !== '') return;

    const nextBoard = [...board];
    nextBoard[index] = 'X';
    const nextMoves = [...moves, { player: 'X', index }];

    setBoard(nextBoard);
    setMoves(nextMoves);

    const playerCheck = evaluateXo4x4Board(nextBoard);
    if (playerCheck.winner || playerCheck.isDraw) {
      return;
    }

    // AI Turn
    setIsAiThinking(true);
    setTimeout(() => {
      const aiIndex = chooseAiMove4x4(nextBoard, nextMoves.length);
      if (aiIndex >= 0) {
        const afterAiBoard = [...nextBoard];
        afterAiBoard[aiIndex] = 'O';
        setBoard(afterAiBoard);
        setMoves((prev) => [...prev, { player: 'O', index: aiIndex }]);
      }
      setIsAiThinking(false);
    }, 220);
  };

  const handleResetRound = () => {
    if (isLocked) return;
    setBoard(createInitialXo4x4Board(blockedCells));
    setMoves([]);
    setIsAiThinking(false);
    setRoundNumber((r) => r + 1);
  };

  const handleSubmitWin = () => {
    if (isLocked || !isPlayerWin) return;
    onSubmitAnswer({
      gameType: 'xo4x4',
      answer: serializeXo4x4Submission(board, moves),
      board,
      moves,
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
              AI BLOCKED — TRY AGAIN
            </span>
          ) : isDraw ? (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              GRID DRAW — NEW ROUND
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper inline-flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-nexus-crimson" />
              {isAiThinking ? 'AI THINKING...' : 'YOUR TURN (X)'}
            </span>
          )}
        </div>
      </div>

      {/* Legend Bar */}
      <div className="max-w-[380px] mx-auto grid grid-cols-2 gap-2.5 font-mono text-xs">
        <div className="p-2.5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-nexus-paper/70">YOU</span>
          <span className="font-display text-xl text-nexus-crimson">MARK [ X ]</span>
        </div>
        <div className="p-2.5 border-2 border-nexus-ink bg-nexus-paper-elevated text-nexus-ink flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-nexus-muted">AI OPPONENT</span>
          <span className="font-display text-xl text-nexus-ink">MARK [ O ]</span>
        </div>
      </div>

      {/* 4×4 Interactive Grid */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-[380px] aspect-square grid grid-cols-4 grid-rows-4 gap-2 p-2.5 border-4 border-nexus-ink bg-nexus-ink shadow-brutal"
          role="grid"
          aria-label="4 by 4 Tic-Tac-Toe Grid"
        >
          {board.map((cell, index) => {
            const isWinningCell = outcome.winningLine.includes(index);
            const isBlocked = cell === '#';
            const r = Math.floor(index / 4) + 1;
            const c = (index % 4) + 1;

            let cellStyle =
              'bg-nexus-paper text-nexus-ink hover:bg-nexus-paper-elevated border-2 border-nexus-ink';
            if (isBlocked) {
              cellStyle =
                'bg-black/60 text-nexus-paper/35 border-2 border-nexus-paper/20 cursor-not-allowed';
            } else if (isWinningCell && isPlayerWin) {
              cellStyle = 'bg-nexus-crimson text-white border-2 border-white';
            } else if (isWinningCell && isAiWin) {
              cellStyle = 'bg-black text-nexus-crimson border-2 border-nexus-crimson';
            } else if (cell === 'X') {
              cellStyle = 'bg-nexus-ink text-white border-2 border-nexus-crimson';
            } else if (cell === 'O') {
              cellStyle = 'bg-nexus-paper-elevated text-nexus-ink border-2 border-nexus-ink';
            }

            return (
              <button
                key={index}
                type="button"
                disabled={isLocked || isAiThinking || isRoundOver || cell !== ''}
                onClick={() => handleCellClick(index)}
                aria-label={`Row ${r} Column ${c}, ${
                  isBlocked ? 'blocked' : cell || 'empty'
                }`}
                className={`flex items-center justify-center font-display text-4xl sm:text-5xl leading-none transition-colors cursor-pointer disabled:cursor-default ${cellStyle}`}
              >
                {isBlocked ? <Lock className="w-5 h-5 opacity-50" /> : cell}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-[380px] mx-auto grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isLocked}
          onClick={handleResetRound}
          className="min-h-[48px] px-4 py-2.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-nexus-crimson" />
          <span>{isRoundOver && !isPlayerWin ? 'PLAY NEW ROUND' : 'RESET ROUND'}</span>
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

export default Xo4x4Game;
