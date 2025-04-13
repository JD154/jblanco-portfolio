import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';
import { NavigationItem } from './components/NavigationItem';
import { NavigationRoutes } from '@/typings';
import { FC } from 'react';

type pageRoutesType = {
  label: string;
  route: NavigationRoutes;
};

const pageRoutes: pageRoutesType[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Lab',
    route: '/lab',
  },
  {
    label: 'Showcase',
    route: '/showcase',
  },
  {
    label: 'Contact',
    route: '/contact',
  },
];

export const NavigationBar: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="pt-6 mb-16">
      <div className="flex items-center justify-between w-full px-6 py-2 border shadow rounded-full backdrop-blur-lg bg-card">
        <Logo />
        <NavigationMenu className="flex items-center gap-4">
          <NavigationMenuList>
            {pageRoutes.map(({ route, label }, index) => (
              <NavigationItem key={index} label={label} route={route} isActive={pathname === route} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </div>
  );
};
