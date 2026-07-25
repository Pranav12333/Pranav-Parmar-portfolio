import { useEffect } from "react";
import {
  initSound,
  playSound,
  startDrag,
  stopDrag,
  updateDrag,
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
    // Audio can't play until a user gesture unlocks the AudioContext, so there
    // is no reason to fetch or decode the ~300 kB of sound buffers before then.
    // Decode lazily on the first real gesture (the same signal that unlocks the
    // context) — this keeps every byte and every decodeAudioData call off the
    // initial load path, so audio never competes with first paint / LCP (and
    // never loads at all with no interaction, e.g. a Lighthouse audit). The
    // engine already handles a sound requested before its buffer is ready
    // (pendingGestureSound), so the very first click is never swallowed.
    const gestureOpts: AddEventListenerOptions = {
      once: true,
      passive: true,
      capture: true,
    };
    const gestureEvents = ["pointerdown", "keydown", "touchstart"] as const;
    const initOnGesture = () => initSound();
    gestureEvents.forEach((e) =>
      window.addEventListener(e, initOnGesture, gestureOpts)
    );

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
    // Pointer-speed tracking, used only to breathe the drag glide (see below).
    let lastMoveX = 0;
    let lastMoveY = 0;
    let lastMoveT = 0;

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
      if (!held) return;
      if (!dragging) {
        if (Math.hypot(e.clientX - startX, e.clientY - startY) > 8) {
          dragging = true;
          lastMoveX = e.clientX;
          lastMoveY = e.clientY;
          lastMoveT = now();
          startDrag();
        }
        return;
      }
      // Already gliding: nudge the ONE looping tone's level/pitch from pointer
      // speed — a smooth ramp inside the engine, never a re-triggered clip.
      const t = now();
      const dt = Math.max(1, t - lastMoveT);
      const dist = Math.hypot(e.clientX - lastMoveX, e.clientY - lastMoveY);
      lastMoveX = e.clientX;
      lastMoveY = e.clientY;
      lastMoveT = t;
      updateDrag(Math.min(1.5, 0.7 + (dist / dt) * 0.5)); // px/ms → intensity
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
      gestureEvents.forEach((e) =>
        window.removeEventListener(e, initOnGesture, gestureOpts)
      );
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
