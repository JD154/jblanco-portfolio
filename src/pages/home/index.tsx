import { StarsBackground } from '@/components/StarsBackground';
import { FC } from 'react';

export const HomePage: FC = () => {
  return (
    <div>
      <StarsBackground />
      <div
        className="max-w-2xl mx-auto"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate3d(-50%,-50%,0)' }}
      >
        <h1
          className="text-gray-900 dark:text-gray-100 drop-shadow-lg dark:drop-shadow-white/40 drop-shadow-black/40"
          style={{ margin: 0, padding: 0, fontSize: '3em', fontWeight: 500, letterSpacing: '-0.05em' }}
        >
          Hello! I'm Jesus Blanco
        </h1>
        <h6>
          <span className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
            A Senior Front-end developer with over 6 years of experience, passionate about crafting elegant,
            user-friendly, and performant web applications that deliver exceptional user experiences.
          </span>
          <br />
        </h6>
      </div>
    </div>
  );
};
