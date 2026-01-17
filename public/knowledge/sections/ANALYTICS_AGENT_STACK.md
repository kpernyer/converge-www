# Analytics Agent Stack — Summary

## Canonical Sources

- [knowledgebase/consolidated/ANALYTICS_AGENT_STACK.md](../../knowledgebase/consolidated/ANALYTICS_AGENT_STACK.md)

## Local Docs

- [README.md](README.md)

## Notes

# Converge Analytics Agent Stack

**Date:** January 2026  
**Status:** Active Development  
**Repository:** `converge-analytics`

---

## Overview

Converge Analytics is an analytics-focused agent stack built on the Converge
platform. It transforms datasets into features, runs model inference, and emits
hypotheses as structured facts, while maintaining convergence guarantees and
semantic governance.

**Core Purpose:** Provide data science and machine learning workflows with
traceability, determinism, and composability.

---

## Key Characteristics

### Data-Aware
- Understands dataset schemas, missing values, and data quality
- Validates data integrity before processing
- Detects data drift and quality issues

### Feature-First
- Generates deterministic feature vectors from raw inputs
- Applies feature engineering specifications consistently
- Supports normalization, encoding, and interaction features

### Model-Capable
- Trains or loads models and runs inference on features
- Supports baseline models and learned models
- Integrates with ML frameworks (Burn, planned: others)

### Traceable
- Emits facts/proposals with provenance and confidence
- Complete audit trail for ML decisions
- Links predictions back to source data and features

### Composable
- Agents can be chained (features -> embeddings -> training -> inference)
- Integrates with business domain agents (e.g., Pricing Pack optimization)
- Works with other Converge components

### Repeatable
- Deterministic runs with versioned data and models
- Reproducible experiments with same inputs -> same outputs
- Version control for datasets, features, and models

---

## Architecture

### Technology Stack

- **Language:** Rust (Edition 2024)
- **Data Processing:** Polars (0.51.0)
- **ML Framework:** Burn (0.20.0)
- **Data Formats:** Parquet, CSV
- **Dataset Sources:** HuggingFace datasets
- **Planned:** SurrealDB (storage), LanceDB (vector ops)

### Core Components

#### FeatureAgent (`src/engine.rs`)
- Extracts features from Parquet/CSV data using Polars
- Generates deterministic feature vectors
- Applies feature engineering specifications
- Validates data quality and schema

#### InferenceAgent (`src/model.rs`)
- Runs model inference on feature vectors
- Uses Burn framework for ML model execution
- Emits predictions as structured facts
- Supports baseline and learned models

#### Training Agents (`src/training.rs`)
- **DatasetAgent:** Downloads and manages datasets
- **SplitAgent:** Splits data into train/val/inference sets
- **TrainingAgent:** Trains models with evaluation
- **EvaluationAgent:** Computes metrics (MAE, success ratio)
- **ModelRegistryAgent:** Versions and stores models
- **MonitoringAgent:** Tracks model performance and drift
- **DeploymentAgent:** Manages deployment decisions

---

## Current Implementation Status

### Implemented (Real Behavior)

- Dataset download for training flow from HuggingFace parquet shards
- Dataset splitting into train/val/infer sets based on TrainingPlan
- Feature extraction using Polars (reads from Parquet/CSV)
- Baseline training that computes mean of numeric target column
- Evaluation that computes MAE and derived success ratio
- Sample inference comparing predictions vs. actuals
- Basic convergence loop for agent_loop and training_flow examples

### Implemented (Minimal / Simplified)

- Feature extraction uses first two numeric columns or configured columns
- Model is baseline mean predictor, not learned model with features
- Evaluation metrics limited to MAE and normalized success ratio
- Data validation produces missingness, numeric means, outlier counts, drift score
- Feature engineering produces spec but does not apply it
- Hyperparameter search produces plan and fabricated best result
- Model registry writes record derived from latest evaluation only
- Monitoring emits simple status based on evaluation success ratio
- Deployment decision is rule-based gate on quality threshold

### Mock / Placeholder

- Hyperparameter search scoring is heuristic and does not run trials
- Feature specs are not used by training or inference
- Drift detection is simple mean-delta; no statistical test or time window
- Model registry is serialized record without artifact hosting or signatures
- Monitoring and deployment logic not connected to serving
- Inference model in agent_loop is randomly initialized Burn MLP

---

## Integration with Converge Platform

### Dependencies

- **converge-core:** Core agent framework and convergence engine
- **converge-domain:** Domain models and Truths
- **converge-provider:** Provider abstractions

### Use Cases

1. Pricing optimization for historical data
2. Customer analytics for churn prediction and segmentation
3. Performance analytics for forecasting
4. Custom ML workflows for any Pack

---

## Example Workflows

### Feature Extraction -> Inference

```rust
// Example: agent_loop.rs
1. Load dataset from Parquet
2. FeatureAgent extracts features
3. InferenceAgent runs model inference
4. Emit predictions as facts
```

### Training Pipeline

```rust
// Example: training_flow.rs
1. Download dataset from HuggingFace
2. Split into train/val/infer sets
3. FeatureAgent extracts features
4. TrainingAgent trains baseline model
5. EvaluationAgent computes metrics
6. ModelRegistryAgent stores model
7. Sample inference on inference set
```

---

## Roadmap

### Priority 1: Core Functionality
1. Wire feature specs into training and inference
2. Replace baseline mean model with learned model
3. Implement real hyperparameter search

### Priority 2: Production Readiness
4. Add persistent model registry storage and evaluation artifacts
5. Improve monitoring with drift, bias, and live tracking
6. Add deployment orchestration and retraining triggers

### Priority 3: Advanced Features
7. Support for embeddings and vector databases (LanceDB)
8. Advanced feature engineering (polynomial, time-based)
9. Model ensemble support
10. Real-time inference serving

---

## Quickstart

```bash
cargo test
cargo run --example agent_loop
cargo run --example training_flow
```

---

## Related Documentation

- [ARCHITECTURE_OVERVIEW.md](../docs/ARCHITECTURE_OVERVIEW.md) - System architecture including analytics
- [converge-analytics/README.md](../../../converge-analytics/README.md) - Repository README
- [converge-analytics/PLAN.md](../../../converge-analytics/PLAN.md) - Implementation plan and status
- [converge-analytics/Agents.md](../../../converge-analytics/Agents.md) - Rust best practices for the repo
- [LLM_AGENT_STACK.md](LLM_AGENT_STACK.md) - LLM reasoning kernel documentation

---

## Business Value

### For Data Scientists
- **Reproducibility:** Deterministic workflows with versioned data and models
- **Traceability:** Complete provenance for ML decisions
- **Composability:** Integrates with business domain agents

### For Business Users
- **Trust:** ML predictions backed by convergence guarantees
- **Explainability:** Understand why predictions were made
- **Integration:** Analytics agents work with business workflows

### For Platform
- **Extensibility:** Specialized agent stacks demonstrate flexibility
- **Use Cases:** Enables data-driven Packs
- **Differentiation:** ML workflows with semantic governance

---

## Version History

- **v0.1.1** (2026-01): Initial implementation with feature extraction and baseline training
- **v0.1.0** (2026-01): Initial repository structure and planning
