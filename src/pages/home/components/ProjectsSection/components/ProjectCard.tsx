import { GlowingCard } from '@/components/general/GlowingCard';
import { FC } from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack?: string[];
  url?: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({ title, description, image, url, techStack }) => {
  return (
    <GlowingCard redirectTo={url} className="project-card group">
      {/* Image Section */}
      <div className="project-card__image-container">
        <img src={image} alt={title} className="project-card__image" />
        <div className="project-card__image-overlay">
          {url && (
            <div className="project-card__demo-badge">
              <span className="project-card__demo-icon">🚀</span>
              <span>Live Demo</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{title}</h3>
          {url && (
            <div className="project-card__link-indicator">
              <span className="project-card__arrow">→</span>
            </div>
          )}
        </div>

        <p className="project-card__description">{description}</p>

        {/* Tech Stack */}
        {techStack && techStack.length > 0 && (
          <div className="project-card__tech-stack">
            <div className="project-card__tech-label">
              <span>Built with</span>
            </div>
            <div className="project-card__tech-list">
              {techStack.slice(0, 4).map((tech, index) => (
                <span key={index} className="project-card__tech-tag">
                  {tech}
                </span>
              ))}
              {techStack.length > 4 && (
                <span className="project-card__tech-tag project-card__tech-tag--more">+{techStack.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="project-card__footer">
          {url ? (
            <div className="project-card__cta">
              <span className="project-card__cta-text">Explore Project</span>
              <span className="project-card__cta-arrow">→</span>
            </div>
          ) : (
            <div
              className="project-card__status"
              title="Legacy project — live demo unavailable"
              aria-label="Legacy project — live demo unavailable"
            >
              <span className="project-card__status-dot"></span>
              <span className="project-card__status-text">Demo Unavailable</span>
            </div>
          )}
        </div>
      </div>
    </GlowingCard>
  );
};
