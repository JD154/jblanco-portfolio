import { GlowingButton } from '@/components/general/GlowingButton';
import { ThemeProvider } from '@/components/other/ThemeProvider';
import type { Ui } from '@/i18n/ui';

interface NotFoundIslandProps {
  homeUrl: string;
  t: Ui['notFound'];
}

export function NotFoundIsland({ homeUrl, t }: NotFoundIslandProps) {
  return (
    <ThemeProvider>
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="mb-4 text-7xl font-bold">404</p>
          <h1 className="mb-4 text-3xl font-semibold">{t.title}</h1>
          <p>{t.message1}</p>
          <p className="mb-8">{t.message2}</p>
          <GlowingButton variant="default">
            <a href={homeUrl}>{t.cta}</a>
          </GlowingButton>
        </div>
      </section>
    </ThemeProvider>
  );
}
