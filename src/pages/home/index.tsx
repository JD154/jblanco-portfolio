import { GlowingButton } from '@/components/GlowingButton';
import { StarsBackground } from '@/components/StarsBackground';
import { FC } from 'react';

export const HomePage: FC = () => {
  return (
    <div>
      <StarsBackground />
      <div className="max-w-2xl lg:max-w-4xl mx-auto absolute top-1/2 left-1/2  z-10 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col justify-center text-center">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-400 dark:from-neutral-200 dark:to-neutral-400 text-center font-sans font-bold drop-shadow-md dark:drop-shadow-white/40 drop-shadow-black/40">
          I'm Jesus Blanco
        </h1>
        <h6 className="dark:text-neutral-400 max-w-lg mt-4 mb-8 text-md text-center relative z-10">
          A senior Front-end developer with over 6 years of experience, passionate about architect clean, maintainable,
          and performant web applications that deliver exceptional user experiences.
        </h6>
        <GlowingButton variant="outline" size="lg" className="relative z-10 ">
          My work
        </GlowingButton>
      </div>
    </div>
  );
};
