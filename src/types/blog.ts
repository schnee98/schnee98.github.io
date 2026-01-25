/**
 * Blog-specific type definitions for static site generation
 */

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  category?: string;
  tags?: string[];
}

export interface ParsedBlogPost {
  slug: string;
  title: string;
  date: Date;
  description: string;
  thumbnail: string;
  category?: string;
  tags?: string[];
  content: string;
  imageUrl?: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: Date;
  description: string;
  thumbnail: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface BlogPostContent {
  metadata: BlogPostMetadata;
  content: string;
}

export interface BlogListItem {
  slug: string;
  title: string;
  date: Date;
  description: string;
  thumbnail: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}

export type BlogPostSortOrder = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export interface BlogFilterOptions {
  category?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}