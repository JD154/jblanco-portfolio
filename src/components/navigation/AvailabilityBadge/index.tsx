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

  // Reads as a contact CTA (the "booking" status lives in the hero, so this no
  // longer duplicates it). The live green dot still signals availability, and on
  // mobile the dot keeps a chevron so it clearly reads as tappable.
  return (
    <button type="button" className={`nav-badge ${className ?? ''}`} onClick={scrollToContact} aria-label={t.aria}>
      <span className="nav-badge__dot" />
      <span className="nav-badge__text">{t.hover}</span>
      <span className="nav-badge__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
};
