import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Maximize2, Minimize2, Clock, Radio, AlertTriangle } from 'lucide-react';
import { socketClient, NEXUS_SOCKET_EVENTS } from '../socket/socketClient';
import { API_BASE_URL } from '../config/runtimeConfig';

/**
 * Format total seconds into zero-padded Hours, Minutes, Seconds
 */
const formatGiantTimer = (totalSeconds) => {
  const safe = Math.max(0, Math.floor(Number(totalSeconds || 0)));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return {
    hrs: String(hrs).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
  };
};

/**
 * 📽️ CYBERQUEST PROJECTOR DISPLAY PAGE (/display)
 *
 * Dedicated strictly to the Arena Round Countdown Timer.
 * Minimal, high-contrast, distance-legible presentation.
 * All leaderboards, top-team standings, core status, and event feeds removed.
 * When the round ends, prominently displays:
 * "GAME HAS ENDED — WINNER WILL BE ANNOUNCED SOON"
 */
export const ProjectorDisplayPage = () => {
  const [snapshot, setSnapshot] = useState(null);
  const [socketConnected, setSocketConnected] = useState(socketClient.connected);
  const [remainingSeconds, setRemainingSeconds] = useState(2700);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const projectorRootRef = useRef(null);

  const applyIncomingSnapshot = useCallback((data) => {
    if (!data) return;
    setSnapshot(data);
    if (data.globalTimer?.remainingSeconds !== undefined) {
      setRemainingSeconds(Number(data.globalTimer.remainingSeconds));
    }
  }, []);

  // Poll /api/display every 2 seconds for server-authoritative timer sync
  useEffect(() => {
    let active = true;
    const syncDisplay = () => {
      fetch(`${API_BASE_URL}/api/display`)
        .then((r) => r.json())
        .then((data) => {
          if (active && data?.status === 'ok') {
            applyIncomingSnapshot(data);
          }
        })
        .catch(() => {});
    };
    syncDisplay();
    const interval = setInterval(syncDisplay, 2000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [applyIncomingSnapshot]);

  // Local 1-second interval interpolation between server pulses
  const timerStatus = snapshot?.globalTimer?.status || 'ACTIVE';
  useEffect(() => {
    if (timerStatus !== 'ACTIVE') {
      if (timerStatus === 'ENDED') {
        setRemainingSeconds(0);
      }
      return undefined;
    }
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerStatus]);

  // Real-time socket event subscription for instantaneous timer events
  useEffect(() => {
    const handleConnect = () => setSocketConnected(true);
    const handleDisconnect = () => setSocketConnected(false);

    const handleSystemTelemetry = (payload) => {
      if (payload?.globalTimer?.remainingSeconds !== undefined) {
        setRemainingSeconds(Number(payload.globalTimer.remainingSeconds));
      }
      if (payload?.globalTimer?.status) {
        setSnapshot((prev) => ({
          ...prev,
          globalTimer: {
            ...(prev?.globalTimer || {}),
            ...payload.globalTimer,
          },
        }));
      }
    };

    socketClient.on('connect', handleConnect);
    socketClient.on('disconnect', handleDisconnect);
    socketClient.on(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleSystemTelemetry);
    socketClient.on(NEXUS_SOCKET_EVENTS.ARENA.TIME_SYNC, handleSystemTelemetry);
    socketClient.on(NEXUS_SOCKET_EVENTS.ARENA.TIMER_STATUS, handleSystemTelemetry);

    if (!socketClient.connected) {
      socketClient.connect();
    } else {
      setSocketConnected(true);
    }

    return () => {
      socketClient.off('connect', handleConnect);
      socketClient.off('disconnect', handleDisconnect);
      socketClient.off(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleSystemTelemetry);
      socketClient.off(NEXUS_SOCKET_EVENTS.ARENA.TIME_SYNC, handleSystemTelemetry);
      socketClient.off(NEXUS_SOCKET_EVENTS.ARENA.TIMER_STATUS, handleSystemTelemetry);
    };
  }, []);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (projectorRootRef.current?.requestFullscreen) {
        projectorRootRef.current.requestFullscreen().catch(() => {});
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const isEnded = timerStatus === 'ENDED' || remainingSeconds === 0;
  const isPaused = timerStatus === 'PAUSED';
  const timerParts = useMemo(() => formatGiantTimer(remainingSeconds), [remainingSeconds]);

  return (
    <div
      ref={projectorRootRef}
      data-testid="projector-display-root"
      className="min-h-screen w-full bg-[#08080A] text-white flex flex-col justify-between select-none relative overflow-hidden font-sans"
    >
      {/* Background Ambience & Engineering Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isEnded
              ? 'radial-gradient(circle at 50% 50%, rgba(225, 29, 46, 0.22) 0%, rgba(8, 8, 10, 0.95) 75%)'
              : 'radial-gradient(circle at 50% 45%, rgba(225, 29, 46, 0.12) 0%, rgba(8, 8, 10, 0.98) 75%)',
          }}
        />
        {/* Subtle top & bottom accent borders */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#E11D2E] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#E11D2E] to-transparent" />
      </div>

      {/* ===================================================================
          MINIMAL PROJECTOR HEADER
         =================================================================== */}
      <header className="relative z-10 w-full px-6 sm:px-12 py-5 sm:py-7 flex items-center justify-between border-b border-white/10 backdrop-blur-sm">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-10 bg-[#E11D2E] shadow-[0_0_20px_#E11D2E]" />
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#E11D2E] font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE ARENA // PROJECTOR DISPLAY</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl uppercase tracking-wider text-white leading-tight">
              CYBER QUEST <span className="text-[#E11D2E]">NEXUS</span>
            </h1>
          </div>
        </div>

        {/* Live telemetry + Fullscreen button */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white/80">
            <span
              className={`w-2 h-2 rounded-full ${
                socketConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span className="text-[11px] uppercase tracking-widest">
              {socketConnected ? 'SYNC ONLINE' : 'RECONNECTING'}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 sm:p-3 border border-white/20 hover:border-[#E11D2E] bg-black/60 hover:bg-[#E11D2E] text-white transition-colors cursor-pointer"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* ===================================================================
          GIANT MONUMENTAL TIMER / GAME ENDED CENTRAL STAGE
         =================================================================== */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12 text-center">
        {!isEnded ? (
          /* ACTIVE / PAUSED COUNTDOWN VIEW */
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-10">
            {/* Round Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-5 sm:px-7 py-2 bg-black/80 border-2 border-white/20 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
              {isPaused ? (
                <>
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
                    ROUND PAUSED // COUNTDOWN HALTED
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E11D2E] animate-pulse" />
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-white">
                    ROUND 01 // TIME REMAINING
                  </span>
                </>
              )}
            </div>

            {/* Giant Monolithic Digits: Hours : Minutes : Seconds */}
            <div className="w-full py-4 sm:py-8 flex items-center justify-center">
              <div className="font-mono font-black tracking-tight text-white tabular-nums leading-none select-none flex items-center justify-center text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] xl:text-[20rem] drop-shadow-[0_0_80px_rgba(225,29,46,0.28)]">
                <span>{timerParts.hrs}</span>
                <span className="text-[#E11D2E] mx-1 sm:mx-3 xl:mx-6 animate-pulse">:</span>
                <span>{timerParts.mins}</span>
                <span className="text-[#E11D2E] mx-1 sm:mx-3 xl:mx-6 animate-pulse">:</span>
                <span className="text-[#E11D2E]">{timerParts.secs}</span>
              </div>
            </div>

            {/* Sub-label indicators */}
            <div className="grid grid-cols-3 w-full max-w-xl sm:max-w-3xl text-center font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-white/50 pt-2 border-t border-white/10">
              <span>HOURS</span>
              <span>MINUTES</span>
              <span>SECONDS</span>
            </div>
          </div>
        ) : (
          /* GAME HAS ENDED // WINNER WILL BE ANNOUNCED SOON */
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#E11D2E] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(225,29,46,0.6)]">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
              <span>ROUND CONCLUDED // TRANSMISSION CLOSED</span>
            </div>

            {/* Expired Timer readout */}
            <div className="font-mono text-5xl sm:text-7xl font-bold tracking-widest text-white/40 tabular-nums">
              00 : 00 : 00
            </div>

            {/* HERO ANNOUNCEMENT BANNER */}
            <div className="bg-black/90 border-4 border-[#E11D2E] p-8 sm:p-14 sm:py-16 w-full shadow-[0_0_80px_rgba(225,29,46,0.45)] relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(225,29,46,0.6) 0%, transparent 75%)',
                }}
              />
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-wider text-white leading-none">
                  GAME HAS <span className="text-[#E11D2E]">ENDED</span>
                </h2>

                <p className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-[#E11D2E] animate-pulse">
                  WINNER WILL BE ANNOUNCED SOON
                </p>

                <p className="font-mono text-xs sm:text-base uppercase tracking-widest text-white/70 max-w-2xl mx-auto pt-2">
                  All challenge sessions and terminal submissions are locked. Final score
                  verification in progress. Stand by for official awards ceremony.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================
          CLEAN PROJECTOR FOOTER (NO LEADERBOARD / NO BUTTONS)
         =================================================================== */}
      <footer className="relative z-10 w-full px-6 sm:px-12 py-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] sm:text-xs text-white/50">
        <div>
          <span>OFFICIAL ARENA TIMER</span>
          <span className="mx-2">·</span>
          <span>SERVER AUTHORITATIVE</span>
        </div>
        <div className="uppercase tracking-widest">
          STATUS: <span className="text-white font-bold">{timerStatus}</span>
        </div>
      </footer>
    </div>
  );
};

export default ProjectorDisplayPage;
