// src/platform/audio/bindings/drag-glide.ts
//
// Press-and-drag → the sustained glide, mirroring the particulate field's ripple
// wake. Pointer speed only nudges the ONE looping tone's level/pitch through the
// engine's smooth ramp; the clip is never re-triggered.

import { beginSustain, driveSustain, endSustain } from "../engine";
import type { Binding } from "./contract";
import { GESTURE, HOOKS, INTENSITY, PASSIVE, gestureLedger, now } from "./contract";

export const bindDragGlide: Binding = () => {
  let held = false;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastY = 0;
  let lastAt = 0;

  const onDown = (event: PointerEvent) => {
    if (event.button !== 0) return; // left mouse / touch / pen-tip only
    const target = event.target as Element | null;
    if (target?.closest?.(HOOKS.intro)) return;
    held = true;
    dragging = false;
    startX = event.clientX;
    startY = event.clientY;
  };

  const onMove = (event: PointerEvent) => {
    if (!held) return;
    if (!dragging) {
      if (
        Math.hypot(event.clientX - startX, event.clientY - startY) >
        GESTURE.dragThresholdPx
      ) {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        lastAt = now();
        beginSustain();
      }
      return;
    }
    const at = now();
    const dt = Math.max(1, at - lastAt);
    const dist = Math.hypot(event.clientX - lastX, event.clientY - lastY);
    lastX = event.clientX;
    lastY = event.clientY;
    lastAt = at;
    driveSustain(
      Math.min(INTENSITY.dragCeiling, INTENSITY.dragBase + (dist / dt) * INTENSITY.dragScale)
    ); // px/ms → intensity
  };

  const onRelease = () => {
    held = false;
    if (dragging) {
      dragging = false;
      gestureLedger.lastDragEnd = now();
      endSustain();
    }
  };

  window.addEventListener("pointerdown", onDown, PASSIVE);
  window.addEventListener("pointermove", onMove, PASSIVE);
  window.addEventListener("pointerup", onRelease, PASSIVE);
  window.addEventListener("pointercancel", onRelease, PASSIVE);
  window.addEventListener("blur", onRelease);

  return () => {
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onRelease);
    window.removeEventListener("pointercancel", onRelease);
    window.removeEventListener("blur", onRelease);
    endSustain();
  };
};
