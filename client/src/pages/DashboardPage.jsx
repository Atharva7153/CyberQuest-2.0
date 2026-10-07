import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
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
import { RiskBadge } from '../components/RiskBadge';
import { TeamRiskProfileModule } from '../components/TeamRiskProfileModule';
import { AbilitiesAndSupportModule } from '../components/AbilitiesAndSupportModule';
import { ResistanceCreditsModule } from '../components/ResistanceCreditsModule';
import { LiveFeedModule } from '../components/LiveFeedModule';
import { TeamProgressModule } from '../components/TeamProgressModule';
import { AttemptHistoryModule } from '../components/AttemptHistoryModule';
import { NexusCoreModule } from '../components/NexusCoreModule';
import {
  ChallengeMarketModule,
  formatTimeLimitDetailed,
} from '../components/ChallengeMarketModule';
import { ChallengeSessionContainer } from '../engine/ChallengeSessionContainer';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const {
    team,
    nexusCore,
    coreDiscoveryEvent,
    clearCoreDiscovery,
    catalog,
    abilitiesCatalog,
    transactions,
    attempts,
    attemptHistory,
    progressSummary,
    liveFeed,
    serverClockOffsetMs,
    creditsConfig,
    lastCreditChange,
    lastEvaluationResult,
    lastAbilityActivation,
    isAuthenticated,
    isInitializing,
    socketConnected,
    joinedRoom,
    onlineOperatives,
    notifications,
    actionPending,
    logoutTeam,
    performTeamAction,
    clearEvaluationResult,
    clearAbilityActivation,
    dismissNotification,
  } = useTeamPortal();

  const [activeSection, setActiveSection] = useState(
    () => searchParams.get('section') || 'DASHBOARD'
  );
  const [selectedChallengeModal, setSelectedChallengeModal] = useState(null);
  const [marketRiskFilter, setMarketRiskFilter] = useState('ALL');

  useEffect(() => {
    const requestedSection = searchParams.get('section');
    if (requestedSection) {
      setActiveSection(requestedSection);
    }
  }, [searchParams]);

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
    return performTeamAction('USE_ABILITY', { abilityId });
  };

  const handleSubmitChallengeAnswer = async ({
    challengeId,
    attemptId,
    submission,
    simulateFailure = false,
  }) => {
    try {
      await performTeamAction('SUBMIT_CHALLENGE', {
        challengeId,
        attemptId,
        submission,
        simulateFailure,
      });
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
        <button
          type="button"
          onClick={() => setActiveSection('CHALLENGES')}
          className="px-2 py-0.5 bg-nexus-crimson text-white hover:bg-nexus-ink font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          OPEN FULL MARKET ({catalog.length})
        </button>
      }
      className="h-full"
    >
      <div className="space-y-2.5">
        {(expanded ? catalog : catalog.slice(0, 5)).map((chg) => {
          const isCurrent = activeChallenge?.challengeId === chg.challengeId;
          const isSolved = (team.completedChallenges || []).some(
            (c) => c.challengeId === chg.challengeId
          );
          const isFailed = (team.failedChallenges || []).some(
            (c) => c.challengeId === chg.challengeId
          );
          const reattemptCost = Math.round(
            chg.cost * (creditsConfig?.reattemptMultiplier || 1.25)
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
                  {isFailed && !isCurrent && (
                    <span className="px-1.5 py-0.5 bg-nexus-crimson/20 text-nexus-crimson border border-nexus-crimson font-mono text-[9px] font-bold uppercase">
                      REATTEMPT
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-nexus-muted">
                    {chg.category} · REWARD: +{chg.reward} CR
                  </span>
                  <RiskBadge risk={chg.risk} size="xs" />
                </div>
                {expanded && (
                  <p className="font-editorial text-xs text-nexus-charcoal mt-1.5">
                    {chg.description}
                  </p>
                )}
              </div>

              <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                <span className="font-mono text-xs font-bold text-nexus-crimson">
                  {isFailed ? `${reattemptCost} CR` : `${chg.cost} CR`}
                </span>
                <button
                  type="button"
                  disabled={actionPending}
                  onClick={() => {
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
                  className="px-2.5 py-1 bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isFailed ? 'REATTEMPT' : isCurrent ? 'RE-ENTER' : 'SELECT'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </BrutalistPanel>
  );

  const renderSubmissionAndTacticalPanel = () => (
    <ChallengeSessionContainer
      team={team}
      creditsConfig={creditsConfig}
      serverClockOffsetMs={serverClockOffsetMs}
      actionPending={actionPending}
      lastEvaluationResult={lastEvaluationResult}
      onClearEvaluationResult={clearEvaluationResult}
      onSubmitChallengeAnswer={handleSubmitChallengeAnswer}
      onSpendTacticalCredits={handleSpendCredits}
      onBrowseMarket={() => setActiveSection('CHALLENGES')}
    />
  );

  const renderAbilitiesPanel = (expanded = false) => (
    <AbilitiesAndSupportModule
      team={team}
      abilitiesCatalog={abilitiesCatalog}
      creditsConfig={creditsConfig}
      serverClockOffsetMs={serverClockOffsetMs}
      actionPending={actionPending}
      lastAbilityActivation={lastAbilityActivation}
      onClearAbilityActivation={clearAbilityActivation}
      onActivateAbility={handleUseAbility}
      onPurchaseHint={(cost) => handleSpendCredits('HINT', cost)}
      onPurchaseExtraTime={(cost) => handleSpendCredits('EXTRA_TIME', cost)}
      compact={!expanded}
      showTacticalControls={expanded}
    />
  );

  const renderProgressAndFeedPanel = () => (
    <div className="space-y-5">
      <BrutalistPanel
        codeTag="CORE_TRACKER"
        title="OVERALL PROGRESS TOWARD NEXUS CORE"
        accentTitle={false}
        headerRight={
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/progress"
              className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
            >
              OPEN /PROGRESS
            </Link>
            <Link
              to="/history"
              className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
            >
              OPEN /HISTORY
            </Link>
            <Link
              to="/nexus-core"
              className="px-2.5 py-1 border border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
            >
              OPEN /NEXUS-CORE ({nexusCore?.state || 'LOCKED'})
            </Link>
            <span className="font-mono text-sm font-bold text-nexus-crimson">
              {progressPercent}%
            </span>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full h-4 bg-nexus-ink p-0.5 border border-nexus-ink">
            <div
              className="h-full bg-nexus-crimson transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
            <span>AUTHORITATIVE ROOM: {joinedRoom}</span>
            <span>
              CORE STATE: {nexusCore?.state || 'LOCKED'} // SOLVED: {team.stats?.totalSolved || 0}
            </span>
          </div>
        </div>
      </BrutalistPanel>

      <LiveFeedModule
        team={team}
        liveFeed={liveFeed}
        attempts={attempts}
        transactions={transactions}
        joinedRoom={joinedRoom}
        socketConnected={socketConnected}
        maxItems={12}
        compact
      />
    </div>
  );

  const handleSelectMarketRiskFilter = (riskTier) => {
    setMarketRiskFilter(riskTier || 'ALL');
    setActiveSection('CHALLENGES');
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'CHALLENGES':
        return (
          <div className="space-y-6">
            <ChallengeMarketModule
              catalog={catalog}
              team={team}
              creditsConfig={creditsConfig}
              actionPending={actionPending}
              initialRiskFilter={marketRiskFilter}
              onAcquireChallenge={handleAcquireChallenge}
              onOpenExecutionPanel={() => {
                if (activeChallenge?.challengeId) {
                  navigate(`/challenge/${activeChallenge.challengeId}`);
                } else {
                  setActiveSection('SUBMISSIONS');
                }
              }}
              compact={false}
            />
            <TeamRiskProfileModule
              team={team}
              attempts={attempts}
              catalog={catalog}
              compact={false}
              onSelectMarketRiskFilter={handleSelectMarketRiskFilter}
            />
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
          <div className="space-y-6">
            <ResistanceCreditsModule
              team={team}
              transactions={transactions}
              creditsConfig={creditsConfig}
              lastCreditChange={lastCreditChange}
              showFullLedger
            />
            <TeamRiskProfileModule
              team={team}
              attempts={attempts}
              catalog={catalog}
              compact={false}
              onSelectMarketRiskFilter={handleSelectMarketRiskFilter}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">{renderSubmissionAndTacticalPanel()}</div>
              <div className="lg:col-span-6">{renderProgressAndFeedPanel()}</div>
            </div>
          </div>
        );

      case 'SUBMISSIONS':
      case 'HISTORY':
        return (
          <div className="space-y-6">
            {renderSubmissionAndTacticalPanel()}
            <AttemptHistoryModule
              team={team}
              attemptHistory={attemptHistory}
              attempts={attempts}
              catalog={catalog}
            />
            <LiveFeedModule
              team={team}
              liveFeed={liveFeed}
              attempts={attempts}
              transactions={transactions}
              joinedRoom={joinedRoom}
              socketConnected={socketConnected}
            />
          </div>
        );

      case 'ABILITIES':
        return <div className="max-w-6xl">{renderAbilitiesPanel(true)}</div>;

      case 'PROGRESS':
        return (
          <div className="space-y-6">
            <TeamProgressModule
              team={team}
              progressSummary={progressSummary}
              attempts={attempts}
              catalog={catalog}
            />
            <TeamRiskProfileModule
              team={team}
              attempts={attempts}
              catalog={catalog}
              compact={false}
              onSelectMarketRiskFilter={handleSelectMarketRiskFilter}
            />
            {renderProgressAndFeedPanel()}
          </div>
        );

      case 'NEXUS_CORE':
        return (
          <div className="space-y-6">
            <NexusCoreModule
              team={team}
              nexusCore={nexusCore}
              coreDiscoveryEvent={coreDiscoveryEvent}
              onClearCoreDiscovery={clearCoreDiscovery}
              onUnlockCore={() => performTeamAction('UNLOCK_NEXUS_CORE')}
              onActivateCore={() => performTeamAction('ACTIVATE_NEXUS_CORE')}
              onSubmitCoreObjective={(payload) =>
                performTeamAction('SUBMIT_NEXUS_CORE', payload)
              }
              onUpdateCoreConfig={(updates) =>
                performTeamAction('UPDATE_NEXUS_CORE_CONFIG', { updates })
              }
              actionPending={actionPending}
            />
            {renderProgressAndFeedPanel()}
          </div>
        );

      case 'DASHBOARD':
      default:
        return (
          <div className="space-y-6">
            {/* Prominent Resistance Credits Component (Phase 5) */}
            <ResistanceCreditsModule
              team={team}
              transactions={transactions}
              creditsConfig={creditsConfig}
              lastCreditChange={lastCreditChange}
              showFullLedger={false}
            />

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

              <div className="nexus-editorial-box p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                    RISK PROFILE
                  </span>
                  <RiskBadge
                    risk={activeChallenge?.risk || team.stats?.riskProfile || 'BALANCED'}
                    size="xs"
                    pulseAggressive
                  />
                </div>
                <p className="font-mono text-[11px] font-bold uppercase text-nexus-ink mt-1.5">
                  S:{team.stats?.safeAttempts ?? 1} · B:{team.stats?.balancedAttempts ?? 1} · A:
                  {team.stats?.aggressiveAttempts ?? 0} ATTEMPTS
                </p>
              </div>
            </div>

            {/* Main 3-Column Portal Grid (Matching Proposal Portal Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-5">{renderChallengeMarketPanel(false)}</div>
              <div className="lg:col-span-4">{renderSubmissionAndTacticalPanel()}</div>
              <div className="lg:col-span-3">{renderAbilitiesPanel(false)}</div>
            </div>

            {/* Phase 9: Team Risk Profile & Risk/Reward Classification */}
            <TeamRiskProfileModule
              team={team}
              attempts={attempts}
              catalog={catalog}
              compact={false}
              onSelectMarketRiskFilter={handleSelectMarketRiskFilter}
            />

            {/* Live Challenge Market (Phase 6) */}
            <ChallengeMarketModule
              catalog={catalog}
              team={team}
              creditsConfig={creditsConfig}
              actionPending={actionPending}
              initialRiskFilter={marketRiskFilter}
              onAcquireChallenge={handleAcquireChallenge}
              onOpenExecutionPanel={() => {
                if (activeChallenge?.challengeId) {
                  navigate(`/challenge/${activeChallenge.challengeId}`);
                } else {
                  setActiveSection('SUBMISSIONS');
                }
              }}
              compact={false}
            />

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
      lastCreditChange={lastCreditChange}
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
                  {selectedChallengeModal.isReattempt
                    ? 'CONFIRM CHALLENGE REATTEMPT'
                    : 'CONFIRM CHALLENGE ENTRY'}
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

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs bg-nexus-paper p-3 border border-nexus-ink">
                <div>
                  <span className="text-nexus-muted block text-[10px]">
                    {selectedChallengeModal.isReattempt ? 'REATTEMPT COST' : 'COST'}
                  </span>
                  <span className="font-bold text-nexus-crimson">
                    -{selectedChallengeModal.effectiveCost ?? selectedChallengeModal.cost} CR
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
                    {formatTimeLimitDetailed(selectedChallengeModal.timeLimit)}
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
                  ACQUIRE ({selectedChallengeModal.effectiveCost ?? selectedChallengeModal.cost} CR)
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
