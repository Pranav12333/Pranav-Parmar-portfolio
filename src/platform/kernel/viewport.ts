// src/platform/kernel/viewport.ts
//
// Intersection thresholds and media-query strings. Centralised so the reveal
// choreography stays uniform: a single margin change retunes every scroll-in
// animation on the site at once.

/** Framer Motion `viewport` presets. */
export const VIEWPORT = {
  /** Reveal / stagger groups — fire slightly before fully in view. */
  reveal: { once: true, margin: "-80px" },
  /** Counters and progress bars — fire a little later, closer to centre. */
  meter: { once: true, margin: "-40px" },
} as const;

/** IntersectionObserver config for the active-nav-link tracker. */
export const ACTIVE_SECTION_OBSERVER: IntersectionObserverInit = {
  rootMargin: "-45% 0px -45% 0px",
  threshold: [0, 0.25, 0.5, 1],
};

/** Visibility fraction at which a section counts as "entered" for audio. */
export const SECTION_ENTER_THRESHOLD = 0.25;

/** Media queries used by the reactive hooks. */
export const MEDIA = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(pointer: fine)",
  desktop: "(min-width: 768px)",
} as const;

/** Breakpoint (px) below which the particulate field halves its density. */
export const COMPACT_VIEWPORT_PX = 640;
