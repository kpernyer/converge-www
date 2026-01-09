// Converge Runtime API Client

import type {
  JobRequest,
  JobResponse,
  ValidateRulesRequest,
  ValidateRulesResponse,
  HealthResponse,
  ReadyResponse,
  ApiError,
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ConvergeApiError extends Error {
  constructor(
    public status: number,
    public error: ApiError,
  ) {
    super(error.message);
    this.name = 'ConvergeApiError';
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json() as ApiError;
    throw new ConvergeApiError(response.status, error);
  }

  return response.json() as Promise<T>;
}

export const api = {
  /**
   * Health check endpoint
   */
  async health(): Promise<HealthResponse> {
    const text = await fetch(`${API_BASE_URL}/health`).then((r) => r.text());
    return { status: text };
  },

  /**
   * Readiness check endpoint
   */
  async ready(): Promise<ReadyResponse> {
    return request<ReadyResponse>('/ready');
  },

  /**
   * Submit a job to the Converge engine
   */
  async createJob(job: JobRequest): Promise<JobResponse> {
    return request<JobResponse>('/api/v1/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    });
  },

  /**
   * Validate Converge Rules
   */
  async validateRules(rules: ValidateRulesRequest): Promise<ValidateRulesResponse> {
    return request<ValidateRulesResponse>('/api/v1/validate-rules', {
      method: 'POST',
      body: JSON.stringify(rules),
    });
  },
};

export { ConvergeApiError };
export type { ApiError };
