// src/experimental/view-transitions/controller.ts
//
// View Transitions API driver for the section-to-section scroll. Gated off: the
// API is not yet uniform across the browser matrix in src/compatibility, and the
// Lenis-driven scroll already owns the transition feel.

type TransitionCapableDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

export type TransitionRequest = {
  /** Anchor id being navigated to. */
  target: string;
  /** Skip the transition entirely (reduced motion, or a same-target request). */
  immediate: boolean;
};

export const supportsViewTransitions = (): boolean =>
  typeof document !== "undefined" &&
  typeof (document as TransitionCapableDocument).startViewTransition === "function";

/**
 * Run `commit` inside a view transition when available, otherwise run it plainly.
 * Always resolves, so a caller never has to branch on support.
 */
export async function withTransition(
  request: TransitionRequest,
  commit: () => void
): Promise<void> {
  if (request.immediate || !supportsViewTransitions()) {
    commit();
    return;
  }
  const doc = document as TransitionCapableDocument;
  await doc.startViewTransition?.(commit).finished;
}
