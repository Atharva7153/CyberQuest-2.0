import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  LayoutGrid,
  Crosshair,
  Trophy,
  Users,
  History,
  Cpu,
  Lock,
  LogOut,
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { CrosshairMark } from '../components/CrosshairMark';
import { TopBarCreditsReadout } from '../components/ResistanceCreditsModule';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import {
  CinematicArenaOverlay,
  NexusPreStartLoreChamber,
} from '../components/CinematicArenaOverlay';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getStoredOperative } from '../services/authService';
import { socketClient, NEXUS_SOCKET_EVENTS } from '../socket/socketClient';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.port !== '5173'
    ? window.location.origin
    : 'http://localhost:5050');

/**
 * Canonical 6-item participant navigation:
 * 1. HOME
 * 2. CHALLENGES
 * 3. LEADERBOARD
 * 4. MY TEAM
 * 5. HISTORY
 * 6. NEXUS CORE
 */
export const PORTAL_NAV_ITEMS = [
  { id: 'HOME', label: 'HOME', shortLabel: 'HOME', icon: LayoutGrid, route: '/dashboard' },
  { id: 'CHALLENGES', label: 'CHALLENGES', shortLabel: 'CHALLENGES', icon: Crosshair, route: '/challenges' },
  { id: 'LEADERBOARD', label: 'LEADERBOARD', shortLabel: 'RANKS', icon: Trophy, route: '/leaderboard' },
  { id: 'MY_TEAM', label: 'MY TEAM', shortLabel: 'MY TEAM', icon: Users, route: '/progress' },
  { id: 'HISTORY', label: 'HISTORY', shortLabel: 'HISTORY', icon: History, route: '/history' },
  { id: 'NEXUS_CORE', label: 'NEXUS CORE', shortLabel: 'CORE', icon: Cpu, route: '/nexus-core' },
];

/**
 * Compute variable team size metadata (SOLO = 1, DUO = 2, TRIO = 3, SQUAD = 4).
 * Never assumes a hardcoded 4-member team.
 */
export const getTeamSizeMeta = (team, onlineOperatives = 1) => {
  const members = Array.isArray(team?.members) ? team.members : [];
  const totalMembers = Math.max(1, members.length || 1);

  let formatLabel = 'SQUAD';
  if (totalMembers === 1) formatLabel = 'SOLO';
  else if (totalMembers === 2) formatLabel = 'DUO';
  else if (totalMembers === 3) formatLabel = 'TRIO';

  const onlineCount = Math.min(
    totalMembers,
    Math.max(1, Number(onlineOperatives) || 1)
  );

  return {
    members,
    totalMembers,
    onlineCount,
    formatLabel,
    onlineSummary: `${onlineCount} / ${totalMembers} ONLINE`,
  };
};

const formatCountdown = (totalSeconds) => {
  const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(
    secs
  ).padStart(2, '0')}`;
};

export const PortalShellLayout = ({
  team,
  activeSection,
  onSelectSection,
  onlineOperatives,
  lastCreditChange,
  notifications = [],
  onDismissNotification,
  onLogout,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Global Round Countdown Timer synced with Server Global Timer + any extra time
  const extraSeconds = (team?.activeAttempt?.extraTimeMinutes || 0) * 60;
  const [serverGlobalTimer, setServerGlobalTimer] = useState(null);
  const [serverCoreStatus, setServerCoreStatus] = useState(null);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const shellRef = useRef(null);

  useEffect(() => {
    let active = true;

    const fetchDisplaySync = () => {
      fetch(`${API_BASE_URL}/api/display`)
        .then((r) => r.json())
        .then((data) => {
          if (!active) return;
          if (data?.globalTimer) {
            setServerGlobalTimer(data.globalTimer);
          }
          if (data?.coreStatus) {
            setServerCoreStatus(data.coreStatus);
          }
        })
        .catch(() => {});
    };

    fetchDisplaySync();
    const pollInterval = setInterval(fetchDisplaySync, 1500);

    const handleGlobalUpdate = (payload) => {
      if (payload?.globalTimer) {
        setServerGlobalTimer(payload.globalTimer);
      }
      if (payload?.coreStatus) {
        setServerCoreStatus(payload.coreStatus);
      }
    };

    if (!socketClient.connected) {
      socketClient.connect();
    }

    socketClient.on(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleGlobalUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleGlobalUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.TIMER.UPDATE, handleGlobalUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.ADMIN.EVENT_ACTION, handleGlobalUpdate);

    return () => {
      active = false;
      clearInterval(pollInterval);
      socketClient.off(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleGlobalUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleGlobalUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.TIMER.UPDATE, handleGlobalUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.ADMIN.EVENT_ACTION, handleGlobalUpdate);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.portal-bg-grid-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.75,
        ease: 'power2.out',
      });
    }, shellRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  let baseRemainingSeconds = 2700;
  let roundStatus = 'PAUSED';
  if (serverGlobalTimer) {
    roundStatus = serverGlobalTimer.status || 'PAUSED';
    // Automatically transition COUNTDOWN -> ACTIVE locally when countdownTargetTimestamp passes
    if (roundStatus === 'COUNTDOWN' && serverGlobalTimer.countdownTargetTimestamp) {
      const cdTargetMs = new Date(serverGlobalTimer.countdownTargetTimestamp).getTime();
      if (nowMs >= cdTargetMs) {
        roundStatus = 'ACTIVE';
      }
    }
    if (roundStatus === 'ENDED') {
      baseRemainingSeconds = 0;
    } else if (roundStatus === 'ACTIVE' && serverGlobalTimer.targetTimestamp) {
      const targetMs = new Date(serverGlobalTimer.targetTimestamp).getTime();
      baseRemainingSeconds = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
    } else {
      baseRemainingSeconds = Math.max(0, Number(serverGlobalTimer.remainingSeconds ?? 2700));
    }
  }

  const remainingSeconds =
    roundStatus === 'ENDED' ? 0 : Math.max(0, baseRemainingSeconds + extraSeconds);

  // Global Timer Visual Hierarchy: Normal (>10m), Warning (<=10m), Critical (<=2m)
  const timerState =
    roundStatus !== 'ACTIVE'
      ? 'STOPPED'
      : remainingSeconds <= 120
        ? 'CRITICAL'
        : remainingSeconds <= 600
          ? 'WARNING'
          : 'NORMAL';

  const normalizedActiveSection =
    activeSection === 'DASHBOARD' || activeSection === 'PROGRESS'
      ? activeSection === 'PROGRESS'
        ? 'MY_TEAM'
        : 'HOME'
      : activeSection || 'HOME';

  const isNavItemLocked = (item) => {
    if (item.id === 'HOME') return false;
    if (roundStatus === 'ENDED' && item.id === 'LEADERBOARD') return false;
    return roundStatus !== 'ACTIVE';
  };

  const handleNavClick = (item) => {
    if (isNavItemLocked(item)) {
      navigate('/dashboard');
      if (onSelectSection) onSelectSection('HOME');
      return;
    }
    if (location.pathname === '/dashboard' && onSelectSection) {
      if (item.id === 'HOME') {
        navigate('/dashboard');
        onSelectSection('HOME');
        return;
      }
      if (item.id === 'CHALLENGES') {
        navigate('/dashboard?section=CHALLENGES');
        onSelectSection('CHALLENGES');
        return;
      }
    }
    if (item.route) {
      navigate(item.route);
    }
  };

  const teamMeta = getTeamSizeMeta(team, onlineOperatives);
  const currentOperative = getStoredOperative();
  const operativeDisplayName =
    currentOperative?.memberName || currentOperative?.name || 'PLAYER 1';
  const operativeSlotId = currentOperative?.memberId || 'OP-01';

  const renderDesktopSidebar = () => (
    <div className="nexus-portal-sidebar relative flex flex-col h-full justify-between bg-nexus-ink text-nexus-paper border-r border-nexus-ink select-none">
      {/* Subtle left red edge bar matching senior UI reference */}
      <div
        className="pointer-events-none absolute left-0 bottom-0 w-[3px] h-40 bg-nexus-crimson"
        aria-hidden="true"
      />

      {/* Top Brand Header */}
      <div>
        <div className="p-5 border-b border-nexus-paper/15">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-wider uppercase text-nexus-paper leading-none">
              CYBER QUEST <span className="text-nexus-crimson">NEXUS</span>
            </span>
            <CrosshairMark variant="crimson" size={12} />
          </div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-nexus-paper/60 mt-1.5">
            THE LAST CHANCE // PORTAL
          </p>
        </div>

        {/* 6 Primary Navigation Items (Locked except HOME before round starts) */}
        <nav aria-label="Cyber Quest Navigation" className="p-3 space-y-1.5">
          {PORTAL_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const locked = isNavItemLocked(item);
            const isActive = !locked && normalizedActiveSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                title={locked ? 'Locked until the Organizer starts the game' : item.label}
                className={`relative w-full flex items-center justify-between px-4 py-3 font-condensed text-base font-bold uppercase tracking-[0.14em] text-left transition-colors focus-visible:outline-2 focus-visible:outline-nexus-crimson ${
                  locked
                    ? 'text-nexus-paper/35 cursor-not-allowed bg-black/25'
                    : isActive
                      ? 'text-white cursor-pointer'
                      : 'text-nexus-paper/70 hover:text-white hover:bg-white/5 cursor-pointer'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portal-active-nav-bg"
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 bg-nexus-crimson border border-nexus-crimson"
                    aria-hidden="true"
                  />
                )}

                <span className="relative z-10 flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </span>

                {locked && (
                  <span className="relative z-10 inline-flex items-center gap-1 px-1.5 py-0.5 bg-white/10 text-nexus-paper/50 font-mono text-[9px] font-bold">
                    <Lock className="w-3 h-3" />
                    LOCKED
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Team Status & Logout */}
      <div className="p-4 border-t border-nexus-paper/15 space-y-3 bg-black/40">
        <div className="p-3 border border-nexus-paper/15 bg-black/60 border-l-2 border-l-nexus-crimson space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-nexus-paper/60 uppercase tracking-widest text-[9px]">
              LOGGED IN ({teamMeta.formatLabel})
            </span>
            <span className="text-nexus-crimson font-bold text-[9px]">
              ● {teamMeta.onlineSummary}
            </span>
          </div>
          <p className="font-condensed text-base font-extrabold uppercase tracking-wider text-white truncate">
            {team?.teamName || team?.teamId}
          </p>
          <p className="text-[10px] text-emerald-400 font-bold uppercase truncate">
            YOU: {operativeDisplayName} ({operativeSlotId})
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full py-2.5 px-3 border border-nexus-paper/20 bg-black hover:border-nexus-crimson hover:bg-nexus-crimson text-nexus-paper hover:text-white font-mono text-[11px] font-bold uppercase tracking-widest flex items-center justify-between transition-colors cursor-pointer group"
        >
          <span className="text-nexus-crimson group-hover:text-white">[LOGOUT]</span>
          <LogOut className="w-3.5 h-3.5 text-nexus-paper/70 group-hover:text-white" />
        </button>
      </div>
    </div>
  );

  return (
    <div
      ref={shellRef}
      className="min-h-screen nexus-paper-canvas flex flex-col lg:flex-row relative"
    >
      {/* ===================================================================
          DESKTOP SIDEBAR (FIXED / STICKY FULL-HEIGHT VIEWPORT)
         =================================================================== */}
      <aside className="hidden lg:block w-60 shrink-0 fixed inset-y-0 left-0 h-screen z-30">
        {renderDesktopSidebar()}
      </aside>
      {/* Layout spacer matching fixed sidebar width on desktop */}
      <div className="hidden lg:block w-60 shrink-0" aria-hidden="true" />

      {/* ===================================================================
          MAIN WORKSPACE: STICKY TOP BAR + PAGE CONTENT + MOBILE BOTTOM NAV
         =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        {/* STICKY TOP BAR: CYBER QUEST | TIME REMAINING | CREDITS | TEAM NAME */}
        <header className="nexus-portal-topbar sticky top-0 z-20 bg-nexus-paper/95 backdrop-blur-xs border-b border-nexus-ink">
          <div className="portal-bg-grid-line h-[2px] w-full bg-nexus-crimson" />
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            {/* Left: CYBER QUEST & TEAM NAME */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="lg:hidden px-2 py-1 bg-nexus-ink text-nexus-paper font-display text-lg uppercase tracking-wider leading-none shrink-0 cursor-pointer"
              >
                CQ
              </button>
              <div className="min-w-0">
                <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-nexus-muted">
                  {team?.teamName || team?.teamId} // YOU: {operativeDisplayName}
                </span>
                <p className="font-condensed text-base sm:text-xl font-extrabold uppercase tracking-wider text-nexus-ink truncate">
                  {team?.teamName || team?.teamId}
                </p>
              </div>
            </div>

            {/* Center: GLOBAL TIMER (Stopped / Normal / Warning / Critical) */}
            <div className="flex flex-col items-center">
              <span
                className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] ${
                  roundStatus !== 'ACTIVE' ? 'text-nexus-crimson' : 'text-nexus-muted'
                }`}
              >
                {roundStatus === 'PAUSED'
                  ? '● ROUND TIMER STOPPED'
                  : roundStatus === 'ENDED'
                    ? '● ROUND ENDED'
                    : 'TIME REMAINING'}
              </span>
              <p
                className={`font-mono text-lg sm:text-2xl md:text-3xl font-bold tracking-wider leading-tight ${
                  timerState === 'CRITICAL'
                    ? 'bg-nexus-crimson text-white px-2 py-0.5 animate-pulse'
                    : timerState === 'WARNING' || timerState === 'STOPPED'
                      ? 'text-nexus-crimson'
                      : 'text-nexus-ink'
                }`}
              >
                {formatCountdown(remainingSeconds)}
              </p>
            </div>

            {/* Right: CREDITS + Theme Toggle + Mobile Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggleButton />
              <TopBarCreditsReadout
                credits={team?.credits}
                lastCreditChange={lastCreditChange}
              />
              <button
                type="button"
                onClick={onLogout}
                aria-label="Log out"
                title="Log out"
                className="lg:hidden p-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-crimson hover:text-white text-nexus-ink transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* GAME NOTIFICATIONS (High-Impact Colorful Tactical Popups) */}
        <div
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-6 inset-x-3 sm:inset-x-auto sm:right-4 z-50 flex flex-col gap-2.5 sm:gap-3 sm:max-w-md sm:w-full pointer-events-none"
        >
          <AnimatePresence>
            {notifications.map((notif) => {
              const summaryUpper = String(notif.summary || '').toUpperCase();
              const isSuccessNotif =
                Number(notif.creditsDelta) > 0 ||
                summaryUpper.includes('SOLVED') ||
                summaryUpper.includes('CLAIMED') ||
                summaryUpper.includes('SUCCESS');
              const isFailNotif =
                summaryUpper.includes('FAILED') ||
                summaryUpper.includes('TIMEOUT') ||
                summaryUpper.includes('ABANDONED') ||
                notif.variant === 'crimson';

              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 18, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={`pointer-events-auto border-3 sm:border-4 border-nexus-ink p-3 sm:p-4 font-mono text-xs flex items-start justify-between gap-2.5 sm:gap-3 ${
                    isSuccessNotif
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                      : isFailNotif
                        ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)]'
                        : 'bg-nexus-ink text-nexus-paper shadow-brutal-crimson'
                  }`}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-white/60 bg-black/25 flex items-center justify-center shrink-0 mt-0.5">
                      {isSuccessNotif ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : isFailNotif ? (
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-nexus-crimson" />
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-black/35 border border-white/30 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider sm:tracking-widest">
                          {isSuccessNotif
                            ? '✓ MISSION SUCCESS'
                            : isFailNotif
                              ? '✕ CONTAINMENT ALERT'
                              : 'SQUAD TELEMETRY'}
                        </span>
                        <span className="text-[10px] opacity-80">{notif.timestamp}</span>
                      </div>
                      <p className="font-bold text-xs sm:text-sm leading-snug break-words">
                        {notif.summary}
                      </p>
                      {Number(notif.creditsDelta) !== 0 && (
                        <span className="inline-block px-2 py-0.5 bg-black/40 border border-white/40 font-display text-base sm:text-lg tracking-wider">
                          {Number(notif.creditsDelta) > 0
                            ? `+${notif.creditsDelta} CR`
                            : `${notif.creditsDelta} CR`}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDismissNotification(notif.id)}
                    className="p-1 border border-white/30 bg-black/20 hover:bg-black/50 opacity-90 hover:opacity-100 cursor-pointer shrink-0"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* MAIN PAGE CONTENT (Locked to Lore Standby Chamber when game hasn't started yet) */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {roundStatus !== 'ACTIVE' &&
          !(roundStatus === 'ENDED' && normalizedActiveSection === 'LEADERBOARD') ? (
            <NexusPreStartLoreChamber
              team={team}
              onlineOperatives={onlineOperatives}
              globalTimer={serverGlobalTimer}
            />
          ) : (
            children
          )}
        </main>
      </div>

      {/* ===================================================================
          MOBILE BOTTOM NAVIGATION BAR (6 ITEMS: LOCKED EXCEPT HOME BEFORE START)
         =================================================================== */}
      <nav
        aria-label="Mobile Primary Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-nexus-ink text-nexus-paper border-t-2 border-nexus-ink grid grid-cols-6"
      >
        {PORTAL_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const locked = isNavItemLocked(item);
          const isActive = !locked && normalizedActiveSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`py-2 px-0.5 flex flex-col items-center justify-center gap-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-wider transition-colors ${
                locked
                  ? 'text-nexus-paper/30 cursor-not-allowed bg-black/30'
                  : isActive
                    ? 'bg-nexus-crimson text-white cursor-pointer'
                    : 'text-nexus-paper/70 hover:text-white cursor-pointer'
              }`}
            >
              {locked ? (
                <Lock className="w-3.5 h-3.5 shrink-0 opacity-60" />
              ) : (
                <Icon className="w-4 h-4 shrink-0" />
              )}
              <span className="truncate max-w-full">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* ===================================================================
          CINEMATIC LAUNCH COUNTDOWN, "BOOM" REVEAL & WINNER PROCLAMATION
         =================================================================== */}
      <CinematicArenaOverlay
        globalTimer={serverGlobalTimer}
        coreStatus={serverCoreStatus}
        team={team}
        onlineOperatives={onlineOperatives}
      />
    </div>
  );
};

export default PortalShellLayout;
