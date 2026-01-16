import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';

// Hardcoded versions for converge crates
const cargoVersions = {
  'converge-core': '0.6.1',
  'converge-provider': '0.2.3',
  'converge-domain': '0.2.3',
};

const ledgerVersion = '0.1.0';

// Get app version from latest git tag
function getAppVersion() {
  try {
    return execSync('git describe --tags --abbrev=0 2>/dev/null').toString().trim();
  } catch {
    return 'dev';
  }
}

const appVersion = getAppVersion();

export default defineConfig({
  plugins: [react()],
  define: {
    __CARGO_VERSIONS__: JSON.stringify(cargoVersions),
    __LEDGER_VERSION__: JSON.stringify(ledgerVersion),
    __APP_VERSION__: JSON.stringify(appVersion),
  },
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
