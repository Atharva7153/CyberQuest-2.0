import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Search, RefreshCw, ShieldCheck, Flame, Crosshair, Award } from 'lucide-react';
import { PortalShellLayout } from '../layouts/PortalShellLayout';
import { RiskBadge } from '../components/RiskBadge';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { socketClient, NEXUS_SOCKET_EVENTS } from '../socket/socketClient';
import { API_BASE_URL } from '../config/runtimeConfig';

export const LeaderboardPage = () => {
  const navigate = useNavigate();
  const {
    team,
    isAuthenticated,
    isInitializing,
    onlineOperatives,
    lastCreditChange,
    notifications,
    dismissNotification,
    logoutTeam,
  } = useTeamPortal();

  const [standings, setStandings] = useState([]);
  const [coreStatus, setCoreStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('ALL'); // 'ALL' | 'TOP10' | 'NEAR_ME'

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isInitializing, isAuthenticated, navigate]);

  const fetchStandings = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/display`);
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data?.leaderboard)) {
        setStandings(data.leaderboard);
      }
      if (data?.coreStatus) {
        setCoreStatus(data.coreStatus);
      }
      setLastUpdated(new Date());
    } catch {
      // ignore transient network errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStandings();

    const handleLiveUpdate = (payload) => {
      if (Array.isArray(payload?.leaderboard)) {
        setStandings(payload.leaderboard);
        setLastUpdated(new Date());
      }
      if (payload?.coreStatus) {
        setCoreStatus(payload.coreStatus);
      }
    };

    socketClient.on(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleLiveUpdate);
    const pollTimer = setInterval(fetchStandings, 10000);

    return () => {
      socketClient.off(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleLiveUpdate);
      clearInterval(pollTimer);
    };
  }, [fetchStandings]);

  const handleLogout = () => {
    logoutTeam();
    navigate('/login', { replace: true });
  };

  // Compute sorted leaderboard with ranks
  const rankedList = useMemo(() => {
    const list = Array.isArray(standings) ? [...standings] : [];
    list.sort((a, b) => {
      const credDiff = Number(b.credits || 0) - Number(a.credits || 0);
      if (credDiff !== 0) return credDiff;
      return Number(b.solvedCount || 0) - Number(a.solvedCount || 0);
    });
    return list.map((entry, idx) => ({
      ...entry,
      rank: Number(entry.rank) || idx + 1,
    }));
  }, [standings]);

  const myTeamId = String(team?.teamId || '').toUpperCase();

  const myStanding = useMemo(() => {
    const idx = rankedList.findIndex(
      (item) => String(item.teamId || '').toUpperCase() === myTeamId
    );
    if (idx === -1) return null;
    const current = rankedList[idx];
    const above = idx > 0 ? rankedList[idx - 1] : null;
    const leader = rankedList[0] || null;
    return {
      ...current,
      index: idx,
      rank: idx + 1,
      creditsToNextRank: above
        ? Math.max(0, Number(above.credits || 0) - Number(current.credits || 0) + 1)
        : 0,
      nextRankTeamName: above ? above.teamName || above.teamId : null,
      creditsToLeader: leader
        ? Math.max(0, Number(leader.credits || 0) - Number(current.credits || 0))
        : 0,
    };
  }, [rankedList, myTeamId]);

  const filteredStandings = useMemo(() => {
    let list = rankedList;
    if (viewMode === 'TOP10') {
      list = rankedList.slice(0, 10);
    } else if (viewMode === 'NEAR_ME' && myStanding) {
      const start = Math.max(0, myStanding.index - 3);
      const end = Math.min(rankedList.length, myStanding.index + 4);
      list = rankedList.slice(start, end);
    }

    const q = searchQuery.trim().toUpperCase();
    if (!q) return list;
    return list.filter(
      (item) =>
        String(item.teamName || '')
          .toUpperCase()
          .includes(q) ||
        String(item.teamId || '')
          .toUpperCase()
          .includes(q)
    );
  }, [rankedList, viewMode, myStanding, searchQuery]);

  const podiumTop3 = useMemo(() => rankedList.slice(0, 3), [rankedList]);

  if (isInitializing || !team) {
    return (
      <div className="min-h-screen nexus-paper-canvas flex items-center justify-center p-6">
        <div className="nexus-editorial-box p-8 max-w-md w-full text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-nexus-crimson font-bold">
            CYBER QUEST // STANDINGS
          </p>
          <h1 className="font-display text-3xl uppercase text-nexus-ink">
            SYNCING LIVE LEADERBOARD...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <PortalShellLayout
      team={team}
      activeSection="LEADERBOARD"
      onlineOperatives={onlineOperatives}
      lastCreditChange={lastCreditChange}
      notifications={notifications}
      onDismissNotification={dismissNotification}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="nexus-editorial-box p-5 sm:p-6 border-2 border-nexus-ink bg-nexus-paper-elevated flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-nexus-crimson font-bold">
                LIVE ARENA TELEMETRY // REAL-TIME RANKINGS
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-nexus-ink leading-none">
              SQUAD <span className="text-nexus-crimson">LEADERBOARD</span>
            </h1>
            <p className="font-editorial text-sm text-nexus-charcoal mt-1">
              Live standings across all competing squads, ranked by Resistance Credits and solved challenges.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {lastUpdated && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-nexus-muted">
                SYNCED: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              type="button"
              onClick={fetchStandings}
              className="px-3.5 py-2 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson hover:text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              REFRESH
            </button>
          </div>
        </div>

        {/* Logged-In Squad Position Banner */}
        <div className="p-4 sm:p-5 bg-nexus-ink text-nexus-paper border-2 border-nexus-crimson shadow-brutal-crimson flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-nexus-crimson text-white border-2 border-white flex flex-col items-center justify-center shrink-0">
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-85">
                RANK
              </span>
              <span className="font-display text-2xl sm:text-3xl leading-none font-bold">
                #{myStanding?.rank || team.rank || '—'}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                  YOUR SQUAD
                </span>
                <span className="font-mono text-xs text-nexus-paper/70 uppercase">
                  {team.teamId}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white leading-tight mt-0.5">
                {team.teamName || team.teamId}
              </h2>
              <p className="font-mono text-xs text-emerald-400 font-bold uppercase">
                {myStanding?.rank === 1
                  ? '★ YOU ARE CURRENTLY #1 IN THE ARENA!'
                  : myStanding?.nextRankTeamName
                    ? `${myStanding.creditsToNextRank.toLocaleString()} CR NEEDED TO OVERTAKE #${
                        myStanding.rank - 1
                      } (${myStanding.nextRankTeamName})`
                    : 'SOLVE CHALLENGES TO CLIMB THE STANDINGS'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-nexus-paper/15">
            <div className="px-3 py-2 bg-black/50 border border-nexus-paper/20 text-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-paper/60 block">
                CREDITS
              </span>
              <span className="font-mono text-base sm:text-lg font-extrabold text-white">
                {Number(myStanding?.credits ?? team.credits ?? 0).toLocaleString()} CR
              </span>
            </div>
            <div className="px-3 py-2 bg-black/50 border border-nexus-paper/20 text-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-paper/60 block">
                SOLVED
              </span>
              <span className="font-mono text-base sm:text-lg font-extrabold text-emerald-400">
                {myStanding?.solvedCount ?? (team.completedChallenges || []).length}
              </span>
            </div>
            <div className="px-3 py-2 bg-black/50 border border-nexus-paper/20 text-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-nexus-paper/60 block">
                TOTAL TEAMS
              </span>
              <span className="font-mono text-base sm:text-lg font-extrabold text-amber-300">
                {rankedList.length}
              </span>
            </div>
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        {podiumTop3.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {podiumTop3.map((entry, idx) => {
              const isMe = String(entry.teamId || '').toUpperCase() === myTeamId;
              const badgeStyles =
                idx === 0
                  ? 'bg-amber-400 text-nexus-ink border-nexus-ink'
                  : idx === 1
                    ? 'bg-zinc-300 text-nexus-ink border-nexus-ink'
                    : 'bg-amber-700 text-white border-nexus-ink';
              const rankTitle =
                idx === 0 ? '1ST // APEX LEADER' : idx === 1 ? '2ND // VANGUARD' : '3RD // ELITE';

              return (
                <div
                  key={entry.teamId}
                  className={`nexus-editorial-box p-4 border-2 relative overflow-hidden ${
                    isMe
                      ? 'border-nexus-crimson bg-nexus-ink text-nexus-paper shadow-brutal-crimson'
                      : idx === 0
                        ? 'border-nexus-ink bg-nexus-paper-elevated shadow-brutal'
                        : 'border-nexus-ink bg-nexus-paper shadow-brutal-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest border ${badgeStyles}`}
                    >
                      <Trophy className="w-3 h-3 inline mr-1 -mt-0.5" />
                      {rankTitle}
                    </span>
                    {isMe && (
                      <span className="px-2 py-0.5 bg-nexus-crimson text-white font-mono text-[9px] font-bold uppercase">
                        YOU
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest block ${
                        isMe ? 'text-nexus-paper/65' : 'text-nexus-muted'
                      }`}
                    >
                      {entry.teamId}
                    </span>
                    <h3
                      className={`font-display text-2xl uppercase tracking-wide truncate ${
                        isMe ? 'text-white' : 'text-nexus-ink'
                      }`}
                    >
                      {entry.teamName || entry.teamId}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="text-[9px] uppercase opacity-70 block">CREDITS</span>
                      <span className="text-base font-extrabold text-nexus-crimson">
                        {Number(entry.credits || 0).toLocaleString()} CR
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase opacity-70 block">SOLVED</span>
                      <span className="text-base font-extrabold">
                        {Number(entry.solvedCount || 0)} CHALLENGES
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter & Search Bar + Full Standings Table */}
        <div className="nexus-editorial-box p-4 sm:p-5 border-2 border-nexus-ink space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-nexus-ink pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: `ALL SQUADS (${rankedList.length})` },
                { id: 'TOP10', label: 'TOP 10' },
                { id: 'NEAR_ME', label: 'AROUND MY SQUAD' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setViewMode(tab.id)}
                  className={`px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider border-2 border-nexus-ink transition-colors cursor-pointer ${
                    viewMode === tab.id
                      ? 'bg-nexus-crimson text-white'
                      : 'bg-nexus-paper text-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-nexus-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH TEAM NAME OR ID..."
                className="w-full pl-9 pr-3 py-1.5 border-2 border-nexus-ink bg-white text-nexus-ink font-mono text-xs uppercase placeholder:text-nexus-muted focus:outline-none focus:border-nexus-crimson"
              />
            </div>
          </div>

          {/* Responsive Standings Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-nexus-ink text-nexus-paper uppercase text-[10px] tracking-widest">
                  <th className="py-2.5 px-3 text-left">RANK</th>
                  <th className="py-2.5 px-3 text-left">SQUAD</th>
                  <th className="py-2.5 px-3 text-center">SOLVED</th>
                  <th className="py-2.5 px-3 text-center hidden sm:table-cell">RISK PROFILE</th>
                  <th className="py-2.5 px-3 text-center hidden md:table-cell">CORE STATUS</th>
                  <th className="py-2.5 px-3 text-right">CREDITS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nexus-ink/15">
                {filteredStandings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-nexus-muted uppercase">
                      NO SQUADS MATCH YOUR SEARCH FILTER.
                    </td>
                  </tr>
                ) : (
                  filteredStandings.map((entry) => {
                    const isMe = String(entry.teamId || '').toUpperCase() === myTeamId;
                    return (
                      <tr
                        key={entry.teamId}
                        className={`transition-colors ${
                          isMe
                            ? 'bg-nexus-crimson/15 font-bold border-l-4 border-l-nexus-crimson'
                            : 'hover:bg-black/5'
                        }`}
                      >
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 font-bold text-xs border ${
                              entry.rank === 1
                                ? 'bg-amber-400 text-nexus-ink border-nexus-ink'
                                : entry.rank === 2
                                  ? 'bg-zinc-300 text-nexus-ink border-nexus-ink'
                                  : entry.rank === 3
                                    ? 'bg-amber-700 text-white border-nexus-ink'
                                    : isMe
                                      ? 'bg-nexus-crimson text-white border-nexus-ink'
                                      : 'bg-nexus-paper text-nexus-ink border-nexus-ink/30'
                            }`}
                          >
                            #{entry.rank}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-condensed text-base font-extrabold uppercase tracking-wider text-nexus-ink">
                              {entry.teamName || entry.teamId}
                            </span>
                            <span className="text-[10px] text-nexus-muted uppercase">
                              [{entry.teamId}]
                            </span>
                            {isMe && (
                              <span className="px-1.5 py-0.5 bg-nexus-crimson text-white text-[9px] font-bold uppercase">
                                YOUR SQUAD
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-center font-bold text-nexus-ink">
                          {Number(entry.solvedCount || 0)}
                        </td>

                        <td className="py-3 px-3 text-center hidden sm:table-cell">
                          <RiskBadge risk={entry.riskProfile || 'BALANCED'} size="xs" />
                        </td>

                        <td className="py-3 px-3 text-center hidden md:table-cell">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                              entry.coreState === 'COMPLETED'
                                ? 'bg-emerald-600 text-white border-emerald-700'
                                : entry.coreState === 'IN_PROGRESS' ||
                                    entry.coreState === 'UNLOCKED'
                                  ? 'bg-amber-300 text-nexus-ink border-nexus-ink'
                                  : 'bg-black/5 text-nexus-muted border-nexus-ink/20'
                            }`}
                          >
                            {entry.coreState || 'LOCKED'}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right whitespace-nowrap font-extrabold text-sm text-nexus-crimson">
                          {Number(entry.credits || 0).toLocaleString()} CR
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShellLayout>
  );
};

export default LeaderboardPage;
