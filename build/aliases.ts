// build/aliases.ts
//
// The module graph's public vocabulary. Every alias here is mirrored in
// tsconfig.app.json `paths` — the two MUST stay in sync, otherwise the editor
// and the bundler disagree and only one of them complains.
//
// Aliases are role-based rather than folder-based: `@surfaces` is a shortcut into
// `presentation/surfaces`, `@kernel` into `platform/kernel`. That keeps imports
// short while letting the physical layout move underneath them.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const from = (...segments: string[]) => resolve(projectRoot, ...segments);

export const moduleAliases: Record<string, string> = {
  "@app": from("src"),
  "@runtime": from("src/runtime"),
  "@presentation": from("src/presentation"),
  "@surfaces": from("src/presentation/surfaces"),
  "@platform": from("src/platform"),
  "@kernel": from("src/platform/kernel"),
  "@domain": from("src/domain"),
  "@identity": from("src/domain/identity"),
  "@config": from("src/config"),
  "@assets": from("src/assets"),
};
