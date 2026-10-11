import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Cpu,
  Lock,
  Zap,
  Award,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Terminal,
  ArrowUpRight,
} from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { SystemBadge } from './SystemBadge';
import { BrutalistPanel } from './BrutalistPanel';
import { ChallengeRenderer } from '../engine/ChallengeRenderer';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Supplied NEXUS Core architectural artwork
import artCoreBridge from '../assets/artwork/nexus-core-bridge.jpg';
import artMonolithGate from '../assets/artwork/nexus-monolith-gate.jpg';
import artRingCitadel from '../assets/artwork/nexus-ring-citadel.jpg';

export const NEXUS_CORE_STATES = ['LOCKED', 'AVAILABLE', 'ACTIVE', 'COMPLETED'];

const ARTWORK_MAP = {
  CORE_BRIDGE: artCoreBridge,
  MONOLITH_GATE: artMonolithGate,
  RING_CITADEL: artRingCitadel,
};

const getStateBadgeProps = (state) => {
  switch (state) {
    case 'COMPLETED':
      return { variant: 'operational', pulse: true, label: 'COMPLETED' };
    case 'ACTIVE':
      return { variant: 'crimson', pulse: true, label: 'ACTIVE' };
    case 'AVAILABLE':
      return { variant: 'crimson', pulse: true, label: 'AVAILABLE' };
    case 'LOCKED':
    default:
      return { variant: 'outline', pulse: false, label: 'LOCKED' };
  }
};

export const NexusCoreModule = ({
  team,
  nexusCore,
  coreDiscoveryEvent,
  onClearCoreDiscovery,
  onActivateCore,
  onSubmitCoreObjective,
  actionPending = false,
  compact = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const authoritativeState = nexusCore?.state || team?.nexusCore?.state || 'LOCKED';
  const convergencePercent =
    nexusCore?.convergencePercent ??
    (authoritativeState === 'LOCKED' ? Number(team?.stats?.coreProgressPercent ?? 72) : 100);
  const challengesSolved =
    nexusCore?.challengesSolved ??
    Math.max(Number(team?.stats?.totalSolved ?? 0), (team?.completedChallenges || []).length);
  const unlockConfig = nexusCore?.unlockConfig || {
    requiredConvergencePercent: 100,
    minChallengesCompleted: 3,
    entryCost: 0,
    completionReward: 1500,
  };

  const primaryArtwork =
    ARTWORK_MAP[nexusCore?.gameConfig?.artworkKey] || artCoreBridge;

  // GSAP Cinematic Sequence State & Isolated DOM Refs
  const compositionStageRef = useRef(null);
  const dimOverlayRef = useRef(null);
  const artworkContainerRef = useRef(null);
  const redLightBeamRef = useRef(null);
  const redLightHaloRef = useRef(null);
  const statusBannerRef = useRef(null);

  const [sequenceActive, setSequenceActive] = useState(false);
  const [displayedCoreState, setDisplayedCoreState] = useState(authoritativeState);

  // Active Core Objective Submission State
  const [draftSubmission, setDraftSubmission] = useState('');
  const [feedbackBanner, setFeedbackBanner] = useState(null);

  useEffect(() => {
    if (!sequenceActive) {
      setDisplayedCoreState(authoritativeState);
    }
  }, [authoritativeState, sequenceActive]);

  /**
   * 6-Step GSAP Cinematic Sequence when Core becomes AVAILABLE:
   * 1. interface dims
   * 2. system lines activate
   * 3. artwork slowly reveals
   * 4. red core light activates
   * 5. typography appears
   * 6. Core status becomes AVAILABLE
   */
  const runCinematicDiscoverySequence = () => {
    if (!compositionStageRef.current) return;

    if (prefersReducedMotion) {
      setDisplayedCoreState(authoritativeState === 'LOCKED' ? 'AVAILABLE' : authoritativeState);
      setSequenceActive(false);
      return;
    }

    setSequenceActive(true);
    setDisplayedCoreState('LOCKED');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setSequenceActive(false);
          setDisplayedCoreState(
            authoritativeState === 'LOCKED' ? 'AVAILABLE' : authoritativeState
          );
          if (onClearCoreDiscovery) {
            onClearCoreDiscovery();
          }
        },
      });

      gsap.set(dimOverlayRef.current, { opacity: 0 });
      gsap.set('.gsap-core-system-line-h', { scaleX: 0, transformOrigin: 'left center', opacity: 0 });
      gsap.set('.gsap-core-system-line-v', { scaleY: 0, transformOrigin: 'top center', opacity: 0 });
      gsap.set(artworkContainerRef.current, {
        opacity: 0.08,
        scale: 1.07,
        filter: 'grayscale(100%) contrast(150%) brightness(0.35)',
      });
      gsap.set(redLightBeamRef.current, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: 'top center',
      });
      gsap.set(redLightHaloRef.current, {
        opacity: 0,
        scale: 0.6,
      });
      gsap.set('.gsap-core-typo-item', {
        opacity: 0,
        y: 22,
      });
      gsap.set(statusBannerRef.current, {
        opacity: 0.25,
        scale: 0.96,
      });

      // STEP 1: Interface dims
      tl.to(dimOverlayRef.current, {
        opacity: 0.88,
        duration: 0.55,
        ease: 'power2.inOut',
      })
        // STEP 2: System lines activate
        .to(
          '.gsap-core-system-line-h',
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.inOut',
          },
          '+=0.05'
        )
        .to(
          '.gsap-core-system-line-v',
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.inOut',
          },
          '<0.1'
        )
        // STEP 3: Artwork slowly reveals
        .to(
          dimOverlayRef.current,
          {
            opacity: 0.38,
            duration: 1.1,
            ease: 'power2.out',
          },
          '+=0.05'
        )
        .to(
          artworkContainerRef.current,
          {
            opacity: 0.82,
            scale: 1,
            filter: 'grayscale(18%) contrast(120%) brightness(0.88)',
            duration: 1.25,
            ease: 'power2.out',
          },
          '<'
        )
        // STEP 4: Red core light activates
        .to(
          redLightBeamRef.current,
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.75,
            ease: 'expo.out',
          },
          '-=0.2'
        )
        .to(
          redLightHaloRef.current,
          {
            opacity: 0.9,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
          },
          '<0.1'
        )
        // STEP 5: Typography appears
        .to(
          '.gsap-core-typo-item',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.15'
        )
        // STEP 6: Core status becomes AVAILABLE
        .call(() => {
          setDisplayedCoreState(
            authoritativeState === 'LOCKED' ? 'AVAILABLE' : authoritativeState
          );
        })
        .to(
          statusBannerRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.4)',
          },
          '-=0.1'
        );
    }, compositionStageRef);

    return () => ctx.revert();
  };

  // Trigger GSAP sequence automatically when Core availability event arrives
  useLayoutEffect(() => {
    if (!coreDiscoveryEvent?.receivedAt) return undefined;
    const cleanup = runCinematicDiscoverySequence();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreDiscoveryEvent?.receivedAt]);

  const handleActivateCoreSession = async () => {
    setFeedbackBanner(null);
    if (onActivateCore) {
      await onActivateCore();
    }
  };

  const handleSubmitCoreSolution = async (overrideAnswer) => {
    const candidate = overrideAnswer !== undefined ? overrideAnswer : draftSubmission;
    if (!String(candidate || '').trim()) return;
    setFeedbackBanner(null);
    try {
      const res = await onSubmitCoreObjective({
        submission: { answer: String(candidate).trim() },
      });
      const evalObj = res?.coreEvaluation || res?.evaluationResult;
      if (evalObj) {
        setFeedbackBanner(evalObj);
      }
    } catch (err) {
      setFeedbackBanner({
        status: 'FAILED',
        passed: false,
        message: err.message || 'Core override submission failed.',
      });
    }
  };

  const badgeProps = getStateBadgeProps(displayedCoreState);
  const winner = nexusCore?.winner || null;
  const completedTeams = nexusCore?.completedTeams || [];

  const coreChallengeModel = {
    challengeId: nexusCore?.coreId || 'NEXUS-CORE-PRIME',
    title: nexusCore?.title || 'THE NEXUS CORE',
    category: 'NEXUS CORE',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: unlockConfig.entryCost || 0,
    reward: unlockConfig.completionReward || 1500,
    gameType: nexusCore?.gameType || 'systemProblem',
    gameConfig: nexusCore?.gameConfig || {},
  };

  const coreSessionModel = {
    attemptId: `CORE-${team?.teamId || 'SQUAD'}`,
    challengeId: coreChallengeModel.challengeId,
    title: coreChallengeModel.title,
    gameType: coreChallengeModel.gameType,
    gameConfig: coreChallengeModel.gameConfig,
    status: 'IN_PROGRESS',
  };

  return (
    <section
      aria-label="THE NEXUS CORE — Ultimate System Objective"
      className="space-y-6"
    >
      {/* ===================================================================
          1. ARCHITECTURAL MONOLITH COMPOSITION & GSAP CINEMATIC STAGE
         =================================================================== */}
      <div
        ref={compositionStageRef}
        className="relative border-2 border-nexus-ink bg-nexus-ink text-nexus-paper shadow-brutal-lg overflow-hidden select-none"
      >
        {/* Top Paper Editorial Strip */}
        <div className="relative z-30 bg-nexus-paper text-nexus-ink border-b-2 border-nexus-ink px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
              NEXUS CORE
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-nexus-ink">
              ULTIMATE SYSTEM OBJECTIVE
            </span>
          </div>

          <span className="font-mono text-xs font-bold uppercase text-nexus-crimson">
            REWARD: +{unlockConfig.completionReward || 1500} CR
          </span>
        </div>

        {/* Main Architectural Viewport */}
        <div
          className={`relative w-full ${
            compact ? 'min-h-[400px]' : 'min-h-[500px] lg:min-h-[560px]'
          } flex flex-col justify-between p-5 sm:p-8 lg:p-10 overflow-hidden`}
        >
          {/* STEP 3 TARGET: Supplied NEXUS Core Architectural Artwork Layer */}
          <div
            ref={artworkContainerRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              opacity: authoritativeState === 'LOCKED' ? 0.36 : 0.78,
              filter:
                authoritativeState === 'LOCKED'
                  ? 'grayscale(85%) contrast(135%) brightness(0.45)'
                  : 'grayscale(18%) contrast(120%) brightness(0.84)',
            }}
          >
            <img
              src={primaryArtwork}
              alt="THE NEXUS CORE Architectural Chamber"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nexus-ink via-nexus-ink/65 to-nexus-ink/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-nexus-ink/85 via-transparent to-nexus-ink/85" />
          </div>

          {/* Technical Grid Overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(242,239,233,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,233,0.14) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
            aria-hidden="true"
          />

          {/* STEP 1 TARGET: Interface Dim Overlay */}
          <div
            ref={dimOverlayRef}
            className="absolute inset-0 z-10 bg-black pointer-events-none"
            style={{ opacity: authoritativeState === 'LOCKED' ? 0.52 : 0.25 }}
            aria-hidden="true"
          />

          {/* STEP 2 TARGET: System Lines */}
          <div className="absolute inset-0 z-15 pointer-events-none" aria-hidden="true">
            <div className="gsap-core-system-line-h absolute top-14 left-0 right-0 h-[1px] bg-nexus-crimson/70" />
            <div className="gsap-core-system-line-h absolute bottom-16 left-0 right-0 h-[1px] bg-nexus-crimson/70" />
            <div className="gsap-core-system-line-h absolute top-1/2 left-6 right-6 h-[1px] bg-nexus-paper/20" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 left-12 w-[1px] bg-nexus-paper/25" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 right-12 w-[1px] bg-nexus-paper/25" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 left-1/2 -translate-x-12 w-[1px] bg-nexus-crimson/35" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 left-1/2 translate-x-12 w-[1px] bg-nexus-crimson/35" />
          </div>

          {/* STEP 4 TARGET: Red Vertical Core Light */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-15 pointer-events-none flex flex-col items-center justify-center"
            aria-hidden="true"
          >
            <div
              ref={redLightHaloRef}
              className="absolute inset-y-0 w-36 sm:w-52 bg-nexus-crimson/25 blur-2xl"
              style={{ opacity: authoritativeState === 'LOCKED' ? 0.25 : 0.85 }}
            />
            <div
              ref={redLightBeamRef}
              className="relative h-full w-1.5 sm:w-2.5 bg-nexus-crimson shadow-[0_0_32px_#E6192E,0_0_64px_#E6192E]"
              style={{ opacity: authoritativeState === 'LOCKED' ? 0.35 : 1 }}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/90" />
            </div>
          </div>

          {/* Top Bar inside Viewport */}
          <div className="relative z-20 flex flex-wrap items-start justify-between gap-4">
            <div className="bg-nexus-ink/90 border border-nexus-paper/30 px-3.5 py-2 font-mono text-[11px] space-y-0.5">
              <div className="flex items-center gap-2 text-nexus-crimson font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>CENTRAL CORE CHAMBER</span>
              </div>
              <p className="text-nexus-paper/70 text-[10px]">
                TEAM: {team?.teamName}
              </p>
            </div>

            {/* STEP 6 TARGET: Core State Readout */}
            <div
              ref={statusBannerRef}
              data-testid="nexus-core-state-badge"
              className="bg-nexus-paper text-nexus-ink border-2 border-nexus-ink px-4 py-2 shadow-brutal flex items-center gap-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                STATUS:
              </span>
              <SystemBadge variant={badgeProps.variant} pulse={badgeProps.pulse}>
                {displayedCoreState}
              </SystemBadge>
            </div>
          </div>

          {/* STEP 5 TARGET: Dramatic Architectural Typography & Paper Texture Card */}
          <div className="relative z-20 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="gsap-core-typo-item inline-flex items-center gap-2 px-3 py-1 bg-nexus-crimson text-white font-mono text-xs font-bold uppercase tracking-[0.24em]">
                <Cpu className="w-3.5 h-3.5" />
                <span>ULTIMATE SYSTEM OBJECTIVE</span>
              </div>

              <h2 className="gsap-core-typo-item font-display text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.88] text-nexus-paper drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                {nexusCore?.title || 'THE NEXUS CORE'}
              </h2>

              <div className="gsap-core-typo-item max-w-2xl nexus-paper-canvas text-nexus-ink border-2 border-nexus-ink p-4 sm:p-5 shadow-brutal">
                <div className="flex items-center justify-between border-b border-nexus-ink/20 pb-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  <span>MISSION BRIEFING</span>
                  <span className="text-nexus-crimson font-bold">
                    REWARD: +{unlockConfig.completionReward || 1500} CR
                  </span>
                </div>
                <p className="font-editorial text-sm sm:text-base text-nexus-charcoal leading-relaxed">
                  {nexusCore?.description ||
                    'At the end of the path lies the NEXUS Core — the ultimate system objective. Complete challenges across the arena to unlock the Core and claim final victory.'}
                </p>
              </div>
            </div>

            {/* Right Status & Progress Box */}
            <div className="lg:col-span-4 space-y-3">
              <div className="gsap-core-typo-item bg-nexus-ink/95 border-2 border-nexus-paper/40 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-nexus-paper/15 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-paper/70">
                    CORE STATUS
                  </span>
                  <CrosshairMark variant="crimson" size={12} />
                </div>

                {/* 4 States Strip */}
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                  {NEXUS_CORE_STATES.map((st) => {
                    const isCurrent = displayedCoreState === st;
                    return (
                      <div
                        key={st}
                        className={`px-2.5 py-2 border flex items-center justify-between ${
                          isCurrent
                            ? 'bg-nexus-crimson text-white border-white font-bold'
                            : 'bg-black/50 text-nexus-paper/55 border-nexus-paper/20'
                        }`}
                      >
                        <span>{st}</span>
                        <span
                          className={`w-2 h-2 ${
                            isCurrent ? 'bg-white animate-ping' : 'bg-nexus-paper/25'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Convergence Progress */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-nexus-paper/70">CORE PROGRESS:</span>
                    <span className="font-bold text-nexus-crimson">{convergencePercent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black border border-nexus-paper/30 p-0.5">
                    <div
                      className="h-full bg-nexus-crimson transition-all duration-500"
                      style={{ width: `${convergencePercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-nexus-paper/60">
                    <span>
                      CHALLENGES SOLVED: {challengesSolved} / {unlockConfig.minChallengesCompleted || 3}
                    </span>
                    <span>+{unlockConfig.completionReward || 1500} CR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. STATE-SPECIFIC INTERACTIVE CONTROL & WINNER DISPLAY
         =================================================================== */}
      <AnimatePresence mode="wait">
        {authoritativeState === 'LOCKED' && (
          <motion.div
            key="core-state-locked"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <BrutalistPanel
              codeTag="STATUS // LOCKED"
              title="NEXUS CORE LOCKED"
              accentTitle
              headerRight={
                <SystemBadge variant="outline">
                  PROGRESS: {convergencePercent}% / {unlockConfig.requiredConvergencePercent}%
                </SystemBadge>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-nexus-crimson">
                    <Lock className="w-4 h-4" />
                    <span>
                      SOLVE {unlockConfig.minChallengesCompleted || 3} CHALLENGES TO UNLOCK THE NEXUS CORE
                    </span>
                  </div>
                  <p className="font-editorial text-base text-nexus-charcoal leading-relaxed">
                    The NEXUS Core remains sealed until your team completes the required challenges or the event command unlocks the Core for all teams.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs">
                    <div className="p-3 border border-nexus-ink bg-nexus-paper">
                      <span className="text-[10px] text-nexus-muted block">SOLVED</span>
                      <span className="text-lg font-bold text-nexus-ink">
                        {challengesSolved} / {unlockConfig.minChallengesCompleted || 3}
                      </span>
                    </div>
                    <div className="p-3 border border-nexus-ink bg-nexus-paper">
                      <span className="text-[10px] text-nexus-muted block">PROGRESS</span>
                      <span className="text-lg font-bold text-nexus-crimson">
                        {convergencePercent}%
                      </span>
                    </div>
                    <div className="p-3 border border-nexus-ink bg-nexus-paper col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-nexus-muted block">CORE REWARD</span>
                      <span className="text-lg font-bold text-nexus-ink">
                        +{unlockConfig.completionReward || 1500} CR
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 p-4 border-2 border-nexus-ink bg-nexus-paper-elevated">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                    NEXT STEP
                  </span>
                  <p className="font-editorial text-xs text-nexus-charcoal">
                    Complete more challenges to build your team credits and unlock access to the NEXUS Core.
                  </p>
                  <Link
                    to="/challenges"
                    className="w-full py-3 px-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson hover:text-white font-condensed text-lg font-extrabold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>[ BROWSE CHALLENGES ]</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </BrutalistPanel>
          </motion.div>
        )}

        {authoritativeState === 'AVAILABLE' && (
          <motion.div
            key="core-state-available"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <BrutalistPanel
              codeTag="STATUS // AVAILABLE"
              title="NEXUS CORE AVAILABLE — READY TO ENTER"
              accentTitle
              headerRight={
                <SystemBadge variant="crimson" pulse>
                  AVAILABLE
                </SystemBadge>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-nexus-crimson">
                    <Zap className="w-4 h-4" />
                    <span>
                      THE NEXUS CORE GATE IS OPEN FOR {team?.teamName}
                    </span>
                  </div>
                  <p className="font-editorial text-base text-nexus-charcoal leading-relaxed">
                    The NEXUS Core is now unlocked. Enter the Core chamber to begin the final objective and compete for victory.
                  </p>

                  {Array.isArray(nexusCore?.gameConfig?.telemetryNodes) && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
                      {nexusCore.gameConfig.telemetryNodes.map((node) => (
                        <div
                          key={node.node}
                          className="p-2.5 border border-nexus-ink bg-nexus-paper flex flex-col justify-between"
                        >
                          <span className="text-[10px] text-nexus-muted">{node.node}</span>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-bold text-nexus-ink">{node.status}</span>
                            <span className="px-1.5 py-0.5 bg-nexus-ink text-nexus-paper text-[10px] font-bold">
                              {node.signature}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 p-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-crimson font-bold">
                    ENTER THE CORE
                  </span>
                  <p className="font-mono text-xs text-nexus-paper/80">
                    Begin the active NEXUS Core objective for your team.
                  </p>
                  <button
                    type="button"
                    disabled={actionPending}
                    onClick={handleActivateCoreSession}
                    className="w-full py-3.5 px-4 border-2 border-white bg-nexus-crimson text-white hover:bg-white hover:text-nexus-ink font-condensed text-xl font-extrabold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>[ ENTER NEXUS CORE ]</span>
                  </button>
                </div>
              </div>
            </BrutalistPanel>
          </motion.div>
        )}

        {authoritativeState === 'ACTIVE' && (
          <motion.div
            key="core-state-active"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <BrutalistPanel
              codeTag="STATUS // ACTIVE"
              title="ACTIVE NEXUS CORE CHALLENGE"
              accentTitle
              headerRight={
                <SystemBadge variant="crimson" pulse>
                  ACTIVE // ATTEMPTS: {nexusCore?.teamCoreRecord?.attemptsCount || 0}
                </SystemBadge>
              }
            >
              <div className="space-y-5">
                {Array.isArray(nexusCore?.gameConfig?.telemetryNodes) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    {nexusCore.gameConfig.telemetryNodes.map((node) => (
                      <div
                        key={node.node}
                        className="p-3 border-2 border-nexus-ink bg-nexus-paper flex items-center justify-between"
                      >
                        <div>
                          <span className="text-[10px] text-nexus-muted block">{node.node}</span>
                          <span className="font-bold text-nexus-ink">{node.status}</span>
                        </div>
                        <span className="px-2 py-1 bg-nexus-crimson text-white font-bold text-xs">
                          {node.signature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <ChallengeRenderer
                  challenge={coreChallengeModel}
                  session={coreSessionModel}
                  actionPending={actionPending}
                  onDraftChange={(val) => {
                    const nextVal =
                      typeof val === 'object' && val !== null
                        ? val.answer ?? val.solution ?? val.word ?? ''
                        : val;
                    setDraftSubmission(String(nextVal || ''));
                  }}
                  onSubmitAnswer={(val) => {
                    const nextVal =
                      typeof val === 'object' && val !== null
                        ? val.answer ?? val.solution ?? val.word ?? ''
                        : val;
                    handleSubmitCoreSolution(nextVal);
                  }}
                />

                {/* Master Key Submission Bar */}
                <div className="p-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-crimson font-bold block">
                      MASTER OVERRIDE KEY
                    </span>
                    <p className="font-mono text-xs text-nexus-paper/80">
                      Submit the master override key to complete the NEXUS Core objective.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      value={draftSubmission}
                      onChange={(e) => setDraftSubmission(e.target.value)}
                      placeholder="ENTER OVERRIDE KEY..."
                      aria-label="Master convergence key"
                      className="px-3 py-2 bg-nexus-paper text-nexus-ink border-2 border-white font-mono text-xs font-bold uppercase tracking-wider"
                    />
                    <button
                      type="button"
                      disabled={actionPending || !draftSubmission.trim()}
                      onClick={() => handleSubmitCoreSolution(draftSubmission)}
                      className="px-5 py-2 bg-nexus-crimson text-white border-2 border-white hover:bg-white hover:text-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                    >
                      SUBMIT KEY
                    </button>
                  </div>
                </div>

                {/* Evaluation Feedback Banner */}
                {feedbackBanner && (
                  <div
                    className={`p-4 border-2 border-nexus-ink font-mono text-sm font-bold flex items-center justify-between shadow-brutal ${
                      feedbackBanner.passed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {feedbackBanner.passed ? (
                        <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-white shrink-0" />
                      )}
                      <span>{feedbackBanner.message}</span>
                    </div>
                  </div>
                )}
              </div>
            </BrutalistPanel>
          </motion.div>
        )}

        {authoritativeState === 'COMPLETED' && (
          <motion.div
            key="core-state-completed"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {/* WINNER DISPLAY AFTER CORE COMPLETION */}
            <div
              data-testid="nexus-core-winner-proclamation"
              className="border-2 border-nexus-ink bg-nexus-ink text-nexus-paper shadow-brutal-lg overflow-hidden"
            >
              <div className="bg-nexus-crimson text-white px-6 py-3 border-b-2 border-nexus-ink flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em]">
                  <Award className="w-4 h-4" />
                  <span>NEXUS CORE COMPLETED</span>
                </div>
                <span className="font-mono text-xs font-bold uppercase">
                  VICTORY CONFIRMED
                </span>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block px-3 py-1 bg-nexus-paper text-nexus-ink font-mono text-[11px] font-bold uppercase tracking-widest">
                    ULTIMATE OBJECTIVE COMPLETED
                  </span>

                  <h3 className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-white leading-none">
                    WINNER // {winner?.teamName || team?.teamName}
                  </h3>

                  <p className="font-editorial text-base text-nexus-paper/85 leading-relaxed">
                    Team{' '}
                    <strong className="text-white">
                      {winner?.teamName || team?.teamName}
                    </strong>{' '}
                    unlocked the master key and conquered the NEXUS Core.
                  </p>

                  {/* Winning Team Roster */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {(winner?.members?.length ? winner.members : team?.members || []).map(
                      (member, idx) => (
                        <div
                          key={member.memberId || idx}
                          className="p-3 border border-nexus-paper/25 bg-black/50 flex items-center justify-between font-mono text-xs"
                        >
                          <div>
                            <span className="text-[10px] text-nexus-crimson font-bold block">
                              {member.role || 'MEMBER'}
                            </span>
                            <span className="font-bold text-nexus-paper">{member.name}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-nexus-crimson shrink-0" />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Victory Summary */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="nexus-paper-canvas text-nexus-ink border-2 border-nexus-ink p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-nexus-ink/20 pb-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                        VICTORY SUMMARY
                      </span>
                      <SystemBadge variant="crimson" pulse>
                        RANK #{nexusCore?.teamCoreRecord?.completionRank || 1}
                      </SystemBadge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-2.5 border border-nexus-ink bg-nexus-paper">
                        <span className="text-[10px] text-nexus-muted block">FINAL CREDITS</span>
                        <span className="text-lg font-bold text-nexus-crimson">
                          {winner?.finalCredits ?? team?.credits} CR
                        </span>
                      </div>
                      <div className="p-2.5 border border-nexus-ink bg-nexus-paper">
                        <span className="text-[10px] text-nexus-muted block">CORE REWARD</span>
                        <span className="text-lg font-bold text-nexus-ink">
                          +{winner?.rewardAwarded ?? unlockConfig.completionReward ?? 1500} CR
                        </span>
                      </div>
                      <div className="p-2.5 border border-nexus-ink bg-nexus-paper">
                        <span className="text-[10px] text-nexus-muted block">SOLVED</span>
                        <span className="text-sm font-bold text-nexus-ink">
                          {winner?.totalSolved ?? challengesSolved} CHALLENGES
                        </span>
                      </div>
                      <div className="p-2.5 border border-nexus-ink bg-nexus-paper">
                        <span className="text-[10px] text-nexus-muted block">PLAYSTYLE</span>
                        <span className="text-sm font-bold text-nexus-ink">
                          {winner?.riskProfile || team?.stats?.riskProfile || 'BALANCED'}
                        </span>
                      </div>
                    </div>

                    {completedTeams.length > 0 && (
                      <div className="pt-2 border-t border-nexus-ink/20 space-y-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                          COMPLETED TEAMS ({completedTeams.length})
                        </span>
                        {completedTeams.map((entry) => (
                          <div
                            key={entry.teamId}
                            className="px-2.5 py-1.5 bg-nexus-ink text-nexus-paper font-mono text-[11px] flex items-center justify-between"
                          >
                            <span>
                              #{entry.rank} {entry.teamName}
                            </span>
                            <span className="text-nexus-crimson font-bold">
                              {entry.finalCredits} CR
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NexusCoreModule;
