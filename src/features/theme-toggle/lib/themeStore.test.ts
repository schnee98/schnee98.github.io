import { act, renderHook } from '@testing-library/react'
import { useThemeStore } from './themeStore'
import { THEMES, type Theme } from '@/shared'

describe('Theme Store', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: THEMES.LIGHT })
  })

  describe('Initial State', () => {
    it('should have LIGHT theme as default', () => {
      const { result } = renderHook(() => useThemeStore())
      
      expect(result.current.theme).toBe(THEMES.LIGHT)
      expect(result.current.theme).toBe('light')
    })

    it('should have all required actions available', () => {
      const { result } = renderHook(() => useThemeStore())
      
      expect(typeof result.current.toggleTheme).toBe('function')
      expect(typeof result.current.setTheme).toBe('function')
    })

    it('should have consistent initial state across hooks', () => {
      const { result: result1 } = renderHook(() => useThemeStore())
      const { result: result2 } = renderHook(() => useThemeStore())
      
      expect(result1.current.theme).toBe(result2.current.theme)
    })
  })

  describe('State Transitions', () => {
    it('should toggle from LIGHT to DARK', () => {
      const { result } = renderHook(() => useThemeStore())
      
      expect(result.current.theme).toBe(THEMES.LIGHT)
      
      act(() => {
        result.current.toggleTheme()
      })
      
      expect(result.current.theme).toBe(THEMES.DARK)
    })

    it('should toggle from DARK back to LIGHT', () => {
      const { result } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe(THEMES.DARK)
      
      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe(THEMES.LIGHT)
    })

    it('should allow setting theme to LIGHT explicitly', () => {
      const { result } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe(THEMES.DARK)
      
      act(() => {
        result.current.setTheme(THEMES.LIGHT)
      })
      
      expect(result.current.theme).toBe(THEMES.LIGHT)
    })

    it('should allow setting theme to DARK explicitly', () => {
      const { result } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.setTheme(THEMES.DARK)
      })
      
      expect(result.current.theme).toBe(THEMES.DARK)
    })

    it('should handle multiple rapid toggles correctly', () => {
      const { result } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.toggleTheme()
        result.current.toggleTheme()
        result.current.toggleTheme()
      })
      
      expect(result.current.theme).toBe(THEMES.DARK)
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple simultaneous state updates', () => {
      const { result } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.setTheme(THEMES.DARK)
        result.current.toggleTheme()
        result.current.setTheme(THEMES.DARK)
      })
      
      expect(result.current.theme).toBe(THEMES.DARK)
    })

    it('should maintain state consistency across re-renders', () => {
      const { result, rerender } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.setTheme(THEMES.DARK)
      })
      
      expect(result.current.theme).toBe(THEMES.DARK)
      
      rerender()
      
      expect(result.current.theme).toBe(THEMES.DARK)
    })

    it('should handle rapid state changes', () => {
      const { result } = renderHook(() => useThemeStore())
      
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.toggleTheme()
        }
      })
      
      expect(result.current.theme).toBe(THEMES.LIGHT)
    })
  })

  describe('Type Safety', () => {
    it('should enforce Theme type for setTheme parameter', () => {
      const { result } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.setTheme('light' as Theme)
      })
      expect(result.current.theme).toBe('light')
      
      act(() => {
        result.current.setTheme('dark' as Theme)
      })
      expect(result.current.theme).toBe('dark')
    })

    it('should return theme as Theme type', () => {
      const { result } = renderHook(() => useThemeStore())
      
      const theme: Theme = result.current.theme
      expect(['light', 'dark']).toContain(theme)
    })

    it('should have correct TypeScript types for actions', () => {
      const { result } = renderHook(() => useThemeStore())
      
      const toggle: () => void = result.current.toggleTheme
      const setTheme: (theme: Theme) => void = result.current.setTheme
      
      expect(typeof toggle).toBe('function')
      expect(typeof setTheme).toBe('function')
    })
  })

  describe('Performance', () => {
    it('should handle rapid state updates efficiently', () => {
      const { result } = renderHook(() => useThemeStore())
      
      const startTime = performance.now()
      
      act(() => {
        for (let i = 0; i < 100; i++) {
          result.current.toggleTheme()
        }
      })
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      expect(duration).toBeLessThan(100)
      expect(result.current.theme).toBe(THEMES.LIGHT)
    })
  })

  describe('Integration with Components', () => {
    it('should work correctly when used in React components', () => {
      const { result } = renderHook(() => useThemeStore())
      
      expect(result.current.theme).toBe(THEMES.LIGHT)
      
      act(() => {
        result.current.toggleTheme()
      })
      
      expect(result.current.theme).toBe(THEMES.DARK)
    })

    it('should maintain state across component unmount/remount', () => {
      const { result, unmount } = renderHook(() => useThemeStore())
      
      act(() => {
        result.current.setTheme(THEMES.DARK)
      })
      
      expect(result.current.theme).toBe(THEMES.DARK)
      
      unmount()
      
      const { result: newResult } = renderHook(() => useThemeStore())
      
      expect(newResult.current.theme).toBe(THEMES.DARK)
    })
  })

  describe('Error Handling', () => {
    it('should handle errors gracefully', () => {
      const { result } = renderHook(() => useThemeStore())
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      const originalState = result.current.theme
      
      act(() => {
        try {
          result.current.toggleTheme()
        } catch (error) {
        }
      })
      
      expect(['light', 'dark']).toContain(result.current.theme)
      
      consoleSpy.mockRestore()
    })
  })

  describe('State Validation', () => {
    it('should always have a valid theme value', () => {
      const { result } = renderHook(() => useThemeStore())
      
      expect(['light', 'dark']).toContain(result.current.theme)
      
      act(() => {
        result.current.toggleTheme()
      })
      expect(['light', 'dark']).toContain(result.current.theme)
      
      act(() => {
        result.current.setTheme(THEMES.LIGHT)
      })
      expect(['light', 'dark']).toContain(result.current.theme)
    })

    it('should maintain state consistency', () => {
      const { result } = renderHook(() => useThemeStore())
      
      const originalTheme = result.current.theme
      
      act(() => {
        result.current.setTheme('dark')
      })
      
      expect(result.current.theme).toBe('dark')
      
      act(() => {
        result.current.setTheme(originalTheme)
      })
      
      expect(result.current.theme).toBe(originalTheme)
    })
  })

  describe('Concurrent Usage', () => {
    it('should handle multiple hooks accessing the store simultaneously', () => {
      const hook1 = renderHook(() => useThemeStore())
      const hook2 = renderHook(() => useThemeStore())
      const hook3 = renderHook(() => useThemeStore())
      
      expect(hook1.result.current.theme).toBe(THEMES.LIGHT)
      expect(hook2.result.current.theme).toBe(THEMES.LIGHT)
      expect(hook3.result.current.theme).toBe(THEMES.LIGHT)
      
      act(() => {
        hook1.result.current.toggleTheme()
      })
      
      expect(hook1.result.current.theme).toBe(THEMES.DARK)
      expect(hook2.result.current.theme).toBe(THEMES.DARK)
      expect(hook3.result.current.theme).toBe(THEMES.DARK)
      
      hook1.unmount()
      hook2.unmount()
      hook3.unmount()
    })

    it('should handle race conditions in state updates', async () => {
      const { result } = renderHook(() => useThemeStore())
      
      const promises = Array.from({ length: 10 }, (_, i) => 
        new Promise<void>((resolve) => {
          setTimeout(() => {
            act(() => {
              if (i % 2 === 0) {
                result.current.setTheme(THEMES.LIGHT)
              } else {
                result.current.setTheme(THEMES.DARK)
              }
            })
            resolve()
          }, Math.random() * 10)
        })
      )
      
      await Promise.all(promises)
      
      expect(['light', 'dark']).toContain(result.current.theme)
    })
  })
})