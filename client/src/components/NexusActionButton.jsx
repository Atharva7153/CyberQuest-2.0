import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Reusable Brutalist CTA Button
 * Uses Framer Motion exclusively for micro-interaction states (hover/tap).
 * Outer GSAP containers animate parent wrappers so the same DOM node is never animated by both.
 */
export const NexusActionButton = ({
  children,
  variant = 'primary',
  onClick,
  ariaLabel,
  icon = 'arrow',
  className = '',
  type = 'button',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              x: -2,
              y: -2,
              transition: { duration: 0.16, ease: 'easeOut' },
            }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : {
              x: 1,
              y: 1,
              transition: { duration: 0.08 },
            }
      }
      className={`group relative inline-flex items-center justify-between gap-4 px-6 py-3.5 sm:px-7 sm:py-4 font-condensed text-base sm:text-lg font-extrabold uppercase tracking-[0.18em] border-2 border-nexus-ink cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nexus-crimson transition-colors duration-150 ${
        isPrimary
          ? 'bg-nexus-crimson text-white shadow-brutal hover:bg-nexus-ink'
          : 'bg-nexus-paper-elevated text-nexus-ink shadow-brutal hover:bg-nexus-ink hover:text-nexus-paper'
      } ${className}`}
    >
      {/* Top-left technical corner tick */}
      <span
        className={`pointer-events-none absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l ${
          isPrimary ? 'border-white/70' : 'border-nexus-crimson'
        }`}
        aria-hidden="true"
      />

      <span>{children}</span>

      <span
        className={`inline-flex items-center justify-center w-6 h-6 border ${
          isPrimary
            ? 'border-white/40 bg-black/20 text-white'
            : 'border-nexus-ink/30 bg-nexus-paper text-nexus-crimson group-hover:bg-nexus-crimson group-hover:text-white'
        }`}
        aria-hidden="true"
      >
        {icon === 'down' ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ArrowUpRight className="w-4 h-4" />
        )}
      </span>
    </motion.button>
  );
};

export default NexusActionButton;
