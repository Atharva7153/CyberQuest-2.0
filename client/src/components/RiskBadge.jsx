import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, Flame } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const RISK_TIERS = ['SAFE', 'BALANCED', 'AGGRESSIVE'];

export const RISK_CLASSIFICATION = {
  SAFE: {
    tier: 'SAFE',
    label: 'SAFE',
    code: 'RSK-01 // SAFE',
    headline: 'Low cost · Low risk · Steady progress',
    pillars: ['Low cost', 'Low risk', 'Steady progress'],
    description:
      'Conservative NEXUS modules engineered for reliable credit accumulation with minimal exposure on failure.',
    icon: ShieldCheck,
    accentBarClass: 'bg-nexus-ink',
    dotClass: 'bg-emerald-500',
  },
  BALANCED: {
    tier: 'BALANCED',
    label: 'BALANCED',
    code: 'RSK-02 // BALANCED',
    headline: 'Moderate risk · Controlled growth',
    pillars: ['Moderate risk', 'Controlled growth'],
    description:
      'Calibrated tactical operations balancing entry investment against substantial Resistance Credit yield.',
    icon: Scale,
    accentBarClass: 'bg-nexus-charcoal',
    dotClass: 'bg-amber-400',
  },
  AGGRESSIVE: {
    tier: 'AGGRESSIVE',
    label: 'AGGRESSIVE',
    code: 'RSK-03 // AGGRESSIVE',
    headline: 'High risk · High potential reward',
    pillars: ['High risk', 'High potential reward'],
    description:
      'High-stakes core breaches demanding heavy credit commitment in exchange for maximum payout potential.',
    icon: Flame,
    accentBarClass: 'bg-nexus-crimson',
    dotClass: 'bg-nexus-crimson',
  },
};

export const normalizeRiskTier = (rawRisk) => {
  const upper = String(rawRisk || '')
    .trim()
    .toUpperCase();
  if (RISK_CLASSIFICATION[upper]) return upper;
  if (upper === 'LOW') return 'SAFE';
  if (upper === 'MEDIUM' || upper === 'MODERATE') return 'BALANCED';
  if (upper === 'HIGH' || upper === 'EXTREME' || upper === 'CRITICAL') return 'AGGRESSIVE';
  return 'BALANCED';
};

export const getRiskMetadata = (rawRisk) => {
  const tier = normalizeRiskTier(rawRisk);
  return RISK_CLASSIFICATION[tier] || RISK_CLASSIFICATION.BALANCED;
};

/**
 * Reusable Phase 9 RiskBadge Component
 * Clearly displays a challenge or squad risk classification (SAFE | BALANCED | AGGRESSIVE)
 * with Framer Motion state transitions.
 */
export const RiskBadge = ({
  risk = 'BALANCED',
  size = 'sm',
  variant = 'default',
  showIcon = true,
  showSummary = false,
  pulseAggressive = false,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const meta = getRiskMetadata(risk);
  const IconComponent = meta.icon;

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[9px] gap-1',
    sm: 'px-2 py-0.5 text-[10px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  // Visual variants locked to the Phase 1 NEXUS brutalist palette
  const getVariantClasses = () => {
    if (variant === 'onCrimson') {
      // Used inside the crimson specification footer on ChallengeMarketModule cards
      if (meta.tier === 'AGGRESSIVE') {
        return 'bg-nexus-ink text-white border border-white ring-1 ring-white/40';
      }
      if (meta.tier === 'BALANCED') {
        return 'bg-nexus-ink text-nexus-paper border border-nexus-paper/40';
      }
      return 'bg-nexus-paper text-nexus-ink border border-nexus-ink';
    }

    if (variant === 'onDark') {
      // Used on dark ink headers / execution terminals
      if (meta.tier === 'AGGRESSIVE') {
        return 'bg-nexus-crimson text-white border border-white/30';
      }
      if (meta.tier === 'BALANCED') {
        return 'bg-white/10 text-nexus-paper border border-nexus-paper/40';
      }
      return 'bg-nexus-paper text-nexus-ink border border-nexus-paper';
    }

    // Default variant on paper surfaces
    if (meta.tier === 'AGGRESSIVE') {
      return 'bg-nexus-crimson text-white border border-nexus-ink';
    }
    if (meta.tier === 'BALANCED') {
      return 'bg-nexus-ink text-nexus-paper border border-nexus-ink';
    }
    return 'bg-nexus-paper-elevated text-nexus-ink border border-nexus-ink';
  };

  return (
    <div className={`inline-flex flex-col ${showSummary ? 'items-start gap-1' : 'items-center'} ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={meta.tier}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -3, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 3, scale: 0.96 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          title={`${meta.label}: ${meta.headline}`}
          className={`inline-flex items-center font-mono font-bold uppercase tracking-widest select-none leading-none ${
            sizeStyles[size] || sizeStyles.sm
          } ${getVariantClasses()}`}
        >
          {showIcon && (
            <IconComponent
              className={`${iconSizes[size] || iconSizes.sm} shrink-0 ${
                meta.tier === 'AGGRESSIVE' && pulseAggressive ? 'animate-pulse' : ''
              }`}
            />
          )}
          <span>{meta.label}</span>
        </motion.span>
      </AnimatePresence>

      {showSummary && (
        <motion.span
          key={`${meta.tier}-summary`}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-[10px] uppercase tracking-wider text-current opacity-80 leading-tight"
        >
          {meta.headline}
        </motion.span>
      )}
    </div>
  );
};

export default RiskBadge;
