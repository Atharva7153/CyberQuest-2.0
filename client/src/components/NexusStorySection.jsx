import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CrosshairMark } from './CrosshairMark';
import { useReducedMotion } from '../hooks/useReducedMotion';
import monolithGateArt from '../assets/artwork/nexus-monolith-gate.jpg';

gsap.registerPlugin(ScrollTrigger);

export const NexusStorySection = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const imageMaskRef = useRef(null);
  const imageInnerRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // Animate large editorial typography lines on scroll
      gsap.from('.story-reveal-line', {
        y: 38,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
        },
      });

      // Masked image reveal for the Monolith Gate artwork
      gsap.fromTo(
        imageMaskRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.25,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageMaskRef.current,
            start: 'top 80%',
          },
        }
      );

      // Subtle parallax on the monolith image
      gsap.fromTo(
        imageInnerRef.current,
        { scale: 1.12, yPercent: -5 },
        {
          scale: 1.0,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="nexus-story"
      aria-labelledby="story-heading"
      className="relative py-16 sm:py-24 border-b-2 border-nexus-ink overflow-hidden"
    >
      {/* Left Crimson Brutalist Vertical Bar (Direct Anchor from CQ Overview Slide 2) */}
      <div
        className="pointer-events-none hidden lg:block absolute left-0 bottom-0 w-6 h-2/3 bg-nexus-crimson border-r border-t border-nexus-ink"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT COLUMN: LARGE EDITORIAL TYPOGRAPHY */}
        <div className="lg:col-span-7 space-y-6">
          {/* Crimson Tag: WHAT IS */}
          <div className="story-reveal-line inline-flex items-center gap-3">
            <span className="bg-nexus-crimson text-white font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-[0.2em] px-4 py-1 border border-nexus-ink shadow-brutal-sm">
              WHAT IS
            </span>
            <CrosshairMark variant="crimson" size={14} label="BRIEFING // 01" />
          </div>

          {/* Giant Brutalist Display Title */}
          <h2
            id="story-heading"
            className="story-reveal-line font-display text-[3.4rem] sm:text-[5rem] md:text-[6rem] leading-[0.88] uppercase tracking-[0.02em] text-nexus-ink"
          >
            CYBER QUEST?
            <span className="block text-nexus-crimson text-2xl sm:text-4xl font-condensed font-extrabold tracking-[0.26em] mt-3">
              NEXUS — THE LAST CHANCE
            </span>
          </h2>

          {/* Large Editorial Statement */}
          <p className="story-reveal-line font-editorial text-xl sm:text-2xl md:text-3xl font-bold leading-[1.22] text-nexus-ink max-w-2xl">
            A continuous technical marathon where teams solve challenges, make strategic calls,
            and compete for the ultimate objective.
          </p>

          <div className="story-reveal-line w-20 h-[3px] bg-nexus-crimson" />

          {/* Split Poster Directive Callouts (Strictly from Poster & Proposal) */}
          <div className="story-reveal-line grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="nexus-editorial-box p-4 sm:p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted mb-1">
                DIRECTIVE // 01
              </p>
              <p className="font-condensed text-2xl sm:text-3xl font-extrabold uppercase leading-tight text-nexus-ink">
                HUMANITY HAS ONE{' '}
                <span className="text-nexus-crimson">LAST CHANCE.</span>
              </p>
            </div>

            <div className="nexus-editorial-box p-4 sm:p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted mb-1">
                DIRECTIVE // 02
              </p>
              <p className="font-condensed text-2xl sm:text-3xl font-extrabold uppercase leading-tight text-nexus-ink">
                ENTER THE SYSTEM.{' '}
                <span className="text-nexus-crimson">OUTSMART THE AI.</span>
              </p>
            </div>
          </div>

          {/* Proposal Summary */}
          <p className="story-reveal-line font-editorial text-base sm:text-lg text-nexus-charcoal leading-relaxed max-w-2xl">
            Solo players, duos, trios, or squads of up to 4 participants enter the centralized Cyber
            Quest Portal using a unique Team ID and receive starting{' '}
            <strong className="text-nexus-ink">Resistance Credits</strong>. Every challenge is a
            choice. Every choice has a cost. Every decision changes your path.
          </p>
        </div>

        {/* RIGHT COLUMN: MASKED MONOLITH GATE ARTWORK PANEL */}
        <div className="lg:col-span-5">
          <div className="nexus-editorial-box p-2 sm:p-3">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-nexus-ink/20 font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
              <span>FIG 01 // NEXUS MONOLITH GATE</span>
              <span className="text-nexus-crimson font-bold">CORE_AXIS</span>
            </div>

            <div
              ref={imageMaskRef}
              className="relative overflow-hidden border border-nexus-ink aspect-[10/11] bg-nexus-ink"
            >
              <img
                ref={imageInnerRef}
                src={monolithGateArt}
                alt="Brutalist concrete NEXUS monolith gate with a glowing red vertical core against a crimson sun"
                className="w-full h-full object-cover will-change-transform"
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-nexus-ink">
              <span>CONTINUOUS MARATHON</span>
              <span className="text-nexus-crimson font-bold">~2 – 2.5 HOURS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NexusStorySection;
