import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '@headlessui/react';

export const MainLayout = () => {
  return (
    <div className="layout">
      <nav className="m-4 flex">
        <Button as={Link} to="/" className="text-primary px-4 py-2">
          Home
        </Button>
        <Button as={Link} to="/lab" className="text-primary px-4 py-2">
          Lab
        </Button>
        <Button as={Link} to="/contact" className="text-primary px-4 py-2">
          Contact
        </Button>

        <Button as={Link} to="/showcase" className="text-primary px-4 py-2">
          Showcase
        </Button>
        <ThemeToggle />
      </nav>
      <Outlet />
    </div>
  );
};
