import TrackOrder from '@/app/ui/TrackOrder/TrackOrder'
import React from 'react'

export default function page() {
    return (
        <div className="flex justify-center items-center bg-gray-100 py-[150px] ">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Find Your Order</h2>
                <p className="text-center text-gray-600 mb-6">Enter an order number to find your order details.</p>

                <TrackOrder />
            </div>
        </div>

    )
}
