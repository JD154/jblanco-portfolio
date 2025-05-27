import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout.tsx';
import { HomePage } from '../pages/home/index.tsx';
import { NotFound } from '../pages/not-found/index.tsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
