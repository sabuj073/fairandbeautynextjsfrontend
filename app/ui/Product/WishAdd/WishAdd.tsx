"use client"
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import axios from 'axios';
import { Heart, X } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function WishAdd({ id }: any) {
    const pathname = usePathname()
    const [loading, setLoading] = useState<boolean>(false);
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setWishlist, wishlist, setWishlistRemove } = useCartStoreData();
    
    const isInWishlist = wishlist.includes(id);
    const isWishlistPage = pathname === '/wishlist';
    
    const handlerWishlist = async () => {
        setLoading(true);
        const userId = cookieValue?.user?.id;
        
        try {
            if (!userId) {
                toast.error("Please first login");
                return false;
            }
            
            const DataPost = { product_id: id, user_id: userId };

            if (isWishlistPage) {
                const response = await axios.post('/api/product/wishlists/remove', DataPost);
                toast.success(response.data.message);
                setWishlistRemove(id);
            } else {
                const response = await axios.post('/api/product/wishlists/add-product', DataPost);
                const data = response.data;

                if (data.is_in_wishlist) {
                    toast.success(data.message);
                    setWishlist(id);
                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={handlerWishlist}
            className={`
                w-8 h-8 rounded-2xl mr-4 cursor-pointer 
                transition duration-300 ease-in-out flex items-center justify-center z-10
                ${isWishlistPage 
                    ? 'bg-red-600 text-white' 
                    : isInWishlist 
                        ? 'bg-slate-400 text-white' 
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-slate-400 hover:text-white'
                }
            `}
        >
            {isWishlistPage ? (
                <X className="w-4 h-4" />
            ) : (
                <Heart 
                    className="w-6 h-6 " 
                    fill={isInWishlist ? "currentColor" : "none"}
                />
            )}
        </div>
    )
}