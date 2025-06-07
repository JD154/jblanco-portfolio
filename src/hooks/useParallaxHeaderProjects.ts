import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useParallaxHeaderProjects(headerSelector: string, projectsSelector: string, bgSelector?: string) {
  useEffect(() => {
    const header = document.querySelector(headerSelector);
    const projects = document.querySelector(projectsSelector);
    const bg = bgSelector ? document.querySelector(bgSelector) : null;
    if (!header || !projects) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top top',
        // End when the top of the projects section hits the top of the viewport (no gap)
        end: () => {
          const projectsRect = projects.getBoundingClientRect();
          const headerRect = header.getBoundingClientRect();
          // Calculate the scroll distance so that pinning ends when projects section reaches the top
          return `+=${projectsRect.top - headerRect.top}`;
        },
        scrub: true,
        pin: header,
        anticipatePin: 1,
      },
    });

    if (bg) {
      tl.to(bg, { y: 100, ease: 'none' }, 0);
    }
    tl.to(header, { y: -200, opacity: 0, ease: 'none' }, 0);
    tl.fromTo(projects, { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.7);

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [headerSelector, projectsSelector, bgSelector]);
}
