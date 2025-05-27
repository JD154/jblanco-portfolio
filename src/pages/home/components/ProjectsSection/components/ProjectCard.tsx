import { GlowingCard, GlowingCardProps } from '@/components/general/GlowingCard';
import { motion } from 'motion/react';

import { FC } from 'react';

interface ProjectCardProps extends GlowingCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
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
    <GlowingCard redirectTo={url} delay={delay} animate={animate} initial={initial} variants={variants}>
      <div className="relative w-full h-48 overflow-hidden rounded-tr-2xl rounded-tl-2xl md:rounded-tr-3xl md:rounded-tl-3xl z-0">
        <motion.img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 "
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.01 }}
        />
      </div>
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 ">{title}</h3>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <span className="inline-block mt-2">View Demo →</span>
      </div>
    </GlowingCard>
  );
};
