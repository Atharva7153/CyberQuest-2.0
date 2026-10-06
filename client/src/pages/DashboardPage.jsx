import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crosshair,
  Send,
  Zap,
  Coins,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HelpCircle,
  Shield,
  Terminal,
  X,
} from 'lucide-react';
import { PortalShellLayout } from '../layouts/PortalShellLayout';
import { BrutalistPanel } from '../components/BrutalistPanel';
import { SystemBadge } from '../components/SystemBadge';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const {
    team,
    catalog,
    isAuthenticated,
    isInitializing,
    socketConnected,
    joinedRoom,
    onlineOperatives,
    notifications,
    actionPending,
    logoutTeam,
    performTeamAction,
    dismissNotification,
  } = useTeamPortal();

  const [activeSection, setActiveSection] = useState('DASHBOARD');
  const [solutionInput, setSolutionInput] = useState('NEXUS{CORE_SYNCHRONIZED_2026}');
  const [selectedChallengeModal, setSelectedChallengeModal] = useState(null);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isInitializing, isAuthenticated, navigate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen nexus-paper-canvas flex items-center justify-center p-6">
        <div className="nexus-editorial-box p-8 max-w-md w-full text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-nexus-crimson font-bold">
            NEXUS CORE // HANDSHAKE
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            SYNCHRONIZING TEAM STATE...
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

  const handleConfirmPurchaseChallenge = async (challenge) => {
    try {
      await performTeamAction('PURCHASE_CHALLENGE', {
        challengeId: challenge.challengeId,
      });
      setSelectedChallengeModal(null);
    } catch {
      // Error notification handled by provider
    }
  };

  const handleSpendCredits = async (itemType, cost) => {
    try {
      await performTeamAction('SPEND_CREDITS', { itemType, cost });
    } catch {
      // Handled by provider
    }
  };

  const handleUseAbility = async (abilityId) => {
    try {
      await performTeamAction('USE_ABILITY', { abilityId });
    } catch {
      // Handled by provider
    }
  };

  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    if (!solutionInput.trim()) return;
    try {
      await performTeamAction('SUBMIT_CHALLENGE', { solution: solutionInput.trim() });
    } catch {
      // Handled by provider
    }
  };

  const activeChallenge = team.currentChallenge;
  const progressPercent = team.stats?.coreProgressPercent ?? 72;
  const recentActivity = team.stats?.recentActivity || [];

  // Shared sub-panels used in DASHBOARD and individual views
  const renderChallengeMarketPanel = (expanded = false) => (
    <BrutalistPanel
      codeTag="MARKET"
      title="LIVE CHALLENGE MARKET"
      accentTitle
      headerRight={
        <span className="font-mono text-[10px] uppercase text-nexus-muted">
          CLICK TO DEPLOY CREDITS
        </span>
      }
      className="h-full"
    >
      <div className="space-y-2.5">
        {catalog.map((chg) => {
          const isCurrent = activeChallenge?.challengeId === chg.challengeId;
          const isSolved = (team.completedChallenges || []).some(
            (c) => c.challengeId === chg.challengeId
          );

          return (
            <div
              key={chg.challengeId}
              className={`p-3 border transition-colors flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'border-nexus-crimson bg-nexus-crimson/5'
                  : 'border-nexus-ink/25 bg-nexus-paper hover:border-nexus-ink'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-condensed text-base font-extrabold uppercase tracking-wider text-nexus-ink truncate">
                    {chg.title}
                  </p>
                  {isCurrent && (
                    <span className="px-1.5 py-0.5 bg-nexus-crimson text-white font-mono text-[9px] font-bold uppercase">
                      ACTIVE
                    </span>
                  )}
                  {isSolved && !isCurrent && (
                    <span className="px-1.5 py-0.5 bg-nexus-ink text-nexus-paper font-mono text-[9px] font-bold uppercase">
                      SOLVED
                    </span>
                  )}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-nexus-muted mt-0.5">
                  {chg.category} · RISK: {chg.risk} · REWARD: +{chg.reward} CR
                </p>
                {expanded && (
                  <p className="font-editorial text-xs text-nexus-charcoal mt-1.5">
                    {chg.description}
                  </p>
                )}
              </div>

              <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                <span className="font-mono text-xs font-bold text-nexus-crimson">
                  {chg.cost} CR
                </span>
                <button
                  type="button"
                  disabled={actionPending}
                  onClick={() => setSelectedChallengeModal(chg)}
                  className="px-2.5 py-1 bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isCurrent ? 'RE-ENTER' : 'SELECT'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </BrutalistPanel>
  );

  const renderSubmissionAndTacticalPanel = () => (
    <BrutalistPanel
      codeTag="EXEC"
      title="SUBMIT SOLUTION & TACTICAL SPEND"
      accentTitle
      headerRight={
        <SystemBadge variant={activeChallenge ? 'crimson' : 'outline'}>
          {activeChallenge ? activeChallenge.title : 'IDLE'}
        </SystemBadge>
      }
      className="h-full"
    >
      <div className="space-y-4 flex flex-col justify-between">
        {/* Current Active Challenge Info */}
        <div className="p-3 border border-nexus-ink bg-nexus-paper space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[10px] text-nexus-muted uppercase">
            <span>ACTIVE OBJECTIVE</span>
            <span>
              HINTS: {team.activeAttempt?.hintsUnlocked || 0} | +TIME:{' '}
              {team.activeAttempt?.extraTimeMinutes || 0}M
            </span>
          </div>
          <p className="font-condensed text-lg font-extrabold uppercase tracking-wide text-nexus-ink">
            {activeChallenge ? activeChallenge.title : 'SELECT A CHALLENGE FROM MARKET'}
          </p>
          <p className="font-mono text-[11px] text-nexus-crimson font-semibold">
            {activeChallenge
              ? `REWARD: +${activeChallenge.reward} CR // FAIL PENALTY: -${activeChallenge.penalty} CR`
              : 'All 4 team members receive instant state sync upon submission.'}
          </p>
        </div>

        {/* Submit Solution Form */}
        <form onSubmit={handleSubmitSolution} className="space-y-2.5">
          <label
            htmlFor="portal-solution-input"
            className="block font-mono text-[10px] uppercase tracking-widest text-nexus-muted"
          >
            UPLOAD / TRANSMIT SOLUTION PAYLOAD
          </label>
          <input
            id="portal-solution-input"
            type="text"
            value={solutionInput}
            onChange={(e) => setSolutionInput(e.target.value)}
            placeholder="NEXUS{FLAG_OR_SOLUTION}"
            className="w-full px-3 py-2.5 bg-nexus-paper border-2 border-nexus-ink font-mono text-xs font-bold text-nexus-ink focus:border-nexus-crimson focus:outline-none"
          />
          <button
            type="submit"
            disabled={actionPending}
            className="w-full py-2.5 px-4 bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-base font-extrabold uppercase tracking-[0.18em] border border-nexus-ink transition-colors cursor-pointer disabled:opacity-50"
          >
            SUBMIT SOLUTION
          </button>
        </form>

        {/* Tactical Credit Spend Controls (Hint / Extra Time) */}
        <div className="pt-3 border-t border-dashed border-nexus-ink/25 space-y-2">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
            DEPLOY RESISTANCE CREDITS (SHARED SQUAD ACTION)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={actionPending}
              onClick={() => handleSpendCredits('HINT', 100)}
              className="py-2 px-2.5 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer"
            >
              UNLOCK HINT (-100 CR)
            </button>
            <button
              type="button"
              disabled={actionPending}
              onClick={() => handleSpendCredits('EXTRA_TIME', 150)}
              className="py-2 px-2.5 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer"
            >
              +5M TIME (-150 CR)
            </button>
          </div>
        </div>
      </div>
    </BrutalistPanel>
  );

  const renderAbilitiesPanel = (expanded = false) => (
    <BrutalistPanel
      codeTag="MODS"
      title="ABILITIES"
      accentTitle
      headerRight={
        <span className="font-mono text-[10px] text-nexus-muted uppercase">
          USED: {team.stats?.abilitiesUsed || 0}
        </span>
      }
      className="h-full"
    >
      <div className="space-y-3.5">
        {(team.abilities || []).map((ability) => (
          <div
            key={ability.abilityId}
            className="p-3 border border-nexus-ink/25 bg-nexus-paper space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-condensed text-base font-extrabold uppercase tracking-wider text-nexus-ink">
                  {ability.name}
                </p>
                {expanded && (
                  <p className="font-editorial text-xs text-nexus-charcoal mt-0.5">
                    {ability.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                disabled={actionPending}
                onClick={() => handleUseAbility(ability.abilityId)}
                className="px-2.5 py-1 bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                USE (-{ability.cost} CR)
              </button>
            </div>

            {/* Charge bar matching portal visual reference */}
            <div className="w-full h-2 bg-nexus-ink/15 overflow-hidden">
              <div
                className="h-full bg-nexus-crimson transition-all duration-300"
                style={{ width: `${ability.chargePercent || 75}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </BrutalistPanel>
  );

  const renderProgressAndFeedPanel = () => (
    <BrutalistPanel
      codeTag="CORE_TRACKER"
      title="OVERALL PROGRESS TOWARD NEXUS CORE"
      accentTitle={false}
      headerRight={
        <span className="font-mono text-sm font-bold text-nexus-crimson">
          {progressPercent}%
        </span>
      }
    >
      <div className="space-y-5">
        {/* Progress Bar */}
        <div className="w-full h-4 bg-nexus-ink p-0.5 border border-nexus-ink">
          <div
            className="h-full bg-nexus-crimson transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Synchronized Real-Time Squad Activity Log */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
            <span>SERVER-AUTHORITATIVE SQUAD EVENT LOG ({joinedRoom})</span>
            <span>SOLVED: {team.stats?.totalSolved || 0}</span>
          </div>

          <div className="bg-nexus-ink text-nexus-paper p-3 font-mono text-xs max-h-40 overflow-y-auto space-y-1.5 border border-nexus-ink">
            {recentActivity.length === 0 ? (
              <p className="text-nexus-paper/60">No squad events recorded yet.</p>
            ) : (
              recentActivity.map((item) => (
                <div
                  key={item.eventId || item.timestamp}
                  className="flex items-center justify-between gap-3 border-b border-nexus-paper/10 pb-1 last:border-none"
                >
                  <span className="truncate">{item.summary}</span>
                  <span
                    className={`shrink-0 font-bold ${
                      item.creditsDelta >= 0 ? 'text-white' : 'text-nexus-crimson'
                    }`}
                  >
                    {item.creditsDelta > 0
                      ? `+${item.creditsDelta} CR`
                      : `${item.creditsDelta} CR`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </BrutalistPanel>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'CHALLENGES':
        return (
          <div className="space-y-6">
            {renderChallengeMarketPanel(true)}
            {renderSubmissionAndTacticalPanel()}
          </div>
        );

      case 'MY_TEAM':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <BrutalistPanel
                codeTag="SQUAD_ROSTER"
                title={`TEAM ${team.teamName} (${team.teamId})`}
                accentTitle
                headerRight={
                  <SystemBadge variant="operational" pulse>
                    {onlineOperatives} TERMINAL(S) IN ROOM
                  </SystemBadge>
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(team.members || []).map((member, index) => {
                    const isOnline = index < onlineOperatives;
                    return (
                      <div
                        key={member.memberId}
                        className="p-4 border-2 border-nexus-ink bg-nexus-paper flex items-center justify-between"
                      >
                        <div>
                          <span className="font-mono text-[10px] text-nexus-muted block">
                            {member.memberId} // {member.role}
                          </span>
                          <p className="font-condensed text-lg font-extrabold uppercase text-nexus-ink">
                            {member.name}
                          </p>
                        </div>
                        <SystemBadge variant={isOnline ? 'crimson' : 'outline'} pulse={isOnline}>
                          {isOnline ? 'LINKED' : 'STANDBY'}
                        </SystemBadge>
                      </div>
                    );
                  })}
                </div>
              </BrutalistPanel>
            </div>

            <div className="lg:col-span-5">
              <BrutalistPanel codeTag="ROOM_SYNC" title="SOCKET.IO ROOM ARCHITECTURE">
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between py-1.5 border-b border-dashed border-nexus-ink/20">
                    <span className="text-nexus-muted">AUTHORITATIVE ROOM:</span>
                    <span className="font-bold text-nexus-crimson">{joinedRoom}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-dashed border-nexus-ink/20">
                    <span className="text-nexus-muted">CONNECTED TERMINALS:</span>
                    <span className="font-bold">{onlineOperatives} / 4</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-dashed border-nexus-ink/20">
                    <span className="text-nexus-muted">SHARED CREDITS:</span>
                    <span className="font-bold">{team.credits} CR</span>
                  </div>
                  <p className="pt-2 text-nexus-charcoal leading-relaxed">
                    Open a second browser window logged into{' '}
                    <strong className="text-nexus-ink">{team.teamId}</strong> to observe
                    instantaneous multi-operative synchronization across all actions.
                  </p>
                </div>
              </BrutalistPanel>
            </div>
          </div>
        );

      case 'CREDITS':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">{renderSubmissionAndTacticalPanel()}</div>
            <div className="lg:col-span-6">{renderProgressAndFeedPanel()}</div>
          </div>
        );

      case 'SUBMISSIONS':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">{renderSubmissionAndTacticalPanel()}</div>
            <div className="lg:col-span-6">
              <BrutalistPanel codeTag="HISTORY" title="COMPLETED & FAILED SUBMISSIONS">
                <div className="space-y-3 font-mono text-xs">
                  <p className="font-bold text-nexus-ink uppercase">
                    SOLVED ({team.completedChallenges?.length || 0})
                  </p>
                  {(team.completedChallenges || []).map((c, idx) => (
                    <div
                      key={`${c.challengeId}-${idx}`}
                      className="p-2.5 border border-nexus-ink bg-nexus-paper flex justify-between"
                    >
                      <span className="font-bold">{c.title}</span>
                      <span className="text-nexus-crimson font-bold">+{c.reward} CR</span>
                    </div>
                  ))}
                  <p className="font-bold text-nexus-crimson uppercase pt-2">
                    FAILED ({team.failedChallenges?.length || 0})
                  </p>
                  {(team.failedChallenges || []).map((c, idx) => (
                    <div
                      key={`${c.challengeId}-fail-${idx}`}
                      className="p-2.5 border border-nexus-crimson bg-nexus-crimson/5 flex justify-between"
                    >
                      <span className="font-bold">{c.title}</span>
                      <span className="text-nexus-crimson font-bold">-{c.penalty} CR</span>
                    </div>
                  ))}
                </div>
              </BrutalistPanel>
            </div>
          </div>
        );

      case 'ABILITIES':
        return <div className="max-w-4xl">{renderAbilitiesPanel(true)}</div>;

      case 'PROGRESS':
      case 'NEXUS_CORE':
        return (
          <div className="space-y-6">
            {renderProgressAndFeedPanel()}
            <BrutalistPanel
              codeTag="CORE_GATE"
              title="THE NEXUS CORE // FINAL OBJECTIVE THRESHOLD"
              accentTitle
            >
              <div className="space-y-3 font-editorial text-base text-nexus-ink">
                <p className="font-bold text-xl">
                  The final objective remains unknown until Core convergence reaches 100%.
                </p>
                <p className="text-nexus-charcoal">
                  Current Squad Core Convergence:{' '}
                  <strong className="text-nexus-crimson">{progressPercent}%</strong>. Continue
                  solving challenges and managing Resistance Credits to unlock the NEXUS Core.
                </p>
              </div>
            </BrutalistPanel>
          </div>
        );

      case 'DASHBOARD':
      default:
        return (
          <div className="space-y-6">
            {/* Top 4 Status Metrics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="nexus-editorial-box p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  ACTIVE CHALLENGE
                </span>
                <p className="font-condensed text-xl font-extrabold uppercase text-nexus-crimson truncate mt-1">
                  {activeChallenge?.title || 'NONE SELECTED'}
                </p>
              </div>

              <div className="nexus-editorial-box p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  SQUAD ROOM LINK
                </span>
                <p className="font-condensed text-xl font-extrabold uppercase text-nexus-ink mt-1">
                  {onlineOperatives} / 4 OPERATIVES
                </p>
              </div>

              <div className="nexus-editorial-box p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  SOLVED / FAILED
                </span>
                <p className="font-condensed text-xl font-extrabold uppercase text-nexus-ink mt-1">
                  {team.stats?.totalSolved || 0} SOLVED · {team.stats?.totalFailed || 0} FAILED
                </p>
              </div>

              <div className="nexus-editorial-box p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                  RISK PROFILE
                </span>
                <p className="font-condensed text-xl font-extrabold uppercase text-nexus-crimson mt-1">
                  {team.stats?.riskProfile || 'BALANCED'}
                </p>
              </div>
            </div>

            {/* Main 3-Column Portal Grid (Matching Proposal Portal Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-5">{renderChallengeMarketPanel(false)}</div>
              <div className="lg:col-span-4">{renderSubmissionAndTacticalPanel()}</div>
              <div className="lg:col-span-3">{renderAbilitiesPanel(false)}</div>
            </div>

            {/* Bottom Overall Progress & Shared Event Stream */}
            {renderProgressAndFeedPanel()}
          </div>
        );
    }
  };

  return (
    <PortalShellLayout
      team={team}
      activeSection={activeSection}
      onSelectSection={setActiveSection}
      socketConnected={socketConnected}
      joinedRoom={joinedRoom}
      onlineOperatives={onlineOperatives}
      notifications={notifications}
      onDismissNotification={dismissNotification}
      onLogout={handleLogout}
    >
      {/* Restrained Framer Motion Panel Transition */}
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

      {/* Restrained Framer Motion Challenge Entry Confirmation Modal */}
      <AnimatePresence>
        {selectedChallengeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
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
              className="nexus-editorial-box max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b-2 border-nexus-ink pb-3">
                <span className="bg-nexus-crimson text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
                  CONFIRM CHALLENGE ENTRY
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
                <h2
                  id="modal-challenge-title"
                  className="font-display text-3xl uppercase text-nexus-ink"
                >
                  {selectedChallengeModal.title}
                </h2>
                <p className="font-editorial text-sm text-nexus-charcoal">
                  {selectedChallengeModal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-nexus-paper p-3 border border-nexus-ink">
                <div>
                  <span className="text-nexus-muted block text-[10px]">ENTRY COST</span>
                  <span className="font-bold text-nexus-crimson">
                    -{selectedChallengeModal.cost} CR
                  </span>
                </div>
                <div>
                  <span className="text-nexus-muted block text-[10px]">REWARD YIELD</span>
                  <span className="font-bold text-nexus-ink">
                    +{selectedChallengeModal.reward} CR
                  </span>
                </div>
                <div>
                  <span className="text-nexus-muted block text-[10px]">DIFFICULTY</span>
                  <span className="font-bold">{selectedChallengeModal.difficulty}</span>
                </div>
                <div>
                  <span className="text-nexus-muted block text-[10px]">RISK TIER</span>
                  <span className="font-bold">{selectedChallengeModal.risk}</span>
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
                  COMMIT ({selectedChallengeModal.cost} CR)
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
