import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useIsInViewport } from '../../../../hooks/useIsInViewport';
import './styles.css';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contactItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const isInViewport = useIsInViewport(sectionRef);

  const contactItems = [
    {
      label: 'GitHub',
      url: 'https://github.com/JD154',
      display: 'github.com/JD154',
      icon: '🔗',
    },
    {
      label: 'Email',
      url: 'mailto:contact@jblanco.dev',
      display: 'contact@jblanco.dev',
      icon: '✉️',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jesus-blanco-08682112a/',
      display: 'linkedin.com/in/jesus-blanco-08682112a',
      icon: '💼',
    },
  ];

  useGSAP(() => {
    if (!isInViewport) return;

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
  }, [isInViewport]);

  return (
    <section id="contact-section" className="contact-section">
      <div className="py-16 px-6 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        <div className="contact-section__container">
          <div className="contact-section__header">
            <h2
              className="contact-section__title"
              ref={headingRef}
              style={{ opacity: 0, transform: 'translateY(50px) scale(0.9)' }}
            >
              Get In Touch
            </h2>
          </div>

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
                style={{
                  opacity: 0,
                  transform: 'translateY(30px) translateX(-20px)',
                }}
              >
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
      </div>
    </section>
  );
};
