import { FC } from 'react';
import { Logo } from '../Logo';

import './styles.css';
import { ThemeToggle } from '@/components/general/ThemeToggle';
import { GlowingEffect } from '@/components/ui/glowing-effect';

/* type pageRoutesType = {
  label: string;
  route: NavigationRoutes;
}; */

/* const pageRoutes: pageRoutesType[] = [
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
]; */

export const NavigationBar: FC = () => {
  const prefix = 'navigation-bar';
  /*   const { pathname } = useLocation(); */

  return (
    <header className={`${prefix}__wrapper`}>
      <div className={`${prefix}__container`}>
        <Logo />
        {/* <NavigationMenu className={`${prefix}__menu`}>
          <NavigationMenuList>
            {pageRoutes.map(({ route, label }, index) => (
              <NavigationItem key={index} label={label} route={route} isActive={pathname === route} />
            ))}
          </NavigationMenuList>
        </NavigationMenu> */}
        <ThemeToggle />
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
      </div>
    </header>
  );
};
