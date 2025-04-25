import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { AnimatedParagraph } from '@/components/general/AnimatedParagraph';
import { GlowingButton } from '@/components/general/GlowingButton';
import { useSequentialReveal } from '@/hooks/useSequentialReveal';

export const HeaderSection = () => {
  const paragraphLines = [
    'A passionate senior Front-end developer with over 6 years of experience,',
    'with a strong focus on architect clean and maintainable web applications',
    'that deliver exceptional user experiences.',
  ];

  const [visibleLines, showButtons] = useSequentialReveal(paragraphLines.length, 400, 500);

  return (
    <section
      id="header-section"
      className="w-full px-4 lg:px-0 lg:max-w-4xl mx-auto absolute top-1/2 left-1/2  z-10 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col justify-center text-center"
    >
      <AnimatedHeading text="I'm JB" sensitivity={0.03} />

      <AnimatedParagraph
        lines={paragraphLines}
        visibleLines={visibleLines}
        className="dark:text-neutral-300 mb-8 text-lg text-center relative z-10"
      />

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
