import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logoMark}>&#9654;</span>
          <span className={styles.logoText}>converge</span>
        </div>
        <nav className={styles.links}>
          <a href="https://docs.rs/converge-core" className={styles.link}>
            Docs
          </a>
          <a href="https://crates.io/crates/converge-core" className={styles.link}>
            crates.io
          </a>
          <a href="https://github.com/kpernyer/converge-core" className={styles.link}>
            GitHub
          </a>
        </nav>
        <p className={styles.copyright}>
          MIT License
        </p>
      </div>
    </footer>
  );
}
