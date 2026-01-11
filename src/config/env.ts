// Environment variables with defaults
// Simplified to avoid bundling Zod (~68KB) for just 2 variables

interface Env {
  VITE_API_URL: string;
  VITE_SIGNALS_BUCKET_URL: string;
}

const defaults: Env = {
  VITE_API_URL: 'http://localhost:8080',
  VITE_SIGNALS_BUCKET_URL: 'https://storage.googleapis.com/converge-signals',
};

let cachedEnv: Env | null = null;

/**
 * Get environment variables with defaults.
 * Caches the result for subsequent calls.
 */
export function getEnv(): Env {
  if (cachedEnv === null) {
    cachedEnv = {
      VITE_API_URL: (import.meta.env.VITE_API_URL as string) || defaults.VITE_API_URL,
      VITE_SIGNALS_BUCKET_URL:
        (import.meta.env.VITE_SIGNALS_BUCKET_URL as string) || defaults.VITE_SIGNALS_BUCKET_URL,
    };
  }
  return cachedEnv;
}
