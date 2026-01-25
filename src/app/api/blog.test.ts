import { GET } from '@/app/api/blog/route'

jest.mock('@/shared', () => ({
  blogPostsData: [
    {
      slug: 'what-i-learned-at-apple',
      title: 'What I learned as a product designer at Apple.',
      date: new Date('2022-12-30'),
      imageUrl: 'https://picsum.photos/seed/blog1/400/300.jpg',
      category: 'Technology',
      tags: ['design', 'apple', 'product'],
    },
    {
      slug: 'react-best-practices',
      title: 'React Best Practices in 2023',
      date: new Date('2023-01-15'),
      imageUrl: 'https://picsum.photos/seed/blog2/400/300.jpg',
      category: 'Programming',
      tags: ['react', 'javascript', 'frontend'],
    },
    {
      slug: 'css-tips',
      title: 'CSS Tips and Tricks',
      date: new Date('2023-02-20'),
      imageUrl: 'https://picsum.photos/seed/blog3/400/300.jpg',
      category: 'Design',
      tags: ['css', 'design', 'frontend'],
    },
  ],
}))

global.Request = jest.fn().mockImplementation((url) => ({
  url,
  headers: new Map(),
}))

describe('/api/blog', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/blog', () => {
    it('returns 200 status code for successful request', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog')
      const response = await GET(mockRequest)

      expect(response.status).toBe(200)
    })

    it('returns all blog posts without filters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(3)
      expect(data.total).toBe(3)
      expect(data.data[0]).toHaveProperty('slug')
      expect(data.data[0]).toHaveProperty('title')
      expect(data.data[0]).toHaveProperty('date')
    })

    it('filters posts by category correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=Technology')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(1)
      expect(data.data[0].category).toBe('Technology')
      expect(data.total).toBe(1)
    })

    it('filters posts by single tag', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?tags=react')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(1)
      expect(data.data[0].tags).toContain('react')
      expect(data.total).toBe(1)
    })

    it('filters posts by multiple tags', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?tags=design,frontend')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.length).toBeGreaterThan(0)
      data.data.forEach((post: any) => {
        expect(
          post.tags.includes('design') || post.tags.includes('frontend')
        ).toBe(true)
      })
    })

    it('applies limit correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?limit=2')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(2)
      expect(data.total).toBe(2)
    })

    it('applies offset correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?offset=1')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(2)
      expect(data.total).toBe(2)
    })

    it('applies both limit and offset correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?limit=1&offset=1')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(1)
      expect(data.total).toBe(1)
    })

    it('handles non-existent category gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=NonExistent')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('handles non-existent tag gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?tags=nonexistent')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('combines category and tag filters correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=Technology&tags=design')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      data.data.forEach((post: any) => {
        expect(post.category).toBe('Technology')
        expect(post.tags.includes('design')).toBe(true)
      })
    })

    it('handles empty tags parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?tags=')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('handles zero limit', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?limit=0')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('handles offset larger than data length', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?offset=10')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('returns JSON content type header', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog')
      const response = await GET(mockRequest)

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('returns correct response structure', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(Object.keys(data)).toEqual(['success', 'data', 'total'])
      expect(typeof data.success).toBe('boolean')
      expect(Array.isArray(data.data)).toBe(true)
      expect(typeof data.total).toBe('number')
    })

    it('validates blog post data structure', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog')
      const response = await GET(mockRequest)
      const data = await response.json()

      data.data.forEach((post: any) => {
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('date')
        expect(typeof post.slug).toBe('string')
        expect(typeof post.title).toBe('string')
        expect(post.date).toBeInstanceOf(Date)
      })
    })

    it('handles special characters in search parameters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=C%2B%2B%20Programming')
      const response = await GET(mockRequest)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('performance test - responds within reasonable time', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=Technology&tags=design&limit=10&offset=5')
      
      const startTime = performance.now()
      const response = await GET(mockRequest)
      const endTime = performance.now()
      
      expect(response.status).toBe(200)
      expect(endTime - startTime).toBeLessThan(100)
    })
  })

  describe('Error Handling', () => {
    it('handles invalid limit parameter gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?limit=invalid')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles invalid offset parameter gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?offset=invalid')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles negative limit parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?limit=-5')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles negative offset parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?offset=-5')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles very large limit parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?limit=999999')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles malformed query parameters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=&tags=&limit=&offset=')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles unicode characters in parameters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=기술&tags=디자인,프론트엔드')
      const response = await GET(mockRequest)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')
    })
  })

  describe('Edge Cases', () => {
    it('handles multiple filter combinations correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=Programming&tags=react,frontend&limit=5&offset=0')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
      expect(typeof data.total).toBe('number')
    })

    it('maintains data order after filtering', async () => {
      const mockRequest1 = new Request('http://localhost:3000/api/blog')
      const response1 = await GET(mockRequest1)
      const data1 = await response1.json()

      const mockRequest2 = new Request('http://localhost:3000/api/blog?limit=2')
      const response2 = await GET(mockRequest2)
      const data2 = await response2.json()

      expect(data2.data[0].slug).toBe(data1.data[0].slug)
      expect(data2.data[1].slug).toBe(data1.data[1].slug)
    })

    it('handles case sensitivity in filters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/blog?category=technology')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })
  })
})