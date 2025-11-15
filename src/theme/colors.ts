/**
 * Light Theme Colors
 * Tuân theo Material Design 3 guidelines
 */
export const lightColors = {
  // Primary colors - Màu chủ đạo
  primary: '#6750A4', // Purple
  primaryContainer: '#EADDFF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005D',

  // Secondary colors - Màu phụ
  secondary: '#625B71',
  secondaryContainer: '#E8DEF8',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#1D192B',

  // Tertiary colors
  tertiary: '#7D5260',
  tertiaryContainer: '#FFD8E4',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#31111D',

  // Surface colors - Nền
  background: '#FFFBFE',
  surface: '#FFFBFE',
  surfaceVariant: '#E7E0EC',
  onBackground: '#1C1B1F',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',

  // Outline
  outline: '#79747E',
  outlineVariant: '#CAC4D0',

  // Error colors
  error: '#B3261E',
  errorContainer: '#F9DEDC',
  onError: '#FFFFFF',
  onErrorContainer: '#410E0B',

  // Success colors (custom)
  success: '#4CAF50',
  onSuccess: '#FFFFFF',

  // Shadow
  shadow: '#000000',
  scrim: '#000000',
} as const;

/**
 * Dark Theme Colors
 */
export const darkColors = {
  // Primary colors
  primary: '#D0BCFF',
  primaryContainer: '#4F378B',
  onPrimary: '#371E73',
  onPrimaryContainer: '#EADDFF',

  // Secondary colors
  secondary: '#CCC2DC',
  secondaryContainer: '#4A4458',
  onSecondary: '#332D41',
  onSecondaryContainer: '#E8DEF8',

  // Tertiary colors
  tertiary: '#EFB8C8',
  tertiaryContainer: '#633B48',
  onTertiary: '#492532',
  onTertiaryContainer: '#FFD8E4',

  // Surface colors
  background: '#1C1B1F',
  surface: '#1C1B1F',
  surfaceVariant: '#49454F',
  onBackground: '#E6E1E5',
  onSurface: '#E6E1E5',
  onSurfaceVariant: '#CAC4D0',

  // Outline
  outline: '#938F99',
  outlineVariant: '#49454F',

  // Error colors
  error: '#F2B8B5',
  errorContainer: '#8C1D18',
  onError: '#601410',
  onErrorContainer: '#F9DEDC',

  // Success colors
  success: '#81C784',
  onSuccess: '#1B5E20',

  // Shadow
  shadow: '#000000',
  scrim: '#000000',
} as const;

/**
 * Export types để dùng trong components
 */
export type LightColors = typeof lightColors;
export type DarkColors = typeof darkColors;
