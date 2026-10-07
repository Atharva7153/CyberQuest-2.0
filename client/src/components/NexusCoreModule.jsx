import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Cpu,
  Lock,
  Unlock,
  Zap,
  Award,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ShieldAlert,
  Play,
  Sliders,
  Sparkles,
  Terminal,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { SystemBadge } from './SystemBadge';
import { BrutalistPanel } from './BrutalistPanel';
import { ChallengeRenderer } from '../engine/ChallengeRenderer';
import { GAME_TYPE_METADATA } from '../engine/gameTypes';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Supplied NEXUS Core architectural artwork
import artCoreBridge from '../assets/artwork/nexus-core-bridge.jpg';
import artMonolithGate from '../assets/artwork/nexus-monolith-gate.jpg';
import artRingCitadel from '../assets/artwork/nexus-ring-citadel.jpg';

export const NEXUS_CORE_STATES = ['LOCKED', 'AVAILABLE', 'ACTIVE', 'COMPLETED'];

const SEQUENCE_STEPS = [
  { step: 1, code: 'SEQ-01', label: 'INTERFACE DIMS' },
  { step: 2, code: 'SEQ-02', label: 'SYSTEM LINES ACTIVATE' },
  { step: 3, code: 'SEQ-03', label: 'ARTWORK SLOWLY REVEALS' },
  { step: 4, code: 'SEQ-04', label: 'RED CORE LIGHT ACTIVATES' },
  { step: 5, code: 'SEQ-05', label: 'TYPOGRAPHY APPEARS' },
  { step: 6, code: 'SEQ-06', label: 'CORE STATUS: AVAILABLE' },
];

const ARTWORK_MAP = {
  CORE_BRIDGE: artCoreBridge,
  MONOLITH_GATE: artMonolithGate,
  RING_CITADEL: artRingCitadel,
};

const getStateBadgeProps = (state) => {
  switch (state) {
    case 'COMPLETED':
      return { variant: 'operational', pulse: true, label: 'COMPLETED // CORE OVERTHROWN' };
    case 'ACTIVE':
      return { variant: 'crimson', pulse: true, label: 'ACTIVE // OVERRIDE IN PROGRESS' };
    case 'AVAILABLE':
      return { variant: 'crimson', pulse: true, label: 'AVAILABLE // THRESHOLD BREACHED' };
    case 'LOCKED':
    default:
      return { variant: 'outline', pulse: false, label: 'LOCKED // CONVERGENCE REQUIRED' };
  }
};

export const NexusCoreModule = ({
  team,
  nexusCore,
  coreDiscoveryEvent,
  onClearCoreDiscovery,
  onUnlockCore,
  onActivateCore,
  onSubmitCoreObjective,
  onUpdateCoreConfig,
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
  const secondaryArtwork =
    ARTWORK_MAP[nexusCore?.gameConfig?.secondaryArtworkKey] || artMonolithGate;

  // GSAP Cinematic Sequence State & Isolated DOM Refs (Never animated by Framer Motion)
  const compositionStageRef = useRef(null);
  const dimOverlayRef = useRef(null);
  const artworkContainerRef = useRef(null);
  const redLightBeamRef = useRef(null);
  const redLightHaloRef = useRef(null);
  const statusBannerRef = useRef(null);

  const [sequenceActive, setSequenceActive] = useState(false);
  const [activeSequenceStep, setActiveSequenceStep] = useState(
    authoritativeState === 'LOCKED' ? 0 : 6
  );
  const [displayedCoreState, setDisplayedCoreState] = useState(authoritativeState);

  // Active Core Objective Submission State
  const [draftSubmission, setDraftSubmission] = useState('');
  const [feedbackBanner, setFeedbackBanner] = useState(null);

  // Configurable Core Objective Editor State
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [configDraft, setConfigDraft] = useState({
    title: nexusCore?.title || 'THE NEXUS CORE',
    designation:
      nexusCore?.designation || 'ULTIMATE SYSTEM OBJECTIVE // CENTRAL CONVERGENCE',
    gameType: nexusCore?.gameType || 'systemProblem',
    completionReward: unlockConfig.completionReward || 1500,
    prompt:
      nexusCore?.gameConfig?.prompt ||
      'CENTRAL CORE ARCHITECTURE // TERMINAL OVERRIDE: Transmit the master convergence key (NEXUS-OMEGA) to claim the NEXUS Core.',
  });

  useEffect(() => {
    if (nexusCore) {
      setConfigDraft({
        title: nexusCore.title || 'THE NEXUS CORE',
        designation:
          nexusCore.designation || 'ULTIMATE SYSTEM OBJECTIVE // CENTRAL CONVERGENCE',
        gameType: nexusCore.gameType || 'systemProblem',
        completionReward: nexusCore.unlockConfig?.completionReward ?? 1500,
        prompt:
          nexusCore.gameConfig?.prompt ||
          'CENTRAL CORE ARCHITECTURE // TERMINAL OVERRIDE: Transmit the master convergence key (NEXUS-OMEGA) to claim the NEXUS Core.',
      });
    }
  }, [nexusCore]);

  useEffect(() => {
    if (!sequenceActive) {
      setDisplayedCoreState(authoritativeState);
      if (authoritativeState !== 'LOCKED') {
        setActiveSequenceStep(6);
      }
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
      setActiveSequenceStep(6);
      setDisplayedCoreState(authoritativeState === 'LOCKED' ? 'AVAILABLE' : authoritativeState);
      setSequenceActive(false);
      return;
    }

    setSequenceActive(true);
    setActiveSequenceStep(1);
    setDisplayedCoreState('LOCKED');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setSequenceActive(false);
          setActiveSequenceStep(6);
          setDisplayedCoreState(
            authoritativeState === 'LOCKED' ? 'AVAILABLE' : authoritativeState
          );
          if (onClearCoreDiscovery) {
            onClearCoreDiscovery();
          }
        },
      });

      // Reset initial states for the 6-step sequence
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
      tl.call(() => setActiveSequenceStep(1))
        .to(dimOverlayRef.current, {
          opacity: 0.88,
          duration: 0.55,
          ease: 'power2.inOut',
        })

        // STEP 2: System lines activate
        .call(() => setActiveSequenceStep(2))
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
        .call(() => setActiveSequenceStep(3))
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
        .call(() => setActiveSequenceStep(4))
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
        .call(() => setActiveSequenceStep(5))
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
          setActiveSequenceStep(6);
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

  // Trigger GSAP sequence automatically when Socket.IO broadcasts core:available
  useLayoutEffect(() => {
    if (!coreDiscoveryEvent?.receivedAt) return undefined;
    const cleanup = runCinematicDiscoverySequence();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreDiscoveryEvent?.receivedAt]);

  const handleUnlockAndDiscover = async () => {
    setFeedbackBanner(null);
    if (onUnlockCore) {
      await onUnlockCore();
    }
    runCinematicDiscoverySequence();
  };

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
        message: err.message || 'Core override transmission failed.',
      });
    }
  };

  const handleSaveCoreConfig = async (e) => {
    e.preventDefault();
    if (!onUpdateCoreConfig) return;
    await onUpdateCoreConfig({
      title: configDraft.title,
      designation: configDraft.designation,
      gameType: configDraft.gameType,
      unlockConfig: {
        ...unlockConfig,
        completionReward: Number(configDraft.completionReward) || 1500,
      },
      gameConfig: {
        ...(nexusCore?.gameConfig || {}),
        prompt: configDraft.prompt,
      },
    });
    setShowConfigDrawer(false);
  };

  const badgeProps = getStateBadgeProps(displayedCoreState);
  const winner = nexusCore?.winner || null;
  const completedTeams = nexusCore?.completedTeams || [];

  // Synthetic challenge/session objects so ChallengeRenderer renders the configurable Core objective
  const coreChallengeModel = {
    challengeId: nexusCore?.coreId || 'NEXUS-CORE-PRIME',
    title: nexusCore?.title || 'THE NEXUS CORE',
    category: 'TECHNICAL',
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
              DIRECTIVE // OMEGA-00
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-nexus-ink">
              {nexusCore?.classification || 'ULTIMATE SYSTEM OBJECTIVE // NOT A CONVENTIONAL FINAL ROUND'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={runCinematicDiscoverySequence}
              className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Replay the 6-step GSAP Core Availability Cinematic Sequence"
            >
              <Play className="w-3 h-3 text-nexus-crimson" />
              <span>REPLAY GSAP DISCOVERY SEQUENCE</span>
            </button>

            {onUpdateCoreConfig && (
              <button
                type="button"
                onClick={() => setShowConfigDrawer((v) => !v)}
                className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-crimson hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sliders className="w-3 h-3" />
                <span>CONFIGURE CORE</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Architectural Viewport */}
        <div
          className={`relative w-full ${
            compact ? 'min-h-[420px]' : 'min-h-[540px] lg:min-h-[600px]'
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

          {/* Technical Grid + Architectural Coordinate Overlay */}
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

          {/* STEP 2 TARGET: System Lines (Horizontal & Vertical Architectural Vectors) */}
          <div className="absolute inset-0 z-15 pointer-events-none" aria-hidden="true">
            <div className="gsap-core-system-line-h absolute top-14 left-0 right-0 h-[1px] bg-nexus-crimson/70" />
            <div className="gsap-core-system-line-h absolute bottom-16 left-0 right-0 h-[1px] bg-nexus-crimson/70" />
            <div className="gsap-core-system-line-h absolute top-1/2 left-6 right-6 h-[1px] bg-nexus-paper/20" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 left-12 w-[1px] bg-nexus-paper/25" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 right-12 w-[1px] bg-nexus-paper/25" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 left-1/2 -translate-x-12 w-[1px] bg-nexus-crimson/35" />
            <div className="gsap-core-system-line-v absolute top-0 bottom-0 left-1/2 translate-x-12 w-[1px] bg-nexus-crimson/35" />
          </div>

          {/* STEP 4 TARGET: Red Vertical Core Light (Signature Monolith Beam) */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-15 pointer-events-none flex flex-col items-center justify-center"
            aria-hidden="true"
          >
            {/* Ambient Crimson Halo */}
            <div
              ref={redLightHaloRef}
              className="absolute inset-y-0 w-36 sm:w-52 bg-nexus-crimson/25 blur-2xl"
              style={{ opacity: authoritativeState === 'LOCKED' ? 0.25 : 0.85 }}
            />
            {/* Sharp Red Vertical Monolith Core Light */}
            <div
              ref={redLightBeamRef}
              className="relative h-full w-1.5 sm:w-2.5 bg-nexus-crimson shadow-[0_0_32px_#E6192E,0_0_64px_#E6192E]"
              style={{ opacity: authoritativeState === 'LOCKED' ? 0.35 : 1 }}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/90" />
            </div>
          </div>

          {/* Top Architectural Telemetry Strip inside Viewport */}
          <div className="relative z-20 flex flex-wrap items-start justify-between gap-4">
            <div className="bg-nexus-ink/90 border border-nexus-paper/30 px-3.5 py-2 font-mono text-[11px] space-y-0.5">
              <div className="flex items-center gap-2 text-nexus-crimson font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>SECTOR // {nexusCore?.gameConfig?.sector || 'SECTOR-00 // CENTRAL_CORE_CHAMBER'}</span>
              </div>
              <p className="text-nexus-paper/70 text-[10px]">
                CORE ID: {nexusCore?.coreId || 'NEXUS-CORE-PRIME'} · CLEARANCE:{' '}
                {nexusCore?.gameConfig?.clearanceCode || 'OMEGA-00-SOVEREIGN'}
              </p>
            </div>

            {/* STEP 6 TARGET: Server-Authoritative Core State Readout */}
            <div
              ref={statusBannerRef}
              data-testid="nexus-core-state-badge"
              className="bg-nexus-paper text-nexus-ink border-2 border-nexus-ink px-4 py-2 shadow-brutal flex items-center gap-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                CORE STATE:
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
                <span>{nexusCore?.designation || 'ULTIMATE SYSTEM OBJECTIVE // CENTRAL CONVERGENCE'}</span>
              </div>

              <h2 className="gsap-core-typo-item font-display text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.88] text-nexus-paper drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                {nexusCore?.title || 'THE NEXUS CORE'}
              </h2>

              <div className="gsap-core-typo-item max-w-2xl nexus-paper-canvas text-nexus-ink border-2 border-nexus-ink p-4 sm:p-5 shadow-brutal">
                <div className="flex items-center justify-between border-b border-nexus-ink/20 pb-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  <span>ARCHITECTURAL DIRECTIVE // PAPER DOSSIER</span>
                  <span className="text-nexus-crimson font-bold">
                    REWARD: +{unlockConfig.completionReward || 1500} CR
                  </span>
                </div>
                <p className="font-editorial text-sm sm:text-base text-nexus-charcoal leading-relaxed">
                  {nexusCore?.description ||
                    'At the end of the path lies the NEXUS Core — the ultimate system objective. Synchronize the master override vector to reclaim control of the central autonomous architecture.'}
                </p>
              </div>
            </div>

            {/* Right Architectural Monolith Secondary Inset + State Telemetry */}
            <div className="lg:col-span-4 space-y-3">
              <div className="gsap-core-typo-item bg-nexus-ink/95 border-2 border-nexus-paper/40 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-nexus-paper/15 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-paper/70">
                    SERVER-AUTHORITATIVE TELEMETRY
                  </span>
                  <CrosshairMark variant="crimson" size={12} />
                </div>

                {/* 4 Server-Authoritative States Strip */}
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
                    <span className="text-nexus-paper/70">CORE CONVERGENCE:</span>
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
                      SOLVED: {challengesSolved} / {unlockConfig.minChallengesCompleted || 3} MIN
                    </span>
                    <span>GAME ENGINE: {nexusCore?.gameType || 'systemProblem'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 6-Step GSAP Discovery Sequence Telemetry Bar */}
          <div className="relative z-20 bg-black/85 border border-nexus-paper/25 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-nexus-paper/80">
              <Sparkles className="w-3.5 h-3.5 text-nexus-crimson" />
              <span>GSAP DISCOVERY TIMELINE:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 flex-1">
              {SEQUENCE_STEPS.map((s) => {
                const isReached = activeSequenceStep >= s.step;
                const isCurrentStep = sequenceActive && activeSequenceStep === s.step;
                return (
                  <div
                    key={s.code}
                    className={`px-2 py-1 border font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                      isCurrentStep
                        ? 'border-white bg-nexus-crimson text-white font-bold'
                        : isReached
                        ? 'border-nexus-crimson/60 bg-nexus-crimson/15 text-nexus-paper'
                        : 'border-nexus-paper/15 bg-black/40 text-nexus-paper/40'
                    }`}
                  >
                    <span className="text-nexus-crimson font-bold">{s.step}.</span>
                    <span className="truncate">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. CONFIGURABLE CORE OBJECTIVE INSPECTOR (ADMIN / DEMO CONFIG)
         =================================================================== */}
      <AnimatePresence>
        {showConfigDrawer && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <BrutalistPanel
              codeTag="CORE_CONFIG"
              title="CONFIGURABLE NEXUS CORE OBJECTIVE PARAMETERS"
              accentTitle
            >
              <form onSubmit={handleSaveCoreConfig} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-nexus-muted mb-1">
                      OBJECTIVE TITLE
                    </label>
                    <input
                      type="text"
                      value={configDraft.title}
                      onChange={(e) =>
                        setConfigDraft((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full px-3 py-2 border-2 border-nexus-ink bg-nexus-paper text-nexus-ink font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-nexus-muted mb-1">
                      ENGINE GAME TYPE
                    </label>
                    <select
                      value={configDraft.gameType}
                      onChange={(e) =>
                        setConfigDraft((prev) => ({ ...prev, gameType: e.target.value }))
                      }
                      className="w-full px-3 py-2 border-2 border-nexus-ink bg-nexus-paper text-nexus-ink font-bold"
                    >
                      {Object.values(GAME_TYPE_METADATA).map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.id} — {g.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-nexus-muted mb-1">
                      COMPLETION REWARD (CR)
                    </label>
                    <input
                      type="number"
                      value={configDraft.completionReward}
                      onChange={(e) =>
                        setConfigDraft((prev) => ({
                          ...prev,
                          completionReward: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border-2 border-nexus-ink bg-nexus-paper text-nexus-ink font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-nexus-muted mb-1">
                    CORE OVERRIDE PROMPT (GAME CONFIG)
                  </label>
                  <textarea
                    rows={2}
                    value={configDraft.prompt}
                    onChange={(e) =>
                      setConfigDraft((prev) => ({ ...prev, prompt: e.target.value }))
                    }
                    className="w-full px-3 py-2 border-2 border-nexus-ink bg-nexus-paper text-nexus-ink"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowConfigDrawer(false)}
                    className="px-4 py-2 border-2 border-nexus-ink bg-nexus-paper font-bold uppercase tracking-wider cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={actionPending}
                    className="px-5 py-2 border-2 border-nexus-ink bg-nexus-crimson text-white font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                  >
                    SAVE CORE CONFIGURATION
                  </button>
                </div>
              </form>
            </BrutalistPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================
          3. STATE-SPECIFIC INTERACTIVE CONTROL & WINNER INFRASTRUCTURE
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
              codeTag="STATE // LOCKED"
              title="NEXUS CORE CONTAINMENT SEALED"
              accentTitle
              headerRight={
                <SystemBadge variant="outline">
                  CONVERGENCE: {convergencePercent}% / {unlockConfig.requiredConvergencePercent}%
                </SystemBadge>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-nexus-crimson">
                    <Lock className="w-4 h-4" />
                    <span>
                      SYSTEM OBJECTIVE LOCKED // SOLVE {unlockConfig.minChallengesCompleted || 3}{' '}
                      CHALLENGES OR REACH 100% CONVERGENCE
                    </span>
                  </div>
                  <p className="font-editorial text-base text-nexus-charcoal leading-relaxed">
                    The NEXUS Core is the ultimate system objective. It remains sealed until your
                    squad breaches the convergence threshold across the Challenge Market or
                    executes an authoritative Core Discovery synchronization.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs">
                    <div className="p-3 border border-nexus-ink bg-nexus-paper">
                      <span className="text-[10px] text-nexus-muted block">CURRENT SOLVED</span>
                      <span className="text-lg font-bold text-nexus-ink">
                        {challengesSolved} / {unlockConfig.minChallengesCompleted || 3}
                      </span>
                    </div>
                    <div className="p-3 border border-nexus-ink bg-nexus-paper">
                      <span className="text-[10px] text-nexus-muted block">CONVERGENCE</span>
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
                    AUTHORITATIVE CORE DISCOVERY
                  </span>
                  <p className="font-mono text-xs text-nexus-charcoal">
                    Broadcast <strong className="text-nexus-ink">core:available</strong> across
                    Socket.IO and trigger the 6-step GSAP Core reveal sequence.
                  </p>
                  <button
                    type="button"
                    disabled={actionPending}
                    onClick={handleUnlockAndDiscover}
                    className="w-full py-3 px-4 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>UNLOCK NEXUS CORE (AVAILABLE)</span>
                  </button>
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
              codeTag="STATE // AVAILABLE"
              title="NEXUS CORE AVAILABLE — READY FOR ARCHITECTURAL BREACH"
              accentTitle
              headerRight={
                <SystemBadge variant="crimson" pulse>
                  SOCKET.IO DISCOVERY CONFIRMED
                </SystemBadge>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-nexus-crimson">
                    <Zap className="w-4 h-4" />
                    <span>
                      CONVERGENCE AT 100% // CENTRAL CORE MONOLITH GATE OPEN FOR SQUAD{' '}
                      {team?.teamName}
                    </span>
                  </div>
                  <p className="font-editorial text-base text-nexus-charcoal leading-relaxed">
                    Socket.IO has broadcast Core availability to your squad room. Initiate the
                    active Core session to engage the configurable{' '}
                    <strong className="text-nexus-ink">
                      {nexusCore?.gameType || 'systemProblem'}
                    </strong>{' '}
                    override module and claim the NEXUS Core.
                  </p>

                  {/* Relay Signatures Preview */}
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
                    ENGAGE ULTIMATE OBJECTIVE
                  </span>
                  <p className="font-mono text-xs text-nexus-paper/80">
                    Transition server-authoritative Core state from{' '}
                    <strong className="text-white">AVAILABLE</strong> to{' '}
                    <strong className="text-nexus-crimson">ACTIVE</strong>.
                  </p>
                  <button
                    type="button"
                    disabled={actionPending}
                    onClick={handleActivateCoreSession}
                    className="w-full py-3.5 px-4 border-2 border-white bg-nexus-crimson text-white hover:bg-white hover:text-nexus-ink font-condensed text-xl font-extrabold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>INITIATE CORE OVERRIDE (ACTIVE)</span>
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
              codeTag="STATE // ACTIVE"
              title="ACTIVE NEXUS CORE OVERRIDE — CONFIGURABLE ENGINE TERMINAL"
              accentTitle
              headerRight={
                <SystemBadge variant="crimson" pulse>
                  ACTIVE // ATTEMPTS: {nexusCore?.teamCoreRecord?.attemptsCount || 0}
                </SystemBadge>
              }
            >
              <div className="space-y-5">
                {/* Harmonic Relay Telemetry Strip */}
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

                {/* Reusable Cyber Quest Game Engine Renderer */}
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

                {/* Direct Master Convergence Key Submission Bar */}
                <div className="p-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-crimson font-bold block">
                      AUTHORITATIVE CORE OVERRIDE TRANSMISSION
                    </span>
                    <p className="font-mono text-xs text-nexus-paper/80">
                      Transmit master convergence key (e.g.{' '}
                      <strong className="text-white">NEXUS-OMEGA</strong>) to complete the NEXUS
                      Core objective.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      value={draftSubmission}
                      onChange={(e) => setDraftSubmission(e.target.value)}
                      placeholder="NEXUS-OMEGA"
                      aria-label="Master convergence key"
                      className="px-3 py-2 bg-nexus-paper text-nexus-ink border-2 border-white font-mono text-xs font-bold uppercase tracking-wider"
                    />
                    <button
                      type="button"
                      disabled={actionPending || !draftSubmission.trim()}
                      onClick={() => handleSubmitCoreSolution(draftSubmission)}
                      className="px-5 py-2 bg-nexus-crimson text-white border-2 border-white hover:bg-white hover:text-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                    >
                      TRANSMIT CORE OVERRIDE
                    </button>
                  </div>
                </div>

                {/* Evaluation Feedback Banner */}
                {feedbackBanner && (
                  <div
                    className={`p-4 border-2 border-nexus-ink font-mono text-xs flex items-center justify-between ${
                      feedbackBanner.passed
                        ? 'bg-nexus-ink text-nexus-paper'
                        : 'bg-nexus-crimson text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {feedbackBanner.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-nexus-crimson shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-white shrink-0" />
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
            {/* WINNER DISPLAY INFRASTRUCTURE AFTER CORE COMPLETION */}
            <div
              data-testid="nexus-core-winner-proclamation"
              className="border-2 border-nexus-ink bg-nexus-ink text-nexus-paper shadow-brutal-lg overflow-hidden"
            >
              <div className="bg-nexus-crimson text-white px-6 py-3 border-b-2 border-nexus-ink flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em]">
                  <Award className="w-4 h-4" />
                  <span>SOVEREIGN SYSTEM PROCLAMATION // NEXUS CORE COMPLETED</span>
                </div>
                <span className="font-mono text-xs font-bold uppercase">
                  CODE:{' '}
                  {winner?.proclamationCode ||
                    nexusCore?.teamCoreRecord?.proclamationCode ||
                    'NX-SOVEREIGN-PRIME'}
                </span>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block px-3 py-1 bg-nexus-paper text-nexus-ink font-mono text-[11px] font-bold uppercase tracking-widest">
                    ULTIMATE SYSTEM OBJECTIVE OVERTHROWN
                  </span>

                  <h3 className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-white leading-none">
                    WINNER // TEAM {winner?.teamName || team?.teamName} (
                    {winner?.teamId || team?.teamId})
                  </h3>

                  <p className="font-editorial text-base text-nexus-paper/85 leading-relaxed">
                    The central autonomous architecture has yielded. Squad{' '}
                    <strong className="text-white">
                      {winner?.teamName || team?.teamName}
                    </strong>{' '}
                    transmitted the master convergence key and claimed sovereignty over the NEXUS
                    Core.
                  </p>

                  {/* Winning Squad Operatives */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {(winner?.members?.length ? winner.members : team?.members || []).map(
                      (member) => (
                        <div
                          key={member.memberId}
                          className="p-3 border border-nexus-paper/25 bg-black/50 flex items-center justify-between font-mono text-xs"
                        >
                          <div>
                            <span className="text-[10px] text-nexus-crimson font-bold block">
                              {member.memberId} // {member.role}
                            </span>
                            <span className="font-bold text-nexus-paper">{member.name}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-nexus-crimson shrink-0" />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Winner Telemetry & Honor Roll */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="nexus-paper-canvas text-nexus-ink border-2 border-nexus-ink p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-nexus-ink/20 pb-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                        VICTORY LEDGER TELEMETRY
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
                        <span className="text-[10px] text-nexus-muted block">CORE BOUNTY</span>
                        <span className="text-lg font-bold text-nexus-ink">
                          +{winner?.rewardAwarded ?? unlockConfig.completionReward ?? 1500} CR
                        </span>
                      </div>
                      <div className="p-2.5 border border-nexus-ink bg-nexus-paper">
                        <span className="text-[10px] text-nexus-muted block">MODULES SOLVED</span>
                        <span className="text-sm font-bold text-nexus-ink">
                          {winner?.totalSolved ?? challengesSolved} MODULES
                        </span>
                      </div>
                      <div className="p-2.5 border border-nexus-ink bg-nexus-paper">
                        <span className="text-[10px] text-nexus-muted block">RISK PROFILE</span>
                        <span className="text-sm font-bold text-nexus-ink">
                          {winner?.riskProfile || team?.stats?.riskProfile || 'BALANCED'}
                        </span>
                      </div>
                    </div>

                    {/* Completed Teams Honor Roll */}
                    {completedTeams.length > 0 && (
                      <div className="pt-2 border-t border-nexus-ink/20 space-y-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                          COMPLETED SQUADS HONOR ROLL ({completedTeams.length})
                        </span>
                        {completedTeams.map((entry) => (
                          <div
                            key={entry.teamId}
                            className="px-2.5 py-1.5 bg-nexus-ink text-nexus-paper font-mono text-[11px] flex items-center justify-between"
                          >
                            <span>
                              #{entry.rank} {entry.teamName} ({entry.teamId})
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
