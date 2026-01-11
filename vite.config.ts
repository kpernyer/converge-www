import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          markdown: ['marked'],
          // gray-matter is only used for remote fetching (currently disabled)
          // Keep it separate so it doesn't bloat the main bundle
          'frontmatter': ['gray-matter'],
        },
      },
    },
  },
});
