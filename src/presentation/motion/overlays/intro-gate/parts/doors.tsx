// src/presentation/motion/overlays/intro-gate/parts/doors.tsx
import { m } from "framer-motion";
import { TIMING } from "@kernel";
import { EASE_INOUT } from "../../../vocabulary";

/** Shared swing transition for both leaves. */
const DOOR_EXIT = {
  duration: TIMING.introDoorSeconds,
  ease: EASE_INOUT,
  delay: TIMING.introDoorDelaySeconds,
};

/**
 * The pair of palace doors that swing open onto the site. They are hinged on
 * their outer edges and rotate past 90° so no sliver of the panel is left
 * visible mid-swing.
 */
const Doors = () => (
  <>
    {/* Left door */}
    <m.div
      className="absolute inset-y-0 left-0 w-1/2 border-r border-slate-200/60 bg-slate-50 shadow-2xl dark:border-slate-800/60 dark:bg-slate-950"
      style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
      exit={{ rotateY: -TIMING.introDoorAngle, transition: DOOR_EXIT }}
    />
    {/* Right door */}
    <m.div
      className="absolute inset-y-0 right-0 w-1/2 bg-slate-50 shadow-2xl dark:bg-slate-950"
      style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
      exit={{ rotateY: TIMING.introDoorAngle, transition: DOOR_EXIT }}
    />
  </>
);

export default Doors;
