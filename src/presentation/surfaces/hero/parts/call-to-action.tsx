// src/presentation/surfaces/hero/parts/call-to-action.tsx
import { m } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SECTION_IDS } from "@config/runtime/sections";
import { scrollToSection } from "@platform/scroll/navigator";
import Magnetic from "@presentation/motion/atoms/magnetic";
import { staggerItem } from "@presentation/motion/vocabulary";

const COPY = { primary: "View My Work", secondary: "Get in Touch" } as const;

/** Both hero CTAs. Anchors stay real anchors so they remain crawlable. */
const CallToAction = () => (
  <m.div
    variants={staggerItem}
    className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
  >
    <Magnetic>
      <a
        href={`#${SECTION_IDS.showcase}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(SECTION_IDS.showcase);
        }}
        data-cursor="hover"
        className="group btn-sheen inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.04] hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 sm:text-base"
      >
        {COPY.primary}
        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </a>
    </Magnetic>
    <Magnetic>
      <a
        href={`#${SECTION_IDS.outreach}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(SECTION_IDS.outreach);
        }}
        data-cursor="hover"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/50 bg-white/50 px-7 py-3 text-sm font-semibold text-blue-600 backdrop-blur-sm transition-all hover:scale-[1.04] hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 sm:text-base dark:bg-slate-900/40 dark:text-blue-400"
      >
        {COPY.secondary}
      </a>
    </Magnetic>
  </m.div>
);

export default CallToAction;
