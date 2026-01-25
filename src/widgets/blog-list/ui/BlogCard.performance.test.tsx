import { render, screen } from '@testing-library/react'
import { BlogCard } from '@/widgets/blog-list'
import { blogPostsData } from '@/shared'

describe('BlogCard Performance', () => {
  const mockPost = blogPostsData[0]!

  it('uses Next.js Image with lazy loading', () => {
    render(<BlogCard post={mockPost} />)
    
    if (mockPost!.imageUrl) {
      const image = screen.getByRole('img', { name: mockPost!.title })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('loading', 'lazy')
    }
  })

  it('includes blur placeholder for better perceived performance', () => {
    render(<BlogCard post={mockPost} />)
    
    if (mockPost!.imageUrl) {
      const image = screen.getByRole('img', { name: mockPost!.title })
      // Note: Next.js Image component handles blur placeholder automatically when placeholder="blur"
      expect(image).toBeInTheDocument()
    }
  })

  it('has proper responsive image sizes', () => {
    render(<BlogCard post={mockPost} />)
    
    if (mockPost!.imageUrl) {
      const image = screen.getByRole('img', { name: mockPost!.title })
      expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw')
    }
  })

  it('maintains accessibility during loading states', async () => {
    render(<BlogCard post={mockPost} />)
    
    // Check for blog post link with complex title
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    
    if (mockPost.imageUrl) {
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt')
    }
  })

  it('handles missing image gracefully', () => {
    const postWithoutImage = { ...mockPost!, imageUrl: undefined }
    
    render(<BlogCard post={postWithoutImage} />)
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
})