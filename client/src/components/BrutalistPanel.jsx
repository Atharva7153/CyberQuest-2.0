import React from 'react';

/**
 * Reusable Brutalist Editorial Panel
 * Inspired directly by the framed information modules at the bottom of the NEXUS poster.
 */
export const BrutalistPanel = ({
  title,
  codeTag,
  accentTitle = true,
  children,
  className = '',
  headerRight = null,
}) => {
  return (
    <div className={`nexus-editorial-box p-4 sm:p-5 ${className}`}>
      {/* Corner Registration Ticks */}
      <span className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t-2 border-l-2 border-nexus-crimson pointer-events-none" />
      <span className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b-2 border-r-2 border-nexus-ink pointer-events-none" />

      {(title || codeTag || headerRight) && (
        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-nexus-ink/20">
          <div className="flex items-center gap-2">
            {codeTag && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-nexus-ink text-nexus-paper tracking-widest uppercase">
                {codeTag}
              </span>
            )}
            {title && (
              <h3
                className={`font-condensed text-sm sm:text-base font-bold uppercase tracking-wider ${
                  accentTitle ? 'text-nexus-crimson' : 'text-nexus-ink'
                }`}
              >
                {title}
              </h3>
            )}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export default BrutalistPanel;
