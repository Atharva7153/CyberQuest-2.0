import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { TeamPortalProvider } from './hooks/useTeamPortal';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChallengeSessionPage } from './pages/ChallengeSessionPage';
import { ProgressPage } from './pages/ProgressPage';
import { HistoryPage } from './pages/HistoryPage';
import { NexusCorePage } from './pages/NexusCorePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProjectorDisplayPage } from './pages/ProjectorDisplayPage';
import { AdminControlPage } from './pages/AdminControlPage';
import { SystemEntryPage } from './pages/SystemEntryPage';
import { NexusPageTransition } from './components/NexusPageTransition';

export const App = () => {
  return (
    <ThemeProvider>
      <TeamPortalProvider>
        <BrowserRouter>
          <NexusPageTransition>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/challenges" element={<DashboardPage initialSection="CHALLENGES" />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/team" element={<ProgressPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/nexus-core" element={<NexusCorePage />} />
              <Route path="/display" element={<ProjectorDisplayPage />} />
              <Route path="/admin" element={<AdminControlPage />} />
              <Route path="/admin/teams" element={<AdminControlPage />} />
              <Route path="/admin/leaderboard" element={<AdminControlPage />} />
              <Route path="/admin/volunteers" element={<AdminControlPage />} />
              <Route path="/admin/challenges" element={<AdminControlPage />} />
              <Route path="/admin/attempts" element={<AdminControlPage />} />
              <Route path="/admin/events" element={<AdminControlPage />} />
              <Route path="/admin/settings" element={<AdminControlPage />} />
              <Route path="/challenge/:challengeId" element={<ChallengeSessionPage />} />
              <Route path="/system" element={<SystemEntryPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NexusPageTransition>
        </BrowserRouter>
      </TeamPortalProvider>
    </ThemeProvider>
  );
};

export default App;
