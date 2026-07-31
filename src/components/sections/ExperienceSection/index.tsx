import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { SectionToolbar } from '@/components/general/SectionToolbar';
import './styles.css';
import type { Ui } from '@/i18n/ui';

interface ExperienceSectionProps {
  t: Ui['experience'];
}

/** Position of an element relative to `ancestor`, summed through the offset
 *  chain. Uses offsetTop/Left, so it is immune to the scroll-reveal transforms
 *  that would distort getBoundingClientRect mid-animation. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let top = 0;
  let left = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    top += node.offsetTop;
    left += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return { top, left };
}

/**
 * Experience — the "Career Log": a reverse-chronological orbital timeline. A
 * single 1px rail (the orbit) threads every role; each role sits on a quiet
 * hollow node. One filled, haloed signal — the Active Orbit — physically travels
 * the rail: it rests on the current role and glides to whichever entry the
 * pointer enters, then settles back. Mono readouts (period, metric) carry the
 * measurements; the stack sits in a bordered instrument grid. Entrance uses the
 * "settle" verb so this section owns a distinct motion from About (unfold) and
 * Projects (focus).
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ t }) => {
  const sectionRef = useRevealOnScroll<HTMLDivElement>();
  const currentIndex = Math.max(
    0,
    t.roles.findIndex((r) => r.current),
  );

  const timelineRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [interactive, setInteractive] = useState(false);
  const [settled, setSettled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [tracer, setTracer] = useState<{ top: number; left: number } | null>(null);

  const measure = useCallback((index: number) => {
    const timeline = timelineRef.current;
    const dot = dotRefs.current[index];
    if (!timeline || !dot) return;
    setTracer(offsetWithin(dot, timeline));
  }, []);

  // Position the tracer over the active node once mounted, and whenever the
  // active entry changes. Mounting also flips the section to interactive so the
  // per-dot CSS fallback yields to the traveling tracer.
  useLayoutEffect(() => {
    setInteractive(true);
    measure(activeIndex);
  }, [activeIndex, measure]);

  // Enable the glide only after the initial placement has painted, so the tracer
  // fades in directly on the current node rather than sliding in from the corner.
  useEffect(() => {
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keep the tracer aligned when layout shifts (breakpoints, font load, reflow).
  useEffect(() => {
    const onResize = () => measure(activeIndex);
    window.addEventListener('resize', onResize);
    const timeline = timelineRef.current;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro && timeline) ro.observe(timeline);
    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [activeIndex, measure]);

  return (
    <section
      id="experience-section"
      className={`experience-section${interactive ? ' experience-section--interactive' : ''}`}
    >
      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        {/* Orientation label — the section's heading is the display title below. */}
        <SectionToolbar as="span" label={t.label} reveal="settle" spacing="md" />

        <div className="experience-section__intro-row">
          <h2 className="experience-section__title" data-reveal="settle" style={{ '--reveal-i': 1 } as CSSProperties}>
            {t.heading}
          </h2>
          <p className="experience-section__intro" data-reveal="settle" style={{ '--reveal-i': 2 } as CSSProperties}>
            {t.intro}
          </p>
        </div>

        <ol
          className="experience-section__timeline"
          ref={timelineRef}
          onMouseLeave={() => setActiveIndex(currentIndex)}
        >
          {/* The traveling Active Orbit — one signal for the whole rail. */}
          <span
            className={`experience-section__tracer${settled ? ' experience-section__tracer--settled' : ''}`}
            aria-hidden="true"
            style={tracer ? ({ transform: `translate(${tracer.left}px, ${tracer.top}px)` } as CSSProperties) : undefined}
          />

          {t.roles.map((role, idx) => (
            <li
              key={`${role.company}-${role.period}`}
              className={`experience-section__entry${role.current ? ' experience-section__entry--current' : ''}`}
              data-reveal="settle"
              style={{ '--reveal-i': idx + 3 } as CSSProperties}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {/* Instrument gutter — the measurements, in the mono voice */}
              <div className="experience-section__readout">
                <span className="experience-section__period">{role.period}</span>
                {role.metric ? <span className="experience-section__metric">{role.metric}</span> : null}
              </div>

              {/* Body — carries the orbit rail (border-left) and this role's node */}
              <div className="experience-section__body">
                <span
                  className="experience-section__dot"
                  aria-hidden="true"
                  ref={(el) => {
                    dotRefs.current[idx] = el;
                  }}
                />
                <h3 className="experience-section__role">{role.role}</h3>
                <p className="experience-section__company">
                  {role.company}
                  {role.current ? <span className="experience-section__present">{t.present}</span> : null}
                </p>
                <p className="experience-section__summary">{role.summary}</p>
                <ul className="experience-section__stack" aria-label={t.stackLabel}>
                  {role.stack.map((tech) => (
                    <li key={tech} className="experience-section__tech">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
