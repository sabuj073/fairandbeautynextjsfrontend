import { API_BASE_URL } from '@/app/config/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Parse the incoming form data (including files)
        const formData = await request.formData();

        const response = await axios.post(`${API_BASE_URL}/reviews/submit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return NextResponse.json(response.data, { status: 200 });

    } catch (error: any) {
        console.error('Review submission error:', error);
        
        // Extract error message from response
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred during the request.';
        const errorData = error.response?.data || { result: false, message: errorMessage };

        return NextResponse.json({
            result: false,
            message: errorMessage,
            ...errorData
        }, { status: 200 });
    }
}
