import { GET } from '@/app/api/projects/route'

jest.mock('@/shared', () => ({
  projectsData: [
    {
      id: '1',
      title: 'Evoke',
      description: 'Brand identity, Packaging',
      tags: ['Brand identity', 'Packaging'],
      imageUrl: 'https://picsum.photos/seed/project1/400/300.jpg',
      imageAlt: 'Sample image from a project',
      link: '/project-detail',
      year: 2022,
    },
    {
      id: '2',
      title: 'Resonance',
      description: 'Brand identity, Packaging',
      tags: ['Brand identity', 'Packaging'],
      imageUrl: 'https://picsum.photos/seed/project2/400/300.jpg',
      imageAlt: 'Alt Text',
      link: '/project-detail',
      year: 2022,
    },
    {
      id: '3',
      title: 'Serenity',
      description: 'Website, Print',
      tags: ['Website', 'Print'],
      imageUrl: 'https://picsum.photos/seed/project3/400/300.jpg',
      imageAlt: 'Alt Text',
      link: '/project-detail',
      year: 2022,
    },
    {
      id: '4',
      title: 'Harmony',
      description: 'Website, Print',
      tags: ['Website', 'Print'],
      imageUrl: 'https://picsum.photos/seed/project4/400/300.jpg',
      imageAlt: 'Alt Text',
      link: '/project-detail',
      year: 2022,
    },
    {
      id: '5',
      title: 'Vibrance',
      description: 'Brand identity, Packaging',
      tags: ['Brand identity', 'Packaging'],
      imageUrl: 'https://picsum.photos/seed/project5/400/300.jpg',
      imageAlt: 'Alt Text',
      link: '/project-detail',
      year: 2023,
    },
    {
      id: '6',
      title: 'Dreamscape',
      description: 'Brand identity, Packaging',
      tags: ['Brand identity', 'Packaging'],
      imageUrl: 'https://picsum.photos/seed/project6/400/300.jpg',
      imageAlt: 'Alt Text',
      link: '/project-detail',
      year: 2023,
    },
    {
      id: '7',
      title: 'Stardust',
      description: 'Website, Print',
      tags: ['Website', 'Print'],
      imageUrl: 'https://picsum.photos/seed/project7/400/300.jpg',
      imageAlt: 'Alt Text',
      link: '/project-detail',
      year: 2023,
    },
    {
      id: '8',
      title: 'Origami',
      description: 'Digital product, Packaging',
      tags: ['Digital product', 'Packaging'],
      imageUrl: 'https://picsum.photos/seed/project8/400/300.jpg',
      imageAlt: 'Alt Text',
      link: '/project-detail',
      year: 2023,
    },
  ],
}))

global.Request = jest.fn().mockImplementation((url) => ({
  url,
  headers: new Map(),
}))

describe('/api/projects', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/projects', () => {
    it('returns 200 status code for successful request', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects')
      const response = await GET(mockRequest)

      expect(response.status).toBe(200)
    })

    it('returns all projects without filters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(8)
      expect(data.total).toBe(8)
      expect(data.data[0]).toHaveProperty('id')
      expect(data.data[0]).toHaveProperty('title')
      expect(data.data[0]).toHaveProperty('description')
      expect(data.data[0]).toHaveProperty('tags')
      expect(data.data[0]).toHaveProperty('year')
    })

    it('filters projects by single tag', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Website')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(3)
      expect(data.total).toBe(3)
      data.data.forEach((project: any) => {
        expect(project.tags).toContain('Website')
      })
    })

    it('filters projects by multiple tags', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Website,Print')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(3)
      expect(data.total).toBe(3)
      data.data.forEach((project: any) => {
        expect(
          project.tags.includes('Website') || project.tags.includes('Print')
        ).toBe(true)
      })
    })

    it('filters projects by year', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?year=2022')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(4)
      expect(data.total).toBe(4)
      data.data.forEach((project: any) => {
        expect(project.year).toBe(2022)
      })
    })

    it('filters projects by year 2023', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?year=2023')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(4)
      expect(data.total).toBe(4)
      data.data.forEach((project: any) => {
        expect(project.year).toBe(2023)
      })
    })

    it('applies limit correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?limit=3')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(3)
      expect(data.total).toBe(3)
    })

    it('applies offset correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?offset=5')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(3)
      expect(data.total).toBe(3)
    })

    it('applies both limit and offset correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?limit=2&offset=3')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(2)
      expect(data.total).toBe(2)
    })

    it('combines tag and year filters correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Brand identity&year=2022')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(2)
      expect(data.total).toBe(2)
      data.data.forEach((project: any) => {
        expect(project.tags).toContain('Brand identity')
        expect(project.year).toBe(2022)
      })
    })

    it('handles non-existent tag gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=nonexistent')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('handles non-existent year gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?year=2025')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('handles empty tags parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('handles zero limit', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?limit=0')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('handles offset larger than data length', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?offset=20')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(0)
      expect(data.total).toBe(0)
    })

    it('filters by "Digital product" tag', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Digital product')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(1)
      expect(data.data[0].title).toBe('Origami')
      expect(data.total).toBe(1)
    })

    it('returns JSON content type header', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects')
      const response = await GET(mockRequest)

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('returns correct response structure', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(Object.keys(data)).toEqual(['success', 'data', 'total'])
      expect(typeof data.success).toBe('boolean')
      expect(Array.isArray(data.data)).toBe(true)
      expect(typeof data.total).toBe('number')
    })

    it('validates project data structure', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects')
      const response = await GET(mockRequest)
      const data = await response.json()

      data.data.forEach((project: any) => {
        expect(project).toHaveProperty('id')
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('tags')
        expect(project).toHaveProperty('imageUrl')
        expect(project).toHaveProperty('imageAlt')
        expect(project).toHaveProperty('link')
        expect(project).toHaveProperty('year')
        expect(typeof project.id).toBe('string')
        expect(typeof project.title).toBe('string')
        expect(typeof project.description).toBe('string')
        expect(Array.isArray(project.tags)).toBe(true)
        expect(typeof project.imageUrl).toBe('string')
        expect(typeof project.imageAlt).toBe('string')
        expect(typeof project.link).toBe('string')
        expect(typeof project.year).toBe('number')
      })
    })

    it('maintains original order when no filters applied', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.data[0].id).toBe('1')
      expect(data.data[1].id).toBe('2')
      expect(data.data[2].id).toBe('3')
    })

    it('handles special characters in search parameters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Brand%20identity')
      const response = await GET(mockRequest)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('performance test - responds within reasonable time', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Website&year=2023&limit=5&offset=2')
      
      const startTime = performance.now()
      const response = await GET(mockRequest)
      const endTime = performance.now()
      
      expect(response.status).toBe(200)
      expect(endTime - startTime).toBeLessThan(100)
    })
  })

  describe('Error Handling', () => {
    it('handles invalid limit parameter gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?limit=invalid')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles invalid offset parameter gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?offset=invalid')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles invalid year parameter gracefully', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?year=invalid')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles negative limit parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?limit=-5')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles negative offset parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?offset=-5')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles negative year parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?year=-2023')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles very large limit parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?limit=999999')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles malformed query parameters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=&year=&limit=&offset=')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles unicode characters in parameters', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=프로젝트&year=2023')
      const response = await GET(mockRequest)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')
    })
  })

  describe('Edge Cases', () => {
    it('handles multiple filter combinations correctly', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Brand identity,Website&year=2022&limit=3&offset=1')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
      expect(typeof data.total).toBe('number')
    })

    it('maintains data order after filtering', async () => {
      const mockRequest1 = new Request('http://localhost:3000/api/projects?year=2022')
      const response1 = await GET(mockRequest1)
      const data1 = await response1.json()

      const mockRequest2 = new Request('http://localhost:3000/api/projects?year=2022&limit=2')
      const response2 = await GET(mockRequest2)
      const data2 = await response2.json()

      expect(data2.data[0].id).toBe(data1.data[0].id)
      expect(data2.data[1].id).toBe(data1.data[1].id)
    })

    it('handles decimal year parameter', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?year=2023.5')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it('handles very specific tag combinations', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?tags=Digital product,Packaging')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.length).toBeGreaterThan(0)
      data.data.forEach((project: any) => {
        expect(
          project.tags.includes('Digital product') || project.tags.includes('Packaging')
        ).toBe(true)
      })
    })

    it('handles year as string number', async () => {
      const mockRequest = new Request('http://localhost:3000/api/projects?year=2022')
      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.length).toBeGreaterThan(0)
      data.data.forEach((project: any) => {
        expect(project.year).toBe(2022)
      })
    })
  })
})