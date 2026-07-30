// src/platform/kernel/persistence.ts
//
// Storage key registry. These strings cross process boundaries — `theme` is also
// read by the pre-paint inline script in the document head, so it is part of the
// public contract and must not be renamed without updating that script too.

export const PERSISTENCE_KEYS = {
  /** localStorage — "light" | "dark". Mirrored by the pre-paint head script. */
  theme: "theme",
  /** localStorage — "1" | "0" mute flag for the audio layer. */
  audioMuted: "soundMuted",
} as const;

export const SESSION_KEYS = {
  /** sessionStorage — "1" once the welcome sequence has been shown. */
  introSeen: "introSeen",
} as const;

/** Storage can throw in private mode / with cookies disabled — never let it. */
export const readLocal = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeLocal = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore storage errors (private mode, quota, disabled cookies) */
  }
};

export const readSession = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeSession = (key: string, value: string): void => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* ignore storage errors */
  }
};
