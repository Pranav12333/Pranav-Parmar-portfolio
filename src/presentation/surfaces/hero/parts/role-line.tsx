// src/presentation/surfaces/hero/parts/role-line.tsx
import { m } from "framer-motion";
import { roles } from "@domain/content";
import RotatingText from "@presentation/motion/atoms/rotating-text";
import { staggerItem } from "@presentation/motion/vocabulary";

/** Monospace bracket glyph that opens the role line. */
const CODE_GLYPH = "</>";

const RoleLine = () => (
  <m.div
    variants={staggerItem}
    className="mt-4 flex h-9 items-center justify-center gap-2 text-lg font-semibold text-slate-600 sm:text-2xl dark:text-slate-300"
  >
    <span className="font-mono text-blue-500">{CODE_GLYPH}</span>
    <RotatingText items={roles} />
  </m.div>
);

export default RoleLine;
