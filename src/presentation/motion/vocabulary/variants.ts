// src/presentation/motion/vocabulary/variants.ts
//
// Reusable Framer Motion variant sets built on the shared easing curves.

import type { Variants } from "framer-motion";
import { DURATION, EASE } from "./easing";

/** Travel distances, in px, for the entrance animations. */
export const OFFSET = {
  reveal: 24,
  item: 20,
  default: 28,
  textSwap: 16,
} as const;

export const revealVariant: Variants = {
  hidden: { opacity: 0, y: OFFSET.reveal },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.variantItem, ease: EASE },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: OFFSET.item },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.revealItem, ease: EASE },
  },
};

/** Default cascade timings for a stagger group. */
export const CASCADE = { stagger: 0.08, delayChildren: 0.05 } as const;

export const staggerContainer = (
  stagger: number = CASCADE.stagger,
  delayChildren: number = CASCADE.delayChildren
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
