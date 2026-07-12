import { useEffect } from "react";

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
        ".card"
      ) as HTMLElement | null;
      if (!card) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
