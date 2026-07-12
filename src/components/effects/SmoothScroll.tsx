import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "../../lib/scroll";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Initializes Lenis smooth scrolling for a premium momentum feel.
 * Skipped entirely when the user prefers reduced motion (falls back to
 * native scrolling, which scroll.ts handles gracefully).
 */
const SmoothScroll = () => {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return null;
};

export default SmoothScroll;
