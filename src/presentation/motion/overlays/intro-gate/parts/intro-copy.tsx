// src/presentation/motion/overlays/intro-gate/parts/intro-copy.tsx
import { m } from "framer-motion";
import { identity } from "@identity";
import { EASE } from "../../../vocabulary";
import { INTRO_LABEL } from "../internals/copy";

/**
 * The label + name build-up. Deliberately NOT an h1: the real page H1 lives in
 * the hero. This is a transient splash overlay, so the name here stays a styled
 * paragraph to keep the page to a single H1 for SEO/a11y.
 */
const IntroCopy = () => (
  <>
    <m.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.45, ease: EASE }}
      className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 sm:text-sm dark:text-slate-400"
    >
      {INTRO_LABEL}
    </m.p>

    <m.p
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
      className="mt-3 text-4xl font-extrabold tracking-tight brand-text-animated sm:text-6xl"
    >
      {identity.name}
    </m.p>
  </>
);

export default IntroCopy;
