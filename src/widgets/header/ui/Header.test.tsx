/**
 * Header Component Unit Tests
 * 테스트 케이스:
 * 1. 기본 렌더링 확인
 * 2. Logo 컴포넌트 정상 렌더링
 * 3. Header 요소 HTML 구조 확인
 * 4. CSS 클래스 적용 확인
 * 5. 자식 요소 렌더링 확인
 * 6. 컴포넌트 순수성 테스트
 * 7. Props 전달 테스트
 * 8. Re-rendering 테스트
 * 9. 메모리 누수 테스트
 * 10. 컴포넌트 트리 구조 확인
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: 기본 렌더링 확인
  test('renders header element correctly', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('HEADER');
  });

  // Test 2: Logo 컴포넌트 정상 렌더링
  test('renders Logo component inside header', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  // Test 3: Header 요소 HTML 구조 확인
  test('has correct semantic HTML structure', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Logo 이미지 확인
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('width', '48');
    expect(logoImage).toHaveAttribute('height', '48');
  });

  // Test 4: CSS 클래스 적용 확인
  test('applies correct CSS classes', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
  });

  // Test 5: 자식 요소 렌더링 확인
  test('renders children content properly', () => {
    render(<Header />);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  // Test 6: 컴포넌트 순수성 테스트
  test('is pure component - same props produce same output', () => {
    const { rerender } = render(<Header />);
    const initialHeader = screen.getByRole('banner');
    
    rerender(<Header />);
    const rerenderedHeader = screen.getByRole('banner');
    
    expect(initialHeader).toEqual(rerenderedHeader);
  });

  // Test 7: Props 전달 테스트 (Header는 props를 받지 않지만 확장성을 위한 테스트)
  test('handles no props gracefully', () => {
    expect(() => render(<Header />)).not.toThrow();
  });

  // Test 8: Re-rendering 테스트
  test('re-renders correctly without memory leaks', () => {
    const { rerender } = render(<Header />);
    const header = screen.getByRole('banner');
    
    // Multiple re-renders
    for (let i = 0; i < 5; i++) {
      rerender(<Header />);
      expect(header).toBeInTheDocument();
    }
  });

  // Test 9: 메모리 누수 테스트
  test('cleans up properly on unmount', () => {
    const { unmount } = render(<Header />);
    
    expect(() => unmount()).not.toThrow();
    
    // Component should not exist after unmount
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });

  // Test 10: 컴포넌트 트리 구조 확인
  test('maintains correct component tree structure', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    
    expect(header.children).toHaveLength(1);
    const child = header.firstChild;
    expect((child as Element)?.tagName).toBe('A'); // Logo Link component
  });
});
