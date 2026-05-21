"use client";
import { productStore } from "@/lib/hooks/useProductStore";
import React, { useEffect } from "react";

export default function Stock({ productDetails }: any) {
  const { qty, sku, setQty, setSku } = productStore(); // Destructure sku and setSku

  console.log(sku);
  useEffect(() => {
    setQty(productDetails.current_stock); // Set quantity
    setSku(productDetails.sku); // Set SKU
  }, [productDetails.current_stock, productDetails.sku]);

  return (
    <>
      <div className="stock_area flex items-center gap-3 text-base text-neutral-black">
        <span>In Stock:</span> <span>({qty})</span>
      </div>

      {sku ? (
        <div className="sku_area flex items-center gap-3 text-base text-neutral-black">
          <span>SKU:</span> <span>{sku}</span>
        </div>
      ) : (
        productDetails?.stocks?.[0]?.sku && (
          <div className="sku_area flex items-center gap-3 text-base text-neutral-black">
            <span>SKU:</span> <span>{productDetails.stocks[0].sku}</span>
          </div>
        )
      )}
    </>
  );
}
