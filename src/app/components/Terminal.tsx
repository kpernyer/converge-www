import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Terminal.module.css';

interface TerminalProps {
  content: string;
  title?: string;
  linesPerPage?: number;
}

export function Terminal({ content, title = 'terminal', linesPerPage = 20 }: TerminalProps) {
  const lines = content.split('\n');
  const totalLines = lines.length;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxScroll = Math.max(0, totalLines - linesPerPage);
  const overlap = 3; // Lines of overlap when paging

  const scrollTo = useCallback((position: number) => {
    const newPosition = Math.max(0, Math.min(maxScroll, position));
    if (newPosition !== scrollPosition) {
      setIsAnimating(true);
      setScrollPosition(newPosition);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [maxScroll, scrollPosition]);

  const pageDown = useCallback(() => {
    scrollTo(scrollPosition + linesPerPage - overlap);
  }, [scrollPosition, linesPerPage, overlap, scrollTo]);

  const pageUp = useCallback(() => {
    scrollTo(scrollPosition - linesPerPage + overlap);
  }, [scrollPosition, linesPerPage, overlap, scrollTo]);

  const scrollDown = useCallback(() => {
    scrollTo(scrollPosition + 1);
  }, [scrollPosition, scrollTo]);

  const scrollUp = useCallback(() => {
    scrollTo(scrollPosition - 1);
  }, [scrollPosition, scrollTo]);

  const goToStart = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  const goToEnd = useCallback(() => {
    scrollTo(maxScroll);
  }, [maxScroll, scrollTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) &&
          document.activeElement !== containerRef.current) {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'PageDown':
          e.preventDefault();
          pageDown();
          break;
        case 'b':
        case 'PageUp':
          e.preventDefault();
          pageUp();
          break;
        case 'j':
        case 'ArrowDown':
          e.preventDefault();
          scrollDown();
          break;
        case 'k':
        case 'ArrowUp':
          e.preventDefault();
          scrollUp();
          break;
        case 'g':
          e.preventDefault();
          goToStart();
          break;
        case 'G':
          e.preventDefault();
          goToEnd();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageDown, pageUp, scrollDown, scrollUp, goToStart, goToEnd]);

  const visibleLines = lines.slice(scrollPosition, scrollPosition + linesPerPage);
  const progress = totalLines <= linesPerPage ? 100 : Math.round((scrollPosition + linesPerPage) / totalLines * 100);
  const atEnd = scrollPosition >= maxScroll;
  const atStart = scrollPosition === 0;

  return (
    <div
      className={styles.terminal}
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Terminal output"
    >
      <div className={styles.header}>
        <div className={styles.buttons}>
          <span className={styles.button} data-color="red" />
          <span className={styles.button} data-color="yellow" />
          <span className={styles.button} data-color="green" />
        </div>
        <span className={styles.title}>{title}</span>
        <span className={styles.position}>
          {scrollPosition + 1}-{Math.min(scrollPosition + linesPerPage, totalLines)} of {totalLines}
        </span>
      </div>

      <div className={`${styles.content} ${isAnimating ? styles.animating : ''}`}>
        <pre className={styles.pre}>
          {visibleLines.map((line, i) => (
            <div key={scrollPosition + i} className={styles.line}>
              <span className={styles.lineNumber}>{scrollPosition + i + 1}</span>
              <span className={styles.lineContent}>{line || ' '}</span>
            </div>
          ))}
        </pre>
      </div>

      <div className={styles.footer}>
        <div className={styles.controls}>
          <button
            className={styles.control}
            onClick={goToStart}
            disabled={atStart}
            title="Go to start (g)"
          >
            ⇤
          </button>
          <button
            className={styles.control}
            onClick={pageUp}
            disabled={atStart}
            title="Page up (b)"
          >
            ↑
          </button>
          <button
            className={styles.control}
            onClick={pageDown}
            disabled={atEnd}
            title="Page down (space)"
          >
            ↓
          </button>
          <button
            className={styles.control}
            onClick={goToEnd}
            disabled={atEnd}
            title="Go to end (G)"
          >
            ⇥
          </button>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.hint}>
          {atEnd ? '(END)' : `${progress}%`}
        </span>
      </div>
    </div>
  );
}
