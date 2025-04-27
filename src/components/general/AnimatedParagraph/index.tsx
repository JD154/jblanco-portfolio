import { motion } from 'motion/react';
import './styles.css';

interface AnimatedParagraphProps {
  lines: string[];
  visibleLines: number;
  className?: string;
}

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({ lines, visibleLines, className }) => {
  const prefix = 'animated-paragraph';
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(' ');
  };
  return (
    <h6 className={getClasses()}>
      {lines.map((line, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={visibleLines > idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          style={{ overflow: 'hidden' }}
        >
          {line}
        </motion.div>
      ))}
    </h6>
  );
};
