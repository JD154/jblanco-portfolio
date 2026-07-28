import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import './styles.css';
import type { Ui } from '@/i18n/ui';

interface ContactSectionProps {
  t: Ui['contact'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contactItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const isInViewport = useIsInViewport(sectionRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  const contactItems = [
    {
      label: t.items.github,
      url: 'https://github.com/JD154',
      display: 'github.com/JD154',
      icon: '🔗',
    },
    {
      label: t.items.email,
      url: 'mailto:contact@jblanco.dev',
      display: 'contact@jblanco.dev',
      icon: '✉️',
    },
    {
      label: t.items.linkedin,
      url: 'https://www.linkedin.com/in/jesus-blanco-08682112a/',
      display: 'linkedin.com/in/jesus-blanco-08682112a',
      icon: '💼',
    },
  ];

  useGSAP(() => {
    if (!isInViewport || prefersReducedMotion) return;

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
        },
      );
    }

    contactItemsRef.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, x: -20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.7,
            delay: 0.15 * idx + 0.4,
            ease: 'power2.out',
          },
        );
      }
    });
  }, [isInViewport, prefersReducedMotion]);

  return (
    <section id="contact-section" className="contact-section">
      <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        {/* Header — slim toolbar label + divider (full-width, homogeneous with other sections) */}
        <div className="contact-section__bar">
          <h2 className="contact-section__label" ref={headingRef}>
            <span className="contact-section__label-dot" />
            {t.label}
          </h2>
        </div>

        <p className="contact-section__subtitle">
          {t.subtitle}
        </p>

        <div className="contact-section__content">
            {contactItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => {
                  contactItemsRef.current[idx] = el;
                }}
                className="contact-section__item"
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} borderWidth={1.5} />
                <div className="contact-section__item-icon">{item.icon}</div>
                <div className="contact-section__item-content">
                  <div className="contact-section__item-label">{item.label}</div>
                  <div className="contact-section__item-display">{item.display}</div>
                </div>
                <div className="contact-section__item-arrow">→</div>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};
