import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight, Edit3, Check, X } from 'lucide-react';
import { PortalShellLayout, getTeamSizeMeta } from '../layouts/PortalShellLayout';
import { BrutalistPanel } from '../components/BrutalistPanel';
import { TeamProgressModule } from '../components/TeamProgressModule';
import { TeamRiskProfileModule } from '../components/TeamRiskProfileModule';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

const TEAM_SIZE_OPTIONS = [
  { size: 1, label: 'SOLO (1)' },
  { size: 2, label: 'DUO (2)' },
  { size: 3, label: 'TRIO (3)' },
  { size: 4, label: 'SQUAD (MAX 4)' },
];

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
    actionPending,
    performTeamAction,
    logoutTeam,
    dismissNotification,
  } = useTeamPortal();

  const [isEditingRoster, setIsEditingRoster] = useState(false);
  const [selectedSize, setSelectedSize] = useState(4);
  const [memberNames, setMemberNames] = useState(['', '', '', '']);

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

  const openRosterEditor = () => {
    const currentCount = Math.min(4, Math.max(1, teamMeta.members.length || 1));
    setSelectedSize(currentCount);
    setMemberNames([
      teamMeta.members[0]?.name || 'PLAYER 1 (LEAD)',
      teamMeta.members[1]?.name || 'PLAYER 2',
      teamMeta.members[2]?.name || 'PLAYER 3',
      teamMeta.members[3]?.name || 'PLAYER 4',
    ]);
    setIsEditingRoster(true);
  };

  const handleSaveRoster = async (e) => {
    e.preventDefault();
    const updatedMembers = Array.from({ length: selectedSize }, (_, idx) => ({
      memberId: `OP-0${idx + 1}`,
      name: (memberNames[idx] || (idx === 0 ? 'PLAYER 1 (LEAD)' : `PLAYER ${idx + 1}`)).trim().toUpperCase(),
      role: idx === 0 ? 'LEAD' : 'OPERATIVE',
      online: idx < teamMeta.onlineCount,
    }));
    await performTeamAction('UPDATE_TEAM_ROSTER', {
      teamSize: selectedSize,
      members: updatedMembers,
    });
    setIsEditingRoster(false);
  };

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
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper font-mono text-xs font-bold uppercase tracking-widest">
                {teamMeta.onlineSummary}
              </span>
              {!isEditingRoster && (
                <button
                  type="button"
                  onClick={openRosterEditor}
                  className="px-3 py-1 bg-nexus-paper border border-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>CHANGE MODE / PLAYERS (1–4)</span>
                </button>
              )}
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
          {isEditingRoster ? (
            <form onSubmit={handleSaveRoster} className="space-y-4 bg-nexus-paper p-4 border-2 border-nexus-ink">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted block">
                    SELECT PLAY FORMAT (SOLO · DUO · TRIO · MAX 4)
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {TEAM_SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt.size}
                        type="button"
                        onClick={() => setSelectedSize(opt.size)}
                        className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase border-2 transition-colors cursor-pointer ${
                          selectedSize === opt.size
                            ? 'bg-nexus-crimson text-white border-nexus-ink'
                            : 'bg-white text-nexus-ink border-nexus-ink/40 hover:border-nexus-ink'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingRoster(false)}
                    className="px-3 py-1.5 border border-nexus-ink bg-white font-mono text-xs font-bold uppercase inline-flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={actionPending}
                    className="px-4 py-1.5 border-2 border-nexus-ink bg-nexus-ink text-white hover:bg-nexus-crimson font-mono text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" />
                    SAVE ROSTER
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Array.from({ length: selectedSize }, (_, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="font-mono text-[10px] font-bold uppercase text-nexus-muted block">
                      PLAYER {idx + 1} {idx === 0 ? '(LEAD)' : ''}
                    </label>
                    <input
                      type="text"
                      value={memberNames[idx] || ''}
                      onChange={(e) => {
                        const next = [...memberNames];
                        next[idx] = e.target.value;
                        setMemberNames(next);
                      }}
                      placeholder={`PLAYER ${idx + 1}`}
                      className="w-full px-3 py-2 bg-white border-2 border-nexus-ink font-mono text-xs font-bold uppercase text-nexus-ink focus:outline-none focus:border-nexus-crimson"
                    />
                  </div>
                ))}
              </div>
            </form>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                teamMeta.members.length === 1
                  ? 'lg:grid-cols-1 max-w-md'
                  : teamMeta.members.length === 2
                    ? 'lg:grid-cols-2'
                    : teamMeta.members.length === 3
                      ? 'lg:grid-cols-3'
                      : 'lg:grid-cols-4'
              } gap-3.5`}
            >
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
          )}
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
