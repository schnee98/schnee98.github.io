/**
 * SocialLinks Component Unit Tests
 * 테스트 케이스:
 * 1. 기본 렌더링 확인 (default props)
 * 2. 커스텀 linkedin/github props 렌더링
 * 3. 링크 URL 생성 확인
 * 4. 아이콘 컴포넌트 렌더링
 * 5. Props 타입 검증
 * 6. Edge cases (빈 문자열, null 등)
 * 7. 컴포넌트 순수성 테스트
 * 8. Re-rendering 테스트
 * 9. 메모리 누수 테스트
 * 10. 보안 속성 확인
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { SocialLinks } from './SocialLinks';

describe('SocialLinks Component', () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: 기본 렌더링 확인 (default props)
  test('renders with default props', () => {
    render(<SocialLinks />);

    // LinkedIn 링크 확인
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');

    // GitHub 링크 확인
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://www.github.com');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Test 2: 커스텀 linkedin/github props 렌더링
  test('renders with custom social media URLs', () => {
    const customLinkedin = 'linkedin.com/in/custom-profile';
    const customGithub = 'github.com/custom-user';

    render(<SocialLinks linkedin={customLinkedin} github={customGithub} />);

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toHaveAttribute('href', `https://${customLinkedin}`);

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', `https://${customGithub}`);
  });

  // Test 3: 아이콘 컴포넌트 렌더링 확인
  test('renders icon components inside links', () => {
    render(<SocialLinks />);

    // LinkedIn 아이콘 확인
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const linkedinIcon = linkedinLink.querySelector('svg');
    expect(linkedinIcon).toBeInTheDocument();

    // GitHub 아이콘 확인
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const githubIcon = githubLink.querySelector('svg');
    expect(githubIcon).toBeInTheDocument();
  });

  // Test 4: CSS 클래스 적용 확인
  test('applies correct CSS classes', () => {
    const { container } = render(<SocialLinks />);

    const socialLinksContainer = container.querySelector('.socialLinks');
    expect(socialLinksContainer).toBeInTheDocument();

    const links = container.querySelectorAll('.link');
    expect(links).toHaveLength(2);
  });

  // Test 5: Props 타입 검증
  test('accepts correct prop types', () => {
    expect(() => {
      render(
        <SocialLinks linkedin="test.linkedin.com" github="test.github.com" />
      );
    }).not.toThrow();
  });

  // Test 6: Edge cases - 빈 문자열 처리
  test('handles empty strings gracefully', () => {
    expect(() => {
      render(<SocialLinks linkedin="" github="" />);
    }).not.toThrow();

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toHaveAttribute('href', 'https://');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://');
  });

  // Test 7: 컴포넌트 순수성 테스트
  test('is pure component - same props produce same output', () => {
    const props = { linkedin: 'test.linkedin.com', github: 'test.github.com' };

    const { rerender } = render(<SocialLinks {...props} />);
    const initialLinks = screen.getAllByRole('link');

    rerender(<SocialLinks {...props} />);
    const rerenderedLinks = screen.getAllByRole('link');

    expect(initialLinks.length).toBe(rerenderedLinks.length);
    initialLinks.forEach((link, index) => {
      expect(link.getAttribute('href')).toBe(
        rerenderedLinks[index]?.getAttribute('href')
      );
    });
  });

  // Test 8: Re-rendering 테스트
  test('re-renders correctly when props change', () => {
    const { rerender } = render(<SocialLinks />);

    // Props 변경 후 re-render
    rerender(
      <SocialLinks linkedin="new.linkedin.com" github="new.github.com" />
    );

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toHaveAttribute('href', 'https://new.linkedin.com');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://new.github.com');
  });

  // Test 9: 메모리 누수 테스트
  test('cleans up properly on unmount', () => {
    const { unmount } = render(<SocialLinks />);

    expect(() => unmount()).not.toThrow();

    // Component should not exist after unmount
    expect(
      screen.queryByRole('link', { name: 'LinkedIn' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'GitHub' })
    ).not.toBeInTheDocument();
  });

  // Test 10: 보안 속성 확인
  test('external links have security attributes', () => {
    render(<SocialLinks />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  // Test 11: URL 형식 검증
  test('generates correct URL format', () => {
    const testCases = [
      {
        input: 'linkedin.com/in/test',
        expected: 'https://linkedin.com/in/test',
      },
      { input: 'github.com/user', expected: 'https://github.com/user' },
      { input: 'twitter.com/user', expected: 'https://twitter.com/user' },
    ];

    testCases.forEach(({ input, expected }) => {
      cleanup();
      render(<SocialLinks linkedin={input} github={input} />);

      const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
      expect(linkedinLink).toHaveAttribute('href', expected);
    });
  });

  // Test 12: SVG 아이콘 속성 확인
  test('icons have correct SVG attributes', () => {
    render(<SocialLinks />);

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const linkedinIcon = linkedinLink.querySelector('svg');
    expect(linkedinIcon).toHaveAttribute('fill', 'currentColor');
    expect(linkedinIcon).toHaveAttribute('viewBox');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const githubIcon = githubLink.querySelector('svg');
    expect(githubIcon).toHaveAttribute('fill', 'currentColor');
    expect(githubIcon).toHaveAttribute('viewBox');
  });

  // Test 13: 한 개의 prop만 제공된 경우
  test('renders correctly when only one prop is provided', () => {
    render(<SocialLinks linkedin="custom.linkedin.com" />);

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toHaveAttribute('href', 'https://custom.linkedin.com');

    // GitHub는 기본값으로 렌더링
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://www.github.com');
  });
});
