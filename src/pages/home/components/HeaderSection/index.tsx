import { GlowingButton } from '@/components/general/GlowingButton';
import { StarsBackground } from '@/components/layout/StarsBackground';
import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const HeaderSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingParagraphRef = useRef<HTMLParagraphElement>(null);
  const starsBgRef = useRef<HTMLDivElement>(null);
  // Camera Z state for smooth zoom
  const [cameraZ, setCameraZ] = useState(1);
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

  // Animate cameraZ on scroll using GSAP/ScrollTrigger
  useGSAP(() => {
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: '#header-section',
          start: 'center top',
          end: 'center top',
          scrub: 2, // Smooth the scroll animation
          onUpdate: (self) => {
            setCameraZ(1 + 1.2 * self.progress);
          },
        },
      },
    );
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen h-screen" id="header-section-wrapper">
      <StarsBackground />
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
    </div>
  );
};

export default HeaderSection;
