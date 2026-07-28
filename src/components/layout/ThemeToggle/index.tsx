import { useTheme } from '@/components/other/ThemeProvider/context';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import type { FC } from 'react';
import { ThemesDropdown } from './components/ThemesDropdown';

interface ThemeToggleProps {
  labels: {
    light: string;
    dark: string;
    toggleAria: string;
  };
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ labels }) => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent rounded-full"
          aria-label={labels.toggleAria}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{labels.toggleAria}</span>
        </Button>
      </DropdownMenuTrigger>
      <ThemesDropdown theme={theme} setTheme={setTheme} labels={labels} />
    </DropdownMenu>
  );
};
