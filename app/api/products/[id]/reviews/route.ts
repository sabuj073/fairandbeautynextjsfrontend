import { API_BASE_URL } from '@/app/config/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const response = await axios.get(`${API_BASE_URL}/products/${id}/reviews`, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Reviews fetch error:', error);
    
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'An error occurred during the request.';

    return NextResponse.json({
      success: false,
      message: message,
      data: []
    }, { status: 200 });
  }
}

