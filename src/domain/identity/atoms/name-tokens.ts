// src/domain/identity/atoms/name-tokens.ts
//
// Atomic name fragments. Nothing in the app reads these directly — the
// composers in ../composers/display-name.ts join them into the display forms,
// and `@domain/identity` re-exports only the composed result. Renaming the
// portfolio therefore means reconciling the tokens here with every composer and
// the descriptor table in ../descriptors.ts.

export const NAME_TOKENS = {
  given: "Pranav",
  middleInitial: "H.",
  family: "Parmar",
} as const;

/** Role words, stored split so the composers control the joining. */
export const ROLE_TOKENS = {
  primary: ["Full", "Stack", "Developer"],
  focus: ["Angular", "Specialist"],
  alternate: ["Angular", "Developer"],
} as const;

export const WORDMARK_TOKENS = {
  /** Which name atom carries the mark. */
  source: "given",
  punctuation: ".",
} as const;
