// src/platform/audio/engine/state.ts
//
// The engine's singleton state, in one leaf module so the behaviour modules
// (context / decoder / one-shot / sustain / preferences) can share it without
// importing each other. `bridges` holds late-bound function references: the
// modules register themselves on load, which lets mutually-dependent steps
// (a mute must stop the sustain; a queued gesture cue must fire once its buffer
// decodes) talk to each other with no import cycle.

import type { CueName } from "./catalog";

export type EngineState = {
  ctx: AudioContext | null;
  master: GainNode | null;
  /** Decoded buffers, keyed by cue. */
  buffers: Map<CueName, AudioBuffer>;
  /** performance.now() of the last trigger, keyed by cue (throttling). */
  lastPlayed: Map<CueName, number>;
  /** One-shot ducking window, in AudioContext time (seconds). */
  duckUntil: number;
  duckPriority: number;
  /**
   * A gesture-initiated cue whose buffer hadn't finished decoding when it was
   * requested (e.g. the welcome sound the instant the intro is dismissed). It is
   * fired the moment the decoder reaches it, so the welcome never gets swallowed
   * by the buffer-load race.
   */
  pendingCue: CueName | null;
  pendingIntensity: number;
  /**
   * Sustained loop. `sustainWanted` guards the async-resume race: if the drag
   * ends before a suspended context finishes resuming, the deferred start bails
   * instead of leaving an orphaned loop ringing forever. The chain is
   * source → level → envelope → master: `envelope` is the fade in/out (0→1),
   * `level` the mix level the glide moves with pointer speed, so the two never
   * fight over the same AudioParam.
   */
  sustainSource: AudioBufferSourceNode | null;
  sustainEnvelope: GainNode | null;
  sustainLevel: GainNode | null;
  sustainWanted: boolean;
  muted: boolean;
  decodeStarted: boolean;
  muteListeners: Set<(muted: boolean) => void>;
};

export const engine: EngineState = {
  ctx: null,
  master: null,
  buffers: new Map(),
  lastPlayed: new Map(),
  duckUntil: 0,
  duckPriority: -1,
  pendingCue: null,
  pendingIntensity: 1,
  sustainSource: null,
  sustainEnvelope: null,
  sustainLevel: null,
  sustainWanted: false,
  muted: false,
  decodeStarted: false,
  muteListeners: new Set(),
};

/** Late-bound cross-module entry points (see the note above). */
export const bridges: {
  ensureDecoded: (() => void) | null;
  fireCue: ((name: CueName, intensity: number) => void) | null;
  releaseSustain: (() => void) | null;
} = {
  ensureDecoded: null,
  fireCue: null,
  releaseSustain: null,
};

/** Monotonic clock, always available in the browser. */
export const monotonic = (): number =>
  typeof performance !== "undefined" ? performance.now() : 0;
