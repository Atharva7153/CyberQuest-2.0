import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  getStoredToken,
  getStoredOperative,
  storeTeamSession,
  clearTeamSession,
  loginTeamRequest,
  fetchAuthenticatedTeam,
  postTeamActionHttp,
} from '../services/authService';
import { socketClient, NEXUS_SOCKET_EVENTS } from '../socket/socketClient';
import { API_BASE_URL } from '../config/runtimeConfig';

const TeamPortalContext = createContext(null);

export const TeamPortalProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken());
  const [operative, setOperative] = useState(() => getStoredOperative());
  const [team, setTeam] = useState(null);
  const [nexusCore, setNexusCore] = useState(null);
  const [coreDiscoveryEvent, setCoreDiscoveryEvent] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [progressSummary, setProgressSummary] = useState(null);
  const [liveFeed, setLiveFeed] = useState([]);
  const [lastFeedEvent, setLastFeedEvent] = useState(null);
  const [sessionTimer, setSessionTimer] = useState(null);
  const [globalTimer, setGlobalTimer] = useState({
    status: 'PAUSED',
    remainingSeconds: 2700,
    totalDurationSeconds: 2700,
    formatted: '00:45:00',
  });
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
  const [lastAbilityActivation, setLastAbilityActivation] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [abilitiesCatalog, setAbilitiesCatalog] = useState([]);
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

  // Tick globalTimer locally every 1s when status === 'ACTIVE' or 'COUNTDOWN'
  useEffect(() => {
    const id = setInterval(() => {
      setGlobalTimer((prev) => {
        if (!prev) return prev;
        if (prev.status === 'COUNTDOWN' && prev.countdownTargetTimestamp) {
          const cdTargetMs = new Date(prev.countdownTargetTimestamp).getTime();
          const cdRem = Math.max(0, Math.ceil((cdTargetMs - Date.now()) / 1000));
          if (cdRem <= 0) {
            const totalSec = Number(prev.totalDurationSeconds || prev.remainingSeconds || 2700);
            const targetEndTimeMs = prev.targetTimestamp
              ? new Date(prev.targetTimestamp).getTime()
              : Date.now() + totalSec * 1000;
            const remaining = Math.max(0, Math.floor((targetEndTimeMs - Date.now()) / 1000));
            const hrs = String(Math.floor(remaining / 3600)).padStart(2, '0');
            const mins = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
            const secs = String(remaining % 60).padStart(2, '0');
            return {
              ...prev,
              status: 'ACTIVE',
              countdownRemainingSeconds: 0,
              remainingSeconds: remaining,
              formatted: `${hrs}:${mins}:${secs}`,
              targetEndTimeMs,
            };
          }
          return {
            ...prev,
            countdownRemainingSeconds: cdRem,
          };
        }
        if (prev.status !== 'ACTIVE' || !prev.targetEndTimeMs) {
          return prev;
        }
        const remaining = Math.max(0, Math.floor((prev.targetEndTimeMs - Date.now()) / 1000));
        const hrs = String(Math.floor(remaining / 3600)).padStart(2, '0');
        const mins = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
        const secs = String(remaining % 60).padStart(2, '0');
        return {
          ...prev,
          remainingSeconds: remaining,
          formatted: `${hrs}:${mins}:${secs}`,
          status: remaining <= 0 ? 'ENDED' : 'ACTIVE',
        };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Keep globalTimer continuously synced with /api/display even if socket reconnects
  useEffect(() => {
    let active = true;

    const syncGlobalTimerHttp = () => {
      fetch(`${API_BASE_URL}/api/display`)
        .then((r) => r.json())
        .then((data) => {
          if (active && data?.globalTimer) {
            setGlobalTimer(data.globalTimer);
          }
        })
        .catch(() => {});
    };

    const pollId = setInterval(syncGlobalTimerHttp, 2000);
    return () => {
      active = false;
      clearInterval(pollId);
    };
  }, []);

  const mergeIncomingFeedEvents = useCallback((incomingEvents = [], fullFeed = null) => {
    if (Array.isArray(fullFeed) && fullFeed.length > 0 && (!incomingEvents || incomingEvents.length === 0)) {
      setLiveFeed(fullFeed);
      return;
    }

    if (Array.isArray(incomingEvents) && incomingEvents.length > 0) {
      setLastFeedEvent({
        ...incomingEvents[0],
        receivedAt: Date.now(),
      });
    }

    setLiveFeed((prev) => {
      const base = Array.isArray(fullFeed) && fullFeed.length > 0 ? fullFeed : prev;
      const combined = [...(incomingEvents || []), ...base];
      const seen = new Set();
      const deduped = [];
      for (const item of combined) {
        if (!item) continue;
        const key = item.feedId || `${item.eventType}-${item.title}-${item.timestamp}`;
        if (!seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      }
      deduped.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return deduped.slice(0, 80);
    });
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

  const clearAbilityActivation = useCallback(() => {
    setLastAbilityActivation(null);
  }, []);

  const clearCoreDiscovery = useCallback(() => {
    setCoreDiscoveryEvent(null);
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
        if (res.operative) {
          setOperative(res.operative);
          storeTeamSession(token, res.team?.teamId, res.operative);
        }
        if (res.nexusCore) setNexusCore(res.nexusCore);
        if (res.transactions) setTransactions(res.transactions);
        if (res.attempts) setAttempts(res.attempts);
        if (res.attemptHistory) setAttemptHistory(res.attemptHistory);
        if (res.progressSummary) setProgressSummary(res.progressSummary);
        if (res.liveFeed) setLiveFeed(res.liveFeed);
        if (res.timer) setSessionTimer(res.timer);
        if (res.globalTimer) setGlobalTimer(res.globalTimer);
        if (res.serverTime) applyServerClock(res.serverTime);
        if (res.creditsConfig) setCreditsConfig(res.creditsConfig);
        if (res.catalog) setCatalog(res.catalog);
        if (res.abilitiesCatalog) setAbilitiesCatalog(res.abilitiesCatalog);
      })
      .catch(() => {
        if (!active) return;
        clearTeamSession();
        setToken(null);
        setOperative(null);
        setTeam(null);
        setNexusCore(null);
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
        {
          teamId: team.teamId,
          token,
          memberId: operative?.memberId,
          memberName: operative?.memberName || operative?.name,
        },
        (ack) => {
          if (ack?.ok) {
            setJoinedRoom(ack.room);
            setOnlineOperatives(ack.onlineOperatives || 1);
            if (ack.team) setTeam(ack.team);
            if (ack.nexusCore) setNexusCore(ack.nexusCore);
            if (ack.transactions) setTransactions(ack.transactions);
            if (ack.attempts) setAttempts(ack.attempts);
            if (ack.attemptHistory) setAttemptHistory(ack.attemptHistory);
            if (ack.progressSummary) setProgressSummary(ack.progressSummary);
            if (ack.liveFeed) setLiveFeed(ack.liveFeed);
            if (ack.timer) setSessionTimer(ack.timer);
            if (ack.globalTimer) setGlobalTimer(ack.globalTimer);
            if (ack.serverTime) applyServerClock(ack.serverTime);
            if (ack.creditsConfig) setCreditsConfig(ack.creditsConfig);
            if (ack.catalog) setCatalog(ack.catalog);
            if (ack.abilitiesCatalog) setAbilitiesCatalog(ack.abilitiesCatalog);
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

    const handleFeedEvent = (payload) => {
      if (payload?.events || payload?.liveFeed) {
        mergeIncomingFeedEvents(payload.events || [], payload.liveFeed || null);
      }
    };

    const handleTimerUpdate = (payload) => {
      if (payload?.serverTime) {
        applyServerClock(payload.serverTime);
      }
      if (payload?.timer) {
        setSessionTimer(payload.timer);
      }
      if (payload?.globalTimer) {
        setGlobalTimer(payload.globalTimer);
      }
    };

    const handleGlobalTimerPayload = (payload) => {
      if (payload?.globalTimer) {
        setGlobalTimer(payload.globalTimer);
      }
    };

    const handleTimerExpired = (payload) => {
      if (payload?.serverTime) {
        applyServerClock(payload.serverTime);
      }
      if (payload?.evaluationResult) {
        setLastEvaluationResult((prev) => {
          if (
            prev &&
            (prev.status === 'SUCCESS' || prev.passed) &&
            payload.evaluationResult.status === 'TIMEOUT'
          ) {
            return prev;
          }
          return payload.evaluationResult;
        });
      }
    };

    const handleSubmissionResult = (payload) => {
      if (payload) {
        setLastEvaluationResult((prev) => {
          if (prev && (prev.status === 'SUCCESS' || prev.passed) && payload.status === 'TIMEOUT') {
            return prev;
          }
          return payload;
        });
      }
    };

    const handleAbilityEffect = (payload) => {
      if (payload?.abilityId) {
        setLastAbilityActivation({
          ...payload,
          receivedAt: Date.now(),
        });
      }
    };

    const handleCoreAvailable = (payload) => {
      if (payload?.nexusCore) {
        setNexusCore(payload.nexusCore);
      }
      setCoreDiscoveryEvent({
        ...(payload || {}),
        receivedAt: Date.now(),
      });
      pushNotification(
        payload?.message || 'THE NEXUS CORE IS NOW AVAILABLE // ULTIMATE SYSTEM OBJECTIVE UNLOCKED',
        'crimson',
        0
      );
    };

    const handleCoreStateUpdate = (payload) => {
      if (payload?.nexusCore) {
        setNexusCore(payload.nexusCore);
      }
      if (payload?.coreEvaluation) {
        setLastEvaluationResult(payload.coreEvaluation);
      }
    };

    const handleCoreCompleted = (payload) => {
      if (payload?.nexusCore) {
        setNexusCore(payload.nexusCore);
      }
      if (payload?.coreEvaluation) {
        setLastEvaluationResult(payload.coreEvaluation);
      }
      const rewardCr = payload?.coreEvaluation?.creditsDelta || 1500;
      pushNotification(
        `NEXUS CORE SOLVED // SQUAD [${payload?.teamName || payload?.teamId}] EARNED +${rewardCr} CR!`,
        'operational',
        rewardCr
      );
    };

    const handleStateUpdate = (payload) => {
      if (payload?.team) {
        setTeam(payload.team);
      }
      if (payload?.nexusCore) {
        setNexusCore(payload.nexusCore);
      }
      if (payload?.transactions) {
        setTransactions(payload.transactions);
      }
      if (payload?.attempts) {
        setAttempts(payload.attempts);
      }
      if (payload?.attemptHistory) {
        setAttemptHistory(payload.attemptHistory);
      }
      if (payload?.progressSummary) {
        setProgressSummary(payload.progressSummary);
      }
      if (payload?.liveFeed || payload?.liveFeedEvents) {
        mergeIncomingFeedEvents(payload.liveFeedEvents || [], payload.liveFeed || null);
      }
      if (payload?.timer) {
        setSessionTimer(payload.timer);
      }
      if (payload?.globalTimer) {
        setGlobalTimer(payload.globalTimer);
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
      if (payload?.abilitiesCatalog) {
        setAbilitiesCatalog(payload.abilitiesCatalog);
      }
      if (payload?.abilityActivation) {
        setLastAbilityActivation({
          ...payload.abilityActivation,
          receivedAt: Date.now(),
        });
      }
      if (payload?.evaluationResult) {
        setLastEvaluationResult((prev) => {
          if (
            prev &&
            (prev.status === 'SUCCESS' || prev.passed) &&
            payload.evaluationResult.status === 'TIMEOUT'
          ) {
            return prev;
          }
          return payload.evaluationResult;
        });
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
    socketClient.on(NEXUS_SOCKET_EVENTS.FEED.EVENT, handleFeedEvent);
    socketClient.on(NEXUS_SOCKET_EVENTS.TIMER.UPDATE, handleTimerUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.TIMER.EXPIRED, handleTimerExpired);
    socketClient.on(NEXUS_SOCKET_EVENTS.SUBMISSION.RESULT, handleSubmissionResult);
    socketClient.on(NEXUS_SOCKET_EVENTS.ABILITY.EFFECT, handleAbilityEffect);
    socketClient.on(NEXUS_SOCKET_EVENTS.CORE.AVAILABLE, handleCoreAvailable);
    socketClient.on(NEXUS_SOCKET_EVENTS.CORE.STATE_UPDATE, handleCoreStateUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.CORE.COMPLETED, handleCoreCompleted);
    socketClient.on(NEXUS_SOCKET_EVENTS.TEAM.STATE_UPDATE, handleStateUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, handlePresenceUpdate);
    socketClient.on(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleGlobalTimerPayload);
    socketClient.on(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleGlobalTimerPayload);
    socketClient.on(NEXUS_SOCKET_EVENTS.LEADERBOARD.SNAPSHOT, handleGlobalTimerPayload);

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
      socketClient.off(NEXUS_SOCKET_EVENTS.FEED.EVENT, handleFeedEvent);
      socketClient.off(NEXUS_SOCKET_EVENTS.TIMER.UPDATE, handleTimerUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.TIMER.EXPIRED, handleTimerExpired);
      socketClient.off(NEXUS_SOCKET_EVENTS.SUBMISSION.RESULT, handleSubmissionResult);
      socketClient.off(NEXUS_SOCKET_EVENTS.ABILITY.EFFECT, handleAbilityEffect);
      socketClient.off(NEXUS_SOCKET_EVENTS.CORE.AVAILABLE, handleCoreAvailable);
      socketClient.off(NEXUS_SOCKET_EVENTS.CORE.STATE_UPDATE, handleCoreStateUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.CORE.COMPLETED, handleCoreCompleted);
      socketClient.off(NEXUS_SOCKET_EVENTS.TEAM.STATE_UPDATE, handleStateUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.TEAM.PRESENCE_UPDATE, handlePresenceUpdate);
      socketClient.off(NEXUS_SOCKET_EVENTS.SYSTEM.TELEMETRY, handleGlobalTimerPayload);
      socketClient.off(NEXUS_SOCKET_EVENTS.LEADERBOARD.UPDATE, handleGlobalTimerPayload);
      socketClient.off(NEXUS_SOCKET_EVENTS.LEADERBOARD.SNAPSHOT, handleGlobalTimerPayload);
    };
  }, [token, team?.teamId, operative?.memberId, operative?.memberName, operative?.name, pushNotification, applyServerClock, mergeIncomingFeedEvents]);

  const syncSessionTimer = useCallback(() => {
    if (!socketClient.connected || !team?.teamId) return Promise.resolve(null);
    return new Promise((resolve) => {
      socketClient.emit(
        NEXUS_SOCKET_EVENTS.TIMER.SYNC,
        { teamId: team.teamId },
        (ack) => {
          if (ack?.serverTime) applyServerClock(ack.serverTime);
          if (ack?.timer) setSessionTimer(ack.timer);
          if (ack?.globalTimer) setGlobalTimer(ack.globalTimer);
          if (ack?.evaluationResult) {
            setLastEvaluationResult((prev) => {
              if (
                prev &&
                (prev.status === 'SUCCESS' || prev.passed) &&
                ack.evaluationResult.status === 'TIMEOUT'
              ) {
                return prev;
              }
              return ack.evaluationResult;
            });
          }
          resolve(ack || null);
        }
      );
    });
  }, [team?.teamId, applyServerClock]);

  const loginTeam = useCallback(
    async (teamId, password, operativeDetails = {}) => {
      const res = await loginTeamRequest(teamId, password, operativeDetails);
      storeTeamSession(res.token, res.team.teamId, res.operative);
      setToken(res.token);
      if (res.operative) setOperative(res.operative);
      setTeam(res.team);
      if (res.nexusCore) setNexusCore(res.nexusCore);
      if (res.transactions) setTransactions(res.transactions);
      if (res.attempts) setAttempts(res.attempts);
      if (res.attemptHistory) setAttemptHistory(res.attemptHistory);
      if (res.progressSummary) setProgressSummary(res.progressSummary);
      if (res.liveFeed) setLiveFeed(res.liveFeed);
      if (res.timer) setSessionTimer(res.timer);
      if (res.globalTimer) setGlobalTimer(res.globalTimer);
      if (res.serverTime) applyServerClock(res.serverTime);
      if (res.creditsConfig) setCreditsConfig(res.creditsConfig);
      if (res.catalog) setCatalog(res.catalog);
      if (res.abilitiesCatalog) setAbilitiesCatalog(res.abilitiesCatalog);
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
    setOperative(null);
    setTeam(null);
    setNexusCore(null);
    setCoreDiscoveryEvent(null);
    setTransactions([]);
    setAttempts([]);
    setAttemptHistory([]);
    setProgressSummary(null);
    setLiveFeed([]);
    setLastFeedEvent(null);
    setSessionTimer(null);
    setLastEvaluationResult(null);
    setLastAbilityActivation(null);
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
                token,
                actionType,
                actionPayload,
              },
              (ack) => {
                if (ack?.ok) {
                  if (ack.serverTime) applyServerClock(ack.serverTime);
                  if (ack.timer) setSessionTimer(ack.timer);
                  if (ack.globalTimer) setGlobalTimer(ack.globalTimer);
                  if (ack.nexusCore) setNexusCore(ack.nexusCore);
                  if (ack.attempts) setAttempts(ack.attempts);
                  if (ack.attemptHistory) setAttemptHistory(ack.attemptHistory);
                  if (ack.progressSummary) setProgressSummary(ack.progressSummary);
                  if (ack.liveFeed || ack.liveFeedEvents) {
                    mergeIncomingFeedEvents(ack.liveFeedEvents || [], ack.liveFeed || null);
                  }
                  if (ack.abilitiesCatalog) setAbilitiesCatalog(ack.abilitiesCatalog);
                  if (ack.abilityActivation) {
                    setLastAbilityActivation({
                      ...ack.abilityActivation,
                      receivedAt: Date.now(),
                    });
                  }
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
        if (res.nexusCore) setNexusCore(res.nexusCore);
        if (actionType === 'UNLOCK_NEXUS_CORE' && res.nexusCore?.state === 'AVAILABLE') {
          setCoreDiscoveryEvent({
            teamId: res.team?.teamId,
            nexusCore: res.nexusCore,
            state: 'AVAILABLE',
            receivedAt: Date.now(),
          });
        }
        if (res.transactions) setTransactions(res.transactions);
        if (res.attempts) setAttempts(res.attempts);
        if (res.attemptHistory) setAttemptHistory(res.attemptHistory);
        if (res.progressSummary) setProgressSummary(res.progressSummary);
        if (res.liveFeed || res.liveFeedEvents) {
          mergeIncomingFeedEvents(res.liveFeedEvents || [], res.liveFeed || null);
        }
        if (res.timer) setSessionTimer(res.timer);
        if (res.globalTimer) setGlobalTimer(res.globalTimer);
        if (res.serverTime) applyServerClock(res.serverTime);
        if (res.creditsConfig) setCreditsConfig(res.creditsConfig);
        if (res.catalog) setCatalog(res.catalog);
        if (res.abilitiesCatalog) setAbilitiesCatalog(res.abilitiesCatalog);
        if (res.abilityActivation) {
          setLastAbilityActivation({
            ...res.abilityActivation,
            receivedAt: Date.now(),
          });
        }
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
    [token, team?.teamId, pushNotification, applyServerClock, mergeIncomingFeedEvents]
  );

  const isRoundActive =
    globalTimer?.status === 'ACTIVE' && Number(globalTimer?.remainingSeconds ?? 2700) > 0;

  return (
    <TeamPortalContext.Provider
      value={{
        token,
        operative,
        team,
        nexusCore,
        coreDiscoveryEvent,
        transactions,
        attempts,
        attemptHistory,
        progressSummary,
        liveFeed,
        lastFeedEvent,
        sessionTimer,
        globalTimer,
        isRoundActive,
        serverClockOffsetMs,
        creditsConfig,
        lastCreditChange,
        lastEvaluationResult,
        lastAbilityActivation,
        catalog,
        abilitiesCatalog,
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
        clearAbilityActivation,
        clearCoreDiscovery,
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
