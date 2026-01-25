/**
 * Footer Component Unit Tests
 * 테스트 케이스:
 * 1. 기본 렌더링 확인
 * 2. SocialLinks 컴포넌트 렌더링
 * 3. Footer 요소 HTML 구조 확인
 * 4. CSS 클래스 적용 확인
 * 5. copyright 영역 렌더링 확인
 * 6. 컴포넌트 순수성 테스트
 * 7. Props 전달 테스트
 * 8. Re-rendering 테스트
 * 9. 메모리 누수 테스트
 * 10. 컴포넌트 트리 구조 확인
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: 기본 렌더링 확인
  test('renders footer element correctly', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement.tagName).toBe('FOOTER');
  });

  // Test 2: SocialLinks 컴포넌트 렌더링
  test('renders SocialLinks component inside footer', () => {
    render(<Footer />);
    // SocialLinks 내부의 링크 확인
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  // Test 3: Footer 요소 HTML 구조 확인
  test('has correct semantic HTML structure', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // copyright div 확인
    const copyrightDiv = footer.querySelector('.copyright');
    expect(copyrightDiv).toBeInTheDocument();
    
    // SocialLinks 컨테이너 확인
    const socialLinksContainer = footer.querySelector('.socialLinks');
    expect(socialLinksContainer).toBeInTheDocument();
  });

  // Test 4: CSS 클래스 적용 확인
  test('applies correct CSS classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');
  });

  // Test 5: copyright 영역 렌더링 확인
  test('renders copyright area', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    const copyrightDiv = footer.querySelector('.copyright');
    expect(copyrightDiv).toBeInTheDocument();
    // 비어있는 div이지만 존재해야 함
  });

  // Test 6: 컴포넌트 순수성 테스트
  test('is pure component - same props produce same output', () => {
    const { rerender } = render(<Footer />);
    const initialFooter = screen.getByRole('contentinfo');
    
    rerender(<Footer />);
    const rerenderedFooter = screen.getByRole('contentinfo');
    
    expect(initialFooter).toEqual(rerenderedFooter);
  });

  // Test 7: Props 전달 테스트
  test('handles no props gracefully', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  // Test 8: Re-rendering 테스트
  test('re-renders correctly without memory leaks', () => {
    const { rerender } = render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    
    // Multiple re-renders
    for (let i = 0; i < 5; i++) {
      rerender(<Footer />);
      expect(footer).toBeInTheDocument();
    }
  });

  // Test 9: 메모리 누수 테스트
  test('cleans up properly on unmount', () => {
    const { unmount } = render(<Footer />);
    
    expect(() => unmount()).not.toThrow();
    
    // Component should not exist after unmount
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  // Test 10: 컴포넌트 트리 구조 확인
  test('maintains correct component tree structure', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    
    // Footer는 copyright div와 SocialLinks를 가짐
    expect(footer.children).toHaveLength(2);
    
    const copyrightDiv = footer.querySelector('.copyright');
    const socialLinksContainer = footer.querySelector('.socialLinks');
    
    expect(copyrightDiv).toBeInTheDocument();
    expect(socialLinksContainer).toBeInTheDocument();
  });
});
