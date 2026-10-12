import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Filter,
  ArrowUpRight,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { RiskBadge, getRiskMetadata } from './RiskBadge';
import { GamePreviewThumbnail } from './GamePreviewThumbnail';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Supplied NEXUS architectural imagery
import artLogic from '../assets/artwork/challenge-logic.jpg';
import artPuzzles from '../assets/artwork/challenge-puzzles.jpg';
import artObservation from '../assets/artwork/challenge-observation.jpg';
import artKnowledge from '../assets/artwork/challenge-knowledge.jpg';
import artTechnical from '../assets/artwork/challenge-technical.jpg';
import artMonolithGate from '../assets/artwork/nexus-monolith-gate.jpg';
import artRingCitadel from '../assets/artwork/nexus-ring-citadel.jpg';
import artCorridor from '../assets/artwork/nexus-corridor.jpg';
import artCoreBridge from '../assets/artwork/nexus-core-bridge.jpg';
import artRiskStairs from '../assets/artwork/nexus-risk-stairs.jpg';
import artCreditsSpire from '../assets/artwork/nexus-credits-spire.jpg';

export const MARKET_CATEGORIES = [
  'ALL',
  'LOGIC',
  'PUZZLES',
  'OBSERVATION',
  'KNOWLEDGE',
  'TECHNICAL',
];

export const MARKET_DIFFICULTIES = ['ALL', 'LOW', 'MODERATE', 'HIGH', 'EXTREME'];

export const MARKET_RISKS = ['ALL', 'SAFE', 'BALANCED', 'AGGRESSIVE'];

const ARTWORK_MAP = {
  LOGIC: artLogic,
  PUZZLES: artPuzzles,
  OBSERVATION: artObservation,
  KNOWLEDGE: artKnowledge,
  TECHNICAL: artTechnical,
  MONOLITH_GATE: artMonolithGate,
  RING_CITADEL: artRingCitadel,
  CORRIDOR: artCorridor,
  CORE_BRIDGE: artCoreBridge,
  RISK_STAIRS: artRiskStairs,
  CREDITS_SPIRE: artCreditsSpire,
};

export const resolveChallengeArtwork = (challenge) => {
  const artworkKey = challenge?.gameConfig?.artworkKey;
  if (artworkKey && ARTWORK_MAP[artworkKey]) {
    return ARTWORK_MAP[artworkKey];
  }
  const categoryKey = String(challenge?.category || '').toUpperCase();
  return ARTWORK_MAP[categoryKey] || artTechnical;
};

export const formatTimeLimit = (seconds) => {
  const totalSec = Number(seconds) || 180;
  const mins = totalSec / 60;
  const formatted = Number.isInteger(mins) ? String(mins) : mins.toFixed(1).replace(/\.0$/, '');
  return `${formatted} MIN`;
};

export const formatTimeLimitDetailed = (seconds) => {
  const totalSec = Number(seconds) || 180;
  const mins = totalSec / 60;
  const formatted = Number.isInteger(mins) ? String(mins) : mins.toFixed(1).replace(/\.0$/, '');
  return `${formatted} MIN`;
};

const FRIENDLY_TITLE_BY_ID = {
  'CHG-PUZ-05': 'WORD GUESS',
  'CHG-LOG-04': 'SUDOKU (6×6)',
  'CHG-PUZ-07': '4×4 TIC-TAC-TOE',
  'CHG-FOR-02': 'PATCHES (5×5)',
  'CHG-NET-01': 'ZIP (PATH PUZZLE)',
  'CHG-LOG-06': 'CONNECT 4',
  'CHG-KNW-09': 'WEND (WORD LADDER)',
  'CHG-OBS-08': 'PATCHES (6×6)',
  'CHG-ZDY-03': 'SUDOKU (9×9)',
  'CHG-TEC-10': 'ZIP (LEVEL 2)',
  'CHG-TEC-11': 'PATCHES (LEVEL 2)',
  'CHG-TEC-12': 'WEND (LEVEL 2)',
  'CHG-LOG-13': 'N-QUEENS (5×5)',
  'CHG-LOG-14': 'N-QUEENS (6×6)',
  'CHG-LOG-15': 'APTITUDE: QUANT & SERIES',
  'CHG-PUZ-16': 'APTITUDE: LOGIC & DEDUCTION',
  'CHG-KNW-17': 'GK: TECH & SCIENCE (6 T/F)',
  'CHG-KNW-18': 'GK: WORLD & CYBER (6 T/F)',
  'CHG-OBS-19': 'MEMORY MATRIX (4×4)',
  'CHG-OBS-20': 'MEMORY MATRIX (5×5)',
  'CHG-INIT-00': 'WORD GUESS (WARMUP)',
};

const FRIENDLY_TITLE_BY_LEGACY_CODENAME = {
  'CIPHER MONOLITH': 'WORD GUESS',
  'SIGNAL LABYRINTH': 'SUDOKU (6×6)',
  'TESSELLATION VAULT': '4×4 TIC-TAC-TOE',
  'FORENSIC TRACE': 'PATCHES (5×5)',
  'NETWORK BREACH': 'ZIP (PATH PUZZLE)',
  'AXIOM PROTOCOL': 'CONNECT 4',
  'ARCHIVE CODEX': 'WEND (WORD LADDER)',
  'PANOPTICON FEED': 'PATCHES (6×6)',
  'ZERO DAY HUNT': 'SUDOKU (9×9)',
  'OVERLORD KERNEL': 'ZIP (LEVEL 2)',
  'BITWISE SENTINEL': 'PATCHES (LEVEL 2)',
  'REACTOR DEADLOCK': 'WEND (LEVEL 2)',
  'PERIMETER HANDSHAKE': 'WORD GUESS (WARMUP)',
};

const FRIENDLY_DESCRIPTION_BY_ID = {
  'CHG-PUZ-05': 'Unscramble the letter tiles using the clues to spell both 6-letter words.',
  'CHG-LOG-04': 'Fill the 6×6 Sudoku grid so every row, column, and 2×3 block has numbers 1 to 6.',
  'CHG-PUZ-07': 'Beat the AI by getting 4 X marks in a row horizontally, vertically, or diagonally.',
  'CHG-FOR-02': 'Divide the 5×5 grid into rectangles so each rectangle matches the number inside it.',
  'CHG-NET-01': 'Connect numbers 1 to 6 in order with a single line that visits every square on the board.',
  'CHG-LOG-06': 'Drop Red discs into the 7×6 board and connect 4 in a row before the AI.',
  'CHG-KNW-09': 'Turn PORT into PING by changing one letter at a time using the clues.',
  'CHG-OBS-08': 'Divide the 6×6 grid into rectangles so each rectangle matches the number inside it.',
  'CHG-ZDY-03': 'Solve the 9×9 Sudoku grid so every row, column, and 3×3 block has numbers 1 to 9.',
  'CHG-TEC-10': 'Connect numbers 1 to 6 in order while visiting every square on the 5×5 grid.',
  'CHG-TEC-11': 'Split the 5×5 grid into rectangles matching each numbered area clue.',
  'CHG-TEC-12': 'Turn FAIL into PASS one letter at a time using the step clues.',
  'CHG-LOG-13': 'Place 5 Queens on the 5×5 board so no two Queens share the same row, column, or diagonal.',
  'CHG-LOG-14': 'Place 6 Queens on the 6×6 board so no two Queens share the same row, column, or diagonal.',
  'CHG-LOG-15': 'Solve 4 rapid-fire quantitative aptitude problems covering number series, time & work, and ratios.',
  'CHG-PUZ-16': 'Solve 4 logical reasoning & deduction aptitude problems.',
  'CHG-KNW-17': '1 Round of 6 rapid-fire True or False statements on Technology, Space & Science.',
  'CHG-KNW-18': '1 Round of 6 rapid-fire True or False statements on World Facts, Computing & Cyber.',
  'CHG-OBS-19': 'Observe the flashing signal nodes on the 4×4 matrix and reconstruct all 3 progressive recall patterns from memory.',
  'CHG-OBS-20': 'High-density 5×5 spatial recall test: memorize and reconstruct 6, 7, and 8 flashing neural nodes across 3 stages.',
};

export const getFriendlyChallengeTitle = (challengeOrTitle) => {
  if (!challengeOrTitle) return 'CHALLENGE';
  if (typeof challengeOrTitle === 'string') {
    const upper = challengeOrTitle.trim().toUpperCase();
    return FRIENDLY_TITLE_BY_LEGACY_CODENAME[upper] || FRIENDLY_TITLE_BY_ID[upper] || challengeOrTitle;
  }

  const rawTitle = String(challengeOrTitle.title || '').trim();
  const upperTitle = rawTitle.toUpperCase();
  if (FRIENDLY_TITLE_BY_LEGACY_CODENAME[upperTitle]) {
    return FRIENDLY_TITLE_BY_LEGACY_CODENAME[upperTitle];
  }

  const idKey = String(challengeOrTitle.challengeId || '').trim().toUpperCase();
  if (FRIENDLY_TITLE_BY_ID[idKey] && (!rawTitle || FRIENDLY_TITLE_BY_LEGACY_CODENAME[upperTitle])) {
    return FRIENDLY_TITLE_BY_ID[idKey];
  }
  if (rawTitle) {
    return rawTitle;
  }
  if (FRIENDLY_TITLE_BY_ID[idKey]) {
    return FRIENDLY_TITLE_BY_ID[idKey];
  }

  const gt = String(challengeOrTitle.gameType || '').trim();
  if (gt === 'connect4') return 'CONNECT 4';
  if (gt === 'sudoku') return Number(challengeOrTitle?.gameConfig?.size) === 9 ? 'SUDOKU (9×9)' : 'SUDOKU (6×6)';
  if (gt === 'xo4x4' || gt === 'xo') return '4×4 TIC-TAC-TOE';
  if (gt === 'wordGuess') return 'WORD GUESS';
  if (gt === 'patches') return Number(challengeOrTitle?.gameConfig?.rows) === 6 ? 'PATCHES (6×6)' : 'PATCHES (5×5)';
  if (gt === 'zip') return 'ZIP (PATH PUZZLE)';
  if (gt === 'wend') return 'WEND (WORD LADDER)';
  if (gt === 'queens') return `N-QUEENS (${Number(challengeOrTitle?.gameConfig?.size) || 5}×${Number(challengeOrTitle?.gameConfig?.size) || 5})`;
  if (gt === 'aptitude') return 'APTITUDE CHALLENGE';
  if (gt === 'gkTrueFalse') return 'GK (6× TRUE OR FALSE)';
  if (gt === 'memoryMatrix') return `MEMORY MATRIX (${Number(challengeOrTitle?.gameConfig?.size) || 4}×${Number(challengeOrTitle?.gameConfig?.size) || 4})`;

  return 'CHALLENGE';
};

export const getFriendlyChallengeDescription = (challenge) => {
  if (!challenge) return '';
  const idKey = String(challenge.challengeId || '').trim().toUpperCase();
  if (FRIENDLY_DESCRIPTION_BY_ID[idKey]) {
    return FRIENDLY_DESCRIPTION_BY_ID[idKey];
  }
  return challenge.description || '';
};

/**
 * Simplified Participant Challenge Card
 * Shows:
 * - Category
 * - Game Board Visual Preview
 * - Challenge Title
 * - Cost
 * - Reward
 * - Difficulty
 * - Risk
 * - Action ([ START ] / [ CONTINUE ] / [ REATTEMPT ])
 */
export const ClassifiedChallengeCard = ({
  challenge,
  isCurrent,
  solvingOperativeName = null,
  isPurchased = false,
  isSolved,
  isFailed,
  isRoundActive = true,
  reattemptMultiplier,
  isSelected,
  onSelectChallenge,
  prefersReducedMotion,
  compact = false,
}) => {
  const cardArtContainerRef = useRef(null);

  const isAvailable = challenge.enabled !== false && challenge.available !== false;
  const reattemptCost = Math.round(
    Number(challenge.cost || 0) * (Number(reattemptMultiplier) || 1.25)
  );
  const displayCost = isPurchased
    ? 'PAID (0 CR)'
    : `${isFailed ? reattemptCost : challenge.cost} CR`;
  const friendlyTitle = getFriendlyChallengeTitle(challenge);
  const friendlyDescription = getFriendlyChallengeDescription(challenge);

  const actionLabel = !isRoundActive
    ? '[ TIMER STOPPED ]'
    : isCurrent
      ? solvingOperativeName
        ? `[ SOLVING: ${solvingOperativeName} ]`
        : '[ CONTINUE ]'
      : isSolved
        ? '[ SOLVED ]'
        : isPurchased
          ? '[ SOLVE NOW ]'
          : isFailed
            ? '[ REATTEMPT ]'
            : !isAvailable
              ? '[ LOCKED ]'
              : '[ BUY / SOLVE ]';

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelectChallenge(challenge)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectChallenge(challenge);
        }
      }}
      aria-label={`Select challenge ${friendlyTitle} (${challenge.category})`}
      className={`group relative flex flex-col justify-between border-2 transition-colors cursor-pointer select-none overflow-hidden focus-visible:outline-2 focus-visible:outline-nexus-crimson ${
        isCurrent || isSelected || isPurchased
          ? 'border-nexus-crimson shadow-brutal-crimson bg-nexus-ink'
          : 'border-nexus-ink shadow-brutal-sm hover:border-nexus-crimson bg-nexus-ink'
      }`}
    >
      {/* Top Dark Chamber: Category + Game Preview + Title */}
      <div className="flex flex-col flex-1 bg-nexus-ink text-nexus-paper">
        <div className="px-3.5 py-2.5 border-b border-nexus-paper/15 flex items-center justify-between gap-2 bg-black/50">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 bg-nexus-crimson shrink-0" />
            <span className="font-condensed text-sm sm:text-base font-extrabold uppercase tracking-[0.2em] text-nexus-paper truncate">
              {challenge.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {!isRoundActive && (
              <span className="px-1.5 py-0.5 bg-white/15 text-nexus-paper font-mono text-[9px] font-bold uppercase tracking-wider">
                LOCKED
              </span>
            )}
            {isCurrent && (
              <span className="px-1.5 py-0.5 bg-nexus-crimson text-white font-mono text-[9px] font-bold uppercase tracking-wider truncate max-w-[130px]">
                {solvingOperativeName ? `SOLVING: ${solvingOperativeName}` : 'ACTIVE'}
              </span>
            )}
            {isPurchased && !isCurrent && !isSolved && (
              <span className="px-1.5 py-0.5 bg-white text-nexus-ink font-mono text-[9px] font-bold uppercase tracking-wider">
                PURCHASED
              </span>
            )}
            {isSolved && !isCurrent && (
              <span className="px-1.5 py-0.5 bg-nexus-paper text-nexus-ink font-mono text-[9px] font-bold uppercase tracking-wider">
                SOLVED
              </span>
            )}
            {isFailed && !isCurrent && !isPurchased && (
              <span className="px-1.5 py-0.5 bg-nexus-crimson/25 border border-nexus-crimson text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                REATTEMPT
              </span>
            )}
            {!isAvailable && (
              <span className="px-1.5 py-0.5 bg-white/10 text-nexus-paper/60 font-mono text-[9px] font-bold uppercase tracking-wider">
                LOCKED
              </span>
            )}
          </div>
        </div>

        {/* Game Visual Preview (Instead of AI Images) */}
        <div
          ref={cardArtContainerRef}
          className={`relative w-full ${
            compact ? 'h-24 sm:h-36' : 'h-44 sm:h-48'
          } overflow-hidden bg-black border-b border-nexus-paper/15`}
        >
          <GamePreviewThumbnail challenge={challenge} />

          <div className="absolute top-2.5 right-2.5 z-10">
            <CrosshairMark variant="crimson" size={12} />
          </div>
        </div>

        {/* Title */}
        <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-1.5 sm:space-y-2">
          <h3 className="font-display text-xl sm:text-[26px] uppercase tracking-wide text-nexus-paper leading-none group-hover:text-nexus-crimson transition-colors">
            {friendlyTitle}
          </h3>

          {!compact && friendlyDescription && (
            <p className="font-editorial text-xs text-nexus-paper/75 line-clamp-2 leading-relaxed">
              {friendlyDescription}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Crimson Specification Block: Cost, Reward, Difficulty, Risk + Action */}
      <div className="bg-nexus-crimson text-white p-2.5 sm:p-3.5 border-t-2 border-nexus-ink font-mono text-xs space-y-1 sm:space-y-1.5">
        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            COST
          </span>
          <span className="font-bold text-xs sm:text-sm tracking-wider">
            {displayCost}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            REWARD
          </span>
          <span className="font-bold text-xs sm:text-sm tracking-wider">+{challenge.reward} CR</span>
        </div>

        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            DIFFICULTY
          </span>
          <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-widest">
            {challenge.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            RISK
          </span>
          <RiskBadge risk={challenge.risk} size="xs" variant="onCrimson" />
        </div>

        <div className="pt-1">
          <span className="w-full py-1.5 px-2.5 sm:px-3 bg-nexus-ink text-nexus-paper group-hover:bg-white group-hover:text-nexus-ink font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] flex items-center justify-center transition-colors truncate">
            {actionLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * Challenge Market View
 */
export const ChallengeMarketModule = ({
  catalog = [],
  team,
  creditsConfig,
  actionPending = false,
  isRoundActive = true,
  onAcquireChallenge,
  onBuyChallengeForLater,
  onOpenExecutionPanel,
  initialRiskFilter = 'ALL',
  compact = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState(initialRiskFilter || 'ALL');

  React.useEffect(() => {
    if (initialRiskFilter && MARKET_RISKS.includes(initialRiskFilter)) {
      setSelectedRisk(initialRiskFilter);
    }
  }, [initialRiskFilter]);

  const [inspectingChallenge, setInspectingChallenge] = useState(null);
  const [modalError, setModalError] = useState('');

  const activeChallenge = team?.currentChallenge;
  const activeAttemptsList = useMemo(() => {
    if (Array.isArray(team?.activeAttempts) && team.activeAttempts.length > 0) {
      return team.activeAttempts;
    }
    return team?.activeAttempt ? [team.activeAttempt] : [];
  }, [team?.activeAttempts, team?.activeAttempt]);

  const activeAttemptsByChallengeId = useMemo(() => {
    const map = new Map();
    for (const att of activeAttemptsList) {
      if (att?.challengeId) {
        map.set(String(att.challengeId).toUpperCase(), att);
      }
    }
    return map;
  }, [activeAttemptsList]);

  const purchasedChallenges = useMemo(
    () => (Array.isArray(team?.purchasedChallenges) ? team.purchasedChallenges : []),
    [team?.purchasedChallenges]
  );
  const purchasedIds = useMemo(
    () => new Set(purchasedChallenges.map((c) => c.challengeId)),
    [purchasedChallenges]
  );
  const completedIds = useMemo(
    () => new Set((team?.completedChallenges || []).map((c) => c.challengeId)),
    [team?.completedChallenges]
  );
  const failedIds = useMemo(
    () => new Set((team?.failedChallenges || []).map((c) => c.challengeId)),
    [team?.failedChallenges]
  );

  const filteredChallenges = useMemo(() => {
    return (catalog || []).filter((item) => {
      if (item.enabled === false) return false;
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'ALL' && item.difficulty !== selectedDifficulty) return false;
      if (selectedRisk !== 'ALL' && item.risk !== selectedRisk) return false;
      return true;
    });
  }, [catalog, selectedCategory, selectedDifficulty, selectedRisk]);

  const categoryCounts = useMemo(() => {
    const counts = { ALL: (catalog || []).filter((c) => c.enabled !== false).length };
    MARKET_CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = (catalog || []).filter(
        (c) => c.enabled !== false && c.category === cat
      ).length;
    });
    return counts;
  }, [catalog]);

  const hasActiveFilters =
    selectedCategory !== 'ALL' || selectedDifficulty !== 'ALL' || selectedRisk !== 'ALL';

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
    setSelectedRisk('ALL');
  };

  const handleOpenConfirmation = (challenge) => {
    setModalError('');
    setInspectingChallenge(challenge);
  };

  const handleCloseConfirmation = () => {
    setInspectingChallenge(null);
    setModalError('');
  };

  const handleConfirmAcquire = async () => {
    if (!inspectingChallenge || !onAcquireChallenge) return;
    setModalError('');

    if (!isRoundActive) {
      setModalError(
        'Round timer is currently stopped. Wait for the Organizer to start the round before accessing challenges.'
      );
      return;
    }

    const isFailed = failedIds.has(inspectingChallenge.challengeId);

    try {
      await onAcquireChallenge({
        challengeId: inspectingChallenge.challengeId,
        isReattempt: isFailed,
        buyOnly: false,
      });
      setInspectingChallenge(null);
    } catch (err) {
      setModalError(err?.message || 'Unable to start this challenge.');
    }
  };

  const handleConfirmBuyForLater = async () => {
    if (!inspectingChallenge) return;
    setModalError('');

    if (!isRoundActive) {
      setModalError(
        'Round timer is currently stopped. Wait for the Organizer to start the round before buying challenges.'
      );
      return;
    }

    const isFailed = failedIds.has(inspectingChallenge.challengeId);

    try {
      if (onBuyChallengeForLater) {
        await onBuyChallengeForLater({
          challengeId: inspectingChallenge.challengeId,
          isReattempt: isFailed,
        });
      } else if (onAcquireChallenge) {
        await onAcquireChallenge({
          challengeId: inspectingChallenge.challengeId,
          isReattempt: isFailed,
          buyOnly: true,
        });
      }
      setInspectingChallenge(null);
    } catch (err) {
      setModalError(err?.message || 'Unable to purchase this challenge.');
    }
  };

  const inspectingIsFailed = inspectingChallenge
    ? failedIds.has(inspectingChallenge.challengeId)
    : false;
  const inspectingActiveAttempt = inspectingChallenge
    ? activeAttemptsByChallengeId.get(String(inspectingChallenge.challengeId).toUpperCase())
    : null;
  const inspectingIsCurrent = inspectingChallenge
    ? Boolean(inspectingActiveAttempt) || activeChallenge?.challengeId === inspectingChallenge.challengeId
    : false;
  const inspectingIsPurchased = inspectingChallenge
    ? purchasedIds.has(inspectingChallenge.challengeId) || inspectingIsCurrent
    : false;
  const inspectingEffectiveCost = inspectingChallenge
    ? inspectingIsPurchased
      ? 0
      : inspectingIsFailed
        ? Math.round(
            Number(inspectingChallenge.cost || 0) *
              (Number(creditsConfig?.reattemptMultiplier) || 1.25)
          )
        : inspectingChallenge.cost
    : 0;

  const squadActivitySlots = useMemo(() => {
    const rawMembers =
      Array.isArray(team?.members) && team.members.length > 0
        ? team.members.slice(0, 4)
        : [
            { memberId: 'OP-01', name: 'OPERATIVE_01', role: 'CAPTAIN', online: true },
            { memberId: 'OP-02', name: 'OPERATIVE_02', role: 'SPECIALIST', online: false },
            { memberId: 'OP-03', name: 'OPERATIVE_03', role: 'ANALYST', online: false },
            { memberId: 'OP-04', name: 'OPERATIVE_04', role: 'VANGUARD', online: false },
          ];

    const currentOpId = String(team?.currentOperative?.memberId || '').toUpperCase();
    const usedAttemptIds = new Set();

    return rawMembers.map((member, idx) => {
      const mId = String(member.memberId || `OP-0${idx + 1}`).toUpperCase();
      const mName = String(member.name || `OPERATIVE_0${idx + 1}`);
      const isMe = Boolean(currentOpId && mId === currentOpId);
      const isOnline = Boolean(member.online || isMe);

      let matchedAttempt = activeAttemptsList.find(
        (att) =>
          !usedAttemptIds.has(att.attemptId || att.challengeId) &&
          (String(att.assignedMemberId || '').toUpperCase() === mId ||
            String(att.assignedMemberName || '').toUpperCase() === mName.toUpperCase())
      );

      if (!matchedAttempt && idx === 0 && activeAttemptsList.length > 0) {
        const fallbackAtt = activeAttemptsList.find(
          (att) =>
            !att.assignedMemberId && !usedAttemptIds.has(att.attemptId || att.challengeId)
        );
        if (fallbackAtt) matchedAttempt = fallbackAtt;
      }

      if (matchedAttempt) {
        usedAttemptIds.add(matchedAttempt.attemptId || matchedAttempt.challengeId);
      }

      return {
        memberId: mId,
        name: mName,
        role: member.role || (idx === 0 ? 'CAPTAIN' : 'OPERATIVE'),
        isMe,
        isOnline,
        activeAttempt: matchedAttempt || null,
      };
    });
  }, [team?.members, team?.currentOperative?.memberId, activeAttemptsList]);

  const scrollTrackRef = useRef(null);

  const handleScrollHorizontal = (direction) => {
    if (!scrollTrackRef.current) return;
    scrollTrackRef.current.scrollBy({
      left: direction * 340,
      behavior: 'smooth',
    });
  };

  const handleWheelToHorizontal = (e) => {
    if (!scrollTrackRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollTrackRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section
      aria-label="Challenge Market"
      className="flex flex-col gap-4"
    >
      {/* 1. Header & Filters (Always on Top) */}
      <div className="nexus-editorial-box p-3.5 sm:p-5 relative overflow-hidden order-1">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2.5 sm:gap-3 border-b-2 border-nexus-ink pb-3">
          <div>
            <span className="bg-nexus-ink text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-[0.24em] px-2.5 py-0.5 inline-block mb-1.5">
              CHALLENGES · TEAM SHARED CREDITS
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-nexus-ink leading-none">
                THE CHALLENGE
              </h2>
              <span className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-nexus-crimson leading-none">
                MARKET
              </span>
            </div>
          </div>

          <p className="font-editorial text-xs sm:text-sm text-nexus-charcoal max-w-md lg:text-right">
            Teammates can buy challenges for later or solve multiple challenges simultaneously across devices.
          </p>
        </div>

        {/* Round Timer Stopped Warning Banner */}
        {!isRoundActive && (
          <div className="mt-3 p-3 border-2 border-nexus-ink bg-nexus-crimson text-white font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <div>
                <p className="font-bold uppercase tracking-widest">
                  ROUND TIMER STOPPED — CHALLENGES ARE CURRENTLY LOCKED
                </p>
                <p className="text-[11px] text-white/90">
                  Wait for the Organizer to start the round before buying or solving challenges.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-black text-white font-bold uppercase tracking-widest text-[10px] shrink-0">
              STANDBY
            </span>
          </div>
        )}

        {/* Filters */}
        <div className="mt-3 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div
              role="tablist"
              aria-label="Filter challenges by category"
              className="flex flex-wrap gap-1.5"
            >
              {MARKET_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2.5 sm:px-3 py-1 font-condensed text-xs sm:text-sm font-extrabold uppercase tracking-[0.14em] border-2 border-nexus-ink transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white bg-nexus-crimson'
                        : 'bg-nexus-paper text-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{category}</span>
                      <span
                        className={`font-mono text-[10px] px-1 ${
                          isActive ? 'bg-nexus-ink text-white' : 'bg-nexus-ink/10 text-nexus-ink'
                        }`}
                      >
                        {categoryCounts[category] ?? 0}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-1 border border-nexus-crimson bg-nexus-paper hover:bg-nexus-crimson hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson transition-colors cursor-pointer"
              >
                RESET FILTERS
              </button>
            )}
          </div>

          <div className="pt-2.5 border-t border-dashed border-nexus-ink/25 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-muted mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-nexus-crimson" />
                DIFFICULTY:
              </span>
              {MARKET_DIFFICULTIES.map((diff) => {
                const active = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                      active
                        ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                        : 'bg-nexus-paper text-nexus-charcoal border-nexus-ink/30 hover:border-nexus-ink'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-muted mr-1">
                RISK:
              </span>
              {MARKET_RISKS.map((riskTier) => {
                const active = selectedRisk === riskTier;
                return (
                  <button
                    key={riskTier}
                    type="button"
                    onClick={() => setSelectedRisk(riskTier)}
                    className={`px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                      active
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-paper text-nexus-charcoal border-nexus-ink/30 hover:border-nexus-ink'
                    }`}
                  >
                    {riskTier}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Side-Scrolling Challenge Cards Track (ON TOP with 2 rows on mobile, below details on PC) */}
      <div className="order-2 lg:order-3">
        {filteredChallenges.length === 0 ? (
          <div className="nexus-editorial-box p-10 text-center space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-nexus-crimson font-bold">
              NO CHALLENGES MATCH YOUR FILTERS
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              SHOW ALL CHALLENGES
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Horizontal Scroll Controls Bar */}
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-nexus-muted">
                SHOWING {filteredChallenges.length} CHALLENGES (2 ROWS) · SWIPE SIDEWAYS →
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleScrollHorizontal(-1)}
                  aria-label="Scroll challenges left"
                  className="px-3 py-1.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-crimson hover:text-white text-nexus-ink font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">PREV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollHorizontal(1)}
                  aria-label="Scroll challenges right"
                  className="px-3 py-1.5 border-2 border-nexus-ink bg-nexus-ink hover:bg-nexus-crimson text-nexus-paper hover:text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2-Row Horizontal Side-Scroll Container on BOTH mobile & desktop */}
            <div
              ref={scrollTrackRef}
              onWheel={handleWheelToHorizontal}
              className={`grid ${
                filteredChallenges.length > 1 ? 'grid-rows-2' : 'grid-rows-1'
              } grid-flow-col auto-cols-[240px] sm:auto-cols-[290px] lg:auto-cols-[305px] overflow-x-auto gap-3 sm:gap-4 pb-4 pt-1 snap-x snap-mandatory scroll-smooth`}
            >
              <AnimatePresence mode="popLayout">
                {filteredChallenges.map((challenge) => {
                  const matchedAttempt = activeAttemptsByChallengeId.get(
                    String(challenge.challengeId).toUpperCase()
                  );
                  const isCurrent =
                    Boolean(matchedAttempt) || activeChallenge?.challengeId === challenge.challengeId;
                  const solvingOperativeName = matchedAttempt?.assignedMemberName || null;
                  const isPurchased = purchasedIds.has(challenge.challengeId) || isCurrent;
                  const isSolved = completedIds.has(challenge.challengeId);
                  const isFailed = failedIds.has(challenge.challengeId);
                  const isSelected =
                    inspectingChallenge?.challengeId === challenge.challengeId;

                  return (
                    <div
                      key={challenge.challengeId}
                      className="w-full h-full snap-start flex"
                    >
                      <div className="w-full flex flex-col">
                        <ClassifiedChallengeCard
                          challenge={challenge}
                          isCurrent={isCurrent}
                          solvingOperativeName={solvingOperativeName}
                          isPurchased={isPurchased}
                          isSolved={isSolved}
                          isFailed={isFailed}
                          isRoundActive={isRoundActive}
                          reattemptMultiplier={creditsConfig?.reattemptMultiplier || 1.25}
                          isSelected={isSelected}
                          onSelectChallenge={handleOpenConfirmation}
                          prefersReducedMotion={prefersReducedMotion}
                          compact={true}
                        />
                      </div>
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* 3. Squad Live Activity & Purchased Details (BELOW challenges on mobile, ABOVE challenges on PC) */}
      <div className="nexus-editorial-box p-3.5 sm:p-4 space-y-3 order-3 lg:order-2">
        {/* Squad Live Activity Indicator (4-Player Team Coordination Strip) */}
        <div className="p-3 bg-nexus-ink text-nexus-paper border-2 border-nexus-ink">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2.5 border-b border-nexus-paper/15">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-nexus-paper">
                SQUAD LIVE ACTIVITY // 4-OPERATIVE COORDINATION
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-nexus-paper/70">
              ACTIVE SOLVES: {activeAttemptsList.length} · ONLINE:{' '}
              {squadActivitySlots.filter((s) => s.isOnline).length}/4
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {squadActivitySlots.map((slot) => {
              const solvingTitle = slot.activeAttempt
                ? getFriendlyChallengeTitle(slot.activeAttempt)
                : null;
              return (
                <div
                  key={slot.memberId}
                  onClick={() => {
                    if (slot.activeAttempt?.challengeId && onAcquireChallenge && isRoundActive) {
                      onAcquireChallenge({
                        challengeId: slot.activeAttempt.challengeId,
                        isReattempt: false,
                        buyOnly: false,
                      });
                    }
                  }}
                  className={`p-2.5 border transition-colors ${
                    slot.activeAttempt
                      ? 'border-nexus-crimson bg-nexus-crimson/15 cursor-pointer hover:bg-nexus-crimson/25'
                      : slot.isOnline
                        ? 'border-emerald-500/40 bg-black/50'
                        : 'border-nexus-paper/15 bg-black/30 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white truncate">
                      [{slot.memberId}] {slot.name}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      {slot.isMe && (
                        <span className="px-1.5 py-0.2 bg-nexus-crimson text-white font-mono text-[8px] font-bold uppercase">
                          YOU
                        </span>
                      )}
                      <span
                        className={`px-1.5 py-0.2 font-mono text-[8px] font-bold uppercase ${
                          slot.isOnline
                            ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/10 text-nexus-paper/50'
                        }`}
                      >
                        {slot.isOnline ? '● ONLINE' : 'STANDBY'}
                      </span>
                    </div>
                  </div>

                  {solvingTitle ? (
                    <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-white/10">
                      <span className="font-mono text-[10px] font-bold uppercase text-amber-300 truncate">
                        ⚡ SOLVING: {solvingTitle}
                      </span>
                      <span className="font-mono text-[9px] font-bold uppercase text-white underline shrink-0">
                        OPEN →
                      </span>
                    </div>
                  ) : (
                    <div className="pt-1 border-t border-white/10">
                      <span className="font-mono text-[10px] uppercase text-nexus-paper/55 block truncate">
                        {slot.isOnline ? 'IN LOBBY // READY TO DEPLOY' : 'AWAITING UPLINK'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Purchased Challenges Pool (Horizontal Side-Scrolling Strip) */}
        {purchasedChallenges.length > 0 && (
          <div className="bg-nexus-ink text-nexus-paper border-2 border-nexus-crimson p-3 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-nexus-paper/15 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  TEAM PURCHASED ({purchasedChallenges.length})
                </span>
                <span className="font-mono text-[11px] text-nexus-paper/80 uppercase">
                  PAID FROM TEAM CREDITS · MULTIPLE TEAMMATES CAN SOLVE AT ONCE
                </span>
              </div>
            </div>

            <div className="flex flex-nowrap overflow-x-auto gap-3 pb-1 scroll-smooth">
              {purchasedChallenges.map((item) => {
                const matchedAttempt = activeAttemptsByChallengeId.get(
                  String(item.challengeId).toUpperCase()
                );
                const isItemActive =
                  Boolean(matchedAttempt) || activeChallenge?.challengeId === item.challengeId;
                const solverName = matchedAttempt?.assignedMemberName || null;
                return (
                  <div
                    key={item.challengeId}
                    className={`w-[270px] sm:w-[290px] shrink-0 p-2.5 border flex items-center justify-between gap-2.5 ${
                      isItemActive
                        ? 'border-nexus-crimson bg-black/70'
                        : 'border-nexus-paper/20 bg-black/40'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-crimson font-bold block truncate">
                        {solverName
                          ? `● SOLVING: ${solverName}`
                          : `${item.category} · +${item.reward || 400} CR`}
                      </span>
                      <p className="font-display text-lg uppercase tracking-wide text-white truncate">
                        {getFriendlyChallengeTitle(item)}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={actionPending || !isRoundActive}
                      onClick={() => {
                        if (onAcquireChallenge) {
                          onAcquireChallenge({
                            challengeId: item.challengeId,
                            isReattempt: false,
                            buyOnly: false,
                          });
                        }
                      }}
                      className="px-2.5 py-1.5 bg-nexus-crimson hover:bg-white text-white hover:text-nexus-ink font-condensed text-xs font-extrabold uppercase tracking-[0.14em] border border-white/30 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      {!isRoundActive
                        ? '[ LOCKED ]'
                        : isItemActive
                          ? '[ OPEN ]'
                          : '[ SOLVE NOW ]'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Buy / Solve Challenge Confirmation Modal */}
      <AnimatePresence>
        {inspectingChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseConfirmation}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.94, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="acquire-challenge-modal-title"
              className="nexus-editorial-box max-w-lg w-full overflow-hidden border-4 border-nexus-crimson shadow-[0_0_65px_rgba(225,29,46,0.45),8px_8px_0px_#111111]"
            >
              <div className="bg-nexus-ink text-nexus-paper px-5 py-3.5 border-b-2 border-nexus-ink flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                    {inspectingIsCurrent
                      ? 'ACTIVE CHALLENGE'
                      : inspectingIsPurchased
                        ? 'PURCHASED BY TEAM'
                        : inspectingIsFailed
                          ? 'REATTEMPT CHALLENGE'
                          : 'BUY OR SOLVE CHALLENGE'}
                  </span>
                  <span className="font-mono text-xs text-nexus-paper/75 uppercase">
                    {inspectingChallenge.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCloseConfirmation}
                  aria-label="Close modal"
                  className="text-nexus-paper/75 hover:text-nexus-crimson transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-44 bg-black border-b-2 border-nexus-ink overflow-hidden">
                <GamePreviewThumbnail challenge={inspectingChallenge} />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-nexus-ink via-nexus-ink/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-5 right-5 z-20 flex items-end justify-between gap-3 pointer-events-none">
                  <h2
                    id="acquire-challenge-modal-title"
                    className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-white leading-none"
                  >
                    {getFriendlyChallengeTitle(inspectingChallenge)}
                  </h2>
                  <CrosshairMark variant="crimson" size={16} />
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5 bg-nexus-paper">
                <p className="font-editorial text-sm sm:text-base text-nexus-ink leading-relaxed">
                  {getFriendlyChallengeDescription(inspectingChallenge)}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper divide-y sm:divide-y-0 sm:divide-x divide-nexus-paper/15 font-mono">
                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      COST
                    </span>
                    <span className="font-bold text-base text-nexus-crimson">
                      {inspectingIsPurchased ? 'PAID' : `${inspectingEffectiveCost} CR`}
                    </span>
                  </div>

                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      REWARD
                    </span>
                    <span className="font-bold text-base text-white">
                      +{inspectingChallenge.reward} CR
                    </span>
                  </div>

                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      DIFFICULTY
                    </span>
                    <span className="font-bold text-xs uppercase text-nexus-paper">
                      {inspectingChallenge.difficulty}
                    </span>
                  </div>

                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60 mb-1">
                      RISK
                    </span>
                    <RiskBadge risk={inspectingChallenge.risk} size="xs" variant="onDark" />
                  </div>

                  <div className="p-3 col-span-2 sm:col-span-1">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      TIME
                    </span>
                    <span className="font-bold text-xs uppercase text-white">
                      {formatTimeLimit(inspectingChallenge.timeLimit)}
                    </span>
                  </div>
                </div>

                <div className="p-3 border border-nexus-ink bg-nexus-paper-elevated flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <RiskBadge risk={inspectingChallenge.risk} size="xs" />
                    <span className="font-bold text-nexus-ink uppercase">
                      {inspectingIsPurchased
                        ? 'ALREADY BOUGHT BY TEAM — ANY TEAMMATE CAN SOLVE'
                        : 'SHARED TEAM CREDITS — BUY NOW OR SOLVE LATER'}
                    </span>
                  </div>
                  <span className="text-[11px] text-nexus-crimson font-bold uppercase">
                    FAIL PENALTY: -{inspectingChallenge.penalty || 100} CR
                  </span>
                </div>

                {!isRoundActive && (
                  <div className="p-3 bg-nexus-crimson text-white border-2 border-nexus-ink font-mono text-xs flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>
                      ROUND TIMER STOPPED — Wait for the Organizer to start the round before buying or solving challenges.
                    </span>
                  </div>
                )}

                <AnimatePresence>
                  {modalError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="p-3 bg-nexus-crimson text-white border-2 border-nexus-ink font-mono text-xs flex items-center gap-2.5"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{modalError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleCloseConfirmation}
                    className="py-3 px-4 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>

                  {!inspectingIsPurchased && !inspectingIsCurrent && (
                    <button
                      type="button"
                      disabled={actionPending || !isRoundActive}
                      onClick={handleConfirmBuyForLater}
                      className="flex-1 py-3 px-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson hover:text-white font-condensed text-base font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      <span>
                        {actionPending
                          ? 'BUYING...'
                          : `[ BUY FOR LATER (${inspectingEffectiveCost} CR) ]`}
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={actionPending || !isRoundActive}
                    onClick={handleConfirmAcquire}
                    className="flex-1 py-3 px-4 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <span>
                      {actionPending
                        ? 'WORKING...'
                        : inspectingIsCurrent
                          ? '[ CONTINUE CHALLENGE ]'
                          : inspectingIsPurchased
                            ? '[ SOLVE NOW (PAID) ]'
                            : `[ BUY & SOLVE (${inspectingEffectiveCost} CR) ]`}
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ChallengeMarketModule;
