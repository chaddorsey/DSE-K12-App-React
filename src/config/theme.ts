export const theme = {
  colors: {
    brand: {
      deepSapphire: '#23235F',
      sapphire: '#415BA9',
      viking: '#4FCACA',
      cranberry: '#D74880',
      puertoRico: '#51BF9D',
      white: '#FFFFFF'
    },
    // Semantic color tokens
    primary: {
      main: '#23235F',     // deepSapphire
      light: '#415BA9',    // sapphire
      dark: '#1A1A46',     // darker version for hover states
      contrast: '#FFFFFF'  // white
    },
    secondary: {
      main: '#4FCACA',     // viking
      light: '#6DD5D5',    // lighter viking
      dark: '#3EA3A3',     // darker viking
      contrast: '#23235F'  // deepSapphire
    },
    accent: {
      teal: '#51BF9D',     // puertoRico
      pink: '#D74880',     // cranberry
    },
    text: {
      primary: '#23235F',   // deepSapphire
      secondary: '#415BA9', // sapphire
      light: '#FFFFFF'      // white
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '2.5rem',    // 40px
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  typography: {
    fonts: {
      display: {
        family: 'futura-pt',
        weights: {
          bold: 700
        }
      },
      body: {
        family: 'DM Sans',
        weights: {
          regular: 400,
          medium: 500,
          bold: 700
        }
      }
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2rem',    // 32px
      '4xl': '2.5rem',  // 40px
    }
  }
} as const;

// Type helpers
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
export type ThemeBreakpoints = typeof theme.breakpoints;
export type ThemeTypography = typeof theme.typography; 