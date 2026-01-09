// Converge Runtime API Types

export interface JobRequest {
  context?: Record<string, unknown>;
}

export interface JobMetadata {
  cycles: number;
  converged: boolean;
  duration_ms: number;
}

export interface ContextSummary {
  fact_counts: Record<string, number>;
  version: number;
}

export interface JobResponse {
  metadata: JobMetadata;
  cycles: number;
  converged: boolean;
  context_summary: ContextSummary;
}

export interface ValidateRulesRequest {
  content: string;
  file_name?: string;
  use_llm?: boolean;
}

export interface ValidationIssue {
  location: string;
  category: 'business_sense' | 'compilability' | 'convention' | 'syntax' | 'internal_error';
  severity: 'info' | 'warning' | 'error';
  message: string;
  suggestion?: string;
}

export interface ValidateRulesResponse {
  is_valid: boolean;
  scenario_count: number;
  issues: ValidationIssue[];
  confidence: number;
}

export interface HealthResponse {
  status: string;
}

export interface ReadyResponse {
  status: string;
  services: Record<string, string>;
}

export interface ApiError {
  error: string;
  message: string;
}
