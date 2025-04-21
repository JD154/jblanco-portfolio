import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';
import { NavigationItem } from './components/NavigationItem';
import { NavigationRoutes } from '@/typings';
import { FC } from 'react';
import './styles.css';
import { GlowingEffect } from '../ui/glowing-effect';

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
  const prefix = 'navigation-bar';
  const { pathname } = useLocation();

  return (
    <header className={`${prefix}__wrapper`}>
      <div className={`${prefix}__container`}>
        <Logo />
        <NavigationMenu className={`${prefix}__menu`}>
          <NavigationMenuList>
            {pageRoutes.map(({ route, label }, index) => (
              <NavigationItem key={index} label={label} route={route} isActive={pathname === route} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
      </div>
    </header>
  );
};
