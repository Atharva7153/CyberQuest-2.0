import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { socketClient, NEXUS_SOCKET_EVENTS as SOCKET_EVENTS } from '../socket/socketClient';
import { RiskBadge } from '../components/RiskBadge';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.port !== '5173'
    ? window.location.origin
    : 'http://localhost:5050');
const ADMIN_TOKEN_KEY = 'nexus_admin_token';
const ADMIN_OPERATOR_KEY = 'nexus_admin_operator';

const CANONICAL_CATEGORIES = ['LOGIC', 'PUZZLES', 'OBSERVATION', 'KNOWLEDGE', 'TECHNICAL'];
const CANONICAL_DIFFICULTIES = ['STANDARD', 'MODERATE', 'ELEVATED', 'EXTREME'];
const CANONICAL_RISKS = ['SAFE', 'BALANCED', 'AGGRESSIVE'];
const CANONICAL_GAME_TYPES = [
  'sudoku',
  'xo4x4',
  'wend',
  'patches',
  'zip',
  'wordGuess',
  'connect4',
  'xo',
  'pattern',
  'imageObservation',
  'quiz',
  'aptitude',
  'algorithm',
  'programmingLogic',
  'systemProblem',
];

const NAV_TABS = [
  { path: '/admin', id: 'monitor', label: '01 // LIVE MONITOR' },
  { path: '/admin/teams', id: 'teams', label: '02 // TEAMS' },
  { path: '/admin/challenges', id: 'challenges', label: '03 // CHALLENGES' },
  { path: '/admin/attempts', id: 'attempts', label: '04 // ATTEMPTS' },
  { path: '/admin/events', id: 'events', label: '05 // EVENT & CORE' },
  { path: '/admin/settings', id: 'settings', label: '06 // SETTINGS' },
];

const formatDurationClock = (seconds) => {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
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

const EMPTY_CHALLENGE_FORM = {
  challengeId: '',
  title: '',
  category: 'TECHNICAL',
  description: '',
  difficulty: 'MODERATE',
  risk: 'BALANCED',
  cost: 300,
  reward: 650,
  penalty: 75,
  timeLimit: 900,
  gameType: 'wend',
  expectedAnswer: 'NEXUS',
  gameConfigText: JSON.stringify(
    {
      prompt: 'Enter the tactical authentication code to verify module completion.',
      maxHints: 2,
    },
    null,
    2
  ),
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
  const [actionBusy, setActionBusy] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Live 1s ticker for global timer & active session countdowns
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [serverOffsetMs, setServerOffsetMs] = useState(0);

  // Team Control UI state
  const [teamSearch, setTeamSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('ALL');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [creditAdjustDelta, setCreditAdjustDelta] = useState(250);
  const [creditAdjustReason, setCreditAdjustReason] = useState('ADMIN TACTICAL ADJUSTMENT');

  // Challenge Control UI state
  const [challengeSearch, setChallengeSearch] = useState('');
  const [challengeCategoryFilter, setChallengeCategoryFilter] = useState('ALL');
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [challengeForm, setChallengeForm] = useState(EMPTY_CHALLENGE_FORM);
  const [challengeFormError, setChallengeFormError] = useState('');

  // Attempts Filter state
  const [attemptStatusFilter, setAttemptStatusFilter] = useState('ALL');
  const [attemptSearch, setAttemptSearch] = useState('');

  // Event Control UI state
  const [customTimerMinutes, setCustomTimerMinutes] = useState(135);
  const [lastGlobalCommand, setLastGlobalCommand] = useState(null);
  const [auditActionFilter, setAuditActionFilter] = useState('ALL');

  // Settings Form state
  const [settingsForm, setSettingsForm] = useState({
    startingCredits: 1500,
    hintCost: 120,
    extraTimeCost: 150,
    extraTimeMinutes: 5,
    reattemptMultiplier: 1.25,
    arenaAnnouncement: 'ALL SECTORS NOMINAL // RESISTANCE OPERATIVES ACTIVE',
  });

  // GSAP refs ONLY for important global event actions
  const globalEventBannerRef = useRef(null);
  const globalEventPulseBarRef = useRef(null);

  const showToast = useCallback((message, tone = 'info') => {
    setFeedbackToast({ id: Date.now(), message, tone });
  }, []);

  useEffect(() => {
    if (!feedbackToast) return undefined;
    const t = setTimeout(() => setFeedbackToast(null), 4000);
    return () => clearTimeout(t);
  }, [feedbackToast]);

  // GSAP animation triggered ONLY for important global event actions (START, PAUSE, RESUME, END, CORE LOCK/UNLOCK/REVEAL)
  const triggerGlobalEventActionGsap = useCallback((commandLabel, tone = 'red') => {
    setLastGlobalCommand({
      command: commandLabel,
      tone,
      timestamp: new Date().toISOString(),
    });

    if (!globalEventBannerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.killTweensOf([globalEventBannerRef.current, globalEventPulseBarRef.current]);
      gsap.fromTo(
        globalEventBannerRef.current,
        { opacity: 0.35, y: -6 },
        { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
      );
      if (globalEventPulseBarRef.current) {
        gsap.fromTo(
          globalEventPulseBarRef.current,
          { scaleX: 0, transformOrigin: 'left center', opacity: 1 },
          { scaleX: 1, opacity: 0.25, duration: 0.65, ease: 'expo.out' }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const applyServerState = useCallback((data) => {
    if (!data) return;
    setAdminState(data);
    if (data.serverTime) {
      const parsed = new Date(data.serverTime).getTime();
      if (!Number.isNaN(parsed)) {
        setServerOffsetMs(parsed - Date.now());
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
    async (overrideToken = token) => {
      if (!overrideToken) return;
      setLoadingState(true);
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
        showToast(`Failed to sync admin state: ${err.message}`, 'error');
      } finally {
        setLoadingState(false);
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

    const handleAdminEventAction = (payload) => {
      if (payload?.command) {
        triggerGlobalEventActionGsap(payload.command);
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
    socket.on(SOCKET_EVENTS.ADMIN.EVENT_ACTION, handleAdminEventAction);

    return () => {
      socket.off('connect', subscribeAdminRoom);
      socket.off('disconnect', handleDisconnect);
      socket.off(SOCKET_EVENTS.ADMIN.STATE_UPDATE, handleAdminStateUpdate);
      socket.off(SOCKET_EVENTS.ADMIN.EVENT_ACTION, handleAdminEventAction);
    };
  }, [token, applyServerState, triggerGlobalEventActionGsap]);

  // 1-second local clock tick for live timers
  useEffect(() => {
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live global timer
  const liveGlobalTimer = useMemo(() => {
    const gt = adminState?.globalTimer;
    if (!gt) {
      return {
        formatted: '02:15:00',
        status: 'ACTIVE',
        remainingSeconds: 8100,
      };
    }
    if (gt.status !== 'ACTIVE' || !gt.targetTimestamp) {
      return {
        formatted: gt.formatted || formatDurationClock(gt.remainingSeconds),
        status: gt.status || 'PAUSED',
        remainingSeconds: gt.remainingSeconds ?? 0,
      };
    }
    const targetMs = new Date(gt.targetTimestamp).getTime();
    const currentServerMs = nowMs + serverOffsetMs;
    const remSec = Math.max(0, Math.floor((targetMs - currentServerMs) / 1000));
    return {
      formatted: formatDurationClock(remSec),
      status: remSec > 0 ? 'ACTIVE' : 'ENDED',
      remainingSeconds: remSec,
    };
  }, [adminState?.globalTimer, nowMs, serverOffsetMs]);

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
    if (p === '/admin/teams') return 'teams';
    if (p === '/admin/challenges') return 'challenges';
    if (p === '/admin/attempts') return 'attempts';
    if (p === '/admin/events') return 'events';
    if (p === '/admin/settings') return 'settings';
    return 'monitor';
  }, [location.pathname]);

  // Selected team object for detail drawer/panel
  const selectedTeam = useMemo(() => {
    if (!adminState?.teams?.length) return null;
    if (selectedTeamId) {
      return adminState.teams.find((t) => t.teamId === selectedTeamId) || adminState.teams[0];
    }
    return adminState.teams[0];
  }, [adminState?.teams, selectedTeamId]);

  // Filtered teams
  const filteredTeams = useMemo(() => {
    const list = adminState?.teams || [];
    return list.filter((team) => {
      if (teamFilter === 'ONLINE' && !team.connectionState?.connected) return false;
      if (teamFilter === 'IN_CHALLENGE' && team.activeAttempt?.status !== 'IN_PROGRESS')
        return false;
      if (
        teamFilter === 'CORE_UNLOCKED' &&
        !['AVAILABLE', 'ACTIVE', 'COMPLETED'].includes(team.coreState)
      )
        return false;

      if (!teamSearch.trim()) return true;
      const q = teamSearch.trim().toLowerCase();
      const memberMatch = (team.members || []).some(
        (m) =>
          String(m.name || '')
            .toLowerCase()
            .includes(q) ||
          String(m.role || '')
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
        String(team.sector || '')
          .toLowerCase()
          .includes(q) ||
        String(team.activeAttempt?.challengeTitle || '')
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
      return (
        String(chg.challengeId || '')
          .toLowerCase()
          .includes(q) ||
        String(chg.title || '')
          .toLowerCase()
          .includes(q) ||
        String(chg.gameType || '')
          .toLowerCase()
          .includes(q) ||
        String(chg.risk || '')
          .toLowerCase()
          .includes(q)
      );
    });
  }, [adminState?.challenges, challengeCategoryFilter, challengeSearch]);

  // Filtered attempts
  const filteredAttempts = useMemo(() => {
    const list = adminState?.attempts || [];
    return list.filter((att) => {
      if (attemptStatusFilter !== 'ALL' && att.status !== attemptStatusFilter) return false;
      if (!attemptSearch.trim()) return true;
      const q = attemptSearch.trim().toLowerCase();
      return (
        String(att.teamId || '')
          .toLowerCase()
          .includes(q) ||
        String(att.teamName || '')
          .toLowerCase()
          .includes(q) ||
        String(att.challengeId || '')
          .toLowerCase()
          .includes(q) ||
        String(att.challengeTitle || '')
          .toLowerCase()
          .includes(q)
      );
    });
  }, [adminState?.attempts, attemptStatusFilter, attemptSearch]);

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
        throw new Error(data?.message || 'Authentication rejected by NEXUS Command.');
      }
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      localStorage.setItem(ADMIN_OPERATOR_KEY, JSON.stringify(data.operator));
      setToken(data.token);
      setOperator(data.operator);
      applyServerState(data.state);
      showToast(`Authenticated as ${data.operator.operatorId} (${data.operator.role})`, 'success');
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

  // Authenticated API helper
  const executeAdminApi = async (url, method, body, successMessage, gsapCommand = null) => {
    setActionBusy(true);
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
        throw new Error(data?.message || 'Admin command failed.');
      }
      applyServerState(data);
      if (gsapCommand) {
        triggerGlobalEventActionGsap(gsapCommand);
      }
      if (successMessage) {
        showToast(successMessage, 'success');
      }
      return data;
    } catch (err) {
      showToast(err.message, 'error');
      return null;
    } finally {
      setActionBusy(false);
    }
  };

  // Global Event & Core Control handler
  const handleEventCommand = async (command, payload = {}) => {
    await executeAdminApi(
      '/api/admin/events/control',
      'POST',
      { command, payload },
      `GLOBAL COMMAND EXECUTED: ${command}`,
      command
    );
  };

  // Team Control Action handler
  const handleTeamAction = async (teamId, action, payload = {}, label = '') => {
    await executeAdminApi(
      '/api/admin/teams/action',
      'POST',
      { teamId, action, payload },
      label || `Executed ${action} on ${teamId}`
    );
  };

  // Populate Challenge Form for Editing
  const openEditChallenge = (chg) => {
    setChallengeFormError('');
    setEditingChallenge(chg.challengeId);
    setChallengeForm({
      challengeId: chg.challengeId || '',
      title: chg.title || '',
      category: chg.category || 'TECHNICAL',
      description: chg.description || '',
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
      setChallengeFormError(`Invalid JSON in gameConfig: ${err.message}`);
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

    const result = await executeAdminApi(
      '/api/admin/challenges',
      'POST',
      payload,
      `Saved challenge [${payload.challengeId}]`
    );
    if (result) {
      setEditingChallenge(null);
    }
  };

  const handleToggleChallengeEnabled = async (chg) => {
    await executeAdminApi(
      `/api/admin/challenges/${chg.challengeId}`,
      'PATCH',
      { enabled: !chg.enabled },
      `Challenge [${chg.challengeId}] ${!chg.enabled ? 'ENABLED' : 'DISABLED'}`
    );
  };

  // ============================================================================
  // PROTECTED ROUTE AUTHENTICATION GATE
  // ============================================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-[#070707] text-[#F1EFEA] font-mono flex flex-col justify-between p-6 md:p-10 selection:bg-[#E11D2E] selection:text-white">
        <header className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#E11D2E] inline-block" />
            <span className="text-xs tracking-[0.25em] uppercase text-white/80">
              CYBER QUEST // NEXUS ADMIN &amp; VOLUNTEER CONTROL
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/display"
              className="text-white/60 hover:text-white border border-white/15 px-3 py-1.5 transition-colors"
            >
              PROJECTOR DISPLAY
            </Link>
            <Link
              to="/dashboard"
              className="text-white/60 hover:text-white border border-white/15 px-3 py-1.5 transition-colors"
            >
              TEAM PORTAL
            </Link>
          </div>
        </header>

        <main className="max-w-lg w-full mx-auto my-auto border border-white/20 bg-[#0D0D0D] p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <p className="text-[10px] tracking-[0.28em] text-[#E11D2E] uppercase">
                PROTECTED COMMAND SECTOR // CLEARANCE REQUIRED
              </p>
              <h1 className="text-xl md:text-2xl font-bold tracking-wider uppercase mt-1">
                ADMIN / VOLUNTEER AUTHENTICATION
              </h1>
            </div>
            <span className="text-[10px] border border-[#E11D2E]/50 text-[#E11D2E] px-2 py-1">
              RESTRICTED
            </span>
          </div>

          <div className="mb-6">
            <p className="text-[11px] text-white/50 uppercase tracking-wider mb-2">
              QUICK CREDENTIAL PRESETS (FLOOR EVALUATION):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setLoginId('ADMIN-NEXUS');
                  setLoginPassword('NEXUS-ADMIN-2026');
                }}
                className={`text-left p-2.5 border text-xs transition-colors ${
                  loginId === 'ADMIN-NEXUS'
                    ? 'border-[#E11D2E] bg-[#E11D2E]/10 text-white'
                    : 'border-white/15 bg-black/40 text-white/70 hover:border-white/30'
                }`}
              >
                <div className="font-bold text-[11px] text-[#E11D2E]">ADMIN-NEXUS</div>
                <div className="text-[10px] text-white/60 mt-0.5">OMEGA-ADMIN CLEARANCE</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginId('VOLUNTEER-01');
                  setLoginPassword('NEXUS-VOL-2026');
                }}
                className={`text-left p-2.5 border text-xs transition-colors ${
                  loginId === 'VOLUNTEER-01'
                    ? 'border-[#E11D2E] bg-[#E11D2E]/10 text-white'
                    : 'border-white/15 bg-black/40 text-white/70 hover:border-white/30'
                }`}
              >
                <div className="font-bold text-[11px] text-amber-400">VOLUNTEER-01</div>
                <div className="text-[10px] text-white/60 mt-0.5">SECTOR MARSHAL OPS</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-1.5">
                OPERATOR ID
              </label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full bg-black border border-white/25 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E11D2E]"
                placeholder="ADMIN-NEXUS"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-1.5">
                ACCESS KEY
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-black border border-white/25 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E11D2E]"
                placeholder="••••••••••••"
                required
              />
            </div>

            {authError && (
              <div className="border border-[#E11D2E] bg-[#E11D2E]/10 px-3 py-2 text-xs text-[#E11D2E]">
                ERROR // {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#E11D2E] hover:bg-[#c81625] disabled:opacity-50 text-white font-bold text-xs tracking-[0.22em] uppercase py-3 transition-colors cursor-pointer"
            >
              {authLoading ? 'VERIFYING CLEARANCE...' : 'AUTHENTICATE OPERATOR CONSOLE'}
            </button>
          </form>
        </main>

        <footer className="border-t border-white/15 pt-4 flex items-center justify-between text-[11px] text-white/40">
          <span>NEXUS COMMAND SYSTEM // PHASE 14 ADMIN CONTROL</span>
          <span>ROUTE: {location.pathname}</span>
        </footer>
      </div>
    );
  }

  // ============================================================================
  // AUTHENTICATED ADMIN / VOLUNTEER FUNCTIONAL CONSOLE
  // ============================================================================
  const monitor = adminState?.monitor || {
    totalTeams: 0,
    onlineTeamsCount: 0,
    activeSessionsCount: 0,
    totalConnectedSockets: 0,
  };
  const coreStatus = adminState?.coreStatus || { state: 'LOCKED', unlockedTeamsCount: 0 };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F1EFEA] font-mono flex flex-col selection:bg-[#E11D2E] selection:text-white">
      {/* TOP OPERATIONAL BAR */}
      <header className="border-b border-white/15 bg-[#0C0C0C] px-4 lg:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#E11D2E] inline-block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-[0.18em] uppercase">
                  NEXUS ADMIN / VOLUNTEER CONTROL
                </span>
                <span className="text-[10px] px-2 py-0.5 border border-white/20 bg-white/5 text-white/80">
                  {operator?.operatorId || 'ADMIN'} // {operator?.role || 'ADMIN'}
                </span>
              </div>
              <p className="text-[10px] text-white/45 tracking-wider uppercase">
                SERVER-AUTHORITATIVE COMMAND &amp; LIVE SOCKET.IO TELEMETRY
              </p>
            </div>
          </div>

          {/* LIVE SYSTEM STATUS METRICS */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="border border-white/15 bg-black px-3 py-1.5 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  socketConnected ? 'bg-emerald-400' : 'bg-[#E11D2E]'
                }`}
              />
              <span className="text-[10px] text-white/50 uppercase">SOCKET:</span>
              <span className="font-bold text-[11px]">
                {socketConnected ? 'LIVE' : 'RECONNECTING'}
              </span>
            </div>

            <div className="border border-white/15 bg-black px-3 py-1.5 flex items-center gap-2">
              <span className="text-[10px] text-white/50 uppercase">EVENT:</span>
              <span
                className={`font-bold text-[11px] ${
                  liveGlobalTimer.status === 'ACTIVE'
                    ? 'text-emerald-400'
                    : liveGlobalTimer.status === 'PAUSED'
                    ? 'text-amber-400'
                    : 'text-[#E11D2E]'
                }`}
              >
                {liveGlobalTimer.status}
              </span>
              <span className="text-white/30">|</span>
              <span className="font-bold tracking-wider">{liveGlobalTimer.formatted}</span>
            </div>

            <div className="border border-white/15 bg-black px-3 py-1.5 flex items-center gap-2">
              <span className="text-[10px] text-white/50 uppercase">CORE:</span>
              <span
                className={`font-bold text-[11px] ${
                  coreStatus.state === 'LOCKED' ? 'text-white/70' : 'text-[#E11D2E]'
                }`}
              >
                {coreStatus.state}
              </span>
            </div>

            <div className="border border-white/15 bg-black px-3 py-1.5 flex items-center gap-2">
              <span className="text-[10px] text-white/50 uppercase">ONLINE TEAMS:</span>
              <span className="font-bold text-emerald-400">
                {monitor.onlineTeamsCount}/{monitor.totalTeams}
              </span>
            </div>

            <div className="border border-white/15 bg-black px-3 py-1.5 flex items-center gap-2">
              <span className="text-[10px] text-white/50 uppercase">ACTIVE SESSIONS:</span>
              <span className="font-bold text-amber-400">{monitor.activeSessionsCount}</span>
            </div>

            <Link
              to="/display"
              className="border border-white/20 hover:border-white/50 bg-black px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/80 hover:text-white transition-colors"
            >
              /DISPLAY
            </Link>

            <Link
              to="/dashboard"
              className="border border-white/20 hover:border-white/50 bg-black px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/80 hover:text-white transition-colors"
            >
              /DASHBOARD
            </Link>

            <button
              type="button"
              onClick={handleAdminLogout}
              className="border border-[#E11D2E]/50 hover:bg-[#E11D2E] hover:text-white text-[#E11D2E] px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* ROUTE NAVIGATION TABS */}
        <nav className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-1.5">
            {NAV_TABS.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => navigate(tab.path)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#E11D2E] border-[#E11D2E] text-white font-bold'
                      : 'bg-black/60 border-white/15 text-white/65 hover:text-white hover:border-white/35'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* QUICK GLOBAL EVENT BAR */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-white/40 uppercase mr-1">QUICK EVENT:</span>
            <button
              type="button"
              disabled={actionBusy}
              onClick={() => handleEventCommand('START')}
              className="px-2.5 py-1 text-[11px] border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 uppercase cursor-pointer"
            >
              START
            </button>
            <button
              type="button"
              disabled={actionBusy}
              onClick={() => handleEventCommand('PAUSE')}
              className="px-2.5 py-1 text-[11px] border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 uppercase cursor-pointer"
            >
              PAUSE
            </button>
            <button
              type="button"
              disabled={actionBusy}
              onClick={() => handleEventCommand('RESUME')}
              className="px-2.5 py-1 text-[11px] border border-sky-500/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 uppercase cursor-pointer"
            >
              RESUME
            </button>
            <button
              type="button"
              disabled={actionBusy}
              onClick={() => handleEventCommand('END')}
              className="px-2.5 py-1 text-[11px] border border-[#E11D2E]/50 bg-[#E11D2E]/10 text-[#E11D2E] hover:bg-[#E11D2E]/20 uppercase cursor-pointer"
            >
              END
            </button>
            <span className="text-white/20 mx-1">|</span>
            <span className="text-[10px] text-white/40 uppercase mr-1">CORE:</span>
            <button
              type="button"
              disabled={actionBusy}
              onClick={() => handleEventCommand('LOCK')}
              className="px-2.5 py-1 text-[11px] border border-white/25 bg-white/5 text-white/80 hover:bg-white/15 uppercase cursor-pointer"
            >
              LOCK
            </button>
            <button
              type="button"
              disabled={actionBusy}
              onClick={() => handleEventCommand('UNLOCK')}
              className="px-2.5 py-1 text-[11px] border border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 uppercase cursor-pointer"
            >
              UNLOCK
            </button>
            <button
              type="button"
              disabled={actionBusy}
              onClick={() => handleEventCommand('REVEAL')}
              className="px-2.5 py-1 text-[11px] border border-[#E11D2E] bg-[#E11D2E] text-white font-bold hover:bg-[#c81625] uppercase cursor-pointer"
            >
              REVEAL
            </button>
          </div>
        </nav>
      </header>

      {/* GSAP GLOBAL EVENT ACTION BANNER (ONLY ANIMATED BY GSAP ON GLOBAL EVENT ACTIONS) */}
      <div
        ref={globalEventBannerRef}
        className="border-b border-white/15 bg-[#111111] px-4 lg:px-6 py-2 relative overflow-hidden"
      >
        <div
          ref={globalEventPulseBarRef}
          className="absolute inset-0 bg-[#E11D2E]/20 pointer-events-none opacity-0"
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-1.5 py-0.5 bg-[#E11D2E] text-white font-bold uppercase">
              ARENA DIRECTIVE
            </span>
            <span className="text-white/85">
              {lastGlobalCommand
                ? `EXECUTED GLOBAL ACTION [${lastGlobalCommand.command}] AT ${formatTimestampShort(
                    lastGlobalCommand.timestamp
                  )}`
                : adminState?.settings?.arenaAnnouncement ||
                  'ALL SECTORS NOMINAL // RESISTANCE OPERATIVES ACTIVE'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/50">
            <span>SOCKETS: {monitor.totalConnectedSockets}</span>
            <span>|</span>
            <button
              type="button"
              onClick={() => fetchAdminState(token)}
              className="text-white/70 hover:text-white underline cursor-pointer"
            >
              {loadingState ? 'SYNCING...' : 'FORCE REFRESH'}
            </button>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION (FRAMER MOTION FOR SMALL STATE CHANGES) */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            key={feedbackToast.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={`fixed top-4 right-4 z-50 border px-4 py-2.5 text-xs shadow-lg ${
              feedbackToast.tone === 'error'
                ? 'bg-[#1a080a] border-[#E11D2E] text-[#E11D2E]'
                : 'bg-[#0b1610] border-emerald-500/60 text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold uppercase">
                {feedbackToast.tone === 'error' ? 'ERROR' : 'CONFIRMED'} //
              </span>
              <span>{feedbackToast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* ===================================================================
            TAB 1: /admin — LIVE MONITOR (SOCKET.IO POWERED)
        =================================================================== */}
        {activeTabId === 'monitor' && (
          <div className="space-y-6">
            {/* SUMMARY METRIC ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="border border-white/15 bg-[#0D0D0D] p-4">
                <div className="text-[10px] text-white/50 uppercase tracking-widest">
                  GLOBAL TIMER ({liveGlobalTimer.status})
                </div>
                <div className="text-2xl font-bold mt-1 tracking-wider">
                  {liveGlobalTimer.formatted}
                </div>
                <div className="text-[11px] text-white/45 mt-1">
                  Synchronized with /display projector
                </div>
              </div>

              <div className="border border-white/15 bg-[#0D0D0D] p-4">
                <div className="text-[10px] text-white/50 uppercase tracking-widest">
                  NEXUS CORE STATUS
                </div>
                <div
                  className={`text-2xl font-bold mt-1 uppercase ${
                    coreStatus.state === 'LOCKED' ? 'text-white/80' : 'text-[#E11D2E]'
                  }`}
                >
                  {coreStatus.state}
                </div>
                <div className="text-[11px] text-white/45 mt-1">
                  Unlocked Squads: {coreStatus.unlockedTeamsCount || 0} / {monitor.totalTeams}
                </div>
              </div>

              <div className="border border-white/15 bg-[#0D0D0D] p-4">
                <div className="text-[10px] text-white/50 uppercase tracking-widest">
                  CONNECTED TEAMS (SOCKET.IO)
                </div>
                <div className="text-2xl font-bold mt-1 text-emerald-400">
                  {monitor.onlineTeamsCount} <span className="text-sm text-white/40">/ {monitor.totalTeams}</span>
                </div>
                <div className="text-[11px] text-white/45 mt-1">
                  Active Socket Connections: {monitor.totalConnectedSockets}
                </div>
              </div>

              <div className="border border-white/15 bg-[#0D0D0D] p-4">
                <div className="text-[10px] text-white/50 uppercase tracking-widest">
                  LIVE CHALLENGE SESSIONS
                </div>
                <div className="text-2xl font-bold mt-1 text-amber-400">
                  {monitor.activeSessionsCount}
                </div>
                <div className="text-[11px] text-white/45 mt-1">
                  Enabled Challenges: {(adminState?.challenges || []).filter((c) => c.enabled).length}
                </div>
              </div>
            </div>

            {/* ACTIVE TEAMS & CURRENT STATES TABLE + LIVE FEED */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 border border-white/15 bg-[#0D0D0D] flex flex-col">
                <div className="border-b border-white/15 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider">
                      LIVE TEAM TELEMETRY &amp; CURRENT STATES
                    </h2>
                    <p className="text-[11px] text-white/45">
                      Real-time Socket.IO room presence, active challenge timers, and credits
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/teams')}
                    className="text-xs border border-white/20 px-3 py-1 hover:border-white/50 text-white/80 cursor-pointer"
                  >
                    OPEN TEAM CONTROL →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/15 bg-black/50 text-[10px] uppercase tracking-wider text-white/50">
                        <th className="py-2.5 px-3">CONNECTION</th>
                        <th className="py-2.5 px-3">TEAM</th>
                        <th className="py-2.5 px-3">CREDITS</th>
                        <th className="py-2.5 px-3">ACTIVE CHALLENGE</th>
                        <th className="py-2.5 px-3">CORE STATE</th>
                        <th className="py-2.5 px-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {(adminState?.teams || []).map((team) => {
                        const liveClock = getLiveAttemptClock(team.activeAttempt);
                        const isOnline = team.connectionState?.connected;
                        return (
                          <motion.tr
                            key={team.teamId}
                            layout
                            className="hover:bg-white/[0.03] transition-colors"
                          >
                            <td className="py-3 px-3">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold border ${
                                  isOnline
                                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                    : 'border-white/15 bg-white/5 text-white/45'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    isOnline ? 'bg-emerald-400' : 'bg-white/30'
                                  }`}
                                />
                                {team.connectionState?.status || 'OFFLINE'} (
                                {team.connectionState?.onlineOperatives || 0})
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-white">{team.teamName}</div>
                              <div className="text-[10px] text-white/45">
                                {team.teamId} // {(team.members || []).length} MEMBERS
                              </div>
                            </td>
                            <td className="py-3 px-3 font-bold text-sm">
                              {Number(team.credits || 0).toLocaleString()} CR
                            </td>
                            <td className="py-3 px-3">
                              {team.activeAttempt?.status === 'IN_PROGRESS' ? (
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-amber-300 font-bold">
                                      {team.activeAttempt.challengeTitle}
                                    </span>
                                    <RiskBadge risk={team.activeAttempt.risk} size="sm" />
                                  </div>
                                  <div className="text-[10px] text-white/60 mt-0.5">
                                    TIMER:{' '}
                                    <span
                                      className={
                                        liveClock?.isCritical
                                          ? 'text-[#E11D2E] font-bold'
                                          : 'text-emerald-300 font-bold'
                                      }
                                    >
                                      {liveClock?.formatted || '--:--'}
                                    </span>{' '}
                                    // {team.activeAttempt.category}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-white/40 text-[11px]">IDLE IN PORTAL</span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`text-[10px] px-2 py-0.5 border font-bold uppercase ${
                                  team.coreState === 'COMPLETED'
                                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                                    : team.coreState === 'AVAILABLE' || team.coreState === 'ACTIVE'
                                    ? 'border-[#E11D2E] bg-[#E11D2E]/15 text-[#E11D2E]'
                                    : 'border-white/15 text-white/50'
                                }`}
                              >
                                {team.coreState || 'LOCKED'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedTeamId(team.teamId);
                                  navigate('/admin/teams');
                                }}
                                className="border border-white/20 hover:border-[#E11D2E] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/80 hover:text-white cursor-pointer"
                              >
                                INSPECT
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* LIVE EVENT STREAM & ADMIN AUDIT LOG */}
              <div className="border border-white/15 bg-[#0D0D0D] flex flex-col">
                <div className="border-b border-white/15 px-4 py-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider">
                      RECENT SYSTEM &amp; ADMIN EVENTS
                    </h2>
                    <p className="text-[11px] text-white/45">
                      Live Socket.IO feed across all sectors
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 border border-white/15 text-white/60">
                    LIVE
                  </span>
                </div>

                <div className="p-3 space-y-2 max-h-[480px] overflow-y-auto">
                  {(adminState?.recentSystemEvents || []).slice(0, 14).map((evt) => (
                    <motion.div
                      key={evt.eventId}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-white/10 bg-black/50 p-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] text-white/45 mb-1">
                        <span className="font-bold text-[#E11D2E]">{evt.type}</span>
                        <span>{formatTimestampShort(evt.timestamp)}</span>
                      </div>
                      <div className="text-white/85 text-[11px] leading-snug">{evt.summary}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: /admin/teams — TEAM CONTROL
            View teams, search teams, view credits, view active challenge,
            view members, view history, view connection state
        =================================================================== */}
        {activeTabId === 'teams' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN: TEAM SEARCH & LIST */}
            <div className="lg:col-span-5 border border-white/15 bg-[#0D0D0D] flex flex-col">
              <div className="p-4 border-b border-white/15 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    TEAM DIRECTORY ({filteredTeams.length})
                  </h2>
                  <span className="text-[10px] text-white/45 uppercase">
                    ONLINE: {monitor.onlineTeamsCount}/{monitor.totalTeams}
                  </span>
                </div>

                <input
                  type="text"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Search team ID, name, member, sector, or challenge..."
                  className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E11D2E]"
                />

                <div className="flex flex-wrap gap-1.5">
                  {['ALL', 'ONLINE', 'IN_CHALLENGE', 'CORE_UNLOCKED'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setTeamFilter(f)}
                      className={`px-2.5 py-1 text-[10px] uppercase border cursor-pointer ${
                        teamFilter === f
                          ? 'border-[#E11D2E] bg-[#E11D2E]/15 text-white font-bold'
                          : 'border-white/15 text-white/60 hover:text-white'
                      }`}
                    >
                      {f.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-white/10 max-h-[680px] overflow-y-auto">
                {filteredTeams.map((team) => {
                  const isSelected = selectedTeam?.teamId === team.teamId;
                  const isOnline = team.connectionState?.connected;
                  const liveClock = getLiveAttemptClock(team.activeAttempt);
                  return (
                    <button
                      key={team.teamId}
                      type="button"
                      onClick={() => setSelectedTeamId(team.teamId)}
                      className={`w-full text-left p-4 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#E11D2E]/10 border-l-2 border-l-[#E11D2E]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-white/45 uppercase block">
                            {team.teamId} // {team.sector}
                          </span>
                          <span className="text-sm font-bold text-white">{team.teamName}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">
                            {Number(team.credits || 0).toLocaleString()} CR
                          </div>
                          <div
                            className={`text-[10px] font-bold ${
                              isOnline ? 'text-emerald-400' : 'text-white/40'
                            }`}
                          >
                            ● {team.connectionState?.status || 'OFFLINE'} (
                            {team.connectionState?.onlineOperatives || 0})
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <span className="text-white/60">
                          Members: {(team.members || []).length} | Solved:{' '}
                          {(team.completedChallenges || []).length}
                        </span>
                        {team.activeAttempt?.status === 'IN_PROGRESS' ? (
                          <span className="text-amber-300 font-bold">
                            ACTIVE: {team.activeAttempt.challengeTitle} (
                            {liveClock?.formatted || '--:--'})
                          </span>
                        ) : (
                          <span className="text-white/35">NO ACTIVE CHALLENGE</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: SELECTED TEAM INSPECTOR (CREDITS, ACTIVE CHALLENGE, MEMBERS, HISTORY, CONNECTION) */}
            <div className="lg:col-span-7 space-y-6">
              {selectedTeam ? (
                <div className="border border-white/15 bg-[#0D0D0D] p-5 space-y-6">
                  {/* TEAM HEADER & CONNECTION STATE */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/15 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#E11D2E] font-bold">
                          {selectedTeam.teamId}
                        </span>
                        <span className="text-white/30">//</span>
                        <span className="text-xs text-white/60">{selectedTeam.sector}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 border font-bold ${
                            selectedTeam.connectionState?.connected
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                              : 'border-white/20 bg-white/5 text-white/50'
                          }`}
                        >
                          SOCKET: {selectedTeam.connectionState?.status} (
                          {selectedTeam.connectionState?.onlineOperatives || 0} TERMINALS IN{' '}
                          {selectedTeam.connectionState?.room})
                        </span>
                      </div>
                      <h2 className="text-xl font-bold uppercase mt-1">{selectedTeam.teamName}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={actionBusy}
                        onClick={() =>
                          handleTeamAction(
                            selectedTeam.teamId,
                            'RESET_TEAM',
                            {},
                            `Reset ${selectedTeam.teamId} to default state`
                          )
                        }
                        className="border border-white/20 hover:border-[#E11D2E] px-3 py-1.5 text-xs uppercase text-white/75 hover:text-white cursor-pointer"
                      >
                        RESET TEAM STATE
                      </button>
                    </div>
                  </div>

                  {/* CREDITS & CORE STATE CONTROL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-white/15 bg-black/50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-white/50">
                          RESISTANCE CREDITS BALANCE
                        </span>
                        <span className="text-lg font-bold text-white">
                          {Number(selectedTeam.credits || 0).toLocaleString()} CR
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={creditAdjustDelta}
                          onChange={(e) => setCreditAdjustDelta(Number(e.target.value))}
                          className="w-28 bg-black border border-white/20 px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={creditAdjustReason}
                          onChange={(e) => setCreditAdjustReason(e.target.value)}
                          placeholder="Reason..."
                          className="flex-1 bg-black border border-white/20 px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          disabled={actionBusy}
                          onClick={() =>
                            handleTeamAction(selectedTeam.teamId, 'ADJUST_CREDITS', {
                              amount: Math.abs(creditAdjustDelta),
                              reason: creditAdjustReason,
                            })
                          }
                          className="px-3 py-1.5 text-[11px] bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-600/30 font-bold uppercase cursor-pointer"
                        >
                          +{Math.abs(creditAdjustDelta)} CR
                        </button>
                        <button
                          type="button"
                          disabled={actionBusy}
                          onClick={() =>
                            handleTeamAction(selectedTeam.teamId, 'ADJUST_CREDITS', {
                              amount: -Math.abs(creditAdjustDelta),
                              reason: creditAdjustReason,
                            })
                          }
                          className="px-3 py-1.5 text-[11px] bg-[#E11D2E]/20 border border-[#E11D2E]/50 text-[#E11D2E] hover:bg-[#E11D2E]/30 font-bold uppercase cursor-pointer"
                        >
                          -{Math.abs(creditAdjustDelta)} CR
                        </button>
                        <button
                          type="button"
                          disabled={actionBusy}
                          onClick={() =>
                            handleTeamAction(selectedTeam.teamId, 'ADJUST_CREDITS', {
                              amount: 500,
                              reason: 'VOLUNTEER BONUS AWARD',
                            })
                          }
                          className="px-2.5 py-1.5 text-[11px] border border-white/20 text-white/75 hover:text-white uppercase cursor-pointer"
                        >
                          +500 BONUS
                        </button>
                      </div>
                    </div>

                    {/* ACTIVE CHALLENGE & TEAM CORE OVERRIDE */}
                    <div className="border border-white/15 bg-black/50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-white/50">
                          ACTIVE CHALLENGE SESSION
                        </span>
                        <span className="text-[10px] uppercase px-2 py-0.5 border border-white/15">
                          CORE: {selectedTeam.coreState}
                        </span>
                      </div>

                      {selectedTeam.activeAttempt?.status === 'IN_PROGRESS' ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-300 text-xs">
                              {selectedTeam.activeAttempt.challengeTitle} (
                              {selectedTeam.activeAttempt.challengeId})
                            </span>
                            <RiskBadge risk={selectedTeam.activeAttempt.risk} size="sm" />
                          </div>
                          <div className="text-xs text-white/70">
                            Timer Remaining:{' '}
                            <span className="font-bold text-white">
                              {getLiveAttemptClock(selectedTeam.activeAttempt)?.formatted ||
                                '--:--'}
                            </span>{' '}
                            | Reward: +{selectedTeam.activeAttempt.reward} CR
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <button
                              type="button"
                              disabled={actionBusy}
                              onClick={() =>
                                handleTeamAction(selectedTeam.teamId, 'ADJUDICATE_ATTEMPT', {
                                  outcome: 'SUCCESS',
                                })
                              }
                              className="px-2.5 py-1 text-[10px] border border-emerald-500/50 bg-emerald-500/15 text-emerald-300 uppercase font-bold cursor-pointer"
                            >
                              FORCE SUCCESS
                            </button>
                            <button
                              type="button"
                              disabled={actionBusy}
                              onClick={() =>
                                handleTeamAction(selectedTeam.teamId, 'ADJUDICATE_ATTEMPT', {
                                  outcome: 'FAILED',
                                })
                              }
                              className="px-2.5 py-1 text-[10px] border border-[#E11D2E]/50 bg-[#E11D2E]/15 text-[#E11D2E] uppercase font-bold cursor-pointer"
                            >
                              FORCE FAIL
                            </button>
                            <button
                              type="button"
                              disabled={actionBusy}
                              onClick={() =>
                                handleTeamAction(selectedTeam.teamId, 'ADJUDICATE_ATTEMPT', {
                                  outcome: 'ABANDONED',
                                })
                              }
                              className="px-2.5 py-1 text-[10px] border border-white/25 text-white/70 uppercase cursor-pointer"
                            >
                              FORCE ABANDON
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-white/45 py-2">
                          No challenge currently in progress for this team.
                        </div>
                      )}

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-white/45 uppercase">TEAM CORE:</span>
                        <div className="flex gap-1.5">
                          {['LOCKED', 'AVAILABLE', 'ACTIVE'].map((st) => (
                            <button
                              key={st}
                              type="button"
                              disabled={actionBusy}
                              onClick={() =>
                                handleTeamAction(selectedTeam.teamId, 'SET_TEAM_CORE_STATE', {
                                  state: st,
                                })
                              }
                              className={`px-2 py-0.5 text-[10px] border uppercase cursor-pointer ${
                                selectedTeam.coreState === st
                                  ? 'border-[#E11D2E] bg-[#E11D2E] text-white font-bold'
                                  : 'border-white/20 text-white/60 hover:text-white'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TEAM MEMBERS ROSTER */}
                  <div className="border border-white/15 bg-black/40 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/75 mb-3">
                      OPERATIVE MEMBERS ({(selectedTeam.members || []).length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(selectedTeam.members || []).map((member, idx) => (
                        <div
                          key={member.operativeId || idx}
                          className="border border-white/10 bg-[#0B0B0B] p-2.5 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{member.name}</span>
                            <span className="text-[10px] text-emerald-400">
                              {member.status || 'ONLINE'}
                            </span>
                          </div>
                          <div className="text-[10px] text-white/50 mt-0.5">
                            {member.operativeId || `OP-0${idx + 1}`} // {member.role || 'OPERATIVE'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TEAM ATTEMPT HISTORY */}
                  <div className="border border-white/15 bg-black/40 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/75 mb-3">
                      TEAM CHALLENGE HISTORY ({(selectedTeam.attemptHistory || []).length})
                    </h3>
                    <div className="overflow-x-auto max-h-60 overflow-y-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/15 text-[10px] text-white/45 uppercase">
                            <th className="py-2 px-2">CHALLENGE</th>
                            <th className="py-2 px-2">CATEGORY</th>
                            <th className="py-2 px-2">RISK</th>
                            <th className="py-2 px-2">COST</th>
                            <th className="py-2 px-2">RESULT</th>
                            <th className="py-2 px-2">NET</th>
                            <th className="py-2 px-2">TIME</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {(selectedTeam.attemptHistory || []).map((h) => (
                            <tr key={h.attemptId}>
                              <td className="py-2 px-2 font-bold">{h.challengeTitle}</td>
                              <td className="py-2 px-2 text-white/60">{h.category}</td>
                              <td className="py-2 px-2">
                                <RiskBadge risk={h.risk} size="sm" />
                              </td>
                              <td className="py-2 px-2">{h.cost} CR</td>
                              <td className="py-2 px-2">
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 border ${
                                    h.result === 'SUCCESS'
                                      ? 'border-emerald-500/40 text-emerald-300'
                                      : h.result === 'IN_PROGRESS'
                                      ? 'border-amber-500/40 text-amber-300'
                                      : 'border-[#E11D2E]/40 text-[#E11D2E]'
                                  }`}
                                >
                                  {h.result}
                                </span>
                              </td>
                              <td
                                className={`py-2 px-2 font-bold ${
                                  h.netCredits >= 0 ? 'text-emerald-400' : 'text-[#E11D2E]'
                                }`}
                              >
                                {h.netCredits >= 0 ? `+${h.netCredits}` : h.netCredits} CR
                              </td>
                              <td className="py-2 px-2 text-white/45">
                                {formatTimestampShort(h.timestamp)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-white/15 bg-[#0D0D0D] p-8 text-center text-white/50">
                  Select a team to inspect and control.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: /admin/challenges — CHALLENGE CONTROL
            Create/edit: challenge, cost, reward, difficulty, risk, time,
            gameType, gameConfig, enabled
        =================================================================== */}
        {activeTabId === 'challenges' && (
          <div className="space-y-6">
            <div className="border border-white/15 bg-[#0D0D0D] p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={challengeSearch}
                  onChange={(e) => setChallengeSearch(e.target.value)}
                  placeholder="Search challenge ID, title, gameType..."
                  className="bg-black border border-white/20 px-3 py-2 text-xs text-white w-64 focus:outline-none focus:border-[#E11D2E]"
                />
                <div className="flex flex-wrap gap-1.5">
                  {['ALL', ...CANONICAL_CATEGORIES].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setChallengeCategoryFilter(cat)}
                      className={`px-2.5 py-1 text-[10px] border uppercase cursor-pointer ${
                        challengeCategoryFilter === cat
                          ? 'border-[#E11D2E] bg-[#E11D2E]/15 text-white font-bold'
                          : 'border-white/15 text-white/60 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={openCreateChallenge}
                className="bg-[#E11D2E] hover:bg-[#c81625] text-white font-bold text-xs uppercase tracking-wider px-4 py-2 cursor-pointer"
              >
                + CREATE CHALLENGE MODULE
              </button>
            </div>

            {/* CREATE / EDIT CHALLENGE DRAWER FORM */}
            <AnimatePresence>
              {editingChallenge && (
                <motion.form
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSaveChallenge}
                  className="border border-[#E11D2E] bg-[#0F0F0F] p-5 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <div>
                      <span className="text-[10px] text-[#E11D2E] uppercase tracking-widest">
                        CHALLENGE CONFIGURATION EDITOR
                      </span>
                      <h3 className="text-base font-bold uppercase">
                        {editingChallenge === 'NEW'
                          ? 'CREATE NEW CHALLENGE MODULE'
                          : `EDIT CHALLENGE // ${editingChallenge}`}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingChallenge(null)}
                      className="text-xs border border-white/20 px-3 py-1 text-white/70 hover:text-white cursor-pointer"
                    >
                      CLOSE [X]
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        CHALLENGE ID
                      </label>
                      <input
                        type="text"
                        value={challengeForm.challengeId}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, challengeId: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        CHALLENGE TITLE
                      </label>
                      <input
                        type="text"
                        value={challengeForm.title}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, title: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        CATEGORY
                      </label>
                      <select
                        value={challengeForm.category}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, category: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                      >
                        {CANONICAL_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        COST (CREDITS)
                      </label>
                      <input
                        type="number"
                        value={challengeForm.cost}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, cost: Number(e.target.value) })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        REWARD (CREDITS)
                      </label>
                      <input
                        type="number"
                        value={challengeForm.reward}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, reward: Number(e.target.value) })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        DIFFICULTY
                      </label>
                      <select
                        value={challengeForm.difficulty}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, difficulty: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                      >
                        {CANONICAL_DIFFICULTIES.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        RISK CLASSIFICATION
                      </label>
                      <select
                        value={challengeForm.risk}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, risk: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                      >
                        {CANONICAL_RISKS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        TIME LIMIT (SECONDS)
                      </label>
                      <input
                        type="number"
                        value={challengeForm.timeLimit}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, timeLimit: Number(e.target.value) })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        GAME TYPE (ENGINE REGISTRY)
                      </label>
                      <select
                        value={challengeForm.gameType}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, gameType: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                      >
                        {CANONICAL_GAME_TYPES.map((gt) => (
                          <option key={gt} value={gt}>
                            {gt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        EXPECTED ANSWER TOKEN
                      </label>
                      <input
                        type="text"
                        value={challengeForm.expectedAnswer}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, expectedAnswer: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={challengeForm.enabled}
                          onChange={(e) =>
                            setChallengeForm({ ...challengeForm, enabled: e.target.checked })
                          }
                        />
                        <span className="font-bold uppercase">ENABLED</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={challengeForm.available}
                          onChange={(e) =>
                            setChallengeForm({ ...challengeForm, available: e.target.checked })
                          }
                        />
                        <span className="font-bold uppercase">AVAILABLE</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        CHALLENGE DESCRIPTION
                      </label>
                      <textarea
                        rows={4}
                        value={challengeForm.description}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, description: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 p-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/55 uppercase mb-1">
                        GAME CONFIG (JSON)
                      </label>
                      <textarea
                        rows={4}
                        value={challengeForm.gameConfigText}
                        onChange={(e) =>
                          setChallengeForm({ ...challengeForm, gameConfigText: e.target.value })
                        }
                        className="w-full bg-black border border-white/25 p-3 text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  {challengeFormError && (
                    <div className="border border-[#E11D2E] bg-[#E11D2E]/10 px-3 py-2 text-xs text-[#E11D2E]">
                      {challengeFormError}
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingChallenge(null)}
                      className="border border-white/20 px-4 py-2 text-xs uppercase text-white/70 cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={actionBusy}
                      className="bg-[#E11D2E] hover:bg-[#c81625] text-white font-bold px-5 py-2 text-xs uppercase tracking-wider cursor-pointer"
                    >
                      SAVE CHALLENGE MODULE
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* CHALLENGES TABLE */}
            <div className="border border-white/15 bg-[#0D0D0D] overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/15 bg-black/50 text-[10px] uppercase tracking-wider text-white/50">
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-3">ID &amp; TITLE</th>
                    <th className="py-3 px-3">CATEGORY</th>
                    <th className="py-3 px-3">GAME TYPE</th>
                    <th className="py-3 px-3">DIFFICULTY</th>
                    <th className="py-3 px-3">RISK</th>
                    <th className="py-3 px-3">COST / REWARD</th>
                    <th className="py-3 px-3">TIME</th>
                    <th className="py-3 px-3 text-right">CONTROLS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredChallenges.map((chg) => (
                    <tr key={chg.challengeId} className="hover:bg-white/[0.03]">
                      <td className="py-3 px-3">
                        <button
                          type="button"
                          onClick={() => handleToggleChallengeEnabled(chg)}
                          className={`px-2 py-0.5 text-[10px] font-bold border uppercase cursor-pointer ${
                            chg.enabled
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                              : 'border-white/20 bg-white/5 text-white/40'
                          }`}
                        >
                          {chg.enabled ? 'ENABLED' : 'DISABLED'}
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{chg.title}</div>
                        <div className="text-[10px] text-white/45">{chg.challengeId}</div>
                      </td>
                      <td className="py-3 px-3 text-white/75">{chg.category}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 border border-white/15 bg-black text-[11px]">
                          {chg.gameType}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-white/75">{chg.difficulty}</td>
                      <td className="py-3 px-3">
                        <RiskBadge risk={chg.risk} size="sm" />
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-white/80">{chg.cost} CR</span>
                        <span className="text-white/30 mx-1">/</span>
                        <span className="text-emerald-400 font-bold">+{chg.reward} CR</span>
                      </td>
                      <td className="py-3 px-3 text-white/75">
                        {Math.round((chg.timeLimit || 900) / 60)}m ({chg.timeLimit || 900}s)
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => openEditChallenge(chg)}
                          className="border border-white/25 hover:border-[#E11D2E] px-3 py-1 text-[10px] uppercase text-white/85 hover:text-white cursor-pointer"
                        >
                          EDIT MODULE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: /admin/attempts — ATTEMPTS MONITOR & ADJUDICATION
        =================================================================== */}
        {activeTabId === 'attempts' && (
          <div className="space-y-4">
            <div className="border border-white/15 bg-[#0D0D0D] p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={attemptSearch}
                  onChange={(e) => setAttemptSearch(e.target.value)}
                  placeholder="Search team or challenge..."
                  className="bg-black border border-white/20 px-3 py-2 text-xs text-white w-64 focus:outline-none focus:border-[#E11D2E]"
                />
                <div className="flex flex-wrap gap-1.5">
                  {['ALL', 'IN_PROGRESS', 'SUCCESS', 'FAILED', 'TIMEOUT', 'ABANDONED'].map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setAttemptStatusFilter(st)}
                        className={`px-2.5 py-1 text-[10px] border uppercase cursor-pointer ${
                          attemptStatusFilter === st
                            ? 'border-[#E11D2E] bg-[#E11D2E]/15 text-white font-bold'
                            : 'border-white/15 text-white/60 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>
              <span className="text-xs text-white/50">
                SHOWING {filteredAttempts.length} ATTEMPTS
              </span>
            </div>

            <div className="border border-white/15 bg-[#0D0D0D] overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/15 bg-black/50 text-[10px] uppercase tracking-wider text-white/50">
                    <th className="py-3 px-3">ATTEMPT ID / #</th>
                    <th className="py-3 px-3">TEAM</th>
                    <th className="py-3 px-3">CHALLENGE</th>
                    <th className="py-3 px-3">RISK</th>
                    <th className="py-3 px-3">STATUS / RESULT</th>
                    <th className="py-3 px-3">COST &amp; REWARD/PENALTY</th>
                    <th className="py-3 px-3">STARTED / TIMESTAMP</th>
                    <th className="py-3 px-3 text-right">ADJUDICATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredAttempts.map((att) => {
                    const liveClock = getLiveAttemptClock(att);
                    const attemptNum = Number(att.attemptNumber) || (att.isReattempt ? 2 : 1);
                    return (
                      <tr key={att.attemptId} className="hover:bg-white/[0.03]">
                        <td className="py-3 px-3 font-mono text-[11px] text-white/65">
                          <div>{att.attemptId}</div>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 text-[9px] font-bold border border-white/20 bg-white/5 text-white/85 uppercase">
                              ATTEMPT #{attemptNum}
                            </span>
                            {(att.isReattempt || attemptNum > 1) && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold border border-[#E11D2E]/50 bg-[#E11D2E]/15 text-[#E11D2E] uppercase">
                                REATTEMPT
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold">{att.teamName}</div>
                          <div className="text-[10px] text-white/45">{att.teamId}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold">{att.challengeTitle}</div>
                          <div className="text-[10px] text-white/45">
                            {att.challengeId} // {att.category}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <RiskBadge risk={att.risk} size="sm" />
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold border uppercase ${
                              att.status === 'SUCCESS'
                                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                : att.status === 'IN_PROGRESS'
                                ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                                : 'border-[#E11D2E]/40 bg-[#E11D2E]/10 text-[#E11D2E]'
                            }`}
                          >
                            {att.result || att.status}
                            {liveClock ? ` (${liveClock.formatted})` : ''}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div>Cost: -{att.cost} CR</div>
                          <div className="text-[10px] text-white/55">
                            Reward: +{att.reward} CR | Penalty: -{att.penalty ?? 75} CR
                          </div>
                        </td>
                        <td className="py-3 px-3 text-white/50">
                          <div>Start: {formatTimestampShort(att.startedAt)}</div>
                          {att.timestamp && (
                            <div className="text-[10px] text-white/35">
                              Recorded: {formatTimestampShort(att.timestamp)}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          {att.status === 'IN_PROGRESS' ? (
                            <div className="inline-flex gap-1.5">
                              <button
                                type="button"
                                disabled={actionBusy}
                                onClick={() =>
                                  handleTeamAction(att.teamId, 'ADJUDICATE_ATTEMPT', {
                                    attemptId: att.attemptId,
                                    challengeId: att.challengeId,
                                    outcome: 'SUCCESS',
                                  })
                                }
                                className="px-2 py-1 text-[10px] border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/20 uppercase cursor-pointer"
                              >
                                PASS
                              </button>
                              <button
                                type="button"
                                disabled={actionBusy}
                                onClick={() =>
                                  handleTeamAction(att.teamId, 'ADJUDICATE_ATTEMPT', {
                                    attemptId: att.attemptId,
                                    challengeId: att.challengeId,
                                    outcome: 'FAILED',
                                  })
                                }
                                className="px-2 py-1 text-[10px] border border-[#E11D2E]/50 text-[#E11D2E] hover:bg-[#E11D2E]/20 uppercase cursor-pointer"
                              >
                                FAIL
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-white/35 uppercase">FINALIZED</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: /admin/events — EVENT CONTROL & NEXUS CORE CONTROL
            START, PAUSE, RESUME, END | CORE: LOCK, UNLOCK, REVEAL | GLOBAL TIMER
        =================================================================== */}
        {activeTabId === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              {/* GLOBAL EVENT & TIMER DECK */}
              <div className="border border-white/15 bg-[#0D0D0D] p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div>
                    <span className="text-[10px] text-[#E11D2E] uppercase tracking-widest">
                      ARENA SYNCHRONIZATION
                    </span>
                    <h2 className="text-base font-bold uppercase">
                      GLOBAL EVENT &amp; TIMER CONTROL
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{liveGlobalTimer.formatted}</div>
                    <div className="text-[10px] text-white/50 uppercase">
                      STATE: {liveGlobalTimer.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleEventCommand('START')}
                    className="py-3 border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    START EVENT
                  </button>
                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleEventCommand('PAUSE')}
                    className="py-3 border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    PAUSE EVENT
                  </button>
                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleEventCommand('RESUME')}
                    className="py-3 border border-sky-500/50 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    RESUME EVENT
                  </button>
                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleEventCommand('END')}
                    className="py-3 border border-[#E11D2E] bg-[#E11D2E]/15 hover:bg-[#E11D2E]/30 text-[#E11D2E] font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    END EVENT
                  </button>
                </div>

                {/* GLOBAL TIMER DURATION & ADJUSTMENTS */}
                <div className="border border-white/10 bg-black/50 p-4 space-y-3">
                  <div className="text-[11px] font-bold uppercase text-white/75">
                    GLOBAL TIMER CONFIGURATION
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={600}
                      value={customTimerMinutes}
                      onChange={(e) => setCustomTimerMinutes(Number(e.target.value))}
                      className="w-24 bg-black border border-white/25 px-3 py-1.5 text-xs text-white"
                    />
                    <span className="text-xs text-white/50">MINUTES</span>
                    <button
                      type="button"
                      disabled={actionBusy}
                      onClick={() =>
                        handleEventCommand('SET_TIMER', {
                          durationSeconds: Math.max(60, customTimerMinutes * 60),
                        })
                      }
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/25 text-xs uppercase font-bold cursor-pointer"
                    >
                      SET GLOBAL TIMER
                    </button>
                    <button
                      type="button"
                      disabled={actionBusy}
                      onClick={() => handleEventCommand('ADJUST_TIMER', { deltaSeconds: 300 })}
                      className="px-3 py-1.5 border border-emerald-500/40 text-emerald-300 text-xs uppercase cursor-pointer"
                    >
                      +5 MIN
                    </button>
                    <button
                      type="button"
                      disabled={actionBusy}
                      onClick={() => handleEventCommand('ADJUST_TIMER', { deltaSeconds: -300 })}
                      className="px-3 py-1.5 border border-[#E11D2E]/40 text-[#E11D2E] text-xs uppercase cursor-pointer"
                    >
                      -5 MIN
                    </button>
                  </div>
                </div>
              </div>

              {/* NEXUS CORE CONTROL DECK */}
              <div className="border border-white/15 bg-[#0D0D0D] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div>
                    <span className="text-[10px] text-[#E11D2E] uppercase tracking-widest">
                      ULTIMATE SYSTEM OBJECTIVE
                    </span>
                    <h2 className="text-base font-bold uppercase">
                      NEXUS CORE GLOBAL CONTROL (LOCK / UNLOCK / REVEAL)
                    </h2>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold border uppercase ${
                      coreStatus.state === 'LOCKED'
                        ? 'border-white/25 text-white/70'
                        : 'border-[#E11D2E] bg-[#E11D2E]/15 text-[#E11D2E]'
                    }`}
                  >
                    CORE: {coreStatus.state}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleEventCommand('LOCK')}
                    className="p-3.5 border border-white/25 bg-white/5 hover:bg-white/10 text-left cursor-pointer"
                  >
                    <div className="text-xs font-bold uppercase text-white">CORE: LOCK</div>
                    <div className="text-[10px] text-white/50 mt-1">
                      Locks NEXUS Core across all sectors.
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleEventCommand('UNLOCK')}
                    className="p-3.5 border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-left cursor-pointer"
                  >
                    <div className="text-xs font-bold uppercase text-amber-300">CORE: UNLOCK</div>
                    <div className="text-[10px] text-white/60 mt-1">
                      Sets Core state to AVAILABLE for all teams.
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleEventCommand('REVEAL')}
                    className="p-3.5 border border-[#E11D2E] bg-[#E11D2E]/20 hover:bg-[#E11D2E]/30 text-left cursor-pointer"
                  >
                    <div className="text-xs font-bold uppercase text-white">CORE: REVEAL</div>
                    <div className="text-[10px] text-white/80 mt-1">
                      Unlocks Core &amp; broadcasts live cinematic reveal sequence.
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SECURITY & FAIR PLAY AUDIT LOG (PHASE 15) */}
            <div className="lg:col-span-5 border border-white/15 bg-[#0D0D0D] flex flex-col">
              <div className="border-b border-white/15 px-4 py-3 space-y-2.5">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    SECURITY &amp; FAIR PLAY AUDIT LOG // PHASE 15
                  </h2>
                  <p className="text-[11px] text-white/45">
                    Server-authoritative ledger of LOGIN, PURCHASE, START, SUBMISSION, SUCCESS, FAILURE, ABILITY, HINT, EXTRA_TIME, and ADMIN_ACTION
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    'ALL',
                    'LOGIN',
                    'PURCHASE',
                    'START',
                    'SUBMISSION',
                    'SUCCESS',
                    'FAILURE',
                    'ABILITY',
                    'HINT',
                    'EXTRA_TIME',
                    'ADMIN_ACTION',
                  ].map((actionType) => (
                    <button
                      key={actionType}
                      type="button"
                      onClick={() => setAuditActionFilter(actionType)}
                      className={`px-2 py-0.5 text-[9px] font-bold border uppercase cursor-pointer ${
                        auditActionFilter === actionType
                          ? 'border-[#E11D2E] bg-[#E11D2E] text-white'
                          : 'border-white/15 bg-black/50 text-white/55 hover:text-white'
                      }`}
                    >
                      {actionType}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-2.5 max-h-[540px] overflow-y-auto">
                {(adminState?.auditLogs || adminState?.adminEventLogs || [])
                  .filter((log) => auditActionFilter === 'ALL' || log.action === auditActionFilter)
                  .map((log) => (
                    <div key={log.auditId || log.logId} className="border border-white/10 bg-black/50 p-3 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-white/45 mb-1">
                        <span className="text-[#E11D2E] font-bold">
                          {log.action} // {log.actorId || log.actor || log.teamId || 'SYSTEM'}
                        </span>
                        <span>{formatTimestampShort(log.timestamp)}</span>
                      </div>
                      <div className="text-white/85 text-[11px]">{log.summary}</div>
                      {log.challengeId && (
                        <div className="text-[10px] text-white/45 mt-1">
                          CHALLENGE: {log.challengeId} {log.attemptId ? `// ${log.attemptId}` : ''}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: /admin/settings — SYSTEM SETTINGS & ARENA RESET
        =================================================================== */}
        {activeTabId === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeAdminApi(
                  '/api/admin/settings',
                  'POST',
                  settingsForm,
                  'Updated global arena settings'
                );
              }}
              className="border border-white/15 bg-[#0D0D0D] p-5 space-y-4"
            >
              <div className="border-b border-white/15 pb-3">
                <span className="text-[10px] text-[#E11D2E] uppercase tracking-widest">
                  ECONOMIC &amp; PORTAL PARAMETERS
                </span>
                <h2 className="text-base font-bold uppercase">ARENA SYSTEM SETTINGS</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] text-white/55 uppercase mb-1">
                    STARTING CREDITS
                  </label>
                  <input
                    type="number"
                    value={settingsForm.startingCredits}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        startingCredits: Number(e.target.value),
                      })
                    }
                    className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/55 uppercase mb-1">
                    HINT PURCHASE COST (CR)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.hintCost}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, hintCost: Number(e.target.value) })
                    }
                    className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/55 uppercase mb-1">
                    EXTRA TIME COST (CR)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.extraTimeCost}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, extraTimeCost: Number(e.target.value) })
                    }
                    className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/55 uppercase mb-1">
                    EXTRA TIME EXTENSION (MINUTES)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.extraTimeMinutes}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        extraTimeMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-[10px] text-white/55 uppercase mb-1">
                  ARENA OPERATOR ANNOUNCEMENT BANNER
                </label>
                <input
                  type="text"
                  value={settingsForm.arenaAnnouncement}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, arenaAnnouncement: e.target.value })
                  }
                  className="w-full bg-black border border-white/25 px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                disabled={actionBusy}
                className="bg-[#E11D2E] hover:bg-[#c81625] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 cursor-pointer"
              >
                SAVE SYSTEM SETTINGS
              </button>
            </form>

            {/* FULL ARENA RESET */}
            <div className="border border-white/15 bg-[#0D0D0D] p-5 space-y-4">
              <div className="border-b border-white/15 pb-3">
                <span className="text-[10px] text-[#E11D2E] uppercase tracking-widest">
                  EMERGENCY / REHEARSAL PROTOCOL
                </span>
                <h2 className="text-base font-bold uppercase">FULL ARENA DEMO STATE RESET</h2>
              </div>

              <p className="text-xs text-white/65 leading-relaxed">
                Resets all seeded teams back to their initial baseline state, clears active
                challenge attempts, resets the NEXUS Core to LOCKED, and restarts the global arena
                timer.
              </p>

              <button
                type="button"
                disabled={actionBusy}
                onClick={() =>
                  executeAdminApi(
                    '/api/admin/settings',
                    'POST',
                    { resetAllDemoState: true },
                    'Full Arena Demo State Reset Completed',
                    'RESET_ALL'
                  )
                }
                className="border border-[#E11D2E] bg-[#E11D2E]/15 hover:bg-[#E11D2E] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 transition-colors cursor-pointer"
              >
                EXECUTE FULL ARENA RESET
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminControlPage;
