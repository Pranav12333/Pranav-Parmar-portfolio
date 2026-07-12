import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

type RotatingTextProps = {
  items: string[];
  interval?: number;
  className?: string;
};

/** Cycles through words with a smooth vertical swap (accessible, no jitter). */
const RotatingText = ({ items, interval = 2800, className }: RotatingTextProps) => {
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
        <motion.span
          key={items[index]}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="brand-text"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
