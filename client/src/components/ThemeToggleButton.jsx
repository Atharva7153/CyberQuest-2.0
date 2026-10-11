import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggleButton = ({ className = '', compact = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink hover:bg-nexus-crimson hover:text-white hover:border-nexus-crimson font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer select-none ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-nexus-crimson group-hover:text-white shrink-0" />
          {!compact && <span>LIGHT</span>}
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-nexus-crimson group-hover:text-white shrink-0" />
          {!compact && <span>DARK</span>}
        </>
      )}
    </button>
  );
};

export default ThemeToggleButton;
