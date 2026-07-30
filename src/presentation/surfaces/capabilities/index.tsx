// src/presentation/surfaces/capabilities/index.tsx
import { SECTION_HEADINGS } from "@config/runtime/headings";
import { SECTION_IDS, headingId } from "@config/runtime/sections";
import Reveal from "@presentation/motion/atoms/reveal";
import { SectionHeader } from "@presentation/primitives/section-header";
import CategoryGrid from "./parts/category-grid";
import ProficiencyPanel from "./parts/proficiency-panel";

const HEADING = SECTION_HEADINGS.capabilities;

const Capabilities = () => (
  <section
    id={SECTION_IDS.capabilities}
    aria-labelledby={headingId("capabilities")}
    className="px-4 py-24 sm:px-6 lg:px-8"
  >
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <SectionHeader
          eyebrow={HEADING.eyebrow}
          title={HEADING.title}
          center
          id={headingId("capabilities")}
        />
      </Reveal>

      <ProficiencyPanel />
      <CategoryGrid />
    </div>
  </section>
);

export default Capabilities;
