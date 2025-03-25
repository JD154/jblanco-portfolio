import { NavigationBar } from '@/components/NavigationBar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = () => {
  return (
    <main>
      <NavigationBar />
      <Outlet />
    </main>
  );
};
