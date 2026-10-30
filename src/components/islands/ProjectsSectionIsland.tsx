import { ThemeProvider } from '@/components/other/ThemeProvider';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import type { LocalizedProject } from '@/i18n/projects';
import type { Lang, Ui } from '@/i18n/ui';

interface ProjectsSectionIslandProps {
  projects: LocalizedProject[];
  projectCount: number;
  t: Ui['projects'];
  lang?: Lang;
}

export function ProjectsSectionIsland({ projects, projectCount, t, lang }: ProjectsSectionIslandProps) {
  return (
    <ThemeProvider>
      <ProjectsSection projects={projects} projectCount={projectCount} t={t} lang={lang} />
    </ThemeProvider>
  );
}
