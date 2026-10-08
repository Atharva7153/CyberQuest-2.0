import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin, Users, ShieldAlert, Coins } from 'lucide-react';
import { CrosshairMark } from './CrosshairMark';
import { useReducedMotion } from '../hooks/useReducedMotion';

import logicArt from '../assets/artwork/challenge-logic.jpg';
import puzzlesArt from '../assets/artwork/challenge-puzzles.jpg';
import observationArt from '../assets/artwork/challenge-observation.jpg';
import knowledgeArt from '../assets/artwork/challenge-knowledge.jpg';
import technicalArt from '../assets/artwork/challenge-technical.jpg';
import creditsSpireArt from '../assets/artwork/nexus-credits-spire.jpg';
import riskStairsArt from '../assets/artwork/nexus-risk-stairs.jpg';
import coreBridgeArt from '../assets/artwork/nexus-core-bridge.jpg';
import portalDeviceArt from '../assets/artwork/nexus-portal-device.jpg';

gsap.registerPlugin(ScrollTrigger);

const MARKET_DOMAINS = [
  { title: 'LOGIC', code: 'DOM-01', img: logicArt, alt: 'Brutalist concrete logic labyrinth' },
  { title: 'PUZZLES', code: 'DOM-02', img: puzzlesArt, alt: 'Isometric puzzle maze with glowing red doorway' },
  { title: 'OBSERVATION', code: 'DOM-03', img: observationArt, alt: 'Operative standing before vertical red observation slit' },
  { title: 'KNOWLEDGE', code: 'DOM-04', img: knowledgeArt, alt: 'Glowing red knowledge archive wall' },
  { title: 'TECHNICAL', code: 'DOM-05', img: technicalArt, alt: 'Underground technical chamber with red floor ring' },
];

const RISK_TIERS = [
  {
    mode: 'SAFE',
    risk: 'Low cost / Low risk',
    outcome: 'Steady progress',
    variant: 'ink',
  },
  {
    mode: 'BALANCED',
    risk: 'Moderate risk',
    outcome: 'Controlled growth',
    variant: 'crimson',
  },
  {
    mode: 'AGGRESSIVE',
    risk: 'High risk',
    outcome: 'High potential reward',
    variant: 'ink',
  },
];

const FAIR_PLAY_RULES = [
  'Teams consist of 4 participants (or team of 2).',
  'No copying or communication between competing teams.',
  'All attempts and submissions are recorded in real time.',
  'Failed challenges carry penalties.',
  'Challenge entry costs are non-refundable.',
  'Re-attempts may have increased costs.',
];

export const NexusVisualDossierSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // 1. Masked Image Reveals across all visual sections
      const maskedPanels = gsap.utils.toArray('.gsap-mask-reveal');
      maskedPanels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.15,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: panel,
              start: 'top 84%',
            },
          }
        );
      });

      // 2. Subtle Parallax on tall architectural artwork images
      const parallaxImages = gsap.utils.toArray('.gsap-parallax-img');
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12, yPercent: -6 },
          {
            scale: 1.0,
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      });

      // 3. Editorial text blocks reveal on scroll
      const editorialBlocks = gsap.utils.toArray('.gsap-editorial-reveal');
      editorialBlocks.forEach((block) => {
        gsap.from(block, {
          y: 34,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 84%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="divide-y-2 divide-nexus-ink">
      {/* ===================================================================
          VISUAL SECTION 1: THE CHALLENGE MARKET (5 Masked Image Panels)
         =================================================================== */}
      <section
        aria-labelledby="market-heading"
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="gsap-editorial-reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-nexus-muted mb-2">
                SECTOR 02 // CHALLENGE MARKETPLACE
              </p>
              <h2
                id="market-heading"
                className="font-display text-5xl sm:text-7xl uppercase tracking-wide leading-[0.88] text-nexus-ink"
              >
                THE CHALLENGE{' '}
                <span className="text-nexus-crimson block sm:inline">MARKET</span>
              </h2>
            </div>

            <p className="font-editorial text-base sm:text-xl font-semibold text-nexus-ink max-w-md border-l-4 border-nexus-crimson pl-4">
              Pick the right challenges.
              <br />
              <span className="text-nexus-charcoal font-normal">
                Every choice carries a cost and a consequence.
              </span>
            </p>
          </div>

          {/* 5 Vertical Brutalist Challenge Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MARKET_DOMAINS.map((domain) => (
              <article
                key={domain.title}
                className="border-2 border-nexus-ink shadow-brutal bg-nexus-ink flex flex-col overflow-hidden"
              >
                {/* Top Dark Title Header */}
                <div className="px-4 py-3 bg-nexus-ink text-nexus-paper flex items-center justify-between border-b border-nexus-paper/15">
                  <h3 className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-[0.14em]">
                    {domain.title}
                  </h3>
                  <span className="font-mono text-[10px] text-nexus-crimson font-bold">
                    {domain.code}
                  </span>
                </div>

                {/* Masked Architectural Image Panel */}
                <div className="gsap-mask-reveal relative aspect-[4/5] overflow-hidden bg-nexus-ink">
                  <img
                    src={domain.img}
                    alt={domain.alt}
                    className="gsap-parallax-img w-full h-full object-cover will-change-transform"
                  />
                </div>

                {/* Crimson Spec Footer (COST / REWARD / DIFFICULTY / RISK) */}
                <div className="bg-nexus-crimson text-white p-4 font-condensed text-sm font-bold uppercase tracking-[0.16em] space-y-1 border-t-2 border-nexus-ink">
                  <div className="flex justify-between">
                    <span>COST</span>
                    <span className="font-mono text-xs opacity-85">CREDITS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>REWARD</span>
                    <span className="font-mono text-xs opacity-85">+YIELD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DIFFICULTY</span>
                    <span className="font-mono text-xs opacity-85">TIERED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RISK</span>
                    <span className="font-mono text-xs opacity-85">PENALTY</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          VISUAL SECTION 2: RESISTANCE CREDITS (Editorial + Spire Artwork)
         =================================================================== */}
      <section
        aria-labelledby="credits-heading"
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Composition */}
          <div className="lg:col-span-7 space-y-6 gsap-editorial-reveal">
            <div className="flex items-center gap-3">
              <CrosshairMark variant="crimson" size={14} label="RESOURCE // CREDITS" />
            </div>

            <h2
              id="credits-heading"
              className="font-display text-5xl sm:text-7xl uppercase leading-[0.88] tracking-wide text-nexus-ink"
            >
              RESISTANCE
              <br />
              CREDITS
            </h2>

            <p className="font-editorial text-lg sm:text-2xl font-bold text-nexus-ink max-w-xl">
              Your strategic resource. Every decision shapes what&apos;s possible next.
            </p>

            {/* Two-Column Editorial Split from Slide 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Spend On List */}
              <div className="nexus-editorial-box p-0 overflow-hidden">
                <div className="bg-nexus-crimson text-white px-4 py-2.5 font-condensed text-lg font-extrabold uppercase tracking-[0.16em] border-b-2 border-nexus-ink">
                  SPEND ON
                </div>
                <ul className="divide-y divide-nexus-crimson/40 p-4 font-editorial text-base font-bold text-nexus-ink space-y-3">
                  <li className="pt-1">challenge entry costs</li>
                  <li className="pt-3">hints</li>
                  <li className="pt-3">extra time</li>
                  <li className="pt-3">abilities</li>
                </ul>
              </div>

              {/* Crimson Manifesto Card */}
              <div className="bg-nexus-crimson text-white border-2 border-nexus-ink shadow-brutal p-6 flex flex-col justify-between">
                <div className="text-center border-b border-white/35 pb-4">
                  <p className="font-condensed text-xl sm:text-2xl font-extrabold uppercase tracking-[0.14em] text-nexus-ink">
                    EVERY SPEND
                    <br />
                    IS A CHOICE
                  </p>
                </div>

                <div className="py-4 text-center font-condensed text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.12em] leading-tight">
                  SPEND NOW
                  <br />
                  OR
                  <br />
                  PRESERVE
                  <br />
                  FUTURE OPTIONS
                </div>
              </div>
            </div>
          </div>

          {/* Right Masked Spire Artwork */}
          <div className="lg:col-span-5">
            <div className="nexus-editorial-box p-2.5">
              <div className="gsap-mask-reveal overflow-hidden border border-nexus-ink aspect-[3/4] bg-nexus-paper">
                <img
                  src={creditsSpireArt}
                  alt="Twin brutalist monolith pillars standing on a circular pedestal before a crimson sun"
                  className="gsap-parallax-img w-full h-full object-cover will-change-transform"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                <span>FIG 02 // CREDIT RESERVOIR SPIRE</span>
                <span className="text-nexus-crimson font-bold">NON-REFUNDABLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          VISUAL SECTION 3: RISK & REWARD (Stairs Artwork + 3 Tactical Tiers)
         =================================================================== */}
      <section
        aria-labelledby="risk-heading"
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Masked Stairs Artwork */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="nexus-editorial-box p-2.5">
              <div className="gsap-mask-reveal overflow-hidden border border-nexus-ink aspect-[4/5] bg-nexus-ink">
                <img
                  src={riskStairsArt}
                  alt="Brutalist concrete stairs ascending into a glowing red monolith doorway"
                  className="gsap-parallax-img w-full h-full object-cover will-change-transform"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                <span>FIG 03 // THRESHOLD OF AMBITION</span>
                <span className="text-nexus-crimson font-bold">HIGH STAKES</span>
              </div>
            </div>
          </div>

          {/* Right Risk & Reward Tiers */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 gsap-editorial-reveal">
            <h2
              id="risk-heading"
              className="font-display text-5xl sm:text-7xl uppercase leading-[0.88] tracking-wide text-nexus-ink"
            >
              RISK &amp; <span className="text-nexus-crimson">REWARD</span>
            </h2>

            <p className="font-editorial text-lg sm:text-2xl font-bold text-nexus-ink">
              Every choice shapes your path. Balance caution and ambition.
            </p>

            <div className="space-y-4 pt-2">
              {RISK_TIERS.map((tier) => (
                <div
                  key={tier.mode}
                  className="grid grid-cols-1 sm:grid-cols-12 border-2 border-nexus-ink shadow-brutal bg-nexus-paper-elevated overflow-hidden"
                >
                  <div
                    className={`sm:col-span-4 px-5 py-4 flex items-center font-condensed text-2xl font-extrabold uppercase tracking-[0.14em] ${
                      tier.variant === 'crimson'
                        ? 'bg-nexus-crimson text-white'
                        : 'bg-nexus-ink text-nexus-paper'
                    }`}
                  >
                    {tier.mode}
                  </div>
                  <div className="sm:col-span-4 px-5 py-4 flex items-center border-b sm:border-b-0 sm:border-r border-nexus-crimson/40 font-editorial text-sm sm:text-base font-bold text-nexus-ink">
                    {tier.risk}
                  </div>
                  <div className="sm:col-span-4 px-5 py-4 flex items-center justify-between font-editorial text-sm sm:text-base font-bold text-nexus-charcoal">
                    <span>{tier.outcome}</span>
                    <span
                      className={`w-2.5 h-2.5 inline-block ${
                        tier.variant === 'crimson' ? 'bg-nexus-crimson' : 'bg-nexus-ink'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="font-editorial text-lg sm:text-xl font-bold text-nexus-crimson pt-2">
              A team behind can recover. A leader can still lose.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          VISUAL SECTION 4: THE NEXUS CORE & THE CYBER QUEST PORTAL
         =================================================================== */}
      <section
        aria-labelledby="core-heading"
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          {/* Part A: THE NEXUS CORE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 gsap-editorial-reveal">
              <CrosshairMark variant="crimson" size={14} label="FINAL_OBJECTIVE // UNKNOWN" />

              <h2
                id="core-heading"
                className="font-display text-5xl sm:text-7xl uppercase leading-[0.88] tracking-wide text-nexus-ink"
              >
                THE
                <br />
                NEXUS CORE
              </h2>

              <div className="space-y-3 font-editorial text-base sm:text-xl font-bold text-nexus-ink max-w-lg">
                <p>The final objective remains unknown.</p>
                <p>Victory belongs to those who commit at the right moment.</p>
                <p>Your resource position shapes what you can risk.</p>
                <p>Choose your path. The last decision defines your outcome.</p>
              </div>

              <div className="pt-2">
                <p className="font-condensed text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-nexus-crimson leading-none">
                  PLAY FOR SURVIVAL —
                  <br />
                  OR PLAY FOR VICTORY
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="nexus-editorial-box p-2.5">
                <div className="gsap-mask-reveal overflow-hidden border border-nexus-ink aspect-[12/11] bg-nexus-ink">
                  <img
                    src={coreBridgeArt}
                    alt="Symmetrical black causeway lined with crimson lights leading directly into the NEXUS Core monolith"
                    className="gsap-parallax-img w-full h-full object-cover will-change-transform"
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  <span>FIG 04 // CAUSEWAY TO THE NEXUS CORE</span>
                  <span className="text-nexus-crimson font-bold">OBJECTIVE CLASSIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Part B: THE CYBER QUEST PORTAL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6 border-t border-nexus-ink/20">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="nexus-editorial-box p-2.5">
                <div className="gsap-mask-reveal overflow-hidden border border-nexus-ink aspect-[12/11] bg-nexus-ink">
                  <img
                    src={portalDeviceArt}
                    alt="Cyber Quest Portal interface running on a dark terminal against the crimson NEXUS sun"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  <span>FIG 05 // CENTRALIZED CYBER QUEST PORTAL</span>
                  <span className="text-nexus-crimson font-bold">TEAM PORTAL</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 gsap-editorial-reveal">
              <div>
                <h3 className="font-display text-4xl sm:text-6xl uppercase leading-[0.9] text-nexus-ink">
                  THE CYBER QUEST
                </h3>
                <div className="mt-2 inline-block bg-nexus-crimson text-white font-display text-4xl sm:text-6xl uppercase px-5 py-1 border-2 border-nexus-ink shadow-brutal-sm">
                  PORTAL
                </div>
              </div>

              <ul className="divide-y divide-nexus-crimson/40 font-editorial text-lg sm:text-xl font-medium text-nexus-ink max-w-md">
                <li className="py-3">One login for your team</li>
                <li className="py-3">Live challenge marketplace</li>
                <li className="py-3">Track, spend, and earn credits</li>
                <li className="py-3">Submit solutions with confidence</li>
                <li className="py-3">Real-time countdown to act</li>
              </ul>
            </div>
          </div>

          {/* Part C: EVENT AT A GLANCE & RULES OF FAIR PLAY */}
          <div className="pt-8 border-t-2 border-nexus-ink grid grid-cols-1 lg:grid-cols-12 gap-8 gsap-editorial-reveal">
            <div className="lg:col-span-7 space-y-5">
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-nexus-ink">
                EVENT AT A <span className="text-nexus-crimson">GLANCE</span>
              </h3>

              {/* 4-Box Stat Strip from Slide 9 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-nexus-crimson bg-nexus-paper-elevated divide-y sm:divide-y-0 sm:divide-x divide-nexus-crimson">
                <div className="p-4 text-center">
                  <p className="font-display text-3xl sm:text-4xl text-nexus-crimson">~250</p>
                  <p className="font-editorial text-xs font-bold uppercase mt-1">participants</p>
                </div>
                <div className="p-4 text-center">
                  <p className="font-display text-3xl sm:text-4xl text-nexus-crimson">~60</p>
                  <p className="font-editorial text-xs font-bold uppercase mt-1">teams</p>
                </div>
                <div className="p-4 text-center">
                  <p className="font-display text-3xl sm:text-4xl text-nexus-crimson">4</p>
                  <p className="font-editorial text-xs font-bold uppercase mt-1">per team</p>
                </div>
                <div className="p-4 text-center">
                  <p className="font-display text-3xl sm:text-4xl text-nexus-crimson">16</p>
                  <p className="font-editorial text-xs font-bold uppercase mt-1">volunteers</p>
                </div>
              </div>

              {/* Poster Logistics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="nexus-editorial-box p-3.5 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-nexus-crimson shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-nexus-muted">
                      DURATION
                    </span>
                    <span className="font-condensed text-base font-extrabold uppercase">
                      ~ 2 – 2.5 HOURS
                    </span>
                  </div>
                </div>

                <div className="nexus-editorial-box p-3.5 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-nexus-crimson shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-nexus-muted">
                      VENUE
                    </span>
                    <span className="font-condensed text-base font-extrabold uppercase">
                      CSE SEMINAR HALL
                    </span>
                  </div>
                </div>

                <div className="nexus-editorial-box p-3.5 flex items-center gap-3">
                  <Coins className="w-5 h-5 text-nexus-crimson shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-nexus-muted">
                      REGISTRATION FEE
                    </span>
                    <span className="font-condensed text-base font-extrabold uppercase">
                      ₹150 / PARTICIPANT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules & Fair Play Box */}
            <div className="lg:col-span-5">
              <div className="nexus-editorial-box p-5 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-nexus-ink/20">
                    <h4 className="font-condensed text-xl font-extrabold uppercase tracking-wider text-nexus-crimson flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5" />
                      RULES &amp; FAIR PLAY
                    </h4>
                    <span className="font-mono text-[10px] bg-nexus-ink text-nexus-paper px-2 py-0.5 uppercase">
                      ENFORCED
                    </span>
                  </div>

                  <ul className="space-y-2.5 font-editorial text-sm sm:text-base font-medium text-nexus-ink">
                    {FAIR_PLAY_RULES.map((rule) => (
                      <li key={rule} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-nexus-crimson mt-2 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-dashed border-nexus-ink/25 font-mono text-[10px] uppercase tracking-widest text-nexus-muted flex justify-between">
                  <span>MODE: COMPUTER LAB / SEMINAR HALL</span>
                  <span>PROJECTOR TIMER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NexusVisualDossierSection;
