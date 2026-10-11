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
  X,
} from 'lucide-react';
import { BrutalistPanel } from '../components/BrutalistPanel';
import { SystemBadge } from '../components/SystemBadge';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import {
  getFriendlyChallengeTitle,
  getFriendlyChallengeDescription,
} from '../components/ChallengeMarketModule';
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

/**
 * PHASE 19 — PARTICIPANT CHALLENGE SESSION PAGE
 * Route: /challenge/:challengeId
 *
 * Focused exclusively on:
 * - CHALLENGE NAME
 * - TIMER
 * - CREDITS
 * - GAME
 * - SUBMIT / COMPLETE
 */
export const ChallengeSessionPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const {
    token,
    team,
    catalog,
    sessionTimer,
    serverClockOffsetMs,
    creditsConfig,
    lastEvaluationResult,
    isAuthenticated,
    isInitializing,
    socketConnected,
    actionPending,
    isRoundActive,
    globalTimer,
    performTeamAction,
    syncSessionTimer,
    clearEvaluationResult,
  } = useTeamPortal();

  const normalizedRouteChallengeId = String(challengeId || '')
    .trim()
    .toUpperCase();

  const [sessionMeta, setSessionMeta] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [draftSubmission, setDraftSubmission] = useState({ gameType: 'sudoku', answer: '' });
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

  const matchedFromActiveAttempts = (team?.activeAttempts || []).find(
    (a) => String(a.challengeId || '').toUpperCase() === normalizedRouteChallengeId
  );
  const matchedFromSessionMeta =
    sessionMeta?.activeAttempt &&
    String(sessionMeta.activeAttempt.challengeId || '').toUpperCase() === normalizedRouteChallengeId
      ? sessionMeta.activeAttempt
      : null;
  const matchedFromLegacy =
    team?.activeAttempt &&
    String(team.activeAttempt.challengeId || '').toUpperCase() === normalizedRouteChallengeId
      ? team.activeAttempt
      : null;

  const activeAttempt =
    matchedFromActiveAttempts ||
    matchedFromSessionMeta ||
    matchedFromLegacy ||
    sessionMeta?.activeAttempt ||
    team?.activeAttempt ||
    null;

  const isThisChallengeActive = Boolean(
    matchedFromActiveAttempts || matchedFromSessionMeta || matchedFromLegacy
  );

  const catalogChallenge = catalog.find(
    (c) => String(c.challengeId).toUpperCase() === normalizedRouteChallengeId
  );

  const targetChallenge =
    sessionMeta?.challenge ||
    catalogChallenge ||
    (isThisChallengeActive ? team?.currentChallenge : null) ||
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

  const timerState = !isRoundActive
    ? 'PAUSED'
    : !isThisChallengeActive
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
      !isRoundActive ||
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
    isRoundActive,
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
    !isRoundActive ||
    !isThisChallengeActive ||
    localSubmitting ||
    actionPending ||
    isAttemptAlreadySubmitted ||
    remainingSeconds <= 0;

  const handleAuthoritativeSubmit = async (overridePayload = null) => {
    if (!isRoundActive || !isThisChallengeActive || !activeAttempt?.attemptId) return;
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
    if (!isRoundActive || !isThisChallengeActive || !activeAttempt?.attemptId) return;
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

  const handleSaveForLater = async () => {
    if (!isRoundActive || !isThisChallengeActive || !activeAttempt?.attemptId) return;
    if (duplicateSubmitLockRef.current || localSubmitting || actionPending) return;

    setLocalSubmitting(true);
    try {
      await performTeamAction('SAVE_FOR_LATER', {
        challengeId: targetChallenge?.challengeId || normalizedRouteChallengeId,
        attemptId: activeAttempt.attemptId,
      });
      navigate('/challenges');
    } catch {
      // Handled by provider notification
    } finally {
      setLocalSubmitting(false);
    }
  };

  const handleTacticalSupport = async (itemType, cost) => {
    if (!isRoundActive || !isThisChallengeActive || actionPending || localSubmitting) return;
    try {
      await performTeamAction(itemType, {
        itemType,
        cost,
        challengeId: targetChallenge?.challengeId || normalizedRouteChallengeId,
      });
      await refreshSessionFromServer();
    } catch {
      // Handled by provider notification
    }
  };

  const handleAcquireOrReattemptThisChallenge = async (isReattempt = false) => {
    if (!isRoundActive || !targetChallenge || actionPending || localSubmitting) return;
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

  const handleBuyThisChallengeForLater = async (isReattempt = false) => {
    if (!isRoundActive || !targetChallenge || actionPending || localSubmitting) return;
    try {
      await performTeamAction('BUY_CHALLENGE', {
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
  const isPurchasedByTeam = (team.purchasedChallenges || []).some(
    (c) => String(c.challengeId).toUpperCase() === normalizedRouteChallengeId
  );

  return (
    <div className="min-h-screen nexus-paper-canvas text-nexus-ink relative flex flex-col">
      {/* =====================================================================
          FOCUSED CHALLENGE TOP BAR:
          CHALLENGE NAME | TIMER | CREDITS
         ===================================================================== */}
      <header
        ref={urgencyFrameRef}
        className="sticky top-0 z-30 border-b-2 border-nexus-ink bg-nexus-ink text-nexus-paper"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* 1. BACK + CHALLENGE NAME */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/challenges"
              className="px-2.5 py-1.5 border border-nexus-paper/30 bg-black/40 hover:bg-nexus-crimson hover:border-nexus-crimson font-mono text-xs font-bold uppercase tracking-wider text-nexus-paper inline-flex items-center gap-1.5 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CHALLENGES</span>
            </Link>

            <div className="min-w-0">
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-nexus-crimson font-bold">
                {targetChallenge?.category || 'CHALLENGE'} · +{targetChallenge?.reward || 400} CR
              </span>
              <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-nexus-paper leading-none truncate">
                {getFriendlyChallengeTitle(targetChallenge)}
              </h1>
            </div>
          </div>

          {/* 2. TIMER & CREDITS */}
          <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
            {/* TIMER */}
            <div
              className={`px-3 py-1.5 border flex items-center gap-2 ${
                !isRoundActive
                  ? 'border-nexus-crimson bg-nexus-crimson text-white'
                  : timerState === 'CRITICAL' || timerState === 'EXPIRED'
                    ? 'border-nexus-crimson bg-nexus-crimson text-white'
                    : timerState === 'WARNING'
                      ? 'border-nexus-crimson bg-black/60 text-nexus-crimson'
                      : 'border-nexus-paper/25 bg-black/40 text-nexus-paper'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <div>
                <span className="block font-mono text-[8px] uppercase tracking-widest opacity-75">
                  {!isRoundActive ? 'ROUND STOPPED' : 'TIMER'}
                </span>
                <span className="font-display text-2xl sm:text-3xl leading-none tracking-wider">
                  {!isRoundActive
                    ? 'LOCKED'
                    : isThisChallengeActive
                      ? formatCountdown(remainingSeconds)
                      : '--:--'}
                </span>
              </div>
            </div>

            {/* CREDITS */}
            <div className="px-3 py-1.5 border border-nexus-crimson/60 bg-nexus-crimson/15">
              <span className="block font-mono text-[8px] uppercase tracking-widest text-nexus-paper/75">
                TEAM CREDITS
              </span>
              <span className="font-display text-2xl sm:text-3xl leading-none tracking-wider text-nexus-crimson">
                {Number(team.credits || 0).toLocaleString()} CR
              </span>
            </div>

            <ThemeToggleButton />
          </div>
        </div>

        {/* Slim Timer Progress Bar */}
        {isThisChallengeActive && isRoundActive && (
          <div className="w-full h-1.5 bg-black overflow-hidden">
            <div
              ref={urgencyBarRef}
              className="h-full bg-nexus-crimson transition-all duration-500"
              style={{ width: `${timerProgressPercent}%` }}
            />
          </div>
        )}
      </header>

      {/* =====================================================================
          MAIN PLAYABLE GAME WORKSPACE
         ===================================================================== */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {!isRoundActive ? (
          <BrutalistPanel
            codeTag="ROUND LOCKED"
            title="ROUND TIMER IS STOPPED"
            accentTitle
            headerRight={<SystemBadge variant="crimson">CHALLENGE ACCESS LOCKED</SystemBadge>}
          >
            <div className="p-6 sm:p-8 border-2 border-nexus-crimson bg-nexus-ink text-nexus-paper space-y-5">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-nexus-crimson font-bold block">
                  ROUND STATUS: {globalTimer?.status || 'PAUSED'} · DEFAULT 45:00
                </span>
                <h2 className="font-display text-4xl sm:text-5xl uppercase text-white leading-none">
                  CHALLENGES ARE LOCKED WHILE TIMER IS STOPPED
                </h2>
                <p className="font-editorial text-sm sm:text-base text-nexus-paper/80 max-w-2xl">
                  You cannot buy, open, play, or submit challenges while the round timer is stopped.
                  Wait for the Organizer to start or resume the 45-minute round timer. Any active or
                  purchased challenges for your team are safely preserved.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/challenges"
                  className="px-6 py-3.5 bg-nexus-crimson text-white hover:bg-white hover:text-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-white/30 transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK TO CHALLENGE MARKET</span>
                </Link>
              </div>
            </div>
          </BrutalistPanel>
        ) : !isThisChallengeActive ? (
          <BrutalistPanel
            codeTag="CHALLENGE"
            title={getFriendlyChallengeTitle(targetChallenge)}
            accentTitle
            headerRight={
              <SystemBadge variant={isSolvedByTeam || isPurchasedByTeam ? 'operational' : 'crimson'}>
                {isSolvedByTeam
                  ? 'SOLVED'
                  : isPurchasedByTeam
                    ? 'BOUGHT BY TEAM (PAID)'
                    : isFailedByTeam
                      ? 'FAILED PREVIOUSLY'
                      : 'READY TO BUY OR START'}
              </SystemBadge>
            }
          >
            <div className="p-6 border-2 border-nexus-ink bg-nexus-paper space-y-5">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-nexus-crimson font-bold">
                  {targetChallenge?.category || 'CHALLENGE'} · DIFFICULTY:{' '}
                  {targetChallenge?.difficulty || 'MODERATE'} · COST:{' '}
                  {isPurchasedByTeam ? '0 CR (ALREADY BOUGHT)' : `${targetChallenge?.cost || 250} CR`} · REWARD: +{targetChallenge?.reward || 500} CR
                </p>
                <h2 className="font-display text-4xl uppercase text-nexus-ink leading-none">
                  {getFriendlyChallengeTitle(targetChallenge)}
                </h2>
                <p className="font-editorial text-sm sm:text-base text-nexus-charcoal max-w-2xl">
                  {getFriendlyChallengeDescription(targetChallenge) ||
                    'Any teammate can buy this challenge now and any teammate can solve it later using shared team credits.'}
                </p>
              </div>

              {team?.currentChallenge &&
                String(team.currentChallenge.challengeId).toUpperCase() !==
                  normalizedRouteChallengeId && (
                  <div className="p-3.5 bg-nexus-ink text-nexus-paper border-l-4 border-nexus-crimson font-mono text-xs flex flex-wrap items-center justify-between gap-3">
                    <span>
                      ACTIVE CHALLENGE IN PROGRESS:{' '}
                      <strong className="text-nexus-crimson">
                        {getFriendlyChallengeTitle(team.currentChallenge)}
                      </strong>
                    </span>
                    <Link
                      to={`/challenge/${team.currentChallenge.challengeId}`}
                      className="px-3 py-1.5 bg-nexus-crimson text-white font-bold uppercase tracking-wider hover:bg-white hover:text-nexus-ink transition-colors"
                    >
                      CONTINUE ACTIVE CHALLENGE
                    </Link>
                  </div>
                )}

              <div className="flex flex-wrap gap-3 pt-2">
                {!isSolvedByTeam && targetChallenge && (
                  <>
                    <button
                      type="button"
                      disabled={actionPending || localSubmitting}
                      onClick={() => handleAcquireOrReattemptThisChallenge(isFailedByTeam && !isPurchasedByTeam)}
                      className="px-6 py-3.5 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isPurchasedByTeam
                        ? '[ SOLVE NOW (0 CR — PAID BY TEAM) ]'
                        : isFailedByTeam
                          ? `[ BUY & REATTEMPT (-${Math.round(
                              targetChallenge.cost * (creditsConfig?.reattemptMultiplier || 1.25)
                            )} CR) ]`
                          : `[ BUY & SOLVE NOW (-${targetChallenge.cost} CR) ]`}
                    </button>

                    {!isPurchasedByTeam && (
                      <button
                        type="button"
                        disabled={actionPending || localSubmitting}
                        onClick={() => handleBuyThisChallengeForLater(isFailedByTeam)}
                        className="px-6 py-3.5 bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-condensed text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isFailedByTeam
                          ? `[ BUY FOR LATER (-${Math.round(
                              targetChallenge.cost * (creditsConfig?.reattemptMultiplier || 1.25)
                            )} CR) ]`
                          : `[ BUY FOR LATER (-${targetChallenge.cost} CR) ]`}
                      </button>
                    )}
                  </>
                )}

                <Link
                  to="/challenges"
                  className="px-6 py-3.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-lg font-extrabold uppercase tracking-[0.18em] transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK TO CHALLENGES</span>
                </Link>
              </div>
            </div>
          </BrutalistPanel>
        ) : (
          <div className="space-y-5">
            {/* 1. THE GAME BOARD */}
            <div className="nexus-editorial-box p-4 sm:p-6 border-2 border-nexus-ink bg-nexus-paper-elevated">
              <ChallengeRenderer
                challenge={targetChallenge}
                session={activeAttempt}
                actionPending={actionPending || localSubmitting}
                disabled={isSubmissionLocked}
                onDraftChange={setDraftSubmission}
                onSubmitAnswer={(payload) => handleAuthoritativeSubmit(payload)}
              />
            </div>

            {/* 2. UNLOCKED HINTS (if any) */}
            <AnimatePresence>
              {unlockedHints.length > 0 && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-nexus-ink text-nexus-paper border-l-4 border-nexus-crimson font-mono text-xs space-y-1.5"
                >
                  <span className="text-[10px] uppercase tracking-widest text-nexus-crimson font-bold block">
                    HINTS ({unlockedHints.length})
                  </span>
                  {unlockedHints.map((hintText, idx) => (
                    <p key={idx} className="text-nexus-paper/90 leading-relaxed">
                      {hintText}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. SUBMIT / COMPLETE, SAVE FOR LATER & COMPACT SUPPORT BAR */}
            <div className="p-4 border-2 border-nexus-ink bg-nexus-paper space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={isSubmissionLocked || !draftSubmission?.answer}
                  onClick={() => handleAuthoritativeSubmit(draftSubmission)}
                  className="flex-1 min-h-[52px] py-3.5 px-6 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-xl font-extrabold uppercase tracking-[0.2em] border-2 border-nexus-ink transition-colors cursor-pointer disabled:opacity-45 flex items-center justify-center gap-2.5"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {localSubmitting || actionPending
                      ? 'SUBMITTING...'
                      : isAttemptAlreadySubmitted
                        ? 'COMPLETED'
                        : 'COMPLETE & SUBMIT'}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isSubmissionLocked}
                  onClick={handleSaveForLater}
                  title="Keep this challenge in your team's purchased queue to solve later without penalty"
                  className="min-h-[52px] py-3.5 px-5 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-condensed text-base font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer disabled:opacity-45 flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-nexus-crimson" />
                  <span>SAVE FOR LATER</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmissionLocked}
                  onClick={handleAbandonSession}
                  className="min-h-[52px] py-3.5 px-5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-condensed text-base font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer disabled:opacity-45 flex items-center justify-center gap-2"
                >
                  <Ban className="w-4 h-4 text-nexus-crimson" />
                  <span>ABANDON</span>
                </button>
              </div>

              {/* Optional Hint & Extra Time Quick Actions */}
              <div className="pt-3 border-t border-dashed border-nexus-ink/20 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[10px] uppercase tracking-widest text-nexus-muted">
                  SHARED TEAM SESSION — ANY TEAMMATE CAN SOLVE OR SAVE FOR LATER
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isSubmissionLocked || hintsRemainingCount <= 0}
                    onClick={() =>
                      handleTacticalSupport('HINT', creditsConfig?.hintCost || 100)
                    }
                    className="px-3 py-1.5 border border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-ink hover:text-nexus-paper font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-45"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-nexus-crimson" />
                    <span>
                      {hintsRemainingCount <= 0
                        ? 'ALL HINTS UNLOCKED'
                        : `HINT (-${creditsConfig?.hintCost || 100} CR)`}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmissionLocked}
                    onClick={() =>
                      handleTacticalSupport('EXTRA_TIME', creditsConfig?.extraTimeCost || 150)
                    }
                    className="px-3 py-1.5 border border-nexus-ink bg-nexus-paper-elevated hover:bg-nexus-ink hover:text-nexus-paper font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-45"
                  >
                    <Clock className="w-3.5 h-3.5 text-nexus-crimson" />
                    <span>
                      +{creditsConfig?.extraTimeMinutes || 5}M TIME (-
                      {creditsConfig?.extraTimeCost || 150} CR)
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          CHALLENGE RESULT MODAL (Framer Motion)
          Supports: SUCCESS | FAILED | TIMEOUT | ABANDONED
         ===================================================================== */}
      <AnimatePresence>
        {lastEvaluationResult && (() => {
          const isSuccess =
            lastEvaluationResult.status === 'SUCCESS' || Boolean(lastEvaluationResult.passed);
          const isTimeout = lastEvaluationResult.status === 'TIMEOUT';
          const isAbandoned = lastEvaluationResult.status === 'ABANDONED';
          const headlineText = isSuccess
            ? 'CHALLENGE SOLVED!'
            : isTimeout
              ? 'TIME EXPIRED!'
              : isAbandoned
                ? 'CHALLENGE ABANDONED'
                : 'CHALLENGE FAILED!';
          const subHeadlineText = isSuccess
            ? 'SUCCESS — CORRECT SOLUTION VERIFIED'
            : isTimeout
              ? 'SESSION TIMED OUT BEFORE COMPLETION'
              : isAbandoned
                ? 'SESSION ABORTED BY OPERATIVE'
                : 'WRONG SOLUTION — PENALTY APPLIED';

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={clearEvaluationResult}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { scale: 0.94, opacity: 0, y: 8 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="session-result-modal-title"
                className={`nexus-editorial-box max-w-xl w-full overflow-hidden border-4 ${
                  isSuccess
                    ? 'border-emerald-500 shadow-[0_0_55px_rgba(16,185,129,0.55)]'
                    : 'border-red-600 shadow-[0_0_55px_rgba(220,38,38,0.6)]'
                }`}
              >
                {/* Colorful Hero Result Banner (GREEN for Success, RED for Failure) */}
                <div
                  className={`px-6 py-6 border-b-4 border-nexus-ink relative overflow-hidden ${
                    isSuccess
                      ? 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-600 text-white'
                      : 'bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={clearEvaluationResult}
                    aria-label="Close result modal"
                    className="absolute top-4 right-4 w-9 h-9 border-2 border-white/40 bg-black/25 hover:bg-black/50 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pr-10">
                    <div
                      className={`w-16 h-16 shrink-0 border-2 border-white flex items-center justify-center shadow-lg ${
                        isSuccess ? 'bg-emerald-900/50' : 'bg-red-950/60'
                      }`}
                    >
                      {isSuccess ? (
                        <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
                      ) : (
                        <ShieldAlert className="w-10 h-10 text-white stroke-[2.5]" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 bg-black/35 border border-white/40 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                        {subHeadlineText}
                      </span>
                      <h2
                        id="session-result-modal-title"
                        className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-white leading-none drop-shadow-sm"
                      >
                        {headlineText}
                      </h2>
                    </div>
                  </div>

                  {/* Prominent Credit Delta Pill */}
                  <div className="mt-5 pt-4 border-t border-white/25 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/90">
                      {getFriendlyChallengeTitle(lastEvaluationResult.title || targetChallenge)}
                    </span>
                    <span
                      className={`px-4 py-1.5 border-2 border-white font-display text-2xl sm:text-3xl tracking-wider leading-none ${
                        isSuccess
                          ? 'bg-emerald-950/80 text-emerald-300'
                          : 'bg-red-950/80 text-red-200'
                      }`}
                    >
                      {lastEvaluationResult.creditsDelta >= 0
                        ? `+${lastEvaluationResult.creditsDelta} CR`
                        : `${lastEvaluationResult.creditsDelta} CR`}
                    </span>
                  </div>
                </div>

                {/* Result Body */}
                <div className="p-6 space-y-5 bg-nexus-paper">
                  {lastEvaluationResult.reason && !isSuccess && (
                    <div className="p-3.5 border-2 border-red-600 bg-red-600/10 text-red-700 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5">
                      <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                      <span>{lastEvaluationResult.reason}</span>
                    </div>
                  )}

                  <p className="font-editorial text-sm sm:text-base text-nexus-charcoal leading-relaxed">
                    {lastEvaluationResult.message}
                  </p>

                  {/* Outcome Summary Grid */}
                  <div className="grid grid-cols-3 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper divide-x divide-nexus-paper/15 font-mono">
                    <div
                      className={`p-3.5 ${
                        isSuccess ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      <span className="block text-[9px] uppercase tracking-widest text-white/80 font-bold">
                        OUTCOME
                      </span>
                      <span className="font-display text-xl sm:text-2xl uppercase tracking-wider leading-none mt-0.5 block">
                        {isSuccess ? 'PASSED ✓' : `${lastEvaluationResult.status} ✕`}
                      </span>
                    </div>

                    <div className="p-3.5">
                      <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                        {isSuccess ? 'REWARD' : 'PENALTY'}
                      </span>
                      <span
                        className={`font-display text-xl sm:text-2xl tracking-wider leading-none mt-0.5 block ${
                          isSuccess ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {lastEvaluationResult.creditsDelta >= 0
                          ? `+${lastEvaluationResult.creditsDelta} CR`
                          : `${lastEvaluationResult.creditsDelta} CR`}
                      </span>
                    </div>

                    <div className="p-3.5">
                      <span className="block text-[9px] uppercase tracking-widest text-nexus-paper/60">
                        TEAM BALANCE
                      </span>
                      <span className="font-display text-xl sm:text-2xl tracking-wider leading-none mt-0.5 block text-white">
                        {Number(
                          lastEvaluationResult.balanceAfter ?? team?.credits ?? 0
                        ).toLocaleString()}{' '}
                        CR
                      </span>
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    {!isSuccess && (
                      <button
                        type="button"
                        disabled={actionPending || localSubmitting}
                        onClick={() => handleAcquireOrReattemptThisChallenge(true)}
                        className="flex-1 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-condensed text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink transition-colors cursor-pointer"
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
                      className={`flex-1 py-3.5 px-4 border-2 border-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                        isSuccess
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-nexus-ink text-nexus-paper hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      {isSuccess ? 'CONTINUE TO CHALLENGES →' : 'BACK TO CHALLENGES'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default ChallengeSessionPage;
