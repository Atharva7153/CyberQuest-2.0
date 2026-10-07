import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  ShieldCheck,
  Scale,
  Flame,
  TrendingUp,
  TrendingDown,
  Filter,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import {
  RiskBadge,
  RISK_TIERS,
  RISK_CLASSIFICATION,
  normalizeRiskTier,
} from './RiskBadge';
import { SystemBadge } from './SystemBadge';
import { CrosshairMark } from './CrosshairMark';
import { useReducedMotion } from '../hooks/useReducedMotion';
import artRiskStairs from '../assets/artwork/nexus-risk-stairs.jpg';

/**
 * Derive authoritative team risk profile telemetry from team.stats,
 * falling back to completed/failed/active challenges if stats fields are absent.
 */
export const computeTeamRiskTelemetry = (team, attempts = [], catalog = []) => {
  const stats = team?.stats || {};

  const hasExplicitCounts =
    typeof stats.safeAttempts === 'number' ||
    typeof stats.balancedAttempts === 'number' ||
    typeof stats.aggressiveAttempts === 'number';

  const safeAttempts = Number(stats.safeAttempts || 0);
  const balancedAttempts = Number(stats.balancedAttempts || 0);
  const aggressiveAttempts = Number(stats.aggressiveAttempts || 0);

  const successByRisk = {
    SAFE: Number(stats.successByRisk?.SAFE || 0),
    BALANCED: Number(stats.successByRisk?.BALANCED || 0),
    AGGRESSIVE: Number(stats.successByRisk?.AGGRESSIVE || 0),
  };

  const creditsByRisk = {
    SAFE: {
      gained: Number(stats.creditsByRisk?.SAFE?.gained || 0),
      lost: Number(stats.creditsByRisk?.SAFE?.lost || 0),
      net:
        stats.creditsByRisk?.SAFE?.net !== undefined
          ? Number(stats.creditsByRisk.SAFE.net)
          : Number(stats.creditsByRisk?.SAFE?.gained || 0) -
            Number(stats.creditsByRisk?.SAFE?.lost || 0),
    },
    BALANCED: {
      gained: Number(stats.creditsByRisk?.BALANCED?.gained || 0),
      lost: Number(stats.creditsByRisk?.BALANCED?.lost || 0),
      net:
        stats.creditsByRisk?.BALANCED?.net !== undefined
          ? Number(stats.creditsByRisk.BALANCED.net)
          : Number(stats.creditsByRisk?.BALANCED?.gained || 0) -
            Number(stats.creditsByRisk?.BALANCED?.lost || 0),
    },
    AGGRESSIVE: {
      gained: Number(stats.creditsByRisk?.AGGRESSIVE?.gained || 0),
      lost: Number(stats.creditsByRisk?.AGGRESSIVE?.lost || 0),
      net:
        stats.creditsByRisk?.AGGRESSIVE?.net !== undefined
          ? Number(stats.creditsByRisk.AGGRESSIVE.net)
          : Number(stats.creditsByRisk?.AGGRESSIVE?.gained || 0) -
            Number(stats.creditsByRisk?.AGGRESSIVE?.lost || 0),
    },
  };

  const attemptsByRisk = {
    SAFE: safeAttempts,
    BALANCED: balancedAttempts,
    AGGRESSIVE: aggressiveAttempts,
  };

  // Fallback synthesis if an older team record hasn't been migrated yet
  if (
    !hasExplicitCounts &&
    safeAttempts === 0 &&
    balancedAttempts === 0 &&
    aggressiveAttempts === 0
  ) {
    (team?.completedChallenges || []).forEach((c) => {
      const tier = normalizeRiskTier(c.risk);
      attemptsByRisk[tier] += 1;
      successByRisk[tier] += 1;
      creditsByRisk[tier].gained += Number(c.reward || 0);
      creditsByRisk[tier].lost += Number(c.cost || 0);
      creditsByRisk[tier].net = creditsByRisk[tier].gained - creditsByRisk[tier].lost;
    });
    (team?.failedChallenges || []).forEach((c) => {
      const tier = normalizeRiskTier(c.risk);
      attemptsByRisk[tier] += 1;
      creditsByRisk[tier].lost += Number(c.cost || 0) + Number(c.penalty || 0);
      creditsByRisk[tier].net = creditsByRisk[tier].gained - creditsByRisk[tier].lost;
    });
  }

  const totalAttempts =
    attemptsByRisk.SAFE + attemptsByRisk.BALANCED + attemptsByRisk.AGGRESSIVE;
  const totalSuccess =
    successByRisk.SAFE + successByRisk.BALANCED + successByRisk.AGGRESSIVE;
  const totalGained =
    creditsByRisk.SAFE.gained +
    creditsByRisk.BALANCED.gained +
    creditsByRisk.AGGRESSIVE.gained;
  const totalLost =
    creditsByRisk.SAFE.lost +
    creditsByRisk.BALANCED.lost +
    creditsByRisk.AGGRESSIVE.lost;
  const totalNet = totalGained - totalLost;

  // Catalog distribution per risk tier (explicit configurable challenge properties)
  const catalogByRisk = {
    SAFE: [],
    BALANCED: [],
    AGGRESSIVE: [],
  };
  (catalog || []).forEach((ch) => {
    if (ch.enabled === false) return;
    const tier = normalizeRiskTier(ch.risk);
    catalogByRisk[tier].push(ch);
  });

  // Dominant or active risk profile
  const activeRiskTier = normalizeRiskTier(
    team?.currentChallenge?.risk || stats.riskProfile || 'BALANCED'
  );

  // Recent attempts enriched with normalized risk
  const normalizedAttempts = (attempts || []).map((att) => ({
    ...att,
    normalizedRisk: normalizeRiskTier(att.risk),
  }));

  return {
    activeRiskTier,
    safeAttempts: attemptsByRisk.SAFE,
    balancedAttempts: attemptsByRisk.BALANCED,
    aggressiveAttempts: attemptsByRisk.AGGRESSIVE,
    attemptsByRisk,
    successByRisk,
    creditsByRisk,
    totalAttempts,
    totalSuccess,
    totalGained,
    totalLost,
    totalNet,
    catalogByRisk,
    normalizedAttempts,
  };
};

/**
 * PHASE 9 — TEAM RISK PROFILE & RISK/REWARD SYSTEM MODULE
 * - Displays NEXUS Proposal Risk Classification (SAFE, BALANCED, AGGRESSIVE)
 * - Tracks: safe attempts, balanced attempts, aggressive attempts, success by risk, credits gained/lost by risk
 * - Uses Framer Motion for: risk badge transitions, filtering, profile updates
 * - Uses GSAP only for the restrained large risk visualization bars (isolated DOM refs)
 */
export const TeamRiskProfileModule = ({
  team,
  attempts = [],
  catalog = [],
  compact = false,
  onSelectMarketRiskFilter,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');

  const telemetry = useMemo(
    () => computeTeamRiskTelemetry(team, attempts, catalog),
    [team, attempts, catalog]
  );

  // Dedicated GSAP container ref for the large risk visualization spectrum
  const vizSectionRef = useRef(null);
  const safeBarRef = useRef(null);
  const balancedBarRef = useRef(null);
  const aggressiveBarRef = useRef(null);
  const yieldBarRefs = useRef({});

  // Compute percentages for the large risk visualization
  const safeSharePercent =
    telemetry.totalAttempts > 0
      ? Math.round((telemetry.safeAttempts / telemetry.totalAttempts) * 100)
      : 34;
  const balancedSharePercent =
    telemetry.totalAttempts > 0
      ? Math.round((telemetry.balancedAttempts / telemetry.totalAttempts) * 100)
      : 33;
  const aggressiveSharePercent =
    telemetry.totalAttempts > 0
      ? Math.max(0, 100 - safeSharePercent - balancedSharePercent)
      : 33;

  const maxCreditVolume = Math.max(
    400,
    telemetry.creditsByRisk.SAFE.gained,
    telemetry.creditsByRisk.SAFE.lost,
    telemetry.creditsByRisk.BALANCED.gained,
    telemetry.creditsByRisk.BALANCED.lost,
    telemetry.creditsByRisk.AGGRESSIVE.gained,
    telemetry.creditsByRisk.AGGRESSIVE.lost
  );

  // Restrained GSAP animation for the large risk visualization bars only
  useLayoutEffect(() => {
    if (!vizSectionRef.current) return undefined;

    const ctx = gsap.context(() => {
      const duration = prefersReducedMotion ? 0 : 0.65;

      if (safeBarRef.current) {
        gsap.to(safeBarRef.current, {
          width: `${safeSharePercent}%`,
          duration,
          ease: 'power2.out',
        });
      }
      if (balancedBarRef.current) {
        gsap.to(balancedBarRef.current, {
          width: `${balancedSharePercent}%`,
          duration,
          ease: 'power2.out',
        });
      }
      if (aggressiveBarRef.current) {
        gsap.to(aggressiveBarRef.current, {
          width: `${aggressiveSharePercent}%`,
          duration,
          ease: 'power2.out',
        });
      }

      RISK_TIERS.forEach((tier) => {
        const gainedEl = yieldBarRefs.current[`${tier}-gained`];
        const lostEl = yieldBarRefs.current[`${tier}-lost`];
        const gainedPct = Math.min(
          100,
          Math.round((telemetry.creditsByRisk[tier].gained / maxCreditVolume) * 100)
        );
        const lostPct = Math.min(
          100,
          Math.round((telemetry.creditsByRisk[tier].lost / maxCreditVolume) * 100)
        );

        if (gainedEl) {
          gsap.to(gainedEl, {
            width: `${gainedPct}%`,
            duration,
            ease: 'power2.out',
          });
        }
        if (lostEl) {
          gsap.to(lostEl, {
            width: `${lostPct}%`,
            duration,
            ease: 'power2.out',
          });
        }
      });
    }, vizSectionRef);

    return () => ctx.revert();
  }, [
    prefersReducedMotion,
    safeSharePercent,
    balancedSharePercent,
    aggressiveSharePercent,
    maxCreditVolume,
    telemetry.creditsByRisk.SAFE.gained,
    telemetry.creditsByRisk.SAFE.lost,
    telemetry.creditsByRisk.BALANCED.gained,
    telemetry.creditsByRisk.BALANCED.lost,
    telemetry.creditsByRisk.AGGRESSIVE.gained,
    telemetry.creditsByRisk.AGGRESSIVE.lost,
  ]);

  const displayedTiers = useMemo(() => {
    if (selectedRiskFilter === 'ALL') return RISK_TIERS;
    return RISK_TIERS.filter((t) => t === selectedRiskFilter);
  }, [selectedRiskFilter]);

  const filteredAttempts = useMemo(() => {
    if (selectedRiskFilter === 'ALL') return telemetry.normalizedAttempts.slice(0, 6);
    return telemetry.normalizedAttempts
      .filter((a) => a.normalizedRisk === selectedRiskFilter)
      .slice(0, 6);
  }, [telemetry.normalizedAttempts, selectedRiskFilter]);

  return (
    <section
      aria-label="Team Risk Profile and Risk-Reward Classification"
      className="nexus-editorial-box p-5 sm:p-6 space-y-6 relative overflow-hidden"
    >
      {/* =====================================================================
          HEADER: RISK & REWARD SYSTEM + ACTIVE SQUAD RISK POSTURE
         ===================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b-2 border-nexus-ink pb-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-nexus-ink text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-[0.24em] px-2.5 py-1">
              NEXUS // RISK &amp; REWARD CLASSIFICATION
            </span>
            <SystemBadge variant="crimson">CONFIGURABLE CHALLENGE PROPERTY</SystemBadge>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-nexus-ink leading-none">
              TEAM RISK
            </h2>
            <span className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-nexus-crimson leading-none">
              PROFILE
            </span>
          </div>
        </div>

        {/* Active Squad Risk Badge & Filter Controls */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3">
          <div className="px-3 py-2 border-2 border-nexus-ink bg-nexus-paper-elevated flex items-center gap-3">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-muted block">
                ACTIVE POSTURE
              </span>
              <span className="font-mono text-[10px] font-bold uppercase text-nexus-ink">
                {team?.currentChallenge ? 'ACTIVE SESSION TIER' : 'SQUAD POSTURE'}
              </span>
            </div>
            <RiskBadge risk={telemetry.activeRiskTier} size="md" pulseAggressive />
          </div>

          {/* Framer Motion Risk Tier Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter team risk profile by risk tier"
            className="flex flex-wrap items-center gap-1"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-muted mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-nexus-crimson" />
              FILTER:
            </span>
            {['ALL', ...RISK_TIERS].map((tierKey) => {
              const active = selectedRiskFilter === tierKey;
              return (
                <button
                  key={tierKey}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedRiskFilter(tierKey)}
                  className={`relative px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest border transition-colors cursor-pointer ${
                    active
                      ? 'bg-nexus-crimson text-white border-nexus-ink'
                      : 'bg-nexus-paper text-nexus-ink border-nexus-ink/35 hover:border-nexus-ink'
                  }`}
                >
                  {tierKey}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SUMMARY TELEMETRY STRIP:
          Tracks Safe Attempts, Balanced Attempts, Aggressive Attempts,
          Total Success by Risk, and Net Credits by Risk
         ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <motion.div
          layout
          key={`safe-att-${telemetry.safeAttempts}`}
          initial={prefersReducedMotion ? false : { opacity: 0.7, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 border-2 border-nexus-ink bg-nexus-paper-elevated flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted font-bold">
              SAFE ATTEMPTS
            </span>
            <RiskBadge risk="SAFE" size="xs" showIcon={false} />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl sm:text-4xl text-nexus-ink leading-none">
              {telemetry.safeAttempts}
            </span>
            <span className="font-mono text-[10px] text-nexus-charcoal font-bold">
              SOLVED: {telemetry.successByRisk.SAFE}
            </span>
          </div>
        </motion.div>

        <motion.div
          layout
          key={`bal-att-${telemetry.balancedAttempts}`}
          initial={prefersReducedMotion ? false : { opacity: 0.7, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 border-2 border-nexus-ink bg-nexus-paper-elevated flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted font-bold">
              BALANCED ATTEMPTS
            </span>
            <RiskBadge risk="BALANCED" size="xs" showIcon={false} />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl sm:text-4xl text-nexus-ink leading-none">
              {telemetry.balancedAttempts}
            </span>
            <span className="font-mono text-[10px] text-nexus-charcoal font-bold">
              SOLVED: {telemetry.successByRisk.BALANCED}
            </span>
          </div>
        </motion.div>

        <motion.div
          layout
          key={`agg-att-${telemetry.aggressiveAttempts}`}
          initial={prefersReducedMotion ? false : { opacity: 0.7, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 border-2 border-nexus-ink bg-nexus-paper-elevated flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted font-bold">
              AGGRESSIVE ATTEMPTS
            </span>
            <RiskBadge risk="AGGRESSIVE" size="xs" showIcon={false} />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl sm:text-4xl text-nexus-crimson leading-none">
              {telemetry.aggressiveAttempts}
            </span>
            <span className="font-mono text-[10px] text-nexus-charcoal font-bold">
              SOLVED: {telemetry.successByRisk.AGGRESSIVE}
            </span>
          </div>
        </motion.div>

        <motion.div
          layout
          key={`total-solve-${telemetry.totalSuccess}-${telemetry.totalAttempts}`}
          initial={prefersReducedMotion ? false : { opacity: 0.7, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper flex flex-col justify-between"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-paper/65 font-bold">
            SUCCESS BY RISK
          </span>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="font-display text-3xl sm:text-4xl text-white leading-none">
              {telemetry.totalSuccess}/{telemetry.totalAttempts}
            </span>
            <span className="font-mono text-[10px] text-nexus-crimson font-bold">
              S:{telemetry.successByRisk.SAFE} · B:{telemetry.successByRisk.BALANCED} · A:
              {telemetry.successByRisk.AGGRESSIVE}
            </span>
          </div>
        </motion.div>

        <motion.div
          layout
          key={`net-risk-${telemetry.totalNet}`}
          initial={prefersReducedMotion ? false : { opacity: 0.7, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 border-2 border-nexus-ink bg-nexus-crimson text-white col-span-2 sm:col-span-1 flex flex-col justify-between"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/85 font-bold">
            CREDITS BY RISK (NET)
          </span>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="font-display text-3xl sm:text-4xl text-white leading-none">
              {telemetry.totalNet >= 0 ? `+${telemetry.totalNet}` : telemetry.totalNet} CR
            </span>
            <span className="font-mono text-[10px] text-white/90 font-bold">
              +{telemetry.totalGained} / -{telemetry.totalLost}
            </span>
          </div>
        </motion.div>
      </div>

      {/* =====================================================================
          THREE CANONICAL RISK TIER CARDS (Framer Motion filtered & animated)
          SAFE: Low cost / Low risk / Steady progress
          BALANCED: Moderate risk / Controlled growth
          AGGRESSIVE: High risk / High potential reward
         ===================================================================== */}
      <motion.div
        layout
        className={`grid grid-cols-1 ${
          displayedTiers.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'
        } gap-4`}
      >
        <AnimatePresence mode="popLayout">
          {displayedTiers.map((tier) => {
            const meta = RISK_CLASSIFICATION[tier];
            const attemptsCount = telemetry.attemptsByRisk[tier];
            const solvedCount = telemetry.successByRisk[tier];
            const failedCount = Math.max(0, attemptsCount - solvedCount);
            const solveRate =
              attemptsCount > 0 ? Math.round((solvedCount / attemptsCount) * 100) : 0;
            const gained = telemetry.creditsByRisk[tier].gained;
            const lost = telemetry.creditsByRisk[tier].lost;
            const net = telemetry.creditsByRisk[tier].net;
            const tierCatalog = telemetry.catalogByRisk[tier] || [];
            const isAggressive = tier === 'AGGRESSIVE';

            return (
              <motion.article
                layout
                key={tier}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`border-2 flex flex-col justify-between overflow-hidden ${
                  isAggressive
                    ? 'border-nexus-crimson bg-nexus-ink text-nexus-paper shadow-brutal-crimson'
                    : 'border-nexus-ink bg-nexus-paper text-nexus-ink shadow-brutal-sm'
                }`}
              >
                {/* Top Classification Header */}
                <div>
                  <div
                    className={`px-4 py-3 border-b-2 flex items-center justify-between gap-2 ${
                      isAggressive
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-85">
                        {meta.code}
                      </span>
                    </div>
                    <RiskBadge
                      risk={tier}
                      size="sm"
                      variant={isAggressive ? 'onCrimson' : 'onDark'}
                    />
                  </div>

                  {/* Proposal Definition Pillars */}
                  <div
                    className={`p-4 border-b ${
                      isAggressive ? 'border-nexus-paper/15' : 'border-nexus-ink/15'
                    } space-y-2.5`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-3xl uppercase tracking-wide leading-none">
                        {meta.label}
                      </h3>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider ${
                          isAggressive ? 'text-nexus-paper/65' : 'text-nexus-muted'
                        }`}
                      >
                        {tierCatalog.length} MARKET MODULES
                      </span>
                    </div>

                    {/* Exact NEXUS Proposal Pillars */}
                    <div className="flex flex-wrap gap-1.5">
                      {meta.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border ${
                            isAggressive
                              ? 'bg-white/10 text-white border-white/25'
                              : 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink/30'
                          }`}
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>

                    {!compact && (
                      <p
                        className={`font-editorial text-xs leading-relaxed ${
                          isAggressive ? 'text-nexus-paper/75' : 'text-nexus-charcoal'
                        }`}
                      >
                        {meta.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Telemetry Grid: Attempts, Success by Risk, Credits Gained/Lost by Risk */}
                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className={`p-2.5 border ${
                        isAggressive
                          ? 'border-nexus-paper/20 bg-white/5'
                          : 'border-nexus-ink/20 bg-nexus-paper-elevated'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-widest opacity-70 block">
                        ATTEMPTS
                      </span>
                      <span className="font-display text-2xl leading-none mt-1 block">
                        {attemptsCount}
                      </span>
                    </div>

                    <div
                      className={`p-2.5 border ${
                        isAggressive
                          ? 'border-nexus-paper/20 bg-white/5'
                          : 'border-nexus-ink/20 bg-nexus-paper-elevated'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-widest opacity-70 block">
                        SOLVED
                      </span>
                      <span className="font-display text-2xl leading-none mt-1 block">
                        {solvedCount}{' '}
                        <span className="font-mono text-[10px] opacity-75">
                          ({solveRate}%)
                        </span>
                      </span>
                    </div>

                    <div
                      className={`p-2.5 border ${
                        isAggressive
                          ? 'border-nexus-paper/20 bg-white/5'
                          : 'border-nexus-ink/20 bg-nexus-paper-elevated'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-widest opacity-70 block">
                        FAILED
                      </span>
                      <span className="font-display text-2xl leading-none mt-1 block">
                        {failedCount}
                      </span>
                    </div>
                  </div>

                  {/* Credits Gained / Lost / Net by Risk */}
                  <div
                    className={`p-3 border ${
                      isAggressive
                        ? 'border-nexus-crimson/50 bg-black/40'
                        : 'border-nexus-ink bg-nexus-ink text-nexus-paper'
                    } space-y-1.5`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-nexus-paper/65">
                      <span>CREDITS BY RISK ({tier})</span>
                      <span
                        className={`font-bold ${
                          net >= 0 ? 'text-emerald-400' : 'text-nexus-crimson'
                        }`}
                      >
                        NET: {net >= 0 ? `+${net}` : net} CR
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-nexus-paper/15">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-nexus-paper/70 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          GAINED
                        </span>
                        <span className="font-bold text-white">+{gained} CR</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-nexus-paper/70 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3 text-nexus-crimson" />
                          LOST/SPENT
                        </span>
                        <span className="font-bold text-nexus-crimson">-{lost} CR</span>
                      </div>
                    </div>
                  </div>

                  {/* Configurable Catalog Range for this Risk Tier */}
                  {tierCatalog.length > 0 && (
                    <div className="flex items-center justify-between pt-1 text-[10px] uppercase tracking-wider opacity-80">
                      <span>
                        COST: {Math.min(...tierCatalog.map((c) => c.cost))}–
                        {Math.max(...tierCatalog.map((c) => c.cost))} CR
                      </span>
                      <span>
                        REWARD: +{Math.min(...tierCatalog.map((c) => c.reward))}–
                        {Math.max(...tierCatalog.map((c) => c.reward))} CR
                      </span>
                    </div>
                  )}

                  {onSelectMarketRiskFilter && (
                    <button
                      type="button"
                      onClick={() => onSelectMarketRiskFilter(tier)}
                      className={`w-full py-2 px-3 border font-condensed text-xs font-extrabold uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        isAggressive
                          ? 'border-nexus-crimson bg-nexus-crimson text-white hover:bg-white hover:text-nexus-ink'
                          : 'border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper'
                      }`}
                    >
                      <span>INSPECT {tier} CHALLENGES IN MARKET</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* =====================================================================
          LARGE RISK VISUALIZATION (GSAP-controlled bars, restrained)
          Isolated on dedicated GSAP refs — never animated by Framer Motion.
         ===================================================================== */}
      <div
        ref={vizSectionRef}
        className="border-2 border-nexus-ink bg-nexus-ink text-nexus-paper p-4 sm:p-5 space-y-4 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-nexus-paper/15 pb-3">
          <div className="flex items-center gap-2">
            <CrosshairMark variant="crimson" size={14} />
            <h3 className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-[0.16em] text-white">
              SQUAD RISK SPECTRUM &amp; CREDIT YIELD TELEMETRY
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-paper/60">
            EXPLICIT CONFIGURABLE CHALLENGE RISK // NO HIDDEN FORMULA
          </span>
        </div>

        {/* Attempt Distribution Spectrum Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-paper/75">
            <span>ATTEMPT ALLOCATION SPECTRUM</span>
            <span>
              SAFE {safeSharePercent}% · BALANCED {balancedSharePercent}% · AGGRESSIVE{' '}
              {aggressiveSharePercent}%
            </span>
          </div>

          <div className="h-4 w-full bg-white/10 border border-nexus-paper/30 flex overflow-hidden">
            <div
              ref={safeBarRef}
              style={{ width: `${safeSharePercent}%` }}
              className="h-full bg-nexus-paper border-r border-nexus-ink transition-none"
              title={`SAFE Attempts: ${telemetry.safeAttempts}`}
            />
            <div
              ref={balancedBarRef}
              style={{ width: `${balancedSharePercent}%` }}
              className="h-full bg-nexus-paper/55 border-r border-nexus-ink transition-none"
              title={`BALANCED Attempts: ${telemetry.balancedAttempts}`}
            />
            <div
              ref={aggressiveBarRef}
              style={{ width: `${aggressiveSharePercent}%` }}
              className="h-full bg-nexus-crimson transition-none"
              title={`AGGRESSIVE Attempts: ${telemetry.aggressiveAttempts}`}
            />
          </div>
        </div>

        {/* Per-Tier Credit Gained vs Lost Comparative Bars (GSAP) */}
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-nexus-paper/15">
            {RISK_TIERS.map((tier) => {
              const tierCredits = telemetry.creditsByRisk[tier];
              return (
                <div key={`viz-${tier}`} className="space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase tracking-wider">
                      {tier} TIER
                    </span>
                    <span
                      className={
                        tierCredits.net >= 0 ? 'text-emerald-400' : 'text-nexus-crimson'
                      }
                    >
                      NET {tierCredits.net >= 0 ? `+${tierCredits.net}` : tierCredits.net} CR
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-nexus-paper/70">
                      <span>GAINED</span>
                      <span className="text-white">+{tierCredits.gained} CR</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 overflow-hidden">
                      <div
                        ref={(el) => {
                          yieldBarRefs.current[`${tier}-gained`] = el;
                        }}
                        style={{ width: '0%' }}
                        className="h-full bg-nexus-paper"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-nexus-paper/70">
                      <span>LOST / INVESTED</span>
                      <span className="text-nexus-crimson">-{tierCredits.lost} CR</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 overflow-hidden">
                      <div
                        ref={(el) => {
                          yieldBarRefs.current[`${tier}-lost`] = el;
                        }}
                        style={{ width: '0%' }}
                        className="h-full bg-nexus-crimson"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================================
          RECENT ATTEMPTS FILTERED BY RISK TIER (when full view enabled)
         ===================================================================== */}
      {!compact && filteredAttempts.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-muted">
              SESSION ATTEMPT LOG BY RISK TIER ({selectedRiskFilter})
            </span>
            <span className="font-mono text-[10px] text-nexus-muted">
              SHOWING {filteredAttempts.length} RECORDS
            </span>
          </div>

          <div className="divide-y border-2 border-nexus-ink bg-nexus-paper-elevated">
            <AnimatePresence initial={false}>
              {filteredAttempts.map((att) => {
                const isSuccess = att.status === 'SUCCESS';
                const isInProgress = att.status === 'IN_PROGRESS';
                return (
                  <motion.div
                    key={att.attemptId}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                    className="p-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <RiskBadge risk={att.normalizedRisk} size="xs" />
                      <div className="min-w-0">
                        <span className="font-bold text-nexus-ink uppercase truncate block">
                          {att.title}{' '}
                          <span className="text-nexus-muted font-normal">
                            [{att.challengeId}]
                          </span>
                        </span>
                        <span className="text-[10px] text-nexus-muted uppercase">
                          {att.category} · COST: -{att.costPaid || 0} CR · REWARD: +
                          {att.potentialReward || 0} CR
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                          isSuccess
                            ? 'bg-nexus-ink text-nexus-paper'
                            : isInProgress
                            ? 'bg-nexus-crimson/15 text-nexus-crimson border border-nexus-crimson'
                            : 'bg-nexus-crimson text-white'
                        }`}
                      >
                        {att.status}
                      </span>
                      <span
                        className={`font-bold ${
                          Number(att.creditsDelta || 0) > 0
                            ? 'text-nexus-ink'
                            : 'text-nexus-crimson'
                        }`}
                      >
                        {isInProgress
                          ? `-${att.costPaid || 0} CR (ENTRY)`
                          : `${Number(att.creditsDelta || 0) >= 0 ? '+' : ''}${
                              att.creditsDelta || 0
                            } CR`}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamRiskProfileModule;
