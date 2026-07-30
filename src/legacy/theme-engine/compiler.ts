// src/legacy/theme-engine/compiler.ts
//
// Compiles a v1 palette document into the CSS custom properties the v1 stylesheet
// consumed. The current build resolves colours through Tailwind's own token
// pipeline instead, so this compiler is only reached by the migration steps.

import type { Palette, Ramp } from "./palette";
import { RAMP_KEYS } from "./palette";

const PREFIX = "--pp";

const declare = (scope: string, key: keyof Ramp, value: string) =>
  `${PREFIX}-${scope}-${String(key)}: ${value};`;

export function compilePalette(palette: Palette): string {
  const accent = RAMP_KEYS.map((key) => declare("accent", key, palette.accent[key]));
  const neutral = RAMP_KEYS.map((key) => declare("neutral", key, palette.neutral[key]));
  const gradient = palette.gradient
    .map((key, index) => `${PREFIX}-gradient-${index}: ${palette.accent[key]};`)
    .join("\n  ");

  return [":root {", `  ${accent.join("\n  ")}`, `  ${neutral.join("\n  ")}`, `  ${gradient}`, "}"].join(
    "\n"
  );
}

/** Emitted when a document fails validation, so the page never loses colour. */
export const FALLBACK_SHEET = ":root { color-scheme: dark light; }";
