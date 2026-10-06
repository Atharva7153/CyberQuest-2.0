import React from 'react';
import { CrosshairMark } from '../components/CrosshairMark';

export const EditorialFrameLayout = ({ children, systemOnline = false }) => {
  return (
    <div className="min-h-screen nexus-paper-canvas relative overflow-hidden flex flex-col">
      {/* =================================================================
          DISTRESSED EDGE & TAPE FRAGMENTS (DIRECT POSTER VISUAL MOTIF)
         ================================================================= */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 w-3 sm:w-5 z-20 flex flex-col justify-between"
        aria-hidden="true"
      >
        <div className="h-20 bg-nexus-ink/85 w-2.5" />
        <div className="h-28 bg-nexus-crimson w-2 translate-y-12" />
        <div className="h-36 bg-nexus-ink w-3" />
      </div>

      <div
        className="pointer-events-none fixed inset-y-0 right-0 w-3 sm:w-5 z-20 flex flex-col justify-between items-end"
        aria-hidden="true"
      >
        <div className="h-16 bg-nexus-ink/80 w-2" />
        <div className="h-24 bg-nexus-crimson w-3 -translate-y-8" />
        <div className="h-32 bg-nexus-ink w-2.5" />
      </div>

      {/* =================================================================
          TOP INSTITUTIONAL & SYSTEM HEADER BAR
         ================================================================= */}
      <header className="relative z-10 border-b-2 border-nexus-ink bg-nexus-paper/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left System Identifier */}
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-nexus-ink text-nexus-paper font-mono text-[11px] font-bold tracking-widest uppercase">
              SYS // NEXUS-01
            </span>
            <CrosshairMark variant="ink" size={12} label="GRID_REF: 19.8762°N" />
          </div>

          {/* Center Institutional Poster Credit */}
          <div className="text-center hidden md:block">
            <p className="font-condensed text-sm font-extrabold uppercase tracking-wider text-nexus-ink">
              <span className="text-nexus-crimson font-black mr-1.5">MGMU</span>
              JAWAHARLAL NEHRU ENGINEERING COLLEGE · CHHATRAPATI SAMBHAJINAGAR
            </p>
          </div>

          {/* Right Live Link Indicator */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span
              className={`w-2 h-2 inline-block ${
                systemOnline ? 'bg-nexus-crimson animate-pulse' : 'bg-nexus-ink/40'
              }`}
            />
            <span className="uppercase tracking-wider font-semibold text-nexus-ink">
              {systemOnline ? 'CORE TELEMETRY: LINKED' : 'CORE TELEMETRY: SYNCING'}
            </span>
          </div>
        </div>
      </header>

      {/* =================================================================
          MAIN POSTER & TELEMETRY WORKSPACE
         ================================================================= */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-4">
        {children}
      </main>

      {/* =================================================================
          BOTTOM BRUTALIST FOOTER STRIP
         ================================================================= */}
      <footer className="relative z-10 border-t-2 border-nexus-ink bg-nexus-paper-aged">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-nexus-charcoal">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-nexus-crimson inline-block" />
            <span className="font-bold uppercase tracking-wider">
              NEXUS — THE LAST CHANCE // FOUNDATION BUILD v0.1.0
            </span>
          </div>
          <div className="flex items-center gap-4 text-nexus-muted">
            <span>NO AUTH / NO SCORING / FOUNDATION ONLY</span>
            <CrosshairMark variant="crimson" size={12} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EditorialFrameLayout;
