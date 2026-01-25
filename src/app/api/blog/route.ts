import { NextResponse } from 'next/server';
import { blogPostsData } from '@/shared';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tags = searchParams.get('tags')?.split(',');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  let filteredPosts = [...blogPostsData];

  if (category) {
    filteredPosts = filteredPosts.filter(post =>
      post.category === category
    );
  }

  if (tags?.length) {
    filteredPosts = filteredPosts.filter(post =>
      tags.some(tag => post.tags?.includes(tag) || false)
    );
  }

  if (offset) {
    filteredPosts = filteredPosts.slice(parseInt(offset));
  }

  if (limit) {
    filteredPosts = filteredPosts.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    success: true,
    data: filteredPosts,
    total: filteredPosts.length
  });
}