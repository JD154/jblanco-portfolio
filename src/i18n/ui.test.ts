import { expect, test } from 'bun:test';
import projectsEn from '../data/projects.en.json';
import projectsEs from '../data/projects.es.json';
import { defaultLang, languageNames, languages, useTranslations } from './ui';

test('provides complete English and Spanish UI translations', () => {
  expect(languages).toEqual(expect.objectContaining({ en: expect.any(String), es: expect.any(String) }));
  expect(defaultLang).toBe('en');

  for (const lang of Object.keys(languages) as Array<keyof typeof languages>) {
    const t = useTranslations(lang);

    for (const value of [
      t.seo.title,
      t.seo.description,
      t.seo.jobTitle,
      t.nav.badge.default,
      t.nav.badge.hover,
      t.nav.badge.aria,
      t.nav.theme.light,
      t.nav.theme.dark,
      t.nav.theme.toggleAria,
      t.nav.language.aria,
      t.header.title,
      ...t.header.descriptionParts,
      t.header.ctaCv,
      t.header.ctaLinkedin,
      t.about.label,
      t.about.heading,
      ...t.about.paragraphs,
      t.about.quote.title,
      t.about.quote.attributionPre,
      t.about.quote.attributionMid,
      t.projects.label,
      t.projects.filterAll,
      t.projects.empty,
      t.projects.viewProject,
      t.projects.viewProjectAria,
      t.projects.demoUnavailable,
      t.projects.previousAria,
      t.projects.nextAria,
      t.projects.featuredFallback,
      t.contact.label,
      t.contact.subtitle,
      t.notFound.title,
      t.notFound.message1,
      t.notFound.message2,
      t.notFound.cta,
    ]) {
      expect(value).toBeString();
      expect(value.length).toBeGreaterThan(0);
    }

    expect(t.header.descriptionParts).toHaveLength(3);
    expect(t.about.paragraphs).toHaveLength(2);
  }

  const es = useTranslations('es');
  expect(languageNames.es).toBe('Español');
  expect(es.header.title).toBe('Soy JB');
  expect(es.about.label).toBe('Sobre mí');
  expect(es.projects.label).toBe('Proyectos destacados');
  expect(es.contact.label).toBe('Contacto');
  expect(es.header.ctaCv).toBe('Descargar CV');
  expect(es.nav.theme.light).toBe('Claro');
  expect(es.nav.theme.dark).toBe('Oscuro');
});

test('uses the approved Task 3 SEO, quote, and project CTA copy', () => {
  const en = useTranslations('en');
  const es = useTranslations('es');

  expect(en.seo.title).toBe('Jesus Blanco — Senior Front-End Developer');
  expect(en.seo.description).toBe('Portfolio of Jesus Blanco, Senior Front-End Developer.');
  expect(es.seo.title).toBe('Jesus Blanco — Desarrollador Front-End Senior');
  expect(es.about.quote.title).toBe('Una evolución, el único camino');
  expect(en.projects.viewProject).toBe('View Project →');
  expect(en.projects.demoUnavailable).toBe('Demo Unavailable');
  expect(es.projects.viewProject).toBe('Ver proyecto →');
  expect(es.projects.demoUnavailable).toBe('Demo no disponible');
});

test('keeps localized project records structurally aligned', () => {
  expect(projectsEn).toHaveLength(7);
  expect(projectsEs).toHaveLength(7);

  for (const [index, projectEn] of projectsEn.entries()) {
    const projectEs = projectsEs[index];

    expect(projectEs.title).toBe(projectEn.title);
    expect(projectEs.image).toBe(projectEn.image);
    expect(projectEs.url).toBe(projectEn.url);
    expect(projectEs.techStack).toEqual(projectEn.techStack);
    expect(projectEn.description).toBeString();
    expect(projectEn.description.length).toBeGreaterThan(0);
    expect(projectEs.description).toBeString();
    expect(projectEs.description.length).toBeGreaterThan(0);
    expect(projectEs.description).not.toBe(projectEn.description);
  }
});
