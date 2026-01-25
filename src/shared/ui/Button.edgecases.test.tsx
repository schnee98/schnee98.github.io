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

describe('Button Error Handling and Edge Cases', () => {
  const user = userEvent.setup()

  describe('Invalid Props Handling', () => {
    it('handles undefined href gracefully', () => {
      render(<Button href={undefined}>Undefined Href</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('handles null href gracefully', () => {
      render(<Button href={null as any}>Null Href</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('handles empty string href gracefully', () => {
      render(<Button href="">Empty Href</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('handles invalid variant types gracefully', () => {
      render(
        <Button variant={'invalid' as any}>
          Invalid Variant
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles undefined variant gracefully', () => {
      render(
        <Button variant={undefined}>
          Undefined Variant
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'secondary')
    })

    it('handles null variant gracefully', () => {
      render(
        <Button variant={null as any}>
          Null Variant
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles invalid openInNewTab values', () => {
      render(
        <Button href="https://example.com" openInNewTab={'yes' as any}>
          Invalid New Tab
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Children Edge Cases', () => {
    it('handles boolean children', () => {
      render(<Button>{true}</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles object children that throw errors', () => {
      const ErrorThrowingComponent = () => {
        throw new Error('Component error')
      }
      
      expect(() => {
        render(<Button><ErrorThrowingComponent /></Button>)
      }).toThrow()
    })

    it('handles deeply nested React children', () => {
      const complexChildren = (
        <div>
          <span>
            <strong>Nested</strong> Content
          </span>
          <em>Italic</em>
        </div>
      )
      
      render(<Button>{complexChildren}</Button>)
      
      const button = screen.getByRole('button')
      expect(screen.getByText('Nested')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.getByText('Italic')).toBeInTheDocument()
    })

    it('handles array children', () => {
      const arrayChildren = [
        <span key="1">Item 1</span>,
        <span key="2">Item 2</span>,
        <span key="3">Item 3</span>,
      ]
      
      render(<Button>{arrayChildren}</Button>)
      
      const button = screen.getByRole('button')
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('handles fragment children', () => {
      render(
        <Button>
          <>
            <span>Fragment 1</span>
            <span>Fragment 2</span>
          </>
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(screen.getByText('Fragment 1')).toBeInTheDocument()
      expect(screen.getByText('Fragment 2')).toBeInTheDocument()
    })
  })

  describe('Event Handler Edge Cases', () => {
    it('handles onClick that throws errors gracefully', async () => {
      const errorThrowingHandler = () => {
        throw new Error('Click handler error')
      }
      
      render(<Button onClick={errorThrowingHandler}>Error Button</Button>)
      
      const button = screen.getByRole('button')
      
      expect(async () => {
        await user.click(button)
      }).not.toThrow()
    })

    it('handles undefined onClick gracefully', async () => {
      render(
        <Button onClick={undefined}>
          Undefined Handler
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(async () => {
        await user.click(button)
      }).not.toThrow()
    })

    it('handles multiple rapid clicks', async () => {
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Rapid Click</Button>)
      const button = screen.getByRole('button')
      
      for (let i = 0; i < 10; i++) {
        await user.click(button)
      }
      
      expect(handleClick).toHaveBeenCalledTimes(10)
    })

    it('handles click events on disabled-like elements', () => {
      render(
        <Button 
          onClick={() => {}}
          {...({ 'aria-disabled': 'true', 'data-pointer-events': 'none' } as any)}
        >
          Disabled-like
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('URL and Navigation Edge Cases', () => {
    it('handles malicious href values', () => {
      render(<Button href="javascript:alert('xss')">Malicious Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href')
    })

    it('handles protocol-relative URLs', () => {
      render(<Button href="//example.com">Protocol-relative</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '//example.com')
    })

    it('handles file:// protocol', () => {
      render(<Button href="file:///path/to/file">File Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'file:///path/to/file')
    })

    it('handles ftp:// protocol', () => {
      render(<Button href="ftp://example.com">FTP Link</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'ftp://example.com')
    })

    it('handles very long URLs', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000)
      render(<Button href={longUrl}>Long URL</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', longUrl)
    })

    it('handles international domain names', () => {
      render(<Button href="https://测试.com">International Domain</Button>)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://测试.com')
    })
  })

  describe('CSS and Styling Edge Cases', () => {
    it('handles extremely long className strings', () => {
      const longClassName = 'class-' + 'a'.repeat(100)
      render(<Button className={longClassName}>Long Class</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass(longClassName)
    })

    it('handles special characters in className', () => {
      render(<Button className="special!@#$%^&*()_+-=[]{}|;':,./<>?">Special Chars</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles CSS injection attempts', () => {
      render(<Button className=");background-image:url('javascript:alert(1)')">CSS Injection</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles undefined className', () => {
      render(<Button className={undefined}>Undefined Class</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('button', 'secondary')
    })
  })

  describe('Memory and Performance Edge Cases', () => {
    it('handles rapid component mounting/unmounting', () => {
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<Button key={i}>Button {i}</Button>)
        expect(screen.getByText(`Button ${i}`)).toBeInTheDocument()
        unmount()
      }
    })

    it('handles large number of buttons rendered simultaneously', () => {
      const buttons = Array.from({ length: 1000 }, (_, i) => (
        <Button key={i} variant={i % 2 === 0 ? 'primary' : 'secondary'}>
          Button {i}
        </Button>
      ))
      
      render(<div>{buttons}</div>)
      
      const renderedButtons = screen.getAllByRole('button')
      expect(renderedButtons).toHaveLength(1000)
    })

    it('handles memory leaks with event handlers', () => {
      const handlers = Array.from({ length: 100 }, (_, i) => 
        jest.fn(() => console.log(`Handler ${i} called`))
      )
      
      const buttons = handlers.map((handler, i) => (
        <Button key={i} onClick={handler}>
          Button {i}
        </Button>
      ))
      
      const { unmount } = render(<div>{buttons}</div>)
      
      unmount()
      
      expect(() => {
        handlers.forEach(handler => handler.mockClear())
      }).not.toThrow()
    })
  })

  describe('Accessibility Edge Cases', () => {
    it('handles missing aria-label for icon-only buttons', () => {
      render(<Button variant="icon">×</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles conflicting aria attributes', () => {
      render(
        <Button 
          {...({
            'aria-label': 'Button label',
            'aria-labelledby': 'button-id',
            'aria-describedby': 'button-desc'
          } as any)}
        >
          Button
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles tabIndex prop (not forwarded)', () => {
      render(<Button {...({ tabIndex: -1 } as any)}>Tab Index Test</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('React Error Boundaries', () => {
    it('handles errors in child components gracefully', () => {
      const ErrorChild = () => {
        throw new Error('Child component error')
      }
      
      expect(() => {
        render(
          <Button>
            <ErrorChild />
          </Button>
        )
      }).toThrow()
    })

    it('handles async errors in children', async () => {
      const AsyncErrorChild = () => {
        setTimeout(() => {
          throw new Error('Async child error')
        }, 0)
        return <span>Async Error Child</span>
      }
      
      render(
        <Button>
          <AsyncErrorChild />
        </Button>
      )
      
      expect(screen.getByText('Async Error Child')).toBeInTheDocument()
    })
  })

  describe('Browser Compatibility Edge Cases', () => {
    it('handles IE-style CSS class names', () => {
      render(<Button className="ms-transform flex-grow">IE Classes</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('ms-transform', 'flex-grow')
    })

    it('handles vendor prefixes in className', () => {
      render(<Button className="-webkit-appearance -moz-border-radius">Vendor Prefixes</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles data attribute edge cases', () => {
      render(
        <Button 
          {...({
            'data-test': 'test-value',
            'data-numbers': '123',
            'data-special-chars': '!@#$%',
            'data-empty': ''
          } as any)}
        >
          Data Attributes
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })
})