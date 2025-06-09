import { GlowingCard } from '@/components/general/GlowingCard';
import { FC } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack?: string[];
  url?: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({ title, description, image, url, techStack }) => {
  return (
    <GlowingCard redirectTo={url} className="group bg-blur-background">
      <div className="relative w-full h-48 overflow-hidden rounded-tr-2xl rounded-tl-2xl md:rounded-tr-3xl md:rounded-tl-3xl z-0 ">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>
        {techStack && (
          <div className="flex flex-wrap gap-2 mb-3">
            {techStack.map((tech, index) => (
              <span key={index} className="text-xs border text-gray-200 px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        )}
        {url && (
          <span className="inline-block mt-2 select-none">
            View Demo{' '}
            <span
              className="inline-block group-hover:translate-x-1.5 transition-transform duration-300"
              style={{ display: 'inline-block' }}
            >
              →
            </span>
          </span>
        )}
      </div>
    </GlowingCard>
  );
};
