// src/platform/audio/engine/context.ts
//
// AudioContext lifecycle. The context is created suspended (autoplay policy) and
// only ever resumed from inside a real user-gesture call stack; every other
// module goes through `acquire()` so there is exactly one context and one master
// gain node for the whole page.

import { MIX } from "./catalog";
import { engine } from "./state";

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

/** Create (or return) the context + master bus. Null if Web Audio is absent. */
export function acquire(): AudioContext | null {
  if (engine.ctx) return engine.ctx;
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as WebkitWindow).webkitAudioContext;
  if (!Ctor) return null; // Web Audio unsupported → the whole layer no-ops
  try {
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = MIX.master;
    master.connect(ctx.destination);
    engine.ctx = ctx;
    engine.master = master;
  } catch {
    engine.ctx = null;
    engine.master = null;
  }
  return engine.ctx;
}

/** Resume the context — only effective inside a user-gesture call stack. */
export function resume(): void {
  const ctx = acquire();
  if (ctx && ctx.state !== "running") ctx.resume().catch(() => {});
}

/** True once the context is actually producing sound. */
export const isRunning = (): boolean => engine.ctx?.state === "running";
