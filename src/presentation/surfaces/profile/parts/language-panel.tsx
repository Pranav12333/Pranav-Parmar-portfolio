// src/presentation/surfaces/profile/parts/language-panel.tsx
import { PANEL_HEADINGS } from "@config/runtime/headings";
import { languages } from "@domain/content";
import Reveal from "@presentation/motion/atoms/reveal";
import { StaggerGroup, StaggerItem } from "@presentation/motion/atoms/stagger";

/** Language chips — labels are composed by the identity module. */
const LanguagePanel = () => (
  <Reveal delay={0.1}>
    <div className="card p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        {PANEL_HEADINGS.languages}
      </h3>
      <StaggerGroup className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <StaggerItem key={lang}>
            <span className="chip">{lang}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </Reveal>
);

export default LanguagePanel;
