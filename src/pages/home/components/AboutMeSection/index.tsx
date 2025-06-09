import React from 'react';
import { MinimalQuote } from './components/Quote';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useIsInViewport } from '../../../../components/general/AnimatedHeading/hooks/useIsInViewport';
import './styles.css';

export const aboutMeParagraphLines = [
  'From an early age, I have felt a deep curiosity about the world around me, which led me to develop a self-taught spirit and a constant passion for learning about everything. This intellectual curiosity found a clear purpose when I discovered programming in high school.',
  'From that moment on, I was able to focus my desire to learn into the vast universe of technology. Using my love for technology to always grow and to create increasingly innovative solutions.',
  'I have always believed that the key to success is to never stop evolving, and I strive to apply this mindset in all my endeavors.',
];

export const aboutMeHeading = 'An Evolution, The Only Way';

export const AboutMeSection: React.FC = () => {
  // 0: heading, 1..n: paragraph lines
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isInViewport = useIsInViewport(sectionRef);

  useGSAP(() => {
    if (!isInViewport) return;
    if (headingRef.current) {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    }
    lineRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1 * idx + 0.3,
            ease: 'power2.out',
          },
        );
      }
    });
  }, [isInViewport]);

  return (
    <section id="about-me-section" className="about-me-section bg-secondary-background">
      <div className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={sectionRef}>
        <div className="about-me-section__main">
          <div>
            <h2
              className="text-5xl mb-6 font-bold"
              ref={headingRef}
              style={{ opacity: 0, transform: 'translateY(32px)' }}
            >
              {aboutMeHeading}
            </h2>
            <p className="max-w-2xl text-light text-md " style={{ minHeight: 180 }}>
              {aboutMeParagraphLines.map((line, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    lineRefs.current[idx] = el;
                  }}
                  style={{
                    display: 'block',
                    marginBottom: idx < aboutMeParagraphLines.length - 1 ? 16 : 0,
                    opacity: 0,
                    transform: 'translateY(24px)',
                  }}
                >
                  {line}
                </span>
              ))}
            </p>
          </div>
          <aside className="about-me-section__side">
            <MinimalQuote />
          </aside>
        </div>
      </div>
    </section>
  );
};
