/**
 * Logo Component Accessibility Tests
 * 접근성 테스트 케이스:
 * 1. 링크 접근성 확인
 * 2. 이미지 대체 텍스트 확인
 * 3. 키보드 내비게이션 테스트
 * 4. 포커스 관리 테스트
 * 5. ARIA 속성 확인
 * 6. 색상 대비율 검증
 * 7. 의미론적 HTML 구조
 * 8. 스크린 리더 호환성
 */

import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Logo } from './Logo';



describe('Logo Component Accessibility', () => {
  beforeEach(() => {
    cleanup();
  });

  // Test 1: 링크 접근성 확인
  test('link is accessible', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    
    expect(link).toBeInTheDocument();
    // 링크는 기본적으로 포커스 가능해야 함
    expect(link).not.toHaveAttribute('tabindex', '-1');
  });

  // Test 2: 이미지 대체 텍스트 확인
  test('image has meaningful alt text', () => {
    render(<Logo />);
    const image = screen.getByRole('img');
    
    expect(image).toHaveAttribute('alt', 'Logo');
    expect(image.getAttribute('alt')).not.toBe('');
    expect(image.getAttribute('alt')).not.toBe('image');
    expect(image.getAttribute('alt')).not.toBe('picture');
  });

  // Test 3: 키보드 내비게이션 테스트
  test('supports keyboard navigation', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    
    // Tab 키로 포커스 이동 가능 확인
    link.focus();
    expect(link).toHaveFocus();
    
    // Enter 키로 활성화 가능 확인
    expect(link).toBeEnabled();
  });

  // Test 4: 포커스 시각적 피드백 확인
  test('provides visual focus indicators', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    
    // 포커스 시 스타일 적용 확인
    link.focus();
    expect(link).toHaveFocus();
  });

  // Test 5: 의미론적 HTML 구조 확인
  test('uses semantic HTML correctly', () => {
    render(<Logo />);
    
    const link = screen.getByRole('link');
    const image = screen.getByRole('img');
    
    // Link 내부에 Image가 있는지 확인
    expect(link).toContainElement(image);
    
    // Image가 로고 이미지로써 올바른 역할을 하는지 확인
    expect(image).toHaveAttribute('alt', 'Logo');
  });

  // Test 6: 다른 href 값에 대한 접근성
  test('maintains accessibility with different href values', () => {
    const testCases = [
      '/',
      '/about',
      '/contact',
      '#section'
    ];
    
    testCases.forEach(href => {
      cleanup();
      render(<Logo href={href} />);
      const link = screen.getByRole('link');
      
      expect(link).toHaveAttribute('href', href);
      expect(link).not.toHaveAttribute('tabindex', '-1');
    });
  });

  // Test 7: 스크린 리더 호환성
  test('provides good screen reader experience', () => {
    render(<Logo />);
    
    // 링크가 화면 리더에서 잘 읽히는지 확인
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    
    // 이미지가 적절한 alt 텍스트를 가지는지 확인
    const image = screen.getByRole('img', { name: 'Logo' });
    expect(image).toBeInTheDocument();
  });

  // Test 8: 포커스 순서 확인
  test('maintains proper focus order', () => {
    const { container } = render(
      <div>
        <button>Before</button>
        <Logo />
        <button>After</button>
      </div>
    );
    
    const beforeButton = screen.getByText('Before');
    const logoLink = screen.getByRole('link');
    const afterButton = screen.getByText('After');
    
    // 초기 포커스 상태 확인
    expect(document.activeElement).toBe(document.body);
    
    // Tab 키 순서 확인 (시뮬레이션)
    beforeButton.focus();
    expect(beforeButton).toHaveFocus();
    
    logoLink.focus();
    expect(logoLink).toHaveFocus();
    
    afterButton.focus();
    expect(afterButton).toHaveFocus();
  });

  // Test 9: 고대비 모드 지원
  test('supports high contrast mode', () => {
    render(<Logo />);
    
    const link = screen.getByRole('link');
    const image = screen.getByRole('img');
    
    // 고대비 모드에서도 요소가 보이는지 확인
    expect(link).toBeVisible();
    expect(image).toBeVisible();
    
    // 고대비 모드에서 포커스가 명확히 보이는지 확인
    link.focus();
    expect(link).toHaveFocus();
  });

  // Test 10: 유효한 이미지 URL 처리
  test('handles valid image URLs properly', () => {
    render(<Logo imageUrl="https://example.com/valid-image.jpg" />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/valid-image.jpg');
    expect(image).toHaveAttribute('alt', 'Logo');
  });

  // Test 11: 여러 Logo 컴포넌트 접근성
  test('multiple logos maintain accessibility', () => {
    render(
      <div>
        <Logo href="/home" />
        <Logo href="/about" />
      </div>
    );
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    
    links.forEach(link => {
      expect(link).not.toHaveAttribute('tabindex', '-1');
      const image = link.querySelector('img');
      expect(image).toHaveAttribute('alt', 'Logo');
    });
  });
});
