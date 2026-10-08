import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Filter,
  ArrowUpRight,
} from 'lucide-react';
import {
  RiskBadge,
  RISK_TIERS,
  RISK_CLASSIFICATION,
  normalizeRiskTier,
} from './RiskBadge';
import { useReducedMotion } from '../hooks/useReducedMotion';

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

  const activeRiskTier = normalizeRiskTier(
    team?.currentChallenge?.risk || stats.riskProfile || 'BALANCED'
  );

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

  const displayedTiers = useMemo(() => {
    if (selectedRiskFilter === 'ALL') return RISK_TIERS;
    return RISK_TIERS.filter((t) => t === selectedRiskFilter);
  }, [selectedRiskFilter]);

  return (
    <section
      aria-label="Team Risk Profile"
      className="nexus-editorial-box p-5 sm:p-6 space-y-5 relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b-2 border-nexus-ink pb-4">
        <div className="space-y-1">
          <span className="bg-nexus-ink text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-[0.24em] px-2.5 py-1 inline-block">
            STRATEGY &amp; RISK
          </span>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1">
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-nexus-ink leading-none">
              RISK
            </h2>
            <span className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-nexus-crimson leading-none">
              PROFILE
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3">
          <div className="px-3 py-2 border-2 border-nexus-ink bg-nexus-paper-elevated flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted font-bold">
              CURRENT PROFILE:
            </span>
            <RiskBadge risk={telemetry.activeRiskTier} size="sm" pulseAggressive />
          </div>

          <div
            role="tablist"
            aria-label="Filter by risk tier"
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
                  className={`px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest border transition-colors cursor-pointer ${
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

      {/* Three Risk Tier Cards: SAFE, BALANCED, AGGRESSIVE */}
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
                <div>
                  <div
                    className={`px-4 py-3 border-b-2 flex items-center justify-between gap-2 ${
                      isAggressive
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                    }`}
                  >
                    <h3 className="font-display text-2xl uppercase tracking-wide leading-none">
                      {meta.label}
                    </h3>
                    <RiskBadge
                      risk={tier}
                      size="xs"
                      variant={isAggressive ? 'onCrimson' : 'onDark'}
                    />
                  </div>

                  <div
                    className={`p-4 border-b ${
                      isAggressive ? 'border-nexus-paper/15' : 'border-nexus-ink/15'
                    } space-y-2.5`}
                  >
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
                        {solvedCount}
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

                  <div
                    className={`p-3 border ${
                      isAggressive
                        ? 'border-nexus-crimson/50 bg-black/40'
                        : 'border-nexus-ink bg-nexus-ink text-nexus-paper'
                    } space-y-1.5`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-nexus-paper/65">
                      <span>CREDITS ({tier})</span>
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
                          EARNED
                        </span>
                        <span className="font-bold text-white">+{gained} CR</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-nexus-paper/70 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3 text-nexus-crimson" />
                          SPENT
                        </span>
                        <span className="font-bold text-nexus-crimson">-{lost} CR</span>
                      </div>
                    </div>
                  </div>

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
                      <span>BROWSE {tier} CHALLENGES ({tierCatalog.length})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default TeamRiskProfileModule;
