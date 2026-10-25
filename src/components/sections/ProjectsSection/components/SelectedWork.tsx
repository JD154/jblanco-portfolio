import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { ConfidentialPlate } from '@/components/general/ConfidentialPlate';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import type { LocalizedProject } from '@/i18n/projects';
import type { Ui } from '@/i18n/ui';
import './SelectedWork.css';

interface SelectedWorkProps {
  projects: LocalizedProject[];
  catalogHref: string;
  t: Ui['projects'];
}

// Escape hides the tooltip until the pointer or focus leaves the image link.
// Hover alone never focuses the link, so the key is read on the window.
const dismissTooltip = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return;
  for (const link of document.querySelectorAll<HTMLElement>('.selected-work__image-link:is(:hover, :focus)')) {
    link.dataset.dismissed = 'true';
  }
};
const resetTooltip = (event: { currentTarget: HTMLAnchorElement }) => {
  delete event.currentTarget.dataset.dismissed;
};

/**
 * Selected Work — a narrow project index beside a single project viewer.
 *
 * Every article shares one grid cell so the section keeps the tallest project's
 * natural height; inactive ones stay in layout but are `visibility: hidden`,
 * `inert` and `aria-hidden`. Never use the `hidden` attribute for them: Tailwind's
 * preflight turns it into `display: none !important`, which drops the height.
 */
export const SelectedWork: FC<SelectedWorkProps> = ({ projects, catalogHref, t }) => {
  const [active, setActive] = useState(() =>
    Math.max(0, projects.findIndex((project) => project.visibility !== 'confidential')),
  );

  useEffect(() => {
    window.addEventListener('keydown', dismissTooltip);
    return () => window.removeEventListener('keydown', dismissTooltip);
  }, []);

  return (
    <div className="selected-work">
      <nav className="selected-work__index" aria-label={t.indexAria}>
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            className="selected-work__option"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <span className="selected-work__number">{String(i + 1).padStart(2, '0')}</span>
            {project.title}
          </button>
        ))}
        <a className="selected-work__more" href={catalogHref}>
          {t.exploreMore} <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <div className="selected-work__viewer">
        {projects.map((project, i) => {
          const isActive = i === active;
          const facts = [
            [t.fields.role, project.roleShort ?? project.role],
            [t.fields.challenge, project.challengeShort ?? project.challenge],
            [t.fields.decision, project.decisionShort ?? project.decision],
          ];

          return (
            <article
              key={project.slug}
              className="selected-work__project"
              data-active={String(isActive)}
              inert={!isActive}
              aria-hidden={isActive ? undefined : true}
            >
              <div className="selected-work__artifact">
                {project.visibility === 'confidential' ? (
                  <ConfidentialPlate labels={t.confidential} />
                ) : (
                  <img src={project.image} alt={project.title} />
                )}
                <a
                  className="selected-work__image-link"
                  href={project.href}
                  aria-label={t.caseStudyAria.replace('{title}', project.title)}
                  onPointerLeave={resetTooltip}
                  onBlur={resetTooltip}
                >
                  <span className="selected-work__tooltip" aria-hidden="true">
                    {t.caseStudyTooltip} ↗
                  </span>
                </a>
                {/* Unresolved: the glow is a port of the preview attempt, not a verified effect. */}
                <div className="selected-work__glow" aria-hidden="true">
                  <GlowingEffect
                    spread={40}
                    borderWidth={2}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    variant="white"
                  />
                </div>
              </div>

              <h3 className="selected-work__title">
                <a href={project.href}>
                  {project.title}
                  <span className="selected-work__title-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </h3>

              <div className="selected-work__details">
                <p>{project.description}</p>
                {project.techStack?.length ? (
                  <span className="selected-work__stack">{project.techStack.join(' · ')}</span>
                ) : null}
                <dl>
                  {facts.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
