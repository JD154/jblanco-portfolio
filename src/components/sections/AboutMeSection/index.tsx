import React from 'react';
import { MinimalQuote } from './components/Quote';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import './styles.css';
import type { Ui } from '@/i18n/ui';

interface AboutMeSectionProps {
  t: Ui['about'];
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ t }) => {
  // 0: heading, 1..n: paragraph lines
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInViewport = useIsInViewport(sectionRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (!isInViewport || prefersReducedMotion) return;

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
        },
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.4,
        },
      );
    }

    lineRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, x: -20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.7,
            delay: 0.1 * idx + 0.6,
            ease: 'power2.out',
          },
        );
      }
    });
  }, [isInViewport, prefersReducedMotion]);

  return (
    <section id="about-me-section" className="about-me-section">
      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        {/* Header — slim toolbar label + divider */}
        <div className="about-me-section__bar">
          <span className="about-me-section__label">
            <span className="about-me-section__label-dot" />
            {t.label}
          </span>
        </div>

        <div className="about-me-section__container">
          {/* Main content area */}
          <div className="about-me-section__content" ref={contentRef}>
            <h2 className="about-me-section__title" ref={headingRef}>
              {t.heading}
            </h2>

            <div className="about-me-section__text-content">
              {t.paragraphs.map((line, idx) => (
                <p
                  key={idx}
                  ref={(el) => {
                    lineRefs.current[idx] = el;
                  }}
                  className="about-me-section__paragraph"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Enhanced quote section */}
          <aside className="about-me-section__quote-container">
            <div className="about-me-section__quote-wrapper">
              <MinimalQuote t={t.quote} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
