// src/platform/audio/engine/one-shot.ts
//
// One-shot playback: throttling, priority ducking and per-trigger pitch jitter.
// The public entry point is `playCue`; `fire` is the unguarded inner path, also
// published on the bridge so the decoder can flush a queued gesture cue.

import { CUES, MIX } from "./catalog";
import type { CueName } from "./catalog";
import { acquire } from "./context";
import { primeCues } from "./decoder";
import { isMuted } from "./preferences";
import { bridges, engine, monotonic } from "./state";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function fire(name: CueName, intensity = 1): void {
  const ctx = engine.ctx;
  const master = engine.master;
  const spec = CUES[name];
  const buffer = engine.buffers.get(name);
  if (!ctx || !master || !buffer || ctx.state !== "running") return;

  // Throttle repeats of the same cue.
  const stamp = monotonic();
  const last = engine.lastPlayed.get(name);
  if (last !== undefined && stamp - last < spec.throttle) return;

  // Priority duck: while a more important one-shot is ringing, drop this one.
  const at = ctx.currentTime;
  if (at < engine.duckUntil && spec.priority < engine.duckPriority) return;

  engine.lastPlayed.set(name, stamp);
  if (spec.priority >= engine.duckPriority || at >= engine.duckUntil) {
    engine.duckPriority = spec.priority;
    engine.duckUntil = at + buffer.duration;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  // Slight pitch variation each trigger so repeats feel organic, nudged up a
  // touch by intensity (used for scroll-speed reactivity).
  const jitter = 1 + (Math.random() * 2 - 1) * spec.pitch;
  source.playbackRate.value = jitter + (intensity - 1) * MIX.intensityPitchBias;
  const gain = ctx.createGain();
  gain.gain.value =
    spec.gain * clamp(intensity, MIX.intensityFloor, MIX.intensityCeiling);
  source.connect(gain).connect(master);
  source.onended = () => {
    source.disconnect();
    gain.disconnect();
  };
  source.start();
}

bridges.fireCue = fire;

/**
 * Play a one-shot cue. `gesture` must be true when the call originates from a
 * real user gesture (a click, the intro dismiss): the context is resumed and
 * the cue is played the moment it is running. Non-gesture callers (scroll,
 * hover, viewport observers) only make sound once the context is already
 * unlocked — this prevents queued cues from firing late on the first click.
 *
 * `intensity` (default 1) scales the mix level and nudges pitch — the scroll
 * handler passes scroll speed through it so a fast flick sounds airier than a
 * gentle nudge.
 */
export function playCue(name: CueName, gesture = false, intensity = 1): void {
  if (isMuted()) return;
  const ctx = acquire();
  if (!ctx) return;

  // Buffer not decoded yet. For a real gesture (e.g. dismissing the intro
  // before the welcome clip finished loading), remember it and let the decoder
  // fire it once its buffer is ready; non-gesture calls simply drop.
  if (!engine.buffers.has(name)) {
    if (gesture) {
      engine.pendingCue = name;
      engine.pendingIntensity = intensity;
      ctx.resume().catch(() => {});
      primeCues(); // ensure decoding is under way
    }
    return;
  }

  if (ctx.state === "running") {
    fire(name, intensity);
  } else if (gesture) {
    ctx
      .resume()
      .then(() => fire(name, intensity))
      .catch(() => {});
  }
  // else: not running and not a gesture → stay silent (no queueing).
}
