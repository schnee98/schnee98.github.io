import { notFound } from 'next/navigation';

export class BlogError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'BlogError';
  }
}

export function handleBlogError(error: unknown, slug?: string) {
  if (error instanceof BlogError) {
    if (error.statusCode === 404) {
      notFound();
    }
    throw error;
  }
  
  console.error(`Blog error${slug ? ` for post: ${slug}` : ''}:`, error);
  throw new BlogError('Failed to load blog post', 500);
}

export function createBlogErrorResponse(message: string, statusCode: number = 500) {
  return {
    error: true,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}