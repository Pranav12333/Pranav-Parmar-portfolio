// src/experimental/index.ts
//
// Nothing here is on a render path. Each module is reachable only when its gate
// in src/config/experimental/gates.ts is switched on, which no build currently
// does.

export type { TransitionRequest } from "./view-transitions/controller";
export { supportsViewTransitions, withTransition } from "./view-transitions/controller";
export type { RendererBackend } from "./webgpu/capability-probe";
export { hasWebGpuBinding, probeBackend } from "./webgpu/capability-probe";
