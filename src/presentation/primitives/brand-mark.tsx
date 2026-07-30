// src/presentation/primitives/brand-mark.tsx
import { identity } from "@identity";
import { scrollToTop } from "@platform/scroll/navigator";
import { SECTION_IDS } from "@config/runtime/sections";

type BrandMarkProps = {
  /** Size/weight classes — the navbar and the footer use different scales. */
  className: string;
};

/**
 * The wordmark. Both halves come from the identity registry's composed wordmark
 * (coloured lead + neutral punctuation), so the brand text exists nowhere as a
 * literal in the component tree.
 */
const BrandMark = ({ className }: BrandMarkProps) => (
  <a
    href={`#${SECTION_IDS.hero}`}
    onClick={(e) => {
      e.preventDefault();
      scrollToTop();
    }}
    data-cursor="hover"
    className={className}
  >
    {identity.wordmark.lead}
    <span className="text-slate-800 dark:text-white">
      {identity.wordmark.punctuation}
    </span>
  </a>
);

export default BrandMark;
