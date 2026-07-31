import { useRef, useState } from 'react';
import type { FC, PointerEvent as ReactPointerEvent } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { GlowingButton } from '@/components/general/GlowingButton';
import { ConfidentialPlate } from '@/components/general/ConfidentialPlate';
import './ProjectsCarousel.css';
import type { Ui } from '@/i18n/ui';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface CarouselProject {
  title: string;
  description: string;
  image: string;
  /** "public" | "confidential" | "pending" — confidential swaps the screenshot
   *  for the redacted-dossier ConfidentialPlate. */
  visibility?: string;
  techStack?: string[];
  url?: string;
  role: string;
  challenge: string;
  decision: string;
  /** Terse one-line variants for the carousel fact sheet; the full-length
   *  role/challenge/decision are reserved for the case-study detail page. */
  roleShort?: string;
  challengeShort?: string;
  decisionShort?: string;
  /** Case-study detail page for this project. */
  href: string;
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
  const featuredPlateRef = useRef<HTMLDivElement | null>(null);
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
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, clearProps: 'opacity,transform' },
        );
      }
      if (!prefersReducedMotion && featuredImgRef.current) {
        gsap.fromTo(
          featuredImgRef.current,
          { opacity: 0, scale: 1.18, filter: 'blur(12px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out', clearProps: 'opacity,transform,filter' },
        );
      }
      // Confidential plate settles in without a blur-in (its redaction blur is a
      // fixed, intentional part of the surface — animating filter would clear it).
      if (!prefersReducedMotion && featuredPlateRef.current) {
        gsap.fromTo(
          featuredPlateRef.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', clearProps: 'opacity,transform' },
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
  // Every case study uses the same additive evidence frame.
  const facts = [
    { key: 'role', label: t.fields.role, value: active.roleShort ?? active.role },
    { key: 'challenge', label: t.fields.challenge, value: active.challengeShort ?? active.challenge },
    { key: 'decision', label: t.fields.decision, value: active.decisionShort ?? active.decision },
  ];
  const counter = String(activeIndex + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  return (
    <div className="pc" ref={rootRef}>
      <div className="pc__content">
        {/* Left copy */}
        <div className="pc__left" ref={leftRef} key={activeIndex}>
          <h3 className="pc__title" data-animate>
            {active.title}
          </h3>
          <p className="pc__description" data-animate>
            {active.description}
          </p>

          <dl className="pc__facts" data-animate>
            {facts.map(({ key, label, value }) => (
              <div className="pc__fact" key={key}>
                <dt className="pc__fact-label">{label}</dt>
                <dd className="pc__fact-value">{value}</dd>
              </div>
            ))}
          </dl>

          <span className="pc__eyebrow" data-animate>
            {eyebrow}
          </span>

          <div className="pc__cta-row" data-animate>
            {/* Primary action → the case study. The live-demo link lives on the
                detail page, alongside the full challenge / approach / stack. */}
            <GlowingButton asChild variant="default" className="pc__cta">
              <a href={active.href}>{t.viewCaseStudy}</a>
            </GlowingButton>
          </div>
        </div>

        {/* Right stage: featured thumbnail + upcoming filmstrip */}
        <div
          className="pc__stage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="pc__featured">
            {active.visibility === 'confidential' ? (
              <ConfidentialPlate ref={featuredPlateRef} key={active.href} labels={t.confidential} />
            ) : (
              <>
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
                  decoding="async"
                />
              </>
            )}
            <span className="pc__featured-glow" aria-hidden="true" />
          </div>

          {total > 1 && (
            <div className="pc__explore">
              {/* Explorer toolbar — names the strip's purpose and groups the
                  position readout + stepper, so choosing a case study reads as one
                  action rather than four competing controls (filters live above,
                  in the section header, and change the set). */}
              <div className="pc__explore-head">
                <span className="pc__explore-label">
                  <span className="pc__explore-dot" aria-hidden="true" />
                  {t.explore}
                </span>
                <div className="pc__explore-controls">
                  <div className="pc__counter" aria-live="polite">
                    <span className="pc__counter-current">{counter}</span>
                    <span className="pc__counter-total">/ {totalLabel}</span>
                  </div>
                  <div className="pc__nav">
                    <button type="button" className="pc__arrow" onClick={() => go(-1)} aria-label={t.previousAria}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button type="button" className="pc__arrow" onClick={() => go(1)} aria-label={t.nextAria}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`pc__rail ${railEdges.atStart ? 'pc__rail--at-start' : ''} ${
                  railEdges.atEnd ? 'pc__rail--at-end' : ''
                }`}
                ref={railRef}
                onScroll={updateRailEdges}
                role="group"
                aria-label={t.explore}
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
                    {project.visibility === 'confidential' ? (
                      <ConfidentialPlate labels={t.confidential} className="pc__card-plate" />
                    ) : (
                      <img
                        className="pc__card-img"
                        src={project.image}
                        alt={project.title}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span className="pc__card-scrim" aria-hidden="true" />
                    {index === activeIndex && <span className="pc__card-flag">{t.viewing}</span>}
                    <span className="pc__card-title">{project.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
