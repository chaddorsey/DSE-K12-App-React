const { theme: appTheme } = require('./src/config/theme');
console.log('Loading Tailwind config...');
console.log('Content paths:', ['./src/**/*.{js,jsx,ts,tsx,html}']);
console.log('Theme:', JSON.stringify(appTheme, null, 2));

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#23235F',
        'primary-light': '#415BA9',
        'primary-dark': '#1A1A46',
        secondary: {
          DEFAULT: '#4FCACA',
          main: '#4FCACA',
          light: '#6DD5D5',
          dark: '#3EA3A3',
          contrast: '#23235F'
        },
        accent: {
          teal: '#51BF9D',
          pink: '#D74880'
        }
      },
      fontFamily: {
        display: ['futura-pt', 'sans-serif'],
        body: ['DM Sans', 'sans-serif']
      },
      fontSize: appTheme.typography.sizes,
      fontWeight: {
        normal: appTheme.typography.fonts.body.weights.regular,
        medium: appTheme.typography.fonts.body.weights.medium,
        bold: appTheme.typography.fonts.body.weights.bold,
      }
    },
  },
  plugins: [],
  mode: 'jit',
}; 