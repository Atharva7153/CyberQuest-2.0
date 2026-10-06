import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CrosshairMark } from './CrosshairMark';
import { NexusActionButton } from './NexusActionButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import corridorArt from '../assets/artwork/nexus-corridor.jpg';

gsap.registerPlugin(ScrollTrigger);

export const EnterSystemCtaSection = ({ onEnterSystem, onHowItWorks }) => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const contentColRef = useRef(null);
  const imageMaskRef = useRef(null);
  const imageInnerRef = useRef(null);
  const ctaGroupRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
        },
      });

      tl.from('.cta-reveal-item', {
        y: 36,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      }).from(
        ctaGroupRef.current,
        {
          y: 24,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power2.out',
        },
        '-=0.35'
      );

      gsap.fromTo(
        imageMaskRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.25,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageMaskRef.current,
            start: 'top 82%',
          },
        }
      );

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
      aria-labelledby="final-cta-heading"
      className="relative py-16 sm:py-24 border-b-2 border-nexus-ink overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT COLUMN: FINAL CALL TO ACTION */}
        <div ref={contentColRef} className="lg:col-span-7 space-y-6">
          <div className="cta-reveal-item inline-flex items-center gap-3">
            <span className="bg-nexus-crimson text-white font-condensed text-base sm:text-lg font-extrabold uppercase tracking-[0.22em] px-4 py-1 border border-nexus-ink">
              THE BIG IDEA —
            </span>
            <CrosshairMark variant="crimson" size={14} label="TERMINAL_GATE" />
          </div>

          <h2
            id="final-cta-heading"
            className="cta-reveal-item font-display text-[3.8rem] sm:text-[5.5rem] md:text-[6.8rem] uppercase leading-[0.88] tracking-wide text-nexus-ink"
          >
            ENTER THE
            <br />
            SYSTEM
          </h2>

          {/* Crimson 5-Pillar Banner from Slide 10 */}
          <div className="cta-reveal-item inline-block bg-nexus-crimson text-white px-5 py-3 border-2 border-nexus-ink shadow-brutal-sm">
            <p className="font-condensed text-base sm:text-xl font-extrabold uppercase tracking-[0.16em] leading-snug">
              KNOWLEDGE | STRATEGY | RISK
              <br />
              TEAMWORK | DECISION MAKING
            </p>
          </div>

          {/* 3 Lines from Slide 10 */}
          <div className="cta-reveal-item space-y-1 font-editorial text-lg sm:text-2xl font-bold text-nexus-ink pt-1">
            <p>Every challenge is a choice.</p>
            <p>Every choice has a cost.</p>
            <p>Every decision changes your path.</p>
          </div>

          <div className="cta-reveal-item w-16 h-[3px] bg-nexus-crimson" />

          <p className="cta-reveal-item font-display text-3xl sm:text-5xl uppercase tracking-wide text-nexus-crimson leading-none">
            ARE YOU READY TO
            <br />
            REACH THE CORE?
          </p>

          {/* Primary & Secondary Buttons (GSAP outer reveal + Framer Motion button interactions) */}
          <div
            ref={ctaGroupRef}
            className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
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
              ariaLabel="Review How Cyber Quest Works"
            >
              HOW IT WORKS
            </NexusActionButton>
          </div>
        </div>

        {/* RIGHT COLUMN: MASKED CORRIDOR TO THE CORE ARTWORK */}
        <div className="lg:col-span-5">
          <div className="nexus-editorial-box p-2.5">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-nexus-ink/20 font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
              <span>FIG 06 // CORRIDOR TO THE CORE</span>
              <span className="text-nexus-crimson font-bold">NEXUS GATEWAY</span>
            </div>

            <div
              ref={imageMaskRef}
              className="overflow-hidden border border-nexus-ink aspect-[10/11] bg-nexus-ink"
            >
              <img
                ref={imageInnerRef}
                src={corridorArt}
                alt="Towering brutalist corridor walls converging toward the glowing crimson NEXUS core"
                className="w-full h-full object-cover will-change-transform"
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-nexus-ink">
              <span>HUMANITY HAS ONE LAST CHANCE</span>
              <span className="text-nexus-crimson font-bold">OUTSMART THE AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterSystemCtaSection;
