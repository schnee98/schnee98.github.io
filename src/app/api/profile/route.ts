import { NextResponse } from 'next/server';
import { profileData } from '@/shared';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: profileData
  });
}