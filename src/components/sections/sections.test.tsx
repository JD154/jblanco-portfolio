import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from '@/components/other/ThemeProvider';
import { Window } from 'happy-dom';
import { getFeaturedProjectEntries, getProjectEntries } from '@/i18n/projects';
import { ui } from '@/i18n/ui';
import type { Lang } from '@/i18n/ui';
import { AboutMeSection } from './AboutMeSection';
import { ContactSection } from './ContactSection';
import { ProjectsSection } from './ProjectsSection';

test('keeps the header structure static in Astro', async () => {
  const source = await Bun.file(new URL('./HeaderSection/index.astro', import.meta.url)).text();

  expect(source).toContain('<h1 class="header-section__pitch">');
  expect(source).toContain('href="/Jesus-Blanco-Senior-Frontend-Developer.pdf"');
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
  expect(contactHtml).toMatch(/<h2 class="section-toolbar__label"[^>]*>/);
  expect(contactHtml).toMatch(/<a [^>]*class="contact-section__item">/);
});

const renderProjects = (lang: Lang) => {
  const html = renderToString(
    <ThemeProvider>
      <ProjectsSection
        lang={lang}
        projects={getFeaturedProjectEntries(lang)}
        projectCount={getProjectEntries(lang).length}
        t={ui[lang].projects}
      />
    </ThemeProvider>,
  );
  const window = new Window();
  const doc = new window.DOMParser().parseFromString(html, 'text/html');
  return { html, doc, text: doc.body.textContent ?? '' };
};

test('links to the English catalog once with the full project count', () => {
  const { doc, text } = renderProjects('en');

  expect(text).toContain('View all 11 projects');
  expect(doc.querySelectorAll('a[href="/projects"]')).toHaveLength(1);
});

test('links to the Spanish catalog once', () => {
  const { doc, text } = renderProjects('es');

  expect(text).toContain('Ver los 11 proyectos');
  expect(doc.querySelectorAll('a[href="/es/projects"]')).toHaveLength(1);
  expect(doc.querySelectorAll('a[href="/projects"]')).toHaveLength(0);
});

test('selects the first public featured project', () => {
  const { doc } = renderProjects('en');
  const active = doc.querySelectorAll('article[data-active="true"]');

  expect(active).toHaveLength(1);
  expect(active[0].querySelectorAll('a[href="/projects/i-r-management-platform"]')).toHaveLength(1);
});

test('keeps inactive projects in layout but out of reach', () => {
  const { doc } = renderProjects('en');
  const inactive = doc.querySelectorAll('article[data-active="false"]');
  expect(inactive).toHaveLength(5);
  for (const article of inactive) {
    expect(article.hasAttribute('inert')).toBe(true);
    expect(article.getAttribute('aria-hidden')).toBe('true');
  }
  // `hidden` would become `display: none !important` and collapse the shared height.
  expect(doc.querySelectorAll('article[hidden]')).toHaveLength(0);
});

test('renders one pressed index button per featured project', () => {
  const { doc } = renderProjects('en');
  const buttons = [...doc.querySelectorAll('button[aria-pressed]')];
  const pressed = buttons.filter((button) => button.getAttribute('aria-pressed') === 'true');

  expect(buttons).toHaveLength(6);
  expect(pressed).toHaveLength(1);
  expect(pressed[0].textContent).toContain('I.R Management Platform');
});

test('drops carousel controls and provides one explicit case-study link per project', () => {
  const { html, doc } = renderProjects('en');

  for (const removed of ['All Projects', 'Previous project', 'Next project', 'View case study →', 'pc__']) {
    expect(html).not.toContain(removed);
  }

  const articles = [...doc.querySelectorAll('article')];
  const projects = getFeaturedProjectEntries('en');
  expect(articles).toHaveLength(6);
  for (const [i, article] of articles.entries()) {
    const links = [...article.querySelectorAll('a[href]')];
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe(projects[i].href);
    expect(links[0].textContent).toContain(ui.en.projects.caseStudyTooltip);
    expect(article.querySelector('h3')?.textContent).toBe(projects[i].title);
    expect(article.querySelector('h3 a')).toBeNull();
    const artifact = article.querySelector('.selected-work__artifact');
    expect(artifact?.querySelector('a')).toBeNull();
    expect(artifact?.querySelector('img, [role="img"]')).not.toBeNull();
    for (const copy of article.querySelectorAll('p, dl, .selected-work__stack')) {
      expect(copy.closest('a')).toBeNull();
    }
  }
});

test('never nests interactive elements', () => {
  const { doc } = renderProjects('en');

  expect(doc.querySelectorAll('a button')).toHaveLength(0);
  expect(doc.querySelectorAll('button a')).toHaveLength(0);
});

test('uses the confidential plate instead of an image for NDA projects', () => {
  const { doc } = renderProjects('en');
  const projects = getFeaturedProjectEntries('en');
  const articles = [...doc.querySelectorAll('article')];

  expect(articles).toHaveLength(projects.length);
  projects.forEach((project, i) => {
    if (project.visibility === 'confidential') {
      const plate = articles[i].querySelector('[role="img"]');
      expect(plate?.getAttribute('aria-label')).toBe(ui.en.projects.confidential.aria);
      expect(articles[i].querySelector('img')).toBeNull();
    } else {
      expect(articles[i].querySelectorAll('img')).toHaveLength(1);
    }
  });
  expect(projects.filter((project) => project.visibility === 'confidential')).toHaveLength(4);
});
