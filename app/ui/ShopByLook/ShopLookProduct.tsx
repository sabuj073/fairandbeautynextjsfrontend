"use client"

import { productStore } from '@/lib/hooks/useProductStore';
import React, { useState } from 'react'
import ProductCard from './ProductCard';
import AddToLook from './AddToLook';
import { ShopLookProductSkelton } from '../skeletons';
import axios from 'axios';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { getCart } from '@/lib/cartApi';
import toast from 'react-hot-toast';

export default function ShopLookProduct({ products }: any) {
    const { combinationName, setCombinationName, setOpenCart, selectColoreVariant } = productStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [qty, setQty] = useState<number>(1);
    const [temp_user, setTemp_user] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control the dialog
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null); // State to store selected variant
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setCartData, setTempUserId, temp_user_id, cartData, totalQuantity } = useCartStoreData((state) => ({
        setCartData: state.setCartData,
        setTempUserId: state.setTempUserId,
        cartData: state.cartData,
        totalQuantity: state.totalQuantity,
        temp_user_id: state.temp_user_id,
    }));

    const { lookProduct, lookProductLoading, setLookProduct } = productStore();
    const productsData = products.map((item: { id: any; }) => ({
        ...item,
        selected: lookProduct.some((i: any) => i.id === item.id)
    }));



    const addToCartHandler = async () => {
        const isLoggedIn = !!cookieValue?.user?.id;
        let team_id = null;
        if (!isLoggedIn && !temp_user_id) {
            team_id = setTempUserId();
            setTemp_user(team_id);
        }
        const userId = isLoggedIn ? cookieValue?.user?.id : team_id || temp_user_id;


        let combinationName = null
        const get_product_cart = productsData.filter((item: any) => item.selected == true)
        let cartDataPost = []
        for (let i = 0; i < get_product_cart.length; i++) {
            const element = get_product_cart[i];
            if (element.stocks.length > 1) {
                const existVariant = selectColoreVariant.find((selectedItem: any) => element.stocks.some((i: any) => i.id === selectedItem?.variant.id))
                combinationName = existVariant.variant.variant
                console.log("existVariant", existVariant)
                if (existVariant) {
                    cartDataPost.push({
                        id: existVariant?.id,
                        quantity: 1,
                        user_id: cookieValue?.user?.id || null,
                        temp_user_id: userId || null,
                        variant: combinationName
                    })
                }

            } else {
                cartDataPost.push({
                    id: element?.id,
                    quantity: 1,
                    user_id: cookieValue?.user?.id || null,
                    temp_user_id: userId || null,
                })
            }

        }
        // console.log("cartDataPost", cartDataPost)
        // console.log("combinationName", combinationName)
        // console.log("get_product_cart", get_product_cart)
        // return false
        // console.log("combinationName", combinationName)
        setLoading(true);

        try {


            const response = await axios.post('/api/cart/multi_add', {
                data: cartDataPost
            });
            const data = response.data;
            const cartData: any = await getCart(userId);
            setCartData(cartData.data, cartData.totalQuantity);
            console.log(data)
            if (data.data_result.result) {
                toast.success(data.data_result?.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });

            }

            setOpenCart(true)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='flex py-2 items-between justify-between flex-col flex-1 overflow-scroll scrollbar-hide px-5'>
            <div className='flex lg:flex-col pb-4 gap-4 overflow-scroll scrollbar-hide  ' >
                {
                    lookProductLoading ? <ShopLookProductSkelton /> : productsData.map((item: any, index: any) => (

                        <ProductCard {...item} key={index} />
                    ))
                }


            </div>
            <AddToLook onClick={addToCartHandler} />
        </div>
    )
}
