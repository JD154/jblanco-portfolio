import type { CSSProperties, FC } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { SectionToolbar } from '@/components/general/SectionToolbar';
import { GlowingButton } from '@/components/general/GlowingButton';
import { ConfidentialPlate } from '@/components/general/ConfidentialPlate';
import './styles.css';
import type { Lang, Ui } from '@/i18n/ui';
import type { LocalizedProject } from '@/i18n/projects';

/*
  DIRECTION CONTRACT — Project case study (extends the established Observatorio Digital world)

  THESIS: A case study is an observatory dossier on one instrument. The work leads —
  the real screenshot at showcase depth — and the reading below is the log that explains
  it. Refuses the generic "big banner + three feature cards" project template.

  OWN-WORLD: Reversible monochrome field, Clash Display title with luminous shadow, General
  Sans body, JetBrains Mono instrument readouts (case counter, beat indices, live host),
  glass panels, fading hairline section toolbars. No green (reserved for availability).

  STORY: Arriving from the carousel's "View case study", the visitor sees the artifact + a
  one-line thesis + stack + the live action, then reads the challenge→approach log and the
  role, sees the toolkit, and steps to the next case or back to all work.

  FIRST VIEWPORT: Asymmetric split. Left — case kicker + mono counter, display title, lede,
  tech chips, "Visit live site". Right — the real screenshot at showcase depth over its own
  blurred ambient fill. Primary action visible immediately.

  FORM: Established-world extension; composition derived from the real content (no concept
  tournament — the world is fixed and the request is precise).
*/

interface ProjectDetailProps {
  lang: Lang;
  t: Ui['projects'];
  project: LocalizedProject;
  prev: LocalizedProject;
  next: LocalizedProject;
  /** 0-based position in the full project set. */
  index: number;
  total: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

const hostOf = (url: string): string => {
  if (!url) return '';
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return '';
  }
};

export const ProjectDetail: FC<ProjectDetailProps> = ({ lang, t, project, prev, next, index, total }) => {
  const d = t.detail;
  // "All work" now resolves to the dedicated register at /projects (the full
  // index), not the home carousel section.
  const projectsHref = lang === 'es' ? '/es/projects' : '/projects';

  const narrativeRef = useRevealOnScroll<HTMLElement>();
  const roleRef = useRevealOnScroll<HTMLElement>();
  const stackRef = useRevealOnScroll<HTMLElement>();
  const pagerRef = useRevealOnScroll<HTMLElement>();

  const host = hostOf(project.url ?? '');
  const stack = project.techStack ?? [];
  const confidential = project.visibility === 'confidential';

  return (
    <article className="pd">
      {/* ---------- Hero — above the fold, visible immediately (no reveal-arm) ---------- */}
      <header className="pd__hero">
        <div className="pd__container">
          <a className="pd__back" href={projectsHref}>
            <span className="pd__back-arrow" aria-hidden="true">←</span>
            {d.back}
          </a>

          <div className="pd__hero-grid">
            <div className="pd__intro">
              <span className="pd__kicker">
                <span className="pd__kicker-dot" aria-hidden="true" />
                {d.caseLabel}
                <span className="pd__kicker-counter">
                  {d.caseCounter} {pad(index + 1)} / {pad(total)}
                </span>
              </span>

              <h1 className="pd__title">{project.title}</h1>
              <p className="pd__lede">{project.description}</p>

              {stack.length > 0 && (
                <ul className="pd__chips" aria-label={d.stackTitle}>
                  {stack.map((tech) => (
                    <li className="pd__chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              <div className="pd__actions">
                {project.url ? (
                  <>
                    <GlowingButton asChild variant="default" className="pd__cta">
                      <a href={project.url} target="_blank" rel="noreferrer">
                        {d.visitSite}
                      </a>
                    </GlowingButton>
                    {host && <span className="pd__host">{host}</span>}
                  </>
                ) : (
                  <span className="pd__cta-disabled" aria-disabled="true">
                    {d.noDemo}
                  </span>
                )}
              </div>
            </div>

            <figure className="pd__artifact">
              <div className="pd__artifact-frame">
                {confidential ? (
                  <ConfidentialPlate labels={t.confidential} />
                ) : (
                  <>
                    <div
                      className="pd__artifact-bg"
                      style={{ backgroundImage: `url(${project.image})` }}
                      aria-hidden="true"
                    />
                    <img className="pd__artifact-img" src={project.image} alt={project.title} />
                  </>
                )}
                <span className="pd__artifact-glow" aria-hidden="true" />
              </div>
            </figure>
          </div>
        </div>
      </header>

      {/* ---------- Body ---------- */}
      <div className="pd__body">
        {/* Challenge → approach: a two-beat instrument log */}
        <section className="pd__section" ref={narrativeRef}>
          <div className="pd__container">
            <SectionToolbar as="h2" label={d.challengeTitle} reveal="unfold" spacing="md" />
            <div className="pd__beats">
              <div className="pd__beat" data-reveal="unfold" style={{ '--reveal-i': 1 } as CSSProperties}>
                <span className="pd__beat-index">{pad(1)}</span>
                <span className="pd__beat-label">{t.fields.challenge}</span>
                <p className="pd__statement">{project.challenge}</p>
              </div>
              <div className="pd__beat" data-reveal="unfold" style={{ '--reveal-i': 2 } as CSSProperties}>
                <span className="pd__beat-index">{pad(2)}</span>
                <span className="pd__beat-label">{d.approachTitle}</span>
                <p className="pd__statement pd__statement--resolve">{project.decision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Role — the one display-voice callout */}
        <section className="pd__section" ref={roleRef}>
          <div className="pd__container">
            <SectionToolbar as="h2" label={d.roleTitle} reveal="unfold" spacing="md" />
            <p className="pd__role" data-reveal="unfold" style={{ '--reveal-i': 1 } as CSSProperties}>
              {project.role}
            </p>
          </div>
        </section>

        {/* Stack — instrument grid of the toolkit */}
        {stack.length > 0 && (
          <section className="pd__section" ref={stackRef}>
            <div className="pd__container">
              <SectionToolbar as="h2" label={d.stackTitle} reveal="unfold" spacing="md">
                <span className="pd__stack-count">
                  {pad(stack.length)} {d.stackCount}
                </span>
              </SectionToolbar>
              <ul className="pd__stack-grid">
                {stack.map((tech, i) => (
                  <li
                    className="pd__stack-cell"
                    key={tech}
                    data-reveal="unfold"
                    style={{ '--reveal-i': i + 1 } as CSSProperties}
                  >
                    <span className="pd__stack-index">{pad(i + 1)}</span>
                    <span className="pd__stack-name">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Pager — next / previous case + back to all work */}
        <section className="pd__section pd__pager-section" ref={pagerRef}>
          <div className="pd__container">
            <SectionToolbar as="h2" label={d.pagerLabel} reveal="unfold" spacing="md">
              <a className="pd__all-link" href={projectsHref}>
                {d.allWork}
              </a>
            </SectionToolbar>
            <div className="pd__pager">
              <a className="pd__pager-card pd__pager-card--prev" href={prev.href} data-reveal="unfold">
                <span className="pd__pager-meta">
                  <span className="pd__pager-arrow" aria-hidden="true">←</span>
                  {d.prev}
                </span>
                <span className="pd__pager-title">{prev.title}</span>
                <span className="pd__pager-thumb" aria-hidden="true">
                  {prev.visibility === 'confidential' ? (
                    <ConfidentialPlate labels={t.confidential} />
                  ) : (
                    <img src={prev.image} alt="" loading="lazy" />
                  )}
                </span>
              </a>
              <a
                className="pd__pager-card pd__pager-card--next"
                href={next.href}
                data-reveal="unfold"
                style={{ '--reveal-i': 1 } as CSSProperties}
              >
                <span className="pd__pager-meta">
                  {d.next}
                  <span className="pd__pager-arrow" aria-hidden="true">→</span>
                </span>
                <span className="pd__pager-title">{next.title}</span>
                <span className="pd__pager-thumb" aria-hidden="true">
                  {next.visibility === 'confidential' ? (
                    <ConfidentialPlate labels={t.confidential} />
                  ) : (
                    <img src={next.image} alt="" loading="lazy" />
                  )}
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
