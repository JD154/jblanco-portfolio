import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { FC } from 'react';
import { useIsInViewport } from '@/hooks/useIsInViewport';
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
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInViewport = useIsInViewport(sectionRef);
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

  useGSAP(() => {
    if (!isInViewport || prefersReducedMotion) return;

    // Animate header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 0.3,
        },
      );
    }
  }, [isInViewport, prefersReducedMotion]);

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
          <h2 className="projects-section__label">
            <span className="projects-section__eyebrow-dot" />
            {t.label}
          </h2>

          <div className="projects-section__filters">
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
