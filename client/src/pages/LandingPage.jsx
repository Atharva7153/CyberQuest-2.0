import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorialFrameLayout } from '../layouts/EditorialFrameLayout';
import { CinematicHeroSection } from '../components/CinematicHeroSection';
import { useNexusSystem } from '../hooks/useNexusSystem';
import { useTeamPortal } from '../hooks/useTeamPortal';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { apiState, socketState } = useNexusSystem();
  const { isAuthenticated } = useTeamPortal();

  const isSystemOnline = apiState.status === 'ONLINE' && socketState.connected;

  const handleEnterSystem = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(isAuthenticated ? '/dashboard' : '/login');
  }, [navigate, isAuthenticated]);

  return (
    <EditorialFrameLayout systemOnline={isSystemOnline}>
      <CinematicHeroSection onEnterSystem={handleEnterSystem} />
    </EditorialFrameLayout>
  );
};

export default LandingPage;
