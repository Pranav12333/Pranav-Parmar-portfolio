// src/presentation/surfaces/capabilities/parts/proficiency-panel.tsx
import { PANEL_HEADINGS } from "@config/runtime/headings";
import { coreSkills } from "@domain/content";
import Reveal from "@presentation/motion/atoms/reveal";
import ProficiencyBar from "./proficiency-bar";

/** The self-assessed proficiency card. */
const ProficiencyPanel = () => (
  <Reveal delay={0.05}>
    <div className="card mx-auto mt-12 max-w-3xl p-6 sm:p-8">
      <h3 className="mb-6 text-center text-lg font-bold text-slate-900 dark:text-white">
        {PANEL_HEADINGS.coreProficiency}
      </h3>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {coreSkills.map((skill) => (
          <ProficiencyBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </div>
  </Reveal>
);

export default ProficiencyPanel;
