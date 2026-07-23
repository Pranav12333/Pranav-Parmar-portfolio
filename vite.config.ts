import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// BASE_PATH is set by the GitHub Pages workflow (e.g. "/Pranav-Parmar-portfolio/").
// Local dev and Vercel keep the default "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  build: {
    // React and Framer Motion change far less often than app code, so give
    // each its own long-cache chunk — an app-only deploy then leaves them
    // cached for returning visitors instead of re-downloading them inside the
    // app bundle. three.js is intentionally left alone: it's only reached
    // through the lazy SnowCanvas import, so Rollup already emits it as its own
    // async chunk, and pulling it in here would drag it into the initial load.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/three/') || id.includes('@react-three')) return;
          if (
            id.includes('/react-dom/') ||
            id.includes('/react/') ||
            id.includes('/scheduler/')
          )
            return 'react-vendor';
          if (
            id.includes('framer-motion') ||
            id.includes('motion-dom') ||
            id.includes('motion-utils')
          )
            return 'motion-vendor';
        },
      },
    },
    // The lazy three.js/WebGL chunk is expectedly large but never blocks first
    // paint, so keep the size warning from flagging it on every build.
    chunkSizeWarningLimit: 1000,
  },
})
