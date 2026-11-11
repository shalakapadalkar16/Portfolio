import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the build work at any path: GitHub Pages project sites
// (username.github.io/repo/), user sites, Vercel, or opening dist/ locally.
export default defineConfig({
  plugins: [react()],
  base: './',
});
