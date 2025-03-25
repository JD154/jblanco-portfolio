import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../ui/navigation-menu';
import { NavigationItem } from './components/NavigationItem';
import { NavigationRoutes } from '@/typings';
import { FC } from 'react';

type pageRoutesType = {
  label: string;
  route: NavigationRoutes;
};

const pageRoutes: pageRoutesType[] = [
  {
    label: 'home',
    route: '/',
  },
  {
    label: 'lab',
    route: '/lab',
  },
  {
    label: 'showcase',
    route: '/showcase',
  },
  {
    label: 'contact',
    route: '/contact',
  },
];

export const NavigationBar: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 ">
      <Logo />
      <NavigationMenu>
        <NavigationMenuList>
          {pageRoutes.map(({ route, label }, index) => (
            <NavigationItem key={index} label={label} route={route} isActive={pathname === route} />
          ))}
          <NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
