/**
 * Spacing scale - Dùng cho padding, margin
 * Theo hệ 8-point grid system (4, 8, 16, 24, 32...)
 */
export const spacing = {
  xs: 4, // Extra small
  sm: 8, // Small
  md: 16, // Medium (base)
  lg: 24, // Large
  xl: 32, // Extra large
  xxl: 48, // 2X large
  xxxl: 64, // 3X large
} as const;

/**
 * Border radius values
 */
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999, // Fully rounded (pill shape)
} as const;

/**
 * Icon sizes
 */
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

/**
 * Export types
 */
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type IconSizes = typeof iconSizes;
