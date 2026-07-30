// src/domain/content/index.ts
//
// Content barrel. The surfaces import named collections from `@domain/content`
// so no surface knows which file a collection actually lives in — collections
// can be re-homed without touching a single component.

export { academicsResolver as education, languages } from "./resolvers";
export { experience } from "./engagement-history";
export { projects } from "./portfolio-index";
export { coreSkills, skills } from "./capability-matrix";
export { navLinks, observedSectionIds } from "./navigation-map";
export { roles } from "./roles";
export { stats, MEASUREMENTS } from "./metrics";
export {
  availability,
  highlights,
  outreachInvitation,
  stackCredit,
  summary,
  tagline,
} from "./narrative";
