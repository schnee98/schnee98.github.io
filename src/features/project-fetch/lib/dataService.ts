import type { Project } from '@/entities/project';
import type { BlogPost } from '@/entities/blog-post';
import type { Profile } from '@/entities/profile';
import { apiService } from '../api';

// Fallback to mock data when API is not available
import { projectsData } from '@/shared/data/mockData';
import { blogPostsData } from '@/shared/data/mockData';
import { profileData } from '@/shared/data/mockData';

export class DataService {
  // Projects
  async getProjects(filters: { tags?: string[]; year?: number; limit?: number; offset?: number } = {}) {
    try {
      const response = await apiService.getProjects(filters);
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data for projects');
      let filteredProjects = [...projectsData];

      if (filters.tags?.length) {
        filteredProjects = filteredProjects.filter(project =>
          filters.tags!.some(tag => project.tags.includes(tag))
        );
      }

      if (filters.year) {
        filteredProjects = filteredProjects.filter(project =>
          project.year === filters.year
        );
      }

      if (filters.offset) {
        filteredProjects = filteredProjects.slice(filters.offset);
      }

      if (filters.limit) {
        filteredProjects = filteredProjects.slice(0, filters.limit);
      }

      return filteredProjects;
    }
  }

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const response = await apiService.getProjectById(id);
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data for project');
      return projectsData.find(project => project.id === id) || null;
    }
  }

  // Blog Posts
  async getBlogPosts(filters: { category?: string; tags?: string[]; limit?: number; offset?: number } = {}) {
    try {
      const response = await apiService.getBlogPosts(filters);
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data for blog posts');
      let filteredPosts = [...blogPostsData];

      if (filters.category) {
        filteredPosts = filteredPosts.filter(post =>
          post.category === filters.category
        );
      }

      if (filters.tags?.length) {
        filteredPosts = filteredPosts.filter(post =>
          filters.tags!.some(tag => post.tags?.includes(tag) || false)
        );
      }

      if (filters.offset) {
        filteredPosts = filteredPosts.slice(filters.offset);
      }

      if (filters.limit) {
        filteredPosts = filteredPosts.slice(0, filters.limit);
      }

      return filteredPosts;
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await apiService.getBlogPostBySlug(slug);
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data for blog post');
      return blogPostsData.find(post => post.slug === slug) || null;
    }
  }

  // Profile
  async getProfile(): Promise<Profile> {
    try {
      const response = await apiService.getProfile();
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data for profile');
      return profileData;
    }
  }
}

export const dataService = new DataService();