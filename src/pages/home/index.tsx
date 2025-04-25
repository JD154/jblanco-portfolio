import { StarsBackground } from '@/components/layout/StarsBackground';
import { FC } from 'react';
import { HeaderSection } from './components/HeaderSection';
import { ProjectsSection } from './components/ProjectsSection';

export const HomePage: FC = () => {
  return (
    <div>
      <StarsBackground />
      <HeaderSection />
      <ProjectsSection />
    </div>
  );
};
