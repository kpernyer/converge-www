// Signals (blog) article types - no runtime dependencies

export interface ArticleMeta {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
}

export interface Article extends ArticleMeta {
  content: string;
}

export type ArticleIndex = ArticleMeta[];
