import type { FC } from 'react';
import './styles.css';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const prefix = 'brand-logo';
  const getClasses = () => {
    const classes = [prefix];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Static brand mark — it is intentionally not a navigation control.
  return (
    <div className="flex items-center">
      <span className={getClasses()}>Jesus Blanco</span>
    </div>
  );
};
