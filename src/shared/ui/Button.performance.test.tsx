import { render, screen } from '@testing-library/react'
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

describe('Button Performance Tests', () => {
  describe('Rendering Performance', () => {
    it('renders single button efficiently', () => {
      const startTime = performance.now()
      
      render(<Button>Performance Test</Button>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      expect(renderTime).toBeLessThan(100)
    })

    it('handles 100 buttons efficiently', () => {
      const startTime = performance.now()
      
      const buttons = Array.from({ length: 100 }, (_, i) => (
        <Button key={i} variant={i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'icon'}>
          Button {i}
        </Button>
      ))
      
      render(<div>{buttons}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const renderedButtons = screen.getAllByRole('button')
      expect(renderedButtons).toHaveLength(100)
      
      expect(renderTime).toBeLessThan(100)
    })

    it('handles 1000 buttons within reasonable time', () => {
      const startTime = performance.now()
      
      const buttons = Array.from({ length: 1000 }, (_, i) => (
        <Button key={i} variant="primary" className={`btn-${i}`}>
          Button {i}
        </Button>
      ))
      
      render(<div>{buttons}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const renderedButtons = screen.getAllByRole('button')
      expect(renderedButtons).toHaveLength(1000)
      
      expect(renderTime).toBeLessThan(300)
    })

    it('performs well with complex children structures', () => {
      const startTime = performance.now()
      
      const complexChildren = Array.from({ length: 50 }, (_, i) => (
        <Button key={i} variant="icon">
          <div style={{ padding: '8px' }}>
            <span>Icon {i}</span>
            <div>Nested content</div>
          </div>
        </Button>
      ))
      
      render(<div>{complexChildren}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const renderedButtons = screen.getAllByRole('button')
      expect(renderedButtons).toHaveLength(50)
      
      expect(renderTime).toBeLessThan(30)
    })
  })

  describe('Memory Usage', () => {
    it('does not create memory leaks on repeated mounting', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0
      
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<Button key={i}>Test {i}</Button>)
        unmount()
      }
      
      if ((performance as any).memory) {
        const finalMemory = (performance as any).memory.usedJSHeapSize
        const memoryIncrease = finalMemory - initialMemory
        
        expect(memoryIncrease).toBeLessThan(1024 * 1024)
      }
    })

    it('cleans up event handlers properly', () => {
      const handlers = Array.from({ length: 50 }, () => jest.fn())
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <Button key={i} onClick={handlers[i]}>
            Button {i}
          </Button>
        )
        unmount()
      }
      
      handlers.forEach(handler => {
        expect(handler).not.toHaveBeenCalled()
      })
    })

    it('handles large className strings efficiently', () => {
      const largeClassName = 'class-' + 'a'.repeat(1000)
      
      const startTime = performance.now()
      
      render(<Button className={largeClassName}>Large Class</Button>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      expect(renderTime).toBeLessThan(10)
    })
  })

  describe('Link Performance', () => {
    it('renders internal links efficiently', () => {
      const startTime = performance.now()
      
      const links = Array.from({ length: 100 }, (_, i) => (
        <Button key={i} href={`/page-${i}`} variant="primary">
          Link {i}
        </Button>
      ))
      
      render(<div>{links}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const renderedLinks = screen.getAllByRole('link')
      expect(renderedLinks).toHaveLength(100)
      
      expect(renderTime).toBeLessThan(100)
    })

    it('renders external links efficiently', () => {
      const startTime = performance.now()
      
      const externalLinks = Array.from({ length: 50 }, (_, i) => (
        <Button 
          key={i} 
          href={`https://example-${i}.com`} 
          openInNewTab
          variant="secondary"
        >
          External {i}
        </Button>
      ))
      
      render(<div>{externalLinks}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const renderedLinks = screen.getAllByRole('link')
      expect(renderedLinks).toHaveLength(50)
      
      expect(renderTime).toBeLessThan(30)
    })

    it('handles mixed link types efficiently', () => {
      const startTime = performance.now()
      
      const mixedButtons = Array.from({ length: 60 }, (_, i) => {
        if (i % 3 === 0) {
          return <Button key={i} href={`/internal-${i}`}>Internal {i}</Button>
        } else if (i % 3 === 1) {
          return <Button key={i} href={`https://external-${i}.com`}>External {i}</Button>
        } else {
          return <Button key={i}>Regular {i}</Button>
        }
      })
      
      render(<div>{mixedButtons}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const buttons = screen.getAllByRole('button')
      const links = screen.getAllByRole('link')
      
      expect(buttons.length + links.length).toBe(60)
      expect(renderTime).toBeLessThan(40)
    })
  })

  describe('Variant Performance', () => {
    it('performs consistently across all variants', () => {
      const variants = ['primary', 'secondary', 'icon'] as const
      const renderTimes: number[] = []
      
      variants.forEach(variant => {
        const startTime = performance.now()
        
        const buttons = Array.from({ length: 30 }, (_, i) => (
          <Button key={i} variant={variant}>
            {variant} {i}
          </Button>
        ))
        
        const { unmount } = render(<div>{buttons}</div>)
        
        const endTime = performance.now()
        renderTimes.push(endTime - startTime)
        
        const renderedButtons = screen.getAllByRole('button')
        expect(renderedButtons).toHaveLength(30)
        
        unmount()
      })
      
      const maxRenderTime = Math.max(...renderTimes)
      const minRenderTime = Math.min(...renderTimes)
      const variance = maxRenderTime - minRenderTime
      
      expect(variance).toBeLessThan(20)
    })

    it('handles variant switching efficiently', () => {
      const startTime = performance.now()
      
      const { rerender } = render(<Button variant="primary">Test</Button>)
      
      for (let i = 0; i < 50; i++) {
        const variant = ['primary', 'secondary', 'icon'][i % 3] as any
        rerender(<Button variant={variant}>Test</Button>)
      }
      
      const endTime = performance.now()
      const totalTime = endTime - startTime
      
      expect(totalTime).toBeLessThan(100)
    })
  })

  describe('CSS Performance', () => {
    it('handles multiple className combinations efficiently', () => {
      const startTime = performance.now()
      
      const buttons = Array.from({ length: 100 }, (_, i) => (
        <Button 
          key={i} 
          variant={i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'icon'}
          className={`custom-${i} extra-${i % 5}`}
        >
          Button {i}
        </Button>
      ))
      
      render(<div>{buttons}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const renderedButtons = screen.getAllByRole('button')
      expect(renderedButtons).toHaveLength(100)
      
      expect(renderTime).toBeLessThan(100)
    })

    it('applies CSS classes consistently', () => {
      const startTime = performance.now()
      
      const buttons = Array.from({ length: 30 }, (_, i) => {
        const variant = ['primary', 'secondary', 'icon'][i % 3] as any
        return (
          <Button 
            key={i} 
            variant={variant} 
            className={`class-${i}`}
          >
            {variant} Button
          </Button>
        )
      })
      
      render(<div>{buttons}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const allButtons = screen.getAllByRole('button')
      allButtons.forEach((button, i) => {
        const variant = ['primary', 'secondary', 'icon'][i % 3]
        expect(button).toHaveClass('button', variant as string, `class-${i}`)
      })
      
      expect(renderTime).toBeLessThan(25)
    })
  })

  describe('Re-render Performance', () => {
    it('re-renders efficiently with prop changes', () => {
      const { rerender } = render(<Button>Initial</Button>)
      
      const startTime = performance.now()
      
      for (let i = 0; i < 20; i++) {
        rerender(<Button>Update {i}</Button>)
      }
      
      const endTime = performance.now()
      const rerenderTime = endTime - startTime
      
      expect(rerenderTime).toBeLessThan(100)
    })

    it('handles variant changes efficiently', () => {
      const { rerender } = render(<Button variant="primary">Test</Button>)
      
      const startTime = performance.now()
      
      for (let i = 0; i < 20; i++) {
        const variant = ['primary', 'secondary', 'icon'][i % 3] as any
        rerender(<Button variant={variant}>Test</Button>)
      }
      
      const endTime = performance.now()
      const rerenderTime = endTime - startTime
      
      expect(rerenderTime).toBeLessThan(100)
    })

    it('handles className changes efficiently', () => {
      const { rerender } = render(<Button className="initial">Test</Button>)
      
      const startTime = performance.now()
      
      for (let i = 0; i < 20; i++) {
        rerender(<Button className={`update-${i}`}>Test</Button>)
      }
      
      const endTime = performance.now()
      const rerenderTime = endTime - startTime
      
      expect(rerenderTime).toBeLessThan(100)
    })
  })

  describe('Complex Scenario Performance', () => {
    it('handles mixed scenarios efficiently', () => {
      const startTime = performance.now()
      
      const complexButtons = Array.from({ length: 100 }, (_, i) => {
        const isLink = i % 2 === 0
        const isExternal = i % 3 === 0
        const variant = ['primary', 'secondary', 'icon'][i % 3] as any
        
        if (isLink) {
          const href = isExternal 
            ? `https://external-${i}.com` 
            : `/internal-${i}`
          return (
            <Button 
              key={i} 
              href={href} 
              variant={variant}
              openInNewTab={isExternal}
              className={`complex-${i}`}
            >
              Link {i}
            </Button>
          )
        } else {
          return (
            <Button 
              key={i} 
              variant={variant}
              className={`complex-${i}`}
            >
              Button {i}
            </Button>
          )
        }
      })
      
      render(<div>{complexButtons}</div>)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      const buttons = screen.getAllByRole('button')
      const links = screen.getAllByRole('link')
      
      expect(buttons.length + links.length).toBe(100)
      expect(renderTime).toBeLessThan(100)
    })

    it('maintains performance under stress', () => {
      const stressTestIterations = 10
      
      for (let iteration = 0; iteration < stressTestIterations; iteration++) {
        const startTime = performance.now()
        
        const stressButtons = Array.from({ length: 200 }, (_, i) => (
          <Button 
            key={i} 
            variant={['primary', 'secondary', 'icon'][i % 3] as any}
            className={`stress-${iteration}-${i}`}
            href={i % 2 === 0 ? `/page-${i}` : undefined}
          >
            Stress {iteration}-{i}
          </Button>
        ))
        
        render(<div>{stressButtons}</div>)
        
        const endTime = performance.now()
        const renderTime = endTime - startTime
        
        expect(renderTime).toBeLessThan(150)
      }
    })
  })
})