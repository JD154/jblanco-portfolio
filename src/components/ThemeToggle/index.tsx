import { Button } from '@headlessui/react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme as 'light' | 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Button
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      className="bg-primary text-primary-foreground border rounded-lg border-border px-4 py-2"
    >
      {theme === 'light' ? '🌙' : '🌞'}
    </Button>
  );
};
