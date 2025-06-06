import { BackgroundTexture } from '@/components/layout/BackgroundTexture';
import { NavigationBar } from '@/components/navigation/NavigationBar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = () => {
  return (
    <main>
      <NavigationBar />
      <Outlet />
      <BackgroundTexture />
    </main>
  );
};
