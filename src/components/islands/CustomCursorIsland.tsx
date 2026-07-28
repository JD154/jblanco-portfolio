import { CursorContextProvider } from '@/components/other/CursorProvider';
import { CustomCursor } from '@/components/other/CustomCursor';
import { ThemeProvider } from '@/components/other/ThemeProvider';

export function CustomCursorIsland() {
  return (
    <ThemeProvider>
      <CursorContextProvider>
        <CustomCursor />
      </CursorContextProvider>
    </ThemeProvider>
  );
}
