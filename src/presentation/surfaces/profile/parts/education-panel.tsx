// src/presentation/surfaces/profile/parts/education-panel.tsx
import { FaGraduationCap } from "react-icons/fa";
import { PANEL_HEADINGS } from "@config/runtime/headings";
import { education } from "@domain/content";
import Reveal from "@presentation/motion/atoms/reveal";
import { StaggerGroup, StaggerItem } from "@presentation/motion/atoms/stagger";

/** Slightly slower cascade than the default — there are only three rows. */
const ROW_CASCADE = 0.1;

const EducationPanel = () => (
  <div className="mt-10">
    <Reveal>
      <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
        <FaGraduationCap className="text-blue-500" /> {PANEL_HEADINGS.education}
      </h3>
    </Reveal>
    <StaggerGroup className="mt-4 space-y-3" stagger={ROW_CASCADE}>
      {education.map((entry) => (
        <StaggerItem key={entry.degree}>
          <div className="card card-hover flex flex-wrap items-center justify-between gap-2 p-4">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {entry.degree}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {entry.school}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {entry.period}
              </p>
              {entry.detail && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {entry.detail}
                </p>
              )}
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  </div>
);

export default EducationPanel;
