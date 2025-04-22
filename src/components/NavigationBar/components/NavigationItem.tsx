import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { NavigationRoutes } from '@/typings';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  label: string;
  route: NavigationRoutes;
  isActive?: boolean;
}

export const NavigationItem: FC<NavigationItemProps> = ({ label, route, isActive = false }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        active={isActive}
        style={
          {
            backgroundColor: 'transparent',
            color: 'inherit',
            padding: '0.5rem 1rem',
            textDecoration: 'none',
          } as React.CSSProperties
        }
        className={navigationMenuTriggerStyle({
          className: `${isActive ? 'font-bold' : null}`,
        })}
      >
        <Link to={route}>{label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
