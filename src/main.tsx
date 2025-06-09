import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/index.tsx';
import { ThemeProvider } from './components/other/ThemeProvider/index.tsx';
import './styles/index.css';
import { CursorContextProvider } from './components/other/CursorProvider/index.tsx';
import { CustomCursor } from './components/other/CustomCursor/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CursorContextProvider>
        <CustomCursor />
        <RouterProvider router={routes} />
      </CursorContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
