"use client";

import { productStore } from "@/lib/hooks/useProductStore";
import React, { useEffect } from "react";

const getNumericPrice = (value: any) => {
  return parseFloat(String(value ?? "").replace(/[^0-9.-]+/g, "")) || 0;
};

const formatPrice = (value: any) => {
  const numericValue = getNumericPrice(value);

  if (numericValue <= 0) {
    return "";
  }

  return `৳ ${numericValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function Price({ productDetails }: any) {
  const {
    price,
    regularPrice,
    setPriceValue,
    setRegularPriceValue,
  } = productStore();

  useEffect(() => {
    setPriceValue(productDetails.main_price);

    if (productDetails.stocks && productDetails.stocks.length > 0) {
      setRegularPriceValue(
        productDetails.regular_price ??
        productDetails.stocks[0]?.regular_price ??
        ""
      );
    } else {
      setRegularPriceValue("");
    }
  }, [productDetails, setPriceValue, setRegularPriceValue]);

  const originalPrice =
    regularPrice || productDetails.stroked_price || productDetails.regular_price || "";
  const displayPrice = getNumericPrice(price) > 0 ? price : productDetails.main_price;
  const displayPriceValue = getNumericPrice(displayPrice);
  const originalPriceValue = getNumericPrice(originalPrice);
  const shouldShowOriginalPrice = originalPriceValue > 0 && originalPriceValue > displayPriceValue;

  return (
    <div className="flex flex-nowrap items-baseline gap-3 whitespace-nowrap">
      <div className="regular_price text-xl font-bold leading-none text-black">
        {formatPrice(displayPrice)}
      </div>

      {shouldShowOriginalPrice && (
        <div className="sale_price relative text-xs font-semibold text-[#8F8F8F] line-through">
          {formatPrice(originalPrice)}
        </div>
      )}
    </div>
  );
}
