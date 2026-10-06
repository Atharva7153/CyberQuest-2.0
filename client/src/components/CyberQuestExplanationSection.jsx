import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const FIVE_PILLARS = [
  {
    index: '01',
    title: 'KNOWLEDGE',
    tag: 'TECHNICAL & ANALYTICAL',
    detail: 'Challenges cover Logic, Puzzles, Observation, Knowledge, and Technical skills.',
  },
  {
    index: '02',
    title: 'STRATEGY',
    tag: 'RESOURCE ALLOCATION',
    detail: 'Every challenge carries a distinct entry cost, reward, difficulty, and risk profile.',
  },
  {
    index: '03',
    title: 'RISK',
    tag: 'CAUTION VS. AMBITION',
    detail: 'Failed challenges carry penalties and entry costs are non-refundable.',
  },
  {
    index: '04',
    title: 'TEAMWORK',
    tag: '4 OPERATIVES PER SQUAD',
    detail: 'Four participants coordinate under continuous countdown pressure inside one portal.',
  },
  {
    index: '05',
    title: 'DECISION MAKING',
    tag: 'THE DEFINING CALL',
    detail: 'Spend now or preserve future options. The last decision defines your outcome.',
  },
];

const FIVE_ACTIONS = [
  {
    step: 'PHASE I',
    heading: 'CHOOSE CHALLENGES',
    body: 'Browse the live Challenge Market and select across Logic, Puzzles, Observation, Knowledge, and Technical domains based on cost, reward, difficulty, and risk.',
  },
  {
    step: 'PHASE II',
    heading: 'MANAGE RESISTANCE CREDITS',
    body: 'Your starting and earned Resistance Credits are your lifeblood. Spend them on challenge entry costs, hints, extra time, or abilities.',
  },
  {
    step: 'PHASE III',
    heading: 'TAKE CALCULATED RISKS',
    body: 'Decide whether to play safe for steady progress, balanced for controlled growth, or aggressive for high potential reward.',
  },
  {
    step: 'PHASE IV',
    heading: 'ADAPT',
    body: 'Adapt as the competition changes. A team behind can recover; a leader can still lose. Re-attempts may carry increased costs.',
  },
  {
    step: 'PHASE V',
    heading: 'REACH THE NEXUS CORE',
    body: 'The NEXUS Core appears as an unknown final objective. Victory belongs to those who commit at the right moment.',
  },
];

const LOOP_STEPS = [
  { num: '01', label: 'LOGIN', sub: 'Unique Team ID access' },
  { num: '02', label: 'RECEIVE RESISTANCE CREDITS', sub: 'Starting strategic capital' },
  { num: '03', label: 'BROWSE CHALLENGE MARKET', sub: 'Evaluate cost, reward & risk' },
  { num: '04', label: 'CHOOSE A CHALLENGE', sub: 'Commit non-refundable entry cost' },
  { num: '05', label: 'SOLVE & SUBMIT', sub: 'All attempts & submissions recorded' },
  { num: '06', label: 'EARN / LOSE RESOURCES', sub: 'Rewards credited or penalties applied' },
  { num: '07', label: 'SPEND ON HINTS, EXTRA TIME OR ABILITIES', sub: 'Tactical credit deployment' },
  { num: '08', label: 'CONTINUE TOWARD THE CORE', sub: 'Converge on the final objective' },
];

export const CyberQuestExplanationSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const pillarsRef = useRef(null);
  const actionsRef = useRef(null);
  const loopRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // 1. Animate each of the 5 Core Pillars as user scrolls
      const pillarCards = gsap.utils.toArray('.pillar-item');
      pillarCards.forEach((card) => {
        gsap.from(card, {
          y: 36,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
          },
        });
      });

      // 2. Animate each of the 5 Strategic Directives sequentially on scroll
      const actionRows = gsap.utils.toArray('.action-directive-row');
      actionRows.forEach((row) => {
        const line = row.querySelector('.action-rule-line');
        gsap.from(row, {
          x: -28,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 84%',
          },
        });
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.9,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: row,
                start: 'top 84%',
              },
            }
          );
        }
      });

      // 3. Animate the 8-step Cyber Quest Loop boxes
      gsap.from('.loop-node-card', {
        y: 28,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: loopRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="explanation-heading"
      className="relative py-16 sm:py-24 border-b-2 border-nexus-ink"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
        {/* =================================================================
            PART 1: THE BIG IDEA — 5 CORE PILLARS
            KNOWLEDGE | STRATEGY | RISK | TEAMWORK | DECISION MAKING
           ================================================================= */}
        <div ref={pillarsRef} className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-nexus-ink pb-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-nexus-crimson text-white font-condensed text-sm sm:text-base font-extrabold uppercase tracking-[0.22em] px-3 py-1 mb-3 border border-nexus-ink">
                THE BIG IDEA
              </div>
              <h2
                id="explanation-heading"
                className="font-display text-4xl sm:text-6xl uppercase tracking-wide text-nexus-ink leading-none"
              >
                FIVE PILLARS OF SURVIVAL
              </h2>
            </div>
            <CrosshairMark variant="crimson" size={14} label="CORE_EQUATION // 05" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {FIVE_PILLARS.map((pillar, idx) => (
              <article
                key={pillar.title}
                className={`pillar-item nexus-editorial-box p-5 flex flex-col justify-between ${
                  idx === 2 ? 'border-nexus-crimson bg-nexus-crimson text-white' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-3 pb-2 border-b border-current/20">
                    <span className="font-bold">{pillar.index}</span>
                    <span
                      className={`text-[10px] tracking-widest uppercase ${
                        idx === 2 ? 'text-white/85' : 'text-nexus-crimson font-bold'
                      }`}
                    >
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide leading-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p
                  className={`mt-4 font-editorial text-xs sm:text-sm leading-relaxed ${
                    idx === 2 ? 'text-white/90' : 'text-nexus-charcoal'
                  }`}
                >
                  {pillar.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* =================================================================
            PART 2: THE 5 STRATEGIC IMPERATIVES
            CHOOSE CHALLENGES / MANAGE RESISTANCE CREDITS / TAKE CALCULATED RISKS / ADAPT / REACH THE NEXUS CORE
           ================================================================= */}
        <div ref={actionsRef} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-nexus-crimson inline-block" />
              <h3 className="font-condensed text-xl sm:text-2xl font-extrabold uppercase tracking-[0.2em] text-nexus-ink">
                OPERATIONAL PROTOCOL // FIVE STRATEGIC IMPERATIVES
              </h3>
            </div>
            <span className="hidden sm:inline font-mono text-xs text-nexus-muted uppercase">
              SCROLL TO DECRYPT SEQUENCE
            </span>
          </div>

          <div className="divide-y-2 divide-nexus-ink border-t-2 border-b-2 border-nexus-ink bg-nexus-paper-elevated">
            {FIVE_ACTIONS.map((item, index) => (
              <div
                key={item.heading}
                className="action-directive-row relative p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center"
              >
                {/* Animated crimson accent rule */}
                <span
                  className="action-rule-line pointer-events-none absolute top-0 left-0 h-[3px] w-36 bg-nexus-crimson"
                  aria-hidden="true"
                />

                <div className="lg:col-span-2 flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-nexus-ink text-nexus-paper tracking-widest uppercase">
                    {item.step}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <h4
                    className={`font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide leading-none ${
                      index === 4 ? 'text-nexus-crimson' : 'text-nexus-ink'
                    }`}
                  >
                    {item.heading}
                  </h4>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-editorial text-sm sm:text-base text-nexus-charcoal leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================
            PART 3: THE CYBER QUEST LOOP (01 — 08)
            Directly from CQ Overview Slide 3
           ================================================================= */}
        <div ref={loopRef} className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block bg-nexus-crimson text-white font-condensed text-sm font-extrabold uppercase tracking-[0.22em] px-3 py-0.5 border border-nexus-ink mb-2">
                THE
              </span>
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-nexus-ink leading-none">
                CYBER QUEST LOOP
              </h3>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-nexus-muted">
              CONTINUOUS 8-STAGE COMPETITIVE CYCLE
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOOP_STEPS.map((node, i) => (
              <div
                key={node.num}
                className="loop-node-card nexus-editorial-box p-4 sm:p-5 flex flex-col justify-between relative group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-3xl sm:text-4xl text-nexus-crimson leading-none">
                    {node.num}
                  </span>
                  <ArrowRight className="w-4 h-4 text-nexus-crimson" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wide text-nexus-ink leading-tight">
                    {node.label}
                  </h4>
                  <p className="mt-1.5 font-mono text-[11px] text-nexus-muted uppercase tracking-wider">
                    {node.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberQuestExplanationSection;
