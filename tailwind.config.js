const { theme: appTheme } = require('./src/config/theme');
console.log('Loading Tailwind config with theme:', JSON.stringify(appTheme, null, 2));

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: appTheme.colors.brand,
        // Semantic colors
        primary: {
          DEFAULT: appTheme.colors.primary.main,
          light: appTheme.colors.primary.light,
          dark: appTheme.colors.primary.dark,
        },
        secondary: {
          DEFAULT: appTheme.colors.secondary.main,
          light: appTheme.colors.secondary.light,
          dark: appTheme.colors.secondary.dark,
        },
        accent: {
          teal: appTheme.colors.accent.teal,
          pink: appTheme.colors.accent.pink,
        }
      },
      fontFamily: {
        display: [appTheme.typography.fonts.display.family, 'sans-serif'],
        body: [appTheme.typography.fonts.body.family, 'sans-serif'],
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
}; 