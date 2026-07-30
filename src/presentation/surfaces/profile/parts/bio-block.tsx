// src/presentation/surfaces/profile/parts/bio-block.tsx
import { summary } from "@domain/content";
import Reveal from "@presentation/motion/atoms/reveal";

/** The long-form bio paragraph. */
const BioBlock = () => (
  <Reveal>
    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
      {summary}
    </p>
  </Reveal>
);

export default BioBlock;
