import { API_BASE_URL } from '@/app/config/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.get(`${API_BASE_URL}/cities-by-state/${body.id}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error:any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred during the request.';
    return NextResponse.json({ message }, { status });
  }
}
