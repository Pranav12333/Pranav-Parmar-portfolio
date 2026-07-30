// src/platform/audio/engine/unlock.ts
//
// Autoplay-policy unlock. A suspended AudioContext can only be resumed from
// inside a real gesture's call stack, so these capture-phase listeners resume it
// on the first pointer/key/touch and then get out of the way.

import { resume } from "./context";

/** Gestures the browser accepts as an autoplay unlock. */
export const UNLOCK_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

export const UNLOCK_LISTENER_OPTIONS: AddEventListenerOptions = {
  passive: true,
  capture: true,
};

/** Wire up the gesture listeners that unlock audio. Returns a teardown fn. */
export function armUnlockGestures(): () => void {
  if (typeof window === "undefined") return () => {};
  const unlock = () => resume();
  UNLOCK_EVENTS.forEach((name) =>
    window.addEventListener(name, unlock, UNLOCK_LISTENER_OPTIONS)
  );
  return () => {
    UNLOCK_EVENTS.forEach((name) =>
      window.removeEventListener(name, unlock, UNLOCK_LISTENER_OPTIONS)
    );
  };
}
