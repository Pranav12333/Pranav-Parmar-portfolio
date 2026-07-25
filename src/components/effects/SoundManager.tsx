import { useEffect } from "react";
import {
  initSound,
  playSound,
  startDrag,
  stopDrag,
  unlockOnGesture,
} from "../../lib/sound";
import SoundToggle from "./SoundToggle";

// Local monotonic clock, matching the engine's, for the drag-end guard.
const now = () => (typeof performance !== "undefined" ? performance.now() : 0);

/**
 * Owns the site-wide UI sound layer. It renders only the mute toggle; all of
 * its work is passive, delegated listeners on `window` that mirror the existing
 * interaction logic (the snow click burst, the drag ripple wake, the custom
 * cursor's hover detection) WITHOUT touching those components — so no animation
 * or effect changes, sound only.
 *
 * Everything is guarded so it can never interfere: listeners are passive, the
 * engine no-ops while muted or before the AudioContext is unlocked, and reads
 * are all on event targets that already exist.
 */
const SoundManager = () => {
  useEffect(() => {
    // Decode buffers when the browser is idle so audio never competes with
    // first paint / LCP.
    const win = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId = 0;
    let timerId = 0;
    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(() => initSound());
    } else {
      timerId = window.setTimeout(() => initSound(), 800);
    }

    const releaseUnlock = unlockOnGesture();

    // Shared interaction state.
    const finePointer = window.matchMedia?.("(pointer: fine)");
    let lastHover: Element | null = null;
    let lastCard: Element | null = null;
    let lastY = window.scrollY;
    let lastScrollT = now();
    let held = false;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let lastDragEnd = -Infinity;

    /* ---- click → pop, project-open bloom, or a confirmation chime ---------- */
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      if (target.closest("[data-intro]")) return; // welcome overlay dismiss
      if (target.closest("[data-no-sound]")) return; // handles its own sound
      // Suppress the pop when a click closes out a drag — the glide fade-out is
      // the feedback there.
      if (now() - lastDragEnd < 260) return;
      // Opening a project (its Live Demo / Code link) → the elegant bloom.
      if (target.closest('#projects a[target="_blank"]')) {
        playSound("bloom", true);
        return;
      }
      const outbound = target.closest(
        'a[target="_blank"], a[href^="mailto:"], a[href^="tel:"]'
      );
      playSound(outbound ? "chime" : "pop", true);
    };

    /* ---- hover → crystal tick on links, a magnetic pulse on cards ---------- */
    const onOver = (e: PointerEvent) => {
      if (finePointer && !finePointer.matches) return; // desktop pointers only
      const target = e.target as Element | null;
      const interactive =
        target?.closest?.("a, button, [data-cursor='hover']") ?? null;
      const card = target?.closest?.(".card-hover") ?? null;
      if (interactive && interactive !== lastHover) {
        lastHover = interactive;
        playSound("tick");
      } else if (!interactive) {
        lastHover = null;
      }
      // Pulse once when entering a fresh card (but not when landing straight on
      // one of its links — the tick already covers that).
      if (card && card !== lastCard) {
        lastCard = card;
        if (!interactive) playSound("cardhover");
      } else if (!card) {
        lastCard = null;
      }
    };

    /* ---- scroll → a throttled whoosh whose air reacts to scroll speed ------ */
    const onScroll = () => {
      const y = window.scrollY;
      const t = now();
      const dy = Math.abs(y - lastY);
      const dt = Math.max(1, t - lastScrollT);
      lastY = y;
      lastScrollT = t;
      if (dy < 4) return; // ignore tiny/settling scrolls
      const speed = dy / dt; // px per ms
      const intensity = Math.min(1.25, 0.5 + speed * 0.5);
      playSound("whoosh", false, intensity); // engine throttles to ~once/0.9s
    };

    /* ---- press-and-drag → the drag glide (mirrors SnowField's wake) --------- */
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // left mouse / touch / pen-tip only
      const target = e.target as Element | null;
      if (target?.closest?.("[data-intro]")) return;
      held = true;
      dragging = false;
      startX = e.clientX;
      startY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!held || dragging) return;
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 8) {
        dragging = true;
        startDrag();
      }
    };
    const endDrag = () => {
      held = false;
      if (dragging) {
        dragging = false;
        lastDragEnd = now();
        stopDrag();
      }
    };

    window.addEventListener("click", onClick, true);
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", endDrag, { passive: true });
    window.addEventListener("pointercancel", endDrag, { passive: true });
    window.addEventListener("blur", endDrag);

    /* ---- section enters viewport → a light ambient transition --------------- */
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            if (!visible.has(id)) {
              visible.add(id);
              // Non-gesture: silent until the context is unlocked, so the home
              // section that is already on screen at load stays quiet.
              playSound("transition");
            }
          } else {
            visible.delete(id);
          }
        }
      },
      { threshold: 0.25 }
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));

    return () => {
      if (idleId && win.cancelIdleCallback) win.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
      releaseUnlock();
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("blur", endDrag);
      observer.disconnect();
      stopDrag();
    };
  }, []);

  return <SoundToggle />;
};

export default SoundManager;
