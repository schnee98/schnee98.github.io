/**
 * Domain Constants: Styles
 * Application-wide design tokens and constants
 * Reference to CSS custom properties defined in globals.css
 */

// CSS custom property names (references to globals.css)
export const CSS_VARIABLES = {
  COLORS: {
    PRIMARY: '--color-primary',
    SECONDARY: '--color-secondary',
    GRAY_1: '--color-gray-1',
    GRAY_2: '--color-gray-2',
    GRAY_3: '--color-gray-3',
    WHITE: '--color-white',
    BG_PRIMARY: '--color-bg-primary',
    ACCENT_PRIMARY: '--color-accent-primary',
    ACCENT_SECONDARY: '--color-accent-secondary',
    ACCENT_TERTIARY: '--color-accent-tertiary',
  },
  TYPOGRAPHY: {
    FONT_FAMILY: '--font-family',
  },
  SPACING: {
    XS: '--spacing-xs',
    SM: '--spacing-sm',
    MD: '--spacing-md',
    LG: '--spacing-lg',
    XL: '--spacing-xl',
    XL2: '--spacing-2xl',
    XL3: '--spacing-3xl',
    XL4: '--spacing-4xl',
    XL5: '--spacing-5xl',
  },
  BORDER_RADIUS: {
    SM: '--radius-sm',
    MD: '--radius-md',
    LG: '--radius-lg',
    FULL: '--radius-full',
  },
  CONTAINER: {
    MAX_WIDTH: '--container-max-width',
  },
} as const;

export const BREAKPOINTS = {
  PHONE: 360,
  TABLET: 480,
  DESKTOP: 768,
} as const;
