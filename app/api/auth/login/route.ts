// app/api/auth/login/route.ts
import { API_BASE_URL } from '@/app/config/api';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Authenticate user and get a response from your external API
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const data = await response.json();

    if (data.access_token) {
      // Set the cookie with the access token
      cookies().set('auth', JSON.stringify(data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 200 });
  }
}
