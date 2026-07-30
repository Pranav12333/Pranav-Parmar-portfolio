// src/presentation/surfaces/profile/index.tsx
import { SECTION_HEADINGS } from "@config/runtime/headings";
import { SECTION_IDS, headingId } from "@config/runtime/sections";
import Reveal from "@presentation/motion/atoms/reveal";
import { SectionHeader } from "@presentation/primitives/section-header";
import BioBlock from "./parts/bio-block";
import EducationPanel from "./parts/education-panel";
import HighlightGrid from "./parts/highlight-grid";
import LanguagePanel from "./parts/language-panel";
import PortraitPanel from "./parts/portrait-panel";

const HEADING = SECTION_HEADINGS.profile;

const Profile = () => (
  <section
    id={SECTION_IDS.profile}
    aria-labelledby={headingId("profile")}
    className="relative px-4 py-24 sm:px-6 lg:px-8"
  >
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <SectionHeader
          eyebrow={HEADING.eyebrow}
          title={HEADING.title}
          id={headingId("profile")}
        />
      </Reveal>

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Portrait + languages */}
        <div className="space-y-6 [perspective:1000px]">
          <PortraitPanel />
          <LanguagePanel />
        </div>

        {/* Bio + highlights + education */}
        <div>
          <BioBlock />
          <HighlightGrid />
          <EducationPanel />
        </div>
      </div>
    </div>
  </section>
);

export default Profile;
