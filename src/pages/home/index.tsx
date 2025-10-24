import { useParallaxTransitionForSections } from '@/hooks/useParallaxTransitionForSections';
import { FC } from 'react';
import { AboutMeSection } from './components/AboutMeSection';
import { ContactSection } from './components/ContactSection';
import HeaderSection from './components/HeaderSection';
import { ProjectsSection } from './components/ProjectsSection';

export const HomePage: FC = () => {
  // Attach parallax effect between HeaderSection and ProjectsSection
  useParallaxTransitionForSections([
    {
      fromSelector: '#header-section',
      toSelector: '#projects-section',
      bgSelector: '#stars-bg',
      bgAnimation: { scale: 1.5, ease: 'power1.inOut' },
      fromAnimation: { opacity: 0, y: -100, ease: 'power1.inOut' },
      toAnimation: { y: 0, opacity: 1, ease: 'power1.out' },
      timelineOptions: {},
      scrollTriggerOptions: {},
      pin: true,
      start: 'top top',
      end: 'bottom top',
      timelinePosition: 0.7,
    },
  ]);

  return (
    <>
      <HeaderSection />
      <ProjectsSection />
      <AboutMeSection />
      <ContactSection />
    </>
  );
};
