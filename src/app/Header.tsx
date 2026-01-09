import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>&#9654;</span>
          <span className={styles.logoText}>converge</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/domain" className={styles.link}>
            Domain
          </Link>
          <Link to="/provider" className={styles.link}>
            Provider
          </Link>
          <Link to="/tools" className={styles.link}>
            Tools
          </Link>
          <span className={styles.divider}>|</span>
          <a href="https://docs.rs/converge-core" className={styles.link}>
            Docs
          </a>
          <a href="https://github.com/kpernyer/converge-core" className={styles.link}>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
