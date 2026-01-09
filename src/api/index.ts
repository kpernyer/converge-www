export { api, ConvergeApiError, ValidationError } from './client';
export type {
  JobRequest,
  JobResponse,
  JobMetadata,
  ContextSummary,
  ValidateRulesRequest,
  ValidateRulesResponse,
  ValidationIssue,
  HealthResponse,
  ReadyResponse,
  ApiError,
} from './types';
export type { Result } from './result';
export { ok, err } from './result';
export {
  isConvergeApiError,
  isValidationError,
  isNetworkError,
  isKnownError,
} from './guards';
