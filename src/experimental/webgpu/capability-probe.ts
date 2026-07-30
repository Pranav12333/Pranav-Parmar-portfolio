// src/experimental/webgpu/capability-probe.ts
//
// WebGPU probe for a future particulate backend. The shipped field is WebGL via
// three.js; this exists so the renderer choice can become data-driven once the
// adapter surface settles.

type GpuNavigator = Navigator & {
  gpu?: { requestAdapter(): Promise<unknown | null> };
};

export type RendererBackend = "webgl" | "webgpu" | "none";

export const hasWebGpuBinding = (): boolean =>
  typeof navigator !== "undefined" && "gpu" in (navigator as GpuNavigator);

/** Resolves the strongest backend actually usable in this browser. */
export async function probeBackend(webglAvailable: boolean): Promise<RendererBackend> {
  if (hasWebGpuBinding()) {
    try {
      const adapter = await (navigator as GpuNavigator).gpu?.requestAdapter();
      if (adapter) return "webgpu";
    } catch {
      /* fall through to WebGL */
    }
  }
  return webglAvailable ? "webgl" : "none";
}
