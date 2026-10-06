import { useState, useEffect, useCallback } from 'react';
import { fetchSystemHealth, sendDiagnosticRestPing } from '../services/apiService';
import { socketClient, getSocketEndpoint } from '../socket/socketClient';

const formatLogTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
};

export const useNexusSystem = () => {
  const [apiState, setApiState] = useState({
    status: 'CHECKING',
    latencyMs: null,
    endpoint: null,
    report: null,
    error: null,
  });

  const [socketState, setSocketState] = useState({
    connected: false,
    socketId: null,
    endpoint: getSocketEndpoint(),
    activeTerminals: 0,
    lastPingLatencyMs: null,
    lastServerTime: null,
  });

  const [dbState, setDbState] = useState({
    connected: false,
    state: 'INITIALIZING',
    host: '127.0.0.1:27017',
    dbName: 'nexus',
    compassUri: 'mongodb://127.0.0.1:27017/nexus',
    error: null,
  });

  const [logs, setLogs] = useState([]);

  const appendLog = useCallback((channel, message, level = 'INFO') => {
    setLogs((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: formatLogTime(),
        channel,
        level,
        message,
      },
      ...prev.slice(0, 14),
    ]);
  }, []);

  // Poll or trigger REST /api/health
  const checkApiHealth = useCallback(async () => {
    try {
      const { data, latencyMs, endpoint } = await fetchSystemHealth();
      setApiState({
        status: 'ONLINE',
        latencyMs,
        endpoint,
        report: data,
        error: null,
      });

      if (data?.subsystems?.mongoDb) {
        setDbState(data.subsystems.mongoDb);
      }

      appendLog(
        'REST::GET',
        `/api/health -> 200 OK (${latencyMs}ms) | Core: ${data.designation} | DB: ${data?.subsystems?.mongoDb?.state}`,
        'OK'
      );
    } catch (err) {
      setApiState((prev) => ({
        ...prev,
        status: 'OFFLINE',
        error: err.message,
      }));
      appendLog('REST::ERR', `/api/health unreachable: ${err.message}`, 'WARN');
    }
  }, [appendLog]);

  // Manual REST POST handshake
  const triggerRestHandshake = useCallback(async () => {
    try {
      const { data, latencyMs } = await sendDiagnosticRestPing('OPERATOR_MANUAL_HANDSHAKE');
      setApiState((prev) => ({
        ...prev,
        status: 'ONLINE',
        latencyMs,
        report: data,
        error: null,
      }));
      if (data?.subsystems?.mongoDb) {
        setDbState(data.subsystems.mongoDb);
      }
      appendLog(
        'REST::POST',
        `/api/health/ping -> ${data?.diagnosticEcho?.message || 'VERIFIED'} (${latencyMs}ms)`,
        'OK'
      );
    } catch (err) {
      appendLog('REST::ERR', `POST /api/health/ping failed: ${err.message}`, 'WARN');
    }
  }, [appendLog]);

  // Manual Socket.IO diagnostic pulse
  const triggerSocketPulse = useCallback(() => {
    if (!socketClient.connected) {
      appendLog('SOCKET::WARN', 'Cannot emit pulse — Socket.IO terminal offline.', 'WARN');
      return;
    }

    const sentAt = performance.now();
    socketClient.emit(
      'nexus:ping',
      {
        signal: 'NEXUS_OPERATOR_PULSE',
        clientTimestamp: Date.now(),
      },
      (ack) => {
        const rtt = Math.round(performance.now() - sentAt);
        setSocketState((prev) => ({
          ...prev,
          lastPingLatencyMs: rtt,
          activeTerminals: ack?.activeTerminals ?? prev.activeTerminals,
          lastServerTime: ack?.serverIsoTime ?? prev.lastServerTime,
        }));
        if (ack?.database) {
          setDbState(ack.database);
        }
        appendLog(
          'SOCKET::ACK',
          `nexus:pong received [ID: ${ack?.socketId}] | RTT: ${rtt}ms | Active Nodes: ${ack?.activeTerminals}`,
          'OK'
        );
      }
    );
  }, [appendLog]);

  useEffect(() => {
    checkApiHealth();

    const onConnect = () => {
      setSocketState((prev) => ({
        ...prev,
        connected: true,
        socketId: socketClient.id,
      }));
      appendLog('SOCKET::LINK', `Connected to NEXUS Socket Server [ID: ${socketClient.id}]`, 'OK');
    };

    const onDisconnect = (reason) => {
      setSocketState((prev) => ({
        ...prev,
        connected: false,
        socketId: null,
      }));
      appendLog('SOCKET::DROP', `Socket disconnected (${reason})`, 'WARN');
    };

    const onWelcome = (payload) => {
      setSocketState((prev) => ({
        ...prev,
        connected: true,
        socketId: payload.socketId,
        activeTerminals: payload.activeTerminals,
        lastServerTime: payload.serverTime,
      }));
      if (payload.database) {
        setDbState(payload.database);
      }
      appendLog('SOCKET::INIT', `${payload.message} [Node: ${payload.designation}]`, 'OK');
      // Immediately measure initial RTT
      const start = performance.now();
      socketClient.emit('nexus:ping', { signal: 'INITIAL_SYNC' }, () => {
        const rtt = Math.round(performance.now() - start);
        setSocketState((prev) => ({ ...prev, lastPingLatencyMs: rtt }));
      });
    };

    const onTelemetry = (payload) => {
      setSocketState((prev) => ({
        ...prev,
        activeTerminals: payload.activeTerminals,
        lastServerTime: payload.serverTime,
      }));
      if (payload.database) {
        setDbState(payload.database);
      }
    };

    const onTerminals = (payload) => {
      setSocketState((prev) => ({
        ...prev,
        activeTerminals: payload.activeTerminals,
      }));
    };

    socketClient.on('connect', onConnect);
    socketClient.on('disconnect', onDisconnect);
    socketClient.on('nexus:welcome', onWelcome);
    socketClient.on('nexus:telemetry', onTelemetry);
    socketClient.on('nexus:terminals', onTerminals);

    socketClient.connect();

    return () => {
      socketClient.off('connect', onConnect);
      socketClient.off('disconnect', onDisconnect);
      socketClient.off('nexus:welcome', onWelcome);
      socketClient.off('nexus:telemetry', onTelemetry);
      socketClient.off('nexus:terminals', onTerminals);
      socketClient.disconnect();
    };
  }, [appendLog, checkApiHealth]);

  return {
    apiState,
    socketState,
    dbState,
    logs,
    checkApiHealth,
    triggerRestHandshake,
    triggerSocketPulse,
  };
};
