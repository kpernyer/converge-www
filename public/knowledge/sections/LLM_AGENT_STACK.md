# LLM Agent Stack — Summary

## Canonical Sources

- [knowledgebase/consolidated/LLM_AGENT_STACK.md](../../knowledgebase/consolidated/LLM_AGENT_STACK.md)

## Local Docs

- [README.md](README.md)

## Notes

# Converge LLM Agent Stack

**Date:** January 2026  
**Status:** Active Development  
**Repository:** `converge-llm`

---

## Overview

Converge LLM is a Rust-native reasoning kernel for Converge agents. It provides
a contract-driven LLM stack built on Burn and llama-burn, designed to make
agent reasoning deterministic, auditable, and safe to evolve.

**Core Purpose:** Replace ad-hoc prompting with a reasoning kernel boundary that
enforces compatibility, reproducibility, and output shape guarantees.

---

## Key Characteristics

### Contract-Driven Reasoning
- Prompts are structured into a five-layer `PromptStack`
- Prompt versions are bound to model lineage
- Output contracts define what valid output means per task type

### Compatibility Guardrails
- `validate_for()` prevents silent prompt/model drift
- Context budget, tokenizer, and precision are validated explicitly

### Reproducible Inference
- `InferenceEnvelope` makes determinism explicit and testable
- Seed policies and generation params are captured for audit

### Rust-Native Execution
- Uses Burn for model execution and LoRA readiness
- Tokenization is treated as a correctness concern

### Auditable Decisions
- Decision traces and chains provide forensic artifacts
- Output validation enforces contract compliance

---

## Reasoning Kernel Boundary

The system formalizes five orthogonal contracts:

1. **Cognitive API** -- `PromptStack` (fixed five-layer interface)
2. **Versioning** -- `PromptVersion` (prompt/model lineage binding)
3. **Compatibility** -- `validate_for()` (prompt/model guardrails)
4. **Reproducibility** -- `InferenceEnvelope` (determinism + provenance)
5. **Output Shape** -- `OutputContract` (task-specific output constraints)

These contracts ensure reproducible failures, explicit upgrades, and auditable
agent decisions.

---

## Architecture

### Technology Stack

- **Language:** Rust (Edition 2024)
- **ML Framework:** Burn (0.20.0)
- **Model Backend:** llama-burn (Llama-style transformer inference)
- **Tokenizer:** tiktoken-rs (BPE)
- **Integration:** converge-core agent framework

### Core Components

#### Prompt & Contract Layer (`src/prompt.rs`)
- `PromptStack`, `PromptVersion`, `TaskFrame`, `OutputContract`
- Renders output contracts directly into prompts

#### Configuration & Validation (`src/config.rs`, `src/validation.rs`)
- Model compatibility checks (`validate_for`)
- Output validation against task contracts

#### Inference Engine (`src/inference.rs`, `src/engine.rs`)
- `InferenceEnvelope` with explicit seed policies
- `LlamaEngine` for real inference via llama-burn

#### Agent Integration (`src/agent.rs`, `src/chain.rs`, `src/trace.rs`)
- `LlmAgent` for Converge agent loops
- Decision chains: Reasoning -> Evaluation -> Planning
- Decision trace artifacts for auditability

#### Data Bridge (`src/bridge.rs`)
- Polars metrics -> structured `StateInjection`
- Enables analytics + LLM composition without coupling

---

## Current Implementation Status

### Implemented (Real Behavior)

- PromptStack, PromptVersion, OutputContract
- Compatibility checks (`validate_for`)
- Deterministic inference envelopes
- Output validation against contracts
- Llama inference via `LlamaEngine`
- Decision chain pipeline and trace artifacts
- Contract stress tests (output-side)

### Partial / In Progress

- Adversarial input tests (planned but not run against real models)
- Boundary threshold semantics (specified but not fully enforced)

### Planned

- LoRA-based learning introduction (Phase 4B)
- Training data collection from decision chains

---

## Integration with Converge Platform

### Dependencies

- **converge-core:** Agent framework and convergence engine
- **converge-analytics:** Optional for structured state injection

### Use Cases

1. Reasoning agents with explicit output contracts
2. Evaluation agents with enforced output structure
3. Planning agents with ordered, bounded steps
4. Analytics interpretation from structured metrics

---

## Example Workflows

### Deterministic Inference

```rust
// Example: deterministic inference envelope
let stack = PromptStack::reasoning_v1_llama3();
let envelope = InferenceEnvelope::deterministic("reasoning:v1", 42);
let result = engine.run(&stack, &envelope)?;
```

### Decision Chain (3-Step Pipeline)

```rust
// Reasoning -> Evaluation -> Planning
let chain = ChainExecutor::new()
    .reasoning(stack_a)
    .evaluation(stack_b)
    .planning(stack_c);
```

---

## Roadmap

### Phase 4A: Behavioral Hardening (In Progress)
1. Run adversarial input states against real models
2. Specify boundary threshold semantics

### Phase 4B: Learning Introduction (Planned)
3. Collect training data from completed chains
4. LoRA adapter for evaluation calibration
5. A/B test contract-only vs LoRA

---

## Quickstart

```bash
cargo build
cargo test
cargo run --example inference_agent
cargo run --example golden_test --features "cuda,pretrained"
cargo run --example contract_stress
cargo run --example phase4a_analysis
```

---

## Related Documentation

- [ARCHITECTURE_OVERVIEW.md](../docs/ARCHITECTURE_OVERVIEW.md) - System architecture overview
- [converge-llm/README.md](../../../converge-llm/README.md) - Repository README
- [converge-llm/PLAN.md](../../../converge-llm/PLAN.md) - Implementation plan and status
- [converge-llm/PHASE4_PLAN.md](../../../converge-llm/PHASE4_PLAN.md) - Phase 4 plan
- [ANALYTICS_AGENT_STACK.md](ANALYTICS_AGENT_STACK.md) - Analytics agent stack

---

## Business Value

### For Engineering
- **Determinism:** Reproducible inference with explicit seeds and envelopes
- **Safety:** Compatibility boundaries prevent silent regressions
- **Auditability:** Decision traces and output validation

### For Product
- **Explainability:** Output contracts encode expectations per task
- **Reliability:** Predictable reasoning behavior across upgrades

### For Platform
- **Composability:** Works with analytics and domain agents
- **Differentiation:** Engineering-grade intelligence, not ad-hoc prompting

---

## Version History

- **v0.1.x** (2026-01): Core contracts, inference engine, decision chains
