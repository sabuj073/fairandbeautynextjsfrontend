import React from 'react';
import { Copy, Settings, Plus, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { API_BASE_URL } from '@/app/config/api';
import { auth } from '@/auth';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import CopyReferralCode from './CopyReferralCode';

async function getDashboard(id: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/affiliate/user?id=${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

const AffiliateDashboard = async () => {
  const token: any = await auth()
  const result = await getDashboard(token?.user?.id);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-purple-500 p-6 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">{result?.balance}</div>
            <div className="text-sm opacity-90">{result?.balance_text}</div>
          </div>
        </Card>
        <Card className="p-6  flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
        <Link href={routes.payment_settings} className=' flex items-center justify-center gap-2' >
          <Settings className="text-gray-500" />
          <span className="text-red-500">Configure Payout</span>
        </Link>
        </Card>
        
        <Card className="p-6 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
        <Link href={routes.withdraw} className=' flex items-center justify-center gap-2' >
          <Plus className="text-gray-500" />
          <span className="text-red-500">Affiliate Withdraw Request</span>
          </Link>
        </Card>
      </div>

      {/* Referral Link */}
      <CopyReferralCode  result={result} />

      {/* Stats Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Affiliate Stats</h2>
          <div className="flex gap-2 hidden ">
            <select className="border p-2 rounded-md">
              <option>Choose</option>
            </select>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {result?.affiliate_logs  && result?.affliate_stats?.map((stat:any, index:any) => (
            <Card key={index} className="p-4 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl text-gray-600">{stat.value}</span>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Earnings History */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Affiliate Earning History</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Referral User</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Order Id</th>
                <th className="p-4 text-left">Referral Type</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              
              {result?.affiliate_logs && result?.affiliate_logs?.map((row:any,index:any) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{index+1}</td>
                  <td className="p-4 text-blue-600">{row.user_name}</td>
                  <td className="p-4">{row.amount}</td>
                  <td className="p-4">{row.order_code}</td>
                  <td className="p-4">{row.affiliate_type}</td>
                  <td className="p-4">{row.product_name}</td>
                  <td className="p-4">{row.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;