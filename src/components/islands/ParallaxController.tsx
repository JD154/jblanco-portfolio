import { useParallaxTransitionForSections } from '@/hooks/useParallaxTransitionForSections';

const transitions = [
  {
    fromSelector: '#header-section-wrapper',
    toSelector: '#about-me-section',
    pin: false,
  },
  {
    fromSelector: '#about-me-section',
    toSelector: '#projects-section',
    pin: false,
  },
];

export function ParallaxController() {
  useParallaxTransitionForSections(transitions);
  return null;
}
