// src/presentation/surfaces/hero/parts/metric-grid.tsx
import { stats } from "@domain/content";
import CountUp from "@presentation/motion/atoms/count-up";

/** The four animated counters below the hero. */
const MetricGrid = () => (
  <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
    {stats.map((metric) => (
      <div
        key={metric.label}
        className="group card card-hover px-3 py-4 text-center backdrop-blur-sm"
      >
        <div className="text-2xl font-extrabold brand-text transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
          <CountUp to={metric.to} suffix={metric.suffix} />
        </div>
        <div className="mt-1 text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
          {metric.label}
        </div>
      </div>
    ))}
  </div>
);

export default MetricGrid;
