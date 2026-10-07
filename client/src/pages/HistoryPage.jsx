import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, History, LayoutGrid, ArrowUpRight } from 'lucide-react';
import { PortalShellLayout } from '../layouts/PortalShellLayout';
import { AttemptHistoryModule } from '../components/AttemptHistoryModule';
import { LiveFeedModule } from '../components/LiveFeedModule';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * PHASE 11 — TEAM ATTEMPT HISTORY & LIVE FEED PAGE
 * Route: /history
 *
 * Shows every attempt:
 * - challenge
 * - category
 * - risk
 * - cost
 * - result
 * - reward/penalty
 * - timestamp
 *
 * Plus the real-time Socket.IO Live Feed:
 * - CHALLENGE ACQUIRED
 * - CHALLENGE STARTED
 * - SUBMISSION
 * - SUCCESS
 * - FAILURE
 * - CREDITS UPDATED
 * - ABILITY USED
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
    liveFeed,
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
            NEXUS CORE // ATTEMPT ARCHIVE
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            LOADING CHALLENGE ATTEMPT HISTORY...
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
        {/* Top Route Switcher Bar (/dashboard | /progress | /history) */}
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
              className="px-3 py-1.5 border border-nexus-ink bg-nexus-crimson text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <History className="w-3.5 h-3.5" />
              <span>/HISTORY</span>
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

        {/* 1. Complete Challenge Attempt Ledger (Challenge, Category, Risk, Cost, Result, Reward/Penalty, Timestamp) */}
        <AttemptHistoryModule
          team={team}
          attemptHistory={attemptHistory}
          attempts={attempts}
          catalog={catalog}
        />

        {/* 2. Real-Time Socket.IO Live Feed */}
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

export default HistoryPage;
