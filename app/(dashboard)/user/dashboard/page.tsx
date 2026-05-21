import { API_BASE_URL } from '@/app/config/api';
import { auth } from '@/auth';
import React from 'react'

async function getDashboard(id: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/customers_dashboard/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

export default async function Page() {
  const token: any = await auth()
  const result = await getDashboard(token?.user?.id);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">

        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">

          <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg p-6">
            <h3 className="text-3xl font-bold">{result?.cart_count} Product</h3>
            <p className="mt-2">in your cart</p>
          </div>


          <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6">
            <h3 className="text-3xl font-bold">{result?.wishlist} Products</h3>
            <p className="mt-2">in your wishlist</p>
          </div>


          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6">
            <h3 className="text-3xl font-bold">{result?.total} Products</h3>
            <p className="mt-2">you ordered</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6">
            <h3 className="text-3xl font-bold">৳{result?.balance} balance</h3>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg p-6">
            <h3 className="text-3xl font-bold">{result?.points_total} total point</h3>
          </div>

        </div>


        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Default Shipping Address</h3>
          <p><strong>Address:</strong> {result?.address?.address}</p>
          <p><strong>Country:</strong> {result?.address?.country?.name}</p>
          <p><strong>State:</strong> {result?.address?.state?.name}</p>
          <p><strong>City:</strong> {result?.address?.city?.name}</p>
          <p><strong>Postal code:</strong> {result?.address?.postal_code}</p>
          <p><strong>Phone:</strong> {result?.address?.phone}</p>
        </div>
      </div>
    </div>

  )
}
