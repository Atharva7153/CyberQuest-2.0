import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crosshair,
  Users,
  Clock,
  ArrowUpRight,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { PortalShellLayout, getTeamSizeMeta } from '../layouts/PortalShellLayout';
import { RiskBadge } from '../components/RiskBadge';
import {
  ChallengeMarketModule,
  ClassifiedChallengeCard,
  formatTimeLimit,
} from '../components/ChallengeMarketModule';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

const formatShortCountdown = (seconds) => {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const DashboardPage = ({ initialSection = 'HOME' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const {
    team,
    nexusCore,
    catalog,
    attempts,
    transactions,
    serverClockOffsetMs,
    creditsConfig,
    lastCreditChange,
    isAuthenticated,
    isInitializing,
    onlineOperatives,
    notifications,
    actionPending,
    logoutTeam,
    performTeamAction,
    dismissNotification,
  } = useTeamPortal();

  const [activeSection, setActiveSection] = useState(
    () => searchParams.get('section') || initialSection || 'HOME'
  );
  const [selectedChallengeModal, setSelectedChallengeModal] = useState(null);
  const [nowTick, setNowTick] = useState(() => Date.now());

  useEffect(() => {
    const requestedSection = searchParams.get('section');
    if (requestedSection) {
      setActiveSection(requestedSection === 'DASHBOARD' ? 'HOME' : requestedSection);
    } else if (initialSection) {
      setActiveSection(initialSection);
    } else {
      setActiveSection('HOME');
    }
  }, [searchParams, initialSection]);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isInitializing, isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTick(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Build 2-3 clean human-readable recent activity items
  const recentActivityItems = useMemo(() => {
    const items = [];

    // 1. Check recent challenge attempts
    const sortedAttempts = [...(attempts || [])].sort(
      (a, b) =>
        new Date(b.completedAt || b.startedAt || 0).getTime() -
        new Date(a.completedAt || a.startedAt || 0).getTime()
    );

    for (const att of sortedAttempts) {
      if (items.length >= 3) break;
      const status = String(att.status || '').toUpperCase();
      const title = att.title || 'Challenge';
      if (status === 'SUCCESS' || status === 'COMPLETED') {
        items.push({
          id: `att-${att.attemptId}`,
          label: `${title} completed`,
          delta: `+${att.potentialReward || 400} CR`,
          positive: true,
        });
      } else if (status === 'FAILED' || status === 'TIMEOUT' || status === 'ABANDONED') {
        items.push({
          id: `att-${att.attemptId}`,
          label: `${title} failed`,
          delta: `-${att.penaltyOnFail || 100} CR`,
          positive: false,
        });
      }
    }

    // 2. Fallback to transactions if fewer than 3 items
    if (items.length < 3 && Array.isArray(transactions)) {
      for (const tx of transactions) {
        if (items.length >= 3) break;
        const amt = Number(tx.amount || 0);
        if (amt === 0) continue;
        const type = String(tx.type || '').toUpperCase();
        let label = 'Credit update';
        if (type === 'CHALLENGE_REWARD') label = 'Challenge completed';
        else if (type === 'FAILURE_PENALTY') label = 'Challenge failed';
        else if (type === 'CHALLENGE_PURCHASE') label = 'Challenge started';
        else if (type === 'HINT') label = 'Hint unlocked';
        else if (type === 'EXTRA_TIME') label = 'Extra time added';
        else if (type === 'ABILITY') label = 'Ability activated';
        else if (type === 'REATTEMPT') label = 'Challenge reattempt';

        items.push({
          id: tx._id || `tx-${tx.timestamp}-${items.length}`,
          label,
          delta: amt >= 0 ? `+${amt} CR` : `${amt} CR`,
          positive: amt >= 0,
        });
      }
    }

    // 3. Fallback to completedChallenges on team record
    if (items.length === 0 && Array.isArray(team?.completedChallenges)) {
      for (const comp of team.completedChallenges.slice(0, 3)) {
        items.push({
          id: `comp-${comp.challengeId}`,
          label: `${comp.title || 'Challenge'} completed`,
          delta: `+${comp.reward || 400} CR`,
          positive: true,
        });
      }
    }

    return items.slice(0, 3);
  }, [attempts, transactions, team?.completedChallenges]);

  if (isInitializing) {
    return (
      <div className="min-h-screen nexus-paper-canvas flex items-center justify-center p-6">
        <div className="nexus-editorial-box p-8 max-w-md w-full text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-nexus-crimson font-bold">
            CYBER QUEST // NEXUS
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            LOADING YOUR PORTAL...
          </h1>
        </div>
      </div>
    );
  }

  if (!team) {
    return null;
  }

  const handleLogout = () => {
    logoutTeam();
    navigate('/login', { replace: true });
  };

  const handleAcquireChallenge = async ({ challengeId, isReattempt = false }) => {
    const res = await performTeamAction('ACQUIRE_CHALLENGE', {
      challengeId,
      isReattempt,
    });
    if (challengeId) {
      navigate(`/challenge/${challengeId}`);
    }
    return res;
  };

  const handleConfirmPurchaseChallenge = async (challenge) => {
    try {
      setSelectedChallengeModal(null);
      if (activeChallenge?.challengeId === challenge.challengeId) {
        navigate(`/challenge/${challenge.challengeId}`);
        return;
      }
      await handleAcquireChallenge({
        challengeId: challenge.challengeId,
        isReattempt: Boolean(challenge.isReattempt),
      });
    } catch {
      // Handled by provider notification
    }
  };

  const activeChallenge = team.currentChallenge;
  const activeAttempt = team.activeAttempt;

  // Compute active challenge remaining time
  const expiresAtMs = activeAttempt?.expiresAt
    ? new Date(activeAttempt.expiresAt).getTime()
    : null;
  const estimatedServerNow = nowTick + Number(serverClockOffsetMs || 0);
  const activeRemainingSec = expiresAtMs
    ? Math.max(0, Math.ceil((expiresAtMs - estimatedServerNow) / 1000))
    : Number(activeAttempt?.timeLimit || activeChallenge?.timeLimit || 900);

  // Variable Team Size metadata (SOLO, DUO, TRIO, SQUAD)
  const teamMeta = getTeamSizeMeta(team, onlineOperatives);

  // Preview 3 available challenges for HOME
  const completedIds = new Set((team.completedChallenges || []).map((c) => c.challengeId));
  const failedIds = new Set((team.failedChallenges || []).map((c) => c.challengeId));
  const previewChallenges = (catalog || [])
    .filter((c) => c.enabled !== false)
    .slice(0, 3);

  const coreState = nexusCore?.state || 'LOCKED';

  const renderHomeContent = () => (
    <div className="space-y-6">
      {/* =====================================================================
          1. WELCOME BANNER
          WELCOME, TEAM CIPHER
          Choose your next move.
         ===================================================================== */}
      <div className="nexus-editorial-box p-5 sm:p-6 border-2 border-nexus-ink bg-nexus-paper-elevated flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-nexus-crimson font-bold block">
            CYBER QUEST — NEXUS: THE LAST CHANCE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-nexus-ink leading-none">
            WELCOME, <span className="text-nexus-crimson">{team.teamName || team.teamId}</span>
          </h1>
          <p className="font-editorial text-sm sm:text-base text-nexus-charcoal font-medium">
            Choose your next move.
          </p>
        </div>

        {/* Optional NEXUS Core Announcement if unlocked/active */}
        {coreState !== 'LOCKED' && (
          <Link
            to="/nexus-core"
            className="px-4 py-3 bg-nexus-ink text-nexus-paper border-2 border-nexus-crimson shadow-brutal-crimson hover:bg-nexus-crimson hover:text-white transition-colors flex items-center justify-between gap-3 shrink-0"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-crimson font-bold block">
                NEXUS CORE {coreState}
              </span>
              <span className="font-condensed text-lg font-extrabold uppercase tracking-wider">
                ENTER THE NEXUS CORE
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        )}
      </div>

      {/* =====================================================================
          2. CURRENT CHALLENGE + TEAM + RECENT ACTIVITY GRID
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT 7 COLS: CURRENT CHALLENGE */}
        <div className="lg:col-span-7 flex flex-col">
          {activeChallenge ? (
            <div className="nexus-editorial-box p-5 sm:p-6 border-2 border-nexus-crimson bg-nexus-ink text-nexus-paper flex-1 flex flex-col justify-between space-y-5 shadow-brutal-crimson">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-nexus-paper/15 pb-3">
                  <span className="px-2.5 py-0.5 bg-nexus-crimson text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                    ACTIVE CHALLENGE
                  </span>
                  <span className="font-mono text-xs text-nexus-paper/75 uppercase">
                    {activeChallenge.category}
                  </span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-white leading-none">
                  {activeChallenge.title}
                </h2>

                {activeChallenge.description && (
                  <p className="font-editorial text-xs sm:text-sm text-nexus-paper/80 leading-relaxed">
                    {activeChallenge.description}
                  </p>
                )}

                <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 border border-nexus-paper/20 bg-black/40">
                    <span className="block text-[10px] uppercase tracking-widest text-nexus-paper/60">
                      TIME LEFT
                    </span>
                    <span className="font-display text-2xl sm:text-3xl text-nexus-crimson leading-none mt-1 block">
                      {formatShortCountdown(activeRemainingSec)}
                    </span>
                  </div>

                  <div className="p-3 border border-nexus-paper/20 bg-black/40">
                    <span className="block text-[10px] uppercase tracking-widest text-nexus-paper/60">
                      REWARD
                    </span>
                    <span className="font-display text-2xl sm:text-3xl text-white leading-none mt-1 block">
                      +{activeChallenge.reward} CR
                    </span>
                  </div>

                  <div className="p-3 border border-nexus-paper/20 bg-black/40 flex flex-col justify-between">
                    <span className="block text-[10px] uppercase tracking-widest text-nexus-paper/60">
                      RISK
                    </span>
                    <div className="mt-1">
                      <RiskBadge risk={activeChallenge.risk} size="xs" variant="onDark" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/challenge/${activeChallenge.challengeId}`)}
                className="w-full py-3.5 px-5 bg-nexus-crimson hover:bg-white text-white hover:text-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.2em] border-2 border-white/30 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>[ CONTINUE CHALLENGE ]</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="nexus-editorial-box p-6 sm:p-8 border-2 border-nexus-ink bg-nexus-paper flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-nexus-muted font-bold block">
                  CURRENT CHALLENGE
                </span>
                <h2 className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-nexus-ink leading-none">
                  NONE
                </h2>
                <p className="font-editorial text-sm sm:text-base text-nexus-charcoal max-w-md pt-1">
                  You do not have an active challenge running. Select a challenge from the market to
                  begin earning Resistance Credits.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setActiveSection('CHALLENGES')}
                  className="w-full sm:w-auto py-3.5 px-6 bg-nexus-crimson hover:bg-nexus-ink text-white font-condensed text-lg font-extrabold uppercase tracking-[0.2em] border-2 border-nexus-ink shadow-brutal-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Crosshair className="w-4 h-4" />
                  <span>[ BROWSE CHALLENGES ]</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT 5 COLS: TEAM + RECENT ACTIVITY */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* TEAM CARD (Supports SOLO = 1, DUO = 2, TRIO = 3, SQUAD = 4) */}
          <div className="nexus-editorial-box p-5 border-2 border-nexus-ink bg-nexus-paper space-y-3.5">
            <div className="flex items-center justify-between border-b-2 border-nexus-ink pb-2.5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                  TEAM ({teamMeta.formatLabel})
                </span>
                <h3 className="font-condensed text-xl font-extrabold uppercase tracking-wider text-nexus-ink">
                  {team.teamName || team.teamId}
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-widest">
                {teamMeta.onlineSummary}
              </span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {teamMeta.members.map((member, index) => {
                const isOnline = index < teamMeta.onlineCount;
                return (
                  <li
                    key={member.memberId || member.name || index}
                    className="px-3 py-2 border border-nexus-ink/30 bg-nexus-paper-elevated flex items-center justify-between gap-2"
                  >
                    <span className="font-bold uppercase text-nexus-ink truncate flex items-center gap-2">
                      <span
                        className={`text-xs leading-none ${
                          isOnline ? 'text-nexus-crimson' : 'text-nexus-muted'
                        }`}
                      >
                        {isOnline ? '●' : '○'}
                      </span>
                      <span>{member.name}</span>
                    </span>
                    <span className="text-[10px] text-nexus-muted uppercase">
                      {isOnline ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RECENT ACTIVITY CARD (2-3 Latest Items Only) */}
          <div className="nexus-editorial-box p-5 border-2 border-nexus-ink bg-nexus-paper flex-1 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-nexus-ink pb-2">
              <span className="font-condensed text-lg font-extrabold uppercase tracking-wider text-nexus-ink">
                RECENT ACTIVITY
              </span>
              <Link
                to="/history"
                className="font-mono text-[10px] font-bold uppercase tracking-widest text-nexus-crimson hover:underline"
              >
                VIEW HISTORY →
              </Link>
            </div>

            {recentActivityItems.length === 0 ? (
              <p className="font-mono text-xs text-nexus-muted py-3">
                No completed challenges yet. Start your first challenge to build momentum.
              </p>
            ) : (
              <ul className="space-y-2 font-mono text-xs">
                {recentActivityItems.map((item) => (
                  <li
                    key={item.id}
                    className="px-3 py-2 border border-nexus-ink/25 bg-nexus-paper-elevated flex items-center justify-between gap-3"
                  >
                    <span className="text-nexus-ink font-semibold truncate">
                      {item.label}
                    </span>
                    <span
                      className={`font-bold shrink-0 ${
                        item.positive ? 'text-nexus-ink' : 'text-nexus-crimson'
                      }`}
                    >
                      {item.delta}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. AVAILABLE CHALLENGES (3 Cards + [ VIEW ALL ])
         ===================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-nexus-ink pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-nexus-muted block">
              CHALLENGE MARKET
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-nexus-ink leading-none mt-0.5">
              AVAILABLE CHALLENGES
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setActiveSection('CHALLENGES')}
            className="px-4 py-2 bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            [ VIEW ALL ({catalog.filter((c) => c.enabled !== false).length}) ]
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewChallenges.map((challenge) => {
            const isCurrent = activeChallenge?.challengeId === challenge.challengeId;
            const isSolved = completedIds.has(challenge.challengeId);
            const isFailed = failedIds.has(challenge.challengeId);
            const reattemptCost = Math.round(
              Number(challenge.cost || 0) * (Number(creditsConfig?.reattemptMultiplier) || 1.25)
            );

            return (
              <ClassifiedChallengeCard
                key={challenge.challengeId}
                challenge={challenge}
                isCurrent={isCurrent}
                isSolved={isSolved}
                isFailed={isFailed}
                reattemptMultiplier={creditsConfig?.reattemptMultiplier || 1.25}
                isSelected={selectedChallengeModal?.challengeId === challenge.challengeId}
                onSelectChallenge={(chg) => {
                  if (isCurrent) {
                    navigate(`/challenge/${chg.challengeId}`);
                    return;
                  }
                  setSelectedChallengeModal({
                    ...chg,
                    isReattempt: isFailed,
                    effectiveCost: isFailed ? reattemptCost : chg.cost,
                  });
                }}
                prefersReducedMotion={prefersReducedMotion}
                compact
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    if (activeSection === 'CHALLENGES') {
      return (
        <ChallengeMarketModule
          catalog={catalog}
          team={team}
          creditsConfig={creditsConfig}
          actionPending={actionPending}
          onAcquireChallenge={handleAcquireChallenge}
          onOpenExecutionPanel={() => {
            if (activeChallenge?.challengeId) {
              navigate(`/challenge/${activeChallenge.challengeId}`);
            }
          }}
          compact={false}
        />
      );
    }

    return renderHomeContent();
  };

  return (
    <PortalShellLayout
      team={team}
      activeSection={activeSection}
      onSelectSection={setActiveSection}
      onlineOperatives={onlineOperatives}
      lastCreditChange={lastCreditChange}
      notifications={notifications}
      onDismissNotification={dismissNotification}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {renderSectionContent()}
        </motion.div>
      </AnimatePresence>

      {/* Challenge Start Confirmation Modal from Home Preview */}
      <AnimatePresence>
        {selectedChallengeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setSelectedChallengeModal(null)}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-challenge-title"
              className="nexus-editorial-box max-w-md w-full p-6 space-y-5 border-2 border-nexus-ink shadow-brutal"
            >
              <div className="flex items-center justify-between border-b-2 border-nexus-ink pb-3">
                <span className="bg-nexus-crimson text-white font-mono text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-widest">
                  {selectedChallengeModal.isReattempt
                    ? 'REATTEMPT CHALLENGE'
                    : 'START CHALLENGE'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedChallengeModal(null)}
                  className="text-nexus-ink hover:text-nexus-crimson cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                  {selectedChallengeModal.category}
                </span>
                <h2
                  id="modal-challenge-title"
                  className="font-display text-3xl uppercase text-nexus-ink leading-none"
                >
                  {selectedChallengeModal.title}
                </h2>
                <p className="font-editorial text-sm text-nexus-charcoal">
                  {selectedChallengeModal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs bg-nexus-paper p-3 border border-nexus-ink">
                <div>
                  <span className="text-nexus-muted block text-[10px]">COST</span>
                  <span className="font-bold text-nexus-crimson">
                    {selectedChallengeModal.effectiveCost ?? selectedChallengeModal.cost} CR
                  </span>
                </div>
                <div>
                  <span className="text-nexus-muted block text-[10px]">REWARD</span>
                  <span className="font-bold text-nexus-ink">
                    +{selectedChallengeModal.reward} CR
                  </span>
                </div>
                <div>
                  <span className="text-nexus-muted block text-[10px]">DIFFICULTY</span>
                  <span className="font-bold">{selectedChallengeModal.difficulty}</span>
                </div>
                <div>
                  <span className="text-nexus-muted block text-[10px] mb-0.5">RISK</span>
                  <RiskBadge risk={selectedChallengeModal.risk} size="xs" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-nexus-muted block text-[10px]">TIME</span>
                  <span className="font-bold">
                    {formatTimeLimit(selectedChallengeModal.timeLimit)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedChallengeModal(null)}
                  className="flex-1 py-2.5 border-2 border-nexus-ink bg-nexus-paper font-condensed text-base font-bold uppercase tracking-wider cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  disabled={actionPending}
                  onClick={() => handleConfirmPurchaseChallenge(selectedChallengeModal)}
                  className="flex-1 py-2.5 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  [ START ({selectedChallengeModal.effectiveCost ?? selectedChallengeModal.cost} CR) ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalShellLayout>
  );
};

export default DashboardPage;
