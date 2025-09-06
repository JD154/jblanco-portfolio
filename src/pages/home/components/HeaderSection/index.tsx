import { GlowingButton } from '@/components/general/GlowingButton';
import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const HeaderSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingParagraphRef = useRef<HTMLParagraphElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animate decorative elements
      if (decorativeRef.current) {
        gsap.fromTo(
          decorativeRef.current.children,
          { opacity: 0, scale: 0.8, rotation: -20 },
          {
            opacity: 0.1,
            scale: 1,
            rotation: 0,
            duration: 2,
            ease: 'power2.out',
            stagger: 0.3,
          },
        );
      }

      // Animate badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
        );
      }

      // Animate main heading (handled by AnimatedHeading component)

      // Animate description
      const split = SplitText.create(headingParagraphRef.current, {
        type: 'lines',
        linesClass: 'lines',
        wordsClass: 'words',
        charsClass: 'chars',
      });

      tl.from(
        split.lines,
        {
          duration: 1.3,
          y: 100,
          opacity: 0,
          ease: 'power2.out',
          stagger: 0.07,
        },
        '-=0.5',
      );

      // Animate stats
      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
          },
          '-=0.3',
        );
      }

      // Animate action buttons
      tl.fromTo(
        '#header-actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.2',
      );

      // Animate social links
      if (socialRef.current) {
        tl.fromTo(
          socialRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
          },
          '-=0.1',
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <div className="header-section" id="header-section-wrapper">
      {/* Decorative background elements */}
      <div className="header-section__decorative" ref={decorativeRef}>
        <div className="header-section__decorative-element header-section__decorative-element--1"></div>
        <div className="header-section__decorative-element header-section__decorative-element--2"></div>
        <div className="header-section__decorative-element header-section__decorative-element--3"></div>
        <div className="header-section__decorative-element header-section__decorative-element--4"></div>
        <div className="header-section__decorative-element header-section__decorative-element--5"></div>
      </div>

      <div ref={sectionRef} id="header-section" className="header-section__container">
        {/* Main Content */}
        <div className="header-section__content">
          <AnimatedHeading text="I'm JB" sensitivity={0.03} className="header-section__main-title" />

          <p ref={headingParagraphRef} className="header-section__description">
            Senior Front-End Developer with 7 Years of Experience <br />
            Crafting clean and functional user interfaces with <br />a strong focus on maintainability and scalability.
          </p>

          {/* Quick Stats */}
          <div className="header-section__stats" ref={statsRef}>
            <div className="header-section__stat-item">
              <span className="header-section__stat-number">7</span>
              <span className="header-section__stat-label">Years Experience</span>
            </div>
            <div className="header-section__stat-item">
              <span className="header-section__stat-number">50+</span>
              <span className="header-section__stat-label">Projects Completed</span>
            </div>
            <div className="header-section__stat-item">
              <span className="header-section__stat-number">15+</span>
              <span className="header-section__stat-label">Technologies</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div id="header-actions" className="header-section__actions">
            <GlowingButton variant="outline" size="lg" className="header-section__primary-btn">
              <a href="[Detailed] Frontend Developer, Jesus Blanco 06.pdf" target="_blank" rel="noopener noreferrer">
                <span className="header-section__btn-icon">📄</span>
                Download CV
              </a>
            </GlowingButton>
            <GlowingButton variant="ghost" size="lg" className="header-section__secondary-btn">
              <a href="https://www.linkedin.com/in/jesus-blanco-08682112a/" target="_blank" rel="noopener noreferrer">
                <span className="header-section__btn-icon">💼</span>
                Visit LinkedIn
              </a>
            </GlowingButton>
          </div>
        </div>

        {/* Social Links */}
        <div className="header-section__social" ref={socialRef}>
          <a
            href="https://github.com/JD154"
            target="_blank"
            rel="noopener noreferrer"
            className="header-section__social-link"
          >
            <span className="header-section__social-icon">⚡</span>
            <span>GitHub</span>
          </a>
          <a href="mailto:jesusblanco.dev@gmail.com" className="header-section__social-link">
            <span className="header-section__social-icon">✉️</span>
            <span>Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jesus-blanco-08682112a/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-section__social-link"
          >
            <span className="header-section__social-icon">🔗</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
