// Zod schemas for API boundary validation
// Types are inferred from these schemas - do not duplicate manually

import { z } from 'zod';

// Shared enums
export const ValidationCategorySchema = z.enum([
  'business_sense',
  'compilability',
  'convention',
  'syntax',
  'internal_error',
]);

export const ValidationSeveritySchema = z.enum(['info', 'warning', 'error']);

export const ServiceStatusSchema = z.enum(['ready', 'degraded', 'unavailable']);

export const HealthStatusSchema = z.enum(['healthy', 'unhealthy']);

export const ApiErrorCodeSchema = z.enum([
  'bad_request',
  'unauthorized',
  'forbidden',
  'not_found',
  'validation_failed',
  'internal_error',
  'service_unavailable',
  'network_error',
  'unknown',
]);

// Validation Issue Schema
export const ValidationIssueSchema = z.object({
  location: z.string(),
  category: ValidationCategorySchema,
  severity: ValidationSeveritySchema,
  message: z.string(),
  suggestion: z.string().optional(),
});

// Job Metadata Schema
export const JobMetadataSchema = z.object({
  cycles: z.number().int().nonnegative(),
  converged: z.boolean(),
  duration_ms: z.number().nonnegative(),
});

// Context Summary Schema
export const ContextSummarySchema = z.object({
  fact_counts: z.record(z.string(), z.number().int().nonnegative()),
  version: z.number().int().nonnegative(),
});

// Job Response Schema
export const JobResponseSchema = z.object({
  metadata: JobMetadataSchema,
  cycles: z.number().int().nonnegative(),
  converged: z.boolean(),
  context_summary: ContextSummarySchema,
});

// Validate Rules Response Schema
export const ValidateRulesResponseSchema = z.object({
  is_valid: z.boolean(),
  scenario_count: z.number().int().nonnegative(),
  issues: z.array(ValidationIssueSchema),
  confidence: z.number().min(0).max(1),
});

// Health Response Schema
export const HealthResponseSchema = z.object({
  status: z.string(),
});

// Ready Response Schema
export const ReadyResponseSchema = z.object({
  status: z.string(),
  services: z.record(z.string(), z.string()),
});

// API Error Schema
export const ApiErrorSchema = z.object({
  error: ApiErrorCodeSchema.or(z.string()),
  message: z.string(),
});

// Request Schemas
export const JobRequestSchema = z.object({
  context: z.record(z.string(), z.unknown()).optional(),
});

export const ValidateRulesRequestSchema = z.object({
  content: z.string().min(1),
  file_name: z.string().optional(),
  use_llm: z.boolean().optional(),
});

// Inferred types from schemas
export type ValidationCategory = z.infer<typeof ValidationCategorySchema>;
export type ValidationSeverity = z.infer<typeof ValidationSeveritySchema>;
export type ServiceStatus = z.infer<typeof ServiceStatusSchema>;
export type HealthStatus = z.infer<typeof HealthStatusSchema>;
export type ApiErrorCode = z.infer<typeof ApiErrorCodeSchema>;
export type ValidationIssue = z.infer<typeof ValidationIssueSchema>;
export type JobMetadata = z.infer<typeof JobMetadataSchema>;
export type ContextSummary = z.infer<typeof ContextSummarySchema>;
export type JobResponse = z.infer<typeof JobResponseSchema>;
export type ValidateRulesResponse = z.infer<typeof ValidateRulesResponseSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type ReadyResponse = z.infer<typeof ReadyResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type JobRequest = z.infer<typeof JobRequestSchema>;
export type ValidateRulesRequest = z.infer<typeof ValidateRulesRequestSchema>;
