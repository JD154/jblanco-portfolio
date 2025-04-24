import { useContext } from 'react';
import { CursorContext } from './index';

/**
 * Custom hook to access the CursorContext.
 */
export const useCursorContext = () => useContext(CursorContext);

/**
 * Returns mouse event handlers for custom cursor animation.
 * Usage: <MotionComponent {...useCursorHandlers('buttonHover', 'cursorEnter')} />
 */
export const useCursorHandlers = (enterVariant: string = 'buttonHover', leaveVariant: string = 'cursorEnter') => {
  const cursorContext = useCursorContext();

  const onMouseEnter = () => {
    cursorContext?.animateCursor?.(enterVariant);
  };
  const onMouseLeave = () => {
    cursorContext?.animateCursor?.(leaveVariant);
  };

  return { onMouseEnter, onMouseLeave };
};
