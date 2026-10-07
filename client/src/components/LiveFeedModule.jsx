import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio,
  Crosshair,
  Play,
  Send,
  CheckCircle2,
  AlertTriangle,
  Coins,
  Zap,
  Filter,
} from 'lucide-react';
import { BrutalistPanel } from './BrutalistPanel';
import { SystemBadge } from './SystemBadge';
import { RiskBadge } from './RiskBadge';
import { LIVE_FEED_EVENT_TYPES } from '../socket/socketClient';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const CANONICAL_FEED_FILTERS = [
  'ALL',
  LIVE_FEED_EVENT_TYPES.CHALLENGE_ACQUIRED,
  LIVE_FEED_EVENT_TYPES.CHALLENGE_STARTED,
  LIVE_FEED_EVENT_TYPES.SUBMISSION,
  LIVE_FEED_EVENT_TYPES.SUCCESS,
  LIVE_FEED_EVENT_TYPES.FAILURE,
  LIVE_FEED_EVENT_TYPES.CREDITS_UPDATED,
  LIVE_FEED_EVENT_TYPES.ABILITY_USED,
];

const EVENT_TYPE_META = {
  [LIVE_FEED_EVENT_TYPES.CHALLENGE_ACQUIRED]: {
    icon: Crosshair,
    badgeClass: 'bg-nexus-ink text-nexus-paper border-nexus-ink',
    rowBorder: 'border-l-4 border-l-nexus-ink',
  },
  [LIVE_FEED_EVENT_TYPES.CHALLENGE_STARTED]: {
    icon: Play,
    badgeClass: 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink',
    rowBorder: 'border-l-4 border-l-nexus-ink/70',
  },
  [LIVE_FEED_EVENT_TYPES.SUBMISSION]: {
    icon: Send,
    badgeClass: 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink',
    rowBorder: 'border-l-4 border-l-nexus-ink',
  },
  [LIVE_FEED_EVENT_TYPES.SUCCESS]: {
    icon: CheckCircle2,
    badgeClass: 'bg-nexus-ink text-nexus-paper border-nexus-ink',
    rowBorder: 'border-l-4 border-l-nexus-ink',
  },
  [LIVE_FEED_EVENT_TYPES.FAILURE]: {
    icon: AlertTriangle,
    badgeClass: 'bg-nexus-crimson text-white border-nexus-crimson',
    rowBorder: 'border-l-4 border-l-nexus-crimson',
  },
  [LIVE_FEED_EVENT_TYPES.CREDITS_UPDATED]: {
    icon: Coins,
    badgeClass: 'bg-nexus-crimson/15 text-nexus-crimson border-nexus-crimson',
    rowBorder: 'border-l-4 border-l-nexus-crimson/80',
  },
  [LIVE_FEED_EVENT_TYPES.ABILITY_USED]: {
    icon: Zap,
    badgeClass: 'bg-nexus-crimson text-white border-nexus-ink',
    rowBorder: 'border-l-4 border-l-nexus-crimson',
  },
};

const formatFeedTime = (isoString) => {
  if (!isoString) return '--:--:--';
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return '--:--:--';
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Fallback client-side derivation if server liveFeed array is not yet populated.
 */
export const deriveClientFallbackLiveFeed = (team, attempts = [], transactions = []) => {
  const feed = [];

  for (const att of attempts || []) {
    const startTs = new Date(att.startedAt || Date.now()).getTime();
    feed.push({
      feedId: `FALLBACK-ACQ-${att.attemptId}`,
      eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_ACQUIRED,
      title: `CHALLENGE ACQUIRED: ${att.title || att.challengeId}`,
      summary: `Module [${att.challengeId}] (${att.category} // ${att.risk}) unlocked for ${att.costPaid || 0} CR.`,
      challengeId: att.challengeId,
      category: att.category,
      risk: att.risk,
      creditsDelta: -Math.abs(att.costPaid || 0),
      timestamp: new Date(startTs - 1000).toISOString(),
    });

    feed.push({
      feedId: `FALLBACK-START-${att.attemptId}`,
      eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_STARTED,
      title: `CHALLENGE STARTED: ${att.title || att.challengeId}`,
      summary: `Session [${att.attemptId}] armed on engine [${att.gameType || 'wordGuess'}].`,
      challengeId: att.challengeId,
      category: att.category,
      risk: att.risk,
      creditsDelta: 0,
      timestamp: new Date(startTs).toISOString(),
    });

    if (att.status && att.status !== 'IN_PROGRESS') {
      const endTs = new Date(att.completedAt || att.startedAt || Date.now()).getTime();
      const isSuccess = att.status === 'SUCCESS' || att.status === 'COMPLETED';
      feed.push({
        feedId: `FALLBACK-SUB-${att.attemptId}`,
        eventType: LIVE_FEED_EVENT_TYPES.SUBMISSION,
        title: `SUBMISSION: ${att.title || att.challengeId}`,
        summary: `Attempt [${att.attemptId}] evaluated by NEXUS Core.`,
        challengeId: att.challengeId,
        category: att.category,
        risk: att.risk,
        creditsDelta: 0,
        timestamp: new Date(endTs - 500).toISOString(),
      });

      feed.push({
        feedId: `FALLBACK-RES-${att.attemptId}`,
        eventType: isSuccess ? LIVE_FEED_EVENT_TYPES.SUCCESS : LIVE_FEED_EVENT_TYPES.FAILURE,
        title: isSuccess
          ? `SUCCESS: ${att.title || att.challengeId} (+${att.potentialReward || 0} CR)`
          : `FAILURE [${att.status}]: ${att.title || att.challengeId} (-${att.penaltyOnFail || 0} CR)`,
        summary: isSuccess
          ? `Challenge solved! Awarded +${att.potentialReward || 0} CR.`
          : `Challenge ended with ${att.status}. Penalty -${att.penaltyOnFail || 0} CR applied.`,
        challengeId: att.challengeId,
        category: att.category,
        risk: att.risk,
        creditsDelta: isSuccess
          ? Number(att.potentialReward || 0)
          : -Math.abs(Number(att.penaltyOnFail || 0)),
        timestamp: new Date(endTs).toISOString(),
      });
    }
  }

  for (const tx of transactions || []) {
    const txId = tx._id || `${tx.type}-${tx.timestamp}`;
    if (tx.type === 'ABILITY') {
      feed.push({
        feedId: `FALLBACK-ABL-${txId}`,
        eventType: LIVE_FEED_EVENT_TYPES.ABILITY_USED,
        title: `ABILITY USED: ${(tx.relatedAbility?.name || 'NEXUS MODULE').toUpperCase()}`,
        summary: tx.summary || `Activated restricted module (${tx.amount} CR).`,
        creditsDelta: Number(tx.amount || 0),
        balanceAfter: tx.balanceAfter,
        timestamp: tx.timestamp || new Date().toISOString(),
      });
    }

    feed.push({
      feedId: `FALLBACK-CR-${txId}`,
      eventType: LIVE_FEED_EVENT_TYPES.CREDITS_UPDATED,
      title: `CREDITS UPDATED: ${tx.amount >= 0 ? `+${tx.amount}` : tx.amount} CR (${tx.type})`,
      summary: tx.summary || `Balance updated to ${tx.balanceAfter} CR.`,
      creditsDelta: Number(tx.amount || 0),
      balanceAfter: tx.balanceAfter,
      timestamp: tx.timestamp || new Date().toISOString(),
    });
  }

  feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return feed;
};

/**
 * PHASE 11 — SOCKET.IO LIVE FEED MODULE
 * Displays real-time Socket.IO events:
 * - CHALLENGE ACQUIRED
 * - CHALLENGE STARTED
 * - SUBMISSION
 * - SUCCESS
 * - FAILURE
 * - CREDITS UPDATED
 * - ABILITY USED
 *
 * Uses Framer Motion for:
 * - new event entries
 * - event type filter transitions
 */
export const LiveFeedModule = ({
  team,
  liveFeed = [],
  attempts = [],
  transactions = [],
  joinedRoom,
  socketConnected = false,
  maxItems = 25,
  compact = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedEventType, setSelectedEventType] = useState('ALL');

  const resolvedFeed = useMemo(() => {
    if (Array.isArray(liveFeed) && liveFeed.length > 0) {
      return liveFeed;
    }
    return deriveClientFallbackLiveFeed(team, attempts, transactions);
  }, [liveFeed, team, attempts, transactions]);

  const eventCounts = useMemo(() => {
    const counts = { ALL: resolvedFeed.length };
    for (const type of CANONICAL_FEED_FILTERS) {
      if (type !== 'ALL') counts[type] = 0;
    }
    for (const item of resolvedFeed) {
      if (counts[item.eventType] !== undefined) {
        counts[item.eventType] += 1;
      }
    }
    return counts;
  }, [resolvedFeed]);

  const filteredFeed = useMemo(() => {
    const list =
      selectedEventType === 'ALL'
        ? resolvedFeed
        : resolvedFeed.filter((item) => item.eventType === selectedEventType);
    return list.slice(0, maxItems);
  }, [resolvedFeed, selectedEventType, maxItems]);

  return (
    <BrutalistPanel
      codeTag="LIVE_FEED // SOCKET.IO"
      title="REAL-TIME SQUAD TELEMETRY STREAM"
      accentTitle
      headerRight={
        <div className="flex items-center gap-2">
          <SystemBadge variant={socketConnected ? 'crimson' : 'outline'} pulse={socketConnected}>
            {socketConnected
              ? `LIVE // ${joinedRoom || `team:${team?.teamId}`}`
              : 'OFFLINE CACHE'}
          </SystemBadge>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Canonical Event Type Filters (Framer Motion) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-nexus-crimson" />
              FILTER BY SOCKET.IO EVENT STREAM
            </span>
            <span>
              SHOWING {filteredFeed.length} OF {resolvedFeed.length} EVENTS
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CANONICAL_FEED_FILTERS.map((filterKey) => {
              const isSelected = selectedEventType === filterKey;
              const count = eventCounts[filterKey] ?? 0;

              return (
                <motion.button
                  key={filterKey}
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  onClick={() => setSelectedEventType(filterKey)}
                  className={`px-2.5 py-1 border font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-nexus-crimson text-white border-nexus-ink'
                      : 'bg-nexus-paper text-nexus-ink border-nexus-ink/40 hover:border-nexus-ink'
                  }`}
                >
                  <span>{filterKey}</span>
                  <span
                    className={`px-1 text-[9px] ${
                      isSelected ? 'bg-black/30 text-white' : 'bg-nexus-ink/10 text-nexus-muted'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Real-Time Event Entries List (Framer Motion new entry animation) */}
        <div
          className={`border-2 border-nexus-ink bg-nexus-paper-elevated divide-y divide-nexus-ink/15 overflow-y-auto ${
            compact ? 'max-h-80' : 'max-h-[480px]'
          }`}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {filteredFeed.length === 0 ? (
              <motion.div
                key="empty-feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 text-center font-mono text-xs text-nexus-muted"
              >
                NO [{selectedEventType}] EVENTS RECORDED IN STREAM YET.
              </motion.div>
            ) : (
              filteredFeed.map((item) => {
                const meta =
                  EVENT_TYPE_META[item.eventType] ||
                  EVENT_TYPE_META[LIVE_FEED_EVENT_TYPES.CREDITS_UPDATED];
                const IconComponent = meta.icon || Radio;
                const hasCreditDelta =
                  item.creditsDelta !== undefined &&
                  item.creditsDelta !== null &&
                  Number(item.creditsDelta) !== 0;

                return (
                  <motion.div
                    layout
                    key={item.feedId || `${item.eventType}-${item.timestamp}-${item.title}`}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: -10, scale: 0.99 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`p-3.5 bg-nexus-paper hover:bg-nexus-paper-elevated transition-colors ${meta.rowBorder}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 border font-mono text-[10px] font-bold uppercase tracking-widest ${meta.badgeClass}`}
                        >
                          <IconComponent className="w-3 h-3 shrink-0" />
                          <span>{item.eventType}</span>
                        </span>

                        {item.category && (
                          <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-nexus-ink/10 text-nexus-ink font-bold">
                            {item.category}
                          </span>
                        )}

                        {item.risk && <RiskBadge risk={item.risk} size="xs" />}
                      </div>

                      <div className="flex items-center gap-2.5 font-mono text-[11px]">
                        {hasCreditDelta && (
                          <span
                            className={`font-bold px-1.5 py-0.5 border ${
                              Number(item.creditsDelta) > 0
                                ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                                : 'bg-nexus-crimson/10 text-nexus-crimson border-nexus-crimson/40'
                            }`}
                          >
                            {Number(item.creditsDelta) > 0
                              ? `+${item.creditsDelta} CR`
                              : `${item.creditsDelta} CR`}
                          </span>
                        )}

                        <span className="text-nexus-muted text-[10px]">
                          {formatFeedTime(item.timestamp)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <p className="font-condensed text-base font-extrabold uppercase tracking-wide text-nexus-ink">
                        {item.title}
                      </p>
                      {item.balanceAfter !== undefined && item.balanceAfter !== null && (
                        <span className="font-mono text-[10px] text-nexus-muted shrink-0">
                          BALANCE: <strong className="text-nexus-ink">{item.balanceAfter} CR</strong>
                        </span>
                      )}
                    </div>

                    {item.summary && (
                      <p className="font-mono text-xs text-nexus-charcoal mt-1 leading-relaxed">
                        {item.summary}
                      </p>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </BrutalistPanel>
  );
};

export default LiveFeedModule;
