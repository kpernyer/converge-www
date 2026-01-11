import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Stop agent drift.
        <br />
        Converge to an explainable result.
      </h1>
      <p className={styles.subtitle}>
        A formally proven multi-agent runtime with 9 axioms guaranteeing
        deterministic convergence. No hidden state. No starvation.
        Context is everything.
      </p>
      <div className={styles.cta}>
        <Link to="/manifesto" className={styles.primary}>
          Read the Manifesto
        </Link>
        <Link to="/demo" className={styles.secondary}>
          See it in action
        </Link>
      </div>
    </section>
  );
}
