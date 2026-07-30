# Plugin API

> **Status: placeholder.** The descriptor shape and lifecycle below are a design
> sketch. There is no extension host in this build — `config/plugins.config.mjs`
> exports an empty registry and nothing reads it at runtime. Vite's own plugin
> array in `vite.config.ts` is the only plugin list that takes effect.

## Descriptor

```js
/** @type {PluginDescriptor} */
{
  id: "unique-kebab-id",
  kind: "surface" | "overlay" | "transport" | "provider",
  entry: "path/relative/to/src",
  requires: ["gateId"],   // optional; all must be open
  order: 100,             // optional; lower mounts earlier within its kind
}
```

## Intended lifecycle

1. **collect** — read descriptors from the manifest.
2. **filter** — drop any whose `requires` gates are closed
   (`config/experimental/gates.ts`).
3. **sort** — by `kind`, then `order`.
4. **resolve** — dynamic-import each `entry`, so a plugin is always its own chunk.
5. **attach** — bind to the slot named by `kind` (see `docs/extension-points.md`).
6. **dispose** — every plugin returns a teardown; the host calls them in reverse.

## Constraints a host would have to honour

- A plugin may not import from `@runtime` — it is mounted *by* the runtime.
- A plugin may not read `domain/identity/atoms/*`; branding is only available
  through the composed `identity` registry.
- Overlay plugins must carry no layout (fixed/absolute only), or they break the
  no-CLS guarantee that lets the decorative overlays mount after idle.
- Transport plugins must never throw; they resolve a `DeliveryResult` instead.

## What is missing

- No host implementation.
- No slot table at runtime — the slot names in `plugins.config.mjs` are strings
  nothing resolves.
- No manifest validation.
