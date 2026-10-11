import React, { useState, useMemo } from 'react';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Download,
  Play,
  Square,
  RefreshCw,
  Clock,
  Activity,
  Users,
  Search,
  Trash2,
  FileText,
} from 'lucide-react';

const formatDuration = (seconds) => {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
};

const formatTime = (iso) => {
  if (!iso) return '--:--:--';
  try {
    return new Date(iso).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return '--:--:--';
  }
};

export const AdminRecordingModal = ({
  isOpen,
  onClose,
  recordingState,
  onStartRecording,
  onStopRecording,
  onClearRecordings,
  onRefresh,
  pending,
}) => {
  const [activeSubTab, setActiveSubTab] = useState('ANOMALIES'); // 'ANOMALIES' | 'TEAMS' | 'TIMELINE'
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('ALL');
  const [selectedActionFilter, setSelectedActionFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const isRecording = Boolean(recordingState?.isRecording);
  const report = recordingState?.activeRecording || recordingState?.latestReport || null;
  const summary = report?.summary || {
    totalEvents: 0,
    activeTeamsCount: 0,
    solvesCount: 0,
    failuresCount: 0,
    timeoutsCount: 0,
    purchasesCount: 0,
    hintsUsedCount: 0,
    loginsCount: 0,
    totalCreditsAwarded: 0,
    totalCreditsSpentAndPenalties: 0,
    anomaliesCount: 0,
    criticalAnomaliesCount: 0,
    highAnomaliesCount: 0,
    warningAnomaliesCount: 0,
  };

  const anomalies = useMemo(() => report?.anomalies || [], [report]);
  const teamBreakdown = useMemo(() => report?.teamBreakdown || [], [report]);
  const events = useMemo(() => report?.events || [], [report]);

  const filteredAnomalies = useMemo(() => {
    return anomalies.filter((a) => {
      if (selectedTeamFilter !== 'ALL' && a.teamId !== selectedTeamFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        String(a.teamId || '').toLowerCase().includes(q) ||
        String(a.title || '').toLowerCase().includes(q) ||
        String(a.detail || '').toLowerCase().includes(q) ||
        String(a.challengeId || '').toLowerCase().includes(q)
      );
    });
  }, [anomalies, selectedTeamFilter, searchQuery]);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (selectedTeamFilter !== 'ALL' && ev.teamId !== selectedTeamFilter) return false;
      if (selectedActionFilter !== 'ALL' && ev.action !== selectedActionFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        String(ev.teamId || '').toLowerCase().includes(q) ||
        String(ev.summary || '').toLowerCase().includes(q) ||
        String(ev.challengeId || '').toLowerCase().includes(q) ||
        String(ev.action || '').toLowerCase().includes(q)
      );
    });
  }, [events, selectedTeamFilter, selectedActionFilter, searchQuery]);

  if (!isOpen) return null;

  const handleDownloadJson = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberquest-audit-${report.recordingId || 'report'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    if (!report) return;
    const headers = [
      'Timestamp',
      'Action',
      'TeamID',
      'Operative',
      'ChallengeID',
      'VariantID',
      'SolveDurationSec',
      'CreditsDelta',
      'BalanceAfter',
      'Summary',
    ];
    const rows = (report.events || []).map((ev) => {
      const m = ev.metadata || {};
      return [
        ev.timestamp || '',
        ev.action || '',
        ev.teamId || '',
        m.memberName || m.memberId || '',
        ev.challengeId || '',
        m.variantId || '',
        m.solveDurationSeconds ?? '',
        ev.creditsDelta ?? 0,
        ev.balanceAfter ?? '',
        `"${String(ev.summary || '').replace(/"/g, '""')}"`,
      ].join(',');
    });
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberquest-events-${report.recordingId || 'report'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl bg-white border-4 border-[#111111] shadow-[10px_10px_0px_#111111] flex flex-col max-h-[92vh] overflow-hidden font-mono text-[#111111]">
        {/* MODAL HEADER */}
        <div
          className={`px-5 py-4 border-b-2 border-[#111111] flex flex-wrap items-center justify-between gap-3 ${
            isRecording ? 'bg-[#E11D2E] text-white' : 'bg-[#111111] text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            {isRecording ? (
              <span className="w-3.5 h-3.5 rounded-full bg-white animate-ping inline-block" />
            ) : (
              <FileText className="w-5 h-5 text-[#E11D2E]" />
            )}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-85">
                {isRecording
                  ? `LIVE RECORDING IN PROGRESS // ${report?.recordingId || ''}`
                  : report
                    ? `FINALIZED AUDIT REPORT // ${report.recordingId}`
                    : 'GAME ACTIVITY & ANOMALY RECORDER'}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide leading-none mt-0.5">
                {isRecording
                  ? 'LIVE GAME RECORDING & ANOMALY MONITOR'
                  : 'GAME RECORDING & ANOMALY REPORT'}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isRecording ? (
              <button
                type="button"
                disabled={pending}
                onClick={onStopRecording}
                className="px-3.5 py-2 bg-[#111111] hover:bg-neutral-800 text-white border-2 border-white font-bold uppercase text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current text-[#E11D2E]" />
                <span>Stop & Finalize Report</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={pending}
                onClick={onStartRecording}
                className="px-3.5 py-2 bg-[#E11D2E] hover:bg-red-700 text-white border-2 border-white font-bold uppercase text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start New Recording</span>
              </button>
            )}

            <button
              type="button"
              onClick={onRefresh}
              className="p-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 cursor-pointer"
              title="Refresh Report Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${pending ? 'animate-spin' : ''}`} />
            </button>

            {report && (
              <>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="px-3 py-2 bg-white text-[#111111] hover:bg-neutral-200 font-bold uppercase text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="px-3 py-2 bg-white text-[#111111] hover:bg-neutral-200 font-bold uppercase text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white text-white hover:text-[#111111] border border-white/30 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BODY */}
        {!report ? (
          <div className="p-10 text-center space-y-4 bg-[#FAF9F5]">
            <ShieldAlert className="w-12 h-12 text-[#E11D2E] mx-auto" />
            <h3 className="font-display text-3xl uppercase text-[#111111]">
              NO ACTIVE OR SAVED RECORDING YET
            </h3>
            <p className="text-xs text-neutral-600 max-w-lg mx-auto leading-relaxed">
              Click <strong>Start New Recording</strong> before or during a round to record every
              team login, challenge purchase, variant assignment, solve time, failure, and credit
              change. The system automatically flags suspicious solve speeds, brute-force guessing,
              and cross-team collusion.
            </p>
            <button
              type="button"
              onClick={onStartRecording}
              className="px-6 py-3 bg-[#E11D2E] hover:bg-[#111111] text-white font-bold uppercase text-xs tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] cursor-pointer inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Recording Game Activity Now</span>
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF9F5]">
            {/* 1. RECORDING METADATA & KPI SUMMARY CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* ANOMALY KPI */}
              <div
                className={`p-3.5 border-2 border-[#111111] ${
                  summary.anomaliesCount > 0
                    ? 'bg-red-50 border-[#E11D2E]'
                    : 'bg-emerald-50 border-emerald-600'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                  <span
                    className={
                      summary.anomaliesCount > 0 ? 'text-[#E11D2E]' : 'text-emerald-800'
                    }
                  >
                    ANOMALIES DETECTED
                  </span>
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      summary.anomaliesCount > 0 ? 'text-[#E11D2E]' : 'text-emerald-600'
                    }`}
                  />
                </div>
                <div
                  className={`font-display text-4xl leading-none mt-1 ${
                    summary.anomaliesCount > 0 ? 'text-[#E11D2E]' : 'text-emerald-700'
                  }`}
                >
                  {summary.anomaliesCount}
                </div>
                <div className="text-[10px] text-neutral-600 mt-1 font-bold">
                  {summary.criticalAnomaliesCount} CRITICAL · {summary.highAnomaliesCount} HIGH ·{' '}
                  {summary.warningAnomaliesCount} WARN
                </div>
              </div>

              {/* EVENTS & DURATION KPI */}
              <div className="p-3.5 border-2 border-[#111111] bg-white">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-500">
                  <span>EVENTS RECORDED</span>
                  <Clock className="w-4 h-4 text-[#111111]" />
                </div>
                <div className="font-display text-4xl leading-none mt-1 text-[#111111]">
                  {summary.totalEvents}
                </div>
                <div className="text-[10px] text-neutral-600 mt-1 font-bold">
                  Duration: {formatDuration(report.durationSeconds)} ({formatTime(report.startedAt)}{' '}
                  → {report.endedAt ? formatTime(report.endedAt) : 'LIVE'})
                </div>
              </div>

              {/* SOLVES VS FAILS KPI */}
              <div className="p-3.5 border-2 border-[#111111] bg-white">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-500">
                  <span>SOLVES / FAILS</span>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-display text-4xl leading-none mt-1 text-[#111111]">
                  <span className="text-emerald-600">{summary.solvesCount}</span>
                  <span className="text-neutral-400 mx-1">/</span>
                  <span className="text-[#E11D2E]">{summary.failuresCount}</span>
                </div>
                <div className="text-[10px] text-neutral-600 mt-1 font-bold">
                  {summary.activeTeamsCount} Active Teams · {summary.hintsUsedCount} Hints Used
                </div>
              </div>

              {/* CREDITS FLOW KPI */}
              <div className="p-3.5 border-2 border-[#111111] bg-white">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-500">
                  <span>CREDITS VOLUME</span>
                  <Users className="w-4 h-4 text-[#111111]" />
                </div>
                <div className="font-display text-3xl leading-none mt-1 text-emerald-700">
                  +{Number(summary.totalCreditsAwarded || 0).toLocaleString()} CR
                </div>
                <div className="text-[10px] text-[#E11D2E] mt-1 font-bold">
                  -{Number(summary.totalCreditsSpentAndPenalties || 0).toLocaleString()} CR Spent /
                  Penalties
                </div>
              </div>
            </div>

            {/* 2. SUB-NAVIGATION TABS & FILTERS */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-2 border-[#111111] p-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('ANOMALIES')}
                  className={`px-3.5 py-2 text-xs font-bold uppercase border-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeSubTab === 'ANOMALIES'
                      ? 'bg-[#E11D2E] text-white border-[#111111]'
                      : 'bg-neutral-100 text-[#111111] border-transparent hover:border-[#111111]'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Anomalies ({anomalies.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab('TEAMS')}
                  className={`px-3.5 py-2 text-xs font-bold uppercase border-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeSubTab === 'TEAMS'
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-neutral-100 text-[#111111] border-transparent hover:border-[#111111]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Team Breakdown ({teamBreakdown.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab('TIMELINE')}
                  className={`px-3.5 py-2 text-xs font-bold uppercase border-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeSubTab === 'TIMELINE'
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-neutral-100 text-[#111111] border-transparent hover:border-[#111111]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Full Event Log ({events.length})</span>
                </button>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedTeamFilter}
                  onChange={(e) => setSelectedTeamFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-[#111111] text-xs font-bold"
                >
                  <option value="ALL">All Teams ({teamBreakdown.length})</option>
                  {teamBreakdown.map((tb) => (
                    <option key={tb.teamId} value={tb.teamId}>
                      {tb.teamId} ({tb.eventsCount} events
                      {tb.anomaliesCount > 0 ? ` · ⚠ ${tb.anomaliesCount}` : ''})
                    </option>
                  ))}
                </select>

                {activeSubTab === 'TIMELINE' && (
                  <select
                    value={selectedActionFilter}
                    onChange={(e) => setSelectedActionFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-[#111111] text-xs font-bold"
                  >
                    <option value="ALL">All Actions</option>
                    <option value="SUCCESS">SUCCESS (Solves)</option>
                    <option value="FAILURE">FAILURE / TIMEOUT</option>
                    <option value="START">START (Variant Assigned)</option>
                    <option value="PURCHASE">PURCHASE</option>
                    <option value="HINT">HINT UNLOCK</option>
                    <option value="LOGIN">LOGIN</option>
                  </select>
                )}

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter team / challenge..."
                    className="pl-8 pr-3 py-1.5 bg-white border border-[#111111] text-xs w-44 sm:w-56"
                  />
                </div>
              </div>
            </div>

            {/* 3. TAB CONTENT */}
            {activeSubTab === 'ANOMALIES' && (
              <div className="space-y-3">
                {filteredAnomalies.length === 0 ? (
                  <div className="p-8 bg-white border-2 border-emerald-600 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <div className="font-display text-2xl uppercase text-emerald-800">
                      NO SUSPICIOUS ANOMALIES DETECTED
                    </div>
                    <p className="text-xs text-neutral-600">
                      All recorded solves, timings, and team submissions during this window appear
                      within normal parameters.
                    </p>
                  </div>
                ) : (
                  filteredAnomalies.map((anm) => {
                    const isCrit = anm.severity === 'CRITICAL';
                    const isHigh = anm.severity === 'HIGH';
                    return (
                      <div
                        key={anm.anomalyId}
                        className={`p-4 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isCrit
                            ? 'bg-red-50 border-[#E11D2E]'
                            : isHigh
                              ? 'bg-amber-50 border-amber-600'
                              : 'bg-white border-[#111111]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                                isCrit
                                  ? 'bg-[#E11D2E] text-white'
                                  : isHigh
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-[#111111] text-white'
                              }`}
                            >
                              {anm.severity} // {anm.type}
                            </span>
                            <span className="font-bold text-xs text-[#111111]">{anm.teamId}</span>
                            {anm.memberName && (
                              <span className="text-xs text-neutral-600">({anm.memberName})</span>
                            )}
                            {anm.challengeId && (
                              <span className="px-2 py-0.5 bg-white border border-neutral-300 text-[10px] font-bold">
                                {anm.challengeId}
                              </span>
                            )}
                            <span className="text-[11px] text-neutral-500">
                              {formatTime(anm.timestamp)}
                            </span>
                          </div>
                          <div className="font-bold text-sm text-[#111111]">{anm.title}</div>
                          <p className="text-xs text-neutral-700 leading-relaxed">{anm.detail}</p>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTeamFilter(anm.teamId);
                              setActiveSubTab('TIMELINE');
                            }}
                            className="px-3 py-1.5 bg-[#111111] hover:bg-[#E11D2E] text-white text-[11px] font-bold uppercase cursor-pointer"
                          >
                            Inspect Team Log →
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeSubTab === 'TEAMS' && (
              <div className="bg-white border-2 border-[#111111] overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#111111] text-white uppercase text-[10px]">
                      <th className="py-2.5 px-3">Team</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Solves / Fails</th>
                      <th className="py-2.5 px-3">Fastest Solve</th>
                      <th className="py-2.5 px-3">Avg Solve</th>
                      <th className="py-2.5 px-3">Hints</th>
                      <th className="py-2.5 px-3">Net Credits</th>
                      <th className="py-2.5 px-3">Anomalies</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {teamBreakdown.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-neutral-500">
                          No team events recorded yet.
                        </td>
                      </tr>
                    ) : (
                      teamBreakdown.map((tb) => (
                        <tr key={tb.teamId} className="hover:bg-neutral-50">
                          <td className="py-2.5 px-3 font-bold">
                            <div>{tb.teamId}</div>
                            {tb.activeMembers?.length > 0 && (
                              <div className="text-[10px] text-neutral-500 font-normal">
                                {tb.activeMembers.join(', ')}
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                                tb.statusFlag === 'CRITICAL'
                                  ? 'bg-[#E11D2E] text-white'
                                  : tb.statusFlag === 'FLAGGED'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-400'
                                    : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {tb.statusFlag}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-bold">
                            <span className="text-emerald-700">{tb.solves} W</span>
                            <span className="text-neutral-400 mx-1">/</span>
                            <span className="text-[#E11D2E]">{tb.failures} L</span>
                          </td>
                          <td className="py-2.5 px-3 font-bold">
                            {tb.fastestSolveSeconds !== null ? (
                              <span
                                className={
                                  tb.fastestSolveSeconds <= 18
                                    ? 'text-[#E11D2E] font-extrabold'
                                    : 'text-[#111111]'
                                }
                              >
                                {tb.fastestSolveSeconds}s
                              </span>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            {tb.avgSolveSeconds !== null ? `${tb.avgSolveSeconds}s` : '—'}
                          </td>
                          <td className="py-2.5 px-3">{tb.hintsUsed}</td>
                          <td
                            className={`py-2.5 px-3 font-bold ${
                              tb.netCredits >= 0 ? 'text-emerald-700' : 'text-[#E11D2E]'
                            }`}
                          >
                            {tb.netCredits >= 0 ? `+${tb.netCredits}` : tb.netCredits} CR
                          </td>
                          <td className="py-2.5 px-3 font-bold">
                            {tb.anomaliesCount > 0 ? (
                              <span className="text-[#E11D2E]">{tb.anomaliesCount} Flagged</span>
                            ) : (
                              <span className="text-neutral-400">0</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedTeamFilter(tb.teamId);
                                setActiveSubTab('TIMELINE');
                              }}
                              className="px-2.5 py-1 bg-neutral-100 hover:bg-[#111111] hover:text-white border border-neutral-300 text-[10px] font-bold uppercase cursor-pointer"
                            >
                              View Events ({tb.eventsCount})
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeSubTab === 'TIMELINE' && (
              <div className="bg-white border-2 border-[#111111] overflow-x-auto max-h-[420px] overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="sticky top-0 bg-[#111111] text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Action</th>
                      <th className="py-2.5 px-3">Team / Operative</th>
                      <th className="py-2.5 px-3">Challenge / Variant</th>
                      <th className="py-2.5 px-3">Solve Time</th>
                      <th className="py-2.5 px-3">Credits</th>
                      <th className="py-2.5 px-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredEvents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-neutral-500">
                          No matching events in this recording window.
                        </td>
                      </tr>
                    ) : (
                      filteredEvents.map((ev) => {
                        const meta = ev.metadata || {};
                        const delta = Number(ev.creditsDelta || 0);
                        return (
                          <tr key={ev.auditId} className="hover:bg-neutral-50">
                            <td className="py-2 px-3 whitespace-nowrap text-neutral-500">
                              {formatTime(ev.timestamp)}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                                  ev.action === 'SUCCESS'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ev.action === 'FAILURE'
                                      ? 'bg-red-100 text-[#E11D2E]'
                                      : ev.action === 'START'
                                        ? 'bg-sky-100 text-sky-800'
                                        : 'bg-neutral-100 text-neutral-800'
                                }`}
                              >
                                {ev.action}
                              </span>
                            </td>
                            <td className="py-2 px-3 font-bold whitespace-nowrap">
                              <div>{ev.teamId || ev.actorId}</div>
                              {meta.memberName && (
                                <div className="text-[10px] text-neutral-500 font-normal">
                                  {meta.memberName}
                                </div>
                              )}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              {ev.challengeId ? (
                                <div>
                                  <span className="font-bold">{ev.challengeId}</span>
                                  {meta.variantId && (
                                    <span className="ml-1.5 px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-[9px]">
                                      {meta.variantId}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                '—'
                              )}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap font-bold">
                              {meta.solveDurationSeconds !== undefined &&
                              meta.solveDurationSeconds !== null ? (
                                <span
                                  className={
                                    meta.solveDurationSeconds <= 15 && ev.action === 'SUCCESS'
                                      ? 'text-[#E11D2E]'
                                      : 'text-[#111111]'
                                  }
                                >
                                  {meta.solveDurationSeconds}s
                                </span>
                              ) : (
                                '—'
                              )}
                            </td>
                            <td
                              className={`py-2 px-3 whitespace-nowrap font-bold ${
                                delta > 0
                                  ? 'text-emerald-700'
                                  : delta < 0
                                    ? 'text-[#E11D2E]'
                                    : 'text-neutral-400'
                              }`}
                            >
                              {delta !== 0 ? `${delta > 0 ? '+' : ''}${delta} CR` : '0 CR'}
                            </td>
                            <td className="py-2 px-3 text-neutral-700 max-w-md">
                              <div>{ev.summary}</div>
                              {meta.reason && (
                                <div className="text-[10px] text-[#E11D2E] font-bold mt-0.5">
                                  Reason: {meta.reason}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="px-5 py-3 bg-white border-t-2 border-[#111111] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-neutral-600">
            {isRecording
              ? 'Recording is active — all game actions and anomalies are being captured in real time.'
              : 'Tip: Export CSV or JSON for permanent offline archive on the local server.'}
          </div>
          <div className="flex items-center gap-2">
            {report && !isRecording && (
              <button
                type="button"
                onClick={onClearRecordings}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-red-50 text-neutral-600 hover:text-[#E11D2E] border border-neutral-300 font-bold uppercase text-[11px] inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#111111] text-white font-bold uppercase text-[11px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRecordingModal;
