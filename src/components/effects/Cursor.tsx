import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

/**
 * A soft, lagging amber glow + ring that trails the pointer.
 * Only renders on devices with a fine pointer (mouse). The native
 * cursor is intentionally kept for usability.
 */
const Cursor = () => {
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.4 });
  const glowX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, [data-cursor='hover']"));
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
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed left-0 top-0 z-[65] hidden md:block"
      >
        <div className="h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      >
        <motion.div
          animate={{ scale: hovering ? 2.2 : 1, opacity: hovering ? 0.5 : 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/70"
        />
      </motion.div>
    </>
  );
};

export default Cursor;
