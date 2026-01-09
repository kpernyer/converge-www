// Zod schemas for API boundary validation

import { z } from 'zod';

// Validation Issue Schema
export const ValidationIssueSchema = z.object({
  location: z.string(),
  category: z.enum(['business_sense', 'compilability', 'convention', 'syntax', 'internal_error']),
  severity: z.enum(['info', 'warning', 'error']),
  message: z.string(),
  suggestion: z.string().optional(),
});

// Job Metadata Schema
export const JobMetadataSchema = z.object({
  cycles: z.number(),
  converged: z.boolean(),
  duration_ms: z.number(),
});

// Context Summary Schema
export const ContextSummarySchema = z.object({
  fact_counts: z.record(z.string(), z.number()),
  version: z.number(),
});

// Job Response Schema
export const JobResponseSchema = z.object({
  metadata: JobMetadataSchema,
  cycles: z.number(),
  converged: z.boolean(),
  context_summary: ContextSummarySchema,
});

// Validate Rules Response Schema
export const ValidateRulesResponseSchema = z.object({
  is_valid: z.boolean(),
  scenario_count: z.number(),
  issues: z.array(ValidationIssueSchema),
  confidence: z.number(),
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
  error: z.string(),
  message: z.string(),
});

// Request Schemas
export const JobRequestSchema = z.object({
  context: z.record(z.string(), z.unknown()).optional(),
});

export const ValidateRulesRequestSchema = z.object({
  content: z.string(),
  file_name: z.string().optional(),
  use_llm: z.boolean().optional(),
});
