// Environment variables validation

import { z } from 'zod';

const EnvSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:8080'),
});

type Env = z.infer<typeof EnvSchema>;

let validatedEnv: Env | null = null;

/**
 * Format Zod validation errors into a readable string.
 */
function formatZodErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.map(String).join('.');
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join(', ');
}

/**
 * Get validated environment variables.
 * Validates once and caches the result.
 */
export function getEnv(): Env {
  if (validatedEnv === null) {
    const parseResult = EnvSchema.safeParse(import.meta.env);

    if (!parseResult.success) {
      const errorMessages = formatZodErrors(parseResult.error);
      throw new Error(`Invalid environment variables: ${errorMessages}`);
    }

    validatedEnv = parseResult.data;
  }

  return validatedEnv;
}
