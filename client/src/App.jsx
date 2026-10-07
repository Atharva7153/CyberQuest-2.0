import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TeamPortalProvider } from './hooks/useTeamPortal';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChallengeSessionPage } from './pages/ChallengeSessionPage';
import { ProgressPage } from './pages/ProgressPage';
import { HistoryPage } from './pages/HistoryPage';
import { NexusCorePage } from './pages/NexusCorePage';
import { ProjectorDisplayPage } from './pages/ProjectorDisplayPage';
import { SystemEntryPage } from './pages/SystemEntryPage';
import { NexusPageTransition } from './components/NexusPageTransition';

export const App = () => {
  return (
    <TeamPortalProvider>
      <BrowserRouter>
        <NexusPageTransition>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/nexus-core" element={<NexusCorePage />} />
            <Route path="/display" element={<ProjectorDisplayPage />} />
            <Route path="/challenge/:challengeId" element={<ChallengeSessionPage />} />
            <Route path="/system" element={<SystemEntryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NexusPageTransition>
      </BrowserRouter>
    </TeamPortalProvider>
  );
};

export default App;
