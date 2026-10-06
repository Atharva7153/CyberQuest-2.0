import React, { useState } from 'react';
import {
  Activity,
  Radio,
  Database,
  Terminal,
  RefreshCw,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { BrutalistPanel } from './BrutalistPanel';
import { SystemBadge } from './SystemBadge';
import { CrosshairMark } from './CrosshairMark';

export const TelemetryProofConsole = ({
  apiState,
  socketState,
  dbState,
  logs,
  onRestHandshake,
  onSocketPulse,
  onRefreshHealth,
}) => {
  const [copiedUri, setCopiedUri] = useState(false);

  const handleCopyCompassUri = () => {
    const uri = dbState.compassUri || 'mongodb://127.0.0.1:27017/nexus';
    navigator.clipboard.writeText(uri);
    setCopiedUri(true);
    setTimeout(() => setCopiedUri(false), 2000);
  };

  return (
    <section className="mt-6 pb-8">
      {/* Section Header Divider */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-5 border-b-2 border-nexus-ink">
        <div className="flex items-center gap-2.5">
          <CrosshairMark variant="crimson" size={14} />
          <h2 className="font-condensed text-lg sm:text-xl font-extrabold uppercase tracking-wider text-nexus-ink">
            NEXUS CORE // FULL-STACK FOUNDATION TELEMETRY
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-nexus-muted uppercase">
            PHASE 01 DIAGNOSTIC LINK
          </span>
          <SystemBadge
            variant={apiState.status === 'ONLINE' && socketState.connected ? 'operational' : 'crimson'}
            pulse
          >
            {apiState.status === 'ONLINE' && socketState.connected
              ? 'ALL LINKS ACTIVE'
              : 'INITIALIZING LINK'}
          </SystemBadge>
        </div>
      </div>

      {/* 3-Column Subsystem Proof Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. EXPRESS REST API HEALTH (/api/health) */}
        <BrutalistPanel
          codeTag="SUBSYS // 01"
          title="EXPRESS REST API"
          accentTitle
          headerRight={
            <SystemBadge
              variant={apiState.status === 'ONLINE' ? 'operational' : 'crimson'}
              pulse={apiState.status === 'ONLINE'}
            >
              {apiState.status}
            </SystemBadge>
          }
        >
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">HEALTH ENDPOINT:</span>
              <span className="font-semibold text-nexus-ink">GET /api/health</span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">DESIGNATION:</span>
              <span className="font-semibold text-nexus-ink">
                {apiState.report?.designation || 'NEXUS-CORE-01'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">HTTP LATENCY:</span>
              <span className="font-semibold text-nexus-crimson">
                {apiState.latencyMs !== null ? `${apiState.latencyMs} ms` : '—'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">CORE UPTIME:</span>
              <span className="font-semibold text-nexus-ink">
                {apiState.report?.uptimeSeconds !== undefined
                  ? `${apiState.report.uptimeSeconds}s`
                  : '—'}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onRestHandshake}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-nexus-ink text-nexus-paper font-mono text-xs font-semibold uppercase tracking-wider border border-nexus-ink hover:bg-nexus-crimson hover:border-nexus-crimson transition-colors cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              PING REST API
            </button>
            <button
              type="button"
              onClick={onRefreshHealth}
              title="Refresh GET /api/health"
              className="px-2.5 py-2 bg-nexus-paper text-nexus-ink border border-nexus-ink hover:bg-nexus-paper-aged transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </BrutalistPanel>

        {/* 2. SOCKET.IO REAL-TIME ENGINE */}
        <BrutalistPanel
          codeTag="SUBSYS // 02"
          title="SOCKET.IO REAL-TIME"
          accentTitle
          headerRight={
            <SystemBadge
              variant={socketState.connected ? 'operational' : 'crimson'}
              pulse={socketState.connected}
            >
              {socketState.connected ? 'CONNECTED' : 'DISCONNECTED'}
            </SystemBadge>
          }
        >
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">TERMINAL SOCKET ID:</span>
              <span className="font-semibold text-nexus-ink truncate max-w-[160px]">
                {socketState.socketId || 'AWAITING_HANDSHAKE'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">ACTIVE TERMINALS:</span>
              <span className="font-semibold text-nexus-ink">
                {socketState.activeTerminals} NODE(S)
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">ROUND-TRIP PULSE:</span>
              <span className="font-semibold text-nexus-crimson">
                {socketState.lastPingLatencyMs !== null
                  ? `${socketState.lastPingLatencyMs} ms`
                  : '—'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">TRANSPORT:</span>
              <span className="font-semibold text-nexus-ink">WEBSOCKET // FULL-DUPLEX</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={onSocketPulse}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-nexus-crimson text-white font-mono text-xs font-semibold uppercase tracking-wider border border-nexus-ink shadow-brutal-sm hover:bg-nexus-ink transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              EMIT SOCKET.IO PULSE (nexus:ping)
            </button>
          </div>
        </BrutalistPanel>

        {/* 3. MONGODB + MONGOOSE COMPASS LINK */}
        <BrutalistPanel
          codeTag="SUBSYS // 03"
          title="MONGODB + MONGOOSE"
          accentTitle
          headerRight={
            <SystemBadge
              variant={dbState.connected ? 'operational' : 'outline'}
              pulse={dbState.connected}
            >
              {dbState.state || 'STANDBY'}
            </SystemBadge>
          }
        >
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">DATABASE ENGINE:</span>
              <span className="font-semibold text-nexus-ink">MONGODB LOCAL</span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">TARGET DB / HOST:</span>
              <span className="font-semibold text-nexus-ink">
                {dbState.dbName} @ {dbState.host}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">MONGOOSE ODM:</span>
              <span
                className={`font-semibold ${
                  dbState.connected ? 'text-nexus-ink' : 'text-nexus-crimson'
                }`}
              >
                {dbState.connected ? 'LINKED (system_nodes)' : 'AWAITING LOCAL MONGOD'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-dashed border-nexus-ink/20">
              <span className="text-nexus-muted">COMPASS URI:</span>
              <span className="font-semibold text-nexus-ink text-[11px] truncate max-w-[165px]">
                {dbState.compassUri}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleCopyCompassUri}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-nexus-paper text-nexus-ink font-mono text-xs font-semibold uppercase tracking-wider border border-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper transition-colors cursor-pointer"
            >
              {copiedUri ? (
                <>
                  <Check className="w-3.5 h-3.5 text-nexus-crimson" />
                  COPIED COMPASS URI
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  COPY MONGODB COMPASS URI
                </>
              )}
            </button>
          </div>
        </BrutalistPanel>
      </div>

      {/* =================================================================
          4. LIVE TERMINAL EVENT LOG & POSTER FOOTER MODULES
         ================================================================= */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Live Monospace Communication Log */}
        <div className="lg:col-span-8">
          <BrutalistPanel
            codeTag="SYS_LOG"
            title="LIVE FRONTEND ↔ BACKEND COMMUNICATION STREAM"
            accentTitle={false}
            headerRight={
              <span className="font-mono text-[10px] text-nexus-crimson uppercase tracking-widest flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-pulse" />
                LIVE STREAM
              </span>
            }
          >
            <div className="bg-nexus-ink text-nexus-paper p-3.5 font-mono text-xs h-44 overflow-y-auto border border-nexus-ink space-y-1.5">
              {logs.length === 0 ? (
                <p className="text-nexus-paper/60">
                  [SYSTEM] Initializing NEXUS communication channels...
                </p>
              ) : (
                logs.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-2 leading-relaxed border-b border-nexus-paper/10 pb-1 last:border-none"
                  >
                    <span className="text-nexus-paper/50 shrink-0">[{entry.timestamp}]</span>
                    <span
                      className={`px-1 text-[10px] font-bold shrink-0 ${
                        entry.level === 'WARN'
                          ? 'bg-nexus-crimson text-white'
                          : 'bg-nexus-paper text-nexus-ink'
                      }`}
                    >
                      {entry.channel}
                    </span>
                    <span className="text-nexus-paper break-all">{entry.message}</span>
                  </div>
                ))
              )}
            </div>
          </BrutalistPanel>
        </div>

        {/* Design System & Architecture Verification Block */}
        <div className="lg:col-span-4">
          <BrutalistPanel
            codeTag="TOKENS // V1"
            title="VISUAL & ARCH SPEC"
            accentTitle
          >
            <div className="space-y-3">
              {/* Swatch strip proving reusable tokens */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted mb-1.5">
                  ACTIVE DESIGN TOKENS (CSS + TAILWIND)
                </p>
                <div className="grid grid-cols-4 gap-2 font-mono text-[10px]">
                  <div className="border border-nexus-ink p-1.5 bg-nexus-paper">
                    <div className="h-4 bg-nexus-paper border border-nexus-ink/30 mb-1" />
                    PAPER
                  </div>
                  <div className="border border-nexus-ink p-1.5 bg-nexus-paper">
                    <div className="h-4 bg-nexus-ink mb-1" />
                    CARBON
                  </div>
                  <div className="border border-nexus-ink p-1.5 bg-nexus-paper">
                    <div className="h-4 bg-nexus-crimson mb-1" />
                    CRIMSON
                  </div>
                  <div className="border border-nexus-ink p-1.5 bg-nexus-paper">
                    <div className="h-4 bg-nexus-paper-aged border border-nexus-ink/30 mb-1" />
                    AGED
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-nexus-ink/25 font-mono text-[11px] space-y-1 text-nexus-charcoal">
                <p className="flex justify-between">
                  <span className="text-nexus-muted">CLIENT STACK:</span>
                  <span className="font-semibold">REACT + VITE + TAILWIND</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-nexus-muted">SERVER STACK:</span>
                  <span className="font-semibold">NODE + EXPRESS + SOCKET.IO</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-nexus-muted">PERSISTENCE:</span>
                  <span className="font-semibold">MONGODB + MONGOOSE</span>
                </p>
              </div>
            </div>
          </BrutalistPanel>
        </div>
      </div>
    </section>
  );
};

export default TelemetryProofConsole;
