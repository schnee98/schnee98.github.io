import { render, screen, fireEvent } from '@testing-library/react'
import { LazyImage } from '@/shared/ui/LazyImage'

describe('LazyImage Component', () => {
  const mockProps = {
    src: '/test-image.jpg',
    alt: 'Test image'
  }

  it('renders image with lazy loading', () => {
    render(<LazyImage {...mockProps} />)
    
    const image = screen.getByRole('img', { name: 'Test image' })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('has proper accessibility attributes', () => {
    render(<LazyImage {...mockProps} />)
    
    const image = screen.getByRole('img', { name: 'Test image' })
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('shows error state when image fails to load', async () => {
    render(<LazyImage {...mockProps} />)
    
    const image = screen.getByRole('img', { name: 'Test image' })
    
    fireEvent.error(image)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const errorDiv = screen.getByText('Failed to load image')
    expect(errorDiv).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<LazyImage {...mockProps} className="custom-class" />)
    
    const container = screen.getByRole('img', { name: 'Test image' }).parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('sets priority when provided', () => {
    render(<LazyImage {...mockProps} priority={true} />)
    
    const image = screen.getByRole('img', { name: 'Test image' })
    expect(image).toBeInTheDocument()
  })
})