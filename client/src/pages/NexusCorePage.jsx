import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PortalShellLayout } from '../layouts/PortalShellLayout';
import { NexusCoreModule } from '../components/NexusCoreModule';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * PHASE 18 — NEXUS CORE PAGE
 * Route: /nexus-core
 *
 * The ultimate system objective.
 * States: LOCKED | AVAILABLE | ACTIVE | COMPLETED.
 */
export const NexusCorePage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const {
    team,
    nexusCore,
    coreDiscoveryEvent,
    clearCoreDiscovery,
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
            NEXUS // CORE
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            LOADING NEXUS CORE...
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
        <NexusCoreModule
          team={team}
          nexusCore={nexusCore}
          coreDiscoveryEvent={coreDiscoveryEvent}
          onClearCoreDiscovery={clearCoreDiscovery}
          onActivateCore={() => performTeamAction('ACTIVATE_NEXUS_CORE')}
          onSubmitCoreObjective={(payload) =>
            performTeamAction('SUBMIT_NEXUS_CORE', payload)
          }
          actionPending={actionPending}
        />
      </motion.div>
    </PortalShellLayout>
  );
};

export default NexusCorePage;
