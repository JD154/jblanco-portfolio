import type { AvailableThemes } from '@/typings';
import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { THEME_CHANGE_EVENT, ThemeProviderContext } from './context';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: AvailableThemes;
  storageKey?: string;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  ...props
}) => {
  const [theme, setThemeState] = useState<AvailableThemes>(
    () =>
      typeof window === 'undefined'
        ? defaultTheme
        : (window.localStorage.getItem(storageKey) as AvailableThemes) || defaultTheme,
  );

  useEffect(() => {
    const handleThemeChange = (event: WindowEventMap[typeof THEME_CHANGE_EVENT]) => {
      const { detail } = event;

      if ((detail === 'light' || detail === 'dark') && detail !== theme) {
        setThemeState(detail);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: AvailableThemes) => {
      window.localStorage.setItem(storageKey, theme);
      setThemeState(theme);
      window.dispatchEvent(new CustomEvent<AvailableThemes>(THEME_CHANGE_EVENT, { detail: theme }));
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
