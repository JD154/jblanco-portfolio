import projectsEn from '@/data/projects.en.json';
import projectsEs from '@/data/projects.es.json';
import type { Lang } from './ui';

export type Project = (typeof projectsEn)[number];

const projects = {
  en: projectsEn,
  es: projectsEs,
} satisfies Record<Lang, Project[]>;

export function getLocalizedProjects(lang: Lang): Project[] {
  return projects[lang];
}
