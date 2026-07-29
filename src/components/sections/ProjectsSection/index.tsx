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
import type { Project } from '@/i18n/projects';
import type { Ui } from '@/i18n/ui';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projects: Project[];
  t: Ui['projects'];
}

export const ProjectsSection: FC<ProjectsSectionProps> = ({ projects, t }) => {
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

  // Scroll-driven "unfold" — the showcase deploys open (grows + flattens) as
  // it scrolls through view, like opening a portfolio briefcase.
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
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.6,
          },
        },
      );
    },
    { dependencies: [prefersReducedMotion], scope: sectionRef },
  );

  return (
    <section id="projects-section" className="projects-section" ref={sectionRef}>
      <div className="projects-section__inner py-24 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header — slim toolbar: section label + filters */}
        <div className="projects-section__header" ref={headerRef}>
          <h2 className="projects-section__label" data-reveal="focus">
            <span className="projects-section__eyebrow-dot" />
            {t.label}
          </h2>

          <div className="projects-section__filters" data-reveal="focus" style={{ '--reveal-i': 1 } as CSSProperties}>
            {filters.map(({ key, label }) => (
              <GlowingButton
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                onClick={() => setFilter(key)}
                className="projects-section__filter-btn"
              >
                {label}
              </GlowingButton>
            ))}
          </div>
        </div>

        {/* Projects Carousel */}
        <div className="projects-section__carousel-wrap" ref={carouselRef}>
          {filteredProjects.length > 0 ? (
              <ProjectsCarousel key={filter} projects={filteredProjects} t={t} />
          ) : (
            <p className="projects-section__empty">{t.empty}</p>
          )}
        </div>
      </div>
    </section>
  );
};
