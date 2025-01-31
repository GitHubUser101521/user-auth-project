// vite.config.js or vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add this if not already present
  css: {
    postcss: {
      plugins: [], // You might not need to specify plugins here if using a separate postcss.config.js/mjs
    },
  },
});