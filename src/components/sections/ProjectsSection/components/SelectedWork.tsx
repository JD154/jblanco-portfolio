import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { ConfidentialPlate } from '@/components/general/ConfidentialPlate';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import type { LocalizedProject } from '@/i18n/projects';
import type { Ui } from '@/i18n/ui';
import './SelectedWork.css';

interface SelectedWorkProps {
  projects: LocalizedProject[];
  t: Ui['projects'];
}

/**
 * Selected Work — a narrow project index beside a single project viewer.
 *
 * Every article shares one grid cell so the section keeps the tallest project's
 * natural height; inactive ones stay in layout but are `visibility: hidden`,
 * `inert` and `aria-hidden`. Never use the `hidden` attribute for them: Tailwind's
 * preflight turns it into `display: none !important`, which drops the height.
 */
export const SelectedWork: FC<SelectedWorkProps> = ({ projects, t }) => {
  const [active, setActive] = useState(() =>
    Math.max(0, projects.findIndex((project) => project.visibility !== 'confidential')),
  );
  const indexRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const index = indexRef.current;
    const selected = index?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!index || !selected || index.scrollWidth <= index.clientWidth) return;

    const row = index.getBoundingClientRect();
    const button = selected.getBoundingClientRect();
    // Move only the index, never the page or another scrollable ancestor.
    if (button.left < row.left) index.scrollLeft += button.left - row.left;
    else if (button.right > row.right) index.scrollLeft += button.right - row.right;
  }, [active]);

  return (
    <div className="selected-work">
      <nav ref={indexRef} className="selected-work__index" aria-label={t.indexAria}>
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
                <div className="selected-work__glow" aria-hidden="true">
                  <GlowingEffect
                    spread={40}
                    borderWidth={1.5}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                </div>
              </div>

              <div className="selected-work__heading">
                <h3 className="selected-work__title">{project.title}</h3>
                <a
                  className="selected-work__case-link"
                  href={project.href}
                  aria-label={t.caseStudyAria.replace('{title}', project.title)}
                >
                  {t.caseStudyTooltip} <span aria-hidden="true">↗</span>
                </a>
              </div>

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
