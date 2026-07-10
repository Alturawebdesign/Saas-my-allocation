/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces — EOS near-black navy stack
        ink: {
          900: '#080b12', // app background
          850: '#0b0f18',
          800: '#0e131d', // panels
          750: '#121826', // cards
          700: '#161d2c', // raised
          650: '#1b2333', // hover
          600: '#232c3e', // borders strong
          500: '#2c374b', // borders
        },
        line: '#212a3a',
        // Text
        chalk: '#e8ebf2',
        mute: '#98a2b6',
        faint: '#61708a',
        ghost: '#3f4c63',
        // Semantic finance
        gain: '#3ecf8e',
        gaindim: '#2b9e6e',
        loss: '#f0675f',
        lossdim: '#c14c48',
        // EOS accents
        gold: '#c9a24b',
        golddim: '#8f7231',
        wine: '#8b2f43',
        winebright: '#b23a54',
        // Profiles
        defensif: '#c9a24b',
        equilibre: '#4f86d6',
        dynamique: '#e06b5e',
        // Index / neutral chart
        idx: '#6b7894',
      },
      fontFamily: {
        serif: ['Georgia', "'Times New Roman'", 'Times', 'serif'],
        sans: [
          'system-ui',
          '-apple-system',
          "'Segoe UI'",
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          "'SF Mono'",
          "'JetBrains Mono'",
          'Menlo',
          'Consolas',
          "'Liberation Mono'",
          'monospace',
        ],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        label: '0.12em',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'slide-in': 'slide-in 0.28s cubic-bezier(0.16,1,0.3,1)',
        'scale-in': 'scale-in 0.18s ease-out',
      },
    },
  },
  plugins: [],
}
