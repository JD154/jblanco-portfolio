import { motion } from 'motion/react';
import { FC } from 'react';
import './styles.css';
import { useCursorHandlers } from '../CursorProvider/hooks';

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
      <motion.a
        className={getClasses()}
        href="https://www.linkedin.com/in/jesus-blanco-08682112a/"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.9 }}
        {...useCursorHandlers('buttonHover', 'cursorEnter')}
      >
        JB
      </motion.a>
    </div>
  );
};
