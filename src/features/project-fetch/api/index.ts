import type {
  ApiResponse,
  ProjectFilters,
  ProjectsResponse,
  BlogFilters,
  BlogPostsResponse,
  ProfileResponse
} from './types';
import type { Project } from '@/entities/project';
import type { BlogPost } from '@/entities/blog-post';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Project methods
  async getProjects(filters: ProjectFilters = {}): Promise<ProjectsResponse> {
    const params = new URLSearchParams();
    
    if (filters.tags?.length) {
      params.set('tags', filters.tags.join(','));
    }
    if (filters.year) {
      params.set('year', filters.year.toString());
    }
    if (filters.limit) {
      params.set('limit', filters.limit.toString());
    }
    if (filters.offset) {
      params.set('offset', filters.offset.toString());
    }

    const endpoint = `/projects${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<Project[]>(endpoint);
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}`);
  }

  // Blog methods
  async getBlogPosts(filters: BlogFilters = {}): Promise<BlogPostsResponse> {
    const params = new URLSearchParams();
    
    if (filters.category) {
      params.set('category', filters.category);
    }
    if (filters.tags?.length) {
      params.set('tags', filters.tags.join(','));
    }
    if (filters.limit) {
      params.set('limit', filters.limit.toString());
    }
    if (filters.offset) {
      params.set('offset', filters.offset.toString());
    }

    const endpoint = `/blog${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<BlogPost[]>(endpoint);
  }

  async getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog/${slug}`);
  }

  // Profile methods
  async getProfile(): Promise<ProfileResponse> {
    return this.request<any>('/profile');
  }
}

export { ApiService }
export const apiService = new ApiService();