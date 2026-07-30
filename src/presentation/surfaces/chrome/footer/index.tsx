// src/presentation/surfaces/chrome/footer/index.tsx
import { FiArrowUp } from "react-icons/fi";
import { SECTION_IDS } from "@config/runtime/sections";
import { navLinks, stackCredit } from "@domain/content";
import { identity } from "@identity";
import { scrollToSection, scrollToTop } from "@platform/scroll/navigator";
import BrandMark from "@presentation/primitives/brand-mark";
import ChannelRail from "@presentation/primitives/channel-rail";

/** Bare glyphs in the footer rail — no chip, just a lift and a tint. */
const RAIL_LINK =
  "text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:scale-125 hover:text-blue-500";
const RAIL_GLYPH_SIZE = 20;

const BACK_TO_TOP = "Back to top";

const Footer = () => (
  <footer className="border-t border-slate-200 px-4 py-10 sm:px-6 lg:px-8 dark:border-slate-800">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
      <BrandMark className="text-2xl font-extrabold brand-text" />

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {navLinks.map((item) => (
          <li key={item.to}>
            <a
              href={`#${item.to}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.to);
              }}
              className="link-underline text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap justify-center gap-4">
        <ChannelRail anchorClassName={RAIL_LINK} glyphSize={RAIL_GLYPH_SIZE} />
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-500">
        © {new Date().getFullYear()} {identity.fullName} — {identity.title} ·{" "}
        {identity.location}
      </p>
      <p className="-mt-4 text-xs text-slate-400 dark:text-slate-600">{stackCredit}</p>

      <a
        href={`#${SECTION_IDS.hero}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        data-cursor="hover"
        className="group inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/60 hover:text-blue-500 hover:shadow-md hover:shadow-blue-500/15 dark:border-slate-800 dark:text-slate-300"
      >
        <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />{" "}
        {BACK_TO_TOP}
      </a>
    </div>
  </footer>
);

export default Footer;
