// src/presentation/surfaces/outreach/index.tsx
import { SECTION_HEADINGS } from "@config/runtime/headings";
import { SECTION_IDS, headingId } from "@config/runtime/sections";
import { outreachInvitation } from "@domain/content";
import Reveal from "@presentation/motion/atoms/reveal";
import { SectionHeader } from "@presentation/primitives/section-header";
import ChannelPanel from "./parts/channel-panel";
import MessageForm from "./parts/message-form";

const HEADING = SECTION_HEADINGS.outreach;

const Outreach = () => (
  <section
    id={SECTION_IDS.outreach}
    aria-labelledby={headingId("outreach")}
    className="px-4 py-24 sm:px-6 lg:px-8"
  >
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <SectionHeader
          eyebrow={HEADING.eyebrow}
          title={HEADING.title}
          center
          id={headingId("outreach")}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 dark:text-slate-400">
          {outreachInvitation}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <ChannelPanel />
        <MessageForm />
      </div>
    </div>
  </section>
);

export default Outreach;
