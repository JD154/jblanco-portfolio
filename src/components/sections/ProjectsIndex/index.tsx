import type { CSSProperties, FC } from 'react';
import { useState } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { SectionToolbar } from '@/components/general/SectionToolbar';
import { GlowingButton } from '@/components/general/GlowingButton';
import { ConfidentialPlate } from '@/components/general/ConfidentialPlate';
import './styles.css';
import type { Lang, Ui } from '@/i18n/ui';
import type { LocalizedProject } from '@/i18n/projects';

/*
  DIRECTION CONTRACT — Projects register (extends the established Observatorio Digital world)

  THESIS: The dedicated /projects route is the complete REGISTER of instruments. Where the
  home carousel brings one project into focus and each case study is its dossier, this page
  logs every project in one scannable monochrome index. Refuses the default portfolio grid of
  equal screenshot cards; the work is a catalogue, read top to bottom.

  OWN-WORLD: Reversible monochrome field, sparse stars. Clash Display "All Work" title with luminous
  shadow, General Sans body, JetBrains Mono catalog IDs / live hosts / counters. Fading
  hairline dividers between register rows, 16:10 screenshot plates over their own blurred
  ambient fill, glass closing panel. One green signal, reserved for availability.

  STORY: The visitor lands on a masthead (label, count readout, filters), scans the register —
  each row a catalog ID, plate, title, role, stack, live host — resolves rows into focus on
  scroll, filters by stack, opens any entry into its case study, and ends at a contact band.

  FIRST VIEWPORT: Left-aligned masthead — "Home" return, Project Index kicker + mono readout,
  Clash Display "All Work" headline with luminous shadow, one-line lede, stack filters —
  above the first register rows already resolving into focus.

  FORM: Established-world extension; a "register / catalogue index" structure derived directly
  from the fixed content (11 projects) and task (scan → open a case study). World and content
  are pinned, so no concept tournament — the composition is shaped from the material.
*/

interface ProjectsIndexProps {
  lang: Lang;
  projects: LocalizedProject[];
  t: Ui['projects'];
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

/** One register entry. Owns its own scroll-reveal so rows resolve into focus as they enter. */
const RegisterRow: FC<{ project: LocalizedProject; n: number; t: Ui['projects'] }> = ({ project, n, t }) => {
  const ref = useRevealOnScroll<HTMLLIElement>();
  const host = hostOf(project.url ?? '');
  const live = Boolean(host);
  const confidential = project.visibility === 'confidential';
  const stack = (project.techStack ?? []).slice(0, 4);
  const role = project.roleShort ?? project.role;

  return (
    <li className="pi-row" ref={ref}>
      <a className="pi-row__link" href={project.href} data-reveal="focus" aria-label={`${t.index.open}: ${project.title}`}>
        <span className="pi-row__index" aria-hidden="true">
          {pad(n + 1)}
        </span>

        <span className="pi-row__plate">
          {confidential ? (
            <ConfidentialPlate labels={t.confidential} />
          ) : (
            <>
              <span className="pi-row__plate-bg" style={{ backgroundImage: `url(${project.image})` }} aria-hidden="true" />
              <img className="pi-row__plate-img" src={project.image} alt="" loading="lazy" />
            </>
          )}
        </span>

        <span className="pi-row__meta">
          {/* A real heading so screen-reader heading navigation can traverse the
              catalog (h1 "All Work" → h2 per project). Non-interactive, so it's
              valid inside the row link; the link keeps its own aria-label. */}
          <h2 className="pi-row__title">{project.title}</h2>
          <span className="pi-row__role">{role}</span>
          {stack.length > 0 && (
            <span className="pi-row__chips">
              {stack.map((tech) => (
                <span className="pi-row__chip" key={tech}>
                  {tech}
                </span>
              ))}
            </span>
          )}
        </span>

        <span className="pi-row__aside">
          <span
            className={`pi-row__status${live ? ' pi-row__status--live' : ''}${
              confidential ? ' pi-row__status--nda' : ''
            }`}
          >
            {live ? (
              <>
                <span className="pi-row__status-dot" aria-hidden="true" />
                {host}
              </>
            ) : confidential ? (
              t.index.confidentialTag
            ) : (
              t.index.noDemoTag
            )}
          </span>
          <span className="pi-row__open">
            <span className="pi-row__open-label">{t.index.open}</span>
            <span className="pi-row__arrow" aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </a>
    </li>
  );
};

export const ProjectsIndex: FC<ProjectsIndexProps> = ({ lang, projects, t }) => {
  const [filter, setFilter] = useState<string>('all');
  const filters = [
    { key: 'all', label: t.filterAll },
    { key: 'react', label: t.filters.react },
    { key: 'vue', label: t.filters.vue },
    { key: 'typescript', label: t.filters.typescript },
  ];

  // Preserve each project's canonical position so a register ID always matches the
  // "Case 05 / 11" counter on its case study, regardless of the active filter.
  const indexed = projects.map((project, n) => ({ project, n }));
  const filtered =
    filter === 'all'
      ? indexed
      : indexed.filter(({ project }) =>
          project.techStack?.some((tech) => tech.toLowerCase().includes(filter.toLowerCase())),
        );

  const total = projects.length;
  const liveCount = projects.filter((p) => Boolean(p.url)).length;
  const homeBase = lang === 'es' ? '/es/' : '/';
  const outroRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="pi">
      {/* ---------- Masthead — above the fold, visible immediately ---------- */}
      <header className="pi__masthead">
        <div className="pi__container">
          <a className="pi__back" href={homeBase}>
            <span className="pi__back-arrow" aria-hidden="true">
              ←
            </span>
            {t.index.home}
          </a>

          <span className="pi__kicker">
            <span className="pi__kicker-dot" aria-hidden="true" />
            {t.index.label}
            <span className="pi__kicker-readout">
              {filter === 'all'
                ? `${pad(total)} ${t.index.metaProjects} · ${pad(liveCount)} ${t.index.metaLive} · ${t.index.metaSince}`
                : `${t.index.showing} ${pad(filtered.length)} ${t.index.of} ${pad(total)}`}
            </span>
          </span>

          <h1 className="pi__title">{t.index.heading}</h1>
          <p className="pi__lede">{t.index.lede}</p>

          <div className="pi__filters" role="group" aria-label={t.index.filterLabel}>
            {filters.map(({ key, label }) => (
              <GlowingButton
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                onClick={() => setFilter(key)}
                className="pi__filter-btn"
                aria-pressed={filter === key}
              >
                {label}
              </GlowingButton>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- Register ---------- */}
      <div className="pi__register-wrap">
        <div className="pi__container">
          {filtered.length > 0 ? (
            <ol className="pi__register" key={filter}>
              {filtered.map(({ project, n }) => (
                <RegisterRow key={project.slug} project={project} n={n} t={t} />
              ))}
            </ol>
          ) : (
            <p className="pi__empty">{t.empty}</p>
          )}
        </div>
      </div>

      {/* ---------- Closing contact band ---------- */}
      <div className="pi__outro" ref={outroRef}>
        <div className="pi__container">
          <SectionToolbar as="h2" label={t.index.cta.kicker} reveal="unfold" spacing="md" />
          <div className="pi__cta" data-reveal="unfold" style={{ '--reveal-i': 1 } as CSSProperties}>
            <div className="pi__cta-copy">
              <span className="pi__cta-availability">
                <span className="pi__cta-availability-dot" aria-hidden="true" />
                {t.index.cta.availability}
              </span>
              <p className="pi__cta-title">{t.index.cta.title}</p>
              <p className="pi__cta-body">{t.index.cta.body}</p>
            </div>
            <GlowingButton asChild variant="default" className="pi__cta-action">
              <a href={`${homeBase}#contact-section`}>{t.index.cta.action} →</a>
            </GlowingButton>
          </div>
        </div>
      </div>
    </section>
  );
};
