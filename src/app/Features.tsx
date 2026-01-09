import styles from './Features.module.css';

const features = [
  {
    title: 'Deterministic Convergence',
    description: 'Every execution path leads to the same final state. No race conditions, no hidden divergence.',
  },
  {
    title: 'Monotonic Context',
    description: 'Facts can only be added, never removed. The context grows predictably, enabling reliable reasoning.',
  },
  {
    title: 'Agent Idempotency',
    description: 'Running an agent twice with the same context produces the same effects. Safe to retry, safe to parallelize.',
  },
  {
    title: 'No Hidden State',
    description: 'All state lives in the context. No global variables, no side channels, no surprises.',
  },
  {
    title: 'Starvation Freedom',
    description: 'Every enabled agent eventually runs. Progress is guaranteed by the scheduler.',
  },
  {
    title: 'Formal Proofs',
    description: '9 axioms with mathematical proofs. Not just tested—proven correct.',
  },
];

export function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.title}>Why Converge?</h2>
      <div className={styles.grid}>
        {features.map((feature) => (
          <div key={feature.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
