// src/platform/scroll/bridge.tsx
import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@platform/reactive";
import { registerScrollEngine } from "./navigator";

/** Lenis tuning — momentum feel without overshooting on trackpads. */
const LENIS_OPTIONS = {
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
} as const;

/**
 * Initializes Lenis smooth scrolling for a premium momentum feel.
 * Skipped entirely when the user prefers reduced motion (falls back to
 * native scrolling, which navigator.ts handles gracefully).
 */
const ScrollBridge = () => {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ ...LENIS_OPTIONS });
    registerScrollEngine(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      registerScrollEngine(null);
    };
  }, [reduced]);

  return null;
};

export default ScrollBridge;
