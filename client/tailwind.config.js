/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nexus: {
          paper: 'rgb(var(--nexus-paper-rgb) / <alpha-value>)',
          'paper-elevated': 'rgb(var(--nexus-paper-elevated-rgb) / <alpha-value>)',
          'paper-aged': 'rgb(var(--nexus-paper-aged-rgb) / <alpha-value>)',
          ink: 'rgb(var(--nexus-ink-rgb) / <alpha-value>)',
          charcoal: 'rgb(var(--nexus-charcoal-rgb) / <alpha-value>)',
          muted: 'rgb(var(--nexus-muted-rgb) / <alpha-value>)',
          crimson: 'rgb(var(--nexus-crimson-rgb) / <alpha-value>)',
          'crimson-dark': 'rgb(var(--nexus-crimson-dark-rgb) / <alpha-value>)',
          border: 'rgb(var(--nexus-border-rgb) / <alpha-value>)',
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
        brutal: 'var(--nexus-shadow-hard)',
        'brutal-sm': 'var(--nexus-shadow-hard-sm)',
        'brutal-crimson': 'var(--nexus-shadow-crimson)',
      },
    },
  },
  plugins: [],
};
