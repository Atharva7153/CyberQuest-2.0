import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ShieldAlert, Lock, Terminal, ArrowUpRight, KeyRound } from 'lucide-react';
import { EditorialFrameLayout } from '../layouts/EditorialFrameLayout';
import { CrosshairMark } from '../components/CrosshairMark';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import monolithGateArt from '../assets/artwork/nexus-monolith-gate.jpg';

export const LoginPage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { loginTeam, isAuthenticated } = useTeamPortal();

  const [teamId, setTeamId] = useState('TEAM-CIPHER');
  const [password, setPassword] = useState('NEXUS-2026');
  const [fieldErrors, setFieldErrors] = useState({ teamId: false, password: false });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageRef = useRef(null);
  const artMaskRef = useRef(null);
  const artImgRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // GSAP: Initial cinematic entrance ONLY (separate DOM nodes from Framer Motion form fields)
  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set('.login-gsap-line', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.login-gsap-header', { y: 28, autoAlpha: 0 });
      gsap.set(artMaskRef.current, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(artImgRef.current, { scale: 1.14 });

      tl.to('.login-gsap-line', {
        scaleX: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.inOut',
      })
        .to(
          artMaskRef.current,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power3.inOut',
          },
          '-=0.45'
        )
        .to(
          artImgRef.current,
          {
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          '.login-gsap-header',
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.12,
          },
          '-=1.0'
        );
    }, pageRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedId = teamId.trim().toUpperCase();
    const trimmedPass = password.trim();

    const nextFieldErrors = {
      teamId: !trimmedId,
      password: !trimmedPass,
    };
    setFieldErrors(nextFieldErrors);

    if (nextFieldErrors.teamId || nextFieldErrors.password) {
      setErrorMessage('IDENTIFICATION FAULT: Both TEAM ID and PASSWORD are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginTeam(trimmedId, trimmedPass);
      navigate('/dashboard');
    } catch (err) {
      setFieldErrors({ teamId: true, password: true });
      setErrorMessage(err.message || 'AUTHENTICATION REJECTED BY NEXUS CORE.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyPresetTeam = (presetId) => {
    setTeamId(presetId);
    setPassword('NEXUS-2026');
    setFieldErrors({ teamId: false, password: false });
    setErrorMessage(null);
  };

  return (
    <EditorialFrameLayout systemOnline>
      <section
        ref={pageRef}
        aria-labelledby="login-heading"
        className="py-10 sm:py-16 max-w-6xl mx-auto px-4 sm:px-8"
      >
        {/* Top System Divider */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between">
            <CrosshairMark variant="crimson" size={14} label="AUTH_PROTOCOL // GATE_01" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-nexus-muted">
              ENCRYPTED SESSION // BCRYPT + JWT
            </span>
          </div>
          <div className="login-gsap-line h-[2px] w-full bg-nexus-ink" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ===============================================================
              LEFT COLUMN: CINEMATIC MONOLITH VISUAL ANCHOR (GSAP Entrance)
             =============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between nexus-editorial-box p-3 sm:p-4">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-nexus-ink/20 font-mono text-[10px] uppercase tracking-widest text-nexus-ink">
              <span>NEXUS_CORE // PERIMETER CHECK</span>
              <span className="text-nexus-crimson font-bold">● RESTRICTED</span>
            </div>

            <div
              ref={artMaskRef}
              className="relative flex-1 min-h-[280px] overflow-hidden border border-nexus-ink bg-nexus-ink"
            >
              <img
                ref={artImgRef}
                src={monolithGateArt}
                alt="NEXUS Monolith Gate awaiting team authentication"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nexus-ink/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-nexus-paper space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nexus-crimson font-bold">
                  DIRECTIVE // TEAM LOGIN
                </p>
                <p className="font-condensed text-2xl font-extrabold uppercase tracking-wide leading-tight">
                  ONE LOGIN FOR YOUR TEAM. SHARED AUTHORITATIVE STATE.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-dashed border-nexus-ink/25 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-nexus-muted">
              <span>ROOM: team:&lt;TEAM_ID&gt;</span>
              <span>4 OPERATIVES / SQUAD</span>
            </div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: LOGIN TERMINAL (Framer Motion Fields & Validation)
             =============================================================== */}
          <div className="lg:col-span-7 nexus-editorial-box p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header (GSAP entrance) */}
              <div className="space-y-2 border-b-2 border-nexus-ink pb-5">
                <div className="login-gsap-header inline-flex items-center gap-2 bg-nexus-crimson text-white font-mono text-[11px] font-bold uppercase tracking-[0.22em] px-3 py-1 border border-nexus-ink">
                  <Lock className="w-3.5 h-3.5" />
                  TERMINAL AUTHENTICATION
                </div>
                <h1
                  id="login-heading"
                  className="login-gsap-header font-display text-4xl sm:text-6xl uppercase tracking-wide leading-[0.9] text-nexus-ink pt-1"
                >
                  ENTER <span className="text-nexus-crimson">NEXUS</span> PORTAL
                </h1>
                <p className="login-gsap-header font-editorial text-sm sm:text-base text-nexus-charcoal">
                  Authenticate with your assigned Team ID to synchronize your squad&apos;s
                  Resistance Credits and join the live Challenge Marketplace.
                </p>
              </div>

              {/* Framer Motion Error / Validation Banner */}
              <AnimatePresence mode="wait">
                {errorMessage && (
                  <motion.div
                    key={errorMessage}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    role="alert"
                    className="bg-nexus-crimson text-white border-2 border-nexus-ink shadow-brutal-sm p-3.5 flex items-start gap-3 font-mono text-xs"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-bold uppercase tracking-wider">ACCESS DENIED</p>
                      <p className="text-white/95">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form (Framer Motion field appearance & validation states) */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Field 1: TEAM ID */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={
                    fieldErrors.teamId && !prefersReducedMotion
                      ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                      : { opacity: 1, y: 0, x: 0 }
                  }
                  transition={{ duration: 0.32 }}
                  className="space-y-2"
                >
                  <label
                    htmlFor="nexus-team-id"
                    className="flex items-center justify-between font-condensed text-base font-extrabold uppercase tracking-[0.18em] text-nexus-ink"
                  >
                    <span>TEAM ID</span>
                    <span className="font-mono text-[10px] text-nexus-crimson">REQUIRED // ID</span>
                  </label>
                  <div className="relative">
                    <input
                      id="nexus-team-id"
                      type="text"
                      autoComplete="username"
                      value={teamId}
                      onChange={(e) => {
                        setTeamId(e.target.value.toUpperCase());
                        if (fieldErrors.teamId) {
                          setFieldErrors((prev) => ({ ...prev, teamId: false }));
                        }
                      }}
                      placeholder="E.G. TEAM-CIPHER"
                      className={`w-full px-4 py-3.5 bg-nexus-paper font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-nexus-ink border-2 focus:outline-none transition-colors ${
                        fieldErrors.teamId
                          ? 'border-nexus-crimson bg-nexus-crimson/5'
                          : 'border-nexus-ink focus:border-nexus-crimson'
                      }`}
                    />
                    <Terminal
                      className="w-4 h-4 text-nexus-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>

                {/* Field 2: PASSWORD */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={
                    fieldErrors.password && !prefersReducedMotion
                      ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                      : { opacity: 1, y: 0, x: 0 }
                  }
                  transition={{ duration: 0.36, delay: 0.06 }}
                  className="space-y-2"
                >
                  <label
                    htmlFor="nexus-password"
                    className="flex items-center justify-between font-condensed text-base font-extrabold uppercase tracking-[0.18em] text-nexus-ink"
                  >
                    <span>PASSWORD</span>
                    <span className="font-mono text-[10px] text-nexus-crimson">
                      HASHED // BCRYPT
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="nexus-password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) {
                          setFieldErrors((prev) => ({ ...prev, password: false }));
                        }
                      }}
                      placeholder="••••••••••••"
                      className={`w-full px-4 py-3.5 bg-nexus-paper font-mono text-sm sm:text-base font-bold tracking-wider text-nexus-ink border-2 focus:outline-none transition-colors ${
                        fieldErrors.password
                          ? 'border-nexus-crimson bg-nexus-crimson/5'
                          : 'border-nexus-ink focus:border-nexus-crimson'
                      }`}
                    />
                    <KeyRound
                      className="w-4 h-4 text-nexus-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>

                {/* CTA: ENTER SYSTEM (Framer Motion button interaction) */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.12 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      prefersReducedMotion || isSubmitting
                        ? undefined
                        : { x: -2, y: -2, transition: { duration: 0.15 } }
                    }
                    whileTap={
                      prefersReducedMotion || isSubmitting
                        ? undefined
                        : { x: 1, y: 1, transition: { duration: 0.08 } }
                    }
                    className="w-full py-4 px-6 bg-nexus-crimson text-white font-condensed text-xl font-extrabold uppercase tracking-[0.22em] border-2 border-nexus-ink shadow-brutal hover:bg-nexus-ink transition-colors flex items-center justify-between cursor-pointer disabled:opacity-60"
                  >
                    <span>{isSubmitting ? 'AUTHENTICATING TERMINAL...' : 'ENTER SYSTEM'}</span>
                    <span className="inline-flex items-center justify-center w-7 h-7 border border-white/40 bg-black/20">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </div>

            {/* Quick-Select Seeded Squad Credentials for Multi-Tab Testing */}
            <div className="mt-8 pt-4 border-t border-dashed border-nexus-ink/30 space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                <span>PROVISIONED OPERATIVE SQUADS (PASS: NEXUS-2026)</span>
                <Link to="/" className="text-nexus-crimson font-bold hover:underline">
                  ← PUBLIC BRIEFING
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => applyPresetTeam('TEAM-CIPHER')}
                  className={`px-3 py-2 border font-mono text-xs text-left transition-colors cursor-pointer ${
                    teamId === 'TEAM-CIPHER'
                      ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                      : 'bg-nexus-paper text-nexus-ink border-nexus-ink/40 hover:border-nexus-ink'
                  }`}
                >
                  <span className="block font-bold">TEAM-CIPHER</span>
                  <span className="text-[10px] opacity-75">1,250 CR · 4 MEMBERS</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTeam('TEAM-VANGUARD')}
                  className={`px-3 py-2 border font-mono text-xs text-left transition-colors cursor-pointer ${
                    teamId === 'TEAM-VANGUARD'
                      ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                      : 'bg-nexus-paper text-nexus-ink border-nexus-ink/40 hover:border-nexus-ink'
                  }`}
                >
                  <span className="block font-bold">TEAM-VANGUARD</span>
                  <span className="text-[10px] opacity-75">1,000 CR · 4 MEMBERS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </EditorialFrameLayout>
  );
};

export default LoginPage;
