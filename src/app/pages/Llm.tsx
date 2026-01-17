import styles from './Llm.module.css';

const contracts = [
  {
    name: 'PromptStack',
    description: 'Five-layer cognitive API that keeps prompts structured and versioned.',
  },
  {
    name: 'PromptVersion',
    description: 'Prompt and model lineage binding to prevent silent drift.',
  },
  {
    name: 'validate_for()',
    description: 'Compatibility checks across tokenizer, context budget, and model family.',
  },
  {
    name: 'InferenceEnvelope',
    description: 'Deterministic inference envelopes with explicit seed policies.',
  },
  {
    name: 'OutputContract',
    description: 'Output shape constraints enforced before facts are emitted.',
  },
];

const components = [
  {
    name: 'LlamaEngine',
    description: 'Burn-backed inference engine for Llama-style models.',
  },
  {
    name: 'Decision Chains',
    description: 'Reasoning -> evaluation -> planning pipeline with trace artifacts.',
  },
  {
    name: 'State Injection',
    description: 'Structured inputs from Polars metrics and analytics pipelines.',
  },
];

const quickstart = [
  'cargo build',
  'cargo test',
  'cargo run --example inference_agent',
  'cargo run --example contract_stress',
];

export function Llm() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-llm</p>
        <h1 className={styles.title}>LLM Reasoning Kernel</h1>
        <p className={styles.subtitle}>
          Contract-driven inference that makes agent reasoning deterministic,
          auditable, and safe to evolve.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reasoning Contracts</h2>
        <div className={styles.grid}>
          {contracts.map((contract) => (
            <div key={contract.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{contract.name}</h3>
              <p className={styles.cardDescription}>{contract.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Kernel Components</h2>
        <div className={styles.grid}>
          {components.map((component) => (
            <div key={component.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{component.name}</h3>
              <p className={styles.cardDescription}>{component.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quickstart</h2>
        <p className={styles.sectionDescription}>
          Run the inference and stress-test examples to see the reasoning kernel
          enforce contracts on outputs.
        </p>
        <pre className={styles.codeBlock}>
          <code>{quickstart.join('\n')}</code>
        </pre>
      </section>
    </div>
  );
}
