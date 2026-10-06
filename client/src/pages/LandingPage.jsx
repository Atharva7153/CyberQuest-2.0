import React from 'react';
import { EditorialFrameLayout } from '../layouts/EditorialFrameLayout';
import { NexusPosterHero } from '../components/NexusPosterHero';
import { TelemetryProofConsole } from '../components/TelemetryProofConsole';
import { useNexusSystem } from '../hooks/useNexusSystem';

export const LandingPage = () => {
  const {
    apiState,
    socketState,
    dbState,
    logs,
    checkApiHealth,
    triggerRestHandshake,
    triggerSocketPulse,
  } = useNexusSystem();

  const isSystemOnline = apiState.status === 'ONLINE' && socketState.connected;

  return (
    <EditorialFrameLayout systemOnline={isSystemOnline}>
      {/* Poster-inspired Dystopian Brutalist Hero */}
      <NexusPosterHero />

      {/* Live Frontend ↔ Backend ↔ Socket.IO ↔ MongoDB Verification Matrix */}
      <TelemetryProofConsole
        apiState={apiState}
        socketState={socketState}
        dbState={dbState}
        logs={logs}
        onRestHandshake={triggerRestHandshake}
        onSocketPulse={triggerSocketPulse}
        onRefreshHealth={checkApiHealth}
      />
    </EditorialFrameLayout>
  );
};

export default LandingPage;
