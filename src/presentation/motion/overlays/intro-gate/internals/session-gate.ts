// src/presentation/motion/overlays/intro-gate/internals/session-gate.ts
//
// The once-per-session flag for the welcome sequence. sessionStorage rather than
// localStorage on purpose: a new tab earns the splash again, a reload within the
// same tab does not.

import { SESSION_KEYS, readSession, writeSession } from "@kernel";

export const hasSeenIntro = (): boolean =>
  readSession(SESSION_KEYS.introSeen) === "1";

export const markIntroSeen = (): void => {
  writeSession(SESSION_KEYS.introSeen, "1");
};
