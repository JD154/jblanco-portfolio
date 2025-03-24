import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  label: string;
  route: string;
  isActive?: boolean;
}

export const NavigationItem = ({ label, route, isActive = false }: NavigationItemProps) => {
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
