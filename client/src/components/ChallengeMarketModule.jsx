import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Crosshair,
  Filter,
  Clock,
  ShieldAlert,
  Coins,
  Award,
  Layers,
  Terminal,
  CheckCircle2,
  RotateCcw,
  Lock,
  ArrowUpRight,
  X,
  AlertTriangle,
} from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { SystemBadge } from './SystemBadge';
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
  return `${mins} MIN (${totalSec}S)`;
};

/**
 * Individual Classified NEXUS Challenge Card
 * - GSAP handles: image reveal mask, subtle image scale, and pointer hover parallax on `.challenge-art-img`
 * - Framer Motion handles: card state, hover UI overlay badge, and selection indicator
 */
const ClassifiedChallengeCard = ({
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
  const maskRef = useRef(null);

  const artworkSrc = resolveChallengeArtwork(challenge);
  const isAvailable = challenge.enabled !== false && challenge.available !== false;
  const reattemptCost = Math.round(
    Number(challenge.cost || 0) * (Number(reattemptMultiplier) || 1.25)
  );
  const displayCost = isFailed ? reattemptCost : challenge.cost;

  // GSAP initial image reveal & subtle scale
  useLayoutEffect(() => {
    if (prefersReducedMotion || !imgRef.current) return undefined;

    const ctx = gsap.context(() => {
      if (maskRef.current) {
        gsap.fromTo(
          maskRef.current,
          { scaleY: 1, transformOrigin: 'bottom center' },
          {
            scaleY: 0,
            duration: 0.75,
            ease: 'power3.inOut',
          }
        );
      }

      gsap.fromTo(
        imgRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 0.95,
          ease: 'power2.out',
        }
      );
    }, cardArtContainerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, challenge.challengeId]);

  // GSAP hover parallax + subtle scale on the architectural image
  const handlePointerMove = (e) => {
    if (prefersReducedMotion || !imgRef.current || !cardArtContainerRef.current) return;
    const rect = cardArtContainerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imgRef.current, {
      scale: 1.07,
      x: -relX * 12,
      y: -relY * 10,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion || !imgRef.current) return;
    gsap.to(imgRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelectChallenge(challenge)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectChallenge(challenge);
        }
      }}
      aria-label={`Select classified challenge ${challenge.title} (${challenge.category})`}
      className={`group relative flex flex-col justify-between border-2 transition-colors cursor-pointer select-none overflow-hidden focus-visible:outline-2 focus-visible:outline-nexus-crimson ${
        isCurrent || isSelected
          ? 'border-nexus-crimson shadow-brutal-crimson bg-nexus-ink'
          : 'border-nexus-ink shadow-brutal-sm hover:border-nexus-crimson bg-nexus-ink'
      }`}
    >
      {/* =====================================================================
          TOP DARK CHAMBER: CATEGORY + ARCHITECTURAL ARTWORK + MODULE TITLE
         ===================================================================== */}
      <div className="flex flex-col flex-1 bg-nexus-ink text-nexus-paper">
        {/* Category Header Bar (Matches Proposal Page 4 Top Bar) */}
        <div className="px-3.5 py-2.5 border-b border-nexus-paper/15 flex items-center justify-between gap-2 bg-black/50">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 bg-nexus-crimson shrink-0" />
            <span className="font-condensed text-sm sm:text-base font-extrabold uppercase tracking-[0.2em] text-nexus-paper truncate">
              {challenge.category}
            </span>
          </div>

          {/* Squad Status Pill */}
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
            <span className="font-mono text-[10px] text-nexus-paper/55">
              {challenge.challengeId}
            </span>
          </div>
        </div>

        {/* Architectural Artwork Chamber (GSAP reveal + hover parallax) */}
        <div
          ref={cardArtContainerRef}
          className={`relative w-full ${
            compact ? 'h-36' : 'h-48 sm:h-52'
          } overflow-hidden bg-black border-b border-nexus-paper/15`}
        >
          <img
            ref={imgRef}
            src={artworkSrc}
            alt={`${challenge.title} — ${challenge.category} architectural module`}
            loading="lazy"
            className="challenge-art-img w-full h-full object-cover object-center contrast-115 brightness-90 will-change-transform"
          />

          {/* GSAP Reveal Curtain Mask */}
          <div
            ref={maskRef}
            className="challenge-art-mask absolute inset-0 bg-nexus-ink pointer-events-none z-10"
            style={{ transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          {/* Subtle vignette + technical crosshair overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-nexus-ink via-nexus-ink/25 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 bg-black/75 border border-nexus-paper/20 font-mono text-[9px] uppercase tracking-widest text-nexus-paper/80">
            <span>{challenge.gameConfig?.sector || `SECTOR // ${challenge.category}`}</span>
          </div>

          <div className="absolute top-2.5 right-2.5 z-10">
            <CrosshairMark variant="crimson" size={12} />
          </div>

          {/* Framer Motion Hover Inspect Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-x-3 bottom-2.5 z-10 flex items-center justify-between px-2.5 py-1 bg-nexus-ink/90 border border-nexus-crimson font-mono text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span>CLASSIFIED MODULE // {challenge.gameType}</span>
            <span className="text-nexus-crimson font-bold flex items-center gap-1">
              ACQUIRE <ArrowUpRight className="w-3 h-3" />
            </span>
          </motion.div>
        </div>

        {/* Title & Classified Description */}
        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl sm:text-[26px] uppercase tracking-wide text-nexus-paper leading-none group-hover:text-nexus-crimson transition-colors">
                {challenge.title}
              </h3>
            </div>
            {!compact && (
              <p className="font-editorial text-xs text-nexus-paper/75 line-clamp-2 mt-1.5 leading-relaxed">
                {challenge.description}
              </p>
            )}
          </div>

          <div className="pt-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-nexus-paper/55 border-t border-nexus-paper/10">
            <span>TIME: {formatTimeLimit(challenge.timeLimit)}</span>
            <span>PENALTY: -{challenge.penalty || 100} CR</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM CRIMSON SPECIFICATION BLOCK (Proposal Page 4 Layout)
          Shows: COST, REWARD, DIFFICULTY, RISK
         ===================================================================== */}
      <div className="bg-nexus-crimson text-white p-3.5 border-t-2 border-nexus-ink font-mono text-xs space-y-1.5">
        <div className="flex items-center justify-between border-b border-white/20 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            COST
          </span>
          <span className="font-bold text-sm tracking-wider">
            {displayCost} CR{isFailed ? ' (REATTEMPT)' : ''}
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

        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold">
            RISK
          </span>
          <span className="px-1.5 py-0.5 bg-nexus-ink text-nexus-paper font-bold text-[10px] uppercase tracking-widest">
            {challenge.risk}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * Primary Phase 6 Component: Cyber Quest Live Challenge Market
 */
export const ChallengeMarketModule = ({
  catalog = [],
  team,
  creditsConfig,
  actionPending = false,
  onAcquireChallenge,
  onOpenExecutionPanel,
  compact = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Filter states: category (ALL, LOGIC, PUZZLES, OBSERVATION, KNOWLEDGE, TECHNICAL), difficulty, risk
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');

  // Selected challenge for the Confirmation Panel
  const [inspectingChallenge, setInspectingChallenge] = useState(null);
  const [modalError, setModalError] = useState('');
  const [modalSuccessBanner, setModalSuccessBanner] = useState(null);

  const activeChallenge = team?.currentChallenge;
  const activeAttempt = team?.activeAttempt;
  const completedIds = useMemo(
    () => new Set((team?.completedChallenges || []).map((c) => c.challengeId)),
    [team?.completedChallenges]
  );
  const failedIds = useMemo(
    () => new Set((team?.failedChallenges || []).map((c) => c.challengeId)),
    [team?.failedChallenges]
  );

  // Filtered challenges
  const filteredChallenges = useMemo(() => {
    return (catalog || []).filter((item) => {
      if (item.enabled === false) return false;
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'ALL' && item.difficulty !== selectedDifficulty) return false;
      if (selectedRisk !== 'ALL' && item.risk !== selectedRisk) return false;
      return true;
    });
  }, [catalog, selectedCategory, selectedDifficulty, selectedRisk]);

  // Category counts for filter tabs
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
    setModalSuccessBanner(null);
    setInspectingChallenge(challenge);
  };

  const handleCloseConfirmation = () => {
    setInspectingChallenge(null);
    setModalError('');
  };

  /**
   * Server-Authoritative Acquisition Handler:
   * Client NEVER decides whether the team can afford the challenge.
   * Sends the request to the backend, which validates balance, availability, and reattempt rules.
   */
  const handleConfirmAcquire = async () => {
    if (!inspectingChallenge || !onAcquireChallenge) return;
    setModalError('');

    const isFailed = failedIds.has(inspectingChallenge.challengeId);

    try {
      await onAcquireChallenge({
        challengeId: inspectingChallenge.challengeId,
        isReattempt: isFailed,
      });
      setModalSuccessBanner({
        title: inspectingChallenge.title,
        challengeId: inspectingChallenge.challengeId,
        gameType: inspectingChallenge.gameType,
        timeLimit: inspectingChallenge.timeLimit,
      });
      setInspectingChallenge(null);
    } catch (err) {
      setModalError(
        err?.message || 'Acquisition rejected by NEXUS Core server authority.'
      );
    }
  };

  const inspectingIsFailed = inspectingChallenge
    ? failedIds.has(inspectingChallenge.challengeId)
    : false;
  const inspectingIsSolved = inspectingChallenge
    ? completedIds.has(inspectingChallenge.challengeId)
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
      aria-label="Cyber Quest Live Challenge Market"
      className="space-y-6"
    >
      {/* =====================================================================
          HEADER BLOCK — Matches NEXUS Event Proposal Page 4 ("THE CHALLENGE MARKET")
         ===================================================================== */}
      <div className="nexus-editorial-box p-5 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-nexus-ink pb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="bg-nexus-ink text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-[0.24em] px-2.5 py-1">
                NEXUS // CLASSIFIED MODULE EXCHANGE
              </span>
              <SystemBadge variant="crimson" pulse>
                SERVER-AUTHORITATIVE MARKET
              </SystemBadge>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-nexus-ink leading-none">
                THE CHALLENGE
              </h2>
              <span className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-nexus-crimson leading-none">
                MARKET
              </span>
            </div>
          </div>

          <div className="max-w-md lg:text-right space-y-1">
            <p className="font-editorial text-sm sm:text-base font-bold text-nexus-ink">
              Pick the right challenges.
            </p>
            <p className="font-editorial text-xs sm:text-sm text-nexus-charcoal">
              Every choice carries a cost and a consequence. All acquisitions are validated by
              NEXUS Core.
            </p>
          </div>
        </div>

        {/* ===================================================================
            ACTIVE CHALLENGE SESSION HANDOFF BANNER (Ready for Phase 7)
           =================================================================== */}
        <AnimatePresence>
          {(activeChallenge || modalSuccessBanner) && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-5 bg-nexus-ink text-nexus-paper border-2 border-nexus-crimson p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                  <span className="px-2 py-0.5 bg-nexus-crimson text-white font-bold">
                    ACTIVE CHALLENGE SESSION
                  </span>
                  <span className="text-nexus-paper/70">
                    ATTEMPT ID: {activeAttempt?.attemptId || 'ATT-SYNC'}
                  </span>
                  <span className="text-nexus-paper/70">
                    MODULE: {activeChallenge?.gameType || modalSuccessBanner?.gameType || 'TERMINAL_CHALLENGE'}
                  </span>
                </div>

                <p className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white leading-none pt-0.5">
                  {activeChallenge?.title || modalSuccessBanner?.title}{' '}
                  <span className="text-nexus-crimson">
                    // {activeChallenge?.category || 'ACTIVE'}
                  </span>
                </p>

                <p className="font-mono text-[11px] text-nexus-paper/75">
                  TIME ALLOCATED: {formatTimeLimitDetailed(activeChallenge?.timeLimit || 1200)} ·
                  REWARD YIELD: +{activeChallenge?.reward || 0} CR · FAIL PENALTY: -
                  {activeChallenge?.penalty || 100} CR
                </p>
              </div>

              {onOpenExecutionPanel && (
                <button
                  type="button"
                  onClick={onOpenExecutionPanel}
                  className="px-4 py-2.5 bg-nexus-crimson hover:bg-white text-white hover:text-nexus-ink font-condensed text-sm font-extrabold uppercase tracking-[0.18em] border border-white/30 transition-colors cursor-pointer shrink-0"
                >
                  OPEN EXECUTION TERMINAL
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            FILTERS BAR: CATEGORY (ALL, LOGIC, PUZZLES, OBSERVATION, KNOWLEDGE, TECHNICAL)
            + DIFFICULTY + RISK
           =================================================================== */}
        <div className="mt-5 space-y-4">
          {/* Primary Category Filter Tabs */}
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
                    className={`relative px-3.5 py-2 font-condensed text-sm font-extrabold uppercase tracking-[0.16em] border-2 border-nexus-ink transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white bg-nexus-crimson'
                        : 'bg-nexus-paper text-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{category}</span>
                      <span
                        className={`font-mono text-[10px] px-1 py-0.2 ${
                          isActive
                            ? 'bg-nexus-ink text-white'
                            : 'bg-nexus-ink/10 text-nexus-ink group-hover:text-white'
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
                className="px-3 py-1.5 border border-nexus- crimson bg-nexus-paper hover:bg-nexus-crimson hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson transition-colors cursor-pointer"
              >
                RESET FILTERS
              </button>
            )}
          </div>

          {/* Secondary Filters: DIFFICULTY & RISK */}
          <div className="pt-3 border-t border-dashed border-nexus-ink/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Difficulty Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-muted mr-1.5 flex items-center gap-1">
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

            {/* Risk Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-muted mr-1.5">
                RISK TIER:
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

      {/* =====================================================================
          CHALLENGE MARKET CARDS GRID
          Modelled directly on Proposal Page 4 (5-column vertical cards on XL,
          responsive 1/2/3/5 columns)
         ===================================================================== */}
      {filteredChallenges.length === 0 ? (
        <div className="nexus-editorial-box p-10 text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-nexus-crimson font-bold">
            NO CLASSIFIED MODULES MATCH CURRENT FILTER MATRIX
          </p>
          <p className="font-editorial text-sm text-nexus-charcoal">
            Adjust category, difficulty, or risk filters to inspect available NEXUS challenges.
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

      {/* =====================================================================
          ACQUIRE CHALLENGE CONFIRMATION PANEL / MODAL (Framer Motion)
          Shows: COST, REWARD, DIFFICULTY, RISK, TIME
          Server validates everything; client never blocks based on balance.
         ===================================================================== */}
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
              className="nexus-editorial-box max-w-xl w-full overflow-hidden border-2 border-nexus-ink shadow-brutal"
            >
              {/* Top Classification Banner */}
              <div className="bg-nexus-ink text-nexus-paper px-5 py-3.5 border-b-2 border-nexus-ink flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                    {inspectingIsFailed ? 'REATTEMPT AUTHORIZATION' : 'MODULE ACQUISITION'}
                  </span>
                  <span className="font-mono text-xs text-nexus-paper/70">
                    {inspectingChallenge.challengeId} // {inspectingChallenge.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCloseConfirmation}
                  aria-label="Close acquisition confirmation panel"
                  className="text-nexus-paper/75 hover:text-nexus-crimson transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Architectural Banner Preview */}
              <div className="relative h-44 bg-black border-b-2 border-nexus-ink overflow-hidden">
                <img
                  src={resolveChallengeArtwork(inspectingChallenge)}
                  alt={inspectingChallenge.title}
                  className="w-full h-full object-cover object-center contrast-115 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-ink via-nexus-ink/40 to-transparent" />
                <div className="absolute bottom-3.5 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-nexus-crimson font-bold block">
                      {inspectingChallenge.gameConfig?.sector ||
                        `SECTOR // ${inspectingChallenge.category}`}{' '}
                      · {inspectingChallenge.gameType}
                    </span>
                    <h2
                      id="acquire-challenge-modal-title"
                      className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-white leading-none mt-0.5"
                    >
                      {inspectingChallenge.title}
                    </h2>
                  </div>
                  <CrosshairMark variant="crimson" size={16} />
                </div>
              </div>

              {/* Dossier Body & 5 Required Tactical Metrics */}
              <div className="p-5 sm:p-6 space-y-5 bg-nexus-paper">
                <p className="font-editorial text-sm sm:text-base text-nexus-ink leading-relaxed">
                  {inspectingChallenge.description}
                </p>

                {/* 5 Required Fields: COST, REWARD, DIFFICULTY, RISK, TIME */}
                <div className="grid grid-cols-2 sm:grid-cols-5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper divide-y sm:divide-y-0 sm:divide-x divide-nexus-paper/15 font-mono">
                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      COST
                    </span>
                    <span className="font-bold text-base text-nexus-crimson">
                      -{inspectingEffectiveCost} CR
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
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      RISK
                    </span>
                    <span className="font-bold text-xs uppercase text-nexus-crimson">
                      {inspectingChallenge.risk}
                    </span>
                  </div>

                  <div className="p-3 col-span-2 sm:col-span-1">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      TIME
                    </span>
                    <span className="font-bold text-xs uppercase text-white">
                      {formatTimeLimitDetailed(inspectingChallenge.timeLimit)}
                    </span>
                  </div>
                </div>

                {/* Server Authority Notice */}
                <div className="p-3 border border-dashed border-nexus-ink/40 bg-nexus-paper-elevated flex items-start justify-between gap-3 font-mono text-[11px]">
                  <div className="space-y-0.5">
                    <span className="font-bold text-nexus-ink uppercase block">
                      SERVER-AUTHORITATIVE ACQUISITION PROTOCOL
                    </span>
                    <span className="text-nexus-charcoal block">
                      Entry costs are non-refundable. NEXUS Core verifies Resistance Credit
                      availability and initializes your squad challenge session.
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] uppercase text-nexus-muted block">
                      SQUAD BALANCE
                    </span>
                    <span className="font-bold text-nexus-ink">
                      {Number(team?.credits ?? 0).toLocaleString()} CR
                    </span>
                  </div>
                </div>

                {/* Server Error Feedback (if NEXUS Core rejects acquisition) */}
                <AnimatePresence>
                  {modalError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="p-3 bg-nexus-crimson text-white border-2 border-nexus-ink font-mono text-xs flex items-center gap-2.5"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>SERVER REJECTION // {modalError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons — Client never disables ACQUIRE based on team balance */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleCloseConfirmation}
                    className="sm:w-1/3 py-3 px-4 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
                  >
                    ABORT
                  </button>

                  <button
                    type="button"
                    disabled={actionPending}
                    onClick={handleConfirmAcquire}
                    className="flex-1 py-3 px-5 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.2em] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span>
                      {actionPending
                        ? 'VALIDATING WITH NEXUS CORE...'
                        : inspectingIsFailed
                        ? `ACQUIRE REATTEMPT (${inspectingEffectiveCost} CR)`
                        : inspectingIsSolved
                        ? `ACQUIRE MODULE (${inspectingEffectiveCost} CR)`
                        : `ACQUIRE CHALLENGE (${inspectingEffectiveCost} CR)`}
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
