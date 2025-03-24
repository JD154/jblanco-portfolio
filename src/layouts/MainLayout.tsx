import { NavigationBar } from '@/components/NavigationBar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <main>
      <NavigationBar />
      <Outlet />
    </main>
  );
};
