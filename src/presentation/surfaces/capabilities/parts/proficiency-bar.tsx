// src/presentation/surfaces/capabilities/parts/proficiency-bar.tsx
import { m } from "framer-motion";
import { VIEWPORT } from "@kernel";
import { DURATION, EASE } from "@presentation/motion/vocabulary";

type ProficiencyBarProps = { name: string; level: number };

/** One labelled bar that fills to `level`% the first time it scrolls into view. */
const ProficiencyBar = ({ name, level }: ProficiencyBarProps) => (
  <div>
    <div className="mb-1.5 flex justify-between text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-200">{name}</span>
      <span className="font-semibold text-blue-600 dark:text-blue-400">{level}%</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <m.div
        className="relative h-full overflow-hidden rounded-full brand-gradient"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={VIEWPORT.meter}
        transition={{ duration: DURATION.meterFill, ease: EASE }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      </m.div>
    </div>
  </div>
);

export default ProficiencyBar;
