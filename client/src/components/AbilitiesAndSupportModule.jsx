import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Zap,
  Clock,
  HelpCircle,
  Lock,
  Unlock,
  Terminal,
  Cpu,
  Radio,
  Crosshair,
  AlertTriangle,
  X,
} from 'lucide-react';
import { BrutalistPanel } from './BrutalistPanel';
import { SystemBadge } from './SystemBadge';
import { CrosshairMark } from './CrosshairMark';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ABILITY_ICON_MAP = {
  'ABL-01': Terminal,
  'ABL-02': Radio,
  'ABL-03': Cpu,
  'ABL-04': Crosshair,
};

/**
 * Compute live status & remaining cooldown seconds for an ability slot
 */
export const computeAbilityLiveState = (ability, estimatedServerNowMs) => {
  if (!ability) {
    return {
      canonicalStatus: 'DISABLED',
      remainingCooldownSec: 0,
      isAvailable: false,
    };
  }

  if (ability.enabled === false || ability.status === 'DISABLED') {
    return {
      canonicalStatus: 'DISABLED',
      remainingCooldownSec: 0,
      isAvailable: false,
    };
  }

  const cooldownExpiresMs = ability.cooldownExpiresAt
    ? new Date(ability.cooldownExpiresAt).getTime()
    : 0;
  const remainingCooldownSec =
    cooldownExpiresMs > estimatedServerNowMs
      ? Math.max(0, Math.ceil((cooldownExpiresMs - estimatedServerNowMs) / 1000))
      : 0;

  if (remainingCooldownSec > 0) {
    const canonicalStatus =
      ability.status === 'ACTIVE' && remainingCooldownSec > (ability.cooldownSeconds || 25) - 8
        ? 'ACTIVE'
        : 'COOLDOWN';
    return {
      canonicalStatus,
      remainingCooldownSec,
      isAvailable: false,
    };
  }

  return {
    canonicalStatus: 'AVAILABLE',
    remainingCooldownSec: 0,
    isAvailable: true,
  };
};

/**
 * Ability Card for Participant UI
 */
const RestrictedAbilityCard = ({
  ability,
  estimatedServerNowMs,
  actionPending,
  compact = false,
  onSelectActivate,
  prefersReducedMotion,
}) => {
  const { canonicalStatus, remainingCooldownSec, isAvailable } = computeAbilityLiveState(
    ability,
    estimatedServerNowMs
  );
  const IconComponent = ABILITY_ICON_MAP[ability.abilityId] || Zap;

  const statusBadgeStyle =
    canonicalStatus === 'AVAILABLE'
      ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
      : canonicalStatus === 'ACTIVE'
      ? 'bg-nexus-crimson text-white border-nexus-ink'
      : canonicalStatus === 'COOLDOWN'
      ? 'bg-nexus-paper-elevated text-nexus-crimson border-nexus-crimson'
      : 'bg-nexus-ink/20 text-nexus-muted border-nexus-ink/30';

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`border-2 flex flex-col justify-between transition-colors relative overflow-hidden ${
        canonicalStatus === 'ACTIVE'
          ? 'border-nexus-crimson bg-nexus-ink text-nexus-paper shadow-brutal-crimson'
          : isAvailable
          ? 'border-nexus-ink bg-nexus-paper text-nexus-ink shadow-brutal-sm hover:border-nexus-crimson'
          : 'border-nexus-ink/50 bg-nexus-paper-elevated text-nexus-ink opacity-90'
      }`}
    >
      {/* Top Bar */}
      <div>
        <div
          className={`px-3.5 py-2 border-b-2 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest ${
            canonicalStatus === 'ACTIVE'
              ? 'bg-nexus-crimson text-white border-nexus-ink'
              : 'bg-nexus-ink text-nexus-paper border-nexus-ink'
          }`}
        >
          <span className="flex items-center gap-1.5 font-bold truncate">
            <IconComponent className="w-3 h-3 text-nexus-crimson shrink-0" />
            <span>TEAM ABILITY</span>
          </span>
          <span className="opacity-85 font-bold shrink-0">{ability.cost} CR</span>
        </div>

        {/* Main Body: Title, STATUS, COST, Description */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-display ${
                compact ? 'text-2xl' : 'text-3xl'
              } uppercase tracking-wide leading-none ${
                canonicalStatus === 'ACTIVE' ? 'text-white' : 'text-nexus-ink'
              }`}
            >
              {ability.name}
            </h3>
            <CrosshairMark variant="crimson" size={12} />
          </div>

          <p
            className={`font-editorial text-xs leading-relaxed ${
              canonicalStatus === 'ACTIVE' ? 'text-nexus-paper/80' : 'text-nexus-charcoal'
            }`}
          >
            {ability.description}
          </p>

          <div
            className={`p-2.5 border font-mono text-xs flex items-center justify-between ${
              canonicalStatus === 'ACTIVE'
                ? 'border-nexus-paper/20 bg-black/40 text-nexus-paper'
                : 'border-nexus-ink bg-nexus-paper-elevated text-nexus-ink'
            }`}
          >
            <span className="text-[10px] uppercase tracking-[0.18em] opacity-75 font-bold">
              STATUS:
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${canonicalStatus}-${remainingCooldownSec > 0 ? 'cd' : 'rdy'}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 3 }}
                transition={{ duration: 0.15 }}
                className={`px-2 py-0.5 border font-mono text-[10px] font-bold uppercase tracking-widest ${statusBadgeStyle}`}
              >
                {remainingCooldownSec > 0
                  ? `${canonicalStatus} (${remainingCooldownSec}S)`
                  : canonicalStatus}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer: Charge / Cooldown Progress + [ ACTIVATE ] Button */}
      <div className="px-4 pb-4 space-y-2.5">
        <div className="w-full h-1.5 bg-nexus-ink/15 overflow-hidden border border-nexus-ink/25">
          <motion.div
            animate={{
              width:
                remainingCooldownSec > 0
                  ? `${Math.max(
                      10,
                      100 -
                        Math.round(
                          (remainingCooldownSec / (ability.cooldownSeconds || 25)) * 100
                        )
                    )}%`
                  : `${ability.chargePercent || 100}%`,
            }}
            transition={{ duration: 0.3 }}
            className="h-full bg-nexus-crimson"
          />
        </div>

        <motion.button
          type="button"
          whileHover={
            isAvailable && !actionPending && !prefersReducedMotion ? { scale: 1.01 } : undefined
          }
          whileTap={
            isAvailable && !actionPending && !prefersReducedMotion ? { scale: 0.99 } : undefined
          }
          disabled={!isAvailable || actionPending}
          onClick={() => onSelectActivate(ability)}
          className={`w-full py-2.5 px-4 border-2 font-mono text-xs font-bold uppercase tracking-[0.22em] transition-colors cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed ${
            canonicalStatus === 'ACTIVE'
              ? 'border-white bg-white text-nexus-ink'
              : isAvailable
              ? 'border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson hover:text-white'
              : 'border-nexus-ink/40 bg-nexus-paper text-nexus-muted'
          }`}
        >
          {remainingCooldownSec > 0
            ? `[ RECHARGING // ${remainingCooldownSec}S ]`
            : canonicalStatus === 'DISABLED'
            ? '[ UNAVAILABLE ]'
            : `[ ACTIVATE (-${ability.cost} CR) ]`}
        </motion.button>
      </div>
    </motion.article>
  );
};

/**
 * PHASE 18 — TEAM ABILITIES, HINTS AND EXTRA TIME
 * Integrated inside the active Challenge Session
 */
export const AbilitiesAndSupportModule = ({
  team,
  abilitiesCatalog = [],
  creditsConfig,
  serverClockOffsetMs = 0,
  actionPending = false,
  lastAbilityActivation = null,
  onClearAbilityActivation,
  onActivateAbility,
  onPurchaseHint,
  onPurchaseExtraTime,
  compact = false,
  showTacticalControls = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const [nowTick, setNowTick] = useState(() => Date.now());
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [confirmingAbility, setConfirmingAbility] = useState(null);
  const [modalError, setModalError] = useState('');
  const [cinematicBanner, setCinematicBanner] = useState(null);

  // Dedicated GSAP refs for the Cinematic Activation Sequence
  const gsapSequenceContainerRef = useRef(null);
  const gsapScanlineRef = useRef(null);
  const gsapPulseBarRef = useRef(null);
  const gsapStampRef = useRef(null);
  const lastProcessedActivationRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNowTick(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const estimatedServerNowMs = nowTick + Number(serverClockOffsetMs || 0);

  const abilities = useMemo(() => {
    const teamSlots = Array.isArray(team?.abilities) ? team.abilities : [];
    const catalogMap = new Map(
      (abilitiesCatalog || []).map((def) => [def.abilityId, def])
    );

    if (teamSlots.length === 0 && abilitiesCatalog.length > 0) {
      return abilitiesCatalog.map((def) => ({
        ...def,
        status: def.enabled === false ? 'DISABLED' : 'AVAILABLE',
        chargePercent: 100,
      }));
    }

    return teamSlots.map((slot) => {
      const def = catalogMap.get(slot.abilityId);
      return {
        ...def,
        ...slot,
        enabled: slot.enabled !== undefined ? slot.enabled : def?.enabled !== false,
      };
    });
  }, [team?.abilities, abilitiesCatalog]);

  const filteredAbilities = useMemo(() => {
    return abilities.filter((ab) => {
      const state = computeAbilityLiveState(ab, estimatedServerNowMs);
      if (availabilityFilter === 'AVAILABLE') return state.isAvailable;
      if (availabilityFilter === 'COOLDOWN') return !state.isAvailable;
      return true;
    });
  }, [abilities, availabilityFilter, estimatedServerNowMs]);

  useEffect(() => {
    if (!lastAbilityActivation?.activationId) return;
    if (lastProcessedActivationRef.current === lastAbilityActivation.activationId) return;
    lastProcessedActivationRef.current = lastAbilityActivation.activationId;

    setCinematicBanner(lastAbilityActivation);
    const timer = setTimeout(() => {
      setCinematicBanner(null);
      if (onClearAbilityActivation) onClearAbilityActivation();
    }, 4200);

    return () => clearTimeout(timer);
  }, [lastAbilityActivation, onClearAbilityActivation]);

  useLayoutEffect(() => {
    if (!cinematicBanner || !gsapSequenceContainerRef.current) return undefined;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(gsapSequenceContainerRef.current, { opacity: 1 });
        return;
      }

      const tl = gsap.timeline();

      tl.fromTo(
        gsapSequenceContainerRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }
      );

      if (gsapScanlineRef.current) {
        tl.fromTo(
          gsapScanlineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.45, ease: 'power2.inOut' },
          0
        );
      }

      if (gsapStampRef.current) {
        tl.fromTo(
          gsapStampRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.6)' },
          0.12
        );
      }

      if (gsapPulseBarRef.current) {
        tl.fromTo(
          gsapPulseBarRef.current,
          { width: '100%' },
          { width: '0%', duration: 3.6, ease: 'none' },
          0.25
        );
      }
    }, gsapSequenceContainerRef);

    return () => ctx.revert();
  }, [cinematicBanner, prefersReducedMotion]);

  const activeChallenge = team?.currentChallenge;
  const activeAttempt = team?.activeAttempt;
  const unlockedHints = Array.isArray(activeAttempt?.unlockedHints)
    ? activeAttempt.unlockedHints
    : [];
  const maxHints = Number(
    activeAttempt?.maxHints || activeChallenge?.gameConfig?.maxHints || 2
  );
  const hintsRemainingCount = Math.max(0, maxHints - unlockedHints.length);
  const hintCost = creditsConfig?.hintCost || 100;
  const extraTimeCost = creditsConfig?.extraTimeCost || 150;
  const extraTimeMinutes = creditsConfig?.extraTimeMinutes || 5;

  const handleOpenActivationModal = (ability) => {
    setModalError('');
    setConfirmingAbility(ability);
  };

  const handleConfirmActivate = async () => {
    if (!confirmingAbility || !onActivateAbility) return;
    setModalError('');
    try {
      const res = await onActivateAbility(confirmingAbility);
      const activationPayload = res?.abilityActivation || {
        activationId: `LOCAL-${Date.now()}`,
        abilityId: confirmingAbility.abilityId,
        name: confirmingAbility.name,
        cost: confirmingAbility.cost,
        status: 'ACTIVE',
      };
      setCinematicBanner(activationPayload);
      setConfirmingAbility(null);
    } catch (err) {
      setModalError(err?.message || 'Unable to activate ability right now.');
    }
  };

  return (
    <div className="space-y-5">
      {/* GSAP Cinematic Activation Sequence Banner */}
      {cinematicBanner && (
        <div
          ref={gsapSequenceContainerRef}
          role="status"
          aria-live="polite"
          className="border-2 border-nexus-crimson bg-nexus-ink text-nexus-paper p-4 sm:p-5 shadow-brutal-crimson relative overflow-hidden"
        >
          <div
            ref={gsapScanlineRef}
            className="h-1 w-full bg-nexus-crimson absolute top-0 left-0"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                <span className="px-2 py-0.5 bg-nexus-crimson text-white font-bold">
                  ABILITY ACTIVATED
                </span>
              </div>

              <div ref={gsapStampRef} className="pt-0.5">
                <p className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-white leading-none">
                  {cinematicBanner.name}{' '}
                  <span className="text-nexus-crimson">// ENGAGED</span>
                </p>
                <p className="font-mono text-xs text-nexus-paper/80 mt-1">
                  -{cinematicBanner.cost} CR ·{' '}
                  {cinematicBanner.effectOutcome?.directiveNote ||
                    'Ability active for your team.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCinematicBanner(null);
                if (onClearAbilityActivation) onClearAbilityActivation();
              }}
              className="px-3 py-1.5 border border-nexus-paper/30 hover:border-nexus-crimson font-mono text-[10px] uppercase tracking-widest text-nexus-paper/80 hover:text-white cursor-pointer self-start sm:self-center"
            >
              DISMISS
            </button>
          </div>

          <div className="mt-3 h-1 w-full bg-white/10 overflow-hidden">
            <div ref={gsapPulseBarRef} className="h-full bg-nexus-crimson" />
          </div>
        </div>
      )}

      {/* TEAM ABILITIES */}
      <BrutalistPanel
        codeTag="ABILITIES"
        title="TEAM ABILITIES"
        accentTitle
        headerRight={
          <div className="flex items-center gap-2">
            {!compact && (
              <div className="flex items-center gap-1">
                {['ALL', 'AVAILABLE', 'COOLDOWN'].map((filterKey) => (
                  <button
                    key={filterKey}
                    type="button"
                    onClick={() => setAvailabilityFilter(filterKey)}
                    className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                      availabilityFilter === filterKey
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-paper text-nexus-ink border-nexus-ink/30 hover:border-nexus-ink'
                    }`}
                  >
                    {filterKey}
                  </button>
                ))}
              </div>
            )}
            <span className="font-mono text-[10px] text-nexus-muted uppercase">
              USED: {team?.stats?.abilitiesUsed || 0}
            </span>
          </div>
        }
        className="h-full"
      >
        <div className="space-y-4">
          <motion.div
            layout
            className={`grid grid-cols-1 ${
              compact ? 'gap-3' : 'md:grid-cols-2 gap-4'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredAbilities.map((ability) => (
                <RestrictedAbilityCard
                  key={ability.abilityId}
                  ability={ability}
                  estimatedServerNowMs={estimatedServerNowMs}
                  actionPending={actionPending}
                  compact={compact}
                  onSelectActivate={handleOpenActivationModal}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </BrutalistPanel>

      {/* HINTS & EXTRA TIME */}
      {showTacticalControls && (
        <BrutalistPanel
          codeTag="SUPPORT"
          title="HINTS & EXTRA TIME"
          accentTitle={false}
          headerRight={
            <SystemBadge
              variant={activeChallenge ? 'crimson' : 'outline'}
              pulse={Boolean(activeChallenge)}
            >
              {activeChallenge ? 'ACTIVE CHALLENGE' : 'REQUIRES ACTIVE CHALLENGE'}
            </SystemBadge>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 1. HINT MODULE */}
            <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    CHALLENGE HINT
                  </span>
                  <span className="font-mono text-xs font-bold text-nexus-ink">
                    COST: {hintCost} CR
                  </span>
                </div>

                <h4 className="font-display text-2xl uppercase tracking-wide text-nexus-ink leading-none">
                  UNLOCK CHALLENGE HINT
                </h4>

                <p className="font-editorial text-xs text-nexus-charcoal leading-relaxed">
                  Reveal a clue for your active challenge. Unlocked hints are shared with your entire team.
                </p>

                {/* Hint Slots Status */}
                <div className="space-y-1.5 pt-1">
                  {Array.from({ length: maxHints }).map((_, idx) => {
                    const decryptedText = unlockedHints[idx];
                    const isUnlocked = Boolean(decryptedText);
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 border font-mono text-xs flex items-start gap-2 ${
                          isUnlocked
                            ? 'border-nexus-crimson bg-nexus-ink text-nexus-paper'
                            : 'border-nexus-ink/30 bg-nexus-paper-elevated text-nexus-muted'
                        }`}
                      >
                        {isUnlocked ? (
                          <Unlock className="w-3.5 h-3.5 text-nexus-crimson shrink-0 mt-0.5" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-nexus-muted shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase tracking-widest font-bold block">
                            {isUnlocked ? `HINT 0${idx + 1}` : `HINT 0${idx + 1} // LOCKED`}
                          </span>
                          <p className="text-[11px] mt-0.5 break-words">
                            {isUnlocked ? decryptedText : 'Unlock to reveal this hint.'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                disabled={
                  !activeChallenge || actionPending || hintsRemainingCount <= 0
                }
                onClick={() => onPurchaseHint && onPurchaseHint(hintCost)}
                className="w-full py-2.5 px-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson hover:text-white font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!activeChallenge
                  ? '[ NO ACTIVE CHALLENGE ]'
                  : hintsRemainingCount <= 0
                  ? '[ ALL HINTS UNLOCKED ]'
                  : `[ UNLOCK HINT // -${hintCost} CR ]`}
              </button>
            </div>

            {/* 2. EXTRA TIME MODULE */}
            <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    EXTRA TIME (+{extraTimeMinutes} MIN)
                  </span>
                  <span className="font-mono text-xs font-bold text-nexus-ink">
                    COST: {extraTimeCost} CR
                  </span>
                </div>

                <h4 className="font-display text-2xl uppercase tracking-wide text-nexus-ink leading-none">
                  ADD +{extraTimeMinutes} MINUTES EXTRA TIME
                </h4>

                <p className="font-editorial text-xs text-nexus-charcoal leading-relaxed">
                  Extend the active challenge countdown timer for your team.
                </p>

                <div className="p-3 border border-nexus-ink bg-nexus-ink text-nexus-paper font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-nexus-paper/65">
                      EXTRA TIME ADDED:
                    </span>
                    <span className="font-bold text-nexus-crimson">
                      +{activeAttempt?.extraTimeMinutes || 0} MIN
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={!activeChallenge || actionPending}
                onClick={() => onPurchaseExtraTime && onPurchaseExtraTime(extraTimeCost)}
                className="w-full py-2.5 px-4 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!activeChallenge
                  ? '[ NO ACTIVE CHALLENGE ]'
                  : `[ +${extraTimeMinutes}M EXTRA TIME // -${extraTimeCost} CR ]`}
              </button>
            </div>
          </div>
        </BrutalistPanel>
      )}

      {/* ABILITY ACTIVATION CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmingAbility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setConfirmingAbility(null)}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.95, opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="activate-ability-modal-title"
              className="nexus-editorial-box max-w-md w-full border-2 border-nexus-ink shadow-brutal overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-nexus-ink text-nexus-paper px-5 py-3.5 border-b-2 border-nexus-ink flex items-center justify-between">
                <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  ACTIVATE ABILITY
                </span>
                <button
                  type="button"
                  onClick={() => setConfirmingAbility(null)}
                  aria-label="Close activation modal"
                  className="text-nexus-paper/70 hover:text-nexus-crimson cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4 bg-nexus-paper">
                <div>
                  <h2
                    id="activate-ability-modal-title"
                    className="font-display text-4xl uppercase tracking-wide text-nexus-ink leading-none"
                  >
                    {confirmingAbility.name}
                  </h2>
                  <p className="font-editorial text-sm text-nexus-charcoal mt-2 leading-relaxed">
                    {confirmingAbility.description}
                  </p>
                </div>

                <div className="p-3.5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-nexus-paper/15 pb-1.5">
                    <span className="text-nexus-paper/65 uppercase">STATUS:</span>
                    <span className="font-bold text-white uppercase">AVAILABLE</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-nexus-paper/15 pb-1.5">
                    <span className="text-nexus-paper/65 uppercase">COST:</span>
                    <span className="font-bold text-nexus-crimson uppercase">
                      {confirmingAbility.cost} CREDITS
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-nexus-paper/65 uppercase">COOLDOWN:</span>
                    <span className="font-bold text-nexus-paper uppercase">
                      {confirmingAbility.effectConfig?.cooldownSeconds ||
                        confirmingAbility.cooldownSeconds ||
                        25}
                      S
                    </span>
                  </div>
                </div>

                {modalError && (
                  <div className="p-3 bg-nexus-crimson text-white border-2 border-nexus-ink font-mono text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{modalError}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setConfirmingAbility(null)}
                    className="w-1/3 py-2.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    disabled={actionPending}
                    onClick={handleConfirmActivate}
                    className="flex-1 py-2.5 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-mono text-xs font-bold uppercase tracking-[0.22em] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {actionPending ? 'ACTIVATING...' : '[ ACTIVATE ]'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AbilitiesAndSupportModule;
