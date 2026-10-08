import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Filter,
  ArrowUpRight,
  X,
  AlertTriangle,
} from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { RiskBadge, getRiskMetadata } from './RiskBadge';
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
  const totalSec = Number(seconds) || 1200;
  const mins = Math.round(totalSec / 60);
  return `${mins} MIN`;
};

export const formatTimeLimitDetailed = (seconds) => {
  const totalSec = Number(seconds) || 1200;
  const mins = Math.floor(totalSec / 60);
  return `${mins} MIN`;
};

/**
 * Simplified Participant Challenge Card
 * Shows:
 * - Category
 * - Artwork
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
  isSolved,
  isFailed,
  reattemptMultiplier,
  isSelected,
  onSelectChallenge,
  prefersReducedMotion,
  compact = false,
}) => {
  const cardArtContainerRef = useRef(null);
  const imgRef = useRef(null);

  const artworkSrc = resolveChallengeArtwork(challenge);
  const isAvailable = challenge.enabled !== false && challenge.available !== false;
  const reattemptCost = Math.round(
    Number(challenge.cost || 0) * (Number(reattemptMultiplier) || 1.25)
  );
  const displayCost = isFailed ? reattemptCost : challenge.cost;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !imgRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
        }
      );
    }, cardArtContainerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, challenge.challengeId]);

  const actionLabel = isCurrent
    ? '[ CONTINUE ]'
    : isSolved
      ? '[ SOLVED ]'
      : isFailed
        ? '[ REATTEMPT ]'
        : !isAvailable
          ? '[ LOCKED ]'
          : '[ START ]';

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
      aria-label={`Select challenge ${challenge.title} (${challenge.category})`}
      className={`group relative flex flex-col justify-between border-2 transition-colors cursor-pointer select-none overflow-hidden focus-visible:outline-2 focus-visible:outline-nexus-crimson ${
        isCurrent || isSelected
          ? 'border-nexus-crimson shadow-brutal-crimson bg-nexus-ink'
          : 'border-nexus-ink shadow-brutal-sm hover:border-nexus-crimson bg-nexus-ink'
      }`}
    >
      {/* Top Dark Chamber: Category + Artwork + Title */}
      <div className="flex flex-col flex-1 bg-nexus-ink text-nexus-paper">
        <div className="px-3.5 py-2.5 border-b border-nexus-paper/15 flex items-center justify-between gap-2 bg-black/50">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 bg-nexus-crimson shrink-0" />
            <span className="font-condensed text-sm sm:text-base font-extrabold uppercase tracking-[0.2em] text-nexus-paper truncate">
              {challenge.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isCurrent && (
              <span className="px-1.5 py-0.5 bg-nexus-crimson text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                ACTIVE
              </span>
            )}
            {isSolved && !isCurrent && (
              <span className="px-1.5 py-0.5 bg-nexus-paper text-nexus-ink font-mono text-[9px] font-bold uppercase tracking-wider">
                SOLVED
              </span>
            )}
            {isFailed && !isCurrent && (
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

        {/* Architectural Artwork */}
        <div
          ref={cardArtContainerRef}
          className={`relative w-full ${
            compact ? 'h-36' : 'h-44 sm:h-48'
          } overflow-hidden bg-black border-b border-nexus-paper/15`}
        >
          <img
            ref={imgRef}
            src={artworkSrc}
            alt={challenge.title}
            loading="lazy"
            className="w-full h-full object-cover object-center contrast-115 brightness-90 group-hover:scale-105 transition-transform duration-500"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-nexus-ink via-nexus-ink/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="absolute top-2.5 right-2.5 z-10">
            <CrosshairMark variant="crimson" size={12} />
          </div>
        </div>

        {/* Title */}
        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
          <h3 className="font-display text-2xl sm:text-[26px] uppercase tracking-wide text-nexus-paper leading-none group-hover:text-nexus-crimson transition-colors">
            {challenge.title}
          </h3>

          {!compact && challenge.description && (
            <p className="font-editorial text-xs text-nexus-paper/75 line-clamp-2 leading-relaxed">
              {challenge.description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Crimson Specification Block: Cost, Reward, Difficulty, Risk + Action */}
      <div className="bg-nexus-crimson text-white p-3.5 border-t-2 border-nexus-ink font-mono text-xs space-y-1.5">
        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            COST
          </span>
          <span className="font-bold text-sm tracking-wider">
            {displayCost} CR
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            REWARD
          </span>
          <span className="font-bold text-sm tracking-wider">+{challenge.reward} CR</span>
        </div>

        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            DIFFICULTY
          </span>
          <span className="font-bold text-[11px] uppercase tracking-widest">
            {challenge.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            RISK
          </span>
          <RiskBadge risk={challenge.risk} size="xs" variant="onCrimson" />
        </div>

        <div className="pt-1">
          <span className="w-full py-1.5 px-3 bg-nexus-ink text-nexus-paper group-hover:bg-white group-hover:text-nexus-ink font-mono text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center transition-colors">
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
  onAcquireChallenge,
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

    const isCurrent = activeChallenge?.challengeId === inspectingChallenge.challengeId;
    if (isCurrent && onOpenExecutionPanel) {
      setInspectingChallenge(null);
      onOpenExecutionPanel();
      return;
    }

    const isFailed = failedIds.has(inspectingChallenge.challengeId);

    try {
      await onAcquireChallenge({
        challengeId: inspectingChallenge.challengeId,
        isReattempt: isFailed,
      });
      setInspectingChallenge(null);
    } catch (err) {
      setModalError(err?.message || 'Unable to start this challenge.');
    }
  };

  const inspectingIsFailed = inspectingChallenge
    ? failedIds.has(inspectingChallenge.challengeId)
    : false;
  const inspectingIsCurrent = inspectingChallenge
    ? activeChallenge?.challengeId === inspectingChallenge.challengeId
    : false;
  const inspectingEffectiveCost = inspectingChallenge
    ? inspectingIsFailed
      ? Math.round(
          Number(inspectingChallenge.cost || 0) *
            (Number(creditsConfig?.reattemptMultiplier) || 1.25)
        )
      : inspectingChallenge.cost
    : 0;

  return (
    <section
      aria-label="Challenge Market"
      className="space-y-6"
    >
      {/* Header & Filters */}
      <div className="nexus-editorial-box p-4 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b-2 border-nexus-ink pb-4">
          <div>
            <span className="bg-nexus-ink text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-[0.24em] px-2.5 py-1 inline-block mb-2">
              CHALLENGES
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-nexus-ink leading-none">
                THE CHALLENGE
              </h2>
              <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-nexus-crimson leading-none">
                MARKET
              </span>
            </div>
          </div>

          <p className="font-editorial text-xs sm:text-sm text-nexus-charcoal max-w-md lg:text-right">
            Pick the right challenges. Every choice carries a cost and a consequence.
          </p>
        </div>

        {/* Active Challenge Banner */}
        <AnimatePresence>
          {activeChallenge && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 bg-nexus-ink text-nexus-paper border-2 border-nexus-crimson p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest inline-block">
                  ACTIVE CHALLENGE
                </span>
                <p className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white leading-none pt-0.5">
                  {activeChallenge.title}{' '}
                  <span className="text-nexus-crimson">
                    // {activeChallenge.category}
                  </span>
                </p>
                <p className="font-mono text-xs text-nexus-paper/75">
                  REWARD: +{activeChallenge.reward || 0} CR · RISK: {activeChallenge.risk || 'BALANCED'}
                </p>
              </div>

              {onOpenExecutionPanel && (
                <button
                  type="button"
                  onClick={onOpenExecutionPanel}
                  className="px-4 py-2.5 bg-nexus-crimson hover:bg-white text-white hover:text-nexus-ink font-condensed text-sm font-extrabold uppercase tracking-[0.18em] border border-white/30 transition-colors cursor-pointer shrink-0"
                >
                  [ CONTINUE CHALLENGE ]
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
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
                    className={`px-3 py-1.5 font-condensed text-sm font-extrabold uppercase tracking-[0.14em] border-2 border-nexus-ink transition-colors cursor-pointer ${
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
                className="px-3 py-1.5 border border-nexus-crimson bg-nexus-paper hover:bg-nexus-crimson hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson transition-colors cursor-pointer"
              >
                RESET FILTERS
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-dashed border-nexus-ink/25 flex flex-col md:flex-row md:items-center justify-between gap-3">
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
                    className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
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
                    className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
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

      {/* Challenge Cards Grid */}
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
        <motion.div
          layout
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            compact
              ? 'lg:grid-cols-3 gap-4'
              : 'lg:grid-cols-3 xl:grid-cols-5 gap-4'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredChallenges.map((challenge) => {
              const isCurrent = activeChallenge?.challengeId === challenge.challengeId;
              const isSolved = completedIds.has(challenge.challengeId);
              const isFailed = failedIds.has(challenge.challengeId);
              const isSelected =
                inspectingChallenge?.challengeId === challenge.challengeId;

              return (
                <ClassifiedChallengeCard
                  key={challenge.challengeId}
                  challenge={challenge}
                  isCurrent={isCurrent}
                  isSolved={isSolved}
                  isFailed={isFailed}
                  reattemptMultiplier={creditsConfig?.reattemptMultiplier || 1.25}
                  isSelected={isSelected}
                  onSelectChallenge={handleOpenConfirmation}
                  prefersReducedMotion={prefersReducedMotion}
                  compact={compact}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Start Challenge Confirmation Modal */}
      <AnimatePresence>
        {inspectingChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleCloseConfirmation}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="acquire-challenge-modal-title"
              className="nexus-editorial-box max-w-lg w-full overflow-hidden border-2 border-nexus-ink shadow-brutal"
            >
              <div className="bg-nexus-ink text-nexus-paper px-5 py-3.5 border-b-2 border-nexus-ink flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                    {inspectingIsCurrent
                      ? 'ACTIVE CHALLENGE'
                      : inspectingIsFailed
                        ? 'REATTEMPT CHALLENGE'
                        : 'START CHALLENGE'}
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

              <div className="relative h-40 bg-black border-b-2 border-nexus-ink overflow-hidden">
                <img
                  src={resolveChallengeArtwork(inspectingChallenge)}
                  alt={inspectingChallenge.title}
                  className="w-full h-full object-cover object-center contrast-115 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-ink via-nexus-ink/40 to-transparent" />
                <div className="absolute bottom-3.5 left-5 right-5 flex items-end justify-between gap-3">
                  <h2
                    id="acquire-challenge-modal-title"
                    className="font-display text-4xl uppercase tracking-wide text-white leading-none"
                  >
                    {inspectingChallenge.title}
                  </h2>
                  <CrosshairMark variant="crimson" size={16} />
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5 bg-nexus-paper">
                <p className="font-editorial text-sm sm:text-base text-nexus-ink leading-relaxed">
                  {inspectingChallenge.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper divide-y sm:divide-y-0 sm:divide-x divide-nexus-paper/15 font-mono">
                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      COST
                    </span>
                    <span className="font-bold text-base text-nexus-crimson">
                      {inspectingEffectiveCost} CR
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
                      {getRiskMetadata(inspectingChallenge.risk).headline}
                    </span>
                  </div>
                  <span className="text-[11px] text-nexus-crimson font-bold uppercase">
                    FAIL PENALTY: -{inspectingChallenge.penalty || 100} CR
                  </span>
                </div>

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

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleCloseConfirmation}
                    className="sm:w-1/3 py-3 px-4 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    disabled={actionPending}
                    onClick={handleConfirmAcquire}
                    className="flex-1 py-3 px-5 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.2em] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span>
                      {actionPending
                        ? 'STARTING...'
                        : inspectingIsCurrent
                          ? '[ CONTINUE CHALLENGE ]'
                          : inspectingIsFailed
                            ? `[ REATTEMPT (${inspectingEffectiveCost} CR) ]`
                            : `[ START CHALLENGE (${inspectingEffectiveCost} CR) ]`}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
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
