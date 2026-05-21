import { API_BASE_URL } from '@/app/config/api';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("body", body);

    // Set 'lang' cookie
    cookies().set('lang', body?.lang, { httpOnly: true, sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 });

    // Fetch data from API using the lang value
    const response = await axios.get(`${API_BASE_URL}/language/${body?.lang}`);

    // Extract and return only the relevant data
    return NextResponse.json(response.data, { status: 200 });

  } catch (error: any) {
    console.error('Request failed:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred during the request.';

    return NextResponse.json({ message }, { status });
  }
}
