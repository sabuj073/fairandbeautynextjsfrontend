"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ get current route
import { CategoryIcon, ChatIcon, FooterCart, HomeIcon, UserIcon } from "../Icons/Icons";
import { useEffect, useState } from "react";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { productStore } from "@/lib/hooks/useProductStore";

export default function MobileFooterMenu() {
  const pathname = usePathname(); // current path
  const [isHidden, setIsHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalQuantity } = useCartStoreData();
  const { setOpenCart } = productStore();

  // ✅ hide on product/osufi-collagen-face-serum-300-ml
  if (pathname === "/product/osufi-collagen-face-serum-300-ml") {
    return null;
  }

  useEffect(() => {
    if (pathname.includes("/product")) {
      setIsHidden(true);
    }
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenCart(true);
  };

  const footerItems = [
    { id: "home", label: "", icon: HomeIcon, href: "/" },
    { id: "category", label: "", icon: CategoryIcon, href: "/category" },
    { id: "cart", label: "", icon: FooterCart, href: "#", onClick: handleCartClick },
    {
      id: "chat",
      label: "",
      icon: ChatIcon,
      href: "/products/search?buy1get1=1",
    },
    {
      id: "account",
      label: "",
      icon: UserIcon,
      href: "/login",
    },
  ];

  return (
    !isHidden && (
      <div
      style={{ backgroundColor: "white" }}
      className="fixed bottom-0 left-0 right-0 border-t border-gray-700 shadow-lg block md:hidden py-1 z-50"
    >
      <div className="flex justify-around items-center h-full">
        {footerItems.map((item) => {
          const isCart = item.id === "cart";
          const content = (
            <div className="relative flex flex-col items-center">
              <item.icon />
              {isCart && mounted && totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
              <small className="mt-1 text-xs text-white">{item.label}</small>
            </div>
          );

          if (isCart && item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="no-underline flex flex-col justify-center items-center w-full bg-transparent border-0 cursor-pointer p-0"
                aria-label="Open cart"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className="no-underline flex flex-col justify-center items-center w-full"
              aria-label={item.label}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
    )
  );
}
