import { Link } from 'react-router-dom';
import { useArticleIndex } from '../hooks/useSignals';
import styles from './Signals.module.css';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Signals() {
  const { state } = useArticleIndex();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Signals</h1>
        <p className={styles.subtitle}>
          Dispatches from the convergence frontier — architecture, agents, and the
          systems that make them trustworthy.
        </p>
      </header>

      {state.status === 'loading' && (
        <div className={styles.loading}>Loading articles...</div>
      )}

      {state.status === 'error' && (
        <div className={styles.error}>
          <p>Failed to load articles: {state.error}</p>
          {state.fallbackData && state.fallbackData.length > 0 && (
            <p className={styles.fallbackNote}>Showing cached articles.</p>
          )}
        </div>
      )}

      {state.status === 'success' && (
        <>
          <section className={styles.articles}>
            {state.data.map((article) => (
              <article key={article.slug} className={styles.card}>
                <Link to={`/signals/${article.slug}`} className={styles.cardLink}>
                  <div className={styles.cardContent}>
                    <div className={styles.meta}>
                      <time dateTime={article.publishedAt}>
                        {formatDate(article.publishedAt)}
                      </time>
                      <span className={styles.dot}>·</span>
                      <span>{article.readingTime} min read</span>
                    </div>
                    <h2 className={styles.cardTitle}>{article.title}</h2>
                    {article.subtitle && (
                      <p className={styles.cardSubtitle}>{article.subtitle}</p>
                    )}
                    <div className={styles.tags}>
                      {article.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={styles.arrow}>→</span>
                </Link>
              </article>
            ))}
          </section>

          {state.data.length === 0 && (
            <p className={styles.empty}>No signals yet. Check back soon.</p>
          )}
        </>
      )}
    </div>
  );
}
