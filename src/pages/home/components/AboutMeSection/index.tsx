import React from 'react';
import { MinimalQuote } from './components/Quote';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useIsInViewport } from '../../../../hooks/useIsInViewport';
import './styles.css';

export const aboutMeParagraphLines = [
  'From an early age, I have felt a deep curiosity about the world around me, which led me to develop a self-taught spirit and a constant passion for learning about everything. This intellectual curiosity found a clear purpose when I discovered programming in high school. From that moment on, I was able to focus my desire to learn into the vast universe of technology. Using my love for technology to always grow and to create increasingly innovative solutions.',
  'I have always believed that the key to success is to never stop evolving, and I strive to apply this mindset in all my endeavors.',
];

export const aboutMeHeading = 'An Evolution, The Only Way';

export const AboutMeSection: React.FC = () => {
  // 0: heading, 1..n: paragraph lines
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInViewport = useIsInViewport(sectionRef);

  useGSAP(() => {
    if (!isInViewport) return;

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
  }, [isInViewport]);

  return (
    <section id="about-me-section" className="about-me-section">
      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        <div className="about-me-section__container">
          {/* Main content area */}
          <div className="about-me-section__content" ref={contentRef}>
            <div className="about-me-section__header">
              <div className="about-me-section__badge"></div>
              <h2
                className="about-me-section__title"
                ref={headingRef}
                style={{ opacity: 0, transform: 'translateY(50px) scale(0.9)' }}
              >
                {aboutMeHeading}
              </h2>
            </div>

            <div className="about-me-section__text-content">
              {aboutMeParagraphLines.map((line, idx) => (
                <p
                  key={idx}
                  ref={(el) => {
                    lineRefs.current[idx] = el;
                  }}
                  className="about-me-section__paragraph"
                  style={{
                    opacity: 0,
                    transform: 'translateY(30px) translateX(-20px)',
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Enhanced quote section */}
          <aside className="about-me-section__quote-container">
            <div className="about-me-section__quote-wrapper">
              <MinimalQuote />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
