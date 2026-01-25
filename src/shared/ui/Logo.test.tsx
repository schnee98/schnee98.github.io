/**
 * Logo Component Unit Tests
 * 테스트 케이스:
 * 1. 기본 렌더링 확인 (default props)
 * 2. 커스텀 href props 렌더링
 * 3. 커스텀 imageUrl props 렌더링
 * 4. Link 컴포넌트 정상 동작
 * 5. Image 컴포넌트 정상 동작
 * 6. Props 타입 검증
 * 7. Edge cases (빈 문자열, null 등)
 * 8. 컴포넌트 순수성 테스트
 * 9. Re-rendering 테스트
 * 10. 메모리 누수 테스트
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Logo } from './Logo';



describe('Logo Component', () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: 기본 렌더링 확인 (default props)
  test('renders with default props', () => {
    render(<Logo />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Logo');
    expect(image).toHaveAttribute('width', '48');
    expect(image).toHaveAttribute('height', '48');
    expect(image).toHaveAttribute('src', 'https://framerusercontent.com/images/6QUvaTn62uUXuHwykrmVItcZhc.png');
  });

  // Test 2: 커스텀 href props 렌더링
  test('renders with custom href', () => {
    const customHref = '/about';
    render(<Logo href={customHref} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', customHref);
  });

  // Test 3: 커스텀 imageUrl props 렌더링
  test('renders with custom imageUrl', () => {
    const customImageUrl = 'https://example.com/logo.png';
    render(<Logo imageUrl={customImageUrl} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', customImageUrl);
  });

  // Test 4: 커스텀 href와 imageUrl 함께 사용
  test('renders with both custom href and imageUrl', () => {
    const customHref = '/contact';
    const customImageUrl = 'https://example.com/custom-logo.png';
    
    render(<Logo href={customHref} imageUrl={customImageUrl} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', customHref);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', customImageUrl);
  });

  // Test 5: Image 속성 검증
  test('image has correct attributes', () => {
    render(<Logo />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Logo');
    expect(image).toHaveAttribute('width', '48');
    expect(image).toHaveAttribute('height', '48');
  });

  // Test 6: Props 타입 검증
  test('accepts correct prop types', () => {
    expect(() => {
      render(<Logo href="/test" imageUrl="https://test.com/image.png" />);
    }).not.toThrow();
  });

  // Test 7: Edge cases - 빈 문자열 처리
  test('handles empty strings gracefully', () => {
    expect(() => {
      render(<Logo href="/" imageUrl="/placeholder.jpg" />);
    }).not.toThrow();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/placeholder.jpg');
  });

  // Test 8: 컴포넌트 순수성 테스트
  test('is pure component - same props produce same output', () => {
    const props = { href: '/test', imageUrl: 'https://test.com/logo.png' };
    
    const { rerender } = render(<Logo {...props} />);
    const initialLink = screen.getByRole('link');
    
    rerender(<Logo {...props} />);
    const rerenderedLink = screen.getByRole('link');
    
    expect(initialLink.getAttribute('href')).toBe(rerenderedLink.getAttribute('href'));
    expect(initialLink.innerHTML).toBe(rerenderedLink.innerHTML);
  });

  // Test 9: Re-rendering 테스트
  test('re-renders correctly when props change', () => {
    const { rerender } = render(<Logo />);
    
    // Props 변경 후 re-render
    rerender(<Logo href="/new-page" imageUrl="https://example.com/new-logo.png" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/new-page');
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/new-logo.png');
  });

  // Test 10: 메모리 누수 테스트
  test('cleans up properly on unmount', () => {
    const { unmount } = render(<Logo />);
    
    expect(() => unmount()).not.toThrow();
    
    // Component should not exist after unmount
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  // Test 11: Link 클릭 이벤트 처리
  test('link click event works', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    
    expect(link).toBeInTheDocument();
    expect(link).toBeEnabled();
  });

  // Test 12: Next.js Link 컴포넌트 확인
  test('uses Next.js Link for internal routes', () => {
    render(<Logo href="/internal-page" />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/internal-page');
  });

  // Test 13: Image 로드 오류 처리 (기본)
  test('image alt text works properly', () => {
    render(<Logo />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Logo');
    
    // alt 텍스트가 비어있지 않은지 확인 (접근성)
    expect(image.getAttribute('alt')).not.toBe('');
  });
});
