import projectsEn from '@/data/projects.en.json';
import projectsEs from '@/data/projects.es.json';
import type { Lang } from './ui';

export type Project = (typeof projectsEn)[number];

/** A project paired with its language-stable slug and case-study URL. */
export type LocalizedProject = Project & { slug: string; href: string };

const projects = {
  en: projectsEn,
  es: projectsEs,
} satisfies Record<Lang, Project[]>;

export function getLocalizedProjects(lang: Lang): Project[] {
  return projects[lang];
}

/** kebab-case slug. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Slugs are language-stable: always derived from the English title so that
 * `/projects/<slug>` and `/es/projects/<slug>` address the same work and the
 * hreflang alternates line up. The EN and ES data files are parallel arrays, so
 * the index pairs a localized project to its English-derived slug.
 */
function slugFor(index: number): string {
  return slugify(projectsEn[index].title);
}

function caseStudyBase(lang: Lang): string {
  return lang === 'es' ? '/es/projects/' : '/projects/';
}

/** Localized projects, each carrying its stable slug and case-study href. */
export function getProjectEntries(lang: Lang): LocalizedProject[] {
  const base = caseStudyBase(lang);
  return projects[lang].map((project, index) => {
    const slug = slugFor(index);
    return { ...project, slug, href: `${base}${slug}` };
  });
}

export interface ProjectDetail {
  project: LocalizedProject;
  prev: LocalizedProject;
  next: LocalizedProject;
  /** 0-based position in the (single, unfiltered) project set. */
  index: number;
  total: number;
}

/** Resolve one case study plus its wrap-around neighbours for the pager. */
export function getProjectDetail(lang: Lang, slug: string): ProjectDetail | null {
  const entries = getProjectEntries(lang);
  const index = entries.findIndex((entry) => entry.slug === slug);
  if (index === -1) return null;

  const total = entries.length;
  return {
    project: entries[index],
    prev: entries[(index - 1 + total) % total],
    next: entries[(index + 1) % total],
    index,
    total,
  };
}
