import { Button, ButtonProps } from '@headlessui/react';
import { forwardRef } from 'react';

export type BaseButtonStyles = 'normal' | 'outline' | 'ghost' | 'link';

export interface BaseButtonProps extends ButtonProps {
  children?: React.ReactNode;
  className?: string;
  buttonStyle?: BaseButtonStyles;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, className, buttonStyle = 'normal', ...props }, ref) => {
    const availableStyles: Record<BaseButtonStyles, string> = {
      normal: 'rounded bg-primary py-2 px-4 text-sm text-primary-foreground opacity-100 data-[hover]:opacity-90',
      outline:
        'bg-secondary text-primary border-border cursor-pointer rounded-lg border px-4 py-2 text-sm  opacity-80 hover:opacity-100',
      ghost: 'border-transparent hover:border-border cursor-pointer rounded-lg border-1 px-4 py-2 text-sm',
      link: 'rounded bg-transparent border-transparent py-2 px-4 text-sm text-primary-foreground opacity-100 data-[hover]:opacity-90',
    };

    const getClasses = () => {
      const classes = [];
      className && classes.push(className);
      classes.push(availableStyles[buttonStyle]);
      return classes.join(' ');
    };

    return (
      <Button ref={ref} className={getClasses()} {...props}>
        {children}
      </Button>
    );
  },
);
