import React from 'react';
import { API_BASE_URL } from '@/app/config/api';
import { auth } from '@/auth';

async function getDashboard(id: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/affiliate/user/withdraw_request_history?id=${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

const AffiliateWithdrawHistory = async () => {
  const token: any = await auth()
  const result = await getDashboard(token?.user?.id);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50">
      
      {/* Earnings History */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Affiliate payment history</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Payment method</th>
              </tr>
            </thead>
            <tbody>
              
              {result?.affiliate_withdraw_requests?.data.map((row:any,index:any) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{index+1}</td>
                  <td className="p-4">{row.created_at}</td>
                  <td className="p-4">{row.amount}</td>
                  <td className="p-4">{
                    row?.status == 1 ?
                      <div
                        className="badge badge-inline bg-accent-lightPink max-w-max text-white px-3 py-1 rounded-lg "><strong>Approved</strong> </div>
                      :
                      <div
                        className="badge badge-inline bg-red-700 max-w-max text-white px-3 py-1 rounded-lg "><strong>Pending</strong></div>

                  }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AffiliateWithdrawHistory;