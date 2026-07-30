// src/presentation/motion/atoms/rotating-text.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { TIMING } from "@kernel";
import { usePrefersReducedMotion } from "@platform/reactive";
import { DURATION, OFFSET } from "../vocabulary";

type RotatingTextProps = {
  items: readonly string[];
  interval?: number;
  className?: string;
};

/** Cycles through words with a smooth vertical swap (accessible, no jitter). */
const RotatingText = ({
  items,
  interval = TIMING.roleRotationMs,
  className,
}: RotatingTextProps) => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduced, items.length, interval]);

  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <m.span
          key={items[index]}
          initial={{ y: OFFSET.textSwap, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -OFFSET.textSwap, opacity: 0 }}
          transition={{ duration: DURATION.textSwap }}
          className="brand-text"
        >
          {items[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
