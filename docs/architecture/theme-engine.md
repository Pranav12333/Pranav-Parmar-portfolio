# Theme engine

Two mechanisms exist. Only one is active.

## Active: class + Tailwind tokens

`<html>` carries a `dark` class. It is set before first paint by the inline script
in `index.html` (reading `localStorage.theme`), then owned by
`platform/reactive/use-theme.ts`. Every colour resolves through Tailwind's own
`dark:` variants against the token scale in `tailwind.config.js`. There is no
runtime stylesheet generation, which is why a theme switch costs one class
toggle and no reflow of a generated sheet.

`useIsDark()` observes the same class with a `MutationObserver`, so non-toggle
consumers — the particulate field picking its plate tint — react to a change from
any source.

## Retained: v1 palette documents

`src/legacy/theme-engine/` compiles a palette document into CSS custom
properties. Documents live in `config/themes/*.json` and are shaped by the
`Palette` type in `legacy/theme-engine/palette.ts`:

- eleven-step `accent` and `neutral` ramps,
- a `gradient` triple expressed as accent ramp keys.

`compilePalette()` emits a `:root` block; `FALLBACK_SHEET` is emitted instead when
a document fails validation, so the page can never lose colour.

This path is behind the `themeDocuments` gate and is currently closed. It is kept
because the migration ledger still translates documents authored against it.

## Adding a palette

1. Add `config/themes/<id>.json` matching the `Palette` shape.
2. Register the id in `config/feature-flags.json` under `themeDocuments`.
3. Open the `themeDocuments` gate in `src/config/experimental/gates.ts`.

Step 3 alone is not sufficient — see `docs/extension-points.md` for the wiring the
gate still needs.
