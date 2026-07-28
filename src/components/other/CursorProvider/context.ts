import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export interface CursorContextType {
  initialCursorVariant: string;
  setInitialCursorVariant: Dispatch<SetStateAction<string>>;
  animateCursorVariant: string;
  setAnimateCursorVariant: Dispatch<SetStateAction<string>>;
  animateCursor: (variant: SetStateAction<string>) => void;
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined);
