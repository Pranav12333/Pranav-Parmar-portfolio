// src/platform/audio/bindings/section-ambience.ts
//
// A section entering the viewport → a light ambient transition. Fired
// non-gesture, so it stays silent until the context is unlocked — which is why
// the hero section that is already on screen at load makes no sound.

import { SECTION_ENTER_THRESHOLD } from "@kernel";
import { playCue } from "../engine";
import type { Binding } from "./contract";
import { HOOKS } from "./contract";

export const bindSectionAmbience: Binding = () => {
  const visible = new Set<string>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          if (!visible.has(id)) {
            visible.add(id);
            playCue("transition");
          }
        } else {
          visible.delete(id);
        }
      }
    },
    { threshold: SECTION_ENTER_THRESHOLD }
  );

  document.querySelectorAll(HOOKS.observedSections).forEach((el) => observer.observe(el));
  return () => observer.disconnect();
};
