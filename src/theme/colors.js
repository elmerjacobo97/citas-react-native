// theme.js

export const theme = {
  palette: {
    primary: {
      main: '#1976D2',
      light: '#4791db',
      dark: '#115293',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4CAF50',
      light: '#80E27E',
      dark: '#087f23',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#FF4081',
      light: '#FF79B0',
      dark: '#C60055',
      contrastText: '#FFFFFF',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
  },
  typography: {
    // fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  shadows: {
    primary: '0 2px 4px rgba(0, 0, 0, 0.1)',
    secondary: '0 4px 8px rgba(0, 0, 0, 0.1)',
    accent: '0 4px 8px rgba(255, 64, 129, 0.2)',
  },
};
