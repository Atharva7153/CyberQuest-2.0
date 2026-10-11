import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CrosshairMark } from '../components/CrosshairMark';
import { ThemeToggleButton } from '../components/ThemeToggleButton';

export const EditorialFrameLayout = ({ children, systemOnline = false }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen nexus-paper-canvas relative overflow-x-hidden flex flex-col">
      <a
        href="#nexus-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-nexus-crimson focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:border-2 focus:border-nexus-ink"
      >
        Skip to main content
      </a>

      {/* Distressed Edge Fragments */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 w-2 sm:w-4 z-20 flex flex-col justify-between"
        aria-hidden="true"
      >
        <div className="h-20 bg-nexus-ink/85 w-2" />
        <div className="h-28 bg-nexus-crimson w-1.5 translate-y-12" />
        <div className="h-36 bg-nexus-ink w-2.5" />
      </div>

      <div
        className="pointer-events-none fixed inset-y-0 right-0 w-2 sm:w-4 z-20 flex flex-col justify-between items-end"
        aria-hidden="true"
      >
        <div className="h-16 bg-nexus-ink/80 w-1.5" />
        <div className="h-24 bg-nexus-crimson w-2.5 -translate-y-8" />
        <div className="h-32 bg-nexus-ink w-2" />
      </div>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 border-b-2 border-nexus-ink bg-nexus-paper/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-2.5 py-1 bg-nexus-ink text-nexus-paper font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-nexus-crimson transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nexus-crimson"
            >
              CYBER QUEST // NEXUS
            </Link>
            <span className="hidden sm:inline-flex">
              <CrosshairMark variant="ink" size={12} label="THE LAST CHANCE" />
            </span>
          </div>

          <div className="text-center hidden xl:block">
            <p className="font-condensed text-sm font-extrabold uppercase tracking-wider text-nexus-ink">
              <span className="text-nexus-crimson font-black mr-1.5">MGMU</span>
              JAWAHARLAL NEHRU ENGINEERING COLLEGE · CHHATRAPATI SAMBHAJINAGAR
            </p>
          </div>

          <nav
            aria-label="Primary NEXUS Navigation"
            className="flex items-center gap-3 sm:gap-4 font-mono text-[11px]"
          >
            {location.pathname !== '/' && (
              <Link
                to="/"
                className="uppercase tracking-wider font-bold text-nexus-ink hover:text-nexus-crimson transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nexus-crimson"
              >
                PUBLIC DOSSIER
              </Link>
            )}

            <Link
              to="/login"
              className={`px-3 py-1 border border-nexus-ink uppercase tracking-wider font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nexus-crimson ${
                location.pathname === '/login' || location.pathname === '/dashboard'
                  ? 'bg-nexus-ink text-nexus-paper'
                  : 'bg-nexus-crimson text-white hover:bg-nexus-ink'
              }`}
            >
              ENTER THE SYSTEM
            </Link>

            <ThemeToggleButton />

            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-nexus-ink/25">
              <span
                className={`w-2 h-2 inline-block ${
                  systemOnline ? 'bg-nexus-crimson animate-pulse' : 'bg-nexus-ink/40'
                }`}
                aria-hidden="true"
              />
              <span className="uppercase tracking-wider font-semibold text-nexus-ink">
                {systemOnline ? 'CORE: ONLINE' : 'CORE: SYNC'}
              </span>
            </div>
          </nav>
        </div>
      </header>

      <main id="nexus-main-content" className="relative z-10 flex-1 w-full">
        {children}
      </main>

      <footer className="relative z-10 border-t-2 border-nexus-ink bg-nexus-paper-aged">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-nexus-charcoal">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-nexus-crimson inline-block" aria-hidden="true" />
            <span className="font-bold uppercase tracking-wider">
              CYBER QUEST — NEXUS: THE LAST CHANCE // MGMU JNEC SWAYAMBHAV 2026
            </span>
          </div>
          <div className="flex items-center gap-4 text-nexus-muted">
            <span>KNOWLEDGE · STRATEGY · RISK · TEAMWORK · DECISION MAKING</span>
            <CrosshairMark variant="crimson" size={12} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EditorialFrameLayout;
