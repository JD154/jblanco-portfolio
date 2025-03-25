import { FC } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const getClasses = () => {
    const classes = ['font-bold'];
    className && classes.push(className);
    return classes.join(' ');
  };

  return (
    <div className="flex items-center">
      <span className={getClasses()}>JB</span>
    </div>
  );
};
