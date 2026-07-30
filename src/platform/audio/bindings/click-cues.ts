// src/platform/audio/bindings/click-cues.ts
//
// Click → pop, project-open bloom, or a confirmation chime. Capture phase so the
// cue fires even when the target stops propagation.

import { playCue } from "../engine";
import type { Binding } from "./contract";
import { GESTURE, HOOKS, gestureLedger, now } from "./contract";

const CAPTURE = true;

export const bindClickCues: Binding = () => {
  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (!target?.closest) return;
    if (target.closest(HOOKS.intro)) return; // welcome overlay dismiss
    if (target.closest(HOOKS.silent)) return; // handles its own cue
    // Suppress the pop when a click closes out a drag — the glide fade-out is
    // the feedback there.
    if (now() - gestureLedger.lastDragEnd < GESTURE.clickSuppressionMs) return;
    // Opening a project (its Live Demo / Code link) → the elegant bloom.
    if (target.closest(HOOKS.projectLink)) {
      playCue("bloom", true);
      return;
    }
    playCue(target.closest(HOOKS.outbound) ? "chime" : "pop", true);
  };

  window.addEventListener("click", onClick, CAPTURE);
  return () => window.removeEventListener("click", onClick, CAPTURE);
};
