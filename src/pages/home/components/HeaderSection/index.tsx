import { GlowingButton } from '@/components/general/GlowingButton';

import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const HeaderSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingParagraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      const split = SplitText.create(headingParagraphRef.current, {
        type: 'lines',
        linesClass: 'lines',
        wordsClass: 'words',
        charsClass: 'chars',
      });

      tl.from(split.lines, {
        duration: 1.3,
        y: 100,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.07,
      }).fromTo('#header-actions', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    },
    { scope: sectionRef },
  );

  return (
    <div className="relative w-full min-h-screen h-screen" id="header-section-wrapper">
      <div
        ref={sectionRef}
        id="header-section"
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 lg:px-0 lg:max-w-4xl mx-auto z-10 text-center bg-transparent"
      >
        <AnimatedHeading text="I'm JB" sensitivity={0.03} />

        <p
          ref={headingParagraphRef}
          className="dark:text-neutral-300 mb-8 text-lg text-center relative z-10 max-w-1xl mx-auto"
        >
          Senior Front-End Developer with 6+ Years of Experience <br /> Crafting clean and functional user interfaces
          with <br /> a strong focus on mantainability and scalability.
        </p>

        <div id="header-actions" className="flex gap-4 transition-opacity duration-700">
          <GlowingButton variant="outline" size="lg">
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
    </div>
  );
};

export default HeaderSection;
