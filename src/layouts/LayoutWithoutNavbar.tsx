import { BackgroundTexture } from '@/components/layout/BackgroundTexture';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutWithoutNavbar: FC = () => {
  return (
    <main>
      <Outlet />
      <BackgroundTexture />
    </main>
  );
};
