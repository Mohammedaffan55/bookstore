import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site work on GitHub Pages, Netlify, Vercel, etc.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: { environment: 'node' },
});
