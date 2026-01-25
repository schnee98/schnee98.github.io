import { apiService } from '@/features/services/api'
import { ApiService } from '@/features/services/api'
import type { 
  ProjectFilters, 
  BlogFilters 
} from '@/features/services/api/types'

const mockFetch = jest.fn()
global.fetch = mockFetch

describe('API Service', () => {
  let testApiService: ApiService

  beforeEach(() => {
    mockFetch.mockClear()
    jest.clearAllMocks()
    Object.defineProperty(process, 'env', {
      value: {
        ...process.env,
        NEXT_PUBLIC_API_URL: 'https://test-api.example.com'
      }
    })
    testApiService = new ApiService('https://test-api.example.com')
  })

  afterEach(() => {
    mockFetch.mockReset()
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('uses environment variable for base URL', () => {
      expect(testApiService).toBeDefined()
      expect(process.env.NEXT_PUBLIC_API_URL).toBe('https://test-api.example.com')
    })
  })

  describe('getProjects', () => {
    it('makes request without filters', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjects()

      expect(mockFetch).toHaveBeenCalledWith('https://test-api.example.com/projects', {"headers": {"Content-Type": "application/json"}})
      expect(mockResponse.json).toHaveBeenCalled()
    })

    it('includes tags filter in query params', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjects({ tags: ['React', 'TypeScript'] })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('tags=React%2CTypeScript')
    })

    it('includes year filter in query params', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjects({ year: 2023 })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('year=2023')
    })

    it('includes limit filter in query params', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjects({ limit: 10 })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('limit=10')
    })

    it('includes offset filter in query params', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjects({ offset: 20 })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('offset=20')
    })

    it('includes multiple filters in query params', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjects({ 
        tags: ['React'], 
        year: 2023, 
        limit: 5, 
        offset: 10 
      })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('tags=React')
      expect(calledUrl).toContain('year=2023')
      expect(calledUrl).toContain('limit=5')
      expect(calledUrl).toContain('offset=10')
    })

    it('handles empty filters correctly', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjects({})
      
      expect(mockFetch).toHaveBeenCalledWith('https://test-api.example.com/projects', {"headers": {"Content-Type": "application/json"}})
    })
  })

  describe('getProjectById', () => {
    it('makes request to correct endpoint', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: { id: 'test' }, success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProjectById('test-project')

      expect(mockFetch).toHaveBeenCalledWith('https://test-api.example.com/projects/test-project', {"headers": {"Content-Type": "application/json"}})
      expect(mockResponse.json).toHaveBeenCalled()
    })

    it('handles different ID formats', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: { id: 'test' }, success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      const testIds = ['simple', 'with-dashes', 'with_underscores', 'with-numbers-123']
      
      for (const id of testIds) {
        await testApiService.getProjectById(id)
        const calledUrl = mockFetch.mock.calls[mockFetch.mock.calls.length - 1][0]
        expect(calledUrl).toContain(`projects/${id}`)
      }
    })
  })

  describe('getBlogPosts', () => {
    it('makes request without filters', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getBlogPosts()

      expect(mockFetch).toHaveBeenCalledWith('https://test-api.example.com/blog', {"headers": {"Content-Type": "application/json"}})
    })

    it('includes category filter in query params', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getBlogPosts({ category: 'Technology' })

      const calledUrl = mockFetch.mock.calls[mockFetch.mock.calls.length - 1][0]
      expect(calledUrl).toContain('category=Technology')
    })

    it('includes tags filter in query params', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: [], success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getBlogPosts({ tags: ['React', 'Node.js'] })

      const calledUrl = mockFetch.mock.calls[mockFetch.mock.calls.length - 1][0]
      expect(calledUrl).toContain('tags=React%2CNode.js')
    })
  })

  describe('getBlogPostBySlug', () => {
    it('makes request to correct endpoint', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: { slug: 'test-post' }, success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getBlogPostBySlug('test-post')

      const calledUrl = mockFetch.mock.calls[mockFetch.mock.calls.length - 1][0]
      expect(calledUrl).toContain('blog/test-post')
    })
  })

  describe('getProfile', () => {
    it('makes request to correct endpoint', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ data: { name: 'Test User' }, success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await testApiService.getProfile()

      const calledUrl = mockFetch.mock.calls[mockFetch.mock.calls.length - 1][0]
      expect(calledUrl).toContain('profile')
    })
  })
})