import { useRef, useState } from 'react';
import type { FC, PointerEvent as ReactPointerEvent } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { GlowingButton } from '@/components/general/GlowingButton';
import './ProjectsCarousel.css';
import type { Ui } from '@/i18n/ui';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface CarouselProject {
  title: string;
  description: string;
  image: string;
  techStack?: string[];
  url?: string;
}

interface ProjectsCarouselProps {
  projects: CarouselProject[];
  t: Ui['projects'];
}

const SWIPE_THRESHOLD = 50;

export const ProjectsCarousel: FC<ProjectsCarouselProps> = ({ projects, t }) => {
  const total = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  // Which rail edges are "capped" — used to drop the fade mask at the extremes.
  const [railEdges, setRailEdges] = useState({ atStart: true, atEnd: true });

  const rootRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const featuredImgRef = useRef<HTMLImageElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const active = projects[activeIndex] ?? projects[0];

  // On every slide change: fade/slide the copy and zoom-focus the featured
  // thumbnail (blur -> sharp, scale down to settle). The rail stays put — the
  // active card is highlighted in place and scrolled into view, so nothing
  // vanishes on selection.
  useGSAP(
    () => {
      if (!prefersReducedMotion && leftRef.current) {
        gsap.fromTo(
          leftRef.current.querySelectorAll('[data-animate]'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
        );
      }
      if (!prefersReducedMotion && featuredImgRef.current) {
        gsap.fromTo(
          featuredImgRef.current,
          { opacity: 0, scale: 1.18, filter: 'blur(12px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out' },
        );
      }
      // Keep the highlighted card centered within the rail — scroll ONLY the
      // rail horizontally (never scrollIntoView, which would move the page).
      const rail = railRef.current;
      const activeCard = rail?.querySelector<HTMLElement>('.pc__card--active');
      if (rail && activeCard) {
        const railRect = rail.getBoundingClientRect();
        const cardRect = activeCard.getBoundingClientRect();
        const delta = cardRect.left - railRect.left - (rail.clientWidth - activeCard.clientWidth) / 2;
        rail.scrollTo({ left: rail.scrollLeft + delta, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    },
    { dependencies: [activeIndex, prefersReducedMotion], scope: rootRef },
  );

  // Intro stagger for the rail — runs once on mount, not on every selection.
  useGSAP(
    () => {
      if (!prefersReducedMotion && railRef.current) {
        gsap.fromTo(
          railRef.current.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06, clearProps: 'opacity,transform' },
        );
      }
      updateRailEdges();
    },
    { dependencies: [prefersReducedMotion], scope: rootRef },
  );

  const go = (dir: number) => setActiveIndex((i) => (i + dir + total) % total);
  const jumpTo = (index: number) => setActiveIndex(((index % total) + total) % total);

  // Track scroll position so the edge fade only shows where there's overflow.
  const updateRailEdges = () => {
    const rail = railRef.current;
    if (!rail) return;
    const atStart = rail.scrollLeft <= 1;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1;
    setRailEdges((prev) => (prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }));
  };

  // Pointer drag / swipe support.
  const drag = useRef({ startX: 0, dragging: false, moved: false });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = { startX: e.clientX, dragging: true, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return;
    if (Math.abs(e.clientX - drag.current.startX) > 10) drag.current.moved = true;
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.dragging = false;
    if (dx <= -SWIPE_THRESHOLD) go(1);
    else if (dx >= SWIPE_THRESHOLD) go(-1);
  };

  if (!active) return null;

  const eyebrow = active.techStack?.slice(0, 4).join(' · ') ?? t.featuredFallback;
  const counter = String(activeIndex + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  return (
    <div
      className="pc"
      ref={rootRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="pc__content">
        {/* Left copy */}
        <div className="pc__left" ref={leftRef} key={activeIndex}>
          <h3 className="pc__title" data-animate>
            {active.title}
          </h3>
          <p className="pc__description" data-animate>
            {active.description}
          </p>
          <span className="pc__eyebrow" data-animate>
            {eyebrow}
          </span>

          <div className="pc__cta-row" data-animate>
            {active.url ? (
              <GlowingButton asChild variant="default" className="pc__cta">
                <a href={active.url} target="_blank" rel="noreferrer">
                  {t.viewProject}
                </a>
              </GlowingButton>
            ) : (
              <div className="pc__cta--disabled" aria-disabled="true">
                {t.demoUnavailable}
              </div>
            )}
          </div>
        </div>

        {/* Right stage: featured thumbnail + upcoming filmstrip */}
        <div className="pc__stage">
          <div className="pc__featured">
            <div
              className="pc__featured-bg"
              style={{ backgroundImage: `url(${active.image})` }}
              aria-hidden="true"
            />
            <img
              ref={featuredImgRef}
              key={active.image}
              className="pc__featured-img"
              src={active.image}
              alt={active.title}
              draggable={false}
            />
            <span className="pc__featured-glow" aria-hidden="true" />
          </div>

          {total > 1 && (
            <div
              className={`pc__rail ${railEdges.atStart ? 'pc__rail--at-start' : ''} ${
                railEdges.atEnd ? 'pc__rail--at-end' : ''
              }`}
              ref={railRef}
              onScroll={updateRailEdges}
            >
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  className={`pc__card ${index === activeIndex ? 'pc__card--active' : ''}`}
                  onClick={() => {
                    if (!drag.current.moved) jumpTo(index);
                  }}
                  aria-label={`${t.viewProjectAria} ${project.title}`}
                  aria-current={index === activeIndex}
                >
                  <img className="pc__card-img" src={project.image} alt={project.title} draggable={false} />
                  <span className="pc__card-scrim" aria-hidden="true" />
                  <span className="pc__card-title">{project.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="pc__controls">
        <div className="pc__arrows">
          <button type="button" className="pc__arrow" onClick={() => go(-1)} aria-label={t.previousAria}>
            ←
          </button>
          <button type="button" className="pc__arrow" onClick={() => go(1)} aria-label={t.nextAria}>
            →
          </button>
        </div>

        <div className="pc__progress" role="presentation">
          <span className="pc__progress-fill" style={{ width: `${((activeIndex + 1) / total) * 100}%` }} />
        </div>

        <div className="pc__counter" aria-live="polite">
          <span className="pc__counter-current">{counter}</span>
          <span className="pc__counter-total">/ {totalLabel}</span>
        </div>
      </div>
    </div>
  );
};
