/**
 * BlogCard Component Unit Tests
 * 테스트 케이스:
 * 1. 기본 렌더링 확인
 * 2. props 데이터 렌더링
 * 3. 링크 동작 확인
 * 4. 이미지 렌더링
 * 5. 날짜 포맷팅 확인
 * 6. Props 타입 검증
 * 7. Edge cases (빈 데이터 등)
 * 8. 컴포넌트 순수성 테스트
 * 9. Re-rendering 테스트
 * 10. 메모리 누수 테스트
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BlogCard } from './BlogCard';

// Mock Next.js Image component

// Mock formatDate utility
jest.mock('@/shared/lib/formatDate', () => ({
  formatDate: jest.fn((date: Date) => `Formatted: ${date.toISOString().split('T')[0]}`)
}));

// Get the mocked formatDate function
const { formatDate } = require('@/shared/lib/formatDate');

// Mock blog post data
const mockBlogPost = {
  slug: 'test-blog-post',
  title: 'Test Blog Post',
  excerpt: 'This is a test excerpt for the blog post.',
  content: 'This is the full content of the blog post.',
  imageUrl: 'https://example.com/image.jpg',
  date: new Date('2023-01-01'),
  author: 'Test Author',
  tags: ['react', 'testing']
};

describe('BlogCard Component', () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: 기본 렌더링 확인
  test('renders blog card with required props', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    // 제목 확인
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    
    // 포맷된 날짜 확인
    expect(screen.getByText('Formatted: 2023-01-01')).toBeInTheDocument();
    
    // 링크 확인
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-blog-post');
  });

  // Test 2: 이미지 렌더링 확인
  test('renders blog post image', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Blog Post');
  });

  // Test 3: 날짜 포맷팅 확인
  test('formats publish date correctly', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    expect(formatDate).toHaveBeenCalledWith(new Date('2023-01-01'));
    expect(screen.getByText('Formatted: 2023-01-01')).toBeInTheDocument();
  });

  // Test 4: CSS 클래스 적용 확인
  test('applies correct CSS classes', () => {
    const { container } = render(<BlogCard post={mockBlogPost} />);
    
    const cardElement = container.querySelector('.card');
    expect(cardElement).toBeInTheDocument();
    
    const linkElement = container.querySelector('a');
    expect(linkElement).toBeInTheDocument();
  });

  // Test 5: Props 타입 검증
  test('accepts correct prop types', () => {
    expect(() => {
      render(<BlogCard post={mockBlogPost} />);
    }).not.toThrow();
  });

  // Test 6: 선택적 props 처리
  test('handles optional blog post fields gracefully', () => {
    const minimalBlogPost = {
      slug: 'minimal-post',
      title: 'Minimal Post',
      date: new Date('2023-01-02')
    };
    
    expect(() => {
      render(<BlogCard post={minimalBlogPost} />);
    }).not.toThrow();
    
    // 필수 필드만 렌더링되는지 확인
    expect(screen.getByText('Minimal Post')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2023-01-02')).toBeInTheDocument();
  });

  // Test 7: 컴포넌트 순수성 테스트
  test('is pure component - same props produce same output', () => {
    const { rerender } = render(<BlogCard post={mockBlogPost} />);
    const initialTitle = screen.getByText('Test Blog Post');
    
    rerender(<BlogCard post={mockBlogPost} />);
    const rerenderedTitle = screen.getByText('Test Blog Post');
    
    expect(initialTitle.textContent).toBe(rerenderedTitle.textContent);
  });

  // Test 8: Re-rendering 테스트
  test('re-renders correctly when props change', () => {
    const { rerender } = render(<BlogCard post={mockBlogPost} />);
    
    const updatedBlogPost = {
      ...mockBlogPost,
      title: 'Updated Blog Post',
      date: new Date('2023-01-02')
    };
    
    rerender(<BlogCard post={updatedBlogPost} />);
    
    expect(screen.getByText('Updated Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2023-01-02')).toBeInTheDocument();
  });

  // Test 9: 메모리 누수 테스트
  test('cleans up properly on unmount', () => {
    const { unmount } = render(<BlogCard post={mockBlogPost} />);
    
    expect(() => unmount()).not.toThrow();
    
    // Component should not exist after unmount
    expect(screen.queryByText('Test Blog Post')).not.toBeInTheDocument();
  });

  // Test 10: 링크 클릭 동작 확인
  test('link navigates to correct blog post', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-blog-post');
    expect(link).toBeEnabled();
  });

  // Test 11: 이미지 alt 텍스트 확인
  test('image has appropriate alt text', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Test Blog Post');
  });

  // Test 12: 긴 제목 처리
  test('handles long titles gracefully', () => {
    const longTitleBlogPost = {
      ...mockBlogPost,
      title: 'This is a very long blog post title that should be handled gracefully without breaking the layout'
    };
    
    render(<BlogCard post={longTitleBlogPost} />);
    
    const titleElement = screen.getByText(/This is a very long blog post title/);
    expect(titleElement).toBeInTheDocument();
  });

  // Test 13: 이미지가 없는 경우
  test('handles missing image gracefully', () => {
    const noImageBlogPost = {
      ...mockBlogPost,
      imageUrl: undefined
    };
    
    render(<BlogCard post={noImageBlogPost} />);
    
    // 이미지가 렌더링되지 않아야 함
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    
    // 다른 요소들은 정상적으로 렌더링되어야 함
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  // Test 14: 여러 BlogCard 렌더링
  test('renders multiple blog cards correctly', () => {
    const blogPosts = [
      mockBlogPost,
      { ...mockBlogPost, slug: 'second-post', title: 'Second Post' },
      { ...mockBlogPost, slug: 'third-post', title: 'Third Post' }
    ];
    
    render(
      <div>
        {blogPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    );
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('Third Post')).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  // Test 15: ExternalLinkIcon 렌더링 확인
  test('renders ExternalLinkIcon', () => {
    const { container } = render(<BlogCard post={mockBlogPost} />);
    
    const icon = container.querySelector('.button svg');
    expect(icon).toBeInTheDocument();
  });
});
