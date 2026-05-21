
"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from '@/app/ui/button';
import useCartStoreData from '@/lib/hooks/useCartStoreData';

export default function ProductWishlist() {
  const cookieValue = cookieStore((state) => state.cookieValue);
  const { wishlist } = useCartStoreData();
  const [items, setItem] = useState([])
  const getData = async () => {
    const userId = cookieValue?.user?.id;
    try {
      const response: any = await axios.post(
        `/api/product/wishlists/list`,
        {
          user_id: userId || null,
        }
      );
      setItem(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()

  }, [cookieValue, wishlist])

  return (
    <Button className='px-[20px] justify-center md:px-[72px]  w-[50%] md:max-w-max  !bg-p_light  border-p_light border-[1px] text-base !text-primary   uppercase ' >favorite</Button>
  )
}
