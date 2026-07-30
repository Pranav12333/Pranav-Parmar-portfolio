// src/platform/audio/bindings/contract.ts
//
// Shared vocabulary for the interaction bindings. Every binding is a plain
// function that attaches passive listeners and returns its own teardown, so the
// composer in ./index.tsx can mount and unmount them uniformly.

import { SECTION_IDS } from "@config/runtime/sections";

/** A binding attaches listeners and hands back the matching detach. */
export type Binding = () => () => void;

/**
 * Element hooks the bindings read. All of them are attributes/classes the UI
 * already carries — the audio layer never mutates the DOM, it only observes it,
 * which is why it can be added or removed without touching a component.
 */
export const HOOKS = {
  /** The welcome overlay: clicks there only dismiss it, they make no sound. */
  intro: "[data-intro]",
  /** Opt-out for controls that play their own cue (the mute button). */
  silent: "[data-no-sound]",
  /** Anything that reads as clickable. */
  interactive: "a, button, [data-cursor='hover']",
  /** Cards that lift on hover. */
  card: ".card-hover",
  /** Outbound links — a chime rather than a pop. */
  outbound: 'a[target="_blank"], a[href^="mailto:"], a[href^="tel:"]',
  /** Opening a project gets the more elegant bloom. */
  projectLink: `#${SECTION_IDS.showcase} a[target="_blank"]`,
  /** Sections observed for the ambient section-enter cue. */
  observedSections: "main section[id]",
} as const;

/** Thresholds shared between the click and drag bindings. */
export const GESTURE = {
  /** Pointer travel before a press counts as a drag. */
  dragThresholdPx: 8,
  /** Window after a drag ends in which a click makes no pop. */
  clickSuppressionMs: 260,
  /** Scroll delta below which a scroll event is treated as settling. */
  scrollFloorPx: 4,
} as const;

/** Intensity mapping for the speed-reactive cues. */
export const INTENSITY = {
  scrollBase: 0.5,
  scrollScale: 0.5,
  scrollCeiling: 1.25,
  dragBase: 0.7,
  dragScale: 0.5,
  dragCeiling: 1.5,
} as const;

/**
 * Cross-binding state. Only the drag → click suppression needs it: the glide's
 * fade-out is the feedback when a drag ends, so the click that closes it out
 * must stay quiet.
 */
export const gestureLedger = { lastDragEnd: -Infinity };

/** Local monotonic clock, matching the engine's. */
export const now = (): number =>
  typeof performance !== "undefined" ? performance.now() : 0;

export const PASSIVE: AddEventListenerOptions = { passive: true };
