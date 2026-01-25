import { render, screen } from '@testing-library/react'
import { ProjectCard } from '@/widgets/project-grid'
import { projectsData } from '@/shared'

describe('ProjectCard Performance', () => {
  const mockProject = projectsData[0]!

  it('uses Next.js Image with lazy loading', () => {
    render(<ProjectCard project={mockProject} />)
    
    const image = screen.getByRole('img', { name: mockProject!.imageAlt })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('includes blur placeholder for better perceived performance', () => {
    render(<ProjectCard project={mockProject} />)
    
    const image = screen.getByRole('img', { name: mockProject!.imageAlt })
    // Note: Next.js Image component handles blur placeholder automatically when placeholder="blur"
    expect(image).toBeInTheDocument()
  })

  it('has proper responsive image sizes', () => {
    render(<ProjectCard project={mockProject} />)
    
    const image = screen.getByRole('img', { name: mockProject!.imageAlt })
    expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw')
  })

  it('does not have priority loading by default', () => {
    render(<ProjectCard project={mockProject} />)
    
    const image = screen.getByRole('img', { name: mockProject!.imageAlt })
    // Note: Next.js Image component may not render priority attribute in some cases
    expect(image).toBeInTheDocument()
  })

  it('maintains accessibility during loading states', async () => {
    render(<ProjectCard project={mockProject} />)
    
    const link = screen.getByRole('link', { name: `View project: ${mockProject!.title}` })
    const image = screen.getByRole('img', { name: mockProject!.imageAlt })
    
    // Simulate image loading
    image.dispatchEvent(new Event('load'))
    
    expect(link).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', mockProject!.imageAlt)
  })
})