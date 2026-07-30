// src/platform/audio/bindings/priming.ts
//
// Audio can't play until a user gesture unlocks the AudioContext, so there is no
// reason to fetch or decode the ~300 kB of cue buffers before then. Decode lazily
// on the first real gesture (the same signal that unlocks the context) — this
// keeps every byte and every decodeAudioData call off the initial load path, so
// audio never competes with first paint / LCP (and never loads at all with no
// interaction, e.g. a Lighthouse audit). The engine already handles a cue
// requested before its buffer is ready, so the very first click is never
// swallowed.

import { primeCues } from "../engine";
import { UNLOCK_EVENTS } from "../engine/unlock";
import type { Binding } from "./contract";

const ONCE: AddEventListenerOptions = { once: true, passive: true, capture: true };

export const bindDecodePriming: Binding = () => {
  const prime = () => primeCues();
  UNLOCK_EVENTS.forEach((name) => window.addEventListener(name, prime, ONCE));
  return () => {
    UNLOCK_EVENTS.forEach((name) => window.removeEventListener(name, prime, ONCE));
  };
};
