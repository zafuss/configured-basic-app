/**
 * Font sizes
 * Tuân theo Material Design type scale
 */
export const fontSizes = {
  xs: 12, // Caption, labels
  sm: 14, // Body small, secondary text
  md: 16, // Body (base), input text
  lg: 18, // Subheading
  xl: 20, // Heading 3
  xxl: 24, // Heading 2
  xxxl: 28, // Heading 1
  display: 34, // Display text
} as const;

/**
 * Font weights
 * React Native hỗ trợ string values
 */
export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Line heights (tỷ lệ so với font size)
 */
export const lineHeights = {
  tight: 1.2, // Headers
  normal: 1.5, // Body text (default)
  relaxed: 1.75, // Long-form content
} as const;

/**
 * Letter spacing (cho uppercase text)
 */
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

/**
 * Export types
 */
export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;
export type LineHeights = typeof lineHeights;
