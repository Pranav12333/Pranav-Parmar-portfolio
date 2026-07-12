import type Lenis from "lenis";

// Module-level reference to the active Lenis instance (set by <SmoothScroll />).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smoothly scroll to a section by id, accounting for the fixed navbar. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -70, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/** Scroll back to the very top. */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
