import React from 'react';
import { Calendar, Clock, Hourglass, MapPin, Users } from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';

export const NexusPosterHero = () => {
  return (
    <section className="relative pt-4 pb-8 select-none">
      {/* =================================================================
          1. TOP EDITORIAL OVERLINE: A STORY DRIVEN COMPETITIVE MARATHON
         ================================================================= */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
        <span className="h-[1.5px] flex-1 max-w-[180px] bg-nexus-ink/60" />
        <p className="font-condensed text-xs sm:text-sm md:text-base font-semibold uppercase tracking-editorial text-nexus-ink text-center">
          A STORY DRIVEN COMPETITIVE MARATHON
        </p>
        <span className="h-[1.5px] flex-1 max-w-[180px] bg-nexus-ink/60" />
      </div>

      {/* =================================================================
          2. COLOSSAL BRUTALIST MASTHEAD: N E X U S
         ================================================================= */}
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Technical Grid & Glitch Hairline Extensions */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-between"
          aria-hidden="true"
        >
          {/* Left glitch lines */}
          <div className="hidden sm:flex flex-col gap-3 -ml-4">
            <span className="w-16 h-[2px] bg-nexus-ink" />
            <span className="w-24 h-[2px] bg-nexus-crimson -ml-4" />
            <span className="w-12 h-[1.5px] bg-nexus-ink ml-3" />
          </div>
          {/* Right glitch lines */}
          <div className="hidden sm:flex flex-col items-end gap-3 -mr-4">
            <span className="w-14 h-[2px] bg-nexus-crimson" />
            <span className="w-24 h-[2px] bg-nexus-ink -mr-3" />
            <span className="w-16 h-[1.5px] bg-nexus-crimson mr-2" />
          </div>
        </div>

        {/* Red Rising Sun Behind the 'N' */}
        <div className="relative inline-block">
          <div
            className="pointer-events-none absolute -top-4 left-[10%] sm:left-[12%] w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-nexus-crimson opacity-95"
            aria-hidden="true"
          >
            {/* Subtle horizontal scan cuts across the small crimson sun */}
            <div className="w-full h-[2px] bg-nexus-paper mt-3 opacity-60" />
            <div className="w-full h-[1.5px] bg-nexus-paper mt-2 opacity-40" />
          </div>

          {/* Main NEXUS Display Typography */}
          <h1
            className="relative z-10 font-display text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[10.5rem] leading-[0.86] tracking-[0.04em] uppercase text-nexus-ink flex items-center justify-center"
            style={{
              textShadow: '3px 3px 0px rgba(17,17,17,0.12)',
            }}
          >
            <span className="relative inline-block px-0.5">
              N
              <span className="pointer-events-none absolute left-0 right-0 top-[44%] h-[3px] bg-nexus-paper" />
              <span className="pointer-events-none absolute -left-4 top-[62%] w-8 h-[2px] bg-nexus-crimson" />
            </span>
            <span className="relative inline-block px-0.5">
              E
              <span className="pointer-events-none absolute left-0 right-0 top-[28%] h-[2.5px] bg-nexus-paper" />
              <span className="pointer-events-none absolute left-2 right-0 bottom-[22%] h-[2px] bg-nexus-crimson" />
            </span>
            <span className="relative inline-block px-1 text-nexus-crimson">
              X
              {/* Diagonal white/paper slice across center of X */}
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 sm:w-12 h-[2.5px] bg-nexus-paper -rotate-45"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-10 sm:h-14 bg-nexus-ink/80"
                aria-hidden="true"
              />
            </span>
            <span className="relative inline-block px-0.5">
              U
              <span className="pointer-events-none absolute left-0 right-0 top-[52%] h-[3px] bg-nexus-paper" />
              <span className="pointer-events-none absolute -left-2 bottom-[30%] w-10 h-[2px] bg-nexus-crimson" />
            </span>
            <span className="relative inline-block px-0.5">
              S
              <span className="pointer-events-none absolute left-0 right-0 top-[36%] h-[2.5px] bg-nexus-paper" />
              <span className="pointer-events-none absolute -right-5 top-[48%] w-10 h-[2px] bg-nexus-crimson" />
            </span>
          </h1>
        </div>

        {/* Subtitle: THE LAST CHANCE */}
        <div className="mt-2 sm:mt-3 flex items-center justify-center gap-3">
          <CrosshairMark variant="crimson" size={12} />
          <p className="font-condensed text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.42em] text-nexus-crimson pl-[0.42em]">
            THE LAST CHANCE
          </p>
          <CrosshairMark variant="crimson" size={12} />
        </div>
      </div>

      {/* =================================================================
          3. CENTRAL DYSTOPIAN MONOLITH & MANIFESTO TRIPTYCH
         ================================================================= */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 relative">
        {/* LEFT MANIFESTO: HUMANITY HAS ONE LAST CHANCE. */}
        <div className="lg:col-span-3 flex flex-col items-start justify-center lg:pl-2 order-2 lg:order-1">
          <div className="font-mono text-[10px] tracking-widest uppercase text-nexus-muted mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-nexus-crimson inline-block" />
            DIRECTIVE // 01
          </div>
          <h2 className="font-condensed text-2xl sm:text-3xl xl:text-[2.1rem] font-extrabold uppercase leading-[1.02] tracking-wide text-nexus-ink">
            HUMANITY
            <br />
            HAS ONE
            <br />
            <span className="text-nexus-crimson">LAST CHANCE.</span>
          </h2>
          <div className="w-20 h-[2.5px] bg-nexus-crimson mt-3" />
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-nexus-muted">
            SECTOR: CHHATRAPATI SAMBHAJINAGAR
            <br />
            AI OVERLORD: NEXUS CORE ACTIVE
          </p>
        </div>

        {/* CENTER ILLUSTRATION: RED SUN + SPLIT AI MONOLITH + SQUAD OF 4 */}
        <div className="lg:col-span-6 order-1 lg:order-2 relative flex justify-center">
          <div className="relative w-full max-w-[500px] aspect-[16/13] flex items-end justify-center overflow-hidden border-b-2 border-nexus-ink">
            <svg
              viewBox="0 0 500 400"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="NEXUS Dystopian AI Monolith and Crimson Sun"
            >
              {/* Technical Grid Coordinates & Hairlines */}
              <line x1="25" y1="60" x2="475" y2="60" stroke="#111111" strokeOpacity="0.12" strokeDasharray="3 3" />
              <line x1="250" y1="10" x2="250" y2="395" stroke="#C8191E" strokeOpacity="0.35" strokeDasharray="2 4" />
              <line x1="70" y1="140" x2="70" y2="395" stroke="#111111" strokeOpacity="0.2" />
              <line x1="430" y1="120" x2="430" y2="395" stroke="#111111" strokeOpacity="0.2" />

              {/* Giant Crimson Sun Disc */}
              <circle cx="250" cy="185" r="132" fill="#C8191E" />
              <circle cx="250" cy="185" r="142" stroke="#C8191E" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="6 4" />

              {/* Central Vertical Blinding Core Glow Between Towers */}
              <rect x="228" y="55" width="44" height="260" fill="#F4F0E8" fillOpacity="0.22" />
              <rect x="242" y="53" width="16" height="260" fill="#F4F0E8" fillOpacity="0.55" />
              <line x1="250" y1="53" x2="250" y2="315" stroke="#FFFFFF" strokeWidth="3.5" />

              {/* Distant Dystopian Cityscape Silhouette (Left & Right Horizon) */}
              <g fill="#181715" opacity="0.88">
                <rect x="22" y="290" width="16" height="110" />
                <rect x="42" y="260" width="22" height="140" />
                <rect x="68" y="235" width="18" height="165" />
                <rect x="90" y="210" width="24" height="190" />
                <rect x="388" y="220" width="24" height="180" />
                <rect x="416" y="250" width="18" height="150" />
                <rect x="438" y="230" width="22" height="170" />
                <rect x="464" y="275" width="16" height="125" />
              </g>

              {/* LEFT BRUTALIST MONOLITH TOWER */}
              <polygon
                points="95,395 162,102 238,52 238,318 190,395"
                fill="#141312"
                stroke="#111111"
                strokeWidth="1.5"
              />
              {/* Left Monolith Architectural Panel Lines & Red Highlights */}
              <line x1="162" y1="102" x2="140" y2="395" stroke="#ECE7DF" strokeOpacity="0.22" strokeWidth="1.2" />
              <line x1="200" y1="78" x2="188" y2="365" stroke="#C8191E" strokeOpacity="0.55" strokeWidth="1.5" />
              <rect x="212" y="135" width="20" height="175" fill="#1F1D1B" />

              {/* RIGHT BRUTALIST MONOLITH + CYBERNETIC AI FACE PROFILE */}
              <polygon
                points="262,52 332,96 368,142 376,188 392,226 376,238 382,258 370,275 374,295 348,308 345,395 310,395 262,318"
                fill="#141312"
                stroke="#111111"
                strokeWidth="1.5"
              />
              {/* Inner Monolith Terrace next to Staircase */}
              <polygon points="262,215 304,202 316,395 262,318" fill="#22201E" />

              {/* Cybernetic AI Face Circuit Lines & Glowing Crimson Eye */}
              <line x1="332" y1="96" x2="310" y2="305" stroke="#ECE7DF" strokeOpacity="0.2" strokeWidth="1.2" />
              <polyline
                points="335,165 355,175 372,195 352,205 340,245"
                stroke="#ECE7DF"
                strokeOpacity="0.32"
                strokeWidth="1.2"
              />
              {/* Glowing Red AI Eye */}
              <polygon points="356,192 371,196 362,203" fill="#C8191E" />
              <circle cx="364" cy="197" r="2.5" fill="#FFFFFF" />
              <circle cx="364" cy="197" r="8" fill="#C8191E" fillOpacity="0.4" />

              {/* MONUMENTAL ASCENDING STAIRWAY */}
              <polygon points="184,398 228,285 272,285 316,398" fill="#D5CEC2" stroke="#111111" strokeWidth="1.5" />
              {/* Stair Steps */}
              <g stroke="#111111" strokeWidth="1.3">
                <line x1="225" y1="294" x2="275" y2="294" />
                <line x1="221" y1="304" x2="279" y2="304" />
                <line x1="217" y1="314" x2="283" y2="314" />
                <line x1="213" y1="325" x2="287" y2="325" />
                <line x1="208" y1="337" x2="292" y2="337" />
                <line x1="203" y1="350" x2="297" y2="350" />
                <line x1="197" y1="364" x2="303" y2="364" />
                <line x1="191" y1="379" x2="309" y2="379" />
              </g>
              {/* Crimson Reflection Down Center of Stairs */}
              <polygon points="242,285 258,285 270,398 230,398" fill="#C8191E" fillOpacity="0.22" />

              {/* SILHOUETTE OF THE 4 PARTICIPANTS (TEAM OF 4) AT BASE OF STAIRS */}
              {/* Operative 1 (Left) */}
              <g fill="#111111">
                <circle cx="178" cy="340" r="9" />
                <path d="M160,400 L164,354 C164,350 192,350 192,354 L196,400 Z" />
                <rect x="165" y="358" width="22" height="28" rx="3" fill="#1E1C1A" stroke="#ECE7DF" strokeOpacity="0.2" />
              </g>
              {/* Operative 2 (Center-Left) */}
              <g fill="#111111">
                <circle cx="224" cy="332" r="9.5" />
                <path d="M206,400 L210,346 C210,342 238,342 238,346 L242,400 Z" />
                <rect x="213" y="352" width="22" height="30" rx="3" fill="#1E1C1A" stroke="#ECE7DF" strokeOpacity="0.2" />
              </g>
              {/* Operative 3 (Center-Right) */}
              <g fill="#111111">
                <circle cx="272" cy="334" r="9.5" />
                <path d="M254,400 L258,348 C258,344 286,344 286,348 L290,400 Z" />
                <rect x="261" y="354" width="22" height="30" rx="3" fill="#1E1C1A" stroke="#ECE7DF" strokeOpacity="0.2" />
              </g>
              {/* Operative 4 (Right) */}
              <g fill="#111111">
                <circle cx="318" cy="342" r="9" />
                <path d="M300,400 L304,356 C304,352 332,352 332,356 L336,400 Z" />
                <rect x="307" y="360" width="22" height="28" rx="3" fill="#1E1C1A" stroke="#ECE7DF" strokeOpacity="0.2" />
              </g>

              {/* Glitch Fragments on Right Horizon (Matching Poster) */}
              <rect x="435" y="255" width="32" height="5" fill="#111111" />
              <rect x="458" y="268" width="28" height="35" fill="#C8191E" />
              <rect x="16" y="250" width="24" height="45" fill="#C8191E" />
            </svg>
          </div>
        </div>

        {/* RIGHT MANIFESTO: ENTER THE SYSTEM. OUTSMART THE AI. */}
        <div className="lg:col-span-3 flex flex-col lg:items-end justify-center lg:pr-2 lg:text-right order-3">
          <div className="font-mono text-[10px] tracking-widest uppercase text-nexus-muted mb-1.5 flex items-center gap-1.5">
            PROTOCOL // 02
            <span className="w-2 h-2 bg-nexus-ink inline-block" />
          </div>
          <h2 className="font-condensed text-2xl sm:text-3xl xl:text-[2.1rem] font-extrabold uppercase leading-[1.02] tracking-wide text-nexus-ink">
            ENTER
            <br />
            THE SYSTEM.
            <br />
            <span className="text-nexus-crimson">
              OUTSMART
              <br />
              THE AI.
            </span>
          </h2>
          <div className="w-20 h-[2.5px] bg-nexus-ink mt-3" />
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-nexus-muted">
            MODE: COMPETITIVE SURVIVAL
            <br />
            SQUAD CAPACITY: 4 OPERATIVES
          </p>
        </div>
      </div>

      {/* =================================================================
          4. POSTER EDITORIAL SPECIFICATION STRIP
         ================================================================= */}
      <div className="mt-8 nexus-editorial-box p-3 sm:p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-nexus-ink/20">
          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <div className="w-9 h-9 border border-nexus-ink flex items-center justify-center bg-nexus-paper shrink-0">
              <Calendar className="w-4 h-4 text-nexus-ink" />
            </div>
            <div>
              <p className="font-condensed text-sm sm:text-base font-bold uppercase leading-tight text-nexus-ink">
                1 CONTINUOUS
                <br />
                MARATHON
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
            <div className="w-9 h-9 border border-nexus-ink flex items-center justify-center bg-nexus-paper shrink-0">
              <Clock className="w-4 h-4 text-nexus-ink" />
            </div>
            <div>
              <p className="font-condensed text-sm sm:text-base font-bold uppercase leading-tight text-nexus-ink">
                ~ 2 – 2.5
                <br />
                HOURS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
            <div className="w-9 h-9 border border-nexus-ink flex items-center justify-center bg-nexus-paper shrink-0">
              <Users className="w-4 h-4 text-nexus-crimson" />
            </div>
            <div>
              <span className="block font-condensed text-xs font-bold uppercase tracking-wider text-nexus-crimson">
                PARTICIPATION
              </span>
              <p className="font-condensed text-sm sm:text-base font-bold uppercase leading-tight text-nexus-ink">
                TEAM OF 4 <span className="font-normal text-xs text-nexus-muted">(OR TEAM OF 2)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
            <div className="w-9 h-9 border border-nexus-ink flex items-center justify-center bg-nexus-paper shrink-0">
              <MapPin className="w-4 h-4 text-nexus-ink" />
            </div>
            <div>
              <span className="block font-condensed text-xs font-bold uppercase tracking-wider text-nexus-crimson">
                SECTOR LOCALE
              </span>
              <p className="font-condensed text-sm sm:text-base font-bold uppercase leading-tight text-nexus-ink">
                CSE SEMINAR HALL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NexusPosterHero;
