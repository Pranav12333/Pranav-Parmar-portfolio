// src/domain/content/navigation-map.ts
//
// The navigation model, derived from the section registry rather than declared.
// The navbar, the footer link row and the active-section observer all consume
// this, so a section can never appear in one and be missing from another.

import type { NavigationEntry } from "@domain/contracts/content";
import {
  SECTION_IDS,
  SECTION_LABELS,
  SECTION_ORDER,
} from "@config/runtime/sections";

export const navLinks: readonly NavigationEntry[] = SECTION_ORDER.map((key) => ({
  to: SECTION_IDS[key],
  label: SECTION_LABELS[key],
}));

/** Anchor ids in document order — what the observer watches. */
export const observedSectionIds: readonly string[] = navLinks.map((l) => l.to);
