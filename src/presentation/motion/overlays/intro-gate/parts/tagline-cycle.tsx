// src/presentation/motion/overlays/intro-gate/parts/tagline-cycle.tsx
import { AnimatePresence, m } from "framer-motion";
import { EASE } from "../../../vocabulary";
import { INTRO_LINES } from "../internals/copy";

/** The swapping "where X meets Y" line. `line` indexes INTRO_LINES. */
const TaglineCycle = ({ line }: { line: number }) => (
  <m.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.4 }}
    className="relative mt-5 h-8 sm:h-9"
  >
    <AnimatePresence mode="wait">
      <m.p
        key={line}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="text-base font-medium text-slate-600 sm:text-xl dark:text-slate-300"
      >
        {INTRO_LINES[line]}
      </m.p>
    </AnimatePresence>
  </m.div>
);

export default TaglineCycle;
