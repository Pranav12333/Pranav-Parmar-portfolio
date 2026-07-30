// src/presentation/surfaces/showcase/index.tsx
import { SECTION_HEADINGS } from "@config/runtime/headings";
import { SECTION_IDS, headingId } from "@config/runtime/sections";
import { projects } from "@domain/content";
import Reveal from "@presentation/motion/atoms/reveal";
import { StaggerGroup, StaggerItem } from "@presentation/motion/atoms/stagger";
import { SectionHeader } from "@presentation/primitives/section-header";
import ProjectCard from "./parts/project-card";

const HEADING = SECTION_HEADINGS.showcase;

const Showcase = () => (
  <section
    id={SECTION_IDS.showcase}
    aria-labelledby={headingId("showcase")}
    className="px-4 py-24 sm:px-6 lg:px-8"
  >
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <SectionHeader
          eyebrow={HEADING.eyebrow}
          title={HEADING.title}
          center
          id={headingId("showcase")}
        />
      </Reveal>

      <StaggerGroup className="mt-14 grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.title} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

export default Showcase;
