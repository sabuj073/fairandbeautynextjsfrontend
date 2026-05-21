"use client";
import { Button } from "@/app/ui/button";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import { ProductDetails } from "@/types/api";
import { Loader2, MinusIcon, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { getCart } from "@/lib/cartApi";
import { productStore } from "@/lib/hooks/useProductStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FooterMenuProduct from "../../Footer/FooterMenuProduct";

interface AddToCartActionProps {
  id: number;
  sizeChart?: string;
  product: ProductDetails;
}

export default function AddToCartAction({ id, sizeChart, product }: AddToCartActionProps) {
  const [isSizeModal, setIsSizeModal] = useState(false);
  const { combinationName } = productStore();
  const { translateValue } = cookieStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const [temp_user, setTemp_user] = useState<any>(null);
  const cookieValue = cookieStore((state) => state.cookieValue);
  const {
    setCartData,
    setTempUserId,
    temp_user_id,
    cartData,
    totalQuantity,
  } = useCartStoreData((state) => ({
    setCartData: state.setCartData,
    setTempUserId: state.setTempUserId,
    cartData: state.cartData,
    totalQuantity: state.totalQuantity,
    temp_user_id: state.temp_user_id,
  }));

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  const addToCartHandler = async () => {
    setLoading(true);
    const isLoggedIn = !!cookieValue?.user?.id;
    let team_id = null;

    if (!isLoggedIn && !temp_user_id) {
      team_id = setTempUserId();
      setTemp_user(team_id);
    }

    const userId = isLoggedIn ? cookieValue?.user?.id : team_id || temp_user_id;

    try {
      const cartDataPost: any = {
        id,
        quantity: qty,
        user_id: isLoggedIn ? cookieValue?.user?.id : null,
        temp_user_id: userId || null,
      };
      if (combinationName) {
        cartDataPost.variant = combinationName;
      }

      const response = await axios.post("/api/cart/add", cartDataPost);
      const data = response.data;

      const cartData: any = await getCart(userId);
      setCartData(cartData.data, cartData.totalQuantity);

      if (data.result) {
        toast.success(data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#A020F0", secondary: "#fff" },
        });

        // ✅ GTM add_to_cart push
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "add_to_cart",
            ecommerce: {
              currency: "BDT", // Set dynamically if needed
              value: Number(product.main_price) * qty,
              items: [
                {
                  item_id: product.id,
                  item_name: product.name,
                  affiliation: product.brand?.name || "",
                  item_brand: product.brand?.name || "",
                  quantity: qty,
                  item_variant: combinationName || "",
                },
              ],
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="action_area flex items-center justify-between gap-3">
      <div className="flex justify-between flex-row w-full">
        <div className="w-full flex items-center md:max-w-max gap-3">
          {/* <span className="text-base text-neutral-black">Quantity :</span> */}
          <div className="qty_input_area flex items-center w-1/2 md:max-w-max flex-1">
            <Button
              onClick={decreaseQty}
              className="w-[22px] h-[22px] !rounded-l-[5px] !bg-[#e9e7e7] !rounded-[0px] !p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
            >
              <MinusIcon className="!text-black transition-all duration-300 ease-in-out" />
            </Button>
            <input
              onChange={(e) => setQty(Number(e.target.value))}
              value={qty}
              type="text"
              min={1}
              className="w-[40px] h-[40px] text-center text-black"
            />
            <Button
              onClick={increaseQty}
              className="w-[22px] h-[22px] !rounded-r-[5px] !bg-[#e9e7e7] !rounded-[0px] !p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
            >
              <PlusIcon className="!text-black transition-all duration-300 ease-in-out" />
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-end gap-4">
          <div className="mobile_cart">
            <FooterMenuProduct addToCart={addToCartHandler} />
          </div>
          {/* {sizeChart && (
            <div className="flex justify-between items-center">
              <div
                onClick={() => setIsSizeModal(true)}
                className="cursor-pointer size_chart border-[1px] border-primary px-[6px] lg:px-[10px] py-[6px] text-center text-sm lg:text-lg rounded-[30px]"
              >
                {translateValue?.size_chart}
              </div>
            </div>
          )} */}
        </div>
      </div>

      {isSizeModal && (
        <Dialog open={isSizeModal} onOpenChange={setIsSizeModal}>
          <DialogContent className="bottom-0 left-0 bg-transparent flex items-center justify-center">
            <div className="bg-white relative">
              <div
                onClick={() => setIsSizeModal(false)}
                className="cursor-pointer absolute top-0 right-0"
              >
                <X className="text-black" />
              </div>
              <div className="bg-white pt-8 p-4 text-center rounded-lg overflow-x-auto max-w-[100vw] md:w-full">
                <div
                  className="text-sm md:text-base text-neutral-black"
                  dangerouslySetInnerHTML={{
                    __html: sizeChart || "",
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
