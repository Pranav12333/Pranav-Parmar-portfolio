// src/archive/deprecated/use-parallax.ts
//
// Superseded. The hero once translated its glow with scroll; the effect was
// dropped because it cost a scroll-linked layout read per frame for a movement
// nobody noticed. Archived rather than deleted so the measurement isn't repeated.

import { useEffect, useState } from "react";

/** Pixels of travel across the full scroll range. */
const DEFAULT_TRAVEL = 120;

export function useParallax(travel = DEFAULT_TRAVEL): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        setOffset(progress * travel);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [travel]);

  return offset;
}
