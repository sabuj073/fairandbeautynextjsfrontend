"use client";

import { useEffect } from "react";

interface DataLayerViewItemProps {
  product: any;
}

const DataLayerViewItem: React.FC<DataLayerViewItemProps> = ({ product }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {

      const rawPrice =
        product.main_price || product.stocks?.[0]?.main_price || 0;

      const cleanedPrice =
        typeof rawPrice === "string"
          ? parseFloat(
              rawPrice.replace(/[^\d.,]/g, "").replace(/,/g, "")
            )
          : rawPrice;

      const sku = product.sku || product.stocks?.[0]?.sku || "";

      (window as any).dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: product.currency || "BDT",
          value: cleanedPrice,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              affiliation: product.brand?.name || "",
              price: cleanedPrice,
              item_sku: sku,
              item_brand: product.brand?.name || "",
              quantity: 1,
            },
          ],
        },
      });
    }
  }, [product]);

  return null;
};

export default DataLayerViewItem;
