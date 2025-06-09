import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxTransitionSectionConfig {
  fromSelector: string;
  toSelector: string;
  fromAnimation?: gsap.TweenVars;
  toAnimation?: gsap.TweenVars;
  bgSelector?: string;
  bgAnimation?: gsap.TweenVars;
  timelineOptions?: gsap.TimelineVars;
  scrollTriggerOptions?: Omit<ScrollTrigger.Vars, 'trigger' | 'start' | 'end' | 'pin'>;
  pin?: boolean;
  start?: string;
  end?: string | (() => string);
  timelinePosition?: number | string;
}

/**
 * Reusable hook for parallax/transition effects between any two sections.
 * @param configs Array of section transition configs
 */
export function useParallaxTransitionForSections(configs: ParallaxTransitionSectionConfig[]) {
  useEffect(() => {
    const timelines: gsap.core.Timeline[] = [];
    configs.forEach((config) => {
      const {
        fromSelector,
        toSelector,
        fromAnimation = { y: -200, opacity: 0, ease: 'none' },
        toAnimation = { y: 0, opacity: 1, ease: 'power1.out' },
        bgSelector,
        bgAnimation = { y: 100, ease: 'none' },
        timelineOptions = {},
        scrollTriggerOptions = {},
        pin = true,
        start = 'top top',
        end,
        timelinePosition = 0.7,
      } = config;
      const fromEl = document.querySelector(fromSelector);
      const toEl = document.querySelector(toSelector);
      const bgEl = bgSelector ? document.querySelector(bgSelector) : null;
      if (!fromEl || !toEl) return;

      const tl = gsap.timeline({
        ...timelineOptions,
        scrollTrigger: {
          trigger: fromEl,
          start,
          end:
            end ||
            (() => {
              const toRect = toEl.getBoundingClientRect();
              const fromRect = fromEl.getBoundingClientRect();
              return `+=${toRect.top - fromRect.top}`;
            }),
          scrub: true,
          pin: pin ? fromEl : false,
          anticipatePin: 1,
          ...scrollTriggerOptions,
        },
      });

      if (bgEl) {
        tl.to(bgEl, bgAnimation, 0);
      }
      tl.to(fromEl, fromAnimation, 0);
      tl.fromTo(toEl, { y: 100, opacity: 0 }, toAnimation, timelinePosition);
      timelines.push(tl);
    });
    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
      });
    };
  }, [JSON.stringify(configs)]);
}
