import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Trophy,
  Radio,
  Lock,
  Zap,
  Sparkles,
  Award,
  X,
  Crown,
} from 'lucide-react';

/**
 * Full-Screen Cinematic Launch Countdown + "BOOM — BREACH LIVE" Blast-Off
 * & Official Top 2 Winning Squads Proclamation Ceremony (Framer Motion + GSAP)
 */
export const CinematicArenaOverlay = ({
  globalTimer,
  coreStatus,
  leaderboard = [],
  team,
}) => {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [blastOffActive, setBlastOffActive] = useState(false);

  const prevStatusRef = useRef(globalTimer?.status || 'PAUSED');
  const prevCountRef = useRef(null);

  const numberRef = useRef(null);
  const ringRef = useRef(null);
  const secondaryRingRef = useRef(null);
  const orbitRingRef = useRef(null);
  const hudBoxRef = useRef(null);
  const boomTextRef = useRef(null);
  const winnerContainerRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setNowMs(Date.now());
    }, 80);
    return () => clearInterval(id);
  }, []);

  // Calculate live countdown seconds remaining
  let countdownSec = 0;
  if (globalTimer?.status === 'COUNTDOWN') {
    if (globalTimer.countdownTargetTimestamp) {
      const targetMs = new Date(globalTimer.countdownTargetTimestamp).getTime();
      countdownSec = Math.max(0, Math.ceil((targetMs - nowMs) / 1000));
    } else {
      countdownSec = Math.max(0, Number(globalTimer.countdownRemainingSeconds || 0));
    }
  }

  const isCountingDown = globalTimer?.status === 'COUNTDOWN' && countdownSec > 0;

  // Continuous orbital ring rotation during countdown
  useEffect(() => {
    if (!isCountingDown || !orbitRingRef.current) return undefined;
    const tween = gsap.to(orbitRingRef.current, {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'none',
    });
    return () => tween.kill();
  }, [isCountingDown]);

  // Detect transition from COUNTDOWN -> ACTIVE (or countdown hitting 0) to trigger "BOOM — GAME STARTS!"
  useEffect(() => {
    const currentStatus = globalTimer?.status;
    if (
      (prevStatusRef.current === 'COUNTDOWN' && currentStatus === 'ACTIVE') ||
      (prevStatusRef.current === 'COUNTDOWN' && countdownSec === 0)
    ) {
      setBlastOffActive(true);
      const timer = setTimeout(() => {
        setBlastOffActive(false);
      }, 2700);
      prevStatusRef.current = currentStatus;
      return () => clearTimeout(timer);
    }
    prevStatusRef.current = currentStatus;
    return undefined;
  }, [globalTimer?.status, countdownSec]);

  // GSAP pulse animation on every countdown second tick
  useEffect(() => {
    if (!isCountingDown || countdownSec === prevCountRef.current) return;
    prevCountRef.current = countdownSec;

    if (numberRef.current) {
      gsap.fromTo(
        numberRef.current,
        {
          scale: 2.6,
          opacity: 0,
          rotation: countdownSec <= 3 ? (countdownSec % 2 === 0 ? -5 : 5) : 0,
          filter: 'blur(10px)',
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.52,
          ease: 'back.out(2.2)',
        }
      );
    }

    if (ringRef.current) {
      gsap.fromTo(
        ringRef.current,
        { scale: 0.35, opacity: 1 },
        { scale: 2.6, opacity: 0, duration: 0.9, ease: 'power3.out' }
      );
    }

    if (secondaryRingRef.current) {
      gsap.fromTo(
        secondaryRingRef.current,
        { scale: 0.5, opacity: 0.7 },
        { scale: 3.1, opacity: 0, duration: 1.05, delay: 0.08, ease: 'power2.out' }
      );
    }

    if (hudBoxRef.current && countdownSec <= 3) {
      gsap.fromTo(
        hudBoxRef.current,
        { x: -12, y: 4 },
        {
          x: 0,
          y: 0,
          duration: 0.38,
          ease: 'elastic.out(2.2, 0.18)',
        }
      );
    }
  }, [isCountingDown, countdownSec]);

  // GSAP animation when "BOOM — BREACH LIVE" triggers
  useEffect(() => {
    if (!blastOffActive || !boomTextRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.boom-stagger',
        { scale: 0.4, opacity: 0, y: 24 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.8)',
        }
      );
      if (ringRef.current) {
        gsap.fromTo(
          ringRef.current,
          { scale: 0.2, opacity: 1 },
          { scale: 3.5, opacity: 0, duration: 1.2, ease: 'expo.out' }
        );
      }
    }, boomTextRef);
    return () => ctx.revert();
  }, [blastOffActive]);

  const declaredWinner =
    globalTimer?.declaredWinner ||
    coreStatus?.declaredWinner ||
    null;

  const runnerUp =
    declaredWinner?.runnerUp ||
    (Array.isArray(declaredWinner?.topTwo) && declaredWinner.topTwo[1]) ||
    (Array.isArray(declaredWinner?.podium) && declaredWinner.podium[1]) ||
    null;

  const allTeamRankings =
    Array.isArray(declaredWinner?.allTeamsRanking) && declaredWinner.allTeamsRanking.length > 0
      ? declaredWinner.allTeamsRanking
      : Array.isArray(leaderboard) && leaderboard.length > 0
        ? leaderboard
        : Array.isArray(declaredWinner?.podium)
          ? declaredWinner.podium
          : [];

  const winnerKey = declaredWinner
    ? `${declaredWinner.teamId}-${runnerUp?.teamId || 'NONE'}-${declaredWinner.declaredAt || declaredWinner.credits}`
    : null;

  // Strictly Admin-controlled: remains open until Admin clears/dismisses or resets
  const showWinnerModal =
    Boolean(declaredWinner) &&
    !isCountingDown &&
    !blastOffActive;

  // Cinematic GSAP timeline for the Top 2 Winners Ceremony
  useEffect(() => {
    if (!showWinnerModal || !winnerContainerRef.current) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        '.winner-cinema-header',
        { y: -32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
      )
        .fromTo(
          '.winner-rank-1-card',
          { scale: 0.84, y: 40, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.6)' },
          '-=0.25'
        )
        .fromTo(
          '.winner-rank-2-card',
          { scale: 0.88, y: 40, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' },
          '-=0.4'
        )
        .fromTo(
          '.winner-footer-bar',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
          '-=0.25'
        );

      gsap.to('.winner-trophy-glow', {
        scale: 1.08,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, winnerContainerRef);

    return () => ctx.revert();
  }, [showWinnerModal, winnerKey]);

  const getCountdownLoreDirective = (sec) => {
    if (sec > 10) return 'SYNCHRONIZING ALL SQUAD TERMINALS // STAND BY...';
    if (sec > 5) return 'DECRYPTING SECTOR VAULTS // ALLOCATING RESISTANCE CREDITS...';
    if (sec > 3) return 'CONTAINMENT SHIELDS DROPPING // PREPARE TO BREACH...';
    return 'FINAL CONVERGENCE // LAUNCHING IN...';
  };

  const myTeamIdUpper = String(team?.teamId || '').toUpperCase();
  const isMyTeamFirst =
    declaredWinner &&
    myTeamIdUpper &&
    String(declaredWinner.teamId).toUpperCase() === myTeamIdUpper;
  const isMyTeamSecond =
    runnerUp &&
    myTeamIdUpper &&
    String(runnerUp.teamId).toUpperCase() === myTeamIdUpper;

  return (
    <>
      {/* =====================================================================
          1. CINEMATIC LAUNCH COUNTDOWN & "BOOM — BREACH LIVE" OVERLAY
         ===================================================================== */}
      <AnimatePresence>
        {(isCountingDown || blastOffActive) && (
          <motion.div
            key="cinematic-countdown-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] bg-[#060608]/95 backdrop-blur-xl flex flex-col items-center justify-between overflow-hidden select-none"
          >
            {/* Widescreen Cinema Top Letterbox Bar */}
            <motion.div
              initial={{ y: -60 }}
              animate={{ y: 0 }}
              exit={{ y: -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-10 sm:h-14 bg-black border-b-2 border-nexus-crimson/60 px-3 sm:px-6 flex items-center justify-between gap-2 font-mono text-[9px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.28em] text-nexus-paper/70 z-20"
            >
              <span className="flex items-center gap-1.5 sm:gap-2 text-nexus-crimson font-bold truncate">
                <span className="w-2 h-2 rounded-full bg-nexus-crimson animate-ping shrink-0" />
                <span className="truncate">NEXUS CENTRAL COMMAND // LIVE BROADCAST</span>
              </span>
              <span className="hidden sm:inline shrink-0">
                {blastOffActive ? 'STATUS: ARENA UNLOCKED' : 'PROTOCOL: OMEGA-LAUNCH'}
              </span>
            </motion.div>

            {/* Radial Tactical Grid & Atmospheric Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: blastOffActive
                  ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.38) 0%, rgba(6,6,8,0) 68%), linear-gradient(rgba(236,231,223,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(236,231,223,0.06) 1px, transparent 1px)'
                  : countdownSec <= 3
                    ? 'radial-gradient(circle at center, rgba(225, 29, 46, 0.48) 0%, rgba(6,6,8,0) 68%), linear-gradient(rgba(236,231,223,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(236,231,223,0.06) 1px, transparent 1px)'
                    : 'radial-gradient(circle at center, rgba(225, 29, 46, 0.25) 0%, rgba(6,6,8,0) 65%), linear-gradient(rgba(236,231,223,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(236,231,223,0.05) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 44px 44px, 44px 44px',
              }}
            />

            {/* Center Stage */}
            <div className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-6">
              {/* Rotating Orbital Ring */}
              <div
                ref={orbitRingRef}
                className="pointer-events-none absolute w-[240px] h-[240px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-nexus-crimson/40"
              />

              {/* Primary Expanding GSAP Shockwave Ring */}
              <div
                ref={ringRef}
                className={`pointer-events-none absolute w-56 h-56 sm:w-96 sm:h-96 rounded-full border-4 ${
                  blastOffActive
                    ? 'border-emerald-400 shadow-[0_0_100px_rgba(16,185,129,0.95)]'
                    : countdownSec <= 3
                      ? 'border-nexus-crimson shadow-[0_0_90px_rgba(225,29,46,0.95)]'
                      : 'border-nexus-paper/60'
                }`}
              />

              {/* Secondary Expanding GSAP Shockwave Ring */}
              <div
                ref={secondaryRingRef}
                className={`pointer-events-none absolute w-56 h-56 sm:w-96 sm:h-96 rounded-full border-2 ${
                  blastOffActive
                    ? 'border-emerald-300/60'
                    : countdownSec <= 3
                      ? 'border-nexus-crimson/60'
                      : 'border-nexus-paper/30'
                }`}
              />

              {blastOffActive ? (
                <div
                  ref={boomTextRef}
                  className="relative z-10 max-w-4xl w-full text-center space-y-4 sm:space-y-6 px-3 sm:px-4"
                >
                  <div className="boom-stagger inline-flex items-center gap-2 px-3.5 sm:px-6 py-1.5 sm:py-2 bg-emerald-500 text-nexus-ink font-mono text-[10px] sm:text-sm font-black uppercase tracking-[0.16em] sm:tracking-[0.32em] border-2 border-white shadow-[0_0_50px_rgba(16,185,129,0.9)]">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                    <span>SYSTEM BREACH LIVE // ALL SECTORS UNLOCKED</span>
                  </div>

                  <h1 className="boom-stagger font-display text-5xl sm:text-8xl md:text-9xl uppercase text-white leading-none tracking-wider drop-shadow-[0_0_45px_rgba(16,185,129,0.9)]">
                    THE GAME <span className="text-emerald-400">BEGINS!</span>
                  </h1>

                  <p className="boom-stagger font-mono text-[11px] sm:text-base uppercase tracking-[0.14em] sm:tracking-[0.28em] text-nexus-paper/90 font-bold">
                    DEPLOY YOUR SQUAD · SOLVE CHALLENGES · CONQUER THE CITADEL
                  </p>
                </div>
              ) : (
                <div
                  ref={hudBoxRef}
                  className="relative z-10 max-w-3xl w-full text-center space-y-3 sm:space-y-5 px-2"
                >
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-nexus-crimson text-white border-2 border-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.26em] shadow-[0_0_30px_rgba(225,29,46,0.75)]">
                    <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-ping shrink-0" />
                    <span>ARENA LAUNCH SEQUENCE</span>
                  </div>

                  <p className="font-mono text-[11px] sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.26em] text-amber-300 font-bold px-2">
                    {getCountdownLoreDirective(countdownSec)}
                  </p>

                  {/* Giant Kinetic Countdown Number */}
                  <div className="py-1 sm:py-2 flex items-center justify-center">
                    <div
                      ref={numberRef}
                      className={`font-display text-[110px] sm:text-[210px] md:text-[250px] leading-none font-bold tracking-tight select-none ${
                        countdownSec <= 3
                          ? 'text-nexus-crimson drop-shadow-[0_0_65px_rgba(225,29,46,1)]'
                          : 'text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]'
                      }`}
                    >
                      {String(countdownSec).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="max-w-xs sm:max-w-md mx-auto space-y-2 px-2">
                    <div className="w-full h-2.5 sm:h-3 bg-white/10 border-2 border-white/40 overflow-hidden p-0.5">
                      <motion.div
                        className="h-full bg-nexus-crimson"
                        initial={{ width: '100%' }}
                        animate={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              (countdownSec /
                                Math.max(1, Number(globalTimer?.countdownTotalSeconds || 10))) *
                                100
                            )
                          )}%`,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Widescreen Cinema Bottom Letterbox Bar */}
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              exit={{ y: 60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-10 sm:h-14 bg-black border-t-2 border-nexus-crimson/60 px-3 sm:px-6 flex items-center justify-between gap-2 font-mono text-[9px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-nexus-paper/70 z-20"
            >
              <span className="truncate">SQUAD: {team?.teamName || team?.teamId || 'ALL UNITS'}</span>
              <span className="shrink-0">ROUND: {globalTimer?.totalDurationMinutes || 45} MIN</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          2. CINEMATIC TOP 2 WINNERS PROCLAMATION CEREMONY OVERLAY
         ===================================================================== */}
      <AnimatePresence>
        {showWinnerModal && declaredWinner && (
          <motion.div
            key="cinematic-winner-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            ref={winnerContainerRef}
            className="fixed inset-0 z-[115] bg-[#060608]/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto select-none"
          >
            {/* Golden & Crimson Spotlight Backdrop */}
            <div
              className="pointer-events-none fixed inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 25%, rgba(245, 158, 11, 0.28) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(225, 29, 46, 0.25) 0%, transparent 55%), linear-gradient(rgba(236,231,223,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,231,223,0.04) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
              }}
            />

            {/* Top Widescreen Cinema Letterbox Bar (Admin Controlled — No Close Button) */}
            <div className="sticky top-0 z-30 w-full bg-black/95 backdrop-blur-md border-b-2 border-amber-400/60 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 font-mono text-[9px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.26em] text-amber-300">
              <span className="flex items-center gap-1.5 sm:gap-2 font-bold truncate">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                <span className="truncate">CYBER QUEST: NEXUS // VICTORY PROCLAMATION</span>
              </span>
              <span className="px-2 sm:px-3 py-1 border border-amber-400/50 bg-amber-400/15 text-amber-300 font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shrink-0">
                <Lock className="w-3 h-3" />
                <span>OFFICIAL STANDINGS</span>
              </span>
            </div>

            {/* Center Ceremony Stage */}
            <div className="relative z-10 max-w-6xl w-full mx-auto px-3 sm:px-8 py-4 sm:py-8 my-auto space-y-5 sm:space-y-7">
              {/* Ceremony Header */}
              <div className="winner-cinema-header text-center space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 bg-amber-400 text-nexus-ink font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] sm:tracking-[0.28em] border-2 border-white shadow-[0_0_30px_rgba(245,158,11,0.6)] max-w-full">
                  <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">
                    {declaredWinner.reason || 'TOP 2 SOVEREIGN SQUADS PROCLAIMED'}
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-7xl md:text-8xl uppercase tracking-wide text-white leading-none drop-shadow-[0_0_35px_rgba(245,158,11,0.45)]">
                  CHAMPIONS OF <span className="text-amber-400">THE CITADEL</span>
                </h1>

                {/* Personalized Squad Callout if Player is #1 or #2 */}
                {isMyTeamFirst && (
                  <div className="max-w-2xl mx-auto mt-2 sm:mt-3 p-3 sm:p-3.5 border-2 border-amber-300 bg-amber-500/20 text-amber-200 font-mono text-[11px] sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest shadow-[0_0_35px_rgba(245,158,11,0.4)]">
                    🏆 SUPREME VICTORY! YOUR SQUAD ({team?.teamName}) IS CROWNED #1 GRAND CHAMPION!
                  </div>
                )}
                {isMyTeamSecond && (
                  <div className="max-w-2xl mx-auto mt-2 sm:mt-3 p-3 sm:p-3.5 border-2 border-zinc-200 bg-white/15 text-white font-mono text-[11px] sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                    🥈 VANGUARD HONORS! YOUR SQUAD ({team?.teamName}) FINISHED #2 RUNNER-UP!
                  </div>
                )}
              </div>

              {/* TOP 2 WINNERS SIDE-BY-SIDE SHOWCASE */}
              <div
                className={`grid grid-cols-1 ${
                  runnerUp ? 'lg:grid-cols-12' : 'max-w-2xl mx-auto'
                } gap-4 sm:gap-6 items-stretch`}
              >
                {/* #1 GRAND CHAMPION CARD (7 cols when runnerUp exists) */}
                <div
                  className={`winner-rank-1-card ${
                    runnerUp ? 'lg:col-span-7' : ''
                  } border-3 sm:border-4 border-amber-400 bg-gradient-to-b from-amber-500/20 via-[#121110] to-[#0B0B0D] text-white p-4 sm:p-7 relative overflow-hidden shadow-[0_0_70px_rgba(245,158,11,0.45)] flex flex-col justify-between`}
                >
                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-400/30 pb-2.5 sm:pb-3">
                      <span className="px-2.5 sm:px-3.5 py-1 bg-amber-400 text-nexus-ink font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] sm:tracking-[0.24em] inline-flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span>RANK #1 // GRAND CHAMPION</span>
                      </span>
                      <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-300">
                        [{declaredWinner.teamId}]
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 sm:gap-5">
                      <div className="winner-trophy-glow w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-nexus-ink border-3 sm:border-4 border-white flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(245,158,11,0.8)]">
                        <Trophy className="w-7 h-7 sm:w-11 sm:h-11 stroke-[2.3]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-amber-300 font-bold block">
                          1ST PLACE SOVEREIGN SQUAD
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-white leading-tight sm:leading-none break-words mt-1">
                          {declaredWinner.teamName || declaredWinner.teamId}
                        </h2>
                      </div>
                    </div>

                    {/* Squad Members Pills */}
                    {Array.isArray(declaredWinner.members) && declaredWinner.members.length > 0 && (
                      <div className="pt-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300/80 block mb-1.5">
                          CHAMPION OPERATIVES
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {declaredWinner.members.map((m, i) => (
                            <span
                              key={m.memberId || i}
                              className="px-2 py-0.5 bg-black/60 border border-amber-400/50 font-mono text-[11px] font-bold uppercase text-amber-200"
                            >
                              {m.name || `OPERATIVE ${i + 1}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* #1 Telemetry Footer */}
                  <div className="mt-4 sm:mt-5 pt-3.5 border-t border-amber-400/30 grid grid-cols-2 gap-2.5 sm:gap-4 font-mono">
                    <div className="p-2.5 bg-black/60 border border-amber-400/40">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-amber-300/80">
                        FINAL CREDITS
                      </span>
                      <span className="font-display text-2xl sm:text-4xl text-amber-400 leading-none mt-1 block">
                        {Number(declaredWinner.credits || 0).toLocaleString()} CR
                      </span>
                    </div>
                    <div className="p-2.5 bg-black/60 border border-amber-400/40">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-amber-300/80">
                        CHALLENGES SOLVED
                      </span>
                      <span className="font-display text-2xl sm:text-4xl text-white leading-none mt-1 block">
                        {Number(declaredWinner.totalSolved || 0)} SOLVED
                      </span>
                    </div>
                  </div>
                </div>

                {/* #2 FIRST RUNNER-UP CARD (5 cols) */}
                {runnerUp && (
                  <div className="winner-rank-2-card lg:col-span-5 border-3 sm:border-4 border-zinc-300 bg-gradient-to-b from-zinc-400/15 via-[#121316] to-[#0B0B0D] text-white p-4 sm:p-7 relative overflow-hidden shadow-[0_0_50px_rgba(212,212,216,0.28)] flex flex-col justify-between">
                    <div className="space-y-3.5 sm:space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-300/25 pb-2.5 sm:pb-3">
                        <span className="px-2.5 sm:px-3 py-1 bg-zinc-200 text-nexus-ink font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] inline-flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                          <span>RANK #2 // RUNNER-UP</span>
                        </span>
                        <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300">
                          [{runnerUp.teamId}]
                        </span>
                      </div>

                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <div className="w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 text-nexus-ink border-3 sm:border-4 border-white flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(212,212,216,0.6)]">
                          <Award className="w-7 h-7 sm:w-10 sm:h-10 stroke-[2.2]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.22em] text-zinc-300 font-bold block">
                            2ND PLACE VANGUARD SQUAD
                          </span>
                          <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wide text-white leading-tight sm:leading-none break-words mt-1">
                            {runnerUp.teamName || runnerUp.teamId}
                          </h3>
                        </div>
                      </div>

                      {/* Runner-up Members Pills */}
                      {Array.isArray(runnerUp.members) && runnerUp.members.length > 0 && (
                        <div className="pt-1">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block mb-1.5">
                            VANGUARD OPERATIVES
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {runnerUp.members.map((m, i) => (
                              <span
                                key={m.memberId || i}
                                className="px-2 py-0.5 bg-black/60 border border-zinc-400/40 font-mono text-[11px] font-bold uppercase text-zinc-200"
                              >
                                {m.name || `OPERATIVE ${i + 1}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* #2 Telemetry Footer */}
                    <div className="mt-4 sm:mt-5 pt-3.5 border-t border-zinc-300/25 grid grid-cols-2 gap-2.5 sm:gap-3 font-mono">
                      <div className="p-2.5 bg-black/60 border border-zinc-400/35">
                        <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-zinc-400">
                          FINAL CREDITS
                        </span>
                        <span className="font-display text-xl sm:text-3xl text-zinc-200 leading-none mt-1 block">
                          {Number(runnerUp.credits || 0).toLocaleString()} CR
                        </span>
                      </div>
                      <div className="p-2.5 bg-black/60 border border-zinc-400/35">
                        <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-zinc-400">
                          CHALLENGES SOLVED
                        </span>
                        <span className="font-display text-xl sm:text-3xl text-white leading-none mt-1 block">
                          {Number(runnerUp.totalSolved || 0)} SOLVED
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SCROLLABLE ALL TEAM RANKINGS SECTION */}
              {allTeamRankings.length > 0 && (
                <div className="winner-footer-bar border-2 border-amber-400/50 bg-[#0B0B0F]/95 shadow-[0_0_40px_rgba(0,0,0,0.75)] overflow-hidden">
                  <div className="px-4 sm:px-6 py-3 bg-black border-b border-amber-400/40 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="font-condensed text-base sm:text-lg font-extrabold uppercase tracking-[0.18em] text-white">
                        ALL TEAM RANKINGS ({allTeamRankings.length} SQUADS)
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                      SCROLL TO VIEW FULL STANDINGS ↓
                    </span>
                  </div>

                  <div className="max-h-[38vh] sm:max-h-[320px] overflow-y-auto divide-y divide-white/10">
                    {allTeamRankings.map((row, idx) => {
                      const rankNum = Number(row.rank || idx + 1);
                      const rowTeamId = String(row.teamId || '').toUpperCase();
                      const isMySquad = myTeamIdUpper && rowTeamId === myTeamIdUpper;
                      const solvedCount = Number(
                        row.totalSolved ?? row.challengesSolved ?? 0
                      );
                      const creditsVal = Number(row.credits ?? 0);

                      return (
                        <div
                          key={row.teamId || idx}
                          className={`px-3.5 sm:px-6 py-3 flex items-center justify-between gap-3 font-mono transition-colors ${
                            isMySquad
                              ? 'bg-nexus-crimson/25 border-l-4 border-nexus-crimson'
                              : rankNum === 1
                                ? 'bg-amber-400/15 border-l-4 border-amber-400'
                                : rankNum === 2
                                  ? 'bg-zinc-300/10 border-l-4 border-zinc-300'
                                  : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-display text-lg sm:text-xl shrink-0 border ${
                                rankNum === 1
                                  ? 'bg-amber-400 text-nexus-ink border-white font-bold'
                                  : rankNum === 2
                                    ? 'bg-zinc-200 text-nexus-ink border-white font-bold'
                                    : rankNum === 3
                                      ? 'bg-amber-700 text-white border-amber-400/50'
                                      : 'bg-black/60 text-white/80 border-white/20'
                              }`}
                            >
                              #{rankNum}
                            </span>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-display text-lg sm:text-2xl uppercase tracking-wide text-white truncate">
                                  {row.teamName || row.teamId}
                                </span>
                                {isMySquad && (
                                  <span className="px-1.5 py-0.5 bg-nexus-crimson text-white text-[9px] font-bold uppercase tracking-wider">
                                    YOUR TEAM
                                  </span>
                                )}
                                {rankNum === 1 && (
                                  <span className="px-1.5 py-0.5 bg-amber-400 text-nexus-ink text-[9px] font-bold uppercase tracking-wider">
                                    CHAMPION
                                  </span>
                                )}
                                {rankNum === 2 && (
                                  <span className="px-1.5 py-0.5 bg-zinc-200 text-nexus-ink text-[9px] font-bold uppercase tracking-wider">
                                    RUNNER-UP
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-white/60 uppercase tracking-wider truncate">
                                [{row.teamId}] · {solvedCount} CHALLENGES SOLVED
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={`font-display text-xl sm:text-2xl leading-none block ${
                                rankNum === 1
                                  ? 'text-amber-400'
                                  : rankNum === 2
                                    ? 'text-zinc-200'
                                    : 'text-white'
                              }`}
                            >
                              {creditsVal.toLocaleString()} CR
                            </span>
                            <span className="text-[9px] text-white/50 uppercase tracking-widest">
                              TOTAL POINTS
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Widescreen Cinema Letterbox Bar */}
            <div className="relative z-20 w-full bg-black border-t-2 border-amber-400/60 px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-1 font-mono text-[9px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.24em] text-nexus-paper/60 text-center">
              <span>PROCLAMATION ISSUED BY CENTRAL COMMAND</span>
              <span>CONTROLLED BY ORGANIZER // FINAL STANDINGS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * Minimal, Atmospheric Pre-Game Lore & Standby Screen (Shown on HOME while waiting for Admin to start the game)
 */
export const NexusPreStartLoreChamber = ({ team, globalTimer }) => {
  const chamberRef = useRef(null);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const corePulseRef = useRef(null);

  useEffect(() => {
    if (!chamberRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.lore-fade-item', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });

      if (outerRingRef.current) {
        gsap.to(outerRingRef.current, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: 'none',
        });
      }
      if (innerRingRef.current) {
        gsap.to(innerRingRef.current, {
          rotation: -360,
          duration: 14,
          repeat: -1,
          ease: 'none',
        });
      }
      if (corePulseRef.current) {
        gsap.to(corePulseRef.current, {
          scale: 1.12,
          opacity: 0.85,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, chamberRef);
    return () => ctx.revert();
  }, []);

  const isEnded = globalTimer?.status === 'ENDED';

  return (
    <div
      ref={chamberRef}
      className="min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center py-4 sm:py-6"
    >
      <div className="nexus-editorial-box w-full max-w-3xl border-3 sm:border-4 border-nexus-ink bg-nexus-ink text-nexus-paper px-4 py-8 sm:px-12 sm:py-16 relative overflow-hidden shadow-brutal-crimson text-center flex flex-col items-center justify-center">
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(225, 29, 46, 0.22) 0%, rgba(10, 10, 12, 0) 68%)',
          }}
        />

        {/* Animated GSAP Orbital Lock Emblem */}
        <div className="lore-fade-item relative w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center mb-5 sm:mb-6">
          <div
            ref={outerRingRef}
            className="absolute inset-0 rounded-full border-2 border-dashed border-nexus-crimson/50"
          />
          <div
            ref={innerRingRef}
            className="absolute inset-2.5 sm:inset-3 rounded-full border border-nexus-paper/25"
          />
          <div
            ref={corePulseRef}
            className="w-12 h-12 sm:w-20 sm:h-20 bg-nexus-crimson/20 border-2 border-nexus-crimson flex items-center justify-center shadow-[0_0_35px_rgba(225,29,46,0.55)]"
          >
            <Lock className="w-6 h-6 sm:w-9 sm:h-9 text-nexus-crimson" />
          </div>
        </div>

        {/* Status Pill */}
        <div className="lore-fade-item inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 bg-nexus-crimson text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.26em] mb-3 sm:mb-4">
          <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span>{isEnded ? 'TRANSMISSION CLOSED // ROUND ENDED' : 'WAITING FOR GAME TO START'}</span>
        </div>

        {/* Clean Hero Title */}
        <h1 className="lore-fade-item font-display text-4xl sm:text-7xl uppercase tracking-wide text-white leading-none">
          {isEnded ? (
            <>
              THE ARENA IS <span className="text-nexus-crimson">CLOSED</span>
            </>
          ) : (
            <>
              THE CITADEL IS <span className="text-nexus-crimson">SEALED</span>
            </>
          )}
        </h1>

        {/* Short, Punchy 1-Line Lore Message */}
        <p className="lore-fade-item font-editorial text-xs sm:text-base text-nexus-paper/75 max-w-lg mt-3 sm:mt-4 leading-relaxed px-1">
          {isEnded
            ? 'All sector vaults have been locked. Check the Leaderboard to view the final arena standings.'
            : 'NEXUS-OMEGA holds all sectors under lockdown. Stand by — your terminal will unlock automatically when the countdown begins.'}
        </p>

        {/* Minimal 3-Pill Telemetry Footer */}
        <div className="lore-fade-item mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-nexus-paper/15 w-full max-w-lg grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 font-mono text-xs">
          <div className="p-2.5 bg-black/50 border border-nexus-paper/15">
            <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/50">
              SQUAD
            </span>
            <span className="font-bold text-white uppercase truncate block mt-0.5">
              {team?.teamName || team?.teamId}
            </span>
          </div>

          <div className="p-2.5 bg-black/50 border border-nexus-paper/15">
            <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/50">
              CREDITS
            </span>
            <span className="font-bold text-nexus-crimson block mt-0.5">
              {Number(team?.credits || 1250).toLocaleString()} CR
            </span>
          </div>

          <div className="p-2.5 bg-black/50 border border-nexus-paper/15">
            <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/50">
              UPLINK
            </span>
            <span className="font-bold text-emerald-400 block mt-0.5">● READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicArenaOverlay;
