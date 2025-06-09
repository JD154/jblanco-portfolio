import { TexturedBackground } from '@/components/layout/TexturedBackground';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutWithoutNavbar: FC = () => {
  return (
    <main>
      <Outlet />
      <TexturedBackground />
    </main>
  );
};
