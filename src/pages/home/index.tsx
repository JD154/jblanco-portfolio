import { FC } from 'react';
import { StarsBackground } from '@/components/StarsBackground';
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
