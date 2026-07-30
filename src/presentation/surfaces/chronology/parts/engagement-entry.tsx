// src/presentation/surfaces/chronology/parts/engagement-entry.tsx
import { FaBriefcase } from "react-icons/fa";
import type { Experience } from "@domain/contracts/content";
import Reveal from "@presentation/motion/atoms/reveal";

/** Size of the briefcase glyph inside the timeline node. */
const NODE_GLYPH_SIZE = 13;

const CURRENT_LABEL = "Current";

/** One role: timeline node + card with the bullet list. */
const EngagementEntry = ({ job }: { job: Experience }) => (
  <Reveal className="group relative pl-12 sm:pl-16">
    {/* Node */}
    <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full brand-gradient text-white shadow-md shadow-blue-500/30 ring-4 ring-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50 sm:left-1 dark:ring-slate-900">
      <FaBriefcase size={NODE_GLYPH_SIZE} />
    </span>

    <article className="card card-hover p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {job.role}
          </h3>
          <p className="font-medium text-blue-600 dark:text-blue-400">{job.company}</p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          {job.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              {CURRENT_LABEL}
            </span>
          )}
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {job.period}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {job.location}
          </span>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {job.points.map((point, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full brand-gradient" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  </Reveal>
);

export default EngagementEntry;
