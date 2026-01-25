import { GET } from '@/app/api/profile/route'

jest.mock('@/shared', () => ({
  profileData: {
    name: '박주은',
    title: 'Welcome!',
    description: [
      "This is Schnee. ",
      "Frontend Developer interested in the core technologies and value of positive user experiences.",
    ],
    imageUrl: 'https://framerusercontent.com/images/T8snMPOr6eSPI6cbUJhGXL8.jpg',
    email: {
      address: 'jooeun0616@gmail.com',
      label: 'jooeun0616@gmail.com',
    },
    github: {
      address: 'https://github.com/schnee98',
      label: 'github.com/schnee98',
    },
    linkedin: {
      address: 'https://www.linkedin.com/in/%EC%A3%BC%EC%9D%80-%EB%B0%95-90281a290/',
      label: '박주은',
    },
  },
}))

describe('/api/profile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/profile', () => {
    it('returns 200 status code for successful request', async () => {
      const response = await GET()

      expect(response.status).toBe(200)
    })

    it('returns profile data with correct structure', async () => {
      const response = await GET()
      const data = await response.json()

      expect(data).toHaveProperty('success', true)
      expect(data).toHaveProperty('data')
      expect(data.data).toHaveProperty('name')
      expect(data.data).toHaveProperty('title')
      expect(data.data).toHaveProperty('description')
      expect(data.data).toHaveProperty('imageUrl')
      expect(data.data).toHaveProperty('email')
      expect(data.data).toHaveProperty('github')
      expect(data.data).toHaveProperty('linkedin')
    })

    it('returns profile data with correct types', async () => {
      const response = await GET()
      const data = await response.json()

      expect(typeof data.data.name).toBe('string')
      expect(typeof data.data.title).toBe('string')
      expect(Array.isArray(data.data.description)).toBe(true)
      expect(typeof data.data.imageUrl).toBe('string')
      expect(typeof data.data.email).toBe('object')
      expect(typeof data.data.github).toBe('object')
      expect(typeof data.data.linkedin).toBe('object')
    })

    it('returns email, github, and linkedin with correct structure', async () => {
      const response = await GET()
      const data = await response.json()

      expect(data.data.email).toHaveProperty('address')
      expect(data.data.email).toHaveProperty('label')
      expect(typeof data.data.email.address).toBe('string')
      expect(typeof data.data.email.label).toBe('string')

      expect(data.data.github).toHaveProperty('address')
      expect(data.data.github).toHaveProperty('label')
      expect(typeof data.data.github.address).toBe('string')
      expect(typeof data.data.github.label).toBe('string')

      expect(data.data.linkedin).toHaveProperty('address')
      expect(data.data.linkedin).toHaveProperty('label')
      expect(typeof data.data.linkedin.address).toBe('string')
      expect(typeof data.data.linkedin.label).toBe('string')
    })

    it('returns valid URLs for imageUrl, email, github, and linkedin', async () => {
      const response = await GET()
      const data = await response.json()

      expect(() => new URL(data.data.imageUrl)).not.toThrow()
      expect(() => new URL(data.data.github.address)).not.toThrow()
      expect(() => new URL(data.data.linkedin.address)).not.toThrow()
      expect(data.data.email.address).toContain('@')
    })

    it('returns JSON content type header', async () => {
      const response = await GET()

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('returns correct success flag', async () => {
      const response = await GET()
      const data = await response.json()

      expect(data.success).toBe(true)
    })

    it('returns consistent data across multiple requests', async () => {
      const response1 = await GET()
      const response2 = await GET()
      
      const data1 = await response1.json()
      const data2 = await response2.json()
      
      expect(JSON.stringify(data1)).toBe(JSON.stringify(data2))
    })

    it('performance test - responds within reasonable time', async () => {
      const startTime = performance.now()
      const response = await GET()
      const endTime = performance.now()
      
      expect(response.status).toBe(200)
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('returns non-empty description array', async () => {
      const response = await GET()
      const data = await response.json()

      expect(Array.isArray(data.data.description)).toBe(true)
      expect(data.data.description.length).toBeGreaterThan(0)
      data.data.description.forEach((desc: string) => {
        expect(typeof desc).toBe('string')
        expect(desc.trim()).not.toBe('')
      })
    })
  })

  describe('Response Format Validation', () => {
    it('follows consistent API response format', async () => {
      const response = await GET()
      const data = await response.json()

      expect(Object.keys(data)).toEqual(['success', 'data'])
      expect(typeof data.success).toBe('boolean')
      expect(data.success).toBe(true)
      expect(typeof data.data).toBe('object')
      expect(data.data).not.toBeNull()
    })

    it('does not include sensitive information', async () => {
      const response = await GET()
      const data = await response.json()

      const responseString = JSON.stringify(data).toLowerCase()
      
      expect(responseString).not.toContain('password')
      expect(responseString).not.toContain('secret')
      expect(responseString).not.toContain('token')
      expect(responseString).not.toContain('key')
      expect(responseString).not.toContain('auth')
    })
  })
})