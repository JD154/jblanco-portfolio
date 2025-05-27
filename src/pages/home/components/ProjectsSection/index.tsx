import { FC } from 'react';
import projects from '@/data/projects.json';
import { useAnimation, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { AnimatedParagraph } from '@/components/general/AnimatedParagraph';

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
      <div className="mb-12 text-center">
        <AnimatedHeading text={'Projects'} fontSize="4rem" sensitivity={0.02} />
        <AnimatedParagraph
          lines={[
            'Here is a curated list of the projects I have worked on',
            'showcasing my ability to create clean, functional, and maintainable user interfaces.',
          ]}
          visibleLines={2}
          className="dark:text-neutral-300 text-md relative z-10 max-w-[750px] mx-auto"
        />
      </div>

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
