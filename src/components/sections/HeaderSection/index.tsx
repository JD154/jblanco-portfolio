import { GlowingButton } from '@/components/general/GlowingButton';
import { AnimatedHeading } from '@/components/general/AnimatedHeading';
import type { Ui } from '@/i18n/ui';
import './styles.css';

interface HeaderSectionProps {
  t: Ui['header'];
}

const HeaderSection = ({ t }: HeaderSectionProps) => {
  return (
    <div className="header-section" id="header-section-wrapper">
      <div id="header-section" className="header-section__container">
        {/* Main Content */}
        <div className="header-section__content">
          <AnimatedHeading as="h1" text={t.title} sensitivity={0.03} className="header-section__main-title" />

          <p className="header-section__description">
            {t.descriptionParts[0]} <br />
            {t.descriptionParts[1]} <br />{t.descriptionParts[2]}
          </p>

          {/* Action Buttons */}
          <div id="header-actions" className="header-section__actions">
            <GlowingButton asChild variant="default" className="header-section__primary-btn">
              <a href="/Senior%20Frontend%20Developer%2C%20Jesus%20Blanco.pdf" target="_blank" rel="noopener noreferrer">
                {t.ctaCv}
              </a>
            </GlowingButton>
            <GlowingButton asChild variant="outline" className="header-section__secondary-btn">
              <a href="https://www.linkedin.com/in/jesus-blanco-08682112a/" target="_blank" rel="noopener noreferrer">
                {t.ctaLinkedin}
              </a>
            </GlowingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
