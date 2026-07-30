// src/platform/audio/bindings/scroll-air.ts
//
// Scroll → a throttled whoosh whose air reacts to scroll speed. The engine
// throttles the cue to roughly once per 0.9 s, so this only has to compute the
// intensity and ignore settling movements.

import { playCue } from "../engine";
import type { Binding } from "./contract";
import { GESTURE, INTENSITY, PASSIVE, now } from "./contract";

export const bindScrollAir: Binding = () => {
  let lastY = window.scrollY;
  let lastAt = now();

  const onScroll = () => {
    const y = window.scrollY;
    const at = now();
    const dy = Math.abs(y - lastY);
    const dt = Math.max(1, at - lastAt);
    lastY = y;
    lastAt = at;
    if (dy < GESTURE.scrollFloorPx) return; // ignore tiny/settling scrolls
    const speed = dy / dt; // px per ms
    const intensity = Math.min(
      INTENSITY.scrollCeiling,
      INTENSITY.scrollBase + speed * INTENSITY.scrollScale
    );
    playCue("whoosh", false, intensity);
  };

  window.addEventListener("scroll", onScroll, PASSIVE);
  return () => window.removeEventListener("scroll", onScroll);
};
