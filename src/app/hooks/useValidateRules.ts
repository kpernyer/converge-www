// Custom hook for rule validation with API and local fallback

import { useState, useCallback } from 'react';
import { api, type ValidationIssue, type ValidateRulesResponse } from '../../api';
import { isConvergeApiError, isValidationError } from '../../api/guards';

// Client-side validation fallback
function validateRuleLocally(text: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lines = text.split('\n');

  if (!lines.some(l => l.trim().startsWith('Feature:'))) {
    issues.push({
      location: 'File',
      category: 'convention',
      severity: 'error',
      message: 'Missing Feature declaration',
      suggestion: 'Add a Feature: line at the top',
    });
  }

  const hasGiven = lines.some(l => l.trim().startsWith('Given'));
  const hasWhen = lines.some(l => l.trim().startsWith('When'));
  const hasThen = lines.some(l => l.trim().startsWith('Then'));

  if (!hasGiven) {
    issues.push({
      location: 'Scenario',
      category: 'convention',
      severity: 'warning',
      message: 'Missing Given clause (preconditions)',
      suggestion: 'Add preconditions with Given steps',
    });
  }
  if (!hasWhen) {
    issues.push({
      location: 'Scenario',
      category: 'convention',
      severity: 'warning',
      message: 'Missing When clause (action)',
      suggestion: 'Add an action with When steps',
    });
  }
  if (!hasThen) {
    issues.push({
      location: 'Scenario',
      category: 'convention',
      severity: 'error',
      message: 'Missing Then clause (expected outcome)',
      suggestion: 'Add expected outcomes with Then steps',
    });
  }

  const uncertainWords = ['might', 'maybe', 'possibly', 'probably'];
  for (const word of uncertainWords) {
    if (text.toLowerCase().includes(word)) {
      issues.push({
        location: 'Content',
        category: 'convention',
        severity: 'warning',
        message: `Uncertain language detected: "${word}"`,
        suggestion: 'Use definite language for testable assertions',
      });
    }
  }

  return issues;
}

type ValidationErrorType =
  | { type: 'network'; message: string }
  | { type: 'api'; status: number; message: string }
  | { type: 'validation'; message: string };

type ValidationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; result: ValidateRulesResponse; mode: 'api' | 'local' }
  | { status: 'error'; error: ValidationErrorType; mode: 'api' | 'local' };

/**
 * Custom hook for validating Converge rules.
 * Handles API validation with automatic fallback to local validation.
 */
export function useValidateRules() {
  const [state, setState] = useState<ValidationState>({ status: 'idle' });

  const validate = useCallback(async (content: string, useLlm: boolean) => {
    setState({ status: 'loading' });

    // Try API validation first
    const result = await api.validateRules({
      content,
      file_name: 'rules.feature',
      use_llm: useLlm,
    });

    if (result.ok) {
      setState({ status: 'success', result: result.value, mode: 'api' });
      return;
    }

    // Handle API errors with proper logging
    const error = result.error;

    if (isConvergeApiError(error)) {
      // Log API error (without tokens/PII)
      console.error('API validation failed:', {
        status: error.status,
        message: error.message,
        endpoint: '/api/v1/validate-rules',
      });

      // Fall back to local validation on API errors
      const issues = validateRuleLocally(content);
      setState({
        status: 'success',
        result: {
          is_valid: issues.filter(i => i.severity === 'error').length === 0,
          scenario_count: 0,
          issues,
          confidence: 0.5,
        },
        mode: 'local',
      });
    } else if (isValidationError(error)) {
      // Log validation error
      console.error('Response validation failed:', error.validationErrors);

      setState({
        status: 'error',
        error: {
          type: 'validation',
          message: 'API returned invalid response format',
        },
        mode: 'api',
      });
    } else {
      // Network or unknown error
      console.error('Network error during validation:', error);

      // Fall back to local validation on network errors
      const issues = validateRuleLocally(content);
      setState({
        status: 'success',
        result: {
          is_valid: issues.filter(i => i.severity === 'error').length === 0,
          scenario_count: 0,
          issues,
          confidence: 0.5,
        },
        mode: 'local',
      });
    }
  }, []);

  return {
    state,
    validate,
  };
}
