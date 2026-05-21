
import React, { useState } from 'react';
import { auth } from '@/auth';
import { API_BASE_URL } from '@/app/config/api';
import PaginationFilter from '../FilterProduct/PaginationFilter';
import ActionPoint from './ActionPoint';

async function getPoints(id: number, currentPage: number): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/clubpoint/get-list/${id}?page=${currentPage}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}




const PointsTable = async ({ currentPage }: any) => {
  const token: any = await auth();
  console.log(token?.user?.id)
  const result = await getPoints(token?.user?.id, currentPage);


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Point History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 font-medium">SI</th>
              <th className="pb-3 font-medium">Order Code</th>
              <th className="pb-3 font-medium">Points</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Converted</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {result?.data?.map((point: any, index: any) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 text-red-500">{index + 1}</td>
                <td className="py-4 text-red-500">{point.order_code}</td>
                <td className="py-4">{point.points}</td>
                <td className="py-4">{point.date}</td>
                <td className="py-4">
                  {
                    point?.convert_status == 1 ?
                      <div
                        className="badge badge-inline bg-accent-lightPink max-w-max text-white px-3 py-1 rounded-lg "><strong>Yes</strong> </div>
                      :
                      <div
                        className="badge badge-inline bg-red-700 max-w-max text-white px-3 py-1 rounded-lg "><strong>No</strong></div>

                  }
                </td>
                <td className="py-4">
                  <ActionPoint point={point} />
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

export default PointsTable;
