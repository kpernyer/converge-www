import styles from './Mobile.module.css';

const sharedPrinciples = [
  {
    name: 'Truths Are the Boundary',
    description: 'Business logic lives in Truths and invariants, not in UI code.',
  },
  {
    name: 'Stream-First',
    description: 'gRPC bidirectional streaming is primary; REST is fallback.',
  },
  {
    name: 'ML as Proposals',
    description: 'Models propose; validators and invariants decide.',
  },
  {
    name: 'Offline + Resume',
    description: 'Idempotent queues and replayable context for mobile reliability.',
  },
];

const androidHighlights = [
  'Smart action prediction with on-device ML (TensorFlow Lite)',
  'Domain-aware JTBD system (Packs, Blueprints, Artifacts)',
  'Jetpack Compose UI + MVVM + StateFlow',
];

const iosHighlights = [
  'Agent-host mindset: policy, budgets, and traceability',
  'SwiftUI UI with gRPC streaming client',
  'HITL support with proposals, approvals, and audit trail',
];

export function Mobile() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-mobile</p>
        <h1 className={styles.title}>Android + iOS Clients</h1>
        <p className={styles.subtitle}>
          Mobile clients that treat Truths as the boundary. Streaming-first,
          deterministic when needed, and built for human-in-the-loop.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shared Principles</h2>
        <div className={styles.grid}>
          {sharedPrinciples.map((item) => (
            <div key={item.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Android Highlights</h2>
        <ul className={styles.list}>
          {androidHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>iOS Highlights</h2>
        <ul className={styles.list}>
          {iosHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
