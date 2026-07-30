// src/platform/audio/bindings/hover-cues.ts
//
// Hover → a crystal tick on links, a magnetic pulse on cards. Desktop pointers
// only; the last hovered element is remembered so re-entering the same target
// stays silent.

import { MEDIA } from "@kernel";
import { playCue } from "../engine";
import type { Binding } from "./contract";
import { HOOKS, PASSIVE } from "./contract";

export const bindHoverCues: Binding = () => {
  const finePointer = window.matchMedia?.(MEDIA.finePointer);
  let lastHover: Element | null = null;
  let lastCard: Element | null = null;

  const onOver = (event: PointerEvent) => {
    if (finePointer && !finePointer.matches) return; // desktop pointers only
    const target = event.target as Element | null;
    const interactive = target?.closest?.(HOOKS.interactive) ?? null;
    const card = target?.closest?.(HOOKS.card) ?? null;
    if (interactive && interactive !== lastHover) {
      lastHover = interactive;
      playCue("tick");
    } else if (!interactive) {
      lastHover = null;
    }
    // Pulse once when entering a fresh card (but not when landing straight on
    // one of its links — the tick already covers that).
    if (card && card !== lastCard) {
      lastCard = card;
      if (!interactive) playCue("cardhover");
    } else if (!card) {
      lastCard = null;
    }
  };

  window.addEventListener("pointerover", onOver, PASSIVE);
  return () => window.removeEventListener("pointerover", onOver);
};
