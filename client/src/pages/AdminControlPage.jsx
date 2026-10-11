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
} from 'lucide-react';
import { socketClient, NEXUS_SOCKET_EVENTS as SOCKET_EVENTS } from '../socket/socketClient';
import { GamePreviewThumbnail } from '../components/GamePreviewThumbnail';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import {
  getFriendlyChallengeTitle,
  getFriendlyChallengeDescription,
} from '../components/ChallengeMarketModule';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.port !== '5173'
    ? window.location.origin
    : 'http://localhost:5050');

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
];

const TEAM_SIZE_MODES = [
  { size: 1, tag: 'SOLO', label: 'Solo (1 Player)' },
  { size: 2, tag: 'DUO', label: 'Duo (2 Players)' },
  { size: 3, tag: 'TRIO', label: 'Trio (3 Players)' },
  { size: 4, tag: 'SQUAD', label: 'Squad (Max 4)' },
];

const ROUND_TIME_PRESETS = [30, 45, 60, 90, 120, 135];

const NAV_TABS = [
  { path: '/admin/teams', id: 'teams', label: 'Teams', icon: Users },
  { path: '/admin/attempts', id: 'attempts', label: 'Live Events', icon: Activity },
  { path: '/admin/challenges', id: 'challenges', label: 'Challenges', icon: Gamepad2 },
  { path: '/admin/events', id: 'events', label: 'Round & Settings', icon: Sliders },
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
  const [loginId, setLoginId] = useState('ADMIN-NEXUS');
  const [loginPassword, setLoginPassword] = useState('NEXUS-ADMIN-2026');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

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
  const lastSyncedTotalSecRef = useRef(null);
  const [settingsForm, setSettingsForm] = useState({
    startingCredits: 1500,
    hintCost: 120,
    extraTimeCost: 150,
    extraTimeMinutes: 5,
    reattemptMultiplier: 1.25,
    arenaAnnouncement: 'ALL SECTORS NOMINAL // RESISTANCE OPERATIVES ACTIVE',
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

    if (status === 'ACTIVE' && gt.targetTimestamp) {
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

  // Determine active route section
  const activeTabId = useMemo(() => {
    const p = location.pathname.replace(/\/+$/, '');
    if (p === '/admin/challenges') return 'challenges';
    if (p === '/admin/attempts') return 'attempts';
    if (p === '/admin/events' || p === '/admin/settings') return 'events';
    return 'teams';
  }, [location.pathname]);

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

  // Filtered challenges
  const filteredChallenges = useMemo(() => {
    const list = adminState?.challenges || [];
    return list.filter((chg) => {
      if (challengeCategoryFilter !== 'ALL' && chg.category !== challengeCategoryFilter)
        return false;
      if (!challengeSearch.trim()) return true;
      const q = challengeSearch.trim().toLowerCase();
      const friendlyTitle = getFriendlyChallengeTitle(chg).toLowerCase();
      return (
        String(chg.challengeId || '')
          .toLowerCase()
          .includes(q) ||
        String(chg.title || '')
          .toLowerCase()
          .includes(q) ||
        friendlyTitle.includes(q) ||
        String(chg.gameType || '')
          .toLowerCase()
          .includes(q)
      );
    });
  }, [adminState?.challenges, challengeCategoryFilter, challengeSearch]);

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
        body: JSON.stringify(body),
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
          } else if (cmd === 'LOCK' || cmd === 'CORE_LOCK') {
            next.coreStatus = { ...(prev.coreStatus || {}), state: 'LOCKED' };
          } else if (
            cmd === 'UNLOCK' ||
            cmd === 'CORE_UNLOCK' ||
            cmd === 'REVEAL' ||
            cmd === 'CORE_REVEAL'
          ) {
            next.coreStatus = { ...(prev.coreStatus || {}), state: 'AVAILABLE' };
          }
          return next;
        },
      }
    );
  };

  // Dedicated helpers for Round Start, Pause/Resume, End, and Total Time
  const handleStartRound = () => {
    const mins = Math.max(1, Number(customTimerMinutes) || 135);
    const durSec = mins * 60;
    handleEventCommand(
      'START',
      { durationSeconds: durSec, minutes: mins },
      `Round Started (${mins} mins total)`
    );
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
    handleEventCommand('END', {}, 'Round Ended (00:00:00)');
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

          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Quick Fill Credentials:
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setLoginId('ADMIN-NEXUS');
                  setLoginPassword('NEXUS-ADMIN-2026');
                }}
                className={`text-left p-2.5 border text-xs transition-colors cursor-pointer ${
                  loginId === 'ADMIN-NEXUS'
                    ? 'border-[#E11D2E] bg-red-50/70 text-[#111111]'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <div className="font-mono font-bold text-[11px] text-[#E11D2E]">ADMIN-NEXUS</div>
                <div className="text-[11px] text-neutral-500">Event Organizer</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginId('VOLUNTEER-01');
                  setLoginPassword('NEXUS-VOL-2026');
                }}
                className={`text-left p-2.5 border text-xs transition-colors cursor-pointer ${
                  loginId === 'VOLUNTEER-01'
                    ? 'border-[#E11D2E] bg-red-50/70 text-[#111111]'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <div className="font-mono font-bold text-[11px] text-amber-700">VOLUNTEER-01</div>
                <div className="text-[11px] text-neutral-500">Floor Volunteer</div>
              </button>
            </div>
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
      {/* 1. CLEAN TOP BAR + ALWAYS-VISIBLE ROUND TIMER & TOTAL TIME CONTROLLER */}
      <header
        ref={globalEventBannerRef}
        className="sticky top-0 z-30 bg-white border-b-2 border-[#111111] shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-3">
          {/* Top Row: Brand + Quick Stats + Links */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#E11D2E]" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl tracking-wide uppercase text-[#111111]">
                    CYBER QUEST ADMIN
                  </span>
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
              </div>
              <div className="hidden md:flex items-center gap-2 ml-3 pl-3 border-l border-neutral-200 font-mono text-xs">
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 font-bold">
                  {totalTeams} Teams ({onlineTeamsCount} Online)
                </span>
                <span className="px-2 py-0.5 bg-red-50 text-[#E11D2E] border border-red-200 font-bold">
                  {activeAttemptsCount} Playing Now
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
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
                className="px-2.5 py-1.5 bg-white border border-neutral-300 hover:border-[#111111] font-bold text-[#111111]"
              >
                Projector
              </Link>
              <Link
                to="/dashboard"
                className="px-2.5 py-1.5 bg-white border border-neutral-300 hover:border-[#111111] font-bold text-[#111111]"
              >
                Portal
              </Link>
              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-2.5 py-1.5 bg-neutral-100 hover:bg-[#111111] hover:text-white border border-neutral-300 font-bold cursor-pointer transition-colors inline-flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Exit
              </button>
            </div>
          </div>

          {/* Second Row: Round Start / Pause / End + Total Time Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF9F5] border-2 border-[#111111] px-3.5 py-2.5 font-mono text-xs">
            {/* Time Remaining + Total Time Readout */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E11D2E]" />
                <div>
                  <div className="text-[10px] font-bold uppercase text-neutral-500">
                    Time Remaining
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg tracking-wider text-[#111111]">
                      {liveGlobalTimer.formatted}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                        liveGlobalTimer.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : liveGlobalTimer.status === 'ENDED'
                            ? 'bg-red-100 text-[#E11D2E]'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {liveGlobalTimer.status === 'ACTIVE'
                        ? 'RUNNING'
                        : liveGlobalTimer.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pl-4 border-l border-neutral-300">
                <div className="text-[10px] font-bold uppercase text-neutral-500">
                  Total Round Time
                </div>
                <div className="font-bold text-sm text-[#111111]">
                  {liveGlobalTimer.totalDurationMinutes}m ({liveGlobalTimer.totalFormatted})
                </div>
              </div>

              {/* Inline Total Time Setter */}
              <div className="flex items-center gap-1.5 pl-4 border-l border-neutral-300">
                <label className="text-[10px] font-bold uppercase text-neutral-600">
                  Total (Min):
                </label>
                <input
                  type="number"
                  min={1}
                  max={600}
                  value={customTimerMinutes}
                  onChange={(e) => setCustomTimerMinutes(e.target.value)}
                  className="w-16 px-2 py-1 bg-white border border-[#111111] font-bold text-xs text-[#111111]"
                />
                <button
                  type="button"
                  onClick={() => handleApplyTotalTime(customTimerMinutes)}
                  className="px-2.5 py-1 bg-white hover:bg-[#111111] hover:text-white border border-[#111111] font-bold uppercase text-[11px] cursor-pointer transition-colors"
                >
                  Set Total
                </button>
              </div>
            </div>

            {/* Round Start / Pause / End + Core Lock/Unlock Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleStartRound}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-[11px] inline-flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#111111]"
                title="Start or Restart Round with the configured Total Time"
              >
                <Play className="w-3.5 h-3.5" />
                Start Round
              </button>

              <button
                type="button"
                onClick={handlePauseOrResumeRound}
                className={`px-3 py-1.5 font-bold uppercase text-[11px] inline-flex items-center gap-1.5 cursor-pointer border border-[#111111] ${
                  liveGlobalTimer.status === 'ACTIVE'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-white hover:bg-neutral-100 text-[#111111]'
                }`}
              >
                {liveGlobalTimer.status === 'ACTIVE' ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Resume
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleEndRound}
                disabled={liveGlobalTimer.status === 'ENDED'}
                className="px-3 py-1.5 bg-[#E11D2E] hover:bg-red-700 disabled:opacity-40 text-white font-bold uppercase text-[11px] inline-flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#111111]"
              >
                <Square className="w-3.5 h-3.5" />
                End Round
              </button>

              <button
                type="button"
                onClick={() => handleEventCommand(coreUnlocked ? 'LOCK' : 'UNLOCK')}
                className={`px-3 py-1.5 font-bold uppercase text-[11px] inline-flex items-center gap-1.5 border border-[#111111] cursor-pointer transition-colors ${
                  coreUnlocked
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-white text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {coreUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-600" /> Core Open
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-neutral-500" /> Core Locked
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 pt-1 overflow-x-auto">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTabId === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase transition-colors border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-[#E11D2E] text-[#E11D2E] bg-red-50/60'
                      : 'border-transparent text-neutral-600 hover:text-[#111111] hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === 'teams' && (
                    <span className="px-1.5 py-0.2 bg-neutral-200 text-[#111111] text-[10px]">
                      {totalTeams}
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
            {/* Collapsible Register New Team Card */}
            <section className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
              <div
                onClick={() => setShowRegisterForm((v) => !v)}
                className="px-5 py-3.5 bg-[#FAF9F5] flex items-center justify-between cursor-pointer select-none"
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

              {showRegisterForm && (
                <form
                  onSubmit={handleRegisterTeam}
                  className="p-5 border-t-2 border-[#111111] space-y-4 font-mono text-xs"
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
                const isOnline = Boolean(team.connectionState?.connected);
                const activeAttempt =
                  team.activeAttempt?.status === 'IN_PROGRESS' ? team.activeAttempt : null;
                const attemptClock = getLiveAttemptClock(activeAttempt);
                const customVal = customCreditInputs[team.teamId] ?? '';

                return (
                  <div
                    key={team.teamId}
                    className={`bg-white border-2 p-4 flex flex-col justify-between gap-3.5 transition-colors ${
                      activeAttempt
                        ? 'border-[#E11D2E] shadow-[4px_4px_0px_#E11D2E]'
                        : 'border-[#111111] shadow-[4px_4px_0px_#111111]'
                    }`}
                  >
                    {/* Card Header: Team Name, ID, Format Badge, Actions */}
                    <div className="flex items-start justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              isOnline ? 'bg-emerald-500' : 'bg-neutral-400'
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
                        <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-2">
                          <span>{team.teamId}</span>
                          <span>·</span>
                          <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                        </div>
                      </div>

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
                    </div>

                    {/* Credits Balance + Solved/Failed + Player Roster */}
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

                      {/* Players List */}
                      <div className="flex flex-wrap gap-1.5">
                        {(team.members || []).slice(0, formatInfo.size).map((m, idx) => (
                          <span
                            key={m.memberId || idx}
                            className="px-2 py-0.5 bg-[#FAF9F5] border border-neutral-300 text-[10px] font-bold uppercase text-neutral-700"
                          >
                            P{idx + 1}: {m.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Credit Presets + Custom CR Input (+ Add / - Deduct / Set) */}
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
            <div className="bg-white border-2 border-[#111111] p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl uppercase text-[#111111]">
                  Challenge Market Catalog
                </h2>
                <p className="text-xs font-mono text-neutral-600">
                  Enable or disable games and edit entry cost, reward, or time limit.
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChallenges.map((chg) => {
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
                          <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-700">
                            {chg.category} · {chg.difficulty}
                          </span>
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
            TAB 4: ROUND & SETTINGS (/admin/events)
           ======================================================================= */}
        {activeTabId === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Round Timer & Total Time Control Card */}
            <div className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 space-y-5">
              <div className="border-b border-neutral-200 pb-3">
                <span className="font-mono text-[10px] font-bold uppercase text-[#E11D2E]">
                  ROUND CLOCK & TOTAL TIME
                </span>
                <h2 className="font-display text-2xl uppercase text-[#111111] mt-0.5">
                  Round Start, End & Total Time
                </h2>
              </div>

              {/* Live Readout Box */}
              <div className="p-4 bg-[#FAF9F5] border-2 border-[#111111] space-y-3">
                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="bg-white p-3 border border-neutral-300">
                    <div className="text-[10px] font-bold uppercase text-neutral-500">
                      Time Remaining
                    </div>
                    <div className="font-display text-3xl text-[#111111] mt-0.5">
                      {liveGlobalTimer.formatted}
                    </div>
                  </div>
                  <div className="bg-white p-3 border border-neutral-300">
                    <div className="text-[10px] font-bold uppercase text-neutral-500">
                      Total Round Time
                    </div>
                    <div className="font-display text-3xl text-[#111111] mt-0.5">
                      {liveGlobalTimer.totalFormatted}
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      ({liveGlobalTimer.totalDurationMinutes} mins)
                    </div>
                  </div>
                  <div className="bg-white p-3 border border-neutral-300">
                    <div className="text-[10px] font-bold uppercase text-neutral-500">
                      Elapsed Time
                    </div>
                    <div className="font-display text-3xl text-neutral-700 mt-0.5">
                      {liveGlobalTimer.elapsedFormatted}
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      ({liveGlobalTimer.progressPercent}%)
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-neutral-200 border border-[#111111] overflow-hidden">
                  <div
                    className="h-full bg-[#E11D2E] transition-all duration-500"
                    style={{ width: `${liveGlobalTimer.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Start / Pause / End Primary Buttons */}
              <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={handleStartRound}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase cursor-pointer shadow-[2px_2px_0px_#111111] inline-flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4 h-4" /> Start Round
                </button>
                <button
                  type="button"
                  onClick={handlePauseOrResumeRound}
                  className="py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase cursor-pointer shadow-[2px_2px_0px_#111111] inline-flex items-center justify-center gap-1.5"
                >
                  {liveGlobalTimer.status === 'ACTIVE' ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause Round
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> Resume Round
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleEndRound}
                  className="py-3 bg-[#E11D2E] hover:bg-red-700 text-white font-bold uppercase cursor-pointer shadow-[2px_2px_0px_#111111] inline-flex items-center justify-center gap-1.5"
                >
                  <Square className="w-4 h-4" /> End Round
                </button>
              </div>

              {/* Total Time Configuration (Presets + Custom Input + +/-5m) */}
              <div className="space-y-3 pt-2 border-t border-neutral-200 font-mono text-xs">
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
                    className="w-28 px-3 py-2 bg-[#FAF9F5] border-2 border-[#111111] font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyTotalTime(customTimerMinutes)}
                    className="px-4 py-2 bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase cursor-pointer transition-colors"
                  >
                    Apply Total Time ({customTimerMinutes}m)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleEventCommand('ADJUST_TIMER', { deltaSeconds: 300 }, '+5m added to clock')
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
                <div className="grid grid-cols-3 gap-2">
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
              </div>
            </div>

            {/* Economy Settings & Demo Reset Card */}
            <div className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 space-y-5">
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
                <div className="grid grid-cols-2 gap-3">
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

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#111111] hover:bg-[#E11D2E] text-white font-bold uppercase cursor-pointer transition-colors"
                  >
                    Save Settings
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset all demo teams and sessions to initial state?')) {
                        executeAdminApi(
                          '/api/admin/settings',
                          'POST',
                          { resetAllDemoState: true },
                          {
                            key: 'reset-all',
                            successMessage: 'Reset all demo teams to initial state',
                          }
                        );
                      }
                    }}
                    className="px-4 py-2.5 bg-red-50 hover:bg-[#E11D2E] hover:text-white text-[#E11D2E] border border-[#E11D2E] font-bold uppercase cursor-pointer transition-colors"
                  >
                    Reset All Demo State
                  </button>
                </div>
              </form>
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
    </div>
  );
};

export default AdminControlPage;
