// src/platform/scroll/navigator.ts
//
// Scroll navigation. The active Lenis instance is registered here by the bridge
// component; every programmatic scroll on the site goes through these two
// functions so the navbar offset and the easing duration are applied uniformly —
// and so the whole app degrades to native smooth scrolling when Lenis is absent
// (reduced-motion visitors).

import type Lenis from "lenis";
import { TIMING } from "@kernel";

/** Module-level reference to the active Lenis instance (set by the bridge). */
let engine: Lenis | null = null;

export function registerScrollEngine(instance: Lenis | null) {
  engine = instance;
}

/** Smoothly scroll to a section by id, accounting for the fixed navbar. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (engine) {
    engine.scrollTo(el, {
      offset: TIMING.scrollAnchorOffset,
      duration: TIMING.scrollDurationSeconds,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/** Scroll back to the very top. */
export function scrollToTop() {
  if (engine) {
    engine.scrollTo(0, { duration: TIMING.scrollDurationSeconds });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
