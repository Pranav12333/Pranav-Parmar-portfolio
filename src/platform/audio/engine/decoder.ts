// src/platform/audio/engine/decoder.ts
//
// Buffer acquisition. Every cue is fetched and decoded once, lazily — the caller
// (the interaction bindings) defers this until the first real gesture, which is
// also the earliest moment audio could play, so none of the ~300 kB of WAV data
// or any decodeAudioData call lands in the first-paint window.

import { CUES } from "./catalog";
import type { CueName } from "./catalog";
import { acquire } from "./context";
import { isMuted } from "./preferences";
import { bridges, engine } from "./state";

/**
 * Create the AudioContext (suspended) and decode every buffer once. Safe to call
 * repeatedly — subsequent calls are ignored.
 */
export function primeCues(): void {
  if (engine.decodeStarted) return;
  engine.decodeStarted = true;
  const ctx = acquire();
  if (!ctx) return;

  (Object.keys(CUES) as CueName[]).forEach(async (name) => {
    try {
      const res = await fetch(CUES[name].url);
      const bytes = await res.arrayBuffer();
      const buffer = await ctx.decodeAudioData(bytes);
      engine.buffers.set(name, buffer);
      // A gesture asked for this cue before it was ready — play it now.
      if (engine.pendingCue === name) {
        const intensity = engine.pendingIntensity;
        engine.pendingCue = null;
        if (!isMuted()) {
          ctx
            .resume()
            .then(() => bridges.fireCue?.(name, intensity))
            .catch(() => {});
        }
      }
    } catch {
      /* a missing/undecodable cue simply never plays */
    }
  });
}

bridges.ensureDecoded = primeCues;
