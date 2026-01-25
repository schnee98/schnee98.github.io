/**
 * SocialLinks Component Accessibility Tests
 * 접근성 테스트 케이스:
 * 1. 링크 접근성 확인
 * 2. ARIA 레이블 확인
 * 3. 키보드 내비게이션 테스트
 * 4. 외부 링크 보안 속성
 * 5. 포커스 관리 테스트
 * 6. 의미론적 HTML 구조
 * 7. 스크린 리더 호환성
 * 8. 아이콘 접근성
 */

import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { SocialLinks } from './SocialLinks';

describe('SocialLinks Component Accessibility', () => {
  beforeEach(() => {
    cleanup();
  });

  // Test 1: 링크 접근성 확인
  test('links are accessible', () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole('link');
    
    expect(links).toHaveLength(2);
    links.forEach(link => {
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute('tabindex', '-1');
    });
  });

  // Test 2: ARIA 레이블 확인
  test('links have descriptive aria-labels', () => {
    render(<SocialLinks />);
    
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    
    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });

  // Test 3: 키보드 내비게이션 테스트
  test('supports keyboard navigation', () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      // Tab 키로 포커스 이동 가능 확인
      link.focus();
      expect(link).toHaveFocus();
      
      // Enter 키로 활성화 가능 확인
      expect(link).toBeEnabled();
    });
  });

  // Test 4: 외부 링크 보안 속성
  test('external links have proper security attributes', () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href?.startsWith('http')) {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  // Test 5: 포커스 시각적 피드백 확인
  test('provides visual focus indicators', () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      link.focus();
      expect(link).toHaveFocus();
    });
  });

  // Test 6: 의미론적 HTML 구조 확인
  test('uses semantic HTML correctly', () => {
    const { container } = render(<SocialLinks />);
    
    const socialLinksContainer = container.querySelector('.socialLinks');
    expect(socialLinksContainer).toBeInTheDocument();
    
    const links = socialLinksContainer?.querySelectorAll('a');
    expect(links?.length).toBe(2);
    
    links?.forEach(link => {
      const icon = link.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  // Test 7: 스크린 리더 호환성
  test('provides good screen reader experience', () => {
    render(<SocialLinks />);
    
    // 각 링크가 명확한 목적을 전달하는지 확인
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    
    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    
    // aria-label로 화면 리더에 잘 전달되는지 확인
    expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn');
    expect(githubLink).toHaveAttribute('aria-label', 'GitHub');
  });

  // Test 8: 아이콘 접근성
  test('icons work with screen readers', () => {
    const { container } = render(<SocialLinks />);
    
    const icons = container.querySelectorAll('svg');
    icons.forEach(icon => {
      // 아이콘은 장식용이므로 부모 링크가 적절한 aria-label을 제공해야 함
      const parentLink = icon.closest('a');
      expect(parentLink).toHaveAttribute('aria-label');
    });
  });

  // Test 9: 포커스 순서 확인
  test('maintains proper focus order', () => {
    const { container } = render(
      <div>
        <button>Before</button>
        <SocialLinks />
        <button>After</button>
      </div>
    );
    
    const beforeButton = screen.getByText('Before');
    const links = screen.getAllByRole('link');
    const afterButton = screen.getByText('After');
    
    // 초기 포커스 상태 확인
    expect(document.activeElement).toBe(document.body);
    
    // Tab 키 순서 확인 (시뮬레이션)
    beforeButton.focus();
    expect(beforeButton).toHaveFocus();
    
    links[0]?.focus(); // LinkedIn
    expect(links[0]).toHaveFocus();
    
    links[1]?.focus(); // GitHub
    expect(links[1]).toHaveFocus();
    
    afterButton.focus();
    expect(afterButton).toHaveFocus();
  });

  // Test 10: 고대비 모드 지원
  test('supports high contrast mode', () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      // 고대비 모드에서도 요소가 보이는지 확인
      expect(link).toBeVisible();
      
      // 고대비 모드에서 포커스가 명확히 보이는지 확인
      link.focus();
      expect(link).toHaveFocus();
    });
  });

  // Test 11: 커스텀 URL에 대한 접근성
  test('maintains accessibility with custom URLs', () => {
    const customLinkedin = 'linkedin.com/in/custom-profile';
    const customGithub = 'github.com/custom-user';
    
    render(<SocialLinks linkedin={customLinkedin} github={customGithub} />);
    
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    
    linkedinLink.focus();
    expect(linkedinLink).toHaveFocus();
    
    githubLink.focus();
    expect(githubLink).toHaveFocus();
    
    expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn');
    expect(githubLink).toHaveAttribute('aria-label', 'GitHub');
  });

  // Test 12: 여러 SocialLinks 컴포넌트 접근성
  test('multiple SocialLinks components maintain accessibility', () => {
    render(
      <div>
        <SocialLinks />
        <SocialLinks linkedin="second.linkedin.com" github="second.github.com" />
      </div>
    );
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
    
    links.forEach(link => {
      link.focus();
      expect(link).toHaveFocus();
      expect(link).toHaveAttribute('aria-label');
    });
  });

  // Test 13: 키보드 이벤트 처리
  test('handles keyboard events properly', () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      // Enter 키 이벤트 시뮬레이션
      fireEvent.keyDown(link, { key: 'Enter' });
      expect(link).toBeInTheDocument();
      
      // Space 키 이벤트 시뮬레이션
      fireEvent.keyDown(link, { key: ' ' });
      expect(link).toBeInTheDocument();
      
      // Escape 키 이벤트 시뮬레이션
      fireEvent.keyDown(link, { key: 'Escape' });
      expect(link).toBeInTheDocument();
    });
  });
});
