"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SingleAddToCart from '../Product/AddToCartAction/SingleAddToCart';

export default function ColorVariant({ look, id, thumbnail_image, colors, choice_options, stocks, name, slug, brand, discount, rating, totalRating, stroked_price, main_price }: any) {
    const { setSelectColoreVariant, selectColoreVariant } = productStore();
    const [colorChange, setColorChange] = useState<any>(null)
    useEffect(() => {
        if (selectColoreVariant.length === 0 && colors.length > 0 && stocks.length > 1) {
            setSelectColoreVariant({
                id: id,
                color: colors[0],
                variant: stocks[0]
            })
        }
        let findColor = selectColoreVariant.find((item: any) => item.id === id)
        setColorChange(findColor)
    }, [selectColoreVariant])


    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col">
                <div
                    role="button"
                    title="Product Color Variants Dropdown"
                    className="flex flex-row gap-1.5 pt-2 max-w-max "
                >
                    <div className="flex gap-1 border rounded-full items-center w-full"
                    >
                        {
                            colorChange?.color?.code && id === colorChange?.id && (
                                <div className="border rounded-full m-1">
                                    <div
                                        className="rounded-full overflow-hidden w-[16px] h-[16px]"
                                        style={{ backgroundColor: colorChange?.color?.code }} // Use inline styles here
                                    >
                                    </div>
                                </div>
                            )
                        }

                        <SingleAddToCart isShow={false} color_variant={stocks && stocks.length > 1 ? true : false} look={true} id={id} stocks={stocks} choice_options={choice_options} colors={colors} thumbnail_image={thumbnail_image} name={name} stroked_price={stroked_price} main_price={main_price} totalRating={totalRating} brand={brand} discount={discount} />

                    </div>
                </div>
            </div>
        </div>
    )
}
