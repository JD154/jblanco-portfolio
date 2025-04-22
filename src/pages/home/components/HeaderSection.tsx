import { GlowingButton } from '@/components/GlowingButton';

export const HeaderSection = () => {
  return (
    <section
      id="header-section"
      className="w-full px-4 lg:px-0 lg:max-w-4xl mx-auto absolute top-1/2 left-1/2  z-10 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col justify-center text-center"
    >
      <h1 className="relative z-10 text-5xl lg:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-200 dark:to-neutral-400 text-center font-sans font-bold drop-shadow-md dark:drop-shadow-white/40 drop-shadow-black/40">
        I'm Jesus Blanco
      </h1>
      <h6 className="dark:text-neutral-400 max-w-lg mt-4 mb-8 text-md text-center relative z-10">
        A passionate senior Front-end developer with over 6 years of experience, with a strong focus on architect clean
        and maintainable web applications that deliver exceptional user experiences.
      </h6>
      <GlowingButton variant="outline" size="lg" className="relative z-10" asChild>
        <a href="[Detailed] Frontend Developer, Jesus Blanco 06.pdf" target="_blank" rel="noopener noreferrer">
          Download CV
        </a>
      </GlowingButton>
    </section>
  );
};
