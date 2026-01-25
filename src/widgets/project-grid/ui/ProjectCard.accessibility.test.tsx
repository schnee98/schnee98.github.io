import { render, screen } from '@testing-library/react'
import { ProjectCard } from '@/widgets/project-grid'
import { projectsData } from '@/shared'

describe('ProjectCard Accessibility', () => {
  const mockProject = projectsData[0]!

  it('has proper ARIA label for project link', () => {
    render(<ProjectCard project={mockProject} />)
    
    const link = screen.getByRole('link', { name: `View project: ${mockProject!.title}` })
    expect(link).toBeInTheDocument()
  })

  it('displays project tags with proper accessibility', () => {
    render(<ProjectCard project={mockProject} />)
    
    const tagsList = screen.getByRole('list', { name: 'Technologies used' })
    expect(tagsList).toBeInTheDocument()
    
    const tagItems = screen.getAllByRole('listitem')
    expect(tagItems).toHaveLength(mockProject!.tags.length)
  })

  it('hides decorative icon container from screen readers', () => {
    render(<ProjectCard project={mockProject} />)
    
    const iconContainer = document.querySelector('[aria-hidden="true"]')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('button')
  })

  it('has visible focus state', () => {
    render(<ProjectCard project={mockProject} />)
    
    const link = screen.getByRole('link', { name: `View project: ${mockProject!.title}` })
    expect(link).toHaveClass('card')
  })

  it('provides alt text for project image', () => {
    render(<ProjectCard project={mockProject} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', mockProject!.imageAlt)
  })
})