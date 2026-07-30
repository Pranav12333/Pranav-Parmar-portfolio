// src/presentation/surfaces/chronology/parts/timeline-track.tsx
import { m } from "framer-motion";
import type { MotionValue } from "framer-motion";

/** The static rail plus the gradient fill that grows with scroll progress. */
const TimelineTrack = ({ scaleY }: { scaleY: MotionValue<number> }) => (
  <>
    <div className="absolute bottom-2 left-4 top-2 w-px bg-slate-200 sm:left-5 dark:bg-slate-800" />
    <m.div
      style={{ scaleY }}
      className="absolute bottom-2 left-4 top-2 w-px origin-top brand-gradient sm:left-5"
    />
  </>
);

export default TimelineTrack;
