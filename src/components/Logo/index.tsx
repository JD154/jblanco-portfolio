import { FC } from 'react';
import './styles.css';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const prefix = 'brand-logo';
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(' ');
  };

  return (
    <div className="flex items-center">
      <span className={getClasses()}>JB</span>
    </div>
  );
};
