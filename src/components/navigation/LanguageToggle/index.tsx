import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { languageNames } from '@/i18n/ui';
import type { Lang } from '@/i18n/ui';
import { Languages } from 'lucide-react';
import type { FC } from 'react';

interface LanguageToggleProps {
  lang: Lang;
  alternateUrl: string;
  ariaLabel: string;
}

export const LanguageToggle: FC<LanguageToggleProps> = ({ lang, alternateUrl, ariaLabel }) => {
  const otherLang: Lang = lang === 'en' ? 'es' : 'en';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-transparent rounded-full gap-1 px-2"
          aria-label={ariaLabel}
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="text-xs font-medium uppercase">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl">
        <DropdownMenuLabel className="font-bold rounded-2xl">{languageNames[lang]}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a className="rounded-2xl" href={alternateUrl}>
            {languageNames[otherLang]}
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
