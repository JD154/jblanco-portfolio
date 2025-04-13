// Add a NotFound component
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

export const NotFound: FC = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex items-center justify-center h-fit min-h-screen">
      <div>
        <h1 className="text-4xl font-bold text-center text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Oops! Page not found.
        </h1>
        <p className="mt-4 text-lg text-center text-secondary">The page you are looking for does not exist.</p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant={'secondary'} className="mt-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              Go to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
