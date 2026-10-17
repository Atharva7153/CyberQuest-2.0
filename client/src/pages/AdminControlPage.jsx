import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Users,
  UserPlus,
  Coins,
  Play,
  Pause,
  Square,
  RotateCcw,
  Lock,
  Unlock,
  Sparkles,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Edit3,
  Trash2,
  RefreshCw,
  LogOut,
  Copy,
  Check,
  Clock,
  Sliders,
  Gamepad2,
  Activity,
  Filter,
  ChevronDown,
  ChevronUp,
  Trophy,
  Flame,
  KeyRound,
} from 'lucide-react';
import { socketClient, NEXUS_SOCKET_EVENTS as SOCKET_EVENTS } from '../socket/socketClient';
import { GamePreviewThumbnail } from '../components/GamePreviewThumbnail';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import { AdminRecordingModal } from '../components/AdminRecordingModal';
import {
  getFriendlyChallengeTitle,
  getFriendlyChallengeDescription,
  MARKET_GAMES,
  resolveChallengeGameType,
  getGameNameLabel,
  getFriendlyDifficultyLabel,
  sortChallengesByGameDifficulty,
} from '../components/ChallengeMarketModule';
import { API_BASE_URL } from '../config/runtimeConfig';

const ADMIN_TOKEN_KEY = 'nexus_admin_token';
const ADMIN_OPERATOR_KEY = 'nexus_admin_operator';

const CANONICAL_CATEGORIES = ['LOGIC', 'PUZZLES', 'OBSERVATION', 'KNOWLEDGE', 'TECHNICAL'];
const CANONICAL_DIFFICULTIES = ['LOW', 'MODERATE', 'HIGH', 'EXTREME'];
const CANONICAL_RISKS = ['SAFE', 'BALANCED', 'AGGRESSIVE'];
const CANONICAL_GAME_TYPES = [
  { value: 'sudoku', label: 'Sudoku Grid' },
  { value: 'connect4', label: 'Connect 4 vs AI' },
  { value: 'wordGuess', label: 'Word Guessing' },
  { value: 'xo4x4', label: '4×4 Tic-Tac-Toe vs AI' },
  { value: 'wend', label: 'Wend (Word Ladder)' },
  { value: 'patches', label: 'Patches (Grid Partition)' },
  { value: 'zip', label: 'Zip (Circuit Path)' },
  { value: 'queens', label: 'N-Queens (Crown Placement)' },
  { value: 'aptitude', label: 'Aptitude (Quant & Logic MCQ)' },
  { value: 'gkTrueFalse', label: 'GK (6× True or False)' },
  { value: 'memoryMatrix', label: 'Memory Matrix (Visual Recall)' },
];

const TEAM_SIZE_MODES = [
  { size: 1, tag: 'SOLO', label: 'Solo (1 Player)' },
  { size: 2, tag: 'DUO', label: 'Duo (2 Players)' },
  { size: 3, tag: 'TRIO', label: 'Trio (3 Players)' },
  { size: 4, tag: 'SQUAD', label: 'Squad (Max 4)' },
];

const ROUND_TIME_PRESETS = [5, 15, 30, 45, 60, 90, 120, 135];

const ADMIN_NAV_TABS = [
  { path: '/admin/events', id: 'events', label: 'Round Control', icon: Flame },
  { path: '/admin/teams', id: 'teams', label: 'Teams & Passwords', icon: Users },
  { path: '/admin/leaderboard', id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/admin/volunteers', id: 'volunteers', label: 'Floor Volunteers', icon: UserPlus },
  { path: '/admin/attempts', id: 'attempts', label: 'Live Events', icon: Activity },
  { path: '/admin/challenges', id: 'challenges', label: 'Challenges', icon: Gamepad2 },
];

const VOLUNTEER_NAV_TABS = [
  { path: '/admin/teams', id: 'teams', label: 'Teams & Passwords', icon: Users },
];

const formatDurationClock = (seconds, forceHours = false) => {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0 || forceHours) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatTimestampShort = (iso) => {
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

const getTeamFormatInfo = (team) => {
  const count = Math.min(4, Math.max(1, Number(team?.teamSize || team?.members?.length || 1)));
  if (count === 1) return { size: 1, label: 'SOLO', badgeClass: 'bg-sky-50 text-sky-700 border-sky-200' };
  if (count === 2) return { size: 2, label: 'DUO', badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
  if (count === 3) return { size: 3, label: 'TRIO', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' };
  return { size: 4, label: 'SQUAD (4)', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
};

const EMPTY_CHALLENGE_FORM = {
  challengeId: '',
  title: '',
  category: 'LOGIC',
  description: '',
  difficulty: 'MODERATE',
  risk: 'BALANCED',
  cost: 300,
  reward: 650,
  penalty: 75,
  timeLimit: 900,
  gameType: 'wordGuess',
  expectedAnswer: 'CIPHER',
  gameConfigText: JSON.stringify({ maxHints: 2 }, null, 2),
  enabled: true,
  available: true,
};

export const AdminControlPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth state
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || '');
  const [operator, setOperator] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_OPERATOR_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const isVolunteer = operator?.role === 'VOLUNTEER';
  const visibleNavTabs = isVolunteer ? VOLUNTEER_NAV_TABS : ADMIN_NAV_TABS;

  // Control System State
  const [adminState, setAdminState] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [pendingKey, setPendingKey] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Live 1s ticker for global timer & active session countdowns
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [serverOffsetMs, setServerOffsetMs] = useState(0);

  // Team Registration state (collapsible so UI stays clean)
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [regTeamName, setRegTeamName] = useState('');
  const [regTeamId, setRegTeamId] = useState('');
  const [regPassword, setRegPassword] = useState('NEXUS-2026');
  const [regCredits, setRegCredits] = useState(1500);
  const [regTeamSize, setRegTeamSize] = useState(4);
  const [regMembers, setRegMembers] = useState(['', '', '', '']);
  const [lastCreatedTeam, setLastCreatedTeam] = useState(null);
  const [copiedTeamId, setCopiedTeamId] = useState(false);
  const [copiedCredentialKey, setCopiedCredentialKey] = useState(null);

  // Floor Volunteer Management state (Admin only)
  const [volName, setVolName] = useState('');
  const [volOperatorId, setVolOperatorId] = useState('');
  const [volPassword, setVolPassword] = useState('NEXUS-VOL-2026');
  const [volSector, setVolSector] = useState('FLOOR-1');

  // Universal Arena Credits state (optimized for 300+ players)
  const [bulkSetCreditsInput, setBulkSetCreditsInput] = useState(3000);
  const [bulkAddCreditsInput, setBulkAddCreditsInput] = useState(500);

  // Team Search, Filter & Quick Edit state
  const [teamSearch, setTeamSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('ALL');
  const [customCreditInputs, setCustomCreditInputs] = useState({});
  const [editingTeamModal, setEditingTeamModal] = useState(null);

  // Live Events (Team-Wise Filter + Event Type Filter)
  const [selectedEventTeamId, setSelectedEventTeamId] = useState('ALL');
  const [attemptStatusFilter, setAttemptStatusFilter] = useState('ALL');
  const [attemptSearch, setAttemptSearch] = useState('');

  // Challenge Control state
  const [challengeSearch, setChallengeSearch] = useState('');
  const [challengeCategoryFilter, setChallengeCategoryFilter] = useState('ALL');
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [challengeForm, setChallengeForm] = useState(EMPTY_CHALLENGE_FORM);
  const [challengeFormError, setChallengeFormError] = useState('');
  const [showAdvancedJson, setShowAdvancedJson] = useState(false);

  // Round Timer & Settings state
  const [customTimerMinutes, setCustomTimerMinutes] = useState(45);
  const [countdownSeconds, setCountdownSeconds] = useState(10);
  const [selectedWinnerTeamId, setSelectedWinnerTeamId] = useState('AUTO_LEADER');
  const [selectedSecondWinnerTeamId, setSelectedSecondWinnerTeamId] = useState('AUTO_SECOND');
  const [coreAnswerInput, setCoreAnswerInput] = useState('');
  const lastSyncedTotalSecRef = useRef(null);
  const [settingsForm, setSettingsForm] = useState({
    startingCredits: 1500,
    hintCost: 120,
    extraTimeCost: 150,
    extraTimeMinutes: 5,
    reattemptMultiplier: 1.25,
    arenaAnnouncement: 'ALL SECTORS NOMINAL // RESISTANCE OPERATIVES ACTIVE',
    challengeTimingMultiplier: 1.0,
    maxConsecutiveGames: 5,
    consecutiveGamesCooldownMinutes: 5,
    consecutiveGamesCooldownSeconds: 300,
    gameTimings: {
      sudoku: 300,
      patches: 210,
      zip: 210,
      queens: 210,
      memoryMatrix: 180,
      connect4: 210,
      xo4x4: 210,
      wordGuess: 180,
      wend: 180,
      aptitude: 210,
      gkTrueFalse: 100,
    },
  });

  const globalEventBannerRef = useRef(null);

  const showToast = useCallback((message, tone = 'info') => {
    setFeedbackToast({ id: Date.now(), message, tone });
  }, []);

  useEffect(() => {
    if (!feedbackToast) return undefined;
    const t = setTimeout(() => setFeedbackToast(null), 3200);
    return () => clearTimeout(t);
  }, [feedbackToast]);

  const triggerGlobalEventGsap = useCallback(() => {
    if (!globalEventBannerRef.current) return;
    gsap.fromTo(
      globalEventBannerRef.current,
      { y: -2 },
      { y: 0, duration: 0.25, ease: 'power2.out', clearProps: 'transform,backgroundColor' }
    );
  }, []);

  const applyServerState = useCallback((data) => {
    if (!data) return;
    setAdminState((prev) => ({
      ...(prev || {}),
      ...data,
    }));
    if (data.serverTime) {
      const parsed = new Date(data.serverTime).getTime();
      if (!Number.isNaN(parsed)) {
        setServerOffsetMs(parsed - Date.now());
      }
    }
    if (data.globalTimer?.totalDurationSeconds) {
      const totalSec = Number(data.globalTimer.totalDurationSeconds);
      if (totalSec > 0 && lastSyncedTotalSecRef.current !== totalSec) {
        lastSyncedTotalSecRef.current = totalSec;
        setCustomTimerMinutes(Math.max(1, Math.round(totalSec / 60)));
      }
    }
    if (data.settings) {
      setSettingsForm((prev) => ({
        ...prev,
        ...data.settings,
        gameTimings: {
          ...prev.gameTimings,
          ...(data.settings.gameTimings || {}),
        },
      }));
    }
  }, []);

  // Fetch initial state when token exists
  const fetchAdminState = useCallback(
    async (overrideToken = token, silent = false) => {
      if (!overrideToken) return;
      if (!silent) setLoadingState(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/state`, {
          headers: {
            Authorization: `Bearer ${overrideToken}`,
          },
        });
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          localStorage.removeItem(ADMIN_OPERATOR_KEY);
          setToken('');
          setOperator(null);
          return;
        }
        const data = await res.json();
        if (res.ok) {
          applyServerState(data);
        }
      } catch (err) {
        if (!silent) showToast(`Sync error: ${err.message}`, 'error');
      } finally {
        if (!silent) setLoadingState(false);
      }
    },
    [token, applyServerState, showToast]
  );

  useEffect(() => {
    if (token) {
      fetchAdminState(token);
    }
  }, [token, fetchAdminState]);

  // Socket.IO Live Monitor subscription
  useEffect(() => {
    if (!token) return undefined;

    const socket = socketClient;

    const subscribeAdminRoom = () => {
      setSocketConnected(true);
      socket.emit(SOCKET_EVENTS.ADMIN.SUBSCRIBE, { token }, (ack) => {
        if (ack?.ok && ack.state) {
          applyServerState(ack.state);
        }
      });
    };

    const handleDisconnect = () => setSocketConnected(false);

    const handleAdminStateUpdate = (payload) => {
      if (payload) {
        applyServerState(payload);
      }
    };

    if (socket.connected) {
      subscribeAdminRoom();
    } else {
      socket.connect();
    }

    socket.on('connect', subscribeAdminRoom);
    socket.on('disconnect', handleDisconnect);
    socket.on(SOCKET_EVENTS.ADMIN.STATE_UPDATE, handleAdminStateUpdate);

    return () => {
      socket.off('connect', subscribeAdminRoom);
      socket.off('disconnect', handleDisconnect);
      socket.off(SOCKET_EVENTS.ADMIN.STATE_UPDATE, handleAdminStateUpdate);
    };
  }, [token, applyServerState]);

  // 1-second local clock tick for live timers
  useEffect(() => {
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live global timer with full Start / Pause / End / Total Time accuracy
  const liveGlobalTimer = useMemo(() => {
    const gt = adminState?.globalTimer;
    const fallbackTotalSec = Math.max(60, (Number(customTimerMinutes) || 45) * 60);

    if (!gt) {
      return {
        formatted: formatDurationClock(fallbackTotalSec, true),
        status: 'PAUSED',
        remainingSeconds: fallbackTotalSec,
        totalDurationSeconds: fallbackTotalSec,
        totalDurationMinutes: Math.round(fallbackTotalSec / 60),
        totalFormatted: formatDurationClock(fallbackTotalSec, true),
        elapsedSeconds: 0,
        elapsedFormatted: '00:00:00',
        progressPercent: 0,
      };
    }

    const totalSec = Math.max(
      1,
      Number(gt.totalDurationSeconds) || Number(gt.remainingSeconds) || fallbackTotalSec
    );
    const totalMins = Math.max(1, Math.round(totalSec / 60));

    let remSec = Math.max(0, Number(gt.remainingSeconds ?? 0));
    let status = gt.status || 'PAUSED';
    let countdownRemainingSeconds = Number(gt.countdownRemainingSeconds || 0);

    if (status === 'COUNTDOWN' && gt.countdownTargetTimestamp) {
      const cdTargetMs = new Date(gt.countdownTargetTimestamp).getTime();
      const currentServerMs = nowMs + serverOffsetMs;
      countdownRemainingSeconds = Math.max(0, Math.ceil((cdTargetMs - currentServerMs) / 1000));
      if (countdownRemainingSeconds <= 0) {
        status = 'ACTIVE';
        if (gt.targetTimestamp) {
          const targetMs = new Date(gt.targetTimestamp).getTime();
          remSec = Math.max(0, Math.floor((targetMs - currentServerMs) / 1000));
        }
      }
    } else if (status === 'ACTIVE' && gt.targetTimestamp) {
      const targetMs = new Date(gt.targetTimestamp).getTime();
      const currentServerMs = nowMs + serverOffsetMs;
      remSec = Math.max(0, Math.floor((targetMs - currentServerMs) / 1000));
      if (remSec <= 0) {
        status = 'ENDED';
      }
    } else if (status === 'ENDED') {
      remSec = 0;
    }

    const effectiveTotalSec = Math.max(totalSec, remSec);
    const elapsedSec = Math.max(0, effectiveTotalSec - remSec);
    const progressPercent = Math.min(
      100,
      Math.max(0, Math.round((elapsedSec / Math.max(1, effectiveTotalSec)) * 100))
    );

    return {
      formatted: formatDurationClock(remSec, true),
      status,
      countdownRemainingSeconds,
      remainingSeconds: remSec,
      totalDurationSeconds: effectiveTotalSec,
      totalDurationMinutes: totalMins,
      totalFormatted: formatDurationClock(effectiveTotalSec, true),
      elapsedSeconds: elapsedSec,
      elapsedFormatted: formatDurationClock(elapsedSec, true),
      progressPercent,
      roundStartedAt: gt.roundStartedAt || null,
      roundEndedAt: gt.roundEndedAt || null,
    };
  }, [adminState?.globalTimer, customTimerMinutes, nowMs, serverOffsetMs]);

  // Compute live remaining seconds for any team activeAttempt
  const getLiveAttemptClock = useCallback(
    (attempt) => {
      if (!attempt || attempt.status !== 'IN_PROGRESS' || !attempt.expiresAt) return null;
      const expMs = new Date(attempt.expiresAt).getTime();
      const remSec = Math.max(0, Math.floor((expMs - (nowMs + serverOffsetMs)) / 1000));
      return {
        remainingSeconds: remSec,
        formatted: formatDurationClock(remSec),
        isCritical: remSec <= 60,
      };
    },
    [nowMs, serverOffsetMs]
  );

  // Determine active route section (Floor Volunteers only see 'teams', Admin sees all)
  const activeTabId = useMemo(() => {
    const p = location.pathname.replace(/\/+$/, '');
    if (isVolunteer) {
      return 'teams';
    }
    if (p === '/admin/leaderboard') return 'leaderboard';
    if (p === '/admin/volunteers') return 'volunteers';
    if (p === '/admin/challenges') return 'challenges';
    if (p === '/admin/attempts') return 'attempts';
    if (p === '/admin/teams') return 'teams';
    return 'events';
  }, [location.pathname, isVolunteer]);

  // Live Leaderboard sorted by credits descending, then solved descending
  const liveLeaderboard = useMemo(() => {
    if (Array.isArray(adminState?.leaderboard) && adminState.leaderboard.length > 0) {
      return adminState.leaderboard;
    }
    const list = [...(adminState?.teams || [])];
    list.sort((a, b) => {
      const crDiff = Number(b.credits || 0) - Number(a.credits || 0);
      if (crDiff !== 0) return crDiff;
      const solvedDiff =
        Number(b.completedChallenges?.length || 0) - Number(a.completedChallenges?.length || 0);
      if (solvedDiff !== 0) return solvedDiff;
      return String(a.teamId || '').localeCompare(String(b.teamId || ''));
    });
    return list.map((team, idx) => ({
      rank: idx + 1,
      teamId: team.teamId,
      teamName: team.teamName || team.teamId,
      credits: Number(team.credits || 0),
      totalSolved: Number(team.completedChallenges?.length || 0),
      totalFailed: Number(team.failedChallenges?.length || 0),
      coreState: team.coreState || 'LOCKED',
      online: Boolean(team.connectionState?.connected),
      members: Array.isArray(team.members) ? team.members : [],
    }));
  }, [adminState?.leaderboard, adminState?.teams]);

  // Filtered teams for Teams tab
  const filteredTeams = useMemo(() => {
    const list = adminState?.teams || [];
    return list.filter((team) => {
      if (teamFilter === 'ONLINE' && !team.connectionState?.connected) return false;
      if (teamFilter === 'IN_CHALLENGE' && team.activeAttempt?.status !== 'IN_PROGRESS')
        return false;
      if (teamFilter === 'SOLO' && getTeamFormatInfo(team).size !== 1) return false;
      if (teamFilter === 'DUO' && getTeamFormatInfo(team).size !== 2) return false;
      if (teamFilter === 'TRIO' && getTeamFormatInfo(team).size !== 3) return false;
      if (teamFilter === 'SQUAD' && getTeamFormatInfo(team).size !== 4) return false;

      if (!teamSearch.trim()) return true;
      const q = teamSearch.trim().toLowerCase();
      const memberMatch = (team.members || []).some((m) =>
        String(m.name || '')
          .toLowerCase()
          .includes(q)
      );
      return (
        String(team.teamId || '')
          .toLowerCase()
          .includes(q) ||
        String(team.teamName || '')
          .toLowerCase()
          .includes(q) ||
        memberMatch
      );
    });
  }, [adminState?.teams, teamFilter, teamSearch]);

  const [challengePage, setChallengePage] = useState(1);
  const ADMIN_CHALLENGES_PER_PAGE = 30;

  useEffect(() => {
    setChallengePage(1);
  }, [challengeCategoryFilter, challengeSearch]);

  // Filtered & sorted challenges (by Game Name + Difficulty)
  const filteredChallenges = useMemo(() => {
    const list = adminState?.challenges || [];
    const matching = list.filter((chg) => {
      if (
        challengeCategoryFilter !== 'ALL' &&
        resolveChallengeGameType(chg) !== challengeCategoryFilter
      ) {
        return false;
      }
      if (!challengeSearch.trim()) return true;
      const q = challengeSearch.trim().toLowerCase();
      const friendlyTitle = getFriendlyChallengeTitle(chg).toLowerCase();
      const gameLabel = getGameNameLabel(chg).toLowerCase();
      return (
        String(chg.challengeId || '')
          .toLowerCase()
          .includes(q) ||
        String(chg.title || '')
          .toLowerCase()
          .includes(q) ||
        friendlyTitle.includes(q) ||
        gameLabel.includes(q) ||
        String(chg.gameType || '')
          .toLowerCase()
          .includes(q)
      );
    });
    return sortChallengesByGameDifficulty(matching, 'ASC');
  }, [adminState?.challenges, challengeCategoryFilter, challengeSearch]);

  const totalChallengePages = Math.max(
    1,
    Math.ceil(filteredChallenges.length / ADMIN_CHALLENGES_PER_PAGE)
  );
  const safeChallengePage = Math.min(challengePage, totalChallengePages);
  const paginatedAdminChallenges = useMemo(() => {
    const startIdx = (safeChallengePage - 1) * ADMIN_CHALLENGES_PER_PAGE;
    return filteredChallenges.slice(startIdx, startIdx + ADMIN_CHALLENGES_PER_PAGE);
  }, [filteredChallenges, safeChallengePage]);

  // Team lookup map for Live Events
  const teamsById = useMemo(() => {
    const map = {};
    for (const t of adminState?.teams || []) {
      map[t.teamId] = t;
    }
    return map;
  }, [adminState?.teams]);

  // Unified Live Events list (combines Challenge Attempts + Credit/Team Transactions)
  const unifiedLiveEvents = useMemo(() => {
    const items = [];
    const attempts = adminState?.attempts || [];
    const transactions = adminState?.transactions || [];

    for (const att of attempts) {
      const teamObj = teamsById[att.teamId];
      const friendlyTitle = getFriendlyChallengeTitle({
        challengeId: att.challengeId,
        title: att.challengeTitle || att.title,
        gameType: att.gameType,
      });
      const ts = att.completedAt || att.startedAt || att.createdAt;
      items.push({
        id: `att-${att.attemptId}`,
        kind: 'ATTEMPT',
        attempt: att,
        teamId: att.teamId,
        teamName: att.teamName || teamObj?.teamName || att.teamId,
        status: att.status, // IN_PROGRESS, COMPLETED, FAILED, TIMEOUT, ABANDONED
        title: friendlyTitle,
        challengeId: att.challengeId,
        detail:
          att.status === 'IN_PROGRESS'
            ? `Playing ${friendlyTitle} (Entry: -${att.cost || 0} CR)`
            : att.status === 'COMPLETED'
              ? `Solved ${friendlyTitle} (+${att.reward || 0} CR)`
              : `Failed / Ended ${friendlyTitle}${att.penalty ? ` (-${att.penalty} CR)` : ''}`,
        creditDelta:
          att.status === 'COMPLETED'
            ? Number(att.reward || 0)
            : att.status === 'IN_PROGRESS'
              ? -Number(att.cost || 0)
              : -Number(att.penalty || 0),
        timestamp: ts,
        timeMs: ts ? new Date(ts).getTime() : 0,
      });
    }

    for (const tx of transactions) {
      // Avoid duplicating standard challenge entry/reward rows if user only filters attempts,
      // but include manual admin adjustments, hints, abilities, core unlocks, etc.
      const teamObj = teamsById[tx.teamId];
      const ts = tx.timestamp || tx.createdAt;
      items.push({
        id: `tx-${tx._id || `${tx.teamId}-${ts}-${tx.amount}`}`,
        kind: 'CREDIT_EVENT',
        transaction: tx,
        teamId: tx.teamId,
        teamName: teamObj?.teamName || tx.teamId,
        status: 'CREDITS',
        title: String(tx.type || 'CREDIT UPDATE').replace(/_/g, ' '),
        challengeId: tx.challengeId || '',
        detail: tx.summary || `${tx.type}: ${tx.amount >= 0 ? '+' : ''}${tx.amount} CR`,
        creditDelta: Number(tx.amount || 0),
        balanceAfter: tx.balanceAfter,
        timestamp: ts,
        timeMs: ts ? new Date(ts).getTime() : 0,
      });
    }

    // Sort with IN_PROGRESS first, then newest timestamp
    items.sort((a, b) => {
      if (a.status === 'IN_PROGRESS' && b.status !== 'IN_PROGRESS') return -1;
      if (b.status === 'IN_PROGRESS' && a.status !== 'IN_PROGRESS') return 1;
      return b.timeMs - a.timeMs;
    });

    return items;
  }, [adminState?.attempts, adminState?.transactions, teamsById]);

  // Event counts per team for the Team-Wise Filter pills
  const teamEventCounts = useMemo(() => {
    const counts = { ALL: unifiedLiveEvents.length };
    for (const t of adminState?.teams || []) {
      counts[t.teamId] = 0;
    }
    for (const ev of unifiedLiveEvents) {
      if (ev.teamId) {
        counts[ev.teamId] = (counts[ev.teamId] || 0) + 1;
      }
    }
    return counts;
  }, [unifiedLiveEvents, adminState?.teams]);

  // Filtered Live Events by Team + Event Status + Search
  const filteredLiveEvents = useMemo(() => {
    return unifiedLiveEvents.filter((ev) => {
      // 1. Team-wise filter
      if (selectedEventTeamId !== 'ALL' && ev.teamId !== selectedEventTeamId) {
        return false;
      }

      // 2. Status / Type filter
      if (attemptStatusFilter === 'IN_PROGRESS' && ev.status !== 'IN_PROGRESS') return false;
      if (attemptStatusFilter === 'COMPLETED' && ev.status !== 'COMPLETED') return false;
      if (
        attemptStatusFilter === 'FAILED' &&
        !['FAILED', 'TIMEOUT', 'ABANDONED'].includes(ev.status)
      ) {
        return false;
      }
      if (attemptStatusFilter === 'CREDITS' && ev.kind !== 'CREDIT_EVENT') return false;
      if (attemptStatusFilter === 'ATTEMPTS_ONLY' && ev.kind !== 'ATTEMPT') return false;

      // 3. Text search
      if (!attemptSearch.trim()) return true;
      const q = attemptSearch.trim().toLowerCase();
      return (
        String(ev.teamId || '')
          .toLowerCase()
          .includes(q) ||
        String(ev.teamName || '')
          .toLowerCase()
          .includes(q) ||
        String(ev.title || '')
          .toLowerCase()
          .includes(q) ||
        String(ev.detail || '')
          .toLowerCase()
          .includes(q)
      );
    });
  }, [unifiedLiveEvents, selectedEventTeamId, attemptStatusFilter, attemptSearch]);

  const selectedEventTeamObj = useMemo(() => {
    if (selectedEventTeamId === 'ALL') return null;
    return teamsById[selectedEventTeamId] || null;
  }, [selectedEventTeamId, teamsById]);

  // Login handler
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operatorId: loginId,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Invalid Admin credentials.');
      }
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      localStorage.setItem(ADMIN_OPERATOR_KEY, JSON.stringify(data.operator));
      setToken(data.token);
      setOperator(data.operator);
      applyServerState(data.state);
      showToast(`Signed in as ${data.operator.operatorId}`, 'success');
      if (data.operator?.role === 'VOLUNTEER') {
        navigate('/admin/teams');
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_OPERATOR_KEY);
    setToken('');
    setOperator(null);
    setAdminState(null);
  };

  // Fast API helper with optimistic state support
  const executeAdminApi = async (
    url,
    method,
    body,
    { key = 'global', successMessage = '', optimisticUpdate = null, isGlobalEvent = false } = {}
  ) => {
    setPendingKey(key);
    if (typeof optimisticUpdate === 'function') {
      setAdminState((prev) => (prev ? optimisticUpdate(prev) : prev));
    }
    if (isGlobalEvent) {
      triggerGlobalEventGsap();
    }
    try {
      const targetUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
      const res = await fetch(targetUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: method === 'DELETE' && !body ? undefined : JSON.stringify(body || {}),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Request failed.');
      }
      applyServerState(data);
      if (successMessage) {
        showToast(successMessage, 'success');
      }
      return data;
    } catch (err) {
      showToast(err.message, 'error');
      fetchAdminState(token, true);
      return null;
    } finally {
      setPendingKey(null);
    }
  };

  // Create Floor Volunteer handler (Admin only)
  const handleCreateVolunteer = async (e) => {
    e.preventDefault();
    const cleanName = volName.trim().toUpperCase();
    const cleanId = volOperatorId.trim().toUpperCase();
    const cleanPassword = volPassword.trim() || 'NEXUS-VOL-2026';
    const cleanSector = volSector.trim().toUpperCase() || 'FLOOR-1';

    if (!cleanName && !cleanId) {
      showToast('Please enter a Volunteer Name or Operator ID.', 'error');
      return;
    }

    const res = await executeAdminApi(
      '/api/admin/volunteers',
      'POST',
      {
        name: cleanName || cleanId,
        operatorId: cleanId || undefined,
        password: cleanPassword,
        sector: cleanSector,
      },
      {
        key: 'create-volunteer',
        successMessage: `Created Floor Volunteer ${cleanName || cleanId}`,
      }
    );

    if (res) {
      setVolName('');
      setVolOperatorId('');
      setVolPassword('NEXUS-VOL-2026');
    }
  };

  // Delete Floor Volunteer handler (Admin only)
  const handleDeleteVolunteer = async (operatorIdToDelete) => {
    if (!window.confirm(`Delete Floor Volunteer ${operatorIdToDelete}?`)) return;
    await executeAdminApi(
      `/api/admin/volunteers/${encodeURIComponent(operatorIdToDelete)}`,
      'DELETE',
      null,
      {
        key: `del-vol-${operatorIdToDelete}`,
        successMessage: `Removed Floor Volunteer ${operatorIdToDelete}`,
      }
    );
  };

  // Bulk Set All Teams Credits & Default Credits (e.g. 3000 CR)
  const handleBulkSetCredits = async (targetCredits) => {
    const cr = Math.max(0, Math.floor(Number(targetCredits ?? bulkSetCreditsInput) || 0));
    if (
      !window.confirm(
        `ARENA OVERRIDE: Set ALL squads balance to ${cr.toLocaleString()} CR and update default starting credits to ${cr.toLocaleString()} CR?`
      )
    ) {
      return;
    }
    await executeAdminApi(
      '/api/admin/teams/bulk-set-credits',
      'POST',
      { credits: cr },
      {
        key: 'bulk-set-credits',
        successMessage: `Updated ALL squad balances & default credits to ${cr.toLocaleString()} CR`,
      }
    );
  };

  // Bulk Add Bonus Credits to All Teams (e.g. +500 CR)
  const handleBulkAddCredits = async (amountToAdd) => {
    const amt = Math.floor(Number(amountToAdd ?? bulkAddCreditsInput) || 0);
    if (amt === 0) return;
    if (
      !window.confirm(
        `ARENA BOOST: Instantly grant ${amt >= 0 ? '+' : ''}${amt.toLocaleString()} CR to ALL squads?`
      )
    ) {
      return;
    }
    await executeAdminApi(
      '/api/admin/teams/bulk-add-credits',
      'POST',
      { amount: amt },
      {
        key: 'bulk-add-credits',
        successMessage: `Granted ${amt >= 0 ? '+' : ''}${amt.toLocaleString()} CR to ALL squads`,
      }
    );
  };

  // Reset all squad passwords to "123" (Admin only with strict confirmation)
  const handleResetAllPasswords = async () => {
    const typed = window.prompt(
      'SECURITY OVERRIDE WARNING: This will overwrite ALL team passwords with "123"!\n\nType "RESET" to confirm:'
    );
    if (typed !== 'RESET') {
      return;
    }
    await executeAdminApi(
      '/api/admin/teams/reset-all-passwords',
      'POST',
      { password: '123' },
      {
        key: 'reset-all-passwords',
        successMessage: 'Successfully reset all squad passwords to "123"',
      }
    );
  };

  // Register New Team handler
  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    const cleanName = regTeamName.trim().toUpperCase();
    const cleanId = regTeamId.trim().toUpperCase();
    if (!cleanName && !cleanId) {
      showToast('Please enter a Team Name.', 'error');
      return;
    }

    const derivedId =
      cleanId ||
      `TEAM-${cleanName
        .replace(/^TEAM[-_\s]*/i, '')
        .replace(/[^A-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`;

    const membersPayload = Array.from({ length: regTeamSize }, (_, idx) => {
      const entered = (regMembers[idx] || '').trim();
      return {
        memberId: `OP-0${idx + 1}`,
        name: (entered || (idx === 0 ? 'PLAYER 1 (LEAD)' : `PLAYER ${idx + 1}`)).toUpperCase(),
        role: idx === 0 ? 'LEAD' : 'OPERATIVE',
        online: false,
      };
    });

    const initialCreditsNum = Math.max(0, Number(regCredits || 0));

    const data = await executeAdminApi(
      '/api/admin/teams/register',
      'POST',
      {
        teamId: derivedId,
        teamName: cleanName || derivedId,
        password: regPassword.trim() || 'NEXUS-2026',
        initialCredits: initialCreditsNum,
        teamSize: regTeamSize,
        members: membersPayload,
      },
      {
        key: 'register-team',
        successMessage: `Registered ${derivedId} with ${initialCreditsNum} CR`,
        optimisticUpdate: (prev) => ({
          ...prev,
          teams: [
            {
              teamId: derivedId,
              teamName: cleanName || derivedId,
              credits: initialCreditsNum,
              teamSize: regTeamSize,
              teamFormat:
                regTeamSize === 1
                  ? 'SOLO'
                  : regTeamSize === 2
                    ? 'DUO'
                    : regTeamSize === 3
                      ? 'TRIO'
                      : 'SQUAD',
              members: membersPayload,
              status: 'ACTIVE',
              coreState: 'LOCKED',
              connectionState: { connected: false, status: 'OFFLINE', onlineOperatives: 0 },
              completedChallenges: [],
              failedChallenges: [],
            },
            ...(prev.teams || []),
          ],
        }),
      }
    );

    if (data?.registeredTeam) {
      setLastCreatedTeam(data.registeredTeam);
      setRegTeamName('');
      setRegTeamId('');
      setRegMembers(['', '', '', '']);
    }
  };

  // Team Quick Action handler (Optimistic)
  const handleTeamAction = async (teamId, action, payload = {}, label = '') => {
    await executeAdminApi(
      '/api/admin/teams/action',
      'POST',
      { teamId, action, payload },
      {
        key: `team-${teamId}-${action}`,
        successMessage: label || `Updated ${teamId}`,
        optimisticUpdate: (prev) => {
          if (!prev?.teams) return prev;
          if (action === 'ADJUST_CREDITS') {
            const delta = Number(payload.amount ?? payload.delta ?? 0);
            return {
              ...prev,
              teams: prev.teams.map((t) =>
                t.teamId === teamId
                  ? { ...t, credits: Math.max(0, Number(t.credits || 0) + delta) }
                  : t
              ),
            };
          }
          if (action === 'SET_CREDITS') {
            const nextCr = Math.max(0, Number(payload.credits ?? 0));
            return {
              ...prev,
              teams: prev.teams.map((t) => (t.teamId === teamId ? { ...t, credits: nextCr } : t)),
            };
          }
          if (action === 'DELETE_TEAM') {
            return {
              ...prev,
              teams: prev.teams.filter((t) => t.teamId !== teamId),
            };
          }
          if (action === 'UPDATE_TEAM_MEMBERS') {
            return {
              ...prev,
              teams: prev.teams.map((t) =>
                t.teamId === teamId
                  ? {
                      ...t,
                      teamName: payload.teamName || t.teamName,
                      teamSize: payload.teamSize || payload.members?.length || t.teamSize,
                      members: payload.members || t.members,
                    }
                  : t
              ),
            };
          }
          return prev;
        },
      }
    );
  };

  // Global Event & Round Timer Control handler (Optimistic + Accurate)
  const handleEventCommand = async (command, payload = {}, customLabel = '') => {
    const cmd = String(command || '').toUpperCase();
    await executeAdminApi(
      '/api/admin/events/control',
      'POST',
      { command: cmd, payload },
      {
        key: `event-${cmd}`,
        successMessage: customLabel || `Round command: ${cmd}`,
        isGlobalEvent: true,
        optimisticUpdate: (prev) => {
          if (!prev) return prev;
          const next = { ...prev };
          const currentGt = prev.globalTimer || {};
          const nowServer = Date.now() + serverOffsetMs;

          if (cmd === 'START') {
            const durSec = Math.max(
              1,
              Number(
                payload.durationSeconds ??
                  (payload.minutes ? Number(payload.minutes) * 60 : null) ??
                  (Number(customTimerMinutes) || 45) * 60
              )
            );
            lastSyncedTotalSecRef.current = durSec;
            next.globalTimer = {
              ...currentGt,
              status: 'ACTIVE',
              remainingSeconds: durSec,
              totalDurationSeconds: durSec,
              totalDurationMinutes: Math.max(1, Math.round(durSec / 60)),
              formatted: formatDurationClock(durSec, true),
              totalFormatted: formatDurationClock(durSec, true),
              targetTimestamp: new Date(nowServer + durSec * 1000).toISOString(),
              roundStartedAt: new Date(nowServer).toISOString(),
              roundEndedAt: null,
            };
          } else if (cmd === 'PAUSE') {
            const remSec = liveGlobalTimer.remainingSeconds;
            next.globalTimer = {
              ...currentGt,
              status: 'PAUSED',
              remainingSeconds: remSec,
              formatted: formatDurationClock(remSec, true),
              targetTimestamp: null,
            };
          } else if (cmd === 'RESUME') {
            const fallbackSec =
              Number(currentGt.totalDurationSeconds) || (Number(customTimerMinutes) || 45) * 60;
            const remSec =
              liveGlobalTimer.remainingSeconds > 0
                ? liveGlobalTimer.remainingSeconds
                : fallbackSec;
            next.globalTimer = {
              ...currentGt,
              status: 'ACTIVE',
              remainingSeconds: remSec,
              formatted: formatDurationClock(remSec, true),
              targetTimestamp: new Date(nowServer + remSec * 1000).toISOString(),
              roundEndedAt: null,
            };
          } else if (cmd === 'END') {
            next.globalTimer = {
              ...currentGt,
              status: 'ENDED',
              remainingSeconds: 0,
              formatted: '00:00:00',
              targetTimestamp: null,
              roundEndedAt: new Date(nowServer).toISOString(),
            };
          } else if (cmd === 'SET_TIMER') {
            const durSec = Math.max(
              0,
              Number(
                payload.durationSeconds ??
                  (payload.minutes ? Number(payload.minutes) * 60 : 2700)
              )
            );
            lastSyncedTotalSecRef.current = durSec;
            const isRunning = currentGt.status === 'ACTIVE' && durSec > 0;
            next.globalTimer = {
              ...currentGt,
              status: durSec === 0 ? 'ENDED' : currentGt.status === 'ENDED' ? 'PAUSED' : currentGt.status,
              remainingSeconds: durSec,
              totalDurationSeconds: Math.max(1, durSec),
              totalDurationMinutes: Math.max(1, Math.round(durSec / 60)),
              formatted: formatDurationClock(durSec, true),
              totalFormatted: formatDurationClock(Math.max(1, durSec), true),
              targetTimestamp: isRunning
                ? new Date(nowServer + durSec * 1000).toISOString()
                : null,
            };
          } else if (cmd === 'ADJUST_TIMER') {
            const deltaSec = Number(payload.deltaSeconds || 0);
            const remSec = Math.max(0, liveGlobalTimer.remainingSeconds + deltaSec);
            const totalSec = Math.max(
              Number(currentGt.totalDurationSeconds || 2700),
              remSec
            );
            next.globalTimer = {
              ...currentGt,
              remainingSeconds: remSec,
              totalDurationSeconds: totalSec,
              formatted: formatDurationClock(remSec, true),
              targetTimestamp:
                currentGt.status === 'ACTIVE'
                  ? new Date(nowServer + remSec * 1000).toISOString()
                  : null,
            };
          } else if (cmd === 'START_COUNTDOWN' || cmd === 'COUNTDOWN') {
            const cdSec = Math.max(1, Math.min(300, Number(payload.countdownSeconds || 10)));
            const durSec = Math.max(
              1,
              Number(
                payload.durationSeconds ??
                  (payload.minutes ? Number(payload.minutes) * 60 : null) ??
                  (Number(customTimerMinutes) || 45) * 60
              )
            );
            lastSyncedTotalSecRef.current = durSec;
            next.globalTimer = {
              ...currentGt,
              status: 'COUNTDOWN',
              countdownTotalSeconds: cdSec,
              countdownRemainingSeconds: cdSec,
              countdownTargetTimestamp: new Date(nowServer + cdSec * 1000).toISOString(),
              remainingSeconds: durSec,
              totalDurationSeconds: durSec,
              totalDurationMinutes: Math.max(1, Math.round(durSec / 60)),
              formatted: formatDurationClock(durSec, true),
              totalFormatted: formatDurationClock(durSec, true),
              targetTimestamp: new Date(nowServer + (cdSec + durSec) * 1000).toISOString(),
              roundStartedAt: new Date(nowServer + cdSec * 1000).toISOString(),
              roundEndedAt: null,
            };
          } else if (cmd === 'CLEAR_WINNER') {
            next.globalTimer = {
              ...currentGt,
              declaredWinner: null,
            };
            next.coreStatus = {
              ...(prev.coreStatus || {}),
              declaredWinner: null,
              winner: null,
            };
          } else if (cmd === 'LOCK' || cmd === 'CORE_LOCK') {
            next.coreStatus = { ...(prev.coreStatus || {}), state: 'LOCKED' };
          } else if (
            cmd === 'UNLOCK' ||
            cmd === 'CORE_UNLOCK' ||
            cmd === 'REVEAL' ||
            cmd === 'CORE_REVEAL'
          ) {
            next.coreStatus = { ...(prev.coreStatus || {}), state: 'AVAILABLE' };
          } else if (cmd === 'RESET_ALL' || cmd === 'RESET') {
            const durSec =
              Number(currentGt.totalDurationSeconds) || (Number(customTimerMinutes) || 45) * 60;
            const startingCr = Number(prev.settings?.startingCredits ?? 1250);
            next.globalTimer = {
              ...currentGt,
              status: 'PAUSED',
              remainingSeconds: durSec,
              totalDurationSeconds: durSec,
              countdownRemainingSeconds: 0,
              countdownTargetTimestamp: null,
              formatted: formatDurationClock(durSec, true),
              targetTimestamp: null,
              roundStartedAt: null,
              roundEndedAt: null,
            };
            next.coreStatus = {
              ...(prev.coreStatus || {}),
              state: 'LOCKED',
              declaredWinner: null,
              winner: null,
            };
            if (Array.isArray(prev.teams)) {
              next.teams = prev.teams.map((t) => ({
                ...t,
                credits: startingCr,
                totalSolved: 0,
                completedChallenges: [],
                failedChallenges: [],
                purchasedChallenges: [],
                activeAttempt: null,
                activeTimer: null,
                attemptHistory: [],
                recentTransactions: [],
              }));
            }
            next.attempts = [];
          }
          return next;
        },
      }
    );
  };

  // Dedicated helpers for Round Start, Countdown Launch, Pause/Resume, End, Total Time, Reset, and Winner Declaration
  const handleStartRound = () => {
    const mins = Math.max(1, Number(customTimerMinutes) || 135);
    const durSec = mins * 60;
    handleEventCommand(
      'START',
      { durationSeconds: durSec, minutes: mins },
      `Round Started Immediately (${mins} mins total)`
    );
  };

  const handleStartCountdownRound = (overrideCountdownSec) => {
    const cdSec = Math.max(1, Math.min(300, Number(overrideCountdownSec ?? countdownSeconds) || 10));
    const mins = Math.max(1, Number(customTimerMinutes) || 135);
    const durSec = mins * 60;
    setCountdownSeconds(cdSec);
    handleEventCommand(
      'START_COUNTDOWN',
      { countdownSeconds: cdSec, durationSeconds: durSec, minutes: mins },
      `Cinematic ${cdSec}s Launch Countdown Initiated!`
    );
  };

  const handleDeclareWinner = (overrideFirstId, overrideSecondId) => {
    const chosenFirst = overrideFirstId ?? selectedWinnerTeamId;
    const chosenSecond = overrideSecondId ?? selectedSecondWinnerTeamId;
    const teamId = chosenFirst === 'AUTO_LEADER' ? null : chosenFirst;
    const secondTeamId = chosenSecond === 'AUTO_SECOND' ? null : chosenSecond;
    handleEventCommand(
      'DECLARE_WINNER',
      { teamId, secondTeamId },
      'Proclaimed Top 2 CyberQuest Champions across all screens!'
    );
  };

  const handleClearWinner = () => {
    handleEventCommand('CLEAR_WINNER', {}, 'Cleared Winner Proclamation Overlay');
  };

  const handlePauseOrResumeRound = () => {
    if (liveGlobalTimer.status === 'ACTIVE') {
      handleEventCommand('PAUSE', {}, 'Round Paused');
    } else if (liveGlobalTimer.status === 'PAUSED' && liveGlobalTimer.remainingSeconds > 0) {
      handleEventCommand('RESUME', {}, 'Round Resumed');
    } else {
      handleStartRound();
    }
  };

  const handleEndRound = () => {
    handleEventCommand('END', {}, 'Round Ended — All Submissions Locked');
  };

  // Password-protected Global Reset Modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPasswordInput, setResetPasswordInput] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);

  const handleResetEverythingToZero = () => {
    setResetPasswordInput('');
    setResetPasswordError('');
    setShowResetModal(true);
  };

  const handleConfirmGlobalReset = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    const trimmedPass = String(resetPasswordInput || '').trim();
    if (!trimmedPass) {
      setResetPasswordError('Admin Reset Password is required to reset the arena.');
      return;
    }
    setResetPasswordError('');
    setResetSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/events/control`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          command: 'RESET_ALL',
          payload: { resetPassword: trimmedPass },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResetPasswordError(
          data.message || data.error || 'Invalid Admin Reset Password. Global reset denied.'
        );
        return;
      }
      applyServerState(data);
      setShowResetModal(false);
      setResetPasswordInput('');
      showToast('Global Reset complete — all teams & challenges restored to 0!', 'success');
    } catch (err) {
      setResetPasswordError(err.message || 'Network error while executing global reset.');
    } finally {
      setResetSubmitting(false);
    }
  };

  const handleApplyTotalTime = (overrideMins) => {
    const mins = Math.max(1, Number(overrideMins ?? customTimerMinutes) || 135);
    setCustomTimerMinutes(mins);
    handleEventCommand(
      'SET_TIMER',
      { durationSeconds: mins * 60, minutes: mins },
      `Total Round Time set to ${mins} mins`
    );
  };

  // Game Activity & Anomaly Recording Controls
  const [showRecordingModal, setShowRecordingModal] = useState(false);

  const handleStartRecording = async () => {
    await executeAdminApi(
      '/api/admin/recording',
      'POST',
      { action: 'START' },
      {
        key: 'recording-start',
        successMessage: 'LIVE RECORDING STARTED — Capturing all game events & anomalies',
      }
    );
  };

  const handleStopRecording = async () => {
    const res = await executeAdminApi(
      '/api/admin/recording',
      'POST',
      { action: 'STOP' },
      {
        key: 'recording-stop',
        successMessage: 'RECORDING STOPPED — Anomaly & Activity Report Generated',
      }
    );
    if (res) {
      setShowRecordingModal(true);
    }
  };

  const handleClearRecordings = async () => {
    await executeAdminApi(
      '/api/admin/recording',
      'POST',
      { action: 'CLEAR' },
      {
        key: 'recording-clear',
        successMessage: 'Cleared saved recording reports',
      }
    );
  };

  // Toggle Challenge Enabled (Optimistic)
  const handleToggleChallengeEnabled = async (chg) => {
    const nextEnabled = !chg.enabled;
    const friendlyTitle = getFriendlyChallengeTitle(chg);
    await executeAdminApi(
      `/api/admin/challenges/${chg.challengeId}`,
      'PATCH',
      { enabled: nextEnabled },
      {
        key: `chg-${chg.challengeId}`,
        successMessage: `${friendlyTitle} ${nextEnabled ? 'Enabled' : 'Disabled'}`,
        optimisticUpdate: (prev) => ({
          ...prev,
          challenges: (prev.challenges || []).map((c) =>
            c.challengeId === chg.challengeId ? { ...c, enabled: nextEnabled } : c
          ),
        }),
      }
    );
  };

  const openEditChallenge = (chg) => {
    setChallengeFormError('');
    setShowAdvancedJson(false);
    setEditingChallenge(chg.challengeId);
    setChallengeForm({
      challengeId: chg.challengeId || '',
      title: getFriendlyChallengeTitle(chg) || chg.title || '',
      category: chg.category || 'LOGIC',
      description: getFriendlyChallengeDescription(chg) || chg.description || '',
      difficulty: chg.difficulty || 'MODERATE',
      risk: chg.risk || 'BALANCED',
      cost: chg.cost ?? 300,
      reward: chg.reward ?? 650,
      penalty: chg.penalty ?? 75,
      timeLimit: chg.timeLimit ?? 900,
      gameType: chg.gameType || 'wordGuess',
      expectedAnswer:
        chg.solutionConfig?.expectedAnswer || chg.gameConfig?.expectedAnswer || 'NEXUS',
      gameConfigText: JSON.stringify(chg.gameConfig || {}, null, 2),
      enabled: chg.enabled !== false,
      available: chg.available !== false,
    });
  };

  const openCreateChallenge = () => {
    setChallengeFormError('');
    setShowAdvancedJson(false);
    setEditingChallenge('NEW');
    setChallengeForm({
      ...EMPTY_CHALLENGE_FORM,
      challengeId: `CHG-ADM-${Math.floor(100 + Math.random() * 900)}`,
    });
  };

  const handleSaveChallenge = async (e) => {
    e.preventDefault();
    setChallengeFormError('');

    let parsedConfig = {};
    try {
      parsedConfig = challengeForm.gameConfigText
        ? JSON.parse(challengeForm.gameConfigText)
        : {};
    } catch (err) {
      setChallengeFormError(`Invalid JSON in Advanced Config: ${err.message}`);
      return;
    }

    const payload = {
      challengeId: challengeForm.challengeId,
      title: challengeForm.title,
      category: challengeForm.category,
      description: challengeForm.description,
      difficulty: challengeForm.difficulty,
      risk: challengeForm.risk,
      cost: Number(challengeForm.cost),
      reward: Number(challengeForm.reward),
      penalty: Number(challengeForm.penalty),
      timeLimit: Number(challengeForm.timeLimit),
      gameType: challengeForm.gameType,
      expectedAnswer: challengeForm.expectedAnswer,
      gameConfig: parsedConfig,
      enabled: Boolean(challengeForm.enabled),
      available: Boolean(challengeForm.available),
    };

    const result = await executeAdminApi('/api/admin/challenges', 'POST', payload, {
      key: 'save-challenge',
      successMessage: `Saved challenge ${payload.title}`,
    });
    if (result) {
      setEditingChallenge(null);
    }
  };

  const jumpToTeamLiveEvents = (teamId) => {
    setSelectedEventTeamId(teamId);
    navigate('/admin/attempts');
  };

  // ============================================================================
  // WHITE-THEMED ADMIN LOGIN SCREEN
  // ============================================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-[#111111] flex flex-col justify-between p-6 md:p-10">
        <header className="max-w-5xl w-full mx-auto flex items-center justify-between border-b-2 border-[#111111] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#E11D2E] inline-block" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#111111]">
              CYBER QUEST // ADMIN PANEL
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <ThemeToggleButton />
            <Link
              to="/display"
              className="px-3 py-1.5 bg-white border border-[#111111] font-bold hover:bg-[#111111] hover:text-white transition-colors"
            >
              Projector
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-1.5 bg-white border border-[#111111] font-bold hover:bg-[#111111] hover:text-white transition-colors"
            >
              Team Portal
            </Link>
          </div>
        </header>

        <main className="max-w-md w-full mx-auto my-auto bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-200 pb-4">
            <span className="inline-block px-2.5 py-0.5 bg-[#E11D2E] text-white font-mono text-[10px] font-bold uppercase tracking-widest">
              ORGANIZER ACCESS
            </span>
            <h1 className="font-display text-3xl uppercase tracking-wide text-[#111111] mt-2">
              ADMIN SIGN IN
            </h1>
            <p className="text-xs text-neutral-600 mt-1">
              Manage teams, round timer, live events by team, and challenges.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase text-neutral-700 mb-1">
                Operator ID
              </label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full bg-white border-2 border-[#111111] px-3.5 py-2.5 font-mono text-sm text-[#111111] focus:outline-none focus:border-[#E11D2E]"
                placeholder="ADMIN-NEXUS"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-neutral-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-white border-2 border-[#111111] px-3.5 py-2.5 font-mono text-sm text-[#111111] focus:outline-none focus:border-[#E11D2E]"
                placeholder="••••••••••••"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-[#E11D2E] text-xs font-mono text-[#E11D2E]">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-[#E11D2E] hover:bg-[#111111] text-white font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
            >
              {authLoading ? 'Signing In...' : 'Sign In to Admin Panel →'}
            </button>
          </form>
        </main>

        <footer className="max-w-5xl w-full mx-auto text-center text-xs font-mono text-neutral-500 border-t border-neutral-200 pt-4">
          Cyber Quest Organizer Console · Solo, Duo, Trio & Squad (Max 4) Ready
        </footer>
      </div>
    );
  }

  // Summary metrics
  const totalTeams = adminState?.teams?.length || 0;
  const onlineTeamsCount = (adminState?.teams || []).filter(
    (t) => t.connectionState?.connected
  ).length;
  const activeAttemptsCount = (adminState?.teams || []).filter(
    (t) => t.activeAttempt?.status === 'IN_PROGRESS'
  ).length;
  const coreUnlocked =
    adminState?.coreStatus?.state === 'AVAILABLE' ||
    adminState?.coreStatus?.state === 'UNLOCKED';

  // ============================================================================
  // SIMPLIFIED WHITE-THEMED ADMIN CONSOLE
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#111111] flex flex-col">
      {/* 1. SLEEK TOP NAVBAR (ROUND CONTROLS MOVED TO DEDICATED 'ROUND CONTROL' PAGE) */}
      <header
        ref={globalEventBannerRef}
        className="sticky top-0 z-30 bg-white border-b-2 border-[#111111] shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-0 space-y-2.5">
          {/* Top Row: Brand + Live Round Status Pill + Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 bg-[#E11D2E] shrink-0" />
              <div className="flex items-center gap-2">
                <span className="font-display text-lg sm:text-xl tracking-wide uppercase text-[#111111]">
                  {isVolunteer ? 'CYBER QUEST VOLUNTEER' : 'CYBER QUEST ADMIN'}
                </span>
                {isVolunteer && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-400 font-mono text-[10px] font-bold uppercase">
                    FLOOR VOLUNTEER · VIEW ONLY
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                    socketConnected
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      socketConnected ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                  />
                  {socketConnected ? 'LIVE' : 'SYNCING'}
                </span>
              </div>

              {/* Compact Round Status Pill (Link to Round Control for Admin, Read-only badge for Volunteer) */}
              {isVolunteer ? (
                <div className="inline-flex items-center gap-1.5 sm:gap-2 sm:ml-2 px-2.5 sm:px-3 py-1 bg-[#0B0C10] text-white border border-[#111111] font-mono text-[11px] sm:text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                  <span className="font-bold tracking-wider">
                    {liveGlobalTimer.status === 'COUNTDOWN'
                      ? `T-${liveGlobalTimer.countdownRemainingSeconds}s`
                      : liveGlobalTimer.formatted}
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-white/15 text-white">
                    {liveGlobalTimer.status === 'ACTIVE' ? 'RUNNING' : liveGlobalTimer.status}
                  </span>
                </div>
              ) : (
                <Link
                  to="/admin/events"
                  className="inline-flex items-center gap-1.5 sm:gap-2 sm:ml-2 px-2.5 sm:px-3 py-1 bg-[#0B0C10] text-white border border-[#111111] hover:border-[#E11D2E] font-mono text-[11px] sm:text-xs transition-colors"
                  title="Open Round Control Deck"
                >
                  <Clock className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                  <span className="font-bold tracking-wider">
                    {liveGlobalTimer.status === 'COUNTDOWN'
                      ? `T-${liveGlobalTimer.countdownRemainingSeconds}s`
                      : liveGlobalTimer.formatted}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                      liveGlobalTimer.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : liveGlobalTimer.status === 'COUNTDOWN'
                          ? 'bg-[#E11D2E] text-white animate-pulse'
                          : liveGlobalTimer.status === 'ENDED'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {liveGlobalTimer.status === 'ACTIVE'
                      ? 'RUNNING'
                      : liveGlobalTimer.status === 'COUNTDOWN'
                        ? 'COUNTDOWN'
                        : liveGlobalTimer.status}
                  </span>
                </Link>
              )}

              <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-neutral-200 font-mono text-xs">
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 font-bold">
                  {totalTeams} Teams ({onlineTeamsCount} Online)
                </span>
                <span className="px-2 py-0.5 bg-red-50 text-[#E11D2E] border border-red-200 font-bold">
                  {activeAttemptsCount} Playing
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs">
              {/* Compact Recording & Anomaly Report Controls (Admin Only) */}
              {!isVolunteer && (
                <>
                  {adminState?.recording?.isRecording ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleStopRecording}
                        disabled={pendingKey === 'recording-stop'}
                        className="px-2 sm:px-2.5 py-1.5 bg-[#E11D2E] hover:bg-red-700 text-white font-bold uppercase text-[10px] sm:text-[11px] inline-flex items-center gap-1.5 cursor-pointer"
                        title="Stop Recording and Open Full Anomaly & Activity Report"
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
                        <span>
                          Stop Rec ({adminState.recording.activeRecording?.summary?.totalEvents || 0})
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowRecordingModal(true)}
                        className="px-2 py-1.5 bg-white text-[#111111] hover:bg-neutral-100 font-bold uppercase text-[10px] sm:text-[11px] border border-[#111111] cursor-pointer"
                      >
                        Live Report
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        disabled={pendingKey === 'recording-start'}
                        className="px-2 sm:px-2.5 py-1.5 bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase text-[10px] sm:text-[11px] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                        title="Start recording all game events to detect anomalies"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#E11D2E] inline-block" />
                        <span>Record</span>
                      </button>
                      {adminState?.recording?.latestReport && (
                        <button
                          type="button"
                          onClick={() => setShowRecordingModal(true)}
                          className="px-2 py-1.5 bg-white text-[#111111] hover:bg-neutral-100 font-bold uppercase text-[10px] sm:text-[11px] border border-[#111111] cursor-pointer"
                        >
                          Report
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}

              <ThemeToggleButton compact />
              <button
                type="button"
                onClick={() => fetchAdminState(token)}
                className="p-1.5 bg-white border border-neutral-300 hover:border-[#111111] text-neutral-700 cursor-pointer"
                title="Refresh State"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingState ? 'animate-spin' : ''}`} />
              </button>
              <Link
                to="/display"
                className="px-2 sm:px-2.5 py-1.5 bg-white border border-neutral-300 hover:border-[#111111] font-bold text-[#111111]"
              >
                Projector
              </Link>
              <Link
                to="/dashboard"
                className="px-2 sm:px-2.5 py-1.5 bg-white border border-neutral-300 hover:border-[#111111] font-bold text-[#111111]"
              >
                Portal
              </Link>
              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-2 sm:px-2.5 py-1.5 bg-neutral-100 hover:bg-[#111111] hover:text-white border border-neutral-300 font-bold cursor-pointer transition-colors inline-flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Exit
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {visibleNavTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTabId === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 font-mono text-xs font-bold uppercase transition-colors border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-[#E11D2E] text-[#E11D2E] bg-red-50/60'
                      : 'border-transparent text-neutral-600 hover:text-[#111111] hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === 'events' && (
                    <span
                      className={`px-1.5 py-0.2 text-[9px] font-bold uppercase ${
                        liveGlobalTimer.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : liveGlobalTimer.status === 'COUNTDOWN'
                            ? 'bg-[#E11D2E] text-white'
                            : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {liveGlobalTimer.status === 'ACTIVE' ? 'LIVE' : liveGlobalTimer.status}
                    </span>
                  )}
                  {tab.id === 'teams' && (
                    <span className="px-1.5 py-0.2 bg-neutral-200 text-[#111111] text-[10px]">
                      {totalTeams}
                    </span>
                  )}
                  {tab.id === 'volunteers' && (
                    <span className="px-1.5 py-0.2 bg-neutral-200 text-[#111111] text-[10px]">
                      {adminState?.volunteers?.length || 1}
                    </span>
                  )}
                  {tab.id === 'attempts' && activeAttemptsCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#E11D2E] text-white text-[10px]">
                      {activeAttemptsCount} LIVE
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Toast Feedback Banner */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#111111] text-white border-2 border-[#E11D2E] shadow-[4px_4px_0px_#E11D2E] px-4 py-3 font-mono text-xs flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-[#E11D2E] shrink-0" />
            <span className="font-bold">{feedbackToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* =======================================================================
            TAB 1: TEAMS & REGISTRATION (/admin/teams)
           ======================================================================= */}
        {activeTabId === 'teams' && (
          <div className="space-y-5">
            {/* Universal Arena Credits Controller (Optimized for 300+ Players) */}
            {!isVolunteer && (
              <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-4 sm:p-5 font-mono text-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <Coins className="w-5 h-5 text-amber-500" />
                    <div>
                      <h2 className="font-display text-lg uppercase tracking-wide text-[#111111]">
                        Arena Universal Credits Controller
                      </h2>
                      <p className="text-[11px] text-neutral-500 font-sans">
                        Real-time batch credit dispatcher (optimized for 300+ concurrent players across all squads)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-700 font-bold uppercase">
                      Total Squads: {adminState?.teams?.length || filteredTeams.length || 0}
                    </span>
                    <span className="px-2 py-0.5 bg-neutral-900 text-white font-bold uppercase">
                      Current Default: {adminState?.settings?.startingCredits ?? 1500} CR
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
                  {/* Action 1: Set All Teams Balance & Default Credits */}
                  <div className="bg-[#FAF9F5] border border-neutral-300 p-3.5 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase text-neutral-800 text-[11px] flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-blue-600" />
                          Set All Teams & Starting Credits
                        </span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2">SUB-10MS</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans mb-3">
                        Sets the exact balance for <b>ALL squads</b> to this amount and updates the default starting credits for new teams (e.g. 3,000 CR).
                      </p>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            min="0"
                            step="50"
                            value={bulkSetCreditsInput}
                            onChange={(e) => setBulkSetCreditsInput(Number(e.target.value))}
                            className="w-full pl-3 pr-10 py-1.5 bg-white border border-neutral-300 font-bold text-sm text-[#111111]"
                            placeholder="3000"
                          />
                          <span className="absolute right-2.5 top-2 text-[10px] font-bold text-neutral-400">CR</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleBulkSetCredits()}
                          disabled={pendingKey === 'bulk-set-credits'}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold uppercase cursor-pointer transition-colors shadow-sm whitespace-nowrap"
                        >
                          {pendingKey === 'bulk-set-credits' ? 'Setting...' : 'Set All Teams'}
                        </button>
                      </div>

                      {/* Quick Presets */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] text-neutral-500 uppercase mr-1">Presets:</span>
                        {[1000, 1500, 2000, 2500, 3000, 5000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setBulkSetCreditsInput(amt);
                              handleBulkSetCredits(amt);
                            }}
                            className="px-2 py-0.5 bg-white border border-neutral-300 hover:border-blue-600 hover:bg-blue-50 text-neutral-700 text-[10px] font-bold cursor-pointer transition-colors"
                          >
                            {amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action 2: Grant Extra Bonus Credits to All Teams */}
                  <div className="bg-[#FAF9F5] border border-neutral-300 p-3.5 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase text-neutral-800 text-[11px] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Add Extra Bonus Credits to All Teams
                        </span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2">REAL-TIME</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans mb-3">
                        Instantly grants extra credits (e.g. +500 CR) to <b>ALL active teams</b> simultaneously via live socket broadcast.
                      </p>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            min="1"
                            step="50"
                            value={bulkAddCreditsInput}
                            onChange={(e) => setBulkAddCreditsInput(Number(e.target.value))}
                            className="w-full pl-3 pr-10 py-1.5 bg-white border border-neutral-300 font-bold text-sm text-[#111111]"
                            placeholder="500"
                          />
                          <span className="absolute right-2.5 top-2 text-[10px] font-bold text-neutral-400">CR</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleBulkAddCredits()}
                          disabled={pendingKey === 'bulk-add-credits'}
                          className="px-4 py-1.5 bg-[#111111] hover:bg-neutral-800 disabled:opacity-50 text-white font-bold uppercase cursor-pointer transition-colors shadow-sm whitespace-nowrap"
                        >
                          {pendingKey === 'bulk-add-credits' ? 'Boosting...' : '+ Add to All Teams'}
                        </button>
                      </div>

                      {/* Quick Presets */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] text-neutral-500 uppercase mr-1">Presets:</span>
                        {[100, 250, 500, 1000, 2000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setBulkAddCreditsInput(amt);
                              handleBulkAddCredits(amt);
                            }}
                            className="px-2 py-0.5 bg-white border border-neutral-300 hover:border-amber-500 hover:bg-amber-50 text-neutral-700 text-[10px] font-bold cursor-pointer transition-colors"
                          >
                            +{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Collapsible Register New Team Card (Admin Only) */}
            {!isVolunteer && (
              <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
                <div
                  onClick={() => setShowRegisterForm((v) => !v)}
                  className="px-4 sm:px-5 py-3.5 bg-[#FAF9F5] flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <UserPlus className="w-4 h-4 text-[#E11D2E]" />
                    <h2 className="font-display text-lg uppercase tracking-wide text-[#111111]">
                      Register New Team & Give Initial Credits
                    </h2>
                    <span className="hidden sm:inline-block px-2 py-0.5 bg-neutral-200 text-neutral-700 font-mono text-[10px] font-bold uppercase">
                      Solo · Duo · Trio · Max 4
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-[#111111] text-white font-mono text-xs font-bold uppercase inline-flex items-center gap-1 cursor-pointer"
                    >
                      {showRegisterForm ? (
                        <>
                          Hide Form <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          + New Team <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {showRegisterForm && (
                  <form
                    onSubmit={handleRegisterTeam}
                    className="p-4 sm:p-5 border-t-2 border-[#111111] space-y-4 font-mono text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      <div>
                        <label className="block font-bold uppercase text-neutral-700 mb-1">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          value={regTeamName}
                          onChange={(e) => setRegTeamName(e.target.value)}
                          placeholder="e.g. ALPHA SQUAD"
                          className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] text-sm font-bold uppercase focus:outline-none focus:border-[#E11D2E]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase text-neutral-700 mb-1">
                          Team ID (Auto if blank)
                        </label>
                        <input
                          type="text"
                          value={regTeamId}
                          onChange={(e) => setRegTeamId(e.target.value)}
                          placeholder={
                            regTeamName.trim()
                              ? `TEAM-${regTeamName
                                  .trim()
                                  .toUpperCase()
                                  .replace(/^TEAM[-_\s]*/i, '')
                                  .replace(/[^A-Z0-9]+/g, '-')}`
                              : 'TEAM-ALPHA'
                          }
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] text-sm uppercase focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase text-neutral-700 mb-1">
                          Login Password *
                        </label>
                        <input
                          type="text"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="NEXUS-2026"
                          className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] text-sm font-bold focus:outline-none focus:border-[#E11D2E]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase text-neutral-700 mb-1">
                          Initial Credits (CR) *
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            step={50}
                            value={regCredits}
                            onChange={(e) => setRegCredits(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] text-sm font-bold text-[#E11D2E] focus:outline-none"
                            required
                          />
                          {[1000, 1500, 2500].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setRegCredits(preset)}
                              className={`px-2 py-2 border text-[10px] font-bold cursor-pointer ${
                                Number(regCredits) === preset
                                  ? 'bg-[#111111] text-white border-[#111111]'
                                  : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:border-[#111111]'
                              }`}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Team Size Mode Selector: Solo (1), Duo (2), Trio (3), Squad (4) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end pt-1">
                      <div className="lg:col-span-5">
                        <label className="block font-bold uppercase text-neutral-700 mb-1.5">
                          Team Size Format
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {TEAM_SIZE_MODES.map((mode) => {
                            const active = regTeamSize === mode.size;
                            return (
                              <button
                                key={mode.size}
                                type="button"
                                onClick={() => setRegTeamSize(mode.size)}
                                className={`p-2 border-2 text-center transition-colors cursor-pointer ${
                                  active
                                    ? 'border-[#111111] bg-[#E11D2E] text-white font-bold'
                                    : 'border-neutral-300 bg-[#FAF9F5] text-neutral-700 hover:border-[#111111]'
                                }`}
                              >
                                <div className="text-xs font-bold">{mode.tag}</div>
                                <div className="text-[10px] opacity-85">{mode.size}P</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <label className="block font-bold uppercase text-neutral-700 mb-1.5">
                          Player Names (Optional — {regTeamSize} Slots)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {Array.from({ length: regTeamSize }, (_, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={regMembers[idx] || ''}
                              onChange={(e) => {
                                const next = [...regMembers];
                                next[idx] = e.target.value;
                                setRegMembers(next);
                              }}
                              placeholder={`P${idx + 1}`}
                              className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] text-xs uppercase focus:outline-none"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <button
                          type="submit"
                          disabled={pendingKey === 'register-team'}
                          className="w-full py-2.5 px-4 bg-[#E11D2E] hover:bg-[#111111] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[2px_2px_0px_#111111] disabled:opacity-50"
                        >
                          {pendingKey === 'register-team' ? 'Creating...' : '+ Register'}
                        </button>
                      </div>
                    </div>

                    {lastCreatedTeam && (
                      <div className="p-3 bg-emerald-50 border border-emerald-400 flex flex-wrap items-center justify-between gap-2 text-emerald-950">
                        <div>
                          Registered{' '}
                          <span className="font-bold">{lastCreatedTeam.teamId}</span> · Password:{' '}
                          <span className="font-bold">{lastCreatedTeam.password}</span> · Credits:{' '}
                          <span className="font-bold">{lastCreatedTeam.credits} CR</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(
                              `Team ID: ${lastCreatedTeam.teamId} | Password: ${lastCreatedTeam.password}`
                            );
                            setCopiedTeamId(true);
                            setTimeout(() => setCopiedTeamId(false), 2000);
                          }}
                          className="px-2.5 py-1 bg-white border border-emerald-600 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          {copiedTeamId ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          {copiedTeamId ? 'Copied' : 'Copy Login'}
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </section>
            )}

            {/* Filter & Search Bar */}
            <section className="bg-white border-2 border-[#111111] p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Search team name, ID, or player..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                {[
                  { id: 'ALL', label: `All (${totalTeams})` },
                  { id: 'ONLINE', label: `Online (${onlineTeamsCount})` },
                  { id: 'IN_CHALLENGE', label: `Playing (${activeAttemptsCount})` },
                  { id: 'SOLO', label: 'Solo' },
                  { id: 'DUO', label: 'Duo' },
                  { id: 'TRIO', label: 'Trio' },
                  { id: 'SQUAD', label: 'Squad' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTeamFilter(f.id)}
                    className={`px-2.5 py-1 border font-bold uppercase cursor-pointer transition-colors ${
                      teamFilter === f.id
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-[#111111]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Card-Wise Team Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 font-mono text-xs">
              {filteredTeams.map((team) => {
                const formatInfo = getTeamFormatInfo(team);
                const rosterList = (team.members || []).slice(0, formatInfo.size);
                const onlinePlayersCount = rosterList.filter((m) => m.online).length;
                const isOnline =
                  Boolean(team.connectionState?.connected) || onlinePlayersCount > 0;
                const activeAttempt =
                  team.activeAttempt?.status === 'IN_PROGRESS' ? team.activeAttempt : null;
                const attemptClock = getLiveAttemptClock(activeAttempt);
                const customVal = customCreditInputs[team.teamId] ?? '';
                const teamPass = team.accessPassword || team.password || 'NEXUS-2026';
                const copyKey = `team-cred-${team.teamId}`;

                return (
                  <div
                    key={team.teamId}
                    className={`bg-white border-2 p-4 flex flex-col justify-between gap-3.5 transition-colors ${
                      activeAttempt
                        ? 'border-[#E11D2E] shadow-[4px_4px_0px_#E11D2E]'
                        : 'border-[#111111] shadow-[4px_4px_0px_#111111]'
                    }`}
                  >
                    {/* Card Header: Team Name, ID, Format Badge, Online Status, Actions */}
                    <div className="flex items-start justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'
                            }`}
                            title={isOnline ? 'Online' : 'Offline'}
                          />
                          <h3 className="font-display text-2xl uppercase text-[#111111] truncate">
                            {team.teamName}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${formatInfo.badgeClass}`}
                          >
                            {formatInfo.label}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-600 mt-1 flex flex-wrap items-center gap-2">
                          <span className="font-bold text-[#111111]">{team.teamId}</span>
                          <span>·</span>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold uppercase border ${
                              isOnline
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                            }`}
                          >
                            {isOnline
                              ? `● TEAM ONLINE (${onlinePlayersCount}/${formatInfo.size} PLAYERS)`
                              : '○ TEAM OFFLINE'}
                          </span>
                        </div>
                      </div>

                      {!isVolunteer && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => jumpToTeamLiveEvents(team.teamId)}
                            className="px-2 py-1 bg-[#FAF9F5] hover:bg-[#111111] hover:text-white border border-neutral-300 font-bold text-[10px] uppercase cursor-pointer transition-colors"
                            title="View Live Events for this team"
                          >
                            Events
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingTeamModal({
                                teamId: team.teamId,
                                teamName: team.teamName || team.teamId,
                                password: '',
                                teamSize: formatInfo.size,
                                members: Array.from(
                                  { length: 4 },
                                  (_, i) => team.members?.[i]?.name || ''
                                ),
                              })
                            }
                            className="p-1.5 bg-[#FAF9F5] hover:bg-[#111111] hover:text-white border border-neutral-300 text-neutral-700 cursor-pointer transition-colors"
                            title="Edit Team & Roster"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete team ${team.teamId}?`)) {
                                handleTeamAction(
                                  team.teamId,
                                  'DELETE_TEAM',
                                  {},
                                  `Deleted ${team.teamId}`
                                );
                              }
                            }}
                            className="p-1.5 bg-[#FAF9F5] hover:bg-[#E11D2E] hover:text-white border border-neutral-300 text-neutral-500 cursor-pointer transition-colors"
                            title="Delete Team"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Team Password Box (Visible to Floor Volunteers & Admin) */}
                    <div className="p-2.5 bg-amber-50/80 border border-amber-300 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-amber-800">
                          TEAM LOGIN PASSWORD
                        </span>
                        <span className="font-mono text-sm font-bold text-[#111111] select-all break-all">
                          {teamPass}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            `Team ID: ${team.teamId} | Password: ${teamPass}`
                          );
                          setCopiedCredentialKey(copyKey);
                          setTimeout(() => setCopiedCredentialKey(null), 1800);
                        }}
                        className="px-2.5 py-1.5 bg-white hover:bg-[#111111] text-[#111111] hover:text-white border border-amber-500 font-bold text-[10px] uppercase inline-flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                      >
                        {copiedCredentialKey === copyKey ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedCredentialKey === copyKey ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Credits Balance + Solved/Failed + Player Roster with Online/Offline Status */}
                    <div className="space-y-2.5">
                      <div className="flex items-baseline justify-between bg-[#FAF9F5] border border-neutral-200 px-3 py-2.5">
                        <div>
                          <div className="text-[10px] font-bold uppercase text-neutral-500">
                            Team Credits
                          </div>
                          <div className="font-display text-3xl text-[#111111] leading-none mt-0.5">
                            {Number(team.credits || 0).toLocaleString()}{' '}
                            <span className="font-mono text-xs text-[#E11D2E]">CR</span>
                          </div>
                        </div>
                        <div className="text-right text-[11px]">
                          <div className="text-emerald-700 font-bold">
                            Solved: {team.completedChallenges?.length || 0}
                          </div>
                          <div className="text-neutral-500">
                            Failed: {team.failedChallenges?.length || 0}
                          </div>
                        </div>
                      </div>

                      {/* Players List with Per-Player Online/Offline Status */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-500">
                          <span>PLAYERS & ONLINE STATUS</span>
                          <span>
                            {onlinePlayersCount}/{formatInfo.size} ONLINE
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {rosterList.map((m, idx) => {
                            const playerOnline = Boolean(m.online);
                            return (
                              <div
                                key={m.memberId || idx}
                                className={`px-2.5 py-1.5 border flex items-center justify-between gap-1.5 ${
                                  playerOnline
                                    ? 'bg-emerald-50/70 border-emerald-400 text-[#111111]'
                                    : 'bg-[#FAF9F5] border-neutral-300 text-neutral-600'
                                }`}
                              >
                                <span className="text-[10px] font-bold uppercase truncate">
                                  P{idx + 1}: {m.name}
                                </span>
                                <span
                                  className={`px-1.5 py-0.2 text-[9px] font-bold uppercase shrink-0 ${
                                    playerOnline
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-neutral-200 text-neutral-600'
                                  }`}
                                >
                                  {playerOnline ? '● ONLINE' : 'OFFLINE'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Quick Credit Presets + Custom CR Input (Admin Only) */}
                    {!isVolunteer && (
                      <div className="space-y-2 pt-2 border-t border-neutral-200">
                        <div className="text-[10px] font-bold uppercase text-neutral-500">
                          Quick Credit Adjust & Custom CR
                        </div>

                        {/* Row 1: Quick Presets */}
                        <div className="grid grid-cols-5 gap-1">
                          {[
                            { label: '+100', amount: 100, pos: true },
                            { label: '+250', amount: 250, pos: true },
                            { label: '+500', amount: 500, pos: true },
                            { label: '-100', amount: -100, pos: false },
                            { label: '-250', amount: -250, pos: false },
                          ].map((btn) => (
                            <button
                              key={btn.label}
                              type="button"
                              onClick={() =>
                                handleTeamAction(
                                  team.teamId,
                                  'ADJUST_CREDITS',
                                  { amount: btn.amount, reason: `Admin ${btn.label} CR` },
                                  `${btn.label} CR (${team.teamId})`
                                )
                              }
                              className={`py-1.5 border font-bold text-[11px] cursor-pointer transition-colors ${
                                btn.pos
                                  ? 'bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border-emerald-300'
                                  : 'bg-red-50 hover:bg-[#E11D2E] hover:text-white text-[#E11D2E] border-red-200'
                              }`}
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>

                        {/* Row 2: Custom CR Input with + Add, - Deduct, and Set Exact */}
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            step={10}
                            value={customVal}
                            onChange={(e) =>
                              setCustomCreditInputs((p) => ({
                                ...p,
                                [team.teamId]: e.target.value,
                              }))
                            }
                            placeholder="Custom CR..."
                            className="flex-1 min-w-0 px-2.5 py-1.5 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] font-bold text-xs text-[#111111] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const num = Math.abs(Number(customVal));
                              if (!customVal || Number.isNaN(num) || num <= 0) {
                                showToast('Enter a positive custom CR amount first', 'error');
                                return;
                              }
                              handleTeamAction(
                                team.teamId,
                                'ADJUST_CREDITS',
                                { amount: num, reason: `Custom +${num} CR` },
                                `Added +${num} CR to ${team.teamId}`
                              );
                              setCustomCreditInputs((p) => ({ ...p, [team.teamId]: '' }));
                            }}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-[10px] cursor-pointer whitespace-nowrap"
                            title="Add custom CR to team balance"
                          >
                            + Add
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const num = Math.abs(Number(customVal));
                              if (!customVal || Number.isNaN(num) || num <= 0) {
                                showToast('Enter a positive custom CR amount first', 'error');
                                return;
                              }
                              handleTeamAction(
                                team.teamId,
                                'ADJUST_CREDITS',
                                { amount: -num, reason: `Custom -${num} CR` },
                                `Deducted -${num} CR from ${team.teamId}`
                              );
                              setCustomCreditInputs((p) => ({ ...p, [team.teamId]: '' }));
                            }}
                            className="px-2.5 py-1.5 bg-[#E11D2E] hover:bg-red-700 text-white font-bold uppercase text-[10px] cursor-pointer whitespace-nowrap"
                            title="Deduct custom CR from team balance"
                          >
                            - Sub
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const num = Number(customVal);
                              if (customVal === '' || Number.isNaN(num) || num < 0) {
                                showToast('Enter a valid CR balance to set', 'error');
                                return;
                              }
                              handleTeamAction(
                                team.teamId,
                                'SET_CREDITS',
                                { credits: Math.max(0, num) },
                                `Set ${team.teamId} balance to ${num} CR`
                              );
                              setCustomCreditInputs((p) => ({ ...p, [team.teamId]: '' }));
                            }}
                            className="px-2.5 py-1.5 bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase text-[10px] cursor-pointer whitespace-nowrap"
                            title="Set exact credit balance"
                          >
                            Set
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Active Challenge Status Footer */}
                    <div className="pt-2.5 border-t border-neutral-200">
                      {activeAttempt ? (
                        <div className="p-2.5 bg-red-50/40 border border-red-200 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 bg-[#E11D2E] text-white font-bold text-[9px] uppercase">
                                PLAYING
                              </span>
                              <span className="font-bold text-xs text-[#111111] truncate">
                                {getFriendlyChallengeTitle({
                                  challengeId: activeAttempt.challengeId,
                                  title: activeAttempt.title,
                                  gameType: activeAttempt.gameType,
                                })}
                              </span>
                            </div>
                            {attemptClock && (
                              <div className="text-[11px] font-bold text-[#E11D2E] mt-0.5">
                                Time Left: {attemptClock.formatted}
                              </div>
                            )}
                          </div>
                          {!isVolunteer && (
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  handleTeamAction(
                                    team.teamId,
                                    'FORCE_COMPLETE',
                                    { challengeId: activeAttempt.challengeId },
                                    `Passed ${team.teamId}`
                                  )
                                }
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase cursor-pointer"
                              >
                                Pass
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleTeamAction(
                                    team.teamId,
                                    'FORCE_FAIL',
                                    { challengeId: activeAttempt.challengeId },
                                    `Failed ${team.teamId}`
                                  )
                                }
                                className="px-2.5 py-1 bg-[#E11D2E] hover:bg-red-700 text-white font-bold text-[10px] uppercase cursor-pointer"
                              >
                                Fail
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] text-neutral-500">
                          <span>Status: Idle (No active game)</span>
                          <span className="uppercase font-bold">
                            Core: {team.coreState || 'LOCKED'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredTeams.length === 0 && (
                <div className="col-span-full bg-white border-2 border-[#111111] p-10 text-center text-neutral-500">
                  No teams match the current search or filter.
                </div>
              )}
            </section>
          </div>
        )}

        {/* =======================================================================
            TAB 1B: LIVE LEADERBOARD (/admin/leaderboard — Volunteers & Admin)
           ======================================================================= */}
        {activeTabId === 'leaderboard' && (
          <div className="space-y-5 font-mono text-xs">
            <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-[#E11D2E] text-white text-[10px] font-bold uppercase tracking-widest mb-1">
                  LIVE STANDINGS · REAL-TIME SYNC
                </span>
                <h2 className="font-display text-2xl sm:text-3xl uppercase text-[#111111]">
                  TEAM LEADERBOARD ({liveLeaderboard.length} TEAMS)
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold uppercase">
                  Online Teams: {onlineTeamsCount}/{totalTeams}
                </span>
                <span className="px-3 py-1.5 bg-neutral-100 text-[#111111] border border-neutral-300 font-bold uppercase">
                  Active Solves: {activeAttemptsCount}
                </span>
              </div>
            </section>

            <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] divide-y divide-neutral-200">
              {liveLeaderboard.map((row, idx) => {
                const rank = Number(row.rank || idx + 1);
                const roster = Array.isArray(row.members) ? row.members : [];
                const onlineCount = roster.filter((m) => m.online).length;
                const isTeamOnline = Boolean(row.online) || onlineCount > 0;

                return (
                  <div
                    key={row.teamId || idx}
                    className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      rank === 1
                        ? 'bg-amber-50/70'
                        : rank === 2
                          ? 'bg-neutral-50'
                          : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <span
                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-display text-xl shrink-0 border-2 ${
                          rank === 1
                            ? 'bg-amber-400 text-[#111111] border-[#111111]'
                            : rank === 2
                              ? 'bg-neutral-200 text-[#111111] border-[#111111]'
                              : rank === 3
                                ? 'bg-amber-700 text-white border-[#111111]'
                                : 'bg-[#FAF9F5] text-neutral-700 border-neutral-300'
                        }`}
                      >
                        #{rank}
                      </span>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-xl sm:text-2xl uppercase text-[#111111] truncate">
                            {row.teamName || row.teamId}
                          </span>
                          <span className="text-[11px] font-bold text-neutral-500">
                            [{row.teamId}]
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${
                              isTeamOnline
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                            }`}
                          >
                            {isTeamOnline ? `● ONLINE (${onlineCount})` : '○ OFFLINE'}
                          </span>
                        </div>

                        {/* Player Online Pills */}
                        {roster.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {roster.map((m, mIdx) => (
                              <span
                                key={m.memberId || mIdx}
                                className={`px-1.5 py-0.5 text-[9px] font-bold uppercase border ${
                                  m.online
                                    ? 'bg-emerald-600 text-white border-emerald-700'
                                    : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                                }`}
                              >
                                {m.name}: {m.online ? 'ONLINE' : 'OFFLINE'}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200 shrink-0">
                      <div className="text-left sm:text-right text-[11px]">
                        <div className="font-bold text-emerald-700">
                          Solved: {row.totalSolved ?? 0}
                        </div>
                        <div className="text-neutral-500">
                          Failed: {row.totalFailed ?? 0} · Core: {row.coreState || 'LOCKED'}
                        </div>
                      </div>

                      <div className="text-right min-w-[95px]">
                        <span className="font-display text-2xl sm:text-3xl text-[#111111] leading-none block">
                          {Number(row.credits || 0).toLocaleString()}{' '}
                          <span className="font-mono text-xs text-[#E11D2E]">CR</span>
                        </span>
                        <span className="text-[9px] uppercase text-neutral-500">TOTAL POINTS</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {liveLeaderboard.length === 0 && (
                <div className="p-10 text-center text-neutral-500">No teams registered yet.</div>
              )}
            </section>
          </div>
        )}

        {/* =======================================================================
            TAB 1C: FLOOR VOLUNTEERS MANAGEMENT (/admin/volunteers — Admin Only)
           ======================================================================= */}
        {activeTabId === 'volunteers' && !isVolunteer && (
          <div className="space-y-5 font-mono text-xs">
            {/* Create Floor Volunteer Card */}
            <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-4 sm:p-5 space-y-4">
              <div className="border-b border-neutral-200 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="inline-block px-2 py-0.5 bg-[#E11D2E] text-white text-[10px] font-bold uppercase tracking-widest mb-1">
                    ADMIN VOLUNTEER ACCESS CONTROL
                  </span>
                  <h2 className="font-display text-2xl uppercase text-[#111111]">
                    Create Floor Volunteer Account
                  </h2>
                  <p className="text-neutral-600 text-[11px]">
                    Floor Volunteers can only view Team Details (including Passwords), Team/Player Online Status, and the Live Leaderboard.
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateVolunteer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">
                    Volunteer Name *
                  </label>
                  <input
                    type="text"
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    placeholder="e.g. ROHAN VERMA"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] text-sm font-bold uppercase focus:outline-none focus:border-[#E11D2E]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">
                    Operator ID (Auto if blank)
                  </label>
                  <input
                    type="text"
                    value={volOperatorId}
                    onChange={(e) => setVolOperatorId(e.target.value.toUpperCase())}
                    placeholder={
                      volName.trim()
                        ? `VOL-${volName
                            .trim()
                            .toUpperCase()
                            .replace(/[^A-Z0-9]+/g, '-')}`
                        : 'VOLUNTEER-02'
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] text-sm uppercase focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">
                    Login Password *
                  </label>
                  <input
                    type="text"
                    value={volPassword}
                    onChange={(e) => setVolPassword(e.target.value)}
                    placeholder="NEXUS-VOL-2026"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] text-sm font-bold focus:outline-none focus:border-[#E11D2E]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">
                    Floor / Sector
                  </label>
                  <input
                    type="text"
                    value={volSector}
                    onChange={(e) => setVolSector(e.target.value.toUpperCase())}
                    placeholder="FLOOR-1"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] text-sm uppercase focus:outline-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={pendingKey === 'create-volunteer'}
                    className="w-full py-2.5 px-4 bg-[#E11D2E] hover:bg-[#111111] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[2px_2px_0px_#111111] disabled:opacity-50"
                  >
                    {pendingKey === 'create-volunteer' ? 'Creating...' : '+ Add Volunteer'}
                  </button>
                </div>
              </form>
            </section>

            {/* Existing Floor Volunteers List */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(adminState?.volunteers || []).map((vol) => {
                const volCopyKey = `vol-${vol.operatorId}`;
                return (
                  <div
                    key={vol.operatorId}
                    className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-4 flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-neutral-200 pb-2.5">
                      <div>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase">
                          FLOOR VOLUNTEER · {vol.sector || 'FLOOR-1'}
                        </span>
                        <h3 className="font-display text-2xl uppercase text-[#111111] mt-1">
                          {vol.name || vol.operatorId}
                        </h3>
                        <p className="text-[11px] font-bold text-neutral-600">{vol.operatorId}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteVolunteer(vol.operatorId)}
                        className="p-1.5 bg-[#FAF9F5] hover:bg-[#E11D2E] hover:text-white border border-neutral-300 text-neutral-500 cursor-pointer transition-colors"
                        title="Delete Floor Volunteer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-2.5 bg-amber-50/80 border border-amber-300 flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-[9px] font-bold uppercase text-amber-800">
                          VOLUNTEER LOGIN PASSWORD
                        </span>
                        <span className="font-mono text-sm font-bold text-[#111111] select-all">
                          {vol.password || 'NEXUS-VOL-2026'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            `Operator ID: ${vol.operatorId} | Password: ${vol.password || 'NEXUS-VOL-2026'}`
                          );
                          setCopiedCredentialKey(volCopyKey);
                          setTimeout(() => setCopiedCredentialKey(null), 1800);
                        }}
                        className="px-2.5 py-1.5 bg-white hover:bg-[#111111] text-[#111111] hover:text-white border border-amber-500 font-bold text-[10px] uppercase inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedCredentialKey === volCopyKey ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedCredentialKey === volCopyKey ? 'Copied' : 'Copy Login'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        )}

        {/* =======================================================================
            TAB 2: LIVE EVENTS WITH TEAM-WISE FILTER (/admin/attempts)
           ======================================================================= */}
        {activeTabId === 'attempts' && (
          <div className="space-y-5">
            {/* Team-Wise Filter Header Card */}
            <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl uppercase text-[#111111]">
                    Live Events & Team Activity
                  </h2>
                  <p className="font-mono text-xs text-neutral-600">
                    Filter live challenge sessions, results, and credit updates by team.
                  </p>
                </div>

                {/* Team Dropdown + Search + Event Type Filter */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <div className="flex items-center gap-1.5 bg-[#FAF9F5] border-2 border-[#111111] px-2.5 py-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#E11D2E]" />
                    <span className="font-bold uppercase text-[11px] text-neutral-600">Team:</span>
                    <select
                      value={selectedEventTeamId}
                      onChange={(e) => setSelectedEventTeamId(e.target.value)}
                      className="bg-transparent font-bold text-[#111111] focus:outline-none cursor-pointer"
                    >
                      <option value="ALL">ALL TEAMS ({unifiedLiveEvents.length})</option>
                      {(adminState?.teams || []).map((t) => (
                        <option key={t.teamId} value={t.teamId}>
                          {t.teamName} ({t.teamId}) — {teamEventCounts[t.teamId] || 0} events
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={attemptSearch}
                      onChange={(e) => setAttemptSearch(e.target.value)}
                      placeholder="Search game or event..."
                      className="pl-8 pr-3 py-1.5 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Clickable Team Filter Pills (Team-Wise Filter Strip) */}
              <div className="border-t border-neutral-200 pt-3">
                <div className="font-mono text-[10px] font-bold uppercase text-neutral-500 mb-2">
                  Filter by Team:
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedEventTeamId('ALL')}
                    className={`px-3 py-1.5 border font-bold uppercase whitespace-nowrap cursor-pointer transition-colors ${
                      selectedEventTeamId === 'ALL'
                        ? 'bg-[#E11D2E] text-white border-[#111111]'
                        : 'bg-[#FAF9F5] text-neutral-700 border-neutral-300 hover:border-[#111111]'
                    }`}
                  >
                    All Teams ({unifiedLiveEvents.length})
                  </button>
                  {(adminState?.teams || []).map((team) => {
                    const isSelected = selectedEventTeamId === team.teamId;
                    const count = teamEventCounts[team.teamId] || 0;
                    const isPlaying = team.activeAttempt?.status === 'IN_PROGRESS';
                    return (
                      <button
                        key={team.teamId}
                        type="button"
                        onClick={() => setSelectedEventTeamId(team.teamId)}
                        className={`px-3 py-1.5 border font-bold uppercase whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-[#111111]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isPlaying
                              ? 'bg-[#E11D2E]'
                              : team.connectionState?.connected
                                ? 'bg-emerald-500'
                                : 'bg-neutral-300'
                          }`}
                        />
                        <span>{team.teamName}</span>
                        <span
                          className={`px-1.5 py-0.2 text-[10px] ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono text-xs">
                {[
                  { id: 'ALL', label: 'All Events' },
                  { id: 'IN_PROGRESS', label: 'Playing Now' },
                  { id: 'COMPLETED', label: 'Solved' },
                  { id: 'FAILED', label: 'Failed / Timeout' },
                  { id: 'CREDITS', label: 'Credit Logs' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setAttemptStatusFilter(st.id)}
                    className={`px-2.5 py-1 border font-bold uppercase cursor-pointer ${
                      attemptStatusFilter === st.id
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-white text-neutral-600 border-neutral-300 hover:border-[#111111]'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Selected Team Summary Banner (when filtering by a specific team) */}
            {selectedEventTeamObj && (
              <section className="bg-white border-2 border-[#111111] p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-10 bg-[#E11D2E]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-2xl uppercase text-[#111111]">
                        {selectedEventTeamObj.teamName}
                      </span>
                      <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 font-bold text-[11px]">
                        {selectedEventTeamObj.teamId}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                        {getTeamFormatInfo(selectedEventTeamObj).label}
                      </span>
                    </div>
                    <div className="text-neutral-500 mt-0.5">
                      Credits:{' '}
                      <strong className="text-[#111111]">
                        {Number(selectedEventTeamObj.credits || 0).toLocaleString()} CR
                      </strong>{' '}
                      · Solved: <strong>{selectedEventTeamObj.completedChallenges?.length || 0}</strong>{' '}
                      · Failed: <strong>{selectedEventTeamObj.failedChallenges?.length || 0}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    step={10}
                    value={customCreditInputs[selectedEventTeamObj.teamId] ?? ''}
                    onChange={(e) =>
                      setCustomCreditInputs((p) => ({
                        ...p,
                        [selectedEventTeamObj.teamId]: e.target.value,
                      }))
                    }
                    placeholder="Custom CR..."
                    className="w-28 px-2.5 py-1.5 bg-[#FAF9F5] border border-neutral-300 font-bold text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const num = Math.abs(
                        Number(customCreditInputs[selectedEventTeamObj.teamId])
                      );
                      if (!num || Number.isNaN(num)) {
                        showToast('Enter custom CR amount first', 'error');
                        return;
                      }
                      handleTeamAction(
                        selectedEventTeamObj.teamId,
                        'ADJUST_CREDITS',
                        { amount: num, reason: `Custom +${num} CR` },
                        `+${num} CR to ${selectedEventTeamObj.teamId}`
                      );
                      setCustomCreditInputs((p) => ({
                        ...p,
                        [selectedEventTeamObj.teamId]: '',
                      }));
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase cursor-pointer"
                  >
                    + Add CR
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleTeamAction(
                        selectedEventTeamObj.teamId,
                        'ADJUST_CREDITS',
                        { amount: 100, reason: 'Admin Bonus +100 CR' },
                        `+100 CR to ${selectedEventTeamObj.teamId}`
                      )
                    }
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 font-bold uppercase cursor-pointer"
                  >
                    +100 CR
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleTeamAction(
                        selectedEventTeamObj.teamId,
                        'ADJUST_CREDITS',
                        { amount: -100, reason: 'Admin Penalty -100 CR' },
                        `-100 CR from ${selectedEventTeamObj.teamId}`
                      )
                    }
                    className="px-3 py-1.5 bg-red-50 hover:bg-[#E11D2E] hover:text-white text-[#E11D2E] border border-red-200 font-bold uppercase cursor-pointer"
                  >
                    -100 CR
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEventTeamId('ALL')}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-[#111111] hover:text-white border border-neutral-300 font-bold uppercase cursor-pointer"
                  >
                    Show All Teams
                  </button>
                </div>
              </section>
            )}

            {/* Unified Live Events Table */}
            <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-[#FAF9F5] border-b-2 border-[#111111] text-[11px] uppercase text-neutral-600">
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Team</th>
                    <th className="py-3 px-4">Event / Game</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Credits</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredLiveEvents.map((ev) => {
                    const isPlaying = ev.status === 'IN_PROGRESS';
                    const liveClock = isPlaying ? getLiveAttemptClock(ev.attempt) : null;

                    return (
                      <tr
                        key={ev.id}
                        className={`hover:bg-[#FAF9F5] ${isPlaying ? 'bg-red-50/30' : ''}`}
                      >
                        <td className="py-3 px-4 text-neutral-500 whitespace-nowrap">
                          {formatTimestampShort(ev.timestamp)}
                        </td>

                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => setSelectedEventTeamId(ev.teamId)}
                            className="text-left group cursor-pointer"
                            title="Filter events by this team"
                          >
                            <div className="font-bold text-[#111111] group-hover:text-[#E11D2E] underline-offset-2 group-hover:underline">
                              {ev.teamName}
                            </div>
                            <div className="text-[11px] text-neutral-500">{ev.teamId}</div>
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-[#111111]">{ev.title}</div>
                          <div className="text-[11px] text-neutral-500">{ev.detail}</div>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${
                              ev.status === 'IN_PROGRESS'
                                ? 'bg-red-100 text-[#E11D2E]'
                                : ev.status === 'COMPLETED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ev.status === 'CREDITS'
                                    ? 'bg-sky-100 text-sky-800'
                                    : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {ev.status === 'IN_PROGRESS'
                              ? `PLAYING ${liveClock ? `(${liveClock.formatted})` : ''}`
                              : ev.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-bold">
                          {ev.creditDelta > 0 ? (
                            <span className="text-emerald-700">+{ev.creditDelta} CR</span>
                          ) : ev.creditDelta < 0 ? (
                            <span className="text-[#E11D2E]">{ev.creditDelta} CR</span>
                          ) : (
                            <span className="text-neutral-400">0 CR</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          {isPlaying && ev.attempt ? (
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  handleTeamAction(
                                    ev.teamId,
                                    'FORCE_COMPLETE',
                                    { challengeId: ev.challengeId },
                                    `Passed ${ev.teamId}`
                                  )
                                }
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-[10px] cursor-pointer"
                              >
                                Pass
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleTeamAction(
                                    ev.teamId,
                                    'FORCE_FAIL',
                                    { challengeId: ev.challengeId },
                                    `Failed ${ev.teamId}`
                                  )
                                }
                                className="px-2.5 py-1 bg-[#E11D2E] hover:bg-red-700 text-white font-bold uppercase text-[10px] cursor-pointer"
                              >
                                Fail
                              </button>
                            </div>
                          ) : (
                            <span className="text-neutral-400 text-[11px]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {filteredLiveEvents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-neutral-500">
                        No live events found for{' '}
                        <span className="font-bold text-[#111111]">
                          {selectedEventTeamId === 'ALL' ? 'All Teams' : selectedEventTeamId}
                        </span>
                        .
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {/* =======================================================================
            TAB 3: CHALLENGES (/admin/challenges)
           ======================================================================= */}
        {activeTabId === 'challenges' && (
          <div className="space-y-5">
            <div className="bg-white border-2 border-[#111111] p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl uppercase text-[#111111]">
                    Challenge Market Catalog
                  </h2>
                  <p className="text-xs font-mono text-neutral-600">
                    Filter by game name, sorted by difficulty (and AI noobness for AI games).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={challengeSearch}
                      onChange={(e) => setChallengeSearch(e.target.value)}
                      placeholder="Search challenge..."
                      className="pl-8 pr-3 py-1.5 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={openCreateChallenge}
                    className="px-3.5 py-2 bg-[#E11D2E] hover:bg-[#111111] text-white font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Challenge
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-200 font-mono text-xs">
                {MARKET_GAMES.map((gameMeta) => {
                  const isActive = challengeCategoryFilter === gameMeta.id;
                  return (
                    <button
                      key={gameMeta.id}
                      type="button"
                      onClick={() => setChallengeCategoryFilter(gameMeta.id)}
                      className={`px-2.5 py-1 border font-bold uppercase cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#FAF9F5] text-neutral-700 border-neutral-300 hover:border-[#111111]'
                      }`}
                    >
                      {gameMeta.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {totalChallengePages > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white border-2 border-[#111111] px-4 py-2.5 font-mono text-xs">
                <span className="text-neutral-600 uppercase font-bold">
                  SHOWING {(safeChallengePage - 1) * ADMIN_CHALLENGES_PER_PAGE + 1}–
                  {Math.min(
                    safeChallengePage * ADMIN_CHALLENGES_PER_PAGE,
                    filteredChallenges.length
                  )}{' '}
                  OF {filteredChallenges.length} CHALLENGES
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safeChallengePage <= 1}
                    onClick={() => setChallengePage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 border border-[#111111] bg-[#FAF9F5] hover:bg-[#111111] hover:text-white font-bold uppercase cursor-pointer disabled:opacity-40"
                  >
                    PREV PAGE
                  </button>
                  <span className="px-2.5 py-1 bg-[#111111] text-white font-bold uppercase">
                    PAGE {safeChallengePage} / {totalChallengePages}
                  </span>
                  <button
                    type="button"
                    disabled={safeChallengePage >= totalChallengePages}
                    onClick={() =>
                      setChallengePage((p) => Math.min(totalChallengePages, p + 1))
                    }
                    className="px-3 py-1 border border-[#111111] bg-[#FAF9F5] hover:bg-[#111111] hover:text-white font-bold uppercase cursor-pointer disabled:opacity-40"
                  >
                    NEXT PAGE
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedAdminChallenges.map((chg) => {
                const isEnabled = chg.enabled !== false;
                const friendlyTitle = getFriendlyChallengeTitle(chg);
                const friendlyDesc = getFriendlyChallengeDescription(chg);
                return (
                  <div
                    key={chg.challengeId}
                    className={`bg-white border-2 p-4 flex flex-col justify-between gap-3 transition-all ${
                      isEnabled
                        ? 'border-[#111111] shadow-[3px_3px_0px_#111111]'
                        : 'border-neutral-300 opacity-65'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 bg-[#111111] text-white">
                              {chg.challengeId}
                            </span>
                            <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-700">
                              {getGameNameLabel(chg)} · {getFriendlyDifficultyLabel(chg)}
                            </span>
                          </div>
                          <h3 className="font-display text-2xl uppercase text-[#111111] mt-1">
                            {friendlyTitle}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleChallengeEnabled(chg)}
                          className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase border cursor-pointer ${
                            isEnabled
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-400'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                          }`}
                        >
                          {isEnabled ? 'ENABLED' : 'DISABLED'}
                        </button>
                      </div>

                      <p className="text-xs text-neutral-600 line-clamp-2">{friendlyDesc}</p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-neutral-200 font-mono text-xs">
                      <div className="grid grid-cols-3 gap-2 text-center bg-[#FAF9F5] p-2 border border-neutral-200">
                        <div>
                          <div className="text-[10px] text-neutral-500">COST</div>
                          <div className="font-bold text-[#111111]">{chg.cost} CR</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-neutral-500">REWARD</div>
                          <div className="font-bold text-emerald-700">+{chg.reward} CR</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-neutral-500">TIME</div>
                          <div className="font-bold text-[#111111]">
                            {Math.round((chg.timeLimit || 600) / 60)}m
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-neutral-500 uppercase">
                          ID: <strong className="text-[#111111]">{chg.challengeId}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => openEditChallenge(chg)}
                          className="px-3 py-1 bg-white hover:bg-[#111111] hover:text-white border border-[#111111] font-bold text-[11px] uppercase inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 1: DEDICATED ROUND CONTROL & CHAMPIONSHIP DECK (/admin/events)
           ======================================================================= */}
        {activeTabId === 'events' && (
          <div className="space-y-5 sm:space-y-6">
            {/* 1. HERO DARK MISSION CONTROL CONSOLE: ROUND LAUNCH, COUNTDOWN & LIVE CLOCK */}
            <section className="relative overflow-hidden bg-[#0B0C10] text-white border-2 border-[#111111] shadow-[4px_4px_0px_#E11D2E] sm:shadow-[6px_6px_0px_#E11D2E]">
              {/* Subtle Tactical Grid Backdrop */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 18% 20%, rgba(225,29,46,0.18) 0%, transparent 55%), radial-gradient(circle at 85% 80%, rgba(245,158,11,0.12) 0%, transparent 55%)',
                }}
              />

              {/* Top Telemetry Strip */}
              <div className="relative z-10 px-4 sm:px-6 py-2.5 sm:py-3 bg-black/50 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      liveGlobalTimer.status === 'ACTIVE'
                        ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                        : liveGlobalTimer.status === 'COUNTDOWN'
                          ? 'bg-[#E11D2E] animate-ping'
                          : 'bg-amber-400'
                    }`}
                  />
                  <span className="font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em] text-white/90">
                    NEXUS MISSION CONTROL // ROUND EXECUTION DECK
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-white/60">
                  <span>
                    CITADEL:{' '}
                    <strong
                      className={
                        liveGlobalTimer.status === 'ACTIVE' ? 'text-emerald-400' : 'text-amber-300'
                      }
                    >
                      {liveGlobalTimer.status === 'ACTIVE'
                        ? 'UNLOCKED (ARENA LIVE)'
                        : 'SEALED (HOME STANDBY)'}
                    </strong>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">
                    REAL-TIME SYNC: <strong className="text-emerald-400">ZERO-REFRESH WS</strong>
                  </span>
                </div>
              </div>

              {/* Main 2-Column Console Body */}
              <div className="relative z-10 p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
                {/* Left 5 Cols: Giant Live Arena Clock & Telemetry */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 border border-white/15 bg-white/[0.04] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em]">
                    <Clock className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                    <span>
                      {liveGlobalTimer.status === 'COUNTDOWN'
                        ? 'CINEMATIC LAUNCH SEQUENCE ACTIVE'
                        : liveGlobalTimer.status === 'ACTIVE'
                          ? 'ROUND IN PROGRESS — ALL TERMINALS UNLOCKED'
                          : liveGlobalTimer.status === 'ENDED'
                            ? 'ROUND CONCLUDED — CEREMONY MODE'
                            : 'STANDBY — PLAYERS IN HOME LORE CHAMBER'}
                    </span>
                  </div>

                  {/* Giant Digital Timer Box */}
                  <div className="p-4 sm:p-6 bg-black/60 border-2 border-white/15 relative overflow-hidden">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-white/45">
                      {liveGlobalTimer.status === 'COUNTDOWN'
                        ? 'PRE-GAME COUNTDOWN CLOCK'
                        : 'GLOBAL ARENA ROUND CLOCK'}
                    </div>
                    <div
                      className={`font-display text-5xl sm:text-7xl tracking-wider leading-none mt-2 ${
                        liveGlobalTimer.status === 'COUNTDOWN'
                          ? 'text-[#E11D2E]'
                          : liveGlobalTimer.status === 'ACTIVE'
                            ? 'text-white'
                            : 'text-amber-300'
                      }`}
                    >
                      {liveGlobalTimer.status === 'COUNTDOWN'
                        ? `T-${liveGlobalTimer.countdownRemainingSeconds}s`
                        : liveGlobalTimer.formatted}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-white/10 mt-4 sm:mt-5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#E11D2E] via-amber-400 to-emerald-400 transition-all duration-500"
                        style={{ width: `${liveGlobalTimer.progressPercent}%` }}
                      />
                    </div>

                    {/* Sub-metrics */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 font-mono text-xs">
                      <div>
                        <div className="text-[10px] uppercase text-white/40">Total Round Time</div>
                        <div className="font-bold text-white mt-0.5">
                          {liveGlobalTimer.totalFormatted} ({liveGlobalTimer.totalDurationMinutes}m)
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-white/40">Elapsed Progress</div>
                        <div className="font-bold text-white/80 mt-0.5">
                          {liveGlobalTimer.elapsedFormatted} ({liveGlobalTimer.progressPercent}%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 7 Cols: Cinematic Countdown Launcher & Round Execution Controls */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5 font-mono">
                  <div className="p-4 sm:p-6 bg-white/[0.03] border border-white/15 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#E11D2E]">
                          STEP 1 // SYNCHRONIZED PRE-START COUNTDOWN
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-white mt-0.5">
                          Start Round With Cinematic Countdown
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 bg-[#E11D2E]/20 border border-[#E11D2E]/50 text-[#E11D2E] text-[10px] font-bold uppercase">
                        No Page Refresh Needed
                      </span>
                    </div>

                    <p className="text-xs text-white/65 leading-relaxed">
                      Configure your <strong className="text-white">Round Duration (Mins)</strong> and{' '}
                      <strong className="text-white">Pre-Start Countdown (Secs)</strong> below, then
                      press <strong className="text-white">Start Round With Countdown</strong>. Every
                      player screen and the projector will immediately sync without refreshing.
                    </p>

                    {/* Round Duration Presets + Custom Minutes Input */}
                    <div className="p-3 bg-black/45 border border-white/15 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          Round Duration (Minutes):
                        </span>
                        <span className="text-[10px] font-bold uppercase text-white/60">
                          Active Clock Target: {customTimerMinutes || 45} Mins
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {ROUND_TIME_PRESETS.map((mins) => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => handleApplyTotalTime(mins)}
                            className={`px-2.5 sm:px-3 py-1.5 border text-xs font-bold uppercase cursor-pointer transition-all ${
                              Number(customTimerMinutes) === mins
                                ? 'bg-amber-400 text-[#111111] border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                                : 'bg-black/60 text-white/75 border-white/20 hover:border-white/50'
                            }`}
                          >
                            {mins}m
                          </button>
                        ))}

                        <div className="flex items-center gap-1.5 sm:ml-auto">
                          <span className="text-[10px] font-bold uppercase text-white/50">
                            Custom (m):
                          </span>
                          <input
                            type="number"
                            min={1}
                            max={600}
                            value={customTimerMinutes}
                            onChange={(e) => setCustomTimerMinutes(e.target.value)}
                            className="w-16 sm:w-20 px-2 py-1.5 bg-black/80 border border-amber-400/60 text-amber-300 font-bold text-xs text-center focus:outline-none focus:border-amber-300"
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyTotalTime(customTimerMinutes)}
                            className="px-2.5 sm:px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-[#111111] font-bold text-[11px] uppercase cursor-pointer transition-colors"
                          >
                            Set {customTimerMinutes || 45}m
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Countdown Presets + Custom Seconds */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 mr-1">
                        Countdown:
                      </span>
                      {[5, 10, 15, 30, 60].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => setCountdownSeconds(sec)}
                          className={`px-3 sm:px-3.5 py-1.5 sm:py-2 border text-xs font-bold uppercase cursor-pointer transition-all ${
                            Number(countdownSeconds) === sec
                              ? 'bg-[#E11D2E] text-white border-[#E11D2E] shadow-[0_0_15px_rgba(225,29,46,0.4)]'
                              : 'bg-black/50 text-white/75 border-white/20 hover:border-white/50'
                          }`}
                        >
                          {sec}s
                        </button>
                      ))}
                      <div className="flex items-center gap-1.5 sm:ml-auto">
                        <span className="text-[10px] font-bold uppercase text-white/50">
                          Custom (s):
                        </span>
                        <input
                          type="number"
                          min={1}
                          max={300}
                          value={countdownSeconds}
                          onChange={(e) => setCountdownSeconds(e.target.value)}
                          className="w-20 px-2.5 py-1.5 bg-black/70 border border-white/30 text-white font-bold text-xs text-center focus:outline-none focus:border-[#E11D2E]"
                        />
                      </div>
                    </div>

                    {/* Primary Hero Launch Button */}
                    <button
                      type="button"
                      onClick={() => handleStartCountdownRound(countdownSeconds)}
                      className="w-full py-3.5 sm:py-4 px-3 sm:px-5 bg-[#E11D2E] hover:bg-red-600 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] cursor-pointer shadow-[3px_3px_0px_#ffffff] sm:shadow-[4px_4px_0px_#ffffff] transition-all inline-flex items-center justify-center gap-2 text-center"
                    >
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span>Start Round With {countdownSeconds || 10}s Cinematic Countdown →</span>
                    </button>
                  </div>

                  {/* Secondary Execution Controls: Instant Start / Pause-Resume / End Round / Reset Everything */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                    <button
                      type="button"
                      onClick={handleStartRound}
                      className="py-3 sm:py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider cursor-pointer border border-emerald-400/40 inline-flex items-center justify-center gap-2 transition-colors"
                      title="Start Round immediately with 0s countdown"
                    >
                      <Play className="w-4 h-4 shrink-0" />
                      <span>Instant Start (0s)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePauseOrResumeRound}
                      className={`py-3 sm:py-3.5 px-4 font-bold uppercase tracking-wider cursor-pointer border inline-flex items-center justify-center gap-2 transition-colors ${
                        liveGlobalTimer.status === 'ACTIVE'
                          ? 'bg-amber-500 hover:bg-amber-400 text-[#111111] border-amber-300'
                          : 'bg-white/10 hover:bg-white/20 text-white border-white/25'
                      }`}
                    >
                      {liveGlobalTimer.status === 'ACTIVE' ? (
                        <>
                          <Pause className="w-4 h-4 shrink-0" /> <span>Pause Round</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 shrink-0" /> <span>Resume Round</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleEndRound}
                      disabled={liveGlobalTimer.status === 'ENDED'}
                      className="py-3 sm:py-3.5 px-4 bg-white hover:bg-[#E11D2E] hover:text-white disabled:opacity-40 text-[#111111] font-bold uppercase tracking-wider cursor-pointer border border-white inline-flex items-center justify-center gap-2 transition-colors"
                      title="End Round and lock all challenge submissions"
                    >
                      <Square className="w-4 h-4 shrink-0" />
                      <span>End Round</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetEverythingToZero}
                      className="py-3 sm:py-3.5 px-4 bg-red-950/80 hover:bg-[#E11D2E] text-red-200 hover:text-white font-bold uppercase tracking-wider cursor-pointer border border-[#E11D2E] inline-flex items-center justify-center gap-2 transition-colors"
                      title="Reset every team to 0 solved, clear all attempts, and make every challenge solvable again"
                    >
                      <RotateCcw className="w-4 h-4 shrink-0" />
                      <span>Reset All to Zero</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. CINEMATIC TOP 2 WINNERS PROCLAMATION CEREMONY DECK (#1 CHAMPION & #2 RUNNER-UP) */}
            <section className="bg-[#0B0C10] text-white border-2 border-amber-400 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] p-4 sm:p-8 space-y-5 sm:space-y-6 relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(251,191,36,0.16) 0%, transparent 65%)',
                }}
              />

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-amber-400">
                    <Trophy className="w-3.5 h-3.5 shrink-0" />
                    <span>GRAND FINALE // TOP 2 CHAMPIONSHIP PROCLAMATION</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-3xl uppercase tracking-wide text-white mt-1">
                    Declare Top 2 Winning Teams (#1 Champion & #2 Runner-Up)
                  </h2>
                </div>

                {(adminState?.coreStatus?.declaredWinner || adminState?.coreStatus?.winner) ? (
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 sm:px-3 py-1.5 bg-amber-400 text-[#111111] font-bold uppercase">
                      🏆 CROWNED:{' '}
                      {(adminState?.coreStatus?.declaredWinner || adminState?.coreStatus?.winner)
                        ?.teamName || 'CHAMPION'}
                      {(adminState?.coreStatus?.declaredWinner || adminState?.coreStatus?.winner)
                        ?.runnerUp?.teamName
                        ? ` & #2 ${(adminState?.coreStatus?.declaredWinner || adminState?.coreStatus?.winner).runnerUp.teamName}`
                        : ''}
                    </span>
                    <button
                      type="button"
                      onClick={handleClearWinner}
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#E11D2E] text-white border border-white/25 font-bold uppercase cursor-pointer transition-colors"
                    >
                      Dismiss Ceremony Overlay
                    </button>
                  </div>
                ) : (
                  <span className="px-3 py-1 bg-white/10 border border-white/20 font-mono text-[10px] sm:text-[11px] font-bold uppercase text-white/70">
                    CEREMONY STANDBY
                  </span>
                )}
              </div>

              {/* Dual Selectors for #1 Grand Champion and #2 Runner-Up */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-end font-mono text-xs">
                <div className="lg:col-span-4 space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
                    🥇 Rank #1 — Grand Champion
                  </label>
                  <select
                    value={selectedWinnerTeamId}
                    onChange={(e) => setSelectedWinnerTeamId(e.target.value)}
                    className="w-full px-3 sm:px-3.5 py-3 bg-black/80 border-2 border-amber-400/70 text-white font-bold text-xs focus:outline-none focus:border-amber-300"
                  >
                    <option value="AUTO_LEADER">
                      🏆 Auto-Crown #1 Highest-Scoring Team on Leaderboard
                    </option>
                    {(adminState?.teams || []).map((t) => (
                      <option key={t.teamId} value={t.teamId}>
                        {t.teamName} ({t.teamId}) — {Number(t.credits || 0).toLocaleString()} CR (
                        {t.totalSolved || 0} Solved)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-4 space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                    🥈 Rank #2 — Runner-Up Vanguard
                  </label>
                  <select
                    value={selectedSecondWinnerTeamId}
                    onChange={(e) => setSelectedSecondWinnerTeamId(e.target.value)}
                    className="w-full px-3 sm:px-3.5 py-3 bg-black/80 border-2 border-slate-400/60 text-white font-bold text-xs focus:outline-none focus:border-slate-200"
                  >
                    <option value="AUTO_SECOND">
                      🥈 Auto-Crown #2 Second-Highest Team on Leaderboard
                    </option>
                    {(adminState?.teams || []).map((t) => (
                      <option key={t.teamId} value={t.teamId}>
                        {t.teamName} ({t.teamId}) — {Number(t.credits || 0).toLocaleString()} CR (
                        {t.totalSolved || 0} Solved)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-4 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleDeclareWinner(selectedWinnerTeamId, selectedSecondWinnerTeamId)
                    }
                    className="w-full py-3.5 px-4 sm:px-5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-[#111111] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] cursor-pointer shadow-[3px_3px_0px_#ffffff] inline-flex items-center justify-center gap-2 transition-all"
                  >
                    <Trophy className="w-4 h-4 shrink-0" />
                    <span>Proclaim Top 2 Winners</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 3. LOWER CONFIGURATION DECK: TOTAL ROUND TIME, NEXUS CORE & ARENA ECONOMY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {/* Left Card: Total Round Time Configuration & NEXUS Core Controls */}
              <div className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-4 sm:p-6 space-y-5 sm:space-y-6">
                <div className="border-b border-neutral-200 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#E11D2E]">
                    ROUND DURATION & NEXUS CORE
                  </span>
                  <h2 className="font-display text-2xl uppercase text-[#111111] mt-0.5">
                    Total Time & Core Vault Lock
                  </h2>
                </div>

                {/* Total Time Configuration (Presets + Custom Input + +/-5m) */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="font-bold uppercase text-neutral-700">
                    Configure Total Round Time (Minutes)
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {ROUND_TIME_PRESETS.map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => handleApplyTotalTime(mins)}
                        className={`px-3 py-1.5 border font-bold uppercase cursor-pointer ${
                          Number(customTimerMinutes) === mins
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-[#FAF9F5] text-[#111111] border-neutral-300 hover:border-[#111111]'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={600}
                      value={customTimerMinutes}
                      onChange={(e) => setCustomTimerMinutes(e.target.value)}
                      className="w-24 sm:w-28 px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyTotalTime(customTimerMinutes)}
                      className="px-3.5 sm:px-4 py-2 bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase cursor-pointer transition-colors"
                    >
                      Apply Total Time ({customTimerMinutes}m)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleEventCommand(
                          'ADJUST_TIMER',
                          { deltaSeconds: 300 },
                          '+5m added to clock'
                        )
                      }
                      className="px-3 py-2 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 font-bold uppercase cursor-pointer"
                    >
                      +5 Min
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleEventCommand(
                          'ADJUST_TIMER',
                          { deltaSeconds: -300 },
                          '-5m removed from clock'
                        )
                      }
                      className="px-3 py-2 bg-red-50 hover:bg-[#E11D2E] hover:text-white text-[#E11D2E] border border-red-200 font-bold uppercase cursor-pointer"
                    >
                      -5 Min
                    </button>
                  </div>
                </div>

                {/* NEXUS Core Lock / Unlock */}
                <div className="pt-4 border-t border-neutral-200 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase text-neutral-700">
                      NEXUS Final Core Status
                    </span>
                    <span
                      className={`px-2 py-0.5 font-bold uppercase ${
                        coreUnlocked
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {adminState?.coreStatus?.state || 'LOCKED'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEventCommand('LOCK', {}, 'NEXUS Core Locked')}
                      className="py-2.5 border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white font-bold uppercase cursor-pointer"
                    >
                      Lock Core
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEventCommand('UNLOCK', {}, 'NEXUS Core Unlocked')}
                      className="py-2.5 border-2 border-[#111111] bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase cursor-pointer"
                    >
                      Unlock Core
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEventCommand('REVEAL', {}, 'NEXUS Core Revealed')}
                      className="py-2.5 border-2 border-[#111111] bg-[#E11D2E] hover:bg-red-700 text-white font-bold uppercase cursor-pointer"
                    >
                      Reveal Core
                    </button>
                  </div>

                  {/* Classroom QR Code Hunt Answer Config */}
                  <div className="pt-3 border-t border-dashed border-neutral-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase text-neutral-700">
                        Classroom QR Solution Answer
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        CURRENT: <strong className="text-[#111111]">{adminState?.coreStatus?.expectedAnswer || 'NEXUS-OMEGA'}</strong>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coreAnswerInput}
                        onChange={(e) => setCoreAnswerInput(e.target.value)}
                        placeholder="ENTER NEW QR ANSWER..."
                        className="flex-1 px-3 py-1.5 bg-[#FAF9F5] border-2 border-[#111111] font-bold text-xs uppercase"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!coreAnswerInput.trim()) return;
                          handleEventCommand(
                            'SET_CORE_ANSWER',
                            { answer: coreAnswerInput.trim() },
                            `NEXUS Core QR Answer updated to: ${coreAnswerInput.trim().toUpperCase()}`
                          );
                          setCoreAnswerInput('');
                        }}
                        className="px-3 py-1.5 bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase cursor-pointer text-xs"
                      >
                        Set Answer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card: Economy Settings & Demo Reset Card */}
              <div className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-4 sm:p-6 space-y-5">
                <div className="border-b border-neutral-200 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#E11D2E]">
                    ARENA CONFIGURATION
                  </span>
                  <h2 className="font-display text-2xl uppercase text-[#111111] mt-0.5">
                    Economy & Arena Settings
                  </h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeAdminApi('/api/admin/settings', 'POST', settingsForm, {
                      key: 'save-settings',
                      successMessage: 'Saved global arena settings',
                    });
                  }}
                  className="space-y-4 font-mono text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold uppercase text-neutral-700 mb-1">
                        Default Starting Credits
                      </label>
                      <input
                        type="number"
                        value={settingsForm.startingCredits}
                        onChange={(e) =>
                          setSettingsForm((p) => ({
                            ...p,
                            startingCredits: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-neutral-700 mb-1">
                        Hint Cost (CR)
                      </label>
                      <input
                        type="number"
                        value={settingsForm.hintCost}
                        onChange={(e) =>
                          setSettingsForm((p) => ({ ...p, hintCost: Number(e.target.value) }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-neutral-700 mb-1">
                        Extra Time Cost (CR)
                      </label>
                      <input
                        type="number"
                        value={settingsForm.extraTimeCost}
                        onChange={(e) =>
                          setSettingsForm((p) => ({
                            ...p,
                            extraTimeCost: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-neutral-700 mb-1">
                        Extra Time (+Minutes)
                      </label>
                      <input
                        type="number"
                        value={settingsForm.extraTimeMinutes}
                        onChange={(e) =>
                          setSettingsForm((p) => ({
                            ...p,
                            extraTimeMinutes: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Projector / Arena Announcement Banner
                    </label>
                    <input
                      type="text"
                      value={settingsForm.arenaAnnouncement || ''}
                      onChange={(e) =>
                        setSettingsForm((p) => ({ ...p, arenaAnnouncement: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1 flex items-center justify-between">
                      <span>Global Challenge Timing Speed (Anti-AI Multiplier)</span>
                      <span className="text-[#E11D2E] font-mono font-bold">
                        {settingsForm.challengeTimingMultiplier || 1.0}×
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                      {[
                        { label: '0.75× Blitz (Anti-AI)', val: 0.75 },
                        { label: '1.0× Standard', val: 1.0 },
                        { label: '1.25× Relaxed', val: 1.25 },
                        { label: '1.5× Extended', val: 1.5 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() =>
                            setSettingsForm((p) => ({ ...p, challengeTimingMultiplier: preset.val }))
                          }
                          className={`py-1.5 px-2 border font-mono text-[10px] uppercase font-bold cursor-pointer transition-colors ${
                            Number(settingsForm.challengeTimingMultiplier) === preset.val
                              ? 'bg-[#E11D2E] text-white border-[#E11D2E]'
                              : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      step="0.05"
                      min="0.3"
                      max="3.0"
                      value={settingsForm.challengeTimingMultiplier ?? 1.0}
                      onChange={(e) =>
                        setSettingsForm((p) => ({
                          ...p,
                          challengeTimingMultiplier: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                    <span className="text-[10px] text-neutral-500 block mt-1">
                      Scales active question timer across all game types. 0.75× Blitz gives ~35s on GK and ~60s on Aptitude to block smartphone AI lookups while rewarding sharp human thinking.
                    </span>
                  </div>

                  {/* Tactical Diversity Rotation Limit */}
                  <div className="pt-3 border-t border-neutral-200">
                    <label className="block font-bold uppercase text-neutral-700 mb-1 flex items-center justify-between">
                      <span>Rotation Protocol // Max Consecutive Games of Same Engine</span>
                      <span className="text-[#E11D2E] font-mono font-bold">
                        {settingsForm.maxConsecutiveGames ?? 5} in a row
                      </span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settingsForm.maxConsecutiveGames ?? 5}
                      onChange={(e) =>
                        setSettingsForm((p) => ({
                          ...p,
                          maxConsecutiveGames: Math.max(1, Number(e.target.value)),
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                    <span className="text-[10px] text-neutral-500 block mt-1">
                      Prevents teams from grinding only one game (e.g. Sudoku). After playing this many in a row, a popup locks that engine until they play another game.
                    </span>
                  </div>

                  {/* Consecutive Solved Cooldown Timeout */}
                  <div className="pt-3 border-t border-neutral-200">
                    <label className="block font-bold uppercase text-neutral-700 mb-1 flex items-center justify-between">
                      <span>Cooldown Timeout // Lockout Duration After Every {settingsForm.maxConsecutiveGames ?? 5} Solved</span>
                      <span className="text-[#E11D2E] font-mono font-bold">
                        {settingsForm.consecutiveGamesCooldownMinutes ?? 5} min ({ (settingsForm.consecutiveGamesCooldownMinutes ?? 5) * 60 }s)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      step="1"
                      value={settingsForm.consecutiveGamesCooldownMinutes ?? 5}
                      onChange={(e) => {
                        const mins = Math.max(1, Number(e.target.value));
                        setSettingsForm((p) => ({
                          ...p,
                          consecutiveGamesCooldownMinutes: mins,
                          consecutiveGamesCooldownSeconds: mins * 60,
                        }));
                      }}
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                    <span className="text-[10px] text-neutral-500 block mt-1">
                      After every {settingsForm.maxConsecutiveGames ?? 5} questions solved of the same game engine, squads are locked out from playing that engine for this duration (default 5 minutes). Configurable per competition requirements.
                    </span>
                  </div>

                  {/* Per-Game Engine Baseline Timings */}
                  <div className="pt-4 border-t border-neutral-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase text-[#E11D2E] block">
                          GAME ENGINE DURATION CONFIGURATION
                        </span>
                        <h4 className="font-bold uppercase text-neutral-800 text-sm">
                          Time Limit Per Game (Overall Engine Duration)
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSettingsForm((p) => ({
                              ...p,
                              gameTimings: {
                                sudoku: 300,
                                patches: 210,
                                zip: 210,
                                queens: 210,
                                memoryMatrix: 180,
                                connect4: 210,
                                xo4x4: 210,
                                wordGuess: 180,
                                wend: 180,
                                aptitude: 210,
                                gkTrueFalse: 100,
                              },
                            }));
                          }}
                          className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-300 text-[10px] font-bold uppercase cursor-pointer"
                        >
                          Reset Default
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSettingsForm((p) => {
                              const updated = {};
                              for (const [k, v] of Object.entries(p.gameTimings || {})) {
                                updated[k] = Math.round(Number(v) * 1.3);
                              }
                              return { ...p, gameTimings: updated };
                            });
                          }}
                          className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-300 text-[10px] font-bold uppercase cursor-pointer"
                        >
                          +30% Relaxed
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSettingsForm((p) => {
                              const updated = {};
                              for (const [k, v] of Object.entries(p.gameTimings || {})) {
                                updated[k] = Math.max(30, Math.round(Number(v) * 0.7));
                              }
                              return { ...p, gameTimings: updated };
                            });
                          }}
                          className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-300 text-[10px] font-bold uppercase cursor-pointer"
                        >
                          -30% Blitz
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-600">
                      Configure baseline time in seconds for each game. Difficulty scaling automatically applies: LOW = 0.8×, MODERATE = 1.0×, HIGH = 1.25×, EXTREME = 1.5×.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto p-1 border border-neutral-200 bg-[#FAF9F5]">
                      {[
                        { id: 'sudoku', label: 'Sudoku', defaultSec: 300 },
                        { id: 'patches', label: 'Patches', defaultSec: 210 },
                        { id: 'zip', label: 'Zip Grid', defaultSec: 210 },
                        { id: 'queens', label: 'N-Queens', defaultSec: 210 },
                        { id: 'memoryMatrix', label: 'Memory Matrix', defaultSec: 180 },
                        { id: 'connect4', label: 'Connect 4', defaultSec: 210 },
                        { id: 'xo4x4', label: 'XO 4x4', defaultSec: 210 },
                        { id: 'wordGuess', label: 'Word Guess', defaultSec: 180 },
                        { id: 'wend', label: 'Wend (Wordle)', defaultSec: 180 },
                        { id: 'aptitude', label: 'Aptitude MCQ', defaultSec: 210 },
                        { id: 'gkTrueFalse', label: 'GK True/False', defaultSec: 100 },
                      ].map((engine) => {
                        const currentVal =
                          settingsForm.gameTimings?.[engine.id] ?? engine.defaultSec;
                        const activeCount =
                          adminState?.monitor?.activeTeamsPerGame?.[engine.id] || 0;
                        const minsStr =
                          currentVal >= 60
                            ? `${Math.floor(currentVal / 60)}m ${
                                currentVal % 60 > 0 ? `${currentVal % 60}s` : ''
                              }`.trim()
                            : `${currentVal}s`;

                        return (
                          <div
                            key={engine.id}
                            className="p-2.5 bg-white border border-neutral-300 space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold uppercase text-neutral-900 truncate">
                                {engine.label}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {activeCount > 0 && (
                                  <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded">
                                    {activeCount} squads
                                  </span>
                                )}
                                <span className="text-[10px] font-mono font-bold text-[#E11D2E]">
                                  {minsStr}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="20"
                                max="1800"
                                step="10"
                                value={currentVal}
                                onChange={(e) => {
                                  const val = Math.max(20, Number(e.target.value));
                                  setSettingsForm((p) => ({
                                    ...p,
                                    gameTimings: {
                                      ...(p.gameTimings || {}),
                                      [engine.id]: val,
                                    },
                                  }));
                                }}
                                className="w-full px-2 py-1 bg-[#FAF9F5] border border-neutral-300 font-mono text-xs font-bold"
                              />
                              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                                sec
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase cursor-pointer transition-colors"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =======================================================================
          MODAL 1: EDIT TEAM ROSTER (SOLO / DUO / TRIO / SQUAD MAX 4)
         ======================================================================= */}
      <AnimatePresence>
        {editingTeamModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setEditingTeamModal(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-[#111111] shadow-[6px_6px_0px_#111111] max-w-lg w-full p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#E11D2E]">
                    TEAM CONFIGURATION
                  </span>
                  <h3 className="font-display text-2xl uppercase text-[#111111]">
                    Edit {editingTeamModal.teamId}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingTeamModal(null)}
                  className="font-mono text-sm font-bold text-neutral-500 hover:text-[#111111] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const membersPayload = Array.from(
                    { length: editingTeamModal.teamSize },
                    (_, idx) => ({
                      memberId: `OP-0${idx + 1}`,
                      name: (
                        editingTeamModal.members[idx] ||
                        (idx === 0 ? 'PLAYER 1 (LEAD)' : `PLAYER ${idx + 1}`)
                      )
                        .trim()
                        .toUpperCase(),
                      role: idx === 0 ? 'LEAD' : 'OPERATIVE',
                    })
                  );
                  await handleTeamAction(
                    editingTeamModal.teamId,
                    'UPDATE_TEAM_MEMBERS',
                    {
                      teamName: editingTeamModal.teamName,
                      password: editingTeamModal.password || undefined,
                      teamSize: editingTeamModal.teamSize,
                      members: membersPayload,
                    },
                    `Updated ${editingTeamModal.teamId} (${editingTeamModal.teamSize}P)`
                  );
                  setEditingTeamModal(null);
                }}
                className="space-y-4 font-mono text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Team Name
                    </label>
                    <input
                      type="text"
                      value={editingTeamModal.teamName}
                      onChange={(e) =>
                        setEditingTeamModal((p) => ({
                          ...p,
                          teamName: e.target.value.toUpperCase(),
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] font-bold uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      New Password (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingTeamModal.password}
                      onChange={(e) =>
                        setEditingTeamModal((p) => ({ ...p, password: e.target.value }))
                      }
                      placeholder="Leave blank to keep current"
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1.5">
                    Team Format (Solo · Duo · Trio · Max 4)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {TEAM_SIZE_MODES.map((m) => (
                      <button
                        key={m.size}
                        type="button"
                        onClick={() =>
                          setEditingTeamModal((p) => ({ ...p, teamSize: m.size }))
                        }
                        className={`py-2 font-bold uppercase border-2 cursor-pointer ${
                          editingTeamModal.teamSize === m.size
                            ? 'bg-[#E11D2E] text-white border-[#111111]'
                            : 'bg-white text-neutral-700 border-neutral-300'
                        }`}
                      >
                        {m.tag} ({m.size})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Array.from({ length: editingTeamModal.teamSize }, (_, idx) => (
                    <div key={idx}>
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                        Player {idx + 1} {idx === 0 ? '(Lead)' : ''}
                      </label>
                      <input
                        type="text"
                        value={editingTeamModal.members[idx] || ''}
                        onChange={(e) => {
                          const next = [...editingTeamModal.members];
                          next[idx] = e.target.value;
                          setEditingTeamModal((p) => ({ ...p, members: next }));
                        }}
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111] uppercase"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingTeamModal(null)}
                    className="px-4 py-2 border border-[#111111] bg-white font-bold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 border-2 border-[#111111] bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase cursor-pointer"
                  >
                    Save Team
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================================================
          MODAL 2: SIMPLE CHALLENGE CREATE / EDIT MODAL
         ======================================================================= */}
      <AnimatePresence>
        {editingChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setEditingChallenge(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-[#111111] shadow-[6px_6px_0px_#111111] max-w-xl w-full p-6 space-y-4 my-8"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="font-display text-2xl uppercase text-[#111111]">
                  {editingChallenge === 'NEW'
                    ? 'Create Challenge'
                    : `Edit ${challengeForm.challengeId}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingChallenge(null)}
                  className="font-mono text-sm font-bold text-neutral-500 hover:text-[#111111] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveChallenge} className="space-y-3.5 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={challengeForm.title}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, title: e.target.value.toUpperCase() }))
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Game Type *
                    </label>
                    <select
                      value={challengeForm.gameType}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, gameType: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] font-bold"
                    >
                      {CANONICAL_GAME_TYPES.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={challengeForm.description}
                    onChange={(e) =>
                      setChallengeForm((p) => ({ ...p, description: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-neutral-300 focus:border-[#111111]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Cost (CR)
                    </label>
                    <input
                      type="number"
                      value={challengeForm.cost}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, cost: Number(e.target.value) }))
                      }
                      className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Reward (CR)
                    </label>
                    <input
                      type="number"
                      value={challengeForm.reward}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, reward: Number(e.target.value) }))
                      }
                      className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Penalty (CR)
                    </label>
                    <input
                      type="number"
                      value={challengeForm.penalty}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, penalty: Number(e.target.value) }))
                      }
                      className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Time (Sec)
                    </label>
                    <input
                      type="number"
                      value={challengeForm.timeLimit}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, timeLimit: Number(e.target.value) }))
                      }
                      className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Category
                    </label>
                    <select
                      value={challengeForm.category}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, category: e.target.value }))
                      }
                      className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300"
                    >
                      {CANONICAL_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={challengeForm.difficulty}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, difficulty: e.target.value }))
                      }
                      className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300"
                    >
                      {CANONICAL_DIFFICULTIES.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Risk
                    </label>
                    <select
                      value={challengeForm.risk}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, risk: e.target.value }))
                      }
                      className="w-full px-2.5 py-2 bg-[#FAF9F5] border border-neutral-300"
                    >
                      {CANONICAL_RISKS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedJson((v) => !v)}
                    className="text-[11px] text-neutral-500 hover:text-[#111111] underline cursor-pointer"
                  >
                    {showAdvancedJson
                      ? 'Hide Advanced Game Config JSON'
                      : 'Show Advanced Game Config JSON'}
                  </button>
                  {showAdvancedJson && (
                    <textarea
                      rows={5}
                      value={challengeForm.gameConfigText}
                      onChange={(e) =>
                        setChallengeForm((p) => ({ ...p, gameConfigText: e.target.value }))
                      }
                      className="w-full mt-2 p-2.5 bg-[#FAF9F5] border border-neutral-300 font-mono text-[11px]"
                    />
                  )}
                </div>

                {challengeFormError && (
                  <div className="p-2 bg-red-50 border border-[#E11D2E] text-[#E11D2E]">
                    {challengeFormError}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingChallenge(null)}
                    className="px-4 py-2 border border-[#111111] bg-white font-bold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 border-2 border-[#111111] bg-[#E11D2E] hover:bg-[#111111] text-white font-bold uppercase cursor-pointer"
                  >
                    Save Challenge
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================================================
          MODAL 3: PASSWORD-PROTECTED GLOBAL RESET TO ZERO
         ======================================================================= */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => !resetSubmitting && setShowResetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0B0C10] text-white border-2 border-[#E11D2E] shadow-[6px_6px_0px_#E11D2E] p-6 font-mono space-y-4"
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/15 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E11D2E]">
                    SECURITY AUTHORIZATION REQUIRED
                  </span>
                  <h3 className="font-display text-2xl uppercase text-white mt-0.5">
                    Global Arena Reset to Zero
                  </h3>
                </div>
                <Lock className="w-5 h-5 text-[#E11D2E] shrink-0 mt-1" />
              </div>

              <div className="p-3 bg-red-950/40 border border-[#E11D2E]/50 text-xs text-white/85 space-y-1.5 leading-relaxed">
                <p className="font-bold text-red-300 uppercase">
                  Warning — This action resets the entire arena:
                </p>
                <ul className="list-disc list-inside text-[11px] text-white/75 space-y-0.5">
                  <li>Every team restores to 0 solved, 0 failed & starting credits</li>
                  <li>Every solved/failed problem becomes solvable again</li>
                  <li>All active attempts & transaction history are wiped</li>
                  <li>Round timer resets to standby & winner banner clears</li>
                </ul>
              </div>

              <form onSubmit={handleConfirmGlobalReset} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Enter Admin Password to Confirm Reset *
                  </label>
                  <input
                    type="password"
                    autoFocus
                    value={resetPasswordInput}
                    onChange={(e) => {
                      setResetPasswordInput(e.target.value);
                      if (resetPasswordError) setResetPasswordError('');
                    }}
                    placeholder="Enter Admin Access Key (e.g. NEXUS-ADMIN-2026)..."
                    className="w-full px-3.5 py-2.5 bg-black border-2 border-white/30 focus:border-[#E11D2E] text-white font-bold text-xs focus:outline-none"
                  />
                </div>

                {resetPasswordError && (
                  <div className="p-2.5 bg-red-950/90 border border-[#E11D2E] text-red-200 text-xs font-bold">
                    {resetPasswordError}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    disabled={resetSubmitting}
                    onClick={() => setShowResetModal(false)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold uppercase cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetSubmitting}
                    className="px-5 py-2.5 bg-[#E11D2E] hover:bg-red-600 disabled:opacity-50 text-white border border-[#E11D2E] text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#ffffff] transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{resetSubmitting ? 'Resetting...' : 'Confirm Reset All to 0'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAME RECORDING & ANOMALY DETECTION REPORT MODAL */}
      <AdminRecordingModal
        isOpen={showRecordingModal}
        onClose={() => setShowRecordingModal(false)}
        recordingState={adminState?.recording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        onClearRecordings={handleClearRecordings}
        onRefresh={() => fetchAdminState(token)}
        pending={
          pendingKey === 'recording-start' ||
          pendingKey === 'recording-stop' ||
          loadingState
        }
      />
    </div>
  );
};

export default AdminControlPage;
