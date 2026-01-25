import { NextResponse } from 'next/server';
import { projectsData } from '@/shared';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.get('tags')?.split(',');
  const year = searchParams.get('year');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  let filteredProjects = [...projectsData];

  if (tags?.length) {
    filteredProjects = filteredProjects.filter(project =>
      tags.some(tag => project.tags.includes(tag))
    );
  }

  if (year) {
    filteredProjects = filteredProjects.filter(project =>
      project.year === parseInt(year)
    );
  }

  if (offset) {
    filteredProjects = filteredProjects.slice(parseInt(offset));
  }

  if (limit) {
    filteredProjects = filteredProjects.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    success: true,
    data: filteredProjects,
    total: filteredProjects.length
  });
}