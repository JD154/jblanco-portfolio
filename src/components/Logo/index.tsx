import { FC } from 'react';
import './styles.css';
import { motion } from 'motion/react';
import { useCursorContext } from '../CursorProvider';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const cursorContext = useCursorContext();

  const mouseEnterHandler = () => {
    cursorContext?.animateCursor?.('buttonHover');
  };
  const mouseLeaveHandler = () => {
    cursorContext?.animateCursor?.('cursorEnter');
  };

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
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        JB
      </motion.a>
    </div>
  );
};
