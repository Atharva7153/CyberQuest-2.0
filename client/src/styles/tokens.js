/**
 * NEXUS — THE LAST CHANCE
 * Programmable Design Tokens (JavaScript Export)
 * Use across React components, SVG graphics, and future game interfaces.
 */

export const NEXUS_TOKENS = {
  colors: {
    paper: {
      base: '#ECE7DF',
      elevated: '#F4F0E8',
      aged: '#DFD8CD',
      stain: '#D4CBBD',
    },
    ink: {
      black: '#111111',
      charcoal: '#22201E',
      muted: '#5A554E',
      faint: '#8C857B',
    },
    accent: {
      crimson: '#C8191E',
      crimsonDark: '#961014',
      crimsonTint: 'rgba(200, 25, 30, 0.09)',
    },
    grid: {
      minor: 'rgba(17, 17, 17, 0.085)',
      major: 'rgba(17, 17, 17, 0.16)',
      crimsonHairline: 'rgba(200, 25, 30, 0.55)',
    },
  },
  fonts: {
    display: '"Anton", "Oswald", Impact, sans-serif',
    condensed: '"Barlow Condensed", "Oswald", sans-serif',
    editorial: '"Space Grotesk", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  shadows: {
    brutal: '4px 4px 0px 0px #111111',
    brutalSm: '2px 2px 0px 0px #111111',
    brutalCrimson: '4px 4px 0px 0px #C8191E',
  },
};

export default NEXUS_TOKENS;
