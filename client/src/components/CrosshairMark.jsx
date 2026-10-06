import React from 'react';

/**
 * Reusable technical crosshair registration mark for brutalist/editorial framing.
 */
export const CrosshairMark = ({
  variant = 'ink',
  size = 14,
  className = '',
  label = null,
}) => {
  const strokeColor = variant === 'crimson' ? '#C8191E' : '#111111';

  return (
    <span
      className={`inline-flex items-center gap-1.5 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="8" y1="0" x2="8" y2="16" stroke={strokeColor} strokeWidth="1.4" />
        <line x1="0" y1="8" x2="16" y2="8" stroke={strokeColor} strokeWidth="1.4" />
        <circle cx="8" cy="8" r="2.5" stroke={strokeColor} strokeWidth="1.1" />
      </svg>
      {label && (
        <span
          className={`font-mono text-[10px] tracking-widest uppercase ${
            variant === 'crimson' ? 'text-nexus-crimson' : 'text-nexus-muted'
          }`}
        >
          {label}
        </span>
      )}
    </span>
  );
};

export default CrosshairMark;
