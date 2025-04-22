import { motion } from 'motion/react';
import { FC } from 'react';
import { useCursorContext } from '../CursorProvider';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { GlowingEffect } from '../ui/glowing-effect';
import './styles.css';

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
  const cursorContext = useCursorContext();

  const mouseEnterHandler = () => {
    cursorContext?.animateCursor?.('buttonHover');
  };
  const mouseLeaveHandler = () => {
    cursorContext?.animateCursor?.('cursorEnter');
  };

  const prefix = 'navigation-bar';
  /*   const { pathname } = useLocation(); */

  return (
    <header className={`${prefix}__wrapper`}>
      <motion.div className={`${prefix}__container`} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
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
      </motion.div>
    </header>
  );
};
