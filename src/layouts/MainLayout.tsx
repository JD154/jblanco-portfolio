import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '@/components/ui/button';

export const MainLayout = () => {
  const routeLinks = [
    {
      route: 'home',
      link: '/',
    },
    {
      route: 'lab',
      link: '/lab',
    },
    {
      route: 'showcase',
      link: '/showcase',
    },
    {
      route: 'contact',
      link: '/contact',
    },
  ];
  return (
    <div className="layout">
      <nav className="flex gap-2 m-4">
        {routeLinks.map(({ route, link }, index) => (
          <Button asChild key={index} variant="secondary">
            <Link to={link} className="">
              {route}
            </Link>
          </Button>
        ))}

        <ThemeToggle />
      </nav>
      <Outlet />
    </div>
  );
};
