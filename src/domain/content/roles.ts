// src/domain/content/roles.ts
//
// The rotating role titles in the hero. The first entry is pulled from the
// identity registry so the animation always opens on the canonical job title
// (which is also what the static <h1> fallback text states, for crawlers).

import { identity } from "@identity";

export const roles: readonly string[] = [
  identity.title,
  "Angular & React Developer",
  "MEAN Stack Developer",
  "Real-Time / IoT Engineer",
];
