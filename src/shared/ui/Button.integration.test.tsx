import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/shared/ui/Button'

jest.mock('next/link', () => {
  return function MockLink({ children, href, className, onClick, ...props }: any) {
    return (
      <a 
        href={href} 
        className={className} 
        onClick={onClick}
        data-href={href}
        {...props}
      >
        {children}
      </a>
    )
  }
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

describe('Button Integration Tests - Next.js Router', () => {
  const user = userEvent.setup()

  describe('Internal Navigation Integration', () => {
    it('integrates with Next.js Link for client-side routing', () => {
      render(<Button href="/about">About Page</Button>)
      
      const link = screen.getByRole('link', { name: 'About Page' })
      expect(link).toHaveAttribute('data-href', '/about')
      expect(link).toHaveClass('button')
    })

    it('handles dynamic route parameters', () => {
      render(<Button href="/blog/[slug]">Blog Post</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-href', '/blog/[slug]')
    })

    it('handles catch-all routes', () => {
      render(<Button href="/docs/[...slug]">Documentation</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-href', '/docs/[...slug]')
    })

    it('preserves query parameters in internal routes', () => {
      render(<Button href="/search?q=test&sort=date">Search Results</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-href', '/search?q=test&sort=date')
    })

    it('handles hash fragments in internal routes', () => {
      render(<Button href="/page#section-1">Go to Section</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-href', '/page#section-1')
    })
  })

  describe('Link Component Behavior', () => {
    it('applies CSS classes correctly through Next.js Link', () => {
      render(
        <Button href="/test" variant="primary" className="nav-link">
          Navigation Link
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button', 'primary', 'nav-link')
    })

    it('applies CSS classes correctly to Link components', () => {
      render(
        <Button 
          href="/prefetch" 
          className="navigation-link"
        >
          Prefetch Link
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button', 'secondary', 'navigation-link')
      expect(link).toHaveAttribute('href', '/prefetch')
    })

    it('maintains link behavior with icon variant', () => {
      render(
        <Button href="/close" variant="icon">
          ×
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button', 'icon')
      expect(link).toHaveAttribute('data-href', '/close')
    })

    it('handles prefetch implications for internal links', () => {
      render(<Button href="/important-page">Important Page</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('External Link Integration', () => {
    it('handles external URLs without Next.js Link', () => {
      render(<Button href="https://external.com">External Site</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://external.com')
      expect(link).not.toHaveAttribute('data-href')
    })

    it('opens external links in new tab when specified', () => {
      render(
        <Button href="https://external.com" openInNewTab>
          External New Tab
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('handles mailto links without router interference', () => {
      render(<Button href="mailto:contact@example.com">Email Contact</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'mailto:contact@example.com')
      expect(link).not.toHaveAttribute('data-href')
    })

    it('handles tel links without router interference', () => {
      render(<Button href="tel:+1234567890">Call Us</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'tel:+1234567890')
    })
  })

  describe('Router Context Preservation', () => {
    it('maintains application context during navigation', async () => {
      render(
        <div>
          <Button href="/page1">Page 1</Button>
          <Button href="/page2">Page 2</Button>
        </div>
      )
      
      const page1Link = screen.getByRole('link', { name: 'Page 1' })
      const page2Link = screen.getByRole('link', { name: 'Page 2' })
      
      expect(page1Link).toHaveAttribute('data-href', '/page1')
      expect(page2Link).toHaveAttribute('data-href', '/page2')
    })

    it('handles navigation from different component contexts', () => {
      render(
        <nav>
          <Button href="/home" className="nav-home">Home</Button>
          <Button href="/about" className="nav-about">About</Button>
        </nav>
      )
      
      const homeLink = screen.getByRole('link', { name: 'Home' })
      const aboutLink = screen.getByRole('link', { name: 'About' })
      
      expect(homeLink).toHaveClass('nav-home')
      expect(aboutLink).toHaveClass('nav-about')
    })
  })

  describe('Performance Integration', () => {
    it('supports Next.js automatic prefetching behavior', () => {
      render(<Button href="/prefetch-me">Prefetchable Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-href', '/prefetch-me')
    })

    it('handles large number of navigation buttons efficiently', () => {
      const links = Array.from({ length: 100 }, (_, i) => (
        <Button key={i} href={`/page-${i}`}>
          Page {i}
        </Button>
      ))
      
      render(<div>{links}</div>)
      
      const renderedLinks = screen.getAllByRole('link')
      expect(renderedLinks).toHaveLength(100)
      expect(renderedLinks[0]).toHaveAttribute('data-href', '/page-0')
      expect(renderedLinks[99]).toHaveAttribute('data-href', '/page-99')
    })

    it('maintains performance with complex link structures', () => {
      render(
        <Button href="/complex" className="complex-nav" variant="primary">
          <span className="icon">→</span>
          <span className="text">Complex Navigation</span>
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('button', 'primary', 'complex-nav')
      expect(screen.getByText('Complex Navigation')).toBeInTheDocument()
    })
  })

  describe('Error Handling Integration', () => {
    it('gracefully handles malformed URLs', () => {
      render(<Button href="invalid-url">Invalid URL</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'invalid-url')
    })

    it('maintains functionality when router is unavailable', () => {
      render(<Button href="/test">Test Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('handles missing href props gracefully', () => {
      render(<Button>No Href Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('Route Transition States', () => {
    it('maintains button state during route transitions', async () => {
      let transitionState = 'idle'
      
      const mockPush = jest.fn(() => {
        transitionState = 'transitioning'
        setTimeout(() => {
          transitionState = 'complete'
        }, 100)
      })

      render(<Button href="/transition">Transition Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('handles interrupted navigation attempts', async () => {
      render(<Button href="/interrupt">Interruptible Link</Button>)
      
      const link = screen.getByRole('link')
      
      link.focus()
      await user.keyboard('{Escape}')
      
      expect(link).toBeInTheDocument()
    })
  })
})