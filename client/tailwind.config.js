/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nexus: {
          paper: 'var(--nexus-paper-base)',
          'paper-elevated': 'var(--nexus-paper-elevated)',
          'paper-aged': 'var(--nexus-paper-aged)',
          ink: 'var(--nexus-ink-black)',
          charcoal: 'var(--nexus-ink-charcoal)',
          muted: 'var(--nexus-ink-muted)',
          crimson: 'var(--nexus-crimson)',
          'crimson-dark': 'var(--nexus-crimson-dark)',
          border: 'var(--nexus-border-color)',
        },
      },
      fontFamily: {
        display: ['"Anton"', '"Oswald"', 'Impact', 'sans-serif'],
        condensed: ['"Barlow Condensed"', '"Oswald"', 'sans-serif'],
        editorial: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        editorial: '0.32em',
        manifesto: '0.45em',
        terminal: '0.14em',
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #111111',
        'brutal-sm': '2px 2px 0px 0px #111111',
        'brutal-crimson': '4px 4px 0px 0px #C8191E',
      },
    },
  },
  plugins: [],
};
