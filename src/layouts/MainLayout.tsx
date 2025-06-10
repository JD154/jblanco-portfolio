import { NavigationBar } from '@/components/navigation/NavigationBar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { StarsBackground } from '@/components/layout/StarsBackground';

export const MainLayout: FC = () => {
  // Add the StarsBackground behind all content
  return (
    <main style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <StarsBackground />
      <NavigationBar />
      <Outlet />
    </main>
  );
};
