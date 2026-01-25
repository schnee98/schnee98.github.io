import { render, screen } from '@testing-library/react'
import { ProjectCard } from '@/widgets/project-grid'
import { projectsData } from '@/shared'

describe('ProjectCard Component', () => {
  const mockProject = projectsData[0]!!

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />)
    
    expect(screen.getByText(mockProject!.title)).toBeInTheDocument()
    expect(screen.getByText(mockProject!.description)).toBeInTheDocument()
  })

  it('renders project tags', () => {
    render(<ProjectCard project={mockProject} />)
    
    mockProject!.tags.forEach((tech: string) => {
      expect(screen.getAllByText(tech, { exact: false }).length).toBeGreaterThan(0)
    })
  })
})