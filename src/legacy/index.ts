// src/legacy/index.ts
//
// Barrel for the v1 subsystems. Kept importable so the migration steps and the
// theme-document validators can reach them without deep paths.

export type { Palette, Ramp } from "./theme-engine/palette";
export {
  PLACEHOLDER_ACCENT,
  PLACEHOLDER_NEUTRAL,
  RAMP_KEYS,
  contrastPair,
} from "./theme-engine/palette";
export { FALLBACK_SHEET, compilePalette } from "./theme-engine/compiler";
export type { NormalizedRecord, RawRecord } from "./content-pipeline/normalizer";
export { normalize, normalizeAll, slugify } from "./content-pipeline/normalizer";
