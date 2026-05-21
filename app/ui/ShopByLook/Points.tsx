"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Points({ data }: any) {

    const { lookProduct, setLookProductLoading, setLookProduct } = productStore();
    const [selectPoint, setSelectPoint] = useState<any>(data && data?.points && data?.points.length > 0 && data?.points[0]?.id || '')
    useEffect(() => {
        handlePoint(selectPoint)
    }, [selectPoint])

    const handlePoint = async (item: any) => {
        // setSelectPoint(item)
        setLookProductLoading(true)
        try {
            const response: any = await axios.post(
                `/api/point`, {
                id: item
            });
            setLookProduct(response.data?.products?.data)
            setLookProductLoading(false)
        } catch (error) {
            console.log(error)
            setLookProductLoading(false)
        }
    }

    return (
        <>
            {
                data?.points && data?.points.map((item: any) => (
                    <div key={item.id} className="hotspot" onClick={() => setSelectPoint(item.id)}
                        style={
                            {
                                position: 'absolute',
                                left: item.x_coordinate + '%',
                                top: item.y_coordinate + '%',
                                width: `${selectPoint === item.id ? '15px' : '10px'}`,
                                height: `${selectPoint === item.id ? '15px' : '10px'}`,
                                backgroundColor: '#dcdce7',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }

                        }
                    >
                        <div style={{
                            background: "#fff",
                            width: `${selectPoint === item.id ? '10px' : '7px'}`,
                            height: `${selectPoint === item.id ? '10px' : '7px'}`,
                            borderRadius: `50%`

                        }} className='small_point'></div>
                    </div>
                ))
            }
        </>
    )
}
