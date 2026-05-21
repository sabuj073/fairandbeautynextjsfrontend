import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://admin.fairandbeautybd.com/api/v2';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/snow-effect`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Snow effect API returned:', response.status);
      return NextResponse.json({ snow_effect: false }, { status: 200 });
    }

    const data = await response.json();
    console.log('Snow effect backend response:', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Snow effect API error:', error);
    return NextResponse.json({ snow_effect: false }, { status: 200 });
  }
}
