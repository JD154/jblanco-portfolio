import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { FC } from 'react';

export const UnderConstructionPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-fit min-h-screen">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <div>
        <h1
          className=" text-4xl font-bold text-center text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent
      "
        >
          Great things are coming. Stay tuned!
        </h1>
        <p className="mt-4 text-md text-center text-muted-foreground">
          In the meantime, you can download my CV or visit my Linkedin profile
        </p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <Button asChild variant={'secondary'} className="mt-4 rounded-full">
            <a href="[Detailed] Frontend Developer, Jesus Blanco 06.pdf" target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </Button>
          <Button asChild variant={'outline'} className="mt-4 rounded-full">
            <a href="https://www.linkedin.com/in/jesus-blanco-08682112a/" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
