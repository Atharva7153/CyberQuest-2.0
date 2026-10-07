import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, BarChart3, History, LayoutGrid, ArrowUpRight } from 'lucide-react';
import { PortalShellLayout } from '../layouts/PortalShellLayout';
import { NexusCoreModule } from '../components/NexusCoreModule';
import { LiveFeedModule } from '../components/LiveFeedModule';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * PHASE 12 — NEXUS CORE PAGE
 * Route: /nexus-core
 *
 * The ultimate system objective (NOT a conventional "Final Round").
 * Server-authoritative states: LOCKED | AVAILABLE | ACTIVE | COMPLETED.
 */
export const NexusCorePage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const {
    team,
    nexusCore,
    coreDiscoveryEvent,
    clearCoreDiscovery,
    attempts,
    transactions,
    liveFeed,
    lastCreditChange,
    isAuthenticated,
    isInitializing,
    socketConnected,
    joinedRoom,
    onlineOperatives,
    notifications,
    actionPending,
    performTeamAction,
    logoutTeam,
    dismissNotification,
  } = useTeamPortal();

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
            NEXUS CORE // CENTRAL CONVERGENCE
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            SYNCHRONIZING NEXUS CORE ARCHITECTURE...
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

  return (
    <PortalShellLayout
      team={team}
      activeSection="NEXUS_CORE"
      onSelectSection={(sec) => navigate(`/dashboard?section=${sec}`)}
      socketConnected={socketConnected}
      joinedRoom={joinedRoom}
      onlineOperatives={onlineOperatives}
      lastCreditChange={lastCreditChange}
      notifications={notifications}
      onDismissNotification={dismissNotification}
      onLogout={handleLogout}
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="space-y-6"
      >
        {/* Top Route Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border-2 border-nexus-ink bg-nexus-paper-elevated">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/dashboard"
              className="px-3 py-1.5 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>PORTAL DASHBOARD</span>
            </Link>

            <Link
              to="/progress"
              className="px-3 py-1.5 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>/PROGRESS</span>
            </Link>

            <Link
              to="/history"
              className="px-3 py-1.5 border border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <History className="w-3.5 h-3.5" />
              <span>/HISTORY</span>
            </Link>

            <Link
              to="/nexus-core"
              className="px-3 py-1.5 border border-nexus-ink bg-nexus-crimson text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>/NEXUS-CORE</span>
            </Link>
          </div>

          {team.activeAttempt?.challengeId && (
            <Link
              to={`/challenge/${team.activeAttempt.challengeId}`}
              className="px-3 py-1.5 bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <span>ACTIVE SESSION: {team.activeAttempt.challengeId}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* NEXUS Core Ultimate System Objective Module */}
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

        {/* Real-Time Socket.IO Live Feed */}
        <LiveFeedModule
          team={team}
          liveFeed={liveFeed}
          attempts={attempts}
          transactions={transactions}
          joinedRoom={joinedRoom}
          socketConnected={socketConnected}
        />
      </motion.div>
    </PortalShellLayout>
  );
};

export default NexusCorePage;
