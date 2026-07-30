// src/platform/audio/engine/sustain.ts
//
// The sustained drag glide: ONE looping buffer whose level and playback rate are
// glided with pointer speed. It is never re-triggered — `setTargetAtTime` is a
// smooth exponential approach, so there are no steps and no clicks.

import { CUES, MIX, SUSTAIN_CUE, SUSTAIN_RANGE } from "./catalog";
import { acquire } from "./context";
import { isMuted } from "./preferences";
import { bridges, engine } from "./state";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/** Begin the sustained glide, fading in from silence. Idempotent. */
export function beginSustain(): void {
  if (isMuted() || engine.sustainSource) return;
  const ctx = acquire();
  const master = engine.master;
  const buffer = engine.buffers.get(SUSTAIN_CUE);
  if (!ctx || !master || !buffer) return;
  const bus = master; // const alias so the nested closure keeps the narrowing
  engine.sustainWanted = true;

  const start = () => {
    // Bail if the drag already ended while the context was still resuming.
    if (!engine.sustainWanted || engine.sustainSource || ctx.state !== "running") {
      return;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const at = ctx.currentTime;
    // Envelope: fade in from silence (the glide never touches this).
    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0.0001, at);
    envelope.gain.linearRampToValueAtTime(1, at + MIX.sustainFadeIn);
    // Level: the mix gain driveSustain() glides with pointer speed.
    const level = ctx.createGain();
    level.gain.setValueAtTime(CUES[SUSTAIN_CUE].gain, at);
    source.connect(level).connect(envelope).connect(bus);
    source.start();
    engine.sustainSource = source;
    engine.sustainEnvelope = envelope;
    engine.sustainLevel = level;
  };

  if (ctx.state === "running") start();
  else ctx.resume().then(start).catch(() => {});
}

/**
 * While a drag is in progress, glide the loop's level and pitch toward targets
 * derived from pointer speed. No-ops until the loop is actually running.
 */
export function driveSustain(intensity = 1): void {
  const ctx = engine.ctx;
  const source = engine.sustainSource;
  const level = engine.sustainLevel;
  if (!ctx || !source || !level) return;
  const at = ctx.currentTime;
  const target =
    CUES[SUSTAIN_CUE].gain *
    clamp(intensity, SUSTAIN_RANGE.levelFloor, SUSTAIN_RANGE.levelCeiling);
  const rate = clamp(
    SUSTAIN_RANGE.rateBase + intensity * SUSTAIN_RANGE.rateSpan,
    SUSTAIN_RANGE.rateFloor,
    SUSTAIN_RANGE.rateCeiling
  );
  level.gain.setTargetAtTime(target, at, MIX.sustainGlide);
  source.playbackRate.setTargetAtTime(rate, at, MIX.sustainGlide);
}

/** Fade the glide out and stop it. Safe to call when nothing is playing. */
export function endSustain(): void {
  engine.sustainWanted = false; // cancel any pending deferred start
  const ctx = engine.ctx;
  const source = engine.sustainSource;
  const envelope = engine.sustainEnvelope;
  engine.sustainSource = null;
  engine.sustainEnvelope = null;
  engine.sustainLevel = null;
  if (!ctx || !source || !envelope) return;
  const at = ctx.currentTime;
  try {
    envelope.gain.cancelScheduledValues(at);
    envelope.gain.setValueAtTime(envelope.gain.value, at);
    envelope.gain.linearRampToValueAtTime(0.0001, at + MIX.sustainFadeOut);
    source.stop(at + MIX.sustainFadeOut + 0.02);
  } catch {
    /* already stopped */
  }
}

bridges.releaseSustain = endSustain;
