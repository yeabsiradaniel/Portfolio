import React from 'react';

/**
 * Site logo as inline SVG so it inherits the scene-theme accent color via
 * currentColor (an <img> cannot). Same node-graph mark as the old logo.svg.
 */
const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Yeabsira Daniel logo">
    <path
      d="M50 50 L 20 20 M50 50 L 25 80 M50 50 L 80 30 M50 50 L 80 70"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="50" cy="50" r="12" fill="currentColor" />
    <circle cx="20" cy="20" r="6" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="4.5" />
    <circle cx="25" cy="80" r="6" fill="currentColor" />
    <circle cx="80" cy="30" r="6" fill="currentColor" />
    <circle cx="80" cy="70" r="6" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="4.5" />
  </svg>
);

export default Logo;
