import { ThemeProvider } from '@/components/other/ThemeProvider';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import type { Project } from '@/i18n/projects';
import type { Ui } from '@/i18n/ui';

interface ProjectsSectionIslandProps {
  projects: Project[];
  t: Ui['projects'];
}

export function ProjectsSectionIsland({ projects, t }: ProjectsSectionIslandProps) {
  return (
    <ThemeProvider>
      <ProjectsSection projects={projects} t={t} />
    </ThemeProvider>
  );
}
