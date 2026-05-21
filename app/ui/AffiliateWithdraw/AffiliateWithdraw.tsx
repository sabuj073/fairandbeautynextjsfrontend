
import React from 'react';
import { Card } from '@/components/ui/card';
import { auth } from '@/auth';
import WithdrawForm from './WithdrawForm';



const AffiliateWithdraw = async () => {
    const token: any = await auth()

  return (
    <div className="max-w-4xl mx-auto ">
       <Card className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Affiliate Withdraw Request
          </h2>

           <WithdrawForm  user_id={token?.user?.id} />
         </Card>
    </div>
  );
};

export default AffiliateWithdraw;