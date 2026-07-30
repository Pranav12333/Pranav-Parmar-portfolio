// src/presentation/surfaces/hero/parts/pitch.tsx
import { m } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { tagline } from "@domain/content";
import { identity } from "@identity";
import { staggerItem } from "@presentation/motion/vocabulary";

/** The one-paragraph pitch plus the location line beneath it. */
const Pitch = () => (
  <>
    <m.p
      variants={staggerItem}
      className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
    >
      {tagline}
    </m.p>

    <m.div
      variants={staggerItem}
      className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400"
    >
      <FiMapPin className="text-blue-500" /> {identity.location}
    </m.div>
  </>
);

export default Pitch;
