import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from '@/components/other/ThemeProvider';
import { ui } from '@/i18n/ui';
import { AboutMeSection } from './AboutMeSection';
import { ContactSection } from './ContactSection';
import { ProjectsCarousel } from './ProjectsSection/components/ProjectsCarousel';

test('keeps the header structure static in Astro', async () => {
  const source = await Bun.file(new URL('./HeaderSection/index.astro', import.meta.url)).text();

  expect(source).toContain('<h1 class="header-section__pitch">');
  expect(source).toContain('href="/Senior%20Frontend%20Developer%2C%20Jesus%20Blanco.pdf"');
  expect(source).not.toContain('<GlowingButton');
});

test('keeps About and Contact copy visible in server-rendered HTML', () => {
  const aboutHtml = renderToString(<AboutMeSection t={ui.en.about} />);
  const contactHtml = renderToString(
    <ThemeProvider>
      <ContactSection t={ui.en.contact} />
    </ThemeProvider>,
  );

  expect(aboutHtml).toMatch(/<h2 class="about-me-section__title"[^>]*>/);
  expect(aboutHtml).toContain('An Evolution, The Only Way');
  expect(aboutHtml).toMatch(/<p class="about-me-section__paragraph"[^>]*>/);
  expect(contactHtml).toMatch(/<h2 class="contact-section__label"[^>]*>/);
  expect(contactHtml).toMatch(/<a [^>]*class="contact-section__item">/);
});

test('renders the project CTA link without a nested button', () => {
  const html = renderToString(
    <ThemeProvider>
      <ProjectsCarousel
        projects={[
          {
            title: 'Project',
            description: 'Description',
            role: 'Role',
            challenge: 'Challenge',
            decision: 'Decision',
            image: '/project.jpg',
            url: 'https://example.com',
          },
        ]}
        t={ui.en.projects}
      />
    </ThemeProvider>,
  );

  expect(html).toMatch(/<a [^>]*href="https:\/\/example.com"/);
  expect(html).not.toMatch(/<button[^>]*>[\s\S]*?<a href="https:\/\/example.com"/);
});
