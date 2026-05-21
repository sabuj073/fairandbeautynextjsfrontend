
import React from 'react';
import CustomImage from '../CustomImage/CustomImage';
import SingleAddToCart from '../Product/AddToCartAction/SingleAddToCart';
import ColorVariant from './ColorVariant';

const ProductCard = ({ selected, id, thumbnail_image, colors, choice_options, stocks, name, slug, brand, discount, rating, totalRating, stroked_price, main_price }: any) => {

    return (
        <div className="flex flex-row">
            <div
                className={`flex gap-2 border ${selected ? 'border-red-600' : ""} rounded-md shadow-md p-4 relative flex-row w-full bg-white
            `}>
                {/* Image Section */}
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="relative w-[80px] h-auto  " >
                            {/* Image here */}
                            <CustomImage
                                src={thumbnail_image}
                                width={80}
                                height={60}
                                alt="Shop by look"
                                className="object-contain transition-transform duration-300 ease-in-out transform  w-full h-full "
                                style={{ aspectRatio: 1 / 1 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 w-[250px] md:w-full ">
                    {/* Product Title and Cart Button */}
                    <div className="flex items-center flex-row flex-1">
                        <div className="flex flex-col flex-1">
                            <p className="text-base font-medium text-black line-clamp-1">
                                {name}
                            </p>
                        </div>
                        <div className="flex ml-auto flex-col">
                            <button
                                title="Add to Cart"
                                type="button"
                                className="btn relative flex btn-ghost btn-sm rounded-full bg-pink-100 text-black"
                            >
                                <div className="btn-icon">
                                    <SingleAddToCart isShow={true} look={true} id={id} stocks={stocks} choice_options={choice_options} colors={colors} thumbnail_image={thumbnail_image} name={name} stroked_price={stroked_price} main_price={main_price} totalRating={totalRating} brand={brand} discount={discount} />

                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-row gap-x-1.5 pt-0 items-center">
                            <p className="text-lg font-semibold text-primary">{main_price}</p>
                            <p className="text-sm text-arival_var line-through">{stroked_price}</p>
                            <p className="text-sm font-semibold text-[#601390]">{discount}% off</p>
                        </div>
                    </div>

                    {/* Color Variant Section */}
                    <ColorVariant look={false} id={id} stocks={stocks} choice_options={choice_options} colors={colors} thumbnail_image={thumbnail_image} name={name} stroked_price={stroked_price} main_price={main_price} totalRating={totalRating} brand={brand} discount={discount} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
