// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  // Delete the 'auth' cookie
  cookieStore.set('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, 
    path: '/',
  });

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
