import styles from './Analytics.module.css';

const capabilities = [
  {
    name: 'Data-Aware Pipelines',
    description: 'Schema validation, missingness checks, and drift signals before training or inference.',
  },
  {
    name: 'Feature-First Workflow',
    description: 'Deterministic feature extraction with versioned specs for reproducible experiments.',
  },
  {
    name: 'Model Execution',
    description: 'Baseline training today with a path to learned models and evaluation gates.',
  },
  {
    name: 'Traceable Outputs',
    description: 'Facts emitted with provenance so decisions map back to data and features.',
  },
];

const agents = [
  {
    name: 'FeatureAgent',
    description: 'Extracts features from Parquet/CSV data and validates quality signals.',
  },
  {
    name: 'InferenceAgent',
    description: 'Runs Burn-based inference over feature vectors and emits predictions.',
  },
  {
    name: 'Training Agents',
    description: 'Dataset, split, training, evaluation, registry, monitoring, and deployment agents.',
  },
];

const quickstart = [
  'cargo test',
  'cargo run --example agent_loop',
  'cargo run --example training_flow',
];

export function Analytics() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-analytics</p>
        <h1 className={styles.title}>Analytics Agent Stack</h1>
        <p className={styles.subtitle}>
          Deterministic analytics workflows that turn datasets into features, models,
          and structured hypotheses with provenance.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Capabilities</h2>
        <div className={styles.grid}>
          {capabilities.map((capability) => (
            <div key={capability.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{capability.name}</h3>
              <p className={styles.cardDescription}>{capability.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Agents</h2>
        <div className={styles.grid}>
          {agents.map((agent) => (
            <div key={agent.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{agent.name}</h3>
              <p className={styles.cardDescription}>{agent.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quickstart</h2>
        <p className={styles.sectionDescription}>
          Run the feature extraction and training examples to see the analytics stack
          converge on deterministic outputs.
        </p>
        <pre className={styles.codeBlock}>
          <code>{quickstart.join('\n')}</code>
        </pre>
      </section>
    </div>
  );
}
