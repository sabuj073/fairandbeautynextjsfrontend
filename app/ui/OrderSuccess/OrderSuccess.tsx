import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import { auth } from '@/auth';
import React from 'react'
import OrderSuccessClient from "@/components/ui/OrderSuccessClient";
import Script from 'next/script';

async function getPurchaseHistoryDetails(id: number | string): Promise<any> {
    if (!id || id === '') {
        return null;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/purchase-history-details/${id}`, {
            cache: 'no-store',
        });
        if (!response.ok) {
            return null;
        }
        const data: any = await response.json();
        return data as any;
    } catch (error) {
        console.error('Error fetching purchase history details:', error);
        return null;
    }
}

export default async function OrderSuccess({ order_id }: any) {
    // Validate order_id
    if (!order_id || order_id === '') {
        return (
            <div className="max-w-6xl mx-auto p-2 md:p-6 bg-white shadow-xl my-10">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Invalid Order ID</h2>
                    <p className="text-gray-600">No order ID provided. Please check your order confirmation.</p>
                </div>
            </div>
        );
    }

    let token: any = null;
    try {
        token = await auth();
    } catch (error) {
        console.error('Error getting auth token:', error);
        // Continue without auth token - not critical for displaying order
    }

    const result = await getPurchaseHistoryDetails(order_id);
    
    // Handle case when API call fails or returns no data
    if (!result || !result.data || !result.data.data || result.data.data.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-2 md:p-6 bg-white shadow-xl my-10">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Order Not Found</h2>
                    <p className="text-gray-600">Unable to retrieve order details. Please contact support if this issue persists.</p>
                    <p className="text-sm text-gray-500 mt-2">Order ID: {order_id}</p>
                </div>
            </div>
        );
    }

    const orderData = result?.data?.data?.[0] || null;
    const orderItems = result?.order_items?.data || [];

    // Additional safety check
    if (!orderData) {
        return (
            <div className="max-w-6xl mx-auto p-2 md:p-6 bg-white shadow-xl my-10">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Order Data Not Available</h2>
                    <p className="text-gray-600">Unable to load order details. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <OrderSuccessClient orderData={orderData} orderItems={orderItems} />
            
            <div className="max-w-6xl mx-auto p-2 md:p-6 bg-white shadow-xl my-10 ">
                {
                    orderData?.payment_status !== 'unpaid' && result?.total_point_earn && result?.total_point_earn > 0 &&

                    <div className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="ml-4 text-2xl font-semibold">{result?.total_point_earn}</h2>
                        </div>
                    </div>
                }
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="ml-4 text-2xl font-semibold">
                            Thank you{token?.user?.name ? `, ${token.user.name}` : ''}!
                        </h2>
                    </div>
                    <p className="text-gray-600">We've accepted your order, and we're getting it ready. Come back to this page for updates on your shipment status.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-100 p-1 md:p-4 rounded-lg">
                            <h3 className="font-bold text-lg">Order details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex flex-col gap-3">
                                    <p><span className="font-semibold">Order Code:</span> {orderData?.code}</p>
                                    <p><span className="font-semibold">Customer:</span>{orderData?.shipping_address?.name}</p>
                                    <p><span className="font-semibold">Phone:</span> {orderData?.shipping_address?.phone}</p>
                                    <p><span className="font-semibold">Shipping address:</span> {orderData?.shipping_address?.address},{orderData?.shipping_address?.city},{orderData?.shipping_address?.postal_code},{orderData?.shipping_address?.country}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p><span className="font-semibold">Order date:</span> {orderData?.date}</p>
                                    <p><span className="font-semibold">Order status:</span> {orderData?.delivery_status}</p>
                                    <p><span className="font-semibold">Total order amount:</span>{orderData?.grand_total}</p>
                                    <p><span className="font-semibold">Payment method:</span> {orderData?.payment_type}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                        <h3 className="font-bold text-lg mb-4">Order summary</h3>
                        <div className="space-y-4">
                            {orderItems && orderItems.length > 0 ? (
                                orderItems.map((item: any, index: any) => (
                                <div className="flex items-center justify-between" key={index} >
                                    <div className="flex items-center">
                                        <img src={`${BASE_URL}/public/${item.image}`} alt={item.name} className="w-12 h-12 rounded-lg mr-4" />
                                        <div>
                                            <p>{item?.product_name}</p>
                                            <p className="text-sm text-gray-500"> <strong> Qty :</strong>{item?.quantity} {
                                                item?.variation && <span > <strong> Variation :</strong> {item?.variation}</span>
                                            }   </p>

                                        </div>
                                    </div>
                                    <p className="font-semibold">{item?.price}</p>
                                </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    <p>No order items found.</p>
                                </div>
                            )}


                            <div className="border-t pt-4 flex justify-end ">
                                <div className='w-[300px]'>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Subtotal</p>
                                        <p>{orderData?.subtotal}</p>
                                    </div>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Shipping</p>
                                        <p>{orderData?.shipping_cost}</p>
                                    </div>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Tax</p>
                                        <p>{orderData?.tax}</p>
                                    </div>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Coupon</p>
                                        <p>{orderData?.coupon_discount}</p>
                                    </div>
                                    <hr />
                                    <div className=" border-t-1  flex justify-between text-lg font-semibold gap-6">
                                        <p>Club Point</p>
                                        <p>-{orderData?.club_point}</p>
                                    </div>
                                    <div className="flex justify-between text-lg font-semibold mt-2">
                                        <p>Total</p>
                                        <p>{orderData?.grand_total}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="text-center mt-8">
                    <p className="text-gray-500">Need help? <a href="#" className="text-blue-600">Contact us</a></p>
                </div> */}
            </div>

        </div>
    )
}
