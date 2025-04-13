import { BackgroundTexture } from '@/components/BackgroundTexture';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutWithoutNavbar: FC = () => {
  return (
    <main>
      <div className="flex items-end justify-end p-4">
        <ThemeToggle />
      </div>
      <Outlet />
      <BackgroundTexture />
    </main>
  );
};
