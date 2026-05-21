import React from "react";
import { getOffer } from "@/lib/apiData";
import { BASE_URL } from "@/app/config/api";
import Link from "next/link";
import TranslateHeading from "../TranslateHeading";
import OfferItem from "./OfferItem"; // NEW Client Component

export default async function Offer() {
  const brands = await getOffer();

  return (
    <>
    <div className="container pb-[18px] md:pb-[70px] mx-auto px-4 sm:px-2 md:px-0 mt-4">
      <div className="offer flex flex-col gap-6">
        <TranslateHeading translateKey="special_offers" />
        <div className="offer_item grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {brands?.data?.map((item: any) => (
            <OfferItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

// import ProductSlider from "@/app/ui/Product/ProductSlider";
// import { getOffer } from "@/lib/apiData";

// export default async function Offer() {
//   const result = await getOffer();
//   const brands = result.data as any;

//   return (
//     <ProductSlider
//       products={brands}
//       view_link="flash-deal"
//       translateKey={"special_offers"}
//       slide_button={false}
//     />
//   );
// }
