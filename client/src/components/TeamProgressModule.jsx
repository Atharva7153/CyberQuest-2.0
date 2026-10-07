import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Crosshair,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  HelpCircle,
  Clock,
  Zap,
  Shield,
  Cpu,
} from 'lucide-react';
import { BrutalistPanel } from './BrutalistPanel';
import { SystemBadge } from './SystemBadge';
import { RiskBadge } from './RiskBadge';
import { CrosshairMark } from './CrosshairMark';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CANONICAL_CATEGORIES = ['LOGIC', 'PUZZLES', 'OBSERVATION', 'KNOWLEDGE', 'TECHNICAL'];

/**
 * Isolated GSAP Number Count-Up Span.
 * Animates only the textContent of its own span ref when `value` changes.
 * Never animated by Framer Motion; avoids constant movement.
 */
const GsapAnimatedStatNumber = ({
  value = 0,
  prefix = '',
  suffix = '',
  formatLocale = true,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const numberSpanRef = useRef(null);
  const previousValueRef = useRef(0);

  useLayoutEffect(() => {
    const el = numberSpanRef.current;
    if (!el) return undefined;

    const targetNum = Number(value) || 0;
    const startNum = previousValueRef.current;
    previousValueRef.current = targetNum;

    const formatNumber = (n) => {
      const rounded = Math.round(n);
      const formatted = formatLocale ? rounded.toLocaleString() : String(rounded);
      return `${prefix}${formatted}${suffix}`;
    };

    if (prefersReducedMotion || startNum === targetNum) {
      el.textContent = formatNumber(targetNum);
      return undefined;
    }

    const counter = { current: startNum };
    const tween = gsap.to(counter, {
      current: targetNum,
      duration: 0.65,
      ease: 'power2.out',
      onUpdate: () => {
        if (numberSpanRef.current) {
          numberSpanRef.current.textContent = formatNumber(counter.current);
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, prefix, suffix, formatLocale, prefersReducedMotion]);

  const initialFormatted = formatLocale
    ? Math.round(Number(value) || 0).toLocaleString()
    : String(Math.round(Number(value) || 0));

  return (
    <span ref={numberSpanRef} className={className}>
      {prefix}
      {initialFormatted}
      {suffix}
    </span>
  );
};

/**
 * PHASE 11 — TEAM PROGRESS MODULE
 * Displays:
 * - challenges attempted
 * - completed
 * - failed
 * - credits earned
 * - credits spent
 * - hints
 * - extra time
 * - abilities
 * - risk profile
 *
 * Animation:
 * - Framer Motion: stat cards, progress bars, category filters
 * - GSAP: restrained number/count-up animation for major statistics on isolated refs
 */
export const TeamProgressModule = ({
  team,
  progressSummary = null,
  attempts = [],
  catalog = [],
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  const computed = useMemo(() => {
    const stats = team?.stats || {};
    const completed = Number(
      progressSummary?.completed ??
        stats.totalSolved ??
        (team?.completedChallenges || []).length
    );
    const failed = Number(
      progressSummary?.failed ??
        stats.totalFailed ??
        (team?.failedChallenges || []).length
    );
    const inProgress = team?.activeAttempt ? 1 : 0;
    const riskSum =
      Number(stats.safeAttempts || 0) +
      Number(stats.balancedAttempts || 0) +
      Number(stats.aggressiveAttempts || 0);

    const challengesAttempted = Number(
      progressSummary?.challengesAttempted ??
        Math.max((attempts || []).length, completed + failed + inProgress, riskSum)
    );

    const creditsEarned = Number(progressSummary?.creditsEarned ?? stats.creditsEarned ?? 0);
    const creditsSpent = Number(progressSummary?.creditsSpent ?? stats.creditsSpent ?? 0);
    const hints = Number(progressSummary?.hints ?? stats.hintsPurchased ?? 0);
    const extraTime = Number(progressSummary?.extraTime ?? stats.extraTimePurchased ?? 0);
    const abilities = Number(progressSummary?.abilities ?? stats.abilitiesUsed ?? 0);
    const riskProfile =
      progressSummary?.riskProfile ||
      team?.currentChallenge?.risk ||
      stats.riskProfile ||
      'BALANCED';
    const coreProgressPercent = Math.min(
      100,
      Math.max(0, Number(progressSummary?.coreProgressPercent ?? stats.coreProgressPercent ?? 25))
    );

    const completionRate =
      challengesAttempted > 0 ? Math.round((completed / challengesAttempted) * 100) : 0;

    // Category breakdown
    const categoryBreakdown =
      Array.isArray(progressSummary?.categoryBreakdown) &&
      progressSummary.categoryBreakdown.length > 0
        ? progressSummary.categoryBreakdown
        : CANONICAL_CATEGORIES.map((cat) => {
            const totalInCatalog = Math.max(
              1,
              (catalog || []).filter((c) => String(c.category).toUpperCase() === cat).length
            );
            const completedInCat = (team?.completedChallenges || []).filter(
              (c) => String(c.category).toUpperCase() === cat
            ).length;
            const failedInCat = (team?.failedChallenges || []).filter(
              (c) => String(c.category).toUpperCase() === cat
            ).length;
            const activeInCat =
              team?.activeAttempt &&
              String(team.activeAttempt.category).toUpperCase() === cat
                ? 1
                : 0;
            const attemptedInCat = completedInCat + failedInCat + activeInCat;

            return {
              category: cat,
              totalInCatalog,
              attempted: attemptedInCat,
              completed: completedInCat,
              failed: failedInCat,
              completionPercent: Math.min(
                100,
                Math.round((completedInCat / totalInCatalog) * 100)
              ),
            };
          });

    return {
      challengesAttempted,
      completed,
      failed,
      inProgress,
      creditsEarned,
      creditsSpent,
      netCredits: creditsEarned - creditsSpent,
      hints,
      extraTime,
      extraTimeMinutes: extraTime * 5,
      abilities,
      riskProfile,
      coreProgressPercent,
      completionRate,
      safeAttempts: Number(stats.safeAttempts ?? 0),
      balancedAttempts: Number(stats.balancedAttempts ?? 0),
      aggressiveAttempts: Number(stats.aggressiveAttempts ?? 0),
      categoryBreakdown,
    };
  }, [team, progressSummary, attempts, catalog]);

  const primaryStatCards = [
    {
      id: 'CHALLENGES_ATTEMPTED',
      code: 'STAT // 01',
      label: 'CHALLENGES ATTEMPTED',
      value: computed.challengesAttempted,
      sublabel: `${computed.inProgress} ACTIVE SESSION · ${computed.completionRate}% SOLVE RATE`,
      icon: Crosshair,
      accent: 'ink',
    },
    {
      id: 'COMPLETED',
      code: 'STAT // 02',
      label: 'COMPLETED',
      value: computed.completed,
      sublabel: 'MODULES VERIFIED BY NEXUS CORE',
      icon: CheckCircle2,
      accent: 'ink',
    },
    {
      id: 'FAILED',
      code: 'STAT // 03',
      label: 'FAILED',
      value: computed.failed,
      sublabel: 'FAILED / TIMEOUT / ABANDONED',
      icon: AlertTriangle,
      accent: 'crimson',
    },
    {
      id: 'CREDITS_EARNED',
      code: 'STAT // 04',
      label: 'CREDITS EARNED',
      value: computed.creditsEarned,
      suffix: ' CR',
      sublabel: `CURRENT BALANCE: ${(team?.credits || 0).toLocaleString()} CR`,
      icon: TrendingUp,
      accent: 'ink',
    },
    {
      id: 'CREDITS_SPENT',
      code: 'STAT // 05',
      label: 'CREDITS SPENT',
      value: computed.creditsSpent,
      suffix: ' CR',
      sublabel: `NET LEDGER: ${computed.netCredits >= 0 ? `+${computed.netCredits}` : computed.netCredits} CR`,
      icon: TrendingDown,
      accent: 'crimson',
    },
    {
      id: 'HINTS',
      code: 'STAT // 06',
      label: 'HINTS',
      value: computed.hints,
      sublabel: 'SERVER INTELLIGENCE DECRYPTIONS',
      icon: HelpCircle,
      accent: 'ink',
    },
    {
      id: 'EXTRA_TIME',
      code: 'STAT // 07',
      label: 'EXTRA TIME',
      value: computed.extraTime,
      sublabel: `+${computed.extraTimeMinutes} MINUTES ALLOCATED`,
      icon: Clock,
      accent: 'ink',
    },
    {
      id: 'ABILITIES',
      code: 'STAT // 08',
      label: 'ABILITIES',
      value: computed.abilities,
      sublabel: `${(team?.abilities || []).filter((a) => a.enabled !== false).length} RESTRICTED MODULES ARMED`,
      icon: Zap,
      accent: 'crimson',
    },
  ];

  const visibleCategories = useMemo(() => {
    if (selectedCategoryFilter === 'ALL') return computed.categoryBreakdown;
    return computed.categoryBreakdown.filter((c) => c.category === selectedCategoryFilter);
  }, [computed.categoryBreakdown, selectedCategoryFilter]);

  return (
    <div className="space-y-6">
      {/* =====================================================================
          HERO CORE CONVERGENCE & RISK PROFILE BANNER
         ===================================================================== */}
      <BrutalistPanel
        codeTag="PROGRESS_DOSSIER // PHASE_11"
        title={`SQUAD OPERATIONAL PROGRESS // TEAM ${team?.teamName || team?.teamId}`}
        accentTitle
        headerRight={
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
              RISK PROFILE:
            </span>
            <RiskBadge risk={computed.riskProfile} size="xs" pulseAggressive />
          </div>
        }
      >
        <div className="space-y-6">
          {/* Top Core Convergence Progress Bar + Risk Profile Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left 8 Cols: Overall NEXUS Core Convergence Progress Bar */}
            <div className="lg:col-span-8 p-5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-nexus-crimson font-bold block">
                    NEXUS CORE CONVERGENCE INDEX
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-nexus-paper mt-1">
                    CORE SYNCHRONIZATION THRESHOLD
                  </h3>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] uppercase tracking-widest text-nexus-paper/60 block">
                    CONVERGENCE
                  </span>
                  <GsapAnimatedStatNumber
                    value={computed.coreProgressPercent}
                    suffix="%"
                    formatLocale={false}
                    className="font-display text-5xl text-nexus-crimson leading-none"
                  />
                </div>
              </div>

              {/* Framer Motion Progress Bar */}
              <div className="space-y-2">
                <div className="w-full h-5 bg-black/50 p-0.5 border border-nexus-paper/30 overflow-hidden">
                  <motion.div
                    initial={prefersReducedMotion ? false : { width: 0 }}
                    animate={{ width: `${computed.coreProgressPercent}%` }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-nexus-crimson"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-paper/70">
                  <span>PHASED PROGRESSION TOWARD FINAL OBJECTIVE</span>
                  <span>
                    SOLVED: {computed.completed} // ATTEMPTED: {computed.challengesAttempted}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Dedicated 9th Metric — RISK PROFILE Card */}
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.16 }}
              className="lg:col-span-4 p-5 border-2 border-nexus-ink bg-nexus-paper-elevated flex flex-col justify-between space-y-4 shadow-brutal-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-nexus-muted font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-nexus-crimson" />
                    STAT // 09 · RISK PROFILE
                  </span>
                  <CrosshairMark size={10} variant="crimson" />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-display text-4xl uppercase text-nexus-ink leading-none">
                    {computed.riskProfile}
                  </span>
                  <RiskBadge risk={computed.riskProfile} size="md" pulseAggressive />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-dashed border-nexus-ink/25 font-mono text-center">
                <div className="p-2 border border-nexus-ink/20 bg-nexus-paper">
                  <span className="block text-[9px] text-nexus-muted uppercase">SAFE</span>
                  <span className="text-sm font-bold text-nexus-ink">{computed.safeAttempts}</span>
                </div>
                <div className="p-2 border border-nexus-ink/20 bg-nexus-paper">
                  <span className="block text-[9px] text-nexus-muted uppercase">BALANCED</span>
                  <span className="text-sm font-bold text-nexus-ink">
                    {computed.balancedAttempts}
                  </span>
                </div>
                <div className="p-2 border border-nexus-crimson/40 bg-nexus-crimson/5">
                  <span className="block text-[9px] text-nexus-crimson uppercase">AGGR</span>
                  <span className="text-sm font-bold text-nexus-crimson">
                    {computed.aggressiveAttempts}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =================================================================
              8 CORE PROGRESS STAT CARDS (Framer Motion Cards + GSAP Count-Up)
             ================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryStatCards.map((card, index) => {
              const IconComponent = card.icon;
              const isCrimson = card.accent === 'crimson';

              return (
                <motion.div
                  key={card.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  transition={{
                    duration: 0.2,
                    delay: prefersReducedMotion ? 0 : index * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`p-4 border-2 border-nexus-ink flex flex-col justify-between space-y-3 shadow-brutal-sm ${
                    isCrimson ? 'bg-nexus-paper-elevated' : 'bg-nexus-paper'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted font-bold">
                      {card.code}
                    </span>
                    <IconComponent
                      className={`w-4 h-4 ${
                        isCrimson ? 'text-nexus-crimson' : 'text-nexus-ink'
                      }`}
                    />
                  </div>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-nexus-charcoal font-bold block">
                      {card.label}
                    </span>
                    <div
                      className={`font-display text-4xl sm:text-5xl uppercase leading-none mt-1 ${
                        isCrimson ? 'text-nexus-crimson' : 'text-nexus-ink'
                      }`}
                    >
                      <GsapAnimatedStatNumber
                        value={card.value}
                        prefix={card.prefix || ''}
                        suffix={card.suffix || ''}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-dashed border-nexus-ink/20 font-mono text-[10px] uppercase tracking-wider text-nexus-muted">
                    {card.sublabel}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* =================================================================
              CATEGORY MASTERY & PROGRESS BARS (Framer Motion Filters + Bars)
             ================================================================= */}
          <div className="border-2 border-nexus-ink bg-nexus-paper p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-nexus-ink pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-nexus-crimson" />
                <span className="font-condensed text-lg font-extrabold uppercase tracking-wider text-nexus-ink">
                  SECTOR & CATEGORY MASTERY BREAKDOWN
                </span>
              </div>

              {/* Category Filter Buttons (Framer Motion) */}
              <div className="flex flex-wrap gap-1.5">
                {['ALL', ...CANONICAL_CATEGORIES].map((cat) => {
                  const isActive = selectedCategoryFilter === cat;
                  return (
                    <motion.button
                      key={cat}
                      type="button"
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`px-2.5 py-1 border font-mono text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                          : 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink/30 hover:border-nexus-ink'
                      }`}
                    >
                      {cat}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {visibleCategories.map((catItem) => (
                <motion.div
                  layout
                  key={catItem.category}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18 }}
                  className="p-3.5 border border-nexus-ink bg-nexus-paper-elevated space-y-2.5"
                >
                  <div className="flex items-center justify-between font-mono text-xs font-bold">
                    <span className="text-nexus-ink">{catItem.category}</span>
                    <span className="text-nexus-crimson">{catItem.completionPercent}%</span>
                  </div>

                  {/* Framer Motion Progress Bar */}
                  <div className="w-full h-2.5 bg-nexus-ink/15 border border-nexus-ink overflow-hidden">
                    <motion.div
                      initial={prefersReducedMotion ? false : { width: 0 }}
                      animate={{ width: `${catItem.completionPercent}%` }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="h-full bg-nexus-crimson"
                    />
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-nexus-muted uppercase">
                    <span>ATTEMPTED: {catItem.attempted}</span>
                    <span>
                      SOLVED: {catItem.completed}/{catItem.totalInCatalog}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </BrutalistPanel>
    </div>
  );
};

export default TeamProgressModule;
