import type { Variants } from "framer-motion";

// One motion vocabulary shared site-wide (consistency reads as craft).
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_INOUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const revealVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
