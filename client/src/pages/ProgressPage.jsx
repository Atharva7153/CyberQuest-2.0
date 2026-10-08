import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight } from 'lucide-react';
import { PortalShellLayout, getTeamSizeMeta } from '../layouts/PortalShellLayout';
import { BrutalistPanel } from '../components/BrutalistPanel';
import { TeamProgressModule } from '../components/TeamProgressModule';
import { TeamRiskProfileModule } from '../components/TeamRiskProfileModule';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ProgressPage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const {
    team,
    catalog,
    attempts,
    progressSummary,
    lastCreditChange,
    isAuthenticated,
    isInitializing,
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
            CYBER QUEST // MY TEAM
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            LOADING TEAM PROFILE...
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

  const teamMeta = getTeamSizeMeta(team, onlineOperatives);

  return (
    <PortalShellLayout
      team={team}
      activeSection="MY_TEAM"
      onSelectSection={(sec) => navigate(`/dashboard?section=${sec}`)}
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
        {/* 1. Team Roster Card (Variable Team Size: SOLO = 1, DUO = 2, TRIO = 3, SQUAD = 4) */}
        <BrutalistPanel
          codeTag={teamMeta.formatLabel}
          title={`${team.teamName || team.teamId} (${teamMeta.formatLabel})`}
          accentTitle
          headerRight={
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper font-mono text-xs font-bold uppercase tracking-widest">
                {teamMeta.onlineSummary}
              </span>
              {team.currentChallenge?.challengeId && (
                <Link
                  to={`/challenge/${team.currentChallenge.challengeId}`}
                  className="px-3 py-1 bg-nexus-crimson text-white hover:bg-nexus-ink font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                >
                  <span>CONTINUE CHALLENGE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {teamMeta.members.map((member, index) => {
              const isOnline = index < teamMeta.onlineCount;
              return (
                <div
                  key={member.memberId || member.name || index}
                  className="p-4 border-2 border-nexus-ink bg-nexus-paper flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-nexus-muted uppercase block truncate">
                      {member.role || 'OPERATIVE'}
                    </span>
                    <p className="font-condensed text-lg font-extrabold uppercase text-nexus-ink truncate flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-sm leading-none ${
                          isOnline ? 'text-nexus-crimson' : 'text-nexus-muted'
                        }`}
                      >
                        {isOnline ? '●' : '○'}
                      </span>
                      <span>{member.name}</span>
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase border ${
                      isOnline
                        ? 'bg-nexus-crimson text-white border-nexus-ink'
                        : 'bg-nexus-paper-elevated text-nexus-muted border-nexus-ink/30'
                    }`}
                  >
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              );
            })}
          </div>
        </BrutalistPanel>

        {/* 2. Team Progress Summary */}
        <TeamProgressModule
          team={team}
          progressSummary={progressSummary}
          attempts={attempts}
          catalog={catalog}
        />

        {/* 3. Team Risk Profile */}
        <TeamRiskProfileModule
          team={team}
          attempts={attempts}
          catalog={catalog}
          compact={false}
          onSelectMarketRiskFilter={() => navigate('/challenges')}
        />
      </motion.div>
    </PortalShellLayout>
  );
};

export default ProgressPage;
