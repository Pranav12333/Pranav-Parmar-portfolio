// src/presentation/surfaces/hero/parts/social-row.tsx
import { m } from "framer-motion";
import ChannelRail from "@presentation/primitives/channel-rail";
import { staggerItem } from "@presentation/motion/vocabulary";

/** Chip styling for the hero rail — translucent, lifts and fills on hover. */
const CHIP =
  "grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/70 text-lg text-slate-600 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:border-transparent hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300";

const SocialRow = () => (
  <m.div
    variants={staggerItem}
    className="mt-8 flex flex-wrap items-center justify-center gap-3"
  >
    <ChannelRail anchorClassName={CHIP} />
  </m.div>
);

export default SocialRow;
