import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// BASE_PATH is set by the GitHub Pages workflow (e.g. "/portfolio-react/").
// Local dev and Vercel keep the default "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
