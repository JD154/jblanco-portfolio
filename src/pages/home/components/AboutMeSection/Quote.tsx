import React from 'react';

export const MinimalQuote: React.FC = () => (
  <blockquote
    style={{
      fontStyle: 'italic',
      opacity: 0.7,
      fontSize: '1rem',
      textAlign: 'center',
      borderLeft: '2px solid var(--color-border)',
      paddingLeft: '1rem',
      margin: 0,
      lineHeight: 1.5,
    }}
  >
    "An Evolution, the only way"
    <br />
    <span style={{ fontSize: '0.85em', opacity: 0.5 }}>
      is a Lyric extract from <b>Dready Moon</b> of <b>Big Black Delta</b>
    </span>
  </blockquote>
);
