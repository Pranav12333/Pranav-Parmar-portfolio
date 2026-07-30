// src/presentation/surfaces/profile/parts/highlight-grid.tsx
import { FiCheckCircle } from "react-icons/fi";
import { highlights } from "@domain/content";
import { StaggerGroup, StaggerItem } from "@presentation/motion/atoms/stagger";

/** The tick-list of headline capabilities beside the bio. */
const HighlightGrid = () => (
  <StaggerGroup className="mt-6 grid gap-3 sm:grid-cols-2">
    {highlights.map((item) => (
      <StaggerItem key={item}>
        <div className="group flex items-start gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-1 dark:text-slate-300">
          <FiCheckCircle className="mt-0.5 shrink-0 text-blue-500 transition-transform duration-300 group-hover:scale-125" />
          <span>{item}</span>
        </div>
      </StaggerItem>
    ))}
  </StaggerGroup>
);

export default HighlightGrid;
