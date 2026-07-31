import { forwardRef } from 'react';
import type { FC } from 'react';
import './styles.css';

/*
  ConfidentialPlate — the "redacted dossier" that stands in for a screenshot on
  NDA client work (visibility: "confidential"). Extends the Observatorio Digital
  world: it evokes an *observed instrument reading with the subject obscured* —
  an abstracted product surface (window chrome, sidebar, redaction bars, a data
  block) blurred behind a scrim, with a sharp CONFIDENTIAL marker on top.

  It replaces the project screenshot wherever one would render (carousel featured
  + rail, register row plate, case-study hero, pager thumb), so it must scale from
  a ~64px thumb to a ~700px showcase. It does that with container queries rather
  than variant props: the plate is its own size container and sheds detail as it
  shrinks. Fully monochrome and theme-reversible via --color-* tokens; the marker
  is neutral-bordered, never green (green stays reserved for availability).
*/

export interface ConfidentialLabels {
  /** Primary marker on large showcase plates, e.g. "Confidential". */
  marker: string;
  /** Compact marker on thumbnails where the full word can't fit, e.g. "NDA". */
  markerShort: string;
  /** Supporting line, e.g. "Client work · under NDA". */
  note: string;
  /** Accessible name for the whole plate. */
  aria: string;
}

interface ConfidentialPlateProps {
  labels: ConfidentialLabels;
  className?: string;
}

/** Redaction glyph — a solid "▨"-style block, purely decorative. */
const RedactionMark: FC = () => (
  <svg className="cplate__glyph" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="none" stroke="currentColor" strokeOpacity="0.6" />
    <path d="M2 8.5 8.5 2M4.5 10 10 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const ConfidentialPlate = forwardRef<HTMLDivElement, ConfidentialPlateProps>(({ labels, className }, ref) => {
  return (
    <div ref={ref} className={`cplate${className ? ` ${className}` : ''}`} role="img" aria-label={labels.aria}>
      {/* Obscured product surface — everything here is decorative and illegible. */}
      <div className="cplate__screen" aria-hidden="true">
        <div className="cplate__chrome">
          <span className="cplate__dot" />
          <span className="cplate__dot" />
          <span className="cplate__dot" />
          <span className="cplate__urlbar" />
        </div>
        <div className="cplate__body">
          <div className="cplate__sidebar">
            <span className="cplate__stub" />
            <span className="cplate__stub" />
            <span className="cplate__stub" />
            <span className="cplate__stub" />
          </div>
          <div className="cplate__main">
            <span className="cplate__bar cplate__bar--w80" />
            <span className="cplate__bar cplate__bar--w60" />
            <span className="cplate__bar cplate__bar--w70" />
            <div className="cplate__chart" aria-hidden="true">
              <span style={{ height: '45%' }} />
              <span style={{ height: '72%' }} />
              <span style={{ height: '38%' }} />
              <span style={{ height: '86%' }} />
              <span style={{ height: '60%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scrim seals the redaction; the marker rides above it, sharp. */}
      <span className="cplate__scrim" aria-hidden="true" />

      <span className="cplate__marker" aria-hidden="true">
        <span className="cplate__pill">
          <RedactionMark />
          <span className="cplate__marker-full">{labels.marker}</span>
          <span className="cplate__marker-short">{labels.markerShort}</span>
        </span>
        <span className="cplate__note">{labels.note}</span>
      </span>
    </div>
  );
});

ConfidentialPlate.displayName = 'ConfidentialPlate';
