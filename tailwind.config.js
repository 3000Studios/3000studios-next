// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        corporate: {
          navy: '#1a2332',
          slate: '#2d3748',
          charcoal: '#1e2330',
          steel: '#3d4b5f',
          silver: '#8b96a8',
          gold: '#d4af37',
          bronze: '#cd7f32',
        }
      },
      fontFamily: {
        corporate: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'corporate-gradient': 'linear-gradient(135deg, #1a2332 0%, #2d3748 100%)',
        'steel-gradient': 'linear-gradient(135deg, #2d3748 0%, #3d4b5f 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #cd7f32 100%)',
      }
    },
  },
  plugins: [],
};
