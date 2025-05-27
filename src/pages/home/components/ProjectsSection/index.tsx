import { FC } from 'react';
import projects from '@/data/projects.json';
import { useAnimation, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import { ProjectCard } from './components/ProjectCard';
import './styles.css';
import { AnimatedHeading } from '@/components/general/AnimatedHeading';

// ProjectsSection component
export const ProjectsSection: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  // Trigger when 80% of the section is visible
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={ref}>
      <AnimatedHeading text={'Projects'} fontSize="4rem" sensitivity={0.03} className="mb-12" />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.title}
            {...project}
            delay={isInView ? 0.15 * idx : 0}
            animate={controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0 },
            }}
          />
        ))}
      </ul>
    </section>
  );
};
