import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  ShieldAlert,
  Lock,
  Terminal,
  ArrowUpRight,
  ArrowLeft,
  KeyRound,
  UserCheck,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { EditorialFrameLayout } from '../layouts/EditorialFrameLayout';
import { CrosshairMark } from '../components/CrosshairMark';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { verifyTeamCredentialsRequest } from '../services/authService';
import { useReducedMotion } from '../hooks/useReducedMotion';
import monolithGateArt from '../assets/artwork/nexus-monolith-gate.jpg';

const DEFAULT_SLOTS = [
  { slotNumber: 1, memberId: 'OP-01', name: 'PLAYER 1 (LEAD)', role: 'LEAD', online: false },
  { slotNumber: 2, memberId: 'OP-02', name: 'PLAYER 2', role: 'OPERATIVE', online: false },
  { slotNumber: 3, memberId: 'OP-03', name: 'PLAYER 3', role: 'OPERATIVE', online: false },
  { slotNumber: 4, memberId: 'OP-04', name: 'PLAYER 4', role: 'OPERATIVE', online: false },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { loginTeam, isAuthenticated } = useTeamPortal();

  // Step 1 = Verify Team ID + Password | Step 2 = Choose Player Name from Team
  const [loginStep, setLoginStep] = useState(1);
  const [teamId, setTeamId] = useState('TEAM-CIPHER');
  const [password, setPassword] = useState('NEXUS-2026');
  const [verifiedTeamName, setVerifiedTeamName] = useState('');
  const [rosterSlots, setRosterSlots] = useState(DEFAULT_SLOTS);
  const [selectedSlotId, setSelectedSlotId] = useState('OP-01');
  const [memberName, setMemberName] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    teamId: false,
    password: false,
    memberName: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageRef = useRef(null);
  const artMaskRef = useRef(null);
  const artImgRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSelectSlot = (slot) => {
    const slotId = slot.memberId || `OP-0${slot.slotNumber || 1}`;
    setSelectedSlotId(slotId);
    const defaultName =
      slot.name || (slot.slotNumber === 1 ? 'PLAYER 1 (LEAD)' : `PLAYER ${slot.slotNumber || 1}`);
    setMemberName(defaultName);
    if (fieldErrors.memberName) {
      setFieldErrors((prev) => ({ ...prev, memberName: false }));
    }
    setErrorMessage(null);
  };

  // GSAP: Initial cinematic entrance
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

  // Step 1: Verify Team ID & Password first
  const handleVerifyTeamStep = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedId = teamId.trim().toUpperCase();
    const trimmedPass = password.trim();

    const nextFieldErrors = {
      teamId: !trimmedId,
      password: !trimmedPass,
      memberName: false,
    };
    setFieldErrors(nextFieldErrors);

    if (nextFieldErrors.teamId || nextFieldErrors.password) {
      setErrorMessage('TEAM ID and TEAM PASSWORD are required.');
      return;
    }

    setIsVerifying(true);
    try {
      const roster = await verifyTeamCredentialsRequest(trimmedId, trimmedPass);
      const slots =
        Array.isArray(roster?.slots) && roster.slots.length > 0 ? roster.slots : DEFAULT_SLOTS;
      setRosterSlots(slots);
      setVerifiedTeamName(roster?.teamName || trimmedId);

      // Prefer picking the first offline player slot so teammates don't collide by default
      const preferredSlot = slots.find((s) => !s.online) || slots[0];
      const preferredId = preferredSlot?.memberId || 'OP-01';
      setSelectedSlotId(preferredId);
      setMemberName(preferredSlot?.name || 'PLAYER 1 (LEAD)');
      setLoginStep(2);
    } catch (err) {
      setFieldErrors((prev) => ({ ...prev, teamId: true, password: true }));
      setErrorMessage(err.message || 'Invalid Team ID or Password.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Step 2: Log in as the chosen player from the team
  const handleFinalPlayerLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedId = teamId.trim().toUpperCase();
    const trimmedPass = password.trim();
    const trimmedMemberName = memberName.trim().toUpperCase();

    if (!trimmedMemberName) {
      setFieldErrors((prev) => ({ ...prev, memberName: true }));
      setErrorMessage('Please select or enter which player name you want to log in as.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginTeam(trimmedId, trimmedPass, {
        memberId: selectedSlotId,
        memberName: trimmedMemberName,
      });
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Unable to sign in as selected player.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyPresetTeam = (presetId) => {
    setTeamId(presetId);
    setPassword('NEXUS-2026');
    setLoginStep(1);
    setFieldErrors({ teamId: false, password: false, memberName: false });
    setErrorMessage(null);
  };

  return (
    <EditorialFrameLayout systemOnline>
      <section
        ref={pageRef}
        aria-labelledby="login-heading"
        className="py-6 sm:py-16 max-w-6xl mx-auto px-4 sm:px-8"
      >
        {/* Top System Divider */}
        <div className="mb-6 sm:mb-8 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <CrosshairMark variant="crimson" size={14} label="NEXUS // OPERATIVE TERMINAL LOGIN" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-nexus-muted">
              STEP {loginStep} OF 2 // {loginStep === 1 ? 'TEAM CREDENTIALS' : 'SELECT PLAYER'}
            </span>
          </div>
          <div className="login-gsap-line h-[2px] w-full bg-nexus-ink" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* ===============================================================
              LEFT COLUMN: CINEMATIC MONOLITH VISUAL ANCHOR (HIDDEN ON SMALL MOBILE TO PRIORITIZE LOGIN FORM)
             =============================================================== */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between nexus-editorial-box p-3 sm:p-4">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-nexus-ink/20 font-mono text-[10px] uppercase tracking-widest text-nexus-ink">
              <span>NEXUS // THE LAST CHANCE</span>
              <span className="text-nexus-crimson font-bold">● MULTI-DEVICE LIVE</span>
            </div>

            <div
              ref={artMaskRef}
              className="relative flex-1 min-h-[280px] overflow-hidden border border-nexus-ink bg-nexus-ink"
            >
              <img
                ref={artImgRef}
                src={monolithGateArt}
                alt="NEXUS Monolith Gate awaiting operative login"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nexus-ink/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-nexus-paper space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nexus-crimson font-bold">
                  INDIVIDUAL OPERATIVE LOGIN
                </p>
                <p className="font-condensed text-2xl font-extrabold uppercase tracking-wide leading-tight">
                  EVERY TEAMMATE LOGS IN ON THEIR OWN LAPTOP OR MOBILE.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-dashed border-nexus-ink/25 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-nexus-muted">
              <span>SOLO · DUO · TRIO · SQUAD</span>
              <span>UP TO 4 DEVICES PER TEAM</span>
            </div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: TWO-STEP LOGIN TERMINAL
             =============================================================== */}
          <div className="lg:col-span-7 nexus-editorial-box p-5 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              {/* Header */}
              <div className="space-y-2 border-b-2 border-nexus-ink pb-4 sm:pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="login-gsap-header inline-flex items-center gap-2 bg-nexus-crimson text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] px-3 py-1 border border-nexus-ink">
                    <Lock className="w-3.5 h-3.5" />
                    {loginStep === 1 ? 'STEP 1 // TEAM AUTHENTICATION' : 'STEP 2 // SELECT PLAYER'}
                  </div>

                  {/* Stepper Pills */}
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase">
                    <span
                      className={`px-2 py-0.5 border font-bold ${
                        loginStep === 1
                          ? 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                          : 'bg-emerald-600 text-white border-nexus-ink'
                      }`}
                    >
                      1. TEAM ID
                    </span>
                    <span className="text-nexus-muted">→</span>
                    <span
                      className={`px-2 py-0.5 border font-bold ${
                        loginStep === 2
                          ? 'bg-nexus-crimson text-white border-nexus-ink'
                          : 'bg-nexus-paper text-nexus-muted border-nexus-ink/30'
                      }`}
                    >
                      2. PLAYER
                    </span>
                  </div>
                </div>

                <h1
                  id="login-heading"
                  className="login-gsap-header font-display text-3xl sm:text-6xl uppercase tracking-wide leading-[0.92] text-nexus-ink pt-1"
                >
                  {loginStep === 1 ? (
                    <>
                      ENTER <span className="text-nexus-crimson">TEAM</span> CREDENTIALS
                    </>
                  ) : (
                    <>
                      SELECT YOUR <span className="text-nexus-crimson">PLAYER</span>
                    </>
                  )}
                </h1>
                <p className="login-gsap-header font-editorial text-xs sm:text-base text-nexus-charcoal">
                  {loginStep === 1
                    ? 'First enter your Team ID and Password to verify your squad.'
                    : `Team ${verifiedTeamName || teamId} verified! Choose which player from your team you are logging in as on this device.`}
                </p>
              </div>

              {/* Error / Validation Banner */}
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
                      <p className="font-bold uppercase tracking-wider">LOGIN FAILED</p>
                      <p className="text-white/95">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ===========================================================
                  STEP 1 FORM: TEAM ID + PASSWORD
                 =========================================================== */}
              {loginStep === 1 ? (
                <form onSubmit={handleVerifyTeamStep} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 1: TEAM ID */}
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                      animate={
                        fieldErrors.teamId && !prefersReducedMotion
                          ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                          : { opacity: 1, y: 0, x: 0 }
                      }
                      transition={{ duration: 0.32 }}
                      className="space-y-1.5"
                    >
                      <label
                        htmlFor="nexus-team-id"
                        className="flex items-center justify-between font-condensed text-sm font-extrabold uppercase tracking-[0.18em] text-nexus-ink"
                      >
                        <span>TEAM ID</span>
                        <span className="font-mono text-[10px] text-nexus-crimson">REQUIRED</span>
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
                          className={`w-full px-3.5 py-3 bg-nexus-paper font-mono text-sm font-bold uppercase tracking-wider text-nexus-ink border-2 focus:outline-none transition-colors ${
                            fieldErrors.teamId
                              ? 'border-nexus-crimson bg-nexus-crimson/5'
                              : 'border-nexus-ink focus:border-nexus-crimson'
                          }`}
                        />
                        <Terminal
                          className="w-4 h-4 text-nexus-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
                      className="space-y-1.5"
                    >
                      <label
                        htmlFor="nexus-password"
                        className="flex items-center justify-between font-condensed text-sm font-extrabold uppercase tracking-[0.18em] text-nexus-ink"
                      >
                        <span>TEAM PASSWORD</span>
                        <span className="font-mono text-[10px] text-nexus-crimson">REQUIRED</span>
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
                          className={`w-full px-3.5 py-3 bg-nexus-paper font-mono text-sm font-bold tracking-wider text-nexus-ink border-2 focus:outline-none transition-colors ${
                            fieldErrors.password
                              ? 'border-nexus-crimson bg-nexus-crimson/5'
                              : 'border-nexus-ink focus:border-nexus-crimson'
                          }`}
                        />
                        <KeyRound
                          className="w-4 h-4 text-nexus-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* CTA: VERIFY TEAM */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isVerifying}
                      whileHover={
                        prefersReducedMotion || isVerifying
                          ? undefined
                          : { x: -2, y: -2, transition: { duration: 0.15 } }
                      }
                      whileTap={
                        prefersReducedMotion || isVerifying
                          ? undefined
                          : { x: 1, y: 1, transition: { duration: 0.08 } }
                      }
                      className="w-full py-4 px-5 sm:px-6 bg-nexus-crimson text-white font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-[0.2em] border-2 border-nexus-ink shadow-brutal hover:bg-nexus-ink transition-colors flex items-center justify-between cursor-pointer disabled:opacity-60"
                    >
                      <span>
                        {isVerifying ? 'VERIFYING TEAM...' : 'NEXT: SELECT YOUR PLAYER →'}
                      </span>
                      <span className="inline-flex items-center justify-center w-7 h-7 border border-white/40 bg-black/20">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </div>
                </form>
              ) : (
                /* ===========================================================
                   STEP 2 FORM: SELECT PLAYER NAME FROM TEAM
                  =========================================================== */
                <form onSubmit={handleFinalPlayerLogin} noValidate className="space-y-5">
                  {/* Verified Team Strip */}
                  <div className="p-3 bg-nexus-ink text-nexus-paper border-2 border-nexus-ink flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
                          TEAM VERIFIED
                        </p>
                        <p className="font-display text-xl uppercase tracking-wide text-white truncate">
                          {verifiedTeamName} ({teamId.trim().toUpperCase()})
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginStep(1);
                        setErrorMessage(null);
                      }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest border border-white/25 inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      CHANGE TEAM
                    </button>
                  </div>

                  {/* Select Which Player Name From Your Team */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-condensed text-sm sm:text-base font-extrabold uppercase tracking-[0.16em] text-nexus-ink flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-nexus-crimson" />
                        WHICH PLAYER ARE YOU LOGGING IN AS?
                      </span>
                      <span className="font-mono text-[10px] text-nexus-muted uppercase">
                        TAP YOUR NAME
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {rosterSlots.map((slot, idx) => {
                        const slotId = slot.memberId || `OP-0${idx + 1}`;
                        const isSelected = selectedSlotId === slotId;
                        const displayPlayerName = slot.name || `PLAYER ${idx + 1}`;
                        return (
                          <button
                            key={slotId}
                            type="button"
                            onClick={() => handleSelectSlot(slot)}
                            className={`p-3.5 border-2 text-left font-mono transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                              isSelected
                                ? 'bg-nexus-ink text-nexus-paper border-nexus-crimson shadow-brutal-crimson'
                                : 'bg-nexus-paper text-nexus-ink border-nexus-ink/40 hover:border-nexus-ink'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span
                                className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                                  isSelected
                                    ? 'bg-nexus-crimson text-white border-white/30'
                                    : 'bg-nexus-ink/10 text-nexus-ink border-nexus-ink/20'
                                }`}
                              >
                                PLAYER {idx + 1} · {slot.role || (idx === 0 ? 'LEAD' : 'OPERATIVE')}
                              </span>
                              <span
                                className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                  slot.online
                                    ? 'bg-emerald-600 text-white'
                                    : isSelected
                                      ? 'bg-white/15 text-nexus-paper/80'
                                      : 'bg-nexus-ink/10 text-nexus-muted'
                                }`}
                              >
                                {slot.online ? '● ONLINE' : '○ OFFLINE'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-1">
                              <p className="font-display text-2xl uppercase tracking-wide truncate">
                                {displayPlayerName}
                              </p>
                              {isSelected && (
                                <span className="font-mono text-[10px] font-bold uppercase text-nexus-crimson bg-white px-2 py-0.5 shrink-0">
                                  SELECTED
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Confirm / Customize Player Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="nexus-member-name"
                      className="flex items-center justify-between font-condensed text-sm font-extrabold uppercase tracking-[0.18em] text-nexus-ink"
                    >
                      <span>LOGGING IN AS PLAYER NAME ({selectedSlotId})</span>
                      <span className="font-mono text-[10px] text-nexus-crimson">
                        SHOWN TO TEAM & VOLUNTEERS
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="nexus-member-name"
                        type="text"
                        value={memberName}
                        onChange={(e) => {
                          setMemberName(e.target.value.toUpperCase());
                          if (fieldErrors.memberName) {
                            setFieldErrors((prev) => ({ ...prev, memberName: false }));
                          }
                        }}
                        placeholder="SELECT ABOVE OR TYPE YOUR PLAYER NAME"
                        className={`w-full px-3.5 py-3 bg-nexus-paper font-mono text-sm font-bold uppercase tracking-wider text-nexus-ink border-2 focus:outline-none transition-colors ${
                          fieldErrors.memberName
                            ? 'border-nexus-crimson bg-nexus-crimson/5'
                            : 'border-nexus-ink focus:border-nexus-crimson'
                        }`}
                      />
                      <UserCheck
                        className="w-4 h-4 text-nexus-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* CTA: ENTER SYSTEM AS SELECTED PLAYER */}
                  <div className="pt-2">
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
                      className="w-full py-4 px-5 sm:px-6 bg-nexus-crimson text-white font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-[0.2em] border-2 border-nexus-ink shadow-brutal hover:bg-nexus-ink transition-colors flex items-center justify-between cursor-pointer disabled:opacity-60"
                    >
                      <span className="truncate pr-2">
                        {isSubmitting
                          ? 'SIGNING IN...'
                          : `LOGIN AS ${memberName.trim() || selectedSlotId}`}
                      </span>
                      <span className="inline-flex items-center justify-center w-7 h-7 border border-white/40 bg-black/20 shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick-Select Demo Teams */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-dashed border-nexus-ink/30 space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                <span>QUICK SELECT DEMO TEAMS</span>
                <Link to="/" className="text-nexus-crimson font-bold hover:underline">
                  ← EVENT BRIEFING
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
                  <span className="text-[10px] opacity-75">1,250 CR · 4 PLAYER SLOTS</span>
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
                  <span className="text-[10px] opacity-75">1,000 CR · 4 PLAYER SLOTS</span>
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
