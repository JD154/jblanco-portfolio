import React from 'react';
import type { ReactNode } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import './styles.css';
import type { Ui } from '@/i18n/ui';

interface ContactSectionProps {
  t: Ui['contact'];
}

// Monochrome 1px line icons — inherit currentColor so they stay inside the
// Observatorio Digital field in both themes (no full-color OS emoji).
const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

const GithubIcon = () => (
  <svg {...iconProps}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const MailIcon = () => (
  <svg {...iconProps}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedinIcon = () => (
  <svg {...iconProps}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const sectionRef = useRevealOnScroll<HTMLDivElement>();

  const contactItems: {
    label: string;
    url: string;
    display: string;
    icon: ReactNode;
    primary?: boolean;
    external?: boolean;
  }[] = [
    {
      label: t.items.email,
      url: 'mailto:contact@jblanco.dev',
      display: 'contact@jblanco.dev',
      icon: <MailIcon />,
      primary: true,
    },
    {
      label: t.items.github,
      url: 'https://github.com/JD154',
      display: 'github.com/JD154',
      icon: <GithubIcon />,
      external: true,
    },
    {
      label: t.items.linkedin,
      url: 'https://www.linkedin.com/in/jesus-blanco-08682112a/',
      display: 'linkedin.com/in/jesus-blanco-08682112a',
      icon: <LinkedinIcon />,
      external: true,
    },
  ];

  return (
    <section id="contact-section" className="contact-section">
      <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        {/* Header — slim toolbar label + divider (full-width, homogeneous with other sections) */}
        <div className="contact-section__bar">
          <h2 className="contact-section__label" data-reveal>
            <span className="contact-section__label-dot" />
            {t.label}
          </h2>
        </div>

        <div className="contact-section__layout">
          <div className="contact-section__intro">
            <p className="contact-section__subtitle" data-reveal>
              {t.subtitle}
            </p>

            {/* Reinstated availability signal — the one green in the system, at the
                moment the visitor decides. */}
            <p className="contact-section__availability" data-reveal>
              <span className="contact-section__availability-dot" aria-hidden="true" />
              {t.availability}
            </p>
          </div>

          <div className="contact-section__content">
            {contactItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.url}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-label={`${item.label}: ${item.display}`}
                data-reveal
                style={{ '--reveal-i': idx + 1 } as React.CSSProperties}
                className={`contact-section__item${item.primary ? ' contact-section__item--primary' : ''}`}
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} borderWidth={1.5} />
                <div className="contact-section__item-icon">{item.icon}</div>
                <div className="contact-section__item-content">
                  <div className="contact-section__item-label">{item.label}</div>
                  <div className="contact-section__item-display">{item.display}</div>
                </div>
                <div className="contact-section__item-arrow">
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
