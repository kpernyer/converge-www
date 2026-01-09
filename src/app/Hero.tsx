import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.tagline}>Correctness-first multi-agent runtime</p>
      <h1 className={styles.title}>
        The engine is not built on jelly.
      </h1>
      <p className={styles.subtitle}>
        A formally proven multi-agent runtime with 9 axioms guaranteeing
        deterministic convergence. No hidden state. No starvation.
        Context is everything.
      </p>
      <div className={styles.cta}>
        <a href="https://docs.rs/converge-core" className={styles.primary}>
          Read the Docs
        </a>
        <a href="https://github.com/kpernyer/converge-core" className={styles.secondary}>
          View Source
        </a>
      </div>
      <div className={styles.version}>
        <code>converge-core = "0.5"</code>
      </div>
    </section>
  );
}
