// src/components/CustomCursor.jsx
import { useState } from 'react';
import type { FC, ReactNode, SetStateAction } from 'react';
import { CursorContext } from './context';

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
