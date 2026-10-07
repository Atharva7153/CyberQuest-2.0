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
  AlertTriangle,
  HelpCircle,
  Ban,
  RefreshCw,
  Terminal,
  History,
  Lock,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { BrutalistPanel } from '../components/BrutalistPanel';
import { SystemBadge } from '../components/SystemBadge';
import { ChallengeRenderer } from '../engine/ChallengeRenderer';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { fetchChallengeSessionHttp } from '../services/authService';
import { useReducedMotion } from '../hooks/useReducedMotion';

const formatCountdown = (seconds) => {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatTimestampShort = (isoStr) => {
  if (!isoStr) return '--:--:--';
  const date = new Date(isoStr);
  if (Number.isNaN(date.getTime())) return '--:--:--';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

/**
 * PHASE 8 — SERVER-AUTHORITATIVE CHALLENGE SESSION
 * Route: /challenge/:challengeId
 *
 * - Header: CYBER QUEST | TEAM | CREDITS | CHALLENGE | RISK | DIFFICULTY
 * - Server-Authoritative Timer: startedAt, expiresAt, timeLimit synchronized via Socket.IO
 * - Main Area: ChallengeRenderer + SUBMIT SOLUTION (duplicate-submission protected)
 * - Outcomes: SUCCESS | FAILED | TIMEOUT | ABANDONED
 * - Animation: Framer Motion for timer state changes & result modal; GSAP restrained urgency sequence in critical final seconds
 * - Record: Displays server-recorded ChallengeAttempt ledger
 */
export const ChallengeSessionPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const {
    token,
    team,
    catalog,
    attempts,
    sessionTimer,
    serverClockOffsetMs,
    creditsConfig,
    lastEvaluationResult,
    isAuthenticated,
    isInitializing,
    socketConnected,
    onlineOperatives,
    notifications,
    actionPending,
    performTeamAction,
    syncSessionTimer,
    clearEvaluationResult,
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

  // Synchronous ref lock to prevent rapid double-click duplicate submissions
  const duplicateSubmitLockRef = useRef(false);
  const timeoutTriggeredForAttemptRef = useRef(null);

  // Dedicated GSAP refs for restrained critical urgency sequence (never touched by Framer Motion)
  const urgencyFrameRef = useRef(null);
  const urgencyBarRef = useRef(null);
  const urgencyTweenRef = useRef(null);

  // Redirect unauthenticated users to /login
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isInitializing, isAuthenticated, navigate]);

  // Load authoritative session details from server on mount or challengeId change
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

  // Synchronize timer with server via Socket.IO on mount and every 10 seconds
  useEffect(() => {
    if (!isAuthenticated || !socketConnected) return undefined;
    syncSessionTimer();
    const syncInterval = setInterval(() => {
      syncSessionTimer();
    }, 10000);
    return () => clearInterval(syncInterval);
  }, [isAuthenticated, socketConnected, syncSessionTimer]);

  // 1-second render tick using serverClockOffsetMs (client never extends timer locally)
  useEffect(() => {
    const tick = setInterval(() => {
      setNowTick(Date.now());
    }, 500);
    return () => clearInterval(tick);
  }, []);

  // Resolve target challenge & active attempt
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

  // Compute server-authoritative timer values (startedAt, expiresAt, timeLimit)
  const authoritativeStartedAt = isThisChallengeActive
    ? activeAttempt?.startedAt || sessionTimer?.startedAt
    : null;
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

  // Timer state classification for Framer Motion state transitions
  const timerState = !isThisChallengeActive
    ? 'STANDBY'
    : remainingSeconds <= 0
      ? 'TIMEOUT'
      : remainingSeconds <= 60
        ? 'CRITICAL'
        : remainingSeconds <= 180
          ? 'CAUTION'
          : 'NOMINAL';

  // When countdown reaches 0 on an active attempt, ask server to determine expiration via Socket.IO / action
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

    // Ask server via Socket.IO timer:sync to verify expiration and emit authoritative TIMEOUT
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

  // GSAP Restrained Urgency Sequence in Critical Final Seconds (<= 60s)
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

    // Restrained urgency sequence: controlled crimson border tension & subtle bar pulse (no harsh flashing)
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

  // Reset duplicate submit lock when a new attempt starts
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

  // Unified Server-Authoritative Solution Submission with Duplicate Prevention
  const handleAuthoritativeSubmit = async (overridePayload = null, options = {}) => {
    if (!isThisChallengeActive || !activeAttempt?.attemptId) return;
    if (duplicateSubmitLockRef.current || isAttemptAlreadySubmitted || localSubmitting) {
      return;
    }

    const submissionPayload = overridePayload || draftSubmission;
    const candidateAnswer =
      typeof submissionPayload === 'object' && submissionPayload !== null
        ? String(submissionPayload.answer ?? submissionPayload.word ?? '').trim()
        : String(submissionPayload ?? '').trim();

    if (!candidateAnswer && !options.simulateFailure && !options.outcomeOverride) {
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
        simulateFailure: Boolean(options.simulateFailure),
        outcomeOverride: options.outcomeOverride || null,
      });
      await refreshSessionFromServer();
    } catch {
      // Unlock if server rejected due to transient network error (unless already finalized)
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

  // Abandon Active Session -> Server evaluates as ABANDONED
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

  // Trigger Server-Authoritative Timeout Evaluation (for testing / verification)
  const handleTriggerServerTimeout = async () => {
    if (!isThisChallengeActive || !activeAttempt?.attemptId) return;
    if (duplicateSubmitLockRef.current || localSubmitting || actionPending) return;

    duplicateSubmitLockRef.current = true;
    setLocalSubmitting(true);
    try {
      await performTeamAction('TIMEOUT_CHALLENGE', {
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

  // Spend credits for Hint or +5M Extra Time (Server-Authoritative)
  const handleTacticalSupport = async (itemType, cost) => {
    if (!isThisChallengeActive || actionPending || localSubmitting) return;
    try {
      await performTeamAction(itemType, { itemType, cost });
      await refreshSessionFromServer();
    } catch {
      // Handled by provider notification
    }
  };

  // Acquire or Reattempt this challenge right from /challenge/:challengeId
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
            NEXUS SESSION // INITIALIZING
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            SYNCHRONIZING SERVER SESSION...
          </h1>
        </div>
      </div>
    );
  }

  if (!team) return null;

  const unlockedHints = Array.isArray(activeAttempt?.unlockedHints)
    ? activeAttempt.unlockedHints
    : [];
  const allAttempts = Array.isArray(attempts) && attempts.length > 0
    ? attempts
    : sessionMeta?.attempts || [];
  const challengeAttempts = allAttempts.filter(
    (att) =>
      !normalizedRouteChallengeId ||
      String(att.challengeId).toUpperCase() === normalizedRouteChallengeId
  );

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
          CHALLENGE UI HEADER:
          CYBER QUEST | TEAM | CREDITS | CHALLENGE | RISK | DIFFICULTY
         ===================================================================== */}
      <header className="relative z-20 border-b-2 border-nexus-ink bg-nexus-ink text-nexus-paper">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 items-stretch">
            {/* 1. CYBER QUEST */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-nexus-crimson font-bold">
                  SYSTEM
                </span>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-nexus-paper/80 hover:text-nexus-crimson transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>PORTAL</span>
                </Link>
              </div>
              <p className="font-display text-xl sm:text-2xl uppercase tracking-wider text-nexus-paper leading-none mt-1">
                CYBER QUEST
              </p>
            </div>

            {/* 2. TEAM */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/60">
                <span>TEAM</span>
                <span className="inline-flex items-center gap-1 text-nexus-crimson">
                  {socketConnected ? (
                    <Wifi className="w-3 h-3" />
                  ) : (
                    <WifiOff className="w-3 h-3" />
                  )}
                  {onlineOperatives}/4
                </span>
              </div>
              <p className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-paper truncate mt-1">
                {team.teamName}{' '}
                <span className="font-mono text-[10px] text-nexus-paper/60">
                  [{team.teamId}]
                </span>
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
                CHALLENGE // {targetChallenge?.challengeId || normalizedRouteChallengeId}
              </span>
              <p className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-paper truncate mt-1">
                {targetChallenge?.title || normalizedRouteChallengeId}
              </p>
            </div>

            {/* 5. RISK */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/60">
                RISK
              </span>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-crimson">
                  {targetChallenge?.risk || 'BALANCED'}
                </span>
                <span className="font-mono text-[10px] text-nexus-paper/65">
                  -{targetChallenge?.penalty || 100} CR
                </span>
              </div>
            </div>

            {/* 6. DIFFICULTY */}
            <div className="p-2.5 border border-nexus-paper/20 bg-black/30 flex flex-col justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-paper/60">
                DIFFICULTY
              </span>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-paper">
                  {targetChallenge?.difficulty || 'MEDIUM'}
                </span>
                <span className="font-mono text-[10px] text-nexus-crimson font-bold">
                  +{targetChallenge?.reward || 500} CR
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Live Socket Notification Banner */}
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
                  <span>TEAM ROOM SYNC</span>
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
          MAIN SESSION WORKSPACE
         ===================================================================== */}
      <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ===================================================================
            SERVER-AUTHORITATIVE TIMER BAR
            - Server stores: startedAt, expiresAt, timeLimit
            - Framer Motion for state changes
            - GSAP restrained urgency sequence in critical final seconds
           =================================================================== */}
        <div
          ref={urgencyFrameRef}
          className="nexus-editorial-box p-4 sm:p-5 border-2 border-nexus-ink bg-nexus-paper"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Timer Left: Server Timestamps (startedAt, expiresAt, timeLimit) */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-nexus-crimson font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  SERVER-AUTHORITATIVE SESSION TIMER
                </span>

                {/* Framer Motion Timer State Badge */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={timerState}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest border ${
                      timerState === 'CRITICAL' || timerState === 'TIMEOUT'
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : timerState === 'CAUTION'
                          ? 'bg-nexus-ink text-nexus-crimson border-nexus-crimson'
                          : 'bg-nexus-ink text-nexus-paper border-nexus-ink'
                    }`}
                  >
                    STATE // {timerState}
                  </motion.span>
                </AnimatePresence>

                {activeAttempt?.extraTimeMinutes > 0 && (
                  <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-2 py-0.5 bg-nexus-crimson/15 text-nexus-crimson border border-nexus-crimson font-mono text-[10px] font-bold uppercase"
                  >
                    +{activeAttempt.extraTimeMinutes}M SERVER EXTENSION APPLIED
                  </motion.span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-nexus-muted uppercase">
                <span>
                  STARTED_AT:{' '}
                  <strong className="text-nexus-ink">
                    {formatTimestampShort(authoritativeStartedAt)}
                  </strong>
                </span>
                <span>
                  EXPIRES_AT:{' '}
                  <strong className="text-nexus-crimson">
                    {formatTimestampShort(authoritativeExpiresAt)}
                  </strong>
                </span>
                <span>
                  TIME_LIMIT:{' '}
                  <strong className="text-nexus-ink">
                    {Math.round(authoritativeTimeLimit / 60)} MIN ({authoritativeTimeLimit}S)
                  </strong>
                </span>
                <span>
                  SOCKET SYNC:{' '}
                  <strong className={socketConnected ? 'text-nexus-ink' : 'text-nexus-crimson'}>
                    {socketConnected ? 'LOCKED' : 'RECONNECTING'}
                  </strong>
                </span>
              </div>
            </div>

            {/* Timer Right: Countdown Readout & Sync Button */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-muted block">
                  REMAINING WINDOW
                </span>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={timerState}
                    initial={prefersReducedMotion ? false : { opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`font-display text-4xl sm:text-5xl leading-none tracking-wider ${
                      timerState === 'CRITICAL' || timerState === 'TIMEOUT'
                        ? 'text-nexus-crimson'
                        : 'text-nexus-ink'
                    }`}
                  >
                    {isThisChallengeActive ? formatCountdown(remainingSeconds) : '--:--'}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => syncSessionTimer()}
                title="Synchronize with NEXUS Server Clock"
                className="px-3 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>SYNC</span>
              </button>
            </div>
          </div>

          {/* Server Progress Bar */}
          <div className="mt-3 w-full h-2.5 bg-nexus-ink/15 border border-nexus-ink overflow-hidden">
            <div
              ref={urgencyBarRef}
              className={`h-full transition-all duration-500 ${
                timerState === 'CRITICAL' || timerState === 'TIMEOUT'
                  ? 'bg-nexus-crimson'
                  : 'bg-nexus-ink'
              }`}
              style={{ width: `${timerProgressPercent}%` }}
            />
          </div>
        </div>

        {/* ===================================================================
            MAIN AREA: ChallengeRenderer + Submission + Session Controls
           =================================================================== */}
        {!isThisChallengeActive ? (
          <BrutalistPanel
            codeTag="SESSION_STANDBY"
            title={`CHALLENGE MODULE // ${targetChallenge?.title || normalizedRouteChallengeId}`}
            accentTitle
            headerRight={
              <SystemBadge variant={isSolvedByTeam ? 'operational' : 'crimson'}>
                {isSolvedByTeam
                  ? 'SOLVED'
                  : isFailedByTeam
                    ? 'PREVIOUSLY FAILED'
                    : 'SESSION NOT INITIALIZED'}
              </SystemBadge>
            }
          >
            <div className="p-6 border-2 border-nexus-ink bg-nexus-paper space-y-5">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-nexus-crimson font-bold">
                  {targetChallenge?.challengeId || normalizedRouteChallengeId} //{' '}
                  {targetChallenge?.category || 'CLASSIFIED'} · ENGINE:{' '}
                  {targetChallenge?.gameType || 'wordGuess'}
                </p>
                <h2 className="font-display text-4xl uppercase text-nexus-ink leading-none">
                  {targetChallenge?.title || 'CLASSIFIED NEXUS CHALLENGE'}
                </h2>
                <p className="font-editorial text-sm text-nexus-charcoal max-w-2xl">
                  {targetChallenge?.description ||
                    'Initialize an authoritative server session to unlock this challenge module and start the synchronized countdown timer.'}
                </p>
              </div>

              {team?.currentChallenge &&
                String(team.currentChallenge.challengeId).toUpperCase() !==
                  normalizedRouteChallengeId && (
                  <div className="p-3.5 bg-nexus-ink text-nexus-paper border-l-4 border-nexus-crimson font-mono text-xs flex flex-wrap items-center justify-between gap-3">
                    <span>
                      ACTIVE SQUAD SESSION IN PROGRESS:{' '}
                      <strong className="text-nexus-crimson">
                        {team.currentChallenge.title} ({team.currentChallenge.challengeId})
                      </strong>
                    </span>
                    <Link
                      to={`/challenge/${team.currentChallenge.challengeId}`}
                      className="px-3 py-1.5 bg-nexus-crimson text-white font-bold uppercase tracking-wider hover:bg-white hover:text-nexus-ink transition-colors"
                    >
                      SWITCH TO ACTIVE SESSION
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
                      ? `REATTEMPT MODULE (-${Math.round(
                          targetChallenge.cost * (creditsConfig?.reattemptMultiplier || 1.25)
                        )} CR)`
                      : `INITIALIZE SERVER SESSION (-${targetChallenge.cost} CR)`}
                  </button>
                )}

                <Link
                  to="/dashboard"
                  className="px-6 py-3 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-lg font-extrabold uppercase tracking-[0.18em] transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>RETURN TO NEXUS PORTAL</span>
                </Link>
              </div>
            </div>
          </BrutalistPanel>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Columns: ChallengeRenderer + Primary SUBMIT SOLUTION Bar */}
            <div className="lg:col-span-8 space-y-5">
              <BrutalistPanel
                codeTag="CHALLENGE_RENDERER"
                title={`ACTIVE MODULE // ${targetChallenge?.title}`}
                accentTitle
                headerRight={
                  <SystemBadge variant="crimson" pulse>
                    SESSION {activeAttempt?.attemptId}
                  </SystemBadge>
                }
              >
                <div className="space-y-5">
                  {/* ChallengeRenderer (Game Architecture Pipeline) */}
                  <ChallengeRenderer
                    challenge={targetChallenge}
                    session={activeAttempt}
                    actionPending={actionPending || localSubmitting}
                    disabled={isSubmissionLocked}
                    onDraftChange={setDraftSubmission}
                    onSubmitAnswer={(payload) => handleAuthoritativeSubmit(payload)}
                  />

                  {/* Decrypted Server Intelligence Hints */}
                  <AnimatePresence>
                    {unlockedHints.length > 0 && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3.5 bg-nexus-ink text-nexus-paper border-l-4 border-nexus-crimson font-mono text-xs space-y-1.5"
                      >
                        <span className="text-[10px] uppercase tracking-widest text-nexus-crimson font-bold block">
                          DECRYPTED SERVER INTELLIGENCE ({unlockedHints.length})
                        </span>
                        {unlockedHints.map((hintText, idx) => (
                          <p key={idx} className="text-nexus-paper/90 leading-relaxed">
                            {hintText}
                          </p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* =========================================================
                      SUBMISSION BAR: SUBMIT SOLUTION (Duplicate-Protected)
                     ========================================================= */}
                  <div className="p-4 border-2 border-nexus-ink bg-nexus-paper-elevated space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                      <span className="flex items-center gap-1.5 text-nexus-ink font-bold">
                        <Lock className="w-3.5 h-3.5 text-nexus-crimson" />
                        AUTHORITATIVE SUBMISSION GATE // DUPLICATE LOCK:{' '}
                        {isSubmissionLocked ? 'ENGAGED' : 'ARMED'}
                      </span>
                      <span>
                        BUFFERED PAYLOAD:{' '}
                        <strong className="text-nexus-crimson">
                          {draftSubmission?.answer ? draftSubmission.answer : '[AWAITING INPUT]'}
                        </strong>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        disabled={isSubmissionLocked || !draftSubmission?.answer}
                        onClick={() => handleAuthoritativeSubmit(draftSubmission)}
                        className="flex-1 py-3.5 px-6 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.2em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-45 flex items-center justify-center gap-2.5"
                      >
                        <Send className="w-4 h-4" />
                        <span>
                          {localSubmitting || actionPending
                            ? 'EVALUATING ON SERVER...'
                            : isAttemptAlreadySubmitted
                              ? 'SUBMISSION RECORDED'
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
                        <span>ABANDON SESSION</span>
                      </button>
                    </div>
                  </div>
                </div>
              </BrutalistPanel>
            </div>

            {/* Right 4 Columns: Tactical Support + Server Evaluation Diagnostics + Attempt Ledger */}
            <div className="lg:col-span-4 space-y-5">
              {/* Tactical Credit Support */}
              <BrutalistPanel
                codeTag="TACTICAL_SUPPORT"
                title="SESSION TACTICAL ACTIONS"
                accentTitle
              >
                <div className="space-y-3">
                  <p className="font-editorial text-xs text-nexus-charcoal">
                    All timer extensions and intelligence decryptions are executed on NEXUS Core and
                    broadcast to every terminal in <code className="font-mono">team:{team.teamId}</code>.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      disabled={isSubmissionLocked}
                      onClick={() =>
                        handleTacticalSupport('HINT', creditsConfig?.hintCost || 100)
                      }
                      className="p-3 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase transition-colors cursor-pointer disabled:opacity-50 text-left space-y-1"
                    >
                      <div className="flex items-center justify-between text-nexus-crimson">
                        <HelpCircle className="w-4 h-4" />
                        <span>-{creditsConfig?.hintCost || 100} CR</span>
                      </div>
                      <span className="block">DECRYPT HINT</span>
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
                      <span className="block">+{creditsConfig?.extraTimeMinutes || 5}M SERVER TIME</span>
                    </button>
                  </div>

                  {/* Verification / Simulation Triggers for FAILED and TIMEOUT */}
                  <div className="pt-3 border-t border-dashed border-nexus-ink/25 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                      SERVER OUTCOME VERIFICATION CONTROLS
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={isSubmissionLocked}
                        onClick={() =>
                          handleAuthoritativeSubmit(
                            { answer: 'INVALID_PAYLOAD' },
                            { simulateFailure: true }
                          )
                        }
                        className="py-2 px-2.5 border border-nexus-crimson bg-nexus-crimson/10 text-nexus-crimson hover:bg-nexus-crimson hover:text-white font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer disabled:opacity-50"
                      >
                        SIMULATE FAILED
                      </button>

                      <button
                        type="button"
                        disabled={isSubmissionLocked}
                        onClick={handleTriggerServerTimeout}
                        className="py-2 px-2.5 border border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer disabled:opacity-50"
                      >
                        SIMULATE TIMEOUT
                      </button>
                    </div>
                  </div>
                </div>
              </BrutalistPanel>

              {/* Server Attempt Ledger (Recorded Server-Side) */}
              <BrutalistPanel
                codeTag="ATTEMPT_LEDGER"
                title="SERVER ATTEMPT RECORDS"
                headerRight={
                  <span className="font-mono text-[10px] uppercase text-nexus-muted">
                    {challengeAttempts.length} LOGGED
                  </span>
                }
              >
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {challengeAttempts.length === 0 ? (
                    <p className="font-mono text-xs text-nexus-muted py-3 text-center">
                      No attempts recorded yet for this module.
                    </p>
                  ) : (
                    challengeAttempts.map((att) => {
                      const isSuccess =
                        att.status === 'SUCCESS' || att.status === 'COMPLETED';
                      const isInProgress = att.status === 'IN_PROGRESS';
                      return (
                        <div
                          key={att.attemptId}
                          className="p-2.5 border border-nexus-ink/30 bg-nexus-paper font-mono text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-nexus-ink">
                              {att.attemptId} // {att.challengeId}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                                isSuccess
                                  ? 'bg-nexus-ink text-nexus-paper'
                                  : isInProgress
                                    ? 'bg-nexus-crimson/15 text-nexus-crimson border border-nexus-crimson'
                                    : 'bg-nexus-crimson text-white'
                              }`}
                            >
                              {att.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-nexus-muted">
                            <span>START: {formatTimestampShort(att.startedAt)}</span>
                            <span>EXP: {formatTimestampShort(att.expiresAt)}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </BrutalistPanel>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          SERVER EVALUATION RESULT MODAL (Framer Motion)
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
                    NEXUS CORE // SESSION RESULT: {lastEvaluationResult.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={clearEvaluationResult}
                  aria-label="Close session evaluation modal"
                  className="opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Result Body */}
              <div className="p-6 space-y-5 bg-nexus-paper">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                    ATTEMPT: {lastEvaluationResult.attemptId || 'RECORDED'} //{' '}
                    {lastEvaluationResult.challengeId} · ENGINE:{' '}
                    {lastEvaluationResult.gameType}
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

                {/* Outcome Telemetry Grid */}
                <div className="grid grid-cols-3 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper divide-x divide-nexus-paper/15 font-mono">
                  <div className="p-3">
                    <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                      STATUS
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
                      CREDIT DELTA
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
                      SQUAD BALANCE
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
                      REATTEMPT MODULE
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      clearEvaluationResult();
                      navigate('/dashboard');
                    }}
                    className="flex-1 py-3 px-4 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-condensed text-base font-extrabold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                  >
                    RETURN TO PORTAL
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
