import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const subsystems = [
  { path: '/core', name: 'converge-core', description: 'The runtime engine' },
  { path: '/provider', name: 'converge-provider', description: 'LLM abstraction layer' },
  { path: '/domain', name: 'converge-domain', description: 'Domain agents' },
  { path: '/tools', name: 'converge-tool', description: 'Rules & validation' },
  { path: '/ledger', name: 'converge-ledger', description: 'Audit trail (Elixir)' },
];

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>&#9654;</span>
          <span className={styles.logoText}>converge</span>
        </Link>
        <nav className={styles.nav}>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              Subsystems
              <span className={styles.chevron}>&#9662;</span>
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                {subsystems.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    className={styles.dropdownItem}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className={styles.dropdownName}>{sub.name}</span>
                    <span className={styles.dropdownDesc}>{sub.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/manifesto" className={styles.link}>
            Manifesto
          </Link>
          <Link to="/signals" className={styles.link}>
            Signals
          </Link>
        </nav>
      </div>
    </header>
  );
}
