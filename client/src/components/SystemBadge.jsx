import React from 'react';

/**
 * Brutalist industrial status badge.
 * Variants: 'operational' (solid carbon ink), 'crimson' (warning red), 'outline' (paper + border)
 */
export const SystemBadge = ({
  children,
  variant = 'operational',
  pulse = false,
  className = '',
}) => {
  const variantClasses = {
    operational: 'bg-nexus-ink text-nexus-paper border-nexus-ink',
    crimson: 'bg-nexus-crimson text-white border-nexus-crimson',
    outline: 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-0.5 border font-mono text-[11px] font-semibold uppercase tracking-terminal ${
        variantClasses[variant] || variantClasses.operational
      } ${className}`}
    >
      {pulse && (
        <span
          className={`w-1.5 h-1.5 inline-block ${
            variant === 'crimson'
              ? 'bg-white animate-pulse'
              : variant === 'operational'
                ? 'bg-nexus-crimson animate-pulse'
                : 'bg-nexus-ink'
          }`}
        />
      )}
      {children}
    </span>
  );
};

export default SystemBadge;
