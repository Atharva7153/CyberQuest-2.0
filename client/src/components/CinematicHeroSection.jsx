import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CrosshairMark } from './CrosshairMark';
import { NexusActionButton } from './NexusActionButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ringCitadelArt from '../assets/artwork/nexus-ring-citadel.jpg';
import posterMonolithArt from '../assets/artwork/nexus-poster-monolith.jpg';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHeroSection = ({ onEnterSystem, onHowItWorks }) => {
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const paperLayerRef = useRef(null);
  const gridContainerRef = useRef(null);
  const typographyColRef = useRef(null);
  const artworkParallaxRef = useRef(null);
  const artworkMaskRef = useRef(null);
  const artworkImageRef = useRef(null);
  const secondaryMaskRef = useRef(null);
  const ctaRevealRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // =====================================================================
      // 9-STEP CINEMATIC HERO TITLE SEQUENCE (Deliberate, slow pacing ~4.6s)
      // =====================================================================
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Initial states
      gsap.set(paperLayerRef.current, { autoAlpha: 0 });
      gsap.set('.hero-grid-h', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.hero-grid-v', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('.hero-crosshair', { autoAlpha: 0, scale: 0.6 });
      gsap.set(artworkMaskRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
      });
      gsap.set(secondaryMaskRef.current, {
        clipPath: 'inset(0% 100% 0% 0%)',
      });
      gsap.set(artworkImageRef.current, { scale: 1.16 });
      gsap.set('.hero-red-light', { autoAlpha: 0, scale: 0.86 });
      gsap.set('.hero-title-line', { yPercent: 110, autoAlpha: 0 });
      gsap.set('.hero-subtitle-block', {
        clipPath: 'inset(0% 100% 0% 0%)',
        autoAlpha: 0,
      });
      gsap.set('.hero-system-line', {
        scaleX: 0,
        transformOrigin: 'left center',
      });
      gsap.set('.hero-system-meta', { autoAlpha: 0, y: 12 });
      gsap.set(ctaRevealRef.current, { autoAlpha: 0, y: 22 });

      // 1. Paper background appears
      tl.to(paperLayerRef.current, {
        autoAlpha: 1,
        duration: 0.75,
        ease: 'power2.inOut',
      })
        // 2. Technical grid draws in
        .to(
          '.hero-grid-h',
          {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power2.inOut',
          },
          '-=0.25'
        )
        .to(
          '.hero-grid-v',
          {
            scaleY: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to(
          '.hero-crosshair',
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
          },
          '-=0.45'
        )
        // 3. Artwork reveals through a mask
        .to(
          artworkMaskRef.current,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.35,
            ease: 'power3.inOut',
          },
          '-=0.2'
        )
        // 4. Artwork slowly scales
        .to(
          artworkImageRef.current,
          {
            scale: 1,
            duration: 2.3,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          secondaryMaskRef.current,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.95,
            ease: 'power3.inOut',
          },
          '-=1.5'
        )
        // 5. Red light activates (crimson sun aura, red ring glow, red blocks)
        .to(
          '.hero-red-light',
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=1.2'
        )
        // 6. Title reveals (CYBER QUEST — NEXUS)
        .to(
          '.hero-title-line',
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.95,
            stagger: 0.16,
            ease: 'power3.out',
          },
          '-=0.55'
        )
        // 7. Subtitle reveals (THE LAST CHANCE + editorial overline)
        .to(
          '.hero-subtitle-block',
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: 'power2.out',
          },
          '-=0.35'
        )
        // 8. System lines animate
        .to(
          '.hero-system-line',
          {
            scaleX: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power2.inOut',
          },
          '-=0.3'
        )
        .to(
          '.hero-system-meta',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
          },
          '-=0.45'
        )
        // 9. CTA appears
        .to(
          ctaRevealRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
          },
          '-=0.25'
        );

      // =====================================================================
      // SUBTLE MULTI-LAYER GSAP SCROLLTRIGGER PARALLAX
      // =====================================================================
      const parallaxTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      };

      // Background artwork moves slowly
      gsap.to(artworkParallaxRef.current, {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: parallaxTrigger,
      });

      // Foreground typography moves at a different rate
      gsap.to(typographyColRef.current, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: parallaxTrigger,
      });

      // Technical grid shifts subtly
      gsap.to(gridContainerRef.current, {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: parallaxTrigger,
      });

      // Red elements move slightly
      gsap.to('.hero-red-parallax', {
        yPercent: -11,
        ease: 'none',
        scrollTrigger: parallaxTrigger,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="nexus-hero-heading"
      className="relative min-h-[calc(100vh-4rem)] pt-6 pb-14 lg:py-12 overflow-hidden border-b-2 border-nexus-ink"
    >
      {/* 1. Paper Background Layer */}
      <div
        ref={paperLayerRef}
        className="pointer-events-none absolute inset-0 nexus-paper-canvas"
        aria-hidden="true"
      />

      {/* 2. Technical Grid & Crosshair Layer */}
      <div
        ref={gridContainerRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Horizontal Drafting Hairlines */}
        <div className="hero-grid-h absolute top-10 left-0 right-0 h-[1px] bg-nexus-ink/20" />
        <div className="hero-grid-h absolute top-1/3 left-0 right-0 h-[1px] bg-nexus-crimson/35" />
        <div className="hero-grid-h absolute bottom-20 left-0 right-0 h-[1px] bg-nexus-ink/25" />

        {/* Vertical Drafting Hairlines */}
        <div className="hero-grid-v absolute top-0 bottom-0 left-[6%] w-[1px] bg-nexus-ink/15" />
        <div className="hero-grid-v absolute top-0 bottom-0 left-1/2 w-[1px] bg-nexus-crimson/25 hidden lg:block" />
        <div className="hero-grid-v absolute top-0 bottom-0 right-[6%] w-[1px] bg-nexus-ink/15" />

        {/* Corner Registration Crosshairs */}
        <div className="hero-crosshair absolute top-4 left-4 hidden sm:block">
          <CrosshairMark variant="crimson" size={14} label="SEC // 00-INIT" />
        </div>
        <div className="hero-crosshair absolute top-4 right-4 hidden sm:block">
          <CrosshairMark variant="ink" size={14} label="AI_CORE // LOCKED" />
        </div>
      </div>

      {/* Distressed Red Block Accent (Right Edge Anchor from Proposal) */}
      <div
        className="hero-red-light hero-red-parallax pointer-events-none hidden xl:block absolute top-16 right-4 w-7 h-36 bg-nexus-crimson border border-nexus-ink"
        aria-hidden="true"
      />

      {/* Main Responsive Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* =================================================================
            LEFT COLUMN: CYBER QUEST — NEXUS / THE LAST CHANCE TYPOGRAPHY
           ================================================================= */}
        <div ref={typographyColRef} className="lg:col-span-6 space-y-5">
          {/* Top System Overline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="hero-system-line h-[2px] w-10 bg-nexus-crimson inline-block" />
              <p className="hero-system-meta font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-nexus-ink">
                A STORY DRIVEN COMPETITIVE MARATHON
              </p>
            </div>
          </div>

          {/* Primary Identity Lockup: CYBER QUEST — NEXUS */}
          <h1
            id="nexus-hero-heading"
            className="font-display uppercase tracking-[0.02em] leading-[0.88]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block text-[3.8rem] sm:text-[5.2rem] xl:text-[6.2rem] text-nexus-ink">
                CYBER
              </span>
            </span>

            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line flex items-center gap-4 text-[3.8rem] sm:text-[5.2rem] xl:text-[6.2rem] text-nexus-ink">
                <span>QUEST</span>
                <span
                  className="inline-block h-3 sm:h-4 w-16 sm:w-24 bg-nexus-ink"
                  aria-hidden="true"
                />
              </span>
            </span>

            <span className="block overflow-hidden pt-1">
              <span className="hero-title-line relative inline-flex items-center text-[4.4rem] sm:text-[6rem] xl:text-[7.2rem] text-nexus-crimson">
                <span>NE</span>
                <span className="relative inline-block px-0.5">
                  X
                  {/* Diagonal crosshair cut from Poster */}
                  <span
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 sm:w-10 h-[2.5px] bg-nexus-paper -rotate-45"
                    aria-hidden="true"
                  />
                </span>
                <span>US</span>
                {/* Red system glitch line extension */}
                <span
                  className="hero-system-line pointer-events-none ml-3 w-10 sm:w-16 h-[3px] bg-nexus-crimson hidden sm:inline-block"
                  aria-hidden="true"
                />
              </span>
            </span>
          </h1>

          {/* Subtitle Bar: THE LAST CHANCE */}
          <div className="space-y-3 pt-1">
            <div className="hero-subtitle-block inline-block bg-nexus-ink text-nexus-paper px-4 py-1.5 border border-nexus-ink shadow-brutal-sm">
              <p className="font-condensed text-lg sm:text-2xl font-extrabold uppercase tracking-[0.28em]">
                THE LAST CHANCE
              </p>
            </div>

            <p className="hero-subtitle-block font-editorial text-base sm:text-lg md:text-xl font-medium text-nexus-charcoal max-w-lg leading-snug">
              A story-driven continuous competitive technical marathon inside an AI-controlled
              system.
            </p>
          </div>

          {/* System Lines & 5 Core Pillars Strip */}
          <div className="pt-1 space-y-2.5">
            <div className="hero-system-line h-[1.5px] w-full max-w-md bg-nexus-ink/30" />

            <div className="hero-system-meta font-condensed text-sm sm:text-base font-extrabold uppercase tracking-[0.16em] text-nexus-crimson flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>KNOWLEDGE</span>
              <span className="text-nexus-ink/40">|</span>
              <span>STRATEGY</span>
              <span className="text-nexus-ink/40">|</span>
              <span>RISK</span>
              <span className="text-nexus-ink/40">|</span>
              <span>TEAMWORK</span>
              <span className="text-nexus-ink/40">|</span>
              <span>DECISION MAKING</span>
            </div>

            <div className="hero-system-line h-[1.5px] w-full max-w-md bg-nexus-crimson/50" />
          </div>

          {/* Crimson Brutalist Counter Bar (~250 Participants | ~60 Teams | 4 Members Per Team) */}
          <div className="hero-system-meta bg-nexus-crimson text-white border-2 border-nexus-ink shadow-brutal max-w-lg">
            <div className="grid grid-cols-3 divide-x divide-white/25 text-center py-3 px-2">
              <div>
                <p className="font-display text-2xl sm:text-4xl leading-none tracking-wider">
                  ~250
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mt-1 text-white/90">
                  PARTICIPANTS
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-4xl leading-none tracking-wider">
                  ~60
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mt-1 text-white/90">
                  TEAMS
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-4xl leading-none tracking-wider">4</p>
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mt-1 text-white/90">
                  MEMBERS / TEAM
                </p>
              </div>
            </div>
          </div>

          {/* Primary & Secondary CTAs (GSAP outer reveal + Framer Motion inner interaction) */}
          <div
            ref={ctaRevealRef}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <NexusActionButton
              variant="primary"
              onClick={onEnterSystem}
              ariaLabel="Enter the NEXUS System"
            >
              ENTER THE SYSTEM
            </NexusActionButton>

            <NexusActionButton
              variant="secondary"
              icon="down"
              onClick={onHowItWorks}
              ariaLabel="Scroll to How Cyber Quest Works"
            >
              HOW IT WORKS
            </NexusActionButton>
          </div>
        </div>

        {/* =================================================================
            RIGHT COLUMN: ARCHITECTURAL NEXUS ARTWORK + RED SUN + MASK REVEAL
           ================================================================= */}
        <div ref={artworkParallaxRef} className="lg:col-span-6 relative">
          {/* Red Circular Sun Halo Behind Artwork (Activates in Step 5) */}
          <div
            className="hero-red-light hero-red-parallax pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-nexus-crimson/50 bg-nexus-crimson/15"
            aria-hidden="true"
          />

          {/* Main Architectural Artwork Frame */}
          <div className="relative mx-auto max-w-xl">
            {/* Top Technical Coordinate Bar */}
            <div className="hero-system-meta flex items-center justify-between px-3 py-1.5 bg-nexus-ink text-nexus-paper border-2 border-b-0 border-nexus-ink font-mono text-[10px] uppercase tracking-widest">
              <span>CITADEL_FEED // NEXUS_CORE_RING</span>
              <span className="text-nexus-crimson font-bold">● LIVE RENDER</span>
            </div>

            {/* Masked Primary Artwork Reveal */}
            <div
              ref={artworkMaskRef}
              className="relative overflow-hidden border-2 border-nexus-ink shadow-brutal bg-nexus-ink aspect-[12/13]"
            >
              <img
                ref={artworkImageRef}
                src={ringCitadelArt}
                alt="Four operatives approaching the glowing crimson circular portal and monolith citadel of NEXUS"
                className="w-full h-full object-cover object-center will-change-transform"
              />

              {/* Red Portal Light Overlay Pulse */}
              <div
                className="hero-red-light pointer-events-none absolute inset-0 bg-gradient-to-t from-nexus-crimson/25 via-transparent to-transparent mix-blend-screen"
                aria-hidden="true"
              />

              {/* Technical Crosshair Overlay on Artwork */}
              <div className="pointer-events-none absolute top-3 left-3 bg-nexus-paper/90 px-2 py-1 border border-nexus-ink font-mono text-[10px] uppercase tracking-widest text-nexus-ink">
                HUMANITY HAS ONE <span className="text-nexus-crimson font-bold">LAST CHANCE.</span>
              </div>

              <div className="pointer-events-none absolute top-3 right-3 bg-nexus-ink/90 text-nexus-paper px-2 py-1 border border-nexus-crimson font-mono text-[10px] uppercase tracking-widest">
                OUTSMART <span className="text-nexus-crimson font-bold">THE AI.</span>
              </div>
            </div>

            {/* Secondary Inset Poster Artwork Card (AI Face Monolith) */}
            <div
              ref={secondaryMaskRef}
              className="hidden sm:block absolute -bottom-6 -left-6 w-44 md:w-52 border-2 border-nexus-ink bg-nexus-paper-elevated shadow-brutal p-1.5"
            >
              <div className="overflow-hidden border border-nexus-ink aspect-[4/3]">
                <img
                  src={posterMonolithArt}
                  alt="Cybernetic AI monolith profile watching the four operatives"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-nexus-ink px-0.5">
                <span>AI_OVERLORD</span>
                <span className="text-nexus-crimson font-bold">SECTOR 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHeroSection;
