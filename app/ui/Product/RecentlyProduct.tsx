
"use client"
import { NumberType } from '@/types/api';
import ProductSlider from '@/app/ui/Product/ProductSlider'
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomHeadProductSlider from './CustomHeadProductSlider';


export default function RecentlyProduct({ id }: NumberType) {
    const [loading, setLoading] = useState(false);
    const { wishlist } = useCartStoreData();
    const [items, setItem] = useState([])
    const { setResetProduct, resetProduct } = useCartStoreData();
    const getData = async () => {
        setLoading(true);
        try {
            const response: any = await axios.post(
                `/api/product/recently_view`,
                {
                    recentProduct: resetProduct,
                    id: id,
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

    }, [resetProduct])

    return (
        <CustomHeadProductSlider
            title="LAST VIEWED PRODUCTS"
            sub_title='viewed Product'
            products={items}
            view_link="/relative"
            className='bg-transparent mx-0 p-0'
            ContainerClassName=""
            translateKey='recently_view_product'
            view_all_button={false}
        />
    )
}
