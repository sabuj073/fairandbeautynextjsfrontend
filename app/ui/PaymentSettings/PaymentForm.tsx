"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';



const PaymentForm = ({result,user_id}:any) => {
    const [loading,setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
       paypal_email: result?.affiliate_user?.paypal_email,
       bank_information:  result?.affiliate_user?.bank_information
    }
  }) as any;

  

  const onSubmit = async (data:any) => {
    // Simulate API call
    console.log('Form data:', data);
    try {
        setLoading(true)
        const response: any = await axios.post(
            `/api/affiliate/payment/settings/store`,
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
                Paypal Email
              </label>
              <div className="relative">
                <input
                  id="paypal_email"
                  type="email"
                  {...register('paypal_email', {
                    required: 'PayPal email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full px-4 py-2.5 rounded-md border 
                    ${errors.paypal_email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500/20'}
                    focus:border-red-500 outline-none transition duration-200`}
                  placeholder="Enter your PayPal email"
                />
                {errors.paypal_email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.paypal_email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.paypal_email.message}
                </p>
              )}
            </div>

            {/* Bank Information */}
            <div className="space-y-2">
              <label 
                htmlFor="bank_information" 
                className="block text-sm font-medium text-gray-700"
              >
                Bank Informations
              </label>
              <div className="relative">
                <input
                  id="bank_information"
                  type="text"
                  {...register('bank_information', {
                    required: 'Bank information is required',
                    minLength: {
                      value: 10,
                      message: 'Bank information must be at least 10 characters'
                    }
                  })}
                  className={`w-full px-4 py-2.5 rounded-md border 
                    ${errors.bank_information ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500/20'}
                    focus:border-red-500 outline-none transition duration-200`}
                  placeholder="Enter your bank information"
                />
                {errors.bank_information && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.bank_information && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.bank_information.message}
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
                  'Update Payment Settings'
                )}
              </button>
            </div>
          </form>
     
    </div>
  );
};

export default PaymentForm;