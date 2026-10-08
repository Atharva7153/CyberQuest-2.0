import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowLeft,
  Clock,
  Send,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  Ban,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { BrutalistPanel } from '../components/BrutalistPanel';
import { SystemBadge } from '../components/SystemBadge';
import { RiskBadge } from '../components/RiskBadge';
import { AbilitiesAndSupportModule } from '../components/AbilitiesAndSupportModule';
import { ChallengeRenderer } from '../engine/ChallengeRenderer';
import { getTeamSizeMeta } from '../layouts/PortalShellLayout';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { fetchChallengeSessionHttp } from '../services/authService';
import { useReducedMotion } from '../hooks/useReducedMotion';

const formatCountdown = (seconds) => {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * PHASE 18 — PARTICIPANT CHALLENGE SESSION PAGE
 * Route: /challenge/:challengeId
 *
 * Simplified participant experience:
 * - Clean header: Back to Challenges, Team + Online Count, Credits, Challenge Title, Risk, Difficulty/Reward
 * - Clear Challenge Timer bar with urgency feedback
 * - Interactive Challenge Board + Submit Solution
 * - Integrated Hints, Extra Time, and Team Abilities
 * - Zero debug/simulation buttons or backend terminology
 */
export const ChallengeSessionPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const {
    token,
    team,
    catalog,
    abilitiesCatalog,
    sessionTimer,
    serverClockOffsetMs,
    creditsConfig,
    lastEvaluationResult,
    lastAbilityActivation,
    isAuthenticated,
    isInitializing,
    socketConnected,
    onlineOperatives,
    notifications,
    actionPending,
    performTeamAction,
    syncSessionTimer,
    clearEvaluationResult,
    clearAbilityActivation,
    dismissNotification,
  } = useTeamPortal();

  const normalizedRouteChallengeId = String(challengeId || '')
    .trim()
    .toUpperCase();

  const [sessionMeta, setSessionMeta] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [draftSubmission, setDraftSubmission] = useState({ gameType: 'wordGuess', answer: '' });
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [submittedAttemptIds, setSubmittedAttemptIds] = useState(() => new Set());
  const [nowTick, setNowTick] = useState(() => Date.now());

  const duplicateSubmitLockRef = useRef(false);
  const timeoutTriggeredForAttemptRef = useRef(null);

  const urgencyFrameRef = useRef(null);
  const urgencyBarRef = useRef(null);
  const urgencyTweenRef = useRef(null);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isInitializing, isAuthenticated, navigate]);

  const refreshSessionFromServer = useCallback(async () => {
    if (!token || !normalizedRouteChallengeId) return;
    try {
      setLoadingSession(true);
      const data = await fetchChallengeSessionHttp(token, normalizedRouteChallengeId);
      setSessionMeta(data);
    } catch {
      // Fallback to context catalog if offline
    } finally {
      setLoadingSession(false);
    }
  }, [token, normalizedRouteChallengeId]);

  useEffect(() => {
    refreshSessionFromServer();
  }, [refreshSessionFromServer, team?.activeAttempt?.attemptId, team?.credits]);

  useEffect(() => {
    if (!isAuthenticated || !socketConnected) return undefined;
    syncSessionTimer();
    const syncInterval = setInterval(() => {
      syncSessionTimer();
    }, 10000);
    return () => clearInterval(syncInterval);
  }, [isAuthenticated, socketConnected, syncSessionTimer]);

  useEffect(() => {
    const tick = setInterval(() => {
      setNowTick(Date.now());
    }, 500);
    return () => clearInterval(tick);
  }, []);

  const activeAttempt = team?.activeAttempt || sessionMeta?.activeAttempt || null;
  const isThisChallengeActive =
    Boolean(activeAttempt) &&
    String(activeAttempt.challengeId).toUpperCase() === normalizedRouteChallengeId;

  const targetChallenge =
    (isThisChallengeActive ? team?.currentChallenge : null) ||
    sessionMeta?.challenge ||
    catalog.find((c) => String(c.challengeId).toUpperCase() === normalizedRouteChallengeId) ||
    team?.currentChallenge ||
    null;

  const authoritativeExpiresAt = isThisChallengeActive
    ? activeAttempt?.expiresAt || sessionTimer?.expiresAt
    : null;
  const authoritativeTimeLimit = Number(
    (isThisChallengeActive ? activeAttempt?.timeLimit : targetChallenge?.timeLimit) || 1200
  );

  const estimatedServerNowMs = nowTick + Number(serverClockOffsetMs || 0);
  const expiresAtMs = authoritativeExpiresAt ? new Date(authoritativeExpiresAt).getTime() : null;
  const remainingSeconds =
    isThisChallengeActive && expiresAtMs
      ? Math.max(0, Math.ceil((expiresAtMs - estimatedServerNowMs) / 1000))
      : 0;

  const timerProgressPercent =
    isThisChallengeActive && authoritativeTimeLimit > 0
      ? Math.min(100, Math.max(0, (remainingSeconds / authoritativeTimeLimit) * 100))
      : 0;

  const timerState = !isThisChallengeActive
    ? 'STANDBY'
    : remainingSeconds <= 0
      ? 'EXPIRED'
      : remainingSeconds <= 60
        ? 'CRITICAL'
        : remainingSeconds <= 180
          ? 'WARNING'
          : 'ACTIVE';

  useEffect(() => {
    if (
      !isThisChallengeActive ||
      !activeAttempt?.attemptId ||
      remainingSeconds > 0 ||
      duplicateSubmitLockRef.current
    ) {
      return;
    }

    if (timeoutTriggeredForAttemptRef.current === activeAttempt.attemptId) {
      return;
    }
    timeoutTriggeredForAttemptRef.current = activeAttempt.attemptId;

    syncSessionTimer().then((ack) => {
      if (!ack?.expired && !ack?.evaluationResult) {
        performTeamAction('TIMEOUT_CHALLENGE', {
          challengeId: activeAttempt.challengeId,
          attemptId: activeAttempt.attemptId,
        }).catch(() => {});
      }
    });
  }, [
    isThisChallengeActive,
    activeAttempt?.attemptId,
    activeAttempt?.challengeId,
    remainingSeconds,
    syncSessionTimer,
    performTeamAction,
  ]);

  useEffect(() => {
    const frameEl = urgencyFrameRef.current;
    const barEl = urgencyBarRef.current;

    if (urgencyTweenRef.current) {
      urgencyTweenRef.current.kill();
      urgencyTweenRef.current = null;
    }

    if (prefersReducedMotion || timerState !== 'CRITICAL' || !frameEl) {
      if (frameEl) {
        gsap.set(frameEl, { clearProps: 'boxShadow,borderColor' });
      }
      if (barEl) {
        gsap.set(barEl, { clearProps: 'opacity' });
      }
      return undefined;
    }

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(
      frameEl,
      {
        borderColor: '#ff1e3a',
        boxShadow: '0 0 18px rgba(255, 30, 58, 0.28)',
        duration: 1.15,
        ease: 'sine.inOut',
      },
      0
    );
    if (barEl) {
      tl.to(
        barEl,
        {
          opacity: 0.72,
          duration: 1.15,
          ease: 'sine.inOut',
        },
        0
      );
    }

    urgencyTweenRef.current = tl;

    return () => {
      tl.kill();
      if (frameEl) gsap.set(frameEl, { clearProps: 'boxShadow,borderColor' });
      if (barEl) gsap.set(barEl, { clearProps: 'opacity' });
    };
  }, [timerState, prefersReducedMotion]);

  useEffect(() => {
    duplicateSubmitLockRef.current = false;
    setLocalSubmitting(false);
  }, [activeAttempt?.attemptId]);

  const isAttemptAlreadySubmitted =
    Boolean(activeAttempt?.attemptId) && submittedAttemptIds.has(activeAttempt.attemptId);
  const isSubmissionLocked =
    !isThisChallengeActive ||
    localSubmitting ||
    actionPending ||
    isAttemptAlreadySubmitted ||
    remainingSeconds <= 0;

  const handleAuthoritativeSubmit = async (overridePayload = null) => {
    if (!isThisChallengeActive || !activeAttempt?.attemptId) return;
    if (duplicateSubmitLockRef.current || isAttemptAlreadySubmitted || localSubmitting) {
      return;
    }

    const submissionPayload = overridePayload || draftSubmission;
    const candidateAnswer =
      typeof submissionPayload === 'object' && submissionPayload !== null
        ? String(submissionPayload.answer ?? submissionPayload.word ?? '').trim()
        : String(submissionPayload ?? '').trim();

    if (!candidateAnswer) {
      return;
    }

    duplicateSubmitLockRef.current = true;
    setLocalSubmitting(true);
    const currentAttemptId = activeAttempt.attemptId;

    try {
      setSubmittedAttemptIds((prev) => new Set(prev).add(currentAttemptId));
      await performTeamAction('SUBMIT_CHALLENGE', {
        challengeId: targetChallenge?.challengeId || normalizedRouteChallengeId,
        attemptId: currentAttemptId,
        submission: submissionPayload,
      });
      await refreshSessionFromServer();
    } catch {
      duplicateSubmitLockRef.current = false;
      setSubmittedAttemptIds((prev) => {
        const next = new Set(prev);
        next.delete(currentAttemptId);
        return next;
      });
    } finally {
      setLocalSubmitting(false);
    }
  };

  const handleAbandonSession = async () => {
    if (!isThisChallengeActive || !activeAttempt?.attemptId) return;
    if (duplicateSubmitLockRef.current || localSubmitting || actionPending) return;

    duplicateSubmitLockRef.current = true;
    setLocalSubmitting(true);
    try {
      await performTeamAction('ABANDON_CHALLENGE', {
        challengeId: targetChallenge?.challengeId || normalizedRouteChallengeId,
        attemptId: activeAttempt.attemptId,
      });
      await refreshSessionFromServer();
    } catch {
      duplicateSubmitLockRef.current = false;
    } finally {
      setLocalSubmitting(false);
    }
  };

  const handleTacticalSupport = async (itemType, cost) => {
    if (!isThisChallengeActive || actionPending || localSubmitting) return;
    try {
      await performTeamAction(itemType, { itemType, cost });
      await refreshSessionFromServer();
    } catch {
      // Handled by provider notification
    }
  };

  const handleActivateAbility = async (ability) => {
    if (!ability || actionPending || localSubmitting) return;
    const abilityObj =
      typeof ability === 'string'
        ? abilitiesCatalog.find((a) => a.abilityId === ability) || { abilityId: ability }
        : ability;
    await performTeamAction('ABILITY', {
      abilityId: abilityObj.abilityId,
      abilityName: abilityObj.name,
      cost: abilityObj.cost,
    });
    await refreshSessionFromServer();
  };

  const handleAcquireOrReattemptThisChallenge = async (isReattempt = false) => {
    if (!targetChallenge || actionPending || localSubmitting) return;
    try {
      clearEvaluationResult();
      await performTeamAction(isReattempt ? 'REATTEMPT_CHALLENGE' : 'ACQUIRE_CHALLENGE', {
        challengeId: targetChallenge.challengeId,
        isReattempt,
      });
      await refreshSessionFromServer();
    } catch {
      // Handled by provider notification
    }
  };

  if (isInitializing || (loadingSession && !team)) {
    return (
      <div className="min-h-screen nexus-paper-canvas flex items-center justify-center p-6">
        <div className="nexus-editorial-box p-8 max-w-md w-full text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-nexus-crimson font-bold">
            NEXUS // CHALLENGE
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            LOADING CHALLENGE...
          </h1>
        </div>
      </div>
    );
  }

  if (!team) return null;

  const { sizeType, memberTotal, onlineCount } = getTeamSizeMeta(team, onlineOperatives);
  const unlockedHints = Array.isArray(activeAttempt?.unlockedHints)
    ? activeAttempt.unlockedHints
    : [];
  const maxHints = Number(
    activeAttempt?.maxHints || targetChallenge?.gameConfig?.maxHints || 2
  );
  const hintsRemainingCount = Math.max(0, maxHints - unlockedHints.length);

  const isSolvedByTeam = (team.completedChallenges || []).some(
    (c) => String(c.challengeId).toUpperCase() === normalizedRouteChallengeId
  );
  const isFailedByTeam = (team.failedChallenges || []).some(
    (c) => String(c.challengeId).toUpperCase() === normalizedRouteChallengeId
  );

  return (
    <div className="min-h-screen nexus-paper-canvas text-nexus-ink relative flex flex-col">
      <div className="nexus-grid-overlay" aria-hidden="true" />
      <div className="nexus-noise-overlay" aria-hidden="true" />
      <div className="nexus-vignette-overlay" aria-hidden="true" />

      {/* =====================================================================
          CHALLENGE HEADER
         ===================================================================== */}
      <header className="relative z-20 border-b-2 border-nexus-ink bg-nexus-ink text-nexus-paper">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 items-stretch">
            {/* 1. BACK TO CHALLENGES */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-nexus-crimson font-bold">
                  NEXUS
                </span>
                <Link
                  to="/challenges"
                  className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-nexus-paper/80 hover:text-nexus-crimson transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>CHALLENGES</span>
                </Link>
              </div>
              <p className="font-display text-xl sm:text-2xl uppercase tracking-wider text-nexus-paper leading-none mt-1">
                CYBER QUEST
              </p>
            </div>

            {/* 2. TEAM (Variable Size Support) */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/60">
                <span>{sizeType}</span>
                <span className="inline-flex items-center gap-1 text-nexus-crimson font-bold">
                  {socketConnected ? (
                    <Wifi className="w-3 h-3" />
                  ) : (
                    <WifiOff className="w-3 h-3" />
                  )}
                  {onlineCount} / {memberTotal} ONLINE
                </span>
              </div>
              <p className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-paper truncate mt-1">
                {team.teamName}
              </p>
            </div>

            {/* 3. CREDITS */}
            <div className="p-2.5 border border-nexus-crimson/60 bg-nexus-crimson/15 flex flex-col justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/75">
                CREDITS
              </span>
              <p className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-nexus-crimson leading-none mt-1">
                {Number(team.credits || 0).toLocaleString()} CR
              </p>
            </div>

            {/* 4. CHALLENGE */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/60">
                {targetChallenge?.category || 'CHALLENGE'}
              </span>
              <p className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-paper truncate mt-1">
                {targetChallenge?.title || 'Challenge'}
              </p>
            </div>

            {/* 5. RISK */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/60">
                <span>RISK</span>
                <span>-{targetChallenge?.penalty || 100} CR ON FAIL</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <RiskBadge
                  risk={targetChallenge?.risk || 'BALANCED'}
                  size="sm"
                  variant="onDark"
                  pulseAggressive
                />
              </div>
            </div>

            {/* 6. DIFFICULTY & REWARD */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/60">
                DIFFICULTY &amp; REWARD
              </span>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-paper">
                  {targetChallenge?.difficulty || 'MEDIUM'}
                </span>
                <span className="font-mono text-xs text-nexus-crimson font-bold">
                  +{targetChallenge?.reward || 500} CR
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Banner */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto nexus-editorial-box-dark p-3.5 border-l-4 border-l-nexus-crimson shadow-brutal flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-nexus-crimson">
                  <span>TEAM UPDATE</span>
                  <span>·</span>
                  <span>{notif.timestamp}</span>
                </div>
                <p className="font-mono text-xs text-nexus-paper leading-snug">
                  {notif.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dismissNotification(notif.id)}
                className="text-nexus-paper/60 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* =====================================================================
          MAIN CHALLENGE WORKSPACE
         ===================================================================== */}
      <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ===================================================================
            CHALLENGE TIMER BAR
           =================================================================== */}
        <div
          ref={urgencyFrameRef}
          className="nexus-editorial-box p-4 sm:p-5 border-2 border-nexus-ink bg-nexus-paper"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-nexus-crimson font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  CHALLENGE TIMER
                </span>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={timerState}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest border ${
                      timerState === 'CRITICAL' || timerState === 'EXPIRED'
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : timerState === 'WARNING'
                          ? 'bg-nexus-ink text-nexus-crimson border-nexus-crimson'
                          : 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                    }`}
                  >
                    {timerState}
                  </motion.span>
                </AnimatePresence>

                {activeAttempt?.extraTimeMinutes > 0 && (
                  <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-2 py-0.5 bg-nexus-crimson/15 text-nexus-crimson border border-nexus-crimson font-mono text-[10px] font-bold uppercase"
                  >
                    +{activeAttempt.extraTimeMinutes}M EXTRA TIME
                  </motion.span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-nexus-muted uppercase">
                <span>
                  TIME LIMIT:{' '}
                  <strong className="text-nexus-ink">
                    {Math.round(authoritativeTimeLimit / 60)} MIN
                  </strong>
                </span>
                <span>
                  REWARD:{' '}
                  <strong className="text-nexus-ink">
                    +{targetChallenge?.reward || 400} CR
                  </strong>
                </span>
                <span>
                  PENALTY ON FAIL:{' '}
                  <strong className="text-nexus-crimson">
                    -{targetChallenge?.penalty || 100} CR
                  </strong>
                </span>
              </div>
            </div>

            {/* Countdown Readout */}
            <div className="flex items-center gap-4">
              <div className="text-left sm:text-right">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-muted block">
                  TIME REMAINING
                </span>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={timerState}
                    initial={prefersReducedMotion ? false : { opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`font-display text-4xl sm:text-5xl leading-none tracking-wider ${
                      timerState === 'CRITICAL' || timerState === 'EXPIRED'
                        ? 'text-nexus-crimson'
                        : 'text-nexus-ink'
                    }`}
                  >
                    {isThisChallengeActive ? formatCountdown(remainingSeconds) : '--:--'}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full h-2.5 bg-nexus-ink/15 border border-nexus-ink overflow-hidden">
            <div
              ref={urgencyBarRef}
              className={`h-full transition-all duration-500 ${
                timerState === 'CRITICAL' || timerState === 'EXPIRED'
                  ? 'bg-nexus-crimson'
                  : 'bg-nexus-ink'
              }`}
              style={{ width: `${timerProgressPercent}%` }}
            />
          </div>
        </div>

        {/* ===================================================================
            MAIN AREA: Challenge Board + Submission + Support/Abilities
           =================================================================== */}
        {!isThisChallengeActive ? (
          <BrutalistPanel
            codeTag="CHALLENGE"
            title={targetChallenge?.title || 'CHALLENGE'}
            accentTitle
            headerRight={
              <SystemBadge variant={isSolvedByTeam ? 'operational' : 'crimson'}>
                {isSolvedByTeam
                  ? 'SOLVED'
                  : isFailedByTeam
                    ? 'FAILED PREVIOUSLY'
                    : 'READY TO START'}
              </SystemBadge>
            }
          >
            <div className="p-6 border-2 border-nexus-ink bg-nexus-paper space-y-5">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-nexus-crimson font-bold">
                  {targetChallenge?.category || 'CHALLENGE'} · DIFFICULTY:{' '}
                  {targetChallenge?.difficulty || 'MEDIUM'}
                </p>
                <h2 className="font-display text-4xl uppercase text-nexus-ink leading-none">
                  {targetChallenge?.title || 'CHALLENGE'}
                </h2>
                <p className="font-editorial text-sm text-nexus-charcoal max-w-2xl">
                  {targetChallenge?.description ||
                    'Start this challenge to unlock the board and begin your team countdown.'}
                </p>
              </div>

              {team?.currentChallenge &&
                String(team.currentChallenge.challengeId).toUpperCase() !==
                  normalizedRouteChallengeId && (
                  <div className="p-3.5 bg-nexus-ink text-nexus-paper border-l-4 border-nexus-crimson font-mono text-xs flex flex-wrap items-center justify-between gap-3">
                    <span>
                      YOUR TEAM HAS AN ACTIVE CHALLENGE:{' '}
                      <strong className="text-nexus-crimson">
                        {team.currentChallenge.title}
                      </strong>
                    </span>
                    <Link
                      to={`/challenge/${team.currentChallenge.challengeId}`}
                      className="px-3 py-1.5 bg-nexus-crimson text-white font-bold uppercase tracking-wider hover:bg-white hover:text-nexus-ink transition-colors"
                    >
                      OPEN ACTIVE CHALLENGE
                    </Link>
                  </div>
                )}

              <div className="flex flex-wrap gap-3 pt-2">
                {!isSolvedByTeam && targetChallenge && (
                  <button
                    type="button"
                    disabled={actionPending || localSubmitting}
                    onClick={() => handleAcquireOrReattemptThisChallenge(isFailedByTeam)}
                    className="px-6 py-3 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isFailedByTeam
                      ? `[ REATTEMPT CHALLENGE (-${Math.round(
                          targetChallenge.cost * (creditsConfig?.reattemptMultiplier || 1.25)
                        )} CR) ]`
                      : `[ START CHALLENGE (-${targetChallenge.cost} CR) ]`}
                  </button>
                )}

                <Link
                  to="/challenges"
                  className="px-6 py-3 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-lg font-extrabold uppercase tracking-[0.18em] transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK TO CHALLENGES</span>
                </Link>
              </div>
            </div>
          </BrutalistPanel>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Columns: ChallengeRenderer + Submit Bar */}
            <div className="lg:col-span-8 space-y-5">
              <BrutalistPanel
                codeTag="ACTIVE CHALLENGE"
                title={targetChallenge?.title || 'ACTIVE CHALLENGE'}
                accentTitle
                headerRight={
                  <SystemBadge variant="crimson" pulse>
                    IN PROGRESS
                  </SystemBadge>
                }
              >
                <div className="space-y-5">
                  <ChallengeRenderer
                    challenge={targetChallenge}
                    session={activeAttempt}
                    actionPending={actionPending || localSubmitting}
                    disabled={isSubmissionLocked}
                    onDraftChange={setDraftSubmission}
                    onSubmitAnswer={(payload) => handleAuthoritativeSubmit(payload)}
                  />

                  {/* Unlocked Hints */}
                  <AnimatePresence>
                    {unlockedHints.length > 0 && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3.5 bg-nexus-ink text-nexus-paper border-l-4 border-nexus-crimson font-mono text-xs space-y-1.5"
                      >
                        <span className="text-[10px] uppercase tracking-widest text-nexus-crimson font-bold block">
                          UNLOCKED HINTS ({unlockedHints.length})
                        </span>
                        {unlockedHints.map((hintText, idx) => (
                          <p key={idx} className="text-nexus-paper/90 leading-relaxed">
                            {hintText}
                          </p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit / Abandon Controls */}
                  <div className="p-4 border-2 border-nexus-ink bg-nexus-paper-elevated flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      disabled={isSubmissionLocked || !draftSubmission?.answer}
                      onClick={() => handleAuthoritativeSubmit(draftSubmission)}
                      className="flex-1 py-3.5 px-6 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.2em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-45 flex items-center justify-center gap-2.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {localSubmitting || actionPending
                          ? 'SUBMITTING...'
                          : isAttemptAlreadySubmitted
                            ? 'SUBMITTED'
                            : 'SUBMIT SOLUTION'}
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmissionLocked}
                      onClick={handleAbandonSession}
                      className="py-3.5 px-5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-base font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer disabled:opacity-45 flex items-center justify-center gap-2"
                    >
                      <Ban className="w-4 h-4 text-nexus-crimson" />
                      <span>ABANDON CHALLENGE</span>
                    </button>
                  </div>
                </div>
              </BrutalistPanel>
            </div>

            {/* Right 4 Columns: Hints & Extra Time + Team Abilities */}
            <div className="lg:col-span-4 space-y-5">
              {/* Hints & Extra Time */}
              <BrutalistPanel
                codeTag="SUPPORT"
                title="HINTS & EXTRA TIME"
                accentTitle
              >
                <div className="space-y-3">
                  <p className="font-editorial text-xs text-nexus-charcoal">
                    Need help or more time? Unlocked hints and extra time apply immediately for your whole team.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      disabled={isSubmissionLocked || hintsRemainingCount <= 0}
                      onClick={() =>
                        handleTacticalSupport('HINT', creditsConfig?.hintCost || 100)
                      }
                      className="p-3 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase transition-colors cursor-pointer disabled:opacity-50 text-left space-y-1"
                    >
                      <div className="flex items-center justify-between text-nexus-crimson">
                        <HelpCircle className="w-4 h-4" />
                        <span>-{creditsConfig?.hintCost || 100} CR</span>
                      </div>
                      <span className="block">
                        {hintsRemainingCount <= 0 ? 'ALL HINTS USED' : 'UNLOCK HINT'}
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmissionLocked}
                      onClick={() =>
                        handleTacticalSupport('EXTRA_TIME', creditsConfig?.extraTimeCost || 150)
                      }
                      className="p-3 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase transition-colors cursor-pointer disabled:opacity-50 text-left space-y-1"
                    >
                      <div className="flex items-center justify-between text-nexus-crimson">
                        <Clock className="w-4 h-4" />
                        <span>-{creditsConfig?.extraTimeCost || 150} CR</span>
                      </div>
                      <span className="block">
                        +{creditsConfig?.extraTimeMinutes || 5}M EXTRA TIME
                      </span>
                    </button>
                  </div>
                </div>
              </BrutalistPanel>

              {/* Team Abilities (Integrated inside Challenge Session) */}
              <AbilitiesAndSupportModule
                team={team}
                abilitiesCatalog={abilitiesCatalog}
                creditsConfig={creditsConfig}
                serverClockOffsetMs={serverClockOffsetMs}
                actionPending={actionPending || localSubmitting || isSubmissionLocked}
                lastAbilityActivation={lastAbilityActivation}
                onClearAbilityActivation={clearAbilityActivation}
                onActivateAbility={handleActivateAbility}
                compact
                showTacticalControls={false}
              />
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          CHALLENGE RESULT MODAL (Framer Motion)
          Supports: SUCCESS | FAILED | TIMEOUT | ABANDONED
         ===================================================================== */}
      <AnimatePresence>
        {lastEvaluationResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={clearEvaluationResult}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="session-result-modal-title"
              className="nexus-editorial-box max-w-lg w-full overflow-hidden border-2 border-nexus-ink shadow-brutal"
            >
              {/* Result Header */}
              <div
                className={`px-5 py-4 border-b-2 border-nexus-ink flex items-center justify-between ${
                  lastEvaluationResult.status === 'SUCCESS' || lastEvaluationResult.passed
                    ? 'bg-nexus-ink text-nexus-paper'
                    : 'bg-nexus-crimson text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest">
                  {lastEvaluationResult.status === 'SUCCESS' || lastEvaluationResult.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-nexus-crimson" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-white" />
                  )}
                  <span>
                    CHALLENGE RESULT // {lastEvaluationResult.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={clearEvaluationResult}
                  aria-label="Close result modal"
                  className="opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Result Body */}
              <div className="p-6 space-y-5 bg-nexus-paper">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                    {targetChallenge?.category || 'CHALLENGE'}
                  </span>
                  <h2
                    id="session-result-modal-title"
                    className="font-display text-4xl uppercase text-nexus-ink leading-none mt-1"
                  >
                    {lastEvaluationResult.title}
                  </h2>
                  <p className="font-editorial text-sm text-nexus-charcoal mt-2">
                    {lastEvaluationResult.message}
                  </p>
                </div>

                {/* Outcome Summary Grid */}
                <div className="grid grid-cols-3 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper divide-x divide-nexus-paper/15 font-mono">
                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      OUTCOME
                    </span>
                    <span
                      className={`font-bold text-sm uppercase ${
                        lastEvaluationResult.passed ? 'text-white' : 'text-nexus-crimson'
                      }`}
                    >
                      {lastEvaluationResult.status}
                    </span>
                  </div>

                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      CREDITS
                    </span>
                    <span
                      className={`font-bold text-base ${
                        lastEvaluationResult.creditsDelta >= 0
                          ? 'text-white'
                          : 'text-nexus-crimson'
                      }`}
                    >
                      {lastEvaluationResult.creditsDelta >= 0
                        ? `+${lastEvaluationResult.creditsDelta} CR`
                        : `${lastEvaluationResult.creditsDelta} CR`}
                    </span>
                  </div>

                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      NEW BALANCE
                    </span>
                    <span className="font-bold text-base text-nexus-crimson">
                      {Number(
                        lastEvaluationResult.balanceAfter ?? team?.credits ?? 0
                      ).toLocaleString()}{' '}
                      CR
                    </span>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {!lastEvaluationResult.passed && (
                    <button
                      type="button"
                      disabled={actionPending || localSubmitting}
                      onClick={() => handleAcquireOrReattemptThisChallenge(true)}
                      className="flex-1 py-3 px-4 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer"
                    >
                      REATTEMPT CHALLENGE
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      clearEvaluationResult();
                      navigate('/challenges');
                    }}
                    className="flex-1 py-3 px-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-condensed text-base font-extrabold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                  >
                    BACK TO CHALLENGES
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengeSessionPage;
