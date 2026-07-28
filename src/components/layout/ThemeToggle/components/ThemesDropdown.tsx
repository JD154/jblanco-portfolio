import { DropdownMenuCheckboxItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import type { AvailableThemes } from '@/typings';
import type { FC } from 'react';

interface ThemesDropdownProps {
  theme: AvailableThemes;
  setTheme: (theme: AvailableThemes) => void;
  labels: {
    light: string;
    dark: string;
  };
}

export const ThemesDropdown: FC<ThemesDropdownProps> = ({ theme, setTheme, labels }) => {
  const options: { value: AvailableThemes; label: string }[] = [
    { value: 'light', label: labels.light },
    { value: 'dark', label: labels.dark },
  ];

  return (
    <DropdownMenuContent align="end" className="rounded-2xl">
      {options.map(({ value, label }) => (
        <DropdownMenuCheckboxItem
          key={value}
          checked={theme === value}
          onCheckedChange={() => setTheme(value)}
          className={theme === value ? 'font-bold rounded-2xl' : 'rounded-2xl'}
        >
          {label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  );
};
