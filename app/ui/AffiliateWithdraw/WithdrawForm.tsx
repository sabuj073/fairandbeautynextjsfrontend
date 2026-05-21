"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';



const WithdrawForm = ({user_id}:any) => {
    const [loading,setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm() as any;
  const router = useRouter()
  

  const onSubmit = async (data:any) => {
    // Simulate API call
    console.log('Form data:', data);
    try {
        setLoading(true)
        const response: any = await axios.post(
            `/api/affiliate/withdraw_request/store`,
            {
                ...data,
                id: user_id,
                
            }
        );
        if (response?.data.result) {
            toast.success(response?.data.message, {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#8E2581', secondary: '#fff' },
            });
            router.push("/user/affiliate")
        } else {
            toast.error(response?.data.message, {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#8E2581', secondary: '#fff' },
            });
        }
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  };

  return (
    <div >
     

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* PayPal Email */}
            <div className="space-y-2">
              <label 
                htmlFor="paypalEmail" 
                className="block text-sm font-medium text-gray-700"
              >
                Amount *
              </label>
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  {...register('amount', {
                    required: 'Amount is required',
                  })}
                  className={`w-full px-4 py-2.5 rounded-md border 
                    ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500/20'}
                    focus:border-red-500 outline-none transition duration-200`}
                  placeholder="Amount"
                />
                {errors.amount && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2.5 rounded-md text-white
                  ${isSubmitting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
                  transition duration-200 flex items-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-red-500/50`}
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-r-transparent" />
                    <span>Updating...</span>
                  </>
                ) : (
                  'Withdraw Request'
                )}
              </button>
            </div>
          </form>
     
    </div>
  );
};

export default WithdrawForm;