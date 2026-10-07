import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Zap,
  ShieldAlert,
  Clock,
  HelpCircle,
  Lock,
  Unlock,
  Terminal,
  Cpu,
  Radio,
  Crosshair,
  CheckCircle2,
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
 * using server-synchronized clock offset.
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
 * Restricted NEXUS System Module Card
 * Uses Framer Motion for:
 * - activation state transitions
 * - availability & cooldown/status badges
 * - button interactions
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
  const effectConfig = ability.effectConfig || {};

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
      {/* Top Restricted Module Classification Bar */}
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
            <span>
              {effectConfig.classification || `RESTRICTED // ${ability.abilityId}`}
            </span>
          </span>
          <span className="opacity-75 shrink-0">[{ability.code || ability.abilityId}]</span>
        </div>

        {/* Main Body: Title, STATUS, COST, Configurable Description */}
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

          {/* Canonical Specification Lines (Matches Phase 10 Prompt Example)
              SYSTEM ANALYST
              STATUS: AVAILABLE
              COST: 100 CREDITS
          */}
          <div
            className={`p-3 border font-mono text-xs space-y-1.5 ${
              canonicalStatus === 'ACTIVE'
                ? 'border-nexus-paper/20 bg-black/40 text-nexus-paper'
                : 'border-nexus-ink bg-nexus-paper-elevated text-nexus-ink'
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/15 pb-1.5">
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

            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[10px] uppercase tracking-[0.18em] opacity-75 font-bold">
                COST:
              </span>
              <span
                className={`font-bold tracking-wider ${
                  canonicalStatus === 'ACTIVE' ? 'text-white' : 'text-nexus-crimson'
                }`}
              >
                {ability.cost} CREDITS
              </span>
            </div>
          </div>

          {!compact && (
            <>
              <p
                className={`font-editorial text-xs leading-relaxed ${
                  canonicalStatus === 'ACTIVE' ? 'text-nexus-paper/80' : 'text-nexus-charcoal'
                }`}
              >
                {ability.description}
              </p>

              {/* Extensible effectType & effectConfig Metadata */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider">
                <span
                  className={`px-1.5 py-0.5 border ${
                    canonicalStatus === 'ACTIVE'
                      ? 'border-white/25 bg-white/10 text-white'
                      : 'border-nexus-ink/30 bg-nexus-paper text-nexus-ink'
                  }`}
                >
                  EFFECT: {ability.effectType || 'CONFIGURABLE_MODULE'}
                </span>
                {effectConfig.scope && (
                  <span
                    className={`px-1.5 py-0.5 border ${
                      canonicalStatus === 'ACTIVE'
                        ? 'border-white/25 bg-white/10 text-white'
                        : 'border-nexus-ink/30 bg-nexus-paper text-nexus-muted'
                    }`}
                  >
                    SCOPE: {effectConfig.scope}
                  </span>
                )}
              </div>
            </>
          )}
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
            ? '[ MODULE DISABLED ]'
            : '[ ACTIVATE ]'}
        </motion.button>
      </div>
    </motion.article>
  );
};

/**
 * PHASE 10 — ABILITIES, HINTS AND EXTRA TIME MODULE
 * - Extensible configurable ability cards (Code Breaker, Signal Mapper, System Analyst, Exploit Hunter)
 * - Server-controlled Hint decryption (never exposes answer/hint data before purchase)
 * - Server-controlled Extra Time (+5M modifies server expiresAt & syncs via Socket.IO)
 * - Framer Motion for activation modal, availability filter, and cooldown/state transitions
 * - GSAP strictly for the restrained cinematic activation sequence
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

  // Dedicated GSAP refs for the Cinematic Activation Sequence (never animated by Framer Motion)
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

  // Merge team ability slots with configurable ability definitions
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
        effectType: slot.effectType || def?.effectType || 'CONFIGURABLE_MODULE',
        effectConfig: slot.effectConfig || def?.effectConfig || {},
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

  // Trigger GSAP Cinematic Activation Sequence when a new ability activation arrives
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
      const res = await onActivateAbility(confirmingAbility.abilityId);
      const activationPayload = res?.abilityActivation || {
        activationId: `LOCAL-${Date.now()}`,
        abilityId: confirmingAbility.abilityId,
        name: confirmingAbility.name,
        code: confirmingAbility.code,
        cost: confirmingAbility.cost,
        effectType: confirmingAbility.effectType,
        effectConfig: confirmingAbility.effectConfig,
        status: 'ACTIVE',
      };
      setCinematicBanner(activationPayload);
      setConfirmingAbility(null);
    } catch (err) {
      setModalError(err?.message || 'Ability activation rejected by NEXUS Core.');
    }
  };

  return (
    <div className="space-y-5">
      {/* =====================================================================
          GSAP CINEMATIC ACTIVATION SEQUENCE OVERLAY BANNER
          Strictly driven by GSAP timeline on isolated refs (no Framer Motion)
         ===================================================================== */}
      {cinematicBanner && (
        <div
          ref={gsapSequenceContainerRef}
          role="status"
          aria-live="polite"
          className="border-2 border-nexus-crimson bg-nexus-ink text-nexus-paper p-4 sm:p-5 shadow-brutal-crimson relative overflow-hidden"
        >
          {/* GSAP Horizontal Scanline */}
          <div
            ref={gsapScanlineRef}
            className="h-1 w-full bg-nexus-crimson absolute top-0 left-0"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                <span className="px-2 py-0.5 bg-nexus-crimson text-white font-bold">
                  NEXUS MODULE ACTIVATION SEQUENCE
                </span>
                <span className="text-nexus-paper/70">
                  [{cinematicBanner.abilityId} // {cinematicBanner.code}]
                </span>
                <span className="text-nexus-paper/70">
                  EFFECT: {cinematicBanner.effectType || 'CONFIGURABLE_MODULE'}
                </span>
              </div>

              <div ref={gsapStampRef} className="pt-0.5">
                <p className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-white leading-none">
                  {cinematicBanner.name}{' '}
                  <span className="text-nexus-crimson">// ENGAGED</span>
                </p>
                <p className="font-mono text-xs text-nexus-paper/80 mt-1">
                  DEDUCTED: -{cinematicBanner.cost} CREDITS ·{' '}
                  {cinematicBanner.effectOutcome?.directiveNote ||
                    'Configurable server effect hook synchronized across squad room.'}
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

          {/* GSAP Depleting Sequence Bar */}
          <div className="mt-3 h-1 w-full bg-white/10 overflow-hidden">
            <div ref={gsapPulseBarRef} className="h-full bg-nexus-crimson" />
          </div>
        </div>
      )}

      {/* =====================================================================
          RESTRICTED NEXUS SYSTEM MODULES (ABILITIES)
         ===================================================================== */}
      <BrutalistPanel
        codeTag="MODS"
        title={compact ? 'ABILITIES' : 'RESTRICTED NEXUS ABILITY MODULES'}
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
          {!compact && (
            <div className="p-3 border border-dashed border-nexus-ink/35 bg-nexus-paper-elevated flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
              <span className="text-nexus-charcoal">
                <strong className="text-nexus-ink uppercase">
                  EXTENSIBLE ABILITY ARCHITECTURE:
                </strong>{' '}
                Definitions (<code className="text-nexus-crimson">effectType</code> &amp;{' '}
                <code className="text-nexus-crimson">effectConfig</code>) are server-configurable.
              </span>
              <span className="text-nexus-muted uppercase">
                SQUAD BALANCE: {Number(team?.credits || 0).toLocaleString()} CR
              </span>
            </div>
          )}

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

      {/* =====================================================================
          SERVER-CONTROLLED HINTS & EXTRA TIME TACTICAL SUPPORT
          - Hints never expose answer/hint data before server purchase
          - Extra Time modifies server expiresAt & synchronizes via Socket.IO
         ===================================================================== */}
      {showTacticalControls && (
        <BrutalistPanel
          codeTag="TACTICAL_SUPPORT"
          title="SERVER-AUTHORITATIVE HINTS & EXTRA TIME"
          accentTitle={false}
          headerRight={
            <SystemBadge
              variant={activeChallenge ? 'crimson' : 'outline'}
              pulse={Boolean(activeChallenge)}
            >
              {activeChallenge
                ? `ACTIVE: ${activeChallenge.challengeId}`
                : 'REQUIRES ACTIVE SESSION'}
            </SystemBadge>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 1. SERVER-CONTROLLED HINT MODULE */}
            <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    SERVER-CONTROLLED INTELLIGENCE HINT
                  </span>
                  <span className="font-mono text-xs font-bold text-nexus-ink">
                    COST: {hintCost} CREDITS
                  </span>
                </div>

                <h4 className="font-display text-2xl uppercase tracking-wide text-nexus-ink leading-none">
                  DECRYPT CHALLENGE HINT LAYER
                </h4>

                <p className="font-editorial text-xs text-nexus-charcoal leading-relaxed">
                  Hint strings are stored exclusively inside server-side{' '}
                  <code className="font-mono text-[11px]">solutionConfig</code> and are never
                  transmitted to the client prior to purchase verification.
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
                            {isUnlocked
                              ? `HINT LAYER 0${idx + 1} // DECRYPTED`
                              : `HINT LAYER 0${idx + 1} // CLASSIFIED ON SERVER`}
                          </span>
                          <p className="text-[11px] mt-0.5 break-words">
                            {isUnlocked
                              ? decryptedText
                              : '████████████████████████ [PURCHASE REQUIRED TO DECRYPT]'}
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
                  ? '[ NO ACTIVE CHALLENGE SESSION ]'
                  : hintsRemainingCount <= 0
                  ? '[ ALL HINTS DECRYPTED ]'
                  : `[ PURCHASE HINT // -${hintCost} CREDITS ]`}
              </button>
            </div>

            {/* 2. SERVER-CONTROLLED EXTRA TIME MODULE */}
            <div className="p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    SERVER TIMER EXTENSION (+{extraTimeMinutes} MIN)
                  </span>
                  <span className="font-mono text-xs font-bold text-nexus-ink">
                    COST: {extraTimeCost} CREDITS
                  </span>
                </div>

                <h4 className="font-display text-2xl uppercase tracking-wide text-nexus-ink leading-none">
                  EXTEND AUTHORITATIVE EXPIRES_AT
                </h4>

                <p className="font-editorial text-xs text-nexus-charcoal leading-relaxed">
                  NEXUS Core modifies <code className="font-mono text-[11px]">expiresAt</code> on
                  the server and broadcasts the updated countdown to all squad terminals via
                  Socket.IO.
                </p>

                <div className="p-3 border border-nexus-ink bg-nexus-ink text-nexus-paper font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-nexus-paper/65">
                      SERVER EXPIRES_AT:
                    </span>
                    <span className="font-bold text-white">
                      {activeAttempt?.expiresAt
                        ? new Date(activeAttempt.expiresAt).toLocaleTimeString()
                        : 'STANDBY'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-nexus-paper/65">
                      EXTRA TIME ALLOCATED:
                    </span>
                    <span className="font-bold text-nexus-crimson">
                      +{activeAttempt?.extraTimeMinutes || 0} MIN (
                      {team?.stats?.extraTimePurchased || 0} PURCHASES)
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
                  ? '[ NO ACTIVE CHALLENGE SESSION ]'
                  : `[ ALLOCATE +${extraTimeMinutes}M EXTRA TIME // -${extraTimeCost} CREDITS ]`}
              </button>
            </div>
          </div>
        </BrutalistPanel>
      )}

      {/* =====================================================================
          FRAMER MOTION ABILITY ACTIVATION CONFIRMATION MODAL
         ===================================================================== */}
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
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                    RESTRICTED MODULE
                  </span>
                  <span className="font-mono text-xs text-nexus-paper/70">
                    {confirmingAbility.abilityId} // {confirmingAbility.code}
                  </span>
                </div>
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

                {/* Specification Box matching Prompt */}
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
                  <div className="flex items-center justify-between border-b border-nexus-paper/15 pb-1.5">
                    <span className="text-nexus-paper/65 uppercase">EFFECT TYPE:</span>
                    <span className="font-bold text-nexus-paper uppercase">
                      {confirmingAbility.effectType}
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
