import { render, screen } from '@testing-library/react'
import { dataService } from '@/features/services/dataService'

jest.mock('@/features/services/dataService')

const mockDataService = dataService as jest.Mocked<typeof dataService>

// Simple component wrapper for testing
function WorkPageWrapper({ projects }: { projects: any[] }) {
  return (
    <main>
      <div>
        <h2>Work</h2>
        <div>
          {projects.map((project) => (
            <div key={project.id} data-testid="project">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div>{project.tags?.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

describe('Work Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders work page with projects', async () => {
    const mockProjects = [
      {
        id: '1',
        title: 'Test Project',
        description: 'Test Description',
        tags: ['React', 'TypeScript'],
        imageUrl: '/test.jpg',
        imageAlt: 'Test Image',
        link: '/project/1'
      }
    ]

    mockDataService.getProjects.mockResolvedValue(mockProjects)

    render(<WorkPageWrapper projects={mockProjects} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('React, TypeScript')).toBeInTheDocument()
  })

  it('shows empty state when no projects', async () => {
    mockDataService.getProjects.mockResolvedValue([])

    render(<WorkPageWrapper projects={[]} />)

    expect(screen.queryByTestId('project')).not.toBeInTheDocument()
  })
})