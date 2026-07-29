import React from 'react';
import { MinimalQuote } from './components/Quote';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import './styles.css';
import type { Ui } from '@/i18n/ui';

interface AboutMeSectionProps {
  t: Ui['about'];
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ t }) => {
  const sectionRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="about-me-section" className="about-me-section">
      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        {/* Header — slim toolbar label + divider */}
        <div className="about-me-section__bar">
          <span className="about-me-section__label" data-reveal>
            <span className="about-me-section__label-dot" />
            {t.label}
          </span>
        </div>

        <div className="about-me-section__container">
          {/* Main content area */}
          <div className="about-me-section__content">
            <h2 className="about-me-section__title" data-reveal style={{ '--reveal-i': 1 } as React.CSSProperties}>
              {t.heading}
            </h2>

            <div className="about-me-section__text-content">
              {t.paragraphs.map((line, idx) => (
                <p
                  key={idx}
                  className="about-me-section__paragraph"
                  data-reveal
                  style={{ '--reveal-i': idx + 2 } as React.CSSProperties}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Enhanced quote section */}
          <aside className="about-me-section__quote-container">
            <div className="about-me-section__quote-wrapper" data-reveal style={{ '--reveal-i': 2 } as React.CSSProperties}>
              <MinimalQuote t={t.quote} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
