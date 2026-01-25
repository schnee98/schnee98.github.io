import { NextResponse } from 'next/server';
import { profileData } from '@/shared';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: profileData
  });
}