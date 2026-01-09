import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoMark}>&#9654;</span>
          <span className={styles.logoText}>converge</span>
        </a>
        <nav className={styles.nav}>
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
      </div>
    </header>
  );
}
