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
          onClick={() => (theme !== value ? setTheme(value) : null)}
          className={theme === value ? 'font-bold rounded-2xl' : 'rounded-2xl'}
        >
          {label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
