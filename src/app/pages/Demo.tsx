import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Terminal } from '../components/Terminal';
import { DemoRequest } from '../components/DemoRequest';
import { demos } from '../data/demoContent';
import styles from './Demo.module.css';

export function Demo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDemo, setActiveDemo] = useState(demos[0]);
  const [showDemoRequest, setShowDemoRequest] = useState(false);

  useEffect(() => {
    if (searchParams.get('request') === 'true') {
      setShowDemoRequest(true);
    }
  }, [searchParams]);

  const handleCloseDemoRequest = () => {
    setShowDemoRequest(false);
    setSearchParams({});
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>See it in action</p>
        <h1 className={styles.title}>Live Demos</h1>
        <p className={styles.subtitle}>
          Watch the Converge engine execute real use cases.
          Navigate with arrow keys, space/b for page up/down, or use the controls.
        </p>
      </header>

      {showDemoRequest && (
        <section className={styles.demoRequest}>
          <DemoRequest onClose={handleCloseDemoRequest} />
        </section>
      )}

      <section className={styles.selector}>
        {demos.map((demo) => (
          <button
            key={demo.id}
            className={`${styles.demoButton} ${activeDemo.id === demo.id ? styles.active : ''}`}
            onClick={() => setActiveDemo(demo)}
          >
            <span className={styles.demoTitle}>{demo.title}</span>
            <span className={styles.demoDescription}>{demo.description}</span>
          </button>
        ))}
      </section>

      <section className={styles.terminal}>
        <Terminal
          content={activeDemo.content}
          title={`converge run --verbose ${activeDemo.id}`}
          linesPerPage={24}
        />
      </section>

      <section className={styles.controls}>
        <h3 className={styles.controlsTitle}>Keyboard Controls</h3>
        <div className={styles.keyGrid}>
          <div className={styles.key}>
            <kbd>Space</kbd>
            <span>Page down</span>
          </div>
          <div className={styles.key}>
            <kbd>b</kbd>
            <span>Page up</span>
          </div>
          <div className={styles.key}>
            <kbd>↑</kbd> <kbd>↓</kbd>
            <span>Scroll line</span>
          </div>
          <div className={styles.key}>
            <kbd>g</kbd>
            <span>Go to start</span>
          </div>
          <div className={styles.key}>
            <kbd>G</kbd>
            <span>Go to end</span>
          </div>
        </div>
      </section>

      {!showDemoRequest && (
        <section className={styles.cta}>
          <p className={styles.ctaText}>Want to see Converge in action with your use case?</p>
          <button
            className={styles.ctaButton}
            onClick={() => setShowDemoRequest(true)}
          >
            Set up a demo
          </button>
        </section>
      )}
    </div>
  );
}
