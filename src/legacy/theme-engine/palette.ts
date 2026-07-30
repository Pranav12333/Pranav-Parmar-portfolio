// src/legacy/theme-engine/palette.ts
//
// The v1 palette model, from before the design tokens moved into the Tailwind
// config. Retained because the migration steps in src/migration still translate
// documents authored against it, and because the theme documents under
// config/themes/ are validated against this shape.

export type Ramp = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type Palette = {
  id: string;
  label: string;
  accent: Ramp;
  neutral: Ramp;
  /** Gradient stops, expressed as accent ramp keys. */
  gradient: [keyof Ramp, keyof Ramp, keyof Ramp];
};

export const RAMP_KEYS: (keyof Ramp)[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
];

const ramp = (base: string): Ramp =>
  RAMP_KEYS.reduce((acc, key) => {
    acc[key] = base;
    return acc;
  }, {} as Ramp);

/** Placeholder ramps — real values live in the theme documents. */
export const PLACEHOLDER_ACCENT: Ramp = ramp("#3b82f6");
export const PLACEHOLDER_NEUTRAL: Ramp = ramp("#64748b");

export const contrastPair = (palette: Palette): [string, string] => [
  palette.neutral[950],
  palette.neutral[50],
];
