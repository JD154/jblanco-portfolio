import { Button, ButtonProps } from '@headlessui/react';
import { forwardRef } from 'react';

interface BaseButtonProps extends ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(({ children, className, ...props }, ref) => {
  const getClasses = () => {
    const classes = [];
    if (className) {
      classes.push(className);
    }
    return classes.join(' ');
  };

  return (
    <Button ref={ref} className={getClasses()} {...props}>
      {children}
    </Button>
  );
});
