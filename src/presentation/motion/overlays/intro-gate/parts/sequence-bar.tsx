// src/presentation/motion/overlays/intro-gate/parts/sequence-bar.tsx
import { m } from "framer-motion";
import { TIMING } from "@kernel";
import { INTRO_DISMISS_HINT } from "../internals/copy";

/** Runs for exactly as long as the auto-enter timer, then the doors open. */
const SequenceBar = () => (
  <>
    <div className="mt-9 h-[3px] w-56 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <m.div
        className="h-full brand-gradient"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: TIMING.introSequenceMs / 1000, ease: "linear" }}
      />
    </div>

    <m.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.45 }}
      className="mt-4 text-xs text-slate-400 dark:text-slate-500"
    >
      {INTRO_DISMISS_HINT}
    </m.p>
  </>
);

export default SequenceBar;
