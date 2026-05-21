"use client"
import { Button } from '@/app/ui/button';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { getCart } from '@/lib/cartApi';
import { productStore } from '@/lib/hooks/useProductStore';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


export default function BuyNow({
    id,
}: any) {
    const router = useRouter()
    const { combinationName, setCombinationName } = productStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [qty, setQty] = useState<number>(1);
    const [temp_user, setTemp_user] = useState<any>(null);
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setCartData, setTempUserId, temp_user_id, cartData, totalQuantity } = useCartStoreData((state) => ({
        setCartData: state.setCartData,
        setTempUserId: state.setTempUserId,
        cartData: state.cartData,
        totalQuantity: state.totalQuantity,
        temp_user_id: state.temp_user_id,
    }));

    const addToCartHandler = async () => {
        console.log("combinationName", combinationName)
        setLoading(true);
        const isLoggedIn = !!cookieValue?.user?.id;
        let team_id = null;
        if (!isLoggedIn && !temp_user_id) {
            team_id = setTempUserId();
            setTemp_user(team_id)
        }
        const userId = isLoggedIn ? cookieValue?.user?.id : team_id || temp_user_id;
        try {

            const cartDataPost = {
                id: id,
                quantity: qty,
                user_id: cookieValue?.user?.id || null,
                temp_user_id: userId || null,
            } as any
            if (combinationName) {
                cartDataPost.variant = combinationName
            }
            const response = await axios.post('/api/cart/add', cartDataPost);

            const data = response.data;
            const cartData: any = await getCart(userId);
            setCartData(cartData.data, cartData.totalQuantity);
            if (data.result) {
                router.push('/checkout')
                // toast.success(data.message, {
                //     style: { color: '#404042', fontWeight: 600 },
                //     iconTheme: { primary: '#A020F0', secondary: '#fff' },
                // });
            } else {
                router.push('/checkout')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button disabled={loading} onClick={addToCartHandler} className=' uppercase px-[20px] justify-center md:px-[72px] w-[50%] md:max-w-max    bg-transparent hover:bg-primary border-primary border-[1px] text-base !text-neutral-black  hover:!text-white' >Buy now {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}</Button></>

    )
}
