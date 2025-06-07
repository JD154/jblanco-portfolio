import React from 'react';
import { MinimalQuote } from './Quote';
import { motion } from 'motion/react';
import { useRef, useEffect } from 'react';
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
  const isInViewport = useIsInViewport(sectionRef);
  const [visibleCount, setVisibleCount] = React.useState(0);

  // Start reveal only when in viewport
  useEffect(() => {
    if (isInViewport && visibleCount === 0) {
      setVisibleCount(1); // trigger the first step
    }
  }, [isInViewport, visibleCount]);

  // Sequentially reveal lines after heading
  useEffect(() => {
    if (visibleCount > 0 && visibleCount < 1 + aboutMeParagraphLines.length) {
      const timer = setTimeout(() => setVisibleCount(visibleCount + 1), 350);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <section className="about-me-section">
      <div className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={sectionRef}>
        <div className="about-me-section__main">
          <div>
            <motion.h2
              className="text-5xl mb-6 font-bold"
              initial={{ opacity: 0, y: 32 }}
              animate={visibleCount > 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, ease: [0.4, 0.1, 0.2, 1] }}
            >
              {aboutMeHeading}
            </motion.h2>
            <motion.p className="max-w-2xl text-light text-md text-gray-300" style={{ minHeight: 180 }}>
              {aboutMeParagraphLines.map((line, idx) => (
                <motion.span
                  key={idx}
                  style={{ display: 'block', marginBottom: idx < aboutMeParagraphLines.length - 1 ? 16 : 0 }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={visibleCount > idx + 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.4, 0.1, 0.2, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.p>
          </div>
          <aside className="about-me-section__side">
            <MinimalQuote />
          </aside>
        </div>
      </div>
    </section>
  );
};
