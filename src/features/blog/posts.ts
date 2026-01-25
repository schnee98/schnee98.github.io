import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
  BlogFrontmatter,
  ParsedBlogPost,
  BlogPostMetadata,
  BlogPostContent,
  BlogListItem,
  BlogPostSortOrder,
  BlogFilterOptions,
} from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

export function parseFrontmatter(fileContent: string): {
  data: BlogFrontmatter;
  content: string;
} {
  const { data, content } = matter(fileContent);

  return {
    data: data as BlogFrontmatter,
    content: content.trim(),
  };
}

export function getPostBySlug(slug: string): ParsedBlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);

    const imageUrl = data.thumbnail.startsWith('/')
      ? data.thumbnail
      : `/img/posts/${slug}/${data.thumbnail}`;

    return {
      slug,
      title: data.title,
      date: new Date(data.date),
      description: data.description,
      thumbnail: data.thumbnail,
      category: data.category,
      tags: data.tags,
      content,
      imageUrl,
    };
  } catch (error) {
    console.error(`Error parsing post ${slug}:`, error);
    return null;
  }
}

export function getPostContent(slug: string): BlogPostContent | null {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const metadata: BlogPostMetadata = {
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    thumbnail: post.thumbnail,
    category: post.category,
    tags: post.tags,
    imageUrl: post.imageUrl,
  };

  return {
    metadata,
    content: post.content,
  };
}

export function getAllPosts(): ParsedBlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is ParsedBlogPost => post !== null);

  return posts;
}

export function getBlogList(
  sortOrder: BlogPostSortOrder = 'date-desc'
): BlogListItem[] {
  const posts = getAllPosts();

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortOrder) {
      case 'date-desc':
        return b.date.getTime() - a.date.getTime();
      case 'date-asc':
        return a.date.getTime() - b.date.getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return b.date.getTime() - a.date.getTime();
    }
  });

  return sortedPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    thumbnail: post.thumbnail,
    category: post.category,
    tags: post.tags,
    imageUrl: post.imageUrl,
  }));
}

export function filterPosts(
  posts: BlogListItem[],
  filters: BlogFilterOptions
): BlogListItem[] {
  return posts.filter(post => {
    if (filters.category && post.category !== filters.category) {
      return false;
    }

    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => post.tags?.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }

    if (filters.dateRange) {
      const postDate = post.date;
      if (
        postDate < filters.dateRange.start ||
        postDate > filters.dateRange.end
      ) {
        return false;
      }
    }

    return true;
  });
}

export function getPostsWithPagination(page: number = 1, limit: number = 10) {
  const allPosts = getBlogList();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const posts = allPosts.slice(startIndex, endIndex);
  const hasMore = endIndex < allPosts.length;
  const totalPages = Math.ceil(allPosts.length / limit);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts: allPosts.length,
      hasMore,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts
    .map(post => post.category)
    .filter((category): category is string => category !== undefined);

  return [...new Set(categories)].sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = posts.flatMap(post => post.tags || []);

  return [...new Set(tags)].sort();
}

export function resolveImagePath(imagePath: string, slug?: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  if (slug) {
    return `/img/posts/${slug}/${imagePath}`;
  }

  return `/img/${imagePath}`;
}
