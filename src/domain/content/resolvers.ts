// src/domain/content/resolvers.ts
//
// Thin read projections over the raw collections. Today they are pass-throughs;
// they exist so a collection can gain filtering/ordering (draft entries, locale
// variants) without every consumer changing its import. The language chips are
// resolved here too, since their labels come from the identity module rather
// than from a content file.

import type { Education } from "@domain/contracts/content";
import { languageLabels } from "@identity";
import { education } from "./academics";

/** Education entries, newest first (already authored in order). */
export const academicsResolver: readonly Education[] = education;

/** "English (Professional)"-style chips. */
export const languages: readonly string[] = languageLabels();
