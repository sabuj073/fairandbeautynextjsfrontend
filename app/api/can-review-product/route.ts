import { API_BASE_URL } from '@/app/config/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');
    const user_id = searchParams.get('user_id');

    if (!product_id) {
      return NextResponse.json(
        { can_review: false, message: 'Product ID is required.' },
        { status: 400 }
      );
    }

    const url = `${API_BASE_URL}/reviews/can-review/${product_id}${user_id ? `?user_id=${user_id}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('Can-review-product error:', error);
    return NextResponse.json(
      { can_review: false, message: 'Unable to check review eligibility.' },
      { status: 200 }
    );
  }
}
