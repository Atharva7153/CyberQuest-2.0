import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorialFrameLayout } from '../layouts/EditorialFrameLayout';
import { TelemetryProofConsole } from '../components/TelemetryProofConsole';
import { NexusActionButton } from '../components/NexusActionButton';
import { CrosshairMark } from '../components/CrosshairMark';
import { SystemBadge } from '../components/SystemBadge';
import { useNexusSystem } from '../hooks/useNexusSystem';

export const SystemEntryPage = () => {
  const navigate = useNavigate();
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
      <section
        aria-labelledby="system-gateway-heading"
        className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-8 space-y-8"
      >
        {/* Top Gateway Banner */}
        <div className="nexus-editorial-box p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-nexus-ink pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-nexus-crimson text-white font-mono text-xs font-bold px-2.5 py-1 uppercase tracking-widest">
                NEXUS // GATEWAY
              </span>
              <CrosshairMark variant="crimson" size={14} label="AUTH_GATE: STANDBY" />
            </div>
            <SystemBadge variant={isSystemOnline ? 'operational' : 'crimson'} pulse>
              {isSystemOnline ? 'NEXUS CORE ONLINE' : 'SYNCHRONIZING'}
            </SystemBadge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h1
                id="system-gateway-heading"
                className="font-display text-4xl sm:text-6xl uppercase tracking-wide leading-[0.9] text-nexus-ink"
              >
                NEXUS SYSTEM <span className="text-nexus-crimson">TERMINAL</span>
              </h1>
              <p className="font-editorial text-base sm:text-lg text-nexus-charcoal max-w-2xl leading-relaxed">
                You have entered the NEXUS perimeter. Team authentication, starting Resistance
                Credits allocation, and the live Challenge Marketplace activate when the marathon
                commences.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <NexusActionButton
                variant="secondary"
                onClick={() => navigate('/')}
                ariaLabel="Return to Public Landing Page"
              >
                RETURN TO BRIEFING
              </NexusActionButton>
            </div>
          </div>
        </div>

        {/* Live Telemetry Console (Proving Frontend + Express + Socket.IO + MongoDB) */}
        <TelemetryProofConsole
          apiState={apiState}
          socketState={socketState}
          dbState={dbState}
          logs={logs}
          onRestHandshake={triggerRestHandshake}
          onSocketPulse={triggerSocketPulse}
          onRefreshHealth={checkApiHealth}
        />
      </section>
    </EditorialFrameLayout>
  );
};

export default SystemEntryPage;
