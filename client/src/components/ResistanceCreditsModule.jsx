import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  Clock,
  HelpCircle,
  Zap,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { BrutalistPanel } from './BrutalistPanel';
import { SystemBadge } from './SystemBadge';
import { useReducedMotion } from '../hooks/useReducedMotion';

const TX_TYPE_BADGES = {
  CHALLENGE_PURCHASE: { label: 'CHALLENGE PURCHASE', variant: 'outline' },
  CHALLENGE_REWARD: { label: 'CHALLENGE REWARD', variant: 'operational' },
  FAILURE_PENALTY: { label: 'FAILURE PENALTY', variant: 'crimson' },
  EXTRA_TIME: { label: 'EXTRA TIME', variant: 'outline' },
  HINT: { label: 'HINT', variant: 'outline' },
  ABILITY: { label: 'ABILITY', variant: 'crimson' },
  REATTEMPT: { label: 'REATTEMPT', variant: 'crimson' },
};

/**
 * Reusable GSAP number counter hook for large balance changes (>= 100 CR).
 * Does NOT animate continuously — only runs a short 0.55s tween when `targetBalance` changes.
 */
const useAnimatedCreditNumber = (targetBalance, prefersReducedMotion) => {
  const numberNodeRef = useRef(null);
  const prevBalanceRef = useRef(targetBalance);
  const counterStateRef = useRef({ value: targetBalance });

  useEffect(() => {
    const nextVal = Number(targetBalance ?? 0);
    const prevVal = Number(prevBalanceRef.current ?? nextVal);
    const diff = Math.abs(nextVal - prevVal);

    prevBalanceRef.current = nextVal;

    // For reduced motion or small changes, update text immediately without tweening
    if (prefersReducedMotion || diff < 100 || !numberNodeRef.current) {
      counterStateRef.current.value = nextVal;
      if (numberNodeRef.current) {
        numberNodeRef.current.textContent = nextVal.toLocaleString();
      }
      return undefined;
    }

    // Short GSAP number animation for large balance changes
    const tween = gsap.to(counterStateRef.current, {
      value: nextVal,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: () => {
        if (numberNodeRef.current) {
          numberNodeRef.current.textContent = Math.round(
            counterStateRef.current.value
          ).toLocaleString();
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [targetBalance, prefersReducedMotion]);

  return numberNodeRef;
};

/**
 * Compact Resistance Credits readout for the Top System Bar
 */
export const TopBarCreditsReadout = ({ credits = 0, lastCreditChange = null }) => {
  const prefersReducedMotion = useReducedMotion();
  const numberNodeRef = useAnimatedCreditNumber(credits, prefersReducedMotion);
  const [visibleDelta, setVisibleDelta] = useState(null);

  useEffect(() => {
    if (!lastCreditChange?.id) return undefined;
    setVisibleDelta(lastCreditChange);
    const timer = setTimeout(() => {
      setVisibleDelta(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [lastCreditChange]);

  return (
    <div className="relative flex items-center gap-2">
      {/* Framer Motion credit change pill */}
      <AnimatePresence mode="wait">
        {visibleDelta && (
          <motion.span
            key={visibleDelta.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`hidden md:inline-flex items-center gap-1 px-2 py-1 border border-nexus-ink font-mono text-xs font-bold ${
              visibleDelta.delta >= 0
                ? 'bg-nexus-paper-elevated text-nexus-ink'
                : 'bg-nexus-crimson text-white'
            }`}
          >
            {visibleDelta.delta >= 0 ? `+${visibleDelta.delta}` : visibleDelta.delta} CR
          </motion.span>
        )}
      </AnimatePresence>

      <div className="bg-nexus-ink text-nexus-paper px-4 py-2 border-2 border-nexus-ink shadow-brutal-sm text-right">
        <span className="block font-mono text-[9px] uppercase tracking-widest text-nexus-paper/70">
          RESISTANCE CREDITS
        </span>
        <div className="font-mono text-lg sm:text-2xl font-bold text-nexus-crimson flex items-baseline justify-end gap-1">
          <span ref={numberNodeRef}>{Number(credits).toLocaleString()}</span>
          <span className="text-xs text-nexus-paper/80">CR</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Prominent Resistance Credits Component
 * Features large brutalist typography, crimson accents, black/off-white interface,
 * technical borders, editorial labels, Framer Motion change badges, and short GSAP number transitions.
 */
export const ResistanceCreditsModule = ({
  team,
  transactions = [],
  creditsConfig = {},
  lastCreditChange = null,
  actionPending = false,
  onExecuteAction,
  showFullLedger = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const currentCredits = Number(team?.credits ?? 0);
  const numberNodeRef = useAnimatedCreditNumber(currentCredits, prefersReducedMotion);
  const [activeChangeBadge, setActiveChangeBadge] = useState(null);

  useEffect(() => {
    if (!lastCreditChange?.id) return undefined;
    setActiveChangeBadge(lastCreditChange);
    const timer = setTimeout(() => {
      setActiveChangeBadge(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [lastCreditChange]);

  const startingCredits = creditsConfig?.startingCredits ?? 1250;
  const hintCost = creditsConfig?.hintCost ?? 100;
  const extraTimeCost = creditsConfig?.extraTimeCost ?? 150;
  const reattemptMultiplier = creditsConfig?.reattemptMultiplier ?? 1.25;

  const activeChallenge = team?.currentChallenge;
  const baseReattemptTarget =
    team?.failedChallenges?.[0] ||
    activeChallenge || {
      challengeId: 'CHG-NET-01',
      title: 'NETWORK BREACH',
      cost: 500,
    };
  const reattemptCost = Math.ceil((baseReattemptTarget.cost || 500) * reattemptMultiplier);

  return (
    <div className="space-y-6">
      {/* ===================================================================
          1. PROMINENT RESISTANCE CREDITS HERO PANEL
         =================================================================== */}
      <div className="nexus-editorial-box p-0 overflow-hidden border-2 border-nexus-ink shadow-brutal">
        {/* Top Editorial Bar */}
        <div className="bg-nexus-ink text-nexus-paper px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-nexus-ink">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
              CORE RESOURCE // SERVER AUTHORITATIVE
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-nexus-paper/85">
              RESISTANCE CREDITS SYSTEM
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-nexus-paper/75">
            <span>STARTING CONFIG: {Number(startingCredits).toLocaleString()} CR</span>
            <CrosshairMark variant="crimson" size={12} />
          </div>
        </div>

        {/* Main Black / Off-White / Crimson Split Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-nexus-ink">
          {/* LEFT: COLOSSAL BALANCE READOUT (Off-White Paper + Carbon Typography + Red Accent) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-nexus-paper-elevated flex flex-col justify-between relative">
            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nexus-muted font-bold">
                AVAILABLE STRATEGIC BALANCE
              </p>
              <p className="font-editorial text-xs text-nexus-charcoal">
                Every decision shapes what&apos;s possible next.
              </p>
            </div>

            <div className="my-6 flex flex-wrap items-baseline gap-3">
              {/* Large Display Typography Balance */}
              <div className="font-display text-6xl sm:text-7xl xl:text-[5.25rem] leading-none tracking-wide text-nexus-ink">
                <span ref={numberNodeRef}>{currentCredits.toLocaleString()}</span>
              </div>
              <span className="font-condensed text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-nexus-crimson">
                CREDITS
              </span>

              {/* Framer Motion Credit Change Delta Badge */}
              <AnimatePresence mode="wait">
                {activeChangeBadge && (
                  <motion.div
                    key={activeChangeBadge.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 border-2 border-nexus-ink font-mono text-xs font-bold uppercase ${
                      activeChangeBadge.delta >= 0
                        ? 'bg-nexus-ink text-nexus-paper'
                        : 'bg-nexus-crimson text-white'
                    }`}
                  >
                    {activeChangeBadge.delta >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {activeChangeBadge.delta >= 0
                        ? `+${activeChangeBadge.delta}`
                        : activeChangeBadge.delta}{' '}
                      CR ({activeChangeBadge.type})
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom 4 Ledger Counters */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t-2 border-nexus-ink font-mono text-xs">
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">STARTING</span>
                <span className="font-bold text-nexus-ink">
                  {Number(startingCredits).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">EARNED</span>
                <span className="font-bold text-nexus-ink">
                  +{Number(team?.stats?.creditsEarned ?? startingCredits).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">SPENT</span>
                <span className="font-bold text-nexus-crimson">
                  -{Number(team?.stats?.creditsSpent ?? 0).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">PENALTIES</span>
                <span className="font-bold text-nexus-crimson">
                  -{Number(team?.stats?.penaltiesIncurred ?? 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: TACTICAL CREDIT OPERATIONS (All Supported CreditService Transactions) */}
          <div className="lg:col-span-4 p-6 bg-nexus-paper flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-nexus-ink/20 pb-2.5">
              <span className="font-condensed text-base font-extrabold uppercase tracking-[0.16em] text-nexus-crimson">
                SPEND ON // TACTICAL DEPLOYMENT
              </span>
              <span className="font-mono text-[10px] text-nexus-muted uppercase">
                LIVE ROOM SYNC
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* 1. HINT */}
              <motion.button
                type="button"
                disabled={actionPending}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => onExecuteAction('HINT', { cost: hintCost })}
                className="p-3 border-2 border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-ink hover:text-nexus-paper text-left transition-colors cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-nexus-crimson font-bold">
                  <span>HINT</span>
                  <span>-{hintCost} CR</span>
                </div>
                <p className="font-condensed text-base font-extrabold uppercase mt-1">
                  DECRYPT HINT
                </p>
              </motion.button>

              {/* 2. EXTRA_TIME */}
              <motion.button
                type="button"
                disabled={actionPending}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => onExecuteAction('EXTRA_TIME', { cost: extraTimeCost })}
                className="p-3 border-2 border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-ink hover:text-nexus-paper text-left transition-colors cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-nexus-crimson font-bold">
                  <span>EXTRA_TIME</span>
                  <span>-{extraTimeCost} CR</span>
                </div>
                <p className="font-condensed text-base font-extrabold uppercase mt-1">
                  +5 MIN TIMER
                </p>
              </motion.button>

              {/* 3. REATTEMPT */}
              <motion.button
                type="button"
                disabled={actionPending}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() =>
                  onExecuteAction('REATTEMPT', {
                    challengeId: baseReattemptTarget.challengeId,
                  })
                }
                className="p-3 border-2 border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-ink hover:text-nexus-paper text-left transition-colors cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-nexus-crimson font-bold">
                  <span>REATTEMPT ({reattemptMultiplier}x)</span>
                  <span>-{reattemptCost} CR</span>
                </div>
                <p className="font-condensed text-base font-extrabold uppercase mt-1 truncate">
                  RETRY {baseReattemptTarget.title}
                </p>
              </motion.button>

              {/* 4. ABILITY */}
              <motion.button
                type="button"
                disabled={actionPending}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => onExecuteAction('ABILITY', { abilityId: 'ABL-02' })}
                className="p-3 border-2 border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-ink hover:text-nexus-paper text-left transition-colors cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-nexus-crimson font-bold">
                  <span>ABILITY</span>
                  <span>-150 CR</span>
                </div>
                <p className="font-condensed text-base font-extrabold uppercase mt-1">
                  SIGNAL MAPPER
                </p>
              </motion.button>
            </div>

            <div className="pt-2 border-t border-dashed border-nexus-ink/25 flex items-center justify-between font-mono text-[10px] text-nexus-muted uppercase">
              <span>ENTRY COSTS NON-REFUNDABLE</span>
              <span>FAILED ATTEMPTS PENALIZED</span>
            </div>
          </div>

          {/* RIGHT: CRIMSON EDITORIAL MANIFESTO BLOCK (Directly from Proposal Slide 5) */}
          <div className="lg:col-span-3 p-6 bg-nexus-crimson text-white flex flex-col justify-between">
            <div className="border-b border-white/35 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 block mb-1">
                DOCTRINE // 05
              </span>
              <p className="font-condensed text-xl sm:text-2xl font-extrabold uppercase tracking-[0.14em] text-nexus-ink leading-tight">
                EVERY SPEND IS A CHOICE
              </p>
            </div>

            <div className="my-4 font-condensed text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.1em] leading-tight">
              SPEND NOW
              <br />
              OR
              <br />
              PRESERVE
              <br />
              FUTURE OPTIONS
            </div>

            <div className="pt-3 border-t border-white/30 font-mono text-[10px] uppercase tracking-wider text-white/90 flex justify-between">
              <span>RECORDED IN MONGODB</span>
              <span>7 TX TYPES</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. RECORDED CREDIT TRANSACTION LEDGER (When showFullLedger is enabled)
         =================================================================== */}
      {showFullLedger && (
        <BrutalistPanel
          codeTag="TEAM_EVENTS"
          title="AUTHORITATIVE CREDIT TRANSACTION LEDGER"
          accentTitle
          headerRight={
            <span className="font-mono text-xs font-bold text-nexus-ink">
              {transactions.length} RECORDED EVENT(S)
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b-2 border-nexus-ink bg-nexus-ink text-nexus-paper uppercase text-[10px] tracking-widest">
                  <th className="py-2.5 px-3">TIMESTAMP</th>
                  <th className="py-2.5 px-3">TEAM ID</th>
                  <th className="py-2.5 px-3">TRANSACTION TYPE</th>
                  <th className="py-2.5 px-3">RELATED CHALLENGE / ABILITY</th>
                  <th className="py-2.5 px-3 text-right">AMOUNT</th>
                  <th className="py-2.5 px-3 text-right">BALANCE AFTER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nexus-ink/20">
                <AnimatePresence initial={false}>
                  {transactions.map((tx, idx) => {
                    const badge = TX_TYPE_BADGES[tx.type] || {
                      label: tx.type,
                      variant: 'outline',
                    };
                    const isPositive = Number(tx.amount) >= 0;
                    const challengeName =
                      typeof tx.relatedChallenge === 'object'
                        ? tx.relatedChallenge?.title
                        : tx.relatedChallenge;
                    const abilityName =
                      typeof tx.relatedAbility === 'object'
                        ? `${tx.relatedAbility?.name} [${tx.relatedAbility?.code}]`
                        : tx.relatedAbility;

                    return (
                      <motion.tr
                        key={tx._id || `${tx.timestamp}-${idx}`}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className="hover:bg-nexus-paper-aged/60 transition-colors"
                      >
                        <td className="py-2.5 px-3 text-nexus-muted whitespace-nowrap">
                          {tx.timestamp ? new Date(tx.timestamp).toLocaleTimeString() : '—'}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-nexus-ink whitespace-nowrap">
                          {tx.teamId}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <SystemBadge variant={badge.variant}>{badge.label}</SystemBadge>
                        </td>
                        <td className="py-2.5 px-3 text-nexus-charcoal">
                          {challengeName && (
                            <span className="font-bold text-nexus-ink mr-2">
                              [{challengeName}]
                            </span>
                          )}
                          {abilityName && (
                            <span className="font-bold text-nexus-crimson mr-2">
                              [{abilityName}]
                            </span>
                          )}
                          <span className="text-nexus-muted">{tx.summary}</span>
                        </td>
                        <td
                          className={`py-2.5 px-3 text-right font-bold whitespace-nowrap ${
                            isPositive ? 'text-nexus-ink' : 'text-nexus-crimson'
                          }`}
                        >
                          {isPositive ? `+${tx.amount} CR` : `${tx.amount} CR`}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-nexus-ink whitespace-nowrap">
                          {Number(tx.balanceAfter ?? 0).toLocaleString()} CR
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </BrutalistPanel>
      )}
    </div>
  );
};

export default ResistanceCreditsModule;
