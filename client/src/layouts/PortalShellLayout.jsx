import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  LayoutGrid,
  Crosshair,
  Users,
  History,
  Cpu,
  LogOut,
  X,
} from 'lucide-react';
import { CrosshairMark } from '../components/CrosshairMark';
import { TopBarCreditsReadout } from '../components/ResistanceCreditsModule';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Canonical 5-item participant navigation:
 * 1. HOME
 * 2. CHALLENGES
 * 3. MY TEAM
 * 4. HISTORY
 * 5. NEXUS CORE
 */
export const PORTAL_NAV_ITEMS = [
  { id: 'HOME', label: 'HOME', shortLabel: 'HOME', icon: LayoutGrid, route: '/dashboard' },
  { id: 'CHALLENGES', label: 'CHALLENGES', shortLabel: 'CHALLENGES', icon: Crosshair, route: '/challenges' },
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
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
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

  const normalizedActiveSection =
    activeSection === 'DASHBOARD' || activeSection === 'PROGRESS'
      ? activeSection === 'PROGRESS'
        ? 'MY_TEAM'
        : 'HOME'
      : activeSection || 'HOME';

  const handleNavClick = (item) => {
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

  // Global Marathon Countdown Timer + any extra time purchased by the team
  const extraSeconds = (team?.activeAttempt?.extraTimeMinutes || 0) * 60;
  const [elapsedSeconds, setElapsedSeconds] = useState(1246);
  const shellRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
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

  const remainingSeconds = Math.max(0, 8100 + extraSeconds - elapsedSeconds);

  // Global Timer Visual Hierarchy: Normal (>10m), Warning (<=10m), Critical (<=2m)
  const timerState =
    remainingSeconds <= 120
      ? 'CRITICAL'
      : remainingSeconds <= 600
        ? 'WARNING'
        : 'NORMAL';

  const teamMeta = getTeamSizeMeta(team, onlineOperatives);

  const renderDesktopSidebar = () => (
    <div className="flex flex-col h-full justify-between bg-nexus-ink text-nexus-paper border-r-2 border-nexus-ink select-none">
      {/* Top Brand Header */}
      <div>
        <div className="p-5 border-b border-nexus-paper/15">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-wider uppercase text-nexus-paper leading-none">
              CYBER QUEST
            </span>
            <CrosshairMark variant="crimson" size={12} />
          </div>
          <p className="font-condensed text-xs font-extrabold uppercase tracking-[0.26em] text-nexus-crimson mt-1">
            NEXUS — THE LAST CHANCE
          </p>
        </div>

        {/* 5 Primary Navigation Items */}
        <nav aria-label="Cyber Quest Navigation" className="p-3 space-y-1.5">
          {PORTAL_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = normalizedActiveSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative w-full flex items-center justify-between px-4 py-3 font-condensed text-base font-bold uppercase tracking-[0.14em] text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-nexus-crimson ${
                  isActive
                    ? 'text-white'
                    : 'text-nexus-paper/75 hover:text-nexus-paper hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portal-active-nav-bg"
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 bg-nexus-crimson border border-white/25"
                    aria-hidden="true"
                  />
                )}

                <span className="relative z-10 flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Team Status & Logout */}
      <div className="p-4 border-t border-nexus-paper/15 space-y-3 bg-black/30">
        <div className="space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-nexus-paper/60 uppercase tracking-widest text-[10px]">
              {teamMeta.formatLabel} STATUS
            </span>
            <span className="text-nexus-crimson font-bold text-[10px]">
              {teamMeta.onlineSummary}
            </span>
          </div>
          <p className="font-condensed text-base font-extrabold uppercase tracking-wider text-nexus-paper truncate">
            {team?.teamName || team?.teamId}
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full py-2.5 px-3 border border-nexus-paper/30 hover:border-nexus-crimson hover:bg-nexus-crimson text-nexus-paper hover:text-white font-mono text-xs uppercase tracking-widest flex items-center justify-between transition-colors cursor-pointer"
        >
          <span>LOG OUT</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div
      ref={shellRef}
      className="min-h-screen nexus-paper-canvas flex flex-col lg:flex-row relative overflow-x-hidden"
    >
      {/* ===================================================================
          DESKTOP SIDEBAR
         =================================================================== */}
      <aside className="hidden lg:block w-60 shrink-0 sticky top-0 h-screen z-30">
        {renderDesktopSidebar()}
      </aside>

      {/* ===================================================================
          MAIN WORKSPACE: STICKY TOP BAR + PAGE CONTENT + MOBILE BOTTOM NAV
         =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        {/* STICKY TOP BAR: CYBER QUEST | TIME REMAINING | CREDITS | TEAM NAME */}
        <header className="sticky top-0 z-20 bg-nexus-paper/95 backdrop-blur-xs border-b-2 border-nexus-ink">
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
                  CYBER QUEST // {teamMeta.formatLabel}
                </span>
                <p className="font-condensed text-base sm:text-xl font-extrabold uppercase tracking-wider text-nexus-ink truncate">
                  {team?.teamName || team?.teamId}
                </p>
              </div>
            </div>

            {/* Center: GLOBAL TIMER (Normal / Warning / Critical) */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-nexus-muted">
                TIME REMAINING
              </span>
              <p
                className={`font-mono text-lg sm:text-2xl md:text-3xl font-bold tracking-wider leading-tight ${
                  timerState === 'CRITICAL'
                    ? 'bg-nexus-crimson text-white px-2 py-0.5 animate-pulse'
                    : timerState === 'WARNING'
                      ? 'text-nexus-crimson'
                      : 'text-nexus-ink'
                }`}
              >
                {formatCountdown(remainingSeconds)}
              </p>
            </div>

            {/* Right: CREDITS + Mobile Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
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

        {/* GAME NOTIFICATIONS (Clean human-readable toast) */}
        <div
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-5 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        >
          <AnimatePresence>
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className={`pointer-events-auto border-2 border-nexus-ink shadow-brutal p-3 font-mono text-xs flex items-start justify-between gap-3 ${
                  notif.variant === 'crimson'
                    ? 'bg-nexus-crimson text-white'
                    : 'bg-nexus-ink text-nexus-paper'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] opacity-75 block uppercase">
                    UPDATE · {notif.timestamp}
                  </span>
                  <p className="font-semibold">{notif.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onDismissNotification(notif.id)}
                  className="opacity-75 hover:opacity-100 cursor-pointer"
                  aria-label="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* MAIN PAGE CONTENT */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* ===================================================================
          MOBILE BOTTOM NAVIGATION BAR (5 ITEMS: HOME, CHALLENGES, MY TEAM, HISTORY, CORE)
         =================================================================== */}
      <nav
        aria-label="Mobile Primary Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-nexus-ink text-nexus-paper border-t-2 border-nexus-ink grid grid-cols-5"
      >
        {PORTAL_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = normalizedActiveSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`py-2.5 px-1 flex flex-col items-center justify-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                isActive
                  ? 'bg-nexus-crimson text-white'
                  : 'text-nexus-paper/70 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate max-w-full">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default PortalShellLayout;
