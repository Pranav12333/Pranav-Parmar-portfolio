// src/presentation/surfaces/hero/parts/headline.tsx
import { m } from "framer-motion";
import { headingId } from "@config/runtime/sections";
import { identity } from "@identity";
import { staggerItem } from "@presentation/motion/vocabulary";

/** Greeting prefix — the only literal in the H1; the name comes from identity. */
const SALUTATION = "Hi, I'm ";

/**
 * The page's single H1. The visible role rotates via JS below the headline, so
 * the primary keywords are also stated statically inside the H1 (screen-reader
 * and crawler text) — that text must stay here for SEO.
 */
const Headline = () => (
  <m.h1
    id={headingId("hero")}
    variants={staggerItem}
    className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-6xl lg:text-7xl"
  >
    <span className="text-slate-900 dark:text-white">{SALUTATION}</span>
    <span className="brand-text-animated">{identity.name}</span>
    <span className="sr-only">
      {" "}
      — {identity.title} & {identity.specialty} in {identity.location}
    </span>
  </m.h1>
);

export default Headline;
