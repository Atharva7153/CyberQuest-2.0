import React from 'react';

const GAME_BADGE_LABELS = {
  sudoku: 'SUDOKU // NUMBER GRID',
  connect4: 'CONNECT 4 // 4-IN-A-ROW VS AI',
  wordGuess: 'WORD GUESS // CODEWORD',
  xo4x4: '4×4 TIC-TAC-TOE // VS AI',
  xo: '4×4 TIC-TAC-TOE // VS AI',
  wend: 'WEND // WORD LADDER',
  patches: 'PATCHES // AREA PARTITION',
  zip: 'ZIP // PATH PUZZLE',
};

const renderSudokuPreview = (gameConfig = {}) => {
  const is9x9 = Number(gameConfig?.size) === 9;
  const previewRows = [
    [1, 2, 3, 4, 5, 6],
    [4, 5, 6, 1, 0, 3],
    [2, 0, 4, 5, 6, 1],
    [5, 6, 1, 0, 3, 4],
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-44 border-2 border-nexus-paper/80 bg-nexus-ink shadow-[3px_3px_0_#C8191E] grid grid-cols-6 gap-px p-0.5">
        {previewRows.map((row, r) =>
          row.map((val, c) => {
            const isHighlight = (r === 0 && c === 1) || (r === 2 && c === 3) || (r === 3 && c === 5);
            const isEmpty = val === 0;
            const rightBorder = c === 2 ? 'border-r-2 border-r-nexus-crimson' : '';
            const bottomBorder = r === 1 ? 'border-b-2 border-b-nexus-crimson' : '';
            return (
              <div
                key={`${r}-${c}`}
                className={`h-6 flex items-center justify-center font-mono text-[11px] font-bold ${rightBorder} ${bottomBorder} ${
                  isHighlight
                    ? 'bg-nexus-crimson text-white'
                    : isEmpty
                      ? 'bg-black/70 text-nexus-paper/30'
                      : 'bg-nexus-paper text-nexus-ink'
                }`}
              >
                {isEmpty ? '·' : val}
              </div>
            );
          })
        )}
      </div>
      {is9x9 && (
        <span className="absolute bottom-2 right-2.5 px-1.5 py-0.5 bg-nexus-crimson text-white font-mono text-[9px] font-bold uppercase">
          9×9 MATRIX
        </span>
      )}
    </div>
  );
};

const renderConnect4Preview = () => {
  // 4 rows x 7 cols preview showing a 4-in-a-row diagonal of Crimson ('X') vs Ivory ('O')
  const grid = [
    ['', '', '', '', 'X', '', ''],
    ['', '', '', 'X', 'O', '', ''],
    ['', '', 'X', 'O', 'X', 'O', ''],
    ['', 'X', 'O', 'O', 'X', 'O', 'X'],
  ];
  const winSet = new Set(['3-1', '2-2', '1-3', '0-4']);

  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-48 p-2 border-2 border-nexus-paper/75 bg-black/80 shadow-[3px_3px_0_#C8191E] grid grid-cols-7 gap-1.5">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isWin = winSet.has(`${r}-${c}`);
            return (
              <div
                key={`${r}-${c}`}
                className={`w-4 h-4 rounded-full mx-auto ${
                  cell === 'X'
                    ? isWin
                      ? 'bg-nexus-crimson ring-2 ring-white scale-110'
                      : 'bg-nexus-crimson'
                    : cell === 'O'
                      ? 'bg-nexus-paper'
                      : 'bg-white/10 border border-white/20'
                }`}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

const renderWordGuessPreview = (gameConfig = {}) => {
  const letters = ['C', 'I', 'P', 'H', '_', 'R'];
  const bank = (gameConfig?.scrambledLetters || ['E', 'C', 'I', 'P', 'H', 'R', 'X']).slice(0, 7);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
      <div className="flex items-center gap-1.5">
        {letters.map((ch, idx) => {
          const isBlank = ch === '_';
          return (
            <div
              key={idx}
              className={`w-7 h-8 border-2 flex items-center justify-center font-display text-base font-bold ${
                isBlank
                  ? 'bg-black/60 border-nexus-paper text-nexus-paper animate-pulse'
                  : idx % 2 === 0
                    ? 'bg-nexus-crimson border-white text-white'
                    : 'bg-nexus-paper border-nexus-paper text-nexus-ink'
              }`}
            >
              {ch}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-1">
        {bank.map((ch, idx) => (
          <span
            key={idx}
            className="w-5 h-5 border border-nexus-paper/40 bg-white/10 text-nexus-paper font-mono text-[10px] font-bold flex items-center justify-center"
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
};

const renderXo4x4Preview = () => {
  const cells = [
    'X', 'O', '', 'O',
    '', 'X', 'O', '',
    'O', '', 'X', '',
    '', '', 'O', 'X',
  ];
  const winLine = new Set([0, 5, 10, 15]);

  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-32 aspect-square p-1.5 border-2 border-nexus-paper/80 bg-black/80 shadow-[3px_3px_0_#C8191E] grid grid-cols-4 gap-1">
        {cells.map((mark, idx) => {
          const isWin = winLine.has(idx);
          return (
            <div
              key={idx}
              className={`flex items-center justify-center font-display text-sm leading-none border ${
                isWin
                  ? 'bg-nexus-crimson text-white border-white font-bold'
                  : mark === 'O'
                    ? 'bg-nexus-paper text-nexus-ink border-nexus-paper'
                    : 'bg-white/5 text-nexus-paper/40 border-white/15'
              }`}
            >
              {mark}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const renderWendPreview = (gameConfig = {}) => {
  const start = String(gameConfig?.startWord || 'CODE').slice(0, 4).toUpperCase();
  const end = String(gameConfig?.targetWord || gameConfig?.endWord || 'GATE')
    .slice(0, 4)
    .toUpperCase();
  const ladder = [
    { word: start, changedIdx: -1 },
    { word: 'MODE', changedIdx: 0 },
    { word: 'MADE', changedIdx: 1 },
    { word: end, changedIdx: 0 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2.5">
      {ladder.map((rung, rIdx) => (
        <div key={rIdx} className="flex items-center gap-1">
          {rung.word.split('').map((ch, cIdx) => {
            const isChanged = rIdx > 0 && cIdx === rung.changedIdx;
            return (
              <span
                key={cIdx}
                className={`w-6 h-5 flex items-center justify-center font-mono text-[11px] font-bold border ${
                  isChanged
                    ? 'bg-nexus-crimson text-white border-white'
                    : rIdx === 0 || rIdx === ladder.length - 1
                      ? 'bg-nexus-paper text-nexus-ink border-nexus-paper'
                      : 'bg-black/70 text-nexus-paper border-nexus-paper/35'
                }`}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const renderPatchesPreview = () => {
  // Visual 4x4 partitioned grid with 4 distinct rectangular regions
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-36 h-28 border-2 border-nexus-paper/85 bg-nexus-ink shadow-[3px_3px_0_#C8191E] grid grid-cols-4 grid-rows-3 gap-1 p-1 font-mono text-xs font-bold">
        {/* 2x2 patch = 4 */}
        <div className="col-span-2 row-span-2 bg-nexus-crimson text-white border border-white flex items-center justify-center">
          4
        </div>
        {/* 2x1 patch = 2 */}
        <div className="col-span-2 row-span-1 bg-nexus-paper text-nexus-ink border border-nexus-ink flex items-center justify-center">
          2
        </div>
        {/* 2x2 patch = 4 */}
        <div className="col-span-2 row-span-2 bg-nexus-paper/20 text-nexus-paper border border-nexus-paper/60 flex items-center justify-center">
          4
        </div>
        {/* 2x1 patch = 2 */}
        <div className="col-span-2 row-span-1 bg-nexus-paper/85 text-nexus-ink border border-nexus-ink flex items-center justify-center">
          2
        </div>
      </div>
    </div>
  );
};

const renderZipPreview = () => {
  // 3x5 mini Zip grid with numbered waypoints 1 -> 2 -> 3 -> 4
  const waypoints = {
    '0-0': 1,
    '0-4': 2,
    '1-1': 3,
    '2-4': 4,
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-44 p-1.5 border-2 border-nexus-paper/80 bg-black/80 shadow-[3px_3px_0_#C8191E] grid grid-cols-5 gap-1">
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 5 }).map((__, c) => {
            const wp = waypoints[`${r}-${c}`];
            const isVisited = r < 2 || c <= 3;
            return (
              <div
                key={`${r}-${c}`}
                className={`h-6 flex items-center justify-center font-mono text-[10px] font-bold border ${
                  wp
                    ? 'bg-nexus-crimson text-white border-white rounded-sm scale-105'
                    : isVisited
                      ? 'bg-nexus-crimson/35 text-nexus-paper border-nexus-crimson/70'
                      : 'bg-white/5 text-nexus-paper/30 border-white/15'
                }`}
              >
                {wp || (isVisited ? '•' : '')}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export const GamePreviewThumbnail = ({ challenge, className = '' }) => {
  const gameType = challenge?.gameType || 'sudoku';
  const gameConfig = challenge?.gameConfig || {};
  const badgeLabel =
    GAME_BADGE_LABELS[gameType] || `${String(gameType).toUpperCase()} // GAME`;

  let previewContent = null;
  if (gameType === 'sudoku') {
    previewContent = renderSudokuPreview(gameConfig);
  } else if (gameType === 'connect4') {
    previewContent = renderConnect4Preview(gameConfig);
  } else if (gameType === 'wordGuess') {
    previewContent = renderWordGuessPreview(gameConfig);
  } else if (gameType === 'xo4x4' || gameType === 'xo') {
    previewContent = renderXo4x4Preview(gameConfig);
  } else if (gameType === 'wend') {
    previewContent = renderWendPreview(gameConfig);
  } else if (gameType === 'patches') {
    previewContent = renderPatchesPreview(gameConfig);
  } else if (gameType === 'zip') {
    previewContent = renderZipPreview(gameConfig);
  } else {
    previewContent = renderSudokuPreview(gameConfig);
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-nexus-ink select-none flex flex-col justify-between ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(rgba(236, 231, 223, 0.12) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    >
      {/* Top Game Type Tag */}
      <div className="relative z-10 px-3 pt-2.5 flex items-center justify-between pointer-events-none">
        <span className="px-2 py-0.5 bg-black/80 border border-nexus-paper/30 text-nexus-paper font-mono text-[9px] font-bold uppercase tracking-widest">
          {badgeLabel}
        </span>
      </div>

      {/* Interactive Game Board Illustration */}
      <div className="relative z-10 flex-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        {previewContent}
      </div>
    </div>
  );
};

export default GamePreviewThumbnail;
