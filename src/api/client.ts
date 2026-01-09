// Converge Runtime API Client

import type { z } from 'zod';
import type {
  JobRequest,
  JobResponse,
  ValidateRulesRequest,
  ValidateRulesResponse,
  HealthResponse,
  ReadyResponse,
  ApiError,
} from './types';
import {
  JobResponseSchema,
  ValidateRulesResponseSchema,
  HealthResponseSchema,
  ReadyResponseSchema,
  ApiErrorSchema,
} from './schemas';
import { type Result, ok, err } from './result';
import { getEnv } from '../config/env';

class ConvergeApiError extends Error {
  constructor(
    public status: number,
    public error: ApiError,
  ) {
    super(error.message);
    this.name = 'ConvergeApiError';
  }
}

class ValidationError extends Error {
  constructor(
    public validationErrors: unknown,
  ) {
    super('API response validation failed');
    this.name = 'ValidationError';
  }
}

/**
 * Make a validated API request.
 * Validates the response with the provided Zod schema.
 */
async function request<T>(
  path: string,
  schema: z.ZodSchema<T>,
  options: RequestInit = {},
): Promise<Result<T, ConvergeApiError | ValidationError>> {
  const env = getEnv();
  const url = `${env.VITE_API_URL}${path}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Try to parse error response
      const errorParseResult = ApiErrorSchema.safeParse(await response.json().catch(() => null));
      
      if (errorParseResult.success) {
        return err(new ConvergeApiError(response.status, errorParseResult.data));
      }
      
      // Fallback if error response doesn't match schema
      return err(
        new ConvergeApiError(response.status, {
          error: 'unknown',
          message: `HTTP ${response.status}: ${response.statusText}`,
        }),
      );
    }

    // Validate response with schema
    const jsonData: unknown = await response.json();
    const parseResult = schema.safeParse(jsonData);
    
    if (!parseResult.success) {
      return err(new ValidationError(parseResult.error.errors));
    }

    return ok(parseResult.data);
  } catch (error) {
    if (error instanceof ConvergeApiError || error instanceof ValidationError) {
      return err(error);
    }
    
    // Network or other errors
    return err(
      new ConvergeApiError(0, {
        error: 'network_error',
        message: error instanceof Error ? error.message : 'Unknown network error',
      }),
    );
  }
}

export const api = {
  /**
   * Health check endpoint
   */
  async health(): Promise<Result<HealthResponse, ConvergeApiError | ValidationError>> {
    const env = getEnv();
    
    try {
      const response = await fetch(`${env.VITE_API_URL}/health`);
      const text = await response.text();
      
      // Validate health response
      const parseResult = HealthResponseSchema.safeParse({ status: text });
      if (!parseResult.success) {
        return err(new ValidationError(parseResult.error.errors));
      }
      
      return ok(parseResult.data);
    } catch (error) {
      return err(
        new ConvergeApiError(0, {
          error: 'network_error',
          message: error instanceof Error ? error.message : 'Unknown network error',
        }),
      );
    }
  },

  /**
   * Readiness check endpoint
   */
  async ready(): Promise<Result<ReadyResponse, ConvergeApiError | ValidationError>> {
    return request<ReadyResponse>('/ready', ReadyResponseSchema);
  },

  /**
   * Submit a job to the Converge engine
   */
  async createJob(job: JobRequest): Promise<Result<JobResponse, ConvergeApiError | ValidationError>> {
    return request<JobResponse>('/api/v1/jobs', JobResponseSchema, {
      method: 'POST',
      body: JSON.stringify(job),
    });
  },

  /**
   * Validate Converge Rules
   */
  async validateRules(
    rules: ValidateRulesRequest,
  ): Promise<Result<ValidateRulesResponse, ConvergeApiError | ValidationError>> {
    return request<ValidateRulesResponse>('/api/v1/validate-rules', ValidateRulesResponseSchema, {
      method: 'POST',
      body: JSON.stringify(rules),
    });
  },
};

export { ConvergeApiError, ValidationError };
export type { ApiError };
