'use client'

import dynamic from 'next/dynamic'
import type { Project } from '@/entities/project'

const LazyProjectCard = dynamic(
  () => import('@/widgets/project-grid').then(mod => ({ default: mod.ProjectCard })),
  {
    loading: () => <div className="skeleton">Loading project...</div>,
    ssr: false
  }
)

export default function DynamicExample() {
  const mockProject: Project = {
    id: '1',
    title: 'Sample Project',
    description: 'Sample Description',
    tags: ['React', 'TypeScript'],
    imageUrl: '/sample.jpg',
    imageAlt: 'Sample Image',
    link: '/project/1'
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dynamic Loading Example</h1>
      <p>This page demonstrates how to use Next.js dynamic imports for code splitting and better performance.</p>
      
      <LazyProjectCard project={mockProject} />
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Benefits of Dynamic Imports:</h3>
        <ul>
          <li>Code splitting - component loads only when needed</li>
          <li>Smaller initial bundle size</li>
          <li>Better initial page load performance</li>
          <li>Loading states for better UX</li>
        </ul>
      </div>
    </div>
  )
}