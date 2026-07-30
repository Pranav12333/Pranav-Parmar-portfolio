// src/compatibility/shims/idle-callback.ts
//
// requestIdleCallback shim for Safari. The shipped code does NOT install this —
// src/platform/reactive/use-deferred-mount.ts feature-detects and falls back to a
// short setTimeout instead, which is cheaper than a polyfill and has the same
// observable effect. Kept here so the decision is documented in code.

type IdleDeadline = { didTimeout: boolean; timeRemaining(): number };
type IdleCallback = (deadline: IdleDeadline) => void;

/** Budget a shimmed idle slice pretends to have, in milliseconds. */
const FRAME_BUDGET = 50;

const SHIM_DELAY = 1;

export function shimRequestIdleCallback(
  callback: IdleCallback,
  timeout = FRAME_BUDGET
): number {
  const started = Date.now();
  return window.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, timeout - (Date.now() - started)),
    });
  }, SHIM_DELAY);
}

export function shimCancelIdleCallback(handle: number): void {
  window.clearTimeout(handle);
}

/** True when the platform already provides the real thing. */
export const hasNativeIdleCallback = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.requestIdleCallback === "function";
