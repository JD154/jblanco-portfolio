import { useEffect, useState } from 'react';
import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { motion } from 'motion/react';
import { GlowingButton } from '@/components/general/GlowingButton';

const paragraphLines = [
  'A passionate senior Front-end developer with over 6 years of experience,',
  'with a strong focus on architect clean and maintainable web applications',
  'that deliver exceptional user experiences.',
];

export const HeaderSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (visibleLines < paragraphLines.length) {
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), 400);
      return () => clearTimeout(timer);
    } else {
      const btnTimer = setTimeout(() => setShowButtons(true), 500);
      return () => clearTimeout(btnTimer);
    }
  }, [visibleLines]);

  return (
    <section
      id="header-section"
      className="w-full px-4 lg:px-0 lg:max-w-4xl mx-auto absolute top-1/2 left-1/2  z-10 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col justify-center text-center"
    >
      <AnimatedHeading text="I'm JB" />
      <h6 className="dark:text-neutral-300 mt-4 mb-8 text-lg text-center relative z-10">
        {paragraphLines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={visibleLines > idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            style={{ overflow: 'hidden' }}
          >
            {line}
          </motion.div>
        ))}
      </h6>
      <div className={`flex gap-4 transition-opacity duration-700 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
        <GlowingButton variant="outline" size="lg" className="relative z-10">
          <a href="[Detailed] Frontend Developer, Jesus Blanco 06.pdf" target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </GlowingButton>
        <GlowingButton variant="ghost" size="lg" className="relative z-10">
          <a href="https://www.linkedin.com/in/jesus-blanco-08682112a/" target="_blank" rel="noopener noreferrer">
            Visit my LinkedIn
          </a>
        </GlowingButton>
      </div>
    </section>
  );
};
