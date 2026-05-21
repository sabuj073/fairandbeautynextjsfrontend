"use client";
import React, { useEffect, useState } from "react";
import { CartIcon, LoveIcon, ProfileIcon } from "../Icons/Icons";
import SideCart from "../SideCart/SideCart";
import Link from "next/link";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { productStore } from "@/lib/hooks/useProductStore";
import { routes } from "@/lib/routes";

export default function AccountNav() {
  const { translateValue } = cookieStore();
  const cookieValue = cookieStore((state) => state.cookieValue);
  const { totalQuantity, wishlist } = useCartStoreData();
  const [mounted, setMounted] = useState(false);
  const { openCart, setOpenCart } = productStore();

  const my_account = translateValue?.my_account;
  const cart = translateValue?.cart;
  const login = translateValue?.login;
  const favorite = translateValue?.favorite;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {cookieValue?.user ? (
        <div className="flex items-center gap-1 text-base capitalize">
          <Link
            className="flex items-center gap-1 text-base capitalize"
            href={routes.user_dashboard}
          >
            <ProfileIcon /> <span>{my_account}</span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-base capitalize">
          <Link
            className="flex items-center gap-1 text-base capitalize"
            href="/login"
          >
            <ProfileIcon /> <span>{login}</span>
          </Link>
        </div>
      )}
      <div className="flex items-center gap-1 text-base capitalize shoppingCart relative">
        <Link
          className="flex items-center gap-1 text-base capitalize"
          href="/wishlist"
        >
          <LoveIcon /> <span className="pl-2 inline-block"> {favorite}</span>
        </Link>
        <span className="mini_cart__qty">
          {(mounted && wishlist.length) || 0}
        </span>
      </div>

      <div className="flex items-center gap-1 text-base capitalize shoppingCart relative">
        <Dialog open={openCart} onOpenChange={setOpenCart}>
          <div
            className="flex items-center gap-1 text-base capitalize cursor-pointer "
            onClick={() => setOpenCart(!openCart)}
          >
            <CartIcon />
          </div>
          <span className="mini_cart__qty">
            {(mounted && totalQuantity) || 0}
          </span>
          <DialogContent className="border-0 w-full max-w-[500px] flex grow flex-col repeat-1 duration-300 animate-in bottom-0 top-0 right-0 slide-in-from-right fixed">
            <SideCart />
          </DialogContent>
        </Dialog>
      </div>

      {/* <div className="flex items-center gap-1 text-base capitalize shoppingCart relative">
        <Link
          className="flex items-center gap-1 text-base capitalize"
          href="/track-order"
        >
          <span>track order</span>
        </Link>
      </div> */}
    </>
  );
}
