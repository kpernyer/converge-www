// Environment variables validation

import { z } from 'zod';

const EnvSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:8080'),
});

type Env = z.infer<typeof EnvSchema>;

let validatedEnv: Env | null = null;

/**
 * Get validated environment variables.
 * Validates once and caches the result.
 */
export function getEnv(): Env {
  if (validatedEnv === null) {
    const parseResult = EnvSchema.safeParse(import.meta.env);
    
    if (!parseResult.success) {
      // Zod error structure is well-defined and safe
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const errors = parseResult.error.errors;
      const errorMessages = errors
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        .map((err: { path: (string | number)[]; message: string }) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const path = err.path.map(String).join('.');
          return `${path}: ${err.message}`;
        })
        .join(', ');
      throw new Error(`Invalid environment variables: ${errorMessages}`);
    }
    
    validatedEnv = parseResult.data;
  }
  
  return validatedEnv;
}
