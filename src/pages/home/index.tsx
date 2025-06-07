import { StarsBackground } from '@/components/layout/StarsBackground';
import { FC } from 'react';
import { HeaderSection } from './components/HeaderSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutMeSection } from './components/AboutMeSection';
import { useParallaxHeaderProjects } from '@/hooks/useParallaxHeaderProjects';

export const HomePage: FC = () => {
  // Attach parallax effect between HeaderSection and ProjectsSection
  useParallaxHeaderProjects('#header-section', '#projects-section');
  return (
    <div>
      <div className="relative w-full min-h-screen h-screen" id="header-section-wrapper">
        <StarsBackground />
        <HeaderSection />
      </div>
      <ProjectsSection />
      <AboutMeSection />
    </div>
  );
};
