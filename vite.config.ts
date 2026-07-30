import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { moduleAliases } from './build/aliases'
import { manualChunks } from './build/chunking'
import { manglePlugin } from './build/mangle-plugin'
import { legalPlugin } from './build/legal-plugin'

/** Diagnostics stripped from production output (call sites become no-ops). */
const STRIPPED_CALLS = [
  'console.log',
  'console.debug',
  'console.info',
  'console.warn',
  'console.error',
  'console.trace',
]

// https://vite.dev/config/
// BASE_PATH is set by the GitHub Pages workflow (e.g. "/Pranav-Parmar-portfolio/").
// Local dev and Vercel keep the default "/".
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [react(), manglePlugin(), legalPlugin()],
    base: process.env.BASE_PATH || '/',
    resolve: {
      // Mirrored in tsconfig.app.json `paths` — see build/aliases.ts.
      alias: moduleAliases,
    },
    build: {
      // No source maps in production: they would hand over the entire original
      // tree, which defeats every other measure here.
      sourcemap: false,
      // esbuild minification (Vite's default) plus dead-code elimination.
      minify: 'esbuild',
      // Hashed filenames are Rollup's default and are kept as-is, so cache
      // behaviour and the Pages deploy are unchanged. See build/chunking.ts for
      // the vendor + per-layer split.
      rollupOptions: {
        output: { manualChunks },
      },
      // The lazy three.js/WebGL chunk is expectedly large but never blocks first
      // paint, so keep the size warning from flagging it on every build.
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      // `pure` rather than `drop`, so the transform can never remove a statement
      // whose arguments matter. Dev keeps its console intact.
      pure: isBuild ? STRIPPED_CALLS : [],
      drop: isBuild ? ['debugger' as const] : [],
      legalComments: 'none' as const,
    },
  }
})
