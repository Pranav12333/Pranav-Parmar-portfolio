// src/config/runtime/sections.ts
//
// The section registry. Anchor ids are referenced by the document structure, the
// navigation, the footer links, the active-section observer and the audio
// section-enter binding — so they live here once, keyed by *role* rather than by
// the raw slug. Changing a slug means changing it here and nowhere else.

export const SECTION_IDS = {
  hero: "home",
  profile: "about",
  capabilities: "skills",
  chronology: "experience",
  showcase: "projects",
  outreach: "contact",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;
export type SectionId = (typeof SECTION_IDS)[SectionKey];

/** Document order. The navigation and the main flow both read this. */
export const SECTION_ORDER: readonly SectionKey[] = [
  "hero",
  "profile",
  "capabilities",
  "chronology",
  "showcase",
  "outreach",
];

/** Navigation labels, kept apart from the slugs so copy edits stay local. */
export const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Home",
  profile: "About",
  capabilities: "Skills",
  chronology: "Experience",
  showcase: "Projects",
  outreach: "Contact",
};

/** `aria-labelledby` target for each section heading. */
export const headingId = (key: SectionKey): string => `${SECTION_IDS[key]}-heading`;
