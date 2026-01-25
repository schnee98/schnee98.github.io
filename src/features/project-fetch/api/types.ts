import type { Project } from '@/entities/project';
import type { BlogPost } from '@/entities/blog-post';
import type { Profile } from '@/entities/profile';

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Project API
export interface ProjectFilters {
  tags?: string[];
  year?: number;
  limit?: number;
  offset?: number;
}

export interface ProjectsResponse extends ApiResponse<Project[]> {
  pagination?: {
    total: number;
    hasMore: boolean;
  };
}

// Blog API  
export interface BlogFilters {
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface BlogPostsResponse extends ApiResponse<BlogPost[]> {
  pagination?: {
    total: number;
    hasMore: boolean;
  };
}

// Profile API
export interface ProfileResponse extends ApiResponse<Profile> {}