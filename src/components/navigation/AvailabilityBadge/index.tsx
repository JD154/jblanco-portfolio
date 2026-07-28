import type { FC } from 'react';
import './styles.css';

interface AvailabilityBadgeProps {
  className?: string;
  t: {
    default: string;
    hover: string;
    aria: string;
  };
}

export const AvailabilityBadge: FC<AvailabilityBadgeProps> = ({ className, t }) => {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`nav-badge ${className ?? ''}`}
      onClick={scrollToContact}
      aria-label={t.aria}
    >
      <span className="nav-badge__dot" />
      <span className="nav-badge__label">
        <span className="nav-badge__label-default">{t.default}</span>
        <span className="nav-badge__label-hover" aria-hidden="true">
          {t.hover}
          <span className="nav-badge__arrow">→</span>
        </span>
      </span>
    </button>
  );
};
