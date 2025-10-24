// Add a NotFound component
import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { GlowingButton } from '@/components/general/GlowingButton';
import { StarsBackground } from '@/components/layout/StarsBackground';
import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

export const NotFound: FC = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex items-center justify-center h-fit min-h-screen">
      <StarsBackground />
      <div>
        <AnimatedHeading text="Oops!" fontSize="7rem" className="p-6" />
        <p className="text-lg text-center opacity-90">
          The page you are looking for does not exist or has been moved.
          <br />
          Please check the URL or return to the home page.
        </p>
        <div className="flex items-center justify-center mt-8">
          <GlowingButton id="download-btn" variant="outline" size="lg">
            <a href="/" rel="noopener noreferrer">
              Go to Home
            </a>
          </GlowingButton>
        </div>
      </div>
    </div>
  );
};
