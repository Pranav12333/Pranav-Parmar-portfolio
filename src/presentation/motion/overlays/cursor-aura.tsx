// src/presentation/motion/overlays/cursor-aura.tsx
import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer, usePrefersReducedMotion } from "@platform/reactive";
import { SPRING } from "../vocabulary";

/** Parked off-screen until the first mousemove so nothing flashes at 0,0. */
const PARKED = -200;

/** Ring response when the pointer is over something interactive. */
const HOVER_STATE = { scale: 2.2, opacity: 0.5 } as const;
const IDLE_STATE = { scale: 1, opacity: 0.9 } as const;

/** Same hook the audio layer uses to detect "this reads as clickable". */
const INTERACTIVE = "a, button, [data-cursor='hover']";

/**
 * A soft, lagging glow + ring that trails the pointer.
 * Only renders on devices with a fine pointer (mouse). The native
 * cursor is intentionally kept for usability.
 */
const CursorAura = () => {
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(PARKED);
  const y = useMotionValue(PARKED);
  const ringX = useSpring(x, SPRING.cursorRing);
  const ringY = useSpring(y, SPRING.cursorRing);
  const glowX = useSpring(x, SPRING.cursorGlow);
  const glowY = useSpring(y, SPRING.cursorGlow);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Big soft glow */}
      <m.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed left-0 top-0 z-[65] hidden md:block"
      >
        <div className="h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </m.div>

      {/* Trailing ring */}
      <m.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      >
        <m.div
          animate={hovering ? HOVER_STATE : IDLE_STATE}
          transition={SPRING.cursorHover}
          className="h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/70"
        />
      </m.div>
    </>
  );
};

export default CursorAura;
