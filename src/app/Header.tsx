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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={handleNavClick}>
          <span className={styles.logoMark}>&#9654;</span>
          <span className={styles.logoText}>converge</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger} />
        </button>

        {/* Navigation */}
        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
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
                    onClick={handleNavClick}
                  >
                    <span className={styles.dropdownName}>{sub.name}</span>
                    <span className={styles.dropdownDesc}>{sub.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/manifesto" className={styles.link} onClick={handleNavClick}>
            Manifesto
          </Link>
          <Link to="/signals" className={styles.link} onClick={handleNavClick}>
            Signals
          </Link>
        </nav>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>
    </header>
  );
}
