import { FC } from 'react';
import projects from './projects.json';
import './projects-section.css';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// ProjectCard component with motion and subtle 3D hover effect
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  delay?: number;
  animate?: any;
  initial?: any;
  variants?: any;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  image,
  url,
  delay = 0,
  animate,
  initial,
  variants,
}) => {
  return (
    <motion.div
      onClick={() => window.open(url, '_blank')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.open(url, '_blank');
        }
      }}
      className="group relative bg-gradient-to-br from-[#1a1a2e] to-[#333 ] rounded-xl overflow-hidden shadow-lg border border-[#333 ] transition-transform"
      whileHover={{ scale: 1.015, boxShadow: '0 4px 32px 0 #7f5fff33' }}
      whileTap={{ scale: 0.99 }}
      style={{ display: 'block', textDecoration: 'none' }}
      animate={animate}
      initial={initial}
      variants={variants}
      transition={{ duration: 0.1, delay, ease: 'easeIn' }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 "
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
        />
        {/* Subtle star overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-glow">{title}</h3>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <span className="inline-block mt-2 text-indigo-300 group-hover:text-indigo-400 transition-colors">
          View Demo →
        </span>
      </div>
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.12 }}
        transition={{ duration: 0.1, ease: 'easeIn' }}
        style={{ background: 'radial-gradient(circle at 80% 20%, #7f5fff 0%, transparent 70%)' }}
      />
    </motion.div>
  );
};

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
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center drop-shadow-glow">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};
