import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Radio,
  Cpu,
  Trophy,
  Activity,
  Clock,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Zap,
  Award,
  ArrowUpRight,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { socketClient, NEXUS_SOCKET_EVENTS } from '../socket/socketClient';
import { CrosshairMark } from '../components/CrosshairMark';
import { RiskBadge } from '../components/RiskBadge';
import { SystemBadge } from '../components/SystemBadge';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Supplied NEXUS Architectural Imagery
import artCoreBridge from '../assets/artwork/nexus-core-bridge.jpg';
import artMonolithGate from '../assets/artwork/nexus-monolith-gate.jpg';
import artRingCitadel from '../assets/artwork/nexus-ring-citadel.jpg';

const API_BASE_URL =
  import.meta.env.API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5050';

const formatGiantTimer = (totalSeconds) => {
  const safe = Math.max(0, Math.floor(Number(totalSeconds || 0)));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return {
    hrs: String(hrs).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
    formatted: `${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(
      secs
    ).padStart(2, '0')}`,
  };
};

const getEventBadgeStyle = (eventType = '') => {
  const normalized = String(eventType).toUpperCase();
  if (normalized.includes('CORE COMPLETED') || normalized === 'SUCCESS') {
    return 'bg-nexus-crimson text-white border-white';
  }
  if (normalized.includes('CORE AVAILABLE') || normalized === 'ABILITY USED') {
    return 'bg-nexus-paper text-nexus-ink border-nexus-crimson';
  }
  if (normalized === 'FAILURE') {
    return 'bg-nexus-crimson/25 text-nexus-crimson border-nexus-crimson';
  }
  return 'bg-black/80 text-nexus-paper border-nexus-paper/35';
};

/**
 * PHASE 13 — LIVE EVENT PROJECTOR MODE (/display)
 *
 * Giant NEXUS command display designed for a physical venue projector.
 * Optimized for distance legibility with strict server-side + client-side privacy guarantees.
 */
export const ProjectorDisplayPage = () => {
  const prefersReducedMotion = useReducedMotion();

  const [snapshot, setSnapshot] = useState(null);
  const [socketConnected, setSocketConnected] = useState(socketClient.connected);
  const [activeTerminals, setActiveTerminals] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(6862);
  const [liveAlertBanner, setLiveAlertBanner] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Isolated DOM Refs for GSAP (Never animated by Framer Motion)
  const projectorRootRef = useRef(null);
  const gsapBgArtworkRef = useRef(null);
  const gsapTimerFrameRef = useRef(null);
  const gsapCorePanelRef = useRef(null);
  const gsapCoreBeamRef = useRef(null);
  const gsapCoreHaloRef = useRef(null);
  const prevCoreStateRef = useRef('LOCKED');
  const prevMinuteRef = useRef(null);

  const applyIncomingSnapshot = useCallback((data, triggerAlert = false) => {
    if (!data) return;
    setSnapshot((prev) => {
      if (
        triggerAlert &&
        Array.isArray(data.recentSystemEvents) &&
        data.recentSystemEvents.length > 0
      ) {
        const newest = data.recentSystemEvents[0];
        const prevNewestId = prev?.recentSystemEvents?.[0]?.eventId;
        if (newest && newest.eventId !== prevNewestId) {
          setLiveAlertBanner({
            ...newest,
            alertKey: `${newest.eventId}-${Date.now()}`,
          });
        }
      }
      return data;
    });

    if (data.globalTimer?.remainingSeconds !== undefined) {
      setRemainingSeconds(Number(data.globalTimer.remainingSeconds));
    }
  }, []);

  // Initial HTTP fetch of sanitized /api/display snapshot
  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/api/display`)
      .then((r) => r.json())
      .then((data) => {
        if (active && data?.status === 'ok') {
          applyIncomingSnapshot(data, false);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [applyIncomingSnapshot]);

  // 1-second local countdown interpolation between server sync pulses
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-clear live event alert banner after 6 seconds
  useEffect(() => {
    if (!liveAlertBanner) return undefined;
    const t = setTimeout(() => setLiveAlertBanner(null), 6000);
    return () => clearTimeout(t);
  }, [liveAlertBanner]);

  // Real-time Socket.IO subscription & live event listeners
  useEffect(() => {
    const subscribeToProjectorFeed = () => {
      socketClient.emit(NEXUS_SOCKET_EVENTS.LEADERBOARD.SUBSCRIBE, {}, (ack) => {
        if (ack?.ok && ack?.snapshot) {
          applyIncomingSnapshot(ack.snapshot, false);
        }
      });
    };

    const handleConnect = () => {
      setSocketConnected(true);
      subscribeToProjectorFeed();
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
    };

    const handleSnapshot = (payload) => {
      applyIncomingSnapshot(payload, false);
    };

    const handleLeaderboardUpdate = (payload) => {
      applyIncomingSnapshot(payload, true);
    };

    const handleCoreAvailable = (payload) => {
      setLiveAlertBanner({
        alertKey: `CORE-AVL-${Date.now()}`,
        eventType: 'CORE AVAILABLE',
        teamName: payload?.teamName || payload?.teamId || 'ARENA',
        headline:
          payload?.message ||
          'THE NEXUS CORE IS NOW AVAILABLE // ULTIMATE SYSTEM OBJECTIVE UNLOCKED',
        detail: `CONVERGENCE THRESHOLD REACHED BY SQUAD ${
          payload?.teamName || payload?.teamId || ''
        }`,
        timestamp: payload?.timestamp || new Date().toISOString(),
      });
      fetch(`${API_BASE_URL}/api/display`)
        .then((r) => r.json())
        .then((d) => applyIncomingSnapshot(d, false))
        .catch(() => {});
    };

    const handleCoreCompleted = (payload) => {
      setLiveAlertBanner({
        alertKey: `CORE-CMP-${Date.now()}`,
        eventType: 'CORE COMPLETED',
        teamName: payload?.teamName || payload?.teamId || 'SOVEREIGN',
        headline: `NEXUS CORE OVERTHROWN BY SQUAD ${
          payload?.teamName || payload?.teamId || ''
        }!`,
        detail: `PROCLAMATION: ${
          payload?.winner?.proclamationCode || 'NX-SOVEREIGN-PRIME'
        }`,
        timestamp: payload?.timestamp || new Date().toISOString(),
      });
      fetch(`${API_BASE_URL}/api/display`)
        .then((r) => r.json())
        .then((d) => applyIncomingSnapshot(d, false))
        .catch(() => {});
    };

    const handleSystemTelemetry = (payload) => {
      if (payload?.activeTerminals !== undefined) {
        setActiveTerminals(payload.activeTerminals);
      }
      if (payload?.globalTimer?.remainingSeconds !== undefined) {
        setRemainingSeconds(Number(payload.globalTimer.remainingSeconds));
      }
    };

    const handleTerminals = (payload) => {
      if (payload?.activeTerminals !== undefined) {
        setActiveTerminals(payload.activeTerminals);
      }
    };

    socketClient.on('connect', handleConnect);
    socketClient.on('disconnect', handleDisconnect);
    socketClient.on(NEXUS_SOCKET_EVENTS.LEADERBOARD.SNAPSHOT, handleSnapshot);
    socketClient.on(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleLeaderboardUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.CORE.AVAILABLE, handleCoreAvailable);
    socketClient.on(NEXUS_SOCKET_EVENTS.CORE.COMPLETED, handleCoreCompleted);
    socketClient.on(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleSystemTelemetry);
    socketClient.on(NEXUS_SOCKET_EVENTS.SYSTEM.TERMINALS, handleTerminals);

    if (!socketClient.connected) {
      socketClient.connect();
    } else {
      setSocketConnected(true);
      subscribeToProjectorFeed();
    }

    return () => {
      socketClient.off('connect', handleConnect);
      socketClient.off('disconnect', handleDisconnect);
      socketClient.off(NEXUS_SOCKET_EVENTS.LEADERBOARD.SNAPSHOT, handleSnapshot);
      socketClient.off(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleLeaderboardUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.CORE.AVAILABLE, handleCoreAvailable);
      socketClient.off(NEXUS_SOCKET_EVENTS.CORE.COMPLETED, handleCoreCompleted);
      socketClient.off(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleSystemTelemetry);
      socketClient.off(NEXUS_SOCKET_EVENTS.SYSTEM.TERMINALS, handleTerminals);
    };
  }, [applyIncomingSnapshot]);

  // GSAP 1 & 2: Background movement & System-line animation on mount
  useLayoutEffect(() => {
    if (prefersReducedMotion || !projectorRootRef.current) return undefined;

    const ctx = gsap.context(() => {
      // System-line animation across giant command display
      gsap.fromTo(
        '.gsap-projector-line-h',
        { scaleX: 0, transformOrigin: 'left center', opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.inOut',
        }
      );

      gsap.fromTo(
        '.gsap-projector-line-v',
        { scaleY: 0, transformOrigin: 'top center', opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.inOut',
        }
      );

      // Slow architectural background movement for projector ambiance
      if (gsapBgArtworkRef.current) {
        gsap.to(gsapBgArtworkRef.current, {
          scale: 1.06,
          xPercent: -1.5,
          yPercent: -1,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, projectorRootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // GSAP 3: Large timer transition pulse on minute change or critical phase
  const currentMinute = Math.floor(remainingSeconds / 60);
  useLayoutEffect(() => {
    if (prefersReducedMotion || !gsapTimerFrameRef.current) return undefined;
    if (prevMinuteRef.current !== null && prevMinuteRef.current !== currentMinute) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          gsapTimerFrameRef.current,
          { borderColor: '#E6192E', boxShadow: '0 0 36px rgba(230,25,46,0.65)' },
          {
            borderColor: 'rgba(242,239,233,0.35)',
            boxShadow: '0 0 0px rgba(230,25,46,0)',
            duration: 1.2,
            ease: 'power2.out',
          }
        );
      }, gsapTimerFrameRef);
      prevMinuteRef.current = currentMinute;
      return () => ctx.revert();
    }
    prevMinuteRef.current = currentMinute;
    return undefined;
  }, [currentMinute, prefersReducedMotion]);

  // GSAP 4: Core activation sequence when CORE STATUS transitions
  const coreState = snapshot?.coreStatus?.state || 'LOCKED';
  useLayoutEffect(() => {
    if (prefersReducedMotion || !gsapCorePanelRef.current) return undefined;

    const prev = prevCoreStateRef.current;
    prevCoreStateRef.current = coreState;

    const isUnlocked = coreState !== 'LOCKED';
    const ctx = gsap.context(() => {
      if (gsapCoreBeamRef.current) {
        gsap.to(gsapCoreBeamRef.current, {
          scaleY: 1,
          opacity: isUnlocked ? 1 : 0.4,
          boxShadow: isUnlocked
            ? '0 0 42px #E6192E, 0 0 84px #E6192E'
            : '0 0 16px rgba(230,25,46,0.4)',
          duration: prev !== coreState ? 0.95 : 0.4,
          ease: 'expo.out',
        });
      }
      if (gsapCoreHaloRef.current) {
        gsap.to(gsapCoreHaloRef.current, {
          opacity: isUnlocked ? 0.9 : 0.25,
          scale: isUnlocked ? 1.15 : 0.85,
          duration: 0.95,
          ease: 'power2.out',
        });
      }
    }, gsapCorePanelRef);

    return () => ctx.revert();
  }, [coreState, prefersReducedMotion]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const timerParts = formatGiantTimer(remainingSeconds);
  const topTeams = snapshot?.topTeams || [];
  const recentEvents = snapshot?.recentSystemEvents || [];
  const coreStatus = snapshot?.coreStatus || {
    title: 'THE NEXUS CORE',
    designation: 'ULTIMATE SYSTEM OBJECTIVE // CENTRAL CONVERGENCE',
    state: 'LOCKED',
    maxConvergencePercent: 72,
    unlockedTeamsCount: 0,
    activeTeamsCount: 0,
    completedTeamsCount: 0,
    completionReward: 1500,
    winner: null,
    completedTeams: [],
  };

  return (
    <div
      ref={projectorRootRef}
      data-testid="projector-display-root"
      className="min-h-screen bg-nexus-ink text-nexus-paper relative overflow-hidden flex flex-col justify-between select-none"
    >
      {/* ===================================================================
          ARCHITECTURAL BACKGROUND IMAGERY + TECHNICAL GRID + GSAP SYSTEM LINES
         =================================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div ref={gsapBgArtworkRef} className="w-full h-full">
          <img
            src={coreState === 'LOCKED' ? artRingCitadel : artCoreBridge}
            alt=""
            className="w-full h-full object-cover object-center opacity-20 grayscale contrast-125"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-nexus-ink/90 via-nexus-ink/80 to-nexus-ink/95" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(242,239,233,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,233,0.12) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* GSAP Animated Command Grid Lines */}
        <div className="gsap-projector-line-h absolute top-24 left-0 right-0 h-[1px] bg-nexus-crimson/60" />
        <div className="gsap-projector-line-h absolute bottom-16 left-0 right-0 h-[1px] bg-nexus-crimson/60" />
        <div className="gsap-projector-line-v absolute top-0 bottom-0 left-8 w-[1px] bg-nexus-paper/15" />
        <div className="gsap-projector-line-v absolute top-0 bottom-0 right-8 w-[1px] bg-nexus-paper/15" />
      </div>

      {/* ===================================================================
          1. GIANT NEXUS COMMAND HEADER (CYBER QUEST // NEXUS + GLOBAL TIMER)
         =================================================================== */}
      <header className="relative z-20 border-b-2 border-nexus-paper/25 bg-nexus-ink/95 px-6 lg:px-12 py-5">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: CYBER QUEST // NEXUS Monumental Identity */}
          <div className="lg:col-span-4 flex items-center gap-5">
            <div className="w-3 h-16 bg-nexus-crimson shrink-0 shadow-[0_0_24px_#E6192E]" />
            <div>
              <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.28em] text-nexus-crimson font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>LIVE ARENA PROJECTOR // SECTOR-00</span>
              </div>
              <div className="flex items-baseline gap-4 mt-0.5">
                <h1 className="font-display text-5xl xl:text-6xl uppercase tracking-wider text-nexus-paper leading-none">
                  CYBER QUEST
                </h1>
                <span className="font-condensed text-2xl xl:text-3xl font-extrabold uppercase tracking-[0.26em] text-nexus-crimson">
                  NEXUS
                </span>
              </div>
            </div>
          </div>

          {/* Center: GIANT GLOBAL TIMER (GSAP Frame Ref) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={gsapTimerFrameRef}
              data-testid="projector-global-timer"
              className="w-full max-w-xl bg-black border-2 border-nexus-paper/35 px-6 py-3 flex items-center justify-between gap-6 shadow-brutal"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-nexus-crimson font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>GLOBAL TIMER</span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-nexus-paper/60 block">
                  {snapshot?.globalTimer?.phase || 'ARENA_LIVE'}
                </span>
              </div>

              <div className="font-mono text-4xl sm:text-5xl xl:text-6xl font-bold tracking-wider text-nexus-paper tabular-nums leading-none">
                <span>{timerParts.hrs}</span>
                <span className="text-nexus-crimson mx-1">:</span>
                <span>{timerParts.mins}</span>
                <span className="text-nexus-crimson mx-1">:</span>
                <span className="text-nexus-crimson">{timerParts.secs}</span>
              </div>
            </div>
          </div>

          {/* Right: Live Telemetry Status + Fullscreen Projector Control */}
          <div className="lg:col-span-3 flex items-center justify-end gap-4">
            <div className="text-right font-mono text-xs space-y-1">
              <div className="flex items-center justify-end gap-2">
                <span
                  className={`w-2.5 h-2.5 inline-block ${
                    socketConnected ? 'bg-nexus-crimson animate-ping' : 'bg-white/30'
                  }`}
                />
                <span className="font-bold uppercase tracking-widest text-nexus-paper">
                  {socketConnected ? 'SOCKET.IO LIVE' : 'RECONNECTING'}
                </span>
              </div>
              <p className="text-nexus-paper/60 text-[11px]">
                TERMINALS LINKED: {activeTerminals} · SQUADS: {topTeams.length}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-3 border-2 border-nexus-paper/40 bg-black hover:border-nexus-crimson hover:bg-nexus-crimson text-nexus-paper hover:text-white transition-colors cursor-pointer"
              title="Toggle Projector Fullscreen"
              aria-label="Toggle Projector Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================
          FRAMER MOTION LIVE EVENT BROADCAST BANNER (DISTANCE-OPTIMIZED)
         =================================================================== */}
      <AnimatePresence>
        {liveAlertBanner && (
          <motion.div
            key={liveAlertBanner.alertKey}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-30 bg-nexus-crimson text-white border-b-2 border-white px-6 lg:px-12 py-3 shadow-brutal"
          >
            <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest">
                  LIVE ARENA EVENT // {liveAlertBanner.eventType}
                </span>
                <p className="font-condensed text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
                  {liveAlertBanner.headline}
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                {liveAlertBanner.detail}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================
          MAIN 12-COLUMN GIANT COMMAND DISPLAY WORKSPACE
          - Left 4 Cols: CORE STATUS (Architectural Monolith + Red Core Light)
          - Center 5 Cols: TOP TEAMS (Live Leaderboard with Framer Motion Rank Reorder)
          - Right 3 Cols: RECENT SYSTEM EVENTS (Live Sanitized Event Feed)
         =================================================================== */}
      <main className="relative z-20 flex-1 px-6 lg:px-12 py-6 max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ===============================================================
            COLUMN 1 (4 COLS): CORE STATUS & ARCHITECTURAL MONOLITH
           =============================================================== */}
        <section
          ref={gsapCorePanelRef}
          data-testid="projector-core-status"
          aria-label="NEXUS CORE STATUS"
          className="lg:col-span-4 border-2 border-nexus-paper/35 bg-black relative overflow-hidden flex flex-col justify-between p-6 shadow-brutal-lg"
        >
          {/* Architectural Core Artwork Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={coreState === 'LOCKED' ? artMonolithGate : artCoreBridge}
              alt="THE NEXUS CORE"
              className="w-full h-full object-cover object-center opacity-45 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50" />
          </div>

          {/* GSAP Red Vertical Core Light */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center justify-center"
            aria-hidden="true"
          >
            <div
              ref={gsapCoreHaloRef}
              className="absolute inset-y-0 w-36 bg-nexus-crimson/25 blur-2xl"
            />
            <div
              ref={gsapCoreBeamRef}
              className="relative h-full w-2 bg-nexus-crimson shadow-[0_0_32px_#E6192E]"
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/90" />
            </div>
          </div>

          {/* Top Core Header */}
          <div className="relative z-20 flex items-center justify-between border-b border-nexus-paper/25 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-nexus-crimson font-bold">
              <Cpu className="w-4 h-4" />
              <span>CORE STATUS</span>
            </div>
            <SystemBadge
              variant={coreState === 'LOCKED' ? 'outline' : 'crimson'}
              pulse={coreState !== 'LOCKED'}
            >
              {coreState}
            </SystemBadge>
          </div>

          {/* Center Core Architectural Status Readout */}
          <div className="relative z-20 my-auto py-8 space-y-5">
            <div className="bg-black/85 border-2 border-nexus-paper/30 p-5 space-y-2 backdrop-blur-xs">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-nexus-crimson font-bold block">
                {coreStatus.designation || 'ULTIMATE SYSTEM OBJECTIVE'}
              </span>
              <h2 className="font-display text-5xl xl:text-6xl uppercase tracking-wide text-white leading-none">
                {coreStatus.title || 'THE NEXUS CORE'}
              </h2>
              <p className="font-mono text-xs text-nexus-paper/75 pt-1">
                BOUNTY: <strong className="text-nexus-crimson">+{coreStatus.completionReward || 1500} CR</strong> ·
                PEAK CONVERGENCE:{' '}
                <strong className="text-white">{coreStatus.maxConvergencePercent || 0}%</strong>
              </p>
            </div>

            {/* Winner Proclamation Box if Core is COMPLETED */}
            {coreStatus.winner && (
              <div className="bg-nexus-crimson text-white border-2 border-white p-5 space-y-2 shadow-brutal">
                <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>CORE SOVEREIGN WINNER</span>
                  </span>
                  <span>RANK #{coreStatus.winner.rank || 1}</span>
                </div>
                <p className="font-display text-4xl uppercase tracking-wider leading-none">
                  TEAM {coreStatus.winner.teamName} ({coreStatus.winner.teamId})
                </p>
                <div className="flex items-center justify-between font-mono text-xs pt-1 border-t border-white/30">
                  <span>FINAL CREDITS: {coreStatus.winner.finalCredits} CR</span>
                  <span>{coreStatus.winner.proclamationCode}</span>
                </div>
              </div>
            )}

            {/* 4-State Matrix Indicator */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {['LOCKED', 'AVAILABLE', 'ACTIVE', 'COMPLETED'].map((st) => {
                const isCurrent = coreState === st;
                return (
                  <div
                    key={st}
                    className={`px-3 py-2.5 border-2 flex items-center justify-between ${
                      isCurrent
                        ? 'bg-nexus-crimson text-white border-white font-bold'
                        : 'bg-black/80 text-nexus-paper/50 border-nexus-paper/20'
                    }`}
                  >
                    <span>{st}</span>
                    <span
                      className={`w-2.5 h-2.5 ${
                        isCurrent ? 'bg-white animate-ping' : 'bg-nexus-paper/20'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Core Convergence Telemetry */}
          <div className="relative z-20 bg-nexus-paper text-nexus-ink border-2 border-nexus-ink p-4 space-y-2.5">
            <div className="flex items-center justify-between font-mono text-xs font-bold uppercase">
              <span>ARENA CORE CONVERGENCE</span>
              <span className="text-nexus-crimson text-base">
                {coreStatus.maxConvergencePercent || 0}%
              </span>
            </div>
            <div className="w-full h-3.5 bg-nexus-ink p-0.5">
              <div
                className="h-full bg-nexus-crimson transition-all duration-500"
                style={{ width: `${coreStatus.maxConvergencePercent || 0}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-nexus-charcoal">
              <span>UNLOCKED SQUADS: {coreStatus.unlockedTeamsCount || 0}</span>
              <span>COMPLETED: {coreStatus.completedTeamsCount || 0}</span>
            </div>
          </div>
        </section>

        {/* ===============================================================
            COLUMN 2 (5 COLS): TOP TEAMS (FRAMER MOTION LEADERBOARD)
           =============================================================== */}
        <section
          data-testid="projector-top-teams"
          aria-label="TOP TEAMS LEADERBOARD"
          className="lg:col-span-5 border-2 border-nexus-ink bg-nexus-paper text-nexus-ink flex flex-col justify-between p-6 shadow-brutal-lg"
        >
          <div className="space-y-4">
            {/* Top Teams Header */}
            <div className="flex items-center justify-between border-b-2 border-nexus-ink pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-nexus-crimson text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>TOP TEAMS</span>
                </span>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-nexus-ink leading-none">
                  RESISTANCE STANDINGS
                </h2>
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-nexus-muted">
                LIVE RANKING
              </span>
            </div>

            {/* Framer Motion Animated Leaderboard Rows */}
            <div className="space-y-3.5">
              <AnimatePresence initial={false}>
                {topTeams.map((teamRow) => {
                  const isRankOne = teamRow.rank === 1;
                  const isCoreCompleted = teamRow.coreState === 'COMPLETED';

                  return (
                    <motion.div
                      key={teamRow.teamId}
                      layout
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                      transition={{
                        layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      className={`p-4 sm:p-5 border-2 transition-colors ${
                        isRankOne
                          ? 'border-nexus-ink bg-nexus-ink text-nexus-paper shadow-brutal'
                          : 'border-nexus-ink bg-nexus-paper-elevated text-nexus-ink'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Rank + Team Name */}
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center font-display text-3xl sm:text-4xl shrink-0 ${
                              isRankOne
                                ? 'bg-nexus-crimson text-white border-white'
                                : 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                            }`}
                          >
                            0{teamRow.rank}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`font-mono text-xs uppercase tracking-widest ${
                                  isRankOne ? 'text-nexus-paper/70' : 'text-nexus-muted'
                                }`}
                              >
                                {teamRow.teamId}
                              </span>
                              <RiskBadge risk={teamRow.riskProfile} size="xs" />
                              {isCoreCompleted && (
                                <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                                  CORE SOVEREIGN
                                </span>
                              )}
                            </div>

                            <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wide leading-none mt-1 truncate">
                              TEAM {teamRow.teamName}
                            </h3>
                          </div>
                        </div>

                        {/* Resistance Credits & Solved Modules */}
                        <div className="text-right shrink-0">
                          <span
                            className={`font-mono text-[10px] uppercase tracking-widest block ${
                              isRankOne ? 'text-nexus-paper/70' : 'text-nexus-muted'
                            }`}
                          >
                            RESISTANCE CREDITS
                          </span>
                          <p
                            className={`font-display text-4xl sm:text-5xl tracking-wide leading-none mt-0.5 ${
                              isRankOne ? 'text-nexus-crimson' : 'text-nexus-ink'
                            }`}
                          >
                            {teamRow.credits}{' '}
                            <span className="text-2xl font-condensed">CR</span>
                          </p>
                        </div>
                      </div>

                      {/* Bottom Telemetry Bar inside Team Card */}
                      <div className="mt-4 pt-3 border-t border-current/15 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase">
                          <span>
                            SOLVED: <strong>{teamRow.totalSolved}</strong> · FAILED:{' '}
                            <strong>{teamRow.totalFailed}</strong>
                          </span>
                          <span>
                            CORE: <strong className="text-nexus-crimson">{teamRow.coreState}</strong>{' '}
                            ({teamRow.convergencePercent}%)
                          </span>
                        </div>

                        <div
                          className={`w-full h-2.5 p-0.5 border ${
                            isRankOne
                              ? 'bg-black border-nexus-paper/35'
                              : 'bg-nexus-ink border-nexus-ink'
                          }`}
                        >
                          <div
                            className="h-full bg-nexus-crimson transition-all duration-500"
                            style={{ width: `${teamRow.convergencePercent}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Leaderboard Footer Note */}
          <div className="pt-4 border-t-2 border-nexus-ink flex items-center justify-between font-mono text-xs text-nexus-charcoal">
            <span>RANKED BY: CORE COMPLETION → CREDITS → SOLVED</span>
            <span className="font-bold text-nexus-crimson">SERVER-AUTHORITATIVE</span>
          </div>
        </section>

        {/* ===============================================================
            COLUMN 3 (3 COLS): RECENT SYSTEM EVENTS (FRAMER MOTION STREAM)
           =============================================================== */}
        <section
          data-testid="projector-recent-events"
          aria-label="RECENT SYSTEM EVENTS"
          className="lg:col-span-3 border-2 border-nexus-paper/35 bg-black/95 text-nexus-paper flex flex-col justify-between p-6 shadow-brutal-lg"
        >
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between border-b border-nexus-paper/25 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-nexus-crimson font-bold">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>RECENT SYSTEM EVENTS</span>
              </div>
              <CrosshairMark variant="crimson" size={12} />
            </div>

            {/* Live Event Stream List */}
            <div className="space-y-3 overflow-y-auto pr-1 max-h-[620px]">
              <AnimatePresence initial={false}>
                {recentEvents.map((ev) => (
                  <motion.div
                    key={ev.eventId}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="p-3.5 border border-nexus-paper/25 bg-nexus-ink/90 hover:border-nexus-crimson transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                      <span
                        className={`px-2 py-0.5 border font-bold uppercase tracking-wider ${getEventBadgeStyle(
                          ev.eventType
                        )}`}
                      >
                        {ev.eventType}
                      </span>
                      <span className="text-nexus-paper/55">
                        {new Date(ev.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="font-condensed text-lg font-extrabold uppercase tracking-wide text-white leading-snug">
                      {ev.headline}
                    </p>

                    <div className="flex items-center justify-between font-mono text-[11px] text-nexus-paper/70 pt-0.5">
                      <span className="truncate">{ev.detail}</span>
                      {ev.creditsDelta !== 0 && (
                        <span
                          className={`font-bold shrink-0 ml-2 ${
                            ev.creditsDelta > 0 ? 'text-white' : 'text-nexus-crimson'
                          }`}
                        >
                          {ev.creditsDelta > 0 ? `+${ev.creditsDelta}` : ev.creditsDelta} CR
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-nexus-paper/20 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-paper/60">
            <span>STREAM: PUBLIC ARENA</span>
            <span className="text-nexus-crimson font-bold">ZERO ANSWERS EXPOSED</span>
          </div>
        </section>
      </main>

      {/* ===================================================================
          BOTTOM COMMAND FOOTER & PRIVACY ATTESTATION
         =================================================================== */}
      <footer className="relative z-20 border-t-2 border-nexus-paper/25 bg-black px-6 lg:px-12 py-3.5">
        <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2.5 text-nexus-paper/80">
            <ShieldCheck className="w-4 h-4 text-nexus-crimson" />
            <span>
              PROJECTOR SECURITY PROTOCOL: PRIVATE SUBMISSIONS, CHALLENGE ANSWERS, AND OPERATIVE
              CREDENTIALS REDACTED
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-nexus-paper/65 hover:text-white uppercase tracking-widest inline-flex items-center gap-1"
            >
              <span>PUBLIC LANDING</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/dashboard"
              className="text-nexus-crimson hover:text-white font-bold uppercase tracking-widest inline-flex items-center gap-1"
            >
              <span>OPERATIVE PORTAL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectorDisplayPage;
