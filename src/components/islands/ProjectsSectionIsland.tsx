import { ThemeProvider } from '@/components/other/ThemeProvider';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import type { LocalizedProject } from '@/i18n/projects';
import type { Ui } from '@/i18n/ui';

interface ProjectsSectionIslandProps {
  projects: LocalizedProject[];
  t: Ui['projects'];
}

export function ProjectsSectionIsland({ projects, t }: ProjectsSectionIslandProps) {
  return (
    <ThemeProvider>
      <ProjectsSection projects={projects} t={t} />
    </ThemeProvider>
  );
}
