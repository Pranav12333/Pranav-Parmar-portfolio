// src/platform/audio/index.ts
//
// Audio module barrel. The app mounts <AudioBindings /> once; anything that
// wants to make a deliberate sound (the intro dismiss, a successful form send)
// calls `playCue` from here.

export { default as AudioBindings } from "./bindings";
export { playCue } from "./engine";
export type { CueName } from "./engine";
