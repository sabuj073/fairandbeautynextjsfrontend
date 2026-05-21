import { API_BASE_URL } from '@/app/config/api';
import { CartData } from '@/types/api';
import axios from 'axios';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(`${API_BASE_URL}/carts/${body.user_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const calculateTotalQuantity = (cartData: CartData[]) => {
      // Loop through each cart's items and sum the quantities
      return cartData.reduce((totalQty, cart) => {
        const cartItemsTotal = cart.cart_items.reduce((itemTotal, item) => itemTotal + item.quantity, 0);
        return totalQty + cartItemsTotal;
      }, 0);
    };
    
    // Get the total quantity
    const totalQuantity = calculateTotalQuantity(response.data);

    // Extracting only the relevant data
    return NextResponse.json({ totalQuantity, data: response.data }, { status: 200 });

  } catch (error:any) {
    console.error('Request failed:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred during the request.';

    return NextResponse.json({ message }, { status });
  }
}

