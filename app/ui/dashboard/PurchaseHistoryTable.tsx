
import React, { useState } from 'react';
import ActionTable from './ActionTable';
import { auth } from '@/auth';
import { API_BASE_URL } from '@/app/config/api';
import PaginationFilter from '../FilterProduct/PaginationFilter';

async function getPurchaseHistory(id: number, currentPage: number): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/purchase-history/${id}?page=${currentPage}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}


const PurchaseHistoryTable = async ({ currentPage }: any) => {
  const token: any = await auth();

  const result = await getPurchaseHistory(token?.user?.id, currentPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 font-medium">Code</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Delivery Status</th>
              <th className="pb-3 font-medium">Payment Status</th>
              <th className="pb-3 font-medium">Options</th>
            </tr>
          </thead>
          <tbody>
            {result?.data?.map((purchase: any, index: any) => (
              <tr key={index + "_"} className="border-b last:border-b-0">
                <td className="py-4 text-red-500">{purchase.code}</td>
                <td className="py-4">{purchase.date}</td>
                <td className="py-4">{purchase.grand_total}</td>
                <td className="py-4">
                  {purchase.delivery_status}
                  {purchase.delivery_status === 'Pending' && <span className="text-blue-500 ml-1">*</span>}
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${purchase.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {purchase.payment_status}
                  </span>
                  {purchase.delivery_status === 'Pending' && <span className="text-blue-500 ml-1">*</span>}
                </td>
                <td className="py-4">
                  <ActionTable purchase={purchase} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          result?.data?.length > 0 && <PaginationFilter meta={result.meta} />
        }

      </div>
    </div>
  );
};

export default PurchaseHistoryTable;
