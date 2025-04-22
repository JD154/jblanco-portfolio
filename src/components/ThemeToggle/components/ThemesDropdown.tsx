import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { AvailableThemes } from '@/typings';
import { themeOptions } from '@/utils';
import { FC } from 'react';

interface ThemesDropdownProps {
  theme: AvailableThemes;
  setTheme: (theme: AvailableThemes) => void;
}

export const ThemesDropdown: FC<ThemesDropdownProps> = ({ theme, setTheme }) => {
  return (
    <DropdownMenuContent align="end" className="rounded-2xl">
      {themeOptions.map(({ value, label }) => (
        <DropdownMenuItem
          key={value}
          onClick={() => setTheme(value)}
          className={theme === value ? 'font-bold' : ''}
          disabled={theme === value}
        >
          {label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
