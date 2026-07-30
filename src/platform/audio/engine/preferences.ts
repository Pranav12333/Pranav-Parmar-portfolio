// src/platform/audio/engine/preferences.ts
//
// The mute preference: persisted, observable, and defaulting to silence for
// reduced-motion visitors (the same restraint the visuals honour). Muting also
// releases any ringing sustain loop — reached through the late-bound bridge so
// this module never imports the sustain module.

import { MEDIA, PERSISTENCE_KEYS, readLocal, writeLocal } from "@kernel";
import { bridges, engine } from "./state";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia(MEDIA.reducedMotion).matches
  );
}

function readInitialMuted(): boolean {
  const stored = readLocal(PERSISTENCE_KEYS.audioMuted);
  if (stored === "1") return true;
  if (stored === "0") return false;
  // No stored preference: stay silent by default for reduced-motion users,
  // audible for everyone else.
  return prefersReducedMotion();
}

// Resolved once, at module evaluation — every module that consults the mute flag
// imports this file, so the flag is always initialised before it is read.
engine.muted = readInitialMuted();

export function isMuted(): boolean {
  return engine.muted;
}

export function setMuted(value: boolean): void {
  if (value === engine.muted) return;
  engine.muted = value;
  writeLocal(PERSISTENCE_KEYS.audioMuted, value ? "1" : "0");
  if (engine.muted) bridges.releaseSustain?.(); // never leave a loop ringing
  engine.muteListeners.forEach((cb) => cb(engine.muted));
}

export function toggleMuted(): boolean {
  setMuted(!engine.muted);
  return engine.muted;
}

/** Subscribe to mute changes; returns an unsubscribe fn. */
export function subscribeMuted(cb: (muted: boolean) => void): () => void {
  engine.muteListeners.add(cb);
  return () => {
    engine.muteListeners.delete(cb);
  };
}
