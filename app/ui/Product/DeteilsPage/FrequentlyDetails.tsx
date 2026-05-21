"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/app/config/api";
import { Product } from "@/types/api";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { getCart } from "@/lib/cartApi";

interface FrequentlyDetailsProps {
  productSlug: string;
  productId: number;
  title?: string;
  frequentlyBoughtTogether?: Product[];
}

const fallbackTitle = "Frequently Bought Together";

const getNumericPrice = (value?: string | number) => {
  return parseFloat(String(value ?? "").replace(/[^0-9.-]+/g, "")) || 0;
};

const formatPrice = (value: number) => `Tk ${value.toLocaleString("en-US", {
  maximumFractionDigits: 2,
})}`;

export default function FrequentlyDetails({
  productSlug,
  productId,
  title,
  frequentlyBoughtTogether = [],
}: FrequentlyDetailsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [addingToCart, setAddingToCart] = useState(false);
  const [fetchedTitle, setFetchedTitle] = useState("");
  const cookieValue = cookieStore((state: any) => state.cookieValue);

  const { setCartData, setTempUserId, temp_user_id } = useCartStoreData((state: any) => ({
    setCartData: state.setCartData,
    setTempUserId: state.setTempUserId,
    temp_user_id: state.temp_user_id,
  }));

  useEffect(() => {
    const applyProducts = (items: Product[]) => {
      const filteredProducts = items.filter((product) => product.id !== productId);
      setProducts(filteredProducts);
      setSelectedProducts(new Set(filteredProducts.map((product) => product.id)));
    };

    if (frequentlyBoughtTogether.length > 0) {
      applyProducts(frequentlyBoughtTogether);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/frequently-bought/${productSlug}`);
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const productsData = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];
        if (typeof data?.title === "string") {
          setFetchedTitle(data.title);
        }
        applyProducts(productsData);
      } catch (error) {
        console.error("Error fetching frequently bought products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProducts();
    }
  }, [productSlug, productId, frequentlyBoughtTogether]);

  const sectionTitle = title?.trim() || fetchedTitle.trim() || fallbackTitle;

  const selectedItems = useMemo(() => {
    return products.filter((product) => selectedProducts.has(product.id));
  }, [products, selectedProducts]);

  const totals = useMemo(() => {
    return selectedItems.reduce(
      (sum, product) => {
        const mainPrice = getNumericPrice(product.main_price);
        const strokedPrice = getNumericPrice(product.stroked_price);
        return {
          price: sum.price + mainPrice,
          mrp: sum.mrp + (strokedPrice > mainPrice ? strokedPrice : mainPrice),
        };
      },
      { price: 0, mrp: 0 }
    );
  }, [selectedItems]);

  const discountPercent = totals.mrp > totals.price
    ? Math.round(((totals.mrp - totals.price) / totals.mrp) * 100)
    : 0;

  const toggleProduct = (id: number) => {
    setSelectedProducts((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddBothToCart = async () => {
    if (selectedProducts.size === 0) {
      toast.error("Please select at least one product");
      return;
    }

    setAddingToCart(true);
    const isLoggedIn = !!cookieValue?.user?.id;
    let team_id = temp_user_id;

    if (!isLoggedIn && !temp_user_id) {
      team_id = setTempUserId();
    }

    const userId = isLoggedIn ? cookieValue?.user?.id : team_id;

    try {
      const cartItems = selectedItems.map((product) => ({
        id: product.id,
        quantity: 1,
        user_id: isLoggedIn ? cookieValue?.user?.id : null,
        temp_user_id: !isLoggedIn ? userId : null,
      }));

      for (const item of cartItems) {
        await axios.post("/api/cart/add", item);
      }

      const cartData: any = await getCart(userId);
      setCartData(cartData.data, cartData.totalQuantity);

      toast.success(`${cartItems.length} product(s) added to cart successfully!`, {
        style: { color: "#404042", fontWeight: 600 },
        iconTheme: { primary: "#EC407A", secondary: "#fff" },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add products to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-5 md:mx-2">
        <h2 className="mb-3 text-[17px] font-semibold text-[#1f2933]">{sectionTitle}</h2>
        <div className="rounded-lg border border-[#f2dbe4] bg-white p-4 text-center text-sm text-gray-500">
          Loading...
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-5 md:mx-2">
      <h2 className="mb-3 text-[17px] font-semibold text-[#1f2933]">{sectionTitle}</h2>

      <div className="space-y-3 rounded-lg bg-[#fff6f8] p-3">
        {products.map((product, index) => {
          const isSelected = selectedProducts.has(product.id);
          const mainPrice = getNumericPrice(product.main_price);
          const strokedPrice = getNumericPrice(product.stroked_price);
          const hasDiscount = product.has_discount && strokedPrice > mainPrice;

          return (
            <div key={product.id} className="relative flex gap-3">
              <div className="flex w-8 flex-col items-center pt-8">
                <span className="z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff8fb1] text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                {index < products.length - 1 && (
                  <span className="mt-1 h-full min-h-16 w-px bg-[#ffd0dc]" />
                )}
              </div>

              <div className="flex flex-1 gap-3 rounded-lg bg-white p-2.5 shadow-[0_1px_8px_rgba(31,41,51,0.06)]">
                <Link href={`/product/${product.slug}`} className="shrink-0">
                  <div className="flex h-[82px] w-[74px] items-center justify-center overflow-hidden rounded-md border border-[#edf1f5] bg-white">
                    <Image
                      src={product.thumbnail_image || "/placeholder.png"}
                      width={74}
                      height={82}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Link>

                <div className="min-w-0 flex-1 pr-7">
                  {index === 0 && (
                    <span className="mb-1 inline-flex rounded bg-[#13a36f] px-2 py-0.5 text-[10px] font-semibold text-white">
                      This Item
                    </span>
                  )}
                  <p className="truncate text-[12px] font-semibold text-[#263238]">
                    {product.brand || "Fair And Beauty"}
                  </p>
                  <Link href={`/product/${product.slug}`}>
                    <p className="line-clamp-2 text-[12px] leading-4 text-[#4d5963]">
                      {product.name}
                    </p>
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-[11px]">
                    {product.rating > 0 && (
                      <span className="rounded bg-[#eef9f3] px-1.5 py-0.5 font-medium text-[#247a53]">
                        {product.rating.toFixed(1)} *
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="text-[#f28a00]">{Math.round(product.discount)}% OFF</span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px]">
                    {hasDiscount && (
                      <span className="text-[#8a949e] line-through">{formatPrice(strokedPrice)}</span>
                    )}
                    <span className="font-semibold text-[#111827]">{formatPrice(mainPrice)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={isSelected ? "Remove product" : "Select product"}
                  onClick={() => toggleProduct(product.id)}
                  className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded border text-[13px] font-bold transition ${
                    isSelected
                      ? "border-[#ff4f86] bg-[#ff4f86] text-white"
                      : "border-[#d8e0e7] bg-white text-transparent"
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 8.2 6.5 11 12.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-between gap-3 border-t border-[#ffdbe4] pt-3">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-[#5f6872]">
              Total Price ({selectedProducts.size} items):
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px]">
              {totals.mrp > totals.price && (
                <span className="text-[#8a949e] line-through">{formatPrice(totals.mrp)}</span>
              )}
              <span className="text-[15px] font-bold text-[#111827]">{formatPrice(totals.price)}</span>
              {discountPercent > 0 && (
                <span className="font-semibold text-[#f28a00]">({discountPercent}% OFF)</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddBothToCart}
            disabled={addingToCart || selectedProducts.size === 0}
            className="shrink-0 rounded-lg border border-[#ff4f86] px-4 py-2 text-[13px] font-semibold text-[#ff2f73] disabled:cursor-not-allowed disabled:border-[#d8e0e7] disabled:text-[#9aa5af]"
          >
            {addingToCart ? "Adding..." : `Add ${selectedProducts.size} items to Bag`}
          </button>
        </div>
      </div>
    </section>
  );
}
