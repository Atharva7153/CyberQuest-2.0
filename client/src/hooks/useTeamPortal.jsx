import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  getStoredToken,
  storeTeamSession,
  clearTeamSession,
  loginTeamRequest,
  fetchAuthenticatedTeam,
  postTeamActionHttp,
} from '../services/authService';
import { socketClient, NEXUS_SOCKET_EVENTS } from '../socket/socketClient';

const TeamPortalContext = createContext(null);

export const TeamPortalProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken());
  const [team, setTeam] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [sessionTimer, setSessionTimer] = useState(null);
  const [serverClockOffsetMs, setServerClockOffsetMs] = useState(0);
  const [creditsConfig, setCreditsConfig] = useState({
    startingCredits: 1250,
    hintCost: 100,
    extraTimeCost: 150,
    extraTimeMinutes: 5,
    reattemptMultiplier: 1.25,
  });
  const [lastCreditChange, setLastCreditChange] = useState(null);
  const [lastEvaluationResult, setLastEvaluationResult] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [isInitializing, setIsInitializing] = useState(() => Boolean(getStoredToken()));
  const [socketConnected, setSocketConnected] = useState(false);
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [onlineOperatives, setOnlineOperatives] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [actionPending, setActionPending] = useState(false);

  const applyServerClock = useCallback((serverIsoTime) => {
    if (!serverIsoTime) return;
    const parsed = new Date(serverIsoTime).getTime();
    if (!Number.isNaN(parsed)) {
      setServerClockOffsetMs(parsed - Date.now());
    }
  }, []);

  const pushNotification = useCallback((summary, variant = 'info', creditsDelta = 0) => {
    const id = `NOTIF-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setNotifications((prev) => [
      { id, summary, variant, creditsDelta, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 3),
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, 4500);
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearEvaluationResult = useCallback(() => {
    setLastEvaluationResult(null);
  }, []);

  // Restore session on mount if token exists
  useEffect(() => {
    let active = true;
    if (!token) {
      setIsInitializing(false);
      return undefined;
    }

    fetchAuthenticatedTeam(token)
      .then((res) => {
        if (!active) return;
        setTeam(res.team);
        if (res.transactions) setTransactions(res.transactions);
        if (res.attempts) setAttempts(res.attempts);
        if (res.timer) setSessionTimer(res.timer);
        if (res.serverTime) applyServerClock(res.serverTime);
        if (res.creditsConfig) setCreditsConfig(res.creditsConfig);
        if (res.catalog) setCatalog(res.catalog);
      })
      .catch(() => {
        if (!active) return;
        clearTeamSession();
        setToken(null);
        setTeam(null);
      })
      .finally(() => {
        if (active) setIsInitializing(false);
      });

    return () => {
      active = false;
    };
  }, [token, applyServerClock]);

  // Socket.IO connection & team:<teamId> room synchronization
  useEffect(() => {
    if (!token || !team?.teamId) {
      return undefined;
    }

    const joinTeamRoom = () => {
      socketClient.emit(
        NEXUS_SOCKET_EVENTS.TEAM.JOIN,
        { teamId: team.teamId, token },
        (ack) => {
          if (ack?.ok) {
            setJoinedRoom(ack.room);
            setOnlineOperatives(ack.onlineOperatives || 1);
            if (ack.team) setTeam(ack.team);
            if (ack.transactions) setTransactions(ack.transactions);
            if (ack.attempts) setAttempts(ack.attempts);
            if (ack.timer) setSessionTimer(ack.timer);
            if (ack.serverTime) applyServerClock(ack.serverTime);
            if (ack.creditsConfig) setCreditsConfig(ack.creditsConfig);
            if (ack.catalog) setCatalog(ack.catalog);
          }
        }
      );
    };

    const handleConnect = () => {
      setSocketConnected(true);
      joinTeamRoom();
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
      setJoinedRoom(null);
    };

    const handleCreditsUpdate = (payload) => {
      if (payload?.transactions) {
        setTransactions(payload.transactions);
      }
      if (payload?.delta !== undefined && payload?.delta !== 0) {
        setLastCreditChange({
          id: `${Date.now()}-${Math.random()}`,
          delta: payload.delta,
          balanceBefore: payload.balanceBefore,
          balanceAfter: payload.balanceAfter,
          type: payload.transaction?.type || 'CREDIT_UPDATE',
          timestamp: payload.timestamp || new Date().toISOString(),
        });
      }
    };

    const handleTimerUpdate = (payload) => {
      if (payload?.serverTime) {
        applyServerClock(payload.serverTime);
      }
      if (payload?.timer) {
        setSessionTimer(payload.timer);
      }
    };

    const handleTimerExpired = (payload) => {
      if (payload?.serverTime) {
        applyServerClock(payload.serverTime);
      }
      if (payload?.evaluationResult) {
        setLastEvaluationResult(payload.evaluationResult);
      }
    };

    const handleSubmissionResult = (payload) => {
      if (payload) {
        setLastEvaluationResult(payload);
      }
    };

    const handleStateUpdate = (payload) => {
      if (payload?.team) {
        setTeam(payload.team);
      }
      if (payload?.transactions) {
        setTransactions(payload.transactions);
      }
      if (payload?.attempts) {
        setAttempts(payload.attempts);
      }
      if (payload?.timer) {
        setSessionTimer(payload.timer);
      }
      if (payload?.serverTime) {
        applyServerClock(payload.serverTime);
      }
      if (payload?.creditsConfig) {
        setCreditsConfig(payload.creditsConfig);
      }
      if (payload?.catalog) {
        setCatalog(payload.catalog);
      }
      if (payload?.evaluationResult) {
        setLastEvaluationResult(payload.evaluationResult);
      }
      if (payload?.onlineOperatives !== undefined) {
        setOnlineOperatives(payload.onlineOperatives);
      }
      if (payload?.event?.summary) {
        const isPeer =
          payload.triggeredBySocketId && payload.triggeredBySocketId !== socketClient.id;
        pushNotification(
          `${isPeer ? '[SQUAD SYNC] ' : ''}${payload.event.summary}`,
          payload.event.creditsDelta < 0 ? 'crimson' : 'operational',
          payload.event.creditsDelta
        );
      }
    };

    const handlePresenceUpdate = (payload) => {
      if (payload?.onlineOperatives !== undefined) {
        setOnlineOperatives(payload.onlineOperatives);
      }
      if (payload?.room) {
        setJoinedRoom(payload.room);
      }
    };

    socketClient.on('connect', handleConnect);
    socketClient.on('disconnect', handleDisconnect);
    socketClient.on(NEXUS_SOCKET_EVENTS.CREDITS.UPDATE, handleCreditsUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.TIMER.UPDATE, handleTimerUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.TIMER.EXPIRED, handleTimerExpired);
    socketClient.on(NEXUS_SOCKET_EVENTS.SUBMISSION.RESULT, handleSubmissionResult);
    socketClient.on(NEXUS_SOCKET_EVENTS.TEAM.STATE_UPDATE, handleStateUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, handlePresenceUpdate);

    if (!socketClient.connected) {
      socketClient.connect();
    } else {
      setSocketConnected(true);
      joinTeamRoom();
    }

    return () => {
      socketClient.off('connect', handleConnect);
      socketClient.off('disconnect', handleDisconnect);
      socketClient.off(NEXUS_SOCKET_EVENTS.CREDITS.UPDATE, handleCreditsUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.TIMER.UPDATE, handleTimerUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.TIMER.EXPIRED, handleTimerExpired);
      socketClient.off(NEXUS_SOCKET_EVENTS.SUBMISSION.RESULT, handleSubmissionResult);
      socketClient.off(NEXUS_SOCKET_EVENTS.TEAM.STATE_UPDATE, handleStateUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, handlePresenceUpdate);
    };
  }, [token, team?.teamId, pushNotification, applyServerClock]);

  const syncSessionTimer = useCallback(() => {
    if (!socketClient.connected || !team?.teamId) return Promise.resolve(null);
    return new Promise((resolve) => {
      socketClient.emit(
        NEXUS_SOCKET_EVENTS.TIMER.SYNC,
        { teamId: team.teamId },
        (ack) => {
          if (ack?.serverTime) applyServerClock(ack.serverTime);
          if (ack?.timer) setSessionTimer(ack.timer);
          if (ack?.evaluationResult) setLastEvaluationResult(ack.evaluationResult);
          resolve(ack || null);
        }
      );
    });
  }, [team?.teamId, applyServerClock]);

  const loginTeam = useCallback(
    async (teamId, password) => {
      const res = await loginTeamRequest(teamId, password);
      storeTeamSession(res.token, res.team.teamId);
      setToken(res.token);
      setTeam(res.team);
      if (res.transactions) setTransactions(res.transactions);
      if (res.attempts) setAttempts(res.attempts);
      if (res.timer) setSessionTimer(res.timer);
      if (res.serverTime) applyServerClock(res.serverTime);
      if (res.creditsConfig) setCreditsConfig(res.creditsConfig);
      if (res.catalog) setCatalog(res.catalog);
      return res.team;
    },
    [applyServerClock]
  );

  const logoutTeam = useCallback(() => {
    if (socketClient.connected && team?.teamId) {
      socketClient.emit(NEXUS_SOCKET_EVENTS.TEAM.LEAVE, { teamId: team.teamId });
    }
    clearTeamSession();
    setToken(null);
    setTeam(null);
    setTransactions([]);
    setAttempts([]);
    setSessionTimer(null);
    setLastEvaluationResult(null);
    setJoinedRoom(null);
  }, [team?.teamId]);

  const performTeamAction = useCallback(
    async (actionType, actionPayload = {}) => {
      if (!token || !team?.teamId) {
        throw new Error('Not authenticated.');
      }

      setActionPending(true);
      try {
        if (socketClient.connected) {
          return await new Promise((resolve, reject) => {
            socketClient.emit(
              NEXUS_SOCKET_EVENTS.TEAM.ACTION,
              {
                teamId: team.teamId,
                actionType,
                actionPayload,
              },
              (ack) => {
                if (ack?.ok) {
                  if (ack.serverTime) applyServerClock(ack.serverTime);
                  if (ack.timer) setSessionTimer(ack.timer);
                  if (ack.attempts) setAttempts(ack.attempts);
                  if (ack.evaluationResult) {
                    setLastEvaluationResult(ack.evaluationResult);
                  }
                  resolve(ack);
                } else {
                  reject(new Error(ack?.error || 'Action rejected by NEXUS Core.'));
                }
              }
            );
          });
        }

        // HTTP Fallback if WebSocket is reconnecting
        const res = await postTeamActionHttp(token, actionType, actionPayload);
        if (res.team) setTeam(res.team);
        if (res.transactions) setTransactions(res.transactions);
        if (res.attempts) setAttempts(res.attempts);
        if (res.timer) setSessionTimer(res.timer);
        if (res.serverTime) applyServerClock(res.serverTime);
        if (res.creditsConfig) setCreditsConfig(res.creditsConfig);
        if (res.catalog) setCatalog(res.catalog);
        if (res.evaluationResult) setLastEvaluationResult(res.evaluationResult);
        if (res.event?.creditsDelta) {
          setLastCreditChange({
            id: `${Date.now()}`,
            delta: res.event.creditsDelta,
            balanceBefore: res.event.balanceBefore,
            balanceAfter: res.team.credits,
            type: res.event.type,
            timestamp: new Date().toISOString(),
          });
        }
        return res;
      } catch (err) {
        pushNotification(err.message, 'crimson', 0);
        throw err;
      } finally {
        setActionPending(false);
      }
    },
    [token, team?.teamId, pushNotification, applyServerClock]
  );

  return (
    <TeamPortalContext.Provider
      value={{
        token,
        team,
        transactions,
        attempts,
        sessionTimer,
        serverClockOffsetMs,
        creditsConfig,
        lastCreditChange,
        lastEvaluationResult,
        catalog,
        isAuthenticated: Boolean(token && team),
        isInitializing,
        socketConnected,
        joinedRoom: joinedRoom || (team?.teamId ? `team:${team.teamId}` : null),
        onlineOperatives,
        notifications,
        actionPending,
        loginTeam,
        logoutTeam,
        performTeamAction,
        syncSessionTimer,
        clearEvaluationResult,
        dismissNotification,
        pushNotification,
      }}
    >
      {children}
    </TeamPortalContext.Provider>
  );
};

export const useTeamPortal = () => {
  const ctx = useContext(TeamPortalContext);
  if (!ctx) {
    throw new Error('useTeamPortal must be used within a TeamPortalProvider');
  }
  return ctx;
};
