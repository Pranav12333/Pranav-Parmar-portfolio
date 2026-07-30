// src/platform/audio/engine/index.ts
//
// Engine barrel. Importing this pulls in every behaviour module, which is what
// registers the late-bound bridges in state.ts — so consumers must always go
// through here rather than reaching into a single file.
//
// Design goals, matching the rest of the site's restraint:
//   • Preloaded, decoded buffers → zero-latency playback.
//   • Respects autoplay policy — the context is created suspended and only
//     resumed on a real user gesture.
//   • Never annoying: every one-shot is throttled, and a small priority "duck"
//     keeps a lesser cue (a hover tick) from stepping on a more important one
//     (a success chime), so sounds don't pile up.
//   • Global mute, persisted to localStorage, defaulting to muted when the user
//     prefers reduced motion.

export type { CueName } from "./catalog";
export { primeCues } from "./decoder";
export { playCue } from "./one-shot";
export { beginSustain, driveSustain, endSustain } from "./sustain";
export { isMuted, setMuted, subscribeMuted, toggleMuted } from "./preferences";
export { armUnlockGestures } from "./unlock";
