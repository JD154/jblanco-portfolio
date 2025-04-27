import { useTheme } from '@/components/other/ThemeProvider';
import { FC } from 'react';

interface MobileRippleEffectProps {
  ripples: { x: number; y: number; key: number }[];
}

export const MobileRippleEffect: FC<MobileRippleEffectProps> = ({ ripples }) => {
  const { theme } = useTheme();

  return (
    <>
      {ripples.map(({ x, y, key }) => (
        <span
          key={key}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'ripple-fade 0.4s linear',
          }}
        />
      ))}
    </>
  );
};
