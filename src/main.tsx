import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/index.tsx';
import { ThemeProvider } from './components/ThemeProvider/index.tsx';
import './styles/index.css';
import { CursorContextProvider } from './components/CursorProvider/index.tsx';
import { CustomCursor } from './components/CustomCursor/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CursorContextProvider>
        <CustomCursor />
        <RouterProvider router={routes} />
      </CursorContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
