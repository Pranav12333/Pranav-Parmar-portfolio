// src/presentation/surfaces/hero/index.tsx
import { m } from "framer-motion";
import { SECTION_IDS, headingId } from "@config/runtime/sections";
import { staggerContainer } from "@presentation/motion/vocabulary";
import CallToAction from "./parts/call-to-action";
import Headline from "./parts/headline";
import MetricGrid from "./parts/metric-grid";
import Pitch from "./parts/pitch";
import RoleLine from "./parts/role-line";
import SocialRow from "./parts/social-row";
import StatusBadge from "./parts/status-badge";

/** Entrance cascade for the hero column. */
const HERO_CASCADE = 0.12;

const Hero = () => (
  <section
    id={SECTION_IDS.hero}
    aria-labelledby={headingId("hero")}
    className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8"
  >
    {/* Soft glow behind the headline for depth + legibility over the snow */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

    <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
      <m.div variants={staggerContainer(HERO_CASCADE)} initial="hidden" animate="show">
        <StatusBadge />
        <Headline />
        <RoleLine />
        <Pitch />
        <CallToAction />
        <SocialRow />
      </m.div>

      <MetricGrid />
    </div>
  </section>
);

export default Hero;
