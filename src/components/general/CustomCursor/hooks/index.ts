import { AvailableThemes } from '@/typings';

export const useGetCursorVariants = (theme: AvailableThemes) => {
  const colorVariant = theme === 'dark' ? '#ffffff' : '#333333';

  return {
    cursorEnter: {
      border: `1px solid ${colorVariant}`,
      boxShadow: `0 0 1px 0px ${colorVariant} inset, 0 0 1px 0px ${colorVariant}`,
      scale: 2,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      transition: {
        duration: 0.2,
      },
    },
    cursorLeave: {
      scale: 0,
      border: 0,
      backgroundColor: 'transparent',
      transition: {
        duration: 0.2,
      },
    },
    buttonHover: {
      scale: 1,
      backgroundColor: `${colorVariant}`,
      borderRadius: '50%',
    },
    cursorClick: {
      scale: 0.7,
      backgroundColor: `${colorVariant}`,
      borderRadius: '50%',
      transition: {
        duration: 0.1,
        type: 'spring',
      },
    },
  };
};
