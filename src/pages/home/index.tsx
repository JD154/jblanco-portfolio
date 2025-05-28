import { StarsBackground } from '@/components/layout/StarsBackground';
import { FC } from 'react';
import { HeaderSection } from './components/HeaderSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutMeSection } from './components/AboutMeSection';

export const HomePage: FC = () => {
  return (
    <div>
      <StarsBackground />
      <HeaderSection />
      <ProjectsSection />
      <AboutMeSection />
    </div>
  );
};
