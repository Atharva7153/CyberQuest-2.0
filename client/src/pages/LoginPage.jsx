import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ShieldAlert, Lock, Terminal, ArrowUpRight, KeyRound, UserCheck, Users } from 'lucide-react';
import { EditorialFrameLayout } from '../layouts/EditorialFrameLayout';
import { CrosshairMark } from '../components/CrosshairMark';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { fetchTeamRosterPublic } from '../services/authService';
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

  const [teamId, setTeamId] = useState('TEAM-CIPHER');
  const [password, setPassword] = useState('NEXUS-2026');
  const [selectedSlotId, setSelectedSlotId] = useState('OP-01');
  const [memberName, setMemberName] = useState('OPERATIVE ALPHA (LEAD)');
  const [rosterSlots, setRosterSlots] = useState(DEFAULT_SLOTS);
  const [fieldErrors, setFieldErrors] = useState({
    teamId: false,
    password: false,
    memberName: false,
  });
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

  // Live lookup of team's 4 player slots when teamId changes
  useEffect(() => {
    let active = true;
    const trimmed = teamId.trim().toUpperCase();
    if (!trimmed || trimmed.length < 3) {
      setRosterSlots(DEFAULT_SLOTS);
      return undefined;
    }

    const timer = setTimeout(async () => {
      try {
        const roster = await fetchTeamRosterPublic(trimmed);
        if (!active) return;
        if (roster?.slots?.length) {
          setRosterSlots(roster.slots);
          const matched =
            roster.slots.find((s) => s.memberId === selectedSlotId) || roster.slots[0];
          if (matched?.name) {
            setMemberName(matched.name);
          }
        } else {
          setRosterSlots(DEFAULT_SLOTS);
        }
      } catch {
        if (active) setRosterSlots(DEFAULT_SLOTS);
      }
    }, 200);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [teamId]);

  const handleSelectSlot = (slot) => {
    setSelectedSlotId(slot.memberId);
    const defaultName =
      slot.name || (slot.slotNumber === 1 ? 'PLAYER 1 (LEAD)' : `PLAYER ${slot.slotNumber}`);
    setMemberName(defaultName);
    if (fieldErrors.memberName) {
      setFieldErrors((prev) => ({ ...prev, memberName: false }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedId = teamId.trim().toUpperCase();
    const trimmedPass = password.trim();
    const trimmedMemberName = memberName.trim().toUpperCase();

    const nextFieldErrors = {
      teamId: !trimmedId,
      password: !trimmedPass,
      memberName: !trimmedMemberName,
    };
    setFieldErrors(nextFieldErrors);

    if (nextFieldErrors.teamId || nextFieldErrors.password || nextFieldErrors.memberName) {
      setErrorMessage('TEAM ID, PASSWORD, and YOUR PLAYER NAME are required.');
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
      setFieldErrors((prev) => ({ ...prev, teamId: true, password: true }));
      setErrorMessage(err.message || 'Invalid Team ID or Password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyPresetTeam = (presetId) => {
    setTeamId(presetId);
    setPassword('NEXUS-2026');
    setFieldErrors({ teamId: false, password: false, memberName: false });
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
            <CrosshairMark variant="crimson" size={14} label="NEXUS // OPERATIVE TERMINAL LOGIN" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-nexus-muted">
              CYBER QUEST // MULTI-DEVICE SQUAD SYNC
            </span>
          </div>
          <div className="login-gsap-line h-[2px] w-full bg-nexus-ink" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ===============================================================
              LEFT COLUMN: CINEMATIC MONOLITH VISUAL ANCHOR
             =============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between nexus-editorial-box p-3 sm:p-4">
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
              RIGHT COLUMN: LOGIN TERMINAL
             =============================================================== */}
          <div className="lg:col-span-7 nexus-editorial-box p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2 border-b-2 border-nexus-ink pb-5">
                <div className="login-gsap-header inline-flex items-center gap-2 bg-nexus-crimson text-white font-mono text-[11px] font-bold uppercase tracking-[0.22em] px-3 py-1 border border-nexus-ink">
                  <Lock className="w-3.5 h-3.5" />
                  OPERATIVE LOGIN
                </div>
                <h1
                  id="login-heading"
                  className="login-gsap-header font-display text-4xl sm:text-6xl uppercase tracking-wide leading-[0.9] text-nexus-ink pt-1"
                >
                  ENTER <span className="text-nexus-crimson">NEXUS</span> PORTAL
                </h1>
                <p className="login-gsap-header font-editorial text-sm sm:text-base text-nexus-charcoal">
                  Enter your Team ID and Password, pick your Player Slot (1–4), and sign in on your own laptop or mobile to solve challenges simultaneously with your squad.
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

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

                {/* Field 3: SELECT YOUR PLAYER SLOT (1-4) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-condensed text-sm font-extrabold uppercase tracking-[0.18em] text-nexus-ink flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-nexus-crimson" />
                      SELECT YOUR PLAYER SLOT (THIS DEVICE)
                    </span>
                    <span className="font-mono text-[10px] text-nexus-muted uppercase">
                      1 SLOT PER TEAMMATE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {rosterSlots.map((slot, idx) => {
                      const slotId = slot.memberId || `OP-0${idx + 1}`;
                      const isSelected = selectedSlotId === slotId;
                      return (
                        <button
                          key={slotId}
                          type="button"
                          onClick={() => handleSelectSlot(slot)}
                          className={`p-2.5 border-2 text-left font-mono transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-nexus-ink text-nexus-paper border-nexus-ink shadow-brutal-sm'
                              : 'bg-nexus-paper text-nexus-ink border-nexus-ink/40 hover:border-nexus-ink'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold">PLAYER {idx + 1}</span>
                            <span
                              className={`text-[9px] font-bold uppercase ${
                                slot.online
                                  ? isSelected
                                    ? 'text-emerald-300'
                                    : 'text-nexus-operational'
                                  : 'opacity-60'
                              }`}
                            >
                              {slot.online ? '● ONLINE' : slotId}
                            </span>
                          </div>
                          <p className="text-[11px] font-bold uppercase truncate mt-1">
                            {slot.name || `PLAYER ${idx + 1}`}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 4: YOUR PLAYER NAME */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="nexus-member-name"
                    className="flex items-center justify-between font-condensed text-sm font-extrabold uppercase tracking-[0.18em] text-nexus-ink"
                  >
                    <span>YOUR PLAYER NAME ({selectedSlotId})</span>
                    <span className="font-mono text-[10px] text-nexus-crimson">DISPLAYED TO TEAM</span>
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
                      placeholder="ENTER YOUR NAME (E.G. AARAV)"
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

                {/* CTA: ENTER SYSTEM */}
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
                    <span>
                      {isSubmitting
                        ? 'SIGNING IN...'
                        : `JOIN SQUAD AS ${memberName.trim() || selectedSlotId}`}
                    </span>
                    <span className="inline-flex items-center justify-center w-7 h-7 border border-white/40 bg-black/20">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </div>

            {/* Quick-Select Demo Teams */}
            <div className="mt-8 pt-4 border-t border-dashed border-nexus-ink/30 space-y-2.5">
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
