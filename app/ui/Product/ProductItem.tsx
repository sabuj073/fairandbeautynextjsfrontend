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
import CustomImage from "../CustomImage/CustomImage";
import RatingPill from "./RatingPill";

const ProductItem: React.FC<Product & { compact?: boolean }> = ({
  id,
  discount_text,
  bestseller,
  best_seller_text,
  free_shipping_text,
  freeshipping,
  best_seller,
  flash_sell,
  trending,
  hot,
  new_product,
  pre_order,
  free_shipping,
  top_rated,
  top_rated_label,
  top_rated_bg_color,
  top_rated_text_color,
  items_added_to_cart,
  items_sold,
  deal_claimed_percentage,
  items_added_to_cart_text,
  items_sold_text,
  template,
  colors = [],
  choice_options,
  stocks,
  name,
  slug,
  brand,
  thumbnail_image,
  discount,
  rating,
  totalRating,
  stroked_price,
  main_price,
  compact = false,
}) => {
  const numericSeed =
    Number(id) ||
    String(slug || name || "")
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  // Calculate if any tags should be shown
  const hasAnyTags = (best_seller ?? 0) > 0 || (free_shipping ?? 0) > 0 || (flash_sell ?? 0) > 0 || (hot ?? 0) > 0 || (new_product ?? 0) > 0 || (freeshipping ?? 0) > 0 || (bestseller ?? 0) > 0;
  
  // Count active tags for positioning
  let tagCount = 0;
  if ((freeshipping ?? 0) > 0 || (free_shipping ?? 0) > 0) tagCount++;
  if ((bestseller ?? 0) > 0 || (best_seller ?? 0) > 0) tagCount++;
  if ((flash_sell ?? 0) > 0) tagCount++;
  if ((new_product ?? 0) > 0) tagCount++;
  
  let rightTagCount = 0;
  if ((trending ?? 0) > 0) rightTagCount++;
  if ((pre_order ?? 0) > 0) rightTagCount++;
  const claimedPercent = Number(deal_claimed_percentage) > 0
    ? Math.min(Number(deal_claimed_percentage), 100)
    : 50 + (numericSeed % 36);
  const firstVariant = Array.isArray(choice_options) &&
    choice_options.length > 0 &&
    choice_options[0] &&
    Array.isArray(choice_options[0].options) &&
    choice_options[0].options.length > 0
      ? choice_options[0]
      : null;
  const fallbackAddedToCart = 100 + (numericSeed % 701);
  const fallbackSold = 10 + (numericSeed % 191);
  const fallbackVariants = ["75 gm", "100 ml", "50 ml", "Kit 4pcs"];
  const variantName = firstVariant?.options?.[0] || fallbackVariants[numericSeed % fallbackVariants.length];
  const variantExtra = firstVariant
    ? Math.max(firstVariant.options.length - 1, 0)
    : numericSeed % 3;
  const addedToCartLabel = `${(items_added_to_cart ?? 0) > 0 ? items_added_to_cart : fallbackAddedToCart}+ ${
    items_added_to_cart_text || "Items added to cart"
  }`;
  const soldLabel = `${(items_sold ?? 0) > 0 ? items_sold : fallbackSold} ${items_sold_text || "Sold"}`;
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
      className={`p-0.5 w-full transition-all duration-700 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div
        style={{ border: compact ? "1px solid rgba(9, 93, 0, 0.18)" : "3px solid rgba(9, 93, 0, 0.3)" }}
        className={`relative product_item flex flex-col justify-between bg-white border group overflow-hidden rounded-lg w-full md:h-full ${compact ? "min-h-full" : "sm:min-h-[420px]"}`}
      >
        {/* Labels - Left Side */}
        {hasAnyTags && (
          <div className="absolute z-10 flex flex-col gap-1">
            {((freeshipping ?? 0) > 0 || (free_shipping ?? 0) > 0) && (
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #063B00 0%, #10A100 100%)",
                }}
                className="flex flex-row gap-1 rounded-r-sm px-2 py-0.5 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  width="16"
                  height="16"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="white"
                  viewBox="0 0 512 289.28"
                >
                  <path d="M429.38 196.01c-25.83 0-46.64 20.95-46.64 46.63 0 25.83 20.95 46.64 46.64 46.64 25.83 0 46.63-20.95 46.63-46.64 0-25.82-20.95-46.63-46.63-46.63zm-382.92-26.2v-37.57h15.66c6.3 0 10.63 1.44 12.98 4.33 2.35 2.88 3.53 7.7 3.53 14.46 0 6.75-1.18 11.57-3.53 14.45-2.35 2.89-6.68 4.33-12.98 4.33H46.46zm15.83-27.95h-4.64v18.33h4.64c1.53 0 2.64-.19 3.33-.57.69-.38 1.04-1.25 1.04-2.61v-11.97c0-1.36-.35-2.23-1.04-2.61-.69-.38-1.8-.57-3.33-.57zm43.47 13.76H94.57v4.57h13.7v9.62H83.38v-37.57h24.61l-1.4 9.62H94.57v5.05h11.19v8.71zm30.48 14.19h-22.37v-37.57h11.18v27.95h11.19v9.62zm3.92 0v-37.57h11.18v37.57h-11.18zm36.69-37.57h11.8l-8.67 37.57h-16.33l-8.67-37.57h11.8l4.76 23.86h.5l4.81-23.86zm37.82 23.38h-11.19v4.57h13.7v9.62h-24.89v-37.57h24.61l-1.4 9.62h-12.02v5.05h11.19v8.71zm38.59 14.19h-12.31l-4.58-11.18h-2.41v11.18h-11.18v-37.57h17.62c8.01 0 12.02 4.39 12.02 13.17 0 6.01-1.73 9.97-5.2 11.9l6.04 12.5zm-19.3-27.95v7.51h2.58c1.34 0 2.32-.15 2.93-.45.62-.3.93-.99.93-2.07v-2.47c0-1.08-.31-1.77-.93-2.07-.61-.3-1.59-.45-2.93-.45h-2.58zm33.62-9.62l3.08 13.23h.39l3.13-13.23h12.37l-10.08 27.35v10.22h-11.18v-10.22l-10.07-27.35h12.36zM101.82 88.72H85.16v22.73h-19.6V50.2h40.18l-2.45 15.68H85.16v8.23h16.66v14.61zm63.21 22.73h-21.56l-8.04-18.23h-4.21v18.23h-19.6V50.2h30.87c14.04 0 21.07 7.16 21.07 21.46 0 9.8-3.04 16.27-9.12 19.41l10.59 20.38zm-33.81-45.57v12.25h4.5c2.36 0 4.07-.24 5.15-.73s1.62-1.62 1.62-3.38V70c0-1.77-.54-2.9-1.62-3.38-1.08-.49-2.79-.74-5.15-.74h-4.5zm79.87 22.44h-19.6v7.45h24.01v15.68h-43.61V50.2h43.12l-2.45 15.68h-21.07v8.23h19.6v14.21zm51.94 0h-19.6v7.45h24.01v15.68h-43.61V50.2h43.12l-2.45 15.68h-21.07v8.23h19.6v14.21zm136.5-15.43l-70.02-.42v-42.7c0-8.97-.6-15.44-7.46-22.31C317.46 2.87 311.14 0 304.11 0H25.25C18.22 0 11.91 2.87 7.32 7.46-.19 14.97 0 21.18 0 30.15v198.72c0 6.89 2.87 13.49 7.46 18.22 4.59 4.74 10.91 7.75 17.94 7.75h94.26c3.88 0 6.89-3.16 6.89-6.89 0-3.87-3.16-6.88-6.89-6.88l-94.26.14c-3.16 0-5.88-1.44-8.04-3.59-2.15-2.29-3.58-5.45-3.58-8.75V23.58c.39-2.47 1.56-4.74 3.3-6.36 2.15-2.15 5.02-3.44 8.17-3.44h278.86c3.16 0 6.03 1.29 8.18 3.44 4.05 4.06 3.44 8.14 3.44 13.28v210.57h-54.3c-3.87 0-6.89 3.01-6.89 6.88 0 3.73 3.02 6.89 6.89 6.89h61.19c3.87 0 6.89-3.01 6.89-6.89v-7.89h41.61c3.16-71.74 106.04-81.64 116.51 0h22.68c2.99-15.9 1.87-34.53-2.27-54.98-4.84-23.9-3.42-19.26-25.73-27.81l-45.51-20.38-37.27-64zm-17.94 19.66l-34.72-.43v44.77h58.26l-23.54-44.34zm-191.9 103.46c-25.83 0-46.64 20.95-46.64 46.63 0 25.83 20.95 46.64 46.64 46.64 25.83 0 46.63-20.95 46.63-46.64 0-25.82-20.95-46.63-46.63-46.63zm0 28.7c-9.9 0-17.94 8.03-17.94 17.93 0 9.91 8.04 17.94 17.94 17.94 9.9 0 17.93-8.03 17.93-17.94 0-9.9-8.03-17.93-17.93-17.93zm239.69 0c-9.9 0-17.94 8.03-17.94 17.93 0 9.91 8.04 17.94 17.94 17.94 9.9 0 17.93-8.03 17.93-17.94 0-9.9-8.03-17.93-17.93-17.93z" />
                </svg>
                <p className="sm:text-[10px] text-[7px] font-semibold uppercase text-white">
                  {free_shipping_text}
                </p>
              </div>
            )}

            {((bestseller ?? 0) > 0 || (best_seller ?? 0) > 0) && (
              <div
                className="flex flex-row gap-1 rounded-r-sm px-2 py-0.5 items-center"
                style={{
                  background:
                    "linear-gradient(90deg, #FD1B57 0%, #BA133F 100%)",
                }}
              >
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="16"
                  height="16"
                  viewBox="0 0 92.35 122.88"
                >
                  <defs>
                    <style></style>
                  </defs>
                  <title>best-quality</title>
                  <path
                    className="cls-1"
                    d="M3.39,113.07,15,111l5.73,10.25c4.15,5.15,6.79-3.31,8-6.26L39.78,94c-2.57-.89-5.66-3.47-8.85-6.35-6.35.13-12.26-1-16.62-6.52L1.5,105.85.38,108.23c-.87,3.08-.41,5.12,3,4.84ZM46.77,27l3.79,8.88,9.62.86a.78.78,0,0,1,.7.83.81.81,0,0,1-.26.52h0l-7.27,6.35,2.15,9.41a.78.78,0,0,1-1.18.82L46.06,49.7l-8.29,4.95a.77.77,0,0,1-1.05-.26.73.73,0,0,1-.09-.57h0l2.15-9.41-7.27-6.35A.77.77,0,0,1,31.43,37a.79.79,0,0,1,.54-.26l9.59-.86L45.35,27a.77.77,0,0,1,1-.41.72.72,0,0,1,.41.41ZM46.18,0a9.26,9.26,0,0,1,5.61,1.76C54,3.16,56.45,5.91,59.5,7.65c4.28,2.45,12.22-.93,16.29,5.11,2.37,3.52,2.48,6.28,2.66,9a15.84,15.84,0,0,0,3.72,9.64c5,6.59,6,11,3.45,15.56-1.75,3.11-5.44,4.85-6.29,6.82-1.82,4.2.19,7.37-2.3,12.27a13.05,13.05,0,0,1-7.93,6.78c-3,1-6-.43-8.39.58C56.5,75.19,53.39,79.3,50,80.34a13,13,0,0,1-7.73,0c-3.35-1-6.46-5.15-10.66-6.92-2.4-1-5.4.39-8.39-.58a13,13,0,0,1-7.94-6.78C12.83,61.16,14.84,58,13,53.79c-.86-2-4.55-3.71-6.3-6.82-2.57-4.58-1.53-9,3.46-15.56,3-4,3.53-6.7,3.72-9.64.17-2.73.28-5.49,2.65-9,4.07-6,12-2.66,16.3-5.11,3-1.74,5.51-4.49,7.71-5.88A9.24,9.24,0,0,1,46.18,0Zm-.12,16.93A24.15,24.15,0,1,1,21.91,41.09,24.15,24.15,0,0,1,46.06,16.94ZM89,113.07,77.41,111l-5.73,10.25c-4.16,5.15-6.8-3.31-8-6.26L52.57,94c2.57-.89,5.67-3.47,8.85-6.35,6.35.13,12.27-1,16.62-6.52l12.82,24.76L92,108.23c.87,3.08.41,5.12-3,4.84Z"
                  />
                </svg>
                <p className="sm:text-[10px] text-[7px] font-semibold uppercase text-white">
                  {best_seller_text || 'BESTSELLER'}
                </p>
              </div>
            )}

            {(flash_sell ?? 0) > 0 && (
              <div
                className="flex flex-row gap-1 rounded-r-sm px-2 py-0.5 items-center"
                style={{
                  background:
                    "linear-gradient(90deg, #10A100 0%, #106F3B 100%)",
                }}
              >
                  <svg
                    viewBox="0 0 69.38 122.88"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    height="16"
                    width="16"
                  >
                    <style>
                      {`
          .st0 { fill: #383838; }
          .st1 { fill-rule:evenodd; clip-rule:evenodd; fill:#FCDB33; }
          .st2 { fill-rule:evenodd; clip-rule:evenodd; fill:#FFFF00; }
        `}
                    </style>
                    <g>
                      <path
                        className="st0"
                        d="M21.34,0.41L65.26,0c0.81-0.04,1.64,0.18,2.37,0.66c1.81,1.21,2.3,3.67,1.08,5.48L45.77,40.38h19.45v0.01
             c0.88,0,1.77,0.29,2.51,0.9c1.68,1.39,1.93,3.87,0.54,5.56L7,121.44c-1.06,1.29-2.87,1.81-4.51,1.16c-2.03-0.8-3.02-3.1-2.21-5.13
             L21.32,64.5L5.55,64.35c-0.45,0.03-0.9-0.01-1.36-0.14c-2.1-0.6-3.32-2.79-2.72-4.89l16.1-56.04l0.01,0
             C18.04,1.64,19.54,0.43,21.34,0.41L21.34,0.41z"
                      />
                      <polygon
                        className="st1"
                        points="65.43,3.95 21.37,4.36 5.27,60.4 27.11,60.61 3.95,118.93 65.22,44.34 38.35,44.34 65.43,3.95"
                      />
                      <polygon
                        className="st2"
                        points="33.9,4.52 21.66,4.75 6.23,60.09 27.24,60.57 3.95,118.93 35.21,55.03 16.58,51.85 33.9,4.52"
                      />
                    </g>
                  </svg>
                  <p className="sm:text-[10px] text-[7px] font-semibold uppercase text-white">
                    FLASH SELL
                  </p>
              </div>
            )}
            
            {(new_product ?? 0) > 0 && (
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #2DFF15 0%, #10A100 100%)",
                }}
                className="flex flex-row gap-1 rounded-r-sm px-2 py-0.5 items-center "
              >
                  <svg width="16" height="16" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.71134 13.5568C8.64023 13.5591 8.56979 13.5602 8.50001 13.5602C7.78468 13.5602 6.91734 13.1468 6.22001 12.3882C5.45458 11.5553 5.03091 10.4647 5.03334 9.3335C5.03334 8.38816 5.37868 7.6235 5.83401 7.06283C5.87201 8.72016 7.40668 10.8002 10.5 10.8002C11.6187 10.8002 12.3113 10.4988 12.6867 10.3355C12.8253 10.2755 12.92 10.2335 12.9773 10.2335C13.1 10.2335 13.1667 10.3002 13.1667 10.4335C13.1667 10.5582 13.0993 10.6475 12.8827 10.9348L12.834 11.0002C11.8296 12.3399 10.3579 13.2526 8.71134 13.5568ZM6.63468 13.6108C3.36134 13.1868 0.833344 10.3895 0.833344 7.00016C0.833344 6.14683 1.32668 5.4475 2.09801 4.94683C2.87201 4.44283 3.89134 4.16683 4.83334 4.16683C6.35068 4.16683 7.25668 4.67683 7.78534 5.26483C7.81868 5.30216 7.85068 5.33972 7.88134 5.3775C7.75635 5.34819 7.62839 5.33343 7.50001 5.3335H7.49734C7.21761 5.33394 6.9425 5.40478 6.69734 5.5395C6.64422 5.56411 6.59176 5.59012 6.54001 5.6175C6.16505 5.82166 5.82519 6.08455 5.53334 6.39616C4.77984 7.18795 4.36178 8.24049 4.36668 9.3335C4.36668 10.7582 4.93668 11.9768 5.72934 12.8388C6.00534 13.1388 6.31201 13.3988 6.63468 13.6108ZM8.73468 8.06483C8.91201 7.87816 9.16668 7.60883 9.16668 7.00083C9.16668 6.4275 8.94134 5.5535 8.28134 4.8195C7.61001 4.0735 6.51601 3.50016 4.83334 3.50016C3.77534 3.50016 2.62801 3.80683 1.73534 4.38683C1.54779 4.50861 1.37223 4.64305 1.20868 4.79016C1.66652 3.48714 2.51775 2.35847 3.64475 1.56012C4.77176 0.761776 6.11889 0.333158 7.50001 0.333496C11.182 0.333496 14.1667 3.00016 14.1667 6.00016C14.1667 7.86683 12.7 9.2335 10.8333 9.2335C9.50001 9.2335 8.56668 8.80016 8.56668 8.3335C8.56668 8.24016 8.64001 8.16416 8.73468 8.06416" fill="white"/>
</svg>
                  <p className="sm:text-[10px] text-[7px] font-semibold uppercase text-white">
                    NEW
                  </p>
              </div>
            )}
          </div>
        )}

        {/* Labels - Right Side */}
        {((trending ?? 0) > 0 || (pre_order ?? 0) > 0) && (
          <div className="absolute w-[130px] z-10 flex right-0 flex-col gap-1">
            {(trending ?? 0) > 0 && (
              <div className="absolute right-0 z-10 flex flex-col gap-1 top-[0px]">
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #FD1B57 0%, #BA133F 100%)",
                  }}
                  className="flex flex-row gap-1 rounded-l-sm px-2 py-0.5 items-center "
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33329 4L3.80663 5.52667L7.05996 8.78L9.72663 6.11333L14.6666 11.06L13.7266 12L9.72663 8L7.05996 10.6667L2.85996 6.47333L1.33329 8V4H5.33329Z" fill="white"/>
</svg>
                  <p className="sm:text-[10px] text-[7px] font-semibold uppercase text-white">
                    Trending Now
                  </p>
                </div>
              </div>
            )}
            
            {(pre_order ?? 0) > 0 && (
              <div className={`absolute z-10 flex right-0 flex-col gap-1 ${(trending ?? 0) > 0 ? "top-[22px]" : "top-[0px]"}`}>
                <div
                  style={{
                    background:
                      "black",
                  }}
                  className="flex flex-row gap-1 rounded-l-sm px-2 py-0.5 items-center "
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3334 2.22676C12.3389 2.80733 13.1753 3.64044 13.7599 4.64362C14.3445 5.64681 14.6569 6.78527 14.6663 7.94632C14.6757 9.10736 14.3817 10.2507 13.8134 11.2632C13.2451 12.2757 12.4222 13.1222 11.4262 13.719C10.4302 14.3157 9.29562 14.642 8.13477 14.6655C6.97393 14.689 5.82707 14.4089 4.80774 13.8529C3.78841 13.297 2.93195 12.4844 2.32315 11.4958C1.71435 10.5071 1.37431 9.37656 1.33671 8.21609L1.33337 8.00009L1.33671 7.78409C1.37404 6.63275 1.70907 5.51073 2.30913 4.52742C2.90919 3.54411 3.75381 2.73306 4.76064 2.17335C5.76746 1.61363 6.90214 1.32436 8.05404 1.33372C9.20595 1.34308 10.3358 1.65076 11.3334 2.22676ZM8.00004 4.00009C7.83675 4.00011 7.67915 4.06006 7.55713 4.16857C7.4351 4.27707 7.35715 4.42659 7.33804 4.58876L7.33337 4.66676V8.00009L7.33937 8.08742C7.35457 8.20309 7.39986 8.31274 7.47071 8.40542L7.52871 8.47209L9.52871 10.4721L9.59137 10.5268C9.70829 10.6175 9.85206 10.6667 10 10.6667C10.148 10.6667 10.2918 10.6175 10.4087 10.5268L10.4714 10.4714L10.5267 10.4088C10.6174 10.2918 10.6667 10.1481 10.6667 10.0001C10.6667 9.85211 10.6174 9.70834 10.5267 9.59142L10.4714 9.52876L8.66671 7.72342V4.66676L8.66204 4.58876C8.64294 4.42659 8.56498 4.27707 8.44296 4.16857C8.32093 4.06006 8.16333 4.00011 8.00004 4.00009Z" fill="white"/>
</svg>
                  <p className="sm:text-[10px] text-[7px] font-semibold uppercase text-white">
                    Pre-Order
                  </p>
                </div>
              </div>
            )}
            
          </div>
        )}

        {/* Wishlist */}
        {/* <div className="absolute top-3 right-4 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
          <WishAdd id={id} />
        </div> */}

        <div
          className="product_thumb w-full flex flex-col justify-between"
          style={{ flex: "1 1 0%" }}
        >
          {/* Product Image */}
          <div>
            <Link href={`/product/${slug}`}>
              <div
                className={`tum_image flex relative items-center justify-center flex-col overflow-hidden w-full ${compact ? "h-[128px] bg-white pt-1" : ""}`}
                style={{ flex: "1 1 0%", width: "100%", minHeight: compact ? undefined : undefined }}
              >
                <CustomImage
                  style={compact ? { width: "100%", height: "100%" } : { width: "100%", aspectRatio: "1 / 1" }}
                  src={thumbnail_image}
                  width={200}
                  height={200}
                  alt={name}
                  className={`object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto ${compact ? "h-full max-h-[122px] p-1.5" : ""}`}
                />
              </div>
            </Link>
            {/* Rating */}
            <div className="relative">
              <RatingPill
                className="absolute bottom-[100%] left-0 z-10"
                compact={compact}
                rating={rating}
                reviewCount={totalRating}
                showLabel={(top_rated ?? 0) > 0}
                label={top_rated_label || "Top Rated"}
                labelBgColor={top_rated_bg_color}
                labelTextColor={top_rated_text_color}
              />
            </div>
            {/* Hot Tag - Only show if hot flag is enabled, positioned at bottom right of image */}
            {(hot ?? 0) > 0 && (
              <div className="relative">
                <div className="absolute bottom-[100%] review max-w-max right-0 flex items-center justify-between font-medium text-[12px] gap-1 z-10">
                  <svg
                    width="60"
                    height="33"
                    viewBox="7 9 53 12"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_54745_246_hot)">
                      <path
                        d="M7 11C7 8.79086 8.79086 7 11 7H60V29H11C8.79086 29 7 27.2091 7 25V11Z"
                        fill="url(#paint0_linear_54745_246_hot)"
                        shapeRendering="crispEdges"
                      />
                      <g clipPath="url(#clip0_54745_246_hot)">
                        <path
                          d="M19.1644 7.98694C20.7807 8.06176 23.2707 8.52084 24.3334 11.2711C24.8054 12.4931 24.8444 13.7637 24.6146 15.0758V15.0768C24.5451 15.4765 24.3646 16.2205 24.3646 16.8717C24.3647 17.2008 24.4086 17.5461 24.5599 17.8346C24.7195 18.1388 24.9895 18.3623 25.3861 18.4391C25.9237 18.5434 26.341 18.3708 26.641 18.0914C26.9256 17.8263 27.0972 17.473 27.1986 17.1989C28.5769 18.824 28.7035 20.7424 28.4095 22.4332C27.8504 25.6455 24.6777 28.0103 21.517 28.0104C19.5217 28.0104 17.7445 27.4229 16.3666 26.316C15.0756 25.2789 14.1194 23.7737 13.6654 21.8326L13.5814 21.4391C13.2521 19.731 13.4234 16.3524 15.9613 13.9723V13.9733C15.9132 14.5029 15.8716 15.244 15.9193 15.9576C15.9659 16.6539 16.1011 17.3939 16.4584 17.8639L17.1517 18.776L16.9935 17.6412H16.9945C16.9943 17.6395 16.993 17.6358 16.9926 17.6305C16.9915 17.6195 16.9908 17.6011 16.9896 17.5758C16.9873 17.525 16.9857 17.4457 16.9916 17.3414C17.0034 17.1327 17.0441 16.8225 17.1595 16.4332C17.3901 15.6561 17.9246 14.5539 19.1537 13.3131C20.1812 12.276 20.4767 10.8797 20.1869 9.75745L20.1205 9.53674L20.0306 9.29944C19.8349 8.83695 19.5554 8.44647 19.2943 8.14612L19.1654 8.00354C19.1634 8.00125 19.1627 7.99907 19.1625 7.99866V7.99768C19.1622 7.99587 19.1627 7.99199 19.1644 7.98792V7.98694Z"
                          stroke="#FEF625"
                          strokeWidth="0.6"
                        />
                        <path
                          d="M23.0184 20.3065C21.5034 18.2956 22.1817 16.001 22.5534 15.0867C22.6034 14.9663 22.47 14.8529 22.365 14.9268C21.7134 15.384 20.3784 16.4599 19.7567 17.9742C18.915 20.0212 18.975 21.0232 19.4734 22.247C19.7734 22.9843 19.425 23.1407 19.25 23.1682C19.08 23.1957 18.9234 23.0788 18.7984 22.9568C18.4388 22.6007 18.1826 22.1484 18.0584 21.6506C18.0317 21.544 17.8967 21.5148 17.835 21.6024C17.3684 22.2676 17.1267 23.3349 17.115 24.0895C17.0784 26.4218 18.9467 28.3124 21.2067 28.3124C24.055 28.3124 26.13 25.064 24.4934 22.3484C24.0184 21.5578 23.5717 21.0404 23.0184 20.3065Z"
                          fill="url(#paint1_radial_54745_246_hot)"
                        />
                      </g>
                      <path
                        d="M40.8 15.4V21H39.504V18.704H36.96V21H35.664V15.4H36.96V17.608H39.504V15.4H40.8ZM44.8369 21.096C44.2556 21.096 43.7303 20.9707 43.2609 20.72C42.7969 20.4693 42.4316 20.1253 42.1649 19.688C41.9036 19.2453 41.7729 18.7493 41.7729 18.2C41.7729 17.6507 41.9036 17.1573 42.1649 16.72C42.4316 16.2773 42.7969 15.9307 43.2609 15.68C43.7303 15.4293 44.2556 15.304 44.8369 15.304C45.4183 15.304 45.9409 15.4293 46.4049 15.68C46.8689 15.9307 47.2343 16.2773 47.5009 16.72C47.7676 17.1573 47.9009 17.6507 47.9009 18.2C47.9009 18.7493 47.7676 19.2453 47.5009 19.688C47.2343 20.1253 46.8689 20.4693 46.4049 20.72C45.9409 20.9707 45.4183 21.096 44.8369 21.096ZM44.8369 19.992C45.1676 19.992 45.4663 19.9173 45.7329 19.768C45.9996 19.6133 46.2076 19.4 46.3569 19.128C46.5116 18.856 46.5889 18.5467 46.5889 18.2C46.5889 17.8533 46.5116 17.544 46.3569 17.272C46.2076 17 45.9996 16.7893 45.7329 16.64C45.4663 16.4853 45.1676 16.408 44.8369 16.408C44.5063 16.408 44.2076 16.4853 43.9409 16.64C43.6743 16.7893 43.4636 17 43.3089 17.272C43.1596 17.544 43.0849 17.8533 43.0849 18.2C43.0849 18.5467 43.1596 18.856 43.3089 19.128C43.4636 19.4 43.6743 19.6133 43.9409 19.768C44.2076 19.9173 44.5063 19.992 44.8369 19.992ZM49.9568 16.456H48.1648V15.4H53.0448V16.456H51.2528V21H49.9568V16.456Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_54745_246_hot"
                        x="0.9"
                        y="0.9"
                        width="73.2"
                        height="42.2"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="4" dy="4" />
                        <feGaussianBlur stdDeviation="5.05" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54745_246_hot"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54745_246_hot"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_54745_246_hot"
                        x1="7"
                        y1="18"
                        x2="60"
                        y2="18"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.395" stopColor="#FA0001" />
                        <stop offset="1" stopColor="#BF1F13" />
                      </linearGradient>
                      <radialGradient
                        id="paint1_radial_54745_246_hot"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(21.3634 16.2912) rotate(90.5612) scale(12.694 9.26378)"
                      >
                        <stop offset="0.214" stopColor="#FFF176" />
                        <stop offset="0.328" stopColor="#FFF27D" />
                        <stop offset="0.487" stopColor="#FFF48F" />
                        <stop offset="0.672" stopColor="#FFF7AD" />
                        <stop offset="0.793" stopColor="#FFF9C4" />
                        <stop offset="0.822" stopColor="#FFF8BD" stopOpacity="0.804" />
                        <stop offset="0.863" stopColor="#FFF6AB" stopOpacity="0.529" />
                        <stop offset="0.91" stopColor="#FFF38D" stopOpacity="0.209" />
                        <stop offset="0.941" stopColor="#FFF176" stopOpacity="0" />
                      </radialGradient>
                      <clipPath id="clip0_54745_246_hot">
                        <rect width="16" height="22" fill="white" transform="translate(13 7)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div >
            {/* Product Info */}
            <div
              className={`flex flex-col ${compact ? "gap-0.5 px-2 pb-1.5 pt-1" : "gap-0.5 px-1 pb-1 pt-1.5"}`}
              style={{ flex: "1 1 0%" }}
            >
              <h4 className="mb-0.5 line-clamp-1 text-[11px] font-medium leading-[15px] text-gray-600">
                {brand}
              </h4>

              <h3
                className="mb-0.5 min-h-[32px] text-[13px] font-semibold leading-[16px] text-neutral-black line-clamp-2"
              >
                <Link href={`/product/${slug}`} className="hover:text-primary transition-colors">{name}</Link>
              </h3>

              {/* <div className="min-h-[24px]">
              {Array.isArray(colors) && colors.length > 0 && (
                <div className="flex items-center mt-2 ms-[-2px]">
                  {colors.slice(0, 5).map((color: any, index) => {
                    const isOutOfStock = color.stock === 0;

                    return (
                      <Link
                        key={index}
                        href={{
                          pathname: `/product/${slug}`,
                          query: { color: color.code },
                        }}
                        scroll={false}
                      >
                        <div className="relative ms-[2px] w-4 h-4">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{
                              backgroundColor: color.code || color.color_code || "#ccc",
                            }}
                            title={color.name || "Color"}
                          />
                          {isOutOfStock && (
                            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white rotate-45" />
                          )}
                        </div>
                      </Link>
                    );
                  })}

                  {colors.length > 5 && (
                    <div className="w-5 h-5 ms-[2px] text-[15px] font-semibold flex items-center justify-center bg-white text-gray-700">
                      +{colors.length - 5}
                    </div>
                  )}
                </div>
              )}
            </div> */}
             {/* Price */}
              <div className="price flex min-w-0 items-center justify-start gap-0.5 whitespace-nowrap">
                <div className="regular_price shrink-0 text-[15px] font-extrabold leading-[18px] text-black">
                  {main_price}
                </div>
                <div
                  style={{ color: "rgba(143, 143, 143, 1)" }}
                  className="sale_price relative shrink overflow-hidden text-ellipsis text-[10px] font-semibold leading-[13px] line-through"
                >
                  {stroked_price}
                </div>
                {discount > 0 && (
                  <div
                    style={{ color: "rgba(16, 161, 0, 1)" }}
                    className="offer min-w-max shrink-0 text-[8px] font-bold uppercase leading-[10px]"
                  >
                    <span>
                      {discount}
                      {discount_text}
                    </span>
                  </div>
                )}
              </div>
              {/* Template Badge */}
              {template && (
                <div 
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold mt-1"
                  style={{
                    backgroundColor: template.bg_color || '#ff0000',
                    color: template.text_color || '#ffffff',
                  }}
                >
                  {template.icon && (
                    <img src={template.icon} alt="" className="w-4 h-4" />
                  )}
                  <span>{template.name}</span>
                </div>
              )}

              <div className="mt-1 w-full">
                  <div className="relative h-[8px] w-full overflow-hidden rounded-full bg-[#E2E2E2]">
                    <div 
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${claimedPercent}%`,
                        background: 'linear-gradient(90deg, #FF0000 0%, #026B88 50.5%, #56C74A 100%)'
                      }}
                    />
                  </div>
                  <span className="mt-0.5 block text-[11px] leading-[14px] text-gray-700">Deal is {claimedPercent}% claimed</span>
                </div>

                <p
                  className="my-1 line-clamp-1 text-[11px] font-extrabold leading-[14px]"
                  style={{ color: "#FF3B30" }}
                >
                  {addedToCartLabel}
                </p>
                <div className="flex items-center gap-2">
                  <p className="flex min-w-0 items-center gap-1 text-xs font-bold">
                    <span
                      className="max-w-[72px] truncate rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-bold leading-[12px]"
                      style={{ border: "0.5px solid #00000026" }}
                    >
                      {variantName}
                    </span>
                    {variantExtra > 0 && (
                      <span className="font-bold text-gray-700">
                        +{variantExtra}
                      </span>
                    )}
                  </p>
                  <span className="h-3.5 w-px bg-gray-400" />
                  <p className="ml-auto flex-shrink-0 text-[10px] font-bold leading-[12px]" style={{ color: "#FE4F49" }}>
                    {soldLabel}
                  </p>
                  </div>

              {/* Add to Cart */}
              <SingleAddToCart
                isShow={true}
                look={false}
                id={id}
                stocks={stocks}
                choice_options={choice_options}
                colors={colors}
                thumbnail_image={thumbnail_image}
                name={name}
                stroked_price={stroked_price}
                main_price={main_price}
                totalRating={totalRating}
                brand={brand}
                discount={discount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
