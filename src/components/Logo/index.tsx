import { FC } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const getClasses = () => {
    const classes = ['font-bold', 'text-xl'];
    className && classes.push(className);
    return classes.join(' ');
  };

  return (
    <div className="flex items-center">
      <span className={getClasses()}>&lt;JB /&gt;</span>
    </div>
  );
};
