// src/presentation/surfaces/hero/parts/status-badge.tsx
import { m } from "framer-motion";
import { availability } from "@domain/content";
import { useGreeting } from "@platform/reactive";
import { staggerItem } from "@presentation/motion/vocabulary";

/** Time-aware greeting + availability, with a live pulse dot. */
const StatusBadge = () => {
  const greeting = useGreeting();

  return (
    <m.div variants={staggerItem}>
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur-sm dark:text-blue-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        {greeting} · {availability}
      </span>
    </m.div>
  );
};

export default StatusBadge;
