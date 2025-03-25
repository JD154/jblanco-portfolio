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
        className={navigationMenuTriggerStyle({
          className: `font-light ${isActive ? 'bg-accent' : null}`,
        })}
      >
        <Link to={route}>{label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
