import { useParallaxForSections } from '@/hooks/useParallaxForSections';
import { FC } from 'react';
import { AboutMeSection } from './components/AboutMeSection';
import { HeaderSection } from './components/HeaderSection';
import { ProjectsSection } from './components/ProjectsSection';

export const HomePage: FC = () => {
  // Attach parallax effect between HeaderSection and ProjectsSection
  useParallaxForSections([
    {
      fromSelector: '#header-section',
      toSelector: '#projects-section',
    },
  ]);

  return (
    <>
      <HeaderSection />
      <ProjectsSection />
      <AboutMeSection />
    </>
  );
};
