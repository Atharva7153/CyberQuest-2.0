import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CrosshairMark } from './CrosshairMark';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const NexusPageTransition = ({ children, customLabel = null }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);
    const durationMs = prefersReducedMotion ? 120 : 560;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [location.pathname, prefersReducedMotion]);

  const getLabelForPath = (pathname) => {
    if (pathname === '/login') return 'ENTERING NEXUS // AUTHENTICATION GATE';
    if (pathname === '/dashboard') return 'ENTERING NEXUS // OPERATIVE PORTAL';
    if (pathname === '/system') return 'ENTERING NEXUS // SYSTEM TERMINAL';
    return 'ENTERING NEXUS // PUBLIC DOSSIER';
  };

  const indicatorLabel = customLabel || getLabelForPath(location.pathname);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={`transition-${location.pathname}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : '-4%',
              transition: {
                duration: prefersReducedMotion ? 0.1 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed inset-0 z-50 pointer-events-none nexus-paper-canvas border-b-4 border-nexus-crimson flex flex-col items-center justify-center px-6"
            aria-hidden="true"
          >
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.26em] text-nexus-ink">
                <span className="inline-flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 bg-nexus-crimson inline-block" />
                  {indicatorLabel}
                </span>
                <CrosshairMark variant="crimson" size={12} />
              </div>

              {/* Red System Line Sweep */}
              <div className="w-full h-[3px] bg-nexus-ink/15 overflow-hidden relative">
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: {
                      duration: prefersReducedMotion ? 0.1 : 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  className="w-full h-full bg-nexus-crimson"
                />
              </div>

              <div className="flex justify-between font-mono text-[10px] tracking-widest uppercase text-nexus-muted">
                <span>SYS_REF // CYBER_QUEST</span>
                <span>STATUS: LOCKED</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};

export default NexusPageTransition;
