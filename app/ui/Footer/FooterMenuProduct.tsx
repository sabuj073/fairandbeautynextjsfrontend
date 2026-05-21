"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CategoryIcon, ChatIcon, FooterCart, HomeIcon, UserIcon } from "../Icons/Icons";
import { routes } from "@/lib/routes";

export default function FooterMenuProduct({addToCart}: {addToCart: () => void}) {
  const router = useRouter();
  
  const footerItems = [
    { id: "home", label: "", icon: HomeIcon, href: "/" },
    {
      id: "chat",
      label: "",
      icon: ChatIcon,
      href: "/products/search?buy1get1=1",
    },
  ];

  const handleBuyNow = () => {
    addToCart();
    router.push('/checkout');
  }

  return (
    <div style={{backgroundColor: "white"}} className="fixed bottom-0 left-0 right-0 border-t border-gray-700 shadow-lg block md:hidden py-1">
      <div className="flex justify-around items-center h-full">
        {footerItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="no-underline flex flex-col justify-center items-center w-full"
            aria-label={item.label}
          >
            <div className="relative flex flex-col items-center">
              <item.icon />

              {/* Cart badge placeholder - will be functional later */}
              {item.id === "cart" && (
                <span
                  className="absolute top-0 left-full -translate-y-1/2 translate-x-1/2 badge rounded-full bg-danger text-xs px-1"
                >
                  {/* Cart count will go here */}
                </span>
              )}
              <small className="mt-1 text-xs text-white">
                {item.label}
              </small>
            </div>
          </Link>
        ))}
        <button 
          className="flex flex-col justify-center text-sm font-bold items-center min-w-12 rounded-lg" 
          onClick={handleBuyNow} 
          style={{backgroundColor: "#FF3B30", color: "white"}}
        >
          <span>Buy Now</span> 
          <span>৳1350</span>
        </button>
        <button 
          onClick={addToCart} 
          className="ms-4 text-sm font-bold min-w-14 rounded-lg" 
          style={{background: "linear-gradient(180deg, #139804 0%, #063B00 100%)", color: "white"}}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}