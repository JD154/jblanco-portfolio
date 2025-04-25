// src/components/CustomCursor.jsx
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

interface CursorContextType {
  initialCursorVariant: string;
  setInitialCursorVariant: Dispatch<SetStateAction<string>>;
  animateCursorVariant: string;
  setAnimateCursorVariant: Dispatch<SetStateAction<string>>;
  animateCursor: (variant: SetStateAction<string>) => void;
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined);

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
