import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CSSProperties, FC } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import './styles.css';
import { ProjectsCarousel } from './components/ProjectsCarousel';
import { GlowingButton } from '@/components/general/GlowingButton';
import { SectionToolbar } from '@/components/general/SectionToolbar';
import type { LocalizedProject } from '@/i18n/projects';
import type { Lang, Ui } from '@/i18n/ui';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projects: LocalizedProject[];
  t: Ui['projects'];
  /** Locale for the "view full register" link to the dedicated /projects page. */
  lang?: Lang;
}

export const ProjectsSection: FC<ProjectsSectionProps> = ({ projects, t, lang = 'en' }) => {
  const indexHref = lang === 'es' ? '/es/projects' : '/projects';
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRevealOnScroll<HTMLDivElement>();
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [filter, setFilter] = useState<string>('all');
  const filters = [
    { key: 'all', label: t.filterAll },
    { key: 'react', label: t.filters.react },
    { key: 'vue', label: t.filters.vue },
    { key: 'typescript', label: t.filters.typescript },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) =>
          project.techStack?.some((tech) => tech.toLowerCase().includes(filter.toLowerCase())),
        );

  // "Unfold" — the showcase deploys open (grows + flattens) as it enters view,
  // like opening a portfolio briefcase. Plays once on enter rather than scrubbing
  // to scroll position: a scrubbed entrance fights the global CSS smooth-scroll
  // during in-page jumps (e.g. the hero's "View selected work" anchor), landing
  // on a half-unfolded frame. A one-shot timeline always settles fully.
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      if (!carouselRef.current || !sectionRef.current) return;
      gsap.fromTo(
        carouselRef.current,
        { scale: 0.78, rotateX: 14, y: 60, opacity: 0.3, transformOrigin: '50% 0%', transformPerspective: 1400 },
        {
          scale: 1,
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );
    },
    { dependencies: [prefersReducedMotion], scope: sectionRef },
  );

  return (
    <section id="projects-section" className="projects-section" ref={sectionRef}>
      <div className="projects-section__inner py-24 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header — shared section toolbar (label) with project filters on the
            trailing edge. The reveal observer rides the toolbar root. */}
        <SectionToolbar ref={headerRef} label={t.label} reveal="focus" spacing="lg">
          <div
            className="projects-section__filters"
            data-reveal="focus"
            style={{ '--reveal-i': 1 } as CSSProperties}
            role="group"
            aria-label={t.label}
          >
            {filters.map(({ key, label }) => (
              <GlowingButton
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                onClick={() => setFilter(key)}
                className="projects-section__filter-btn"
                aria-pressed={filter === key}
              >
                {label}
              </GlowingButton>
            ))}
          </div>
        </SectionToolbar>

        {/* Projects Carousel */}
        <div className="projects-section__carousel-wrap" ref={carouselRef}>
          {filteredProjects.length > 0 ? (
            <ProjectsCarousel key={filter} projects={filteredProjects} t={t} />
          ) : (
            <p className="projects-section__empty">{t.empty}</p>
          )}
        </div>

        {/* Bridge to the full register — this carousel features work; the index lists it all. */}
        <a className="projects-section__all" href={indexHref}>
          {t.viewAllWork}
          <span className="projects-section__all-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};
