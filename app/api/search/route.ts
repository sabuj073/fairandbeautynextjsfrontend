import { API_BASE_URL } from '@/app/config/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryParams = url.searchParams;

    console.log("Query Params:", queryParams.toString());
    // return NextResponse.json({ message:"message" }, { status:200 });
  
    const response = await axios.get(`${API_BASE_URL}/products/search`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: queryParams,
    });

    // Extracting only the relevant data
    return NextResponse.json(response.data, { status: 200 });

  } catch (error:any) {
    console.error('Request failed:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred during the request.';

    return NextResponse.json({ message }, { status });
  }
}
