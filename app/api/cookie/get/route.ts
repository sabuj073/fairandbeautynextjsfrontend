import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll(); // Log all cookies to verify
    console.log("All Cookies:", allCookies);

    const productIdCookie = cookieStore.get('recentData');
    console.log("productIdCookie:", productIdCookie);


    return NextResponse.json({
        message: 'Cookie retrieved successfully',
        product_id: productIdCookie ? JSON.parse(productIdCookie.value) : null,
    });
}
