// React hooks for fetching Signals articles

import { useState, useEffect, useCallback } from 'react';
import type { Article, ArticleIndex } from '@/api/signals';
import {
  fetchArticleIndex,
  fetchArticle,
  isSignalsFetchError,
} from '@/api/signalsClient';
import { articles as staticArticles, getArticleBySlug } from '../data/articles';

type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T; source: 'remote' | 'static' }
  | { status: 'error'; error: string; fallbackData?: T };

/**
 * Hook to fetch the article index with fallback to static data
 */
export function useArticleIndex() {
  const [state, setState] = useState<FetchState<ArticleIndex>>({ status: 'idle' });

  const fetchIndex = useCallback(async () => {
    setState({ status: 'loading' });

    const result = await fetchArticleIndex();

    if (result.ok) {
      setState({ status: 'success', data: result.value, source: 'remote' });
    } else {
      // Fall back to static data
      console.warn('Failed to fetch article index, using static data:', result.error.message);
      setState({
        status: 'success',
        data: staticArticles,
        source: 'static',
      });
    }
  }, []);

  useEffect(() => {
    void fetchIndex();
  }, [fetchIndex]);

  return {
    state,
    refetch: fetchIndex,
  };
}

/**
 * Hook to fetch a single article by slug with fallback to static data
 */
export function useArticle(slug: string | undefined) {
  const [state, setState] = useState<FetchState<Article>>({ status: 'idle' });

  const fetchArticleData = useCallback(async () => {
    if (!slug) {
      setState({ status: 'error', error: 'No slug provided' });
      return;
    }

    setState({ status: 'loading' });

    const result = await fetchArticle(slug);

    if (result.ok) {
      setState({ status: 'success', data: result.value, source: 'remote' });
    } else {
      // Fall back to static data
      const staticArticle = getArticleBySlug(slug);

      if (staticArticle) {
        console.warn('Failed to fetch article, using static data:', result.error.message);
        setState({
          status: 'success',
          data: staticArticle,
          source: 'static',
        });
      } else if (isSignalsFetchError(result.error) && result.error.statusCode === 404) {
        setState({ status: 'error', error: 'Article not found' });
      } else {
        setState({ status: 'error', error: result.error.message });
      }
    }
  }, [slug]);

  useEffect(() => {
    void fetchArticleData();
  }, [fetchArticleData]);

  return {
    state,
    refetch: fetchArticleData,
  };
}
