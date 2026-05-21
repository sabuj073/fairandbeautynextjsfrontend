import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { setting } = await request.json();
  const response = NextResponse.json({ success: true });
  response.cookies.set('setting', setting, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  return response;
}
