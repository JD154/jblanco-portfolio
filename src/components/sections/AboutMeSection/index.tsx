import React from 'react';
import type { CSSProperties } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { SectionToolbar } from '@/components/general/SectionToolbar';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
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
        {/* Header — shared section toolbar. A span (not a heading): the section's
            heading is the display title below. */}
        <SectionToolbar as="span" label={t.label} reveal="unfold" spacing="md" />

        {/* Lede — the human story (left) + a quiet career readout (right) */}
        <div className="about-me-section__lede">
          <div className="about-me-section__story">
            <h2 className="about-me-section__title" data-reveal="unfold" style={{ '--reveal-i': 1 } as CSSProperties}>
              {t.heading}
            </h2>
            <p
              className="about-me-section__attribution"
              data-reveal="unfold"
              style={{ '--reveal-i': 2 } as CSSProperties}
            >
              {t.attribution}
            </p>

            {t.intro.map((paragraph, idx) => (
              <p
                key={idx}
                className="about-me-section__paragraph"
                data-reveal="unfold"
                style={{ '--reveal-i': idx + 3 } as CSSProperties}
              >
                {paragraph}
              </p>
            ))}

            <p
              className="about-me-section__belief"
              data-reveal="unfold"
              style={{ '--reveal-i': t.intro.length + 3 } as CSSProperties}
            >
              {t.belief}
            </p>
          </div>

          <aside
            className="about-me-section__telemetry"
            data-reveal="unfold"
            style={{ '--reveal-i': 2 } as CSSProperties}
            aria-label={`${t.telemetry.value} ${t.telemetry.unit}`}
          >
            <span className="about-me-section__telemetry-value">{t.telemetry.value}</span>
            <span className="about-me-section__telemetry-unit">{t.telemetry.unit}</span>
            <span className="about-me-section__telemetry-since">{t.telemetry.since}</span>
          </aside>
        </div>

        {/* Key consulting areas — instrument grid, the "what I do now" */}
        <div className="about-me-section__areas">
          <div className="about-me-section__areas-bar">
            <span className="about-me-section__areas-label">{t.areasLabel}</span>
          </div>
          <ul className="about-me-section__areas-grid">
            {t.areas.map((area, idx) => (
              <li
                key={area.title}
                className="about-me-section__area"
                data-reveal="unfold"
                style={{ '--reveal-i': idx + 1 } as CSSProperties}
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <span className="about-me-section__area-index">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="about-me-section__area-title">{area.title}</h3>
                <p className="about-me-section__area-body">{area.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
