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
  }, [token]);

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
      socketClient.off(NEXUS_SOCKET_EVENTS.SUBMISSION.RESULT, handleSubmissionResult);
      socketClient.off(NEXUS_SOCKET_EVENTS.TEAM.STATE_UPDATE, handleStateUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, handlePresenceUpdate);
    };
  }, [token, team?.teamId, pushNotification]);

  const loginTeam = useCallback(async (teamId, password) => {
    const res = await loginTeamRequest(teamId, password);
    storeTeamSession(res.token, res.team.teamId);
    setToken(res.token);
    setTeam(res.team);
    if (res.transactions) setTransactions(res.transactions);
    if (res.creditsConfig) setCreditsConfig(res.creditsConfig);
    if (res.catalog) setCatalog(res.catalog);
    return res.team;
  }, []);

  const logoutTeam = useCallback(() => {
    if (socketClient.connected && team?.teamId) {
      socketClient.emit(NEXUS_SOCKET_EVENTS.TEAM.LEAVE, { teamId: team.teamId });
    }
    clearTeamSession();
    setToken(null);
    setTeam(null);
    setTransactions([]);
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
    [token, team?.teamId, pushNotification]
  );

  return (
    <TeamPortalContext.Provider
      value={{
        token,
        team,
        transactions,
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
