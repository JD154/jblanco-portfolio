import projects from '@/data/projects.json';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FC } from 'react';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import './styles.css';
import { ProjectsCarousel } from './components/ProjectsCarousel';
import { GlowingButton } from '@/components/general/GlowingButton';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  { key: 'all', label: 'All Projects' },
  { key: 'react', label: 'React' },
  { key: 'vue', label: 'Vue.js' },
  { key: 'typescript', label: 'TypeScript' },
] as const;

export const ProjectsSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInViewport = useIsInViewport(sectionRef);

  const [filter, setFilter] = useState<string>('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) =>
          project.techStack?.some((tech) => tech.toLowerCase().includes(filter.toLowerCase())),
        );

  useGSAP(() => {
    if (!isInViewport) return;

    // Animate decorative elements
    if (decorativeRef.current) {
      gsap.fromTo(
        decorativeRef.current.children,
        { opacity: 0, scale: 0.8, rotation: -15 },
        {
          opacity: 0.08,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.3,
        },
      );
    }

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
  }, [isInViewport]);

  // Scroll-driven "unfold" — the showcase deploys open (grows + flattens) as
  // it scrolls through view, like opening a portfolio briefcase.
  useGSAP(
    () => {
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
    { scope: sectionRef },
  );

  return (
    <section id="projects-section" className="projects-section" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="projects-section__decorative" ref={decorativeRef}>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--1"></div>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--2"></div>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--3"></div>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--4"></div>
      </div>

      <div className="projects-section__inner py-24 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header — slim toolbar: section label + filters */}
        <div className="projects-section__header" ref={headerRef}>
          <h2 className="projects-section__label">
            <span className="projects-section__eyebrow-dot" />
            Featured Projects
          </h2>

          <div className="projects-section__filters">
            {FILTERS.map(({ key, label }) => (
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
            <ProjectsCarousel key={filter} projects={filteredProjects} />
          ) : (
            <p className="projects-section__empty">No projects match this filter yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};
