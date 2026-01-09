// Type guards for error handling

import { ConvergeApiError, ValidationError } from './client';

/**
 * Type guard to check if error is a ConvergeApiError
 */
export function isConvergeApiError(error: unknown): error is ConvergeApiError {
  return error instanceof ConvergeApiError;
}

/**
 * Type guard to check if error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Type guard to check if error is a network error (generic Error)
 */
export function isNetworkError(error: unknown): error is Error {
  return error instanceof Error && !isConvergeApiError(error) && !isValidationError(error);
}

/**
 * Type guard to check if error is any known error type
 */
export function isKnownError(error: unknown): error is ConvergeApiError | ValidationError | Error {
  return isConvergeApiError(error) || isValidationError(error) || isNetworkError(error);
}
