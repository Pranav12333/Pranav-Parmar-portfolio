// src/config/runtime/headings.ts
//
// Section eyebrow + title copy, keyed by the same section roles as the anchor
// registry. Keeping the copy out of the components means a wording pass touches
// one file instead of six — and the hero is deliberately absent, since its
// heading is the page H1 rather than a SectionHeader.

import type { SectionKey } from "./sections";

export type HeadingCopy = { eyebrow: string; title: string };

export const SECTION_HEADINGS: Record<Exclude<SectionKey, "hero">, HeadingCopy> = {
  profile: { eyebrow: "Get to know me", title: "About Me" },
  capabilities: { eyebrow: "What I work with", title: "Skills & Tech" },
  chronology: { eyebrow: "Where I've worked", title: "Experience" },
  showcase: { eyebrow: "Things I've built", title: "Featured Projects" },
  outreach: { eyebrow: "Let's connect", title: "Get in Touch" },
};

/** Sub-headings that appear inside a section's body. */
export const PANEL_HEADINGS = {
  languages: "Languages",
  education: "Education",
  coreProficiency: "Core Proficiency",
  findMeOnline: "Find me online",
} as const;
