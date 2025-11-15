import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { darkColors, lightColors } from './colors';
import { borderRadius, iconSizes, spacing } from './spacing';
import {
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from './typography';

// Define light theme
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  },
};

// Define dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
};

export const theme = {
  spacing,
  borderRadius,
  iconSizes,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} as const;

// Export theme types to use in components
export type AppTheme = typeof lightTheme;
export type CustomTheme = typeof theme;

// Export themes
export {
  borderRadius,
  darkColors,
  fontSizes,
  fontWeights,
  iconSizes,
  letterSpacing,
  lightColors,
  lineHeights,
  spacing,
};
