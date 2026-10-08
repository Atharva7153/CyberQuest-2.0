import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { BrutalistPanel } from './BrutalistPanel';
import { SystemBadge } from './SystemBadge';
import { useReducedMotion } from '../hooks/useReducedMotion';

const TX_TYPE_BADGES = {
  CHALLENGE_PURCHASE: { label: 'CHALLENGE ENTRY', variant: 'outline' },
  CHALLENGE_REWARD: { label: 'CHALLENGE REWARD', variant: 'operational' },
  FAILURE_PENALTY: { label: 'FAILURE PENALTY', variant: 'crimson' },
  EXTRA_TIME: { label: 'EXTRA TIME', variant: 'outline' },
  HINT: { label: 'HINT UNLOCKED', variant: 'outline' },
  ABILITY: { label: 'ABILITY USED', variant: 'crimson' },
  REATTEMPT: { label: 'REATTEMPT ENTRY', variant: 'crimson' },
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

    if (prefersReducedMotion || diff < 100 || !numberNodeRef.current) {
      counterStateRef.current.value = nextVal;
      if (numberNodeRef.current) {
        numberNodeRef.current.textContent = nextVal.toLocaleString();
      }
      return undefined;
    }

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
 * Shows:
 * CREDITS
 * 1,150 CR
 * Optional small indicator: +400 last reward / -150 last spend
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
    }, 3500);
    return () => clearTimeout(timer);
  }, [lastCreditChange]);

  return (
    <div className="relative flex items-center gap-2">
      <AnimatePresence mode="wait">
        {visibleDelta && (
          <motion.span
            key={visibleDelta.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 border border-nexus-ink font-mono text-[11px] font-bold ${
              visibleDelta.delta >= 0
                ? 'bg-nexus-paper-elevated text-nexus-ink'
                : 'bg-nexus-crimson text-white'
            }`}
          >
            {visibleDelta.delta >= 0
              ? `+${visibleDelta.delta} CR`
              : `${visibleDelta.delta} CR`}
          </motion.span>
        )}
      </AnimatePresence>

      <div className="bg-nexus-ink text-nexus-paper px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-nexus-ink shadow-brutal-sm text-right">
        <span className="block font-mono text-[9px] uppercase tracking-widest text-nexus-paper/70">
          CREDITS
        </span>
        <div className="font-mono text-base sm:text-xl font-bold text-nexus-crimson flex items-baseline justify-end gap-1 leading-none">
          <span ref={numberNodeRef}>{Number(credits).toLocaleString()}</span>
          <span className="text-[11px] text-nexus-paper/80">CR</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Resistance Credits Overview & Activity Ledger
 * Used inside History when participants want to inspect their credit activity.
 */
export const ResistanceCreditsModule = ({
  team,
  transactions = [],
  creditsConfig = {},
  lastCreditChange = null,
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

  return (
    <div className="space-y-6">
      <div className="nexus-editorial-box p-0 overflow-hidden border-2 border-nexus-ink shadow-brutal">
        <div className="bg-nexus-ink text-nexus-paper px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-nexus-ink">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
              TEAM RESOURCE
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-nexus-paper/85">
              RESISTANCE CREDITS
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-nexus-paper/75">
            <span>STARTING BALANCE: {Number(startingCredits).toLocaleString()} CR</span>
            <CrosshairMark variant="crimson" size={12} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-nexus-ink">
          <div className="lg:col-span-8 p-6 bg-nexus-paper-elevated flex flex-col justify-between">
            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nexus-muted font-bold">
                CURRENT CREDITS
              </p>
              <p className="font-editorial text-xs text-nexus-charcoal">
                Every decision shapes what is possible next.
              </p>
            </div>

            <div className="my-5 flex flex-wrap items-baseline gap-3">
              <div className="font-display text-5xl sm:text-6xl leading-none tracking-wide text-nexus-ink">
                <span ref={numberNodeRef}>{currentCredits.toLocaleString()}</span>
              </div>
              <span className="font-condensed text-2xl font-extrabold uppercase tracking-widest text-nexus-crimson">
                CR
              </span>

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
                        ? `+${activeChangeBadge.delta} CR`
                        : `${activeChangeBadge.delta} CR`}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-nexus-ink font-mono text-xs">
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">STARTING</span>
                <span className="font-bold text-nexus-ink">
                  {Number(startingCredits).toLocaleString()} CR
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">EARNED</span>
                <span className="font-bold text-nexus-ink">
                  +{Number(team?.stats?.creditsEarned ?? 0).toLocaleString()} CR
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">SPENT</span>
                <span className="font-bold text-nexus-crimson">
                  -{Number(team?.stats?.creditsSpent ?? 0).toLocaleString()} CR
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase text-nexus-muted">PENALTIES</span>
                <span className="font-bold text-nexus-crimson">
                  -{Number(team?.stats?.penaltiesIncurred ?? 0).toLocaleString()} CR
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 bg-nexus-crimson text-white flex flex-col justify-between">
            <div className="border-b border-white/35 pb-3">
              <p className="font-condensed text-xl font-extrabold uppercase tracking-[0.14em] text-nexus-ink leading-tight">
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

            <div className="pt-3 border-t border-white/30 font-mono text-[10px] uppercase tracking-wider text-white/90">
              <span>ENTRY COSTS ARE NON-REFUNDABLE</span>
            </div>
          </div>
        </div>
      </div>

      {showFullLedger && transactions.length > 0 && (
        <BrutalistPanel
          codeTag="CREDITS"
          title="CREDIT ACTIVITY LOG"
          accentTitle
          headerRight={
            <span className="font-mono text-xs font-bold text-nexus-ink">
              {transactions.length} ENTRIES
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b-2 border-nexus-ink bg-nexus-ink text-nexus-paper uppercase text-[10px] tracking-widest">
                  <th className="py-2.5 px-3">TIME</th>
                  <th className="py-2.5 px-3">ACTIVITY</th>
                  <th className="py-2.5 px-3">DETAILS</th>
                  <th className="py-2.5 px-3 text-right">CHANGE</th>
                  <th className="py-2.5 px-3 text-right">BALANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nexus-ink/20">
                <AnimatePresence initial={false}>
                  {transactions.map((tx, idx) => {
                    const badge = TX_TYPE_BADGES[tx.type] || {
                      label: String(tx.type || 'ACTIVITY').replace(/_/g, ' '),
                      variant: 'outline',
                    };
                    const isPositive = Number(tx.amount) >= 0;
                    const challengeName =
                      typeof tx.relatedChallenge === 'object'
                        ? tx.relatedChallenge?.title
                        : tx.relatedChallenge;
                    const abilityName =
                      typeof tx.relatedAbility === 'object'
                        ? tx.relatedAbility?.name
                        : tx.relatedAbility;

                    return (
                      <motion.tr
                        key={tx._id || `${tx.timestamp}-${idx}`}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.16 }}
                        className="hover:bg-nexus-paper-aged/60 transition-colors"
                      >
                        <td className="py-2.5 px-3 text-nexus-muted whitespace-nowrap">
                          {tx.timestamp ? new Date(tx.timestamp).toLocaleTimeString() : '—'}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <SystemBadge variant={badge.variant}>{badge.label}</SystemBadge>
                        </td>
                        <td className="py-2.5 px-3 text-nexus-charcoal">
                          {challengeName && (
                            <span className="font-bold text-nexus-ink mr-2">
                              {challengeName}
                            </span>
                          )}
                          {abilityName && (
                            <span className="font-bold text-nexus-crimson mr-2">
                              {abilityName}
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
