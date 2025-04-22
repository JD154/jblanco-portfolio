// src/components/CustomCursor.jsx
import { createContext, useState, useContext, Dispatch, SetStateAction, FC } from 'react';
import { ReactNode } from 'react';

interface CursorContextType {
  initialCursorVariant: string;
  setInitialCursorVariant: Dispatch<SetStateAction<string>>;
  animateCursorVariant: string;
  setAnimateCursorVariant: Dispatch<SetStateAction<string>>;
  animateCursor: (variant: SetStateAction<string>) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursorContext = () => useContext(CursorContext);

export const CursorContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [initialCursorVariant, setInitialCursorVariant] = useState('');
  const [animateCursorVariant, setAnimateCursorVariant] = useState('');
  // This function allows for smooth transitions between cursor states
  const animateCursor = (variant: SetStateAction<string>) => {
    setInitialCursorVariant(animateCursorVariant);
    setAnimateCursorVariant(variant);
  };
  return (
    <CursorContext.Provider
      value={{
        initialCursorVariant,
        setInitialCursorVariant,
        animateCursorVariant,
        setAnimateCursorVariant,
        animateCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

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
