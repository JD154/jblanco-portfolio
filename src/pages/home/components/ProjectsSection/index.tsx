import projects from '@/data/projects.json';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FC } from 'react';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import './styles.css';
import { ProjectCard } from './components/ProjectCard';
import { GlowingButton } from '@/components/general/GlowingButton';

export const ProjectsSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
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

    // Animate stats
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.6,
        },
      );
    }

    // Animate project cards
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 24, scale: 0.95 });
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isInViewport]);

  return (
    <section id="projects-section" className="projects-section" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="projects-section__decorative" ref={decorativeRef}>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--1"></div>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--2"></div>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--3"></div>
        <div className="projects-section__decorative-shape projects-section__decorative-shape--4"></div>
      </div>

      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="projects-section__header" ref={headerRef}>
          <h2
            className="about-me-section__title"
            ref={headingRef}
            style={{ opacity: 0, transform: 'translateY(50px) scale(0.9)' }}
          >
            Featured Projects
          </h2>
          <p className="projects-section__description">
            A showcase of my technical expertise and creative problem-solving through diverse projects, ranging from
            enterprise applications to innovative UI libraries.
          </p>
        </div>

        {/* Filter Section */}
        <div className="projects-section__filters">
          <GlowingButton
            size={'lg'}
            onClick={() => setFilter('all')}
            className={`projects-section__filter-btn ${filter === 'all' ? 'projects-section__filter-btn--active' : ''}`}
          >
            All Projects
          </GlowingButton>
          <GlowingButton
            size={'lg'}
            onClick={() => setFilter('react')}
            className={`projects-section__filter-btn ${filter === 'react' ? 'projects-section__filter-btn--active' : ''}`}
          >
            React
          </GlowingButton>
          <GlowingButton
            size={'lg'}
            onClick={() => setFilter('vue')}
            className={`projects-section__filter-btn ${filter === 'vue' ? 'projects-section__filter-btn--active' : ''}`}
          >
            Vue.js
          </GlowingButton>
          <GlowingButton
            size={'lg'}
            onClick={() => setFilter('typescript')}
            className={`projects-section__filter-btn ${filter === 'typescript' ? 'projects-section__filter-btn--active' : ''}`}
          >
            TypeScript
          </GlowingButton>
        </div>

        {/* Projects Grid */}
        <div className="projects-section__grid">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.title}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[idx] = el;
              }}
              className="projects-section__card-wrapper"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
