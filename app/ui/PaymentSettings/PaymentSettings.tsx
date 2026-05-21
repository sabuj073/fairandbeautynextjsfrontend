
import React from 'react';
import { Card } from '@/components/ui/card';
import { API_BASE_URL } from '@/app/config/api';
import PaymentForm from './PaymentForm';
import { auth } from '@/auth';

async function getPaymentSettings(id: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/affiliate/payment/settings?id=${id}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    const data: any = await response.json();
    return data as any;
  }

const PaymentSettings = async () => {
    const token: any = await auth()
    const result = await getPaymentSettings(token?.user?.id);

  return (
    <div className="max-w-4xl mx-auto ">
       <Card className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Payment Settings
          </h2>

         <PaymentForm result={result} user_id={token?.user?.id} />
         </Card>
    </div>
  );
};

export default PaymentSettings;