import { StarsBackground } from '@/components/StarsBackground';
import { FC } from 'react';

export const HomePage: FC = () => {
  return (
    <div>
      <StarsBackground />
      <div className="max-w-2xl lg:max-w-4xl mx-auto absolute top-1/2 left-1/2  z-10 -translate-y-1/2 -translate-x-1/2">
        <h1 className="text-gray-900 dark:text-gray-100 drop-shadow-lg dark:drop-shadow-white/40 drop-shadow-black/40 m-0 p-0 font-bold md:text-7xl 2xl:text-9xl">
          Hello there!
        </h1>
        <h6>
          <span className="text-gray-700 dark:text-gray-200 text-xl 2xl:text-3xl">
            I'm Jesus Blanco, a senior Front-end developer with over 6 years of experience, passionate about architect
            clean, maintainable, and performant web applications that deliver exceptional user experiences.
          </span>
          <br />
        </h6>
      </div>
    </div>
  );
};
