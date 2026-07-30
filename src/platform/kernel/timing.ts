// src/platform/kernel/timing.ts
//
// Every duration, delay and threshold the runtime depends on. Timings that were
// once inline literals across the effect components live here so the whole
// choreography can be retuned from one table — and so no component carries a
// bare magic number.

export const TIMING = {
  /** Total length of the welcome sequence before it auto-enters. */
  introSequenceMs: 2000,
  /** Offsets at which the intro tagline hands over to the next line. */
  introLineSwapMs: [1200] as readonly number[],
  /** Door swing + content fade of the intro exit, in seconds. */
  introDoorSeconds: 0.6,
  introDoorDelaySeconds: 0.1,
  introDoorAngle: 102,

  /** requestIdleCallback budget for deferring decorative overlays. */
  idleMountTimeoutMs: 2000,
  /** Fallback delay where requestIdleCallback is unavailable. */
  idleMountFallbackMs: 300,
  /** How long after load the WebGL gate waits before self-arming. */
  webglIdleFallbackMs: 2500,

  /** Hero role-rotation interval. */
  roleRotationMs: 2800,
  /** Abort window for the contact-form request. */
  outreachTimeoutMs: 15000,

  /** Lenis programmatic scroll. */
  scrollDurationSeconds: 1.2,
  /** Anchor offset that clears the fixed navbar. */
  scrollAnchorOffset: -70,
  /** Scroll depth at which the navbar switches to its solid state. */
  navbarConcealThreshold: 24,
} as const;
