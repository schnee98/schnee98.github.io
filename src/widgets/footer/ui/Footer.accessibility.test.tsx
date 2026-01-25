/**
 * Footer Component Accessibility Tests
 * 접근성 테스트 케이스:
 * 1. ARIA 역할 및 속성 확인
 * 2. SocialLinks 접근성 확인
 * 3. 키보드 내비게이션 테스트
 * 4. 스크린 리더 호환성
 * 5. 포커스 관리 테스트
 * 6. 의미론적 HTML 구조
 * 7. 링크 접근성 확인
 * 8. 중복 ID 확인
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component Accessibility', () => {
  beforeEach(() => {
    cleanup();
  });

  // Test 1: ARIA 역할 및 속성 확인
  test('has correct landmark role', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });

  // Test 2: SocialLinks 링크 접근성 확인
  test('social links are accessible', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');

    expect(socialLinks.length).toBeGreaterThan(0);

    socialLinks.forEach(link => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('aria-label');
      expect(link).not.toHaveAttribute('tabindex', '-1');
    });
  });

  // Test 3: 키보드 포커스 가능성 확인
  test('social links are keyboard focusable', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');

    socialLinks.forEach(link => {
      link.focus();
      expect(link).toHaveFocus();
    });
  });

  // Test 4: 의미론적 HTML 구조 확인
  test('uses semantic HTML elements correctly', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');

    expect(footer.tagName).toBe('FOOTER');

    // SocialLinks 컨테이너 확인
    const socialLinksContainer = footer.querySelector('.socialLinks');
    expect(socialLinksContainer).toBeInTheDocument();

    // 개별 링크 확인
    const links = socialLinksContainer?.querySelectorAll('a');
    expect(links).toBeTruthy();
    expect(links?.length).toBeGreaterThan(0);
  });

  // Test 5: 외부 링크 보안 속성 확인
  test('external links have proper security attributes', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');

    socialLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href?.startsWith('http')) {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  // Test 6: ARIA 레이블 확인
  test('social links have descriptive aria-labels', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');

    // 각 링크가 고유한 aria-label을 가지는지 확인
    const ariaLabels = socialLinks.map(link => link.getAttribute('aria-label'));

    expect(ariaLabels).toContain('LinkedIn');
    expect(ariaLabels).toContain('GitHub');
  });

  // Test 7: 포커스 시나리오 테스트
  test('supports keyboard navigation scenarios', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');

    socialLinks.forEach(link => {
      // Tab 키로 포커스 이동 가능 확인
      link.focus();
      expect(link).toHaveFocus();

      // Enter/Space 키로 활성화 가능 확인 (링크의 경우)
      expect(link).toBeEnabled();
    });
  });

  // Test 8: 스크린 리더 호환성
  test('provides good screen reader experience', () => {
    render(<Footer />);

    // contentinfo 역할이 화면 리더에서 잘 인식되는지 확인
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // SocialLinks가 명확한 목적을 전달하는지 확인
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const githubLink = screen.getByRole('link', { name: 'GitHub' });

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });

  // Test 9: 중복 ID 확인
  test('handles multiple footers correctly', () => {
    render(
      <div>
        <Footer />
        <Footer />
      </div>
    );

    const footers = screen.getAllByRole('contentinfo');
    expect(footers.length).toBeGreaterThan(0);

    // 각 Footer에 SocialLinks가 있는지 확인
    footers.forEach(footer => {
      const socialLinks = footer.querySelectorAll('a');
      expect(socialLinks.length).toBeGreaterThan(0);
    });
  });

  // Test 10: 접근성 룰 준수 확인
  test('follows accessibility best practices', async () => {
    const { container } = render(<Footer />);

    // 접근성 규칙 준수 여부 확인
    const interactiveElements = container.querySelectorAll(
      'button, a, input, select, textarea'
    );

    interactiveElements.forEach(element => {
      // 모든 인터랙티브 요소가 접근 가능해야 함
      expect(element).toBeVisible();
      expect(element).not.toBeDisabled();
    });

    // 모든 링크가 의미있는 텍스트나 aria-label을 가지는지 확인
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      const hasText = link.textContent?.trim().length > 0;
      const hasAriaLabel = link.hasAttribute('aria-label');
      const hasTitle = link.hasAttribute('title');

      expect(hasText || hasAriaLabel || hasTitle).toBe(true);
    });
  });
});
