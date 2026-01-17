# Architecture — Summary

## Canonical Sources

- [knowledgebase/consolidated/07_architecture.md](../../knowledgebase/consolidated/07_architecture.md)

## Local Docs

- [README.md](README.md)

## Notes

# Architecture

Architecture describes how convergence is executed, validated, and scaled.

## Key Points

- Convergence semantics define fixed-point behavior.
- Engine execution model separates proposals from accepted facts.
- Crate layering enforces dependency direction: core -> provider -> domain -> tool -> runtime.
- Provider layer implements capability ports (LLM, embedding, vector, reranking) with model selection.
- Specialized agent stacks (e.g., converge-analytics, converge-llm) provide domain-specific agent capabilities.
- Failure modes and scaling models are first-class design constraints.

## Source Map

- `docs/architecture/CORE_CONCEPTS.md`
- `docs/architecture/CONVERGENCE_SEMANTICS.md`
- `docs/architecture/ENGINE_EXECUTION_MODEL.md`
- `docs/architecture/FAILURE_MODES.md`
- `docs/architecture/SCALING_MODEL.md`
- `docs/ARCHITECTURE_OVERVIEW.md`
- `converge-runtime/docs/architecture/ARCHITECTURE.md`
- `converge-platform/converge-core/README.md`
- `converge-platform/converge-provider/README.md`
- `converge-platform/converge-domain/README.md`
- `converge-analytics/README.md` - Analytics-focused agent stack for ML workflows