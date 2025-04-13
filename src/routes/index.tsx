import { LayoutWithoutNavbar } from '@/layouts/LayoutWithoutNavbar.tsx';
import { UnderConstructionPage } from '@/pages/under-construction/index.tsx';
import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '../pages/not-found/index.tsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithoutNavbar />,
    children: [{ index: true, element: <UnderConstructionPage /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
