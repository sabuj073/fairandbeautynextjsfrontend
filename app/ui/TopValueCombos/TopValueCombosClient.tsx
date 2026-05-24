"use client";

import { BASE_URL } from "@/app/config/api";
import { Button } from "@/app/ui/button";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { getCart } from "@/lib/cartApi";
import { productStore } from "@/lib/hooks/useProductStore";
import axios from "axios";
import { Star, Tags } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export type ComboDeal = {
  id: number;
  title: string;
  subtitle?: string | null;
  badge_text?: string | null;
  image?: string | null;
  product_count: number;
  regular_price: string;
  combo_price: string;
  discount: number;
  rating: number;
};

type Props = {
  combos: ComboDeal[];
};

export default function TopValueCombosClient({ combos }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const cookieValue = cookieStore((state) => state.cookieValue);
  const setOpenCart = productStore((state) => state.setOpenCart);
  const { setCartData, setTempUserId, temp_user_id } = useCartStoreData((state) => ({
    setCartData: state.setCartData,
    setTempUserId: state.setTempUserId,
    temp_user_id: state.temp_user_id,
  }));

  const addComboToCart = async (combo: ComboDeal) => {
    const isLoggedIn = !!cookieValue?.user?.id;
    let generatedTempId = null;

    if (!isLoggedIn && !temp_user_id) {
      generatedTempId = setTempUserId();
    }

    const userId = isLoggedIn ? cookieValue?.user?.id : generatedTempId || temp_user_id;
    setLoadingId(combo.id);

    try {
      const response = await axios.post("/api/cart/combo_add", {
        combo_id: combo.id,
        quantity: 1,
        user_id: isLoggedIn ? cookieValue?.user?.id : null,
        temp_user_id: isLoggedIn ? null : userId,
      });

      if (response.data?.result) {
        const cart = await getCart(userId);
        if (cart) {
          setCartData(cart.data, cart.totalQuantity);
        }
        toast.success(response.data.message || "Combo added to cart", {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#E84D83", secondary: "#fff" },
        });
        setOpenCart(true);
      } else {
        toast.error(response.data?.message || "Unable to add combo");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to add combo");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="home-section">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-neutral-black">
          <Tags className="h-5 w-5 stroke-[2.2] text-[#166534]" />
          <h2 className="text-[18px] sm:text-[22px] font-semibold leading-tight">
            Top Value Combos
          </h2>
        </div>
        <span className="rounded-full bg-[#166534] px-3 py-1 text-[11px] font-semibold uppercase tracking-normal text-white">
          Save more on each item
        </span>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {combos.map((combo) => (
          <article key={combo.id} className="w-[174px] flex-none sm:w-[210px]">
            <div className="overflow-hidden rounded-lg border border-[rgba(9,93,0,0.18)] bg-white">
              <div className="bg-[#4b5563] px-2 py-2 text-center text-[12px] sm:text-[13px] font-semibold text-white truncate">
                {combo.badge_text || `Combo Set of ${combo.product_count}`}
              </div>
              <div className="relative flex aspect-square items-center justify-center bg-white p-4 sm:p-5">
                {combo.image ? (
                  <img
                    src={`${BASE_URL}/public/${combo.image}`}
                    alt={combo.title}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="text-sm text-gray-400">No image</div>
                )}
                {combo.rating > 0 && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-0.5 rounded bg-white/90 px-1.5 py-0.5 text-[11px] font-semibold text-[#404042] shadow-sm">
                    {combo.rating.toFixed(1)}
                    <Star className="h-3.5 w-3.5 fill-[#46b486] text-[#46b486]" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 px-1">
              <div className="min-w-0">
                <h3 className="truncate text-[14px] sm:text-[15px] font-semibold leading-tight text-neutral-black">
                  {combo.title}
                </h3>
                <p className="mt-0.5 truncate text-[12px] sm:text-[13px] leading-tight text-gray-500">
                  {combo.subtitle}
                </p>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1.5 px-1">
              {combo.regular_price && (
                <span className="text-[12px] text-[#8f8f8f] line-through">
                  {combo.regular_price}
                </span>
              )}
              <span className="text-[15px] sm:text-[16px] font-bold text-black">
                {combo.combo_price}
              </span>
              {combo.discount > 0 && (
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#10a100]">
                  {combo.discount}% OFF
                </span>
              )}
            </div>

            <Button
              type="button"
              onClick={() => addComboToCart(combo)}
              disabled={loadingId === combo.id}
              className="mt-3 h-9 w-full justify-center rounded-md border border-[#166534] bg-white px-3 py-0 text-[13px] font-semibold uppercase text-[#166534] hover:bg-[#166534] hover:text-white"
            >
              {loadingId === combo.id ? "Adding..." : "Add to Bag"}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
