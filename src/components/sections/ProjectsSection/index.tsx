import type { CSSProperties, FC } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import './styles.css';
import { SelectedWork } from './components/SelectedWork';
import { SectionToolbar } from '@/components/general/SectionToolbar';
import type { LocalizedProject } from '@/i18n/projects';
import type { Lang, Ui } from '@/i18n/ui';

interface ProjectsSectionProps {
  projects: LocalizedProject[];
  /** Size of the full localized catalog (not the featured subset). */
  projectCount: number;
  t: Ui['projects'];
  /** Locale for the links to the dedicated /projects catalog. */
  lang?: Lang;
}

export const ProjectsSection: FC<ProjectsSectionProps> = ({ projects, projectCount, t, lang = 'en' }) => {
  const catalogHref = lang === 'es' ? '/es/projects' : '/projects';
  const headerRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="projects-section" className="projects-section">
      <div className="projects-section__inner py-24 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header — shared section toolbar (label) with the full-catalog link on the
            trailing edge. The reveal observer rides the toolbar root. */}
        <SectionToolbar ref={headerRef} label={t.label} reveal="focus" spacing="lg">
          <a
            className="projects-section__catalog"
            href={catalogHref}
            data-reveal="focus"
            style={{ '--reveal-i': 1 } as CSSProperties}
          >
            {t.viewAllCount.replace('{total}', String(projectCount))} <span aria-hidden="true">↗</span>
          </a>
        </SectionToolbar>

        <SelectedWork projects={projects} catalogHref={catalogHref} t={t} />
      </div>
    </section>
  );
};
