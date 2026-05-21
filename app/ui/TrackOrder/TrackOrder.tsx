"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
    order_code: string;
};

export default function TrackOrder() {
    const [loading, setLoading] = useState<boolean>(false);
    const [orderMsg, setOrderMsg] = useState<any>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const router = useRouter()
    const onSubmit: SubmitHandler<FormValues> = async (order_code) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/order/track-your-order', order_code);

            const data = response.data;

            if (data.result) {
                router.push(`/order/track?order_id=${data?.data?.id}`)
            } else {
                setOrderMsg(response.data.msg)
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }

    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="order_code" className="block text-sm font-medium text-gray-700">Order Number*</label>
                <input
                    id="order_code"
                    type="text"
                    placeholder="Order Number"
                    {...register('order_code', { required: 'Order Number is required' })}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.order_code ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                />
                {errors.order_code && <p className="mt-1 text-sm text-red-600">{errors.order_code.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
                {loading ? 'Continue...' : 'Continue'}

            </button>
            {orderMsg && <p className="mt-1 text-sm text-red-600">{orderMsg}</p>}
        </form>
    );
}
