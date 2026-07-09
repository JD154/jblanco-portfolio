import { FC } from 'react';
import './styles.css';

interface AvailabilityBadgeProps {
  className?: string;
}

export const AvailabilityBadge: FC<AvailabilityBadgeProps> = ({ className }) => {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`nav-badge ${className ?? ''}`}
      onClick={scrollToContact}
      aria-label="Get in touch — go to contact section"
    >
      <span className="nav-badge__dot" />
      <span className="nav-badge__label">
        <span className="nav-badge__label-default">Booking new projects</span>
        <span className="nav-badge__label-hover" aria-hidden="true">
          Get in touch
          <span className="nav-badge__arrow">→</span>
        </span>
      </span>
    </button>
  );
};
