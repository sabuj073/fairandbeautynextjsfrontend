// app/api/auth/login/route.ts
import { API_BASE_URL } from '@/app/config/api';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/auth/confirmOtp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'An error occurred during the request.';
        return NextResponse.json({ message }, { status });
    }
}
