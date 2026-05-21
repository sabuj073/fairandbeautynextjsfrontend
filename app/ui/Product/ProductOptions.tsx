"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface ChoiceOption {
    name: string;
    title: string;
    options: string[];
}

interface ColorOption {
    id: number;
    name: string;
    code: string;
}

interface ProductOptionsProps {
    id: number;
    choice_options?: ChoiceOption[];
    colors?: ColorOption[];
    stocks?: [];
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ id, choice_options, colors, stocks }: any) => {
    const searchParams = useSearchParams();

    const {
        sku,
        setSku,
        setQty,
        setPriceValue,
        setRegularPriceValue,
        combinationName,
        combinationImage,
        setCombinationName,
        setCombinationImage,
        selectColoreVariant,
        setSelectColoreVariant
    } = productStore();

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [selectedColor, setSelectedColor] = useState('');
    const [combination, setCombination] = useState('');
    const [combinationId, setCombinationId] = useState('');
    const [selectedColorId, setSelectedColorId] = useState('');

    const existProduct = () => {
        return selectColoreVariant.find((item: any) => item.id === id);
    };

    useEffect(() => {
        let defaultColor = colors?.[0];
        const colorFromQuery = searchParams?.get("color");

        if (colorFromQuery && colors?.length > 0) {
            const foundColor = colors.find((c: any) => c.code?.toLowerCase() === colorFromQuery.toLowerCase());
            if (foundColor) {
                defaultColor = foundColor;
            }
        }

        if (defaultColor) {
            setSelectedColor(defaultColor.name);
            setSelectedColorId(defaultColor.id);

            if (selectColoreVariant.length === 0) {
                setSelectColoreVariant({
                    id: id,
                    color: defaultColor,
                    variant: stocks?.[0]
                });
            }
        }

        if (choice_options && choice_options.length > 0) {
            const defaultSelected: { [key: string]: string } = {};
            choice_options.forEach((option: any) => {
                if (option.options.length > 0) {
                    defaultSelected[option.title] = option.options[0];
                }
            });
            setSelectedOptions(defaultSelected);
        }
    }, [choice_options, colors]);

    useEffect(() => {
        const optionCombination = choice_options?.map((option: ChoiceOption) => selectedOptions[option.title])
            .filter(Boolean)
            .join('-') || '';

        const stringWithoutSpaces = optionCombination.replace(/\s+/g, "");
        const combination_name = `${selectedColor ? selectedColor + '-' : ''}${stringWithoutSpaces}`;
        setCombination(combination_name);
        setCombinationName(combination_name);
    }, [selectedOptions, selectedColor]);

    const handleOptionChange = (title: string, option: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [title]: option,
        }));
    };

    const handleColorChange = (color: any) => {
        setSelectedColor(color?.name);
        setSelectedColorId(color?.id);

        const exist = selectColoreVariant.find((item: any) => item?.color?.name === color?.name && item?.id === id);

        if (exist) {
            setSelectColoreVariant({ ...exist });
        } else {
            setSelectColoreVariant({
                id: id,
                color: color,
                variant: stocks?.[0] || null
            });
        }
    };

    useEffect(() => {
        if (combination) {
            // const variantPrice = stocks?.find((item: any) => item.id === combination) as any;
            const variantPrice = stocks?.find((item: any) => item.variant.replace(/\s+/g, '') === combination);
            const variantIndex = stocks?.findIndex((item: any) => item.variant === combination);
            setCombinationImage(variantIndex);

            if (variantPrice) {
                setPriceValue(variantPrice.price);
                setQty(variantPrice.qty);
                setSku(variantPrice.sku);
                setRegularPriceValue(variantPrice.regular_price);
                setCombinationName(combination);
            }

            const exist = existProduct();
            if (exist) {
                setSelectColoreVariant({
                    ...exist,
                    variant: variantPrice
                });
            } else {
                setSelectColoreVariant({
                    id: id,
                    variant: variantPrice
                });
            }
        }
    }, [combination]);

    useEffect(() => {
        if (combination) {
            handleSize();
        }
    }, [combination]);

    const handleSize = async () => {
        if (combination) {
            try {
                const response = await axios.post(`/api/variant`, {
                    id: id,
                    variants: combination
                });

                if (response.data) {
                    setSku(response.data.sku);
                    setCombinationId(response.data.id);
                    setPriceValue(response.data.price_string);
                    setQty(response.data.stock);
                    setCombinationName(response.data.variant);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            {choice_options?.length > 0 && choice_options.map((option: any) => (
                <div key={option.name} className='flex items-center justify-start gap-2'>
                    <h4>{option.title}:</h4>
                    <div className='flex shrink-0 gap-1.5 md:px-4 items-center overflow-auto w-full flex-wrap'>
                        {option.options.map((item: any, index: any) => (
                            <div
                                key={index}
                                onClick={() => handleOptionChange(option.title, item)}
                                role="button"
                                title="Size Selector Item"
                                className={`${selectedOptions[option.title] === item ? 'bg-[linear-gradient(180deg,#139804_0%,#063B00_100%)] text-white' : ''} flex border rounded-full px-4 py-1.5 items-center`}
                            >
                                <p className="text-[12px] font-semibold">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {colors?.length > 0 && (
                <div className='flex items-center justify-start mt-4 gap-3'>
                    <h4>Color:</h4>
                    <div className='flex gap-2 flex-wrap'>
                        {colors.map((color: any, index: any) => (
                            <div key={index} onClick={() => handleColorChange(color)} className='cursor-pointer'>
                                <div className={`flex gap-1 rounded-full items-center w-full ${selectColoreVariant.some((item: any) => item?.color?.id === color?.id && id === item.id)
                                    ? 'border-2 border-primary'
                                    : 'border border-gray-300'
                                    }`}>
                                    <div className="border rounded-full m-1">
                                        <div className="rounded-full overflow-hidden w-[16px] h-[16px]" style={{ backgroundColor: color.code }}></div>
                                    </div>
                                    {selectColoreVariant.some((item: any) => item?.color?.id === color?.id && id === item.id) && (
                                        <div className="addToCart text-center flex items-center justify-center">
                                            <div className="flex grow pr-1.5 items-center justify-center">
                                                <p className="text-sm font-semibold line-clamp-1">{color?.name}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductOptions;
