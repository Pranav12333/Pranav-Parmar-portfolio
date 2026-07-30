// src/presentation/surfaces/chronology/index.tsx
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { SECTION_HEADINGS } from "@config/runtime/headings";
import { SECTION_IDS, headingId } from "@config/runtime/sections";
import { experience } from "@domain/content";
import Reveal from "@presentation/motion/atoms/reveal";
import { SPRING } from "@presentation/motion/vocabulary";
import { SectionHeader } from "@presentation/primitives/section-header";
import EngagementEntry from "./parts/engagement-entry";
import TimelineTrack from "./parts/timeline-track";

const HEADING = SECTION_HEADINGS.chronology;

/** The fill tracks the timeline element from its top to its bottom edge. */
const TRACK_OFFSET = ["start center", "end center"] as const;

const Chronology = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: [...TRACK_OFFSET],
  });
  const scaleY = useSpring(scrollYProgress, SPRING.timeline);

  return (
    <section
      id={SECTION_IDS.chronology}
      aria-labelledby={headingId("chronology")}
      className="px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader
            eyebrow={HEADING.eyebrow}
            title={HEADING.title}
            center
            id={headingId("chronology")}
          />
        </Reveal>

        <div ref={timelineRef} className="relative mt-14">
          <TimelineTrack scaleY={scaleY} />

          <div className="space-y-10">
            {experience.map((job) => (
              <EngagementEntry key={job.company + job.period} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chronology;
