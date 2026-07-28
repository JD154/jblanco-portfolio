import type { AvailableThemes } from '@/typings';
import { createContext, useContext } from 'react';

export const THEME_CHANGE_EVENT = 'jblanco:theme-change';

declare global {
  interface WindowEventMap {
    'jblanco:theme-change': CustomEvent<AvailableThemes>;
  }
}

type ThemeProviderState = {
  theme: AvailableThemes;
  setTheme: (theme: AvailableThemes) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
