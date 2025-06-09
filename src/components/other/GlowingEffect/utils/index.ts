export const LIGHT_GRADIENT = [
  'radial-gradient(circle, #111 0%, rgba(17,17,17,0.9) 20%, rgba(17,17,17,0.6) 40%, rgba(17,17,17,0.25) 70%, rgba(17,17,17,0.15) 100%)',
  'conic-gradient(from 0deg at 50% 50%, rgba(17,17,17,0.18) 0deg, rgba(17,17,17,0.08) 90deg, rgba(17,17,17,0.18) 180deg, rgba(17,17,17,0.08) 270deg, rgba(17,17,17,0.18) 360deg)',
].join(', ');

export const DARK_GRADIENT = [
  'radial-gradient(circle, #fff 0%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0) 100%)',
  'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.15) 0deg, rgba(255,255,255,0.05) 90deg, rgba(255,255,255,0.15) 180deg, rgba(255,255,255,0.05) 270deg, rgba(255,255,255,0.15) 360deg)',
].join(', ');

export const DEFAULT_GRADIENT = [
  'radial-gradient(circle, #a1c4fd 10%, #a1c4fd00 20%)',
  'radial-gradient(circle at 40% 40%, #fbc2eb 5%, #fbc2eb00 15%)',
  'radial-gradient(circle at 60% 60%, #f9d423 10%, #f9d42300 20%)',
  'radial-gradient(circle at 40% 60%, #70e1f5 10%, #70e1f500 20%)',
  'repeating-conic-gradient(' +
    'from 236.84deg at 50% 50%,' +
    '#a1c4fd 0%,' +
    '#fbc2eb calc(25% / var(--repeating-conic-gradient-times)),' +
    '#f9d423 calc(50% / var(--repeating-conic-gradient-times)),' +
    '#70e1f5 calc(75% / var(--repeating-conic-gradient-times)),' +
    '#a1c4fd calc(100% / var(--repeating-conic-gradient-times))' +
    ')',
].join(', ');
