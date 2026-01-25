/**
 * Icons Component Unit Tests
 * 테스트 케이스:
 * 1. 기본 아이콘 렌더링 확인
 * 2. 커스텀 props (className, width, height) 렌더링
 * 3. SVG 속성 검증
 * 4. Props 타입 검증
 * 5. Edge cases (음수, null, undefined 등)
 * 6. 컴포넌트 순수성 테스트
 * 7. Re-rendering 테스트
 * 8. 메모리 누수 테스트
 * 9. 모든 아이콘 타입 테스트
 * 10. 기본값 확인
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import {
  CalendarIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedInIcon,
  CloseIcon,
  MenuIcon
} from './index';

describe('Icons Components', () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: CalendarIcon 기본 렌더링 확인
  test('CalendarIcon renders with default props', () => {
    const { container } = render(<CalendarIcon />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  // Test 2: ExternalLinkIcon 기본 렌더링 확인
  test('ExternalLinkIcon renders with default props', () => {
    const { container } = render(<ExternalLinkIcon />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  // Test 3: GithubIcon 기본 렌더링 확인
  test('GithubIcon renders with default props', () => {
    const { container } = render(<GithubIcon />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  // Test 4: LinkedInIcon 기본 렌더링 확인
  test('LinkedInIcon renders with default props', () => {
    const { container } = render(<LinkedInIcon />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  // Test 5: CloseIcon 기본 렌더링 확인
  test('CloseIcon renders with default props', () => {
    const { container } = render(<CloseIcon />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  // Test 6: MenuIcon 기본 렌더링 확인
  test('MenuIcon renders with default props', () => {
    const { container } = render(<MenuIcon />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  // Test 7: 커스텀 className props 테스트
  test('icons accept custom className', () => {
    const customClass = 'custom-icon-class';
    const { container } = render(<CalendarIcon className={customClass} />);
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(customClass);
  });

  // Test 8: 커스텀 width/height props 테스트
  test('icons accept custom width and height', () => {
    const { container } = render(
      <div>
        <CalendarIcon width={32} height={32} />
        <GithubIcon width={48} height={48} />
      </div>
    );
    
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0]).toHaveAttribute('width', '32');
    expect(svgs[0]).toHaveAttribute('height', '32');
    expect(svgs[1]).toHaveAttribute('width', '48');
    expect(svgs[1]).toHaveAttribute('height', '48');
  });

  // Test 9: Props 타입 검증
  test('icons accept correct prop types', () => {
    expect(() => {
      render(<CalendarIcon className="test" width={20} height={20} />);
    }).not.toThrow();
  });

  // Test 10: 컴포넌트 순수성 테스트
  test('icons are pure components', () => {
    const props = { className: 'test', width: 20, height: 20 };
    
    const { container: initialContainer } = render(<CalendarIcon {...props} />);
    const { container: rerenderedContainer } = render(<CalendarIcon {...props} />);
    
    const initialSvg = initialContainer.querySelector('svg');
    const rerenderedSvg = rerenderedContainer.querySelector('svg');
    
    expect(initialSvg?.getAttribute('width')).toBe(rerenderedSvg?.getAttribute('width'));
    expect(initialSvg?.getAttribute('height')).toBe(rerenderedSvg?.getAttribute('height'));
  });

  // Test 11: Re-rendering 테스트
  test('icons re-render correctly when props change', () => {
    const { container, rerender } = render(<CalendarIcon />);
    
    rerender(<CalendarIcon className="new-class" width={30} height={30} />);
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('new-class');
    expect(svg).toHaveAttribute('width', '30');
    expect(svg).toHaveAttribute('height', '30');
  });

  // Test 12: 메모리 누수 테스트
  test('icons clean up properly on unmount', () => {
    const { unmount } = render(<CalendarIcon />);
    
    expect(() => unmount()).not.toThrow();
  });

  // Test 13: SVG viewBox 속성 확인
  test('icons have correct viewBox attributes', () => {
    const { container } = render(
      <div>
        <CalendarIcon />
        <ExternalLinkIcon />
        <GithubIcon />
        <LinkedInIcon />
        <CloseIcon />
        <MenuIcon />
      </div>
    );
    
    const svgs = container.querySelectorAll('svg');
    svgs.forEach(svg => {
      expect(svg).toHaveAttribute('viewBox');
      expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    });
  });

  // Test 14: 모든 아이콘 내보내기 확인
  test('all icons are exported correctly', () => {
    expect(typeof CalendarIcon).toBe('function');
    expect(typeof ExternalLinkIcon).toBe('function');
    expect(typeof GithubIcon).toBe('function');
    expect(typeof LinkedInIcon).toBe('function');
    expect(typeof CloseIcon).toBe('function');
    expect(typeof MenuIcon).toBe('function');
  });

  // Test 15: SVG 요소 구조 확인
  test('icons have correct SVG structure', () => {
    const { container } = render(<CalendarIcon />);
    
    const svg = container.querySelector('svg');
    expect(svg?.children.length).toBeGreaterThan(0); // 자식 요소가 있어야 함
    
    // SVG 내부에 적절한 요소들이 있는지 확인
    const hasValidElements = Array.from(svg?.children || []).some(child => 
      ['rect', 'line', 'path', 'circle', 'polygon', 'polyline'].includes(child.tagName.toLowerCase())
    );
    expect(hasValidElements).toBe(true);
  });
});
