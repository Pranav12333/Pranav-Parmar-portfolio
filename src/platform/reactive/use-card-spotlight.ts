// src/platform/reactive/use-card-spotlight.ts
import { useEffect } from "react";

/** Selector of the surfaces that carry a cursor-tracked glow. */
const CARD_SELECTOR = ".card";

/** CSS custom properties the `.card::before` spotlight reads. */
const SPOTLIGHT_VARS = { x: "--mx", y: "--my" } as const;

/**
 * One delegated pointermove listener that stores the pointer's card-local
 * position as `--mx` / `--my` CSS vars on whichever `.card` is under the
 * cursor. The `.card::before` spotlight in index.css reads those vars, so
 * every card gets a cursor-tracked glow without per-card listeners.
 */
export function useCardSpotlight() {
  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(
        CARD_SELECTOR
      ) as HTMLElement | null;
      if (!card) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty(SPOTLIGHT_VARS.x, `${e.clientX - r.left}px`);
        card.style.setProperty(SPOTLIGHT_VARS.y, `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
