import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TeamPortalProvider } from './hooks/useTeamPortal';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChallengeSessionPage } from './pages/ChallengeSessionPage';
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
