"use client";

import { useEffect } from "react";

export default function OrderSuccessClient({ orderData, orderItems }: any) {
  useEffect(() => {
    if (!orderData) return;

    // ✅ Clean up total value
    const cleanTotal =
      typeof orderData?.grand_total === 'string'
        ? parseFloat(orderData.grand_total.replace(/[^\d.-]/g, ''))
        : orderData?.grand_total || 0;

    // ✅ Clean up tax & shipping too if needed
    const tax =
      typeof orderData?.tax === 'string'
        ? parseFloat(orderData.tax.replace(/[^\d.-]/g, ''))
        : orderData?.tax || 0;

    const shipping =
      typeof orderData?.shipping_cost === 'string'
        ? parseFloat(orderData.shipping_cost.replace(/[^\d.-]/g, ''))
        : orderData?.shipping_cost || 0;

    const items = orderItems?.map((item: any) => {
      const cleanPrice = typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^\d.-]/g, ''))
        : item.price;

      return {
        item_id: item.product_id,
        item_name: item.product_name,
        price: cleanPrice,
        quantity: item.quantity,
        variant: item.variation || '',
      };
    }) || [];

(window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'purchase',
      ecommerce: {
        currency: 'BDT',
        transaction_id: orderData?.code,
        value: cleanTotal,
        tax: tax,
        coupon: orderData?.coupon_code || '',
        items: items,
      },
    });

    console.log("✅ PURCHASE PUSHED:", {
      transaction_id: orderData?.code,
      value: cleanTotal,
      tax,
      shipping,
      items,
    });

  }, [orderData, orderItems]);

  return null;
}
