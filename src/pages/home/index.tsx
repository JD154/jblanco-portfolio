import { StarsBackground } from '@/components/StarsBackground';
import { FC } from 'react';
import { HeaderSection } from './components/HeaderSection';

export const HomePage: FC = () => {
  return (
    <div>
      <StarsBackground />
      <HeaderSection />
    </div>
  );
};
