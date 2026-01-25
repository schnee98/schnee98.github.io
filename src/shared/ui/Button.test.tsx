import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/shared/ui/Button'

jest.mock('next/link', () => {
  return function MockLink({ children, href, className, ...props }: any) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }
})

describe('Button Component - Unit Tests', () => {
  const user = userEvent.setup()

  describe('Basic Rendering', () => {
    it('renders button with children text', () => {
      const buttonText = 'Click me'
      
      render(<Button>{buttonText}</Button>)
      
      const button = screen.getByRole('button', { name: buttonText })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent(buttonText)
    })

    it('renders button with React node children', () => {
      const children = (
        <div>
          <span>Icon</span>
          <span>Text</span>
        </div>
      )
      
      render(<Button>{children}</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })

    it('has default secondary variant when no variant specified', () => {
      render(<Button>Default Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'secondary')
    })

    it('applies custom className in addition to default classes', () => {
      render(<Button className="custom-class another-class">Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'secondary', 'custom-class', 'another-class')
    })
  })

  describe('Variant Rendering', () => {
    it('renders primary variant with correct classes', () => {
      render(<Button variant="primary">Primary Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'primary')
      expect(button).not.toHaveClass('secondary')
    })

    it('renders secondary variant with correct classes', () => {
      render(<Button variant="secondary">Secondary Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'secondary')
      expect(button).not.toHaveClass('primary')
    })

    it('renders icon variant with correct classes', () => {
      render(<Button variant="icon">🔍</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'icon')
      expect(button).not.toHaveClass('primary', 'secondary')
    })

    it('maintains variant classes with custom className', () => {
      render(<Button variant="primary" className="custom">Primary</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'primary', 'custom')
    })
  })

  describe('Event Handling', () => {
    it('calls onClick handler when button is clicked', async () => {
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick handler multiple times on multiple clicks', async () => {
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Click me</Button>)
      const button = screen.getByRole('button')
      
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('does not throw error when onClick is not provided', async () => {
      render(<Button>No Handler</Button>)
      
      const button = screen.getByRole('button')
      expect(async () => {
        await user.click(button)
      }).not.toThrow()
    })

    it('handles keyboard Enter key press', async () => {
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Submit</Button>)
      const button = screen.getByRole('button')
      
      button.focus()
      await user.keyboard('{Enter}')
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard Space key press', async () => {
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Submit</Button>)
      const button = screen.getByRole('button')
      
      button.focus()
      await user.keyboard('{ }')
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Link Behavior - Internal Links', () => {
    it('renders as Next.js Link for internal href', () => {
      render(<Button href="/about">About Us</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/about')
      expect(link).toHaveTextContent('About Us')
    })

    it('applies variant classes to internal links', () => {
      render(<Button href="/contact" variant="primary">Contact</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button', 'primary')
    })

    it('applies custom className to internal links', () => {
      render(<Button href="/home" className="nav-link">Home</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button', 'secondary', 'nav-link')
    })

    it('handles internal links with query parameters', () => {
      render(<Button href="/search?q=test">Search</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/search?q=test')
    })
  })

  describe('Link Behavior - External Links', () => {
    it('renders as anchor tag for http external links', () => {
      render(<Button href="https://example.com">External Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveTextContent('External Link')
    })

    it('renders as anchor tag for https external links', () => {
      render(<Button href="https://secure.example.com">Secure Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://secure.example.com')
    })

    it('opens external link in new tab when openInNewTab is true', () => {
      render(
        <Button href="https://example.com" openInNewTab>
          Open in New Tab
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('does not open in new tab when openInNewTab is false', () => {
      render(
        <Button href="https://example.com" openInNewTab={false}>
          Same Tab
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })

    it('handles mailto links correctly', () => {
      render(<Button href="mailto:test@example.com">Email Us</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'mailto:test@example.com')
    })

    it('applies variant classes to external links', () => {
      render(
        <Button href="https://external.com" variant="icon">
          External Icon
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button', 'icon')
    })
  })

  describe('Props Validation', () => {
    it('accepts all valid ButtonVariant values', () => {
      const variants = ['primary', 'secondary', 'icon'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(
          <Button variant={variant}>{variant} Button</Button>
        )
        const element = screen.getByText(`${variant} Button`)
        expect(element).toBeInTheDocument()
        unmount()
      })
    })

    it('handles empty children gracefully', () => {
      render(<Button>{''}</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('')
    })

    it('handles null children gracefully', () => {
      render(<Button>{null}</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles undefined children gracefully', () => {
      render(<Button>{undefined}</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles numeric children', () => {
      render(<Button>{42}</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('42')
    })
  })

  describe('Type Safety', () => {
    it('has correct HTML attributes for button element', () => {
      render(<Button>Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('maintains button element structure', () => {
      render(<Button>Simple Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  describe('Complex Scenarios', () => {
    it('renders as link when href is provided, ignoring onClick', () => {
      const handleClick = jest.fn()
      
      render(
        <Button href="/test" onClick={handleClick}>
          Link Button
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).not.toHaveAttribute('onClick')
    })

    it('handles relative internal paths', () => {
      render(<Button href="../parent">Parent Directory</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '../parent')
    })

    it('handles hash fragment links', () => {
      render(<Button href="#section1">Section 1</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '#section1')
    })
  })

  describe('Component Consistency', () => {
    it('always has button base class regardless of render type', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button')
      
      rerender(<Button href="/test">Link</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button')
      
      rerender(<Button href="https://example.com">External</Button>)
      const externalLink = screen.getByRole('link')
      expect(externalLink).toHaveClass('button')
    })

    it('maintains class order consistency', () => {
      const { rerender } = render(
        <Button variant="primary" className="custom">
          Test
        </Button>
      )
      
      const button = screen.getByRole('button')
      const buttonClasses = button.className
      expect(buttonClasses).toMatch(/^button primary custom$/)
    })
  })
})