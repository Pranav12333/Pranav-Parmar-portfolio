// src/presentation/motion/vocabulary/easing.ts
//
// The site's two easing curves. One motion vocabulary shared site-wide —
// consistency reads as craft, and keeping the curves here means a retune is a
// one-line change rather than a sweep through every component.

export type Cubic = [number, number, number, number];

/** Decelerating "arrive" curve — reveals, counters, chips. */
export const EASE: Cubic = [0.22, 1, 0.36, 1];

/** Symmetric curve for movements that leave and return (the intro doors). */
export const EASE_INOUT: Cubic = [0.76, 0, 0.24, 1];

/** Durations, in seconds, paired with the curves above. */
export const DURATION = {
  reveal: 0.65,
  revealItem: 0.5,
  variantItem: 0.6,
  meterFill: 1.1,
  textSwap: 0.3,
  counter: 1.6,
} as const;

/** Spring presets used by the pointer-reactive components. */
export const SPRING = {
  cursorRing: { stiffness: 250, damping: 28, mass: 0.4 },
  cursorGlow: { stiffness: 90, damping: 20, mass: 0.6 },
  magnetic: { stiffness: 200, damping: 15, mass: 0.3 },
  tilt: { stiffness: 150, damping: 15 },
  progress: { stiffness: 120, damping: 30, mass: 0.3 },
  timeline: { stiffness: 80, damping: 20 },
  cursorHover: { type: "spring", stiffness: 300, damping: 20 },
} as const;
