import { dataService } from '@/features/services/dataService'
import type { Project } from '@/entities/project'
import type { BlogPost } from '@/entities/blog-post'
import type { Profile } from '@/entities/profile'

import { apiService } from '@/features/services/api'

jest.mock('@/features/services/api', () => ({
  apiService: {
    getProjects: jest.fn(),
    getProjectById: jest.fn(),
    getBlogPosts: jest.fn(),
    getBlogPostBySlug: jest.fn(),
    getProfile: jest.fn(),
  }
}))

describe('DataService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getProjects', () => {
    it('returns data from API when successful', async () => {
      const mockProjects: Project[] = [
        { id: '1', title: 'Project 1', description: 'Description 1', tags: ['React'], imageUrl: 'image1.jpg', imageAlt: 'Alt 1', link: 'link1' },
        { id: '2', title: 'Project 2', description: 'Description 2', tags: ['TypeScript'], imageUrl: 'image2.jpg', imageAlt: 'Alt 2', link: 'link2' },
      ]
      
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockResolvedValue({ data: mockProjects, success: true })

      const result = await dataService.getProjects()

      expect(result).toEqual(mockProjects)
      expect(apiMock).toHaveBeenCalledWith({})
    })

    it('falls back to mock data when API fails', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects()

      expect(result).toHaveLength(8)
      expect(result[0]?.title).toBe('Evoke')
      expect(consoleSpy).toHaveBeenCalledWith('API unavailable, using mock data for projects')
      consoleSpy.mockRestore()
    })

it('applies tag filter correctly when using fallback data', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects({ tags: ['Brand identity'] })

      expect(result).toHaveLength(4)
      expect(result[0]?.title).toBe('Evoke')
      expect(result[0]?.tags).toContain('Brand identity')
      expect(apiMock).toHaveBeenCalledWith({ tags: ['Brand identity'] })
    })

it('applies year filter correctly when using fallback data', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects({ year: 2023 })

      expect(result).toHaveLength(4)
      expect(result[0]?.title).toBe('Vibrance')
      expect(result[0]?.year).toBe(2023)
      expect(apiMock).toHaveBeenCalledWith({ year: 2023 })
    })

    it('applies offset filter correctly when using fallback data', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects({ offset: 1 })

      expect(result).toHaveLength(7)
      expect(result[0]?.id).toBe('2')
      expect(result[0]?.title).toBe('Resonance')
      expect(apiMock).toHaveBeenCalledWith({ offset: 1 })
    })

    it('applies limit filter correctly when using fallback data', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects({ limit: 2 })

      expect(result).toEqual([
        { 
          id: '1', 
          title: 'Evoke', 
          description: 'Brand identity, Packaging', 
          tags: ['Brand identity', 'Packaging'], 
          imageUrl: 'https://picsum.photos/seed/project1/400/300.jpg', 
          imageAlt: 'Sample image from a project', 
          link: '/project-detail',
          year: 2022
        },
        { 
          id: '2', 
          title: 'Resonance', 
          description: 'Brand identity, Packaging', 
          tags: ['Brand identity', 'Packaging'], 
          imageUrl: 'https://picsum.photos/seed/project2/400/300.jpg', 
          imageAlt: 'Alt Text', 
          link: '/project-detail',
          year: 2022
        },
      ])
      expect(apiMock).toHaveBeenCalledWith({ limit: 2 })
    })

    it('applies multiple filters correctly when using fallback data', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects({ 
        tags: ['Brand identity'], 
        year: 2023, 
        limit: 5 
      })

      expect(result).toEqual([
        { 
          id: '5', 
          title: 'Vibrance', 
          description: 'Brand identity, Packaging', 
          tags: ['Brand identity', 'Packaging'], 
          year: 2023,
          imageUrl: 'https://picsum.photos/seed/project5/400/300.jpg', 
          imageAlt: 'Alt Text', 
          link: '/project-detail'
        },
        { 
          id: '6', 
          title: 'Dreamscape', 
          description: 'Brand identity, Packaging', 
          tags: ['Brand identity', 'Packaging'], 
          year: 2023,
          imageUrl: 'https://picsum.photos/seed/project6/400/300.jpg', 
          imageAlt: 'Alt Text', 
          link: '/project-detail'
        }
      ])
      expect(apiMock).toHaveBeenCalledWith({ tags: ['Brand identity'], year: 2023, limit: 5 })
    })

    it('applies multiple filters correctly when using fallback data', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects({ 
        tags: ['Brand identity'], 
        year: 2023, 
        limit: 5 
      })

      expect(result).toEqual([
        { 
          id: '5', 
          title: 'Vibrance', 
          description: 'Brand identity, Packaging', 
          tags: ['Brand identity', 'Packaging'], 
          year: 2023,
          imageUrl: 'https://picsum.photos/seed/project5/400/300.jpg', 
          imageAlt: 'Alt Text', 
          link: '/project-detail'
        },
        { 
          id: '6', 
          title: 'Dreamscape', 
          description: 'Brand identity, Packaging', 
          tags: ['Brand identity', 'Packaging'], 
          year: 2023,
          imageUrl: 'https://picsum.photos/seed/project6/400/300.jpg', 
          imageAlt: 'Alt Text', 
          link: '/project-detail'
        }
      ])
      expect(apiMock).toHaveBeenCalledWith({ tags: ['Brand identity'], year: 2023, limit: 5 })
    })

    it('handles empty projects array correctly', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjects({ tags: ['nonexistent'] })

      expect(result).toEqual([])
      expect(apiMock).toHaveBeenCalledWith({ tags: ['nonexistent'] })
    })
  })

  describe('getProjectById', () => {
    it('returns project from API when successful', async () => {
      const mockProject: Project = {
        id: 'test-project',
        title: 'Test Project',
        description: 'Test Description',
        tags: ['Test'],
        imageUrl: 'test.jpg',
        imageAlt: 'Test Alt',
        link: 'https://test.com',
      }

      const apiMock = apiService.getProjectById as jest.MockedFunction<typeof apiService.getProjectById>
      apiMock.mockResolvedValue({ data: mockProject, success: true })

      const result = await dataService.getProjectById('test-project')

      expect(result).toEqual(mockProject)
      expect(apiMock).toHaveBeenCalledWith('test-project')
    })

    it('returns null when project not found in fallback data', async () => {
      const apiMock = apiService.getProjectById as jest.MockedFunction<typeof apiService.getProjectById>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProjectById('nonexistent')

      expect(result).toBeNull()
      expect(apiMock).toHaveBeenCalledWith('nonexistent')
    })
  })

  describe('getBlogPosts', () => {
    it('returns posts from API when successful', async () => {
      const mockPosts: BlogPost[] = [
        {
          slug: 'post-1',
          title: 'Post 1',
          date: new Date('2023-01-01'),
          category: 'Tech',
          tags: ['React'],
        },
        {
          slug: 'post-2',
          title: 'Post 2',
          date: new Date('2023-01-02'),
          category: 'Design',
          tags: ['CSS'],
        },
      ]

      const apiMock = apiService.getBlogPosts as jest.MockedFunction<typeof apiService.getBlogPosts>
      apiMock.mockResolvedValue({ data: mockPosts, success: true })

      const result = await dataService.getBlogPosts()

      expect(result).toEqual(mockPosts)
      expect(apiMock).toHaveBeenCalledWith({})
    })

    it('applies category filter when using fallback data', async () => {
      const apiMock = apiService.getBlogPosts as jest.MockedFunction<typeof apiService.getBlogPosts>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getBlogPosts({ category: 'Technology' })

      expect(result).toHaveLength(0)
      expect(apiMock).toHaveBeenCalledWith({ category: 'Technology' })
    })

    it('applies tags filter with partial match when using fallback data', async () => {
      const apiMock = apiService.getBlogPosts as jest.MockedFunction<typeof apiService.getBlogPosts>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getBlogPosts({ tags: ['React'] })

      expect(result).toHaveLength(0)
      expect(apiMock).toHaveBeenCalledWith({ tags: ['React'] })
    })

    it('handles missing tags in blog posts correctly', async () => {
      const apiMock = apiService.getBlogPosts as jest.MockedFunction<typeof apiService.getBlogPosts>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getBlogPosts({ tags: ['React'] })

      expect(result).toHaveLength(0)
      expect(apiMock).toHaveBeenCalledWith({ tags: ['React'] })
    })

    it('applies limit and offset correctly when using fallback data', async () => {
      const apiMock = apiService.getBlogPosts as jest.MockedFunction<typeof apiService.getBlogPosts>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getBlogPosts({ limit: 2, offset: 1 })

      expect(result).toHaveLength(0)
      expect(apiMock).toHaveBeenCalledWith({ limit: 2, offset: 1 })
    })
  })

  describe('getBlogPostBySlug', () => {
    it('returns post from API when successful', async () => {
      const mockPost: BlogPost = {
        slug: 'test-post',
        title: 'Test Post',
        date: new Date('2023-01-01'),
        content: 'Test content',
        category: 'Test',
        tags: ['Test'],
      }

      const apiMock = apiService.getBlogPostBySlug as jest.MockedFunction<typeof apiService.getBlogPostBySlug>
      apiMock.mockResolvedValue({ data: mockPost, success: true })

      const result = await dataService.getBlogPostBySlug('test-post')

      expect(result).toEqual(mockPost)
      expect(apiMock).toHaveBeenCalledWith('test-post')
    })

    it('returns null when post not found in fallback data', async () => {
      const apiMock = apiService.getBlogPostBySlug as jest.MockedFunction<typeof apiService.getBlogPostBySlug>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getBlogPostBySlug('nonexistent')

      expect(result).toBeNull()
      expect(apiMock).toHaveBeenCalledWith('nonexistent')
    })
  })

  describe('getProfile', () => {
    it('returns profile from API when successful', async () => {
      const mockProfile: Profile = {
        name: 'Test User',
        title: 'Test Developer',
        description: ['Test description'],
        imageUrl: 'test.jpg',
        email: { address: 'test@example.com', label: 'Email' },
        github: { address: 'https://github.com/test', label: 'GitHub' },
        linkedin: { address: 'https://linkedin.com/in/test', label: 'LinkedIn' },
      }

      const apiMock = apiService.getProfile as jest.MockedFunction<typeof apiService.getProfile>
      apiMock.mockResolvedValue({ data: mockProfile, success: true })

      const result = await dataService.getProfile()

      expect(result).toEqual(mockProfile)
      expect(apiMock).toHaveBeenCalledWith()
    })

    it('returns fallback profile when API fails', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      const apiMock = apiService.getProfile as jest.MockedFunction<typeof apiService.getProfile>
      apiMock.mockRejectedValue(new Error('API Error'))

      const result = await dataService.getProfile()

      expect(result).toBeDefined()
      expect(consoleSpy).toHaveBeenCalledWith('API unavailable, using mock data for profile')
      consoleSpy.mockRestore()
    })
  })

  describe('Error handling', () => {
    it('logs warnings to console when API fails', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('Network Error'))

      await dataService.getProjects()

      expect(consoleSpy).toHaveBeenCalledWith('API unavailable, using mock data for projects')
      consoleSpy.mockRestore()
    })

    it('handles different types of errors', async () => {
      const apiMock = apiService.getProjects as jest.MockedFunction<typeof apiService.getProjects>
      apiMock.mockRejectedValue(new Error('Database Error'))

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      await dataService.getProjects()

      expect(consoleSpy).toHaveBeenCalledWith('API unavailable, using mock data for projects')
      consoleSpy.mockRestore()
    })
  })
})