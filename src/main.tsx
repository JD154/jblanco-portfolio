import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/index.tsx';
import { ThemeProvider } from './components/ThemeProvider/index.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  </StrictMode>,
);
