import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import projects from '@/data/projects.json';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FC } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import './styles.css';

// ProjectsSection component
export const ProjectsSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
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
      gsap.set(cardsRef.current, { opacity: 0, y: 50, rotationX: 15 });
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
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
          <div className="projects-section__badge">
            <span>Portfolio</span>
          </div>
          <AnimatedHeading
            text="Featured Projects"
            fontSize="4rem"
            sensitivity={0.02}
            className="projects-section__title"
          />
          <p className="projects-section__description">
            A showcase of my technical expertise and creative problem-solving through diverse projects, ranging from
            enterprise applications to innovative UI libraries.
          </p>
        </div>

        {/* Filter Section */}
        <div className="projects-section__filters">
          <button
            onClick={() => setFilter('all')}
            className={`projects-section__filter-btn ${filter === 'all' ? 'projects-section__filter-btn--active' : ''}`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('react')}
            className={`projects-section__filter-btn ${filter === 'react' ? 'projects-section__filter-btn--active' : ''}`}
          >
            React
          </button>
          <button
            onClick={() => setFilter('vue')}
            className={`projects-section__filter-btn ${filter === 'vue' ? 'projects-section__filter-btn--active' : ''}`}
          >
            Vue.js
          </button>
          <button
            onClick={() => setFilter('typescript')}
            className={`projects-section__filter-btn ${filter === 'typescript' ? 'projects-section__filter-btn--active' : ''}`}
          >
            TypeScript
          </button>
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
