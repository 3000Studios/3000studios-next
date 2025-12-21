import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        sapphire: '#0F52BA',
        teal: '#008080',
      },
      animation: {
        'fade-in': 'fade-in 1.5s ease-in-out',
        'fade-in-down': 'fade-in-down 1.5s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        'glow-gold': '0 0 20px 0 rgba(255, 215, 0, 0.8)',
        'glow-sapphire': '0 0 20px 0 rgba(15, 82, 186, 0.8)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
