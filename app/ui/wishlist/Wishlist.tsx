
"use client"
import Container from '@/app/ui/Container/Container'
import { cookieStore } from '@/lib/hooks/useCookieStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductItem from '../Product/ProductItem';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { ProductSkeleton } from '../skeletons';

export default function Wishlist({ count = 5 }: any) {
  const [loading, setLoading] = useState(false);
  const cookieValue = cookieStore((state) => state.cookieValue);
  const { wishlist } = useCartStoreData();
  const [items, setItem] = useState([])
  const getData = async () => {
    setLoading(true);
    const userId = cookieValue?.user?.id;
    try {
      const response: any = await axios.post(
        `/api/product/wishlists/list`,
        {
          user_id: userId || null,
        }
      );
      setItem(response.data.data)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  useEffect(() => {
    getData()

  }, [cookieValue])
  const filteredItems = items.filter((item: any) => wishlist.includes(item.id));
  return (
    <div className='py-5'>
      <Container>
        <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>
        <div className={` grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${count} `}>
          {
            loading
              ? Array.from({ length: 5 }).map((_, index) => (
                <ProductSkeleton key={index} />
              )) :
              filteredItems.map((item: any) => (
                <ProductItem {...item} key={item.id} />
              ))
          }
          {filteredItems.length === 0 && <h3 className="text-2xl font-medium text-primary mb-6">No Wishlist product</h3>}
        </div>
      </Container>
    </div>
  )
}
