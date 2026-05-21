import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { productId } = await request.json();

    // Get existing recentData from cookies
    const cookieStore = cookies();
    const recentDataCookie = cookieStore.get('recentData')?.value;

    let recentData: number[] = [];
    if (recentDataCookie) {
        recentData = JSON.parse(recentDataCookie);
    }

    // Add new productId to the cookie data if it's not already included
    if (productId && !recentData.includes(productId)) {
        recentData.push(productId);
    }

    // Create the NextResponse and set the updated recentData in cookies
    const response = NextResponse.json({ message: 'Cookie set successfully' });
    return new Response('Cookie set!', {
        headers: {
            'Set-Cookie': `recentData=${JSON.stringify(recentData)}; Path=/; HttpOnly`,
        },
    });

}
