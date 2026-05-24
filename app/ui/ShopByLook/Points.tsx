"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'

const clampCoordinate = (value: any) => {
    const coordinate = Number(value);
    if (Number.isNaN(coordinate)) {
        return 0;
    }
    return Math.max(0, Math.min(100, coordinate));
}

export default function Points({ data }: any) {

    const { setLookProductLoading, setLookProduct } = productStore();
    const points = useMemo(() => data?.points ?? [], [data?.points]);
    const [selectPoint, setSelectPoint] = useState<any>(points[0]?.id || '')

    useEffect(() => {
        if (selectPoint) {
            handlePoint(selectPoint)
        }
    }, [selectPoint])

    const handlePoint = async (item: any) => {
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
                    <button
                        key={item.id}
                        type="button"
                        aria-label="Select look point"
                        aria-pressed={selectPoint === item.id}
                        className={`look-hotspot ${selectPoint === item.id ? 'look-hotspot-active' : ''}`}
                        onClick={() => setSelectPoint(item.id)}
                        style={
                            {
                                left: clampCoordinate(item.x_coordinate) + '%',
                                top: clampCoordinate(item.y_coordinate) + '%',
                            }

                        }
                    >
                        <span className='look-hotspot-core'></span>
                    </button>
                ))
            }
        </>
    )
}
