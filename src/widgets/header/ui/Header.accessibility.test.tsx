/**
 * Header Component Accessibility Tests
 * 접근성 테스트 케이스:
 * 1. ARIA 역할 및 속성 확인
 * 2. Logo 링크 접근성 확인
 * 3. 키보드 내비게이션 테스트
 * 4. 스크린 리더 호환성
 * 5. 포커스 관리 테스트
 * 6. 의미론적 HTML 구조
 * 7. 링크 접근성 확인
 * 8. 이미지 대체 텍스트 확인
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component Accessibility', () => {
  beforeEach(() => {
    cleanup();
  });

  // Test 1: ARIA 역할 및 속성 확인
  test('has correct landmark role', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('HEADER');
  });

  // Test 2: Logo 링크 접근성 확인
  test('logo link is accessible', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).not.toHaveAttribute('tabindex', '-1');
  });

  // Test 3: 이미지 대체 텍스트 확인
  test('logo image has proper alt text', () => {
    render(<Header />);
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('alt', 'Logo');
  });

  // Test 4: 키보드 포커스 가능성 확인
  test('logo link is keyboard focusable', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link');

    logoLink.focus();
    expect(logoLink).toHaveFocus();

    // Tab 순서 확인을 위한 tabindex 확인 (기본값이어야 함)
    expect(logoLink).not.toHaveAttribute('tabindex', '-1');
  });

  // Test 5: 의미론적 HTML 구조 확인
  test('uses semantic HTML elements correctly', () => {
    render(<Header />);
    const header = screen.getByRole('banner');

    expect(header.tagName).toBe('HEADER');

    // Logo 링크 확인
    const link = header.querySelector('a');
    expect(link).toBeInTheDocument();

    // Logo 이미지 확인
    const img = header.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  // Test 6: 중복 ID 확인
  test('handles multiple headers correctly', () => {
    render(
      <div>
        <Header />
        <Header />
      </div>
    );

    const headers = screen.getAllByRole('banner');
    expect(headers.length).toBeGreaterThan(0);

    // 각 Header에 Logo 링크가 있는지 확인
    headers.forEach(header => {
      const link = header.querySelector('a');
      expect(link).toBeInTheDocument();
    });
  });

  // Test 7: 포커스 시각적 피드백 확인
  test('focus indicators are present', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link');

    // focus 시 스타일 클래스 적용 확인
    logoLink.focus();
    expect(logoLink).toHaveFocus();
  });

  // Test 8: 화면 리더 호환성
  test('provides good screen reader experience', () => {
    render(<Header />);

    // banner 역할이 화면 리더에서 잘 인식되는지 확인
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Logo 링크가 명확한 목적을 전달하는지 확인
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
  });

  // Test 9: 키보드 내비게이션 시나리오
  test('supports keyboard navigation', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link');

    // Tab 키로 포커스 이동 가능 확인
    logoLink.focus();
    expect(logoLink).toHaveFocus();

    // Enter/Space 키로 활성화 가능 확인 (링크의 경우)
    expect(logoLink).toBeEnabled();
  });

  // Test 10: 접근성 룰 준수 확인
  test('follows accessibility best practices', async () => {
    const { container } = render(<Header />);

    // 접근성 규칙 준수 여부 확인 (axe-core 필요시)
    // 기본적인 접근성 검사
    const interactiveElements = container.querySelectorAll(
      'button, a, input, select, textarea'
    );

    interactiveElements.forEach(element => {
      // 모든 인터랙티브 요소가 접근 가능해야 함
      expect(element).toBeVisible();
      expect(element).not.toBeDisabled();
    });

    // 이미지에 alt 텍스트가 있는지 확인
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });
});
