import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import projects from '@/data/projects.json';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FC } from 'react';
import { ProjectCard } from './components/ProjectCard';

// ProjectsSection component
export const ProjectsSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 32 });
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={sectionRef}>
      <div className="mb-12 text-center">
        <AnimatedHeading text={'Projects'} fontSize="4rem" sensitivity={0.02} />
        <p className="dark:text-neutral-300 text-md relative z-10 max-w-[750px] mx-auto">
          Here is a curated list of the projects I have worked on.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <li
            key={project.title}
            ref={(el: HTMLLIElement | null) => {
              cardsRef.current[idx] = el;
            }}
            style={{ listStyle: 'none' }}
          >
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </section>
  );
};
