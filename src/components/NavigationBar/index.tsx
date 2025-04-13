import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';
import { NavigationItem } from './components/NavigationItem';
import { NavigationRoutes } from '@/typings';
import { FC } from 'react';
import './styles.css';

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
  const prefix = 'navigation-bar';
  const { pathname } = useLocation();

  return (
    <div className={`${prefix}__wrapper`}>
      <div className={`${prefix}__container`}>
        <div className={`${prefix}__background`} />
        <Logo />
        <NavigationMenu className={`${prefix}__menu`}>
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
