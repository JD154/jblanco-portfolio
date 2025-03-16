import { Button, ButtonProps } from '@headlessui/react';
import { forwardRef } from 'react';
import './index.css';

export type BaseButtonStyles = 'normal' | 'outline' | 'ghost';

export interface BaseButtonProps extends ButtonProps {
  children?: React.ReactNode;
  className?: string;
  buttonStyle?: BaseButtonStyles;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, className, buttonStyle = 'normal', ...props }, ref) => {
    const prefix = 'base-button';

    const getClasses = () => {
      const classes = [];
      className && classes.push(className);
      classes.push(`${prefix}__${buttonStyle}`);
      return classes.join(' ');
    };

    return (
      <Button ref={ref} className={getClasses()} {...props}>
        {children}
      </Button>
    );
  },
);
