// src/presentation/canvas/particulate/internals/pointer-channel.ts
//
// All pointer wiring for the field, kept out of the render loop. The channel is a
// plain mutable record the loop reads once per frame — no React state, so a
// pointer move never triggers a re-render.

/** Same welcome-overlay hook the audio layer respects. */
const INTRO_HOOK = "[data-intro]";

export type PointerChannel = {
  /**
   * Pointer kept in NDC. `enabled` is deliberately session-only — a click turns
   * the hover interaction off, a reload brings it back.
   */
  pointer: { x: number; y: number; active: number; enabled: boolean };
  /** One-shot click burst origin. */
  burst: { x: number; y: number; fire: boolean };
  /**
   * Drag trail: the pointer position (NDC) while the primary button / a finger is
   * held down. `px/py` is the point processed on the previous frame, so the wake
   * can be carved against the whole swept segment (gap-free on fast drags).
   * Separate from `pointer` so the wake keeps tracking even for touch and after a
   * click has switched the hover-follow off.
   */
  drag: {
    x: number;
    y: number;
    px: number;
    py: number;
    active: boolean;
    has: boolean;
  };
};

export const createPointerChannel = (): PointerChannel => ({
  pointer: { x: 0, y: 0, active: 0, enabled: true },
  burst: { x: 0, y: 0, fire: false },
  drag: { x: 0, y: 0, px: 0, py: 0, active: false, has: false },
});

const ndcX = (clientX: number) => (clientX / window.innerWidth) * 2 - 1;
const ndcY = (clientY: number) => -(clientY / window.innerHeight) * 2 + 1;

const onIntro = (target: EventTarget | null) =>
  !!(target as Element | null)?.closest?.(INTRO_HOOK);

/** Attach every listener the channel needs; returns the teardown. */
export function attachPointerChannel(channel: PointerChannel): () => void {
  const { pointer, burst, drag } = channel;

  const onMove = (e: PointerEvent) => {
    if (!pointer.enabled || e.pointerType === "touch") return; // cursor-only
    pointer.x = ndcX(e.clientX);
    pointer.y = ndcY(e.clientY);
    pointer.active = 1;
  };
  const onOut = (e: PointerEvent) => {
    if (!e.relatedTarget) pointer.active = 0; // left the window
  };
  const onBlur = () => {
    pointer.active = 0;
  };
  // Every click pops the plates around the click point; the first click also
  // switches the cursor-follow off until the page is reloaded. Clicks on the
  // welcome overlay only dismiss it — they must not spend the interaction.
  const onClick = (e: MouseEvent) => {
    if (onIntro(e.target)) return;
    pointer.enabled = false;
    pointer.active = 0;
    burst.x = ndcX(e.clientX);
    burst.y = ndcY(e.clientY);
    burst.fire = true;
  };
  // Press-and-drag → a continuous ripple wake, as if a finger were gliding
  // through the field. `onDragMove` refreshes the point every move (touch
  // included) so the loop can lay the trail down frame-by-frame; releasing just
  // clears `active` and the displaced plates settle on their own.
  const onDragDown = (e: PointerEvent) => {
    if (e.button !== 0) return; // left mouse / touch / pen-tip only
    if (onIntro(e.target)) return;
    drag.x = ndcX(e.clientX);
    drag.y = ndcY(e.clientY);
    drag.px = drag.x; // start the swept segment as a point, not a stale jump
    drag.py = drag.y;
    drag.has = true;
    drag.active = true;
  };
  const onDragMove = (e: PointerEvent) => {
    if (!drag.active) return;
    drag.x = ndcX(e.clientX);
    drag.y = ndcY(e.clientY);
  };
  const onDragEnd = () => {
    drag.active = false;
  };

  const passive: AddEventListenerOptions = { passive: true };
  window.addEventListener("pointermove", onMove, passive);
  window.addEventListener("pointerout", onOut);
  window.addEventListener("blur", onBlur);
  window.addEventListener("click", onClick, true);
  window.addEventListener("pointerdown", onDragDown, passive);
  window.addEventListener("pointermove", onDragMove, passive);
  window.addEventListener("pointerup", onDragEnd, passive);
  window.addEventListener("pointercancel", onDragEnd, passive);
  window.addEventListener("blur", onDragEnd);

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerout", onOut);
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("click", onClick, true);
    window.removeEventListener("pointerdown", onDragDown);
    window.removeEventListener("pointermove", onDragMove);
    window.removeEventListener("pointerup", onDragEnd);
    window.removeEventListener("pointercancel", onDragEnd);
    window.removeEventListener("blur", onDragEnd);
  };
}
