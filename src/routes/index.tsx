import { createBrowserRouter } from 'react-router-dom'
import { ContactPage } from '../pages/contact/index.tsx'
import { HomePage } from '../pages/home/index.tsx'
import { ShowcasePage } from '../pages/showcase/index.tsx'
import { MainLayout } from '../layouts/MainLayout.tsx'
import { NotFound } from './NotFound.tsx'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'showcase', element: <ShowcasePage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
