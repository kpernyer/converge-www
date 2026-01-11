// React hooks for fetching Signals articles

import { useState, useEffect, useCallback } from 'react';
import type { Article, ArticleIndex } from '@/api/signals';
import { fetchArticleIndex, fetchArticle } from '@/api/signalsClient';
import { articles as staticArticles, getArticleBySlug } from '../data/articles';

type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T; source: 'remote' | 'static' }
  | { status: 'error'; error: string; fallbackData?: T };

/**
 * Hook to fetch the article index with fallback to static data
 *
 * Initializes with static data immediately to prevent CLS (Cumulative Layout Shift).
 * Optionally fetches remote data in the background for dynamic updates.
 */
export function useArticleIndex(options?: { fetchRemote?: boolean }) {
  const { fetchRemote = false } = options ?? {};

  // Initialize with static data to prevent layout shift
  const [state, setState] = useState<FetchState<ArticleIndex>>({
    status: 'success',
    data: staticArticles,
    source: 'static',
  });

  const fetchIndex = useCallback(async () => {
    const result = await fetchArticleIndex();

    if (result.ok) {
      setState({ status: 'success', data: result.value, source: 'remote' });
    }
    // On error, keep existing static data (no state change needed)
  }, []);

  useEffect(() => {
    if (fetchRemote) {
      void fetchIndex();
    }
  }, [fetchRemote, fetchIndex]);

  return {
    state,
    refetch: fetchIndex,
  };
}

/**
 * Hook to fetch a single article by slug with fallback to static data
 *
 * Initializes with static data immediately to prevent CLS (Cumulative Layout Shift).
 * Optionally fetches remote data in the background for dynamic updates.
 */
export function useArticle(slug: string | undefined, options?: { fetchRemote?: boolean }) {
  const { fetchRemote = false } = options ?? {};

  // Initialize with static data to prevent layout shift
  const staticArticle = slug ? getArticleBySlug(slug) : undefined;
  const [state, setState] = useState<FetchState<Article>>(() => {
    if (!slug) {
      return { status: 'error', error: 'No slug provided' };
    }
    if (staticArticle) {
      return { status: 'success', data: staticArticle, source: 'static' };
    }
    return { status: 'error', error: 'Article not found' };
  });

  const fetchArticleData = useCallback(async () => {
    if (!slug) return;

    const result = await fetchArticle(slug);

    if (result.ok) {
      setState({ status: 'success', data: result.value, source: 'remote' });
    }
    // On error, keep existing static data (no state change needed)
  }, [slug]);

  useEffect(() => {
    if (fetchRemote && slug) {
      void fetchArticleData();
    }
  }, [fetchRemote, slug, fetchArticleData]);

  return {
    state,
    refetch: fetchArticleData,
  };
}
