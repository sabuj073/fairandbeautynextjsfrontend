import { API_BASE_URL } from '@/app/config/api';
import PointsTable from '@/app/ui/Points/PointsTable'
import React from 'react'

async function getPointsRate(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/club_point_convert_rate`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}


export default async function page() {
    const result = await getPointsRate();

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-6">

                <h2 className="text-2xl font-semibold mb-6">My Points</h2>

                {/* 
                <div className="flex justify-center items-center mb-6">

                    <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg p-6 text-center ">
                        <h3 className="text-3xl font-bold">{result?.club_point_convert_rate} Points = ৳1.00 Wallet Money </h3>
                        <p className="mt-2">Exchange Rate</p>
                    </div>


                </div> */}
                <PointsTable />

            </div>
        </div>
    )
}
