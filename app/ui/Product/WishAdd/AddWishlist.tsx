"use client"
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from '../../button';
import { Loader2 } from 'lucide-react';

export default function AddWishlist({ id }: any) {
    const pathname = usePathname()

    const [loading, setLoading] = useState<boolean>(false);
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setWishlist, wishlist, setWishlistRemove } = useCartStoreData();
    const handlerWishlist = async () => {

        setLoading(true);
        const isLoggedIn = !!cookieValue?.user?.id;

        const userId = isLoggedIn ? cookieValue?.user?.id : null
        try {
            const DataPost = {
                product_id: id,
                user_id: userId,
            } as any

            if (pathname === '/wishlist') {
                const response = await axios.post('/api/product/wishlists/remove', DataPost);
                const data = response.data;
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setWishlistRemove(id)
            } else {
                const response = await axios.post('/api/product/wishlists/add-product', DataPost);
                const data = response.data;

                if (data.is_in_wishlist) {
                    toast.success(data.message, {
                        style: { color: '#404042', fontWeight: 600 },
                        iconTheme: { primary: '#A020F0', secondary: '#fff' },
                    });
                    setWishlist(id)
                } else {
                    toast.error(data.message, {
                        style: { color: 'red', fontWeight: 600 },
                        iconTheme: { primary: 'red', secondary: '#fff' },
                    });
                }
            }

            setLoading(false);


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Button onClick={handlerWishlist} className='px-[20px] justify-center md:px-[72px]  w-[50%] md:max-w-max  !bg-p_light  border-p_light border-[1px] text-base !text-primary   uppercase ' >favorite {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />} </Button></>


    )
}
