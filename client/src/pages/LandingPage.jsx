import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorialFrameLayout } from '../layouts/EditorialFrameLayout';
import { CinematicHeroSection } from '../components/CinematicHeroSection';
import { NexusStorySection } from '../components/NexusStorySection';
import { CyberQuestExplanationSection } from '../components/CyberQuestExplanationSection';
import { NexusVisualDossierSection } from '../components/NexusVisualDossierSection';
import { EnterSystemCtaSection } from '../components/EnterSystemCtaSection';
import { useNexusSystem } from '../hooks/useNexusSystem';
import { useTeamPortal } from '../hooks/useTeamPortal';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const LandingPage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { apiState, socketState } = useNexusSystem();
  const { isAuthenticated } = useTeamPortal();

  const isSystemOnline = apiState.status === 'ONLINE' && socketState.connected;

  const handleEnterSystem = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(isAuthenticated ? '/dashboard' : '/login');
  }, [navigate, isAuthenticated]);

  const handleScrollToHowItWorks = useCallback(() => {
    const target = document.getElementById('how-it-works');
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, [prefersReducedMotion]);

  return (
    <EditorialFrameLayout systemOnline={isSystemOnline}>
      <CinematicHeroSection
        onEnterSystem={handleEnterSystem}
        onHowItWorks={handleScrollToHowItWorks}
      />
      <NexusStorySection />
      <CyberQuestExplanationSection />
      <NexusVisualDossierSection />
      <EnterSystemCtaSection
        onEnterSystem={handleEnterSystem}
        onHowItWorks={handleScrollToHowItWorks}
      />
    </EditorialFrameLayout>
  );
};

export default LandingPage;
