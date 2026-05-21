// import Image from "next/image";
// import React from "react";
// import { Product, ColorOption } from "@/types/api";
// import Link from "next/link";
// import { BASE_URL } from "@/app/config/api";
// import SingleAddToCart from "./AddToCartAction/SingleAddToCart";
// import WishAdd from "./WishAdd/WishAdd";
// import { Star } from "lucide-react";
// import CustomImage from "../CustomImage/CustomImage";

// const ProductItem: React.FC<Product> = ({
//   id,
//   discount_text,
//   bestseller,
//   best_seller_text,
//   free_shipping_text,
//   freeshipping,
//   colors = [],
//   choice_options,
//   stocks,
//   name,
//   slug,
//   brand,
//   thumbnail_image,
//   discount,
//   rating,
//   totalRating,
//   stroked_price,
//   main_price,
// }) => {
//   return (
//     <div className="p-1">
//       <div className="relative product_item flex flex-col justify-between bg-white border px-2 py-2 group overflow-hidden rounded-lg w-full h-full sm:min-h-[420px]">
//         {/* Labels container (only renders if at least one exists) */}
//         {(freeshipping > 0 || bestseller > 0) && (
//           <div className="absolute z-10 flex flex-col gap-1">
//             {/* Free Shipping */}
//             {freeshipping > 0 && (
//               <div
//                 className={`flex flex-row gap-1 rounded-sm px-2 py-0.5 items-center bg-neutral-black ${
//                   bestseller > 0 ? "" : ""
//                 }`}
//               >
//                 <p className="text-[10px] font-semibold uppercase text-white">
//                   {free_shipping_text}
//                 </p>
//               </div>
//             )}

//             {/* Best Seller */}
//             {bestseller > 0 && (
//               <div
//                 className="flex flex-row gap-1 rounded-sm px-2 py-0.5 items-center"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(90deg, #efb5df 0%, #9f1fef 50.52%, rgb(180 122 217) 100%)",
//                 }}
//               >
//                 <p className="text-[10px] font-semibold uppercase text-white">
//                   {best_seller_text}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="absolute top-3 right-4 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
//           <WishAdd id={id} />
//         </div>

//         <div className="product_thumb flex flex-col" style={{ flex: "1 1 0%" }}>
//           <Link href={`/product/${slug}`}>
//             <div
//               className="tum_image flex relative items-center justify-center flex-col overflow-hidden w-full
//               min-h-[150px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[240px] xl:min-h-[325px]"
//               style={{ flex: "1 1 0%", width: "100%" }}
//             >
//               <CustomImage
//                 style={{ width: "100%", aspectRatio: "1 / 1" }}
//                 src={thumbnail_image}
//                 width={200}
//                 height={200}
//                 alt={name}
//                 className="object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto"
//               />
//             </div>
//           </Link>

//           <div className="flex pt-2 px-1 flex-col gap-3" style={{ flex: "1 1 0%" }}>
//             <h4 className="text-[12px] sm:text-base text-black font-normal">{brand}</h4>

//             <h3 className="text-[12px] sm:text-base text-neutral-black font-medium line-clamp-2 min-h-[50px]">
//               <Link href={`/product/${slug}`}>{name}</Link>
//             </h3>

//           <div className="min-h-[24px]">
//             {Array.isArray(colors) && colors.length > 0 && (
//               <div className="flex items-center mt-2 ms-[-2px]">
//                 {colors.slice(0, 5).map((color: any, index) => {
//                   const isOutOfStock = color.stock === 0; // adjust key if needed

//                   return (
//                     <Link
//                       key={index}
//                       href={{
//                         pathname: `/product/${slug}`,
//                         query: { color: color.code },
//                       }}
//                       scroll={false}
//                     >
//                       <div className="relative ms-[2px] w-4 h-4">
//                         <div
//                           className="w-4 h-4 rounded-full border border-gray-300"
//                           style={{
//                             backgroundColor: color.code || color.color_code || "#ccc",
//                           }}
//                           title={color.name || "Color"}
//                         />
//                         {isOutOfStock && (
//                           <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white rotate-45" />
//                         )}
//                       </div>
//                     </Link>
//                   );
//                 })}

//                 {colors.length > 5 && (
//                   <div className="w-5 h-5 ms-[2px] text-[15px] font-semibold flex items-center justify-center bg-white text-gray-700">
//                     +{colors.length - 5}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//             <div className="review max-w-max bottom-0 left-0 flex items-center justify-start font-medium rounded-[4px] sm:py-[3px] text-[12px] sm:text-[12px] gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className="w-[14px] h-[14px] text-primary-light_blue fill-primary-light_blue"
//                 />
//               ))}
//               <span className="text-[12px] sm:text-base text-neutral-black font-medium">
//                 ({totalRating})
//               </span>
//             </div>

//             <div className="price flex items-center gap-1 justify-start">
//               <div className="regular_price text-primary text-base font-medium">{main_price}</div>
//               <div className="sale_price text-arival_var text-[12px] sm:text-sm relative line-through font-medium">
//                 {stroked_price}
//               </div>
//               {discount > 0 && (
//                 <div className="offer max-w-max text-primary text-[12px] sm:text-[12px]">
//                   <span>
//                     {discount}
//                     {discount_text}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <SingleAddToCart
//               isShow={true}
//               look={false}
//               id={id}
//               stocks={stocks}
//               choice_options={choice_options}
//               colors={colors}
//               thumbnail_image={thumbnail_image}
//               name={name}
//               stroked_price={stroked_price}
//               main_price={main_price}
//               totalRating={totalRating}
//               brand={brand}
//               discount={discount}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductItem;

"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Product } from "@/types/api";
import Link from "next/link";
import SingleAddToCart from "./AddToCartAction/SingleAddToCart";
import WishAdd from "./WishAdd/WishAdd";
import { Star } from "lucide-react";
import CustomImage from "../CustomImage/CustomImage";

type ProductViewAllProps = {
  productCount: number;
};
const ProductViewAll: React.FC<ProductViewAllProps> = ({ productCount }) => {
  // === Scroll Animation ===
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // run once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`p-1 w-full transition-all duration-700 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div
  style={{ border: "3px solid rgba(9, 93, 0, 0.3)" }}
  className="relative product_item flex flex-col justify-between bg-white border group overflow-hidden rounded-lg w-full md:h-full sm:min-h-[420px]"
>
  <div className="bg-gray min-h-[375px] flex justify-center items-center">
    <span>View all {productCount} products</span>
  </div>
</div>
    </div>
  );
};

export default ProductViewAll;
