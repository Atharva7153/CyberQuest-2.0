import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Ban,
  Play,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import { BrutalistPanel } from './BrutalistPanel';
import { SystemBadge } from './SystemBadge';
import { RiskBadge } from './RiskBadge';
import { useReducedMotion } from '../hooks/useReducedMotion';

const RESULT_FILTERS = ['ALL', 'SUCCESS', 'FAILED', 'TIMEOUT', 'ABANDONED', 'IN_PROGRESS'];
const CATEGORY_FILTERS = ['ALL', 'LOGIC', 'PUZZLES', 'OBSERVATION', 'KNOWLEDGE', 'TECHNICAL'];
const RISK_FILTERS = ['ALL', 'SAFE', 'BALANCED', 'AGGRESSIVE'];

const formatFullTimestamp = (isoStr) => {
  if (!isoStr) return '--';
  const d = new Date(isoStr);
  if (Number.isNaN(d.getTime())) return '--';
  return d.toLocaleString([], {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Fallback client-side normalization if attemptHistory is not yet populated.
 */
export const buildClientAttemptHistory = (team, attempts = [], catalog = []) => {
  const catalogById = new Map((catalog || []).map((c) => [c.challengeId, c]));
  const seenCompletedIds = new Set();
  const list = [];

  for (const att of attempts || []) {
    if (!att) continue;
    const def = catalogById.get(att.challengeId) || {};
    const rawStatus = String(att.status || 'IN_PROGRESS').toUpperCase();
    const result =
      rawStatus === 'COMPLETED'
        ? 'SUCCESS'
        : rawStatus === 'EXPIRED'
          ? 'TIMEOUT'
          : rawStatus;

    const reward = Number(att.potentialReward ?? def.reward ?? 400);
    const penalty = Number(att.penaltyOnFail ?? def.penalty ?? 100);
    const cost = Number(att.costPaid ?? def.cost ?? 150);

    let rewardPenaltyDelta = 0;
    let rewardPenaltyType = 'PENDING';
    if (result === 'SUCCESS') {
      rewardPenaltyDelta = reward;
      rewardPenaltyType = 'REWARD';
      seenCompletedIds.add(att.challengeId);
    } else if (result === 'FAILED' || result === 'TIMEOUT' || result === 'ABANDONED') {
      rewardPenaltyDelta = -Math.abs(penalty);
      rewardPenaltyType = 'PENALTY';
    }

    list.push({
      attemptId: att.attemptId || `ATT-${att.challengeId}`,
      challengeId: att.challengeId,
      title: att.title || def.title || att.challengeId,
      category: String(att.category || def.category || 'LOGIC').toUpperCase(),
      difficulty: String(att.difficulty || def.difficulty || 'MODERATE').toUpperCase(),
      risk: String(att.risk || def.risk || 'BALANCED').toUpperCase(),
      gameType: att.gameType || def.gameType || 'wordGuess',
      cost,
      result,
      reward,
      penalty,
      rewardPenaltyDelta,
      rewardPenaltyType,
      hintsUnlocked: Number(att.hintsUnlocked || att.unlockedHints?.length || 0),
      extraTimeMinutes: Number(att.extraTimeMinutes || 0),
      attemptNumber: Math.max(1, Number(att.attemptNumber) || (att.isReattempt ? 2 : 1)),
      isReattempt: Boolean(att.isReattempt || Number(att.attemptNumber) > 1),
      startedAt: att.startedAt || att.createdAt,
      completedAt: att.completedAt || null,
      timestamp: att.timestamp || att.completedAt || att.startedAt || att.createdAt || new Date().toISOString(),
    });
  }

  for (const comp of team?.completedChallenges || []) {
    if (!comp?.challengeId || seenCompletedIds.has(comp.challengeId)) continue;
    const def = catalogById.get(comp.challengeId) || {};
    const reward = Number(comp.reward ?? def.reward ?? 400);
    const penalty = Number(comp.penalty ?? def.penalty ?? 50);
    const cost = Number(comp.cost ?? def.cost ?? 150);
    const ts = comp.timestamp || new Date().toISOString();

    list.push({
      attemptId: `ATT-${comp.challengeId}`,
      challengeId: comp.challengeId,
      title: comp.title || def.title || comp.challengeId,
      category: String(comp.category || def.category || 'LOGIC').toUpperCase(),
      difficulty: String(comp.difficulty || def.difficulty || 'LOW').toUpperCase(),
      risk: String(comp.risk || def.risk || 'SAFE').toUpperCase(),
      gameType: comp.gameType || def.gameType || 'wordGuess',
      cost,
      result: 'SUCCESS',
      reward,
      penalty,
      rewardPenaltyDelta: reward,
      rewardPenaltyType: 'REWARD',
      hintsUnlocked: 0,
      extraTimeMinutes: 0,
      isReattempt: false,
      startedAt: ts,
      completedAt: ts,
      timestamp: ts,
    });
  }

  list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return list;
};

/**
 * PHASE 11 — ATTEMPT HISTORY MODULE
 * Shows every attempt:
 * - challenge
 * - category
 * - risk
 * - cost
 * - result
 * - reward/penalty
 * - timestamp
 */
export const AttemptHistoryModule = ({
  team,
  attemptHistory = [],
  attempts = [],
  catalog = [],
}) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [resultFilter, setResultFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const resolvedHistory = useMemo(() => {
    if (Array.isArray(attemptHistory) && attemptHistory.length > 0) {
      return attemptHistory;
    }
    return buildClientAttemptHistory(team, attempts, catalog);
  }, [attemptHistory, team, attempts, catalog]);

  const filteredAttempts = useMemo(() => {
    return resolvedHistory.filter((item) => {
      if (resultFilter !== 'ALL' && item.result !== resultFilter) return false;
      if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
      if (riskFilter !== 'ALL' && item.risk !== riskFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTitle = String(item.title || '')
          .toLowerCase()
          .includes(q);
        const matchId = String(item.challengeId || '')
          .toLowerCase()
          .includes(q);
        const matchAttempt = String(item.attemptId || '')
          .toLowerCase()
          .includes(q);
        if (!matchTitle && !matchId && !matchAttempt) return false;
      }

      return true;
    });
  }, [resolvedHistory, resultFilter, categoryFilter, riskFilter, searchQuery]);

  const summaryMetrics = useMemo(() => {
    const totalAttempts = resolvedHistory.length;
    const totalSuccess = resolvedHistory.filter((a) => a.result === 'SUCCESS').length;
    const totalFailed = resolvedHistory.filter(
      (a) => a.result === 'FAILED' || a.result === 'TIMEOUT' || a.result === 'ABANDONED'
    ).length;
    const totalCostPaid = resolvedHistory.reduce((acc, a) => acc + Number(a.cost || 0), 0);
    const netRewardPenalty = resolvedHistory.reduce(
      (acc, a) => acc + Number(a.rewardPenaltyDelta || 0),
      0
    );

    return {
      totalAttempts,
      totalSuccess,
      totalFailed,
      totalCostPaid,
      netRewardPenalty,
    };
  }, [resolvedHistory]);

  const renderResultBadge = (result) => {
    switch (result) {
      case 'SUCCESS':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-nexus-ink text-nexus-paper border border-nexus-ink font-mono text-[10px] font-bold uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3 text-nexus-crimson" />
            <span>SUCCESS</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-nexus-crimson/15 text-nexus-crimson border border-nexus-crimson font-mono text-[10px] font-bold uppercase tracking-widest">
            <Play className="w-3 h-3 fill-current" />
            <span>IN PROGRESS</span>
          </span>
        );
      case 'TIMEOUT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-nexus-crimson text-white border border-nexus-ink font-mono text-[10px] font-bold uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            <span>TIMEOUT</span>
          </span>
        );
      case 'ABANDONED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-nexus-crimson text-white border border-nexus-ink font-mono text-[10px] font-bold uppercase tracking-widest">
            <Ban className="w-3 h-3" />
            <span>ABANDONED</span>
          </span>
        );
      case 'FAILED':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-nexus-crimson text-white border border-nexus-ink font-mono text-[10px] font-bold uppercase tracking-widest">
            <AlertTriangle className="w-3 h-3" />
            <span>{result || 'FAILED'}</span>
          </span>
        );
    }
  };

  return (
    <BrutalistPanel
      codeTag="ATTEMPT_HISTORY // PHASE_11"
      title="SERVER-AUTHORITATIVE CHALLENGE ATTEMPT LEDGER"
      accentTitle
      headerRight={
        <SystemBadge variant="operational">
          {filteredAttempts.length} / {resolvedHistory.length} ATTEMPTS
        </SystemBadge>
      }
    >
      <div className="space-y-5">
        {/* Top 4 Summary Stat Cards (Framer Motion) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            className="p-3.5 border-2 border-nexus-ink bg-nexus-paper"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
              TOTAL ATTEMPTS LOGGED
            </span>
            <p className="font-display text-4xl text-nexus-ink leading-none mt-1">
              {summaryMetrics.totalAttempts}
            </p>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            className="p-3.5 border-2 border-nexus-ink bg-nexus-paper"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
              SUCCESSFUL / FAILED
            </span>
            <p className="font-display text-4xl text-nexus-ink leading-none mt-1">
              {summaryMetrics.totalSuccess} /{' '}
              <span className="text-nexus-crimson">{summaryMetrics.totalFailed}</span>
            </p>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            className="p-3.5 border-2 border-nexus-ink bg-nexus-paper"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
              TOTAL ENTRY COST PAID
            </span>
            <p className="font-display text-4xl text-nexus-crimson leading-none mt-1">
              -{summaryMetrics.totalCostPaid.toLocaleString()} CR
            </p>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            className="p-3.5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-paper/60 block">
              NET REWARD / PENALTY
            </span>
            <p
              className={`font-display text-4xl leading-none mt-1 ${
                summaryMetrics.netRewardPenalty >= 0 ? 'text-white' : 'text-nexus-crimson'
              }`}
            >
              {summaryMetrics.netRewardPenalty >= 0
                ? `+${summaryMetrics.netRewardPenalty.toLocaleString()} CR`
                : `${summaryMetrics.netRewardPenalty.toLocaleString()} CR`}
            </p>
          </motion.div>
        </div>

        {/* Multi-Dimensional Filter Bar (Framer Motion) */}
        <div className="p-4 border-2 border-nexus-ink bg-nexus-paper-elevated space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-nexus-ink">
              <Filter className="w-3.5 h-3.5 text-nexus-crimson" />
              <span>FILTER ATTEMPT RECORDS</span>
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-3.5 h-3.5 text-nexus-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH CHALLENGE OR ATTEMPT ID..."
                aria-label="Search attempt history"
                className="w-full pl-8 pr-3 py-1.5 border border-nexus-ink bg-nexus-paper font-mono text-xs uppercase text-nexus-ink placeholder:text-nexus-muted/70 focus:outline-none focus:border-nexus-crimson"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-dashed border-nexus-ink/20">
            {/* Result Filter */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-muted block">
                RESULT STATUS
              </span>
              <div className="flex flex-wrap gap-1">
                {RESULT_FILTERS.map((resKey) => (
                  <motion.button
                    key={resKey}
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    onClick={() => setResultFilter(resKey)}
                    className={`px-2 py-1 border font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      resultFilter === resKey
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-paper text-nexus-ink border-nexus-ink/30 hover:border-nexus-ink'
                    }`}
                  >
                    {resKey}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-muted block">
                CATEGORY
              </span>
              <div className="flex flex-wrap gap-1">
                {CATEGORY_FILTERS.map((catKey) => (
                  <motion.button
                    key={catKey}
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    onClick={() => setCategoryFilter(catKey)}
                    className={`px-2 py-1 border font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      categoryFilter === catKey
                        ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                        : 'bg-nexus-paper text-nexus-ink border-nexus-ink/30 hover:border-nexus-ink'
                    }`}
                  >
                    {catKey}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Risk Filter */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-muted block">
                RISK CLASSIFICATION
              </span>
              <div className="flex flex-wrap gap-1">
                {RISK_FILTERS.map((riskKey) => (
                  <motion.button
                    key={riskKey}
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    onClick={() => setRiskFilter(riskKey)}
                    className={`px-2 py-1 border font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      riskFilter === riskKey
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-paper text-nexus-ink border-nexus-ink/30 hover:border-nexus-ink'
                    }`}
                  >
                    {riskKey}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            ATTEMPT HISTORY TABLE
            Columns: CHALLENGE | CATEGORY | RISK | COST | RESULT | REWARD/PENALTY | TIMESTAMP
           =================================================================== */}
        <div className="border-2 border-nexus-ink bg-nexus-paper overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-nexus-ink text-nexus-paper font-mono text-[10px] uppercase tracking-widest border-b-2 border-nexus-ink">
                <th className="py-3 px-3.5">CHALLENGE</th>
                <th className="py-3 px-3">CATEGORY</th>
                <th className="py-3 px-3">RISK</th>
                <th className="py-3 px-3">COST</th>
                <th className="py-3 px-3">RESULT</th>
                <th className="py-3 px-3">REWARD / PENALTY</th>
                <th className="py-3 px-3.5 text-right">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nexus-ink/15 font-mono text-xs">
              <AnimatePresence initial={false}>
                {filteredAttempts.length === 0 ? (
                  <motion.tr
                    key="no-attempts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={7} className="py-10 px-4 text-center text-nexus-muted">
                      NO ATTEMPT RECORDS MATCH THE SELECTED FILTERS.
                    </td>
                  </motion.tr>
                ) : (
                  filteredAttempts.map((item) => {
                    const isSuccess = item.result === 'SUCCESS';
                    const isInProgress = item.result === 'IN_PROGRESS';

                    return (
                      <motion.tr
                        layout
                        key={`${item.attemptId}-${item.challengeId}-${item.timestamp}`}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="hover:bg-nexus-paper-elevated transition-colors"
                      >
                        {/* 1. CHALLENGE */}
                        <td className="py-3.5 px-3.5">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-condensed text-base font-extrabold uppercase text-nexus-ink">
                                {item.title}
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.2 border border-nexus-ink/35 bg-nexus-paper-elevated text-nexus-ink text-[9px] font-bold uppercase">
                                ATTEMPT #{item.attemptNumber || (item.isReattempt ? 2 : 1)}
                              </span>
                              {(item.isReattempt || Number(item.attemptNumber) > 1) && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-nexus-crimson/15 text-nexus-crimson text-[9px] font-bold uppercase">
                                  <RotateCcw className="w-2.5 h-2.5" />
                                  REATTEMPT
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-nexus-muted">
                              {item.challengeId} // {item.attemptId} · ENGINE: {item.gameType}
                            </span>
                          </div>
                        </td>

                        {/* 2. CATEGORY */}
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 border border-nexus-ink/40 bg-nexus-paper-elevated text-[10px] font-bold uppercase text-nexus-ink">
                            {item.category}
                          </span>
                        </td>

                        {/* 3. RISK */}
                        <td className="py-3.5 px-3">
                          <RiskBadge risk={item.risk} size="xs" />
                        </td>

                        {/* 4. COST */}
                        <td className="py-3.5 px-3 font-bold text-nexus-charcoal">
                          -{item.cost} CR
                        </td>

                        {/* 5. RESULT */}
                        <td className="py-3.5 px-3">{renderResultBadge(item.result)}</td>

                        {/* 6. REWARD / PENALTY */}
                        <td className="py-3.5 px-3">
                          {isInProgress ? (
                            <span className="text-[11px] text-nexus-muted font-bold">
                              PENDING (+{item.reward} / -{item.penalty} CR)
                            </span>
                          ) : isSuccess ? (
                            <span className="px-2 py-0.5 bg-nexus-ink text-nexus-paper font-bold text-xs">
                              +{item.reward} CR (REWARD)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-nexus-crimson/10 text-nexus-crimson border border-nexus-crimson/40 font-bold text-xs">
                              -{item.penalty} CR (PENALTY)
                            </span>
                          )}
                        </td>

                        {/* 7. TIMESTAMP + SESSION LINK */}
                        <td className="py-3.5 px-3.5 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[11px] text-nexus-ink font-semibold">
                              {formatFullTimestamp(item.timestamp)}
                            </span>
                            <button
                              type="button"
                              onClick={() => navigate(`/challenge/${item.challengeId}`)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-nexus-crimson hover:text-nexus-ink transition-colors cursor-pointer"
                            >
                              <span>{isInProgress ? 'RESUME SESSION' : 'OPEN MODULE'}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </BrutalistPanel>
  );
};

export default AttemptHistoryModule;
