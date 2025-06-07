import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { GlowingButton } from '@/components/general/GlowingButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useRef } from 'react';

export const HeaderSection = () => {
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingParagraphRef = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const split = SplitText.create(headingParagraphRef.current, {
        type: 'lines',
        linesClass: 'lines',
        wordsClass: 'words',
        charsClass: 'chars',
      });

      gsap.from(split.lines, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.1,
      });

      gsap.fromTo('#download-btn', { opacity: 0 }, { opacity: 1, duration: 3, ease: 'power2.out' });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      id="header-section"
      className="w-full px-4 lg:px-0 lg:max-w-4xl mx-auto absolute top-1/2 left-1/2 z-20 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col justify-center text-center"
    >
      <AnimatedHeading text="I'm JB" sensitivity={0.03} />

      <p
        ref={headingParagraphRef}
        className=" dark:text-neutral-300 mb-8 text-lg text-center relative z-10 max-w-1xl mx-auto"
      >
        Senior Front-End Developer with 6+ Years of Experience <br /> Crafting clean and functional user interfaces with{' '}
        <br /> a strong focus on mantainability and scalability.
      </p>

      <div className="flex gap-4 transition-opacity duration-700">
        <GlowingButton id="download-btn" variant="outline" size="lg">
          <a href="[Detailed] Frontend Developer, Jesus Blanco 06.pdf" target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </GlowingButton>
        <GlowingButton variant="ghost" size="lg">
          <a href="https://www.linkedin.com/in/jesus-blanco-08682112a/" target="_blank" rel="noopener noreferrer">
            Visit my LinkedIn
          </a>
        </GlowingButton>
      </div>
    </div>
  );
};
