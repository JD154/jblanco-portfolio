import { useIsInViewport } from '@/hooks/useIsInViewport';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

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
  const isInViewport = useIsInViewport(sectionRef);

  useGSAP(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
  }, [isInViewport]);

  return (
    <section ref={sectionRef} id="about-me-section" className=" relative">
      <div className="h-[1000px] container mx-auto px-4 py-16">
        <h2
          className="fixed top-1/2 bottom-1/2 text-5xl mb-6 font-bold"
          ref={headingRef}
          style={{ opacity: 0, transform: 'translateY(32px)' }}
        >
          {aboutMeHeading}
        </h2>
      </div>
    </section>
  );
};
