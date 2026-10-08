import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PortalShellLayout } from '../layouts/PortalShellLayout';
import { AttemptHistoryModule } from '../components/AttemptHistoryModule';
import { ResistanceCreditsModule } from '../components/ResistanceCreditsModule';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * PHASE 18 — PARTICIPANT HISTORY PAGE
 * Route: /history
 *
 * Shows:
 * 1. Challenge Attempt History (Challenge, Category, Risk, Cost, Result, Reward / Penalty, Time)
 * 2. Credit Activity History
 */
export const HistoryPage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const {
    team,
    catalog,
    attempts,
    attemptHistory,
    transactions,
    lastCreditChange,
    isAuthenticated,
    isInitializing,
    socketConnected,
    joinedRoom,
    onlineOperatives,
    notifications,
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
            NEXUS // HISTORY
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            LOADING HISTORY...
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
      activeSection="HISTORY"
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
        {/* 1. Challenge Attempt History */}
        <AttemptHistoryModule
          team={team}
          attemptHistory={attemptHistory}
          attempts={attempts}
          catalog={catalog}
        />

        {/* 2. Credit Activity Log */}
        <ResistanceCreditsModule
          team={team}
          transactions={transactions}
          lastCreditChange={lastCreditChange}
          showFullLedger
        />
      </motion.div>
    </PortalShellLayout>
  );
};

export default HistoryPage;
