import { GlowingEffect } from '@/components/ui/glowing-effect';
import { motion } from 'motion/react';

import { FC } from 'react';

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

export const ProjectCard: FC<ProjectCardProps> = ({
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
      className="relative h-full rounded-2xl border md:rounded-3xl p-0"
      whileTap={{ scale: 0.99 }}
      animate={animate}
      initial={initial}
      variants={variants}
      transition={{ duration: 0.1, delay, ease: 'easeIn' }}
    >
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
      <div className="relative w-full h-48 overflow-hidden rounded-tr-2xl rounded-tl-2xl md:rounded-tr-3xl md:rounded-tl-3xl z-0">
        <motion.img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 "
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.01 }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 ">{title}</h3>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <span className="inline-block mt-2 text-indigo-300 group-hover:text-indigo-400 transition-colors">
          View Demo →
        </span>
      </div>
    </motion.div>
  );
};
