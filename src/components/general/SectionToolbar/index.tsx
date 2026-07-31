import React from 'react';
import './styles.css';

type SectionToolbarSpacing = 'sm' | 'md' | 'lg';

export interface SectionToolbarProps {
  /** Section label text. Rendered as a compact wide-tracked uppercase label beside the signal dot. */
  label: React.ReactNode;
  /**
   * Element used for the label. Use `'h2'` when the toolbar label is the section's
   * heading (Projects, Contact); use `'span'` when the section already has a
   * separate heading and this is only an orientation label (About Me).
   */
  as?: 'h2' | 'span';
  /**
   * Scroll-reveal variant applied to the label — matches the `[data-reveal='…']`
   * verbs in `src/styles/index.css` (`'unfold'` | `'focus'` | `'settle'`). Omit
   * for the default vertical rise (used by Contact).
   */
  reveal?: string;
  /**
   * Bottom gap to the content that follows — the one spacing axis sections tune.
   * `sm` = 2rem, `md` = clamp(2.5rem, 5vw, 4rem), `lg` = clamp(3rem, 5vw, 5rem).
   */
  spacing?: SectionToolbarSpacing;
  /** Trailing content aligned to the opposite edge (e.g. project filters). */
  children?: React.ReactNode;
  /** Extra classes merged onto the root. */
  className?: string;
}

/**
 * Section Toolbar — the shared instrument-panel header that opens each major
 * section: a compact wide-tracked uppercase label, a controlled-halo signal dot,
 * and a one-pixel hairline divider that fades toward the trailing edge
 * (DESIGN.md › Section Toolbar). Optional trailing children sit on the opposite
 * edge. Forwards a ref to the root so a caller can attach a scroll-reveal
 * observer to the toolbar itself (as ProjectsSection does).
 */
export const SectionToolbar = React.forwardRef<HTMLDivElement, SectionToolbarProps>(
  ({ label, as: LabelTag = 'h2', reveal, spacing = 'sm', children, className }, ref) => {
    const classes = ['section-toolbar', `section-toolbar--space-${spacing}`];
    if (className) classes.push(className);

    return (
      <div ref={ref} className={classes.join(' ')}>
        <LabelTag className="section-toolbar__label" data-reveal={reveal ?? ''}>
          <span className="section-toolbar__dot" aria-hidden="true" />
          {label}
        </LabelTag>
        {children}
      </div>
    );
  },
);

SectionToolbar.displayName = 'SectionToolbar';
