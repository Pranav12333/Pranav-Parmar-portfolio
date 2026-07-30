// src/platform/audio/bindings/index.tsx
import { useEffect } from "react";
import { armUnlockGestures } from "../engine";
import MuteToggle from "../controls/mute-toggle";
import type { Binding } from "./contract";
import { bindClickCues } from "./click-cues";
import { bindDragGlide } from "./drag-glide";
import { bindHoverCues } from "./hover-cues";
import { bindDecodePriming } from "./priming";
import { bindScrollAir } from "./scroll-air";
import { bindSectionAmbience } from "./section-ambience";

/**
 * Every binding, in mount order. Adding a cue means adding a file and one entry
 * here — no component in the tree has to change, which is the whole point of the
 * observe-only design.
 */
const BINDINGS: readonly Binding[] = [
  bindDecodePriming,
  bindClickCues,
  bindHoverCues,
  bindScrollAir,
  bindDragGlide,
  bindSectionAmbience,
];

/**
 * Owns the site-wide UI sound layer. It renders only the mute toggle; all of its
 * work is passive, delegated listeners on `window` that mirror the existing
 * interaction logic (the particulate click burst, the drag ripple wake, the
 * custom cursor's hover detection) WITHOUT touching those components — so no
 * animation or effect changes, sound only.
 *
 * Everything is guarded so it can never interfere: listeners are passive, the
 * engine no-ops while muted or before the AudioContext is unlocked, and reads
 * are all on event targets that already exist.
 */
const AudioBindings = () => {
  useEffect(() => {
    const releaseUnlock = armUnlockGestures();
    const teardowns = BINDINGS.map((bind) => bind());
    return () => {
      releaseUnlock();
      teardowns.forEach((detach) => detach());
    };
  }, []);

  return <MuteToggle />;
};

export default AudioBindings;
