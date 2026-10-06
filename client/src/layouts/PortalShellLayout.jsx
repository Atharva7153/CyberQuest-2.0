import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  LayoutGrid,
  Crosshair,
  Users,
  Coins,
  Send,
  Zap,
  BarChart3,
  Cpu,
  LogOut,
  Menu,
  X,
  Radio,
} from 'lucide-react';
import { CrosshairMark } from '../components/CrosshairMark';
import { TopBarCreditsReadout } from '../components/ResistanceCreditsModule';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const PORTAL_NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'DASHBOARD', icon: LayoutGrid, code: '01' },
  { id: 'CHALLENGES', label: 'CHALLENGES', icon: Crosshair, code: '02' },
  { id: 'MY_TEAM', label: 'MY TEAM', icon: Users, code: '03' },
  { id: 'CREDITS', label: 'CREDITS', icon: Coins, code: '04' },
  { id: 'SUBMISSIONS', label: 'SUBMISSIONS', icon: Send, code: '05' },
  { id: 'ABILITIES', label: 'ABILITIES', icon: Zap, code: '06' },
  { id: 'PROGRESS', label: 'PROGRESS', icon: BarChart3, code: '07' },
  { id: 'NEXUS_CORE', label: 'NEXUS CORE', icon: Cpu, code: '08' },
];

const formatCountdown = (totalSeconds) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(
    secs
  ).padStart(2, '0')}`;
};

export const PortalShellLayout = ({
  team,
  activeSection,
  onSelectSection,
  socketConnected,
  joinedRoom,
  onlineOperatives,
  lastCreditChange,
  notifications = [],
  onDismissNotification,
  onLogout,
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Base marathon timer (2h 15m = 8100s) + any extra time purchased by the team
  const extraSeconds = (team?.activeAttempt?.extraTimeMinutes || 0) * 60;
  const [elapsedSeconds, setElapsedSeconds] = useState(1238);

  const shellRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP: Only major dashboard background/cinematic frame elements on initial load
  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.portal-bg-grid-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.inOut',
      });
    }, shellRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const remainingSeconds = Math.max(0, 8100 + extraSeconds - elapsedSeconds);

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-nexus-ink text-nexus-paper border-r-2 border-nexus-ink select-none">
      {/* Top Portal Identity */}
      <div>
        <div className="p-5 border-b border-nexus-paper/15">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-wider uppercase text-nexus-paper leading-none">
              CYBER QUEST
            </span>
            <CrosshairMark variant="crimson" size={12} />
          </div>
          <p className="font-condensed text-sm font-extrabold uppercase tracking-[0.26em] text-nexus-crimson mt-1">
            NEXUS CORE
          </p>
        </div>

        {/* 8 Portal Navigation Items (Framer Motion active indicator) */}
        <nav aria-label="NEXUS Portal Navigation" className="p-3 space-y-1">
          {PORTAL_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectSection(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`relative w-full flex items-center justify-between px-3.5 py-2.5 font-condensed text-base font-bold uppercase tracking-[0.14em] text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-nexus-crimson ${
                  isActive
                    ? 'text-white'
                    : 'text-nexus-paper/70 hover:text-nexus-paper hover:bg-white/5'
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

                <span className="relative z-10 font-mono text-[10px] opacity-75">
                  {item.code}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom NEXUS CORE STATUS & Room Sync Footer */}
      <div className="p-4 border-t border-nexus-paper/15 space-y-3 bg-black/30">
        <div className="space-y-1 font-mono text-[11px]">
          <p className="text-nexus-paper/60 uppercase tracking-widest text-[10px]">
            NEXUS CORE STATUS
          </p>
          <div className="flex items-center justify-between">
            <span className="text-nexus-crimson font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span
                className={`w-2 h-2 inline-block ${
                  socketConnected ? 'bg-nexus-crimson animate-pulse' : 'bg-white/30'
                }`}
              />
              {team?.status || 'ACTIVE'}
            </span>
            <span className="text-nexus-paper/80 text-[10px]">
              {onlineOperatives}/4 ONLINE
            </span>
          </div>
          <p className="text-[10px] text-nexus-paper/50 truncate pt-0.5">
            ROOM // {joinedRoom || `team:${team?.teamId}`}
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full py-2 px-3 border border-nexus-paper/30 hover:border-nexus-crimson hover:bg-nexus-crimson text-nexus-paper hover:text-white font-mono text-xs uppercase tracking-widest flex items-center justify-between transition-colors cursor-pointer"
        >
          <span>EXIT TERMINAL</span>
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
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen z-30">
        {renderSidebarContent()}
      </aside>

      {/* ===================================================================
          MOBILE SIDEBAR DRAWER (Framer Motion transition)
         =================================================================== */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ===================================================================
          RIGHT WORKSPACE: TOP SYSTEM BAR + MAIN CONTENT + STATUS PANELS
         =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP SYSTEM BAR */}
        <header className="sticky top-0 z-20 bg-nexus-paper/95 border-b-2 border-nexus-ink">
          <div className="portal-bg-grid-line h-[2px] w-full bg-nexus-crimson" />
          <div className="px-4 sm:px-8 py-3.5 grid grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* Mobile Menu Trigger + Active View Title */}
            <div className="col-span-2 lg:col-span-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen((v) => !v)}
                aria-label="Toggle Portal Sidebar"
                className="lg:hidden p-2 border-2 border-nexus-ink bg-nexus-paper-elevated text-nexus-ink cursor-pointer"
              >
                {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  <Radio className="w-3 h-3 text-nexus-crimson animate-pulse" />
                  <span>SYNCED // {joinedRoom || `team:${team?.teamId}`}</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-nexus-ink leading-none mt-0.5">
                  {PORTAL_NAV_ITEMS.find((i) => i.id === activeSection)?.label || 'DASHBOARD'}
                </h1>
              </div>
            </div>

            {/* Center: TIME REMAINING Countdown */}
            <div className="col-span-1 lg:col-span-4 flex flex-col lg:items-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-nexus-muted">
                TIME REMAINING
              </span>
              <p className="font-mono text-xl sm:text-3xl font-bold tracking-wider text-nexus-crimson leading-tight">
                {formatCountdown(remainingSeconds)}
              </p>
            </div>

            {/* Right: TEAM DESIGNATION & RESISTANCE CREDITS */}
            <div className="col-span-1 lg:col-span-4 flex items-center justify-end gap-4 sm:gap-6">
              <div className="text-right hidden sm:block">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  TEAM
                </span>
                <span className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-ink">
                  {team?.teamName || team?.teamId}
                </span>
              </div>

              <TopBarCreditsReadout
                credits={team?.credits}
                lastCreditChange={lastCreditChange}
              />
            </div>
          </div>
        </header>

        {/* REAL-TIME SQUAD NOTIFICATIONS (Framer Motion) */}
        <div
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
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
                  <span className="text-[10px] opacity-75 block">
                    [{notif.timestamp}] TEAM_STATE_SYNC
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

        {/* MAIN PORTAL CONTENT */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default PortalShellLayout;
