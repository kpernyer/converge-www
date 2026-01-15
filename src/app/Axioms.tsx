import styles from './Axioms.module.css';

const axioms = [
  { id: 1, name: 'Monotonicity', formula: 'ctx ⊆ step(ctx)' },
  { id: 2, name: 'Determinism', formula: 'step(ctx) = step(ctx)' },
  { id: 3, name: 'Idempotency', formula: 'agent(ctx) = agent(agent(ctx))' },
  { id: 4, name: 'Commutativity', formula: 'a(b(ctx)) = b(a(ctx))' },
  { id: 5, name: 'Termination', formula: '∃n: stepⁿ(ctx) = stepⁿ⁺¹(ctx)' },
  { id: 6, name: 'Consistency', formula: '¬∃(f, ¬f) ∈ ctx' },
  { id: 7, name: 'Starvation Freedom', formula: 'enabled(a) ⇒ ◇runs(a)' },
  { id: 8, name: 'Confluence', formula: 'ctx₁ ∪ ctx₂ → ctx*' },
  { id: 9, name: 'Observability', formula: '∀effect: logged(effect)' },
];

export function Axioms() {
  return (
    <section className={styles.axioms}>
      <h2 className={styles.title}>The 9 Axioms</h2>
      <p className={styles.subtitle}>
        Mathematical guarantees that make multi-agent systems predictable.
        Only these 9 are axioms; design tenets are principles.
      </p>
      <div className={styles.grid}>
        {axioms.map((axiom) => (
          <div key={axiom.id} className={styles.axiom}>
            <span className={styles.number}>{axiom.id}</span>
            <div className={styles.content}>
              <h3 className={styles.name}>{axiom.name}</h3>
              <code className={styles.formula}>{axiom.formula}</code>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
