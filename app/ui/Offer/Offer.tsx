import React from "react";
import { getOffer } from "@/lib/apiData";
import { BASE_URL } from "@/app/config/api";
import Link from "next/link";
import TranslateHeading from "../TranslateHeading";
import OfferItem from "./OfferItem"; // NEW Client Component

export default async function Offer() {
  const brands = await getOffer();
  const offers = brands?.data ?? [];

  if (!offers.length) {
    return null;
  }

  return (
    <>
    <div className="container home-section mx-auto">
      <div className="offer flex flex-col gap-6">
        <TranslateHeading translateKey="special_offers" />
        <div className="offer_item grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {offers.map((item: any) => (
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
