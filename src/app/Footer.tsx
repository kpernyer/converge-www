import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark}>&#9654;</span>
              <span className={styles.logoText}>converge</span>
            </Link>
            <p className={styles.tagline}>
              Correctness-first multi-agent runtime
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Subsystems</h3>
            <nav className={styles.columnLinks}>
              <Link to="/core">converge-core</Link>
              <Link to="/provider">converge-provider</Link>
              <Link to="/domain">converge-domain</Link>
              <Link to="/runtime">converge-runtime</Link>
              <Link to="/mobile">converge-mobile</Link>
              <Link to="/tools">converge-tool</Link>
              <Link to="/ledger">converge-ledger</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Resources</h3>
            <nav className={styles.columnLinks}>
              <a href="https://docs.rs/converge-core">Documentation</a>
              <a href="https://github.com/kpernyer/converge-core">GitHub</a>
              <Link to="/manifesto">Manifesto</Link>
              <Link to="/signals">Signals</Link>
              <Link to="/presentations">Presentations</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Packages</h3>
            <nav className={styles.columnLinks}>
              <a href="https://crates.io/crates/converge-core">crates.io</a>
              <a href="https://hex.pm/packages/converge_ledger">hex.pm</a>
              <a href="https://ghcr.io/kpernyer/converge-ledger">ghcr.io</a>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>MIT License</p>
          <div className={styles.bottomRight}>
            <span className={styles.version}>{__APP_VERSION__}</span>
            <a href="/signals/feed.xml" className={styles.rss}>RSS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
