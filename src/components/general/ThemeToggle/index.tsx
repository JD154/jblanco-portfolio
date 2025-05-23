import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/other/ThemeProvider';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion } from 'motion/react';
import { FC } from 'react';
import { ThemesDropdown } from './components/ThemesDropdown';
import { useCursorHandlers } from '@/components/other/CursorProvider/hooks';

export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  const MotionButton = motion.create(Button);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MotionButton
          whileTap={{ scale: 0.9 }}
          {...useCursorHandlers('buttonHover', 'cursorEnter')}
          variant="ghost"
          size="icon"
          className="bg-transparent rounded-full"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </MotionButton>
      </DropdownMenuTrigger>
      <ThemesDropdown theme={theme} setTheme={setTheme} />
    </DropdownMenu>
  );
};
