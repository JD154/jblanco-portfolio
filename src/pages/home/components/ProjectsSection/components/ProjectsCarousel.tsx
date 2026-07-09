import { FC, PointerEvent as ReactPointerEvent, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './ProjectsCarousel.css';

export interface CarouselProject {
  title: string;
  description: string;
  image: string;
  techStack?: string[];
  url?: string;
}

interface ProjectsCarouselProps {
  projects: CarouselProject[];
}

const RAIL_SIZE = 4;
const SWIPE_THRESHOLD = 50;

export const ProjectsCarousel: FC<ProjectsCarouselProps> = ({ projects }) => {
  const total = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const featuredImgRef = useRef<HTMLImageElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const active = projects[activeIndex] ?? projects[0];

  // On every slide change: fade/slide the copy, zoom-focus the featured
  // thumbnail (blur -> sharp, scale down to settle), and stagger the rail.
  useGSAP(
    () => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.querySelectorAll('[data-animate]'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
        );
      }
      if (featuredImgRef.current) {
        gsap.fromTo(
          featuredImgRef.current,
          { opacity: 0, scale: 1.18, filter: 'blur(12px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out' },
        );
      }
      if (railRef.current) {
        gsap.fromTo(
          railRef.current.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
        );
      }
    },
    { dependencies: [activeIndex], scope: rootRef },
  );

  const go = (dir: number) => setActiveIndex((i) => (i + dir + total) % total);
  const jumpTo = (index: number) => setActiveIndex(((index % total) + total) % total);

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

  const eyebrow = active.techStack?.slice(0, 4).join(' · ') ?? 'Featured Project';
  const counter = String(activeIndex + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  // Upcoming projects shown in the right rail (wraps around).
  const railCount = Math.min(RAIL_SIZE, Math.max(0, total - 1));
  const upcoming = Array.from({ length: railCount }, (_, i) => {
    const index = (activeIndex + 1 + i) % total;
    return { index, project: projects[index] };
  });

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
          <span className="pc__eyebrow" data-animate>
            <span className="pc__eyebrow-dot" />
            {eyebrow}
          </span>
          <h3 className="pc__title" data-animate>
            {active.title}
          </h3>
          <p className="pc__description" data-animate>
            {active.description}
          </p>

          <div className="pc__cta-row" data-animate>
            {active.url ? (
              <a className="pc__cta" href={active.url} target="_blank" rel="noreferrer">
                <span className="pc__cta-label">View Project</span>
                <span className="pc__cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <div className="pc__cta pc__cta--disabled" aria-disabled="true">
                <span className="pc__cta-label">Demo Unavailable</span>
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

          {upcoming.length > 0 && (
            <div className="pc__rail" ref={railRef}>
              {upcoming.map(({ index, project }) => (
                <button
                  key={project.title}
                  type="button"
                  className="pc__card"
                  onClick={() => {
                    if (!drag.current.moved) jumpTo(index);
                  }}
                  aria-label={`View ${project.title}`}
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
          <button type="button" className="pc__arrow" onClick={() => go(-1)} aria-label="Previous project">
            ←
          </button>
          <button type="button" className="pc__arrow" onClick={() => go(1)} aria-label="Next project">
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
