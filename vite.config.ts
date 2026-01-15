import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

// Read versions from ../converge/Cargo.toml
function readCargoVersions() {
  try {
    const cargoPath = resolve(__dirname, '../converge/Cargo.toml');
    const content = readFileSync(cargoPath, 'utf-8');

    // Parse workspace.dependencies versions
    const versions: Record<string, string> = {};

    // Match patterns like: converge-core = { path = "...", version = "0.6.1" }
    const depRegex = /^(converge-\w+)\s*=\s*\{[^}]*version\s*=\s*"([^"]+)"/gm;
    let match;
    while ((match = depRegex.exec(content)) !== null) {
      versions[match[1]] = match[2];
    }

    return versions;
  } catch (error) {
    console.warn('Could not read Cargo.toml versions:', error);
    return {
      'converge-core': '0.6.1',
      'converge-provider': '0.2.3',
      'converge-domain': '0.2.3',
    };
  }
}

// Read version from ../converge-ledger/mix.exs
function readMixVersion() {
  try {
    const mixPath = resolve(__dirname, '../converge-ledger/mix.exs');
    const content = readFileSync(mixPath, 'utf-8');

    // Match @version "x.y.z"
    const versionMatch = content.match(/@version\s+"([^"]+)"/);
    return versionMatch ? versionMatch[1] : '0.1.0';
  } catch (error) {
    console.warn('Could not read mix.exs version:', error);
    return '0.1.0';
  }
}

// Get app version from latest git tag
function getAppVersion() {
  try {
    return execSync('git describe --tags --abbrev=0 2>/dev/null').toString().trim();
  } catch {
    return 'dev';
  }
}

const cargoVersions = readCargoVersions();
const ledgerVersion = readMixVersion();
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
