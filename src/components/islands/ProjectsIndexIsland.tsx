import { ThemeProvider } from '@/components/other/ThemeProvider';
import { ProjectsIndex } from '@/components/sections/ProjectsIndex';
import type { LocalizedProject } from '@/i18n/projects';
import type { Lang, Ui } from '@/i18n/ui';

interface ProjectsIndexIslandProps {
  lang: Lang;
  projects: LocalizedProject[];
  t: Ui['projects'];
}

export function ProjectsIndexIsland({ lang, projects, t }: ProjectsIndexIslandProps) {
  return (
    <ThemeProvider>
      <ProjectsIndex lang={lang} projects={projects} t={t} />
    </ThemeProvider>
  );
}
